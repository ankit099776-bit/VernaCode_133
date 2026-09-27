import React, { useState } from 'react';
import { 
  Volume2, 
  Plus, 
  Search, 
  Layers, 
  ListFilter, 
  ArrowLeft, 
  Sparkles, 
  RotateCw, 
  Check,
  ArrowRight,
  ChevronLeft,
  ChevronRight,
  CheckCircle2,
  HelpCircle,
  Award
} from 'lucide-react';
import { INITIAL_VOCABULARY, VOCAB_CATEGORIES } from '../data/vocabulary';
import { speakText, AudioButton } from '../components/AudioPlayer';

export default function Vocabulary({ 
  onBack,
  currentLanguage = 'ho',
  onLanguageChange
}) {
  const [vocabList, setVocabList] = useState(INITIAL_VOCABULARY);
  const [activeTab, setActiveTab] = useState('list'); // 'list' | 'flashcard'
  const [targetLang, setTargetLang] = useState(currentLanguage || 'ho');
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('सभी');
  
  // Flashcard State
  const [flashcardIndex, setFlashcardIndex] = useState(0);
  const [isFlipped, setIsFlipped] = useState(false);
  const [masteredIds, setMasteredIds] = useState([]);

  // Add Word Modal State
  const [showAddModal, setShowAddModal] = useState(false);
  const [newHindi, setNewHindi] = useState('');
  const [newHo, setNewHo] = useState('');
  const [newEnglish, setNewEnglish] = useState('');

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

  const getLangWord = (item, lang = targetLang) => {
    if (!item) return '';
    return item[lang] || item.ho || item.hindi;
  };

  const getLangPronunciation = (item, lang = targetLang) => {
    if (!item) return '';
    if (typeof item.pronunciation === 'object' && item.pronunciation) {
      return item.pronunciation[lang] || item.pronunciation.ho || getLangWord(item, lang);
    }
    return item.pronunciation || getLangWord(item, lang);
  };

  const getLangExample = (item, lang = targetLang) => {
    if (!item) return '';
    if (typeof item.examples === 'object' && item.examples) {
      return item.examples[lang] || item.examples.ho || item.example || '';
    }
    return item.example || '';
  };

  const filteredVocab = vocabList.filter(item => {
    const q = searchQuery.toLowerCase();
    const matchesQuery = 
      item.hindi?.toLowerCase().includes(q) ||
      item.ho?.toLowerCase().includes(q) ||
      item.santhali?.toLowerCase().includes(q) ||
      item.mundari?.toLowerCase().includes(q);
    const matchesCategory = selectedCategory === 'सभी' || item.category === selectedCategory;
    return matchesQuery && matchesCategory;
  });

  const currentCard = filteredVocab[flashcardIndex] || filteredVocab[0] || INITIAL_VOCABULARY[0];

  const handleNextCard = () => {
    setIsFlipped(false);
    setFlashcardIndex((prev) => (prev + 1) % filteredVocab.length);
  };

  const handlePrevCard = () => {
    setIsFlipped(false);
    setFlashcardIndex((prev) => (prev - 1 + filteredVocab.length) % filteredVocab.length);
  };

  const handleToggleMastered = (id) => {
    if (masteredIds.includes(id)) {
      setMasteredIds(masteredIds.filter(i => i !== id));
    } else {
      setMasteredIds([...masteredIds, id]);
      handleNextCard();
    }
  };

  const handleAddNewWord = (e) => {
    e?.preventDefault();
    if (!newHindi.trim() || !newHo.trim()) return;
    const newItem = {
      id: Date.now(),
      hindi: newHindi,
      english: '',
      ho: newHo,
      pronunciation: newHo,
      category: 'दैनिक जीवन',
      example: `${newHindi} -> ${newHo}`
    };
    setVocabList(prev => [newItem, ...prev]);
    setNewHindi('');
    setNewHo('');
    setNewEnglish('');
    setShowAddModal(false);
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
            <div>
              <h2 className="text-base font-extrabold text-stone-900 leading-tight">
                शब्दावली
              </h2>
              <p className="text-xs text-stone-500 font-medium">
                शब्द सीखें और याद करें
              </p>
            </div>
          </div>

          <span className="text-xs font-bold text-[#8A5D15] bg-[#F8D49B]/50 px-2.5 py-0.5 rounded-full border border-[#F8BC9A]">
            {filteredVocab.length} शब्द • {masteredIds.length} याद हुए
          </span>
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

        {/* Tab Switcher: शब्द सूची vs अभ्यास कार्ड */}
        <div className="bg-stone-200/80 p-1 rounded-xl flex items-center gap-1 text-xs font-bold">
          <button
            onClick={() => setActiveTab('list')}
            className={`flex-1 py-1.5 rounded-lg transition-all ${
              activeTab === 'list'
                ? 'bg-[#75BDE0] text-white shadow-xs'
                : 'text-stone-700 hover:text-stone-900'
            }`}
          >
            शब्द सूची
          </button>
          <button
            onClick={() => { setActiveTab('flashcard'); setIsFlipped(false); }}
            className={`flex-1 py-1.5 rounded-lg transition-all ${
              activeTab === 'flashcard'
                ? 'bg-[#75BDE0] text-white shadow-xs'
                : 'text-stone-700 hover:text-stone-900'
            }`}
          >
            अभ्यास कार्ड
          </button>
        </div>

        {/* Category Chips */}
        <div className="flex items-center gap-1.5 overflow-x-auto pb-1 no-scrollbar">
          {VOCAB_CATEGORIES.map(cat => (
            <button
              key={cat}
              onClick={() => {
                setSelectedCategory(cat);
                setFlashcardIndex(0);
                setIsFlipped(false);
              }}
              className={`whitespace-nowrap px-2.5 py-1 rounded-full text-xs font-bold transition-all shrink-0 ${
                selectedCategory === cat
                  ? 'bg-[#75BDE0] text-white shadow-2xs'
                  : 'bg-white text-stone-600 hover:bg-[#F8D49B]/30 border border-stone-200'
              }`}
            >
              {cat}
            </button>
          ))}
        </div>

        {/* ================= TAB 1: FLASHCARDS MODE ================= */}
        {activeTab === 'flashcard' && currentCard && (
          <div className="space-y-3">
            {/* Progress & Counter */}
            <div className="flex items-center justify-between text-xs text-stone-500 font-bold px-1">
              <span>कार्ड {flashcardIndex + 1} / {filteredVocab.length}</span>
              <span className="text-[#2D4B5A]">
                {masteredIds.includes(currentCard.id) ? '✓ याद हो चुका है' : 'अभ्यास जारी है'}
              </span>
            </div>

            {/* 3D Flip Card Container with Sunrise Gradient on Back */}
            <div 
              onClick={() => setIsFlipped(!isFlipped)}
              className="w-full min-h-[200px] cursor-pointer select-none perspective-1000"
            >
              <div className={`w-full h-full min-h-[200px] rounded-3xl p-5 border-2 transition-all duration-300 shadow-md flex flex-col justify-between items-center text-center ${
                isFlipped
                  ? 'bg-gradient-to-br from-[#75BDE0] via-[#f39c6b] to-[#F99B9B] text-white border-[#F8BC9A] shadow-lg'
                  : 'bg-white text-stone-900 border-[#F8BC9A] hover:border-[#75BDE0]'
              }`}>
                {/* Card Top Pill */}
                <div className="w-full flex items-center justify-between">
                  <span className={`text-xs font-bold px-2 py-0.5 rounded-md ${
                    isFlipped ? 'bg-white/20 text-white' : 'bg-[#F8D49B]/50 text-[#8A5D15]'
                  }`}>
                    {currentCard.category}
                  </span>
                  <span className={`text-xs font-semibold ${isFlipped ? 'text-white' : 'text-stone-400'}`}>
                    {isFlipped ? `${getLangTitle(targetLang)} मातृभाषा` : 'हिंदी (मूल शब्द)'}
                  </span>
                </div>

                {/* Card Center Content */}
                {!isFlipped ? (
                  /* FRONT: Hindi Word */
                  <div className="py-4 space-y-2">
                    <h3 className="text-3xl font-black text-stone-900 tracking-tight">
                      {currentCard.hindi}
                    </h3>
                    <div className="pt-1 flex items-center justify-center gap-2">
                      <AudioButton text={currentCard.hindi} lang="hi-IN" size="md" />
                      <span className="text-xs text-stone-500">उच्चारण सुनें</span>
                    </div>
                  </div>
                ) : (
                  /* BACK: Tribal Translation */
                  <div className="py-4 space-y-2">
                    <h3 className="text-3xl font-black text-amber-200 tracking-tight">
                      {getLangWord(currentCard, targetLang)}
                    </h3>
                    <p className="text-xs font-semibold text-white/95">
                      उच्चारण: {getLangPronunciation(currentCard, targetLang)}
                    </p>
                    <div className="p-2 bg-white/20 rounded-xl border border-white/20 text-xs text-white mt-2 max-w-xs">
                      💬 "{getLangExample(currentCard, targetLang)}"
                    </div>
                    <div className="pt-1 flex items-center justify-center gap-2">
                      <AudioButton text={getLangWord(currentCard, targetLang)} lang="hi-IN" size="md" />
                      <span className="text-xs text-white">मातृभाषा ऑडियो</span>
                    </div>
                  </div>
                )}

                {/* Card Bottom Hint */}
                <div className="flex items-center gap-1 text-xs font-semibold opacity-85">
                  <RotateCw className="w-3.5 h-3.5" />
                  <span>{isFlipped ? 'हिंदी देखने के लिए पलटें' : `मातृभाषा (${getLangTitle(targetLang)}) अनुवाद के लिए क्लिक करें`}</span>
                </div>
              </div>
            </div>

            {/* Navigation & Mastery Controls */}
            <div className="flex items-center justify-between gap-2 pt-1">
              <button
                onClick={handlePrevCard}
                className="p-2 rounded-xl bg-white border border-stone-200 text-stone-700 hover:bg-stone-50 active:scale-95 shadow-2xs"
                title="पिछला कार्ड"
              >
                <ChevronLeft className="w-5 h-5" />
              </button>

              <button
                onClick={() => handleToggleMastered(currentCard.id)}
                className={`flex-1 py-2 px-3 rounded-xl border text-xs font-bold transition-all flex items-center justify-center gap-1.5 ${
                  masteredIds.includes(currentCard.id)
                    ? 'bg-amber-50 border-amber-300 text-amber-900'
                    : 'bg-[#75BDE0] border-[#5baed6] text-white shadow-xs'
                }`}
              >
                <CheckCircle2 className="w-4 h-4" />
                <span>{masteredIds.includes(currentCard.id) ? 'पुनः अभ्यास में जोड़ें' : 'याद हो गया!'}</span>
              </button>

              <button
                onClick={handleNextCard}
                className="p-2 rounded-xl bg-white border border-stone-200 text-stone-700 hover:bg-stone-50 active:scale-95 shadow-2xs"
                title="अगला कार्ड"
              >
                <ChevronRight className="w-5 h-5" />
              </button>
            </div>
          </div>
        )}

        {/* ================= TAB 2: WORD LIST MODE ================= */}
        {activeTab === 'list' && (
          <div className="space-y-2.5">
            {/* Search Bar */}
            <div className="relative">
              <Search className="w-4 h-4 text-stone-400 absolute left-3 top-2.5" />
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="शब्द खोजें (हिंदी, मातृभाषा)..."
                className="w-full pl-9 pr-3 py-1.5 bg-white border border-stone-200 rounded-xl text-xs outline-none focus:ring-1 focus:ring-[#75BDE0] shadow-2xs"
              />
            </div>

            {/* Words Table/List matching poster Screen 8 */}
            <div className="bg-white rounded-2xl border border-stone-200 shadow-xs divide-y divide-stone-100 overflow-hidden">
              {filteredVocab.map((item) => (
                <div key={item.id} className="p-2.5 flex items-center justify-between hover:bg-stone-50 transition-colors">
                  <div className="flex-1 min-w-0 pr-2">
                    <div className="flex items-baseline gap-1.5">
                      <span className="font-extrabold text-xs text-stone-900">
                        {item.hindi}
                      </span>
                    </div>
                    <div className="flex items-center gap-1.5 mt-0.5">
                      <span className="text-xs font-bold text-[#2D4B5A]">
                        {getLangTitle(targetLang)}: {getLangWord(item, targetLang)}
                      </span>
                    </div>
                  </div>

                  <div className="flex items-center gap-1 shrink-0">
                    <AudioButton text={getLangWord(item, targetLang)} lang="hi-IN" size="sm" />
                    {masteredIds.includes(item.id) && (
                      <span className="text-xs bg-[#F8D49B]/50 text-[#8A5D15] px-1.5 py-0.5 rounded font-bold border border-[#F8BC9A]/60">
                        याद ✓
                      </span>
                    )}
                  </div>
                </div>
              ))}
            </div>

            {/* Add New Word Button */}
            <button
              onClick={() => setShowAddModal(true)}
              className="w-full py-2.5 bg-[#75BDE0] hover:bg-[#5baed6] text-white rounded-xl text-xs font-bold transition-all shadow-xs flex items-center justify-center gap-1.5"
            >
              <Plus className="w-4 h-4" />
              <span>+ नया शब्द जोड़ें</span>
            </button>
          </div>
        )}

      </div>

      {/* Add New Word Modal */}
      {showAddModal && (
        <div className="fixed inset-0 bg-black/40 backdrop-blur-2xs flex items-center justify-center p-4 z-50">
          <div className="bg-white rounded-2xl p-4 max-w-xs w-full shadow-xl border border-stone-200 space-y-3">
            <h3 className="font-extrabold text-sm text-stone-900">
              नया शब्द जोड़ें
            </h3>
            <form onSubmit={handleAddNewWord} className="space-y-2 text-xs">
              <div>
                <label className="font-bold text-stone-700 block mb-0.5">हिंदी शब्द *</label>
                <input
                  type="text"
                  value={newHindi}
                  onChange={(e) => setNewHindi(e.target.value)}
                  placeholder="उदा. किताब"
                  className="w-full p-2 border border-stone-300 rounded-lg outline-none focus:ring-1 focus:ring-[#75BDE0]"
                  required
                />
              </div>
              <div>
                <label className="font-bold text-stone-700 block mb-0.5">{getLangTitle(targetLang)} अनुवाद *</label>
                <input
                  type="text"
                  value={newHo}
                  onChange={(e) => setNewHo(e.target.value)}
                  placeholder="उदा. पुथी"
                  className="w-full p-2 border border-stone-300 rounded-lg outline-none focus:ring-1 focus:ring-[#75BDE0]"
                  required
                />
              </div>
              <div>
                <label className="font-bold text-stone-700 block mb-0.5">अतिरिक्त संदर्भ / वाक्य</label>
                <input
                  type="text"
                  value={newEnglish}
                  onChange={(e) => setNewEnglish(e.target.value)}
                  placeholder="उदा. कक्षा प्रयोग"
                  className="w-full p-2 border border-stone-300 rounded-lg outline-none focus:ring-1 focus:ring-[#75BDE0]"
                />
              </div>
              <div className="flex items-center justify-end gap-2 pt-2">
                <button
                  type="button"
                  onClick={() => setShowAddModal(false)}
                  className="px-3 py-1.5 bg-stone-100 hover:bg-stone-200 rounded-lg text-stone-600 font-bold"
                >
                  रद्द करें
                </button>
                <button
                  type="submit"
                  className="px-3 py-1.5 bg-[#75BDE0] hover:bg-[#5baed6] text-white rounded-lg font-bold shadow-xs"
                >
                  सहेजें
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
