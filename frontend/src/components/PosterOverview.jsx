import React from 'react';
import PhoneMockup from './PhoneMockup';
import SplashScreen from '../screens/01_SplashScreen';
import LanguageSelect from '../screens/02_LanguageSelect';
import LoginScreen from '../screens/03_LoginScreen';
import TeacherDashboard from '../screens/04_TeacherDashboard';
import StudentDashboard from '../screens/05_StudentDashboard';
import LiveTranslate from '../screens/06_LiveTranslate';
import TranslateResult from '../screens/07_TranslateResult';
import Vocabulary from '../screens/08_Vocabulary';
import LessonPlanner from '../screens/09_LessonPlanner';
import OfflineSettings from '../screens/10_OfflineSettings';
import { BhashaSetuBridgeLogo, AuthenticTribalDancers } from './TribalArt';
import { 
  Wifi, 
  MapPin, 
  Maximize2, 
  Languages, 
  BookOpen, 
  FileText, 
  Layers, 
  Mic, 
  DownloadCloud,
  CheckCircle2
} from 'lucide-react';

export default function PosterOverview({ onSelectScreen, onLogin }) {
  return (
    <div className="w-full max-w-[1780px] mx-auto px-2 sm:px-4 py-3 space-y-6 select-none">
      
      {/* ========================================================
          TOP POSTER HEADER (Matching the top banner of the image)
         ======================================================== */}
      <div className="bg-[#fbf9f4] border border-[#e5dfcf] rounded-2xl p-3 sm:p-4 shadow-xs flex flex-col md:flex-row items-center justify-between gap-4">
        
        {/* Left: Logo & Title */}
        <div className="flex items-center gap-3">
          <BhashaSetuBridgeLogo className="w-16 h-11 text-[#1b5e20] shrink-0" />
          <div>
            <h1 className="text-2xl sm:text-3xl font-black text-[#1b5e20] tracking-tight leading-none">
              Bhasha Setu AI
            </h1>
            <p className="text-xs sm:text-sm font-bold text-stone-800 mt-1">
              HOV स्कूल छात्रों के लिए मातृभाषा आधारित शिक्षा और अनुवाद ऐप
            </p>
          </div>
        </div>

        {/* Center-Right: Offline Badge & Location */}
        <div className="flex items-center gap-4 flex-wrap justify-center">
          {/* Offline Mode Badge */}
          <div className="flex items-center gap-2 bg-white/90 border border-stone-300 px-4 py-2 rounded-xl shadow-2xs text-xs font-bold text-stone-800">
            <Wifi className="w-4 h-4 text-stone-600" />
            <div>
              <span>ऑफलाइन मोड</span>
              <span className="text-xs text-stone-500 block font-normal">(इंटरनेट की आवश्यकता नहीं)</span>
            </div>
          </div>

          {/* Jharkhand, India Badge */}
          <div className="flex items-center gap-1.5 bg-white/90 border border-stone-300 px-3.5 py-2 rounded-xl shadow-2xs text-xs font-bold text-stone-800">
            <MapPin className="w-4 h-4 text-[#1b5e20]" />
            <span>झारखंड, भारत</span>
          </div>

          {/* Traditional Dancers Artwork on Right */}
          <div className="hidden lg:block pl-2">
            <AuthenticTribalDancers className="h-11" />
          </div>
        </div>
      </div>

      {/* ========================================================
          ROW 1: SCREENS 1 TO 5 (Matching Top Row in the image)
         ======================================================== */}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 xl:grid-cols-5 gap-5 justify-items-center">
        
        {/* 1. स्प्लैश स्क्रीन */}
        <div className="relative group w-full max-w-[330px]">
          <PhoneMockup
            screenNumber="1"
            title="स्प्लैश स्क्रीन"
            subtitle="ऐप खोलने पर स्प्लैश स्क्रीन दिखेगी"
          >
            <SplashScreen onNext={() => onSelectScreen('lang-select')} />
          </PhoneMockup>
          <button
            onClick={() => onSelectScreen('splash')}
            className="absolute top-1 right-2 p-1.5 bg-[#1b5e20] hover:bg-[#154d1a] text-white rounded-lg shadow-sm text-xs font-bold flex items-center gap-1 z-20 transition-transform active:scale-95"
            title="पूरा स्क्रीन देखें (इंटरैक्टिव)"
          >
            <Maximize2 className="w-3 h-3" />
          </button>
        </div>

        {/* 2. भाषा चयन */}
        <div className="relative group w-full max-w-[330px]">
          <PhoneMockup
            screenNumber="2"
            title="भाषा चयन"
            subtitle="अपनी भाषा (हिंदी / हो) चुनें"
          >
            <LanguageSelect 
              onSelectLanguage={(lang, role) => {
                onLogin(role, role === 'teacher' ? 'राजेश_शिक्षक' : 'बिरसा_छात्र');
                onSelectScreen(role === 'teacher' ? 'teacher-dashboard' : 'student-dashboard');
              }}
              onBack={() => onSelectScreen('splash')}
            />
          </PhoneMockup>
          <button
            onClick={() => onSelectScreen('lang-select')}
            className="absolute top-1 right-2 p-1.5 bg-[#1b5e20] hover:bg-[#154d1a] text-white rounded-lg shadow-sm text-xs font-bold flex items-center gap-1 z-20 transition-transform active:scale-95"
            title="पूरा स्क्रीन देखें (इंटरैक्टिव)"
          >
            <Maximize2 className="w-3 h-3" />
          </button>
        </div>

        {/* 3. लॉगिन / प्रोफाइल */}
        <div className="relative group w-full max-w-[330px]">
          <PhoneMockup
            screenNumber="3"
            title="लॉगिन / प्रोफाइल"
            subtitle="शिक्षक लॉगिन करें या नया खाता बनाएं"
          >
            <LoginScreen 
              initialRole="teacher"
              onLogin={(role, user) => {
                onLogin(role, user);
                onSelectScreen(role === 'teacher' ? 'teacher-dashboard' : 'student-dashboard');
              }}
              onBack={() => onSelectScreen('lang-select')}
            />
          </PhoneMockup>
          <button
            onClick={() => onSelectScreen('login')}
            className="absolute top-1 right-2 p-1.5 bg-[#1b5e20] hover:bg-[#154d1a] text-white rounded-lg shadow-sm text-xs font-bold flex items-center gap-1 z-20 transition-transform active:scale-95"
            title="पूरा स्क्रीन देखें (इंटरैक्टिव)"
          >
            <Maximize2 className="w-3 h-3" />
          </button>
        </div>

        {/* 4. हिंदी शिक्षक डैशबोर्ड */}
        <div className="relative group w-full max-w-[330px]">
          <PhoneMockup
            screenNumber="4"
            title="हिंदी शिक्षक डैशबोर्ड"
            subtitle="हिंदी शिक्षक का मुख्य डैशबोर्ड"
          >
            <TeacherDashboard 
              onNavigate={(s) => onSelectScreen(s)}
              onLogout={() => onSelectScreen('login')}
            />
          </PhoneMockup>
          <button
            onClick={() => onSelectScreen('teacher-dashboard')}
            className="absolute top-1 right-2 p-1.5 bg-[#1b5e20] hover:bg-[#154d1a] text-white rounded-lg shadow-sm text-xs font-bold flex items-center gap-1 z-20 transition-transform active:scale-95"
            title="पूरा स्क्रीन देखें (इंटरैक्टिव)"
          >
            <Maximize2 className="w-3 h-3" />
          </button>
        </div>

        {/* 5. जनजातीय भाषा (हो) डैशबोर्ड */}
        <div className="relative group w-full max-w-[330px]">
          <PhoneMockup
            screenNumber="5"
            title="जनजातीय भाषा (हो) डैशबोर्ड"
            subtitle="विद्यार्थी का मुख्य डैशबोर्ड"
          >
            <StudentDashboard 
              onNavigate={(s) => onSelectScreen(s)}
            />
          </PhoneMockup>
          <button
            onClick={() => onSelectScreen('student-dashboard')}
            className="absolute top-1 right-2 p-1.5 bg-[#1b5e20] hover:bg-[#154d1a] text-white rounded-lg shadow-sm text-xs font-bold flex items-center gap-1 z-20 transition-transform active:scale-95"
            title="पूरा स्क्रीन देखें (इंटरैक्टिव)"
          >
            <Maximize2 className="w-3 h-3" />
          </button>
        </div>

      </div>

      {/* ========================================================
          ROW 2: SCREENS 6 TO 10 (Matching Bottom Row in the image)
         ======================================================== */}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 xl:grid-cols-5 gap-5 justify-items-center pt-2">
        
        {/* 6. लाइव अनुवाद (मुख्य फीचर) - इनपुट */}
        <div className="relative group w-full max-w-[330px]">
          <PhoneMockup
            screenNumber="6"
            title="लाइव अनुवाद (मुख्य फीचर)"
            subtitle="हिंदी ↔ हो अनुवाद (ऑफलाइन)"
          >
            <LiveTranslate 
              onBack={() => onSelectScreen('teacher-dashboard')}
              forceShowResult={false}
              defaultInput=""
            />
          </PhoneMockup>
          <button
            onClick={() => onSelectScreen('translate')}
            className="absolute top-1 right-2 p-1.5 bg-[#1b5e20] hover:bg-[#154d1a] text-white rounded-lg shadow-sm text-xs font-bold flex items-center gap-1 z-20 transition-transform active:scale-95"
            title="पूरा स्क्रीन देखें (इंटरैक्टिव)"
          >
            <Maximize2 className="w-3 h-3" />
          </button>
        </div>

        {/* 7. लाइव अनुवाद - परिणाम */}
        <div className="relative group w-full max-w-[330px]">
          <PhoneMockup
            screenNumber="7"
            title="लाइव अनुवाद - परिणाम"
            subtitle="अनुवाद परिणाम और सुनें"
          >
            <TranslateResult 
              onBack={() => onSelectScreen('translate')}
            />
          </PhoneMockup>
          <button
            onClick={() => onSelectScreen('translate-result')}
            className="absolute top-1 right-2 p-1.5 bg-[#1b5e20] hover:bg-[#154d1a] text-white rounded-lg shadow-sm text-xs font-bold flex items-center gap-1 z-20 transition-transform active:scale-95"
            title="पूरा स्क्रीन देखें (इंटरैक्टिव)"
          >
            <Maximize2 className="w-3 h-3" />
          </button>
        </div>

        {/* 8. शब्दावली */}
        <div className="relative group w-full max-w-[330px]">
          <PhoneMockup
            screenNumber="8"
            title="शब्दावली"
            subtitle="शब्द सीखें और याद करें"
          >
            <Vocabulary 
              onBack={() => onSelectScreen('teacher-dashboard')}
            />
          </PhoneMockup>
          <button
            onClick={() => onSelectScreen('vocab')}
            className="absolute top-1 right-2 p-1.5 bg-[#1b5e20] hover:bg-[#154d1a] text-white rounded-lg shadow-sm text-xs font-bold flex items-center gap-1 z-20 transition-transform active:scale-95"
            title="पूरा स्क्रीन देखें (इंटरैक्टिव)"
          >
            <Maximize2 className="w-3 h-3" />
          </button>
        </div>

        {/* 9. पाठ योजना बनाना */}
        <div className="relative group w-full max-w-[330px]">
          <PhoneMockup
            screenNumber="9"
            title="पाठ योजना बनाना"
            subtitle="कक्षा के लिए पाठ योजना तैयार करें"
          >
            <LessonPlanner 
              onBack={() => onSelectScreen('teacher-dashboard')}
            />
          </PhoneMockup>
          <button
            onClick={() => onSelectScreen('lesson-plan')}
            className="absolute top-1 right-2 p-1.5 bg-[#1b5e20] hover:bg-[#154d1a] text-white rounded-lg shadow-sm text-xs font-bold flex items-center gap-1 z-20 transition-transform active:scale-95"
            title="पूरा स्क्रीन देखें (इंटरैक्टिव)"
          >
            <Maximize2 className="w-3 h-3" />
          </button>
        </div>

        {/* 10. ऑफलाइन डाउनलोड / सेटिंग्स */}
        <div className="relative group w-full max-w-[330px]">
          <PhoneMockup
            screenNumber="10"
            title="ऑफलाइन डाउनलोड / सेटिंग्स"
            subtitle="कंटेंट डाउनलोड और सेटिंग्स"
          >
            <OfflineSettings 
              onBack={() => onSelectScreen('teacher-dashboard')}
              onLogout={() => onSelectScreen('login')}
            />
          </PhoneMockup>
          <button
            onClick={() => onSelectScreen('offline-settings')}
            className="absolute top-1 right-2 p-1.5 bg-[#1b5e20] hover:bg-[#154d1a] text-white rounded-lg shadow-sm text-xs font-bold flex items-center gap-1 z-20 transition-transform active:scale-95"
            title="पूरा स्क्रीन देखें (इंटरैक्टिव)"
          >
            <Maximize2 className="w-3 h-3" />
          </button>
        </div>

      </div>

      {/* ========================================================
          BOTTOM POSTER BANNER (Matching the bottom bar in the image)
         ======================================================== */}
      <div className="bg-[#fbf9f4] border border-[#e5dfcf] rounded-2xl p-4 shadow-xs flex flex-col lg:flex-row items-center justify-between gap-6 mt-4">
        
        {/* Left: Offline Guarantee Box */}
        <div className="flex items-center gap-3 bg-white/90 border border-stone-300/80 px-4 py-2.5 rounded-xl">
          <Wifi className="w-6 h-6 text-stone-700 shrink-0" />
          <div>
            <h4 className="font-black text-xs sm:text-sm text-stone-900 leading-snug">
              Bhasha Setu AI — पूरी तरह ऑफ़लाइन काम करता है
            </h4>
            <p className="text-xs font-semibold text-stone-500">
              कहीं भी, कभी भी शिक्षा और अनुवाद
            </p>
          </div>
        </div>

        {/* Center: हमारे मुख्य फीचर (6 Core Feature Badges) */}
        <div className="flex flex-col items-center space-y-2">
          <h4 className="text-xs font-bold text-stone-600 uppercase tracking-wider">
            हमारे मुख्य फीचर
          </h4>
          
          <div className="flex items-center gap-3 sm:gap-6 flex-wrap justify-center text-center">
            {/* 1. लाइव अनुवाद */}
            <div className="flex flex-col items-center gap-1">
              <div className="w-9 h-9 rounded-full bg-emerald-100 text-emerald-800 flex items-center justify-center border border-emerald-300">
                <Languages className="w-4 h-4" />
              </div>
              <span className="text-xs font-bold text-stone-700 leading-tight">
                लाइव अनुवाद<br /><span className="text-stone-400 font-normal">(हिंदी ↔ हो)</span>
              </span>
            </div>

            {/* 2. पाठ योजना */}
            <div className="flex flex-col items-center gap-1">
              <div className="w-9 h-9 rounded-full bg-amber-100 text-amber-800 flex items-center justify-center border border-amber-300">
                <BookOpen className="w-4 h-4" />
              </div>
              <span className="text-xs font-bold text-stone-700 leading-tight">
                पाठ योजना
              </span>
            </div>

            {/* 3. कार्यपत्रक जनरेटर */}
            <div className="flex flex-col items-center gap-1">
              <div className="w-9 h-9 rounded-full bg-sky-100 text-sky-800 flex items-center justify-center border border-sky-300">
                <FileText className="w-4 h-4" />
              </div>
              <span className="text-xs font-bold text-stone-700 leading-tight">
                कार्यपत्रक जनरेटर
              </span>
            </div>

            {/* 4. शब्दावली */}
            <div className="flex flex-col items-center gap-1">
              <div className="w-9 h-9 rounded-full bg-indigo-100 text-indigo-800 flex items-center justify-center border border-indigo-300">
                <Layers className="w-4 h-4" />
              </div>
              <span className="text-xs font-bold text-stone-700 leading-tight">
                शब्दावली
              </span>
            </div>

            {/* 5. लाइव ट्रांसलेशन */}
            <div className="flex flex-col items-center gap-1">
              <div className="w-9 h-9 rounded-full bg-rose-100 text-rose-800 flex items-center justify-center border border-rose-300">
                <Mic className="w-4 h-4" />
              </div>
              <span className="text-xs font-bold text-stone-700 leading-tight">
                लाइव ट्रांसलेशन
              </span>
            </div>

            {/* 6. ऑफ़लाइन मोड */}
            <div className="flex flex-col items-center gap-1">
              <div className="w-9 h-9 rounded-full bg-teal-100 text-teal-800 flex items-center justify-center border border-teal-300">
                <DownloadCloud className="w-4 h-4" />
              </div>
              <span className="text-xs font-bold text-stone-700 leading-tight">
                ऑफ़लाइन मोड
              </span>
            </div>
          </div>
        </div>

        {/* Right: Traditional Folk Dancers with Drum */}
        <div className="shrink-0 flex items-center gap-2">
          <AuthenticTribalDancers className="h-12" />
        </div>

      </div>

    </div>
  );
}
