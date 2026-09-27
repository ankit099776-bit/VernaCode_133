/**
 * BhashaSetu AI — Single-Owner Sequential Queue Audio Player Service for React
 */

export class BhashaSetuAudioPlayer {
  constructor(options = {}) {
    this.audioContext = null;
    this.activeAudio = null;
    this.activeBlobUrl = null;
    this.activeSourceNode = null;
    this.playbackGeneration = 0;
    
    this.playbackQueue = [];
    this.preUnlockQueue = [];
    this.audioHistory = [];
    this.isProcessingQueue = false;
    this.audioUnlocked = false;

    this.state = 'idle'; // idle | ready | playing | completed | failed
    this.lastError = null;
    this.lastSantaliAudioBlob = null;
    this.lastPayload = null;
    this.onStateChange = options.onStateChange || null;

    const autoUnlockHandler = () => {
      if (!this.audioUnlocked) {
        this.initAudioContext();
      }
    };
    if (typeof window !== 'undefined') {
      ['touchstart', 'touchend', 'click', 'pointerdown'].forEach(evt => {
        window.addEventListener(evt, autoUnlockHandler, { passive: true });
      });
    }
  }

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
      audioToStop.onplaying = null;
      audioToStop.onended = null;
      audioToStop.onerror = null;
      try {
        audioToStop.pause();
      } catch (e) {}
      audioToStop.src = '';
    }

    if (this.activeBlobUrl) {
      URL.revokeObjectURL(this.activeBlobUrl);
      this.activeBlobUrl = null;
    }
  }

  async initAudioContext() {
    try {
      if (!this.audioContext) {
        const AudioCtx = window.AudioContext || window.webkitAudioContext;
        if (AudioCtx) {
          this.audioContext = new AudioCtx();
        }
      }

      if (this.audioContext && this.audioContext.state === 'suspended') {
        await this.audioContext.resume();
      }

      if (this.audioContext && this.audioContext.state === 'running') {
        this.audioUnlocked = true;
        this.lastError = null;

        if (this.preUnlockQueue.length > 0) {
          const itemsToPlay = [...this.preUnlockQueue];
          this.preUnlockQueue = [];
          for (const jobItem of itemsToPlay) {
            this.enqueuePlaybackItem(jobItem, 'PRE_UNLOCK_FLUSH');
          }
        }
      }
    } catch (error) {
      console.warn('AudioContext unlock failed:', error);
      this.audioUnlocked = false;
      this.lastError = error.message;
    }
  }

  async playAudioBlob(blob, sourceTag = 'WEBSOCKET') {
    if (!blob || blob.size === 0) return;

    const generation = ++this.playbackGeneration;
    this.stopActiveAudio();

    if (this.audioContext && (this.audioContext.state === 'running' || this.audioContext.state === 'suspended')) {
      try {
        if (this.audioContext.state === 'suspended') {
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
        });
      } catch (err) {
        console.warn('Web Audio API decode error, falling back to HTML5 Audio:', err);
      }
    }

    const blobUrl = URL.createObjectURL(blob);
    this.activeBlobUrl = blobUrl;

    const audio = new Audio();
    this.activeAudio = audio;
    audio.muted = false;
    audio.volume = 1.0;
    audio.preload = 'auto';
    audio.src = blobUrl;

    return new Promise((resolve, reject) => {
      audio.addEventListener('ended', () => {
        if (generation !== this.playbackGeneration) {
          resolve();
          return;
        }
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

      audio.addEventListener('error', (e) => {
        if (generation !== this.playbackGeneration) {
          resolve();
          return;
        }
        const errMsg = audio.error ? audio.error.message : 'Playback error';
        this.setState('failed', errMsg);
        if (this.activeAudio === audio) {
          this.activeAudio = null;
        }
        reject(new Error(errMsg));
      });

      const triggerPlay = async () => {
        if (generation !== this.playbackGeneration) {
          resolve();
          return;
        }
        try {
          const promise = audio.play();
          if (promise !== undefined) {
            await promise;
          }
        } catch (err) {
          if (generation === this.playbackGeneration) {
            this.setState('failed', `${err.name}: ${err.message}`);
          }
          reject(err);
        }
      };

      if (audio.readyState >= 3) {
        triggerPlay();
      } else {
        audio.addEventListener('canplay', triggerPlay, { once: true });
        setTimeout(() => {
          if (generation === this.playbackGeneration) {
            triggerPlay();
          }
        }, 3000);
      }

      audio.load();
    });
  }

  async playBase64Audio(payload) {
    const rawB64 = payload ? (payload.audio_base64 || payload.audio || payload.base64) : null;
    if (!payload || !rawB64) {
      this.setState('failed', 'Missing base64 audio payload');
      return;
    }

    const uint8Array = this.base64ToUint8Array(rawB64);
    const mimeType = payload.mime_type || payload.mime || 'audio/wav';
    const blob = new Blob([uint8Array], { type: mimeType });

    const item = { payload, blob, uint8Array, rawB64, timestamp: new Date().toLocaleTimeString() };
    this.lastPayload = { ...payload, audio_base64: rawB64 };
    this.lastSantaliAudioBlob = blob;
    this.audioHistory.push(item);

    this.stopActiveAudio();
    this.playbackQueue = [];
    this.isProcessingQueue = false;

    if (!this.audioUnlocked) {
      this.preUnlockQueue = [item];
      this.setState('ready');
      return;
    }

    this.setState('ready');
    this.enqueuePlaybackItem(item, 'WEBSOCKET');
  }

  enqueuePlaybackItem(item, sourceTag) {
    this.playbackQueue.push({ item, sourceTag });
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
        await this.playAudioBlob(job.item.blob, job.sourceTag);
      } catch (e) {
        console.error('Playback queue job error:', e);
      }
    }
    this.isProcessingQueue = false;
  }

  base64ToUint8Array(b64Data) {
    const cleanB64 = b64Data.trim().replace(/[\r\n]/g, '');
    const byteCharacters = atob(cleanB64);
    const byteArray = new Uint8Array(byteCharacters.length);
    for (let i = 0; i < byteCharacters.length; i++) {
      byteArray[i] = byteCharacters.charCodeAt(i);
    }
    return byteArray;
  }

  stop() {
    this.playbackQueue = [];
    this.preUnlockQueue = [];
    this.isProcessingQueue = false;
    this.stopActiveAudio();
    this.setState('ready');
  }

  async replay() {
    if (this.lastSantaliAudioBlob) {
      const item = { blob: this.lastSantaliAudioBlob, is_test: false };
      this.enqueuePlaybackItem(item, 'REPLAY_WS');
    } else if (this.lastPayload) {
      await this.playBase64Audio(this.lastPayload);
    }
  }

  setState(newState, errorMsg = null) {
    this.state = newState;
    this.lastError = errorMsg;
    if (this.onStateChange) {
      this.onStateChange(newState, errorMsg);
    }
  }
}

export const globalAudioPlayer = new BhashaSetuAudioPlayer();
