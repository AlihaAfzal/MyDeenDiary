import React from 'react';
import Svg, { Circle, Path, Line } from 'react-native-svg';

interface TasbeehIconProps {
    focused: boolean;
    color: string;
    size?: number;
}

export default function TasbeehIcon({ focused, color, size = 22 }: TasbeehIconProps) {
    return (
        <Svg width={size} height={size} viewBox="0 0 24 24" fill="none">
            {/* Top connecting thread */}
            <Path
                d="M12 2C8 2 4.5 5.5 4.5 9.5C4.5 13.5 8 17 12 17C16 17 19.5 13.5 19.5 9.5C19.5 5.5 16 2 12 2Z"
                stroke={color}
                strokeWidth={1.5}
                strokeDasharray="1.5 2"
                fill="none"
            />
            {/* Interconnected Prayer Beads on the ring */}
            <Circle cx="12" cy="3.5" r="1.8" fill={focused ? color : 'none'} stroke={color} strokeWidth={1.3} />
            <Circle cx="16.5" cy="5.8" r="1.8" fill={focused ? color : 'none'} stroke={color} strokeWidth={1.3} />
            <Circle cx="18.5" cy="10" r="1.8" fill={focused ? color : 'none'} stroke={color} strokeWidth={1.3} />
            <Circle cx="16.5" cy="14.2" r="1.8" fill={focused ? color : 'none'} stroke={color} strokeWidth={1.3} />
            <Circle cx="12" cy="16.5" r="2.2" fill={color} stroke={color} strokeWidth={1.3} />
            <Circle cx="7.5" cy="14.2" r="1.8" fill={focused ? color : 'none'} stroke={color} strokeWidth={1.3} />
            <Circle cx="5.5" cy="10" r="1.8" fill={focused ? color : 'none'} stroke={color} strokeWidth={1.3} />
            <Circle cx="7.5" cy="5.8" r="1.8" fill={focused ? color : 'none'} stroke={color} strokeWidth={1.3} />

            {/* Main Imam bead & hanging tassel */}
            <Line x1="12" y1="18.5" x2="12" y2="21.5" stroke={color} strokeWidth={1.5} strokeLinecap="round" />
            <Path
                d="M10 21.5L12 23L14 21.5"
                stroke={color}
                strokeWidth={1.3}
                strokeLinecap="round"
                strokeLinejoin="round"
            />
        </Svg>
    );
}

