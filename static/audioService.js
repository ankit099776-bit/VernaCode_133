/**
 * BhashaSetu AI — Single-Owner Sequential Queue Audio Player Service & Diagnostic Panel
 */
class BhashaSetuAudioPlayer {
  constructor(options = {}) {
    this.containerId = options.containerId || 'audio-player-container';
    this.debugPanelId = options.debugPanelId || 'audio-debug-panel';
    this.audioContext = null;
    
    // Single Active Audio Element & Generation Tracking
    this.activeAudio = null;
    this.activeBlobUrl = null;
    this.playbackGeneration = 0;
    
    // Sequential FIFO Playback & Pre-Unlock Queues
    this.playbackQueue = [];
    this.preUnlockQueue = [];
    this.audioHistory = [];
    this.isProcessingQueue = false;

    this.audioUnlocked = false;
    this.lastPayload = null;
    this.lastSantaliAudioBlob = null;
    
    this.state = 'idle'; // idle | generating | ready | playing | completed | failed
    this.lastError = null;
    this.physicalSoundHeard = null; // null | true | false
    this.directWavSha256 = null;
    this.wsWavSha256 = null;
    this.sha256Match = null;
    this.lastWavStats = null;
    this.html5Events = {
      metadata: false,
      canplay: false,
      playing: false,
      ended: false,
      error: null
    };
    this.onStateChange = options.onStateChange || null;

    // AUTO-UNLOCK ON TOUCH/CLICK: Listen to any user interaction to unlock mobile Web Audio API instantly
    const autoUnlockHandler = () => {
      if (!this.audioUnlocked) {
        console.log("[AUDIO-TRACE] Auto-unlocking AudioContext from user touch/click interaction...");
        this.initAudioContext();
      }
    };
    if (typeof window !== 'undefined') {
      ['touchstart', 'touchend', 'click', 'pointerdown'].forEach(evt => {
        window.addEventListener(evt, autoUnlockHandler, { passive: true });
      });
    }
  }

  /**
   * Cleanly stops any currently playing audio element.
   */
  stopActiveAudio() {
    if (this.activeSourceNode) {
      try {
        this.activeSourceNode.stop();
        this.activeSourceNode.disconnect();
      } catch (e) {}
      this.activeSourceNode = null;
    }

    if (this.activeAudio) {
      const audioToStop = this.activeAudio;
      this.activeAudio = null;

      audioToStop.onloadedmetadata = null;
      audioToStop.oncanplay = null;
      audioToStop.onplay = null;
      audioToStop.onplaying = null;
      audioToStop.onpause = null;
      audioToStop.onended = null;
      audioToStop.onerror = null;

      try {
        console.trace("[AUDIO-TRACE] EXPLICIT PAUSE CALLED inside stopActiveAudio");
        audioToStop.pause();
      } catch (e) {
        console.warn("[AUDIO-TRACE] Error pausing previous audio:", e);
      }

      audioToStop.src = "";
    }

    if (this.activeBlobUrl) {
      URL.revokeObjectURL(this.activeBlobUrl);
      this.activeBlobUrl = null;
    }
  }

  /**
   * Generates a 1.0-second PCM WAV base64 string at specified frequency (440Hz or 880Hz).
   */
  createAudibleTestWavBase64(durationSeconds = 1.0, freq = 440) {
    const sampleRate = 16000;
    const numSamples = Math.floor(sampleRate * durationSeconds);
    const dataSize = numSamples * 2; // 16-bit mono
    const buffer = new ArrayBuffer(44 + dataSize);
    const view = new DataView(buffer);

    view.setUint32(0, 0x52494646, false); // "RIFF"
    view.setUint32(4, 36 + dataSize, true);
    view.setUint32(8, 0x57415645, false); // "WAVE"
    view.setUint32(12, 0x666d7420, false); // "fmt "
    view.setUint32(16, 16, true);
    view.setUint16(20, 1, true); // PCM
    view.setUint16(22, 1, true); // Mono
    view.setUint32(24, sampleRate, true);
    view.setUint32(28, sampleRate * 2, true);
    view.setUint16(32, 2, true);
    view.setUint16(34, 16, true);
    view.setUint32(36, 0x64617461, false); // "data"
    view.setUint32(40, dataSize, true);

    for (let i = 0; i < numSamples; i++) {
      const t = i / sampleRate;
      const sample = Math.sin(2 * Math.PI * freq * t);
      const val = Math.max(-32768, Math.min(32767, sample * 20000));
      view.setInt16(44 + i * 2, val, true);
    }

    const bytes = new Uint8Array(buffer);
    let binary = '';
    for (let i = 0; i < bytes.byteLength; i++) {
      binary += String.fromCharCode(bytes[i]);
    }
    return btoa(binary);
  }

  async computeSha256(arrayBuffer) {
    try {
      const hashBuffer = await crypto.subtle.digest("SHA-256", arrayBuffer);
      const hashArray = Array.from(new Uint8Array(hashBuffer));
      return hashArray.map(b => b.toString(16).padStart(2, '0')).join('');
    } catch (e) {
      console.warn("[AUDIO-TRACE] SubtleCrypto SHA256 error:", e);
      return "unavailable";
    }
  }

  parseWavHeaderAndStats(uint8Array) {
    if (uint8Array.length < 44) return null;
    const view = new DataView(uint8Array.buffer, uint8Array.byteOffset, uint8Array.byteLength);

    const isRIFF = uint8Array[0] === 82 && uint8Array[1] === 73 && uint8Array[2] === 70 && uint8Array[3] === 70;
    if (!isRIFF) return null;

    const sampleRate = view.getUint32(24, true);
    const channels = view.getUint16(22, true);
    const bitsPerSample = view.getUint16(34, true);
    const sampleWidth = bitsPerSample / 8;

    const totalSamples = Math.floor((uint8Array.length - 44) / (sampleWidth || 2));
    const duration = sampleRate > 0 ? (totalSamples / (channels || 1) / sampleRate).toFixed(2) : 0;

    let minAmp = 0, maxAmp = 0, sumSq = 0;
    if (sampleWidth === 2 && totalSamples > 0) {
      minAmp = 32767;
      maxAmp = -32768;
      const count = Math.min(totalSamples, 100000);
      for (let i = 0; i < count; i++) {
        const val = view.getInt16(44 + i * 2, true);
        if (val < minAmp) minAmp = val;
        if (val > maxAmp) maxAmp = val;
        sumSq += val * val;
      }
      const rms = Math.round(Math.sqrt(sumSq / count));
      
      console.log(`[AUDIO-TRACE] WAV sample_rate=${sampleRate} channels=${channels} width=${sampleWidth} duration=${duration}s RMS=${rms}`);

      this.lastWavStats = {
        sampleRate,
        channels,
        sampleWidth,
        totalSamples,
        duration,
        byteLength: uint8Array.length,
        minAmp,
        maxAmp,
        rms
      };
      return this.lastWavStats;
    }
    this.lastWavStats = { sampleRate, channels, sampleWidth, totalSamples, duration, byteLength: uint8Array.length };
    return this.lastWavStats;
  }

  /**
   * Centralized Single-Owner HTML5 Audio Playback Manager.
   */
  async playAudioBlob(blob, sourceTag = "WEBSOCKET") {
    if (!blob || blob.size === 0) {
      throw new Error("Cannot play empty or missing audio Blob (0 bytes).");
    }

    const generation = ++this.playbackGeneration;
    console.log(`[AUDIO-TRACE] PLAYBACK REQUEST generation=${generation} source=${sourceTag} blob_size=${blob.size}`);

    this.stopActiveAudio();

    // 1. PRIMARY ENGINE: Web Audio API Buffer Node (100% full playback on Android & iOS without truncation)
    if (this.audioContext && (this.audioContext.state === "running" || this.audioContext.state === "suspended")) {
      try {
        if (this.audioContext.state === "suspended") {
          await this.audioContext.resume();
        }
        const arrayBuffer = await blob.arrayBuffer();
        const audioBuffer = await this.audioContext.decodeAudioData(arrayBuffer.slice(0));
        const source = this.audioContext.createBufferSource();
        source.buffer = audioBuffer;
        source.connect(this.audioContext.destination);
        this.activeSourceNode = source;

        return new Promise((resolve) => {
          source.onended = () => {
            if (generation === this.playbackGeneration) {
              this.setState('completed');
              this.activeSourceNode = null;
            }
            resolve();
          };
          this.setState('playing');
          source.start(0);
          console.log(`[AUDIO-TRACE] WEB AUDIO API BUFFER STARTED gen=${generation} duration=${audioBuffer.duration.toFixed(2)}s`);
        });
      } catch (err) {
        console.warn("[AUDIO-TRACE] Web Audio API decode error, falling back to HTML5 Audio element:", err);
      }
    }

    // 2. FALLBACK ENGINE: HTML5 Audio Element
    const blobUrl = URL.createObjectURL(blob);
    this.activeBlobUrl = blobUrl;

    const audio = new Audio();
    this.activeAudio = audio;
    console.log(`[AUDIO-TRACE] AUDIO ELEMENT CREATED generation=${generation}`);

    audio.muted = false;
    audio.volume = 1.0;
    audio.preload = "auto";
    audio.src = blobUrl;

    this.html5Events = {
      metadata: false,
      canplay: false,
      playing: false,
      ended: false,
      error: null
    };

    audio.addEventListener("loadedmetadata", () => {
      if (generation !== this.playbackGeneration) return;
      this.html5Events.metadata = true;
      console.log(`[AUDIO-TRACE] EVENT loadedmetadata gen=${generation} duration=${audio.duration}s readyState=${audio.readyState}`);
      this.renderDebugPanel();
    });

    audio.addEventListener("canplaythrough", () => {
      if (generation !== this.playbackGeneration) return;
      console.log(`[AUDIO-TRACE] EVENT canplaythrough gen=${generation}`);
    });

    audio.addEventListener("play", () => {
      if (generation !== this.playbackGeneration) return;
      console.log(`[AUDIO-TRACE] EVENT play gen=${generation}`);
    });

    audio.addEventListener("playing", () => {
      if (generation !== this.playbackGeneration) return;
      this.html5Events.playing = true;
      console.log(`[AUDIO-TRACE] EVENT playing gen=${generation} currentTime=${audio.currentTime}`);
      this.setState('playing');
    });

    audio.addEventListener("pause", () => {
      if (generation !== this.playbackGeneration) return;
      console.trace(`[AUDIO-TRACE] PAUSE EVENT gen=${generation}`);
      if (!audio.ended && audio.currentTime < audio.duration) {
        console.trace(`[AUDIO-TRACE] UNEXPECTED PAUSE DURING ACTIVE PLAYBACK gen=${generation}`);
      }
    });

    return new Promise((resolve, reject) => {
      audio.addEventListener("ended", () => {
        if (generation !== this.playbackGeneration) {
          resolve();
          return;
        }
        this.html5Events.ended = true;
        console.log(`[AUDIO-TRACE] EVENT ended gen=${generation} | PLAYBACK COMPLETED`);
        this.setState('completed');
        if (this.activeBlobUrl === blobUrl) {
          URL.revokeObjectURL(blobUrl);
          this.activeBlobUrl = null;
        }
        if (this.activeAudio === audio) {
          this.activeAudio = null;
        }
        resolve();
      });

      audio.addEventListener("error", (e) => {
        if (generation !== this.playbackGeneration) {
          resolve();
          return;
        }
        const errCode = audio.error ? audio.error.code : 'unknown';
        const errMsg = audio.error ? audio.error.message : 'HTMLAudioElement playback error';
        this.html5Events.error = `Code ${errCode}: ${errMsg}`;
        console.error(`[AUDIO-TRACE] EVENT error gen=${generation} | ${this.html5Events.error}`, e);
        this.setState('failed', this.html5Events.error);
        if (this.activeAudio === audio) {
          this.activeAudio = null;
        }
        reject(new Error(this.html5Events.error));
      });

      const triggerPlay = async () => {
        if (generation !== this.playbackGeneration) {
          resolve();
          return;
        }

        this.html5Events.canplay = true;
        console.log(`[AUDIO-TRACE] PLAY CALLED gen=${generation} readyState=${audio.readyState}`);

        try {
          const promise = audio.play();
          if (promise !== undefined) {
            await promise;
            if (generation === this.playbackGeneration) {
              console.log(`[AUDIO-TRACE] PLAY PROMISE RESOLVED gen=${generation}`);
            }
          }
        } catch (err) {
          if (generation === this.playbackGeneration) {
            console.error(`[AUDIO-TRACE] PLAY PROMISE REJECTED gen=${generation}:`, err.name, err.message);
            if (err.name === 'NotAllowedError') {
              this.audioUnlocked = false;
              this.showAudioUnlockBanner();
            }
            this.setState('failed', `${err.name}: ${err.message}`);
          }
          reject(err);
        }
      };

      if (audio.readyState >= 3) {
        triggerPlay();
      } else {
        audio.addEventListener("canplay", triggerPlay, { once: true });
        setTimeout(() => {
          if (generation === this.playbackGeneration && !this.html5Events.canplay) {
            console.warn(`[AUDIO-TRACE] canplay timeout (3s), calling play() directly gen=${generation}`);
            triggerPlay();
          }
        }, 3000);
      }

      audio.load();
    });
  }

  /**
   * Main entry point for playing base64 audio payloads from WebSocket.
   * Interrupts older audio streams for live real-time responsiveness.
   */
  async playBase64Audio(payload) {
    const rawB64 = payload ? (payload.audio_base64 || payload.audio || payload.base64) : null;
    console.log("[AUDIO-TRACE] base64 received length=", rawB64 ? rawB64.length : 0);

    if (!payload || !rawB64) {
      console.warn('[AUDIO-TRACE] AudioPlayer: Empty or missing audio payload', payload);
      this.setState('failed', 'Missing base64 audio data');
      return;
    }

    const uint8Array = this.base64ToUint8Array(rawB64);
    const mimeType = payload.mime_type || payload.mime || payload.mimeType || 'audio/wav';
    const blob = new Blob([uint8Array], { type: mimeType });

    const item = {
      payload,
      blob,
      uint8Array,
      rawB64,
      timestamp: new Date().toLocaleTimeString()
    };

    if (!payload.is_test) {
      this.lastPayload = { ...payload, audio_base64: rawB64, received_at: item.timestamp };
      this.lastSantaliAudioBlob = blob;
      this.audioHistory.push(item);

      // LIVE SPEECH INTERRUPT: Stop any currently playing old audio & clear backlogged queue items
      console.log("[AUDIO-TRACE] Live speech received: Interrupting previous audio & clearing backlog queue.");
      this.stopActiveAudio();
      this.playbackQueue = [];
      this.isProcessingQueue = false;
    }

    if (!this.audioUnlocked && !payload.is_test) {
      console.log('[AUDIO-TRACE] Autoplay locked. Queueing audio item in preUnlockQueue. Total pre-unlock queued:', this.preUnlockQueue.length + 1);
      this.preUnlockQueue = [item]; // Keep only the latest payload in pre-unlock queue!
      this.setState('ready');
      this.showAudioUnlockBanner();
      return;
    }

    this.setState('ready');

    // Enqueue item for instant playback
    this.enqueuePlaybackItem(item, payload.is_test ? "TEST_SPEAKER" : "WEBSOCKET");
  }

  enqueuePlaybackItem(item, sourceTag) {
    this.playbackQueue.push({ item, sourceTag });
    console.log(`[AUDIO-TRACE] Enqueued item for playback. Total in queue: ${this.playbackQueue.length}`);
    if (!this.isProcessingQueue) {
      this.processPlaybackQueue();
    }
  }

  async processPlaybackQueue() {
    if (this.isProcessingQueue) return;
    this.isProcessingQueue = true;

    while (this.playbackQueue.length > 0) {
      const job = this.playbackQueue.shift();
      try {
        console.log(`[AUDIO-TRACE] Processing playback queue job source=${job.sourceTag} remaining=${this.playbackQueue.length}`);
        
        if (job.item.uint8Array) {
          this.parseWavHeaderAndStats(job.item.uint8Array);
          this.wsWavSha256 = await this.computeSha256(job.item.uint8Array.buffer);
          if (job.item.payload && job.item.payload.backend_audio_sha256) {
            this.sha256Match = (this.wsWavSha256 === job.item.payload.backend_audio_sha256);
          }
        }

        await this.playAudioBlob(job.item.blob, job.sourceTag);
      } catch (e) {
        console.error("[AUDIO-TRACE] Queue playback job finished with error:", e);
      }
    }

    this.isProcessingQueue = false;
  }

  /**
   * Initializes AudioContext upon user gesture and flushes pre-unlock queue sequentially.
   */
  async initAudioContext() {
    console.log("[AUDIO-TRACE] USER GESTURE AUDIO UNLOCK START");
    const ctxStateBefore = this.audioContext ? this.audioContext.state : "none";
    console.log("[AUDIO-TRACE] AudioContext state BEFORE=", ctxStateBefore);
    
    try {
      if (!this.audioContext) {
        const AudioCtx = window.AudioContext || window.webkitAudioContext;
        if (AudioCtx) {
          this.audioContext = new AudioCtx();
        } else {
          console.warn("[AUDIO-TRACE] AudioContext not supported by this browser.");
        }
      }

      if (this.audioContext && this.audioContext.state === "suspended") {
        await this.audioContext.resume();
      }

      const ctxStateAfter = this.audioContext ? this.audioContext.state : "none";
      console.log("[AUDIO-TRACE] AudioContext state AFTER=", ctxStateAfter);

      if (this.audioContext && this.audioContext.state !== "running") {
        throw new Error(`AudioContext failed to start. State: ${this.audioContext.state}`);
      }

      this.audioUnlocked = true;
      this.lastError = null;
      this.updateEnableAudioButton(true);

      const banner = document.getElementById('audio-unlock-banner');
      if (banner) {
        banner.style.display = 'none';
      }

      // If preUnlockQueue contains pending items, flush all of them sequentially!
      if (this.preUnlockQueue.length > 0) {
        const itemsToPlay = [...this.preUnlockQueue];
        this.preUnlockQueue = [];
        console.log(`[AUDIO-TRACE] FLUSHING preUnlockQueue count=${itemsToPlay.length} sequentially...`);
        for (const jobItem of itemsToPlay) {
          this.enqueuePlaybackItem(jobItem, "PRE_UNLOCK_FLUSH");
        }
      } else {
        await this.playTestSpeaker(440);
      }

      this.renderDebugPanel();
    } catch (error) {
      console.error("[AUDIO-TRACE] Audio unlock failed:", error);
      this.audioUnlocked = false;
      this.lastError = error.message;
      this.updateEnableAudioButton(false, error.message);
      this.renderDebugPanel();
    }
  }

  async playTestSpeaker(freq = 440) {
    console.log(`[AUDIO-TRACE] TEST SPEAKER CLICKED (Freq=${freq}Hz)`);
    const testWavB64 = this.createAudibleTestWavBase64(1.0, freq);
    const uint8Array = this.base64ToUint8Array(testWavB64);
    const blob = new Blob([uint8Array], { type: "audio/wav" });
    const item = { blob, uint8Array, is_test: true };
    this.enqueuePlaybackItem(item, `TEST_SPEAKER_${freq}HZ`);
  }

  async playTestSpeakerB() {
    await this.playTestSpeaker(880);
  }

  async playDirectHttpSantaliAudio() {
    console.log("[AUDIO-TRACE] Direct HTTP WAV fetch START from /api/v1/debug/latest-santali-audio");
    try {
      const res = await fetch("/api/v1/debug/latest-santali-audio");
      console.log(`[AUDIO-TRACE] Direct HTTP WAV fetch status=${res.status}`);
      if (!res.ok) {
        const errJson = await res.json().catch(() => ({}));
        throw new Error(errJson.detail || errJson.error || `HTTP fetch error ${res.status}`);
      }

      const backendSha = res.headers.get("X-Audio-SHA256") || "N/A";
      const arrayBuffer = await res.arrayBuffer();
      const uint8Array = new Uint8Array(arrayBuffer);
      console.log(`[AUDIO-TRACE] Direct HTTP WAV size=${arrayBuffer.byteLength} bytes`);

      this.directWavSha256 = await this.computeSha256(arrayBuffer);
      console.log(`[AUDIO-TRACE] backend_audio_sha256=${backendSha}`);
      console.log(`[AUDIO-TRACE] direct_http_student_sha256=${this.directWavSha256}`);

      const blob = new Blob([arrayBuffer], { type: "audio/wav" });
      this.lastSantaliAudioBlob = blob;
      
      const item = { blob, uint8Array, is_test: false };
      this.enqueuePlaybackItem(item, "DIRECT_HTTP");
    } catch (e) {
      console.error("[AUDIO-TRACE] Direct HTTP WAV play failed:", e);
      this.setState('failed', `Direct HTTP WAV: ${e.message}`);
    }
  }

  async playStandaloneVisibleAudio() {
    console.log("[AUDIO-TRACE] PLAY LAST SANTALI AUDIO NOW (STANDALONE VISIBLE AUDIO) triggered");
    if (!this.lastSantaliAudioBlob && !this.lastPayload) {
      alert("No Santali audio payload available yet. Please generate speech from Teacher first.");
      return;
    }

    try {
      let blob = this.lastSantaliAudioBlob;
      if (!blob && this.lastPayload) {
        const uint8Array = this.base64ToUint8Array(this.lastPayload.audio_base64);
        blob = new Blob([uint8Array], { type: "audio/wav" });
      }

      const container = document.getElementById("standalone-audio-container");
      if (container) {
        container.innerHTML = "";
        const blobUrl = URL.createObjectURL(blob);

        const audio = document.createElement("audio");
        audio.controls = true;
        audio.preload = "auto";
        audio.muted = false;
        audio.volume = 1.0;
        audio.style.width = "100%";
        audio.style.marginTop = "0.5rem";
        audio.src = blobUrl;

        container.appendChild(audio);
        audio.load();
        
        console.log("[AUDIO-TRACE] Calling play() on standalone visible audio element...");
        const p = audio.play();
        if (p !== undefined) {
          await p;
          console.log("[AUDIO-TRACE] STANDALONE play() promise resolved cleanly!");
        }
      }
    } catch (e) {
      console.error("[AUDIO-TRACE] Standalone audio playback error:", e);
    }
  }

  updateEnableAudioButton(enabled, errorMsg = null) {
    const btn = document.getElementById("enableAudioBtn");
    if (!btn) return;
    if (enabled) {
      btn.innerText = "🔊 AUDIO ENABLED";
      btn.disabled = true;
      btn.style.opacity = "0.7";
      btn.style.cursor = "default";
      btn.className = "btn btn-secondary btn-large";
    } else {
      btn.innerText = "⚠️ ENABLE AUDIO FAILED";
      btn.disabled = false;
      btn.style.opacity = "1";
    }
  }

  setState(newState, errorMsg = null) {
    this.state = newState;
    this.lastError = errorMsg;
    if (this.onStateChange) {
      this.onStateChange(newState, errorMsg);
    }
    this.updateUI();
    this.renderDebugPanel();
  }

  base64ToUint8Array(b64Data) {
    if (!b64Data || typeof b64Data !== 'string') {
      throw new Error('Base64 data must be a non-empty string.');
    }
    const cleanB64 = b64Data.trim().replace(/[\r\n]/g, '');
    const byteCharacters = atob(cleanB64);
    const byteArray = new Uint8Array(byteCharacters.length);
    for (let i = 0; i < byteCharacters.length; i++) {
      byteArray[i] = byteCharacters.charCodeAt(i);
    }
    return byteArray;
  }

  stop() {
    console.log("[AUDIO-TRACE] Manual STOP requested — clearing queue and stopping active audio");
    this.playbackQueue = [];
    this.preUnlockQueue = [];
    this.isProcessingQueue = false;
    this.stopActiveAudio();
    this.setState('ready');
  }

  async replay() {
    if (this.lastSantaliAudioBlob) {
      console.log("[AUDIO-TRACE] Manual REPLAY LAST SANTALI AUDIO (WS) triggered");
      const item = { blob: this.lastSantaliAudioBlob, is_test: false };
      this.enqueuePlaybackItem(item, "REPLAY_WS");
    } else if (this.lastPayload) {
      console.log("[AUDIO-TRACE] Manual REPLAY using lastPayload base64...");
      await this.playBase64Audio(this.lastPayload);
    } else {
      console.warn("[AUDIO-TRACE] No last Santali audio available to replay.");
    }
  }

  recordPhysicalSoundFeedback(heard) {
    this.physicalSoundHeard = heard;
    console.log(`[AUDIO-TRACE] USER PHYSICAL SOUND FEEDBACK: ${heard ? 'HEARD (YES)' : 'SILENT (NO)'}`);
    this.renderDebugPanel();
  }

  showAudioUnlockBanner() {
    const banner = document.getElementById('audio-unlock-banner');
    if (banner) {
      banner.style.display = 'flex';
    }
  }

  updateUI() {
    const playerContainer = document.getElementById(this.containerId);
    if (!playerContainer) return;

    let statusText = '';
    let badgeStyle = 'background: rgba(99, 102, 241, 0.2); color: #a5b4fc; border: 1px solid rgba(99, 102, 241, 0.4);';

    switch (this.state) {
      case 'generating':
        statusText = '⏳ Generating audio...';
        badgeStyle = 'background: rgba(245, 158, 11, 0.2); color: #fbbf24; border: 1px solid rgba(245, 158, 11, 0.4);';
        break;
      case 'ready':
        statusText = '🔊 Audio ready';
        badgeStyle = 'background: rgba(16, 185, 129, 0.2); color: #34d399; border: 1px solid rgba(16, 185, 129, 0.4);';
        break;
      case 'playing':
        statusText = '🔊 Playing audio...';
        badgeStyle = 'background: rgba(16, 185, 129, 0.3); color: #34d399; border: 1px solid #34d399; font-weight:700;';
        break;
      case 'completed':
        statusText = '✅ Playback complete';
        badgeStyle = 'background: rgba(16, 185, 129, 0.15); color: #34d399; border: 1px solid rgba(16, 185, 129, 0.3);';
        break;
      case 'failed':
        statusText = `⚠️ Playback failed (${this.lastError || 'Error'})`;
        badgeStyle = 'background: rgba(239, 68, 68, 0.2); color: #f87171; border: 1px solid rgba(239, 68, 68, 0.4);';
        break;
      default:
        statusText = 'Audio Idle';
    }

    playerContainer.innerHTML = `
      <div style="display:flex; flex-direction:column; align-items:center; gap:0.75rem; margin-top:0.75rem;">
        <div style="display:flex; align-items:center; gap:0.5rem; flex-wrap:wrap; justify-content:center;">
          <span class="status-badge" style="${badgeStyle}">${statusText}</span>
          <button class="btn btn-success" style="padding:0.4rem 0.8rem; font-size:0.85rem;" onclick="window.bhashaAudioPlayer.playTestSpeaker(440)">🔊 TEST A (1s 440Hz)</button>
          <button class="btn btn-success" style="padding:0.4rem 0.8rem; font-size:0.85rem; background:#0284c7;" onclick="window.bhashaAudioPlayer.playTestSpeakerB()">🔊 TEST B (1s 880Hz)</button>
          <button class="btn btn-primary" style="padding:0.4rem 0.8rem; font-size:0.85rem;" onclick="window.bhashaAudioPlayer.playDirectHttpSantaliAudio()">🔊 DIRECT HTTP SANTALI WAV</button>
          <button class="btn btn-warning" style="padding:0.4rem 0.8rem; font-size:0.85rem; background:#d97706; color:#fff;" onclick="window.bhashaAudioPlayer.playStandaloneVisibleAudio()">▶ PLAY LAST SANTALI AUDIO NOW</button>
          <button class="btn btn-secondary" style="padding:0.4rem 0.8rem; font-size:0.85rem;" onclick="window.bhashaAudioPlayer.replay()">🔁 REPLAY LAST (WS)</button>
          <button class="btn btn-danger" style="padding:0.4rem 0.8rem; font-size:0.85rem; background:#dc2626;" onclick="window.bhashaAudioPlayer.stop()">⏹ Stop</button>
        </div>

        <div id="standalone-audio-container" style="width:100%; max-width:450px;"></div>

        <div style="background:rgba(255,255,255,0.05); border:1px dashed var(--card-border); padding:0.6rem 1rem; border-radius:0.5rem; text-align:center; font-size:0.85rem;">
          <span style="font-weight:600; color:#c7d2fe; margin-right:0.5rem;">Did you physically hear sound from your speaker?</span>
          <button class="btn btn-success" style="padding:0.2rem 0.6rem; font-size:0.8rem;" onclick="window.bhashaAudioPlayer.recordPhysicalSoundFeedback(true)">YES — I HEAR TEST TONE</button>
          <button class="btn btn-danger" style="padding:0.2rem 0.6rem; font-size:0.8rem; background:#ef4444;" onclick="window.bhashaAudioPlayer.recordPhysicalSoundFeedback(false)">NO — I DO NOT HEAR TEST TONE</button>
        </div>
      </div>
    `;
  }

  renderDebugPanel() {
    const debugContainer = document.getElementById(this.debugPanelId);
    if (!debugContainer) return;

    const ctxState = this.audioContext ? this.audioContext.state : 'unavailable';
    const unlockStatus = this.audioUnlocked ? 'SUCCESS' : (this.lastError ? 'FAILED' : 'NOT UNLOCKED');
    const buttonState = this.audioUnlocked ? 'CLICKED' : 'NOT CLICKED';
    const queuedStatus = (this.playbackQueue.length + this.preUnlockQueue.length) > 0 ? `YES (${this.playbackQueue.length + this.preUnlockQueue.length} queued)` : 'NO';
    const playbackState = this.state.toUpperCase();
    const errorStr = this.lastError || 'None';
    const secureCtx = window.isSecureContext ? 'YES (HTTPS)' : 'NO (HTTP)';
    
    let physicalText = 'NOT TESTED BY USER';
    let physicalColor = '#facc15';
    if (this.physicalSoundHeard === true) {
      physicalText = 'CONFIRMED AUDIBLE (YES)';
      physicalColor = '#34d399';
    } else if (this.physicalSoundHeard === false) {
      physicalText = 'SILENT / NOT HEARD (NO)';
      physicalColor = '#f87171';
    }

    const p = this.lastPayload;
    const b64Len = p && p.audio_base64 ? p.audio_base64.length : 0;
    const decodedBytes = p ? (p.byte_length || Math.round(b64Len * 0.75)) : 0;
    const sizeKB = (decodedBytes / 1024).toFixed(1) + ' KB';
    const shaMatchStr = this.sha256Match === true ? 'YES (MATCH)' : (this.sha256Match === false ? 'NO (MISMATCH)' : 'UNCHECKED');

    const ev = this.html5Events;
    const stats = this.lastWavStats || {};

    debugContainer.innerHTML = `
      <details style="background:rgba(0,0,0,0.5); border:1px solid var(--card-border); border-radius:0.5rem; padding:0.75rem; font-family:monospace; font-size:0.8rem; color:#94a3b8; margin-top:1rem;" open>
        <summary style="cursor:pointer; font-weight:700; color:#38bdf8;">🛠️ PHONE AUDIO DIAGNOSTIC PANEL (SEQUENTIAL FIFO QUEUE ACTIVE)</summary>
        <div style="display:grid; grid-template-columns: repeat(auto-fit, minmax(220px, 1fr)); gap:0.5rem; margin-top:0.5rem; text-align:left;">
          <div>Physical Speaker Sound: <strong style="color:${physicalColor};">${physicalText}</strong></div>
          <div>Playback Gen ID: <strong style="color:#38bdf8;">#${this.playbackGeneration}</strong></div>
          <div>Playback Queue Count: <strong style="color:#38bdf8;">${this.playbackQueue.length} items</strong></div>
          <div>Pre-Unlock Queue Count: <strong style="color:#facc15;">${this.preUnlockQueue.length} items</strong></div>
          <div>Audio History Size: <strong style="color:#34d399;">${this.audioHistory.length} clips</strong></div>
          <div>Secure Context: <strong style="color:${window.isSecureContext ? '#34d399' : '#f87171'};">${secureCtx}</strong></div>
          <div>Audio unlock: <strong style="color:${this.audioUnlocked ? '#34d399' : '#f87171'};">${unlockStatus}</strong></div>
          <div>AudioContext State: <strong style="color:${ctxState === 'running' ? '#34d399' : '#facc15'};">${ctxState}</strong></div>
          <div>Button State: <strong style="color:#fff;">${buttonState}</strong></div>
          <div>Queued audio: <strong style="color:#38bdf8;">${queuedStatus}</strong></div>
          <div>Last Playback: <strong style="color:${this.state === 'playing' || this.state === 'completed' ? '#34d399' : '#facc15'};">${playbackState}</strong></div>
          <div>HTML5 Metadata: <strong style="color:${ev.metadata ? '#34d399' : '#facc15'};">${ev.metadata ? 'YES' : 'NO'}</strong></div>
          <div>HTML5 CanPlay: <strong style="color:${ev.canplay ? '#34d399' : '#facc15'};">${ev.canplay ? 'YES' : 'NO'}</strong></div>
          <div>HTML5 Playing Event: <strong style="color:${ev.playing ? '#34d399' : '#facc15'};">${ev.playing ? 'YES' : 'NO'}</strong></div>
          <div>HTML5 Ended Event: <strong style="color:${ev.ended ? '#34d399' : '#facc15'};">${ev.ended ? 'YES' : 'NO'}</strong></div>
          <div>Error: <strong style="color:${this.lastError ? '#f87171' : '#94a3b8'};">${errorStr}</strong></div>
          <div>Base64 length: <strong style="color:#fff;">${b64Len}</strong></div>
          <div>Decoded bytes: <strong style="color:#fff;">${decodedBytes} (${sizeKB})</strong></div>
          <div>WS SHA256: <strong style="color:#fff; font-size:0.7rem;">${this.wsWavSha256 || 'N/A'}</strong></div>
          <div>Direct HTTP SHA256: <strong style="color:#fff; font-size:0.7rem;">${this.directWavSha256 || 'N/A'}</strong></div>
          <div>SHA256 Match: <strong style="color:${this.sha256Match ? '#34d399' : '#facc15'};">${shaMatchStr}</strong></div>
          <div>WAV Sample Rate: <strong style="color:#fff;">${stats.sampleRate || 44100} Hz</strong></div>
          <div>WAV Channels: <strong style="color:#fff;">${stats.channels || 1}</strong></div>
          <div>WAV RMS / Peak: <strong style="color:#34d399;">RMS=${stats.rms || 0} (Min:${stats.minAmp || 0}, Max:${stats.maxAmp || 0})</strong></div>
          <div>Audio Duration: <strong style="color:#34d399;">${stats.duration || (p ? p.audio_duration : 0)} sec</strong></div>
        </div>
      </details>
    `;
  }
}

// Global single instance
window.bhashaAudioPlayer = new BhashaSetuAudioPlayer();
