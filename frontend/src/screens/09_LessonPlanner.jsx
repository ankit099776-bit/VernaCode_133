import React, { useState } from 'react';
import { 
  BookOpen, 
  Sparkles, 
  ArrowLeft, 
  CheckCircle2, 
  FileDown, 
  Printer, 
  Share2,
  ChevronDown,
  Camera,
  ScanText,
  Volume2,
  Mic,
  MessageSquare,
  Award,
  Layers,
  HelpCircle,
  Clock,
  ArrowRight
} from 'lucide-react';
import { LESSON_PLANS, CURRICULUM_DATA } from '../data/lessons';
import { speakText, AudioButton } from '../components/AudioPlayer';

export default function LessonPlanner({ 
  onBack,
  currentLanguage = 'ho',
  onLanguageChange
}) {
  const [activeTab, setActiveTab] = useState('planner'); // 'planner' | 'scanner' | 'teach-back'
  const [targetLang, setTargetLang] = useState(currentLanguage || 'ho');
  const [selectedGrade, setSelectedGrade] = useState('कक्षा 5');
  const [selectedSubject, setSelectedSubject] = useState('पर्यावरण अध्ययन');
  const [lessonName, setLessonName] = useState('हमारे आसपास के पेड़');
  const [objective, setObjective] = useState('छात्र पेड़ों के महत्व को समझेंगे।');
  const [activity, setActivity] = useState('चित्र देखकर शब्द लिखें और वाक्य बनाएं।');
  const [isGenerated, setIsGenerated] = useState(false);

  // Sync with global currentLanguage
  React.useEffect(() => {
    if (currentLanguage && currentLanguage !== targetLang && currentLanguage !== 'hindi') {
      setTargetLang(currentLanguage);
    }
  }, [currentLanguage]);

  const getLangTitle = (lang = targetLang) => {
    if (lang === 'santhali') return 'संथाली';
    if (lang === 'mundari') return 'मुंडारी';
    return 'हो';
  };

  // Scanner state
  const [isScanning, setIsScanning] = useState(false);
  const [scanCompleted, setScanCompleted] = useState(false);

  // Teach-Back state
  const [isRecordingStudent, setIsRecordingStudent] = useState(false);
  const [teachBackEvaluated, setTeachBackEvaluated] = useState(false);

  const currentLesson = LESSON_PLANS[0];

  const handleGenerate = (e) => {
    e?.preventDefault();
    setIsGenerated(true);
  };

  const handleSimulateScan = () => {
    setIsScanning(true);
    setTimeout(() => {
      setIsScanning(false);
      setScanCompleted(true);
    }, 1200);
  };

  const handleSimulateTeachBack = () => {
    setIsRecordingStudent(true);
    setTimeout(() => {
      setIsRecordingStudent(false);
      setTeachBackEvaluated(true);
    }, 1500);
  };

  return (
    <div className="flex-1 flex flex-col justify-between p-4 bg-[#fdfbf7] text-stone-800">
      <div className="space-y-3.5 overflow-y-auto">
        
        {/* Top Header */}
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            {onBack && (
              <button 
                onClick={onBack}
                className="p-1.5 rounded-full hover:bg-stone-200/60 text-stone-700 transition-colors"
              >
                <ArrowLeft className="w-5 h-5" />
              </button>
            )}
            <div>
              <h2 className="text-base font-extrabold text-stone-900 leading-tight">
                पाठ्यक्रम व पाठ योजना
              </h2>
              <p className="text-xs text-stone-500 font-medium">
                कक्षा के लिए पाठ योजना तैयार करें
              </p>
            </div>
          </div>

          <span className="text-xs font-bold text-amber-800 bg-amber-50 px-2.5 py-0.5 rounded-full border border-amber-200">
            शिक्षक टूल
          </span>
        </div>

        {/* Mode Selector Tabs: पाठ योजना | पाठ्यपुस्तक स्कैनर | टीच-बैक */}
        <div className="bg-stone-200/80 p-1 rounded-xl flex items-center gap-1 text-xs font-bold">
          <button
            onClick={() => setActiveTab('planner')}
            className={`flex-1 py-1.5 rounded-lg transition-all ${
              activeTab === 'planner'
                ? 'bg-[#75BDE0] text-white shadow-xs'
                : 'text-stone-700 hover:text-stone-900'
            }`}
          >
            पाठ योजना
          </button>
          <button
            onClick={() => setActiveTab('scanner')}
            className={`flex-1 py-1.5 rounded-lg transition-all ${
              activeTab === 'scanner'
                ? 'bg-[#75BDE0] text-white shadow-xs'
                : 'text-stone-700 hover:text-stone-900'
            }`}
          >
            कैमरा स्कैनर (OCR)
          </button>
          <button
            onClick={() => setActiveTab('teach-back')}
            className={`flex-1 py-1.5 rounded-lg transition-all ${
              activeTab === 'teach-back'
                ? 'bg-[#75BDE0] text-white shadow-xs'
                : 'text-stone-700 hover:text-stone-900'
            }`}
          >
            टीच-बैक
          </button>
        </div>

        {/* Tribal Language Selector Pills (हो, संथाली, मुंडारी) */}
        <div className="bg-white p-1 rounded-xl border border-stone-200 shadow-2xs flex items-center gap-1">
          <span className="text-xs font-extrabold text-stone-500 pl-2 shrink-0">मातृभाषा:</span>
          {[
            { id: 'ho', label: 'हो' },
            { id: 'santhali', label: 'संथाली' },
            { id: 'mundari', label: 'मुंडारी' }
          ].map(l => (
            <button
              key={l.id}
              type="button"
              onClick={() => {
                setTargetLang(l.id);
                onLanguageChange?.(l.id);
              }}
              className={`flex-1 py-1 px-2 rounded-lg text-xs font-black transition-all ${
                targetLang === l.id
                  ? 'bg-[#75BDE0] text-white shadow-xs scale-[1.02]'
                  : 'text-stone-600 hover:text-stone-900 hover:bg-stone-100'
              }`}
            >
              {l.label}
            </button>
          ))}
        </div>

        {/* ================= TAB 1: LESSON PLANNER (Matches poster Screen 9) ================= */}
        {activeTab === 'planner' && (
          <div className="space-y-3">
            {/* Lesson Plan Generator Form matching poster Screen 9 */}
            <form onSubmit={handleGenerate} className="bg-white rounded-2xl border border-stone-200 shadow-xs p-3.5 space-y-2.5">
              
              {/* कक्षा Dropdown */}
              <div className="flex items-center justify-between gap-2">
                <label className="text-xs font-bold text-stone-700 w-16">कक्षा</label>
                <div className="relative flex-1">
                  <select
                    value={selectedGrade}
                    onChange={(e) => setSelectedGrade(e.target.value)}
                    className="w-full appearance-none bg-stone-50 border border-stone-200 px-3 py-1.5 rounded-xl text-xs font-bold text-stone-800 outline-none focus:ring-1 focus:ring-[#75BDE0]"
                  >
                    <option value="कक्षा 1">कक्षा 1</option>
                    <option value="कक्षा 2">कक्षा 2</option>
                    <option value="कक्षा 3">कक्षा 3</option>
                    <option value="कक्षा 4">कक्षा 4</option>
                    <option value="कक्षा 5">कक्षा 5</option>
                  </select>
                  <ChevronDown className="w-3.5 h-3.5 text-stone-400 absolute right-3 top-2 pointer-events-none" />
                </div>
              </div>

              {/* विषय Dropdown */}
              <div className="flex items-center justify-between gap-2">
                <label className="text-xs font-bold text-stone-700 w-16">विषय</label>
                <div className="relative flex-1">
                  <select
                    value={selectedSubject}
                    onChange={(e) => setSelectedSubject(e.target.value)}
                    className="w-full appearance-none bg-stone-50 border border-stone-200 px-3 py-1.5 rounded-xl text-xs font-bold text-stone-800 outline-none focus:ring-1 focus:ring-[#75BDE0]"
                  >
                    <option value="पर्यावरण अध्ययन">पर्यावरण अध्ययन</option>
                    <option value="भाषा भारती (हिंदी)">भाषा भारती (हिंदी)</option>
                    <option value="विज्ञान">विज्ञान</option>
                    <option value="सामाजिक अध्ययन">सामाजिक अध्ययन</option>
                  </select>
                  <ChevronDown className="w-3.5 h-3.5 text-stone-400 absolute right-3 top-2 pointer-events-none" />
                </div>
              </div>

              {/* पाठ Input */}
              <div className="flex items-center justify-between gap-2">
                <label className="text-xs font-bold text-stone-700 w-16">पाठ</label>
                <div className="relative flex-1">
                  <select
                    value={lessonName}
                    onChange={(e) => setLessonName(e.target.value)}
                    className="w-full appearance-none bg-stone-50 border border-stone-200 px-3 py-1.5 rounded-xl text-xs font-bold text-stone-800 outline-none focus:ring-1 focus:ring-[#75BDE0]"
                  >
                    <option value="हमारे आसपास के पेड़">हमारे आसपास के पेड़</option>
                    <option value="पानी और उसका चक्र">पानी और उसका चक्र</option>
                    <option value="हमारा सौरमंडल">हमारा सौरमंडल</option>
                  </select>
                  <ChevronDown className="w-3.5 h-3.5 text-stone-400 absolute right-3 top-2 pointer-events-none" />
                </div>
              </div>

              {/* उद्देश्य Field */}
              <div className="flex items-start justify-between gap-2 pt-1">
                <label className="text-xs font-bold text-stone-700 w-16 pt-1">उद्देश्य</label>
                <textarea
                  rows="2"
                  value={objective}
                  onChange={(e) => setObjective(e.target.value)}
                  className="flex-1 bg-stone-50 border border-stone-200 p-2 rounded-xl text-xs text-stone-800 outline-none focus:ring-1 focus:ring-[#75BDE0]"
                />
              </div>

              {/* गतिविधि Field */}
              <div className="flex items-start justify-between gap-2">
                <label className="text-xs font-bold text-stone-700 w-16 pt-1">गतिविधि</label>
                <textarea
                  rows="2"
                  value={activity}
                  onChange={(e) => setActivity(e.target.value)}
                  className="flex-1 bg-stone-50 border border-stone-200 p-2 rounded-xl text-xs text-stone-800 outline-none focus:ring-1 focus:ring-[#75BDE0]"
                />
              </div>

              {/* Primary Action Button */}
              <button
                type="submit"
                className="w-full py-2.5 bg-[#75BDE0] hover:bg-[#5baed6] active:scale-[0.98] text-white font-bold rounded-xl shadow-xs transition-all text-xs flex items-center justify-center gap-2 mt-2"
              >
                <Sparkles className="w-4 h-4" />
                <span>पाठ योजना बनाएं</span>
              </button>
            </form>

            {/* Generated Bilingual Lesson Plan Card */}
            {(isGenerated || true) && (
              <div className="bg-white rounded-2xl border border-stone-200 shadow-xs p-3 space-y-2.5 animate-in fade-in">
                <div className="flex items-center justify-between border-b border-stone-100 pb-2">
                  <div className="flex items-center gap-2">
                    <CheckCircle2 className="w-4 h-4 text-[#75BDE0]" />
                    <span className="font-extrabold text-xs text-stone-900">
                      द्विभाषी शिक्षण निर्देशिका
                    </span>
                  </div>
                  <span className="text-xs bg-[#F8D49B]/50 text-[#8A5D15] font-bold px-2 py-0.5 rounded border border-[#F8BC9A]">
                    {getLangTitle(targetLang)} भाषा सेतु
                  </span>
                </div>

                <div className="space-y-2 text-xs">
                  <div className="p-2 bg-[#F8D49B]/30 border border-[#F8BC9A] rounded-xl space-y-1">
                    <div className="flex items-center justify-between">
                      <span className="font-bold text-xs text-[#8A5D15]">शिक्षक संकेत (हिंदी):</span>
                      <AudioButton text={currentLesson.bilingualNotes.hindi} lang="hi-IN" size="sm" />
                    </div>
                    <p className="text-xs text-stone-800 leading-relaxed">
                      {currentLesson.bilingualNotes.hindi}
                    </p>
                  </div>

                  <div className="p-2 bg-amber-50/70 border border-amber-200 rounded-xl space-y-1">
                    <div className="flex items-center justify-between">
                      <span className="font-bold text-xs text-amber-900">स्थानीय भाषा अनुवाद ({getLangTitle(targetLang)}):</span>
                      <AudioButton text={currentLesson.bilingualNotes[targetLang] || currentLesson.bilingualNotes.ho} lang="hi-IN" size="sm" />
                    </div>
                    <p className="text-xs text-stone-900 font-bold leading-relaxed">
                      {currentLesson.bilingualNotes[targetLang] || currentLesson.bilingualNotes.ho}
                    </p>
                  </div>
                </div>
              </div>
            )}
          </div>
        )}

        {/* ================= TAB 2: TEXTBOOK SCANNER OCR (Point 3 in Proposed Solution) ================= */}
        {activeTab === 'scanner' && (
          <div className="space-y-3">
            <div className="bg-white rounded-2xl border border-stone-200 shadow-xs p-3 space-y-3 text-center">
              <div className="w-12 h-12 rounded-2xl bg-[#75BDE0]/15 text-[#75BDE0] flex items-center justify-center mx-auto">
                <Camera className="w-6 h-6" />
              </div>
              <div>
                <h3 className="text-sm font-extrabold text-stone-900">
                  पाठ्यपुस्तक पन्ना स्कैनर
                </h3>
                <p className="text-xs text-stone-500 mt-0.5">
                  किताब के किसी भी पन्ने की फोटो खींचें या स्कैन करें
                </p>
              </div>

              {/* Sample Textbook Preview */}
              <div className="p-3 bg-stone-50 rounded-xl border border-dashed border-stone-300 text-left space-y-1.5">
                <span className="text-xs font-bold text-stone-400 uppercase">
                  स्कैन हेतु पुस्तक: {currentLesson.textbookScanSample.bookName}
                </span>
                <p className="text-xs text-stone-800 italic">
                  "{currentLesson.textbookScanSample.scannedSnippetHindi}"
                </p>
              </div>

              <button
                onClick={handleSimulateScan}
                disabled={isScanning}
                className="w-full py-2.5 bg-[#75BDE0] hover:bg-[#5baed6] text-white rounded-xl text-xs font-bold transition-all shadow-xs flex items-center justify-center gap-2"
              >
                <ScanText className={`w-4 h-4 ${isScanning ? 'animate-spin' : ''}`} />
                <span>{isScanning ? 'पन्ना स्कैन व विश्लेषण हो रहा है...' : 'पन्ना स्कैन करें'}</span>
              </button>
            </div>

            {/* OCR Extracted Results Card */}
            {(scanCompleted || true) && (
              <div className="bg-white rounded-2xl border border-stone-200 shadow-xs p-3.5 space-y-2.5">
                <div className="flex items-center justify-between border-b border-stone-100 pb-2">
                  <span className="text-xs font-extrabold text-stone-900 flex items-center gap-1.5">
                    <Sparkles className="w-3.5 h-3.5 text-amber-600" />
                    <span>स्वचालित अनुवाद व अवधारणा व्याख्या</span>
                  </span>
                  <span className="text-xs bg-[#F8D49B]/50 text-[#8A5D15] font-bold px-2 py-0.5 rounded border border-[#F8BC9A]">
                    {getLangTitle(targetLang)} भाषा तैयार
                  </span>
                </div>

                {/* 1. Translation */}
                <div className="space-y-1">
                  <span className="text-xs font-bold text-stone-500 uppercase">{getLangTitle(targetLang)} अनुवाद:</span>
                  <p className="text-xs font-bold text-[#8A5D15] bg-[#F8D49B]/40 p-2 rounded-lg border border-[#F8BC9A]">
                    {currentLesson.textbookScanSample['tribalTranslation' + (targetLang === 'santhali' ? 'Santhali' : targetLang === 'mundari' ? 'Mundari' : 'Ho')] || currentLesson.textbookScanSample.tribalTranslationHo}
                  </p>
                </div>

                {/* 2. Simple Explanation */}
                <div className="space-y-1">
                  <span className="text-xs font-bold text-stone-500 uppercase">सरल व्याख्या (दैनिक जीवन उदाहरण):</span>
                  <p className="text-xs text-stone-800 bg-amber-50/70 p-2 rounded-lg border border-amber-200">
                    {currentLesson.textbookScanSample.simpleExplanation}
                  </p>
                </div>

                {/* 3. Local Examples */}
                <div className="space-y-1">
                  <span className="text-xs font-bold text-stone-500 uppercase">स्थानीय झारखंड उदाहरण:</span>
                  <ul className="text-xs text-stone-700 list-disc pl-4 space-y-0.5">
                    {currentLesson.textbookScanSample.examples.map((ex, i) => (
                      <li key={i}>{ex}</li>
                    ))}
                  </ul>
                </div>
              </div>
            )}
          </div>
        )}

        {/* ================= TAB 3: TEACH-BACK (Point 5 in Proposed Solution) ================= */}
        {activeTab === 'teach-back' && (
          <div className="space-y-3">
            <div className="bg-white rounded-2xl border border-stone-200 shadow-xs p-3.5 space-y-2.5">
              <div className="flex items-center justify-between">
                <span className="text-xs font-extrabold text-stone-900 flex items-center gap-1.5">
                  <Award className="w-4 h-4 text-[#75BDE0]" />
                  <span>टीच-बैक अवधारणा मूल्यांकन</span>
                </span>
                <span className="text-xs bg-[#F8D49B]/50 text-[#8A5D15] font-bold px-2 py-0.5 rounded border border-[#F8BC9A]">
                  {getLangTitle(targetLang)} भाषा
                </span>
              </div>

              <div className="p-2.5 bg-stone-50 rounded-xl border border-stone-200 space-y-1">
                <span className="text-xs font-bold text-stone-500 uppercase">छात्र के लिए प्रश्न:</span>
                <p className="text-xs font-bold text-stone-900">
                  {currentLesson.teachBackPrompt.questionHindi}
                </p>
                <p className="text-xs font-semibold text-[#2D4B5A]">
                  {getLangTitle(targetLang)}: {currentLesson.teachBackPrompt['question' + (targetLang === 'santhali' ? 'Santhali' : targetLang === 'mundari' ? 'Mundari' : 'Ho')] || currentLesson.teachBackPrompt.questionHo}
                </p>
              </div>

              {/* Student Voice Simulator */}
              <div className="p-3 bg-[#F8D49B]/30 rounded-xl border border-[#F8BC9A] text-center space-y-2">
                <p className="text-xs text-stone-600 font-medium">
                  छात्र अपनी मातृभाषा या मिश्रित भाषा में बोलकर उत्तर दे सकता है:
                </p>
                
                <div className="p-2 bg-white rounded-lg border border-[#F8BC9A] text-xs font-semibold text-stone-800">
                  🎙️ "{currentLesson.teachBackPrompt.sampleStudentVoice}"
                </div>

                <button
                  onClick={handleSimulateTeachBack}
                  disabled={isRecordingStudent}
                  className="w-full py-2 bg-[#75BDE0] hover:bg-[#5baed6] text-white rounded-xl text-xs font-bold transition-all shadow-xs flex items-center justify-center gap-2"
                >
                  <Mic className={`w-3.5 h-3.5 ${isRecordingStudent ? 'animate-bounce text-red-300' : ''}`} />
                  <span>{isRecordingStudent ? 'छात्र की समझ का मूल्यांकन हो रहा है...' : 'उत्तर रिकॉर्ड व मूल्यांकन करें'}</span>
                </button>
              </div>

              {/* Teach-Back Evaluation Card in Sunrise Gradient */}
              {(teachBackEvaluated || true) && (
                <div className="bg-gradient-to-br from-[#2D4B5A] via-[#385c6d] to-[#75BDE0] text-white p-3.5 rounded-xl space-y-2 shadow-md">
                  <div className="flex items-center justify-between">
                    <span className="text-xs font-bold text-white">मूल्यांकन परिणाम:</span>
                    <span className="text-xs bg-[#F99B9B]/30 border border-[#F99B9B]/50 px-2 py-0.5 rounded font-bold text-white">
                      अवधारणा: 94%
                    </span>
                  </div>

                  <p className="text-xs text-white/95 leading-relaxed font-medium">
                    {currentLesson.teachBackPrompt.evaluationResult.feedbackHindi}
                  </p>

                  <div className="p-1.5 bg-white/20 rounded-lg text-xs font-semibold text-[#F8D49B] border border-white/20">
                    {getLangTitle(targetLang)} प्रतिक्रिया: "{currentLesson.teachBackPrompt.evaluationResult['feedback' + (targetLang === 'santhali' ? 'Santhali' : targetLang === 'mundari' ? 'Mundari' : 'Ho')] || currentLesson.teachBackPrompt.evaluationResult.feedbackHo}"
                  </div>
                </div>
              )}
            </div>
          </div>
        )}

      </div>

      {/* Bottom Action Footer */}
      <div className="pt-2">
        <div className="bg-white border border-stone-200 rounded-xl p-2 flex items-center justify-between text-xs">
          <span className="text-stone-600 font-medium">
            {selectedGrade} • {selectedSubject}
          </span>
          <button 
            onClick={() => setActiveTab('planner')}
            className="px-2.5 py-1 bg-[#75BDE0] hover:bg-[#5baed6] text-white rounded-lg font-bold text-xs shadow-xs"
          >
            योजना सहेजें
          </button>
        </div>
      </div>
    </div>
  );
}
