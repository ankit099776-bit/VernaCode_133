import React from 'react';
import { Wifi, BatteryMedium, Signal } from 'lucide-react';

export default function PhoneMockup({ 
  screenNumber, 
  title, 
  subtitle, 
  children, 
  className = "" 
}) {
  return (
    <div className={`flex flex-col items-center select-none ${className}`}>
      {/* Screen Title & Subtitle Badge matching the uploaded image above the phone */}
      {(screenNumber || title) && (
        <div className="w-full max-w-[345px] sm:max-w-[365px] mb-2 px-1 text-left">
          <div className="flex items-center gap-2">
            {screenNumber && (
              <span className="inline-flex items-center justify-center w-5 h-5 rounded-md bg-[#75BDE0] text-white text-[11px] font-black shrink-0 shadow-xs">
                {screenNumber}
              </span>
            )}
            <h3 className="font-extrabold text-stone-950 text-[13px] sm:text-sm leading-tight font-sans">
              {title}
            </h3>
          </div>
          {subtitle && (
            <p className="text-[11px] sm:text-xs text-stone-500 font-medium ml-7 mt-0.5 leading-tight font-sans">
              {subtitle}
            </p>
          )}
        </div>
      )}

      {/* Phone Hardware Container matching low-end Android tablet / phone */}
      <div className="w-[340px] sm:w-[360px] h-[680px] bg-[#f8fafc] rounded-[38px] border-[7px] border-stone-800 shadow-xl flex flex-col overflow-hidden relative">
        
        {/* Dynamic Island / Speaker Notch */}
        <div className="absolute top-2 left-1/2 -translate-x-1/2 w-24 h-3.5 bg-stone-800 rounded-full z-30 flex items-center justify-center">
          <div className="w-2 h-2 rounded-full bg-stone-900 border border-stone-700 mr-2" />
          <div className="w-9 h-1 bg-stone-700 rounded-full" />
        </div>

        {/* Mobile Status Bar (9:30, Signal, WiFi, Battery) */}
        <div className="h-9 pt-2 px-5 flex items-center justify-between text-xs font-semibold text-slate-700 shrink-0 bg-[#f8fafc] z-20">
          <span className="font-bold text-[11px] text-stone-800 font-mono">9:30</span>
          <div className="flex items-center gap-1.5 text-stone-700">
            <Signal className="w-3 h-3" />
            <Wifi className="w-3 h-3" />
            <div className="flex items-center gap-0.5">
              <BatteryMedium className="w-4 h-4 fill-stone-800" />
            </div>
          </div>
        </div>

        {/* Screen Content Body */}
        <div className="flex-1 overflow-y-auto overflow-x-hidden relative bg-[#f8fafc] flex flex-col">
          {children}
        </div>

        {/* Bottom Home Indicator */}
        <div className="h-3.5 bg-[#f8fafc] flex items-center justify-center shrink-0">
          <div className="w-24 h-1 bg-stone-400/80 rounded-full" />
        </div>

      </div>
    </div>
  );
}
