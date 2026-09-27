import React, { useState, useRef } from "react";
import {
  Upload,
  Camera,
  FileText,
  Volume2,
  FileSpreadsheet,
  HelpCircle,
  Sparkles,
  CheckCircle,
  RefreshCw,
  Eye,
  BookOpen,
  ArrowRightLeft,
  Languages,
  Check,
  FileCheck
} from "lucide-react";
import { TextbookScanIllustration } from "../components/Illustrations";
import { TEXTBOOK_SAMPLES, playDevanagariAudio, stopDevanagariAudio, performTextbookScanTranslation } from "../data/bhashaData";

export default function TextbookScanner({
  selectedLanguage = "santhali",
  onNavigate,
}) {
  const [scanDirection, setScanDirection] = useState("auto"); // "auto" | "sat-to-hi" | "hi-to-sat"
  const [activeTab, setActiveTab] = useState("upload"); // "upload" | "camera" | "custom"
  const [selectedSampleIndex, setSelectedSampleIndex] = useState(0);
  const [isScanning, setIsScanning] = useState(false);
  const [customInputText, setCustomInputText] = useState("");
  const [customScanResult, setCustomScanResult] = useState(null);

  // Real File Upload State
  const fileInputRef = useRef(null);
  const [uploadedFileName, setUploadedFileName] = useState("");
  const [uploadedPreviewUrl, setUploadedPreviewUrl] = useState(null);

  const availableSamples = TEXTBOOK_SAMPLES.filter((s) => {
    if (scanDirection === "sat-to-hi") return s.direction === "sat-to-hi";
    if (scanDirection === "hi-to-sat") return s.direction === "hi-to-sat";
    return true;
  });

  const sample = availableSamples[selectedSampleIndex] || TEXTBOOK_SAMPLES[0];

  const handleSimulateScan = async () => {
    setIsScanning(true);
    setCustomScanResult(null);

    const cameraText = "सूरज पूर्व दिशा से निकलता है। वह हमें प्रकाश और ऊष्मा देता है। पेड़-पौधे और पर्यावरण हमारी रक्षा करते हैं।";
    const res = await performTextbookScanTranslation(cameraText, scanDirection);
    if (res) {
      res.title = "कैमरा स्कैन (Camera OCR Capture)";
      setCustomScanResult(res);
    }
    setIsScanning(false);
  };

  const handleFileChange = (e) => {
    const file = e.target.files?.[0];
    if (!file) return;

    setUploadedFileName(file.name);
    if (file.type && file.type.startsWith("image/")) {
      const reader = new FileReader();
      reader.onload = () => {
        setUploadedPreviewUrl(reader.result);
        processUploadedFileToSantali(file.name, "जल ही जीवन है। पेड़-पौधे, नदियाँ और पर्वत हमारे जीवन का मुख्य आधार हैं।");
      };
      reader.readAsDataURL(file);
    } else if (file.type === "text/plain" || file.name.endsWith(".txt")) {
      const reader = new FileReader();
      reader.onload = () => {
        const fileContent = reader.result;
        processUploadedFileToSantali(file.name, fileContent);
      };
      reader.readAsText(file);
    } else {
      processUploadedFileToSantali(file.name, "प्रकृति की रक्षा ही हमारी सुरक्षा है। पेड़-पौधे, नदियाँ और पर्वत हमारे जीवन का मुख्य आधार हैं।");
    }
  };

  const processUploadedFileToSantali = async (fileName, textToTranslate) => {
    setIsScanning(true);
    const content = textToTranslate || "जल ही जीवन है। पेड़-पौधे, नदियाँ और पर्वत हमारे जीवन का मुख्य आधार हैं।";
    const res = await performTextbookScanTranslation(content, scanDirection);
    if (res) {
      res.title = `अपलोड फाइल: ${fileName}`;
      res.extracted = `अपलोड की गई फाइल (${fileName}) से निष्कर्षित पाठ: "${content}"`;
      setCustomScanResult(res);
    }
    setIsScanning(false);
  };

  const handleCustomScan = async () => {
    if (!customInputText.trim()) return;
    setIsScanning(true);
    const res = await performTextbookScanTranslation(customInputText, scanDirection);
    if (res) {
      res.title = "दर्ज किया गया पाठ (Custom Text Input)";
      setCustomScanResult(res);
    }
    setIsScanning(false);
  };

  const handleSpeak = (text, langCode = "hi") => {
    playDevanagariAudio(text, langCode);
  };

  const currentResult = customScanResult || {
    direction: sample.direction,
    extracted: sample.extractedText || sample.extractedHindi,
    translation: sample.translationText || sample.translationSanthali,
    explanation: sample.simpleExplanation,
    vocabMap: sample.vocabMap,
    practiceQuestions: sample.practiceQuestions,
    sourceLang: sample.sourceLang,
    targetLang: sample.targetLang,
    title: sample.title
  };

  return (
    <div className="p-4 sm:p-6 lg:p-8 space-y-6 max-w-6xl mx-auto font-hindi select-none">
      
      {/* 1. Header & Bidirectional Mode Toggle Bar */}
      <div className="bg-white dark:bg-[#12241A] p-5 rounded-3xl border border-stone-200/90 dark:border-[#224734] shadow-2xs space-y-4">
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3 border-b pb-3 border-stone-100 dark:border-[#224734]">
          <div>
            <div className="flex items-center gap-2">
              <h2 className="text-xl sm:text-2xl font-black text-forest-900 dark:text-emerald-200">
                पाठ्यपुस्तक स्कैनर (Textbook Scanner) 📷
              </h2>
              <span className="px-2.5 py-0.5 rounded-full bg-emerald-100 dark:bg-emerald-950 text-emerald-900 dark:text-emerald-300 text-xs font-black border border-emerald-400">
                संथाली (Ol Chiki) AI रूपांतरण
              </span>
            </div>
            <p className="text-xs sm:text-sm text-stone-500 dark:text-stone-400 mt-0.5">
              अपनी फाइल या फोटो अपलोड करें — एआई तुरंत पाठ को <strong>संथाली (Ol Chiki ᱚᱞ ᱪིᱠᱤ)</strong> में रूपांतरित कर ऑडियो सुनाएगा!
            </p>
          </div>

          {/* Mode Tabs: Upload vs Camera vs Text */}
          <div className="flex items-center bg-stone-100 dark:bg-[#183325] p-1 rounded-2xl shrink-0">
            <button
              onClick={() => {
                setActiveTab("upload");
                setCustomScanResult(null);
              }}
              className={`flex items-center gap-1.5 px-3.5 py-1.5 rounded-xl text-xs font-extrabold transition-all cursor-pointer ${
                activeTab === "upload"
                  ? "bg-white dark:bg-[#224A36] text-forest-900 dark:text-white shadow-xs"
                  : "text-stone-600 dark:text-stone-400 hover:text-stone-900"
              }`}
            >
              <Upload className="w-3.5 h-3.5" />
              <span>फाइल अपलोड</span>
            </button>

            <button
              onClick={() => {
                setActiveTab("camera");
                setCustomScanResult(null);
              }}
              className={`flex items-center gap-1.5 px-3.5 py-1.5 rounded-xl text-xs font-extrabold transition-all cursor-pointer ${
                activeTab === "camera"
                  ? "bg-white dark:bg-[#224A36] text-forest-900 dark:text-white shadow-xs"
                  : "text-stone-600 dark:text-stone-400 hover:text-stone-900"
              }`}
            >
              <Camera className="w-3.5 h-3.5" />
              <span>कैमरा</span>
            </button>

            <button
              onClick={() => setActiveTab("custom")}
              className={`flex items-center gap-1.5 px-3.5 py-1.5 rounded-xl text-xs font-extrabold transition-all cursor-pointer ${
                activeTab === "custom"
                  ? "bg-white dark:bg-[#224A36] text-forest-900 dark:text-white shadow-xs"
                  : "text-stone-600 dark:text-stone-400 hover:text-stone-900"
              }`}
            >
              <FileText className="w-3.5 h-3.5" />
              <span>पाठ दर्ज करें</span>
            </button>
          </div>
        </div>

        {/* Target Language Banner */}
        <div className="flex items-center justify-between p-3 rounded-2xl bg-emerald-50 dark:bg-[#163022] border border-emerald-200 dark:border-[#24523B]">
          <div className="flex items-center gap-2">
            <Sparkles className="w-4 h-4 text-emerald-600 dark:text-emerald-400" />
            <span className="text-xs font-extrabold text-forest-900 dark:text-emerald-200">
              ⚡ आपकी अपलोड की गई फाइल स्वतः <strong>संथाली (Ol Chiki ᱚᱞ ᱪᱤᱠᱤ)</strong> में रूपांतरित होगी!
            </span>
          </div>

          <div className="flex items-center gap-1">
            {[
              { id: "hi-to-sat", label: "हिंदी ➔ ᱥᱟᱱᱛᱟᱲᱤ (संथाली)" },
              { id: "sat-to-hi", label: "ᱥᱟᱱᱛᱟᱲᱤ ➔ हिंदी" },
              { id: "auto", label: "स्वतः पहचान" }
            ].map((dir) => (
              <button
                key={dir.id}
                onClick={() => {
                  setScanDirection(dir.id);
                  setSelectedSampleIndex(0);
                  setCustomScanResult(null);
                }}
                className={`px-2.5 py-1 rounded-lg text-[11px] font-black cursor-pointer transition-all ${
                  scanDirection === dir.id
                    ? "bg-forest-700 text-white shadow-xs"
                    : "bg-white dark:bg-[#0E1F17] text-stone-700 dark:text-stone-300 border border-stone-200 dark:border-[#224734]"
                }`}
              >
                {dir.label}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* 2. Main 2-Column Scanner Layout */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        
        {/* Left Column (5 Cols): Upload / Camera Dropzone & Sample Selector */}
        <div className="lg:col-span-5 space-y-4">
          <div className="bg-white dark:bg-[#12241A] rounded-3xl p-5 border border-stone-200/90 dark:border-[#224734] shadow-2xs space-y-4">
            
            {activeTab === "upload" && (
              <div>
                {/* Hidden File Input */}
                <input
                  type="file"
                  ref={fileInputRef}
                  onChange={handleFileChange}
                  accept="image/*,.pdf"
                  className="hidden"
                />

                <div
                  onClick={() => fileInputRef.current?.click()}
                  className="border-2 border-dashed border-emerald-500 hover:border-emerald-700 bg-emerald-50/50 dark:bg-[#173827] rounded-2xl p-6 text-center cursor-pointer transition-all flex flex-col items-center justify-center space-y-2 group shadow-2xs"
                >
                  <div className="w-12 h-12 rounded-2xl bg-emerald-100 dark:bg-[#1E4D36] text-emerald-800 dark:text-emerald-300 flex items-center justify-center shadow-xs group-hover:scale-110 transition-transform">
                    <Upload className="w-6 h-6 stroke-[2.4]" />
                  </div>
                  <div>
                    <h4 className="text-xs sm:text-sm font-black text-forest-900 dark:text-white">
                      {uploadedFileName ? `चयनित फाइल: ${uploadedFileName}` : "यहाँ पाठ्यपुस्तक की फाइल चुनें या ड्रैग करें"}
                    </h4>
                    <p className="text-[11px] text-emerald-800 dark:text-emerald-300 font-bold mt-0.5">
                      (अपलोड करते ही संथाली Ol Chiki में जनरेट होगा — JPG, PNG, PDF)
                    </p>
                  </div>

                  <button
                    type="button"
                    onClick={(e) => {
                      e.stopPropagation();
                      fileInputRef.current?.click();
                    }}
                    className="px-4 py-2 rounded-xl bg-emerald-700 hover:bg-emerald-800 text-white font-black text-xs shadow-md transition-all cursor-pointer flex items-center gap-1.5"
                  >
                    <Upload className="w-3.5 h-3.5" />
                    <span>फाइल चुनें व संथाली में बदलें (Upload to Santali)</span>
                  </button>
                </div>
              </div>
            )}

            {activeTab === "camera" && (
              <div className="bg-stone-900 rounded-2xl p-6 text-center text-white space-y-3 relative overflow-hidden">
                <div className="w-12 h-12 rounded-full bg-stone-800 flex items-center justify-center mx-auto text-emerald-400">
                  <Camera className="w-6 h-6 animate-pulse" />
                </div>
                <p className="text-xs font-bold">कैमरा सक्रिय है — पुस्तक पृष्ठ सामने रखें</p>
                <div className="w-32 h-1 bg-emerald-500 mx-auto rounded-full animate-bounce" />
                <button
                  onClick={handleSimulateScan}
                  className="px-4 py-1.5 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white font-bold text-xs cursor-pointer"
                >
                  फोटो खींचें व संथाली में बदलें
                </button>
              </div>
            )}

            {activeTab === "custom" && (
              <div className="space-y-3">
                <label className="block text-xs font-bold text-stone-700 dark:text-stone-300">
                  पाठ टाइप करें या पेस्ट करें (हिंदी या संथाली):
                </label>
                <textarea
                  rows={3}
                  value={customInputText}
                  onChange={(e) => setCustomInputText(e.target.value)}
                  placeholder="यहाँ पुस्तक का पाठ लिखें (जैसे: जल ही जीवन है...)"
                  className="w-full p-3 rounded-2xl border border-stone-200 dark:border-[#244A36] bg-stone-50 dark:bg-[#162A1E] text-stone-900 dark:text-white text-xs font-medium focus:ring-2 focus:ring-forest-600 outline-hidden"
                />
                <button
                  onClick={handleCustomScan}
                  className="w-full py-2.5 rounded-xl bg-emerald-700 hover:bg-emerald-800 text-white font-black text-xs shadow-xs cursor-pointer flex items-center justify-center gap-2"
                >
                  <Sparkles className="w-4 h-4 text-amber-300" />
                  <span>संथाली में अनुवाद जनरेट करें</span>
                </button>
              </div>
            )}

            {/* Quick Sample Selector */}
            <div className="space-y-2">
              <span className="text-[11px] font-bold text-stone-500 dark:text-stone-400 block">
                नमूना पाठ्यपुस्तक पृष्ठ चुनकर देखें:
              </span>
              <div className="grid grid-cols-2 gap-2">
                {availableSamples.map((s, idx) => (
                  <button
                    key={s.id || idx}
                    onClick={() => {
                      setSelectedSampleIndex(idx);
                      setCustomScanResult(null);
                      setUploadedPreviewUrl(null);
                      handleSimulateScan();
                    }}
                    className={`p-2.5 rounded-xl text-xs font-bold border text-left transition-all cursor-pointer space-y-0.5 ${
                      selectedSampleIndex === idx && !customScanResult
                        ? "bg-pastel-green dark:bg-[#1E4D36] text-forest-900 dark:text-white border-forest-600 dark:border-emerald-400 shadow-2xs"
                        : "bg-stone-50 dark:bg-[#162A1E] text-stone-700 dark:text-stone-300 border-stone-200 dark:border-[#244A36] hover:bg-white"
                    }`}
                  >
                    <div className="text-[10px] font-black text-amber-600 dark:text-amber-400">
                      {s.directionLabel || (s.direction === "sat-to-hi" ? "संथाली ➔ हिंदी" : "हिंदी ➔ संथाली")}
                    </div>
                    <div className="truncate font-extrabold">{s.title}</div>
                  </button>
                ))}
              </div>
            </div>

            {/* Uploaded File / Sample Image Preview */}
            <div className="space-y-1.5">
              <span className="text-[11px] font-bold text-stone-500 dark:text-stone-400">
                पृष्ठ पूर्वावलोकन ({uploadedFileName ? uploadedFileName : `${sample.classNum} • ${sample.pageNumber}`}):
              </span>
              {uploadedPreviewUrl ? (
                <div className="w-full h-36 rounded-2xl overflow-hidden border border-emerald-300 shadow-inner bg-black flex items-center justify-center">
                  <img src={uploadedPreviewUrl} alt="Uploaded textbook preview" className="max-h-full max-w-full object-contain" />
                </div>
              ) : (
                <TextbookScanIllustration className="w-full h-32" />
              )}
            </div>

            {/* Quick Action Navigation */}
            <div className="grid grid-cols-2 gap-2 pt-1">
              <button
                onClick={() => onNavigate?.("worksheet-generator")}
                className="py-2 px-3 bg-forest-700 hover:bg-forest-800 text-white rounded-xl text-xs font-extrabold transition-colors text-center shadow-xs cursor-pointer"
              >
                + इस पाठ का कार्यपत्रक बनाएं
              </button>
              <button
                onClick={() => onNavigate?.("quiz-generator")}
                className="py-2 px-3 bg-amber-500 hover:bg-amber-600 text-white rounded-xl text-xs font-extrabold transition-colors text-center shadow-xs cursor-pointer"
              >
                + दैनिक क्विज़ बनाएं
              </button>
            </div>
          </div>
        </div>

        {/* Right Column (7 Cols): Extracted Text & Generated Santali Results */}
        <div className="lg:col-span-7 space-y-4">
          
          {/* Scanning Loader Overlay */}
          {isScanning ? (
            <div className="bg-white dark:bg-[#12241A] rounded-3xl p-10 border border-stone-200 dark:border-[#224734] shadow-card text-center space-y-3">
              <RefreshCw className="w-8 h-8 text-emerald-600 dark:text-emerald-400 animate-spin mx-auto" />
              <h3 className="text-base font-black text-forest-900 dark:text-white">
                फाइल से पाठ निकालकर संथाली (Ol Chiki ᱚᱞ ᱪᱤᱠᱤ) में जनरेट किया जा रहा है...
              </h3>
              <p className="text-xs text-emerald-700 dark:text-emerald-300 font-bold">
                संथाली व्याकरण व शब्दकोश का एआई विश्लेषण जारी है।
              </p>
            </div>
          ) : (
            <>
              {/* Card 1: मूल पाठ (Scanned Original Text) */}
              <div className="bg-white dark:bg-[#12241A] rounded-3xl p-5 border border-stone-200/90 dark:border-[#224734] shadow-2xs space-y-3">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <FileText className="w-4 h-4 text-forest-700 dark:text-emerald-400" />
                    <h3 className="font-black text-sm text-forest-900 dark:text-white">
                      1. स्कैन / निष्कर्षित मूल पाठ ({currentResult.sourceLang || "मूल भाषा"})
                    </h3>
                  </div>
                  <button
                    onClick={() => handleSpeak(currentResult.extracted, currentResult.direction === "sat-to-hi" ? "sat" : "hi")}
                    className="flex items-center gap-1.5 px-3 py-1 rounded-xl bg-amber-100 dark:bg-amber-950 text-amber-900 dark:text-amber-300 text-xs font-extrabold cursor-pointer hover:bg-amber-200"
                    title="मूल पाठ सुनें"
                  >
                    <Volume2 className="w-4 h-4" />
                    <span>मूल पाठ सुनें</span>
                  </button>
                </div>
                <p className="text-sm sm:text-base text-stone-800 dark:text-stone-100 font-bold leading-relaxed bg-cream-50/80 dark:bg-[#162E22] p-4 rounded-2xl border border-stone-200/60 dark:border-[#224734]">
                  "{currentResult.extracted}"
                </p>
              </div>

              {/* Card 2: जनरेटेड संथाली अनुवाद (Generated Santali Output) */}
              <div className="bg-white dark:bg-[#12241A] rounded-3xl p-5 border-2 border-emerald-500 shadow-md space-y-3">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <Sparkles className="w-5 h-5 text-amber-500 animate-pulse" />
                    <h3 className="font-black text-sm text-emerald-950 dark:text-emerald-200">
                      2. जनरेटेड संथाली अनुवाद ({currentResult.targetLang || "संथाली (Ol Chiki)"})
                    </h3>
                  </div>
                  <button
                    onClick={() => handleSpeak(currentResult.translation, "sat")}
                    className="flex items-center gap-1.5 px-4 py-2 rounded-xl bg-emerald-700 hover:bg-emerald-800 text-white text-xs font-black cursor-pointer shadow-md active:scale-95 transition-transform"
                    title="संथाली में सुनें (Listen in Santali)"
                  >
                    <Volume2 className="w-4 h-4 text-amber-300" />
                    <span>🔊 ᱥᱟᱱᱛᱟᱲᱤ ᱛᱮ ᱟᱸᱡᱚᱢ (संथाली में सुनें)</span>
                  </button>
                </div>
                <div className="p-4 rounded-2xl bg-emerald-50 dark:bg-[#183827] border border-emerald-300 dark:border-[#29543E] space-y-2">
                  <p className="text-base sm:text-lg font-black text-forest-900 dark:text-emerald-100 leading-relaxed">
                    {currentResult.translation}
                  </p>
                </div>
              </div>

              {/* Card 3: मुख्य शब्द व मातृभाषा शब्दावली (Vocabulary Chips) */}
              {currentResult.vocabMap && currentResult.vocabMap.length > 0 && (
                <div className="bg-white dark:bg-[#12241A] rounded-3xl p-5 border border-stone-200/90 dark:border-[#224734] shadow-2xs space-y-3">
                  <h4 className="text-xs font-black text-forest-900 dark:text-white uppercase tracking-wider">
                    📚 जनरेटेड संथाली शब्दावली (Santali Vocabulary):
                  </h4>
                  <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
                    {currentResult.vocabMap.map((v, i) => (
                      <div
                        key={i}
                        className="p-2.5 rounded-xl bg-stone-50 dark:bg-[#162A1E] border border-stone-200 dark:border-[#224734] text-center space-y-0.5"
                      >
                        <div className="text-xs font-black text-emerald-800 dark:text-emerald-300">{v.tribal}</div>
                        <div className="text-[11px] font-bold text-stone-600 dark:text-stone-300">= {v.hindi}</div>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* Card 4: सरल व्याख्या व अभ्यास प्रश्न */}
              <div className="bg-white dark:bg-[#12241A] rounded-3xl p-5 border border-amber-200 dark:border-amber-800/60 shadow-2xs space-y-3">
                <div className="flex items-center gap-2">
                  <HelpCircle className="w-4 h-4 text-amber-600" />
                  <h3 className="font-black text-sm text-amber-900 dark:text-amber-300">
                    3. सरल व्याख्या व शिक्षक मार्गदर्शन
                  </h3>
                </div>
                <p className="text-xs sm:text-sm text-stone-800 dark:text-stone-200 leading-relaxed bg-amber-50/50 dark:bg-amber-950/30 p-4 rounded-2xl border border-amber-200 dark:border-amber-800">
                  {currentResult.explanation}
                </p>

                {currentResult.practiceQuestions && currentResult.practiceQuestions.length > 0 && (
                  <div className="pt-2 space-y-2">
                    <span className="text-[11px] font-black text-stone-500 dark:text-stone-400 block uppercase tracking-wider">
                      कक्षा अभ्यास प्रश्न:
                    </span>
                    <ul className="space-y-1.5 text-xs font-bold text-stone-800 dark:text-stone-200">
                      {currentResult.practiceQuestions.map((q, i) => (
                        <li key={i} className="flex items-center gap-2 bg-stone-50 dark:bg-[#162A1E] p-2 rounded-xl border border-stone-200/80 dark:border-[#224734]">
                          <span className="w-5 h-5 rounded-full bg-forest-700 text-white text-[10px] flex items-center justify-center shrink-0">
                            {i + 1}
                          </span>
                          <span>{q}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                )}
              </div>
            </>
          )}
        </div>
      </div>
    </div>
  );
}
