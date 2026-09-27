import React, { useState } from "react";
import {
  User,
  Languages,
  Moon,
  Sun,
  Bell,
  HardDrive,
  Shield,
  HelpCircle,
  LogOut,
  Check,
  Edit2,
  Sparkles,
} from "lucide-react";
import { TEACHER_PROFILE, LANGUAGES } from "../data/bhashaData";

export default function Settings({
  selectedLanguage = "santhali",
  onSelectLanguage,
  onLogout,
  isDarkMode = false,
  onToggleDarkMode,
}) {
  const [activeTab, setActiveTab] = useState("profile");
  const [appLang, setAppLang] = useState("hindi");
  const [notifyClasses, setNotifyClasses] = useState(true);
  const [autoDownload, setAutoDownload] = useState(true);
  const [isEditingProfile, setIsEditingProfile] = useState(false);
  const [teacherName, setTeacherName] = useState(TEACHER_PROFILE.name);

  const SETTINGS_MENU = [
    { id: "profile", label: "प्रोफाइल", icon: User },
    { id: "language", label: "भाषा प्राथमिकता", icon: Languages },
    { id: "theme", label: "थीम", icon: Moon },
    { id: "notifications", label: "सूचनाएं", icon: Bell },
    { id: "downloads", label: "ऑफलाइन डाउनलोड", icon: HardDrive },
    { id: "privacy", label: "डेटा और गोपनीयता", icon: Shield },
    { id: "help", label: "सहायता और समर्थन", icon: HelpCircle },
    { id: "logout", label: "लॉगआउट", icon: LogOut, danger: true },
  ];

  return (
    <div className="p-4 sm:p-6 lg:p-8 space-y-6 max-w-5xl mx-auto font-hindi select-none">
      <div className="pb-1">
        <h2 className="text-xl sm:text-2xl font-extrabold text-forest-900 dark:text-white">
          सेटिंग्स व प्राथमिकताएं
        </h2>
        <p className="text-xs sm:text-sm text-stone-500 dark:text-stone-400 mt-0.5">
          शिक्षक खाता, कक्षा भाषा और ऐप सेटिंग्स प्रबंधित करें।
        </p>
      </div>

      {/* Main 2-Column Interface matching Mockup Screen 12 */}
      <div className="grid grid-cols-1 md:grid-cols-12 gap-6">
        {/* Left Settings Sidebar (4 cols) */}
        <div className="md:col-span-4 bg-white dark:bg-[#12241A] rounded-3xl p-3 border border-stone-200/90 dark:border-[#224734] shadow-2xs space-y-1">
          {SETTINGS_MENU.map((item) => {
            const Icon = item.icon;
            const isActive = activeTab === item.id;
            return (
              <button
                key={item.id}
                onClick={() => {
                  if (item.id === "logout") {
                    if (window.confirm("क्या आप सचमुच लॉगआउट करना चाहते हैं?")) {
                      onLogout?.();
                    }
                  } else {
                    setActiveTab(item.id);
                  }
                }}
                className={`w-full flex items-center gap-3 px-3.5 py-2.5 rounded-2xl text-xs sm:text-sm font-bold transition-all text-left cursor-pointer ${
                  item.danger
                    ? "text-rose-600 dark:text-rose-400 hover:bg-rose-50 dark:hover:bg-rose-950/40"
                    : isActive
                    ? "bg-pastel-green dark:bg-[#1A3A2A] text-forest-900 dark:text-emerald-200 border border-pastel-greenBorder dark:border-[#2F5E45] shadow-2xs"
                    : "text-stone-700 dark:text-stone-300 hover:bg-stone-50 dark:hover:bg-[#172E22]"
                }`}
              >
                <Icon
                  className={`w-4 h-4 ${
                    item.danger ? "text-rose-500" : isActive ? "text-forest-700 dark:text-emerald-400" : "text-stone-400 dark:text-stone-500"
                  }`}
                />
                <span>{item.label}</span>
              </button>
            );
          })}
        </div>

        {/* Right Settings Pane (8 cols) matching Mockup Screen 12 */}
        <div className="md:col-span-8 bg-white dark:bg-[#12241A] rounded-3xl p-6 sm:p-7 border border-stone-200/90 dark:border-[#224734] shadow-card space-y-6">
          {/* Section 1: मेरी प्रोफाइल */}
          <div>
            <h3 className="font-extrabold text-base text-forest-900 dark:text-white mb-4 pb-2 border-b border-stone-100 dark:border-[#224734]">
              मेरी प्रोफाइल
            </h3>

            <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 p-4 rounded-3xl bg-cream-50/70 dark:bg-[#162A1E] border border-stone-200/80 dark:border-[#244A36]">
              <div className="flex items-center gap-4">
                <div className="w-16 h-16 rounded-2xl bg-pastel-green dark:bg-[#1E4330] text-3xl flex items-center justify-center border-2 border-pastel-greenBorder dark:border-[#2F5E45] shadow-2xs">
                  {TEACHER_PROFILE.avatar}
                </div>
                <div>
                  {isEditingProfile ? (
                    <input
                      type="text"
                      value={teacherName}
                      onChange={(e) => setTeacherName(e.target.value)}
                      className="text-base font-extrabold border rounded-lg px-2 py-1 bg-white"
                    />
                  ) : (
                    <h4 className="text-lg font-extrabold text-forest-900">
                      {teacherName}
                    </h4>
                  )}
                  <p className="text-xs font-semibold text-stone-600 mt-0.5">
                    {TEACHER_PROFILE.school}
                  </p>
                  <p className="text-[11px] font-bold text-forest-700 mt-0.5">
                    {TEACHER_PROFILE.classes} • {TEACHER_PROFILE.subject}
                  </p>
                </div>
              </div>

              <button
                onClick={() => setIsEditingProfile(!isEditingProfile)}
                className="px-4 py-2 rounded-xl bg-white hover:bg-stone-50 border border-stone-300 text-stone-800 text-xs font-bold shadow-2xs transition-colors shrink-0"
              >
                {isEditingProfile ? "सहेजें" : "प्रोफाइल संपादित करें"}
              </button>
            </div>
          </div>

          {/* Section 2: भाषा प्राथमिकता */}
          <div>
            <h3 className="font-extrabold text-base text-forest-900 mb-3 pb-2 border-b border-stone-100">
              भाषा प्राथमिकता
            </h3>

            <div className="space-y-2">
              <label
                onClick={() => setAppLang("hindi")}
                className={`flex items-center justify-between p-3 rounded-2xl border cursor-pointer transition-colors ${
                  appLang === "hindi"
                    ? "bg-pastel-green/40 border-forest-600 text-forest-900 font-bold"
                    : "border-stone-200 hover:bg-stone-50 text-stone-700"
                }`}
              >
                <div className="text-xs sm:text-sm">
                  हिंदी (डिफ़ॉल्ट शिक्षण भाषा)
                </div>
                {appLang === "hindi" && <Check className="w-4 h-4 text-forest-700" />}
              </label>

              <label
                onClick={() => setAppLang("english")}
                className={`flex items-center justify-between p-3 rounded-2xl border cursor-pointer transition-colors ${
                  appLang === "english"
                    ? "bg-pastel-green/40 border-forest-600 text-forest-900 font-bold"
                    : "border-stone-200 hover:bg-stone-50 text-stone-700"
                }`}
              >
                <div className="text-xs sm:text-sm">
                  अंग्रेजी (वैकल्पिक संदर्भ)
                </div>
                {appLang === "english" && <Check className="w-4 h-4 text-forest-700" />}
              </label>
            </div>
          </div>

          {/* Section 3: थीम */}
          <div>
            <h3 className="font-extrabold text-base text-forest-900 dark:text-white mb-3 pb-2 border-b border-stone-100 dark:border-[#224734]">
              थीम व दृश्य रूप
            </h3>

            <div className="grid grid-cols-2 gap-3">
              <button
                type="button"
                onClick={() => onToggleDarkMode?.(false)}
                className={`p-3.5 rounded-2xl border flex items-center justify-center gap-2 text-xs sm:text-sm font-bold transition-all cursor-pointer ${
                  !isDarkMode
                    ? "bg-[#1E4D36] text-white border-forest-800 shadow-xs"
                    : "bg-stone-50 dark:bg-[#172E22] text-stone-700 dark:text-stone-300 border-stone-200 dark:border-[#264D3B] hover:bg-white dark:hover:bg-[#1E3C2C]"
                }`}
              >
                <Sun className="w-4 h-4 text-amber-400" />
                <span>लाइट मोड</span>
              </button>

              <button
                type="button"
                onClick={() => onToggleDarkMode?.(true)}
                className={`p-3.5 rounded-2xl border flex items-center justify-center gap-2 text-xs sm:text-sm font-bold transition-all cursor-pointer ${
                  isDarkMode
                    ? "bg-[#1E4D36] text-white border-emerald-500 shadow-xs"
                    : "bg-stone-50 dark:bg-[#172E22] text-stone-700 dark:text-stone-300 border-stone-200 dark:border-[#264D3B] hover:bg-white dark:hover:bg-[#1E3C2C]"
                }`}
              >
                <Moon className="w-4 h-4 text-emerald-300" />
                <span>डार्क मोड</span>
              </button>
            </div>
          </div>

          {/* Section 4: सूचनाएं */}
          <div>
            <h3 className="font-extrabold text-base text-forest-900 mb-3 pb-2 border-b border-stone-100">
              सूचनाएं
            </h3>

            <div className="flex items-center justify-between p-3.5 rounded-2xl bg-stone-50 border border-stone-200/80">
              <div>
                <div className="text-xs sm:text-sm font-bold text-stone-900">
                  कक्षा संबंधी सूचनाएं
                </div>
                <div className="text-[11px] text-stone-500">
                  नए पाठ, कार्यपत्रक और छात्र अलर्ट उपलब्ध होने पर तुरंत सूचना दिखाएं
                </div>
              </div>

              <input
                type="checkbox"
                checked={notifyClasses}
                onChange={(e) => setNotifyClasses(e.target.checked)}
                className="w-5 h-5 accent-forest-700 cursor-pointer"
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
