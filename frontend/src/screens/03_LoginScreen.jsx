import React, { useState } from 'react';
import { 
  User, 
  Lock, 
  Eye, 
  EyeOff, 
  ArrowLeft, 
  Wifi,
  WifiOff, 
  CheckCircle2, 
  GraduationCap, 
  UserCheck,
  ShieldCheck,
  RotateCw
} from 'lucide-react';
import { TEACHER_DATA } from '../data/mockData';

export default function LoginScreen({ onLogin, onBack, initialRole = 'teacher' }) {
  const [activeTab, setActiveTab] = useState('login'); // 'login' | 'profile'
  const [role, setRole] = useState(initialRole);
  const [username, setUsername] = useState('9835145290');
  const [password, setPassword] = useState('shikshak@123');
  const [showPassword, setShowPassword] = useState(false);
  const [isRegistering, setIsRegistering] = useState(false);
  const [isSyncingProfile, setIsSyncingProfile] = useState(false);
  const [syncSuccess, setSyncSuccess] = useState(false);

  const handleSubmit = (e) => {
    e?.preventDefault();
    onLogin?.(role, username);
  };

  const handleDemoFill = (selectedRole) => {
    setRole(selectedRole);
    if (selectedRole === 'teacher') {
      setUsername('9835145290');
      setPassword('shikshak@123');
    } else {
      setUsername('छात्र_बिरसा');
      setPassword('chhatra@123');
    }
  };

  const handleSyncProfile = () => {
    setIsSyncingProfile(true);
    setTimeout(() => {
      setIsSyncingProfile(false);
      setSyncSuccess(true);
      setTimeout(() => setSyncSuccess(false), 2500);
    }, 1000);
  };

  return (
    <div className="flex-1 flex flex-col justify-between p-4 sm:p-5 bg-[#fdfbf7] text-stone-800 h-full">
      <div className="space-y-4 overflow-y-auto">
        {/* Top Header Row with Back Button and Profile Tab Toggle */}
        <div className="flex items-center justify-between">
          <button 
            onClick={onBack}
            className="p-1.5 rounded-full hover:bg-stone-200/60 text-stone-700 transition-colors"
          >
            <ArrowLeft className="w-5 h-5" />
          </button>
          
          <div className="bg-stone-200/80 p-0.5 rounded-xl flex items-center text-sm font-bold">
            <button
              onClick={() => setActiveTab('login')}
              className={`px-3 py-1 rounded-lg transition-all ${
                activeTab === 'login'
                  ? 'bg-[#75BDE0] text-white shadow-xs'
                  : 'text-stone-700 hover:text-stone-900'
              }`}
            >
              लॉगिन
            </button>
            <button
              onClick={() => setActiveTab('profile')}
              className={`px-3 py-1 rounded-lg transition-all ${
                activeTab === 'profile'
                  ? 'bg-[#75BDE0] text-white shadow-xs'
                  : 'text-stone-700 hover:text-stone-900'
              }`}
            >
              प्रोफ़ाइल
            </button>
          </div>
        </div>

        {activeTab === 'login' ? (
          /* =================== POSTER SCREEN 3 MATCH =================== */
          <div className="space-y-4 pt-1">
            {/* Title & Subtitle */}
            <div className="text-center space-y-1.5">
              <h2 className="text-2xl sm:text-3xl font-bold text-[#2D4B5A]">
                {isRegistering ? 'नया खाता बनाएं' : 'लॉगिन करें'}
              </h2>
              <p className="text-sm text-stone-600 font-medium">
                शिक्षक लॉगिन करें या नया खाता बनाएं
              </p>
            </div>

            {/* Quick Demo Pre-fill Pill (For easy teacher / student switching) */}
            <div className="flex items-center justify-center gap-2.5">
              <button
                type="button"
                onClick={() => handleDemoFill('teacher')}
                className={`text-xs sm:text-sm font-bold px-3.5 py-1 rounded-full border transition-all ${
                  role === 'teacher'
                    ? 'bg-[#F8D49B]/50 text-[#8A5D15] border-[#F8BC9A]'
                    : 'bg-white text-stone-600 border-stone-200'
                }`}
              >
                👨‍🏫 शिक्षक
              </button>
              <button
                type="button"
                onClick={() => handleDemoFill('student')}
                className={`text-xs sm:text-sm font-bold px-3.5 py-1 rounded-full border transition-all ${
                  role === 'student'
                    ? 'bg-[#F99B9B]/25 text-[#9C3838] border-[#F99B9B]/60'
                    : 'bg-white text-stone-600 border-stone-200'
                }`}
              >
                👦 छात्र
              </button>
            </div>

            {/* Login Form */}
            <form onSubmit={handleSubmit} className="space-y-3.5 pt-1">
              {/* Input 1: मोबाइल नंबर / यूजरनेम */}
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-stone-400">
                  <User className="w-4 h-4" />
                </div>
                <input
                  type="text"
                  value={username}
                  onChange={(e) => setUsername(e.target.value)}
                  placeholder="मोबाइल नंबर / यूजरनेम"
                  className="w-full pl-10 pr-3 py-3 bg-white border border-stone-300 rounded-xl text-sm font-medium focus:ring-2 focus:ring-[#75BDE0] focus:border-[#75BDE0] outline-none shadow-xs text-stone-800"
                  required
                />
              </div>

              {/* Input 2: पासवर्ड */}
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-stone-400">
                  <Lock className="w-4 h-4" />
                </div>
                <input
                  type={showPassword ? 'text' : 'password'}
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="पासवर्ड"
                  className="w-full pl-10 pr-10 py-3 bg-white border border-stone-300 rounded-xl text-sm font-medium focus:ring-2 focus:ring-[#75BDE0] focus:border-[#75BDE0] outline-none shadow-xs text-stone-800"
                  required
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute inset-y-0 right-0 pr-3.5 flex items-center text-stone-400 hover:text-stone-600"
                >
                  {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                </button>
              </div>

              {/* Forgot Password Link */}
              <div className="flex justify-start">
                <button
                  type="button"
                  onClick={() => alert('पासवर्ड रीसेट लिंक आपके पंजीकृत मोबाइल पर भेजा गया है।')}
                  className="text-xs sm:text-sm font-semibold text-[#75BDE0] hover:underline"
                >
                  पासवर्ड भूल गए?
                </button>
              </div>

              {/* Solid Sky Blue Login Button */}
              <button
                type="submit"
                className="w-full py-3 px-4 bg-[#75BDE0] hover:bg-[#5baed6] active:scale-[0.99] text-white font-bold rounded-xl shadow-xs transition-all text-sm sm:text-base mt-1"
              >
                {isRegistering ? 'खाता बनाएं' : 'लॉगिन करें'}
              </button>

              {/* "या" separator */}
              <div className="flex items-center my-2">
                <div className="flex-1 border-t border-stone-200" />
                <span className="px-3 text-xs sm:text-sm text-stone-400 font-medium">या</span>
                <div className="flex-1 border-t border-stone-200" />
              </div>

              {/* Outlined New Account Button */}
              <button
                type="button"
                onClick={() => setIsRegistering(!isRegistering)}
                className="w-full py-2.5 px-4 bg-white hover:bg-[#F8D49B]/30 border-2 border-[#75BDE0] text-[#75BDE0] font-bold rounded-xl transition-all text-xs sm:text-sm active:scale-[0.99]"
              >
                {isRegistering ? 'लॉगिन स्क्रीन पर वापस जाएं' : 'नया खाता बनाएं'}
              </button>
            </form>
          </div>
        ) : (
          /* =================== TEACHER PROFILE TAB =================== */
          <div className="space-y-3.5 pt-1">
            <div className="bg-white rounded-2xl border border-stone-200 shadow-xs p-4 space-y-3">
              <div className="flex items-center gap-3">
                <div className="w-14 h-14 rounded-full bg-[#F8D49B]/40 border-2 border-[#F8BC9A] flex items-center justify-center text-2xl shadow-xs shrink-0">
                  {TEACHER_DATA.avatar}
                </div>
                <div>
                  <div className="flex items-center gap-1.5">
                    <h3 className="font-extrabold text-base sm:text-lg text-stone-900 leading-tight">
                      {TEACHER_DATA.name}
                    </h3>
                    <ShieldCheck className="w-4 h-4 text-[#75BDE0]" />
                  </div>
                  <p className="text-xs sm:text-sm font-semibold text-[#2D4B5A]">
                    {TEACHER_DATA.title}
                  </p>
                  <p className="text-xs text-stone-500 font-medium">
                    {TEACHER_DATA.experience}
                  </p>
                </div>
              </div>

              <div className="grid grid-cols-2 gap-2 text-xs sm:text-sm pt-2 border-t border-stone-100">
                <div className="bg-stone-50 p-2 rounded-lg">
                  <span className="text-xs text-stone-500 block">विद्यालय</span>
                  <span className="font-bold text-stone-800">{TEACHER_DATA.school}</span>
                </div>
                <div className="bg-stone-50 p-2 rounded-lg">
                  <span className="text-xs text-stone-500 block">स्थान</span>
                  <span className="font-bold text-stone-800">{TEACHER_DATA.district}</span>
                </div>
              </div>

              <div className="pt-2">
                <button
                  onClick={handleSyncProfile}
                  disabled={isSyncingProfile}
                  className="w-full py-2.5 px-3 bg-[#75BDE0] hover:bg-[#5baed6] text-white rounded-xl text-xs sm:text-sm font-bold transition-all flex items-center justify-center gap-1.5 shadow-xs"
                >
                  <RotateCw className={`w-3.5 h-3.5 ${isSyncingProfile ? 'animate-spin' : ''}`} />
                  <span>{isSyncingProfile ? 'सिंक हो रहा...' : syncSuccess ? 'सिंक पूर्ण!' : 'ऑफलाइन पहचान सत्यापन'}</span>
                </button>
              </div>
            </div>
          </div>
        )}
      </div>

      {/* Bottom Offline Badge matching the poster */}
      <div className="pt-4 flex justify-center">
        <div className="inline-flex items-center gap-2 px-4 py-2 bg-white border border-stone-200 rounded-full shadow-2xs text-xs sm:text-sm font-bold text-stone-700">
          <Wifi className="w-4 h-4 text-stone-500" />
          <span>ऑफलाइन मोड में भी उपलब्ध</span>
        </div>
      </div>
    </div>
  );
}
