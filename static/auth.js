/**
 * BhashaSetu AI — Client Authentication & Route Protection Guard
 * Manages Teacher and Student sessions, route protection, and logout handling.
 */

(function () {
  const currentPath = window.location.pathname.toLowerCase();

  // Pages that do NOT require authentication
  const PUBLIC_PATHS = ["/login", "/api"];

  function getAuth() {
    try {
      const authStr = localStorage.getItem("bhasha_auth") || sessionStorage.getItem("bhasha_auth");
      return authStr ? JSON.parse(authStr) : null;
    } catch (e) {
      return null;
    }
  }

  function saveAuth(authData, remember = true) {
    const str = JSON.stringify(authData);
    if (remember) {
      localStorage.setItem("bhasha_auth", str);
    } else {
      sessionStorage.setItem("bhasha_auth", str);
    }
  }

  function clearAuth() {
    localStorage.removeItem("bhasha_auth");
    sessionStorage.removeItem("bhasha_auth");
  }

  function enforceAuth() {
    const isPublic = PUBLIC_PATHS.some(p => currentPath.startsWith(p));
    if (isPublic) return;

    const auth = getAuth();
    if (!auth || !auth.token) {
      console.warn("Unauthorized access attempt. Redirecting to /login...");
      window.location.href = "/login?redirect=" + encodeURIComponent(window.location.pathname + window.location.search);
      return;
    }

    // Role-based path checks
    if (currentPath.startsWith("/teacher") && auth.role !== "teacher") {
      alert("⚠️ इस पृष्ठ के लिए शिक्षक (Teacher) के रूप में प्रवेश आवश्यक है।");
      window.location.href = "/login?role=teacher";
      return;
    }

    if (currentPath.startsWith("/student") && auth.role !== "student" && auth.role !== "teacher") {
      alert("⚠️ इस पृष्ठ के लिए विद्यार्थी (Student) के रूप में प्रवेश आवश्यक है।");
      window.location.href = "/login?role=student";
      return;
    }

    // Inject logout button into navigation bar when loaded
    window.addEventListener("DOMContentLoaded", renderAuthNavbar);
  }

  function renderAuthNavbar() {
    const auth = getAuth();
    if (!auth) return;

    const navLinks = document.querySelector(".nav-links");
    if (!navLinks) return;

    // Check if logout button already exists
    if (document.getElementById("nav-logout-btn")) return;

    const li = document.createElement("li");
    const roleEmoji = auth.role === "teacher" ? "👩‍🏫" : "👨‍🎓";
    const displayName = auth.name || (auth.role === "teacher" ? "शिक्षक" : "विद्यार्थी");

    li.innerHTML = `
      <div style="display: flex; align-items: center; gap: 0.5rem; background: rgba(255,255,255,0.05); padding: 0.3rem 0.6rem; border-radius: 0.5rem; border: 1px solid var(--card-border);">
        <span style="font-size: 0.85rem; font-weight: 700; color: #fff;">${roleEmoji} ${displayName}</span>
        <button id="nav-logout-btn" onclick="window.bhashaAuth.logout()" class="btn btn-secondary" style="padding: 0.25rem 0.5rem; font-size: 0.75rem; border-color: rgba(239, 68, 68, 0.4); color: #f87171;" title="लॉग आउट करें">
          🚪 लॉग आउट
        </button>
      </div>
    `;
    navLinks.appendChild(li);
  }

  function logout() {
    if (confirm("क्या आप वाकई लॉग आउट करना चाहते हैं?")) {
      clearAuth();
      window.location.href = "/login";
    }
  }

  // Export to global window namespace
  window.bhashaAuth = {
    getAuth,
    saveAuth,
    clearAuth,
    logout,
    enforceAuth
  };

  // Run protection guard immediately
  enforceAuth();
})();
