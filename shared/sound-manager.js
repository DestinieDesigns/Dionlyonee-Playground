/**
 * Dionlyonee Playground - Sound Manager
 * Handles both synthesized sound cues and audio asset playback.
 */
(function () {
  class SoundManager {
    constructor() {
      this.ctx = null;
      this.muted = false;
      this.audioElements = {};
      this.initAudioElements();
    }

    initAudioElements() {
      const soundFiles = {
        correct: '/assets/sounds/correct.mp3',
        wrong: '/assets/sounds/wrong.mp3',
        countdown: '/assets/sounds/countdown.mp3',
        spin: '/assets/sounds/spin.mp3',
        applause: '/assets/sounds/applause.mp3',
        winner: '/assets/sounds/winner.mp3',
      };

      for (const [key, path] of Object.entries(soundFiles)) {
        try {
          const audio = new Audio(path);
          audio.preload = 'auto';
          this.audioElements[key] = audio;
        } catch (e) {}
      }
    }

    getAudioContext() {
      if (!this.ctx && (window.AudioContext || window.webkitAudioContext)) {
        const AudioCtx = window.AudioContext || window.webkitAudioContext;
        this.ctx = new AudioCtx();
      }
      if (this.ctx && this.ctx.state === 'suspended') {
        this.ctx.resume().catch(() => {});
      }
      return this.ctx;
    }

    play(name) {
      if (this.muted) return;

      // Try playing audio element first
      const audio = this.audioElements[name];
      if (audio) {
        audio.currentTime = 0;
        const p = audio.play();
        if (p && p.catch) {
          p.catch(() => this.playSynth(name));
        }
        return;
      }

      this.playSynth(name);
    }

    playSynth(name) {
      try {
        const ctx = this.getAudioContext();
        if (!ctx) return;
        const now = ctx.currentTime;

        if (name === 'correct' || name === 'reveal') {
          const osc = ctx.createOscillator();
          const gain = ctx.createGain();
          osc.type = 'triangle';
          osc.frequency.setValueAtTime(523.25, now); // C5
          osc.frequency.exponentialRampToValueAtTime(783.99, now + 0.15); // G5
          gain.gain.setValueAtTime(0.25, now);
          gain.gain.exponentialRampToValueAtTime(0.01, now + 0.35);
          osc.connect(gain);
          gain.connect(ctx.destination);
          osc.start(now);
          osc.stop(now + 0.35);
        } else if (name === 'wrong' || name === 'buzzer' || name === 'bankrupt') {
          const osc = ctx.createOscillator();
          const gain = ctx.createGain();
          osc.type = 'sawtooth';
          osc.frequency.setValueAtTime(146.83, now); // D3
          osc.frequency.linearRampToValueAtTime(110.0, now + 0.35); // A2
          gain.gain.setValueAtTime(0.3, now);
          gain.gain.exponentialRampToValueAtTime(0.01, now + 0.4);
          osc.connect(gain);
          gain.connect(ctx.destination);
          osc.start(now);
          osc.stop(now + 0.4);
        } else if (name === 'spin' || name === 'wheel') {
          const osc = ctx.createOscillator();
          const gain = ctx.createGain();
          osc.type = 'sine';
          osc.frequency.setValueAtTime(440, now);
          osc.frequency.exponentialRampToValueAtTime(880, now + 0.2);
          gain.gain.setValueAtTime(0.15, now);
          gain.gain.exponentialRampToValueAtTime(0.01, now + 0.3);
          osc.connect(gain);
          gain.connect(ctx.destination);
          osc.start(now);
          osc.stop(now + 0.3);
        } else if (name === 'wheel_tick' || name === 'tick') {
          const osc = ctx.createOscillator();
          const gain = ctx.createGain();
          osc.type = 'square';
          osc.frequency.setValueAtTime(1200, now);
          gain.gain.setValueAtTime(0.08, now);
          gain.gain.exponentialRampToValueAtTime(0.001, now + 0.04);
          osc.connect(gain);
          gain.connect(ctx.destination);
          osc.start(now);
          osc.stop(now + 0.05);
        } else if (name === 'countdown') {
          const osc = ctx.createOscillator();
          const gain = ctx.createGain();
          osc.type = 'sine';
          osc.frequency.setValueAtTime(659.25, now); // E5
          gain.gain.setValueAtTime(0.2, now);
          gain.gain.exponentialRampToValueAtTime(0.01, now + 0.15);
          osc.connect(gain);
          gain.connect(ctx.destination);
          osc.start(now);
          osc.stop(now + 0.15);
        } else if (name === 'applause' || name === 'winner') {
          [523.25, 659.25, 783.99, 1046.5].forEach((freq, idx) => {
            const osc = ctx.createOscillator();
            const gain = ctx.createGain();
            osc.type = 'triangle';
            osc.frequency.setValueAtTime(freq, now + idx * 0.1);
            gain.gain.setValueAtTime(0.15, now + idx * 0.1);
            gain.gain.exponentialRampToValueAtTime(0.01, now + idx * 0.1 + 0.4);
            osc.connect(gain);
            gain.connect(ctx.destination);
            osc.start(now + idx * 0.1);
            osc.stop(now + idx * 0.1 + 0.45);
          });
        }
      } catch (err) {}
    }
  }

  window.SoundManager = new SoundManager();
  window.sounds = window.SoundManager;
})();
