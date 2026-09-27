import React, { useState } from 'react';
import { 
  Download, 
  CheckCircle2, 
  ChevronRight, 
  ArrowLeft, 
  Check, 
  HardDrive, 
  Languages, 
  Sliders, 
  RefreshCw,
  LogOut,
  Sparkles
} from 'lucide-react';
import { OFFLINE_PACKS } from '../data/mockData';

export default function OfflineSettings({ onBack, onLogout }) {
  const [packs, setPacks] = useState(OFFLINE_PACKS);
  const [downloadingId, setDownloadingId] = useState(null);
  const [fontSize, setFontSize] = useState('मध्यम');
  const [activeLang, setActiveLang] = useState('हिंदी');

  const handleToggleDownload = (id) => {
    setDownloadingId(id);
    setTimeout(() => {
      setPacks(prev => prev.map(p => {
        if (p.id === id) return { ...p, downloaded: !p.downloaded };
        return p;
      }));
      setDownloadingId(null);
    }, 1000);
  };

  const handleFontSizeCycle = () => {
    const sizes = ['छोटा', 'मध्यम', 'बड़ा'];
    const currentIdx = sizes.indexOf(fontSize);
    setFontSize(sizes[(currentIdx + 1) % sizes.length]);
  };

  return (
    <div className="flex-1 flex flex-col justify-between p-4 bg-[#fdfbf7]">
      <div className="space-y-4 overflow-y-auto">
        
        {/* Top Header */}
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            {onBack && (
              <button 
                onClick={onBack}
                className="p-1 rounded-full hover:bg-stone-200/60 text-stone-700 transition-colors"
              >
                <ArrowLeft className="w-5 h-5" />
              </button>
            )}
            <div>
              <h2 className="text-base font-extrabold text-stone-900 leading-tight">
                ऑफलाइन डाउनलोड / सेटिंग्स
              </h2>
              <p className="text-xs text-stone-500 font-medium">
                कंटेंट डाउनलोड और सेटिंग्स
              </p>
            </div>
          </div>

          <span className="text-xs font-bold text-[#8A5D15] bg-[#F8D49B]/50 px-2.5 py-0.5 rounded-full border border-[#F8BC9A]">
            255 एमबी सहेजा
          </span>
        </div>

        {/* Section 1: डाउनलोड कंटेंट (Download Content from poster Screen 10) */}
        <div>
          <h3 className="text-xs font-bold text-stone-700 uppercase tracking-wide mb-2 flex items-center gap-1.5">
            <HardDrive className="w-3.5 h-3.5 text-stone-500" />
            <span>डाउनलोड कंटेंट</span>
          </h3>

          <div className="bg-white rounded-2xl border border-stone-200 shadow-xs divide-y divide-stone-100 overflow-hidden">
            {packs.map(pack => (
              <div key={pack.id} className="p-3 flex items-center justify-between hover:bg-stone-50 transition-colors">
                <div className="flex items-center gap-3">
                  <div className="w-8 h-8 rounded-lg bg-[#F8D49B]/40 text-[#8A5D15] flex items-center justify-center font-bold">
                    📄
                  </div>
                  <div>
                    <h4 className="font-bold text-xs text-stone-900">
                      {pack.name}
                    </h4>
                    <span className="text-xs text-stone-400 font-medium">
                      {pack.size}
                    </span>
                  </div>
                </div>

                <button
                  onClick={() => handleToggleDownload(pack.id)}
                  disabled={downloadingId === pack.id}
                  className={`p-2 rounded-xl transition-all flex items-center gap-1 text-xs font-bold ${
                    pack.downloaded
                      ? 'text-[#75BDE0] hover:bg-[#75BDE0]/10'
                      : 'bg-[#75BDE0] text-white hover:bg-[#5baed6] shadow-xs'
                  }`}
                  title={pack.downloaded ? 'डाउनलोड पूरा' : 'डाउनलोड करें'}
                >
                  {downloadingId === pack.id ? (
                    <RefreshCw className="w-4 h-4 animate-spin text-[#75BDE0]" />
                  ) : pack.downloaded ? (
                    <Check className="w-4 h-4 text-[#75BDE0] stroke-[3]" />
                  ) : (
                    <Download className="w-4 h-4" />
                  )}
                </button>
              </div>
            ))}
          </div>
        </div>

        {/* Section 2: अन्य सेटिंग्स (Other Settings from poster Screen 10) */}
        <div>
          <h3 className="text-xs font-bold text-stone-700 uppercase tracking-wide mb-2 flex items-center gap-1.5">
            <Sliders className="w-3.5 h-3.5 text-stone-500" />
            <span>अन्य सेटिंग्स</span>
          </h3>

          <div className="bg-white rounded-2xl border border-stone-200 shadow-xs divide-y divide-stone-100 overflow-hidden text-xs">
            {/* Setting: भाषा */}
            <div className="p-3 flex items-center justify-between">
              <span className="font-bold text-stone-800">भाषा</span>
              <div className="flex items-center gap-1 text-stone-500 font-semibold cursor-pointer">
                <span>{activeLang}</span>
                <ChevronRight className="w-4 h-4" />
              </div>
            </div>

            {/* Setting: ऑफलाइन अनुवाद पैक */}
            <div className="p-3 flex items-center justify-between">
              <span className="font-bold text-stone-800">ऑफलाइन अनुवाद पैक</span>
              <div className="flex items-center gap-1.5 text-[#8A5D15] font-bold bg-[#F8D49B]/50 px-2 py-0.5 rounded-full border border-[#F8BC9A]">
                <CheckCircle2 className="w-3.5 h-3.5 text-[#75BDE0]" />
                <span>स्थापित</span>
              </div>
            </div>

            {/* Setting: फ़ॉन्ट आकार */}
            <div 
              onClick={handleFontSizeCycle}
              className="p-3 flex items-center justify-between cursor-pointer hover:bg-stone-50"
            >
              <span className="font-bold text-stone-800">फ़ॉन्ट आकार</span>
              <div className="flex items-center gap-1 text-stone-500 font-semibold">
                <span className="bg-stone-100 px-2 py-0.5 rounded text-stone-700">{fontSize}</span>
                <ChevronRight className="w-4 h-4" />
              </div>
            </div>
          </div>
        </div>

        {/* Banner: सभी मुख्य फीचर ऑफलाइन उपलब्ध हैं (Screen 10 in poster) */}
        <div className="p-3 bg-[#F8D49B]/30 border border-[#F8BC9A] rounded-2xl flex items-center gap-2.5">
          <div className="w-6 h-6 rounded-full bg-[#75BDE0] text-white flex items-center justify-center shrink-0 shadow-xs">
            <Check className="w-3.5 h-3.5 stroke-[3]" />
          </div>
          <p className="text-xs font-bold text-[#8A5D15] leading-tight">
            सभी मुख्य फीचर ऑफलाइन उपलब्ध हैं
          </p>
        </div>

      </div>

      {/* Bottom Logout / Switch Role Option */}
      {onLogout && (
        <div className="pt-3">
          <button
            onClick={onLogout}
            className="w-full py-2.5 bg-stone-100 hover:bg-red-50 text-stone-700 hover:text-red-700 border border-stone-200 rounded-xl font-bold text-xs flex items-center justify-center gap-1.5 transition-colors"
          >
            <LogOut className="w-3.5 h-3.5" />
            <span>खाता बदलें या लॉगआउट करें</span>
          </button>
        </div>
      )}
    </div>
  );
}
