import React, { useState } from 'react';
import { ChevronRight, ArrowLeft, Volume2, Globe2 } from 'lucide-react';
import { ThreeDancers, TribalBorderPattern } from '../components/TribalArt';
import { speakText } from '../components/AudioPlayer';

export default function LanguageSelect({ onSelectLanguage, onBack, currentLanguage = 'ho' }) {
  const [playingId, setPlayingId] = useState(null);

  const handleSelect = (langId, role) => {
    onSelectLanguage?.(langId, role);
  };

  const handlePlayVoice = (e, text, id) => {
    e.stopPropagation();
    setPlayingId(id);
    speakText(text, 'hi-IN');
    setTimeout(() => setPlayingId(null), 1600);
  };

  return (
    <div className="flex-1 flex flex-col justify-between p-4 sm:p-5 bg-[#fdfbf7] text-stone-800 select-none h-full">
      {/* Top Header & Question */}
      <div className="space-y-4">
        {/* Navigation Bar */}
        <div className="flex items-center justify-between">
          <button 
            onClick={onBack}
            className="p-1.5 rounded-full hover:bg-stone-200/60 text-stone-700 transition-colors"
          >
            <ArrowLeft className="w-5 h-5" />
          </button>
          <span className="text-xs sm:text-sm font-bold text-[#8A5D15] bg-[#F8D49B]/50 border border-[#F8BC9A] px-3 py-0.5 rounded-full">
            भाषा चयन
          </span>
        </div>

        {/* Title & Subtitle matching the poster */}
        <div className="text-center space-y-1.5 pt-1">
          <h2 className="text-2xl sm:text-3xl font-bold text-[#2D4B5A] tracking-tight">
            अपनी भाषा चुनें
          </h2>
          <p className="text-sm text-stone-600 font-medium">
            आप किस भाषा में काम करना चाहते हैं?
          </p>
        </div>

        {/* Language Options Cards - Ho, Santhali, Mundari, Hindi */}
        <div className="space-y-3 pt-1 overflow-y-auto max-h-[420px] pr-1">
          
          {/* Card 1: हो (Sunrise Sky Blue #75BDE0) */}
          <div
            onClick={() => handleSelect('ho', 'student')}
            className={`w-full bg-white active:scale-[0.99] border-2 rounded-2xl p-3.5 flex items-center justify-between shadow-xs transition-all cursor-pointer group ${
              currentLanguage === 'ho' 
                ? 'border-[#75BDE0] bg-[#75BDE0]/10 shadow-sm ring-1 ring-[#75BDE0]' 
                : 'border-stone-200 hover:border-[#75BDE0] hover:bg-[#75BDE0]/5'
            }`}
          >
            <div className="flex items-center gap-3">
              <div className="w-12 h-12 rounded-full bg-[#75BDE0] text-white flex items-center justify-center font-black text-xl shadow-xs shrink-0">
                हो
              </div>

              <div className="text-left">
                <div className="flex items-center gap-2">
                  <h3 className="font-extrabold text-base text-stone-900 group-hover:text-[#2D4B5A] leading-tight">
                    हो
                  </h3>
                  <span className="text-xs bg-[#F8D49B]/50 text-[#8A5D15] font-bold px-2 py-0.5 rounded border border-[#F8BC9A]/60">
                    कोल्हान
                  </span>
                </div>
                <p className="text-xs sm:text-sm text-stone-500 font-medium mt-0.5">
                  पश्चिमी व पूर्वी सिंहभूम • जोहार!
                </p>
              </div>
            </div>

            <div className="flex items-center gap-1.5">
              <button
                type="button"
                onClick={(e) => handlePlayVoice(e, 'जोहार! आबुवा: पाड़ाव रे सुगुम दाराम।', 'ho')}
                className="p-2 rounded-lg text-stone-400 hover:text-[#75BDE0] hover:bg-stone-100"
                title="उच्चारण सुनें"
              >
                <Volume2 className={`w-4 h-4 ${playingId === 'ho' ? 'text-[#75BDE0] animate-pulse' : ''}`} />
              </button>
              <ChevronRight className="w-4 h-4 text-stone-400 group-hover:text-[#75BDE0] group-hover:translate-x-0.5 transition-transform" />
            </div>
          </div>

          {/* Card 2: संथाली (Sunrise Peach / Warm Gold #F8BC9A) */}
          <div
            onClick={() => handleSelect('santhali', 'student')}
            className={`w-full bg-white active:scale-[0.99] border-2 rounded-2xl p-3.5 flex items-center justify-between shadow-xs transition-all cursor-pointer group ${
              currentLanguage === 'santhali'
                ? 'border-[#F8BC9A] bg-[#F8D49B]/20 shadow-sm ring-1 ring-[#F8BC9A]'
                : 'border-stone-200 hover:border-[#F8BC9A] hover:bg-[#F8D49B]/10'
            }`}
          >
            <div className="flex items-center gap-3">
              <div className="w-12 h-12 rounded-full bg-[#f39c6b] text-white flex items-center justify-center font-black text-xl shadow-xs shrink-0">
                सं
              </div>

              <div className="text-left">
                <div className="flex items-center gap-2">
                  <h3 className="font-extrabold text-base text-stone-900 group-hover:text-[#b55734] leading-tight">
                    संथाली
                  </h3>
                  <span className="text-xs bg-[#F8D49B]/60 text-[#8A5D15] font-bold px-2 py-0.5 rounded border border-[#F8BC9A]/60">
                    संथाल परगना
                  </span>
                </div>
                <p className="text-xs sm:text-sm text-stone-500 font-medium mt-0.5">
                  दुमका, जामताड़ा, देवघर • जोहार!
                </p>
              </div>
            </div>

            <div className="flex items-center gap-1.5">
              <button
                type="button"
                onClick={(e) => handlePlayVoice(e, 'जोहार! अबोवा: पाढ़ाव रे सागुन दाराम।', 'santhali')}
                className="p-2 rounded-lg text-stone-400 hover:text-[#b55734] hover:bg-stone-100"
                title="उच्चारण सुनें"
              >
                <Volume2 className={`w-4 h-4 ${playingId === 'santhali' ? 'text-[#b55734] animate-pulse' : ''}`} />
              </button>
              <ChevronRight className="w-4 h-4 text-stone-400 group-hover:text-[#b55734] group-hover:translate-x-0.5 transition-transform" />
            </div>
          </div>

          {/* Card 3: मुंडारी (Sunrise Rose Pink #F99B9B) */}
          <div
            onClick={() => handleSelect('mundari', 'student')}
            className={`w-full bg-white active:scale-[0.99] border-2 rounded-2xl p-3.5 flex items-center justify-between shadow-xs transition-all cursor-pointer group ${
              currentLanguage === 'mundari'
                ? 'border-[#F99B9B] bg-[#F99B9B]/15 shadow-sm ring-1 ring-[#F99B9B]'
                : 'border-stone-200 hover:border-[#F99B9B] hover:bg-[#F99B9B]/10'
            }`}
          >
            <div className="flex items-center gap-3">
              <div className="w-12 h-12 rounded-full bg-[#e87f7f] text-white flex items-center justify-center font-black text-xl shadow-xs shrink-0">
                मुं
              </div>

              <div className="text-left">
                <div className="flex items-center gap-2">
                  <h3 className="font-extrabold text-base text-stone-900 group-hover:text-[#c43838] leading-tight">
                    मुंडारी
                  </h3>
                  <span className="text-xs bg-[#F99B9B]/30 text-[#9C3838] font-bold px-2 py-0.5 rounded border border-[#F99B9B]/50">
                    खूंटी व रांची
                  </span>
                </div>
                <p className="text-xs sm:text-sm text-stone-500 font-medium mt-0.5">
                  खूंटी, रांची, गुमला • जोहार!
                </p>
              </div>
            </div>

            <div className="flex items-center gap-1.5">
              <button
                type="button"
                onClick={(e) => handlePlayVoice(e, 'जोहार! आबुवा: पाड़ाव रे सुकु ते दाराम।', 'mundari')}
                className="p-2 rounded-lg text-stone-400 hover:text-[#c43838] hover:bg-stone-100"
                title="उच्चारण सुनें"
              >
                <Volume2 className={`w-4 h-4 ${playingId === 'mundari' ? 'text-[#c43838] animate-pulse' : ''}`} />
              </button>
              <ChevronRight className="w-4 h-4 text-stone-400 group-hover:text-[#c43838] group-hover:translate-x-0.5 transition-transform" />
            </div>
          </div>

          {/* Card 4: हिंदी (Sunrise Deep Slate #2D4B5A) */}
          <div
            onClick={() => handleSelect('hindi', 'teacher')}
            className={`w-full bg-white active:scale-[0.99] border-2 rounded-2xl p-3.5 flex items-center justify-between shadow-xs transition-all cursor-pointer group ${
              currentLanguage === 'hindi'
                ? 'border-[#2D4B5A] bg-[#2D4B5A]/10 shadow-sm ring-1 ring-[#2D4B5A]'
                : 'border-stone-200 hover:border-[#2D4B5A] hover:bg-[#2D4B5A]/5'
            }`}
          >
            <div className="flex items-center gap-3">
              <div className="w-12 h-12 rounded-full bg-[#2D4B5A] text-white flex items-center justify-center font-black text-xl shadow-xs shrink-0">
                अ
              </div>

              <div className="text-left">
                <div className="flex items-center gap-2">
                  <h3 className="font-extrabold text-base text-stone-900 group-hover:text-[#2D4B5A] leading-tight">
                    हिंदी
                  </h3>
                  <span className="text-xs bg-[#2D4B5A]/15 text-[#2D4B5A] font-bold px-2 py-0.5 rounded border border-[#2D4B5A]/30">
                    शिक्षक माध्यम
                  </span>
                </div>
                <p className="text-xs sm:text-sm text-stone-500 font-medium mt-0.5">
                  राज्य स्तरीय प्राथमिक पाठ्यक्रम
                </p>
              </div>
            </div>

            <div className="flex items-center gap-1.5">
              <button
                type="button"
                onClick={(e) => handlePlayVoice(e, 'नमस्ते! हिंदी भाषा में आपका स्वागत है।', 'hindi')}
                className="p-2 rounded-lg text-stone-400 hover:text-[#2D4B5A] hover:bg-stone-100"
                title="उच्चारण सुनें"
              >
                <Volume2 className={`w-4 h-4 ${playingId === 'hindi' ? 'text-[#2D4B5A] animate-pulse' : ''}`} />
              </button>
              <ChevronRight className="w-4 h-4 text-stone-400 group-hover:text-[#2D4B5A] group-hover:translate-x-0.5 transition-transform" />
            </div>
          </div>

        </div>
      </div>

      {/* Bottom Tribal Dancers & Pattern matching the poster */}
      <div className="pt-4 flex flex-col items-center shrink-0">
        <div className="mb-2">
          <ThreeDancers className="h-10" />
        </div>
        <TribalBorderPattern className="h-2.5 w-full opacity-60" />
      </div>
    </div>
  );
}
