import React, { useState, useEffect } from "react";
import Sidebar from "./components/Sidebar";
import TopNavbar from "./components/TopNavbar";

// Screens
import SplashScreen from "./screens/01_SplashScreen";
import TeacherLogin from "./screens/02_TeacherLogin";
import StudentLogin from "./screens/02_StudentLogin";
import LanguageSelect from "./screens/03_LanguageSelect";
import TeacherDashboard from "./screens/04_TeacherDashboard";
import StudentDashboard from "./screens/05_StudentDashboard";
import LiveTranslate from "./screens/05_LiveTranslate";
import TextbookScanner from "./screens/06_TextbookScanner";
import WorksheetGenerator from "./screens/07_WorksheetGenerator";
import Flashcards from "./screens/08_Flashcards";
import Curriculum from "./screens/09_Curriculum";
import StudentProgress from "./screens/10_StudentProgress";
import TeachBack from "./screens/11_TeachBack";
import OfflineLearning from "./screens/12_OfflineLearning";
import Settings from "./screens/13_Settings";
import StudentLiveClassroom from "./screens/05_StudentLiveClassroom";
import QuizGenerator from "./screens/07_QuizGenerator";
import ErrorBoundary from "./components/ErrorBoundary";

import {
  TEACHER_PROFILE,
  INITIAL_COMPLETED_WORKSHEETS,
  SAMPLE_WORKSHEETS,
  INITIAL_DAILY_QUIZZES,
  INITIAL_COMPLETED_QUIZZES
} from "./data/bhashaData";

export const SCREEN_TITLES = {
  splash: "स्प्लैश स्क्रीन",
  login: "शिक्षक लॉगिन",
  "student-login": "विद्यार्थी लॉगिन",
  "student-dashboard": "विद्यार्थी पोर्टल",
  "language-select": "भाषा चयन",
  dashboard: "शिक्षक डैशबोर्ड",
  "live-translate": "लाइव अनुवाद",
  "student-live-classroom": "ᱞᱟᱭᱤᱵᱽ ᱪᱟᱱᱟᱪ / लाइव कक्षा",
  "live-classroom": "ᱞᱟᱭᱤᱵᱽ ᱪᱟᱱᱟᱪ / लाइव कक्षा",
  "textbook-scanner": "पाठ्यपुस्तक स्कैनर",
  "worksheet-generator": "कार्यपत्रक बनाएं",
  "quiz-generator": "दैनिक क्विज़ बनाएं",
  flashcards: "शब्द कार्ड",
  curriculum: "पाठ्यक्रम",
  "student-progress": "विद्यार्थी प्रगति",
  "teach-back": "सीख-सुनाओ",
  "offline-learning": "ऑफलाइन अध्यापन",
  settings: "सेटिंग्स",
};

export default function App() {
  // Role-based state: 'guest' (landing/logins), 'teacher' (teacher tools), 'student' (student learning portal)
  const [userRole, setUserRole] = useState("guest");
  const [activeScreen, setActiveScreen] = useState("splash");
  const [selectedLanguage, setSelectedLanguage] = useState("santhali");
  const [isOffline, setIsOffline] = useState(true);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [currentUser, setCurrentUser] = useState(TEACHER_PROFILE);
  const [currentStudent, setCurrentStudent] = useState({
    id: "ravi",
    name: "रवि मुर्मू",
    grade: "कक्षा 2",
    roll: "04",
    lang: "संथाली",
    langKey: "santhali",
    avatar: "👦",
    stars: 18,
  });

  // Global Worksheet State (Jharkhand JAC Medium Syllabus & Approval Workflow with localStorage persistence)
  const [publishedWorksheets, setPublishedWorksheets] = useState(() => {
    if (typeof window !== "undefined") {
      const saved = localStorage.getItem("bhashasetu-published-worksheets");
      if (saved) {
        try {
          const parsed = JSON.parse(saved);
          if (Array.isArray(parsed) && parsed.length > 0) return parsed;
        } catch (e) {}
      }
    }
    return [
      {
        ...SAMPLE_WORKSHEETS["class2-hindi"],
        publishedAt: new Date().toISOString().split("T")[0],
        teacherName: "अनन्या शर्मा",
        classLevel: "कक्षा 2"
      },
      {
        ...SAMPLE_WORKSHEETS["class1-hindi"],
        publishedAt: new Date().toISOString().split("T")[0],
        teacherName: "अनन्या शर्मा",
        classLevel: "कक्षा 1"
      },
      {
        ...SAMPLE_WORKSHEETS["class3-hindi"],
        publishedAt: new Date().toISOString().split("T")[0],
        teacherName: "अनन्या शर्मा",
        classLevel: "कक्षा 3"
      }
    ];
  });

  const [completedWorksheets, setCompletedWorksheets] = useState(() => {
    if (typeof window !== "undefined") {
      const saved = localStorage.getItem("bhashasetu-completed-worksheets");
      if (saved) {
        try {
          const parsed = JSON.parse(saved);
          if (Array.isArray(parsed) && parsed.length > 0) return parsed;
        } catch (e) {}
      }
    }
    return INITIAL_COMPLETED_WORKSHEETS;
  });

  // Global Daily Quiz State (Per Class JAC Medium Syllabus with localStorage persistence)
  const [publishedQuizzes, setPublishedQuizzes] = useState(() => {
    if (typeof window !== "undefined") {
      const saved = localStorage.getItem("bhashasetu-published-quizzes");
      if (saved) {
        try {
          const parsed = JSON.parse(saved);
          if (Array.isArray(parsed) && parsed.length > 0) return parsed;
        } catch (e) {}
      }
    }
    return INITIAL_DAILY_QUIZZES;
  });

  const [completedQuizzes, setCompletedQuizzes] = useState(() => {
    if (typeof window !== "undefined") {
      const saved = localStorage.getItem("bhashasetu-completed-quizzes");
      if (saved) {
        try {
          const parsed = JSON.parse(saved);
          if (Array.isArray(parsed) && parsed.length > 0) return parsed;
        } catch (e) {}
      }
    }
    return INITIAL_COMPLETED_QUIZZES;
  });

  useEffect(() => {
    if (typeof window !== "undefined") {
      localStorage.setItem("bhashasetu-published-worksheets", JSON.stringify(publishedWorksheets));
    }
  }, [publishedWorksheets]);

  useEffect(() => {
    if (typeof window !== "undefined") {
      localStorage.setItem("bhashasetu-completed-worksheets", JSON.stringify(completedWorksheets));
    }
  }, [completedWorksheets]);

  useEffect(() => {
    if (typeof window !== "undefined") {
      localStorage.setItem("bhashasetu-published-quizzes", JSON.stringify(publishedQuizzes));
    }
  }, [publishedQuizzes]);

  useEffect(() => {
    if (typeof window !== "undefined") {
      localStorage.setItem("bhashasetu-completed-quizzes", JSON.stringify(completedQuizzes));
    }
  }, [completedQuizzes]);

  const handlePublishWorksheet = (newWorksheet) => {
    setPublishedWorksheets((prev) => {
      // Replace existing worksheet with same ID or prepend
      const filtered = prev.filter((w) => w.id !== newWorksheet.id);
      return [newWorksheet, ...filtered];
    });
  };

  const handleCompleteWorksheet = (submissionRecord) => {
    setCompletedWorksheets((prev) => [submissionRecord, ...prev]);
  };

  const handlePublishQuiz = (newQuiz) => {
    setPublishedQuizzes((prev) => {
      const filtered = prev.filter((q) => q.id !== newQuiz.id);
      return [newQuiz, ...filtered];
    });
  };

  const handleCompleteQuiz = (submissionRecord) => {
    setCompletedQuizzes((prev) => [submissionRecord, ...prev]);
  };

  // Dark Mode state with persistence in localStorage
  const [isDarkMode, setIsDarkMode] = useState(() => {
    if (typeof window !== "undefined") {
      const saved = localStorage.getItem("bhashasetu-theme");
      if (saved) return saved === "dark";
      return window.matchMedia("(prefers-color-scheme: dark)").matches;
    }
    return false;
  });

  // Sync Dark Mode with DOM classes
  useEffect(() => {
    const root = document.documentElement;
    const body = document.body;
    if (isDarkMode) {
      root.classList.add("dark");
      body.classList.add("dark");
      localStorage.setItem("bhashasetu-theme", "dark");
    } else {
      root.classList.remove("dark");
      body.classList.remove("dark");
      localStorage.setItem("bhashasetu-theme", "light");
    }
  }, [isDarkMode]);

  const toggleDarkMode = (val) => {
    setIsDarkMode((prev) => {
      const nextVal = typeof val === "boolean" ? val : !prev;
      if (typeof window !== "undefined") {
        if (nextVal) {
          document.documentElement.classList.add("dark");
          document.body.classList.add("dark");
          localStorage.setItem("bhashasetu-theme", "dark");
        } else {
          document.documentElement.classList.remove("dark");
          document.body.classList.remove("dark");
          localStorage.setItem("bhashasetu-theme", "light");
        }
      }
      return nextVal;
    });
  };

  const handleTeacherNavigate = (screenId) => {
    // Only allow teacher-permitted screens
    const allowedTeacherScreens = [
      "dashboard",
      "live-translate",
      "student-live-classroom",
      "live-classroom",
      "textbook-scanner",
      "worksheet-generator",
      "quiz-generator",
      "flashcards",
      "curriculum",
      "student-progress",
      "teach-back",
      "offline-learning",
      "settings",
      "language-select",
    ];
    if (allowedTeacherScreens.includes(screenId)) {
      setActiveScreen(screenId);
    } else {
      setActiveScreen("dashboard");
    }
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const handleTeacherLoginSuccess = (profile) => {
    setCurrentUser(profile || TEACHER_PROFILE);
    setUserRole("teacher");
    setActiveScreen("dashboard");
  };

  const handleStudentLoginSuccess = (studentObj) => {
    const safeObj = (studentObj && studentObj.name) ? studentObj : {
      id: "ravi",
      name: "रवि मुर्मू",
      grade: "कक्षा 2",
      roll: "04",
      lang: "संथाली",
      langKey: "santhali",
      avatar: "👦",
      stars: 18,
      role: "student"
    };
    setCurrentStudent(safeObj);
    setUserRole("student");
    setActiveScreen("student-dashboard");
  };

  const handleLogout = () => {
    setUserRole("guest");
    setActiveScreen("splash");
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  // ==========================================
  // VIEW 1: STUDENT PORTAL (Strictly Isolated - Santali Only Audio)
  // ==========================================
  if (userRole === "student" || activeScreen === "student-dashboard" || activeScreen === "student-login") {
    if (typeof window !== "undefined") {
      window.__isStudentPortalActive = true;
    }
    if (activeScreen === "student-login") {
      return (
        <StudentLogin
          onLogin={handleStudentLoginSuccess}
          onBack={() => setActiveScreen("splash")}
          isDarkMode={isDarkMode}
          onToggleDarkMode={toggleDarkMode}
        />
      );
    }
    return (
      <ErrorBoundary>
        <StudentDashboard
          student={currentStudent || {
            id: "ravi",
            name: "रवि मुर्मू",
            grade: "कक्षा 2",
            roll: "04",
            lang: "संथाली",
            langKey: "santhali",
            avatar: "👦",
            stars: 18,
          }}
          currentLanguage={selectedLanguage || "santhali"}
          onLogout={handleLogout}
          isDarkMode={isDarkMode}
          onToggleDarkMode={toggleDarkMode}
          publishedWorksheets={publishedWorksheets || []}
          onCompleteWorksheet={handleCompleteWorksheet}
          publishedQuizzes={publishedQuizzes || []}
          onCompleteQuiz={handleCompleteQuiz}
        />
      </ErrorBoundary>
    );
  }

  if (typeof window !== "undefined") {
    window.__isStudentPortalActive = false;
  }

  // ==========================================
  // VIEW 2: GUEST SCREENS (Splash & Logins)
  // ==========================================
  if (userRole === "guest") {
    if (activeScreen === "splash") {
      return (
        <SplashScreen
          onTeacherLogin={() => setActiveScreen("login")}
          onStudentLogin={() => setActiveScreen("student-login")}
          onStart={() => {
            // Default quick start enters teacher demo
            setCurrentUser(TEACHER_PROFILE);
            setUserRole("teacher");
            setActiveScreen("dashboard");
          }}
          onLogin={() => setActiveScreen("login")}
          selectedLanguage={selectedLanguage}
          onSelectLanguage={setSelectedLanguage}
          isDarkMode={isDarkMode}
          onToggleDarkMode={toggleDarkMode}
        />
      );
    }

    if (activeScreen === "login") {
      return (
        <TeacherLogin
          onLogin={handleTeacherLoginSuccess}
          onBack={() => setActiveScreen("splash")}
          isDarkMode={isDarkMode}
          onToggleDarkMode={toggleDarkMode}
        />
      );
    }

    if (activeScreen === "student-login") {
      return (
        <StudentLogin
          onLogin={handleStudentLoginSuccess}
          onBack={() => setActiveScreen("splash")}
          isDarkMode={isDarkMode}
          onToggleDarkMode={toggleDarkMode}
        />
      );
    }
  }

  // ==========================================
  // VIEW 3: TEACHER WORKSPACE (Strictly Isolated)
  // ==========================================
  return (
    <div className="min-h-screen bg-[#FAF7F0] dark:bg-[#0E1F17] text-stone-800 dark:text-[#E8F3ED] font-sans flex flex-col selection:bg-forest-700 selection:text-white transition-colors duration-300">
      <div className="flex-1 flex overflow-hidden">
        {/* Left Sidebar for Teacher */}
        <Sidebar
          activeScreen={activeScreen}
          onNavigate={handleTeacherNavigate}
          onLogout={handleLogout}
          isOpenMobile={mobileMenuOpen}
          onCloseMobile={() => setMobileMenuOpen(false)}
        />

        {/* Right Main Content Panel */}
        <div className="flex-1 flex flex-col min-w-0 overflow-y-auto">
          {/* Top Bar with Screen Title, Theme Toggle, Language & Profile Avatar */}
          <TopNavbar
            activeScreenTitle={SCREEN_TITLES[activeScreen] || "भाषासेतु एआई"}
            selectedLanguage={selectedLanguage}
            onSelectLanguage={setSelectedLanguage}
            onOpenMobileMenu={() => setMobileMenuOpen(true)}
            onNavigate={handleTeacherNavigate}
            onLogout={handleLogout}
            isDarkMode={isDarkMode}
            onToggleDarkMode={toggleDarkMode}
            currentUser={currentUser}
          />

          {/* Active Teacher Screen View */}
          <main className="flex-1 bg-[#FAF7F0] dark:bg-[#0E1F17] transition-colors duration-300">
            {activeScreen === "dashboard" && (
              <TeacherDashboard
                onNavigate={handleTeacherNavigate}
                selectedLanguage={selectedLanguage}
                onSelectLanguage={setSelectedLanguage}
                completedWorksheets={completedWorksheets}
                publishedWorksheets={publishedWorksheets}
                completedQuizzes={completedQuizzes}
                publishedQuizzes={publishedQuizzes}
                currentUser={currentUser}
              />
            )}

            {activeScreen === "live-translate" && (
              <LiveTranslate
                selectedLanguage={selectedLanguage}
                onSelectLanguage={setSelectedLanguage}
                onNavigate={handleTeacherNavigate}
              />
            )}

            {(activeScreen === "student-live-classroom" || activeScreen === "live-classroom") && (
              <ErrorBoundary>
                <StudentLiveClassroom
                  student={currentStudent}
                  isDarkMode={isDarkMode}
                  onBack={() => setActiveScreen("dashboard")}
                />
              </ErrorBoundary>
            )}

            {activeScreen === "textbook-scanner" && (
              <TextbookScanner
                selectedLanguage={selectedLanguage}
                onNavigate={handleTeacherNavigate}
              />
            )}

            {activeScreen === "worksheet-generator" && (
              <WorksheetGenerator
                onPublishWorksheet={handlePublishWorksheet}
                publishedWorksheets={publishedWorksheets}
              />
            )}

            {activeScreen === "quiz-generator" && (
              <QuizGenerator
                onPublishQuiz={handlePublishQuiz}
                publishedQuizzes={publishedQuizzes}
                completedQuizzes={completedQuizzes}
              />
            )}

            {/* Page 8 / शब्द कार्ड matching Image 2 */}
            {activeScreen === "flashcards" && (
              <Flashcards selectedLanguage={selectedLanguage} />
            )}

            {activeScreen === "curriculum" && (
              <Curriculum onNavigate={handleTeacherNavigate} />
            )}

            {activeScreen === "student-progress" && (
              <StudentProgress onNavigate={handleTeacherNavigate} />
            )}

            {activeScreen === "teach-back" && (
              <TeachBack />
            )}

            {activeScreen === "offline-learning" && (
              <OfflineLearning
                isOffline={isOffline}
                onToggleOffline={() => setIsOffline(!isOffline)}
              />
            )}

            {activeScreen === "settings" && (
              <Settings
                selectedLanguage={selectedLanguage}
                onSelectLanguage={setSelectedLanguage}
                onLogout={handleLogout}
                isDarkMode={isDarkMode}
                onToggleDarkMode={toggleDarkMode}
                currentUser={currentUser}
              />
            )}

            {activeScreen === "language-select" && (
              <LanguageSelect
                selectedLanguage={selectedLanguage}
                onSelectLanguage={setSelectedLanguage}
                onContinue={() => setActiveScreen("dashboard")}
                onBack={() => setActiveScreen("dashboard")}
              />
            )}
          </main>
        </div>
      </div>
    </div>
  );
}
