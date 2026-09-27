import React from 'react';

// Authentic Jharkhand/Sohrai/Santhal/Ho traditional dancing figures (Full Color)
export function AuthenticTribalDancers({ className = "h-12", count = 5 }) {
  return (
    <div className={`flex items-center justify-center ${className}`}>
      <svg viewBox="0 0 240 70" fill="none" xmlns="http://www.w3.org/2000/svg" className="h-full w-auto">
        {/* Dancer 1 */}
        <g transform="translate(10, 5)">
          {/* Head & Hair bun */}
          <ellipse cx="20" cy="12" rx="5.5" ry="6" fill="#8c5332" />
          <circle cx="25" cy="11" r="3.5" fill="#2d1500" />
          {/* Flower in hair */}
          <circle cx="28" cy="9" r="2" fill="#ef4444" />
          {/* Neck & torso */}
          <path d="M17 18 L23 18 L25 32 L15 32 Z" fill="#b45309" />
          {/* Traditional orange/red saree drape */}
          <path d="M14 32 L26 32 L29 52 L11 52 Z" fill="#dc2626" />
          <path d="M13 40 L27 40" stroke="#fef08a" strokeWidth="2" strokeDasharray="2,2" />
          <path d="M12 48 L28 48" stroke="#facc15" strokeWidth="2" />
          {/* Sash across chest */}
          <path d="M16 19 L26 32" stroke="#ffffff" strokeWidth="2.5" />
          {/* Legs */}
          <line x1="16" y1="52" x2="14" y2="65" stroke="#8c5332" strokeWidth="2.5" strokeLinecap="round" />
          <line x1="24" y1="52" x2="26" y2="65" stroke="#8c5332" strokeWidth="2.5" strokeLinecap="round" />
          {/* Arms locked with neighbor */}
          <path d="M16 22 L2 30 M24 22 L38 28" stroke="#8c5332" strokeWidth="2.5" strokeLinecap="round" />
        </g>

        {/* Dancer 2 (Drummer / Dancer) */}
        <g transform="translate(54, 5)">
          <ellipse cx="20" cy="12" rx="5.5" ry="6" fill="#8c5332" />
          <circle cx="25" cy="11" r="3.5" fill="#2d1500" />
          <circle cx="28" cy="9" r="2" fill="#f59e0b" />
          <path d="M17 18 L23 18 L25 32 L15 32 Z" fill="#b45309" />
          <path d="M14 32 L26 32 L29 52 L11 52 Z" fill="#ea580c" />
          <path d="M13 40 L27 40" stroke="#fef08a" strokeWidth="2" strokeDasharray="2,2" />
          <path d="M12 48 L28 48" stroke="#fde047" strokeWidth="2" />
          <path d="M16 19 L26 32" stroke="#ffffff" strokeWidth="2.5" />
          <line x1="16" y1="52" x2="15" y2="65" stroke="#8c5332" strokeWidth="2.5" strokeLinecap="round" />
          <line x1="24" y1="52" x2="25" y2="65" stroke="#8c5332" strokeWidth="2.5" strokeLinecap="round" />
          <path d="M16 22 L-6 28 M24 22 L38 28" stroke="#8c5332" strokeWidth="2.5" strokeLinecap="round" />
        </g>

        {/* Dancer 3 */}
        <g transform="translate(98, 5)">
          <ellipse cx="20" cy="12" rx="5.5" ry="6" fill="#8c5332" />
          <circle cx="25" cy="11" r="3.5" fill="#2d1500" />
          <circle cx="28" cy="9" r="2" fill="#ef4444" />
          <path d="M17 18 L23 18 L25 32 L15 32 Z" fill="#b45309" />
          <path d="M14 32 L26 32 L29 52 L11 52 Z" fill="#dc2626" />
          <path d="M13 40 L27 40" stroke="#fef08a" strokeWidth="2" strokeDasharray="2,2" />
          <path d="M12 48 L28 48" stroke="#facc15" strokeWidth="2" />
          <path d="M16 19 L26 32" stroke="#ffffff" strokeWidth="2.5" />
          <line x1="16" y1="52" x2="14" y2="65" stroke="#8c5332" strokeWidth="2.5" strokeLinecap="round" />
          <line x1="24" y1="52" x2="26" y2="65" stroke="#8c5332" strokeWidth="2.5" strokeLinecap="round" />
          <path d="M16 22 L-6 28 M24 22 L38 28" stroke="#8c5332" strokeWidth="2.5" strokeLinecap="round" />
        </g>

        {/* Dancer 4 */}
        <g transform="translate(142, 5)">
          <ellipse cx="20" cy="12" rx="5.5" ry="6" fill="#8c5332" />
          <circle cx="25" cy="11" r="3.5" fill="#2d1500" />
          <circle cx="28" cy="9" r="2" fill="#f59e0b" />
          <path d="M17 18 L23 18 L25 32 L15 32 Z" fill="#b45309" />
          <path d="M14 32 L26 32 L29 52 L11 52 Z" fill="#ea580c" />
          <path d="M13 40 L27 40" stroke="#fef08a" strokeWidth="2" strokeDasharray="2,2" />
          <path d="M12 48 L28 48" stroke="#fde047" strokeWidth="2" />
          <path d="M16 19 L26 32" stroke="#ffffff" strokeWidth="2.5" />
          <line x1="16" y1="52" x2="15" y2="65" stroke="#8c5332" strokeWidth="2.5" strokeLinecap="round" />
          <line x1="24" y1="52" x2="25" y2="65" stroke="#8c5332" strokeWidth="2.5" strokeLinecap="round" />
          <path d="M16 22 L-6 28 M24 22 L38 28" stroke="#8c5332" strokeWidth="2.5" strokeLinecap="round" />
        </g>

        {/* Dancer 5 */}
        <g transform="translate(186, 5)">
          <ellipse cx="20" cy="12" rx="5.5" ry="6" fill="#8c5332" />
          <circle cx="25" cy="11" r="3.5" fill="#2d1500" />
          <circle cx="28" cy="9" r="2" fill="#ef4444" />
          <path d="M17 18 L23 18 L25 32 L15 32 Z" fill="#b45309" />
          <path d="M14 32 L26 32 L29 52 L11 52 Z" fill="#dc2626" />
          <path d="M13 40 L27 40" stroke="#fef08a" strokeWidth="2" strokeDasharray="2,2" />
          <path d="M12 48 L28 48" stroke="#facc15" strokeWidth="2" />
          <path d="M16 19 L26 32" stroke="#ffffff" strokeWidth="2.5" />
          <line x1="16" y1="52" x2="14" y2="65" stroke="#8c5332" strokeWidth="2.5" strokeLinecap="round" />
          <line x1="24" y1="52" x2="26" y2="65" stroke="#8c5332" strokeWidth="2.5" strokeLinecap="round" />
          <path d="M16 22 L-6 28 M24 22 L34 32" stroke="#8c5332" strokeWidth="2.5" strokeLinecap="round" />
        </g>

        {/* Drum / Mandar on left */}
        <g transform="translate(2, 28)">
          <ellipse cx="8" cy="20" rx="7" ry="14" fill="#a16207" stroke="#713f12" strokeWidth="1.5" />
          <ellipse cx="8" cy="20" rx="3" ry="9" fill="#451a03" />
        </g>
      </svg>
    </div>
  );
}

// 3 Dancers variant for Language Select Screen
export function ThreeDancers({ className = "h-12" }) {
  return (
    <div className={`flex items-center justify-center ${className}`}>
      <svg viewBox="0 0 150 70" fill="none" xmlns="http://www.w3.org/2000/svg" className="h-full w-auto">
        {/* Dancer 1 */}
        <g transform="translate(10, 5)">
          <ellipse cx="20" cy="12" rx="5.5" ry="6" fill="#8c5332" />
          <circle cx="25" cy="11" r="3.5" fill="#2d1500" />
          <circle cx="28" cy="9" r="2" fill="#ef4444" />
          <path d="M17 18 L23 18 L25 32 L15 32 Z" fill="#b45309" />
          <path d="M14 32 L26 32 L29 52 L11 52 Z" fill="#dc2626" />
          <path d="M12 48 L28 48" stroke="#facc15" strokeWidth="2" />
          <path d="M16 19 L26 32" stroke="#ffffff" strokeWidth="2.5" />
          <line x1="16" y1="52" x2="14" y2="65" stroke="#8c5332" strokeWidth="2.5" strokeLinecap="round" />
          <line x1="24" y1="52" x2="26" y2="65" stroke="#8c5332" strokeWidth="2.5" strokeLinecap="round" />
          <path d="M16 22 L6 30 M24 22 L38 28" stroke="#8c5332" strokeWidth="2.5" strokeLinecap="round" />
        </g>

        {/* Dancer 2 */}
        <g transform="translate(54, 5)">
          <ellipse cx="20" cy="12" rx="5.5" ry="6" fill="#8c5332" />
          <circle cx="25" cy="11" r="3.5" fill="#2d1500" />
          <circle cx="28" cy="9" r="2" fill="#f59e0b" />
          <path d="M17 18 L23 18 L25 32 L15 32 Z" fill="#b45309" />
          <path d="M14 32 L26 32 L29 52 L11 52 Z" fill="#ea580c" />
          <path d="M12 48 L28 48" stroke="#fde047" strokeWidth="2" />
          <path d="M16 19 L26 32" stroke="#ffffff" strokeWidth="2.5" />
          <line x1="16" y1="52" x2="15" y2="65" stroke="#8c5332" strokeWidth="2.5" strokeLinecap="round" />
          <line x1="24" y1="52" x2="25" y2="65" stroke="#8c5332" strokeWidth="2.5" strokeLinecap="round" />
          <path d="M16 22 L-6 28 M24 22 L38 28" stroke="#8c5332" strokeWidth="2.5" strokeLinecap="round" />
        </g>

        {/* Dancer 3 */}
        <g transform="translate(98, 5)">
          <ellipse cx="20" cy="12" rx="5.5" ry="6" fill="#8c5332" />
          <circle cx="25" cy="11" r="3.5" fill="#2d1500" />
          <circle cx="28" cy="9" r="2" fill="#ef4444" />
          <path d="M17 18 L23 18 L25 32 L15 32 Z" fill="#b45309" />
          <path d="M14 32 L26 32 L29 52 L11 52 Z" fill="#dc2626" />
          <path d="M12 48 L28 48" stroke="#facc15" strokeWidth="2" />
          <path d="M16 19 L26 32" stroke="#ffffff" strokeWidth="2.5" />
          <line x1="16" y1="52" x2="14" y2="65" stroke="#8c5332" strokeWidth="2.5" strokeLinecap="round" />
          <line x1="24" y1="52" x2="26" y2="65" stroke="#8c5332" strokeWidth="2.5" strokeLinecap="round" />
          <path d="M16 22 L-6 28 M24 22 L34 30" stroke="#8c5332" strokeWidth="2.5" strokeLinecap="round" />
        </g>
      </svg>
    </div>
  );
}

// Bhasha Setu Bridge Logo with Dancing Figures on it (As seen in the poster header & splash)
export function BhashaSetuBridgeLogo({ className = "w-16 h-12 text-[#75BDE0]" }) {
  return (
    <div className={`relative flex items-center justify-center shrink-0 ${className}`}>
      <svg viewBox="0 0 120 70" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-full h-full">
        {/* Main Arch of the Bridge */}
        <path d="M10 58 Q60 12 110 58" stroke="currentColor" strokeWidth="5.5" strokeLinecap="round" fill="none" />
        
        {/* Roadway Deck */}
        <line x1="8" y1="58" x2="112" y2="58" stroke="currentColor" strokeWidth="4.5" strokeLinecap="round" />
        
        {/* Vertical Truss Columns */}
        <line x1="25" y1="58" x2="25" y2="44" stroke="currentColor" strokeWidth="3" />
        <line x1="42" y1="58" x2="42" y2="28" stroke="currentColor" strokeWidth="3" />
        <line x1="60" y1="58" x2="60" y2="20" stroke="currentColor" strokeWidth="3.5" />
        <line x1="78" y1="58" x2="78" y2="28" stroke="currentColor" strokeWidth="3" />
        <line x1="95" y1="58" x2="95" y2="44" stroke="currentColor" strokeWidth="3" />

        {/* Bridge piers/foundations */}
        <rect x="5" y="56" width="10" height="12" fill="currentColor" rx="1.5" />
        <rect x="105" y="56" width="10" height="12" fill="currentColor" rx="1.5" />
        <rect x="56" y="58" width="8" height="10" fill="currentColor" rx="1" />

        {/* Tribal Dancers Silhouettes on / above the bridge */}
        {/* Figure 1 (Left) */}
        <circle cx="42" cy="18" r="2.5" fill="currentColor" />
        <line x1="42" y1="20" x2="42" y2="28" stroke="currentColor" strokeWidth="2" />
        <path d="M38 23 L42 21 L46 23" stroke="currentColor" strokeWidth="1.5" />

        {/* Figure 2 (Center) */}
        <circle cx="60" cy="10" r="3" fill="currentColor" />
        <line x1="60" y1="13" x2="60" y2="20" stroke="currentColor" strokeWidth="2" />
        <path d="M54 15 L60 13 L66 15" stroke="currentColor" strokeWidth="1.5" />

        {/* Figure 3 (Right) */}
        <circle cx="78" cy="18" r="2.5" fill="currentColor" />
        <line x1="78" y1="20" x2="78" y2="28" stroke="currentColor" strokeWidth="2" />
        <path d="M74 23 L78 21 L82 23" stroke="currentColor" strokeWidth="1.5" />
      </svg>
    </div>
  );
}

// Full Scenic Village Landscape for Splash Screen (Screen 1)
export function VillageSplashArt({ className = "w-full h-56" }) {
  return (
    <div className={`relative overflow-hidden rounded-2xl bg-gradient-to-b from-[#fef3c7]/50 via-[#ecfdf5]/50 to-[#dcfce7]/70 border border-amber-300/80 shadow-inner flex flex-col justify-end ${className}`}>
      <svg viewBox="0 0 320 220" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-full h-full">
        {/* Soft sky and sun */}
        <circle cx="160" cy="45" r="20" fill="#fbbf24" opacity="0.8" />
        <circle cx="160" cy="45" r="30" fill="#fef08a" opacity="0.4" />

        {/* Rolling Hills in Background */}
        <path d="M-20 110 Q50 60 140 95 T300 80 T340 100 L340 220 L-20 220 Z" fill="#bbf7d0" opacity="0.7" />
        <path d="M-10 125 Q70 85 180 115 T340 105 L340 220 L-10 220 Z" fill="#86efac" opacity="0.8" />

        {/* Trees Left */}
        <rect x="22" y="85" width="8" height="50" fill="#78350f" rx="2" />
        <ellipse cx="26" cy="75" rx="20" ry="24" fill="#15803d" />
        <ellipse cx="26" cy="65" rx="15" ry="16" fill="#16a34a" />

        {/* Trees Right */}
        <rect x="290" y="85" width="8" height="50" fill="#78350f" rx="2" />
        <ellipse cx="294" cy="75" rx="20" ry="24" fill="#15803d" />
        <ellipse cx="294" cy="65" rx="15" ry="16" fill="#16a34a" />

        {/* Traditional Jharkhand Thatched Mud Huts */}
        {/* Hut 1 */}
        <polygon points="50,110 80,82 110,110" fill="#b45309" stroke="#78350f" strokeWidth="1.5" />
        <rect x="58" y="110" width="44" height="28" fill="#ffedd5" stroke="#c2410c" strokeWidth="1" />
        <rect x="74" y="118" width="12" height="20" fill="#7c2d12" rx="2" />

        {/* Hut 2 */}
        <polygon points="215,112 245,85 275,112" fill="#b45309" stroke="#78350f" strokeWidth="1.5" />
        <rect x="223" y="112" width="44" height="26" fill="#ffedd5" stroke="#c2410c" strokeWidth="1" />
        <rect x="239" y="118" width="12" height="20" fill="#7c2d12" rx="2" />

        {/* Ground */}
        <path d="M0 135 Q80 130 160 135 T320 132 L320 220 L0 220 Z" fill="#d9f99d" />
        <path d="M0 152 Q100 148 200 152 T320 150 L320 220 L0 220 Z" fill="#bef264" />

        {/* 5 Tribal Dancers in Front Dancing in Line */}
        <g transform="translate(38, 138)">
          {/* Dancer 1 */}
          <g transform="translate(0, 0)">
            <ellipse cx="16" cy="10" rx="4.5" ry="5" fill="#8c5332" />
            <circle cx="20" cy="9" r="3" fill="#2d1500" />
            <circle cx="23" cy="7" r="1.5" fill="#ef4444" />
            <path d="M13 15 L19 15 L21 26 L11 26 Z" fill="#b45309" />
            <path d="M10 26 L22 26 L25 42 L8 42 Z" fill="#dc2626" />
            <path d="M9 38 L24 38" stroke="#facc15" strokeWidth="1.5" />
            <line x1="13" y1="42" x2="11" y2="54" stroke="#8c5332" strokeWidth="2" strokeLinecap="round" />
            <line x1="19" y1="42" x2="21" y2="54" stroke="#8c5332" strokeWidth="2" strokeLinecap="round" />
            <path d="M12 18 L2 24 M20 18 L32 23" stroke="#8c5332" strokeWidth="2" strokeLinecap="round" />
          </g>

          {/* Dancer 2 */}
          <g transform="translate(48, 0)">
            <ellipse cx="16" cy="10" rx="4.5" ry="5" fill="#8c5332" />
            <circle cx="20" cy="9" r="3" fill="#2d1500" />
            <circle cx="23" cy="7" r="1.5" fill="#f59e0b" />
            <path d="M13 15 L19 15 L21 26 L11 26 Z" fill="#b45309" />
            <path d="M10 26 L22 26 L25 42 L8 42 Z" fill="#ea580c" />
            <path d="M9 38 L24 38" stroke="#fde047" strokeWidth="1.5" />
            <line x1="13" y1="42" x2="12" y2="54" stroke="#8c5332" strokeWidth="2" strokeLinecap="round" />
            <line x1="19" y1="42" x2="20" y2="54" stroke="#8c5332" strokeWidth="2" strokeLinecap="round" />
            <path d="M12 18 L-2 23 M20 18 L32 23" stroke="#8c5332" strokeWidth="2" strokeLinecap="round" />
          </g>

          {/* Dancer 3 */}
          <g transform="translate(96, 0)">
            <ellipse cx="16" cy="10" rx="4.5" ry="5" fill="#8c5332" />
            <circle cx="20" cy="9" r="3" fill="#2d1500" />
            <circle cx="23" cy="7" r="1.5" fill="#ef4444" />
            <path d="M13 15 L19 15 L21 26 L11 26 Z" fill="#b45309" />
            <path d="M10 26 L22 26 L25 42 L8 42 Z" fill="#dc2626" />
            <path d="M9 38 L24 38" stroke="#facc15" strokeWidth="1.5" />
            <line x1="13" y1="42" x2="11" y2="54" stroke="#8c5332" strokeWidth="2" strokeLinecap="round" />
            <line x1="19" y1="42" x2="21" y2="54" stroke="#8c5332" strokeWidth="2" strokeLinecap="round" />
            <path d="M12 18 L-2 23 M20 18 L32 23" stroke="#8c5332" strokeWidth="2" strokeLinecap="round" />
          </g>

          {/* Dancer 4 */}
          <g transform="translate(144, 0)">
            <ellipse cx="16" cy="10" rx="4.5" ry="5" fill="#8c5332" />
            <circle cx="20" cy="9" r="3" fill="#2d1500" />
            <circle cx="23" cy="7" r="1.5" fill="#f59e0b" />
            <path d="M13 15 L19 15 L21 26 L11 26 Z" fill="#b45309" />
            <path d="M10 26 L22 26 L25 42 L8 42 Z" fill="#ea580c" />
            <path d="M9 38 L24 38" stroke="#fde047" strokeWidth="1.5" />
            <line x1="13" y1="42" x2="12" y2="54" stroke="#8c5332" strokeWidth="2" strokeLinecap="round" />
            <line x1="19" y1="42" x2="20" y2="54" stroke="#8c5332" strokeWidth="2" strokeLinecap="round" />
            <path d="M12 18 L-2 23 M20 18 L32 23" stroke="#8c5332" strokeWidth="2" strokeLinecap="round" />
          </g>

          {/* Dancer 5 */}
          <g transform="translate(192, 0)">
            <ellipse cx="16" cy="10" rx="4.5" ry="5" fill="#8c5332" />
            <circle cx="20" cy="9" r="3" fill="#2d1500" />
            <circle cx="23" cy="7" r="1.5" fill="#ef4444" />
            <path d="M13 15 L19 15 L21 26 L11 26 Z" fill="#b45309" />
            <path d="M10 26 L22 26 L25 42 L8 42 Z" fill="#dc2626" />
            <path d="M9 38 L24 38" stroke="#facc15" strokeWidth="1.5" />
            <line x1="13" y1="42" x2="11" y2="54" stroke="#8c5332" strokeWidth="2" strokeLinecap="round" />
            <line x1="19" y1="42" x2="21" y2="54" stroke="#8c5332" strokeWidth="2" strokeLinecap="round" />
            <path d="M12 18 L-2 23 M20 18 L28 26" stroke="#8c5332" strokeWidth="2" strokeLinecap="round" />
          </g>
        </g>
      </svg>
    </div>
  );
}

// Geometric traditional tribal border pattern
export function TribalBorderPattern({ className = "h-3" }) {
  return (
    <div className={`w-full overflow-hidden opacity-60 ${className}`}>
      <svg viewBox="0 0 400 14" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-full h-full">
        <pattern id="tribal-diamonds" width="24" height="14" patternUnits="userSpaceOnUse">
          <polygon points="12,1 23,7 12,13 1,7" fill="#b45309" />
          <polygon points="12,3 20,7 12,11 4,7" fill="#fef08a" />
          <circle cx="12" cy="7" r="2" fill="#b45309" />
        </pattern>
        <rect width="100%" height="14" fill="url(#tribal-diamonds)" />
      </svg>
    </div>
  );
}

// Aliases for compatibility
export const BhashaSetuLogo = BhashaSetuBridgeLogo;
export const TribalDancers = AuthenticTribalDancers;
export const VillageIllustration = VillageSplashArt;
