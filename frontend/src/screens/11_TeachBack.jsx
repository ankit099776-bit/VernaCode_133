import React, { useState } from "react";
import {
  Mic,
  MicOff,
  Volume2,
  Sparkles,
  CheckCircle2,
  HelpCircle,
  RotateCcw,
  Send,
  MessageSquare,
  Award,
} from "lucide-react";
import { TEACH_BACK_MODULES, playDevanagariAudio } from "../data/bhashaData";

export default function TeachBack() {
  const [selectedModuleIdx, setSelectedModuleIdx] = useState(0);
  const activeModule = TEACH_BACK_MODULES[selectedModuleIdx] || TEACH_BACK_MODULES[0];

  const [studentAnswer, setStudentAnswer] = useState(activeModule.sampleAudioAnswer);
  const [isRecording, setIsRecording] = useState(false);
  const [evaluationResult, setEvaluationResult] = useState(activeModule.aiEvaluation);
  const [isEvaluating, setIsEvaluating] = useState(false);

  const handleEvaluate = () => {
    setIsEvaluating(true);
    setTimeout(() => {
      setIsEvaluating(false);
      setEvaluationResult(activeModule.aiEvaluation);
    }, 1000);
  };

  const handleSimulateVoice = () => {
    setIsRecording(true);
    setTimeout(() => {
      setIsRecording(false);
      setStudentAnswer(activeModule.sampleAudioAnswer);
    }, 2000);
  };

  return (
    <div className="p-4 sm:p-6 lg:p-8 space-y-6 max-w-5xl mx-auto font-hindi select-none">
      {/* Top Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3 bg-white p-4 sm:p-5 rounded-3xl border border-stone-200/90 shadow-2xs">
        <div>
          <div className="inline-flex items-center gap-1.5 px-3 py-0.5 rounded-full bg-pastel-purple border border-pastel-purpleBorder text-purple-900 text-xs font-bold mb-1">
            <Award className="w-3.5 h-3.5 text-purple-700" />
            <span>सीख-सुनाओ मूल्यांकन</span>
          </div>
          <h2 className="text-xl sm:text-2xl font-extrabold text-forest-900">
            बच्चे के अपने शब्दों में समझ की जांच
          </h2>
          <p className="text-xs text-stone-500 mt-0.5">
            बच्चा रटने के बजाय अपनी मातृभाषा या सरल हिंदी में समझाए, एआई अवधारणा व भाषा स्पष्टता का मूल्यांकन करेगा।
          </p>
        </div>

        {/* Lesson Selector */}
        <div className="flex items-center gap-2 shrink-0">
          <span className="text-xs font-bold text-stone-500">अवधारणा:</span>
          <select
            value={selectedModuleIdx}
            onChange={(e) => {
              const idx = Number(e.target.value);
              setSelectedModuleIdx(idx);
              setStudentAnswer(TEACH_BACK_MODULES[idx].sampleAudioAnswer);
              setEvaluationResult(TEACH_BACK_MODULES[idx].aiEvaluation);
            }}
            className="bg-cream-50 border border-stone-200 rounded-xl px-3 py-2 text-xs font-bold text-forest-900 outline-none focus:border-forest-600"
          >
            {TEACH_BACK_MODULES.map((m, i) => (
              <option key={m.id} value={i}>
                {m.lesson} — {m.concept}
              </option>
            ))}
          </select>
        </div>
      </div>

      {/* Main 2-Column Interface */}
      <div className="grid grid-cols-1 md:grid-cols-12 gap-6">
        {/* Left Column: Teacher Prompt & Student Input (6 cols) */}
        <div className="md:col-span-6 space-y-4">
          {/* Teacher Prompt Card */}
          <div className="bg-white rounded-3xl p-5 border border-stone-200/90 shadow-2xs space-y-2">
            <span className="text-xs font-bold text-forest-700 block">
              शिक्षक द्वारा बच्चे से पूछा जाने वाला प्रश्न:
            </span>
            <div className="p-3.5 bg-pastel-green/40 rounded-2xl border border-pastel-greenBorder text-sm font-extrabold text-forest-900 leading-relaxed">
              {activeModule.questionPrompt}
            </div>
            <p className="text-[11px] text-stone-600">
              * बच्चे को उसकी मातृभाषा (संताली/हो) में बोलने की पूरी छूट दें।
            </p>
          </div>

          {/* Student Response Input Card */}
          <div className="bg-white rounded-3xl p-5 border border-stone-200/90 shadow-2xs space-y-3">
            <div className="flex items-center justify-between">
              <span className="text-xs font-bold text-stone-700">
                विद्यार्थी का उत्तर (संथाली / मातृभाषा या हिंदी):
              </span>
              <div className="flex items-center gap-1">
                <button
                  type="button"
                  onClick={() => playDevanagariAudio(studentAnswer, "hi")}
                  className="px-2.5 py-1 rounded-xl bg-amber-100 hover:bg-amber-200 text-amber-900 font-extrabold text-[11px] flex items-center gap-1 transition-all shadow-2xs cursor-pointer"
                  title="शिक्षिका के लिए हिंदी अनुवाद ऑडियो सुनें"
                >
                  <Volume2 className="w-3.5 h-3.5 text-amber-700" />
                  <span>🔊 हिंदी अनुवाद ऑडियो</span>
                </button>
              </div>
            </div>

            <textarea
              value={studentAnswer}
              onChange={(e) => setStudentAnswer(e.target.value)}
              rows={4}
              className="w-full p-3 rounded-2xl bg-stone-50 border border-stone-200 text-sm text-stone-800 outline-none focus:border-forest-600 leading-relaxed"
              placeholder="बच्चे का उत्तर यहाँ दर्ज करें..."
            />

            {/* Audio Recording & Submit */}
            <div className="flex items-center justify-between pt-2">
              <button
                type="button"
                onClick={handleSimulateVoice}
                className={`flex items-center gap-2 px-4 py-2 rounded-xl text-xs font-bold transition-all ${
                  isRecording
                    ? "bg-rose-500 text-white animate-pulse"
                    : "bg-stone-100 hover:bg-stone-200 text-stone-700"
                }`}
              >
                <Mic className="w-4 h-4" />
                <span>{isRecording ? "रिकॉर्डिंग जारी है..." : "बोलकर रिकॉर्ड करें"}</span>
              </button>

              <button
                type="button"
                onClick={handleEvaluate}
                disabled={isEvaluating}
                className="flex items-center gap-1.5 px-5 py-2 rounded-xl bg-forest-700 hover:bg-forest-800 text-white text-xs font-bold shadow-xs transition-colors"
              >
                <Sparkles className="w-3.5 h-3.5" />
                <span>{isEvaluating ? "मूल्यांकन हो रहा है..." : "एआई मूल्यांकन करें"}</span>
              </button>
            </div>
          </div>
        </div>

        {/* Right Column: AI Evaluation & Feedback (6 cols) */}
        <div className="md:col-span-6 space-y-4">
          <div className="bg-white rounded-3xl p-6 border border-stone-200/90 shadow-card space-y-5">
            <div className="flex items-center justify-between border-b border-stone-100 pb-3">
              <h3 className="text-base font-extrabold text-forest-900 flex items-center gap-2">
                <Sparkles className="w-4 h-4 text-forest-700" />
                <span>मूल्यांकन परिणाम एवं मार्गदर्शन</span>
              </h3>
              <span className="text-[10px] bg-emerald-100 text-emerald-800 font-bold px-2 py-0.5 rounded-full">
                सकारात्मक प्रतिपुष्टि
              </span>
            </div>

            {/* Score Comparison */}
            <div className="grid grid-cols-2 gap-3">
              <div className="p-3 bg-emerald-50 rounded-2xl border border-emerald-200 text-center">
                <span className="text-xs font-bold text-emerald-800 block">
                  अवधारणा समझ
                </span>
                <span className="text-2xl font-black font-numeric text-emerald-900 mt-0.5 block">
                  {evaluationResult.conceptUnderstanding}%
                </span>
                <span className="text-[10px] text-emerald-700 font-bold">
                  {evaluationResult.conceptGrade}
                </span>
              </div>

              <div className="p-3 bg-blue-50 rounded-2xl border border-blue-200 text-center">
                <span className="text-xs font-bold text-blue-800 block">
                  भाषा स्पष्टता
                </span>
                <span className="text-2xl font-black font-numeric text-blue-900 mt-0.5 block">
                  {evaluationResult.languageClarity}%
                </span>
                <span className="text-[10px] text-blue-700 font-bold">
                  {evaluationResult.languageClarityLabel}
                </span>
              </div>
            </div>

            {/* Key Points Covered */}
            <div className="space-y-1.5">
              <span className="text-xs font-bold text-stone-700 block">
                मूल्यांकन मुख्य बिंदु:
              </span>
              <div className="space-y-1 text-xs text-forest-900 font-medium">
                {evaluationResult.keyPointsCovered.map((pt, i) => (
                  <div key={i} className="p-2 bg-pastel-green/40 rounded-xl border border-pastel-greenBorder">
                    {pt}
                  </div>
                ))}
              </div>
            </div>

            {/* Teacher Feedback Box */}
            <div className="p-4 bg-pastel-amber/50 rounded-2xl border border-pastel-amberBorder space-y-1">
              <span className="text-xs font-bold text-amber-900 block">
                शिक्षक के लिए सुझाव (Teacher Insight):
              </span>
              <p className="text-xs text-stone-800 leading-relaxed">
                {evaluationResult.feedbackHindi}
              </p>
            </div>

            {/* Suggested Activity */}
            <div className="text-xs text-stone-700 bg-cream-50 p-3 rounded-2xl border border-stone-200/80">
              <strong>कक्षा गतिविधि:</strong> {evaluationResult.suggestedActivity}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
