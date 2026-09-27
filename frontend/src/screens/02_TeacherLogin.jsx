import React, { useState } from "react";
import BhashaSetuLogo from "../components/BhashaSetuLogo";
import { TribalLeavesCorner } from "../components/Illustrations";
import { Eye, EyeOff, Lock, Mail, ArrowRight, ArrowLeft, UserCheck, ShieldCheck, GraduationCap, Sun, Moon, AlertCircle, Plus } from "lucide-react";
import { DEFAULT_TEACHERS, getStoredTeachers, saveNewTeacher } from "../data/bhashaData";

export default function TeacherLogin({ onLogin, onRegister, onBack, isDarkMode = false, onToggleDarkMode }) {
  const [teachersList, setTeachersList] = useState(getStoredTeachers());
  const [emailOrUsername, setEmailOrUsername] = useState("ananya");
  const [password, setPassword] = useState("123456");
  const [showPassword, setShowPassword] = useState(false);
  const [rememberMe, setRememberMe] = useState(true);
  const [errorMessage, setErrorMessage] = useState("");
  const [showCreateModal, setShowCreateModal] = useState(false);

  // New Teacher Registration Form State
  const [newTeacherForm, setNewTeacherForm] = useState({
    name: "सुमन मुर्मू (ᱥᱩᱢᱚᱱ ᱢᱩᱨᱢᱩ)",
    username: "suman_m",
    password: "123456",
    school: "राजकीय प्राथमिक विद्यालय, तोरपा",
    classes: "कक्षा 1 - 5",
    subject: "संताली",
    preferredLanguage: "संताली",
    avatar: "👩‍🏫",
  });

  const handleLoginSubmit = (e) => {
    e.preventDefault();
    setErrorMessage("");
    const query = emailOrUsername.trim().toLowerCase();

    // Check credential match against stored/registered teachers list
    const matchedTeacher = teachersList.find((t) => {
      const matchIdentifier =
        (t.email && t.email.toLowerCase() === query) ||
        (t.username && t.username.toLowerCase() === query) ||
        (t.phone && t.phone.replace(/\s+/g, "").includes(query)) ||
        (t.name && t.name.toLowerCase().includes(query));
      return matchIdentifier && t.password === password;
    });

    if (matchedTeacher) {
      onLogin(matchedTeacher);
    } else {
      // Fallback: Check username/email query match regardless of exact password for quick ease, or show error
      const userMatch = teachersList.find((t) =>
        (t.email && t.email.toLowerCase() === query) ||
        (t.username && t.username.toLowerCase() === query)
      );
      if (userMatch) {
        onLogin({ ...userMatch, password });
      } else {
        setErrorMessage("गलत ईमेल/उपयोगकर्ता नाम या पासवर्ड! (डेमो पासवर्ड: 123456)");
      }
    }
  };

  const handleSelectDemoTeacher = (teacherObj) => {
    setEmailOrUsername(teacherObj.username || teacherObj.email);
    setPassword(teacherObj.password || "123456");
    setErrorMessage("");
    onLogin(teacherObj);
  };

  const handleCreateTeacherAccount = (e) => {
    e.preventDefault();
    if (!newTeacherForm.name || !newTeacherForm.username || !newTeacherForm.password) {
      alert("कृपया नाम, यूजरनेम और पासवर्ड भरें।");
      return;
    }

    const createdTeacherObj = {
      id: `t_${Date.now()}`,
      username: newTeacherForm.username.trim().toLowerCase(),
      email: `${newTeacherForm.username.trim().toLowerCase()}@school.in`,
      password: newTeacherForm.password,
      name: newTeacherForm.name,
      title: "प्राथमिक शिक्षक",
      school: newTeacherForm.school || "राजकीय प्राथमिक विद्यालय, तोरपा",
      classes: newTeacherForm.classes || "कक्षा 1 - 5",
      subject: newTeacherForm.subject || "हिंदी",
      preferredLanguage: "संताली",
      avatar: newTeacherForm.avatar || "👩‍🏫",
    };

    const updatedList = saveNewTeacher(createdTeacherObj);
    setTeachersList(updatedList);
    setShowCreateModal(false);
    onLogin(createdTeacherObj);
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-[#FAF7F0] dark:bg-[#0A1610] p-4 sm:p-6 relative select-none transition-colors duration-300">
      {/* Decorative leaf art in corners */}
      <div className="absolute top-4 left-4 pointer-events-none opacity-40 dark:opacity-20">
        <TribalLeavesCorner className="w-28 h-28" />
      </div>
      <div className="absolute bottom-4 right-4 pointer-events-none opacity-40 dark:opacity-20 rotate-180">
        <TribalLeavesCorner className="w-28 h-28" />
      </div>

      {/* Login Card matching Mockup Screen 2 */}
      <div className="w-full max-w-md bg-white dark:bg-[#12241A] rounded-3xl p-6 sm:p-8 shadow-card border border-stone-200/90 dark:border-[#224734] relative z-10 font-hindi">
        {/* Top Header Row with Back navigation & Theme Toggle */}
        <div className="flex items-center justify-between mb-3">
          {onBack ? (
            <button
              onClick={onBack}
              className="inline-flex items-center gap-1.5 text-stone-600 dark:text-stone-400 hover:text-forest-800 dark:hover:text-emerald-300 text-sm font-bold transition-colors cursor-pointer py-1 px-2.5 rounded-xl hover:bg-stone-100 dark:hover:bg-[#183526]"
            >
              <ArrowLeft className="w-4 h-4" />
              <span>मुख्य पृष्ठ</span>
            </button>
          ) : <div />}

          <button
            type="button"
            onClick={onToggleDarkMode}
            className="p-2 rounded-xl border border-stone-200 dark:border-[#264D3B] hover:bg-stone-100 dark:hover:bg-[#183526] text-stone-600 dark:text-emerald-300 transition-colors cursor-pointer"
            title={isDarkMode ? "लाइट मोड" : "डार्क मोड"}
          >
            {isDarkMode ? <Sun className="w-4 h-4 text-amber-400" /> : <Moon className="w-4 h-4 text-forest-700" />}
          </button>
        </div>

        {/* Top Logo */}
        <div className="flex flex-col items-center text-center mb-5">
          <BhashaSetuLogo size="md" variant="vertical" showSubtitle={true} />
          
          <h2 className="text-2xl sm:text-3xl font-black text-forest-900 dark:text-white mt-3">
            ᱢᱟᱪᱮᱛ ᱵᱚᱞᱚᱱ (Teacher Login)
          </h2>
          <p className="text-xs sm:text-sm text-stone-600 dark:text-stone-300 mt-1">
            ᱥᱟᱹᱜᱩᱱ ᱫᱟᱨᱟᱢ! ᱟᱢᱟᱜ ᱪᱟᱱᱟᱪ ᱮᱦᱚᱵᱽ ᱢᱮ ᱾ (शिक्षक पोर्टल में अपना पासवर्ड दर्ज करें)
          </p>
        </div>

        {/* Error Alert */}
        {errorMessage && (
          <div className="mb-4 p-3 rounded-2xl bg-rose-100 dark:bg-rose-950/80 border border-rose-300 dark:border-rose-800 text-rose-900 dark:text-rose-200 text-xs font-bold flex items-center gap-2 animate-in fade-in">
            <AlertCircle className="w-4 h-4 text-rose-600 dark:text-rose-400 shrink-0" />
            <span>{errorMessage}</span>
          </div>
        )}

        {/* Form */}
        <form onSubmit={handleLoginSubmit} className="space-y-4">
          {/* Email/Username/Phone */}
          <div>
            <label className="block text-xs sm:text-sm font-bold text-stone-700 dark:text-stone-300 mb-1.5 font-hindi">
              ᱤᱢᱮᱞ / ᱭᱩᱡᱚᱨ (Email / Phone / Username)
            </label>
            <div className="relative">
              <input
                type="text"
                value={emailOrUsername}
                onChange={(e) => setEmailOrUsername(e.target.value)}
                placeholder="यूजरनेम दर्ज करें (उदा. ananya, suman, birsa)"
                required
                className="w-full px-4 py-2.5 rounded-xl border border-stone-300 dark:border-[#2F5E45] bg-white dark:bg-[#172E22] text-stone-800 dark:text-white focus:border-forest-600 dark:focus:border-emerald-400 focus:ring-2 focus:ring-forest-200 dark:focus:ring-emerald-900/40 outline-none text-sm font-hindi transition-all"
              />
            </div>
          </div>

          {/* Password */}
          <div>
            <label className="block text-xs sm:text-sm font-bold text-stone-700 dark:text-stone-300 mb-1.5 font-hindi">
              ᱯᱟᱥᱠᱳᱰ / ᱯᱤᱱ (Password / PIN)
            </label>
            <div className="relative">
              <input
                type={showPassword ? "text" : "password"}
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="पासवर्ड (उदा. 123456)"
                required
                className="w-full px-4 py-2.5 rounded-xl border border-stone-300 dark:border-[#2F5E45] bg-white dark:bg-[#172E22] text-stone-800 dark:text-white focus:border-forest-600 dark:focus:border-emerald-400 focus:ring-2 focus:ring-forest-200 dark:focus:ring-emerald-900/40 outline-none text-sm font-hindi transition-all pr-10"
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute right-3 top-2.5 text-stone-400 hover:text-stone-700 dark:hover:text-stone-200 cursor-pointer"
              >
                {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
              </button>
            </div>
          </div>

          {/* Remember me */}
          <div className="flex items-center justify-between text-xs sm:text-sm font-hindi pt-0.5">
            <label className="flex items-center gap-2 cursor-pointer text-stone-700 dark:text-stone-300 font-semibold">
              <input
                type="checkbox"
                checked={rememberMe}
                onChange={(e) => setRememberMe(e.target.checked)}
                className="w-4 h-4 rounded text-forest-700 focus:ring-forest-500 accent-forest-700 cursor-pointer"
              />
              <span>मुझे याद रखें</span>
            </label>
            <button
              type="button"
              onClick={() => alert("डेमो पासवर्ड है: 123456")}
              className="text-forest-700 dark:text-emerald-400 hover:underline font-bold cursor-pointer"
            >
              पासवर्ड भूल गए?
            </button>
          </div>

          {/* Login Button */}
          <button
            type="submit"
            className="w-full py-3.5 rounded-2xl bg-[#1E4D36] hover:bg-[#163827] text-white font-bold text-base shadow-card hover:shadow-float transition-all font-hindi mt-1 cursor-pointer flex items-center justify-center gap-2"
          >
            <span>ᱵᱚᱞᱚᱱ ᱢᱮ (लॉगइन करें)</span>
            <ArrowRight className="w-4 h-4" />
          </button>
        </form>

        {/* Quick Select Registered Teacher Badges */}
        <div className="mt-4 pt-3 border-t border-stone-200/80 dark:border-[#224734] space-y-2">
          <span className="text-[11px] font-bold text-stone-500 dark:text-stone-400 block text-center">
            पंजीकृत शिक्षक चुनें (Quick 1-Click Login):
          </span>
          <div className="flex flex-col gap-1.5">
            {teachersList.map((t) => (
              <button
                key={t.id || t.username}
                type="button"
                onClick={() => handleSelectDemoTeacher(t)}
                className="w-full px-3 py-2 rounded-xl bg-stone-50 dark:bg-[#162A1E] hover:bg-emerald-50 dark:hover:bg-[#1C3E2C] border border-stone-200 dark:border-[#264D3B] text-left flex items-center justify-between text-xs transition-all cursor-pointer group"
              >
                <div className="flex items-center gap-2">
                  <span className="text-base">{t.avatar || "👩‍🏫"}</span>
                  <div>
                    <span className="font-extrabold text-forest-900 dark:text-white group-hover:text-forest-700 dark:group-hover:text-emerald-300">
                      {t.name}
                    </span>
                    <span className="text-[10px] text-stone-500 dark:text-stone-400 block">
                      {t.school}
                    </span>
                  </div>
                </div>
                <span className="text-[10px] font-mono font-bold bg-white dark:bg-[#102018] px-2 py-0.5 rounded-md text-emerald-800 dark:text-emerald-300 border border-stone-200 dark:border-[#2B573F]">
                  {t.username || t.email.split("@")[0]}
                </span>
              </button>
            ))}
          </div>
        </div>

        {/* Divider */}
        <div className="relative flex py-3 items-center">
          <div className="flex-grow border-t border-stone-200 dark:border-[#224734]" />
          <span className="flex-shrink mx-3 text-xs font-bold text-stone-400 dark:text-stone-500 font-hindi">
            या
          </span>
          <div className="flex-grow border-t border-stone-200 dark:border-[#224734]" />
        </div>

        {/* Create Account Button */}
        <button
          type="button"
          onClick={() => setShowCreateModal(true)}
          className="w-full py-2.5 rounded-2xl bg-stone-50 dark:bg-[#172E22] hover:bg-stone-100 dark:hover:bg-[#1E3E2E] text-forest-900 dark:text-emerald-200 border border-stone-300 dark:border-[#2F5E45] font-bold text-xs sm:text-sm transition-all font-hindi cursor-pointer flex items-center justify-center gap-2"
        >
          <Plus className="w-4 h-4 text-forest-700 dark:text-emerald-400" />
          <span>नया शिक्षक खाता पंजीकृत करें</span>
        </button>
      </div>

      {/* Registration Modal */}
      {showCreateModal && (
        <div className="fixed inset-0 bg-stone-900/60 backdrop-blur-xs z-50 flex items-center justify-center p-4">
          <div className="bg-white dark:bg-[#12241A] rounded-3xl p-6 max-w-md w-full shadow-xl border border-stone-200 dark:border-[#224734] space-y-4 font-hindi">
            <h3 className="text-lg font-black text-forest-900 dark:text-white">
              नया शिक्षक खाता बनाएं (Register Teacher)
            </h3>
            <p className="text-xs text-stone-600 dark:text-stone-300">
              झारखंड प्राथमिक शिक्षा परिषद के अंतर्गत कार्यरत शिक्षक अपना विवरण भरें:
            </p>

            <form onSubmit={handleCreateTeacherAccount} className="space-y-3 text-xs">
              <div>
                <label className="block font-bold text-stone-700 dark:text-stone-300 mb-1">
                  शिक्षक का पूरा नाम:
                </label>
                <input
                  type="text"
                  required
                  value={newTeacherForm.name}
                  onChange={(e) => setNewTeacherForm({ ...newTeacherForm, name: e.target.value })}
                  placeholder="उदा. सुमन मुर्मू"
                  className="w-full p-2.5 border rounded-xl dark:bg-[#172E22] dark:border-[#2B573F] text-stone-900 dark:text-white"
                />
              </div>

              <div>
                <label className="block font-bold text-stone-700 dark:text-stone-300 mb-1">
                  यूजरनेम या ईमेल:
                </label>
                <input
                  type="text"
                  required
                  value={newTeacherForm.username}
                  onChange={(e) => setNewTeacherForm({ ...newTeacherForm, username: e.target.value })}
                  placeholder="उदा. suman_m"
                  className="w-full p-2.5 border rounded-xl dark:bg-[#172E22] dark:border-[#2B573F] text-stone-900 dark:text-white"
                />
              </div>

              <div>
                <label className="block font-bold text-stone-700 dark:text-stone-300 mb-1">
                  पासवर्ड:
                </label>
                <input
                  type="password"
                  required
                  value={newTeacherForm.password}
                  onChange={(e) => setNewTeacherForm({ ...newTeacherForm, password: e.target.value })}
                  placeholder="पासवर्ड बनाएं"
                  className="w-full p-2.5 border rounded-xl dark:bg-[#172E22] dark:border-[#2B573F] text-stone-900 dark:text-white"
                />
              </div>

              <div>
                <label className="block font-bold text-stone-700 dark:text-stone-300 mb-1">
                  विद्यालय का नाम:
                </label>
                <input
                  type="text"
                  required
                  value={newTeacherForm.school}
                  onChange={(e) => setNewTeacherForm({ ...newTeacherForm, school: e.target.value })}
                  placeholder="उदा. राजकीय प्राथमिक विद्यालय, तोरपा"
                  className="w-full p-2.5 border rounded-xl dark:bg-[#172E22] dark:border-[#2B573F] text-stone-900 dark:text-white"
                />
              </div>

              <div>
                <label className="block font-bold text-stone-700 dark:text-stone-300 mb-1">
                  कक्षा आवंटन:
                </label>
                <select
                  value={newTeacherForm.classes}
                  onChange={(e) => setNewTeacherForm({ ...newTeacherForm, classes: e.target.value })}
                  className="w-full p-2.5 border rounded-xl bg-white dark:bg-[#172E22] dark:border-[#2B573F] text-stone-900 dark:text-white"
                >
                  <option>कक्षा 1 - 5</option>
                  <option>कक्षा 1 - 3</option>
                  <option>कक्षा 4 - 5</option>
                </select>
              </div>

              <div className="flex gap-2 pt-2">
                <button
                  type="submit"
                  className="flex-1 py-2.5 bg-forest-700 hover:bg-forest-800 text-white rounded-xl font-bold text-xs cursor-pointer shadow-md"
                >
                  खाता बनाएं व लॉगिन करें
                </button>
                <button
                  type="button"
                  onClick={() => setShowCreateModal(false)}
                  className="px-4 py-2.5 border rounded-xl text-stone-600 dark:text-stone-400 dark:border-[#2B573F] text-xs font-bold cursor-pointer"
                >
                  रद्द करें
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
