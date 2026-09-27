import React from "react";
import {
  Languages,
  ScanLine,
  FileSpreadsheet,
  Layers,
  Users,
  AlertTriangle,
  RotateCcw,
  TrendingUp,
  Clock,
  ChevronRight,
  Sparkles,
  ArrowUpRight,
  BookOpen,
} from "lucide-react";
import { TEACHER_PROFILE } from "../data/bhashaData";

export default function TeacherDashboard({
  onNavigate,
  selectedLanguage = "santhali",
  onSelectLanguage,
  completedWorksheets = [],
  publishedWorksheets = [],
  completedQuizzes = [],
  publishedQuizzes = [],
  currentUser = TEACHER_PROFILE
}) {
  const getLangName = () => {
    if (selectedLanguage === "santhali") return "संताली";
    if (selectedLanguage === "ho") return "हो";
    if (selectedLanguage === "mundari") return "मुण्डारी";
    if (selectedLanguage === "kurukh") return "कुड़ुख";
    return "संताली";
  };

  return (
    <div className="p-4 sm:p-6 lg:p-8 space-y-6 max-w-7xl mx-auto font-hindi select-none">
      {/* Welcome Greeting Banner */}
      <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-2 pb-1">
        <div>
          <h1 className="text-2xl sm:text-3xl font-extrabold text-forest-900 dark:text-emerald-200 tracking-tight">
            नमस्ते, {currentUser?.name || TEACHER_PROFILE.name} 👋
          </h1>
          <p className="text-xs sm:text-sm text-stone-500 font-medium mt-0.5">
            आज फिर एक नई सीख की शुरुआत करें। ({currentUser?.school || "झारखंड प्राथमिक शिक्षा पोर्टल — कक्षा 1-5"})
          </p>
        </div>

        <div className="flex items-center gap-2">
          <div className="px-3 py-1 rounded-xl bg-pastel-green dark:bg-[#173B2A] border border-pastel-greenBorder dark:border-[#224734] text-forest-900 dark:text-emerald-300 text-xs font-bold flex items-center gap-1.5 shadow-2xs">
            <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
            <span>सक्रिय मातृभाषा: {getLangName()}</span>
          </div>
          <span className="text-xs text-stone-400 hidden sm:inline">•</span>
          <span className="text-xs font-semibold text-stone-500 hidden sm:inline">
            सोमवार, 21 सितम्बर 2026
          </span>
        </div>
      </div>

      {/* Quick Action Cards */}
      <section>
        <div className="flex items-center justify-between mb-3">
          <h2 className="text-sm font-bold text-stone-700 dark:text-stone-300 tracking-wide">
            त्वरित कार्य
          </h2>
          <span className="text-[11px] text-stone-500 font-medium">एक क्लिक में शुरू करें</span>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-5 gap-3 sm:gap-4">
          {/* Action 1: Live Translate */}
          <div
            onClick={() => onNavigate("live-translate")}
            className="p-4 rounded-3xl bg-pastel-green dark:bg-[#173B2A] border border-pastel-greenBorder dark:border-[#2A5E43] hover:border-forest-600 dark:hover:border-emerald-400 shadow-card hover:shadow-float transition-all cursor-pointer group flex flex-col justify-between min-h-[120px]"
          >
            <div className="w-9 h-9 rounded-2xl bg-white dark:bg-[#1F4C36] text-forest-800 dark:text-emerald-300 flex items-center justify-center shadow-xs group-hover:scale-110 transition-transform">
              <Languages className="w-4 h-4 stroke-[2.2]" />
            </div>
            <div>
              <h3 className="font-extrabold text-xs sm:text-sm text-forest-900 dark:text-white group-hover:text-forest-700 dark:group-hover:text-emerald-300 transition-colors">
                लाइव अनुवाद
              </h3>
              <p className="text-[10px] text-forest-700 dark:text-emerald-400/80 font-medium mt-0.5">
                हिंदी ⇄ {getLangName()}
              </p>
            </div>
          </div>

          {/* Action 2: Scan Textbook */}
          <div
            onClick={() => onNavigate("textbook-scanner")}
            className="p-4 rounded-3xl bg-pastel-blue dark:bg-[#132E3A] border border-pastel-blueBorder dark:border-[#214F63] hover:border-blue-500 dark:hover:border-cyan-400 shadow-card hover:shadow-float transition-all cursor-pointer group flex flex-col justify-between min-h-[120px]"
          >
            <div className="w-9 h-9 rounded-2xl bg-white dark:bg-[#1B3F50] text-blue-700 dark:text-cyan-300 flex items-center justify-center shadow-xs group-hover:scale-110 transition-transform">
              <ScanLine className="w-4 h-4 stroke-[2.2]" />
            </div>
            <div>
              <h3 className="font-extrabold text-xs sm:text-sm text-forest-900 dark:text-white group-hover:text-blue-700 dark:group-hover:text-cyan-300 transition-colors">
                पाठ्यपुस्तक स्कैनर
              </h3>
              <p className="text-[10px] text-stone-500 dark:text-stone-400 font-medium mt-0.5">
                सरल व्याख्या निकालें
              </p>
            </div>
          </div>

          {/* Action 3: Create Worksheet */}
          <div
            onClick={() => onNavigate("worksheet-generator")}
            className="p-4 rounded-3xl bg-pastel-peach dark:bg-[#331C16] border border-pastel-peachBorder dark:border-[#572F24] hover:border-rose-400 dark:hover:border-rose-300 shadow-card hover:shadow-float transition-all cursor-pointer group flex flex-col justify-between min-h-[120px]"
          >
            <div className="w-9 h-9 rounded-2xl bg-white dark:bg-[#47261E] text-rose-700 dark:text-rose-300 flex items-center justify-center shadow-xs group-hover:scale-110 transition-transform">
              <FileSpreadsheet className="w-4 h-4 stroke-[2.2]" />
            </div>
            <div>
              <h3 className="font-extrabold text-xs sm:text-sm text-forest-900 dark:text-white group-hover:text-rose-700 dark:group-hover:text-rose-300 transition-colors">
                कार्यपत्रक बनाएं
              </h3>
              <p className="text-[10px] text-stone-500 dark:text-stone-400 font-medium mt-0.5">
                कक्षा 1, 2, 3 JAC बोर्ड
              </p>
            </div>
          </div>

          {/* Action 4: Create Daily Quiz */}
          <div
            onClick={() => onNavigate("quiz-generator")}
            className="p-4 rounded-3xl bg-amber-50 dark:bg-[#362712] border border-amber-200 dark:border-[#5E441B] hover:border-amber-400 shadow-card hover:shadow-float transition-all cursor-pointer group flex flex-col justify-between min-h-[120px]"
          >
            <div className="w-9 h-9 rounded-2xl bg-white dark:bg-[#4A371B] text-amber-700 dark:text-amber-300 flex items-center justify-center shadow-xs group-hover:scale-110 transition-transform">
              <Sparkles className="w-4 h-4 stroke-[2.2]" />
            </div>
            <div>
              <h3 className="font-extrabold text-xs sm:text-sm text-amber-950 dark:text-white group-hover:text-amber-700 dark:group-hover:text-amber-300 transition-colors">
                दैनिक क्विज़ बनाएं
              </h3>
              <p className="text-[10px] text-amber-800 dark:text-amber-400 font-medium mt-0.5">
                कक्षावार दैनिक क्विज़
              </p>
            </div>
          </div>

          {/* Action 5: Flashcards */}
          <div
            onClick={() => onNavigate("flashcards")}
            className="p-4 rounded-3xl bg-pastel-purple dark:bg-[#281A36] border border-pastel-purpleBorder dark:border-[#4B3066] hover:border-purple-400 dark:hover:border-purple-300 shadow-card hover:shadow-float transition-all cursor-pointer group flex flex-col justify-between min-h-[120px]"
          >
            <div className="w-9 h-9 rounded-2xl bg-white dark:bg-[#3B2550] text-purple-700 dark:text-purple-300 flex items-center justify-center shadow-xs group-hover:scale-110 transition-transform">
              <Layers className="w-4 h-4 stroke-[2.2]" />
            </div>
            <div>
              <h3 className="font-extrabold text-xs sm:text-sm text-forest-900 dark:text-white group-hover:text-purple-700 dark:group-hover:text-purple-300 transition-colors">
                शब्द कार्ड
              </h3>
              <p className="text-[10px] text-stone-500 dark:text-stone-400 font-medium mt-0.5">
                दैनिक शब्दावली कार्ड
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Grid: 2 Tables (Worksheet Tracker & Quiz Results Tracker) */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Table 1: Completed Worksheets Log */}
        <section className="bg-white dark:bg-[#12241A] rounded-3xl border border-stone-200/90 dark:border-[#224734] p-5 shadow-xs space-y-4">
          <div className="flex items-center justify-between border-b pb-3 border-stone-200 dark:border-[#224734]">
            <div>
              <h2 className="text-sm sm:text-base font-black text-forest-900 dark:text-emerald-200">
                कार्यपत्रक पूर्ति सूची ({completedWorksheets.length})
              </h2>
              <p className="text-[11px] text-stone-500 dark:text-stone-400 mt-0.5">
                छात्रों द्वारा जमा किए गए कार्यपत्रक।
              </p>
            </div>
            <button
              onClick={() => onNavigate("worksheet-generator")}
              className="px-3 py-1 bg-forest-700 text-white rounded-lg text-xs font-bold"
            >
              + बनाएं
            </button>
          </div>

          <div className="overflow-x-auto no-scrollbar">
            <table className="w-full text-left border-collapse min-w-[320px]">
              <thead>
                <tr className="bg-stone-50 dark:bg-[#162E22] text-stone-600 dark:text-emerald-300 text-[11px] font-extrabold">
                  <th className="p-2">तारीख</th>
                  <th className="p-2">छात्र</th>
                  <th className="p-2">कक्षा</th>
                  <th className="p-2">अंक</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-stone-100 dark:divide-[#1F3D2C] text-xs font-semibold text-stone-800 dark:text-stone-200">
                {completedWorksheets.map((item, idx) => (
                  <tr key={item.id || idx}>
                    <td className="p-2 font-mono text-stone-500">{item.date}</td>
                    <td className="p-2 font-bold text-forest-900 dark:text-white">{item.studentName} ({item.rollNo})</td>
                    <td className="p-2">{item.classLevel}</td>
                    <td className="p-2 font-bold text-emerald-700 dark:text-emerald-400">{item.score}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </section>

        {/* Table 2: Daily Quiz Completion Log */}
        <section className="bg-white dark:bg-[#12241A] rounded-3xl border border-stone-200/90 dark:border-[#224734] p-5 shadow-xs space-y-4">
          <div className="flex items-center justify-between border-b pb-3 border-stone-200 dark:border-[#224734]">
            <div>
              <h2 className="text-sm sm:text-base font-black text-amber-900 dark:text-amber-200">
                दैनिक क्विज़ परिणाम रिपोर्ट ({completedQuizzes.length})
              </h2>
              <p className="text-[11px] text-stone-500 dark:text-stone-400 mt-0.5">
                छात्रों द्वारा पूर्ण किए गए दैनिक क्विज़ का ब्योरा।
              </p>
            </div>
            <button
              onClick={() => onNavigate("quiz-generator")}
              className="px-3 py-1 bg-amber-500 text-white rounded-lg text-xs font-bold"
            >
              + दैनिक क्विज़
            </button>
          </div>

          <div className="overflow-x-auto no-scrollbar">
            <table className="w-full text-left border-collapse min-w-[320px]">
              <thead>
                <tr className="bg-amber-50/60 dark:bg-[#2B2012] text-amber-900 dark:text-amber-300 text-[11px] font-extrabold">
                  <th className="p-2">तारीख</th>
                  <th className="p-2">छात्र</th>
                  <th className="p-2">कक्षा</th>
                  <th className="p-2">परिणाम</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-stone-100 dark:divide-[#1F3D2C] text-xs font-semibold text-stone-800 dark:text-stone-200">
                {completedQuizzes.map((item, idx) => (
                  <tr key={item.id || idx}>
                    <td className="p-2 font-mono text-stone-500">{item.date}</td>
                    <td className="p-2 font-bold text-forest-900 dark:text-white">{item.studentName} ({item.rollNo})</td>
                    <td className="p-2">{item.classLevel}</td>
                    <td className="p-2 font-extrabold text-emerald-700 dark:text-emerald-400">{item.score} ({item.percentage})</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </section>
      </div>

      {/* Bottom 2 Columns */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 pt-1">
        {/* Left: हाल की गतिविधियां */}
        <div className="bg-white dark:bg-[#12241A] rounded-3xl border border-stone-200/90 dark:border-[#224734] p-5 shadow-2xs">
          <div className="flex items-center justify-between mb-4">
            <h3 className="font-extrabold text-sm text-forest-900 dark:text-white">
              हाल की गतिविधियां
            </h3>
            <span className="text-[11px] font-semibold text-stone-600 dark:text-stone-400">आज का इतिहास</span>
          </div>

          <div className="space-y-3">
            <div className="flex items-center justify-between p-3 rounded-2xl bg-stone-50 dark:bg-[#183325] hover:bg-cream-50 dark:hover:bg-[#1E3E2E] transition-colors">
              <div className="flex items-center gap-3">
                <div className="w-9 h-9 rounded-xl bg-pastel-green dark:bg-[#1F4C36] text-forest-800 dark:text-emerald-300 flex items-center justify-center font-bold text-xs shrink-0">
                  का
                </div>
                <div>
                  <h4 className="text-xs sm:text-sm font-bold text-stone-900 dark:text-white">
                    कक्षा 2 — मात्राएं (झारखंड बोर्ड)
                  </h4>
                  <p className="text-[11px] text-stone-600 dark:text-stone-400">
                    कार्यपत्रक अनुमोदित व प्रेषित
                  </p>
                </div>
              </div>
              <span className="text-[11px] font-bold text-stone-600 dark:text-stone-400 shrink-0">
                10 मिनट पहले
              </span>
            </div>
          </div>
        </div>

        {/* Right: आगामी कक्षाएं */}
        <div className="bg-white dark:bg-[#12241A] rounded-3xl border border-stone-200/90 dark:border-[#224734] p-5 shadow-2xs flex flex-col justify-between">
          <div>
            <div className="flex items-center justify-between mb-4">
              <h3 className="font-extrabold text-sm text-forest-900 dark:text-white">
                आगामी कक्षाएं
              </h3>
              <span className="text-[11px] font-semibold text-stone-600 dark:text-stone-400">समय सारणी</span>
            </div>

            <div className="space-y-3">
              <div className="flex items-center justify-between p-3 rounded-2xl bg-stone-50 dark:bg-[#183325]">
                <div className="flex items-center gap-3">
                  <div className="w-9 h-9 rounded-xl bg-emerald-50 dark:bg-[#1F4C36] text-emerald-700 dark:text-emerald-300 flex items-center justify-center shrink-0">
                    <Clock className="w-4 h-4" />
                  </div>
                  <div>
                    <h4 className="text-xs sm:text-sm font-bold text-stone-900 dark:text-white">
                      कक्षा 1 — स्वर व Ol Chiki अक्षर
                    </h4>
                    <p className="text-[11px] text-stone-600 dark:text-stone-400">
                      वर्ण पहचान व खेल गतिविधि
                    </p>
                  </div>
                </div>
                <span className="text-xs font-bold text-forest-700 dark:text-emerald-300 bg-pastel-green dark:bg-[#1F4C36] px-2 py-0.5 rounded-md shrink-0">
                  10:00 पूर्वाह्न
                </span>
              </div>
            </div>
          </div>

          <div className="pt-4 text-right">
            <button
              onClick={() => onNavigate("curriculum")}
              className="text-xs font-bold text-forest-700 dark:text-emerald-400 hover:text-forest-900 dark:hover:text-emerald-300 inline-flex items-center gap-1 hover:underline"
            >
              <span>पाठ्यक्रम देखें</span>
              <ArrowUpRight className="w-3.5 h-3.5" />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

