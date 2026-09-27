import React, { useState } from 'react';
import { 
  ArrowLeftRight, 
  Volume2, 
  Mic, 
  MicOff, 
  Copy, 
  Check, 
  Share2, 
  Bookmark, 
  BookmarkCheck, 
  WifiOff, 
  Sparkles,
  RefreshCw,
  ArrowLeft
} from 'lucide-react';
import { AVAILABLE_LANGUAGES, translateText } from '../data/translations';
import { speakText } from '../components/AudioPlayer';

export default function LiveTranslate({ 
  onBack, 
  defaultInput = '', 
  forceShowResult = false,
  currentLanguage = 'ho',
  onLanguageChange
}) {
  const [sourceLang, setSourceLang] = useState('hi');
  const [targetLang, setTargetLang] = useState(currentLanguage || 'ho');
  const [inputText, setInputText] = useState(
    forceShowResult 
      ? 'पेड़ों को बढ़ने के लिए पानी और सूरज की रोशनी की आवश्यकता होती है।' 
      : defaultInput || ''
  );
  const [translatedText, setTranslatedText] = useState(
    forceShowResult 
      ? translateText('पेड़ों को बढ़ने के लिए पानी और सूरज की रोशनी की आवश्यकता होती है।', currentLanguage || 'ho')
      : ''
  );
  const [hasTranslated, setHasTranslated] = useState(forceShowResult);
  const [isListening, setIsListening] = useState(false);
  const [copiedOriginal, setCopiedOriginal] = useState(false);
  const [copiedTranslated, setCopiedTranslated] = useState(false);
  const [isSaved, setIsSaved] = useState(false);

  // Sync if currentLanguage changes externally
  React.useEffect(() => {
    if (currentLanguage && currentLanguage !== targetLang && currentLanguage !== 'hindi') {
      setTargetLang(currentLanguage);
      if (inputText) {
        setTranslatedText(translateText(inputText, currentLanguage));
      }
    }
  }, [currentLanguage]);

  const handleTranslate = () => {
    if (!inputText.trim()) return;
    const res = translateText(inputText, targetLang);
    setTranslatedText(res);
    setHasTranslated(true);
  };

  const handleSelectTargetLang = (langId) => {
    setTargetLang(langId);
    onLanguageChange?.(langId);
    if (inputText) {
      setTranslatedText(translateText(inputText, langId));
    }
  };

  const handleSwapLanguages = () => {
    const oldSource = sourceLang;
    const oldTarget = targetLang;
    setSourceLang(oldTarget);
    setTargetLang(oldSource);
    const oldInput = inputText;
    setInputText(translatedText);
    setTranslatedText(oldInput);
  };

  const handleVoiceInput = () => {
    setIsListening(true);
    setTimeout(() => {
      setIsListening(false);
      const sample = 'पेड़ों को बढ़ने के लिए पानी और सूरज की रोशनी की आवश्यकता होती है।';
      setInputText(sample);
      setTranslatedText(translateText(sample, targetLang));
      setHasTranslated(true);
    }, 1500);
  };

  const handleCopy = (text, type) => {
    navigator.clipboard?.writeText?.(text);
    if (type === 'original') {
      setCopiedOriginal(true);
      setTimeout(() => setCopiedOriginal(false), 2000);
    } else {
      setCopiedTranslated(true);
      setTimeout(() => setCopiedTranslated(false), 2000);
    }
  };

  const handleSave = () => {
    setIsSaved(true);
    setTimeout(() => setIsSaved(false), 2000);
  };

  const sampleSentences = [
    'पेड़ों को बढ़ने के लिए पानी और सूरज की रोशनी की आवश्यकता होती है।',
    'पानी हमारे जीवन के लिए बहुत महत्वपूर्ण है।',
    'आज हम स्कूल जा रहे हैं।',
    'हमारे शिक्षक बहुत अच्छे हैं।',
    'पेड़ों की पत्तियां हरी होती हैं।'
  ];

  const getLangName = (code) => {
    if (code === 'hi') return 'हिंदी';
    const found = AVAILABLE_LANGUAGES.find(l => l.id === code);
    return found ? found.name : 'मातृभाषा';
  };

  return (
    <div className="flex-1 flex flex-col justify-between p-4 bg-[#fdfbf7] text-stone-800">
      <div className="space-y-3 overflow-y-auto">
        
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
            <h2 className="text-base font-extrabold text-stone-900 tracking-tight">
              लाइव अनुवाद
            </h2>
          </div>

          <div className="flex items-center gap-1.5">
            <span className="text-xs font-bold text-amber-900 bg-amber-100 border border-amber-300 px-2 py-0.5 rounded-full">
              ⚡ 1.4 सेकंड
            </span>
            <span className="text-xs font-bold text-[#8A5D15] bg-[#F8D49B]/50 px-2.5 py-0.5 rounded-full border border-[#F8BC9A]">
              {getLangName(sourceLang)} ↔ {getLangName(targetLang)}
            </span>
          </div>
        </div>

        {/* Target Language Selection Tabs (हो, संथाली, मुंडारी) */}
        <div className="bg-stone-100 p-1 rounded-2xl border border-stone-200 flex items-center gap-1">
          {AVAILABLE_LANGUAGES.map(lang => (
            <button
              key={lang.id}
              type="button"
              onClick={() => handleSelectTargetLang(lang.id)}
              className={`flex-1 py-1.5 px-2 rounded-xl text-xs font-black transition-all ${
                targetLang === lang.id
                  ? 'bg-[#75BDE0] text-white shadow-xs scale-[1.02]'
                  : 'text-stone-600 hover:text-stone-900 hover:bg-stone-200/60'
              }`}
            >
              {lang.name}
            </button>
          ))}
        </div>

        {/* Input Card: हिंदी (मूल पाठ) */}
        <div className="bg-white rounded-2xl border border-stone-200 shadow-xs p-3 space-y-2 relative">
          <div className="flex items-center justify-between">
            <span className="text-xs font-bold text-stone-500">
              {sourceLang === 'hi' ? 'हिंदी (मूल पाठ)' : 'हो (मूल पाठ)'}
            </span>
            <div className="flex items-center gap-1">
              {inputText && (
                <>
                  <button
                    onClick={() => speakText(inputText, 'hi-IN')}
                    className="p-1 rounded text-stone-400 hover:text-stone-700"
                    title="बोलें"
                  >
                    <Volume2 className="w-4 h-4" />
                  </button>
                  <button
                    onClick={() => handleCopy(inputText, 'original')}
                    className="p-1 rounded text-stone-400 hover:text-stone-700"
                    title="कॉपी करें"
                  >
                    {copiedOriginal ? <Check className="w-4 h-4 text-[#75BDE0]" /> : <Copy className="w-4 h-4" />}
                  </button>
                </>
              )}
            </div>
          </div>

          <textarea
            value={inputText}
            onChange={(e) => {
              setInputText(e.target.value);
              if (e.target.value === '') {
                setTranslatedText('');
                setHasTranslated(false);
              }
            }}
            placeholder="यहाँ हिंदी में लिखें..."
            rows={3}
            maxLength={500}
            className="w-full bg-transparent resize-none border-none outline-none text-sm font-semibold text-stone-800 placeholder-stone-400 leading-relaxed"
          />

          {/* Bottom controls of input card: Voice Mic & Character Counter */}
          <div className="flex items-center justify-between pt-1 border-t border-stone-100">
            <button
              type="button"
              onClick={handleVoiceInput}
              className={`p-1.5 rounded-full transition-colors flex items-center gap-1 text-xs font-bold ${
                isListening 
                  ? 'bg-red-100 text-red-700 animate-pulse' 
                  : 'bg-stone-100 hover:bg-[#75BDE0]/15 text-stone-600 hover:text-[#75BDE0]'
              }`}
              title="बोलकर टाइप करें"
            >
              {isListening ? <MicOff className="w-3.5 h-3.5" /> : <Mic className="w-3.5 h-3.5" />}
              {isListening && <span>सुन रहे हैं...</span>}
            </button>

            <span className="text-xs text-stone-400 font-mono">
              {inputText.length}/500
            </span>
          </div>
        </div>

        {/* Quick Sample Input Chips */}
        {!hasTranslated && (
          <div className="flex gap-1.5 overflow-x-auto pb-1 no-scrollbar">
            {sampleSentences.map((sample, idx) => (
              <button
                key={idx}
                onClick={() => {
                  setInputText(sample);
                  setTranslatedText(translateText(sample, targetLang));
                  setHasTranslated(true);
                }}
                className="whitespace-nowrap px-2.5 py-1 bg-stone-100 hover:bg-[#F8D49B]/30 text-stone-700 hover:text-[#8A5D15] border border-stone-200 rounded-full text-xs font-medium transition-colors shrink-0"
              >
                {sample.slice(0, 22)}...
              </button>
            ))}
          </div>
        )}

        {/* Circular Sky Blue Swap Button */}
        <div className="flex justify-center -my-2.5 z-10 relative">
          <button
            type="button"
            onClick={handleTranslate}
            className="w-9 h-9 rounded-full bg-[#75BDE0] hover:bg-[#5baed6] active:scale-95 text-white shadow-md flex items-center justify-center border-2 border-white transition-all cursor-pointer"
            title="अनुवाद करें / भाषा बदलें"
          >
            <ArrowLeftRight className="w-4 h-4 rotate-90 text-white" />
          </button>
        </div>

        {/* Output Card: अनुवाद (Screen 7 in poster) */}
        <div className={`rounded-2xl border shadow-xs p-3 space-y-2 transition-all ${
          hasTranslated && translatedText 
            ? 'bg-[#F8D49B]/20 border-[#F8BC9A]' 
            : 'bg-white border-stone-200'
        }`}>
          <div className="flex items-center justify-between">
            <span className="text-xs font-bold text-[#2D4B5A] flex items-center gap-1.5">
              <span>{getLangName(targetLang)} अनुवाद</span>
              {hasTranslated && (
                <span className="text-xs bg-[#F8D49B]/50 text-[#8A5D15] border border-[#F8BC9A] px-1.5 py-0.2 rounded font-bold">
                  सत्यापित
                </span>
              )}
            </span>

            {translatedText && (
              <div className="flex items-center gap-1">
                <button
                  onClick={() => speakText(translatedText, 'hi-IN')}
                  className="p-1 rounded text-stone-500 hover:text-[#75BDE0] transition-colors"
                  title="उच्चारण सुनें"
                >
                  <Volume2 className="w-4 h-4 text-[#75BDE0]" />
                </button>
                <button
                  onClick={() => handleCopy(translatedText, 'translated')}
                  className="p-1 rounded text-stone-500 hover:text-[#75BDE0] transition-colors"
                  title="कॉपी करें"
                >
                  {copiedTranslated ? <Check className="w-4 h-4 text-[#75BDE0]" /> : <Copy className="w-4 h-4" />}
                </button>
              </div>
            )}
          </div>

          <div className="min-h-[60px] flex items-center">
            {translatedText ? (
              <p className="text-sm font-bold text-stone-900 leading-relaxed">
                {translatedText}
              </p>
            ) : (
              <p className="text-xs text-stone-400 italic">
                यहाँ '{getLangName(targetLang)}' जनजातीय भाषा में अनुवाद प्रदर्शित होगा...
              </p>
            )}
          </div>
        </div>

      </div>

      {/* Bottom Buttons & Offline Indicator */}
      <div className="pt-3 space-y-2.5">
        {/* Buttons: If not translated, show "अनुवाद करें". If translated, show "फिर से अनुवाद करें" & "सहेजें" */}
        {!hasTranslated ? (
          <button
            onClick={handleTranslate}
            disabled={!inputText.trim()}
            className="w-full py-3 bg-[#75BDE0] hover:bg-[#5baed6] active:scale-[0.98] disabled:opacity-50 text-white font-bold rounded-xl shadow-md transition-all text-sm flex items-center justify-center gap-2"
          >
            <span>अनुवाद करें</span>
          </button>
        ) : (
          <div className="flex gap-2">
            <button
              onClick={() => {
                setHasTranslated(false);
                setInputText('');
                setTranslatedText('');
              }}
              className="flex-1 py-2.5 bg-white hover:bg-stone-50 border-2 border-stone-300 active:scale-[0.98] text-stone-800 font-bold rounded-xl shadow-xs transition-all text-xs flex items-center justify-center gap-1.5"
            >
              <RefreshCw className="w-3.5 h-3.5" />
              <span>फिर से अनुवाद करें</span>
            </button>

            <button
              onClick={handleSave}
              className="flex-1 py-2.5 bg-[#75BDE0] hover:bg-[#5baed6] active:scale-[0.98] text-white font-bold rounded-xl shadow-xs transition-all text-xs flex items-center justify-center gap-1.5"
            >
              {isSaved ? <BookmarkCheck className="w-3.5 h-3.5 text-amber-300" /> : <Bookmark className="w-3.5 h-3.5" />}
              <span>{isSaved ? 'सहेज लिया गया!' : 'सहेजें'}</span>
            </button>
          </div>
        )}

        {/* Offline Badge at bottom matching poster */}
        <div className="flex items-center justify-center gap-1.5 py-1 px-3 text-stone-500 text-xs font-semibold">
          <WifiOff className="w-3.5 h-3.5 text-stone-400" />
          <span>ऑफलाइन मोड: इंटरनेट की आवश्यकता नहीं</span>
        </div>
      </div>
    </div>
  );
}
