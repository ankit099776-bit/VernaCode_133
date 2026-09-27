import React, { useState } from 'react';
import { 
  Settings as SettingsIcon, 
  Languages, 
  Sliders, 
  Volume2, 
  Sun, 
  Moon, 
  Download, 
  Check, 
  ChevronRight, 
  ArrowLeft, 
  LogOut, 
  ShieldCheck, 
  HelpCircle, 
  Sparkles,
  Smartphone,
  School
} from 'lucide-react';
import { TEACHER_DATA } from '../data/mockData';

export default function Settings({ onBack, onLogout, fontSizeLevel = 'large', onFontSizeChange }) {
  const [activeLang, setActiveLang] = useState('हिंदी');
  const [ttsSpeed, setTtsSpeed] = useState('सामान्य');
  const [highContrast, setHighContrast] = useState(false);
  const [autoPlayAudio, setAutoPlayAudio] = useState(true);

  // Model packs
  const [installedPacks, setInstalledPacks] = useState(['ho']);
  const [downloadingPack, setDownloadingPack] = useState(null);

  const handleTogglePack = (packId) => {
    if (installedPacks.includes(packId)) {
      setInstalledPacks(installedPacks.filter(p => p !== packId));
    } else {
      setDownloadingPack(packId);
      setTimeout(() => {
        setInstalledPacks([...installedPacks, packId]);
        setDownloadingPack(null);
      }, 1200);
    }
  };

  const cycleFontSize = () => {
    const levels = ['small', 'normal', 'large'];
    const nextIdx = (levels.indexOf(fontSizeLevel) + 1) % levels.length;
    onFontSizeChange?.(levels[nextIdx]);
  };

  const getFontSizeDisplay = () => {
    if (fontSizeLevel === 'small') return 'छोटा';
    if (fontSizeLevel === 'large') return 'बड़ा';
    return 'सामान्य';
  };

  const cycleTtsSpeed = () => {
    const speeds = ['धीमी (0.75x)', 'सामान्य (1.0x)', 'तेज (1.25x)'];
    const currentBase = ttsSpeed.split(' ')[0];
    const nextSpeed = currentBase === 'धीमी' ? 'सामान्य (1.0x)' : currentBase === 'सामान्य' ? 'तेज (1.25x)' : 'धीमी (0.75x)';
    setTtsSpeed(nextSpeed);
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
                सेटिंग्स व प्राथमिकताएं
              </h2>
              <p className="text-xs text-stone-500 font-medium">
                ऐप और शिक्षण अनुकूलन
              </p>
            </div>
          </div>

          <span className="text-xs font-bold text-stone-600 bg-stone-100 px-2.5 py-0.5 rounded-full border border-stone-200">
            संस्करण 2.4
          </span>
        </div>

        {/* Section 1: भाषा प्राथमिकताएं */}
        <div className="bg-white rounded-2xl border border-stone-200 shadow-xs p-3 space-y-2.5">
          <span className="text-xs font-bold text-[#2D4B5A] uppercase tracking-wide flex items-center gap-1.5">
            <Languages className="w-3.5 h-3.5 text-[#75BDE0]" />
            <span>भाषा प्राथमिकता</span>
          </span>

          <div className="flex items-center justify-between py-1 text-xs">
            <span className="font-bold text-[#2D4B5A]">प्राथमिक माध्यम भाषा</span>
            <div className="flex items-center gap-1">
              {['हिंदी', 'हो', 'संथाली'].map((l) => (
                <button
                  key={l}
                  onClick={() => setActiveLang(l)}
                  className={`px-2 py-1 rounded-lg text-xs font-bold transition-all ${
                    activeLang === l
                      ? 'bg-[#75BDE0] text-white shadow-xs'
                      : 'bg-stone-100 text-stone-600 hover:bg-stone-200'
                  }`}
                >
                  {l}
                </button>
              ))}
            </div>
          </div>

          {/* Offline Language Packs Management */}
          <div className="pt-1 space-y-1.5 border-t border-stone-100">
            <span className="text-xs font-bold text-stone-400 uppercase block">
              ऑफ़लाइन जनजातीय भाषा मॉडल पैक:
            </span>

            {/* Ho */}
            <div className="flex items-center justify-between p-2 bg-[#fdfaf6] rounded-xl border border-[#F8BC9A]/40 text-xs">
              <div>
                <span className="font-bold text-[#2D4B5A] block">हो भाषा मॉडल</span>
                <span className="text-xs text-stone-400">वारंग क्षिति + देवनागरी लिपि • 30 एमबी</span>
              </div>
              <span className="text-xs font-bold bg-[#F8D49B]/50 text-[#8A5D15] px-2 py-0.5 rounded border border-[#F8BC9A]">
                सक्रिय ✓
              </span>
            </div>

            {/* Mundari */}
            <div className="flex items-center justify-between p-2 bg-[#fdfaf6] rounded-xl border border-[#F8BC9A]/40 text-xs">
              <div>
                <span className="font-bold text-[#2D4B5A] block">मुंडारी मॉडल</span>
                <span className="text-xs text-stone-400">रांची/खूंटी संभाग • 35 एमबी</span>
              </div>
              <button
                onClick={() => handleTogglePack('mundari')}
                className={`text-xs font-bold px-2 py-0.5 rounded transition-all ${
                  installedPacks.includes('mundari')
                    ? 'bg-[#F8D49B]/50 text-[#8A5D15] border border-[#F8BC9A]'
                    : 'bg-[#75BDE0] text-white hover:bg-[#5da8cc]'
                }`}
              >
                {downloadingPack === 'mundari' ? 'डाउनलोड...' : installedPacks.includes('mundari') ? 'सहेजा ✓' : '+ डाउनलोड'}
              </button>
            </div>

            {/* Santhali */}
            <div className="flex items-center justify-between p-2 bg-[#fdfaf6] rounded-xl border border-[#F8BC9A]/40 text-xs">
              <div>
                <span className="font-bold text-[#2D4B5A] block">संथाली मॉडल</span>
                <span className="text-xs text-stone-400">ओल चिकी + देवनागरी • 40 एमबी</span>
              </div>
              <button
                onClick={() => handleTogglePack('santhali')}
                className={`text-xs font-bold px-2 py-0.5 rounded transition-all ${
                  installedPacks.includes('santhali')
                    ? 'bg-[#F8D49B]/50 text-[#8A5D15] border border-[#F8BC9A]'
                    : 'bg-[#75BDE0] text-white hover:bg-[#5da8cc]'
                }`}
              >
                {downloadingPack === 'santhali' ? 'डाउनलोड...' : installedPacks.includes('santhali') ? 'सहेजा ✓' : '+ डाउनलोड'}
              </button>
            </div>
          </div>
        </div>

        {/* Section 2: कक्षा प्रदर्शन व ऑडियो अनुकूलन */}
        <div className="bg-white rounded-2xl border border-stone-200 shadow-xs p-3 space-y-2.5">
          <span className="text-xs font-bold text-[#2D4B5A] uppercase tracking-wide flex items-center gap-1.5">
            <Sliders className="w-3.5 h-3.5 text-[#75BDE0]" />
            <span>कक्षा डिस्प्ले व ऑडियो</span>
          </span>

          {/* Font Size */}
          <div className="flex items-center justify-between py-1 text-xs">
            <div>
              <span className="font-bold text-[#2D4B5A] block">फ़ॉन्ट आकार</span>
              <span className="text-xs text-stone-400">कक्षा के ब्लैकबोर्ड/टैबलेट हेतु</span>
            </div>
            <button
              onClick={cycleFontSize}
              className="px-3 py-1 bg-stone-100 hover:bg-[#F8D49B]/30 border border-stone-200 text-[#2D4B5A] font-bold rounded-lg text-xs sm:text-sm shadow-2xs"
            >
              {getFontSizeDisplay()} 🔤
            </button>
          </div>

          {/* High Contrast Mode */}
          <div className="flex items-center justify-between py-1 text-xs border-t border-stone-100">
            <div>
              <span className="font-bold text-[#2D4B5A] block">उच्च कंट्रास्ट दृश्य</span>
              <span className="text-xs text-stone-400">धूप व खुले कमरों में स्पष्ट दृश्यता</span>
            </div>
            <button
              onClick={() => setHighContrast(!highContrast)}
              className={`w-10 h-5 rounded-full transition-colors relative p-0.5 ${
                highContrast ? 'bg-[#75BDE0]' : 'bg-stone-300'
              }`}
            >
              <div className={`w-4 h-4 rounded-full bg-white transition-transform ${
                highContrast ? 'translate-x-5' : 'translate-x-0'
              }`} />
            </button>
          </div>

          {/* Audio TTS Speed */}
          <div className="flex items-center justify-between py-1 text-xs border-t border-stone-100">
            <div>
              <span className="font-bold text-[#2D4B5A] block">ध्वनि उच्चारण गति</span>
              <span className="text-xs text-stone-400">छोटे बच्चों के लिए धीमी गति</span>
            </div>
            <button
              onClick={cycleTtsSpeed}
              className="px-2.5 py-1 bg-stone-100 hover:bg-stone-200 text-stone-800 font-bold rounded-lg text-xs"
            >
              {ttsSpeed} 🔊
            </button>
          </div>
        </div>

        {/* Section 3: स्कूल व शिक्षक प्रोफाइल संक्षेप */}
        <div className="bg-white rounded-2xl border border-stone-200 shadow-xs p-3 space-y-1.5 text-xs">
          <div className="flex items-center justify-between">
            <span className="font-bold text-[#2D4B5A] flex items-center gap-1.5">
              <School className="w-3.5 h-3.5 text-[#75BDE0]" />
              <span>स्कूल विवरण</span>
            </span>
            <span className="text-xs text-[#8A5D15] font-bold bg-[#F8D49B]/50 px-2 py-0.5 rounded border border-[#F8BC9A]">
              सत्यापित
            </span>
          </div>
          <p className="font-extrabold text-[#2D4B5A]">{TEACHER_DATA.school}</p>
          <p className="text-xs text-stone-500">
            {TEACHER_DATA.district} • U-DISE: {TEACHER_DATA.udise}
          </p>
        </div>

        {/* Logout Button */}
        <button
          onClick={onLogout}
          className="w-full py-2.5 bg-red-50 hover:bg-red-100 border border-red-200 text-red-700 font-bold rounded-xl text-xs transition-colors flex items-center justify-center gap-1.5"
        >
          <LogOut className="w-4 h-4" />
          <span>लॉगआउट करें</span>
        </button>

      </div>

      {/* Footer Info */}
      <div className="pt-2 text-center text-xs text-stone-400">
        भाषा सेतु • समग्र शिक्षा अभियान (झारखंड)
      </div>
    </div>
  );
}
