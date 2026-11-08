import os
import json
import requests
from dotenv import load_dotenv
from fastapi import FastAPI, HTTPException
from fastapi.middleware.cors import CORSMiddleware
import firebase_admin
from firebase_admin import credentials, auth, firestore
from pydantic import BaseModel, EmailStr
import random
from datetime import datetime, timedelta, timezone

# Load environment variables (.env)
load_dotenv()

# 1. Initialize FastAPI Application
app = FastAPI(title="My Deen Diary API")

# Enable Cross-Origin Resource Sharing (CORS) for all origins (mobile devices, LAN, Render)
origins = ["*"]

app.add_middleware(
    CORSMiddleware,
    allow_origins=origins,
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# 2. Setup Firebase Admin SDK Connection
# Supports:
# 1) FIREBASE_CREDENTIALS / FIREBASE_KEY_JSON environment variable (JSON string on Render)
# 2) firebase-key.json file (local development or Render Secret File)
firebase_cred_env = os.getenv("FIREBASE_CREDENTIALS") or os.getenv("FIREBASE_KEY_JSON")
if firebase_cred_env:
    try:
        cred_dict = json.loads(firebase_cred_env)
        cred = credentials.Certificate(cred_dict)
    except Exception as e:
        print(f"Warning: Failed to parse FIREBASE_CREDENTIALS environment variable: {e}")
        cred = credentials.Certificate("firebase-key.json") if os.path.exists("firebase-key.json") else None
elif os.path.exists("firebase-key.json"):
    cred = credentials.Certificate("firebase-key.json")
else:
    cred = None

if not firebase_admin._apps:
    if cred:
        firebase_admin.initialize_app(cred)
    else:
        try:
            firebase_admin.initialize_app()
        except Exception as e:
            print(f"Warning: Firebase initialization fallback: {e}")

db = firestore.client() if firebase_admin._apps else None

FIREBASE_WEB_API_KEY = "AIzaSyAkeZpPOordOy9C_mC35i3RmlQOLJaCSFI"
# ----------------------------------------------------
# DATA SCHEMAS
# ----------------------------------------------------
class UserRegisterSchema(BaseModel):
    email: EmailStr
    password: str

class ForgotPasswordRequest(BaseModel):
    email: EmailStr

class VerifyOTPRequest(BaseModel):
    email: EmailStr
    otp_code: str

class ProgressTrackerSchema(BaseModel):
    email: EmailStr
    date_str: str  # Format: "YYYY-MM-DD"
    fajr: bool
    dhuhr: bool
    asr: bool
    maghrib: bool
    isha: bool
    morning_azkar: bool
    evening_azkar: bool
    quran_connect: bool
    tasbehat_count: int
    reflection_text: str

class ProfileUpdateRequest(BaseModel):
    name: str
    email: EmailStr

class QazaSaveSchema(BaseModel):
    email: EmailStr
    fajr: int = 0
    dhuhr: int = 0
    asr: int = 0
    maghrib: int = 0
    isha: int = 0
    witr: int = 0

# ----------------------------------------------------
# 1. ROOT TEST ENDPOINT
# ----------------------------------------------------
@app.get("/")
def read_root():
    return {"message": "Alhamdulillah, My Deen Diary Backend is Live!"}

# ----------------------------------------------------
# 2. SIGN UP ENDPOINT & EMAIL VALIDATION
# ----------------------------------------------------
@app.get("/auth/check-email/{email}")
def check_email_availability(email: str):
    clean_email = email.strip().lower()
    import re
    if not re.match(r"^[^\s@]+@[^\s@]+\.[a-zA-Z]{2,}$", clean_email):
        raise HTTPException(
            status_code=400,
            detail="Invalid email format. Please provide a valid email address."
        )
    
    # 1. Check if user already exists in Firebase Auth
    try:
        existing_user = auth.get_user_by_email(clean_email)
        if existing_user:
            raise HTTPException(
                status_code=400,
                detail="This email is not authorized or already exists. Please verify your email or sign in directly."
            )
    except auth.UserNotFoundError:
        pass
    except HTTPException:
        raise
    except Exception:
        pass

    # 2. Check Firestore users collection
    try:
        doc = db.collection("users").document(clean_email).get()
        if doc.exists:
            raise HTTPException(
                status_code=400,
                detail="This email is not authorized or already exists. Please verify your email or sign in directly."
            )
    except HTTPException:
        raise
    except Exception:
        pass

    return {
        "status": "success",
        "available": True,
        "email": clean_email,
        "message": "Email is valid and available for registration."
    }

@app.post("/signup")
def signup_user(user_data: UserRegisterSchema):
    clean_email = user_data.email.strip().lower()
    import re
    if not re.match(r"^[^\s@]+@[^\s@]+\.[a-zA-Z]{2,}$", clean_email):
        raise HTTPException(
            status_code=400,
            detail="This email is not authorized or already exists. Please verify your email or sign in directly."
        )

    # 1. Check whether email already exists in Firebase Auth
    try:
        existing_auth_user = auth.get_user_by_email(clean_email)
        if existing_auth_user:
            raise HTTPException(
                status_code=400,
                detail="This email is not authorized or already exists. Please verify your email or sign in directly."
            )
    except auth.UserNotFoundError:
        pass
    except HTTPException:
        raise
    except Exception:
        pass

    # 2. Check whether email already exists in Firestore
    try:
        existing_doc = db.collection("users").document(clean_email).get()
        if existing_doc.exists:
            raise HTTPException(
                status_code=400,
                detail="This email is not authorized or already exists. Please verify your email or sign in directly."
            )
    except HTTPException:
        raise
    except Exception:
        pass

    # 3. Create Firebase User
    try:
        new_firebase_user = auth.create_user(
            email=clean_email,
            password=user_data.password
        )
        db.collection("users").document(clean_email).set({
            "name": "Servant of Allah",
            "email": clean_email,
            "created_at": datetime.now(timezone.utc).isoformat()
        })
        return {
            "status": "success", 
            "message": "Account created successfully!",
            "uid": new_firebase_user.uid
        }
    except auth.EmailAlreadyExistsError:
        raise HTTPException(
            status_code=400,
            detail="This email is not authorized or already exists. Please verify your email or sign in directly."
        )
    except Exception as e:
        err_msg = str(e)
        if "EMAIL_EXISTS" in err_msg or "already exists" in err_msg.lower():
            raise HTTPException(
                status_code=400,
                detail="This email is not authorized or already exists. Please verify your email or sign in directly."
            )
        raise HTTPException(status_code=400, detail=str(e))

# ----------------------------------------------------
# 3. SECURE LOGIN WITH PASSWORD VERIFICATION
# ----------------------------------------------------
@app.post("/login")
def login_user(user_data: UserRegisterSchema):
    verify_url = f"https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key={FIREBASE_WEB_API_KEY}"
    payload = {
        "email": user_data.email,
        "password": user_data.password,
        "returnSecureToken": True
    }
    
    response = requests.post(verify_url, json=payload)
    res_data = response.json()
    
    if response.status_code == 200:
        return {
            "status": "success",
            "message": "Login verified successfully!",
            "email": res_data.get("email"),
            "idToken": res_data.get("idToken"),
            "uid": res_data.get("localId")
        }
    else:
        error_msg = res_data.get("error", {}).get("message", "INVALID_CREDENTIALS")
        if "INVALID_PASSWORD" in error_msg or "INVALID_LOGIN_CREDENTIALS" in error_msg:
            raise HTTPException(status_code=401, detail="Incorrect password. Please try again.")
        elif "EMAIL_NOT_FOUND" in error_msg:
            raise HTTPException(status_code=404, detail="No account registered under this email address.")
        else:
            raise HTTPException(status_code=400, detail="Authentication failed. Please verify your credentials.")

# ----------------------------------------------------
# 4. FORGOT PASSWORD & OTP ENDPOINTS
# ----------------------------------------------------
@app.post("/forgot-password")
def request_password_reset(request_data: ForgotPasswordRequest):
    try:
        generated_code = str(random.randint(100000, 999999))
        expiration_limit = datetime.now(timezone.utc) + timedelta(minutes=15)
        
        db.collection("otps").document(request_data.email).set({
            "code": generated_code,
            "expires_at": expiration_limit.isoformat()
        })
        
        print("\n" + "📩 " + "="*45)
        print(f"OUTGOING EMAIL SIMULATION DISPATCHED TO: {request_data.email}")
        print(f"YOUR SECURITY 6-DIGIT OTP RESET CODE IS: {generated_code}")
        print(f"VALIDITY PERIOD: 15 MINUTES (EXPIRES AT: {expiration_limit.strftime('%H:%M:%S')} UTC)")
        print("="*48 + "\n")
        
        return {
            "status": "success", 
            "message": "Security verification code successfully dispatched to terminal log lines."
        }
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))

@app.post("/verify-otp")
def verify_user_otp(verification_data: VerifyOTPRequest):
    saved_otp_doc = db.collection("otps").document(verification_data.email).get()
    
    if not saved_otp_doc.exists:
        raise HTTPException(status_code=400, detail="No active code transaction found for this account profile.")
        
    otp_record_dict = saved_otp_doc.to_dict()
    
    if otp_record_dict["code"] != verification_data.otp_code:
        raise HTTPException(status_code=400, detail="Invalid verification code sequence. Access denied.")
        
    current_time_utc = datetime.now(timezone.utc)
    expiration_time_utc = datetime.fromisoformat(otp_record_dict["expires_at"])
    
    if current_time_utc > expiration_time_utc:
        db.collection("otps").document(verification_data.email).delete()
        raise HTTPException(status_code=400, detail="This security code has expired (15-minute limit reached).")
        
    db.collection("otps").document(verification_data.email).delete()
    return {"status": "success", "message": "OTP verified successfully! Access granted."}

# ----------------------------------------------------
# 5. DAILY TRACKER SAVE PROGRESS ENDPOINT
# ----------------------------------------------------
@app.post("/save-progress")
def save_daily_progress(progress_data: ProgressTrackerSchema):
    try:
        unique_doc_id = f"{progress_data.email}_{progress_data.date_str}"
        db.collection("user_tracking").document(unique_doc_id).set({
            "email": progress_data.email,
            "date": progress_data.date_str,
            "fajr": progress_data.fajr,
            "dhuhr": progress_data.dhuhr,
            "asr": progress_data.asr,
            "maghrib": progress_data.maghrib,
            "isha": progress_data.isha,
            "morning_azkar": progress_data.morning_azkar,
            "evening_azkar": progress_data.evening_azkar,
            "quran_connect": progress_data.quran_connect,
            "tasbehat_count": progress_data.tasbehat_count,
            "reflection_text": progress_data.reflection_text,
            "last_updated": datetime.now(timezone.utc).isoformat()
        })
        return {
            "status": "success",
            "message": "Alhamdulillah, your daily progress has been safely logged in the cloud!"
        }
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))

# ----------------------------------------------------
# 6. MONTHLY MATRIX FETCH ENDPOINT
# ----------------------------------------------------
@app.get("/monthly-matrix/{email}")
def get_monthly_matrix(email: str):
    try:
        docs = db.collection("user_tracking").where("email", "==", email).stream()
        matrix_data = {}
        for doc in docs:
            data = doc.to_dict()
            date_str = data.get("date", "")
            if date_str:
                try:
                    day_num = int(date_str.split("-")[-1])
                    for key, val in data.items():
                        if isinstance(val, bool) and val is True and key not in ["email", "date"]:
                            norm_key = "quran" if key == "quran_connect" else key
                            matrix_data[f"{norm_key}_{day_num}"] = True
                except Exception:
                    continue

        return {"status": "success", "matrix": matrix_data}
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))

# ----------------------------------------------------
# 6.1 REFLECTIONS CHRONOLOGICAL GET ENDPOINT
# ----------------------------------------------------
@app.get("/reflections/{email}")
def get_user_reflections(email: str):
    clean_email = email.strip().lower()
    try:
        docs = db.collection("user_tracking").where("email", "==", clean_email).stream()
        reflections = []
        for doc in docs:
            data = doc.to_dict()
            text = (data.get("reflection_text") or "").strip()
            date_str = data.get("date") or data.get("date_str") or ""
            if text:
                reflections.append({
                    "id": doc.id,
                    "date": date_str,
                    "text": text,
                    "updated_at": data.get("updated_at") or date_str
                })
        reflections.sort(key=lambda r: r["date"], reverse=True)
        return {"status": "success", "reflections": reflections}
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))

# ----------------------------------------------------
# 7. PROFILE GET & UPDATE ENDPOINTS
# ----------------------------------------------------
@app.get("/profile/{email}")
def get_user_profile(email: str):
    try:
        doc = db.collection("users").document(email).get()
        if doc.exists:
            return {"status": "success", "data": doc.to_dict()}
        return {"status": "success", "data": {"name": "Servant of Allah", "email": email}}
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))

@app.post("/profile/update")
def update_user_profile(profile_data: ProfileUpdateRequest):
    try:
        db.collection("users").document(profile_data.email).set({
            "name": profile_data.name,
            "email": profile_data.email,
            "updated_at": datetime.now(timezone.utc).isoformat()
        }, merge=True)
        return {"status": "success", "message": "Profile updated in cloud successfully!"}
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))

# ----------------------------------------------------
# 8. QAZA NAMAZ TRACKER ENDPOINTS
# ----------------------------------------------------
@app.post("/qaza/save")
def save_qaza_counts(qaza_data: QazaSaveSchema):
    try:
        db.collection("user_qaza").document(qaza_data.email).set({
            "email": qaza_data.email,
            "fajr": max(0, qaza_data.fajr),
            "dhuhr": max(0, qaza_data.dhuhr),
            "asr": max(0, qaza_data.asr),
            "maghrib": max(0, qaza_data.maghrib),
            "isha": max(0, qaza_data.isha),
            "witr": max(0, qaza_data.witr),
            "last_updated": datetime.now(timezone.utc).isoformat()
        }, merge=True)
        return {
            "status": "success",
            "message": "Alhamdulillah, your Qaza records have been safely synced with the cloud!"
        }
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))

@app.get("/qaza/{email}")
def get_qaza_counts(email: str):
    try:
        doc = db.collection("user_qaza").document(email).get()
        if doc.exists:
            return {"status": "success", "data": doc.to_dict()}
        return {
            "status": "success",
            "data": {
                "email": email,
                "fajr": 0,
                "dhuhr": 0,
                "asr": 0,
                "maghrib": 0,
                "isha": 0,
                "witr": 0,
                "last_updated": None
            }
        }
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))

# ----------------------------------------------------
# 9. PERMANENT ACCOUNT DELETION ENDPOINT
# ----------------------------------------------------
@app.delete("/auth/delete-account/{email}")
@app.delete("/delete-account/{email}")
def delete_user_account(email: str):
    try:
        # 1. Delete from Firebase Auth if user exists
        try:
            fb_user = auth.get_user_by_email(email)
            if fb_user and fb_user.uid:
                auth.delete_user(fb_user.uid)
        except Exception:
            pass  # Non-blocking if auth user not found

        # 2. Delete from 'users' collection
        db.collection("users").document(email).delete()

        # 3. Delete from 'user_qaza' collection
        db.collection("user_qaza").document(email).delete()

        # 4. Delete from 'otps' collection
        db.collection("otps").document(email).delete()

        # 5. Delete all user_tracking documents
        tracking_docs = db.collection("user_tracking").where("email", "==", email).stream()
        for doc in tracking_docs:
            doc.reference.delete()

        return {
            "status": "success",
            "message": "User account and all related data wiped permanently."
        }
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))

if __name__ == "__main__":
    import uvicorn
    uvicorn.run("main:app", host="0.0.0.0", port=8000, reload=True)


