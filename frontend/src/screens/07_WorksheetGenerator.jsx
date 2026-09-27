import React, { useState } from "react";
import {
  FileSpreadsheet,
  Download,
  Printer,
  Edit3,
  Bookmark,
  Sparkles,
  CheckCircle,
  RefreshCw,
  Eye,
  Send,
  Save,
  BookOpen
} from "lucide-react";
import { SAMPLE_WORKSHEETS, WORKSHEET_TOPICS } from "../data/bhashaData";

export default function WorksheetGenerator({ onPublishWorksheet, publishedWorksheets = [] }) {
  const [selectedClass, setSelectedClass] = useState("कक्षा 2");
  const [selectedTopic, setSelectedTopic] = useState("class2-hindi");
  const [questionType, setQuestionType] = useState("रिक्त स्थान भरें");
  const [difficulty, setDifficulty] = useState("मध्यम (कक्षा स्तर)");
  const [questionCount, setQuestionCount] = useState(5);
  const [languageOption, setLanguageOption] = useState("हिंदी");
  
  // State for on-demand generation workflow
  const [hasGenerated, setHasGenerated] = useState(false);
  const [isGenerating, setIsGenerating] = useState(false);
  const [isEditing, setIsEditing] = useState(false);
  const [publishSuccess, setPublishSuccess] = useState(false);

  // Active generated worksheet state
  const [generatedWorksheet, setGeneratedWorksheet] = useState(null);
  const [editableQuestions, setEditableQuestions] = useState([]);

  // Available topics filtered for selected class
  const classTopics = WORKSHEET_TOPICS.filter((t) => t.classLevel === selectedClass);

  const handleClassChange = (newClass) => {
    setSelectedClass(newClass);
    const matchingTopics = WORKSHEET_TOPICS.filter((t) => t.classLevel === newClass);
    if (matchingTopics.length > 0) {
      setSelectedTopic(matchingTopics[0].id);
    }
    setHasGenerated(false);
  };

  const handleGenerate = () => {
    setIsGenerating(true);
    setPublishSuccess(false);

    setTimeout(() => {
      setIsGenerating(false);
      const ws = SAMPLE_WORKSHEETS[selectedTopic] || SAMPLE_WORKSHEETS["class2-hindi"];
      const finalWs = {
        id: `ws-${Date.now()}`,
        title: ws.title,
        classLevel: selectedClass,
        subject: ws.subject || "हिंदी",
        board: ws.board || "झारखंड शैक्षणिक परिषद (JAC)",
        instructions: ws.instructions,
        questions: [...ws.questions],
        answerKey: ws.answerKey ? [...ws.answerKey] : [],
        publishedAt: new Date().toISOString().split("T")[0],
        teacherName: "अनन्या शर्मा"
      };
      setGeneratedWorksheet(finalWs);
      setEditableQuestions([...ws.questions]);
      setHasGenerated(true);
      setIsEditing(false);

      // Auto-publish to student portal immediately upon generation
      onPublishWorksheet?.(finalWs);
      setPublishSuccess(true);
    }, 600);
  };

  const handleQuestionChange = (index, field, value) => {
    const updated = [...editableQuestions];
    if (field === "options") {
      updated[index][field] = value.split(",").map((s) => s.trim());
    } else {
      updated[index][field] = value;
    }
    setEditableQuestions(updated);
  };

  const handleApproveAndPublish = () => {
    if (!generatedWorksheet) return;

    const publishedRecord = {
      ...generatedWorksheet,
      questions: editableQuestions,
      publishedAt: new Date().toISOString().split("T")[0],
      teacherName: "अनन्या शर्मा",
      classLevel: selectedClass,
    };

    onPublishWorksheet?.(publishedRecord);
    setPublishSuccess(true);
    setTimeout(() => setPublishSuccess(false), 4000);
  };

  const handlePrint = () => {
    window.print();
  };

  return (
    <div className="p-4 sm:p-6 lg:p-8 space-y-6 max-w-6xl mx-auto font-hindi select-none">
      {/* Top Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-2 pb-1 no-print">
        <div>
          <div className="flex items-center gap-2">
            <h2 className="text-xl sm:text-2xl font-extrabold text-forest-900 dark:text-emerald-300">
              झारखंड प्राथमिक कार्यपत्रक निर्माण (कक्षा 1, 2, 3)
            </h2>
            <span className="bg-amber-100 text-amber-900 text-xs font-black px-2.5 py-0.5 rounded-full border border-amber-300">
              JAC बोर्ड पाठ्यक्रम
            </span>
          </div>
          <p className="text-xs text-stone-500 dark:text-stone-400 mt-0.5">
            झारखंड शैक्षणिक परिषद पाठ्यक्रम के अनुसार स्वचालित अभ्यास पत्र बनाएं, संशोधित करें एवं अनुमोदित करके विद्यार्थी पोर्टल पर भेजें।
          </p>
        </div>

        <div className="flex items-center gap-2">
          <span className="text-xs font-bold text-forest-800 bg-pastel-green px-3 py-1 rounded-xl border border-pastel-greenBorder">
            AI सहायता प्राप्त निर्माण
          </span>
        </div>
      </div>

      {/* Form Configuration Box */}
      <div className="bg-white dark:bg-[#12241A] rounded-3xl p-5 sm:p-6 border border-stone-200/90 dark:border-[#224734] shadow-xs space-y-4 no-print">
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
          {/* कक्षा चुनें (Restricted strictly to Class 1, 2, 3 as required) */}
          <div>
            <label className="block text-xs font-bold text-stone-700 dark:text-emerald-300 mb-1.5">
              कक्षा चुनें (केवल कक्षा 1, 2 व 3)
            </label>
            <select
              value={selectedClass}
              onChange={(e) => handleClassChange(e.target.value)}
              className="w-full bg-cream-50 dark:bg-[#162E22] border border-stone-200 dark:border-[#2B573F] rounded-xl px-3 py-2 text-xs sm:text-sm font-bold text-forest-900 dark:text-emerald-100 outline-none focus:border-forest-600"
            >
              <option value="कक्षा 1">कक्षा 1 (Class 1)</option>
              <option value="कक्षा 2">कक्षा 2 (Class 2)</option>
              <option value="कक्षा 3">कक्षा 3 (Class 3)</option>
            </select>
          </div>

          {/* विषय एवं पाठ्य-बिंदु चुनें */}
          <div>
            <label className="block text-xs font-bold text-stone-700 dark:text-emerald-300 mb-1.5">
              झारखंड पाठ्यक्रम विषय एवं पाठ
            </label>
            <select
              value={selectedTopic}
              onChange={(e) => {
                setSelectedTopic(e.target.value);
                setHasGenerated(false);
              }}
              className="w-full bg-cream-50 dark:bg-[#162E22] border border-stone-200 dark:border-[#2B573F] rounded-xl px-3 py-2 text-xs sm:text-sm font-bold text-forest-900 dark:text-emerald-100 outline-none focus:border-forest-600"
            >
              {(classTopics.length > 0 ? classTopics : WORKSHEET_TOPICS).map((t) => (
                <option key={t.id} value={t.id}>
                  {t.name}
                </option>
              ))}
            </select>
          </div>

          {/* प्रश्न का प्रकार */}
          <div>
            <label className="block text-xs font-bold text-stone-700 dark:text-emerald-300 mb-1.5">
              प्रश्न का प्रकार
            </label>
            <select
              value={questionType}
              onChange={(e) => setQuestionType(e.target.value)}
              className="w-full bg-cream-50 dark:bg-[#162E22] border border-stone-200 dark:border-[#2B573F] rounded-xl px-3 py-2 text-xs sm:text-sm font-bold text-forest-900 dark:text-emerald-100 outline-none focus:border-forest-600"
            >
              <option>रिक्त स्थान भरें (Fill in Blanks)</option>
              <option>सही मिलान करें (Match the following)</option>
              <option>बहुविकल्पीय प्रश्न (MCQ)</option>
              <option>वर्णमाला व Ol Chiki अभ्यास</option>
            </select>
          </div>

          {/* कठिनाई स्तर */}
          <div>
            <label className="block text-xs font-bold text-stone-700 dark:text-emerald-300 mb-1.5">
              कठिनाई स्तर
            </label>
            <select
              value={difficulty}
              onChange={(e) => setDifficulty(e.target.value)}
              className="w-full bg-cream-50 dark:bg-[#162E22] border border-stone-200 dark:border-[#2B573F] rounded-xl px-3 py-2 text-xs sm:text-sm font-bold text-forest-900 dark:text-emerald-100 outline-none focus:border-forest-600"
            >
              <option>सरल (आधारभूत स्तर)</option>
              <option>मध्यम (कक्षा स्तर)</option>
              <option>उन्नत (अभ्यास स्तर)</option>
            </select>
          </div>

          {/* प्रश्नों की संख्या */}
          <div>
            <label className="block text-xs font-bold text-stone-700 dark:text-emerald-300 mb-1.5">
              प्रश्नों की संख्या
            </label>
            <select
              value={questionCount}
              onChange={(e) => setQuestionCount(Number(e.target.value))}
              className="w-full bg-cream-50 dark:bg-[#162E22] border border-stone-200 dark:border-[#2B573F] rounded-xl px-3 py-2 text-xs sm:text-sm font-bold text-forest-900 dark:text-emerald-100 outline-none focus:border-forest-600"
            >
              <option value={3}>3 प्रश्न</option>
              <option value={5}>5 प्रश्न</option>
              <option value={10}>10 प्रश्न</option>
            </select>
          </div>

          {/* भाषा / लिपि */}
          <div>
            <label className="block text-xs font-bold text-stone-700 dark:text-emerald-300 mb-1.5">
              भाषा माध्यम
            </label>
            <select
              value={languageOption}
              onChange={(e) => setLanguageOption(e.target.value)}
              className="w-full bg-cream-50 dark:bg-[#162E22] border border-stone-200 dark:border-[#2B573F] rounded-xl px-3 py-2 text-xs sm:text-sm font-bold text-forest-900 dark:text-emerald-100 outline-none focus:border-forest-600"
            >
              <option>हिंदी माध्यम</option>
              <option>द्विभाषी (हिंदी + संताली Ol Chiki)</option>
              <option>द्विभाषी (हिंदी + हो)</option>
            </select>
          </div>
        </div>

        {/* Generate Button */}
        <button
          onClick={handleGenerate}
          disabled={isGenerating}
          className="w-full py-3.5 rounded-2xl bg-forest-700 hover:bg-forest-800 text-white font-bold text-sm shadow-md hover:shadow-lg transition-all flex items-center justify-center gap-2 cursor-pointer"
        >
          {isGenerating ? (
            <>
              <RefreshCw className="w-4 h-4 animate-spin" />
              <span>झारखंड पाठ्यक्रमानुसार कार्यपत्रक तैयार हो रहा है...</span>
            </>
          ) : (
            <>
              <Sparkles className="w-4 h-4 text-amber-300 animate-pulse" />
              <span>कार्यपत्रक बनाएं (Generate Worksheet)</span>
            </>
          )}
        </button>
      </div>

      {/* SUCCESS PUBLISH ALERT */}
      {publishSuccess && (
        <div className="bg-emerald-100 dark:bg-emerald-950/80 border border-emerald-400 dark:border-emerald-600 text-emerald-900 dark:text-emerald-200 p-4 rounded-2xl flex items-center justify-between shadow-md">
          <div className="flex items-center gap-3">
            <CheckCircle className="w-6 h-6 text-emerald-600 dark:text-emerald-400 shrink-0" />
            <div>
              <p className="font-extrabold text-sm">
                कार्यपत्रक सफलतापूर्वक अनुमोदित हो गया है!
              </p>
              <p className="text-xs mt-0.5">
                यह कार्यपत्रक <strong>{selectedClass}</strong> के विद्यार्थियों के लिए विद्यार्थी पोर्टल पर तुरंत उपलब्ध करा दिया गया है।
              </p>
            </div>
          </div>
          <span className="text-xs bg-emerald-600 text-white px-3 py-1 rounded-xl font-bold">
            विद्यार्थी पोर्टल पर प्रेषित ✓
          </span>
        </div>
      )}

      {/* WORKSHEET DISPLAY AREA: Shows ONLY AFTER pressing Generate Worksheet */}
      {!hasGenerated ? (
        <div className="bg-white dark:bg-[#12241A] rounded-3xl p-10 border border-dashed border-stone-300 dark:border-[#224734] text-center space-y-3">
          <div className="w-14 h-14 bg-amber-50 dark:bg-amber-950/40 text-amber-600 rounded-full flex items-center justify-center mx-auto">
            <BookOpen className="w-7 h-7" />
          </div>
          <h3 className="text-lg font-bold text-forest-900 dark:text-emerald-200">
            कार्यपत्रक बनाने के लिए 'कार्यपत्रक बनाएं' बटन दबाएं
          </h3>
          <p className="text-xs text-stone-500 max-w-md mx-auto">
            ऊपर दिए गए फॉर्म से कक्षा (केवल कक्षा 1, 2 या 3) एवं विषय चुनें, फिर बटन पर क्लिक करें। शिक्षक के पास प्रश्न संशोधित करने व अनुमोदन का पूर्ण विकल्प होगा।
          </p>
        </div>
      ) : (
        <div className="bg-white dark:bg-[#12241A] rounded-3xl p-6 sm:p-8 border border-stone-200/90 dark:border-[#224734] shadow-card space-y-6">
          {/* Action Bar: Edit, Approve & Publish, Print */}
          <div className="flex flex-wrap items-center justify-between gap-3 bg-stone-50 dark:bg-[#162E22] p-3.5 rounded-2xl border border-stone-200 dark:border-[#224734] no-print">
            <div className="flex items-center gap-2">
              <button
                onClick={() => setIsEditing(!isEditing)}
                className={`px-3.5 py-2 rounded-xl text-xs font-extrabold flex items-center gap-2 transition-all cursor-pointer ${
                  isEditing
                    ? "bg-amber-500 text-white shadow-xs"
                    : "bg-stone-200 dark:bg-stone-800 text-stone-800 dark:text-stone-200 hover:bg-stone-300"
                }`}
              >
                <Edit3 className="w-4 h-4" />
                <span>{isEditing ? "संशोधन पूरा हुआ (Save Edit)" : "संशोधन करें (Edit Worksheet)"}</span>
              </button>

              <span className="text-xs text-stone-500 dark:text-stone-400">
                {isEditing ? "प्रश्न या उत्तर में बदलाव करें" : "अनुमोदन से पहले प्रश्नों की जांच करें"}
              </span>
            </div>

            <div className="flex items-center gap-2">
              <button
                onClick={handlePrint}
                className="px-3.5 py-2 bg-stone-200 dark:bg-stone-800 hover:bg-stone-300 text-stone-800 dark:text-stone-200 rounded-xl text-xs font-bold flex items-center gap-1.5 cursor-pointer"
              >
                <Printer className="w-4 h-4" />
                <span>प्रिंट / PDF</span>
              </button>

              <button
                onClick={handleApproveAndPublish}
                className="px-4 py-2 bg-emerald-600 hover:bg-emerald-700 text-white rounded-xl text-xs font-extrabold flex items-center gap-2 shadow-md hover:shadow-lg transition-all cursor-pointer"
              >
                <Send className="w-4 h-4" />
                <span>अनुमोदित करें और विद्यार्थी पोर्टल पर भेजें</span>
              </button>
            </div>
          </div>

          {/* Printable Header */}
          <div className="border-b-2 border-forest-800 dark:border-emerald-600 pb-4 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-2">
            <div>
              <span className="text-[10px] uppercase tracking-wider font-extrabold text-amber-600 dark:text-amber-400 bg-amber-50 dark:bg-amber-950 px-2.5 py-0.5 rounded-md border border-amber-200">
                {generatedWorksheet?.board || "झारखंड शैक्षणिक परिषद (JAC)"}
              </span>
              <h3 className="text-xl sm:text-2xl font-black text-forest-900 dark:text-emerald-100 mt-1">
                {generatedWorksheet?.title}
              </h3>
              <p className="text-xs text-stone-600 dark:text-emerald-300 font-bold mt-0.5">
                राजकीय प्राथमिक विद्यालय • {selectedClass} • {difficulty}
              </p>
            </div>

            <div className="text-right text-xs font-semibold text-stone-600 dark:text-stone-300 space-y-1">
              <div>विद्यार्थी का नाम: ________________________</div>
              <div>दिनांक: _________________ • पूर्णांक: {editableQuestions.length * 2}</div>
            </div>
          </div>

          {/* Instructions */}
          <div className="bg-cream-50 dark:bg-[#162E22] p-3.5 rounded-2xl border border-stone-200 dark:border-[#2B573F] text-xs font-bold text-stone-800 dark:text-emerald-200 flex items-center justify-between">
            <span>{generatedWorksheet?.instructions}</span>
            {isEditing && <span className="text-amber-600 font-extrabold text-xs">✏️ संपादन मोड सक्रिय है</span>}
          </div>

          {/* Questions List */}
          <div className="space-y-4">
            {editableQuestions.map((q, idx) => (
              <div
                key={q.id || idx}
                className="p-4 rounded-2xl bg-stone-50 dark:bg-[#162E22] border border-stone-200/80 dark:border-[#224734] space-y-3"
              >
                {isEditing ? (
                  <div className="space-y-2">
                    <label className="block text-xs font-bold text-amber-600">
                      प्रश्न {idx + 1} का विवरण:
                    </label>
                    <input
                      type="text"
                      value={q.prompt}
                      onChange={(e) => handleQuestionChange(idx, "prompt", e.target.value)}
                      className="w-full p-2 border rounded-xl bg-white dark:bg-[#0E1F17] text-xs sm:text-sm font-bold"
                    />

                    <label className="block text-xs font-bold text-amber-600">
                      विकल्प (अल्पविराम से अलग करें):
                    </label>
                    <input
                      type="text"
                      value={q.options ? q.options.join(", ") : ""}
                      onChange={(e) => handleQuestionChange(idx, "options", e.target.value)}
                      className="w-full p-2 border rounded-xl bg-white dark:bg-[#0E1F17] text-xs font-semibold"
                    />
                  </div>
                ) : (
                  <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
                    <span className="text-sm font-extrabold text-stone-900 dark:text-stone-100">
                      {q.prompt}
                    </span>

                    {q.options && q.options.length > 0 && (
                      <div className="text-xs font-bold text-forest-700 dark:text-emerald-300 bg-pastel-green dark:bg-[#173B2A] px-3 py-1.5 rounded-xl shrink-0 border border-emerald-300/40">
                        विकल्प: [ {q.options.join(" / ")} ]
                      </div>
                    )}
                  </div>
                )}
              </div>
            ))}
          </div>

          {/* Answer Key Footer */}
          <div className="pt-4 border-t border-stone-200 dark:border-[#224734] flex items-center justify-between text-xs text-stone-500">
            <span className="font-bold text-forest-800 dark:text-emerald-300">
              उत्तर कुंजी तैयार है • {editableQuestions.length} प्रश्न पूर्ण
            </span>
            <span className="font-hindi font-bold">
              भाषासेतु एआई — झारखंड प्राथमिक शिक्षा मॉड्यूल
            </span>
          </div>
        </div>
      )}
    </div>
  );
}
