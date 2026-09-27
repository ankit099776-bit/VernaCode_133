import React, { useState } from "react";
import { Search, Check, ArrowRight, ArrowLeft, Globe, BookOpen, Sparkles } from "lucide-react";
import { LANGUAGES } from "../data/bhashaData";

export default function LanguageSelect({
  selectedLanguage = "santhali",
  onSelectLanguage,
  onContinue,
  onBack,
}) {
  const [searchQuery, setSearchQuery] = useState("");

  const filteredLanguages = LANGUAGES.filter(
    (l) =>
      l.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      l.subname.toLowerCase().includes(searchQuery.toLowerCase()) ||
      l.script.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="min-h-full flex flex-col justify-between bg-cream-100 p-4 sm:p-6 select-none max-w-4xl mx-auto">
      {/* Top Header matching Mockup Screen 3 */}
      <div className="space-y-4">
        <div className="flex items-center justify-between border-b border-stone-200/80 pb-3">
          <button
            onClick={onBack}
            className="p-2 rounded-xl text-stone-600 hover:text-stone-900 hover:bg-white transition-colors"
            title="वापस जाएं"
          >
            <ArrowLeft className="w-5 h-5" />
          </button>
          
          <div className="text-center flex-1">
            <h2 className="text-xl sm:text-2xl font-extrabold text-forest-900 font-hindi">
              भाषा चुनें
            </h2>
            <p className="text-xs text-stone-500 font-hindi mt-0.5">
              कक्षा में उपयोग की जाने वाली जनजातीय मातृभाषा चुनें
            </p>
          </div>

          <div className="w-9" /> {/* Spacer */}
        </div>

        {/* Search Bar matching Mockup Screen 3 */}
        <div className="relative max-w-md mx-auto">
          <Search className="w-4 h-4 text-stone-400 absolute left-3.5 top-3" />
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="भाषा खोजें (जैसे संताली, हो, मुण्डारी)..."
            className="w-full pl-10 pr-4 py-2.5 rounded-2xl bg-white border border-stone-200/90 focus:border-forest-600 focus:ring-2 focus:ring-forest-200 outline-none text-xs sm:text-sm font-hindi shadow-2xs transition-all"
          />
        </div>

        {/* Notice badge */}
        <div className="bg-pastel-amber/60 border border-pastel-amberBorder rounded-2xl p-3 text-xs text-amber-900 font-hindi flex items-center gap-2 max-w-xl mx-auto">
          <Sparkles className="w-4 h-4 text-amber-700 shrink-0" />
          <span>
            <strong>शिक्षक टिप:</strong> शिक्षण सामग्री हिंदी में रहेगी, जबकि अनुवाद, ऑडियो व कार्यपत्रक चुनी गई जनजातीय भाषा में उपलब्ध होंगे।
          </span>
        </div>

        {/* Grid of Languages (Matching Screen 3 in mockup) */}
        <div className="grid grid-cols-2 sm:grid-cols-3 gap-3 pt-1">
          {filteredLanguages
            .filter((l) => l.id !== "english")
            .map((lang) => {
              const isSelected = selectedLanguage === lang.id;
              return (
                <div
                  key={lang.id}
                  onClick={() => onSelectLanguage(lang.id)}
                  className={`p-4 rounded-3xl border-2 transition-all cursor-pointer flex flex-col items-center text-center justify-between relative group ${
                    isSelected
                      ? "bg-white border-forest-700 shadow-card ring-2 ring-forest-600/20"
                      : "bg-white/80 hover:bg-white border-stone-200/90 hover:border-forest-300 shadow-2xs"
                  }`}
                >
                  {/* Top Badge / Radio */}
                  <div className="w-full flex justify-between items-center mb-2">
                    <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-stone-100 text-stone-600 font-hindi">
                      {lang.script}
                    </span>
                    <div
                      className={`w-5 h-5 rounded-full border flex items-center justify-center transition-colors ${
                        isSelected
                          ? "border-forest-700 bg-forest-700 text-white"
                          : "border-stone-300 group-hover:border-forest-400"
                      }`}
                    >
                      {isSelected && <Check className="w-3 h-3 stroke-[3]" />}
                    </div>
                  </div>

                  {/* Icon Emblem */}
                  <div
                    className={`w-12 h-12 rounded-2xl flex items-center justify-center text-xl mb-2 transition-transform group-hover:scale-105 ${
                      isSelected ? "bg-pastel-green text-forest-800" : "bg-cream-200 text-stone-700"
                    }`}
                  >
                    {lang.id === "hindi" && "📖"}
                    {lang.id === "santhali" && "🌳"}
                    {lang.id === "mundari" && "🪶"}
                    {lang.id === "ho" && "✨"}
                    {lang.id === "kurukh" && "☀️"}
                    {lang.id === "kharia" && "🍃"}
                  </div>

                  {/* Language Title & Native Name */}
                  <div className="mb-2">
                    <h3 className="font-extrabold text-base text-forest-900 font-hindi">
                      {lang.name}
                    </h3>
                    <p className="text-xs text-stone-500 font-hindi font-medium">
                      ({lang.subname})
                    </p>
                  </div>

                  {/* Speaker region */}
                  <span className="text-[10px] text-stone-600 font-hindi leading-tight">
                    {lang.speakers}
                  </span>
                </div>
              );
            })}
        </div>

        {/* English Helper Card (Full width bottom card matching mockup Screen 3) */}
        {filteredLanguages.some((l) => l.id === "english") && (
          <div
            onClick={() => onSelectLanguage("english")}
            className={`p-3.5 rounded-2xl border-2 transition-all cursor-pointer flex items-center justify-between ${
              selectedLanguage === "english"
                ? "bg-white border-forest-700 shadow-card"
                : "bg-white/80 hover:bg-white border-stone-200 hover:border-forest-300"
            }`}
          >
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl bg-blue-50 text-blue-700 flex items-center justify-center text-lg">
                🌐
              </div>
              <div>
                <h4 className="font-extrabold text-sm text-forest-900 font-hindi">
                  अंग्रेजी (English)
                </h4>
                <p className="text-xs text-stone-500 font-hindi">
                  सहायक संदर्भ भाषा (अंतरराष्ट्रीय शब्दावली संदर्भ)
                </p>
              </div>
            </div>
            <div
              className={`w-5 h-5 rounded-full border flex items-center justify-center ${
                selectedLanguage === "english"
                  ? "border-forest-700 bg-forest-700 text-white"
                  : "border-stone-300"
              }`}
            >
              {selectedLanguage === "english" && <Check className="w-3 h-3 stroke-[3]" />}
            </div>
          </div>
        )}
      </div>

      {/* Bottom CTA Button */}
      <div className="pt-6 pb-2 text-center">
        <button
          onClick={onContinue}
          className="w-full sm:w-auto min-w-[240px] px-8 py-3 rounded-2xl bg-forest-700 hover:bg-forest-800 text-white font-bold text-sm shadow-card hover:shadow-float transition-all flex items-center justify-center gap-2 font-hindi mx-auto"
        >
          <span>कक्षा डैशबोर्ड पर जाएं</span>
          <ArrowRight className="w-4 h-4" />
        </button>
      </div>
    </div>
  );
}
