import React from "react";
import { ALL_SCREENS } from "./ScreenSwitcherBar";
import { ArrowRight, LayoutGrid, X, ExternalLink, Sparkles } from "lucide-react";

export default function MockupGridModal({
  activeScreen,
  onSelectScreen,
  onClose,
}) {
  return (
    <div className="p-4 sm:p-6 lg:p-8 bg-cream-100 min-h-full font-hindi select-none">
      {/* Top Banner */}
      <div className="bg-white p-5 rounded-3xl border border-stone-200/90 shadow-2xs mb-6 flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
        <div>
          <div className="inline-flex items-center gap-1.5 px-3 py-0.5 rounded-full bg-pastel-green border border-pastel-greenBorder text-forest-900 text-xs font-bold mb-1">
            <Sparkles className="w-3.5 h-3.5 text-forest-700" />
            <span>12-स्क्रीन समग्र दृश्य</span>
          </div>
          <h2 className="text-xl sm:text-2xl font-black text-forest-900">
            भाषासेतु एआई — सम्पूर्ण प्रणाली दृश्य
          </h2>
          <p className="text-xs text-stone-500 mt-0.5">
            सभी स्क्रीन एक साथ देखें। किसी भी स्क्रीन पर क्लिक करके सीधे उस स्क्रीन में काम करें।
          </p>
        </div>

        <button
          onClick={onClose}
          className="px-5 py-2.5 rounded-2xl bg-forest-700 hover:bg-forest-800 text-white font-bold text-xs shadow-card flex items-center gap-2 shrink-0 transition-all"
        >
          <span>वापस इंटरैक्टिव ऐप में जाएं</span>
          <ArrowRight className="w-4 h-4" />
        </button>
      </div>

      {/* 4 x 3 Responsive Grid matching the Reference Image */}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 sm:gap-5">
        {ALL_SCREENS.map((item) => {
          const isCurrent = activeScreen === item.id;
          return (
            <div
              key={item.id}
              onClick={() => onSelectScreen(item.id)}
              className={`bg-white rounded-3xl p-4 border-2 transition-all cursor-pointer flex flex-col justify-between group relative overflow-hidden ${
                isCurrent
                  ? "border-forest-700 shadow-card ring-2 ring-forest-500/20"
                  : "border-stone-200/90 hover:border-forest-400 hover:shadow-card"
              }`}
            >
              {/* Header */}
              <div className="flex items-center justify-between mb-2">
                <span className="text-xs font-numeric font-black bg-stone-100 text-stone-700 px-2 py-0.5 rounded-lg">
                  #{item.num}
                </span>
                <span className="text-[10px] font-bold text-forest-700 opacity-0 group-hover:opacity-100 transition-opacity flex items-center gap-0.5">
                  <span>खोलें</span>
                  <ExternalLink className="w-3 h-3" />
                </span>
              </div>

              {/* Title */}
              <div className="mb-3">
                <h3 className="font-extrabold text-sm sm:text-base text-forest-900 group-hover:text-forest-700 transition-colors">
                  {item.title}
                </h3>
                <p className="text-[11px] text-stone-500 mt-0.5">
                  {item.id === "splash" && "स्वागत पृष्ठ, लोगो, ग्रामीण शिक्षण दृश्य"}
                  {item.id === "login" && "अनन्या शर्मा लॉगिन व नया शिक्षक खाता"}
                  {item.id === "language-select" && "संताली, हो, मुण्डारी, कुड़ुख चयन"}
                  {item.id === "dashboard" && "त्वरित कार्य, 42 छात्र, 12 भाषा अलर्ट"}
                  {item.id === "live-translate" && "हिंदी ⇄ संताली अनुवाद, आवाज व पाठ"}
                  {item.id === "textbook-scanner" && "पाठ निष्कर्षण, सरल व्याख्या"}
                  {item.id === "worksheet-generator" && "10 प्रश्न, रिक्त स्थान, उत्तरमाला"}
                  {item.id === "flashcards" && "दैनिक शब्द, नमस्ते, जल, 3D कार्ड"}
                  {item.id === "curriculum" && "स्वर, मात्रा, संज्ञा, 6 पाठ श्रेणियां"}
                  {item.id === "student-progress" && "अवधारणा 82% बनाम भाषा 45% (रवि)"}
                  {item.id === "teach-back" && "बच्चे के अपने शब्दों में समझ मूल्यांकन"}
                  {item.id === "offline-learning" && "320 एमबी सहेजा गया, ऑफलाइन मोड"}
                  {item.id === "settings" && "प्रोफाइल, भाषा, थीम, सूचना सेटिंग्स"}
                </p>
              </div>

              {/* Mini Visual Preview Block */}
              <div className="h-28 rounded-2xl bg-cream-50/80 border border-stone-100 p-2.5 flex flex-col justify-center items-center text-center group-hover:bg-pastel-green/30 transition-colors">
                {item.id === "splash" && (
                  <div className="space-y-1">
                    <span className="text-xl">🌳</span>
                    <div className="text-[10px] font-bold text-forest-800">शिक्षक की ताकत, हर बच्चे की समझ</div>
                  </div>
                )}
                {item.id === "login" && (
                  <div className="space-y-1">
                    <span className="text-xl">👩‍🏫</span>
                    <div className="text-[10px] font-bold text-forest-800">शिक्षक लॉगिन • शिक्षिका पोर्टल</div>
                  </div>
                )}
                {item.id === "language-select" && (
                  <div className="flex gap-1 justify-center text-[10px] font-bold text-stone-700">
                    <span className="bg-white px-1.5 py-0.5 rounded border">हिंदी</span>
                    <span className="bg-pastel-green px-1.5 py-0.5 rounded border border-forest-300">संताली</span>
                    <span className="bg-white px-1.5 py-0.5 rounded border">हो</span>
                  </div>
                )}
                {item.id === "dashboard" && (
                  <div className="grid grid-cols-2 gap-1 w-full text-[9px] font-bold">
                    <span className="bg-pastel-green p-1 rounded">अनुवाद शुरू</span>
                    <span className="bg-pastel-blue p-1 rounded">स्कैनर</span>
                    <span className="bg-pastel-peach p-1 rounded">कार्यपत्रक</span>
                    <span className="bg-pastel-purple p-1 rounded">शब्द कार्ड</span>
                  </div>
                )}
                {item.id === "live-translate" && (
                  <div className="text-[10px] font-bold text-forest-900 space-y-0.5">
                    <div>"नमस्ते, आप कैसे हैं?"</div>
                    <div className="text-forest-700">➔ "सगात, आय उसनेन्जो ही?"</div>
                  </div>
                )}
                {item.id === "textbook-scanner" && (
                  <div className="text-[10px] text-stone-700">
                    <span className="font-bold text-amber-800">सूरज पूर्व दिशा से...</span>
                    <div className="text-[9px] text-stone-500">सरल व्याख्या + प्रश्न</div>
                  </div>
                )}
                {item.id === "worksheet-generator" && (
                  <div className="text-[9px] text-stone-700 text-left font-bold space-y-0.5 w-full">
                    <div>१. क __ ल (म / ली)</div>
                    <div>२. ग __ य (उ / ई)</div>
                  </div>
                )}
                {item.id === "flashcards" && (
                  <div className="text-center">
                    <div className="text-sm font-black text-forest-900">नमस्ते</div>
                    <span className="text-[10px] text-forest-700 font-bold">सगात (संताली)</span>
                  </div>
                )}
                {item.id === "curriculum" && (
                  <div className="text-[9px] font-bold text-stone-700 space-y-1 w-full">
                    <div className="flex justify-between">
                      <span>स्वर और व्यंजन</span>
                      <span>60%</span>
                    </div>
                    <div className="w-full bg-stone-200 h-1 rounded-full">
                      <div className="bg-forest-600 h-1 rounded-full w-3/5" />
                    </div>
                  </div>
                )}
                {item.id === "student-progress" && (
                  <div className="text-[10px] font-bold text-amber-900 bg-amber-50 p-1.5 rounded-lg border border-amber-200">
                    रवि: अवधारणा 82% | भाषा 45%
                  </div>
                )}
                {item.id === "teach-back" && (
                  <div className="text-[10px] font-bold text-purple-900 space-y-0.5">
                    <div>स्वर व व्यंजन अंतर</div>
                    <span className="text-[9px] bg-purple-100 px-1.5 py-0.5 rounded">एआई समझ: 92%</span>
                  </div>
                )}
                {item.id === "offline-learning" && (
                  <div className="text-[10px] font-bold text-stone-700 space-y-0.5">
                    <div>📶 100% ऑफलाइन सक्रिय</div>
                    <span className="text-[9px] text-forest-700 font-numeric">320 एमबी / 2 जीबी</span>
                  </div>
                )}
                {item.id === "settings" && (
                  <div className="text-[10px] font-bold text-stone-700">
                    ⚙️ शिक्षक प्रोफाइल व भाषा सेटिंग्स
                  </div>
                )}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
