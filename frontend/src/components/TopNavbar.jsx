import React, { useState } from "react";
import {
  Menu,
  Bell,
  Languages,
  ChevronDown,
  Check,
  ArrowRightLeft,
  Moon,
  Sun,
  LogOut,
} from "lucide-react";
import { TEACHER_PROFILE, LANGUAGES } from "../data/bhashaData";

import teacherAnanyaImg from "../assets/teacher_ananya.png";

export default function TopNavbar({
  activeScreenTitle,
  selectedLanguage,
  onSelectLanguage,
  onOpenMobileMenu,
  onNavigate,
  onLogout,
  isDarkMode = false,
  onToggleDarkMode,
  currentUser = TEACHER_PROFILE,
}) {
  const [showNotifications, setShowNotifications] = useState(false);
  const [showLangMenu, setShowLangMenu] = useState(false);
  const [showProfileMenu, setShowProfileMenu] = useState(false);

  const currentLangObj = LANGUAGES.find((l) => l.id === selectedLanguage) || LANGUAGES[1];

  return (
    <header className="bg-[#FAF7F0] dark:bg-[#0E1F17] border-b border-stone-200/60 dark:border-[#224734] px-4 sm:px-8 py-3 flex items-center justify-between transition-colors duration-300">
      {/* Left: Mobile hamburger + Screen title matching mockup */}
      <div className="flex items-center gap-3">
        <button
          onClick={onOpenMobileMenu}
          className="p-1.5 rounded-xl border border-stone-200 dark:border-[#224734] text-stone-600 dark:text-stone-300 hover:bg-white dark:hover:bg-[#163526] lg:hidden cursor-pointer"
          title="मेनू खोलें"
        >
          <Menu className="w-5 h-5" />
        </button>

        <h1 className="text-xl sm:text-2xl font-black text-[#143D2B] dark:text-white font-hindi tracking-tight">
          {activeScreenTitle}
        </h1>
      </div>

      {/* Right: Theme Toggle + Language + Notification Bell + Teacher Profile */}
      <div className="flex items-center gap-2 sm:gap-4">
        {/* Dark Mode Theme Toggle */}
        <button
          onClick={onToggleDarkMode}
          className="p-2 rounded-xl border border-stone-200 dark:border-[#224734] hover:bg-white dark:hover:bg-[#163526] text-stone-600 dark:text-emerald-300 transition-colors cursor-pointer"
          title={isDarkMode ? "लाइट मोड पर स्विच करें" : "डार्क मोड पर स्विच करें"}
        >
          {isDarkMode ? <Sun className="w-5 h-5" /> : <Moon className="w-5 h-5" />}
        </button>

        {/* Language selector badge */}
        <div className="relative hidden sm:block">
          <button
            onClick={() => setShowLangMenu(!showLangMenu)}
            className="flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs sm:text-sm font-bold bg-white/90 dark:bg-[#14281E] border border-stone-200/80 dark:border-[#264D3B] hover:border-forest-400 text-stone-700 dark:text-stone-200 shadow-2xs font-hindi transition-colors cursor-pointer"
          >
            <span className="w-2 h-2 rounded-full bg-[#1B4D36] dark:bg-emerald-400" />
            <span>हिंदी ⇄ {currentLangObj.name}</span>
            <ChevronDown className="w-3 h-3 text-stone-400" />
          </button>

          {showLangMenu && (
            <div className="absolute right-0 mt-2 w-48 bg-white dark:bg-[#152D21] rounded-2xl shadow-card border border-stone-200 dark:border-[#2B573F] p-2 z-50 animate-in fade-in zoom-in-95">
              <div className="px-2 py-1 text-[11px] font-bold text-stone-400 dark:text-stone-500 font-hindi">कक्षा की भाषा</div>
              {LANGUAGES.filter(l => l.id !== "hindi").map(l => (
                <button
                  key={l.id}
                  onClick={() => {
                    onSelectLanguage(l.id);
                    setShowLangMenu(false);
                  }}
                  className={`w-full flex items-center justify-between px-2.5 py-1.5 rounded-xl text-xs font-hindi cursor-pointer ${
                    selectedLanguage === l.id ? "bg-pastel-green dark:bg-[#1E4330] text-forest-900 dark:text-emerald-200 font-bold" : "text-stone-700 dark:text-stone-300 hover:bg-stone-50 dark:hover:bg-[#183526]"
                  }`}
                >
                  <span>{l.name}</span>
                  {selectedLanguage === l.id && <Check className="w-3.5 h-3.5 text-forest-700 dark:text-emerald-400" />}
                </button>
              ))}
            </div>
          )}
        </div>

        {/* Notification Bell matching mockup */}
        <div className="relative">
          <button
            onClick={() => setShowNotifications(!showNotifications)}
            className="p-2 rounded-full hover:bg-stone-200/50 dark:hover:bg-[#163526] text-[#1B4D36] dark:text-emerald-300 transition-colors relative cursor-pointer"
            title="सूचनाएं"
          >
            <Bell className="w-5 h-5" />
            <span className="absolute top-2 right-2 w-2 h-2 rounded-full bg-[#1B4D36] dark:bg-emerald-400" />
          </button>

          {showNotifications && (
            <div className="absolute right-0 mt-2 w-72 bg-white dark:bg-[#132A1E] rounded-2xl shadow-card border border-stone-200 dark:border-[#224734] p-3 z-50 animate-in fade-in zoom-in-95">
              <div className="flex items-center justify-between pb-2 border-b border-stone-100 dark:border-[#224734] font-hindi">
                <span className="text-xs font-bold text-forest-900 dark:text-white">अधिसूचनाएँ</span>
                <span className="text-[10px] text-[#1B4D36] dark:text-emerald-400 font-bold">2 नई</span>
              </div>
              <div className="mt-2 space-y-2 text-xs font-hindi">
                <div className="p-2 bg-pastel-green dark:bg-[#1A3A2A] rounded-xl text-forest-900 dark:text-emerald-200">
                  <div className="font-bold">✓ कक्षा 2 कार्यपत्रक तैयार</div>
                  <p className="text-[11px] text-stone-600 dark:text-stone-300 mt-0.5">मात्रा पहचान के 10 प्रश्न तैयार हैं।</p>
                </div>
                <div className="p-2 bg-pastel-amber dark:bg-amber-950/40 rounded-xl text-amber-900 dark:text-amber-200">
                  <div className="font-bold">⚠️ विद्यार्थी अलर्ट: रवि</div>
                  <p className="text-[11px] text-stone-600 dark:text-stone-300 mt-0.5">मात्रा पहचान में भाषा सहायता आवश्यक।</p>
                </div>
              </div>
            </div>
          )}
        </div>

        {/* Teacher Avatar and Profile Badge matching exact mockup */}
        <div className="relative">
          <button
            onClick={() => setShowProfileMenu(!showProfileMenu)}
            className="cursor-pointer group flex items-center gap-2.5 py-1 px-2 rounded-2xl hover:bg-white/70 dark:hover:bg-[#163526] transition-all"
            title={`शिक्षक प्रोफाइल (${currentUser?.name || "अनन्या शर्मा"})`}
          >
            <div className="w-10 h-10 rounded-full bg-stone-200 dark:bg-[#1B3626] border-2 border-white dark:border-[#224734] shadow-2xs overflow-hidden shrink-0 flex items-center justify-center font-bold text-lg text-forest-900 dark:text-emerald-300">
              {currentUser?.avatar && currentUser.avatar.length <= 4 ? (
                <span>{currentUser.avatar}</span>
              ) : (
                <img
                  src={teacherAnanyaImg}
                  alt={currentUser?.name || "शिक्षक"}
                  className="w-full h-full object-cover"
                />
              )}
            </div>
            <div className="hidden md:flex flex-col text-left font-hindi">
              <span className="text-sm font-black text-[#143D2B] dark:text-white leading-tight">
                {currentUser?.name || "अनन्या शर्मा"}
              </span>
              <span className="text-xs text-stone-500 dark:text-stone-400 leading-tight">
                {currentUser?.title || "प्राथमिक शिक्षक"}
              </span>
            </div>
            <ChevronDown className="w-4 h-4 text-stone-500 dark:text-stone-400 group-hover:text-forest-800 transition-colors" />
          </button>

          {showProfileMenu && (
            <div className="absolute right-0 mt-2 w-56 bg-white dark:bg-[#152D21] rounded-2xl shadow-card border border-stone-200 dark:border-[#2B573F] p-2 z-50 animate-in fade-in zoom-in-95 font-hindi">
              <div className="px-3 py-1.5 border-b border-stone-100 dark:border-[#264D3B] mb-1">
                <p className="text-xs font-black text-forest-900 dark:text-white">{currentUser?.name || "अनन्या शर्मा"}</p>
                <p className="text-[11px] text-stone-500 dark:text-stone-400">{currentUser?.school || "प्राथमिक शिक्षक (कक्षा 1-5)"}</p>
              </div>
              <button
                onClick={() => {
                  onNavigate("settings");
                  setShowProfileMenu(false);
                }}
                className="w-full text-left px-3 py-2 rounded-xl hover:bg-stone-100 dark:hover:bg-[#1C3B2C] text-stone-700 dark:text-stone-200 text-xs sm:text-sm font-bold flex items-center gap-2 cursor-pointer"
              >
                <span>⚙️ सेटिंग्स</span>
              </button>
              <button
                onClick={() => {
                  setShowProfileMenu(false);
                  if (window.confirm("क्या आप शिक्षक पोर्टल से लॉगआउट करना चाहते हैं?")) {
                    onLogout ? onLogout() : onNavigate("splash");
                  }
                }}
                className="w-full text-left px-3 py-2 rounded-xl hover:bg-rose-50 dark:hover:bg-rose-950/40 text-rose-600 dark:text-rose-400 text-xs sm:text-sm font-bold flex items-center gap-2 cursor-pointer"
              >
                <LogOut className="w-4 h-4" />
                <span>लॉगआउट</span>
              </button>
            </div>
          )}
        </div>
      </div>
    </header>
  );
}
