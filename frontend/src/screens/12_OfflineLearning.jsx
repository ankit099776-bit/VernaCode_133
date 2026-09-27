import React, { useState } from "react";
import {
  Wifi,
  WifiOff,
  RefreshCw,
  HardDrive,
  CheckCircle2,
  Download,
  ShieldCheck,
  Smartphone,
  Sparkles,
} from "lucide-react";
import { OfflineHutIllustration } from "../components/Illustrations";
import { OFFLINE_STORAGE_DATA } from "../data/bhashaData";

export default function OfflineLearning({
  isOffline = true,
  onToggleOffline,
}) {
  const [isSyncing, setIsSyncing] = useState(false);
  const [syncSuccess, setSyncSuccess] = useState(false);
  const [lastSyncTime, setLastSyncTime] = useState(OFFLINE_STORAGE_DATA.lastSynced);

  const handleSync = () => {
    setIsSyncing(true);
    setSyncSuccess(false);
    setTimeout(() => {
      setIsSyncing(false);
      setSyncSuccess(true);
      setLastSyncTime("अभी-अभी (4 सितम्बर 2026, दोपहर 3:40 बजे)");
      setTimeout(() => setSyncSuccess(false), 3000);
    }, 1800);
  };

  return (
    <div className="p-4 sm:p-6 lg:p-8 space-y-6 max-w-5xl mx-auto font-hindi select-none">
      {/* Top Banner Notice for Jharkhand Rural Connectivity */}
      <div className="bg-pastel-green/60 p-4 rounded-3xl border border-pastel-greenBorder flex flex-col sm:flex-row items-center justify-between gap-3">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-2xl bg-white text-forest-800 flex items-center justify-center shrink-0 shadow-2xs">
            <Smartphone className="w-5 h-5" />
          </div>
          <div>
            <h3 className="font-extrabold text-sm text-forest-900">
              ऑफलाइन-प्रथम प्रणाली संरचना
            </h3>
            <p className="text-xs text-forest-700">
              कमजोर नेटवर्क वाले सुदूर विद्यालयों और 2 जीबी रैम वाले सरकारी टैबलेट के लिए अनुकूलित।
            </p>
          </div>
        </div>

        <button
          onClick={onToggleOffline}
          className={`px-4 py-2 rounded-xl text-xs font-bold transition-all shrink-0 ${
            isOffline
              ? "bg-amber-100 text-amber-900 border border-amber-300 hover:bg-amber-200"
              : "bg-emerald-100 text-emerald-900 border border-emerald-300 hover:bg-emerald-200"
          }`}
        >
          {isOffline ? "सिम्युलेट: ऑनलाइन करें" : "सिम्युलेट: ऑफलाइन करें"}
        </button>
      </div>

      {/* Main 2-Card Layout matching Mockup Screen 11 */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Left Card: Status matching Mockup Screen 11 */}
        <div className="bg-white rounded-3xl p-6 sm:p-8 border border-stone-200/90 shadow-card flex flex-col items-center text-center justify-between space-y-4">
          {/* Graphic Illustration */}
          <div className="w-full flex justify-center py-2">
            <OfflineHutIllustration className="w-44 h-44" />
          </div>

          <div className="space-y-2">
            <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-pastel-amber border border-pastel-amberBorder text-amber-900 text-xs font-bold">
              {isOffline ? <WifiOff className="w-3.5 h-3.5" /> : <Wifi className="w-3.5 h-3.5 text-emerald-600" />}
              <span>{isOffline ? "ऑफलाइन मोड सक्रिय" : "इंटरनेट से जुड़ा है"}</span>
            </div>

            <h3 className="text-2xl font-extrabold text-forest-900">
              {isOffline ? "आप अभी ऑफ़लाइन हैं" : "आप ऑनलाइन हैं"}
            </h3>

            <p className="text-xs sm:text-sm text-stone-600 max-w-sm mx-auto leading-relaxed">
              चिंता न करें! आपके सभी सहेजे गए पाठ, कार्यपत्रक और शब्द कार्ड अभी भी डिवाइस में सुरक्षित उपलब्ध हैं।
            </p>

            <p className="text-[11px] text-stone-600 font-semibold pt-1">
              अंतिम बार सिंक किया गया: <span className="font-bold text-stone-700">{lastSyncTime}</span>
            </p>
          </div>

          {/* 2 Buttons matching Mockup */}
          <div className="flex items-center justify-center gap-3 w-full pt-2">
            <button
              onClick={handleSync}
              disabled={isSyncing}
              className="flex-1 py-2.5 rounded-2xl bg-forest-700 hover:bg-forest-800 text-white font-bold text-xs shadow-card flex items-center justify-center gap-1.5 transition-all"
            >
              <RefreshCw className={`w-3.5 h-3.5 ${isSyncing ? "animate-spin" : ""}`} />
              <span>{isSyncing ? "सिंक हो रहा है..." : "अभी सिंक करें"}</span>
            </button>

            <button
              onClick={handleSync}
              className="px-5 py-2.5 rounded-2xl bg-stone-100 hover:bg-stone-200 text-stone-800 font-bold text-xs transition-colors"
            >
              पुनः प्रयास करें
            </button>
          </div>

          {syncSuccess && (
            <div className="text-xs font-bold text-emerald-700 bg-emerald-50 px-3 py-1.5 rounded-xl border border-emerald-200">
              ✓ सभी नई शिक्षण सामग्रियां डिवाइस पर सफलतापूर्वक सिंक हो गईं!
            </div>
          )}
        </div>

        {/* Right Card: Offline Resources & Storage Usage matching Mockup Screen 11 */}
        <div className="bg-white rounded-3xl p-6 sm:p-8 border border-stone-200/90 shadow-card flex flex-col justify-between space-y-6">
          <div className="space-y-4">
            <div className="flex items-center justify-between border-b border-stone-100 pb-3">
              <h3 className="font-extrabold text-base text-forest-900">
                ऑफलाइन उपलब्ध सामग्री
              </h3>
              <span className="text-[11px] font-bold text-forest-700 bg-pastel-green px-2.5 py-0.5 rounded-full">
                स्थानीय कैशे
              </span>
            </div>

            {/* Resources List matching Mockup */}
            <div className="space-y-2.5">
              {OFFLINE_STORAGE_DATA.resources.map((item, idx) => (
                <div
                  key={idx}
                  className="flex items-center justify-between p-3 rounded-2xl bg-stone-50 border border-stone-200/60"
                >
                  <div className="flex items-center gap-2.5">
                    <span className="w-2 h-2 rounded-full bg-forest-600" />
                    <span className="text-xs sm:text-sm font-bold text-stone-800">
                      {item.type}
                    </span>
                  </div>
                  <div className="flex items-center gap-2">
                    <span className="text-xs font-bold text-stone-600 font-numeric">
                      {item.size}
                    </span>
                    <span className="text-xs font-black text-forest-900 bg-white px-2.5 py-0.5 rounded-lg border border-stone-200 font-numeric">
                      {item.count}
                    </span>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Storage Usage Bar matching Mockup Screen 11 */}
          <div className="p-4 rounded-2xl bg-cream-50 border border-stone-200 space-y-2">
            <div className="flex items-center justify-between text-xs font-bold text-stone-700">
              <span>भंडारण उपयोग</span>
              <span className="font-numeric text-forest-900">
                {OFFLINE_STORAGE_DATA.usedStorageMB} एमबी / {OFFLINE_STORAGE_DATA.totalStorageMB} एमबी
              </span>
            </div>

            {/* Progress Bar */}
            <div className="w-full bg-stone-200 rounded-full h-2.5 overflow-hidden">
              <div
                className="bg-forest-700 h-full rounded-full transition-all duration-500"
                style={{ width: `${OFFLINE_STORAGE_DATA.percentage}%` }}
              />
            </div>

            <div className="flex items-center justify-between text-[11px] text-stone-600 font-medium">
              <span>16% उपयोग हुआ</span>
              <span>1.7 जीबी खाली स्थान उपलब्ध</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
