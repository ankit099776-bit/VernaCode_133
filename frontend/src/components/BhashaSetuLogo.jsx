import React from "react";

export default function BhashaSetuLogo({
  size = "md", // "sm" | "md" | "lg" | "xl"
  variant = "horizontal", // "horizontal" | "vertical" | "icon"
  showSubtitle = true,
  className = "",
}) {
  const iconSizes = {
    sm: "w-7 h-7",
    md: "w-9 h-9",
    lg: "w-12 h-12",
    xl: "w-16 h-16",
  };

  const titleSizes = {
    sm: "text-base",
    md: "text-lg",
    lg: "text-2xl",
    xl: "text-3xl",
  };

  const subtitleSizes = {
    sm: "text-[10px]",
    md: "text-xs",
    lg: "text-sm",
    xl: "text-base",
  };

  const IconSVG = (
    <div className={`relative flex items-center justify-center shrink-0 ${iconSizes[size]}`}>
      <svg
        viewBox="0 0 64 64"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        className="w-full h-full drop-shadow-xs"
      >
        {/* Soft circle glow background */}
        <circle cx="32" cy="32" r="30" fill="#EAF5EE" stroke="#CEE6D5" strokeWidth="1.5" />
        
        {/* Bridge arch at bottom */}
        <path
          d="M12 46 C20 38, 44 38, 52 46"
          stroke="#1E4D36"
          strokeWidth="3.5"
          strokeLinecap="round"
        />
        {/* Bridge pillars / rays */}
        <line x1="20" y1="41" x2="20" y2="48" stroke="#357C54" strokeWidth="2" strokeLinecap="round" />
        <line x1="28" y1="39" x2="28" y2="48" stroke="#357C54" strokeWidth="2" strokeLinecap="round" />
        <line x1="36" y1="39" x2="36" y2="48" stroke="#357C54" strokeWidth="2" strokeLinecap="round" />
        <line x1="44" y1="41" x2="44" y2="48" stroke="#357C54" strokeWidth="2" strokeLinecap="round" />

        {/* Central Tree Trunk growing from the bridge */}
        <path
          d="M32 40 L32 24"
          stroke="#8A5A2B"
          strokeWidth="3.5"
          strokeLinecap="round"
        />
        {/* Branches */}
        <path
          d="M32 30 C27 26, 21 27, 18 22"
          stroke="#8A5A2B"
          strokeWidth="2.5"
          strokeLinecap="round"
        />
        <path
          d="M32 30 C37 26, 43 27, 46 22"
          stroke="#8A5A2B"
          strokeWidth="2.5"
          strokeLinecap="round"
        />

        {/* Tree Canopy / Leaves in forest greens and warm gold */}
        <circle cx="32" cy="17" r="7" fill="#1E4D36" />
        <circle cx="21" cy="21" r="5.5" fill="#357C54" />
        <circle cx="43" cy="21" r="5.5" fill="#357C54" />
        <circle cx="26" cy="14" r="5" fill="#5F9F7A" />
        <circle cx="38" cy="14" r="5" fill="#5F9F7A" />

        {/* Cultural tribal dots / knowledge spark */}
        <circle cx="32" cy="9" r="2" fill="#D97706" />
        <circle cx="16" cy="16" r="1.5" fill="#D97706" />
        <circle cx="48" cy="16" r="1.5" fill="#D97706" />
        <circle cx="32" cy="28" r="1.5" fill="#FFFFFF" />
      </svg>
    </div>
  );

  if (variant === "icon") {
    return IconSVG;
  }

  if (variant === "vertical") {
    return (
      <div className={`flex flex-col items-center text-center ${className}`}>
        {IconSVG}
        <div className="mt-2">
          <div className={`font-black tracking-tight text-forest-900 font-hindi ${titleSizes[size]}`}>
            भाषासेतु <span className="text-forest-600">एआई</span>
          </div>
          {showSubtitle && (
            <p className={`font-medium text-forest-700 font-hindi mt-0.5 ${subtitleSizes[size]}`}>
              हर बच्चे तक, उसकी भाषा में शिक्षा
            </p>
          )}
        </div>
      </div>
    );
  }

  return (
    <div className={`flex items-center gap-3 ${className}`}>
      {IconSVG}
      <div className="flex flex-col leading-tight">
        <div className={`font-black tracking-tight text-forest-900 font-hindi ${titleSizes[size]}`}>
          भाषासेतु <span className="text-forest-600">एआई</span>
        </div>
        {showSubtitle && (
          <span className={`font-semibold text-forest-700 font-hindi ${subtitleSizes[size]}`}>
            हर बच्चे तक, उसकी भाषा में शिक्षा
          </span>
        )}
      </div>
    </div>
  );
}
