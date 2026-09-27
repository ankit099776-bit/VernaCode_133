import React from "react";
import {
  Home,
  FileSpreadsheet,
  ScanLine,
  Radio,
  Layers,
  BookOpen,
  Sparkles,
  Mic,
  Trophy,
  X,
  LogOut,
  Star
} from "lucide-react";
import sidebarLogoEmblem from "../assets/sidebar_logo_emblem.png";
import sidebarTribalArt from "../assets/sidebar_tribal_art.png";
import namasteGirlImg from "../assets/flashcard_namaste_girl.png";
import santaliKidsReadingImg from "../assets/santali_kids_reading.jpg";

export const STUDENT_NAV_ITEMS = [
  { id: "home", label: "ᱢᱟᱨᱟᱝ ᱛᱷᱚᱞᱤ / मेरा बस्ता", icon: Home, emoji: "🎒" },
  { id: "worksheets", label: "ᱠᱟᱹᱢᱤ ᱥᱟᱠᱟᱢ / मेरे कार्यपत्रक", icon: FileSpreadsheet, emoji: "📝" },
  { id: "scanner", label: "ᱯᱩᱛᱷᱤ ᱥᱠᱮᱱ / पाठ्यपुस्तक स्कैनर", icon: ScanLine, emoji: "📷" },
  { id: "classroom", label: "ᱞᱟᱭᱤᱵᱽ ᱪᱟᱱᱟᱪ / लाइव कक्षा", icon: Radio, emoji: "📻" },
  { id: "flashcards", label: "ᱟᱹᱲᱟᱹ ᱠᱟᱨᱰ / शब्द कार्ड", icon: Layers, emoji: "🎴" },
  { id: "stories", label: "ᱪᱤᱛᱟᱹᱨ ᱠᱟᱹᱦᱱᱤ / सचित्र कहानियां", icon: BookOpen, emoji: "📖" },
  { id: "quiz", label: "ᱛᱮᱦᱮᱧᱟᱜ ᱠᱩᱠᱞᱤ / आज का क्विज़", icon: Sparkles, emoji: "✏️" },
  { id: "practice", label: "ᱨᱚᱲ ᱟᱛᱮ ᱪᱮᱫᱚᱢ / बोलकर सीखो", icon: Mic, emoji: "🗣️" },
  { id: "badges", label: "ᱤᱧᱟᱜ ᱤᱯᱤᱞ / मेरे सितारे व बैज", icon: Trophy, emoji: "🏆" },
];

export default function StudentSidebar({
  activeTab,
  onSelectTab,
  student,
  stars,
  onLogout,
  isOpenMobile,
  onCloseMobile,
}) {
  const safeStudent = (student && student.name) ? student : {
    id: "ravi",
    name: "रवि मुर्मू",
    grade: "कक्षा 2",
    roll: "04",
    lang: "संथाली",
    avatar: "👦",
    stars: 18,
  };

  return (
    <>
      {/* Mobile Backdrop Overlay */}
      {isOpenMobile && (
        <div
          onClick={onCloseMobile}
          className="fixed inset-0 bg-stone-900/60 backdrop-blur-xs z-40 lg:hidden"
        />
      )}

      {/* Student Vertical Sidebar */}
      <aside
        className={`fixed top-0 bottom-0 left-0 z-50 w-64 bg-[#FAF7F0] dark:bg-[#0E1F17] border-r border-stone-200/90 dark:border-[#224734] flex flex-col transition-all duration-300 ease-in-out lg:static lg:translate-x-0 select-none overflow-y-auto no-scrollbar ${
          isOpenMobile ? "translate-x-0" : "-translate-x-full"
        }`}
      >
        <div className="flex flex-col min-h-full justify-between">
          <div>
            {/* Top Logo Banner in Solid Dark Forest Green */}
            <div className="bg-[#1B4D36] text-white px-5 py-4 flex items-center justify-between shadow-2xs">
              <div className="flex items-center gap-3">
                <div className="w-8 h-8 rounded-lg overflow-hidden flex items-center justify-center shrink-0">
                  <img
                    src={sidebarLogoEmblem}
                    alt="भाषासेतु"
                    className="w-full h-auto object-contain"
                  />
                </div>
                <div>
                  <span className="font-black text-lg tracking-tight text-white font-hindi block leading-none">
                    भाषासेतु
                  </span>
                  <span className="text-[10px] text-emerald-300 font-bold block mt-0.5">
                    ᱪᱮᱛᱮᱫᱤᱭᱟᱹ ᱯᱳᱨᱴᱟᱞ (विद्यार्थी)
                  </span>
                </div>
              </div>

              {/* Mobile close button */}
              <button
                onClick={onCloseMobile}
                className="p-1 rounded-lg text-white/70 hover:text-white lg:hidden cursor-pointer"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Student Profile Card Card inside Sidebar Top */}
            <div className="m-3 p-3 rounded-2xl bg-white dark:bg-[#12241A] border border-stone-200/90 dark:border-[#224734] shadow-xs flex items-center gap-3 font-hindi">
              <div className="w-11 h-11 rounded-2xl bg-amber-100 dark:bg-[#1B3626] border-2 border-amber-400 dark:border-amber-600 flex items-center justify-center text-2xl shadow-2xs shrink-0">
                {safeStudent.avatar || "👦"}
              </div>
              <div className="min-w-0 flex-1">
                <h4 className="text-sm font-black text-forest-900 dark:text-white truncate leading-tight">
                  {safeStudent.name}
                </h4>
                <div className="flex items-center gap-1.5 mt-0.5">
                  <span className="px-2 py-0.5 rounded-full bg-forest-100 dark:bg-[#1B3E2A] text-forest-800 dark:text-emerald-300 text-[10px] font-bold">
                    {safeStudent.grade}
                  </span>
                  <span className="text-[10px] font-extrabold text-amber-700 dark:text-amber-300 bg-amber-50 dark:bg-amber-950/40 px-1.5 py-0.5 rounded-full border border-amber-200 dark:border-amber-800 flex items-center gap-0.5">
                    <Star className="w-3 h-3 fill-amber-400 text-amber-500" />
                    <span>{stars}</span>
                  </span>
                </div>
              </div>
            </div>

            {/* Navigation Items */}
            <nav className="px-3 pt-1 pb-2 space-y-1 font-hindi">
              {STUDENT_NAV_ITEMS.map((item) => {
                const Icon = item.icon;
                const isActive = activeTab === item.id;
                return (
                  <button
                    key={item.id}
                    onClick={() => {
                      onSelectTab(item.id);
                      onCloseMobile?.();
                    }}
                    className={`w-full flex items-center gap-3 px-3.5 py-2.5 rounded-2xl text-xs sm:text-sm font-bold transition-all text-left cursor-pointer ${
                      isActive
                        ? "bg-[#1E4D36] text-white font-black shadow-2xs"
                        : "text-stone-700 dark:text-stone-300 hover:text-[#1B4D36] dark:hover:text-emerald-300 hover:bg-stone-100 dark:hover:bg-[#163526]"
                    }`}
                  >
                    <span className="text-base shrink-0">{item.emoji}</span>
                    <span className="leading-snug truncate">{item.label}</span>
                  </button>
                );
              })}
            </nav>
          </div>

          {/* Bottom Tribal Kids Classroom Illustration Section */}
          <div className="p-3 pt-0 font-hindi space-y-2">
            <div className="relative rounded-2xl bg-linear-to-br from-amber-50 via-emerald-50 to-teal-50 dark:from-[#14281E] dark:to-[#1B3626] border border-emerald-300/80 dark:border-[#224734] p-2.5 overflow-hidden text-center shadow-xs">
              <div className="rounded-xl overflow-hidden border border-amber-300 dark:border-emerald-700 shadow-2xs mb-2">
                <img
                  src={santaliKidsReadingImg}
                  alt="ᱥᱟᱱᱛᱟᱲᱤ ᱪᱮᱛᱮᱫᱤᱭᱟᱹ ᱠᱚ (संथाली विद्यार्थी)"
                  className="w-full h-28 object-cover hover:scale-105 transition-transform duration-300"
                />
              </div>
              <p className="text-[11px] font-black text-forest-900 dark:text-emerald-300 leading-tight">
                ᱥᱟᱱᱛᱟᱲᱤ ᱪᱮᱛᱮᱫᱤᱭᱟᱹ ᱠᱚ 📚
              </p>
              <p className="text-[10px] text-stone-600 dark:text-stone-300 font-bold mt-0.5">
                (संथाली बाल शिक्षार्थी कक्षा) 🌿
              </p>
            </div>
          </div>
        </div>
      </aside>
    </>
  );
}
