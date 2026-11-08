import React from 'react';
import Svg, { Circle, Path, Rect } from 'react-native-svg';

interface TasbeehIconProps {
    focused: boolean;
    color: string;
    size?: number;
}

/**
 * Clean, professional vector bead icon representing Islamic prayer beads (Misbaha / Tasbeeh)
 * with theme-consistent styling, symmetric bead layout, Imam marker, and tassel.
 */
export default function TasbeehIcon({ focused, color, size = 25 }: TasbeehIconProps) {
    // 9 circular beads arranged radially around center (12, 9.5) with radius 7.2
    const beads = [
        { cx: 12, cy: 2.3 },
        { cx: 16.2, cy: 3.6 },
        { cx: 18.8, cy: 7.3 },
        { cx: 18.5, cy: 11.8 },
        { cx: 15.4, cy: 15.2 },
        { cx: 8.6, cy: 15.2 },
        { cx: 5.5, cy: 11.8 },
        { cx: 5.2, cy: 7.3 },
        { cx: 7.8, cy: 3.6 },
    ];

    return (
        <Svg width={size} height={size} viewBox="0 0 24 24" fill="none">
            {/* Connecting Cord / Thread loop */}
            <Path
                d="M12 3C16 3 19 6.2 19 10C19 13.5 16 16.2 12 16.2C8 16.2 5 13.5 5 10C5 6.2 8 3 12 3Z"
                stroke={color}
                strokeWidth={1.2}
                strokeOpacity={focused ? 0.6 : 0.4}
            />

            {/* Prayer Beads */}
            {beads.map((b, idx) => (
                <Circle
                    key={idx}
                    cx={b.cx}
                    cy={b.cy}
                    r={1.7}
                    fill={focused ? color : 'none'}
                    stroke={color}
                    strokeWidth={focused ? 1.5 : 1.3}
                />
            ))}

            {/* Imam / Master Bead at Bottom Center */}
            <Rect
                x={10.4}
                y={15.5}
                width={3.2}
                height={3.8}
                rx={1.6}
                fill={color}
                stroke={color}
                strokeWidth={0.8}
            />

            {/* Hanging Tassel Strings */}
            <Path
                d="M12 19.3V22.5M10.5 21L12 22.8L13.5 21"
                stroke={color}
                strokeWidth={1.4}
                strokeLinecap="round"
                strokeLinejoin="round"
            />
        </Svg>
    );
}
