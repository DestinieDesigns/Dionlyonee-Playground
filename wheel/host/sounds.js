// Dionlyonee Soundboard Engine (Vanilla Web Audio API)
// Provides instant high-fidelity audio feedback without external audio files

class DionlyoneeSoundEngine {
  constructor() {
    this.ctx = null;
    this.muted = false;
  }

  init() {
    if (!this.ctx) {
      const AudioCtx = window.AudioContext || window.webkitAudioContext;
      if (AudioCtx) {
        this.ctx = new AudioCtx();
      }
    }
    if (this.ctx && this.ctx.state === 'suspended') {
      this.ctx.resume();
    }
  }

  play(soundName) {
    if (this.muted) return;
    try {
      this.init();
      if (!this.ctx) return;

      const t = this.ctx.currentTime;

      switch (soundName) {
        case 'correct':
        case 'ding': {
          // Cheerful two-tone bell
          const osc1 = this.ctx.createOscillator();
          const osc2 = this.ctx.createOscillator();
          const gain = this.ctx.createGain();

          osc1.type = 'sine';
          osc1.frequency.setValueAtTime(523.25, t); // C5
          osc1.frequency.setValueAtTime(659.25, t + 0.1); // E5
          osc1.frequency.setValueAtTime(1046.5, t + 0.2); // C6

          osc2.type = 'triangle';
          osc2.frequency.setValueAtTime(1046.5, t + 0.2);

          gain.gain.setValueAtTime(0.01, t);
          gain.gain.linearRampToValueAtTime(0.25, t + 0.05);
          gain.gain.exponentialRampToValueAtTime(0.001, t + 0.8);

          osc1.connect(gain);
          osc2.connect(gain);
          gain.connect(this.ctx.destination);

          osc1.start(t);
          osc2.start(t);
          osc1.stop(t + 0.85);
          osc2.stop(t + 0.85);
          break;
        }

        case 'wrong':
        case 'buzzer': {
          // Game show harsh low buzzer
          const osc = this.ctx.createOscillator();
          const gain = this.ctx.createGain();

          osc.type = 'sawtooth';
          osc.frequency.setValueAtTime(130, t);
          osc.frequency.linearRampToValueAtTime(110, t + 0.4);

          gain.gain.setValueAtTime(0.3, t);
          gain.gain.exponentialRampToValueAtTime(0.01, t + 0.45);

          osc.connect(gain);
          gain.connect(this.ctx.destination);

          osc.start(t);
          osc.stop(t + 0.5);
          break;
        }

        case 'reveal':
        case 'click': {
          // Crisp mechanical tile reveal click
          const osc = this.ctx.createOscillator();
          const gain = this.ctx.createGain();

          osc.type = 'sine';
          osc.frequency.setValueAtTime(800, t);
          osc.frequency.exponentialRampToValueAtTime(300, t + 0.08);

          gain.gain.setValueAtTime(0.2, t);
          gain.gain.exponentialRampToValueAtTime(0.001, t + 0.09);

          osc.connect(gain);
          gain.connect(this.ctx.destination);

          osc.start(t);
          osc.stop(t + 0.1);
          break;
        }

        case 'tick':
        case 'wheel_tick': {
          // Wheel spin mechanical flipper tick
          const osc = this.ctx.createOscillator();
          const gain = this.ctx.createGain();

          osc.type = 'triangle';
          osc.frequency.setValueAtTime(1100, t);
          osc.frequency.exponentialRampToValueAtTime(350, t + 0.035);

          gain.gain.setValueAtTime(0.2, t);
          gain.gain.exponentialRampToValueAtTime(0.001, t + 0.035);

          osc.connect(gain);
          gain.connect(this.ctx.destination);

          osc.start(t);
          osc.stop(t + 0.04);
          break;
        }

        case 'wheel': {
          // Authentic TV Game Show Wheel flutter & deceleration
          const spinDuration = 3.6;
          let tickTime = t;
          let interval = 0.04;
          while (tickTime < t + spinDuration) {
            const osc = this.ctx.createOscillator();
            const gain = this.ctx.createGain();

            osc.type = 'triangle';
            osc.frequency.setValueAtTime(1250, tickTime);
            osc.frequency.exponentialRampToValueAtTime(300, tickTime + 0.025);

            gain.gain.setValueAtTime(0.18, tickTime);
            gain.gain.exponentialRampToValueAtTime(0.001, tickTime + 0.025);

            osc.connect(gain);
            gain.connect(this.ctx.destination);

            osc.start(tickTime);
            osc.stop(tickTime + 0.03);

            interval *= 1.055; // gradually decelerate
            tickTime += interval;
          }
          break;
        }

        case 'bankrupt': {
          // Slide down sad horn / whistle
          const osc = this.ctx.createOscillator();
          const gain = this.ctx.createGain();

          osc.type = 'sawtooth';
          osc.frequency.setValueAtTime(320, t);
          osc.frequency.linearRampToValueAtTime(90, t + 0.7);

          gain.gain.setValueAtTime(0.25, t);
          gain.gain.linearRampToValueAtTime(0.01, t + 0.75);

          osc.connect(gain);
          gain.connect(this.ctx.destination);

          osc.start(t);
          osc.stop(t + 0.8);
          break;
        }

        case 'horn':
        case 'airhorn': {
          // Stream hype multi-tone air horn
          const freqs = [466.16, 466.16 * 1.05, 587.33, 700];
          freqs.forEach((freq) => {
            const osc = this.ctx.createOscillator();
            const gain = this.ctx.createGain();

            osc.type = 'sawtooth';
            osc.frequency.setValueAtTime(freq, t);
            osc.frequency.linearRampToValueAtTime(freq * 1.02, t + 0.4);

            gain.gain.setValueAtTime(0.15, t);
            gain.gain.exponentialRampToValueAtTime(0.01, t + 0.45);

            osc.connect(gain);
            gain.connect(this.ctx.destination);

            osc.start(t);
            osc.stop(t + 0.5);
          });
          break;
        }

        case 'fanfare':
        case 'victory': {
          // Joyful game win fanfare
          const notes = [
            { f: 523.25, d: 0.15 },
            { f: 659.25, d: 0.15 },
            { f: 783.99, d: 0.15 },
            { f: 1046.5, d: 0.5 },
          ];
          let delay = 0;
          notes.forEach((n) => {
            const osc = this.ctx.createOscillator();
            const gain = this.ctx.createGain();

            osc.type = 'triangle';
            osc.frequency.setValueAtTime(n.f, t + delay);

            gain.gain.setValueAtTime(0.2, t + delay);
            gain.gain.exponentialRampToValueAtTime(0.001, t + delay + n.d);

            osc.connect(gain);
            gain.connect(this.ctx.destination);

            osc.start(t + delay);
            osc.stop(t + delay + n.d + 0.05);
            delay += n.d * 0.8;
          });
          break;
        }

        case 'drumroll': {
          // Suspense drumroll burst
          for (let i = 0; i < 8; i++) {
            const osc = this.ctx.createOscillator();
            const gain = this.ctx.createGain();
            const noteTime = t + i * 0.06;

            osc.type = 'triangle';
            osc.frequency.setValueAtTime(160 + i * 15, noteTime);

            gain.gain.setValueAtTime(0.15, noteTime);
            gain.gain.exponentialRampToValueAtTime(0.001, noteTime + 0.05);

            osc.connect(gain);
            gain.connect(this.ctx.destination);

            osc.start(noteTime);
            osc.stop(noteTime + 0.06);
          }
          break;
        }
      }
    } catch (err) {
      console.warn('Audio playback error:', err);
    }
  }
}

// Global instance
const sounds = new DionlyoneeSoundEngine();
window.sounds = sounds;

// Self-contained lightweight Canvas Confetti helper
function triggerConfetti() {
  const canvas = document.createElement('canvas');
  canvas.style.position = 'fixed';
  canvas.style.top = '0';
  canvas.style.left = '0';
  canvas.style.width = '100vw';
  canvas.style.height = '100vh';
  canvas.style.pointerEvents = 'none';
  canvas.style.zIndex = '9999';
  document.body.appendChild(canvas);

  const ctx = canvas.getContext('2d');
  canvas.width = window.innerWidth;
  canvas.height = window.innerHeight;

  const colors = ['#d4af37', '#ffffff', '#fbbf24', '#f59e0b', '#10b981', '#3b82f6', '#ec4899'];
  const particles = [];
  const count = 120;

  for (let i = 0; i < count; i++) {
    particles.push({
      x: canvas.width / 2 + (Math.random() - 0.5) * 200,
      y: canvas.height * 0.4,
      vx: (Math.random() - 0.5) * 16,
      vy: Math.random() * -14 - 4,
      size: Math.random() * 8 + 4,
      color: colors[Math.floor(Math.random() * colors.length)],
      rotation: Math.random() * 360,
      vRot: (Math.random() - 0.5) * 10,
      alpha: 1,
    });
  }

  let animationFrame;
  function update() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    let alive = false;

    particles.forEach((p) => {
      p.x += p.vx;
      p.y += p.vy;
      p.vy += 0.4; // gravity
      p.vx *= 0.99;
      p.rotation += p.vRot;
      p.alpha -= 0.008;

      if (p.alpha > 0 && p.y < canvas.height + 50) {
        alive = true;
        ctx.save();
        ctx.translate(p.x, p.y);
        ctx.rotate((p.rotation * Math.PI) / 180);
        ctx.globalAlpha = Math.max(0, p.alpha);
        ctx.fillStyle = p.color;
        ctx.fillRect(-p.size / 2, -p.size / 2, p.size, p.size * 0.6);
        ctx.restore();
      }
    });

    if (alive) {
      animationFrame = requestAnimationFrame(update);
    } else {
      cancelAnimationFrame(animationFrame);
      if (canvas.parentNode) {
        canvas.parentNode.removeChild(canvas);
      }
    }
  }

  update();
}
window.triggerConfetti = triggerConfetti;
