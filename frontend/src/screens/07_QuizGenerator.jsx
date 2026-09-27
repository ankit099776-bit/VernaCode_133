import React, { useState } from "react";
import {
  HelpCircle,
  Sparkles,
  Plus,
  Trash2,
  CheckCircle,
  Clock,
  Check,
  Send,
  BookOpen,
  Volume2,
  Users,
  Award
} from "lucide-react";

export default function QuizGenerator({
  onPublishQuiz,
  publishedQuizzes = [],
  completedQuizzes = []
}) {
  const [selectedClass, setSelectedClass] = useState("कक्षा 2");
  const [subject, setSubject] = useState("हिंदी व मातृभाषा");
  const [quizTitle, setQuizTitle] = useState("कक्षा 2: दैनिक शब्द व ज्ञान क्विज़");
  const [instructions, setInstructions] = useState("प्रश्नों को ध्यान से पढ़ें और सही विकल्प पर टैप करें।");

  // Questions state for current quiz being created/edited
  const [questions, setQuestions] = useState([
    {
      id: 1,
      promptHindi: "संथाली भाषा में 'नमस्ते' (अभिवादन) को क्या कहते हैं?",
      promptTribal: "ᱥᱟᱱᱛᱟᱲᱤ ᱛᱮ 'नमस्ते' ᱫᱚ ᱪᱮᱛ ᱠᱚ ᱢᱮᱛᱟ-ᱟ?",
      options: ["सगात / जोहार 🙇‍♂️", "दाका 🍚", "गिदर 👦", "दारे 🌳"],
      correctIndex: 0,
      explanation: "संथाली में आदरपूर्वक अभिवादन को 'सगात' या 'जोहार' कहा जाता है।"
    },
    {
      id: 2,
      promptHindi: "चित्र पहचानें: 💧 'जल' को संथाली में क्या कहते हैं?",
      promptTribal: "ᱪᱤᱱᱦᱟᱹ ᱩᱨᱩᱢ: 'जल' ᱠᱮ ᱥᱟᱱᱛᱟᱲᱤ ᱛᱮ ᱪᱮᱛ ᱠᱚ ᱢᱮᱛᱟ-ᱟ?",
      options: ["उमुल (छाया)", "दाक् (जल)", "सेंगेल (आग)", "हॉय (हवा)"],
      correctIndex: 1,
      explanation: "'दाक्' का अर्थ जल अथवा पानी होता है।"
    },
    {
      id: 3,
      promptHindi: "विद्यालय 🏫 को संथाली में क्या कहते हैं?",
      promptTribal: "'स्कूल / विद्यालय' ᱫᱚ ᱥᱟᱱᱛᱟᱲᱤ ᱛᱮ ᱪᱮᱛ ᱠᱟᱱᱟ?",
      options: ["ओड़ाक्", "इस्कुल / आतु आसड़ा", "गाजड़", "जोहार"],
      correctIndex: 1,
      explanation: "विद्यालय के लिए आतु इस्कुल / इतून आसड़ा का प्रयोग किया जाता है।"
    }
  ]);

  const [publishedSuccessMsg, setPublishedSuccessMsg] = useState("");
  const [isGeneratingAI, setIsGeneratingAI] = useState(false);

  // Quick AI Generator templates by Class
  const handleAIGenerateQuiz = () => {
    setIsGeneratingAI(true);
    setTimeout(() => {
      if (selectedClass === "कक्षा 1") {
        setQuizTitle("कक्षा 1: चित्र, अक्षर व शब्द दैनिक क्विज़");
        setQuestions([
          {
            id: Date.now() + 1,
            promptHindi: "चित्र पहचानें: 🍎 'स्याऊ / सेब' को क्या कहते हैं?",
            promptTribal: "ᱱᱚᱣᱟ ᱪᱮᱛ ᱠᱟᱱᱟ? (नोवा चेत् काना?)",
            options: ["सेब (स्याऊ)", "आम (उल)", "केला (काएरा)", "पानी (दाक्)"],
            correctIndex: 0,
            explanation: "यह सेब (स्याऊ) का चित्र है।"
          },
          {
            id: Date.now() + 2,
            promptHindi: "संथाली में 💧 'जल' को क्या कहते हैं?",
            promptTribal: "'水/जल' ᱫᱚ ᱥᱟᱱᱛᱟᱲᱤ ᱛᱮ ᱪᱮᱛ ᱠᱚ ᱢᱮᱛᱟ-ᱟ?",
            options: ["सेंगेल (आग)", "दाक् (जल)", "हॉय (हवा)", "ओड़ाक् (घर)"],
            correctIndex: 1,
            explanation: "'दाक्' का अर्थ जल होता है।"
          },
          {
            id: Date.now() + 3,
            promptHindi: "'क' से शुरू होने वाला शब्द कौन सा है?",
            promptTribal: "'<ctrl42> (क) ᱥᱟᱲᱮ ᱛᱮ ᱮᱦᱚᱵᱚᱜ ᱟᱹᱲᱟᱹ ᱪᱮᱛ ᱠᱟᱱᱟ?",
            options: ["कमल 🪷", "खरगोश 🐰", "गमला 🪴", "घर 🏠"],
            correctIndex: 0,
            explanation: "कमल 'क' अक्षर से शुरू होता है।"
          }
        ]);
      } else if (selectedClass === "कक्षा 2") {
        setQuizTitle("कक्षा 2: दैनिक शब्द, मात्रा व संज्ञा क्विज़");
        setQuestions([
          {
            id: Date.now() + 1,
            promptHindi: "संथाली भाषा में 'नमस्ते' (अभिवादन) को क्या कहते हैं?",
            promptTribal: "ᱥᱟᱱᱛᱟᱲᱤ ᱛᱮ 'नमस्ते' ᱫᱚ ᱪᱮᱛ ᱠᱚ ᱢᱮᱛᱟ-ᱟ?",
            options: ["सगात / जोहार 🙇‍♂️", "दाका 🍚", "गिदर 👦", "दारे 🌳"],
            correctIndex: 0,
            explanation: "संथाली में आदरपूर्वक अभिवादन को 'सगात' या 'जोहार' कहा जाता है।"
          },
          {
            id: Date.now() + 2,
            promptHindi: "चित्र पहचानें: 💧 'जल' को संथाली में क्या कहते हैं?",
            promptTribal: "ᱪᱤᱱᱦᱟᱹ ᱩᱨᱩᱢ: 'जल' ᱠᱮ ᱥᱟᱱᱛᱟᱲᱤ ᱛᱮ ᱪᱮᱛ ᱠᱚ ᱢᱮᱛᱟ-ᱟ?",
            options: ["उमुल (छाया)", "दाक् (जल)", "सेंगेल (आग)", "हॉय (हवा)"],
            correctIndex: 1,
            explanation: "'दाक्' का अर्थ जल अथवा पानी होता है।"
          },
          {
            id: Date.now() + 3,
            promptHindi: "विद्यालय 🏫 को संथाली में क्या कहते हैं?",
            promptTribal: "'स्कूल / विद्यालय' ᱫᱚ ᱥᱟᱱᱛᱟᱲᱤ ᱛᱮ ᱪᱮᱛ ᱠᱟᱱᱟ?",
            options: ["ओड़ाक्", "इस्कुल / आतु आसड़ा", "गाजड़", "जोहार"],
            correctIndex: 1,
            explanation: "विद्यालय के लिए आतु इस्कुल / इतून आसड़ा का प्रयोग किया जाता है।"
          }
        ]);
      } else {
        setQuizTitle("कक्षा 3: वाक्य निर्माण व पर्यावरण दैनिक क्विज़");
        setQuestions([
          {
            id: Date.now() + 1,
            promptHindi: "निम्न में से 'पेड़' का पर्यायवाची शब्द क्या है?",
            promptTribal: "'ᱫᱟᱨᱮ' (पेड़) ᱨᱮᱭᱟᱜ ᱥᱚᱢᱟᱱ ᱟᱹᱲᱟᱹ ᱪᱮᱛ ᱠᱟᱱᱟ?",
            options: ["वृक्ष / दारे", "नदी / गाड़ा", "पर्वत / बुरु", "आकाश / सेर्मा"],
            correctIndex: 0,
            explanation: "पेड़ को वृक्ष अथवा संथाली में 'दारे' कहते हैं।"
          },
          {
            id: Date.now() + 2,
            promptHindi: "सूर्य किस दिशा से उगता है?",
            promptTribal: "ᱥᱤᱝᱜᱤ ᱚᱠᱟ ᱥᱟᱦᱟ ᱥᱮᱫ ᱠᱷᱚᱱ ᱮ ᱚᱰᱚᱠᱚᱜ-ᱟ?",
            options: ["पूर्व (सामंग साहा)", "पश्चिम (पाछे साहा)", "उत्तर (कोयेल)", "दक्षिण (एतोम)"],
            correctIndex: 0,
            explanation: "सूर्य पूर्व दिशा (सामंग साहा) से उगता है।"
          },
          {
            id: Date.now() + 3,
            promptHindi: "शुद्ध वर्तनी वाले शब्द का चयन करें:",
            promptTribal: "ᱴᱷᱤᱠ ᱚᱞ ᱟᱠᱟᱱ ᱟᱹᱲᱟᱹ ᱪᱷᱟᱸᱴᱟᱣ ᱢᱮ:",
            options: ["ईमानदार (सोत)", "इमानदार", "ईमानदर", "ऐमानदार"],
            correctIndex: 0,
            explanation: "सही शब्द 'ईमानदार' (संथाली में सोत) है।"
          }
        ]);
      }
      setIsGeneratingAI(false);
    }, 600);
  };

  const handleAddQuestion = () => {
    setQuestions([
      ...questions,
      {
        id: Date.now(),
        promptHindi: "नया प्रश्न...",
        promptTribal: "ᱱᱟᱣᱟ ᱠᱩᱠᱞᱤ...",
        options: ["विकल्प 1", "विकल्प 2", "विकल्प 3", "विकल्प 4"],
        correctIndex: 0,
        explanation: "प्रश्न की व्याख्या..."
      }
    ]);
  };

  const handleRemoveQuestion = (idx) => {
    setQuestions(questions.filter((_, i) => i !== idx));
  };

  const handleUpdateQuestion = (idx, field, value) => {
    const updated = [...questions];
    updated[idx][field] = value;
    setQuestions(updated);
  };

  const handleUpdateOption = (qIdx, optIdx, val) => {
    const updated = [...questions];
    updated[qIdx].options[optIdx] = val;
    setQuestions(updated);
  };

  const handlePublish = () => {
    const newQuiz = {
      id: `quiz-${Date.now()}`,
      title: quizTitle,
      classLevel: selectedClass,
      subject: subject,
      date: new Date().toISOString().split("T")[0],
      teacherName: "अनन्या शर्मा",
      instructions: instructions,
      questions: questions
    };

    onPublishQuiz?.(newQuiz);

    setPublishedSuccessMsg(`🎉 "${quizTitle}" को ${selectedClass} के विद्यार्थियों के लिए प्रकाशित व साझा कर दिया गया है!`);
    setTimeout(() => setPublishedSuccessMsg(""), 5000);
  };

  return (
    <div className="p-4 sm:p-6 lg:p-8 space-y-6 max-w-7xl mx-auto font-hindi select-none">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-2 border-b border-stone-200 dark:border-[#224734]">
        <div>
          <div className="flex items-center gap-2">
            <h1 className="text-2xl sm:text-3xl font-black text-forest-900 dark:text-emerald-200">
              दैनिक क्विज़ निर्माता (Daily Quiz Generator) ✏️
            </h1>
            <span className="px-3 py-0.5 rounded-full bg-amber-100 dark:bg-amber-950 text-amber-900 dark:text-amber-300 font-extrabold text-xs border border-amber-300">
              JAC बोर्ड प्राथमिक पाठ्यक्रम
            </span>
          </div>
          <p className="text-xs sm:text-sm text-stone-500 dark:text-stone-400 mt-1">
            प्रत्येक कक्षा (कक्षा 1, 2, 3) के लिए दैनिक क्विज़ तैयार करें और तुरंत विद्यार्थी पोर्टल पर भेजें।
          </p>
        </div>

        <button
          onClick={handleAIGenerateQuiz}
          disabled={isGeneratingAI}
          className="flex items-center gap-2 px-4 py-2.5 rounded-2xl bg-amber-500 hover:bg-amber-600 text-white font-extrabold text-xs sm:text-sm shadow-md transition-all cursor-pointer shrink-0"
        >
          <Sparkles className="w-4 h-4" />
          <span>{isGeneratingAI ? "AI क्विज़ बना रहा है..." : "🤖 AI द्वारा दैनिक क्विज़ जनरेट करें"}</span>
        </button>
      </div>

      {/* Published Success Alert Banner */}
      {publishedSuccessMsg && (
        <div className="p-4 rounded-2xl bg-emerald-100 dark:bg-emerald-950/80 border-2 border-emerald-500 text-emerald-950 dark:text-emerald-100 font-bold text-sm flex items-center gap-3 animate-in zoom-in-95">
          <CheckCircle className="w-6 h-6 text-emerald-600 dark:text-emerald-400 shrink-0" />
          <span>{publishedSuccessMsg}</span>
        </div>
      )}

      {/* Main Grid: Quiz Creator & Results Tracker */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Left Column: Quiz Builder Form (2 cols) */}
        <div className="lg:col-span-2 space-y-6">
          <div className="bg-white dark:bg-[#12241A] rounded-3xl p-6 border border-stone-200/90 dark:border-[#224734] shadow-xs space-y-5">
            <h2 className="text-lg font-black text-forest-900 dark:text-white border-b pb-3 border-stone-100 dark:border-[#224734]">
              क्विज़ विवरण (Quiz Details)
            </h2>

            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
              {/* Target Class */}
              <div>
                <label className="block text-xs font-bold text-stone-700 dark:text-stone-300 mb-1">
                  कक्षा (Target Class):
                </label>
                <div className="flex gap-1.5">
                  {["कक्षा 1", "कक्षा 2", "कक्षा 3"].map((cls) => (
                    <button
                      key={cls}
                      type="button"
                      onClick={() => {
                        setSelectedClass(cls);
                        setQuizTitle(`${cls}: दैनिक शब्द व ज्ञान क्विज़`);
                      }}
                      className={`flex-1 py-2 rounded-xl text-xs font-extrabold border transition-all cursor-pointer ${
                        selectedClass === cls
                          ? "bg-forest-700 text-white border-forest-800 shadow-xs"
                          : "bg-stone-50 dark:bg-[#183325] text-stone-700 dark:text-stone-300 border-stone-200 dark:border-[#264D3B]"
                      }`}
                    >
                      {cls}
                    </button>
                  ))}
                </div>
              </div>

              {/* Subject */}
              <div>
                <label className="block text-xs font-bold text-stone-700 dark:text-stone-300 mb-1">
                  विषय (Subject):
                </label>
                <input
                  type="text"
                  value={subject}
                  onChange={(e) => setSubject(e.target.value)}
                  className="w-full px-3 py-2 rounded-xl border border-stone-200 dark:border-[#244A36] bg-stone-50 dark:bg-[#162A1E] text-stone-900 dark:text-white text-xs font-bold"
                />
              </div>

              {/* Date */}
              <div>
                <label className="block text-xs font-bold text-stone-700 dark:text-stone-300 mb-1">
                  दिनांक (Quiz Date):
                </label>
                <input
                  type="text"
                  readOnly
                  value={new Date().toISOString().split("T")[0]}
                  className="w-full px-3 py-2 rounded-xl border border-stone-200 dark:border-[#244A36] bg-stone-100 dark:bg-[#101F16] text-stone-600 dark:text-stone-400 text-xs font-bold"
                />
              </div>
            </div>

            {/* Quiz Title */}
            <div>
              <label className="block text-xs font-bold text-stone-700 dark:text-stone-300 mb-1">
                क्विज़ का शीर्षक (Quiz Title):
              </label>
              <input
                type="text"
                value={quizTitle}
                onChange={(e) => setQuizTitle(e.target.value)}
                className="w-full px-4 py-2.5 rounded-xl border border-stone-200 dark:border-[#244A36] bg-stone-50 dark:bg-[#162A1E] text-stone-900 dark:text-white text-sm font-black"
              />
            </div>
          </div>

          {/* Questions Builder Card */}
          <div className="bg-white dark:bg-[#12241A] rounded-3xl p-6 border border-stone-200/90 dark:border-[#224734] shadow-xs space-y-6">
            <div className="flex items-center justify-between border-b pb-3 border-stone-100 dark:border-[#224734]">
              <h2 className="text-lg font-black text-forest-900 dark:text-white">
                क्विज़ प्रश्न ({questions.length})
              </h2>
              <button
                type="button"
                onClick={handleAddQuestion}
                className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-forest-100 dark:bg-emerald-950 text-forest-800 dark:text-emerald-300 text-xs font-bold cursor-pointer hover:bg-forest-200"
              >
                <Plus className="w-4 h-4" />
                <span>+ नया प्रश्न जोड़ें</span>
              </button>
            </div>

            <div className="space-y-6">
              {questions.map((q, qIdx) => (
                <div
                  key={q.id || qIdx}
                  className="p-5 rounded-2xl bg-stone-50 dark:bg-[#162E22] border border-stone-200 dark:border-[#244A36] space-y-4 relative"
                >
                  <div className="flex items-center justify-between">
                    <span className="text-xs font-extrabold px-2.5 py-0.5 rounded-full bg-forest-700 text-white">
                      प्रश्न {qIdx + 1}
                    </span>
                    {questions.length > 1 && (
                      <button
                        type="button"
                        onClick={() => handleRemoveQuestion(qIdx)}
                        className="text-rose-600 dark:text-rose-400 hover:text-rose-700 text-xs font-bold flex items-center gap-1 cursor-pointer"
                      >
                        <Trash2 className="w-4 h-4" />
                        <span>हटाएं</span>
                      </button>
                    )}
                  </div>

                  {/* Hindi Prompt */}
                  <div>
                    <label className="block text-[11px] font-bold text-stone-600 dark:text-stone-300 mb-1">
                      प्रश्न (हिंदी में):
                    </label>
                    <input
                      type="text"
                      value={q.promptHindi}
                      onChange={(e) => handleUpdateQuestion(qIdx, "promptHindi", e.target.value)}
                      className="w-full px-3 py-2 rounded-xl border border-stone-200 dark:border-[#244A36] bg-white dark:bg-[#0E1F17] text-stone-900 dark:text-white text-xs font-bold"
                    />
                  </div>

                  {/* Santali / Tribal Prompt */}
                  <div>
                    <label className="block text-[11px] font-bold text-emerald-700 dark:text-emerald-400 mb-1">
                      ᱥᱟᱱᱛᱟᱲᱤ / संथाली अनुवाद (Ol Chiki / Devanagari):
                    </label>
                    <input
                      type="text"
                      value={q.promptTribal}
                      onChange={(e) => handleUpdateQuestion(qIdx, "promptTribal", e.target.value)}
                      className="w-full px-3 py-2 rounded-xl border border-emerald-300 dark:border-emerald-800 bg-emerald-50/40 dark:bg-[#0E261A] text-forest-900 dark:text-emerald-200 text-xs font-bold"
                    />
                  </div>

                  {/* Options */}
                  <div className="space-y-2">
                    <label className="block text-[11px] font-bold text-stone-600 dark:text-stone-300">
                      विकल्प (Options) — सही उत्तर पर रेडियो टिक करें:
                    </label>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                      {q.options.map((opt, optIdx) => (
                        <div key={optIdx} className="flex items-center gap-2">
                          <input
                            type="radio"
                            name={`correct-${qIdx}`}
                            checked={q.correctIndex === optIdx}
                            onChange={() => handleUpdateQuestion(qIdx, "correctIndex", optIdx)}
                            className="w-4 h-4 accent-forest-700 cursor-pointer"
                          />
                          <input
                            type="text"
                            value={opt}
                            onChange={(e) => handleUpdateOption(qIdx, optIdx, e.target.value)}
                            className={`flex-1 px-3 py-1.5 rounded-xl border text-xs font-bold ${
                              q.correctIndex === optIdx
                                ? "bg-emerald-100 dark:bg-emerald-950 border-emerald-500 text-emerald-900 dark:text-emerald-200"
                                : "bg-white dark:bg-[#0E1F17] border-stone-200 dark:border-[#244A36] text-stone-800 dark:text-stone-200"
                            }`}
                          />
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* Explanation */}
                  <div>
                    <label className="block text-[11px] font-bold text-amber-700 dark:text-amber-400 mb-1">
                      व्याख्या / संकेत (Explanation):
                    </label>
                    <input
                      type="text"
                      value={q.explanation}
                      onChange={(e) => handleUpdateQuestion(qIdx, "explanation", e.target.value)}
                      className="w-full px-3 py-1.5 rounded-xl border border-amber-200 dark:border-amber-800 bg-amber-50/50 dark:bg-amber-950/20 text-stone-800 dark:text-amber-200 text-xs font-semibold"
                    />
                  </div>
                </div>
              ))}
            </div>

            {/* Submit / Publish Button */}
            <button
              type="button"
              onClick={handlePublish}
              className="w-full py-4 bg-forest-700 hover:bg-forest-800 text-white font-black text-sm rounded-2xl shadow-lg hover:shadow-xl transition-all cursor-pointer flex items-center justify-center gap-2"
            >
              <Send className="w-5 h-5 text-amber-300" />
              <span>प्रकाशित करें और विद्यार्थी पोर्टल पर भेजें (Publish & Share to Students)</span>
            </button>
          </div>
        </div>

        {/* Right Column: Published Quizzes & Student Quiz Results Log */}
        <div className="space-y-6">
          {/* Published Quizzes List */}
          <div className="bg-white dark:bg-[#12241A] rounded-3xl p-5 border border-stone-200/90 dark:border-[#224734] shadow-xs space-y-4">
            <div className="flex items-center justify-between border-b pb-3 border-stone-100 dark:border-[#224734]">
              <h3 className="font-extrabold text-base text-forest-900 dark:text-white">
                सक्रिय दैनिक क्विज़ ({publishedQuizzes.length})
              </h3>
              <span className="text-[11px] font-bold text-emerald-600 bg-emerald-50 dark:bg-emerald-950 px-2 py-0.5 rounded-md border border-emerald-300">
                लाइव पोर्टल
              </span>
            </div>

            <div className="space-y-3 max-h-[300px] overflow-y-auto no-scrollbar">
              {publishedQuizzes.map((q, idx) => (
                <div
                  key={q.id || idx}
                  className="p-3.5 rounded-2xl bg-stone-50 dark:bg-[#162E22] border border-stone-200/80 dark:border-[#244A36] space-y-1.5"
                >
                  <div className="flex items-center justify-between">
                    <span className="text-[10px] font-black px-2 py-0.5 rounded-full bg-forest-700 text-white">
                      {q.classLevel}
                    </span>
                    <span className="text-[10px] text-stone-400 font-bold">{q.date}</span>
                  </div>
                  <h4 className="font-black text-xs text-stone-900 dark:text-white leading-snug">
                    {q.title}
                  </h4>
                  <p className="text-[11px] text-stone-500 dark:text-stone-400">
                    {q.questions?.length || 3} प्रश्न • {q.subject}
                  </p>
                </div>
              ))}
            </div>
          </div>

          {/* Student Quiz Submission Report Table */}
          <div className="bg-white dark:bg-[#12241A] rounded-3xl p-5 border border-stone-200/90 dark:border-[#224734] shadow-xs space-y-4">
            <div className="flex items-center justify-between border-b pb-3 border-stone-100 dark:border-[#224734]">
              <div className="flex items-center gap-2">
                <Award className="w-5 h-5 text-amber-500" />
                <h3 className="font-black text-sm text-forest-900 dark:text-white">
                  विद्यार्थी क्विज़ परिणाम रिपोर्ट
                </h3>
              </div>
              <span className="text-[11px] font-extrabold text-stone-500">
                {completedQuizzes.length} पूर्ण
              </span>
            </div>

            <div className="overflow-x-auto no-scrollbar">
              <table className="w-full text-left border-collapse">
                <thead>
                  <tr className="bg-stone-50 dark:bg-[#162E22] text-stone-600 dark:text-emerald-300 text-[11px] font-black">
                    <th className="p-2">छात्र नाम</th>
                    <th className="p-2">कक्षा</th>
                    <th className="p-2">अंक</th>
                    <th className="p-2">स्थिति</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-stone-100 dark:divide-[#1F3D2C] text-xs font-semibold text-stone-800 dark:text-stone-200">
                  {completedQuizzes.map((sub, idx) => (
                    <tr key={sub.id || idx}>
                      <td className="p-2 font-bold text-forest-900 dark:text-white">
                        {sub.studentName} ({sub.rollNo})
                      </td>
                      <td className="p-2">{sub.classLevel}</td>
                      <td className="p-2 font-black text-emerald-700 dark:text-emerald-400">
                        {sub.score} ({sub.percentage})
                      </td>
                      <td className="p-2 text-[10px] text-emerald-800 dark:text-emerald-300 font-bold">
                        ✓ पूर्ण
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
