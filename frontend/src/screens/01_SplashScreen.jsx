import React from "react";
import cleanBackdropImg from "../assets/first_screen_clean_backdrop.jpg";
import { ArrowRight, LogIn, Sun, Moon } from "lucide-react";
import { playDevanagariAudio } from "../data/bhashaData";

export default function SplashScreen({
  onTeacherLogin,
  onStudentLogin,
  // Backward-compatible fallback props
  onStart,
  onLogin,
  selectedLanguage = "santhali",
  onSelectLanguage,
  isDarkMode = false,
  onToggleDarkMode,
}) {
  // Handlers
  const handleTeacherClick = () => {
    if (onTeacherLogin) onTeacherLogin();
    else if (onLogin) onLogin();
    else if (onStart) onStart();
  };

  const handleStudentClick = () => {
    if (onStudentLogin) onStudentLogin();
    else if (onStart) onStart();
  };

  const handleBubbleClick = (langId, text, audioGreeting) => {
    onSelectLanguage?.(langId);
    playDevanagariAudio(audioGreeting);
  };

  return (
    <div className="min-h-screen w-full bg-[#FAF7F0] dark:bg-[#0A1610] flex items-center justify-center p-3 sm:p-6 select-none overflow-x-hidden transition-colors duration-300">
      {/* Centered card container - beautifully sized and razor sharp */}
      <div className="relative w-full max-w-[580px] sm:max-w-[630px] md:max-w-[660px] bg-white dark:bg-[#12241A] rounded-3xl sm:rounded-[40px] shadow-card border border-stone-200/90 dark:border-[#224734] overflow-hidden">
        
        {/* Main Artwork Stage */}
        <div className="relative w-full aspect-[828/836] select-none">
          {/* Crystal Clear 2x Backdrop */}
          <img
            src={cleanBackdropImg}
            alt="भाषासेतु"
            className="w-full h-full object-contain pointer-events-none select-none dark:opacity-95"
          />

          {/* Top Left Theme Toggle */}
          <div
            className="absolute z-30"
            style={{
              top: "2.4%",
              left: "3.8%",
            }}
          >
            <button
              onClick={onToggleDarkMode}
              className="w-9 h-9 sm:w-10 sm:h-10 rounded-full bg-white/95 dark:bg-[#152D21] border border-stone-200 dark:border-[#2B573F] shadow-2xs hover:scale-105 active:scale-95 transition-all flex items-center justify-center text-stone-700 dark:text-emerald-300 cursor-pointer"
              title={isDarkMode ? "लाइट मोड" : "डार्क मोड"}
            >
              {isDarkMode ? <Sun className="w-4 h-4 sm:w-5 sm:h-5 text-amber-400" /> : <Moon className="w-4 h-4 sm:w-5 sm:h-5 text-forest-700" />}
            </button>
          </div>

          {/* Pure Devanagari App Name under Logo */}
          <div
            className="absolute left-0 right-0 flex items-center justify-center pointer-events-none"
            style={{ top: "17.4%" }}
          >
            <span className="text-xl sm:text-2xl md:text-[26px] font-black text-[#1B3E2B] font-hindi tracking-wide splash-text-dark">
              भाषासेतु
            </span>
          </div>

          {/* Crystal Clear Headline & Tagline */}
          <div
            className="absolute left-0 right-0 px-4 text-center pointer-events-none"
            style={{ top: "24.0%" }}
          >
            <h1 className="text-2xl sm:text-3xl md:text-[34px] font-black text-[#133221] font-hindi leading-[1.25] tracking-tight drop-shadow-2xs splash-text-dark">
              शिक्षक की ताकत,<br />
              हर बच्चे की समझ
            </h1>
            <p className="text-xs sm:text-sm md:text-[14.5px] font-semibold text-[#2D533C] font-hindi mt-1.5 sm:mt-2 splash-text-dark">
              भाषा के अंतर को कम करें, सीखने को आसान बनाएं।
            </p>
          </div>

          {/* Option 1: "शिक्षक लॉगिन" - Crisp Vector Button */}
          <div
            className="absolute z-20 flex items-center justify-center"
            style={{
              top: "43.5%",
              left: "22%",
              right: "22%",
            }}
          >
            <button
              onClick={handleTeacherClick}
              className="w-full h-11 sm:h-12 md:h-13 rounded-full bg-[#1F4733] hover:bg-[#173A29] text-white font-hindi font-bold text-sm sm:text-base md:text-lg flex items-center justify-between px-5 sm:px-6 shadow-md hover:shadow-lg active:scale-[0.98] transition-all cursor-pointer border border-emerald-900/40"
              title="शिक्षक लॉगिन"
            >
              <LogIn className="w-4 h-4 sm:w-5 sm:h-5 text-emerald-300" />
              <span>शिक्षक लॉगिन</span>
              <ArrowRight className="w-4 h-4 sm:w-5 sm:h-5 text-emerald-300" />
            </button>
          </div>

          {/* Option 2: "विद्यार्थी लॉगिन" - Crisp Vector Button (NO BAG!) */}
          <div
            className="absolute z-20 flex items-center justify-center"
            style={{
              top: "52.8%",
              left: "22%",
              right: "22%",
            }}
          >
            <button
              onClick={handleStudentClick}
              className="w-full h-11 sm:h-12 md:h-13 rounded-full bg-[#FCFAEE] dark:bg-[#12241A] border-2 border-[#1F4733] dark:border-emerald-500 hover:bg-[#F5F0E1] dark:hover:bg-[#1A3325] text-[#1F4733] dark:text-emerald-200 font-hindi font-bold text-sm sm:text-base md:text-lg flex items-center justify-between px-5 sm:px-6 shadow-xs hover:shadow-md active:scale-[0.98] transition-all cursor-pointer"
              title="विद्यार्थी लॉगिन"
            >
              <span className="w-4 h-4 sm:w-5 sm:h-5" />
              <span>विद्यार्थी लॉगिन</span>
              <ArrowRight className="w-4 h-4 sm:w-5 sm:h-5 text-[#1F4733] dark:text-emerald-400" />
            </button>
          </div>

          {/* Interactive Speech Bubbles with Audio Pronunciation */}
          <button
            onClick={() => handleBubbleClick("hindi", "हिंदी", "नमस्ते")}
            className="absolute rounded-full cursor-pointer hover:ring-2 hover:ring-emerald-600/70 active:scale-95 transition-all"
            style={{ top: "61.5%", left: "20.8%", width: "9.0%", height: "6.0%" }}
            title="हिंदी (नमस्ते)"
          />
          <button
            onClick={() => handleBubbleClick("santhali", "संथाली", "सगात")}
            className="absolute rounded-full cursor-pointer hover:ring-2 hover:ring-emerald-600/70 active:scale-95 transition-all"
            style={{ top: "61.5%", left: "31.0%", width: "11.5%", height: "6.0%" }}
            title="संथाली (सगात)"
          />
          <button
            onClick={() => handleBubbleClick("mundari", "मुंडारी", "जोहार")}
            className="absolute rounded-full cursor-pointer hover:ring-2 hover:ring-emerald-600/70 active:scale-95 transition-all"
            style={{ top: "61.5%", left: "44.0%", width: "11.0%", height: "6.0%" }}
            title="मुंडारी (जोहार)"
          />
          <button
            onClick={() => handleBubbleClick("ho", "हो", "जोहार")}
            className="absolute rounded-full cursor-pointer hover:ring-2 hover:ring-emerald-600/70 active:scale-95 transition-all"
            style={{ top: "61.5%", left: "57.2%", width: "8.2%", height: "6.0%" }}
            title="हो (जोहार)"
          />
          <button
            onClick={() => handleBubbleClick("kurukh", "कुरुख", "जोहार")}
            className="absolute rounded-full cursor-pointer hover:ring-2 hover:ring-emerald-600/70 active:scale-95 transition-all"
            style={{ top: "61.5%", left: "67.5%", width: "10.8%", height: "6.0%" }}
            title="कुरुख (जोहार)"
          />
        </div>

      </div>
    </div>
  );
}
