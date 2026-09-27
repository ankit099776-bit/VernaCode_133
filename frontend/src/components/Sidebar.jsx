import {
  Home,
  Languages,
  FileText,
  FileEdit,
  HelpCircle,
  Layers,
  BookOpen,
  BarChart2,
  CloudDownload,
  Settings as SettingsIcon,
  ChevronLeft,
  X,
  LogOut,
} from "lucide-react";
import sidebarTribalArt from "../assets/sidebar_tribal_art.png";
import sidebarLogoEmblem from "../assets/sidebar_logo_emblem.png";

export const NAV_ITEMS = [
  { id: "dashboard", label: "डैशबोर्ड", icon: Home },
  { id: "live-translate", label: "लाइव अनुवाद", icon: Languages },
  { id: "textbook-scanner", label: "पाठ्यपुस्तक स्कैनर", icon: FileText },
  { id: "worksheet-generator", label: "कार्यपत्रक बनाएं", icon: FileEdit },
  { id: "quiz-generator", label: "दैनिक क्विज़ बनाएं", icon: HelpCircle },
  { id: "flashcards", label: "शब्द कार्ड", icon: Layers },
  { id: "curriculum", label: "पाठ्यक्रम", icon: BookOpen },
  { id: "student-progress", label: "विद्यार्थी प्रगति", icon: BarChart2 },
  { id: "offline-learning", label: "ऑफलाइन अध्ययन", icon: CloudDownload },
  { id: "settings", label: "सेटिंग्स", icon: SettingsIcon },
];

export default function Sidebar({
  activeScreen,
  onNavigate,
  onLogout,
  isOpenMobile,
  onCloseMobile,
}) {
  return (
    <>
      {/* Mobile Backdrop */}
      {isOpenMobile && (
        <div
          onClick={onCloseMobile}
          className="fixed inset-0 bg-stone-900/50 backdrop-blur-xs z-40 lg:hidden"
        />
      )}

      {/* Sidebar Container matching Reference Image */}
      <aside
        className={`fixed top-0 bottom-0 left-0 z-50 w-64 bg-[#FAF7F0] dark:bg-[#0E1F17] border-r border-stone-200/80 dark:border-[#224734] flex flex-col transition-all duration-300 ease-in-out lg:static lg:translate-x-0 select-none overflow-y-auto no-scrollbar ${
          isOpenMobile ? "translate-x-0" : "-translate-x-full"
        }`}
      >
        <div className="flex flex-col">
          {/* Top Logo Banner in Solid Dark Forest Green matching Reference Image */}
          <div
            onClick={() => onNavigate("dashboard")}
            className="bg-[#1B4D36] text-white px-5 py-4 flex items-center justify-between cursor-pointer hover:bg-[#163E2C] transition-colors shadow-2xs group"
            title="शिक्षक डैशबोर्ड"
          >
            <div className="flex items-center gap-3">
              {/* Tribal Hands & Open Book Official Logo Emblem */}
              <div className="w-8 h-8 rounded-lg overflow-hidden flex items-center justify-center shrink-0">
                <img
                  src={sidebarLogoEmblem}
                  alt="भाषासेतु प्रतीक चिन्ह"
                  className="w-full h-auto object-contain"
                />
              </div>
              <span className="font-black text-lg tracking-tight text-white font-hindi">
                भाषासेतु एआई
              </span>
            </div>

            {/* Mobile close button */}
            <button
              onClick={(e) => {
                e.stopPropagation();
                onCloseMobile?.();
              }}
              className="p-1 rounded-lg text-white/70 hover:text-white lg:hidden cursor-pointer"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          {/* Navigation Links matching Reference Image */}
          <nav className="px-3.5 pt-2.5 pb-1 space-y-1 font-hindi">
            {NAV_ITEMS.map((item) => {
              const Icon = item.icon;
              const isActive = activeScreen === item.id;
              return (
                <button
                  key={item.id}
                  onClick={() => {
                    onNavigate(item.id);
                    onCloseMobile?.();
                  }}
                  className={`w-full flex items-center gap-3.5 px-4 py-2 rounded-2xl text-sm sm:text-base font-bold transition-all text-left cursor-pointer ${
                    isActive
                      ? "bg-[#DCECE1] dark:bg-[#1A3A2A] text-[#1B4D36] dark:text-emerald-300 font-black shadow-2xs"
                      : "text-stone-700 dark:text-stone-300 hover:text-[#1B4D36] dark:hover:text-emerald-300 hover:bg-white/80 dark:hover:bg-[#163526]"
                  }`}
                >
                  <Icon
                    className={`w-5 h-5 shrink-0 ${
                      isActive
                        ? "text-[#1B4D36] dark:text-emerald-400 stroke-[2.4]"
                        : "text-stone-600 dark:text-stone-400 stroke-[2]"
                    }`}
                  />
                  <span className="leading-snug">{item.label}</span>
                </button>
              );
            })}
          </nav>

          {/* Authentic Tribal Artwork (Couple walking towards hills) - Directly Near Settings */}
          <div className="w-full overflow-hidden pointer-events-none select-none mt-1">
            <img
              src={sidebarTribalArt}
              alt="जनजातीय कलाकृति"
              className="w-full h-auto object-cover opacity-90 dark:opacity-75"
            />
          </div>
        </div>
      </aside>
    </>
  );
}
