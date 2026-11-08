# 🌙 My Deen Diary

> An all-in-one Islamic spiritual companion and habit tracker designed to help Muslims build consistency in daily prayers, systematically fulfill missed (Qaza) prayers, engage in authentic remembrance (Azkar), and cultivate daily self-reflection.

---

## 🌟 Key Features

### 1. 🕌 Daily Prayer & Habit Tracker
- **Five Daily Prayers**: Interactive tracking for Fajr, Dhuhr, Asr, Maghrib, and Isha.
- **Sunnah & Nawafil Habits**: Log Tahajjud, Ishraq, Duha, and daily Quran recitation.
- **Morning & Evening Azkar**: One-tap toggles to maintain consistency in daily remembrance.
- **Daily Reflection & Dua Journal**: Record spiritual reflections and personal supplications.

### 2. 🧮 Qaza Tracker with Calculation Wizard
- **Auto-Calculation Wizard**: Estimate total missed prayers based on age of puberty, current age, and estimated missed years/months.
- **Prayer-by-Prayer Ledger**: Increment and decrement buttons for Fajr, Dhuhr, Asr, Maghrib, Isha, and Witr.
- **Milestone Celebrations**: Encouraging feedback as debts are gradually fulfilled.
- **Real-Time Cloud Synchronization**: Synced securely with Firestore backend.

### 3. 📿 Digital Tasbeeh Counter
- **Tactile Feedback**: Haptic vibrations and authentic audio click sound on every tap.
- **Zikr Presets**: SubhanAllah, Alhamdulillah, Allahu Akbar, Astaghfirullah, and custom recitations.
- **Custom Targets & Laps**: Set cycle limits (33, 99, 100, 1000) with auto-lap alerts.
- **Accidental Reset Protection**: Safeguarded reset action with instant confirmation dialog.

### 4. 📖 Authentic Duas & Azkar with Nastaleeq Typography
- **Curated Masnoon Duas**: Authentic supplications for morning, evening, travel, illness, and protection.
- **Urdu Nastaleeq Typography**: Native integration of *Jameel Noori Nastaleeq* and *Mehr Nastaleeq* with compressed vertical line clamping for optimal readability.
- **Dual Arabic Mushaf Styles**: Switch freely between *PDMS Saleem Quran* (IndoPak Naskh) and *KFGQPC Uthman Taha* (Saudi Madani Mushaf) with custom font scaling.

### 5. ⏰ Smart Notifications & Scheduled Reminders
- **Native Android Heads-up Alerts**: High-priority notification channels (`MAX` importance) for prayer and Azkar times.
- **Customizable Schedules**: Pre-configured Morning (07:00 AM) and Evening (05:30 PM) Azkar reminders plus custom alarm scheduling.
- **Sound & Haptics Preferences**: App-level toggles for reminder tones and in-app sound effects.

### 6. 📊 Progress Analytics & Report Export
- **Monthly Matrix**: Heatmap visualizer displaying prayer fulfillment rates.
- **Streak & Consistency Scoring**: Visual indicators of spiritual routine momentum.
- **PDF Export**: Generate downloadable monthly spiritual progress summaries via `expo-print`.

---

## 🏗️ Architecture & Project Structure

My Deen Diary is organized as a unified monorepo:

```
MyDeenDiary/
├── backend-api/                  # FastAPI Python Backend
│   ├── main.py                   # REST endpoints, Auth & Firestore integration
│   ├── requirements.txt          # Python dependencies
│   ├── Procfile                  # Render.com deployment process runner
│   └── .gitignore                # Protects venv, .env, and firebase keys
│
├── frontend-mobile/              # React Native / Expo Mobile Client
│   ├── assets/                   # Fonts (Nastaleeq & IndoPak), audio & icons
│   ├── components/               # Reusable UI components & drawers
│   ├── constants/                # Typography, themes & color palettes
│   ├── context/                  # Theme, Language, and Arabic script state
│   ├── data/                     # Offline Azkar, Ayahs, and Masnoon duas
│   ├── locales/                  # English and Urdu translation dictionaries
│   ├── screens/                  # Application screens (Dashboard, Qaza, Tasbeeh, etc.)
│   ├── services/                 # API wrapper with timeout & notification engine
│   ├── app.json                  # Expo application configuration
│   └── eas.json                  # EAS Build profiles (Standalone APK preview)
│
├── .vscode/                      # VS Code schema mappings (eas.json & app.json)
├── .gitignore                    # Monorepo root ignore rules
└── README.md                     # Project documentation
```

---

## 🛠️ Tech Stack

### Mobile Client (`frontend-mobile`)
- **Framework**: [React Native](https://reactnative.dev/) (v0.88) with [Expo SDK 54](https://expo.dev/)
- **Language**: TypeScript 5.8
- **Navigation**: React Navigation (Bottom Tabs & Native Stack)
- **State & Storage**: React Context + `@react-native-async-storage/async-storage`
- **Typography**: `@expo-google-fonts/plus-jakarta-sans`, Jameel Noori Nastaleeq, PDMS Saleem Quran, KFGQPC Uthman Taha
- **Hardware Integrations**: `expo-notifications`, `expo-audio`, `expo-image-picker`, `expo-print`, `expo-sharing`
- **Build System**: Expo Application Services (EAS) with direct APK build profile

### Backend Service (`backend-api`)
- **Framework**: [FastAPI](https://fastapi.tiangolo.com/) (Python 3.12)
- **Server**: [Uvicorn](https://www.uvicorn.org/) (ASGI with standard workers)
- **Database & Auth**: [Firebase Admin SDK](https://firebase.google.com/docs/admin/setup) (Authentication & Cloud Firestore)
- **Validation**: [Pydantic v2](https://docs.pydantic.dev/) with `email-validator`
- **Deployment**: [Render.com](https://render.com/) Web Service ready (via `Procfile`)

---

## 🚀 Getting Started

### Prerequisites
- Node.js (v18 or higher) & npm / yarn
- Python 3.10+
- Expo Go app or an Android physical device / emulator
- Git

---

### Backend Setup (`backend-api`)

1. **Navigate to the backend directory**:
   ```bash
   cd backend-api
   ```

2. **Create and activate a virtual environment**:
   ```bash
   python -m venv venv
   # On Windows (PowerShell):
   .\venv\Scripts\Activate.ps1
   # On macOS/Linux:
   source venv/bin/activate
   ```

3. **Install dependencies**:
   ```bash
   pip install -r requirements.txt
   ```

4. **Configure Firebase**:
   - Place your `firebase-key.json` service account key inside `backend-api/` (it is gitignored).
   - Alternatively, set the environment variable:
     ```bash
     export FIREBASE_CREDENTIALS='{"type": "service_account", ...}'
     ```

5. **Start the development server**:
   ```bash
   uvicorn main:app --host 0.0.0.0 --port 8000 --reload
   ```
   The backend will be live at `http://localhost:8000` (or `http://<your-lan-ip>:8000`).

---

### Mobile Setup (`frontend-mobile`)

1. **Navigate to the frontend directory**:
   ```bash
   cd frontend-mobile
   ```

2. **Install dependencies**:
   ```bash
   npm install
   ```

3. **Configure API URL**:
   Create a `.env` file in `frontend-mobile/` (refer to `.env.example`):
   ```bash
   # For local Wi-Fi development:
   EXPO_PUBLIC_API_URL=http://<your-lan-ip>:8000

   # For production Render.com deployment:
   EXPO_PUBLIC_API_URL=https://<your-service>.onrender.com
   ```

4. **Start the Expo Metro Bundler**:
   ```bash
   npx expo start
   ```
   Scan the generated QR code using the **Expo Go** app on Android or iOS.

---

## 📦 Building Standalone Android APK

To generate a standalone installable Android APK without Google Play Console overhead, use Expo Application Services:

1. **Log in to EAS**:
   ```bash
   npm install -g eas-cli
   eas login
   ```

2. **Run the APK preview build**:
   ```bash
   cd frontend-mobile
   eas build --platform android --profile preview
   ```
   Upon completion, EAS provides a direct download link for the `.apk` file.

---

## ☁️ Deploying Backend to Render.com

1. Create a new **Web Service** on [Render.com](https://render.com/).
2. Connect your GitHub repository (`AlihaAfzal/MyDeenDiary`).
3. Set the configuration:
   - **Root Directory**: `backend-api`
   - **Environment**: `Python 3`
   - **Build Command**: `pip install -r requirements.txt`
   - **Start Command**: `uvicorn main:app --host 0.0.0.0 --port $PORT`
4. Add Firebase Secret File:
   - Under **Environment** > **Secret Files**, add `firebase-key.json` with the contents of your service account JSON.
   - Alternatively, add an Environment Variable `FIREBASE_CREDENTIALS` containing the raw JSON string.

---

## 📄 License
This project is licensed under the MIT License — see the LICENSE file for details.
