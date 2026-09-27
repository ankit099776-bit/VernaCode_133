/**
 * Santhali Voice Translator - Main Application Logic
 * Speech Recognition (Hindi) -> Translation Engine -> Ol Chiki & Multi-script -> Speech Synthesis
 */

class SanthaliTranslatorApp {
  constructor() {
    this.recognition = null;
    this.isListening = false;
    this.mediaStream = null;
    this.audioContext = null;
    this.analyser = null;
    this.microphoneSource = null;
    this.synth = window.speechSynthesis || null;
    this.voices = [];
    this.autoSpeak = true;
    this.currentTranslation = null;
    this.history = this.loadHistory();
    this.visualizerCanvas = null;
    this.canvasCtx = null;
    this.animationFrameId = null;
    this.silenceTimer = null;
    this.accumulatedTranscript = "";
    this.activeUtterance = null;

    this.initElements();
    this.checkProtocol();
    this.initSpeechRecognition();
    this.initSpeechSynthesis();
    this.initAudioVisualizer();
    this.initEventListeners();
    this.renderCategoryPhrases("all");
    this.renderAlphabetTable();
    this.renderHistory();

    // Default translation preview on load
    setTimeout(() => {
      if (this.hindiInput && !this.hindiInput.value.trim()) {
        this.hindiInput.value = "खाना खा लिया";
      }
      const initialText = (this.hindiInput ? this.hindiInput.value.trim() : "") || "खाना खा लिया";
      this.handleTranslate(initialText, false);
    }, 400);
  }

  initElements() {
    this.protocolWarning = document.getElementById("protocolWarning");
    this.hindiInput = document.getElementById("hindiInput");
    this.micBtn = document.getElementById("micBtn");
    this.micStatus = document.getElementById("micStatus");
    this.translateBtn = document.getElementById("translateBtn");
    this.clearBtn = document.getElementById("clearBtn");
    
    // Live feedback
    this.listeningBadge = document.getElementById("listeningBadge");
    this.liveSpeechBox = document.getElementById("liveSpeechBox");
    this.liveSpeechText = document.getElementById("liveSpeechText");
    this.stopAndTranslateBtn = document.getElementById("stopAndTranslateBtn");
    this.micHelpBtn = document.getElementById("micHelpBtn");
    this.micHelpModal = document.getElementById("micHelpModal");
    this.closeHelpBtn = document.getElementById("closeHelpBtn");
    this.testMicBtn = document.getElementById("testMicBtn");
    this.micTestStatus = document.getElementById("micTestStatus");

    // Result displays
    this.resultContainer = document.getElementById("resultContainer");
    this.emptyState = document.getElementById("emptyState");
    this.olChikiOutput = document.getElementById("olChikiOutput");
    this.latinOutput = document.getElementById("latinOutput");
    this.devanagariOutput = document.getElementById("devanagariOutput");
    this.meaningOutput = document.getElementById("meaningOutput");
    this.speechStatusBadge = document.getElementById("speechStatusBadge");
    
    // Controls
    this.speakBtn = document.getElementById("speakBtn");
    this.speakSlowBtn = document.getElementById("speakSlowBtn");
    this.copyOlChikiBtn = document.getElementById("copyOlChikiBtn");
    this.copyAllBtn = document.getElementById("copyAllBtn");
    this.autoSpeakToggle = document.getElementById("autoSpeakToggle");
    this.voiceWaves = document.getElementById("voiceWaves");
    
    // History & Phrases
    this.phraseList = document.getElementById("phraseList");
    this.historyList = document.getElementById("historyList");
    this.clearHistoryBtn = document.getElementById("clearHistoryBtn");
    this.alphabetGrid = document.getElementById("alphabetGrid");
  }

  checkProtocol() {
    if (window.location.protocol === "file:" && this.protocolWarning) {
      this.protocolWarning.classList.remove("hidden");
    }
  }

  // Speech Recognition (Hindi)
  initSpeechRecognition() {
    const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
    if (!SpeechRecognition) {
      console.warn("Web Speech Recognition not supported in this browser.");
      if (this.micStatus) {
        this.micStatus.innerHTML = `<span class="text-amber-400 font-semibold">⚠️ आपके ब्राउज़र में आवाज़ पहचान समर्थित नहीं है। कृपया Google Chrome या Microsoft Edge का उपयोग करें।</span>`;
      }
      return;
    }

    try {
      this.recognition = new SpeechRecognition();
      this.recognition.lang = "hi-IN";
      this.recognition.continuous = true;
      this.recognition.interimResults = true;
      this.recognition.maxAlternatives = 1;

      this.recognition.onstart = () => {
        this.isListening = true;
        this.accumulatedTranscript = "";
        this.playBeep(660, 0.1);
        if (this.micBtn) this.micBtn.classList.add("listening");
        if (this.listeningBadge) this.listeningBadge.classList.remove("hidden");
        if (this.liveSpeechBox) this.liveSpeechBox.classList.remove("hidden");
        if (this.stopAndTranslateBtn) this.stopAndTranslateBtn.classList.remove("hidden");
        if (this.micStatus) this.micStatus.textContent = "🎙️ सुन रहा हूँ... कृपया हिन्दी में बोलिए (Listening...)";
        this.startVisualizerAnimation();
      };

      this.recognition.onresult = (event) => {
        let interimTranscript = "";
        let finalTranscript = "";

        for (let i = event.resultIndex; i < event.results.length; ++i) {
          const item = event.results[i];
          if (item.isFinal) {
            finalTranscript += item[0].transcript;
          } else {
            interimTranscript += item[0].transcript;
          }
        }

        const currentText = (finalTranscript || interimTranscript).trim();
        if (currentText) {
          if (this.liveSpeechText) this.liveSpeechText.textContent = `"${currentText}"`;
          if (this.hindiInput) {
            this.hindiInput.value = (this.accumulatedTranscript ? this.accumulatedTranscript + " " : "") + currentText;
          }

          clearTimeout(this.silenceTimer);
          this.silenceTimer = setTimeout(() => {
            if (this.isListening) {
              const fullText = this.hindiInput ? this.hindiInput.value.trim() : "";
              if (fullText) {
                this.stopListening();
                this.handleTranslate(fullText, true);
              }
            }
          }, 1800);
        }

        if (finalTranscript) {
          this.accumulatedTranscript = (this.accumulatedTranscript ? this.accumulatedTranscript + " " : "") + finalTranscript.trim();
          if (this.hindiInput) this.hindiInput.value = this.accumulatedTranscript;
        }
      };

      this.recognition.onerror = (event) => {
        console.error("Speech recognition error:", event.error);
        clearTimeout(this.silenceTimer);
        this.stopListening();
        
        let msg = "";
        if (event.error === "not-allowed") {
          msg = "❌ माइक्रोफ़ोन की अनुमति नहीं मिली! कृपया URL बार में 🔒 पर क्लिक करके 'Allow' करें।";
        } else if (event.error === "no-speech") {
          msg = "⚠️ कोई आवाज़ नहीं सुनी गई। पुनः माइक दबाकर बोलें।";
        } else if (event.error === "network") {
          msg = "⚠️ नेटवर्क समस्या (Google Speech सर्विस कनेक्ट नहीं हो सकी)।";
        } else {
          msg = `⚠️ माइक त्रुटि: ${event.error}`;
        }
        if (this.micStatus) {
          this.micStatus.innerHTML = `<span class="text-red-400 font-semibold">${msg}</span>`;
        }
        
        setTimeout(() => {
          if (!this.isListening && this.micStatus) {
            this.micStatus.textContent = "बोलने के लिए माइक दबाएँ (Click mic to speak)";
          }
        }, 5000);
      };

      this.recognition.onend = () => {
        if (this.isListening) {
          this.stopListening();
        }
      };
    } catch (e) {
      console.error("Failed to initialize SpeechRecognition:", e);
    }
  }

  async toggleListening() {
    if (window.location.protocol === "file:") {
      alert("⚠️ Google Chrome file:/// मोड में माइक्रोफ़ोन बंद रखता है।\n\nकृपया http://localhost:8000 पर खोलें।");
      return;
    }

    if (!this.recognition) {
      alert("आपके ब्राउज़र में Web Speech Recognition उपलब्ध नहीं है।\nकृपया Google Chrome या Microsoft Edge का उपयोग करें।");
      return;
    }

    if (this.isListening) {
      clearTimeout(this.silenceTimer);
      const textToTranslate = this.hindiInput ? this.hindiInput.value.trim() : "";
      this.stopListening();
      if (textToTranslate) {
        this.handleTranslate(textToTranslate, true);
      }
    } else {
      try {
        if (!this.mediaStream) {
          this.mediaStream = await navigator.mediaDevices.getUserMedia({ audio: true });
          this.setupAudioAnalysis(this.mediaStream);
        }
      } catch (err) {
        console.warn("getUserMedia error:", err);
        if (this.micStatus) {
          this.micStatus.innerHTML = `<span class="text-red-400 font-semibold">❌ माइक्रोफ़ोन ब्लॉक है! URL बार में 🔒 दबाकर Microphone Allow करें।</span>`;
        }
        if (this.micHelpModal) this.micHelpModal.classList.remove("hidden");
        return;
      }

      try {
        this.recognition.start();
      } catch (err) {
        console.error("Error starting speech recognition:", err);
        try {
          this.recognition.stop();
          setTimeout(() => this.recognition.start(), 200);
        } catch (e2) {}
      }
    }
  }

  stopListening() {
    this.isListening = false;
    clearTimeout(this.silenceTimer);
    this.playBeep(440, 0.08);
    
    if (this.recognition) {
      try {
        this.recognition.stop();
      } catch (e) {}
    }

    if (this.micBtn) this.micBtn.classList.remove("listening");
    if (this.listeningBadge) this.listeningBadge.classList.add("hidden");
    if (this.liveSpeechBox) this.liveSpeechBox.classList.add("hidden");
    if (this.stopAndTranslateBtn) this.stopAndTranslateBtn.classList.add("hidden");
    if (this.micStatus) this.micStatus.textContent = "बोलने के लिए माइक दबाएँ (Click mic to speak)";
    this.stopVisualizerAnimation();
  }

  setupAudioAnalysis(stream) {
    try {
      const AudioContext = window.AudioContext || window.webkitAudioContext;
      if (!AudioContext) return;
      if (!this.audioContext) {
        this.audioContext = new AudioContext();
      }
      if (this.audioContext.state === "suspended") {
        this.audioContext.resume();
      }
      this.analyser = this.audioContext.createAnalyser();
      this.analyser.fftSize = 64;
      this.microphoneSource = this.audioContext.createMediaStreamSource(stream);
      this.microphoneSource.connect(this.analyser);
    } catch (e) {
      console.warn("Audio analysis setup failed:", e);
    }
  }

  playBeep(freq = 550, duration = 0.1) {
    try {
      const AudioContext = window.AudioContext || window.webkitAudioContext;
      if (!AudioContext) return;
      const ctx = this.audioContext || new AudioContext();
      const osc = ctx.createOscillator();
      const gain = ctx.createGain();
      osc.type = "sine";
      osc.frequency.setValueAtTime(freq, ctx.currentTime);
      gain.gain.setValueAtTime(0.08, ctx.currentTime);
      gain.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + duration);
      osc.connect(gain);
      gain.connect(ctx.destination);
      osc.start();
      osc.stop(ctx.currentTime + duration);
    } catch (e) {}
  }

  // Speech Synthesis Engine
  initSpeechSynthesis() {
    if (!this.synth) return;

    const populateVoices = () => {
      this.voices = this.synth.getVoices();
    };

    populateVoices();
    if (speechSynthesis.onvoiceschanged !== undefined) {
      speechSynthesis.onvoiceschanged = populateVoices;
    }
  }

  speakSanthali(text, rate = 0.9) {
    const data = this.currentTranslation;
    
    if (this.synth && (!this.voices || this.voices.length === 0)) {
      this.voices = this.synth.getVoices();
    }

    let preferredVoice = null;
    if (this.voices && this.voices.length > 0) {
      preferredVoice = this.voices.find(v => 
        v.lang === "hi-IN" || 
        v.lang.startsWith("hi") ||
        v.name.includes("Hindi") ||
        v.name.includes("India") ||
        v.lang === "en-IN"
      ) || this.voices[0];
    }

    let speechText = text;
    if (data) {
      speechText = data.devanagari || data.phonetic || data.latin || text;
    }

    speechText = (speechText || "").replace(/[।?.,!᱾]/g, "").trim();
    if (!speechText) return;

    if (this.speechStatusBadge) {
      this.speechStatusBadge.innerHTML = `<span>🔊 संथाली बोल रहा हूँ:</span> <strong class="text-amber-200 ml-1">"${speechText}"</strong>`;
      this.speechStatusBadge.classList.remove("hidden");
    }
    if (this.voiceWaves) this.voiceWaves.classList.remove("hidden");
    if (this.speakBtn) this.speakBtn.classList.add("speaking");

    // 1. Direct Streaming Audio from /api/tts
    try {
      if (this.activeAudio) {
        this.activeAudio.pause();
        this.activeAudio = null;
      }

      const audioUrl = `/api/tts?text=${encodeURIComponent(speechText)}`;
      const audio = new Audio(audioUrl);
      this.activeAudio = audio;
      audio.playbackRate = rate;

      audio.onplay = () => {
        if (this.voiceWaves) this.voiceWaves.classList.remove("hidden");
        if (this.speakBtn) this.speakBtn.classList.add("speaking");
      };

      audio.onended = () => {
        if (this.voiceWaves) this.voiceWaves.classList.add("hidden");
        if (this.speakBtn) this.speakBtn.classList.remove("speaking");
        setTimeout(() => {
          if (this.speechStatusBadge) this.speechStatusBadge.classList.add("hidden");
        }, 1500);
      };

      audio.onerror = (e) => {
        console.warn("API TTS stream failed, falling back to Web Speech:", e);
        this.speakWebSpeechFallback(speechText, rate, preferredVoice);
      };

      const playPromise = audio.play();
      if (playPromise !== undefined) {
        playPromise.catch(err => {
          console.warn("Audio play blocked by browser policy, using Web Speech:", err);
          this.speakWebSpeechFallback(speechText, rate, preferredVoice);
        });
        return;
      }
    } catch (err) {
      console.warn("Direct HTML5 audio play error:", err);
    }

    // 2. Web Speech API Fallback
    this.speakWebSpeechFallback(speechText, rate, preferredVoice);
  }

  speakWebSpeechFallback(speechText, rate = 0.9, preferredVoice = null) {
    if (!this.synth) return;

    try {
      const utterance = new SpeechSynthesisUtterance(speechText);
      utterance.rate = rate;
      utterance.pitch = 1.0;
      utterance.lang = preferredVoice ? preferredVoice.lang : "hi-IN";
      if (preferredVoice) utterance.voice = preferredVoice;

      window._currentUtterance = utterance;
      this.activeUtterance = utterance;

      utterance.onstart = () => {
        if (this.voiceWaves) this.voiceWaves.classList.remove("hidden");
        if (this.speakBtn) this.speakBtn.classList.add("speaking");
      };

      utterance.onend = () => {
        if (this.voiceWaves) this.voiceWaves.classList.add("hidden");
        if (this.speakBtn) this.speakBtn.classList.remove("speaking");
        setTimeout(() => {
          if (this.speechStatusBadge) this.speechStatusBadge.classList.add("hidden");
        }, 1500);
      };

      utterance.onerror = () => {
        if (this.voiceWaves) this.voiceWaves.classList.add("hidden");
        if (this.speakBtn) this.speakBtn.classList.remove("speaking");
      };

      if (this.synth.speaking || this.synth.pending) {
        this.synth.cancel();
      }
      this.synth.resume();
      setTimeout(() => {
        this.synth.resume();
        this.synth.speak(utterance);
      }, 40);
    } catch (e) {
      console.error("Web Speech API error:", e);
    }
  }

  // Translation Engine
  translateHindiToSanthali(hindiText) {
    if (!hindiText || !hindiText.trim()) return null;

    const dataDict = window.SANTHALI_DATA ? window.SANTHALI_DATA : { phrases: [], dictionary: {} };
    const normalized = hindiText.trim().replace(/[।?!.,]/g, "").toLowerCase();
    const cleanRaw = hindiText.trim().replace(/[।?!.,]/g, "");

    const phraseMatch = (dataDict.phrases || []).find(p => {
      const pNorm = p.hindi.replace(/[।?!.,]/g, "").toLowerCase();
      if (pNorm === normalized) return true;
      return (p.keywords || []).some(k => {
        const kNorm = k.toLowerCase();
        return normalized.includes(kNorm) || kNorm.includes(normalized);
      });
    });

    if (phraseMatch) {
      return {
        hindi: hindiText,
        olChiki: phraseMatch.olChiki,
        latin: phraseMatch.latin,
        devanagari: phraseMatch.devanagari,
        meaning: phraseMatch.meaning,
        phonetic: phraseMatch.phonetic,
        type: "phrase"
      };
    }

    const compoundVerbRules = [
      { pattern: /खाना खा लिया|खा लिया|खाया है|खा चुके/i, ol: "ᱫᱟᱠᱟᱧ ᱡᱚᱢ ᱠᱮᱫᱟ", lat: "Dakanj jom keda", dev: "दाकाञ जोम केदा", pho: "daakanj jom kayda" },
      { pattern: /खाना खा लो|खाना खाओ/i, ol: "ᱫᱟᱠᱟ ᱡᱚᱢ ᱢᱮ", lat: "Daka jom me", dev: "दाका जोम मे", pho: "daaka jom may" },
      { pattern: /खाना खा रहा/i, ol: "ᱫᱟᱠᱟᱧ ᱡᱚᱢᱮᱫᱟ", lat: "Dakanj jomed-a", dev: "दाकाञ जोमेदा", pho: "daakanj jomayda" },
      { pattern: /पानी पी लिया|पी लिया|पिया है/i, ol: "ᱫᱟᱜᱤᱧ ᱧᱩ ᱠᱮᱫᱟ", lat: "Daging nyu keda", dev: "दागिञ ञु केदा", pho: "daageeng nyoo kayda" },
      { pattern: /सो गया|सो गए/i, ol: "ᱡᱟᱹᱯᱤᱫ ᱠᱮᱫᱟ", lat: "Japid keda", dev: "जापिद केदा", pho: "jaapeed kayda" },
      { pattern: /चला गया|चले गए|गया है/i, ol: "ᱪᱟᱞᱟᱣ ᱮᱱᱟ", lat: "Chalaw ena", dev: "चालाव एना", pho: "chaalaao ayna" },
      { pattern: /आ गया|आ गए/i, ol: "ᱦᱮᱡ ᱮᱱᱟ", lat: "Hej ena", dev: "हेज एना", pho: "hayj ayna" },
      { pattern: /कर लिया|काम हो गया|हो गया/i, ol: "ᱦᱩᱭ ᱮᱱᱟ", lat: "Huy ena", dev: "हुय एना", pho: "hooy ayna" }
    ];

    for (let rule of compoundVerbRules) {
      if (rule.pattern.test(processedHindi)) {
        return {
          hindi: hindiText,
          olChiki: rule.ol + " ᱾",
          latin: rule.lat + ".",
          devanagari: rule.dev + "।",
          meaning: "संथाली क्रिया अनुवाद (Santali Action Phrase)",
          phonetic: rule.pho,
          type: "compound"
        };
      }
    }

    const words = cleanRaw.split(/\s+/);
    let olTokens = [];
    let latTokens = [];
    let devTokens = [];
    let phoneticTokens = [];
    let matchedCount = 0;

    for (let word of words) {
      const dictEntry = dataDict.dictionary[word] || dataDict.dictionary[word.toLowerCase()];

      if (dictEntry) {
        olTokens.push(dictEntry.ol);
        latTokens.push(dictEntry.lat);
        devTokens.push(dictEntry.dev);
        phoneticTokens.push(dictEntry.phonetic || dictEntry.lat);
        matchedCount++;
      } else {
        olTokens.push(word);
        latTokens.push(word);
        devTokens.push(word);
        phoneticTokens.push(word);
      }
    }

    const olSentence = olTokens.join(" ") + " ᱾";
    const latSentence = latTokens.join(" ") + ".";
    const devSentence = devTokens.join(" ") + "।";
    const phoneticSentence = phoneticTokens.join(" ");

    return {
      hindi: hindiText,
      olChiki: olSentence,
      latin: latSentence,
      devanagari: devSentence,
      meaning: matchedCount > 0 ? "संथाली अनुवाद (Word-synthesized Santali)" : "ध्वनि अनुवाद (Phonetic Transliteration)",
      phonetic: phoneticSentence,
      type: "synthesized"
    };
  }

  async handleTranslate(text, triggeredByVoice = false) {
    if (!text || !text.strip ? !text.trim() : !text) return;
    const clean = text.trim();

    this.showTranslatingLoader(true);

    try {
      const controller = new AbortController();
      const timeoutId = setTimeout(() => controller.abort(), 4500);
      const apiUrl = `/api/translate?text=${encodeURIComponent(clean)}`;
      const resp = await fetch(apiUrl, { signal: controller.signal });
      clearTimeout(timeoutId);

      if (resp.ok) {
        const data = await resp.json();
        if (data && (data.olChiki || data.translated_text)) {
          this.showTranslatingLoader(false);
          const normalizedRes = {
            hindi: clean,
            olChiki: data.olChiki || data.translated_text,
            latin: data.latin || data.translated_text,
            devanagari: data.devanagari || data.translated_text,
            phonetic: data.phonetic || data.devanagari || data.latin,
            meaning: data.meaning || "न्यूरल अनुवाद (Neural Translation)"
          };
          this.currentTranslation = normalizedRes;
          this.displayResult(normalizedRes);
          this.addToHistory(normalizedRes);

          if (this.autoSpeak) {
            setTimeout(() => {
              this.speakSanthali(normalizedRes.devanagari || normalizedRes.phonetic || normalizedRes.latin);
            }, triggeredByVoice ? 350 : 150);
          }
          return;
        }
      }
    } catch (err) {
      console.warn("Server API not reachable, falling back to local dataset:", err);
    }

    this.showTranslatingLoader(false);
    const result = this.translateHindiToSanthali(clean);
    if (!result) return;

    this.currentTranslation = result;
    this.displayResult(result);
    this.addToHistory(result);

    if (this.autoSpeak) {
      setTimeout(() => {
        this.speakSanthali(result.devanagari || result.phonetic || result.latin);
      }, triggeredByVoice ? 350 : 150);
    }
  }

  showTranslatingLoader(show) {
    const loader = document.getElementById("translatingLoader");
    if (loader) {
      if (show) loader.classList.remove("hidden");
      else loader.classList.add("hidden");
    }
  }

  displayResult(data) {
    if (this.emptyState) this.emptyState.classList.add("hidden");
    if (this.resultContainer) this.resultContainer.classList.remove("hidden");

    if (this.olChikiOutput) this.olChikiOutput.textContent = data.olChiki;
    if (this.latinOutput) this.latinOutput.textContent = data.latin;
    if (this.devanagariOutput) this.devanagariOutput.textContent = data.devanagari;
    if (this.meaningOutput) this.meaningOutput.textContent = data.meaning || "";

    if (window.innerWidth < 768 && this.resultContainer) {
      this.resultContainer.scrollIntoView({ behavior: "smooth", block: "nearest" });
    }
  }

  // Audio Visualizer
  initAudioVisualizer() {
    this.visualizerCanvas = document.getElementById("visualizerCanvas");
    if (!this.visualizerCanvas) return;
    this.canvasCtx = this.visualizerCanvas.getContext("2d");
  }

  startVisualizerAnimation() {
    if (!this.visualizerCanvas || !this.canvasCtx) return;
    let step = 0;
    const dataArray = this.analyser ? new Uint8Array(this.analyser.frequencyBinCount) : null;

    const draw = () => {
      this.animationFrameId = requestAnimationFrame(draw);
      step += 0.08;

      const width = this.visualizerCanvas.width = this.visualizerCanvas.offsetWidth;
      const height = this.visualizerCanvas.height = this.visualizerCanvas.offsetHeight;
      const ctx = this.canvasCtx;

      ctx.clearRect(0, 0, width, height);

      let realVol = 0;
      if (this.analyser && dataArray) {
        this.analyser.getByteFrequencyData(dataArray);
        let sum = 0;
        for (let i = 0; i < dataArray.length; i++) sum += dataArray[i];
        realVol = (sum / dataArray.length) / 255;
      }

      const centerY = height / 2;
      const bars = 32;
      const barWidth = width / bars;

      for (let i = 0; i < bars; i++) {
        const x = i * barWidth;
        const waveBase = Math.sin(step + i * 0.4) * Math.sin((i / bars) * Math.PI);
        const dynamicAmp = realVol > 0.05 
          ? (realVol * (height / 1.8) + waveBase * 4) 
          : (waveBase * (height / 3.5));

        const y1 = Math.max(2, centerY - Math.abs(dynamicAmp));
        const y2 = Math.min(height - 2, centerY + Math.abs(dynamicAmp));

        ctx.strokeStyle = realVol > 0.1 
          ? "#22c55e" 
          : (i % 2 === 0 ? "#e07a5f" : "#f59e0b");
        ctx.lineWidth = 3;
        ctx.lineCap = "round";
        ctx.beginPath();
        ctx.moveTo(x + barWidth / 2, y1);
        ctx.lineTo(x + barWidth / 2, y2);
        ctx.stroke();
      }
    };

    draw();
  }

  stopVisualizerAnimation() {
    if (this.animationFrameId) {
      cancelAnimationFrame(this.animationFrameId);
      this.animationFrameId = null;
    }
    if (this.visualizerCanvas && this.canvasCtx) {
      this.canvasCtx.clearRect(0, 0, this.visualizerCanvas.width, this.visualizerCanvas.height);
    }
  }

  // Category Phrasebook UI
  renderCategoryPhrases(category = "all") {
    if (!this.phraseList) return;
    this.phraseList.innerHTML = "";

    const phrases = (window.SANTHALI_DATA && window.SANTHALI_DATA.phrases) ? window.SANTHALI_DATA.phrases : [];
    const filtered = category === "all"
      ? phrases
      : phrases.filter(p => p.category === category);

    filtered.forEach(item => {
      const card = document.createElement("div");
      card.className = "phrase-card group";
      card.innerHTML = `
        <div class="phrase-header">
          <span class="phrase-hindi">${item.hindi}</span>
          <button class="phrase-play-btn" title="Listen Santhali" data-phonetic="${item.phonetic || item.latin}">
            <svg class="w-4 h-4" fill="currentColor" viewBox="0 0 20 20"><path d="M10 18a8 8 0 100-16 8 8 0 000 16zM9.555 7.168A1 1 0 008 8v4a1 1 0 001.555.832l3-2a1 1 0 000-1.664l-3-2z"/></svg>
          </button>
        </div>
        <div class="phrase-olchiki">${item.olChiki}</div>
        <div class="phrase-latin">${item.latin} • <span class="text-amber-400">${item.devanagari}</span></div>
      `;

      card.addEventListener("click", (e) => {
        if (e.target.closest(".phrase-play-btn")) {
          e.stopPropagation();
          this.currentTranslation = item;
          this.displayResult(item);
          this.speakSanthali(item.devanagari || item.phonetic || item.latin);
        } else {
          if (this.hindiInput) this.hindiInput.value = item.hindi;
          this.handleTranslate(item.hindi);
        }
      });

      this.phraseList.appendChild(card);
    });
  }

  // Alphabet Table
  renderAlphabetTable() {
    if (!this.alphabetGrid) return;
    this.alphabetGrid.innerHTML = "";

    const alphabet = (window.SANTHALI_DATA && window.SANTHALI_DATA.alphabet) ? window.SANTHALI_DATA.alphabet : [];
    alphabet.forEach(item => {
      const tile = document.createElement("button");
      tile.className = "alphabet-tile group";
      tile.innerHTML = `
        <span class="alphabet-char">${item.char}</span>
        <span class="alphabet-name">${item.name}</span>
        <span class="alphabet-sound">${item.sound}</span>
        <span class="alphabet-dev">(${item.dev})</span>
      `;

      tile.addEventListener("click", () => {
        this.speakSanthali(item.sound.split(" ")[0] || item.name, 0.8);
      });

      this.alphabetGrid.appendChild(tile);
    });
  }

  // History Management
  loadHistory() {
    try {
      const stored = localStorage.getItem("santhali_translator_history");
      return stored ? JSON.parse(stored) : [];
    } catch (e) {
      return [];
    }
  }

  saveHistory() {
    try {
      localStorage.setItem("santhali_translator_history", JSON.stringify(this.history.slice(0, 30)));
    } catch (e) {}
  }

  addToHistory(item) {
    this.history = this.history.filter(h => h.hindi !== item.hindi);
    this.history.unshift({
      ...item,
      time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
    });
    this.saveHistory();
    this.renderHistory();
  }

  renderHistory() {
    if (!this.historyList) return;
    this.historyList.innerHTML = "";

    if (this.history.length === 0) {
      this.historyList.innerHTML = `<div class="text-sm text-stone-500 py-3 text-center">कोई हालिया अनुवाद नहीं (No recent translations)</div>`;
      return;
    }

    this.history.forEach(item => {
      const row = document.createElement("div");
      row.className = "history-item";
      row.innerHTML = `
        <div class="flex-1 min-w-0">
          <div class="text-sm font-medium text-stone-200 truncate">${item.hindi}</div>
          <div class="text-xs text-amber-400/90 font-olchiki truncate">${item.olChiki}</div>
          <div class="text-[11px] text-stone-400 truncate">${item.latin}</div>
        </div>
        <button class="history-play-btn" title="Replay Santali Audio">
          <svg class="w-4 h-4" fill="currentColor" viewBox="0 0 20 20"><path d="M10 18a8 8 0 100-16 8 8 0 000 16zM9.555 7.168A1 1 0 008 8v4a1 1 0 001.555.832l3-2a1 1 0 000-1.664l-3-2z"/></svg>
        </button>
      `;

      row.querySelector(".history-play-btn").addEventListener("click", (e) => {
        e.stopPropagation();
        this.currentTranslation = item;
        this.displayResult(item);
        this.speakSanthali(item.devanagari || item.phonetic || item.latin);
      });

      row.addEventListener("click", () => {
        if (this.hindiInput) this.hindiInput.value = item.hindi;
        this.displayResult(item);
      });

      this.historyList.appendChild(row);
    });
  }

  clearHistory() {
    this.history = [];
    this.saveHistory();
    this.renderHistory();
  }

  // Event Listeners Setup
  initEventListeners() {
    if (this.micBtn) this.micBtn.addEventListener("click", () => this.toggleListening());

    if (this.stopAndTranslateBtn) {
      this.stopAndTranslateBtn.addEventListener("click", () => {
        const text = this.hindiInput ? this.hindiInput.value.trim() : "";
        this.stopListening();
        if (text) {
          this.handleTranslate(text, true);
        }
      });
    }

    if (this.micHelpBtn) {
      this.micHelpBtn.addEventListener("click", () => {
        if (this.micHelpModal) this.micHelpModal.classList.remove("hidden");
      });
    }

    if (this.closeHelpBtn) {
      this.closeHelpBtn.addEventListener("click", () => {
        if (this.micHelpModal) this.micHelpModal.classList.add("hidden");
      });
    }

    if (this.testMicBtn) {
      this.testMicBtn.addEventListener("click", async () => {
        if (this.micTestStatus) this.micTestStatus.textContent = "माइक टेस्ट हो रहा है...";
        try {
          const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
          this.setupAudioAnalysis(stream);
          if (this.micTestStatus) {
            this.micTestStatus.innerHTML = `<span class="text-emerald-400 font-bold">✅ माइक्रोफ़ोन सफल! आवाज़ सक्रिय है।</span>`;
          }
        } catch (e) {
          if (this.micTestStatus) {
            this.micTestStatus.innerHTML = `<span class="text-red-400 font-bold">❌ माइक्रोफ़ोन विफल: ${e.message}</span>`;
          }
        }
      });
    }

    if (this.translateBtn) {
      this.translateBtn.addEventListener("click", () => {
        if (this.hindiInput) this.handleTranslate(this.hindiInput.value);
      });
    }

    if (this.hindiInput) {
      this.hindiInput.addEventListener("keydown", (e) => {
        if (e.key === "Enter" && !e.shiftKey) {
          e.preventDefault();
          this.handleTranslate(this.hindiInput.value);
        }
      });
    }

    if (this.clearBtn) {
      this.clearBtn.addEventListener("click", () => {
        if (this.hindiInput) {
          this.hindiInput.value = "";
          this.hindiInput.focus();
        }
      });
    }

    if (this.speakBtn) {
      this.speakBtn.addEventListener("click", () => {
        if (this.currentTranslation) {
          this.speakSanthali(this.currentTranslation.devanagari || this.currentTranslation.phonetic || this.currentTranslation.latin, 0.9);
        }
      });
    }

    if (this.speakSlowBtn) {
      this.speakSlowBtn.addEventListener("click", () => {
        if (this.currentTranslation) {
          this.speakSanthali(this.currentTranslation.devanagari || this.currentTranslation.phonetic || this.currentTranslation.latin, 0.65);
        }
      });
    }

    if (this.autoSpeakToggle) {
      this.autoSpeakToggle.addEventListener("change", (e) => {
        this.autoSpeak = e.target.checked;
      });
    }

    if (this.copyOlChikiBtn) {
      this.copyOlChikiBtn.addEventListener("click", () => {
        if (this.currentTranslation && this.currentTranslation.olChiki) {
          navigator.clipboard.writeText(this.currentTranslation.olChiki);
          this.showToast("Ol Chiki (ᱚᱞ ᱪᱤᱠᱤ) कॉपी हो गया!");
        }
      });
    }

    if (this.copyAllBtn) {
      this.copyAllBtn.addEventListener("click", () => {
        if (this.currentTranslation) {
          const text = `Hindi: ${this.currentTranslation.hindi}\nSantali (Ol Chiki): ${this.currentTranslation.olChiki}\nLatin: ${this.currentTranslation.latin}\nDevanagari: ${this.currentTranslation.devanagari}`;
          navigator.clipboard.writeText(text);
          this.showToast("सभी अनुवाद कॉपी हो गए!");
        }
      });
    }

    if (this.clearHistoryBtn) {
      this.clearHistoryBtn.addEventListener("click", () => this.clearHistory());
    }

    document.querySelectorAll(".category-tab").forEach(tab => {
      tab.addEventListener("click", () => {
        document.querySelectorAll(".category-tab").forEach(t => t.classList.remove("active"));
        tab.classList.add("active");
        this.renderCategoryPhrases(tab.dataset.category);
      });
    });
  }

  showToast(msg) {
    const toast = document.createElement("div");
    toast.className = "toast-message";
    toast.textContent = msg;
    document.body.appendChild(toast);
    setTimeout(() => toast.classList.add("show"), 10);
    setTimeout(() => {
      toast.classList.remove("show");
      setTimeout(() => toast.remove(), 300);
    }, 2500);
  }
}

document.addEventListener("DOMContentLoaded", () => {
  window.app = new SanthaliTranslatorApp();
});
