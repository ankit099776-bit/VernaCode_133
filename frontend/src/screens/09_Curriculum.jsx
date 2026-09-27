import React, { useState } from "react";
import {
  Search,
  BookOpen,
  Clock,
  CheckCircle2,
  PlayCircle,
  Sparkles,
  ChevronRight,
  ArrowRight,
  X,
  FileSpreadsheet,
  Layers,
  HelpCircle,
} from "lucide-react";
import { CURRICULUM_LESSONS } from "../data/bhashaData";

export default function Curriculum({ onNavigate }) {
  const [selectedClass, setSelectedClass] = useState("कक्षा 2");
  const [selectedSubject, setSelectedSubject] = useState("हिंदी");
  const [searchQuery, setSearchQuery] = useState("");
  const [activeLessonModal, setActiveLessonModal] = useState(null);

  const filteredLessons = CURRICULUM_LESSONS.filter(
    (l) =>
      l.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      l.subtitle.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="p-4 sm:p-6 lg:p-8 space-y-6 max-w-6xl mx-auto font-hindi select-none">
      {/* Top Filter Bar matching Mockup Screen 9 */}
      <div className="bg-white rounded-3xl p-4 border border-stone-200/90 shadow-2xs flex flex-wrap items-center justify-between gap-3">
        <div className="flex items-center gap-3 flex-wrap flex-1">
          {/* कक्षा Filter */}
          <div className="flex items-center gap-1.5">
            <span className="text-xs font-bold text-stone-500">कक्षा:</span>
            <select
              value={selectedClass}
              onChange={(e) => setSelectedClass(e.target.value)}
              className="bg-cream-50 border border-stone-200 rounded-xl px-3 py-1.5 text-xs font-bold text-forest-900 outline-none focus:border-forest-600"
            >
              <option>कक्षा 1</option>
              <option>कक्षा 2</option>
              <option>कक्षा 3</option>
              <option>कक्षा 4</option>
              <option>कक्षा 5</option>
            </select>
          </div>

          {/* विषय Filter */}
          <div className="flex items-center gap-1.5">
            <span className="text-xs font-bold text-stone-500">विषय:</span>
            <select
              value={selectedSubject}
              onChange={(e) => setSelectedSubject(e.target.value)}
              className="bg-cream-50 border border-stone-200 rounded-xl px-3 py-1.5 text-xs font-bold text-forest-900 outline-none focus:border-forest-600"
            >
              <option>हिंदी</option>
              <option>पर्यावरण अध्ययन</option>
              <option>गणित (गिनती)</option>
            </select>
          </div>

          {/* Search Input matching Mockup Screen 9 */}
          <div className="relative flex-1 min-w-[200px] max-w-xs">
            <Search className="w-3.5 h-3.5 text-stone-400 absolute left-3 top-2.5" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="पाठ खोजें..."
              className="w-full pl-9 pr-3 py-1.5 rounded-xl bg-cream-50 border border-stone-200 text-xs text-stone-800 outline-none focus:border-forest-600"
            />
          </div>
        </div>

        <div className="text-xs font-bold text-forest-800 bg-pastel-green px-3 py-1.5 rounded-xl border border-pastel-greenBorder">
          झारखंड प्राथमिक पाठ्यक्रम (JCERT अनुकूलित)
        </div>
      </div>

      {/* Grid of 6 Lesson Cards matching Mockup Screen 9 (3 cols x 2 rows) */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-5">
        {filteredLessons.map((lesson) => (
          <div
            key={lesson.id}
            onClick={() => setActiveLessonModal(lesson)}
            className="bg-white rounded-3xl p-5 border border-stone-200/90 shadow-2xs hover:shadow-card hover:border-forest-400 transition-all cursor-pointer flex flex-col justify-between group"
          >
            <div>
              {/* Card Header & Unit Counter */}
              <div className="flex items-center justify-between mb-3">
                <span className="text-[11px] font-bold text-forest-700 bg-pastel-green px-2.5 py-0.5 rounded-full">
                  {lesson.duration}
                </span>
                <span className="text-xs font-numeric font-bold text-stone-600">
                  {lesson.progress}%
                </span>
              </div>

              {/* Title & Subtitle */}
              <h3 className="text-lg font-extrabold text-forest-900 group-hover:text-forest-700 transition-colors">
                {lesson.title}
              </h3>
              <p className="text-xs text-stone-500 font-medium mt-0.5 mb-4">
                {lesson.subtitle}
              </p>

              {/* Progress Bar */}
              <div className="w-full bg-stone-100 rounded-full h-2 overflow-hidden mb-4">
                <div
                  className="bg-forest-600 h-full rounded-full transition-all duration-500"
                  style={{ width: `${lesson.progress}%` }}
                />
              </div>
            </div>

            {/* Bottom Card Action Button matching Mockup */}
            <div className="pt-2 border-t border-stone-100 flex items-center justify-between">
              <span className="text-[11px] font-bold text-stone-600">
                {lesson.progress > 0 ? "प्रगति में" : "नया पाठ"}
              </span>

              <button
                type="button"
                className={`px-4 py-1.5 rounded-xl text-xs font-bold transition-all flex items-center gap-1 ${
                  lesson.progress > 0
                    ? "bg-pastel-amber text-amber-900 border border-pastel-amberBorder hover:bg-amber-100"
                    : "bg-forest-700 hover:bg-forest-800 text-white shadow-2xs"
                }`}
              >
                <span>{lesson.statusLabel}</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </button>
            </div>
          </div>
        ))}
      </div>

      {/* Interactive Lesson Detail Modal */}
      {activeLessonModal && (
        <div className="fixed inset-0 bg-stone-900/40 backdrop-blur-xs z-50 flex items-center justify-center p-4">
          <div className="bg-white rounded-3xl p-6 max-w-xl w-full shadow-float border border-stone-200 space-y-4 font-hindi max-h-[90vh] overflow-y-auto">
            <div className="flex items-center justify-between border-b border-stone-100 pb-3">
              <div>
                <span className="text-[11px] font-bold text-forest-700 bg-pastel-green px-2.5 py-0.5 rounded-full">
                  {activeLessonModal.classNum} • {activeLessonModal.duration}
                </span>
                <h3 className="text-xl font-extrabold text-forest-900 mt-1">
                  {activeLessonModal.title}
                </h3>
              </div>
              <button
                onClick={() => setActiveLessonModal(null)}
                className="p-1.5 rounded-xl text-stone-400 hover:text-stone-700 hover:bg-stone-100"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <p className="text-xs text-stone-700 leading-relaxed bg-cream-50 p-3 rounded-2xl border border-stone-200/80">
              {activeLessonModal.overview}
            </p>

            {/* Units checklist */}
            <div>
              <h4 className="text-xs font-bold text-stone-700 mb-2">
                इकाइयाँ (Units):
              </h4>
              <div className="space-y-1.5">
                {activeLessonModal.units.map((u, i) => (
                  <div
                    key={i}
                    className="flex items-center justify-between p-2.5 rounded-xl bg-stone-50 border border-stone-200/60 text-xs"
                  >
                    <div className="flex items-center gap-2">
                      <span className="font-bold text-forest-700">{u.num}.</span>
                      <span className="font-semibold text-stone-800">{u.name}</span>
                    </div>
                    {u.completed ? (
                      <span className="text-emerald-700 font-bold text-[11px] flex items-center gap-1">
                        <CheckCircle2 className="w-3.5 h-3.5" />
                        <span>पूर्ण</span>
                      </span>
                    ) : (
                      <span className="text-stone-600 text-[11px] font-medium">शेष</span>
                    )}
                  </div>
                ))}
              </div>
            </div>

            {/* Bilingual Teacher Note */}
            <div className="p-3.5 bg-pastel-amber/60 rounded-2xl border border-pastel-amberBorder space-y-1">
              <span className="text-[11px] font-bold text-amber-900 flex items-center gap-1">
                <Sparkles className="w-3.5 h-3.5 text-amber-700" />
                <span>द्विभाषी शिक्षण मार्गदर्शन (संताली / हो संदर्भ):</span>
              </span>
              <p className="text-xs text-stone-800 leading-relaxed">
                {activeLessonModal.bilingualNote}
              </p>
            </div>

            {/* Quick Actions */}
            <div className="flex gap-2 pt-2">
              <button
                onClick={() => {
                  setActiveLessonModal(null);
                  onNavigate("worksheet-generator");
                }}
                className="flex-1 py-2 rounded-xl bg-forest-700 text-white text-xs font-bold shadow-xs hover:bg-forest-800"
              >
                कार्यपत्रक बनाएं
              </button>
              <button
                onClick={() => {
                  setActiveLessonModal(null);
                  onNavigate("flashcards");
                }}
                className="flex-1 py-2 rounded-xl bg-pastel-purple border border-pastel-purpleBorder text-purple-900 text-xs font-bold hover:bg-purple-100"
              >
                शब्द कार्ड अभ्यास
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
