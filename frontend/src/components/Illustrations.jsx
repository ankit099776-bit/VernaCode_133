import React from "react";

// Screen 1: Splash Screen Village Classroom (Teacher & Tribal Children learning outdoors)
export function VillageClassroomIllustration({ className = "w-full max-w-xl h-auto" }) {
  return (
    <div className={`relative flex items-center justify-center select-none ${className}`}>
      <svg
        viewBox="0 0 600 360"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        className="w-full h-full drop-shadow-sm"
      >
        <defs>
          <linearGradient id="skyGrad" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stopColor="#FAF7F0" />
            <stop offset="100%" stopColor="#EBF4F7" />
          </linearGradient>
          <linearGradient id="hillGrad" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stopColor="#C5DFCF" />
            <stop offset="100%" stopColor="#A8CFB6" />
          </linearGradient>
          <linearGradient id="groundGrad" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stopColor="#E4F1E8" />
            <stop offset="100%" stopColor="#D4E8DC" />
          </linearGradient>
        </defs>

        {/* Sky Background */}
        <rect width="600" height="360" rx="24" fill="url(#skyGrad)" />

        {/* Soft Distant Rolling Hills of Jharkhand */}
        <path d="M0 240 C140 180, 260 210, 420 180 C500 160, 560 190, 600 200 L600 360 L0 360 Z" fill="url(#hillGrad)" opacity="0.6" />
        <path d="M0 260 C120 220, 300 250, 460 210 C530 200, 570 220, 600 230 L600 360 L0 360 Z" fill="url(#groundGrad)" />

        {/* Traditional Village Huts with Thatched Roofs in Background */}
        {/* Hut 1 (Left) */}
        <g transform="translate(45, 170) scale(0.85)">
          <path d="M10 50 L50 15 L90 50 Z" fill="#8A5A2B" stroke="#6F451F" strokeWidth="2" />
          <path d="M20 50 L20 85 L80 85 L80 50 Z" fill="#FAF7F0" stroke="#D3C7B5" strokeWidth="2" />
          <rect x="42" y="60" width="16" height="25" fill="#5F3A19" rx="3" />
        </g>
        {/* Hut 2 (Right) */}
        <g transform="translate(490, 165) scale(0.9)">
          <path d="M10 50 L50 15 L90 50 Z" fill="#9E6935" stroke="#6F451F" strokeWidth="2" />
          <path d="M20 50 L20 85 L80 85 L80 50 Z" fill="#FAF7F0" stroke="#D3C7B5" strokeWidth="2" />
          <rect x="42" y="60" width="16" height="25" fill="#5F3A19" rx="3" />
        </g>

        {/* Lush Green Trees */}
        {/* Tree Left */}
        <g transform="translate(10, 90)">
          <rect x="35" y="110" width="14" height="80" rx="4" fill="#6F451F" />
          <circle cx="42" cy="100" r="45" fill="#276241" />
          <circle cx="65" cy="80" r="35" fill="#357C54" />
          <circle cx="20" cy="80" r="32" fill="#1E4D36" />
        </g>
        {/* Tree Right */}
        <g transform="translate(500, 80)">
          <rect x="35" y="110" width="14" height="90" rx="4" fill="#6F451F" />
          <circle cx="42" cy="90" r="50" fill="#1E4D36" />
          <circle cx="65" cy="70" r="36" fill="#276241" />
          <circle cx="20" cy="75" r="35" fill="#357C54" />
        </g>

        {/* Large Canopy Shade Tree in center-left where class is seated */}
        <g transform="translate(180, 20)">
          <circle cx="120" cy="90" r="85" fill="#1E4D36" opacity="0.15" />
          <circle cx="80" cy="110" r="65" fill="#276241" opacity="0.25" />
        </g>

        {/* --- Characters Seated Outdoors (Teacher + 5 Children) --- */}
        
        {/* Teacher (Center-Left): Ananya in Green Saree with warm smile, holding open book */}
        <g transform="translate(200, 185)">
          {/* Saree lower drape / seated posture */}
          <path d="M30 110 C20 80, 80 80, 110 110 C90 120, 50 120, 30 110 Z" fill="#1E4D36" />
          <path d="M45 55 L35 110 L95 110 L85 55 Z" fill="#276241" />
          {/* Pallu over shoulder */}
          <path d="M45 55 Q65 75 80 110 Q50 95 45 55 Z" fill="#C5DFCF" />
          {/* Head & Neck */}
          <rect x="58" y="42" width="10" height="15" rx="3" fill="#C48E68" />
          <circle cx="63" cy="32" r="18" fill="#D8A07A" />
          {/* Hair Bun & Traditional Red Bindi */}
          <path d="M45 28 C45 14, 75 14, 78 30 C72 20, 54 20, 48 30 Z" fill="#2A1B12" />
          <circle cx="78" cy="32" r="8" fill="#2A1B12" />
          <circle cx="63" cy="27" r="2.2" fill="#DC2626" />
          {/* Facial expression: smiling eyes & friendly mouth */}
          <ellipse cx="58" cy="32" rx="1.5" ry="2" fill="#2A1B12" />
          <ellipse cx="68" cy="32" rx="1.5" ry="2" fill="#2A1B12" />
          <path d="M60 38 Q63 42 66 38" stroke="#8A4A28" strokeWidth="1.5" strokeLinecap="round" />
          {/* Arms holding Open Book */}
          <path d="M45 65 L28 85 L42 90 Z" fill="#D8A07A" />
          <path d="M85 65 L102 85 L88 90 Z" fill="#D8A07A" />
          {/* Open Book */}
          <g transform="translate(45, 75)">
            <path d="M0 8 C15 0, 25 5, 38 8 L38 28 C25 24, 15 22, 0 28 Z" fill="#FAF7F0" stroke="#1E4D36" strokeWidth="1.5" />
            <path d="M38 8 C51 5, 61 0, 76 8 L76 28 C61 22, 51 24, 38 28 Z" fill="#FAF7F0" stroke="#1E4D36" strokeWidth="1.5" />
            <line x1="8" y1="14" x2="30" y2="14" stroke="#5F9F7A" strokeWidth="1" />
            <line x1="8" y1="19" x2="26" y2="19" stroke="#5F9F7A" strokeWidth="1" />
            <line x1="46" y1="14" x2="68" y2="14" stroke="#5F9F7A" strokeWidth="1" />
            <line x1="46" y1="19" x2="64" y2="19" stroke="#5F9F7A" strokeWidth="1" />
          </g>
        </g>

        {/* Child 1 (Girl, left side seated, listening eagerly) */}
        <g transform="translate(130, 225)">
          <circle cx="30" cy="24" r="14" fill="#D8A07A" />
          {/* Hair in two braids */}
          <path d="M16 20 C18 10, 42 10, 44 20 Z" fill="#2A1B12" />
          <circle cx="14" cy="26" r="4" fill="#EF4444" />
          <circle cx="46" cy="26" r="4" fill="#EF4444" />
          {/* Kurti in bright yellow */}
          <path d="M15 40 L45 40 L50 75 L10 75 Z" fill="#F59E0B" rx="4" />
        </g>

        {/* Child 2 (Boy, front left, holding slate) */}
        <g transform="translate(70, 235)">
          <circle cx="30" cy="24" r="14" fill="#C48E68" />
          <path d="M16 20 C18 10, 42 10, 44 20 Z" fill="#2A1B12" />
          <path d="M15 40 L45 40 L48 75 L12 75 Z" fill="#3B82F6" rx="4" />
        </g>

        {/* Child 3 (Boy, right of teacher, pointing with joy) */}
        <g transform="translate(340, 220)">
          <circle cx="30" cy="24" r="14" fill="#D8A07A" />
          <path d="M16 18 C20 8, 40 8, 44 18 Z" fill="#2A1B12" />
          <path d="M15 40 L45 40 L48 75 L12 75 Z" fill="#EC4899" rx="4" />
        </g>

        {/* Child 4 (Boy, far right) */}
        <g transform="translate(410, 230)">
          <circle cx="30" cy="24" r="14" fill="#C48E68" />
          <path d="M16 18 C20 8, 40 8, 44 18 Z" fill="#2A1B12" />
          <path d="M15 40 L45 40 L48 75 L12 75 Z" fill="#10B981" rx="4" />
        </g>

        {/* Child 5 (Girl, right edge, smiling) */}
        <g transform="translate(475, 238)">
          <circle cx="26" cy="22" r="13" fill="#D8A07A" />
          <path d="M14 18 C18 9, 36 9, 40 18 Z" fill="#2A1B12" />
          <path d="M13 36 L39 36 L43 70 L9 70 Z" fill="#8B5CF6" rx="4" />
        </g>

        {/* Floating Language Speech Bubbles (Exact match to Mockup Screen 1) */}
        {/* Bubble 1: हिंदी (Above Teacher & Girl) */}
        <g transform="translate(100, 155)">
          <rect width="64" height="30" rx="15" fill="#FFFFFF" stroke="#CEE6D5" strokeWidth="2" filter="drop-shadow(0 2px 4px rgba(0,0,0,0.06))" />
          <text x="32" y="20" textAnchor="middle" fill="#1E4D36" fontSize="13" fontWeight="bold" fontFamily="Mukta, sans-serif">हिंदी</text>
        </g>

        {/* Bubble 2: संताली (Above teacher center) */}
        <g transform="translate(230, 120)">
          <rect width="70" height="32" rx="16" fill="#FFFFFF" stroke="#CEE6D5" strokeWidth="2" filter="drop-shadow(0 2px 4px rgba(0,0,0,0.06))" />
          <text x="35" y="21" textAnchor="middle" fill="#1E4D36" fontSize="14" fontWeight="bold" fontFamily="Mukta, sans-serif">संताली</text>
        </g>

        {/* Bubble 3: मुण्डारी (Above child 3) */}
        <g transform="translate(340, 145)">
          <rect width="72" height="30" rx="15" fill="#FFFFFF" stroke="#CEE6D5" strokeWidth="2" filter="drop-shadow(0 2px 4px rgba(0,0,0,0.06))" />
          <text x="36" y="20" textAnchor="middle" fill="#1E4D36" fontSize="13" fontWeight="bold" fontFamily="Mukta, sans-serif">मुण्डारी</text>
        </g>

        {/* Bubble 4: हो (Right above boy) */}
        <g transform="translate(435, 175)">
          <rect width="50" height="28" rx="14" fill="#FFFFFF" stroke="#CEE6D5" strokeWidth="2" filter="drop-shadow(0 2px 4px rgba(0,0,0,0.06))" />
          <text x="25" y="19" textAnchor="middle" fill="#1E4D36" fontSize="13" fontWeight="bold" fontFamily="Mukta, sans-serif">हो</text>
        </g>

        {/* Bubble 5: कुड़ुख (Right edge) */}
        <g transform="translate(495, 160)">
          <rect width="64" height="28" rx="14" fill="#FFFFFF" stroke="#CEE6D5" strokeWidth="2" filter="drop-shadow(0 2px 4px rgba(0,0,0,0.06))" />
          <text x="32" y="19" textAnchor="middle" fill="#1E4D36" fontSize="13" fontWeight="bold" fontFamily="Mukta, sans-serif">कुड़ुख</text>
        </g>
      </svg>
    </div>
  );
}

// Screen 8: Flashcard Girl doing Namaste (folded hands)
export function FlashcardNamasteIllustration({ className = "w-36 h-36" }) {
  return (
    <div className={`flex items-center justify-center select-none ${className}`}>
      <svg viewBox="0 0 160 160" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-full h-full">
        {/* Soft pastel background circle */}
        <circle cx="80" cy="80" r="74" fill="#FDF8E8" stroke="#F8EAC2" strokeWidth="2" />
        
        {/* Neck */}
        <rect x="74" y="66" width="12" height="16" rx="3" fill="#D8A07A" />

        {/* Head */}
        <circle cx="80" cy="48" r="24" fill="#E8B592" />
        
        {/* Hair with two side buns / ribbons */}
        <path d="M56 46 C58 22, 102 22, 104 46 C95 32, 65 32, 56 46 Z" fill="#2A1B12" />
        <circle cx="56" cy="42" r="8" fill="#2A1B12" />
        <circle cx="104" cy="42" r="8" fill="#2A1B12" />
        <circle cx="54" cy="40" r="4" fill="#EF4444" />
        <circle cx="106" cy="40" r="4" fill="#EF4444" />

        {/* Friendly Face */}
        <circle cx="72" cy="48" r="2.5" fill="#2A1B12" />
        <circle cx="88" cy="48" r="2.5" fill="#2A1B12" />
        <ellipse cx="80" cy="53" rx="1.5" ry="1" fill="#C48E68" />
        <path d="M74 57 Q80 63 86 57" stroke="#9A5832" strokeWidth="2.5" strokeLinecap="round" />
        {/* Bindi */}
        <circle cx="80" cy="40" r="2" fill="#DC2626" />

        {/* School Uniform / Kurti (Forest Green & White collar) */}
        <path d="M50 82 L110 82 L116 148 L44 148 Z" fill="#1E4D36" rx="8" />
        <path d="M72 82 L80 94 L88 82 Z" fill="#FAF7F0" />
        
        {/* Hands Folded in Namaste / Anjali Mudra */}
        <g transform="translate(68, 86)">
          <path d="M12 0 C9 4, 6 12, 6 22 L18 22 C18 12, 15 4, 12 0 Z" fill="#D8A07A" stroke="#C48E68" strokeWidth="1.5" />
          <line x1="12" y1="5" x2="12" y2="20" stroke="#A66842" strokeWidth="1.2" />
          {/* Sleeves */}
          <path d="M0 22 C2 16, 6 14, 9 14 L9 24 Z" fill="#276241" />
          <path d="M24 22 C22 16, 18 14, 15 14 L15 24 Z" fill="#276241" />
        </g>
      </svg>
    </div>
  );
}

// Screen 12: Offline Learning Screen Illustration (Village hut, tree, wifi symbol)
export function OfflineHutIllustration({ className = "w-48 h-48" }) {
  return (
    <div className={`flex items-center justify-center select-none ${className}`}>
      <svg viewBox="0 0 200 200" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-full h-full">
        {/* Soft circle ground */}
        <circle cx="100" cy="100" r="90" fill="#EAF5EE" stroke="#CEE6D5" strokeWidth="2" />

        {/* Ground grass hill */}
        <path d="M20 135 C60 120, 140 120, 180 135 L180 185 L20 185 Z" fill="#C5DFCF" />

        {/* Village Hut */}
        <g transform="translate(85, 80)">
          {/* Thatched Roof in Terracotta */}
          <path d="M0 35 L38 8 L76 35 Z" fill="#C05621" stroke="#9C4221" strokeWidth="2" />
          {/* Wall */}
          <rect x="8" y="35" width="60" height="38" fill="#FAF7F0" stroke="#D3C7B5" strokeWidth="2" rx="2" />
          {/* Wooden Door */}
          <rect x="28" y="44" width="16" height="29" fill="#7B341E" rx="3" />
          {/* Window */}
          <rect x="14" y="44" width="10" height="10" fill="#5F9F7A" rx="2" />
        </g>

        {/* Lush Tree next to hut */}
        <g transform="translate(42, 60)">
          <rect x="20" y="55" width="12" height="40" fill="#6F451F" rx="3" />
          <circle cx="26" cy="45" r="28" fill="#1E4D36" />
          <circle cx="38" cy="35" r="22" fill="#276241" />
          <circle cx="14" cy="35" r="20" fill="#357C54" />
        </g>

        {/* Wifi Radiating Signals Above with checkmark */}
        <g transform="translate(100, 38)">
          <path d="M-22 10 C-12 -2, 12 -2, 22 10" stroke="#1E4D36" strokeWidth="3.5" strokeLinecap="round" fill="none" opacity="0.3" />
          <path d="M-15 17 C-8 8, 8 8, 15 17" stroke="#1E4D36" strokeWidth="3.5" strokeLinecap="round" fill="none" opacity="0.6" />
          <path d="M-8 24 C-4 18, 4 18, 8 24" stroke="#1E4D36" strokeWidth="3.5" strokeLinecap="round" fill="none" />
          <circle cx="0" cy="30" r="3.5" fill="#1E4D36" />
        </g>
      </svg>
    </div>
  );
}

// Screen 6: Textbook Scanner Preview Graphic
export function TextbookScanIllustration({ className = "w-full h-44" }) {
  return (
    <div className={`relative flex items-center justify-center overflow-hidden rounded-xl border border-stone-200 bg-white shadow-xs select-none ${className}`}>
      <svg viewBox="0 0 320 180" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-full h-full">
        {/* Textbook page background */}
        <rect width="320" height="180" fill="#FFFDF8" />
        
        {/* Textbook border line & page header */}
        <rect x="12" y="10" width="296" height="160" rx="6" stroke="#E5DEC6" strokeWidth="1.5" />
        <text x="24" y="26" fill="#8A5A2B" fontSize="11" fontWeight="bold" fontFamily="Mukta, sans-serif">कक्षा २ • पाठ ४ • हमारी प्रकृति</text>

        {/* Smiling Sun illustration */}
        <circle cx="65" cy="65" r="22" fill="#FBBF24" />
        <circle cx="65" cy="65" r="26" stroke="#F59E0B" strokeWidth="1.5" strokeDasharray="3,3" />
        <circle cx="58" cy="62" r="2" fill="#78350F" />
        <circle cx="72" cy="62" r="2" fill="#78350F" />
        <path d="M60 71 Q65 76 70 71" stroke="#78350F" strokeWidth="1.5" strokeLinecap="round" />

        {/* Textbook printed lines */}
        <rect x="110" y="44" width="180" height="8" rx="4" fill="#1E4D36" opacity="0.85" />
        <rect x="110" y="58" width="165" height="8" rx="4" fill="#1E4D36" opacity="0.85" />
        <rect x="110" y="72" width="140" height="8" rx="4" fill="#1E4D36" opacity="0.85" />

        {/* Small nature hill & children walking in book illustration */}
        <path d="M12 145 C80 120, 200 125, 308 145 L308 170 L12 170 Z" fill="#EAF5EE" />
        <circle cx="160" cy="130" r="14" fill="#357C54" />
        <circle cx="190" cy="125" r="18" fill="#1E4D36" />
        
        {/* Scanning beam overlay animation effect */}
        <rect x="12" y="38" width="296" height="4" fill="#10B981" opacity="0.7" />
      </svg>
    </div>
  );
}

// Decorative tribal leaves for corners
export function TribalLeavesCorner({ className = "w-24 h-24" }) {
  return (
    <svg viewBox="0 0 100 100" fill="none" xmlns="http://www.w3.org/2000/svg" className={className}>
      <path d="M10 90 C30 70, 70 60, 90 10 C70 30, 40 40, 10 90 Z" fill="#1E4D36" opacity="0.2" />
      <path d="M10 90 C25 80, 50 75, 65 35 C50 55, 30 65, 10 90 Z" fill="#357C54" opacity="0.25" />
      <path d="M10 90 C20 85, 35 85, 45 60 C35 75, 20 80, 10 90 Z" fill="#5F9F7A" opacity="0.3" />
      <circle cx="85" cy="15" r="3" fill="#D97706" opacity="0.4" />
      <circle cx="62" cy="38" r="2.5" fill="#D97706" opacity="0.4" />
    </svg>
  );
}
