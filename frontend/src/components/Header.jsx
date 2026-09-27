import React from 'react';
import { Wifi, WifiOff, MapPin, UserCheck, GraduationCap, Home } from 'lucide-react';
import { BhashaSetuBridgeLogo, AuthenticTribalDancers } from './TribalArt';

export default function Header({ 
  offlineMode, 
  setOfflineMode,
  userRole,
  setUserRole,
  onNavigate
}) {
  return (
    <header className="bg-white border-b border-amber-200/80 shadow-xs sticky top-0 z-50 select-none">
      <div className="max-w-7xl mx-auto px-3 sm:px-6 py-2.5">
        <div className="flex flex-col sm:flex-row items-center justify-between gap-3">
          
          {/* Logo & Title */}
          <div 
            className="flex items-center gap-2.5 cursor-pointer group" 
            onClick={() => onNavigate('splash')}
            title="स्प्लैश स्क्रीन पर जाएं"
          >
            <BhashaSetuBridgeLogo className="w-12 h-9 flex-shrink-0" />
            <div>
              <div className="flex items-center gap-2">
                <h1 className="text-xl sm:text-2xl font-black text-[#1b5e20] tracking-tight leading-none group-hover:text-emerald-800 transition-colors">
                  भाषा सेतु एआई
                </h1>
                <span className="text-xs bg-emerald-100 text-emerald-900 font-extrabold px-2 py-0.5 rounded-full border border-emerald-300">
                  प्राथमिक शिक्षा
                </span>
                <span className="text-xs bg-amber-100 text-amber-900 font-bold px-2 py-0.5 rounded-full border border-amber-300 hidden sm:inline-block">
                  भाषा सेतु
                </span>
              </div>
              <p className="text-xs text-stone-600 font-semibold mt-0.5">
                प्राथमिक विद्यालय छात्रों के लिए मातृभाषा आधारित शिक्षा और अनुवाद ऐप
              </p>
            </div>
          </div>

          {/* Right Controls: Offline Mode, Location, Role Switcher */}
          <div className="flex items-center gap-2.5 flex-wrap justify-center">
            {/* Offline Mode Toggle Badge */}
            <button
              onClick={() => setOfflineMode(!offlineMode)}
              className={`flex items-center gap-1.5 px-3 py-1.5 rounded-xl text-xs font-bold border transition-all ${
                offlineMode 
                  ? 'bg-emerald-50 text-emerald-800 border-emerald-300 shadow-2xs' 
                  : 'bg-blue-50 text-blue-800 border-blue-300'
              }`}
              title="क्लिक करके ऑफलाइन/ऑनलाइन मोड बदलें"
            >
              {offlineMode ? (
                <>
                  <Wifi className="w-3.5 h-3.5 text-emerald-700" />
                  <span>ऑफलाइन मोड (इंटरनेट मुक्त)</span>
                </>
              ) : (
                <>
                  <WifiOff className="w-3.5 h-3.5 text-blue-700" />
                  <span>ऑनलाइन मोड</span>
                </>
              )}
            </button>

            {/* Location Tag */}
            <div className="flex items-center gap-1.5 px-3 py-1.5 bg-stone-50 text-stone-800 border border-stone-200 rounded-xl text-xs font-bold shadow-2xs">
              <MapPin className="w-3.5 h-3.5 text-[#1b5e20]" />
              <span>झारखंड</span>
            </div>

            {/* Role Quick Switcher */}
            <div className="flex items-center gap-1 bg-stone-100 p-0.5 rounded-xl border border-stone-200 text-xs font-bold">
              <button
                onClick={() => {
                  setUserRole('teacher');
                  onNavigate('teacher-dashboard');
                }}
                className={`flex items-center gap-1 px-2.5 py-1 rounded-lg transition-all ${
                  userRole === 'teacher' ? 'bg-[#1b5e20] text-white shadow-xs' : 'text-stone-600 hover:text-stone-900'
                }`}
              >
                <UserCheck className="w-3 h-3" />
                <span>शिक्षक</span>
              </button>
              <button
                onClick={() => {
                  setUserRole('student');
                  onNavigate('student-dashboard');
                }}
                className={`flex items-center gap-1 px-2.5 py-1 rounded-lg transition-all ${
                  userRole === 'student' ? 'bg-[#ea580c] text-white shadow-xs' : 'text-stone-600 hover:text-stone-900'
                }`}
              >
                <GraduationCap className="w-3 h-3" />
                <span>छात्र</span>
              </button>
            </div>

            {/* Tribal Dancers Artwork in Header */}
            <div className="hidden lg:block pl-2 border-l border-amber-200">
              <AuthenticTribalDancers className="h-8" />
            </div>
          </div>

        </div>
      </div>
    </header>
  );
}
