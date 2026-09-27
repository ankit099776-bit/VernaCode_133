import React, { useState, useEffect } from "react";
import {
  Sparkles,
  Volume2,
  VolumeX,
  Mic,
  Star,
  Award,
  BookOpen,
  Layers,
  CheckCircle,
  RotateCw,
  ChevronLeft,
  ChevronRight,
  LogOut,
  Moon,
  Sun,
  Flame,
  Trophy,
  Play,
  ArrowRight,
  Check,
  Heart,
  Smile,
  Radio,
  FileSpreadsheet,
  Menu,
  X,
  ShoppingBag,
  Printer,
  Clock,
  Lock
} from "lucide-react";
import { FLASHCARD_ITEMS, playDevanagariAudio, stopDevanagariAudio, setGlobalAudioMute } from "../data/bhashaData";
import StudentLiveClassroom from "./05_StudentLiveClassroom";
import TextbookScanner from "./06_TextbookScanner";
import Flashcards from "./08_Flashcards";
import ErrorBoundary from "../components/ErrorBoundary";
import StudentSidebar from "../components/StudentSidebar";
import namasteGirlImg from "../assets/flashcard_namaste_girl.png";
import santaliClassroomImg from "../assets/santali_student_classroom.jpg";
import santaliKidsReadingImg from "../assets/santali_kids_reading.jpg";

const STORIES = [
  {
    id: 1,
    titleHindi: "चालाक खरगोश और शेर",
    titleTribal: "ᱥᱤᱭᱟᱹᱲ ᱟᱨ ᱠᱩᱞ / सियार आर कुल (संथाली)",
    coverEmoji: "🐰🦁",
    themeColor: "from-amber-400 to-orange-500",
    paragraphs: [
      {
        hindi: "एक घने जंगल में एक बड़ा और बलवान शेर रहता था। सभी जानवर उससे डरते थे।",
        tribal: "ᱢᱤᱫ ᱜᱟᱡᱟᱲ ᱵᱩᱨᱩ ᱨᱮ ᱢᱤᱫ ᱢᱟᱨᱟᱝ ᱟᱨ ᱠᱮᱴᱮᱡ ᱠᱩᱞ ᱮ ᱛᱟᱦᱮᱸ ᱠᱟᱱᱟ᱾ (मित् गाजड़ बुरु रे मित् मारांग आर केतेच् कुल ए ताहें काना। जोतो जीव-जन्तु उनि खोन को बोतोरोक् कान ताहेंना।)",
      },
      {
        hindi: "एक दिन छोटे और बुद्धिमान खरगोश की बारी आई। उसने एक चतुर योजना बनाई।",
        tribal: "ᱢᱤᱫ ᱫᱤᱱ ᱢᱤᱫ ᱦᱩᱰᱤᱧ ᱟᱨ ᱵᱩᱫᱽᱫᱷᱤᱢᱟᱱ ᱠᱩᱞᱦᱟᱹᱭ-ᱟᱜ ᱯᱟᱞᱚ ᱦᱮᱡ ᱮᱱᱟ᱾ (मित् दिन मित् हुडिंग आर बुद्धिमान कुलहाई-आक् पालो हेच्एना। उनि मित् अडी नापाय युक्ति ए बेनाव केदा।)",
      },
      {
        hindi: "खरगोश ने शेर को कुएं में उसकी अपनी परछाई दिखाकर कुएं में कुदा दिया।",
        tribal: "ᱠᱩᱞᱦᱟᱹᱭ ᱫᱚ ᱠᱩᱞ ᱠᱮ ᱠᱩᱸᱭ ᱫᱟᱜ ᱨᱮ ᱟᱡ-ᱟᱜ ᱩᱢᱩᱞ ᱜᱮ ᱩᱫᱩᱜ ᱟᱛᱮ ᱠᱩᱸᱭ ᱨᱮᱭ ᱫᱚᱸ ᱚᱪᱚ ᱠᱮᱫᱮᱭᱟ᱾ (कुलहाई दो कुल के कुंई दाक् रे आज-आक् उमुल गे उदूक आते कुंई रेय दोनों ओचो केदेया।)",
      },
      {
        hindi: "जंगल के सभी जानवरों ने खुश होकर नाच-गान किया।",
        tribal: "ᱜᱟᱡᱟᱲ ᱨᱮᱱ ᱡᱚᱛᱚ ᱡᱤᱣ-ᱡᱟᱱᱛᱩ ᱠᱚ ᱨᱟᱹᱥᱠᱟᱹ ᱮᱱᱟ ᱟᱨ ᱮᱱᱮᱡ-ᱥᱮᱨᱮᱧ ᱠᱚ ᱮᱦᱚᱵ ᱠᱮᱫᱟ᱾ (गाजड़ रेन जोतो जीव-जन्तु को रास्कोयना आर एनेच्-सेरेंग को एहोब केदा।)",
      }
    ],
    moral: "शारीरिक बल से बुद्धि सदा श्रेष्ठ होती है। (ᱵᱩᱫᱽᱫᱷᱤ ᱜᱮ ᱢᱟᱨᱟᱝ ᱫᱟᱲᱮ ᱠᱟᱱᱟ)"
  },
  {
    id: 2,
    titleHindi: "झरने का मीठा जल",
    titleTribal: "ᱜᱟᱰᱟ ᱫᱟᱜ / गड़ा दा: (हो व संथाली)",
    coverEmoji: "🌊🌳",
    themeColor: "from-teal-400 to-emerald-600",
    paragraphs: [
      {
        hindi: "पहाड़ की चोटी से एक निर्मल झरना बहता था। उसका पानी अमृत जैसा मीठा था।",
        tribal: "ᱵᱩᱨᱩ ᱪᱚᱴ ᱠᱷᱚᱱ ᱢᱤᱫ ᱥᱟᱯᱷᱟ ᱡᱷᱟᱨᱱᱟ ᱞᱤᱝᱜᱤ ᱠᱟᱱ ᱛᱟᱦᱮᱸᱱᱟ᱾ (बुरू चोट खोन मित् सफा झरना लिंगी कान ताहेंना। एना दाक् दो शिबील गेया।)",
      },
      {
        hindi: "गांव के सभी बच्चे हर शाम झरने के पास खेलने आते थे।",
        tribal: "ᱦᱟᱛᱩ ᱨᱮᱱ ᱡᱚᱛᱚ ᱜᱤᱫᱽᱨᱟᱹ ᱠᱚ ᱛᱟᱨᱟᱥᱤᱝ ᱡᱷᱟᱨᱱᱟ ᱟᱲᱮ ᱨᱮ ᱮᱱᱮᱡ ᱠᱚ ᱦᱮᱡᱩᱜ-ᱟ᱾ (हातु रेन जोतो गिदरा को तारासिंग झरना आड़े रे एनांग को हेजुग-आ।)",
      },
      {
        hindi: "प्रकृति हमें जीवन और खुशी देती है, हमें इसका आदर करना चाहिए।",
        tribal: "ᱯᱨᱟᱠᱨᱤᱛᱤ ᱟᱵᱚ ᱠᱮ ᱡᱤᱣᱚᱱ ᱟᱨ ᱨᱟᱹᱥᱠᱟᱹ ᱮ ᱮᱢᱟᱵᱚ-ᱟ᱾ (प्रकृति अबु के जीवोन आर रास्का ए एमाबो-आ, अबु उनि के मान एमाय लाकतिंग।)",
      }
    ],
    moral: "प्रकृति की रक्षा ही हमारी रक्षा है। (ᱯᱨᱟᱠᱨᱤᱛᱤ ᱨᱩᱠᱷᱤᱭᱟᱹ ᱜᱮ ᱟᱵᱚᱣᱟᱜ ᱨᱩᱠᱷᱤᱭᱟᱹ)"
  },
  {
    id: 3,
    titleHindi: "ईमानदार लकड़हारा",
    titleTribal: "ᱥᱚᱛ ᱠᱟᱴᱷᱤᱭᱟᱹ / सोत काठिया (संथाली)",
    coverEmoji: "🪓🌳",
    themeColor: "from-amber-500 to-yellow-600",
    paragraphs: [
      {
        hindi: "एक गांव में एक गरीब पर ईमानदार लकड़हारा रहता था। वह रोज जंगल से लकड़ी काटकर बेचता था।",
        tribal: "ᱢᱤᱫ ᱟᱛᱩ ᱨᱮ ᱢᱤᱫ ᱨᱮᱸᱜᱮᱡ ᱟᱨ ᱥᱚᱛ ᱠᱟᱴᱷᱤᱭᱟᱹ ᱮ ᱛᱟᱦᱮᱸ ᱠᱟᱱᱟ᱾ (मित् आतु रे मित् रेगेन्ज आर सोत काठिया ए ताहें काना। उनि दिनोम गाजड़ खोन साहान मात् आतेय आकिङेद् ताहेंना।)",
      },
      {
        hindi: "एक दिन उसकी लोहे की कुल्हाड़ी नदी में गिर गई। वह बहुत दुखी हुआ।",
        tribal: "ᱢᱤᱫ ᱫᱤᱱ ᱩᱱᱤᱭᱟᱜ ᱞᱮᱦᱟᱲᱟ ᱠᱩᱞᱦᱤ ᱜᱟᱰᱟ ᱫᱟᱜ ᱨᱮ ᱱᱩᱨᱩ ᱮᱱᱟ᱾ (मित् दिन उनियाक् लहाड़ा कुल्ही गाड़ा दाक् रे नुरुयेना। उनि अडी दुख ए ऐकेउ केदा।)",
      },
      {
        hindi: "जल देवता ने उसकी ईमानदारी से खुश होकर उसे सोने, चांदी और लोहे की तीनों कुल्हाड़ियां उपहार में दीं।",
        tribal: "ᱜᱟᱰᱟ ᱵᱚᱸᱜᱟ ᱩᱱᱤ ᱭᱟᱜ ᱥᱚᱛ-ᱵᱷᱟᱣ ᱱᱮᱞ ᱟᱛᱮ ᱥᱚᱱᱟ, ᱨᱩᱯᱟ ᱟᱨ ᱢᱮᱸᱲᱮᱛ ᱨᱮᱭᱟᱜ ᱯᱮ ᱭᱟ ᱠᱩᱞᱦᱤ ᱤᱱᱟᱢ ᱮ ᱮᱢᱟ ᱫᱤᱭᱟ᱾ (गाड़ा बोंगा उनियाक् सोत-भाव नेल आते सोना, रूपा आर मेँढ़ेत् रियाक् पेया कुल्ही ईनाम ए एमादिया।)",
      }
    ],
    moral: "ईमानदारी का फल हमेशा मीठा होता है। (ᱥᱚᱛ-ᱵᱷᱟᱣ ᱨᱮᱭᱟᱜ ᱡᱚ ᱫᱚ ᱥᱤᱵᱤᱞ ᱜᱮᱭᱟ)"
  }
];

const STUDENT_QUIZ_QUESTIONS = [
  {
    id: 1,
    questionHindi: "संथाली भाषा में 'नमस्ते' को क्या कहते हैं?",
    questionTribal: "संताली ते 'नमस्ते' दो चेत् को मेता-आ?",
    options: ["सगात / जोहार", "दाका", "गिदर", "दारे"],
    correctIndex: 0,
    explanation: "संथाली में आदरपूर्वक अभिवादन को 'सगात' या 'जोहार' कहा जाता है।"
  },
  {
    id: 2,
    questionHindi: "चित्र पहचानें: 💧 'जल' को संथाली में क्या कहते हैं?",
    questionTribal: "नोवा चिन्हा चेत् काना? 'जल' के संताली ते चेत् को मेता-आ?",
    options: ["उमुल", "दाक्", "सेंगेल", "हॉय"],
    correctIndex: 1,
    explanation: "'दाक्' का अर्थ जल अथवा पानी होता है।"
  },
  {
    id: 3,
    questionHindi: "विद्यालय 🏫 को संथाली में क्या कहते हैं?",
    questionTribal: "'स्कूल / विद्यालय' दो संताली ते चेत् काना?",
    options: ["ओड़ाक्", "इस्कुल / आतु ओड़ाक्", "गाजड़", "जोहार"],
    correctIndex: 1,
    explanation: "विद्यालय के लिए आतु इस्कुल शब्द का प्रयोग किया जाता है।"
  }
];

const BADGES = [
  { id: 1, title: "पहला कदम", icon: "🌟", desc: "पहला दिन पूरा किया", unlocked: true },
  { id: 2, title: "शब्द मित्र", icon: "📚", desc: "10 नए शब्द सीखे", unlocked: true },
  { id: 3, title: "कहानी प्रेमी", icon: "📖", desc: "1 पूरी कहानी पढ़ी", unlocked: true },
  { id: 4, title: "नियमित छात्र", icon: "🔥", desc: "3 दिन लगातार अभ्यास", unlocked: true },
  { id: 5, title: "संथाली ज्ञानी", icon: "🏹", desc: "क्विज़ में 100% अंक", unlocked: false },
  { id: 6, title: "सुरीला वक्ता", icon: "🗣️", desc: "5 शब्दों का सही उच्चारण", unlocked: false },
];

export default function StudentDashboard({
  student,
  currentLanguage = "santhali",
  onLogout,
  isDarkMode = false,
  onToggleDarkMode,
  publishedWorksheets = [],
  onCompleteWorksheet,
  publishedQuizzes = [],
  onCompleteQuiz
}) {
  const safeStudent = (student && student.name) ? student : {
    id: "ravi",
    name: "रवि मुर्मू",
    grade: "कक्षा 2",
    roll: "04",
    lang: "संथाली",
    avatar: "👦",
    stars: 18,
  };

  const [activeTab, setActiveTab] = useState("home"); // home, worksheets, flashcards, stories, quiz, practice, badges
  const storageKey = `bhashasetu-student-stars-${safeStudent.id || 'ravi'}`;
  const historyKey = `bhashasetu-star-history-${safeStudent.id || 'ravi'}`;
  const redeemedKey = `bhashasetu-redeemed-rewards-${safeStudent.id || 'ravi'}`;

  const [stars, setStars] = useState(() => {
    if (typeof window !== "undefined") {
      const saved = localStorage.getItem(storageKey);
      if (saved !== null) {
        const parsed = parseInt(saved, 10);
        if (!isNaN(parsed)) return parsed;
      }
    }
    return safeStudent.stars || 18;
  });

  const [starHistory, setStarHistory] = useState(() => {
    if (typeof window !== "undefined") {
      const saved = localStorage.getItem(historyKey);
      if (saved) {
        try {
          return JSON.parse(saved);
        } catch (e) {}
      }
    }
    return [
      { id: 1, title: "पहला दिन पोर्टल लॉगिन (Daily Bonus)", points: "+10", time: "आज 09:00 AM", type: "login", icon: "🌟" },
      { id: 2, title: "शब्द कार्ड पठन (Flashcards)", points: "+5", time: "आज 09:15 AM", type: "flashcard", icon: "🎴" },
      { id: 3, title: "संथाली लोककथा पठन (Story Reading)", points: "+3", time: "आज 09:30 AM", type: "story", icon: "📖" },
    ];
  });

  const [redeemedRewards, setRedeemedRewards] = useState(() => {
    if (typeof window !== "undefined") {
      const saved = localStorage.getItem(redeemedKey);
      if (saved) {
        try {
          return JSON.parse(saved);
        } catch (e) {}
      }
    }
    return [];
  });

  const [badgeSubTab, setBadgeSubTab] = useState("badges"); // badges, history, shop
  const [showCertificateModal, setShowCertificateModal] = useState(false);
  const [rewardToast, setRewardToast] = useState(null);

  const [cardIndex, setCardIndex] = useState(0);
  const [isCardFlipped, setIsCardFlipped] = useState(false);
  const [activeStoryIndex, setActiveStoryIndex] = useState(0);
  const [showStoryBilingual, setShowStoryBilingual] = useState(true);
  const [isAudioMuted, setIsAudioMuted] = useState(false);
  const [selectedClassFilter, setSelectedClassFilter] = useState(safeStudent.grade || "कक्षा 2");
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  // Sync state changes to localStorage
  useEffect(() => {
    if (typeof window !== "undefined") {
      localStorage.setItem(storageKey, stars.toString());
    }
  }, [stars, storageKey]);

  useEffect(() => {
    if (typeof window !== "undefined") {
      localStorage.setItem(historyKey, JSON.stringify(starHistory));
    }
  }, [starHistory, historyKey]);

  useEffect(() => {
    if (typeof window !== "undefined") {
      localStorage.setItem(redeemedKey, JSON.stringify(redeemedRewards));
    }
  }, [redeemedRewards, redeemedKey]);

  const addStars = (amount, reason, type = "general", icon = "⭐") => {
    setStars((prev) => Math.max(0, prev + amount));
    const newEntry = {
      id: Date.now(),
      title: reason,
      points: amount > 0 ? `+${amount}` : `${amount}`,
      time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
      type: type,
      icon: icon
    };
    setStarHistory((prev) => [newEntry, ...prev]);
  };

  const handleRedeemReward = (reward) => {
    if (stars < reward.cost) {
      setRewardToast(`पर्याप्त सितारे नहीं हैं! आपको ${reward.cost - stars} और सितारे चाहिए।`);
      setTimeout(() => setRewardToast(null), 3500);
      return;
    }
    if (redeemedRewards.includes(reward.id)) {
      if (reward.id === "cert") {
        setShowCertificateModal(true);
      } else {
        setRewardToast(`आप यह पुरस्कार पहले ही प्राप्त कर चुके हैं!`);
        setTimeout(() => setRewardToast(null), 3000);
      }
      return;
    }

    addStars(-reward.cost, `पुरस्कार रिडीम किया: ${reward.title}`, "redeem", "🎁");
    setRedeemedRewards((prev) => [...prev, reward.id]);
    setRewardToast(`🎉 बधाई! आपने '${reward.title}' पुरस्कार प्राप्त किया!`);
    setTimeout(() => setRewardToast(null), 4000);

    if (reward.id === "cert") {
      setShowCertificateModal(true);
    }
  };

  // Cancel any automatic audio speech greeting on mount
  useEffect(() => {
    stopDevanagariAudio();
  }, []);

  // Student Worksheet State
  const [activeWorksheetToSolve, setActiveWorksheetToSolve] = useState(null);
  const [studentAnswers, setStudentAnswers] = useState({});
  const [worksheetSubmitted, setWorksheetSubmitted] = useState(false);
  const [submissionResult, setSubmissionResult] = useState(null);

  // Quiz state
  const [activeQuizToSolve, setActiveQuizToSolve] = useState(null);
  const [quizIndex, setQuizIndex] = useState(0);
  const [selectedAnswer, setSelectedAnswer] = useState(null);
  const [quizScore, setQuizScore] = useState(0);
  const [quizFinished, setQuizFinished] = useState(false);

  // Voice practice state
  const [voiceRecording, setVoiceRecording] = useState(false);
  const [voiceFeedback, setVoiceFeedback] = useState(null);

  const currentCard = FLASHCARD_ITEMS[cardIndex] || FLASHCARD_ITEMS[0];

  const handleToggleMute = () => {
    setIsAudioMuted((prev) => {
      const nextMuted = !prev;
      setGlobalAudioMute(nextMuted);
      if (nextMuted) stopDevanagariAudio();
      return nextMuted;
    });
  };

  const handleNextCard = () => {
    setIsCardFlipped(false);
    setCardIndex((prev) => (prev + 1) % FLASHCARD_ITEMS.length);
  };

  const handlePrevCard = () => {
    setIsCardFlipped(false);
    setCardIndex((prev) => (prev - 1 + FLASHCARD_ITEMS.length) % FLASHCARD_ITEMS.length);
  };

  const handleSpeak = (text, langCode = "sat") => {
    playDevanagariAudio(text, langCode);
  };

  const handleOptionSelect = (qIdx, opt) => {
    setStudentAnswers((prev) => ({ ...prev, [qIdx]: opt }));
  };

  const handleSubmitWorksheet = (ws) => {
    let scoreCount = 0;
    const questions = ws.questions || [];
    questions.forEach((q, idx) => {
      if (studentAnswers[idx] === q.answer || (q.answer && q.answer.includes(studentAnswers[idx]))) {
        scoreCount += 1;
      }
    });

    const scoreString = `${scoreCount}/${questions.length}`;
    const resultObj = {
      id: `sub-${Date.now()}`,
      date: new Date().toISOString().split("T")[0],
      time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
      studentName: safeStudent.name,
      rollNo: safeStudent.roll,
      classLevel: ws.classLevel || safeStudent.grade || "कक्षा 2",
      worksheetTitle: ws.title,
      subject: ws.subject || "हिंदी",
      score: scoreString,
      status: "पूर्ण (Completed)"
    };

    setSubmissionResult(resultObj);
    setWorksheetSubmitted(true);
    addStars(5, `कार्यपत्रक हल किया: ${ws.title}`, "worksheet", "📝");
    onCompleteWorksheet?.(resultObj);
  };

  const currentQuizQuestions = activeQuizToSolve?.questions || STUDENT_QUIZ_QUESTIONS;

  const handleSelectQuizAnswer = (idx) => {
    if (selectedAnswer !== null) return;
    setSelectedAnswer(idx);
    const questions = currentQuizQuestions;
    const correctIdx = questions[quizIndex]?.correctIndex ?? questions[quizIndex]?.answerIndex ?? 0;
    if (idx === correctIdx) {
      setQuizScore((prev) => prev + 1);
      addStars(2, "क्विज़ में सही उत्तर दिया", "quiz", "✏️");
    }
  };

  const handleNextQuizQuestion = () => {
    const questions = currentQuizQuestions;
    if (quizIndex + 1 < questions.length) {
      setQuizIndex((prev) => prev + 1);
      setSelectedAnswer(null);
    } else {
      setQuizFinished(true);
      addStars(5, `दैनिक क्विज़ पूरा किया: ${activeQuizToSolve?.title || 'चित्र क्विज़'}`, "quiz", "🏆");

      if (activeQuizToSolve) {
        const questionsCount = questions.length;
        const resultRecord = {
          id: `qsub-${Date.now()}`,
          date: new Date().toISOString().split("T")[0],
          time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
          studentName: safeStudent.name,
          rollNo: safeStudent.roll,
          classLevel: activeQuizToSolve.classLevel || safeStudent.grade || "कक्षा 2",
          quizTitle: activeQuizToSolve.title,
          subject: activeQuizToSolve.subject || "हिंदी",
          score: `${quizScore}/${questionsCount}`,
          percentage: `${Math.round((quizScore / questionsCount) * 100)}%`,
          status: "पूर्ण (Completed)"
        };
        onCompleteQuiz?.(resultRecord);
      }
    }
  };

  const resetQuiz = () => {
    setQuizIndex(0);
    setSelectedAnswer(null);
    setQuizScore(0);
    setQuizFinished(false);
  };

  const handleVoicePractice = (word) => {
    setVoiceRecording(true);
    setVoiceFeedback(null);
    setTimeout(() => {
      setVoiceRecording(false);
      setVoiceFeedback({
        score: "98%",
        status: "success",
        msg: "वाह! बहुत शुद्ध और स्पष्ट उच्चारण!",
      });
      addStars(1, "सही उच्चारण का अभ्यास किया", "practice", "🗣️");
    }, 1800);
  };

  // Filter published worksheets robustly
  const matchingWorksheets = publishedWorksheets.filter((ws) => {
    if (selectedClassFilter === "all") return true;
    if (!ws.classLevel) return true;
    return (
      ws.classLevel.trim() === selectedClassFilter.trim() ||
      ws.classLevel.includes(selectedClassFilter.replace("कक्षा ", "").trim())
    );
  });
  const displayWorksheets = matchingWorksheets.length > 0 ? matchingWorksheets : publishedWorksheets;

  return (
    <div className="min-h-screen bg-[#FAF7F0] dark:bg-[#0A1610] text-stone-800 dark:text-[#E8F3ED] font-hindi select-none flex transition-colors duration-300">
      {/* 1. Left Vertical Sidebar for Student */}
      <StudentSidebar
        activeTab={activeTab}
        onSelectTab={(tabId) => {
          stopDevanagariAudio();
          setActiveTab(tabId);
        }}
        student={safeStudent}
        stars={stars}
        onLogout={onLogout}
        isOpenMobile={mobileMenuOpen}
        onCloseMobile={() => setMobileMenuOpen(false)}
      />

      {/* 2. Right Main Workspace Container */}
      <div className="flex-1 flex flex-col min-w-0 overflow-y-auto">
        {/* Top Header Bar */}
        <header className="bg-white dark:bg-[#12241A] border-b border-stone-200/90 dark:border-[#224734] px-4 sm:px-8 py-3.5 flex items-center justify-between shadow-2xs sticky top-0 z-30">
          {/* Left: Mobile Menu Button & Student Info */}
          <div className="flex items-center gap-3">
            <button
              onClick={() => setMobileMenuOpen(true)}
              className="p-2 rounded-xl border border-stone-200 dark:border-[#224734] hover:bg-stone-100 dark:hover:bg-[#193526] lg:hidden text-stone-700 dark:text-stone-300 cursor-pointer"
            >
              <Menu className="w-5 h-5" />
            </button>
            <div className="flex items-center gap-2.5">
              <div className="w-10 h-10 rounded-xl bg-amber-100 dark:bg-[#1B3626] border-2 border-amber-400 dark:border-amber-600 flex items-center justify-center text-xl shadow-2xs">
                {safeStudent.avatar || "👦"}
              </div>
              <div>
                <h1 className="text-base sm:text-lg font-black text-forest-900 dark:text-white leading-tight">
                  {safeStudent.name}
                </h1>
                <div className="flex items-center gap-2 text-[11px] text-stone-500 dark:text-stone-400 font-bold">
                  <span className="text-forest-700 dark:text-emerald-400">{safeStudent.grade}</span>
                  <span>•</span>
                  <span>मातृभाषा: {safeStudent.lang}</span>
                </div>
              </div>
            </div>
          </div>

          {/* Right: Audio Stop/Mute, Stars & Logout */}
          <div className="flex items-center gap-2 sm:gap-3">
            {/* STOP VOICE BUTTON: Immediately cancels speech */}
            <button
              onClick={() => stopDevanagariAudio()}
              className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-rose-100 dark:bg-rose-950 text-rose-800 dark:text-rose-200 border border-rose-300 dark:border-rose-800 font-extrabold text-xs cursor-pointer hover:bg-rose-200 transition-colors shadow-2xs"
              title="चल रही आवाज़ तुरंत बंद करें"
            >
              <VolumeX className="w-4 h-4 text-rose-600 dark:text-rose-400" />
              <span className="hidden sm:inline">आवाज़ रोकें</span>
            </button>

            {/* MUTE AUDIO TOGGLE */}
            <button
              onClick={handleToggleMute}
              className={`p-2 rounded-xl border transition-colors cursor-pointer ${
                isAudioMuted
                  ? "bg-rose-50 border-rose-300 text-rose-600 dark:bg-rose-950 dark:border-rose-800 dark:text-rose-300"
                  : "bg-emerald-50 border-emerald-300 text-emerald-700 dark:bg-emerald-950 dark:border-emerald-800 dark:text-emerald-300"
              }`}
              title={isAudioMuted ? "ध्वनि चालू करें (Unmute)" : "ध्वनि बंद करें (Mute Audio)"}
            >
              {isAudioMuted ? <VolumeX className="w-4 h-4" /> : <Volume2 className="w-4 h-4" />}
            </button>

            {/* Stars Pill Button */}
            <button
              onClick={() => setActiveTab("badges")}
              className="flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-amber-50 dark:bg-amber-950/40 border border-amber-200 dark:border-amber-800 text-amber-900 dark:text-amber-300 text-xs sm:text-sm font-black shadow-2xs hover:bg-amber-100 dark:hover:bg-amber-900/60 transition-transform active:scale-95 cursor-pointer"
              title="मेरे सितारे व बैज देखें (Click to view Stars & Badges)"
            >
              <Star className="w-4 h-4 fill-amber-400 text-amber-500 animate-pulse" />
              <span>{stars} सितारे</span>
            </button>

            {/* Dark Mode Toggle */}
            <button
              onClick={onToggleDarkMode}
              className="p-2 rounded-xl border border-stone-200 dark:border-[#224734] hover:bg-stone-100 dark:hover:bg-[#193526] text-stone-600 dark:text-emerald-300 transition-colors cursor-pointer"
              title={isDarkMode ? "लाइट मोड" : "डार्क मोड"}
            >
              {isDarkMode ? <Sun className="w-4 h-4" /> : <Moon className="w-4 h-4" />}
            </button>

            {/* Student Logout Button */}
            <button
              onClick={onLogout}
              className="flex items-center gap-1.5 px-3.5 py-2 rounded-xl bg-rose-50 dark:bg-rose-950/40 border border-rose-200 dark:border-rose-900/60 text-rose-700 dark:text-rose-300 font-bold text-xs sm:text-sm hover:bg-rose-100 dark:hover:bg-rose-900/40 transition-colors cursor-pointer"
              title="विद्यार्थी पोर्टल से बाहर आएं"
            >
              <LogOut className="w-4 h-4" />
              <span className="hidden sm:inline">लॉगआउट</span>
            </button>
          </div>
        </header>

        {/* 3. Main Dynamic Content Area */}
        <main className="flex-1 max-w-5xl w-full mx-auto p-4 sm:p-6 space-y-6">
        
        {/* ================= TAB: मेरे कार्यपत्रक (Worksheets) ================= */}
        {activeTab === "worksheets" && (
          <div className="space-y-6 animate-in fade-in duration-200">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
              <div>
                <h2 className="text-xl sm:text-2xl font-black text-forest-900 dark:text-white">
                  मेरे आवंटित कार्यपत्रक 📝
                </h2>
                <p className="text-xs sm:text-sm text-stone-500 dark:text-stone-400">
                  शिक्षक द्वारा अनुमोदित अभ्यास पत्र पूरा करें और सितारे अर्जित करें!
                </p>
              </div>

              {/* Class Filter Pills */}
              <div className="flex items-center gap-1.5 flex-wrap">
                {[
                  { id: "all", label: "सभी कार्यपत्रक" },
                  { id: "कक्षा 1", label: "कक्षा 1" },
                  { id: "कक्षा 2", label: "कक्षा 2" },
                  { id: "कक्षा 3", label: "कक्षा 3" },
                ].map((f) => (
                  <button
                    key={f.id}
                    onClick={() => setSelectedClassFilter(f.id)}
                    className={`px-3 py-1.5 rounded-xl text-xs font-bold transition-all cursor-pointer ${
                      selectedClassFilter === f.id
                        ? "bg-forest-700 text-white shadow-xs"
                        : "bg-white dark:bg-[#14281E] text-stone-700 dark:text-stone-300 border border-stone-200 dark:border-[#224734] hover:bg-stone-100"
                    }`}
                  >
                    {f.label}
                  </button>
                ))}
              </div>
            </div>

            {/* Active Worksheet Solver Modal / View */}
            {activeWorksheetToSolve ? (
              <div className="bg-white dark:bg-[#12241A] rounded-3xl p-6 sm:p-8 border-2 border-forest-700/50 dark:border-emerald-600 shadow-xl space-y-6">
                <div className="flex items-center justify-between border-b pb-4 border-stone-200 dark:border-[#224734]">
                  <div>
                    <span className="text-xs font-bold text-amber-600 bg-amber-50 dark:bg-amber-950 px-2.5 py-0.5 rounded-md border border-amber-200">
                      {activeWorksheetToSolve.classLevel || safeStudent.grade} • {activeWorksheetToSolve.board || "JAC Board"}
                    </span>
                    <h3 className="text-xl font-black text-forest-900 dark:text-emerald-100 mt-1">
                      {activeWorksheetToSolve.title}
                    </h3>
                  </div>

                  <button
                    onClick={() => {
                      setActiveWorksheetToSolve(null);
                      setWorksheetSubmitted(false);
                      setStudentAnswers({});
                    }}
                    className="px-3.5 py-1.5 bg-stone-200 dark:bg-stone-800 text-stone-800 dark:text-stone-200 rounded-xl text-xs font-bold hover:bg-stone-300 cursor-pointer"
                  >
                    ← वापस सूची पर जाएं
                  </button>
                </div>

                <p className="text-xs font-bold bg-cream-50 dark:bg-[#162E22] p-3 rounded-xl border border-stone-200 dark:border-[#224734] text-stone-700 dark:text-stone-300">
                  निर्देश: {activeWorksheetToSolve.instructions}
                </p>

                {/* Submission Banner */}
                {worksheetSubmitted && submissionResult && (
                  <div className="p-5 rounded-2xl bg-emerald-100 dark:bg-emerald-950 border-2 border-emerald-500 text-emerald-950 dark:text-emerald-100 text-center space-y-2 animate-in zoom-in-95">
                    <div className="text-3xl">🎉 🎉 🎉</div>
                    <h4 className="text-lg font-black">कार्यपत्रक सफलतापूर्वक जमा हो गया!</h4>
                    <p className="text-sm font-bold">
                      आपका प्राप्तांक: <span className="text-emerald-700 dark:text-emerald-400 font-black text-lg">{submissionResult.score}</span>
                    </p>
                    <p className="text-xs text-emerald-800 dark:text-emerald-300">
                      शिक्षक डैशबोर्ड पर आपकी उपस्थिति दर्ज कर दी गई है। +5 सितारे अर्जित!
                    </p>
                  </div>
                )}

                {/* Questions List */}
                <div className="space-y-4">
                  {(activeWorksheetToSolve.questions || []).map((q, qIdx) => (
                    <div
                      key={q.id || qIdx}
                      className="p-4 rounded-2xl bg-stone-50 dark:bg-[#162E22] border border-stone-200 dark:border-[#224734] space-y-3"
                    >
                      <div className="font-extrabold text-sm text-stone-900 dark:text-white">
                        {q.prompt}
                      </div>

                      {q.options && q.options.length > 0 && (
                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 pt-1">
                          {q.options.map((opt, optIdx) => {
                            const isSelected = studentAnswers[qIdx] === opt;
                            return (
                              <button
                                key={optIdx}
                                disabled={worksheetSubmitted}
                                onClick={() => handleOptionSelect(qIdx, opt)}
                                className={`p-3 rounded-xl text-xs font-bold text-left border transition-all cursor-pointer flex items-center justify-between ${
                                  isSelected
                                    ? "bg-forest-700 text-white border-forest-800 shadow-sm"
                                    : "bg-white dark:bg-[#0E1F17] text-stone-800 dark:text-stone-200 border-stone-200 dark:border-[#2B573F] hover:bg-stone-100 dark:hover:bg-[#162E22]"
                                }`}
                              >
                                <span>{opt}</span>
                                {isSelected && <Check className="w-4 h-4 text-white shrink-0" />}
                              </button>
                            );
                          })}
                        </div>
                      )}
                    </div>
                  ))}
                </div>

                {!worksheetSubmitted && (
                  <button
                    onClick={() => handleSubmitWorksheet(activeWorksheetToSolve)}
                    className="w-full py-3.5 bg-forest-700 hover:bg-forest-800 text-white font-black text-sm rounded-2xl shadow-md hover:shadow-lg transition-all cursor-pointer flex items-center justify-center gap-2"
                  >
                    <CheckCircle className="w-5 h-5 text-amber-300" />
                    <span>कार्यपत्रक जमा करें (Submit Worksheet)</span>
                  </button>
                )}
              </div>
            ) : (
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {displayWorksheets.map((ws, idx) => (
                  <div
                    key={ws.id || idx}
                    className="bg-white dark:bg-[#12241A] rounded-3xl p-5 border border-stone-200/90 dark:border-[#224734] shadow-xs hover:shadow-md transition-all space-y-3 flex flex-col justify-between"
                  >
                    <div className="space-y-2">
                      <div className="flex items-center justify-between">
                        <span className="text-[10px] font-extrabold uppercase px-2.5 py-0.5 rounded-full bg-emerald-100 dark:bg-emerald-950 text-emerald-800 dark:text-emerald-300 border border-emerald-300">
                          {ws.classLevel || safeStudent.grade}
                        </span>
                        <span className="text-xs font-bold text-stone-400">
                          {ws.publishedAt || "आज"}
                        </span>
                      </div>
                      <h3 className="font-extrabold text-base text-forest-900 dark:text-white leading-snug">
                        {ws.title}
                      </h3>
                      <p className="text-xs text-stone-500 dark:text-stone-400 line-clamp-2">
                        {ws.instructions}
                      </p>
                    </div>

                    <button
                      onClick={() => {
                        setActiveWorksheetToSolve(ws);
                        setStudentAnswers({});
                        setWorksheetSubmitted(false);
                      }}
                      className="w-full py-2.5 bg-[#1E4D36] hover:bg-[#163827] text-white font-bold text-xs rounded-xl shadow-xs transition-all flex items-center justify-center gap-2 cursor-pointer"
                    >
                      <BookOpen className="w-4 h-4" />
                      <span>कार्यपत्रक हल करें (Solve Worksheet)</span>
                    </button>
                  </div>
                ))}
              </div>
            )}
          </div>
        )}

        {/* ================= TAB: Textbook Scanner ================= */}
        {activeTab === "scanner" && (
          <ErrorBoundary>
            <TextbookScanner selectedLanguage={currentLanguage} />
          </ErrorBoundary>
        )}

        {/* ================= TAB 0: Live Classroom ================= */}
        {activeTab === "classroom" && (
          <ErrorBoundary>
            <StudentLiveClassroom student={safeStudent} isDarkMode={isDarkMode} />
          </ErrorBoundary>
        )}

        {/* ================= TAB 1: मेरा बस्ता (Home) ================= */}
        {activeTab === "home" && (
          <div className="space-y-6 animate-in fade-in duration-200">
            {/* Greeting Hero Card */}
            <div className="bg-gradient-to-r from-[#1B4D36] via-[#153E2B] to-[#0E2F20] text-white rounded-3xl p-6 sm:p-8 shadow-card relative overflow-hidden flex flex-col md:flex-row items-center justify-between gap-6">
              <div className="relative z-10 max-w-xl space-y-3">
                <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/20 backdrop-blur-xs text-xs sm:text-sm font-bold">
                  <span>🌞 आज का दिन: नया ज्ञान, नई शुरुआत</span>
                </div>
                <h2 className="text-2xl sm:text-4xl font-black leading-tight">
                  ᱥᱟᱹᱜᱩᱱ ᱫᱟᱨᱟᱢ / जोहार, {safeStudent.name}! 👋
                </h2>
                <p className="text-sm sm:text-base text-emerald-100 font-medium">
                  अपनी मातृभाषा <strong>{safeStudent.lang}</strong> और <strong>हिंदी</strong> में कहानियां पढ़ें, शब्द कार्ड देखें और सितारे जीतें!
                </p>

                {/* Progress bar */}
                <div className="pt-2 space-y-1.5">
                  <div className="flex justify-between text-xs sm:text-sm font-bold">
                    <span>आज का दैनिक लक्ष्य</span>
                    <span>3 / 5 गतिविधियां पूर्ण (60%)</span>
                  </div>
                  <div className="w-full h-3.5 bg-black/30 rounded-full overflow-hidden p-0.5">
                    <div className="h-full bg-amber-400 rounded-full transition-all duration-500" style={{ width: "60%" }} />
                  </div>
                </div>
              </div>

              {/* Santali Kids Reading Artwork Badge inside Hero */}
              <div className="relative z-10 shrink-0 flex items-center justify-center bg-white/15 dark:bg-white/10 border-2 border-amber-300 p-2.5 rounded-3xl backdrop-blur-xs shadow-lg text-center">
                <div className="space-y-1">
                  <div className="w-28 h-28 sm:w-32 sm:h-32 rounded-2xl overflow-hidden border border-white/40 shadow-xs">
                    <img
                      src={santaliKidsReadingImg}
                      alt="संथाली बाल विद्यार्थी"
                      className="w-full h-full object-cover"
                    />
                  </div>
                  <span className="text-[10px] font-black text-amber-200 block tracking-tight">
                    ᱥᱟᱱᱛᱟᱲᱤ ᱪᱮᱛᱮᱫᱤᱭᱟᱹ ᱠᱚ
                  </span>
                </div>
              </div>
            </div>

            {/* Quick Activity Cards */}
            <div>
              <h3 className="text-base sm:text-lg font-black text-forest-900 dark:text-white mb-3">
                ᱛᱮᱦᱮᱧ ᱪᱮᱛ ᱯᱟᱲᱦᱟᱣ ᱵᱮᱱ ᱥᱟᱱᱟᱭᱮᱫ ᱵᱤᱱᱟ? (आज क्या पढ़ना चाहते हैं?)
              </h3>
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                <button
                  onClick={() => setActiveTab("flashcards")}
                  className="bg-white dark:bg-[#12241A] rounded-2xl p-5 border border-stone-200/90 dark:border-[#224734] shadow-xs hover:shadow-md transition-all text-left cursor-pointer group hover:-translate-y-1"
                >
                  <div className="w-12 h-12 rounded-2xl bg-teal-100 dark:bg-teal-950/60 flex items-center justify-center text-2xl mb-3 group-hover:scale-110 transition-transform">
                    🎴
                  </div>
                  <h4 className="font-black text-base text-forest-900 dark:text-white">
                    ᱟᱹᱲᱟᱹ ᱠᱟᱨᱰ ( शब्द कार्ड )
                  </h4>
                  <p className="text-xs text-stone-500 dark:text-stone-400 mt-1">
                    ᱱᱟᱣᱟ ᱟᱹᱲᱟᱹ ᱟᱨ ᱩᱪᱪᱟᱨᱚᱱ ᱪᱮᱫᱚᱜ ᱢᱮ ᱾ (नए शब्द सीखें)
                  </p>
                  <span className="inline-flex items-center gap-1 text-xs font-extrabold text-forest-700 dark:text-emerald-400 mt-3">
                    ᱮᱦᱚᱵᱽ ᱢᱮ / शुरू करें <ArrowRight className="w-3.5 h-3.5" />
                  </span>
                </button>

                <button
                  onClick={() => setActiveTab("stories")}
                  className="bg-white dark:bg-[#12241A] rounded-2xl p-5 border border-stone-200/90 dark:border-[#224734] shadow-xs hover:shadow-md transition-all text-left cursor-pointer group hover:-translate-y-1"
                >
                  <div className="w-12 h-12 rounded-2xl bg-amber-100 dark:bg-amber-950/60 flex items-center justify-center text-2xl mb-3 group-hover:scale-110 transition-transform">
                    📖
                  </div>
                  <h4 className="font-black text-base text-forest-900 dark:text-white">
                    ᱪᱤᱛᱟᱹᱨ ᱠᱟᱹᱦᱱᱤ ( सचित्र कहानियां )
                  </h4>
                  <p className="text-xs text-stone-500 dark:text-stone-400 mt-1">
                    ᱥᱟᱱᱛᱟᱲᱤ ᱟᱨ ᱦᱤᱱᱫᱤ ᱛᱮ ᱠᱟᱹᱦᱱᱤ ᱾ (लोककथाएं)
                  </p>
                  <span className="inline-flex items-center gap-1 text-xs font-extrabold text-forest-700 dark:text-emerald-400 mt-3">
                    ᱠᱟᱹᱦᱱᱤ ᱯᱟᱲᱦᱟᱣ ᱢᱮ / कहानी पढ़ें <ArrowRight className="w-3.5 h-3.5" />
                  </span>
                </button>

                <button
                  onClick={() => setActiveTab("quiz")}
                  className="bg-white dark:bg-[#12241A] rounded-2xl p-5 border border-stone-200/90 dark:border-[#224734] shadow-xs hover:shadow-md transition-all text-left cursor-pointer group hover:-translate-y-1"
                >
                  <div className="w-12 h-12 rounded-2xl bg-rose-100 dark:bg-rose-950/60 flex items-center justify-center text-2xl mb-3 group-hover:scale-110 transition-transform">
                    ✏️
                  </div>
                  <h4 className="font-black text-base text-forest-900 dark:text-white">
                    ᱪᱤᱛᱟᱹᱨ ᱠᱩᱠᱞᱤ ( Picture Quiz )
                  </h4>
                  <p className="text-xs text-stone-500 dark:text-stone-400 mt-1">
                    ᱠᱩᱠᱞᱤ ᱨᱩᱣᱟᱹᱲ ᱮᱢ ᱢᱮ ᱟᱨ +᱑᱐ ᱤᱯᱤᱞ ᱡᱤᱛᱠᱟᱹᱨᱚᱜ ᱢᱮ!
                  </p>
                  <span className="inline-flex items-center gap-1 text-xs font-extrabold text-forest-700 dark:text-emerald-400 mt-3">
                    ᱠᱩᱠᱞᱤ ᱮᱱᱮᱡ / क्विज़ खेलें <ArrowRight className="w-3.5 h-3.5" />
                  </span>
                </button>
              </div>
            </div>

            {/* Santali Student Classroom Showcase Card */}
            <div className="bg-white dark:bg-[#12241A] rounded-3xl p-5 sm:p-7 border-2 border-emerald-500/80 dark:border-emerald-600 shadow-md space-y-4">
              <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-4 border-b border-stone-100 dark:border-[#224734] pb-3">
                <div>
                  <div className="flex items-center gap-2 flex-wrap">
                    <span className="px-2.5 py-0.5 rounded-full bg-emerald-100 dark:bg-emerald-950 text-emerald-900 dark:text-emerald-300 text-xs font-black border border-emerald-400">
                      🏫 ᱟᱵᱚᱣᱟᱜ ᱥᱟᱱᱛᱟᱲᱤ ᱤᱛᱩᱱ ᱟᱥᱲᱟ (हमारी संथाली पाठशाला)
                    </span>
                    <span className="text-xs font-extrabold text-amber-600 dark:text-amber-400">
                      ✨ कक्षा 1 - 5 बाल विद्यार्थी
                    </span>
                  </div>
                  <h3 className="text-xl sm:text-2xl font-black text-forest-900 dark:text-white mt-1">
                    संथाली प्राथमिक कक्षा में अध्ययनरत बाल विद्यार्थी 🎒
                  </h3>
                  <p className="text-xs sm:text-sm text-stone-600 dark:text-stone-300">
                    झारखंड की राजकीय प्राथमिक पाठशाला में ओल चिकी (Ol Chiki ᱚլ ᱪᱤᱠᱤ) एवं हिंदी माध्यम से शिक्षा प्राप्त करते खुशहाल बच्चे!
                  </p>
                </div>

                <div className="flex items-center gap-2 shrink-0">
                  <button
                    onClick={() => setActiveTab("classroom")}
                    className="px-4 py-2 rounded-xl bg-forest-700 hover:bg-forest-800 text-white font-black text-xs shadow-xs cursor-pointer flex items-center gap-1.5"
                  >
                    <Radio className="w-3.5 h-3.5 text-amber-300 animate-pulse" />
                    <span>लाइव कक्षा में जुड़ें</span>
                  </button>
                </div>
              </div>

              {/* Classroom Photo & Highlights Grid */}
              <div className="grid grid-cols-1 lg:grid-cols-12 gap-5 items-center">
                <div className="lg:col-span-7 rounded-2xl overflow-hidden border-2 border-emerald-400 dark:border-emerald-600 shadow-md relative group">
                  <img
                    src={santaliClassroomImg}
                    alt="संथाली प्राथमिक विद्यालय कक्षा फोटो"
                    className="w-full h-64 sm:h-80 object-cover group-hover:scale-103 transition-transform duration-500"
                  />
                  <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/85 via-black/40 to-transparent p-4 text-white">
                    <p className="text-sm font-black flex items-center gap-2">
                      <span>🏫 प्राथमिक विद्यालय, दुमका (संथाल परगना)</span>
                      <span className="text-[11px] bg-emerald-600 px-2 py-0.5 rounded-full font-bold">Ol Chiki Classroom</span>
                    </p>
                    <p className="text-xs text-stone-200 mt-0.5 font-bold">
                      विद्यार्थी: ᱨᱚᱵᱤ ᱢᱩᱨᱢᱩ (रवि), ᱥᱤᱢᱟ ᱦᱟᱸᱥᱫᱟ (सीमा), ᱵᱤᱨᱥᱟ ᱦᱮᱢᱵᱽᱨᱚᱢ (बिरसा) व सहपाठी
                    </p>
                  </div>
                </div>

                <div className="lg:col-span-5 space-y-3">
                  <div className="p-4 rounded-2xl bg-cream-50 dark:bg-[#183827] border border-stone-200 dark:border-[#29543E] space-y-2">
                    <h4 className="text-sm font-black text-forest-900 dark:text-emerald-200 flex items-center gap-2">
                      <span>📖 मातृभाषा शिक्षण की विशेषताएँ:</span>
                    </h4>
                    <ul className="text-xs space-y-1.5 font-bold text-stone-700 dark:text-stone-300">
                      <li className="flex items-center gap-2">
                        <span className="w-5 h-5 rounded-full bg-emerald-100 dark:bg-emerald-950 text-emerald-800 dark:text-emerald-300 flex items-center justify-center text-[10px] font-black shrink-0">✓</span>
                        <span>ओल चिकी लिपि ( Ol Chiki ᱚᱞ ᱪᱤᱠᱤ) वर्णमाला चार्ट</span>
                      </li>
                      <li className="flex items-center gap-2">
                        <span className="w-5 h-5 rounded-full bg-emerald-100 dark:bg-emerald-950 text-emerald-800 dark:text-emerald-300 flex items-center justify-center text-[10px] font-black shrink-0">✓</span>
                        <span>संथाली लोककथाएँ व सचित्र पाठ्यपुस्तकें</span>
                      </li>
                      <li className="flex items-center gap-2">
                        <span className="w-5 h-5 rounded-full bg-emerald-100 dark:bg-emerald-950 text-emerald-800 dark:text-emerald-300 flex items-center justify-center text-[10px] font-black shrink-0">✓</span>
                        <span>डिजिटल शब्द कार्ड व AI पाठ्यपुस्तक स्कैनर</span>
                      </li>
                    </ul>
                  </div>

                  <div className="grid grid-cols-2 gap-2">
                    <button
                      onClick={() => setActiveTab("scanner")}
                      className="p-3 rounded-xl bg-amber-50 dark:bg-[#1A3828] border border-amber-300 dark:border-emerald-700 text-left cursor-pointer hover:bg-amber-100 transition-colors"
                    >
                      <div className="text-xs font-black text-amber-900 dark:text-amber-300">📷 पुस्तक स्कैनर</div>
                      <div className="text-[11px] text-stone-600 dark:text-stone-300 font-medium">संथाली अनुवाद करें</div>
                    </button>
                    <button
                      onClick={() => setActiveTab("stories")}
                      className="p-3 rounded-xl bg-teal-50 dark:bg-[#1A3828] border border-teal-300 dark:border-emerald-700 text-left cursor-pointer hover:bg-teal-100 transition-colors"
                    >
                      <div className="text-xs font-black text-teal-900 dark:text-teal-300">📖 सचित्र कहानियां</div>
                      <div className="text-[11px] text-stone-600 dark:text-stone-300 font-medium">लोककथाएं पढ़ें</div>
                    </button>
                  </div>
                </div>
              </div>
            </div>

            {/* Tribal Proverb Card */}
            <div className="bg-[#FAF4E8] dark:bg-[#14281E] border border-[#EDE2CC] dark:border-[#224734] rounded-3xl p-5 flex items-start gap-4">
              <span className="text-3xl">🌿</span>
              <div className="space-y-1">
                <h4 className="text-xs sm:text-sm font-black text-forest-900 dark:text-emerald-300 uppercase tracking-wider">
                  ᱛᱮᱦᱮᱧᱟᱜ ᱥᱟᱱᱛᱟᱲᱤ ᱪᱮᱫᱚᱜ / आज की संथाली सीख (Daily Tribal Wisdom)
                </h4>
                <p className="text-base sm:text-lg font-black text-stone-900 dark:text-white">
                  "ᱫᱟᱨᱮ ᱫᱟᱨᱮ ᱨᱚᱦᱚᱭ ᱢᱮ, ᱚᱲᱟᱜ ᱚᱲᱟᱜ ᱥᱟᱡᱟᱣ ᱢᱮ ᱾" (दारे दारे रोहोय मे, ओड़ाक् ओड़ाक् साजाव मे।)
                </p>
                <p className="text-xs sm:text-sm text-stone-600 dark:text-stone-300">
                  ᱚᱨᱛᱷᱚ: ᱟᱹᱰᱤ ᱫᱟᱨᱮ ᱨᱚᱦᱚᱭ ᱢᱮ ᱟᱨ ᱟᱢᱟᱜ ᱚᱲᱟᱜ ᱟᱨ ᱟᱹᱛᱩ ᱦᱟᱹᱨᱤᱭᱟᱹᱲ ᱟᱨ ᱪᱚᱨᱚᱠ ᱵᱮᱱᱟᱣ ᱢᱮ ᱾ (अर्थ: खूब पेड़ लगाओ और अपने घर तथा गांव को हरा-भरा और सुंदर बनाओ।)
                </p>
              </div>
            </div>
          </div>
        )}

        {/* ================= TAB 2: शब्द कार्ड (Cards) ================= */}
        {activeTab === "flashcards" && (
          <div className="space-y-4 animate-in fade-in duration-200">
            <Flashcards
              selectedLanguage={currentLanguage}
              studentGrade={student.grade || "कक्षा 2"}
              isStudentPortal={true}
            />
          </div>
        )}

        {/* ================= TAB 3: सचित्र कहानियां (Stories) ================= */}
        {activeTab === "stories" && (
          <div className="space-y-6 animate-in fade-in duration-200">
            <div className="flex items-center justify-between flex-wrap gap-2">
              <div>
                <h2 className="text-xl sm:text-2xl font-black text-forest-900 dark:text-white">
                  सचित्र बाल कहानियां 📖
                </h2>
                <p className="text-xs sm:text-sm text-stone-500 dark:text-stone-400">
                  संथाली और हिंदी में सचित्र लोककथाएं पढ़ें व सुनें।
                </p>
              </div>

              <button
                onClick={() => setShowStoryBilingual(!showStoryBilingual)}
                className="px-3.5 py-2 rounded-xl bg-pastel-green dark:bg-[#1A3A2A] border border-forest-600 dark:border-emerald-400 text-forest-900 dark:text-emerald-300 text-xs sm:text-sm font-extrabold cursor-pointer"
              >
                {showStoryBilingual ? "द्विभाषी दृश्य (चालू) ✓" : "केवल हिंदी दृश्य"}
              </button>
            </div>

            {/* Story Selection Pills */}
            <div className="flex gap-2 overflow-x-auto pb-1">
              {STORIES.map((st, i) => (
                <button
                  key={st.id}
                  onClick={() => setActiveStoryIndex(i)}
                  className={`px-4 py-2 rounded-2xl text-xs sm:text-sm font-extrabold transition-all cursor-pointer flex items-center gap-2 ${
                    activeStoryIndex === i
                      ? "bg-[#1E4D36] text-white shadow-xs"
                      : "bg-white dark:bg-[#12241A] border border-stone-200 dark:border-[#224734] text-stone-700 dark:text-stone-300"
                  }`}
                >
                  <span>{st.coverEmoji}</span>
                  <span>{st.titleHindi}</span>
                </button>
              ))}
            </div>

            {/* Active Story Reader */}
            {STORIES[activeStoryIndex] && (
              <div className="bg-white dark:bg-[#12241A] rounded-3xl p-6 sm:p-8 border border-stone-200/90 dark:border-[#224734] shadow-card space-y-6">
                <div className="flex items-center justify-between pb-4 border-b border-stone-100 dark:border-[#224734] flex-wrap gap-3">
                  <div>
                    <h3 className="text-xl sm:text-2xl font-black text-forest-900 dark:text-white">
                      {STORIES[activeStoryIndex].titleHindi}
                    </h3>
                    <p className="text-xs sm:text-sm font-bold text-forest-700 dark:text-emerald-400 mt-0.5">
                      {STORIES[activeStoryIndex].titleTribal}
                    </p>
                  </div>
                  
                  {/* Title level audio playback */}
                  <div className="flex items-center gap-2">
                    <button
                      onClick={() => handleSpeak(STORIES[activeStoryIndex].titleHindi, "hi")}
                      className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-amber-100 dark:bg-amber-950/60 text-amber-950 dark:text-amber-200 hover:bg-amber-200 cursor-pointer shadow-xs text-xs font-black border border-amber-300 dark:border-amber-800"
                      title="हिंदी शीर्षक सुनें (Listen in Hindi)"
                    >
                      <Volume2 className="w-4 h-4 text-amber-600 dark:text-amber-400" />
                      <span>हिंदी शीर्षक</span>
                    </button>
                    <button
                      onClick={() => handleSpeak(STORIES[activeStoryIndex].titleTribal, "sat")}
                      className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-emerald-100 dark:bg-emerald-950/60 text-emerald-950 dark:text-emerald-300 hover:bg-emerald-200 cursor-pointer shadow-xs text-xs font-black border border-emerald-300 dark:border-emerald-800"
                      title="संथाली शीर्षक सुनें (Listen in Santali)"
                    >
                      <Volume2 className="w-4 h-4 text-emerald-600 dark:text-emerald-400" />
                      <span>ᱥᱟᱱᱛᱟᱲᱤ ᱛᱮ (संथाली)</span>
                    </button>
                  </div>
                </div>

                {/* Paragraphs with Hindi & Santali audio controls */}
                <div className="space-y-4">
                  {STORIES[activeStoryIndex].paragraphs.map((p, idx) => (
                    <div
                      key={idx}
                      className="p-5 rounded-2xl bg-cream-50 dark:bg-[#162A1E] border border-stone-200/80 dark:border-[#244A36] space-y-3"
                    >
                      {/* Hindi Section & Dedicated Audio Button */}
                      <div className="flex items-start justify-between gap-3">
                        <p className="text-base sm:text-lg font-bold text-stone-900 dark:text-white leading-relaxed">
                          {p.hindi}
                        </p>
                        <button
                          onClick={() => handleSpeak(p.hindi, "hi")}
                          className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-amber-50 dark:bg-amber-950/60 text-amber-900 dark:text-amber-200 hover:bg-amber-100 border border-amber-200 dark:border-amber-800 text-xs font-extrabold shrink-0 cursor-pointer transition-colors shadow-2xs"
                          title="हिंदी में सुनें (Listen in Hindi)"
                        >
                          <Volume2 className="w-4 h-4 text-amber-600" />
                          <span>हिंदी में सुनें</span>
                        </button>
                      </div>

                      {/* Santali Section & Dedicated Audio Button */}
                      {showStoryBilingual && (
                        <div className="pt-3 border-t border-stone-200/60 dark:border-[#224734] space-y-2">
                          <div className="flex items-start justify-between gap-3">
                            <div className="space-y-0.5">
                              <span className="text-[11px] font-extrabold text-emerald-700 dark:text-emerald-400 uppercase tracking-wide">
                                ᱥᱟᱱᱛᱟᱲᱤ / संथाली (Ol Chiki & Devanagari):
                              </span>
                              <p className="text-sm sm:text-base font-bold text-forest-900 dark:text-emerald-200 leading-relaxed">
                                {p.tribal}
                              </p>
                            </div>
                            <button
                              onClick={() => handleSpeak(p.tribal, "sat")}
                              className="flex items-center gap-1.5 px-3.5 py-2 rounded-xl bg-emerald-700 hover:bg-emerald-800 text-white text-xs font-black shrink-0 cursor-pointer transition-all shadow-md active:scale-95"
                              title="संथाली में सुनें (Listen in Santali)"
                            >
                              <Volume2 className="w-4 h-4 text-amber-300" />
                              <span>ᱥᱟᱱᱛᱟᱲᱤ ᱛᱮ ᱟᱸᱡᱚᱢ</span>
                            </button>
                          </div>
                        </div>
                      )}
                    </div>
                  ))}
                </div>

                {/* Moral */}
                <div className="p-4 rounded-2xl bg-pastel-green dark:bg-[#1A3A2A] border border-forest-600/30 dark:border-emerald-500/30 text-xs sm:text-sm font-bold text-forest-900 dark:text-emerald-200">
                  💡 <strong>कहानी से सीख:</strong> {STORIES[activeStoryIndex].moral}
                </div>
              </div>
            )}
          </div>
        )}

        {/* ================= TAB 4: आज का क्विज़ (Quiz) ================= */}
        {activeTab === "quiz" && (
          <div className="space-y-6 animate-in fade-in duration-200">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
              <div>
                <h2 className="text-xl sm:text-2xl font-black text-forest-900 dark:text-white">
                  दैनिक चित्र क्विज़ ✏️
                </h2>
                <p className="text-xs sm:text-sm text-stone-500 dark:text-stone-400">
                  शिक्षक द्वारा हर कक्षा के लिए दैनिक क्विज़। सही उत्तर दें और सितारे अर्जित करें!
                </p>
              </div>

              {/* Class Filter Pills for Quizzes */}
              <div className="flex items-center gap-1.5 flex-wrap">
                {[
                  { id: "all", label: "सभी क्विज़" },
                  { id: "कक्षा 1", label: "कक्षा 1" },
                  { id: "कक्षा 2", label: "कक्षा 2" },
                  { id: "कक्षा 3", label: "कक्षा 3" },
                ].map((f) => (
                  <button
                    key={f.id}
                    onClick={() => setSelectedClassFilter(f.id)}
                    className={`px-3 py-1.5 rounded-xl text-xs font-bold transition-all cursor-pointer ${
                      selectedClassFilter === f.id
                        ? "bg-forest-700 text-white shadow-xs"
                        : "bg-white dark:bg-[#14281E] text-stone-700 dark:text-stone-300 border border-stone-200 dark:border-[#224734] hover:bg-stone-100"
                    }`}
                  >
                    {f.label}
                  </button>
                ))}
              </div>
            </div>

            {/* Active Quiz Solver View vs Quiz List */}
            {activeQuizToSolve ? (
              <div className="bg-white dark:bg-[#12241A] rounded-3xl p-6 sm:p-8 border border-stone-200/90 dark:border-[#224734] shadow-card space-y-6">
                <div className="flex items-center justify-between border-b pb-3 border-stone-200 dark:border-[#224734]">
                  <div>
                    <span className="text-[10px] font-black uppercase px-2.5 py-0.5 rounded-full bg-amber-100 text-amber-900 dark:bg-amber-950 dark:text-amber-300 border border-amber-300">
                      {activeQuizToSolve.classLevel || student.grade} • {activeQuizToSolve.date || "आज"}
                    </span>
                    <h3 className="text-lg sm:text-xl font-black text-forest-900 dark:text-white mt-1">
                      {activeQuizToSolve.title}
                    </h3>
                  </div>
                  <button
                    onClick={() => {
                      setActiveQuizToSolve(null);
                      resetQuiz();
                    }}
                    className="px-3 py-1.5 bg-stone-200 dark:bg-stone-800 text-stone-800 dark:text-stone-200 rounded-xl text-xs font-bold hover:bg-stone-300 cursor-pointer"
                  >
                    ← वापस सूची पर जाएं
                  </button>
                </div>

                {!quizFinished ? (
                  <div className="space-y-6">
                    {/* Progress bar */}
                    <div className="flex items-center justify-between text-xs font-bold text-stone-500 dark:text-stone-400">
                      <span>प्रश्न {quizIndex + 1} / {currentQuizQuestions.length}</span>
                      <span className="text-amber-600 dark:text-amber-400 font-extrabold">+2 सितारे per answer</span>
                    </div>

                    {/* Question Prompt */}
                    <div className="p-4 rounded-2xl bg-cream-50 dark:bg-[#162A1E] border border-stone-200 dark:border-[#244A36] space-y-2">
                      <div className="flex items-start justify-between gap-3">
                        <h3 className="text-lg sm:text-xl font-black text-stone-900 dark:text-white leading-relaxed">
                          {currentQuizQuestions[quizIndex]?.promptHindi || currentQuizQuestions[quizIndex]?.questionHindi}
                        </h3>
                        <button
                          onClick={() => handleSpeak(currentQuizQuestions[quizIndex]?.promptHindi || currentQuizQuestions[quizIndex]?.questionHindi, "hi")}
                          className="p-2 rounded-xl bg-amber-100 text-amber-900 dark:bg-amber-950 dark:text-amber-300 hover:bg-amber-200 cursor-pointer shrink-0"
                          title="प्रश्न सुनें"
                        >
                          <Volume2 className="w-4 h-4" />
                        </button>
                      </div>

                      {(currentQuizQuestions[quizIndex]?.promptTribal || currentQuizQuestions[quizIndex]?.questionTribal) && (
                        <div className="pt-2 border-t border-stone-200/60 dark:border-[#224734] flex items-center justify-between">
                          <p className="text-xs sm:text-sm font-extrabold text-emerald-700 dark:text-emerald-300">
                            {currentQuizQuestions[quizIndex]?.promptTribal || currentQuizQuestions[quizIndex]?.questionTribal}
                          </p>
                          <button
                            onClick={() => handleSpeak(currentQuizQuestions[quizIndex]?.promptTribal || currentQuizQuestions[quizIndex]?.questionTribal, "sat")}
                            className="text-xs font-bold text-emerald-800 dark:text-emerald-300 underline cursor-pointer"
                          >
                            🔊 ᱥᱟᱱᱛᱟᱲᱤ ᱛᱮ
                          </button>
                        </div>
                      )}
                    </div>

                    {/* Options */}
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                      {(currentQuizQuestions[quizIndex]?.options || []).map((opt, idx) => {
                        const isSelected = selectedAnswer === idx;
                        const correctIdx = currentQuizQuestions[quizIndex]?.correctIndex ?? currentQuizQuestions[quizIndex]?.answerIndex ?? 0;
                        const isCorrect = idx === correctIdx;

                        let btnClass = "bg-stone-50 dark:bg-[#172E22] border-stone-200 dark:border-[#264D3B] text-stone-800 dark:text-stone-200 hover:border-forest-600";
                        if (selectedAnswer !== null) {
                          if (isCorrect) {
                            btnClass = "bg-emerald-100 dark:bg-emerald-950/70 border-emerald-600 text-emerald-900 dark:text-emerald-200 font-black";
                          } else if (isSelected) {
                            btnClass = "bg-rose-100 dark:bg-rose-950/70 border-rose-600 text-rose-900 dark:text-rose-200";
                          }
                        }

                        return (
                          <button
                            key={idx}
                            disabled={selectedAnswer !== null}
                            onClick={() => handleSelectQuizAnswer(idx)}
                            className={`p-4 rounded-2xl border-2 font-extrabold text-sm sm:text-base text-left transition-all cursor-pointer flex items-center justify-between ${btnClass}`}
                          >
                            <span>{opt}</span>
                            {selectedAnswer !== null && isCorrect && <Check className="w-5 h-5 text-emerald-700 dark:text-emerald-400" />}
                          </button>
                        );
                      })}
                    </div>

                    {/* Explanation and Next Button */}
                    {selectedAnswer !== null && (
                      <div className="space-y-4 animate-in fade-in">
                        <div className="p-3.5 rounded-2xl bg-amber-50 dark:bg-amber-950/30 border border-amber-200 dark:border-amber-800 text-xs sm:text-sm text-amber-900 dark:text-amber-200 font-bold">
                          💡 {currentQuizQuestions[quizIndex]?.explanation}
                        </div>

                        <button
                          onClick={handleNextQuizQuestion}
                          className="w-full py-3.5 rounded-2xl bg-[#1E4D36] hover:bg-[#163827] text-white font-extrabold text-base shadow-xs cursor-pointer flex items-center justify-center gap-2"
                        >
                          <span>{quizIndex + 1 === currentQuizQuestions.length ? "परिणाम देखें व जमा करें" : "अगला प्रश्न"}</span>
                          <ArrowRight className="w-4 h-4" />
                        </button>
                      </div>
                    )}
                  </div>
                ) : (
                  /* Quiz Completion Screen */
                  <div className="bg-white dark:bg-[#12241A] rounded-3xl p-8 border border-stone-200/90 dark:border-[#224734] shadow-card text-center space-y-4">
                    <div className="text-6xl">🎉🌟</div>
                    <h3 className="text-2xl sm:text-3xl font-black text-forest-900 dark:text-white">
                      शाबाश, {student.name}!
                    </h3>
                    <p className="text-sm sm:text-base text-stone-600 dark:text-stone-300">
                      आपने {currentQuizQuestions.length} में से <strong>{quizScore}</strong> सही उत्तर दिए!
                    </p>
                    <p className="text-xs text-emerald-700 dark:text-emerald-300 font-bold">
                      शिक्षक डैशबोर्ड पर आपका दैनिक क्विज़ परिणाम दर्ज कर दिया गया है।
                    </p>
                    <div className="inline-block bg-amber-100 dark:bg-amber-950/60 text-amber-900 dark:text-amber-300 font-black text-sm px-4 py-2 rounded-full border border-amber-300 dark:border-amber-700">
                      ⭐ +5 बोनस सितारे प्राप्त हुए!
                    </div>

                    <div className="pt-4 flex justify-center gap-3">
                      <button
                        onClick={() => {
                          resetQuiz();
                          setActiveQuizToSolve(null);
                        }}
                        className="px-6 py-3 rounded-2xl bg-[#1E4D36] hover:bg-[#163827] text-white font-bold text-sm cursor-pointer"
                      >
                        अन्य क्विज़ देखें
                      </button>
                    </div>
                  </div>
                )}
              </div>
            ) : (
              /* Published Quizzes List for Student */
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {publishedQuizzes
                  .filter((q) => selectedClassFilter === "all" || !q.classLevel || q.classLevel.trim() === selectedClassFilter.trim())
                  .map((q, idx) => (
                    <div
                      key={q.id || idx}
                      className="bg-white dark:bg-[#12241A] rounded-3xl p-5 border border-stone-200/90 dark:border-[#224734] shadow-xs hover:shadow-md transition-all space-y-3 flex flex-col justify-between"
                    >
                      <div className="space-y-2">
                        <div className="flex items-center justify-between">
                          <span className="text-[10px] font-extrabold uppercase px-2.5 py-0.5 rounded-full bg-amber-100 dark:bg-amber-950 text-amber-900 dark:text-amber-300 border border-amber-300">
                            {q.classLevel || student.grade}
                          </span>
                          <span className="text-xs font-bold text-stone-400">
                            {q.date || "आज"}
                          </span>
                        </div>
                        <h3 className="font-extrabold text-base text-forest-900 dark:text-white leading-snug">
                          {q.title}
                        </h3>
                        <p className="text-xs text-stone-500 dark:text-stone-400">
                          {q.instructions || "दैनिक बहुविकल्पी अभ्यास प्रश्न"}
                        </p>
                        <div className="text-[11px] font-bold text-forest-700 dark:text-emerald-400">
                          {q.questions?.length || 3} प्रश्न • {q.subject || "हिंदी"}
                        </div>
                      </div>

                      <button
                        onClick={() => {
                          setActiveQuizToSolve(q);
                          resetQuiz();
                        }}
                        className="w-full py-2.5 bg-amber-500 hover:bg-amber-600 text-white font-black text-xs rounded-xl shadow-xs transition-all flex items-center justify-center gap-2 cursor-pointer"
                      >
                        <Sparkles className="w-4 h-4 text-white" />
                        <span>दैनिक क्विज़ खेलें (Play Daily Quiz)</span>
                      </button>
                    </div>
                  ))}
              </div>
            )}
          </div>
        )}

        {/* ================= TAB 5: बोलकर सीखो (Voice Practice) ================= */}
        {activeTab === "practice" && (
          <div className="space-y-6 animate-in fade-in duration-200">
            <div>
              <h2 className="text-xl sm:text-2xl font-black text-forest-900 dark:text-white">
                बोलकर सीखो (Voice Practice) 🗣️
              </h2>
              <p className="text-xs sm:text-sm text-stone-500 dark:text-stone-400">
                शब्द का सही उच्चारण सुनें, फिर माइक दबाकर बोलें। AI आपकी मदद करेगा!
              </p>
            </div>

            <div className="bg-white dark:bg-[#12241A] rounded-3xl p-6 sm:p-8 border border-stone-200/90 dark:border-[#224734] shadow-card text-center space-y-6">
              <div className="space-y-1">
                <span className="text-xs font-bold text-forest-700 dark:text-emerald-400 uppercase tracking-wider">
                  अभ्यास शब्द
                </span>
                <h3 className="text-4xl sm:text-5xl font-black text-forest-900 dark:text-white">
                  नमस्ते (जोहार)
                </h3>
                <p className="text-sm text-stone-500 dark:text-stone-400">
                  उच्चारण: Na-mas-te / Jo-har
                </p>
              </div>

              {/* Action Buttons */}
              <div className="flex items-center justify-center gap-4">
                <button
                  onClick={() => playDevanagariAudio("नमस्ते, जोहार")}
                  className="px-5 py-3 rounded-2xl bg-amber-100 dark:bg-amber-950/60 hover:bg-amber-200 text-amber-900 dark:text-amber-300 font-extrabold text-sm flex items-center gap-2 cursor-pointer shadow-xs"
                >
                  <Volume2 className="w-5 h-5" />
                  <span>सही उच्चारण सुनें</span>
                </button>

                <button
                  disabled={voiceRecording}
                  onClick={() => handleVoicePractice("नमस्ते")}
                  className={`px-6 py-3.5 rounded-2xl font-extrabold text-base flex items-center gap-2 shadow-md cursor-pointer transition-all ${
                    voiceRecording
                      ? "bg-rose-600 text-white animate-pulse"
                      : "bg-[#1E4D36] hover:bg-[#163827] text-white"
                  }`}
                >
                  <Mic className="w-5 h-5" />
                  <span>{voiceRecording ? "सुन रहा हूँ... बोलिए!" : "माइक दबाकर बोलें"}</span>
                </button>
              </div>

              {/* Feedback */}
              {voiceFeedback && (
                <div className="p-4 rounded-2xl bg-emerald-50 dark:bg-emerald-950/40 border border-emerald-300 dark:border-emerald-800 text-emerald-900 dark:text-emerald-200 max-w-md mx-auto space-y-1 animate-in zoom-in-95">
                  <div className="font-black text-base flex items-center justify-center gap-2">
                    <span>🌟 शुद्धता: {voiceFeedback.score}</span>
                    <span>• {voiceFeedback.msg}</span>
                  </div>
                  <p className="text-xs font-semibold text-emerald-700 dark:text-emerald-400">
                    आपको +1 सितारा मिला!
                  </p>
                </div>
              )}
            </div>
          </div>
        )}

        {/* ================= TAB 6: मेरे बैज व सितारे (Badges & Stars) ================= */}
        {activeTab === "badges" && (
          <div className="space-y-6 animate-in fade-in duration-200">
            {/* Level & Stars Header Summary Card */}
            <div className="bg-gradient-to-r from-amber-500 via-amber-600 to-yellow-600 text-white rounded-3xl p-6 sm:p-8 shadow-lg relative overflow-hidden flex flex-col md:flex-row items-center justify-between gap-6">
              <div className="relative z-10 space-y-2 text-center md:text-left">
                <span className="px-3 py-1 rounded-full bg-white/20 backdrop-blur-xs text-xs font-black uppercase tracking-wider">
                  {(stars >= 100 && "स्तर 5: भाषा सुपर स्टार 👑") ||
                   (stars >= 50 && "स्तर 4: बाल विद्वान 🎓") ||
                   (stars >= 35 && "स्तर 3: मातृभाषा साधक 🏹") ||
                   (stars >= 20 && "स्तर 2: संथाली भाषा प्रेमी 📖") ||
                   "स्तर 1: नौसिखिया शिक्षार्थी 🌟"}
                </span>
                <h2 className="text-3xl sm:text-5xl font-black tracking-tight flex items-center justify-center md:justify-start gap-2">
                  <span>⭐ {stars}</span>
                  <span className="text-xl sm:text-2xl font-bold opacity-90">सितारे (Total Stars)</span>
                </h2>
                <p className="text-xs sm:text-sm text-amber-100 font-medium">
                  अगले स्तर के लिए लक्ष्य: <strong>{Math.max(0, (stars >= 50 ? 100 : stars >= 35 ? 50 : stars >= 20 ? 35 : 20) - stars)} सितारे बाकी</strong>
                </p>

                {/* Level Progress Bar */}
                <div className="w-full max-w-md h-3.5 bg-black/30 rounded-full overflow-hidden p-0.5 mt-2">
                  <div
                    className="h-full bg-white rounded-full transition-all duration-500"
                    style={{
                      width: `${Math.min(100, Math.round((stars / (stars >= 50 ? 100 : stars >= 35 ? 50 : stars >= 20 ? 35 : 20)) * 100))}%`
                    }}
                  />
                </div>
              </div>

              <div className="relative z-10 shrink-0 flex items-center justify-center bg-white/20 border border-white/30 p-4.5 rounded-3xl backdrop-blur-xs text-center min-w-44">
                <div>
                  <div className="text-4xl mb-1">🏆</div>
                  <div className="text-2xl font-black">
                    {[
                      { unlocked: true },
                      { unlocked: stars >= 15 },
                      { unlocked: stars >= 20 },
                      { unlocked: stars >= 25 },
                      { unlocked: stars >= 35 },
                      { unlocked: stars >= 40 },
                      { unlocked: stars >= 50 },
                      { unlocked: stars >= 100 },
                    ].filter((b) => b.unlocked).length} / 8
                  </div>
                  <div className="text-xs font-extrabold text-amber-100">अनलॉक पदक</div>
                </div>
              </div>
            </div>

            {/* Notification Toast */}
            {rewardToast && (
              <div className="p-4 rounded-2xl bg-[#1B4D36] text-amber-300 font-black text-xs sm:text-sm text-center shadow-lg border-2 border-amber-400 animate-in zoom-in-95">
                {rewardToast}
              </div>
            )}

            {/* Sub Tabs */}
            <div className="flex items-center gap-2 overflow-x-auto pb-1">
              {[
                { id: "badges", label: "🏅 मेरे पदक (Badges)", icon: "🏅" },
                { id: "history", label: "📜 सितारा इतिहास (History)", icon: "📜" },
                { id: "shop", label: "🎁 बाल सितारा बाज़ार (Shop)", icon: "🎁" },
              ].map((st) => (
                <button
                  key={st.id}
                  onClick={() => setBadgeSubTab(st.id)}
                  className={`px-4 py-2.5 rounded-2xl text-xs sm:text-sm font-black transition-all cursor-pointer flex items-center gap-2 ${
                    badgeSubTab === st.id
                      ? "bg-[#1E4D36] text-white shadow-xs"
                      : "bg-white dark:bg-[#12241A] text-stone-700 dark:text-stone-300 border border-stone-200 dark:border-[#224734] hover:bg-stone-100"
                  }`}
                >
                  <span>{st.label}</span>
                </button>
              ))}
            </div>

            {/* SUB-VIEW 1: 🏅 Dynamic Badges */}
            {badgeSubTab === "badges" && (
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
                {[
                  { id: 1, title: "पहला कदम", icon: "🌟", desc: "पहला दिन पोर्टल प्रवेश पूरा किया", unlocked: true, target: 10 },
                  { id: 2, title: "शब्द मित्र", icon: "📚", desc: "15 सितारे अर्जित करें", unlocked: stars >= 15, target: 15 },
                  { id: 3, title: "कहानी प्रेमी", icon: "📖", desc: "20 सितारे अर्जित करें व कहानियां पढ़ें", unlocked: stars >= 20, target: 20 },
                  { id: 4, title: "नियमित छात्र", icon: "🔥", desc: "25 सितारे अर्जित करें (अभ्यास)", unlocked: stars >= 25, target: 25 },
                  { id: 5, title: "संथाली ज्ञानी", icon: "🏹", desc: "35 सितारे अर्जित करें व क्विज़ हल करें", unlocked: stars >= 35, target: 35 },
                  { id: 6, title: "सुरीला वक्ता", icon: "🗣️", desc: "40 सितारे अर्जित करें व बोलकर सीखें", unlocked: stars >= 40, target: 40 },
                  { id: 7, title: "ज्ञान रत्न", icon: "🏆", desc: "50 सितारे अर्जित करें", unlocked: stars >= 50, target: 50 },
                  { id: 8, title: "मातृभाषा सुपर स्टार", icon: "👑", desc: "100 सितारे अर्जित करें", unlocked: stars >= 100, target: 100 },
                ].map((b) => (
                  <div
                    key={b.id}
                    className={`p-5 rounded-3xl border-2 text-center space-y-2 transition-all flex flex-col justify-between ${
                      b.unlocked
                        ? "bg-white dark:bg-[#12241A] border-amber-400 dark:border-amber-600 shadow-md scale-102"
                        : "bg-stone-50/70 dark:bg-[#101F16] border-stone-200 dark:border-[#1E3B2C] opacity-75"
                    }`}
                  >
                    <div className="space-y-2">
                      <div className="text-4xl mb-1">{b.icon}</div>
                      <h4 className="font-black text-base text-stone-900 dark:text-white leading-tight">
                        {b.title}
                      </h4>
                      <p className="text-xs text-stone-500 dark:text-stone-400 line-clamp-2">
                        {b.desc}
                      </p>
                    </div>

                    <div className="pt-2 space-y-1.5">
                      <div className="w-full h-2 bg-stone-200 dark:bg-stone-800 rounded-full overflow-hidden">
                        <div
                          className={`h-full rounded-full ${b.unlocked ? "bg-amber-400" : "bg-stone-400"}`}
                          style={{ width: `${Math.min(100, Math.round((stars / b.target) * 100))}%` }}
                        />
                      </div>
                      <span
                        className={`inline-block text-[11px] font-extrabold px-3 py-1 rounded-full ${
                          b.unlocked
                            ? "bg-amber-100 text-amber-900 dark:bg-amber-950/80 dark:text-amber-300 border border-amber-300"
                            : "bg-stone-200 text-stone-600 dark:bg-stone-800 dark:text-stone-400"
                        }`}
                      >
                        {b.unlocked ? "प्राप्त हुआ ✓" : `🔒 ताला लगा (${stars}/${b.target})`}
                      </span>
                    </div>
                  </div>
                ))}
              </div>
            )}

            {/* SUB-VIEW 2: 📜 Star History Feed */}
            {badgeSubTab === "history" && (
              <div className="bg-white dark:bg-[#12241A] rounded-3xl p-6 border border-stone-200 dark:border-[#224734] shadow-xs space-y-4">
                <div className="flex items-center justify-between border-b pb-3 border-stone-200 dark:border-[#224734]">
                  <h3 className="text-lg font-black text-forest-900 dark:text-white flex items-center gap-2">
                    <Clock className="w-5 h-5 text-amber-500" />
                    <span>अद्यतन सितारा गतिविधि इतिहास</span>
                  </h3>
                  <span className="text-xs font-bold text-stone-500">कुल रिकॉर्ड्स: {starHistory.length}</span>
                </div>

                <div className="space-y-3">
                  {starHistory.map((item) => (
                    <div
                      key={item.id}
                      className="p-4 rounded-2xl bg-stone-50 dark:bg-[#162A1E] border border-stone-200/80 dark:border-[#224734] flex items-center justify-between gap-4"
                    >
                      <div className="flex items-center gap-3">
                        <div className="w-10 h-10 rounded-2xl bg-amber-100 dark:bg-[#1B3626] border border-amber-300 flex items-center justify-center text-xl shrink-0">
                          {item.icon || "⭐"}
                        </div>
                        <div>
                          <h4 className="font-extrabold text-sm text-stone-900 dark:text-white leading-tight">
                            {item.title}
                          </h4>
                          <span className="text-[11px] font-semibold text-stone-500 dark:text-stone-400">
                            {item.time}
                          </span>
                        </div>
                      </div>

                      <div className={`px-3 py-1 rounded-full text-xs font-black shrink-0 ${
                        String(item.points).startsWith("-")
                          ? "bg-rose-100 text-rose-800 dark:bg-rose-950 dark:text-rose-300 border border-rose-300"
                          : "bg-emerald-100 text-emerald-800 dark:bg-emerald-950 dark:text-emerald-300 border border-emerald-300"
                      }`}>
                        {item.points} सितारे
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* SUB-VIEW 3: 🎁 Reward Store */}
            {badgeSubTab === "shop" && (
              <div className="space-y-4">
                <div className="bg-amber-50 dark:bg-[#162E22] p-4 rounded-2xl border border-amber-200 dark:border-[#224734] flex items-center gap-3">
                  <span className="text-2xl">🎁</span>
                  <div>
                    <h4 className="text-sm font-black text-amber-900 dark:text-amber-200">
                      बाल सितारा बाज़ार (Student Reward Shop)
                    </h4>
                    <p className="text-xs text-amber-800 dark:text-stone-300">
                      अपने अर्जित सितारों का उपयोग करके विशेष डिजिटल पुरस्कार और प्रमाण पत्र प्राप्त करें!
                    </p>
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                  {[
                    {
                      id: "crown",
                      title: "सोने का मुकुट (Golden Crown)",
                      icon: "👑",
                      cost: 15,
                      desc: "प्रोफ़ाइल पर चमकता हुआ गोल्डन क्राउन बैज"
                    },
                    {
                      id: "art_theme",
                      title: "संथाली कला (Tribal Art Badge)",
                      icon: "🎨",
                      cost: 20,
                      desc: "विशेष पारंपरिक संथाली कलात्मक बैज"
                    },
                    {
                      id: "cert",
                      title: "मातृभाषा सम्मान पत्र (Certificate)",
                      icon: "📜",
                      cost: 25,
                      desc: "शिक्षिका द्वारा हस्ताक्षरित बाल उपलब्धि प्रमाण पत्र"
                    }
                  ].map((reward) => {
                    const isRedeemed = redeemedRewards.includes(reward.id);
                    const canAfford = stars >= reward.cost;
                    return (
                      <div
                        key={reward.id}
                        className="bg-white dark:bg-[#12241A] rounded-3xl p-5 border border-stone-200 dark:border-[#224734] shadow-xs flex flex-col justify-between space-y-4 text-center"
                      >
                        <div className="space-y-2">
                          <div className="text-5xl mb-2">{reward.icon}</div>
                          <h4 className="font-black text-base text-forest-900 dark:text-white leading-snug">
                            {reward.title}
                          </h4>
                          <p className="text-xs text-stone-500 dark:text-stone-400">
                            {reward.desc}
                          </p>
                          <div className="inline-flex items-center gap-1 px-3 py-1 rounded-full bg-amber-100 dark:bg-amber-950 text-amber-900 dark:text-amber-300 text-xs font-black">
                            <Star className="w-3.5 h-3.5 fill-amber-400 text-amber-500" />
                            <span>{reward.cost} सितारे</span>
                          </div>
                        </div>

                        <button
                          onClick={() => handleRedeemReward(reward)}
                          className={`w-full py-2.5 rounded-xl font-black text-xs transition-all cursor-pointer flex items-center justify-center gap-1.5 ${
                            isRedeemed
                              ? "bg-emerald-600 text-white shadow-xs"
                              : canAfford
                              ? "bg-[#1E4D36] hover:bg-[#163827] text-white shadow-md active:scale-95"
                              : "bg-stone-200 dark:bg-stone-800 text-stone-500 cursor-not-allowed"
                          }`}
                        >
                          <ShoppingBag className="w-4 h-4" />
                          <span>
                            {isRedeemed
                              ? reward.id === "cert" ? "प्रमाण पत्र देखें 📜" : "प्राप्त किया हुआ ✓"
                              : canAfford
                              ? "रिडीम करें (Redeem)"
                              : `और ${reward.cost - stars} सितारे चाहिए`}
                          </span>
                        </button>
                      </div>
                    );
                  })}
                </div>
              </div>
            )}
          </div>
        )}

        {/* Printable Certificate Modal */}
        {showCertificateModal && (
          <div className="fixed inset-0 bg-stone-900/70 backdrop-blur-xs z-50 flex items-center justify-center p-4">
            <div className="bg-white dark:bg-[#12241A] rounded-3xl max-w-xl w-full p-6 sm:p-8 border-4 border-amber-400 shadow-2xl relative space-y-6 text-center animate-in zoom-in-95">
              <button
                onClick={() => setShowCertificateModal(false)}
                className="absolute top-4 right-4 p-2 rounded-full bg-stone-100 dark:bg-[#1C3A2B] text-stone-600 dark:text-stone-300 hover:bg-stone-200 cursor-pointer"
              >
                <X className="w-5 h-5" />
              </button>

              <div className="space-y-2">
                <div className="text-5xl mb-2">📜 🌟 🎓</div>
                <span className="text-xs font-black uppercase tracking-widest text-amber-700 bg-amber-50 dark:bg-amber-950 px-3.5 py-1 rounded-full border border-amber-300">
                  झारखंड प्राथमिक शिक्षा विभाग
                </span>
                <h3 className="text-2xl sm:text-3xl font-black text-forest-900 dark:text-white">
                  मातृभाषा दक्षता सम्मान पत्र
                </h3>
                <p className="text-xs text-stone-500 dark:text-stone-400">
                  यह बाल उपलब्धि प्रमाण पत्र सहर्ष प्रदान किया जाता है:
                </p>
              </div>

              <div className="p-4 rounded-2xl bg-amber-50 dark:bg-[#1A3626] border-2 border-amber-300 dark:border-amber-700">
                <h4 className="text-2xl font-black text-amber-900 dark:text-amber-200">
                  {safeStudent.name}
                </h4>
                <p className="text-xs font-extrabold text-amber-800 dark:text-amber-300 mt-1">
                  {safeStudent.grade} • रोल संख्या: {safeStudent.roll} • मातृभाषा: {safeStudent.lang}
                </p>
              </div>

              <p className="text-xs sm:text-sm text-stone-700 dark:text-stone-300 leading-relaxed font-medium">
                प्रमाणित किया जाता है कि विद्यार्थी ने अपनी मातृभाषा <strong>{safeStudent.lang}</strong> एवं <strong>हिंदी</strong> में शब्द ज्ञान, सचित्र कहानियाँ, एवं कार्यपत्रक सफलतापूर्वक पूर्ण कर <strong className="text-amber-600 dark:text-amber-400 font-bold">{stars} सितारे</strong> अर्जित किए हैं।
              </p>

              <div className="flex items-center justify-between pt-4 border-t border-stone-200 dark:border-[#224734] text-xs font-bold text-stone-600 dark:text-stone-400">
                <div>
                  <span>दिनांक: {new Date().toLocaleDateString('hi-IN')}</span>
                </div>
                <div className="text-right">
                  <span className="block text-forest-800 dark:text-emerald-300 font-black">अनन्या शर्मा</span>
                  <span className="text-[10px]">प्राथमिक शिक्षिका (भाषासेतु AI)</span>
                </div>
              </div>

              <button
                onClick={() => window.print()}
                className="w-full py-3 bg-[#1B4D36] hover:bg-[#153E2B] text-white font-black text-sm rounded-xl shadow-md transition-all cursor-pointer flex items-center justify-center gap-2"
              >
                <Printer className="w-4 h-4 text-amber-300" />
                <span>प्रमाण पत्र प्रिंट / सेव करें (Print Certificate)</span>
              </button>
            </div>
          </div>
        )}

      </main>

      {/* Footer */}
      <footer className="py-4 text-center text-xs text-stone-500 dark:text-stone-500 border-t border-stone-200/80 dark:border-[#1E3B2C] mt-8">
        BhashaSetu AI • बाल शिक्षा व मातृभाषा सशक्तिकरण पोर्टल
      </footer>
      </div>
    </div>
  );
}
