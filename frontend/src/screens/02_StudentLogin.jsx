import React, { useState } from "react";
import BhashaSetuLogo from "../components/BhashaSetuLogo";
import { TribalLeavesCorner } from "../components/Illustrations";
import { ArrowLeft, ArrowRight, Volume2, Sparkles, Check, GraduationCap, ShieldCheck, Sun, Moon } from "lucide-react";
import { playDevanagariAudio, stopDevanagariAudio } from "../data/bhashaData";

const CLASS_STUDENTS = {
  "कक्षा 1": [
    { id: "c1_singo", name: "सिंगो मुर्मू", nameOlChiki: "ᱥᱤᱝᱜᱳ ᱢᱩᱨᱢᱩ", grade: "कक्षा 1", roll: "01", lang: "संताली ( Ol Chiki )", langKey: "santhali", avatar: "👧", stars: 12 },
    { id: "c1_kanhu", name: "कान्हू सोरेन", nameOlChiki: "ᱠᱟᱱᱦᱩ ᱥᱚᱨᱮᱱ", grade: "कक्षा 1", roll: "03", lang: "संताली ( Ol Chiki )", langKey: "santhali", avatar: "👦", stars: 15 },
    { id: "c1_baha", name: "बाहा हेम्ब्रम", nameOlChiki: "ᱵᱟᱦᱟ ᱦᱮᱢᱵᱽᱨᱚᱢ", grade: "कक्षा 1", roll: "05", lang: "संताली ( Ol Chiki )", langKey: "santhali", avatar: "👧", stars: 18 },
    { id: "c1_sido", name: "सिद्धो मरांडी", nameOlChiki: "ᱥᱤᱫᱽᱫᱷᱳ ᱢᱟᱨᱟᱱᱰᱤ", grade: "कक्षा 1", roll: "07", lang: "संताली ( Ol Chiki )", langKey: "santhali", avatar: "👦", stars: 14 },
    { id: "c1_dular", name: "दुलाड़ हांसदा", nameOlChiki: "ᱫᱩᱞᱟᱹᱲ ᱦᱟᱸᱥᱫᱟ", grade: "कक्षा 1", roll: "10", lang: "संताली ( Ol Chiki )", langKey: "santhali", avatar: "👧", stars: 20 },
    { id: "c1_som", name: "सोम टुडू", nameOlChiki: "ᱥᱳᱢ ᱴᱩᱰᱩ", grade: "कक्षा 1", roll: "12", lang: "संताली ( Ol Chiki )", langKey: "santhali", avatar: "👦", stars: 16 },
  ],
  "कक्षा 2": [
    { id: "c2_ravi", name: "रवि मुर्मू", nameOlChiki: "ᱨᱚᱵᱤ ᱢᱩᱨᱢᱩ", grade: "कक्षा 2", roll: "04", lang: "संताली ( Ol Chiki )", langKey: "santhali", avatar: "👦", stars: 18 },
    { id: "c2_priya", name: "प्रिया सोरेन", nameOlChiki: "ᱯᱨᱤᱭᱟ ᱥᱚᱨᱮᱱ", grade: "कक्षा 2", roll: "09", lang: "संताली ( Ol Chiki )", langKey: "santhali", avatar: "👧", stars: 24 },
    { id: "c2_chando", name: "चांदो हेम्ब्रम", nameOlChiki: "ᱪᱟᱸᱫᱳ ᱦᱮᱢᱵᱽᱨᱚᱢ", grade: "कक्षा 2", roll: "11", lang: "संताली ( Ol Chiki )", langKey: "santhali", avatar: "👦", stars: 15 },
    { id: "c2_sunita", name: "सुनीता बेसरा", nameOlChiki: "ᱥᱩᱱᱤᱛᱟ ᱵᱮᱥᱨᱟ", grade: "कक्षा 2", roll: "06", lang: "संताली ( Ol Chiki )", langKey: "santhali", avatar: "👧", stars: 22 },
    { id: "c2_phagu", name: "फगु किस्कू", nameOlChiki: "ᱯᱷᱟᱹᱜᱩ ᱠᱤᱥᱠᱩ", grade: "कक्षा 2", roll: "14", lang: "संताली ( Ol Chiki )", langKey: "santhali", avatar: "👦", stars: 19 },
    { id: "c2_saloni", name: "सालोनी बासके", nameOlChiki: "ᱥᱟᱞᱳᱱᱤ ᱵᱟᱥᱠᱮ", grade: "कक्षा 2", roll: "02", lang: "संताली ( Ol Chiki )", langKey: "santhali", avatar: "👧", stars: 21 },
  ],
  "कक्षा 3": [
    { id: "c3_michel", name: "मिशेल मुर्मू", nameOlChiki: "ᱢᱤᱥᱮᱞ ᱢᱩᱨᱢᱩ", grade: "कक्षा 3", roll: "02", lang: "संताली ( Ol Chiki )", langKey: "santhali", avatar: "👧", stars: 25 },
    { id: "c3_gulab", name: "गुलाब सोरेन", nameOlChiki: "ᱜᱩᱞᱟᱵᱽ ᱥᱚᱨᱮᱱ", grade: "कक्षा 3", roll: "05", lang: "संताली ( Ol Chiki )", langKey: "santhali", avatar: "👦", stars: 22 },
    { id: "c3_anupama", name: "अनुपमा हांसदा", nameOlChiki: "ᱟᱱᱩᱯᱟᱢᱟ ᱦᱟᱸᱥᱫᱟ", grade: "कक्षा 3", roll: "08", lang: "संताली ( Ol Chiki )", langKey: "santhali", avatar: "👧", stars: 28 },
    { id: "c3_bir", name: "बीर बासके", nameOlChiki: "ᱵᱤᱨ ᱵᱟᱥᱠᱮ", grade: "कक्षा 3", roll: "12", lang: "संताली ( Ol Chiki )", langKey: "santhali", avatar: "👦", stars: 19 },
    { id: "c3_aarti", name: "आरती मरांडी", nameOlChiki: "ᱟᱨᱚᱛᱤ ᱢᱟᱨᱟᱱᱰᱤ", grade: "कक्षा 3", roll: "15", lang: "संताली ( Ol Chiki )", langKey: "santhali", avatar: "👧", stars: 26 },
    { id: "c3_rajan", name: "राजन टुडू", nameOlChiki: "ᱨᱟᱡᱚᱱ ᱴᱩᱰᱩ", grade: "कक्षा 3", roll: "18", lang: "संताली ( Ol Chiki )", langKey: "santhali", avatar: "👦", stars: 23 },
  ],
  "कक्षा 4": [
    { id: "c4_arjun", name: "अर्जुन मरांडी", nameOlChiki: "ᱟᱨᱡᱩᱱ ᱢᱟᱨᱟᱱᱰᱤ", grade: "कक्षा 4", roll: "03", lang: "संताली ( Ol Chiki )", langKey: "santhali", avatar: "👦", stars: 30 },
    { id: "c4_parvati", name: "पार्वती हेम्ब्रम", nameOlChiki: "ᱯᱟᱨᱵᱚᱛᱤ ᱦᱮᱢᱵᱽᱨᱚᱢ", grade: "कक्षा 4", roll: "07", lang: "संताली ( Ol Chiki )", langKey: "santhali", avatar: "👧", stars: 27 },
    { id: "c4_lakhan", name: "लखन किस्कू", nameOlChiki: "ᱞᱟᱠᱷᱚᱱ ᱠᱤᱥᱠᱩ", grade: "कक्षा 4", roll: "10", lang: "संताली ( Ol Chiki )", langKey: "santhali", avatar: "👦", stars: 31 },
    { id: "c4_shanti", name: "शांति बेसरा", nameOlChiki: "ᱥᱟᱱᱛᱤ ᱵᱮᱥᱨᱟ", grade: "कक्षा 4", roll: "13", lang: "संताली ( Ol Chiki )", langKey: "santhali", avatar: "👧", stars: 29 },
    { id: "c4_mangal", name: "मंगल मुर्मू", nameOlChiki: "ᱢᱟᱝᱜᱚᱞ ᱢᱩᱨᱢᱩ", grade: "कक्षा 4", roll: "16", lang: "संताली ( Ol Chiki )", langKey: "santhali", avatar: "👦", stars: 34 },
    { id: "c4_rukmini", name: "रुक्मिणी सोरेन", nameOlChiki: "ᱨᱩᱠᱢᱤᱬᱤ ᱥᱚᱨᱮᱱ", grade: "कक्षा 4", roll: "19", lang: "संताली ( Ol Chiki )", langKey: "santhali", avatar: "👧", stars: 32 },
  ],
  "कक्षा 5": [
    { id: "c5_devendra", name: "देवेन्द्र टुडू", nameOlChiki: "ᱫᱮᱵᱮᱱᱫᱽᱨᱚ ᱴᱩᱰᱩ", grade: "कक्षा 5", roll: "01", lang: "संताली ( Ol Chiki )", langKey: "santhali", avatar: "👦", stars: 35 },
    { id: "c5_phulmani", name: "फुलमनी हांसदा", nameOlChiki: "ᱯᱷᱩᱞᱢᱟᱱᱤ ᱦᱟᱸᱥᱫᱟ", grade: "कक्षा 5", roll: "04", lang: "संताली ( Ol Chiki )", langKey: "santhali", avatar: "👧", stars: 38 },
    { id: "c5_charan", name: "चरण सोरेन", nameOlChiki: "ᱪᱚᱨᱚᱱ ᱥᱚᱨᱮᱱ", grade: "कक्षा 5", roll: "08", lang: "संताली ( Ol Chiki )", langKey: "santhali", avatar: "👦", stars: 40 },
    { id: "c5_nirmala", name: "निर्मला किस्कू", nameOlChiki: "ᱱᱤᱨᱢᱚᱞᱟ ᱠᱤᱥᱠᱩ", grade: "कक्षा 5", roll: "11", lang: "संताली ( Ol Chiki )", langKey: "santhali", avatar: "👧", stars: 36 },
    { id: "c5_shambhu", name: "शंभू मरांडी", nameOlChiki: "ᱥᱚᱢᱵᱷᱩ ᱢᱟᱨᱟᱱᱰᱤ", grade: "कक्षा 5", roll: "15", lang: "संताली ( Ol Chiki )", langKey: "santhali", avatar: "👦", stars: 42 },
    { id: "c5_karmi", name: "करमी मुर्मू", nameOlChiki: "ᱠᱟᱨᱢᱤ ᱢᱩᱨᱢᱩ", grade: "कक्षा 5", roll: "17", lang: "संताली ( Ol Chiki )", langKey: "santhali", avatar: "👧", stars: 39 },
  ],
};

export default function StudentLogin({ onLogin, onBack, isDarkMode = false, onToggleDarkMode }) {
  const [selectedGrade, setSelectedGrade] = useState("कक्षा 2");
  const currentStudents = CLASS_STUDENTS[selectedGrade] || CLASS_STUDENTS["कक्षा 2"];
  const [selectedStudent, setSelectedStudent] = useState(currentStudents[0]);
  const [rollNumber, setRollNumber] = useState(currentStudents[0].roll);

  const handleSelectGrade = (gradeName) => {
    setSelectedGrade(gradeName);
    const newStudents = CLASS_STUDENTS[gradeName] || CLASS_STUDENTS["कक्षा 2"];
    if (newStudents && newStudents.length > 0) {
      setSelectedStudent(newStudents[0]);
      setRollNumber(newStudents[0].roll);
    }
  };

  const handleSelectStudent = (student) => {
    setSelectedStudent(student);
    setRollNumber(student.roll);
  };

  const handleEnterStudentPortal = () => {
    stopDevanagariAudio();
    onLogin({
      ...selectedStudent,
      role: "student",
    });
  };

  const playWelcomeAudio = () => {
    playDevanagariAudio("ᱡᱚᱦᱟᱨ! ᱵᱷᱟᱥᱟ ᱥᱮᱛᱩ ᱨᱮ ᱟᱢᱟᱜ ᱥᱟᱹᱜᱩᱱ ᱫᱟᱨᱟᱢ ᱾ ᱟᱢᱟᱜ ᱧᱩᱛᱩᱢ ᱪᱷᱟᱹ touch ᱢᱮ ᱟᱨ ᱯᱟᱲᱦᱟᱣ ᱮᱦᱚᱵᱽ ᱢᱮ ᱾", "sat");
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-[#FAF7F0] dark:bg-[#0A1610] p-3 sm:p-6 relative select-none transition-colors duration-300">
      {/* Decorative leaf art in corners */}
      <div className="absolute top-3 left-3 pointer-events-none opacity-40 dark:opacity-20">
        <TribalLeavesCorner className="w-24 h-24" />
      </div>
      <div className="absolute bottom-3 right-3 pointer-events-none opacity-40 dark:opacity-20 rotate-180">
        <TribalLeavesCorner className="w-24 h-24" />
      </div>

      {/* Main Student Login Card */}
      <div className="w-full max-w-2xl bg-white dark:bg-[#12241A] rounded-3xl sm:rounded-[36px] p-5 sm:p-8 shadow-card border border-stone-200/90 dark:border-[#224734] relative z-10 font-hindi">
        
        {/* Navigation Bar inside Card */}
        <div className="flex items-center justify-between mb-4">
          <button
            onClick={onBack}
            className="inline-flex items-center gap-1.5 text-stone-600 dark:text-stone-400 hover:text-forest-800 dark:hover:text-emerald-300 text-sm sm:text-base font-bold transition-colors cursor-pointer py-1 px-2.5 rounded-xl hover:bg-stone-100 dark:hover:bg-[#183526]"
          >
            <ArrowLeft className="w-4 h-4" />
            <span>ᱢᱩᱲᱩᱛ ᱥᱟᱠᱟᱢ | मुख्य पृष्ठ</span>
          </button>

          <div className="flex items-center gap-2">
            <button
              onClick={playWelcomeAudio}
              className="inline-flex items-center gap-1.5 text-xs sm:text-sm font-bold text-forest-800 dark:text-emerald-300 bg-pastel-green dark:bg-[#1A3A2A] hover:bg-forest-100 dark:hover:bg-[#234B36] px-3 py-1.5 rounded-full border border-pastel-greenBorder dark:border-[#2F5E45] transition-all cursor-pointer"
              title="ऑडियो निर्देश सुनें"
            >
              <Volume2 className="w-4 h-4 text-forest-700 dark:text-emerald-400" />
              <span>ᱚᱰᱤᱭᱳ ᱟᱸᱡᱚᱢ | ऑडियो</span>
            </button>

            <button
              type="button"
              onClick={onToggleDarkMode}
              className="p-1.5 rounded-xl border border-stone-200 dark:border-[#264D3B] hover:bg-stone-100 dark:hover:bg-[#183526] text-stone-600 dark:text-emerald-300 transition-colors cursor-pointer"
              title={isDarkMode ? "लाइट मोड" : "डार्क मोड"}
            >
              {isDarkMode ? <Sun className="w-4 h-4 text-amber-400" /> : <Moon className="w-4 h-4 text-forest-700" />}
            </button>
          </div>
        </div>

        {/* Top Branding */}
        <div className="flex flex-col items-center text-center mb-6">
          <BhashaSetuLogo size="md" variant="vertical" showSubtitle={false} />
          <div className="inline-flex items-center gap-2 mt-2 px-3 py-1 rounded-full bg-amber-100/90 dark:bg-amber-950/50 border border-amber-300/80 dark:border-amber-700 text-amber-900 dark:text-amber-300 text-xs sm:text-sm font-bold">
            <Sparkles className="w-4 h-4 text-amber-600 dark:text-amber-400" />
            <span>ᱪᱮᱛᱮᱫᱤᱭᱟᱹ ᱥᱮᱪᱮᱫ ᱯᱳᱨᱴᱟᱞ | विद्यार्थी अध्ययन पोर्टल</span>
          </div>

          <h2 className="text-2xl sm:text-3xl font-black text-forest-900 dark:text-white mt-3">
            ᱪᱮᱛᱮᱫᱤᱭᱟᱹ ᱵᱚᱞᱚᱱ (Student Login)
          </h2>
          <p className="text-sm sm:text-base text-stone-600 dark:text-stone-300 mt-1 max-w-md">
            ᱟᱢᱟᱜ ᱪᱟᱱᱟᱪ ᱟᱨ ᱧᱩᱛᱩᱢ ᱪᱷᱟᱹ touch ᱢᱮ ᱾ (अपनी कक्षा और नाम चुनें, फिर पढ़ाई शुरू करें!)
          </p>
        </div>

        {/* Class Selection Tabs */}
        <div className="flex items-center justify-center gap-2 mb-5 flex-wrap">
          {["कक्षा 1", "कक्षा 2", "कक्षा 3", "कक्षा 4", "कक्षा 5"].map((gr, idx) => (
            <button
              key={gr}
              onClick={() => handleSelectGrade(gr)}
              className={`px-3 sm:px-4 py-1.5 rounded-full text-xs sm:text-sm font-extrabold transition-all cursor-pointer ${
                selectedGrade === gr
                  ? "bg-[#1E4D36] text-white shadow-xs"
                  : "bg-stone-100 dark:bg-[#172E22] hover:bg-stone-200 dark:hover:bg-[#1E3E2E] text-stone-700 dark:text-stone-300"
              }`}
            >
              {gr} / ᱪᱟᱱᱟᱪ {idx + 1}
            </button>
          ))}
        </div>

        {/* Student Avatar Cards Grid */}
        <div className="mb-6">
          <div className="flex items-center justify-between mb-2.5 px-1">
            <span className="text-xs sm:text-sm font-bold text-stone-700 dark:text-stone-300">
              ᱟᱢᱟᱜ ᱧᱩᱛᱩᱢ ᱪᱷᱟᱹ touch ᱢᱮ ({selectedGrade}):
            </span>
            <span className="text-xs text-forest-800 dark:text-emerald-300 font-semibold">
              ᱪᱷᱟᱹ touch ᱟᱠᱟᱱ: <span className="font-extrabold text-forest-900 dark:text-white">{selectedStudent.nameOlChiki} ({selectedStudent.name})</span>
            </span>
          </div>

          <div className="grid grid-cols-2 sm:grid-cols-3 gap-2.5 sm:gap-3">
            {currentStudents.map((st) => {
              const isSelected = selectedStudent.id === st.id;
              return (
                <button
                  key={st.id}
                  onClick={() => handleSelectStudent(st)}
                  className={`p-3 rounded-2xl border-2 text-left transition-all cursor-pointer relative flex flex-col items-center text-center ${
                    isSelected
                      ? "bg-pastel-green/70 dark:bg-[#1C3E2C] border-forest-600 dark:border-emerald-400 ring-2 ring-forest-500/20 shadow-sm"
                      : "bg-cream-50 dark:bg-[#15281E] hover:bg-stone-50 dark:hover:bg-[#193225] border-stone-200/80 dark:border-[#224734]"
                  }`}
                >
                  {isSelected && (
                    <div className="absolute top-2 right-2 w-5 h-5 bg-forest-700 dark:bg-emerald-500 text-white rounded-full flex items-center justify-center">
                      <Check className="w-3 h-3" />
                    </div>
                  )}
                  <div className="w-12 h-12 rounded-full bg-white dark:bg-[#102018] border-2 border-stone-200 dark:border-[#29543E] flex items-center justify-center text-2xl shadow-2xs mb-1.5">
                    {st.avatar}
                  </div>
                  <span className="font-black text-base text-forest-900 dark:text-emerald-300 leading-tight">
                    {st.nameOlChiki}
                  </span>
                  <span className="font-extrabold text-xs text-stone-700 dark:text-stone-300 leading-tight">
                    ({st.name})
                  </span>
                  <span className="text-[11px] text-forest-800 dark:text-emerald-300 font-bold mt-0.5">
                    {st.lang} • रोल #{st.roll}
                  </span>
                  <span className="text-[11px] text-amber-700 dark:text-amber-300 font-bold mt-1 bg-amber-50 dark:bg-amber-950/40 px-2 py-0.5 rounded-full border border-amber-200 dark:border-amber-800">
                    ⭐ {st.stars} ᱤᱯᱤᱞ (Stars)
                  </span>
                </button>
              );
            })}
          </div>
        </div>

        {/* Primary Action Button */}
        <button
          onClick={handleEnterStudentPortal}
          className="w-full py-4 rounded-2xl bg-[#1E4D36] hover:bg-[#163827] active:scale-[0.99] text-white font-extrabold text-base sm:text-lg flex items-center justify-center gap-3 shadow-md hover:shadow-lg transition-all cursor-pointer"
        >
          <span>{selectedStudent.nameOlChiki} ({selectedStudent.name}) - ᱯᱟᱲᱦᱟᱣ ᱮᱦᱚᱵᱽ ᱢᱮ</span>
          <ArrowRight className="w-5 h-5" />
        </button>

        {/* Note */}
        <div className="mt-4 pt-3 border-t border-stone-100 dark:border-[#224734] text-center text-xs text-stone-500 dark:text-stone-400">
          ᱥᱩᱨᱟᱹᱠᱷᱤᱛ ᱵᱟᱞ ᱥᱮᱪᱮᱫ ᱯᱳᱨᱴᱟᱞ • Jharkhand Primary Education Council
        </div>

      </div>
    </div>
  );
}
