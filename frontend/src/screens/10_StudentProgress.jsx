import React, { useState } from "react";
import {
  Search,
  AlertTriangle,
  RotateCcw,
  CheckCircle2,
  TrendingUp,
  X,
  FileSpreadsheet,
  BrainCircuit,
  Sparkles,
  UserCheck,
} from "lucide-react";
import { STUDENTS_PROGRESS } from "../data/bhashaData";

export default function StudentProgress({ onNavigate }) {
  const [selectedClass, setSelectedClass] = useState("कक्षा 2");
  const [selectedCategory, setSelectedCategory] = useState("सभी");
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedStudentModal, setSelectedStudentModal] = useState(null);

  const filteredStudents = STUDENTS_PROGRESS.filter((s) => {
    const matchesSearch = s.name.toLowerCase().includes(searchQuery.toLowerCase());
    if (selectedCategory === "सभी") return matchesSearch;
    if (selectedCategory === "भाषा सहायता") return matchesSearch && s.statusType === "alert";
    if (selectedCategory === "अवधारणा पुनरावृत्ति") return matchesSearch && s.statusType === "warning";
    return matchesSearch;
  });

  return (
    <div className="p-4 sm:p-6 lg:p-8 space-y-6 max-w-6xl mx-auto font-hindi select-none">
      {/* Top Banner Alert for Language Gaps */}
      <div className="p-4 rounded-3xl bg-pastel-amber/60 border border-pastel-amberBorder flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 shadow-2xs">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-2xl bg-amber-100 text-amber-800 flex items-center justify-center shrink-0">
            <AlertTriangle className="w-5 h-5 stroke-[2.2]" />
          </div>
          <div>
            <h3 className="font-extrabold text-sm text-amber-950">
              भाषा-गैप पहचान विश्लेषण (AI Language Gap Diagnostics)
            </h3>
            <p className="text-xs text-amber-900 mt-0.5">
              12 छात्रों की अवधारणा स्पष्ट है, परंतु वे मानक हिंदी परीक्षा में केवल भाषा-अड़चन के कारण अंक खो रहे हैं।
            </p>
          </div>
        </div>

        <button
          onClick={() => setSelectedStudentModal(STUDENTS_PROGRESS[0])}
          className="px-3.5 py-1.5 rounded-xl bg-amber-600 hover:bg-amber-700 text-white font-bold text-xs shadow-xs shrink-0"
        >
          रवि का विश्लेषण देखें
        </button>
      </div>

      {/* Filter Bar matching Mockup Screen 10 */}
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
              <option>कक्षा 2</option>
              <option>कक्षा 1</option>
              <option>कक्षा 3</option>
            </select>
          </div>

          {/* श्रेणी Filter */}
          <div className="flex items-center gap-1.5">
            <span className="text-xs font-bold text-stone-500">श्रेणी:</span>
            <select
              value={selectedCategory}
              onChange={(e) => setSelectedCategory(e.target.value)}
              className="bg-cream-50 border border-stone-200 rounded-xl px-3 py-1.5 text-xs font-bold text-forest-900 outline-none focus:border-forest-600"
            >
              <option>सभी</option>
              <option>भाषा सहायता</option>
              <option>अवधारणा पुनरावृत्ति</option>
            </select>
          </div>

          {/* Search Input matching Mockup Screen 10 */}
          <div className="relative flex-1 min-w-[200px] max-w-xs">
            <Search className="w-3.5 h-3.5 text-stone-400 absolute left-3 top-2.5" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="विद्यार्थी खोजें..."
              className="w-full pl-9 pr-3 py-1.5 rounded-xl bg-cream-50 border border-stone-200 text-xs text-stone-800 outline-none focus:border-forest-600"
            />
          </div>
        </div>

        <div className="text-xs font-bold text-stone-500">
          कुल विद्यार्थी: <span className="font-numeric font-black text-forest-900">42</span>
        </div>
      </div>

      {/* Student Table matching Mockup Screen 10 */}
      <div className="bg-white rounded-3xl border border-stone-200/90 shadow-2xs overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="bg-stone-50 border-b border-stone-200/80 text-[11px] font-bold text-stone-500 uppercase tracking-wider">
                <th className="py-3.5 px-5">विद्यार्थी का नाम</th>
                <th className="py-3.5 px-4 text-center">अवधारणा में पकड़</th>
                <th className="py-3.5 px-4 text-center">भाषा में पकड़</th>
                <th className="py-3.5 px-4 text-center">क्विज प्रदर्शन</th>
                <th className="py-3.5 px-5">स्थिति / रिपोर्ट</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-stone-100 text-xs sm:text-sm">
              {filteredStudents.map((student) => (
                <tr
                  key={student.id}
                  onClick={() => setSelectedStudentModal(student)}
                  className="hover:bg-cream-50/80 cursor-pointer transition-colors group"
                >
                  {/* Name & Avatar */}
                  <td className="py-3.5 px-5">
                    <div className="flex items-center gap-3">
                      <div className="w-9 h-9 rounded-full bg-pastel-green text-forest-900 border border-pastel-greenBorder flex items-center justify-center text-lg shrink-0">
                        {student.avatar}
                      </div>
                      <div>
                        <div className="font-extrabold text-stone-900 group-hover:text-forest-700 transition-colors">
                          {student.name}
                        </div>
                        <div className="text-[10px] text-stone-600 font-semibold">
                          मातृभाषा: {student.motherTongue}
                        </div>
                      </div>
                    </div>
                  </td>

                  {/* अवधारणा में पकड़ */}
                  <td className="py-3.5 px-4 text-center font-numeric font-extrabold text-stone-900">
                    <span className="px-2 py-1 rounded-lg bg-emerald-50 text-emerald-800">
                      {student.conceptMastery}%
                    </span>
                  </td>

                  {/* भाषा में पकड़ */}
                  <td className="py-3.5 px-4 text-center font-numeric font-extrabold">
                    <span
                      className={`px-2 py-1 rounded-lg ${
                        student.languageMastery < 50
                          ? "bg-amber-50 text-amber-800 font-black ring-1 ring-amber-300"
                          : "bg-stone-100 text-stone-800"
                      }`}
                    >
                      {student.languageMastery}%
                    </span>
                  </td>

                  {/* क्विज प्रदर्शन */}
                  <td className="py-3.5 px-4 text-center font-numeric font-extrabold text-stone-900">
                    {student.quizPerformance}%
                  </td>

                  {/* स्थिति / रिपोर्ट Badge matching Mockup Screen 10 */}
                  <td className="py-3.5 px-5">
                    <span
                      className={`inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-bold ${
                        student.statusType === "alert"
                          ? "bg-amber-100 text-amber-900 border border-amber-300"
                          : student.statusType === "warning"
                          ? "bg-orange-100 text-orange-900 border border-orange-200"
                          : student.statusType === "danger"
                          ? "bg-rose-100 text-rose-900 border border-rose-200"
                          : student.statusType === "success"
                          ? "bg-emerald-100 text-emerald-900 border border-emerald-200"
                          : "bg-blue-100 text-blue-900 border border-blue-200"
                      }`}
                    >
                      {student.statusType === "alert" && (
                        <AlertTriangle className="w-3 h-3 text-amber-700" />
                      )}
                      {student.statusType === "warning" && (
                        <RotateCcw className="w-3 h-3 text-orange-700" />
                      )}
                      {student.statusType === "success" && (
                        <CheckCircle2 className="w-3 h-3 text-emerald-700" />
                      )}
                      <span>{student.status}</span>
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Student Diagnostic Modal */}
      {selectedStudentModal && (
        <div className="fixed inset-0 bg-stone-900/40 backdrop-blur-xs z-50 flex items-center justify-center p-4">
          <div className="bg-white rounded-3xl p-6 max-w-lg w-full shadow-float border border-stone-200 space-y-4 font-hindi">
            <div className="flex items-center justify-between border-b border-stone-100 pb-3">
              <div className="flex items-center gap-3">
                <div className="w-12 h-12 rounded-full bg-pastel-green text-2xl flex items-center justify-center">
                  {selectedStudentModal.avatar}
                </div>
                <div>
                  <h3 className="text-xl font-extrabold text-forest-900">
                    {selectedStudentModal.name} का भाषा-गैप कार्ड
                  </h3>
                  <p className="text-xs text-stone-500">
                    {selectedStudentModal.classNum} • मातृभाषा: {selectedStudentModal.motherTongue}
                  </p>
                </div>
              </div>

              <button
                onClick={() => setSelectedStudentModal(null)}
                className="p-1.5 rounded-xl text-stone-400 hover:text-stone-700 hover:bg-stone-100"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Comparison Metrics */}
            <div className="grid grid-cols-2 gap-3">
              <div className="bg-emerald-50 p-3.5 rounded-2xl border border-emerald-200 text-center">
                <span className="text-xs font-bold text-emerald-800 block">
                  अवधारणा समझ (Concept)
                </span>
                <span className="text-2xl font-black font-numeric text-emerald-900 mt-1 block">
                  {selectedStudentModal.conceptMastery}%
                </span>
                <span className="text-[10px] text-emerald-700">उच्च स्तर (अवधारणा स्पष्ट)</span>
              </div>

              <div className="bg-amber-50 p-3.5 rounded-2xl border border-amber-200 text-center">
                <span className="text-xs font-bold text-amber-800 block">
                  हिंदी भाषा पकड़
                </span>
                <span className="text-2xl font-black font-numeric text-amber-900 mt-1 block">
                  {selectedStudentModal.languageMastery}%
                </span>
                <span className="text-[10px] text-amber-700">सहायता की आवश्यकता</span>
              </div>
            </div>

            {/* AI Insight Box */}
            <div className="p-4 bg-pastel-green/50 rounded-2xl border border-pastel-greenBorder space-y-1.5">
              <div className="flex items-center gap-1.5 font-bold text-xs text-forest-900">
                <Sparkles className="w-3.5 h-3.5 text-forest-700" />
                <span>शिक्षण अंतर्दृष्टि एवं सुझाव:</span>
              </div>
              <p className="text-xs text-stone-800 leading-relaxed">
                {selectedStudentModal.insight}
              </p>
            </div>

            <div className="text-xs space-y-1 text-stone-700">
              <div>
                <strong>मुख्य त्रुटि:</strong> {selectedStudentModal.commonMistake}
              </div>
              <div>
                <strong>अनुशंसित कार्यपत्रक:</strong> {selectedStudentModal.recommendedWorksheet}
              </div>
            </div>

            <div className="flex gap-2 pt-2">
              <button
                onClick={() => {
                  setSelectedStudentModal(null);
                  onNavigate("worksheet-generator");
                }}
                className="flex-1 py-2.5 rounded-xl bg-forest-700 hover:bg-forest-800 text-white font-bold text-xs"
              >
                सुधार कार्यपत्रक तैयार करें
              </button>
              <button
                onClick={() => {
                  setSelectedStudentModal(null);
                  onNavigate("teach-back");
                }}
                className="flex-1 py-2.5 rounded-xl bg-pastel-purple text-purple-900 border border-pastel-purpleBorder font-bold text-xs hover:bg-purple-100"
              >
                सीख-सुनाओ टेस्ट लें
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
