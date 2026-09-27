import React from "react";
import { ChevronLeft, ChevronRight, LayoutGrid, CheckCircle } from "lucide-react";

export const ALL_SCREENS = [
  { id: "splash", num: 1, title: "स्प्लैश स्क्रीन", short: "1. स्प्लैश" },
  { id: "login", num: 2, title: "शिक्षक लॉगिन", short: "2. लॉगिन" },
  { id: "language-select", num: 3, title: "भाषा चयन", short: "3. भाषा चुनें" },
  { id: "dashboard", num: 4, title: "शिक्षक डैशबोर्ड", short: "4. डैशबोर्ड" },
  { id: "live-translate", num: 5, title: "लाइव अनुवाद", short: "5. अनुवाद" },
  { id: "textbook-scanner", num: 6, title: "पाठ्यपुस्तक स्कैनर", short: "6. स्कैनर" },
  { id: "worksheet-generator", num: 7, title: "कार्यपत्रक बनाएं", short: "7. कार्यपत्रक" },
  { id: "flashcards", num: 8, title: "शब्द कार्ड (फ़्लैशकार्ड)", short: "8. शब्द कार्ड" },
  { id: "curriculum", num: 9, title: "पाठ्यक्रम चयन", short: "9. पाठ्यक्रम" },
  { id: "student-progress", num: 10, title: "विद्यार्थी प्रगति व भाषा-गैप", short: "10. प्रगति" },
  { id: "teach-back", num: 11, title: "सीख-सुनाओ (Teach-Back)", short: "11. सीख-सुनाओ" },
  { id: "offline-learning", num: 12, title: "ऑफलाइन अध्यापन", short: "12. ऑफलाइन" },
  { id: "settings", num: 13, title: "सेटिंग्स व प्रोफाइल", short: "13. सेटिंग्स" },
];

export default function ScreenSwitcherBar({
  activeScreen,
  onNavigate,
  isGridView,
  onToggleGridView,
}) {
  const currentIndex = ALL_SCREENS.findIndex((s) => s.id === activeScreen);
  const currentMeta = ALL_SCREENS[currentIndex] || ALL_SCREENS[3];

  const handlePrev = () => {
    if (currentIndex > 0) {
      onNavigate(ALL_SCREENS[currentIndex - 1].id);
    }
  };

  const handleNext = () => {
    if (currentIndex < ALL_SCREENS.length - 1) {
      onNavigate(ALL_SCREENS[currentIndex + 1].id);
    }
  };

  return (
    <div className="bg-white/95 border-t border-stone-200/80 px-3 py-2 flex flex-col sm:flex-row items-center justify-between gap-2 shadow-soft z-20">
      {/* Left info badge */}
      <div className="flex items-center gap-2">
        <span className="text-xs font-bold text-stone-500 font-hindi">
          स्क्रीन {currentMeta.num} / 13:
        </span>
        <span className="text-xs font-black text-forest-900 font-hindi bg-pastel-green px-2 py-0.5 rounded-md border border-pastel-greenBorder">
          {currentMeta.title}
        </span>
      </div>

      {/* Middle numeric pills 1 to 13 */}
      <div className="flex items-center gap-1 overflow-x-auto max-w-full py-0.5 no-scrollbar">
        <button
          onClick={handlePrev}
          disabled={currentIndex <= 0}
          className="p-1 rounded-lg text-stone-500 hover:text-stone-900 hover:bg-stone-100 disabled:opacity-30 disabled:pointer-events-none"
          title="पिछली स्क्रीन"
        >
          <ChevronLeft className="w-4 h-4" />
        </button>

        {ALL_SCREENS.map((item) => {
          const isActive = activeScreen === item.id;
          return (
            <button
              key={item.id}
              onClick={() => onNavigate(item.id)}
              className={`w-7 h-7 shrink-0 rounded-lg text-xs font-bold font-numeric transition-all flex items-center justify-center ${
                isActive
                  ? "bg-forest-700 text-white shadow-xs scale-105"
                  : "bg-stone-100 text-stone-700 hover:bg-forest-50 hover:text-forest-800"
              }`}
              title={`${item.num}. ${item.title}`}
            >
              {item.num}
            </button>
          );
        })}

        <button
          onClick={handleNext}
          disabled={currentIndex >= ALL_SCREENS.length - 1}
          className="p-1 rounded-lg text-stone-500 hover:text-stone-900 hover:bg-stone-100 disabled:opacity-30 disabled:pointer-events-none"
          title="अगली स्क्रीन"
        >
          <ChevronRight className="w-4 h-4" />
        </button>
      </div>

      {/* Right: Toggle 12-Screen Poster View */}
      <div className="flex items-center gap-2">
        <button
          onClick={onToggleGridView}
          className={`px-3 py-1 rounded-lg text-xs font-bold border transition-colors font-hindi flex items-center gap-1.5 ${
            isGridView
              ? "bg-forest-700 text-white border-forest-800"
              : "bg-white text-stone-700 border-stone-300 hover:border-forest-400"
          }`}
        >
          <LayoutGrid className="w-3.5 h-3.5" />
          <span>{isGridView ? "वापस ऐप" : "12-स्क्रीन ग्रिड"}</span>
        </button>
      </div>
    </div>
  );
}
