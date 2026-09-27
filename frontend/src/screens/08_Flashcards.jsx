import React, { useState, useEffect } from "react";
import {
  ChevronLeft,
  ChevronRight,
  Shuffle,
  Volume2,
  Copy,
  Check,
  RotateCw,
  Plus,
  X,
  BookOpen,
  Filter,
  Sparkles,
  Layers,
  GraduationCap
} from "lucide-react";
import {
  FLASHCARD_ITEMS,
  getStoredFlashcards,
  saveNewFlashcard,
  playDevanagariAudio
} from "../data/bhashaData";

// Cropped high-resolution assets from reference image
import namasteGirlImg from "../assets/flashcard_namaste_girl.png";
import iconNamaste from "../assets/clean_namaste.png";
import iconJal from "../assets/clean_jal.png";
import iconVidyalaya from "../assets/clean_vidyalaya.png";
import iconPustak from "../assets/clean_pustak.png";
import iconMitra from "../assets/clean_mitra.png";

export default function Flashcards({
  selectedLanguage = "santhali",
  studentGrade = null,
  isStudentPortal = false
}) {
  const [allCards, setAllCards] = useState(getStoredFlashcards());
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isFlipped, setIsFlipped] = useState(false);
  
  // Lock class filter for student login
  const activeStudentClass = isStudentPortal || studentGrade ? (studentGrade || "कक्षा 2") : "सभी कक्षाएं";

  // Filtering states: Syllabus, Class, Subject, Chapterwise
  const [selectedSyllabus, setSelectedSyllabus] = useState("JAC Board (झारखंड)");
  const [selectedClass, setSelectedClass] = useState(activeStudentClass);
  const [selectedSubject, setSelectedSubject] = useState("सभी विषय");
  const [selectedChapter, setSelectedChapter] = useState("सभी अध्याय");

  const [savedToast, setSavedToast] = useState(false);
  const [toastMessage, setToastMessage] = useState("");

  // Teacher Add Flashcard Modal State
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);
  const [newCardForm, setNewCardForm] = useState({
    syllabus: "JAC Board (झारखंड)",
    classLevel: isStudentPortal || studentGrade ? (studentGrade || "कक्षा 2") : "कक्षा 1",
    subject: "हिंदी",
    chapter: "अध्याय 1: हमारा परिवार व परिवेश",
    hindiWord: "",
    santhaliWord: "",
    meaningHindi: "",
    exampleSentence: "",
    icon: "📚"
  });

  // Re-sync cards when updated in localStorage or studentGrade changes
  useEffect(() => {
    const handleUpdate = () => {
      setAllCards(getStoredFlashcards());
    };
    window.addEventListener("bhashasetu_flashcards_updated", handleUpdate);
    return () => window.removeEventListener("bhashasetu_flashcards_updated", handleUpdate);
  }, []);

  useEffect(() => {
    if (isStudentPortal || studentGrade) {
      setSelectedClass(studentGrade || "कक्षा 2");
      setCurrentIndex(0);
    }
  }, [studentGrade, isStudentPortal]);

  // Compute filtered deck strictly: Students ONLY see cards of their own class!
  const effectiveClass = (isStudentPortal || studentGrade) ? (studentGrade || "कक्षा 2") : selectedClass;
  
  const filteredDeck = allCards.filter((card) => {
    if (effectiveClass !== "सभी कक्षाएं" && card.classLevel !== effectiveClass) return false;
    if (selectedSubject !== "सभी विषय" && card.subject && card.subject !== selectedSubject) return false;
    if (selectedChapter !== "सभी अध्याय" && card.chapter && card.chapter !== selectedChapter) return false;
    return true;
  });

  const deck = filteredDeck;
  const currentCard = deck[currentIndex] || deck[0];

  // Extract unique chapters available for the selected class & subject
  const availableChapters = Array.from(
    new Set(
      allCards
        .filter((c) => (selectedClass === "सभी कक्षाएं" || c.classLevel === selectedClass))
        .map((c) => c.chapter)
        .filter(Boolean)
    )
  );

  const handleNext = () => {
    setIsFlipped(false);
    setCurrentIndex((prev) => (prev + 1) % deck.length);
  };

  const handlePrev = () => {
    setIsFlipped(false);
    setCurrentIndex((prev) => (prev - 1 + deck.length) % deck.length);
  };

  const handleShuffle = () => {
    setIsFlipped(false);
    const shuffled = [...allCards].sort(() => Math.random() - 0.5);
    setAllCards(shuffled);
    setCurrentIndex(0);
  };

  const handleSpeakHindi = (text) => {
    playDevanagariAudio(text || currentCard.hindiWord, "hi");
  };

  const handleSpeakSantali = (text) => {
    const targetText = text || currentCard.translations?.santhali || currentCard.santhaliWord || currentCard.hindiWord;
    playDevanagariAudio(targetText, "sat");
  };

  const handleSaveCard = () => {
    setToastMessage("कार्ड संग्रह में सहेज लिया गया!");
    setSavedToast(true);
    setTimeout(() => setSavedToast(false), 2200);
  };

  const handleCreateNewCard = (e) => {
    e.preventDefault();
    if (!newCardForm.hindiWord.trim() || !newCardForm.santhaliWord.trim()) {
      alert("कृपया हिंदी शब्द और संथाली अनुवाद दोनों भरें!");
      return;
    }

    const updatedList = saveNewFlashcard(newCardForm);
    setAllCards(updatedList);
    setIsAddModalOpen(false);
    setCurrentIndex(0);

    setToastMessage(`नया कार्ड '${newCardForm.hindiWord}' सफलतापूर्वक जोड़ा गया!`);
    setSavedToast(true);
    setTimeout(() => setSavedToast(false), 3000);

    setNewCardForm({
      syllabus: "JAC Board (झारखंड)",
      classLevel: "कक्षा 1",
      subject: "हिंदी",
      chapter: "अध्याय 1: हमारा परिवार व परिवेश",
      hindiWord: "",
      santhaliWord: "",
      meaningHindi: "",
      exampleSentence: "",
      icon: "📚"
    });
  };

  const getTargetTranslation = (card) => {
    if (card.translations?.santhali) return card.translations.santhali;
    if (card.santhaliWord) return card.santhaliWord;
    return card.translations?.ho || card.translations?.mundari || "ᱥᱟᱱᱛᱟᱲᱤ ᱟᱹᱲᱟᱹ";
  };

  // Helper to render center image matching the active card strictly by word/concept
  const renderCardIllustration = (card) => {
    if (!card) return null;
    const w = (card.hindiWord || "").trim();
    const illType = card.illustrationType;

    if (w === "नमस्ते" || illType === "namaste") {
      return (
        <img
          src={namasteGirlImg}
          alt="नमस्ते"
          className="w-36 h-36 sm:w-44 sm:h-44 object-contain my-auto drop-shadow-sm select-none pointer-events-none"
        />
      );
    }
    if (w === "जल" || illType === "water") {
      return (
        <img
          src={iconJal}
          alt="जल"
          className="w-32 h-32 sm:w-40 sm:h-40 object-contain my-auto drop-shadow-sm select-none pointer-events-none"
        />
      );
    }
    if (w === "विद्यालय" || illType === "school") {
      return (
        <img
          src={iconVidyalaya}
          alt="विद्यालय"
          className="w-36 h-36 sm:w-44 sm:h-44 object-contain my-auto drop-shadow-sm select-none pointer-events-none"
        />
      );
    }
    if (w === "पुस्तक" || illType === "book") {
      return (
        <img
          src={iconPustak}
          alt="पुस्तक"
          className="w-36 h-36 sm:w-44 sm:h-44 object-contain my-auto drop-shadow-sm select-none pointer-events-none"
        />
      );
    }
    if (w === "मित्र" || illType === "friend") {
      return (
        <img
          src={iconMitra}
          alt="मित्र"
          className="w-36 h-36 sm:w-44 sm:h-44 object-contain my-auto drop-shadow-sm select-none pointer-events-none"
        />
      );
    }

    // High Quality Subject-Themed Visual Badge for Math, EVS, Values, Language concepts
    return (
      <div className="w-32 h-32 sm:w-40 sm:h-40 rounded-3xl bg-gradient-to-br from-emerald-500/10 via-amber-500/10 to-teal-500/10 dark:from-emerald-400/20 dark:to-teal-500/20 border-2 border-emerald-500/30 dark:border-emerald-400/40 flex flex-col items-center justify-center text-6xl sm:text-7xl shadow-md my-auto transform transition-transform hover:scale-105 select-none">
        <span className="drop-shadow-md">{card.icon || "📖"}</span>
        <span className="text-[10px] font-black tracking-widest text-[#143D2B] dark:text-emerald-300 uppercase mt-1">
          {card.subject || "पाठ्यक्रम"}
        </span>
      </div>
    );
  };

  return (
    <div className="p-4 sm:p-6 lg:p-8 space-y-4 sm:space-y-6 max-w-4xl mx-auto font-hindi select-none">
      {/* Toast feedback when saving/adding card */}
      {savedToast && (
        <div className="fixed top-20 right-8 z-50 bg-[#1B4D36] text-white px-5 py-3 rounded-2xl shadow-card flex items-center gap-2.5 text-sm font-bold animate-in fade-in slide-in-from-top-3 border border-emerald-400">
          <Check className="w-5 h-5 text-emerald-300" />
          <span>{toastMessage || "कार्ड संग्रह में सहेज लिया गया!"}</span>
        </div>
      )}

      {/* Header Bar with Action Button: Add New Flashcard */}
      <div className="bg-gradient-to-r from-[#1B4D36] to-[#143D2B] text-white p-4 sm:p-5 rounded-3xl shadow-sm flex flex-wrap items-center justify-between gap-4">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-2xl bg-white/10 flex items-center justify-center text-2xl">
            🎴
          </div>
          <div>
            <h1 className="text-xl sm:text-2xl font-black tracking-tight font-hindi">
              पाठ्यक्रम शब्द कार्ड (Chapterwise Flashcards)
            </h1>
            <p className="text-xs sm:text-sm text-emerald-100 font-medium">
              JAC बोर्ड • कक्षा 1 - 3 • द्विभाषी ऑडियो (हिंदी एवं संथाली)
            </p>
          </div>
        </div>

        {!isStudentPortal && (
          <button
            onClick={() => setIsAddModalOpen(true)}
            className="flex items-center gap-2 px-4 py-2.5 rounded-2xl bg-emerald-500 hover:bg-emerald-600 text-white text-xs sm:text-sm font-black shadow-md transition-all active:scale-95 cursor-pointer border border-emerald-300/30"
          >
            <Plus className="w-4 h-4 stroke-[3]" />
            <span>➕ नया शब्द कार्ड जोड़ें (Add Flashcard)</span>
          </button>
        )}
      </div>

      {/* Chapterwise Filter Bar: Syllabus, Class, Subject, Chapter */}
      <div className="bg-white dark:bg-[#14281E] border border-stone-200 dark:border-[#264D3B] p-4 rounded-3xl shadow-2xs space-y-3">
        <div className="flex items-center gap-2 text-xs sm:text-sm font-black text-[#143D2B] dark:text-emerald-300">
          <Filter className="w-4 h-4 text-emerald-600" />
          <span>पाठ्यक्रम फ़िल्टर (Syllabus & Chapter Filters)</span>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3">
          {/* Syllabus */}
          <div className="flex flex-col">
            <label className="text-xs font-bold text-stone-500 dark:text-stone-400 mb-1">
              बोर्ड / पाठ्यक्रम
            </label>
            <select
              value={selectedSyllabus}
              onChange={(e) => setSelectedSyllabus(e.target.value)}
              className="bg-stone-50 dark:bg-[#11241A] border border-stone-200 dark:border-[#224734] rounded-xl px-3 py-2 text-xs sm:text-sm font-bold text-[#143D2B] dark:text-emerald-200 outline-none focus:border-[#1B4D36]"
            >
              <option>JAC Board (झारखंड)</option>
              <option>CBSE (हिंदी / जनजातीय भाषा)</option>
            </select>
          </div>

          {/* Class */}
          <div className="flex flex-col">
            <label className="text-xs font-bold text-stone-500 dark:text-stone-400 mb-1 flex items-center justify-between">
              <span>कक्षा (Class)</span>
              {(isStudentPortal || studentGrade) && (
                <span className="text-[10px] text-emerald-600 dark:text-emerald-300 font-extrabold bg-emerald-50 dark:bg-[#1C3E2E] px-2 py-0.5 rounded-full border border-emerald-300/40">
                  🔒 केवल आपकी कक्षा
                </span>
              )}
            </label>
            <select
              value={selectedClass}
              disabled={isStudentPortal || !!studentGrade}
              onChange={(e) => {
                setSelectedClass(e.target.value);
                setCurrentIndex(0);
              }}
              className="bg-stone-50 dark:bg-[#11241A] border border-stone-200 dark:border-[#224734] rounded-xl px-3 py-2 text-xs sm:text-sm font-bold text-[#143D2B] dark:text-emerald-200 outline-none focus:border-[#1B4D36] disabled:opacity-85 disabled:cursor-not-allowed"
            >
              {(isStudentPortal || studentGrade) ? (
                <option value={studentGrade || "कक्षा 2"}>
                  {studentGrade || "कक्षा 2"} (आपकी कक्षा)
                </option>
              ) : (
                <>
                  <option>सभी कक्षाएं</option>
                  <option>कक्षा 1</option>
                  <option>कक्षा 2</option>
                  <option>कक्षा 3</option>
                </>
              )}
            </select>
          </div>

          {/* Subject */}
          <div className="flex flex-col">
            <label className="text-xs font-bold text-stone-500 dark:text-stone-400 mb-1">
              विषय (Subject)
            </label>
            <select
              value={selectedSubject}
              onChange={(e) => {
                setSelectedSubject(e.target.value);
                setCurrentIndex(0);
              }}
              className="bg-stone-50 dark:bg-[#11241A] border border-stone-200 dark:border-[#224734] rounded-xl px-3 py-2 text-xs sm:text-sm font-bold text-[#143D2B] dark:text-emerald-200 outline-none focus:border-[#1B4D36]"
            >
              <option>सभी विषय</option>
              <option>हिंदी</option>
              <option>गणित</option>
              <option>पर्यावरण अध्ययन (EVS)</option>
              <option>संथाली (ओल चिकी)</option>
            </select>
          </div>

          {/* Chapterwise */}
          <div className="flex flex-col">
            <label className="text-xs font-bold text-stone-500 dark:text-stone-400 mb-1">
              अध्याय (Chapterwise)
            </label>
            <select
              value={selectedChapter}
              onChange={(e) => {
                setSelectedChapter(e.target.value);
                setCurrentIndex(0);
              }}
              className="bg-stone-50 dark:bg-[#11241A] border border-stone-200 dark:border-[#224734] rounded-xl px-3 py-2 text-xs sm:text-sm font-bold text-[#143D2B] dark:text-emerald-200 outline-none focus:border-[#1B4D36]"
            >
              <option>सभी अध्याय</option>
              {availableChapters.map((ch, idx) => (
                <option key={idx} value={ch}>
                  {ch}
                </option>
              ))}
            </select>
          </div>
        </div>

        <div className="flex items-center justify-between pt-1">
          <span className="text-xs font-bold text-stone-500 dark:text-stone-400">
            कुल उपलब्ध कार्ड: <strong className="text-[#1B4D36] dark:text-emerald-300">{deck.length}</strong>
          </span>
          <button
            onClick={handleShuffle}
            className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-[#1B4D36] hover:bg-[#143D2B] text-white text-xs font-bold shadow-2xs cursor-pointer"
          >
            <Shuffle className="w-3.5 h-3.5" />
            <span>क्रम बदलें (Shuffle)</span>
          </button>
        </div>
      </div>

      {/* Main Flashcard Stage with Circular Controls */}
      <div className="flex items-center justify-center gap-3 sm:gap-6 py-2">
        {/* Left Circular Button */}
        <button
          onClick={handlePrev}
          className="w-11 h-11 sm:w-12 sm:h-12 rounded-full bg-[#1B4D36] hover:bg-[#143D2B] text-white flex items-center justify-center shadow-2xs transition-all active:scale-90 shrink-0 cursor-pointer"
          title="पिछला कार्ड"
        >
          <ChevronLeft className="w-6 h-6 sm:w-7 sm:h-7 stroke-[2.5]" />
        </button>

        {/* Main Flashcard Container */}
        <div className="w-full max-w-sm sm:max-w-md h-[340px] sm:h-[390px] perspective-1000">
          <div
            onClick={() => setIsFlipped(!isFlipped)}
            className={`w-full h-full relative cursor-pointer duration-500 transform-style-preserve-3d transition-transform rounded-3xl sm:rounded-[32px] shadow-card ${
              isFlipped ? "rotate-y-180" : ""
            }`}
            title="पलटने के लिए टैप करें"
          >
            {/* FRONT SIDE: Hindi Word, Metadata & Illustration */}
            <div className="absolute inset-0 backface-hidden bg-[#FAF2E2] dark:bg-[#152E21] rounded-3xl sm:rounded-[32px] p-5 sm:p-6 flex flex-col items-center justify-between text-center overflow-hidden border border-[#EADFC9] dark:border-[#224734]">
              {/* Metadata Badges */}
              <div className="w-full flex items-center justify-between text-xs font-bold text-stone-600 dark:text-stone-300">
                <span className="bg-[#EADFC9]/70 dark:bg-[#1B3D2B] px-3 py-1 rounded-full border border-stone-300/40">
                  {currentCard.classLevel || "कक्षा 1"} • {currentCard.subject || "हिंदी"}
                </span>
                <span className="text-[#1B4D36] dark:text-emerald-300 font-extrabold truncate max-w-[170px]">
                  {currentCard.chapter || "अध्याय 1"}
                </span>
              </div>

              {/* Hindi Word Title */}
              <div className="pt-2">
                <h2 className="text-4xl sm:text-5xl lg:text-[52px] font-black text-[#143D2B] dark:text-[#E8F3ED] tracking-tight leading-none font-hindi">
                  {currentCard.hindiWord}
                </h2>
              </div>

              {/* Center Illustration */}
              {renderCardIllustration(currentCard, currentIndex)}

              {/* Bottom Instructions */}
              <div className="text-xs sm:text-sm font-bold text-stone-500 dark:text-stone-400 flex items-center gap-1.5">
                <span>उच्चारण: {currentCard.pronunciation}</span>
                <span>•</span>
                <span className="text-[#1B4D36] dark:text-emerald-300 font-black">संथाली अनुवाद देखने हेतु पलटें 🔄</span>
              </div>
            </div>

            {/* BACK SIDE: Santali Ol Chiki Translation & Dual Audio */}
            <div className="absolute inset-0 backface-hidden rotate-y-180 bg-[#EAF5EE] dark:bg-[#11281D] rounded-3xl sm:rounded-[32px] p-5 sm:p-6 flex flex-col items-center justify-between text-center border-2 border-[#1B4D36] dark:border-emerald-400 overflow-hidden">
              <span className="text-xs sm:text-sm font-bold text-[#143D2B] dark:text-emerald-200 bg-white/90 dark:bg-[#183827] px-4 py-1 rounded-full shadow-2xs">
                संथाली (Ol Chiki ᱚᱞ ᱪᱤᱠᱤ) अनुवाद
              </span>

              <div className="space-y-3 my-auto w-full">
                <div className="text-xs sm:text-sm font-bold text-stone-500 dark:text-stone-400">
                  हिंदी शब्द: <strong>{currentCard.hindiWord}</strong>
                </div>

                <h3 className="text-3xl sm:text-4xl lg:text-5xl font-black text-[#143D2B] dark:text-emerald-300 leading-tight">
                  {getTargetTranslation(currentCard)}
                </h3>

                <p className="text-sm sm:text-base font-bold text-stone-700 dark:text-stone-200">
                  भावार्थ: {currentCard.meaningHindi || "दैनिक उपयोग शब्द"}
                </p>

                <div className="p-3 bg-white/90 dark:bg-[#183827] rounded-2xl border border-[#CEE6D5] dark:border-[#224734] text-xs sm:text-sm text-stone-800 dark:text-stone-200 font-medium">
                  <strong>उदाहरण वाक्य:</strong> "{currentCard.exampleSentence}"
                </div>
              </div>

              <div className="text-xs font-bold text-[#143D2B] dark:text-emerald-400 flex items-center gap-1">
                <RotateCw className="w-3.5 h-3.5" />
                <span>वापस पलटने के लिए टैप करें</span>
              </div>
            </div>
          </div>
        </div>

        {/* Right Circular Button */}
        <button
          onClick={handleNext}
          className="w-11 h-11 sm:w-12 sm:h-12 rounded-full bg-[#1B4D36] hover:bg-[#143D2B] text-white flex items-center justify-center shadow-2xs transition-all active:scale-90 shrink-0 cursor-pointer"
          title="अगला कार्ड"
        >
          <ChevronRight className="w-6 h-6 sm:w-7 sm:h-7 stroke-[2.5]" />
        </button>
      </div>

      {/* Counter Indicator */}
      <div className="text-center font-hindi font-black text-sm sm:text-base">
        <span className="text-[#1B4D36] dark:text-emerald-400">
          • कार्ड {currentIndex + 1}
        </span>
        <span className="text-stone-400 dark:text-stone-500">
          {" "}/ {deck.length}
        </span>
      </div>

      {/* Dual Language Audio Listen Controls (Hindi & Santali) */}
      <div className="flex flex-wrap items-center justify-center gap-3">
        {/* Listen in Hindi */}
        <button
          onClick={() => handleSpeakHindi(currentCard.hindiWord)}
          className="flex items-center gap-2 px-5 py-2.5 rounded-2xl bg-[#E2EBE5] dark:bg-[#1C3E2E] hover:bg-[#D4E2D8] text-[#143D2B] dark:text-emerald-200 font-black text-xs sm:text-sm transition-all active:scale-95 cursor-pointer border border-emerald-300/30"
        >
          <Volume2 className="w-4 h-4 text-[#143D2B] dark:text-emerald-300" />
          <span>🔊 हिंदी में सुनें (Hindi Audio)</span>
        </button>

        {/* Listen in Santali */}
        <button
          onClick={() => handleSpeakSantali(getTargetTranslation(currentCard))}
          className="flex items-center gap-2 px-5 py-2.5 rounded-2xl bg-[#1B4D36] hover:bg-[#143D2B] text-white font-black text-xs sm:text-sm shadow-2xs transition-all active:scale-95 cursor-pointer border border-emerald-400/40"
        >
          <Volume2 className="w-4 h-4 text-emerald-300" />
          <span>🔊 संथाली में सुनें (Santali Audio)</span>
        </button>

        {/* Save Card */}
        <button
          onClick={handleSaveCard}
          className="flex items-center gap-2 px-4 py-2.5 rounded-2xl bg-stone-100 dark:bg-[#1B3527] hover:bg-stone-200 text-stone-700 dark:text-stone-200 font-bold text-xs sm:text-sm transition-all active:scale-95 cursor-pointer border border-stone-300/40"
        >
          <Copy className="w-4 h-4" />
          <span>सहेजें</span>
        </button>
      </div>

      {/* Deck Thumbnails */}
      <div className="pt-2">
        <div className="flex items-center justify-center gap-3 sm:gap-4 overflow-x-auto py-2 no-scrollbar">
          {deck.slice(0, 7).map((cardItem, idx) => {
            const isSelected = currentIndex === idx;
            return (
              <div key={cardItem.id || idx} className="flex flex-col items-center">
                <button
                  onClick={() => {
                    setIsFlipped(false);
                    setCurrentIndex(idx);
                  }}
                  className={`w-20 sm:w-24 h-24 sm:h-28 rounded-2xl border-2 flex flex-col items-center justify-between p-2.5 transition-all bg-white dark:bg-[#14281E] shrink-0 cursor-pointer ${
                    isSelected
                      ? "border-[#1B4D36] dark:border-emerald-400 bg-[#E8F2EC]/60 dark:bg-[#1C3E2E] shadow-sm scale-105"
                      : "border-stone-200/90 dark:border-[#224734] hover:border-stone-400"
                  }`}
                >
                  <div className="w-full flex-1 flex items-center justify-center text-3xl">
                    {cardItem.icon || "📖"}
                  </div>
                  <span className="text-xs font-black text-[#143D2B] dark:text-white leading-tight truncate max-w-[70px]">
                    {cardItem.hindiWord}
                  </span>
                </button>
                <div
                  className={`w-1.5 h-1.5 rounded-full mt-1.5 transition-all ${
                    isSelected ? "bg-[#1B4D36] dark:bg-emerald-400 scale-125" : "bg-transparent"
                  }`}
                />
              </div>
            );
          })}
        </div>
      </div>

      {/* TEACHER ADD FLASHCARD MODAL */}
      {isAddModalOpen && (
        <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-xs flex items-center justify-center p-4 animate-in fade-in">
          <div className="bg-white dark:bg-[#14281E] border border-stone-200 dark:border-[#264D3B] rounded-3xl max-w-lg w-full p-6 space-y-4 shadow-2xl overflow-y-auto max-h-[90vh]">
            <div className="flex items-center justify-between border-b border-stone-200 dark:border-[#224734] pb-3">
              <div className="flex items-center gap-2">
                <div className="w-8 h-8 rounded-xl bg-emerald-500 text-white flex items-center justify-center text-lg">
                  ➕
                </div>
                <div>
                  <h3 className="text-lg font-black text-[#143D2B] dark:text-emerald-200">
                    नया पाठ्य शब्द कार्ड जोड़ें
                  </h3>
                  <p className="text-xs text-stone-500 dark:text-stone-400">
                    पाठ्यक्रम, कक्षा एवं अध्याय अनुसार शब्द जोड़ें
                  </p>
                </div>
              </div>
              <button
                onClick={() => setIsAddModalOpen(false)}
                className="p-1.5 rounded-full hover:bg-stone-100 dark:hover:bg-[#1F3D2E] text-stone-500 cursor-pointer"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <form onSubmit={handleCreateNewCard} className="space-y-3.5 text-xs sm:text-sm">
              <div className="grid grid-cols-2 gap-3">
                {/* Board */}
                <div>
                  <label className="block font-bold text-stone-600 dark:text-stone-300 mb-1">
                    बोर्ड / पाठ्यक्रम
                  </label>
                  <select
                    value={newCardForm.syllabus}
                    onChange={(e) => setNewCardForm({ ...newCardForm, syllabus: e.target.value })}
                    className="w-full bg-stone-50 dark:bg-[#11241A] border border-stone-200 dark:border-[#224734] rounded-xl p-2.5 font-bold"
                  >
                    <option>JAC Board (झारखंड)</option>
                    <option>CBSE Board</option>
                  </select>
                </div>

                {/* Class */}
                <div>
                  <label className="block font-bold text-stone-600 dark:text-stone-300 mb-1">
                    कक्षा (Grade)
                  </label>
                  <select
                    value={newCardForm.classLevel}
                    onChange={(e) => setNewCardForm({ ...newCardForm, classLevel: e.target.value })}
                    className="w-full bg-stone-50 dark:bg-[#11241A] border border-stone-200 dark:border-[#224734] rounded-xl p-2.5 font-bold"
                  >
                    <option>कक्षा 1</option>
                    <option>कक्षा 2</option>
                    <option>कक्षा 3</option>
                  </select>
                </div>
              </div>

              <div className="grid grid-cols-2 gap-3">
                {/* Subject */}
                <div>
                  <label className="block font-bold text-stone-600 dark:text-stone-300 mb-1">
                    विषय (Subject)
                  </label>
                  <select
                    value={newCardForm.subject}
                    onChange={(e) => setNewCardForm({ ...newCardForm, subject: e.target.value })}
                    className="w-full bg-stone-50 dark:bg-[#11241A] border border-stone-200 dark:border-[#224734] rounded-xl p-2.5 font-bold"
                  >
                    <option>हिंदी</option>
                    <option>गणित</option>
                    <option>पर्यावरण अध्ययन (EVS)</option>
                    <option>संथाली (ओल चिकी)</option>
                  </select>
                </div>

                {/* Icon */}
                <div>
                  <label className="block font-bold text-stone-600 dark:text-stone-300 mb-1">
                    आइकन / प्रतीक
                  </label>
                  <select
                    value={newCardForm.icon}
                    onChange={(e) => setNewCardForm({ ...newCardForm, icon: e.target.value })}
                    className="w-full bg-stone-50 dark:bg-[#11241A] border border-stone-200 dark:border-[#224734] rounded-xl p-2.5 font-bold"
                  >
                    <option value="📚">📚 पुस्तक</option>
                    <option value="🌳">🌳 वृक्ष</option>
                    <option value="💧">💧 जल</option>
                    <option value="🏫">🏫 विद्यालय</option>
                    <option value="☀️">☀️ सूर्य</option>
                    <option value="🤝">🤝 मित्र</option>
                    <option value="🔢">🔢 अंक</option>
                    <option value="🍎">🍎 आहार</option>
                  </select>
                </div>
              </div>

              {/* Chapter */}
              <div>
                <label className="block font-bold text-stone-600 dark:text-stone-300 mb-1">
                  अध्याय (Chapterwise Name)
                </label>
                <input
                  type="text"
                  required
                  placeholder="उदा: अध्याय 1: हमारा परिवार व परिवेश"
                  value={newCardForm.chapter}
                  onChange={(e) => setNewCardForm({ ...newCardForm, chapter: e.target.value })}
                  className="w-full bg-stone-50 dark:bg-[#11241A] border border-stone-200 dark:border-[#224734] rounded-xl p-2.5 font-bold"
                />
              </div>

              {/* Hindi Word */}
              <div>
                <label className="block font-bold text-stone-600 dark:text-stone-300 mb-1">
                  हिंदी शब्द / अवधारणा
                </label>
                <input
                  type="text"
                  required
                  placeholder="उदा: वृक्ष"
                  value={newCardForm.hindiWord}
                  onChange={(e) => setNewCardForm({ ...newCardForm, hindiWord: e.target.value })}
                  className="w-full bg-stone-50 dark:bg-[#11241A] border border-stone-200 dark:border-[#224734] rounded-xl p-2.5 font-bold text-base"
                />
              </div>

              {/* Santali Word */}
              <div>
                <label className="block font-bold text-stone-600 dark:text-stone-300 mb-1">
                  संथाली अनुवाद (Ol Chiki ᱚᱞ ᱪᱤᱠᱤ या देवनागरी)
                </label>
                <input
                  type="text"
                  required
                  placeholder="उदा: ᱫᱟᱨᱮ (दारे)"
                  value={newCardForm.santhaliWord}
                  onChange={(e) => setNewCardForm({ ...newCardForm, santhaliWord: e.target.value })}
                  className="w-full bg-stone-50 dark:bg-[#11241A] border border-stone-200 dark:border-[#224734] rounded-xl p-2.5 font-bold text-base"
                />
              </div>

              {/* Meaning */}
              <div>
                <label className="block font-bold text-stone-600 dark:text-stone-300 mb-1">
                  हिंदी अर्थ / विवरण
                </label>
                <input
                  type="text"
                  placeholder="उदा: पेड़-पौधे जो हमें ऑक्सीजन देते हैं"
                  value={newCardForm.meaningHindi}
                  onChange={(e) => setNewCardForm({ ...newCardForm, meaningHindi: e.target.value })}
                  className="w-full bg-stone-50 dark:bg-[#11241A] border border-stone-200 dark:border-[#224734] rounded-xl p-2.5 font-bold"
                />
              </div>

              {/* Example Sentence */}
              <div>
                <label className="block font-bold text-stone-600 dark:text-stone-300 mb-1">
                  उदाहरण वाक्य
                </label>
                <input
                  type="text"
                  placeholder="उदा: हमें अधिक से अधिक वृक्ष लगाने चाहिए।"
                  value={newCardForm.exampleSentence}
                  onChange={(e) => setNewCardForm({ ...newCardForm, exampleSentence: e.target.value })}
                  className="w-full bg-stone-50 dark:bg-[#11241A] border border-stone-200 dark:border-[#224734] rounded-xl p-2.5 font-bold"
                />
              </div>

              <div className="pt-2 flex items-center justify-end gap-3">
                <button
                  type="button"
                  onClick={() => setIsAddModalOpen(false)}
                  className="px-4 py-2 rounded-xl bg-stone-100 hover:bg-stone-200 dark:bg-[#1A382A] text-stone-700 dark:text-stone-200 font-bold cursor-pointer"
                >
                  रद्द करें
                </button>
                <button
                  type="submit"
                  className="px-6 py-2 rounded-xl bg-[#1B4D36] hover:bg-[#143D2B] text-white font-black shadow-md cursor-pointer"
                >
                  ➕ कार्ड जोड़ें (Save Card)
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
