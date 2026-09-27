/**
 * BhashaSetu AI — Client-side i18n helper for Teacher (Hindi) & Student (Santali Ol Chiki)
 */
class BhashaSetuI18n {
  constructor() {
    this.role = window.location.pathname.startsWith('/student') ? 'student' : 'teacher';
    this.localeData = {};
  }

  async init() {
    const localeFile = this.role === 'student' ? '/static/locales/student_sat.json' : '/static/locales/teacher_hi.json';
    try {
      const res = await fetch(localeFile);
      this.localeData = await res.json();
      this.applyTranslations();
    } catch(e) {
      console.warn('i18n load error:', e);
    }
  }

  t(keyPath) {
    const keys = keyPath.split('.');
    let curr = this.localeData;
    for (const k of keys) {
      if (curr && curr[k] !== undefined) {
        curr = curr[k];
      } else {
        return keyPath;
      }
    }
    return curr;
  }

  applyTranslations() {
    document.querySelectorAll('[data-i18n]').forEach(el => {
      const key = el.getAttribute('data-i18n');
      const val = this.t(key);
      if (val && val !== key) {
        el.innerText = val;
      }
    });
  }
}

window.bhashaI18n = new BhashaSetuI18n();
document.addEventListener('DOMContentLoaded', () => {
  window.bhashaI18n.init();
});
