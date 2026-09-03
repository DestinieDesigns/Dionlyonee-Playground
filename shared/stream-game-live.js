/**
 * Dionlyonee Playground - Universal Stream Game Live Audience Screen
 * Receives broadcast updates over BroadcastChannel and displays live prompt cards,
 * countdown timers, reveal animations, and sound effects.
 */
(function () {
  'use strict';

  class StreamGameLive {
    constructor(gameId) {
      this.gameId = gameId;
      this.gameMeta = (window.StreamGamesData && window.StreamGamesData[gameId]) || {
        title: gameId.toUpperCase().replace(/-/g, ' '),
        badge: 'LIVE SHOW',
        prompts: []
      };

      this.channel = new BroadcastChannel('dionlyonee-stream-games');
      this.state = null;

      this.init();
    }

    init() {
      // Listen for broadcasts
      this.channel.onmessage = (event) => {
        const data = event.data;
        if (!data) return;

        if (data.type === 'UPDATE_STATE' && data.state && data.state.gameId === this.gameId) {
          this.state = data.state;
          this.render();
        } else if (data.type === 'PLAY_SOUND' && data.gameId === this.gameId) {
          if (window.Sounds && typeof window.Sounds[data.sound] === 'function') {
            window.Sounds[data.sound]();
          }
        }
      };

      // Load cached state
      try {
        const cached = sessionStorage.getItem(`dion_stream_game_${this.gameId}`);
        if (cached) {
          this.state = JSON.parse(cached);
        }
      } catch (e) {}

      // If no state yet, load default first prompt
      if (!this.state) {
        const firstPrompt = (this.gameMeta.prompts && this.gameMeta.prompts[0]) || {};
        this.state = {
          gameId: this.gameId,
          currentIndex: 0,
          prompt: firstPrompt,
          remainingSeconds: 30,
          isRunning: false,
          revealedClues: 1,
          revealedAnswer: false,
          votes: { optionA: 0, optionB: 0 }
        };
      }

      this.render();

      try {
        this.channel.postMessage({ type: 'REQUEST_STATE', gameId: this.gameId });
      } catch (e) {}
    }

    render() {
      const p = this.state.prompt || {};
      const categoryEl = document.getElementById('live-category');
      const contentEl = document.getElementById('live-content');
      const timerEl = document.getElementById('live-timer');
      const messageEl = document.getElementById('live-message');

      if (categoryEl) {
        categoryEl.textContent = p.category || this.gameMeta.badge || 'STREAM GAME';
      }

      if (timerEl) {
        timerEl.textContent = typeof this.state.remainingSeconds === 'number' ? this.state.remainingSeconds : '—';
        if (this.state.remainingSeconds <= 5 && this.state.remainingSeconds > 0) {
          timerEl.style.color = '#ef4444';
          timerEl.style.textShadow = '0 0 25px rgba(239, 68, 68, 0.7)';
        } else {
          timerEl.style.color = '#d4af37';
          timerEl.style.textShadow = '0 0 25px rgba(212, 175, 55, 0.4)';
        }
      }

      if (messageEl) {
        if (this.state.isRunning) {
          messageEl.textContent = 'GUESS OR VOTE IN CHAT NOW!';
        } else if (this.state.remainingSeconds === 0) {
          messageEl.textContent = 'TIME IS UP!';
        } else {
          messageEl.textContent = 'HOST CONTROLS IN PROGRESS';
        }
      }

      if (!contentEl) return;

      if (this.gameId === 'finish-the-sentence') {
        contentEl.innerHTML = `
          <div style="font-size: 38px; font-weight: 900; line-height: 1.35; color: #ffffff; max-width: 900px; margin: 0 auto; text-shadow: 0 4px 20px rgba(0,0,0,0.8);">
            "${p.setup || 'Waiting for host...'}"
          </div>
          <div style="margin-top: 30px; font-size: 16px; font-weight: 800; letter-spacing: 3px; color: #d4af37;">
            COMPLETE THE PUNCHLINE IN CHAT 💬
          </div>
        `;
      } else if (this.gameId === 'what-would-you-do') {
        const opts = (p.options || []).map((opt, i) => `
          <div style="background: rgba(14, 28, 30, 0.85); border: 1px solid rgba(212, 175, 55, 0.35); padding: 18px 24px; border-radius: 14px; text-align: left; display: flex; align-items: center; gap: 16px; box-shadow: 0 6px 20px rgba(0,0,0,0.4);">
            <div style="width: 40px; height: 40px; border-radius: 10px; background: #d4af37; color: #000; font-size: 20px; font-weight: 900; display: flex; align-items: center; justify-content: center;">
              ${String.fromCharCode(65 + i)}
            </div>
            <div style="font-size: 20px; font-weight: 800; color: #fff;">${opt}</div>
          </div>
        `).join('');

        contentEl.innerHTML = `
          <div style="font-size: 30px; font-weight: 900; line-height: 1.35; color: #f7e07d; max-width: 920px; margin: 0 auto 35px; text-shadow: 0 4px 20px rgba(0,0,0,0.8);">
            "${p.scenario || ''}"
          </div>
          <div style="display: flex; flex-direction: column; gap: 14px; max-width: 850px; width: 100%; margin: 0 auto;">
            ${opts}
          </div>
        `;
      } else if (this.gameId === 'who-would-you-pick') {
        const choices = (p.choices || []).map((c) => `
          <div style="background: rgba(14, 28, 30, 0.9); border: 2px solid #d4af37; padding: 22px 28px; border-radius: 16px; font-size: 24px; font-weight: 900; color: #ffffff; box-shadow: 0 8px 25px rgba(212,175,55,0.2); text-align: center;">
            ${c}
          </div>
        `).join('');

        contentEl.innerHTML = `
          <div style="font-size: 34px; font-weight: 900; line-height: 1.35; color: #ffffff; max-width: 900px; margin: 0 auto 35px;">
            ${p.question || ''}
          </div>
          <div style="display: grid; grid-template-columns: repeat(auto-fit, minmax(220px, 1fr)); gap: 20px; max-width: 950px; width: 100%; margin: 0 auto;">
            ${choices}
          </div>
        `;
      } else if (this.gameId === 'emoji-guess') {
        contentEl.innerHTML = `
          <div style="font-size: 80px; letter-spacing: 12px; margin: 20px 0; filter: drop-shadow(0 8px 25px rgba(0,0,0,0.6));">
            ${p.emojis || ''}
          </div>
          <div style="font-size: 20px; font-weight: 800; letter-spacing: 3px; color: #38bdf8; margin-top: 15px;">
            HINT: ${p.hint || ''}
          </div>
          ${this.state.revealedAnswer ? `
            <div style="margin-top: 25px; padding: 14px 30px; background: #d4af37; color: #020303; font-size: 28px; font-weight: 900; letter-spacing: 4px; border-radius: 12px; display: inline-block; box-shadow: 0 0 30px rgba(212,175,55,0.6);">
              ANSWER: ${p.answer}
            </div>
          ` : ''}
        `;
      } else if (this.gameId === 'unscramble-it') {
        const letters = (p.scrambled || '').split(' ').map((l) => `
          <div style="width: 56px; height: 68px; background: rgba(14,28,30,0.9); border: 2px solid #38bdf8; border-radius: 10px; display: flex; align-items: center; justify-content: center; font-size: 32px; font-weight: 900; color: #38bdf8; box-shadow: 0 0 15px rgba(56,189,248,0.3);">
            ${l}
          </div>
        `).join('');

        contentEl.innerHTML = `
          <div style="display: flex; gap: 10px; justify-content: center; flex-wrap: wrap; margin-bottom: 25px;">
            ${letters}
          </div>
          <div style="font-size: 20px; font-weight: 800; letter-spacing: 3px; color: #d4af37;">
            HINT: ${p.hint || ''}
          </div>
          ${this.state.revealedAnswer ? `
            <div style="margin-top: 25px; padding: 14px 30px; background: #10b981; color: #ffffff; font-size: 28px; font-weight: 900; letter-spacing: 4px; border-radius: 12px; display: inline-block; box-shadow: 0 0 30px rgba(16,185,129,0.5);">
              UNSCRAMBLED: ${p.answer}
            </div>
          ` : ''}
        `;
      } else if (this.gameId === 'who-dis') {
        contentEl.innerHTML = `
          <div style="width: 100px; height: 100px; border-radius: 50%; background: radial-gradient(circle, #38bdf8, #0b1d1e); margin: 0 auto 25px; display: flex; align-items: center; justify-content: center; font-size: 50px; border: 3px solid #d4af37; box-shadow: 0 0 30px rgba(212,175,55,0.4);">
            🕵🏾
          </div>
          <div style="display: flex; flex-direction: column; gap: 14px; max-width: 800px; width: 100%; margin: 0 auto;">
            <div style="padding: 18px 24px; background: rgba(14,28,30,0.9); border: 1px solid ${this.state.revealedClues >= 1 ? '#d4af37' : 'rgba(255,255,255,0.1)'}; border-radius: 12px; font-size: 20px; font-weight: 800; color: ${this.state.revealedClues >= 1 ? '#fff' : '#667879'}; text-align: left;">
              <b>CLUE 1:</b> ${this.state.revealedClues >= 1 ? p.clue1 : '🔒 Locked'}
            </div>
            <div style="padding: 18px 24px; background: rgba(14,28,30,0.9); border: 1px solid ${this.state.revealedClues >= 2 ? '#d4af37' : 'rgba(255,255,255,0.1)'}; border-radius: 12px; font-size: 20px; font-weight: 800; color: ${this.state.revealedClues >= 2 ? '#fff' : '#667879'}; text-align: left;">
              <b>CLUE 2:</b> ${this.state.revealedClues >= 2 ? p.clue2 : '🔒 Locked'}
            </div>
            <div style="padding: 18px 24px; background: rgba(14,28,30,0.9); border: 1px solid ${this.state.revealedClues >= 3 ? '#d4af37' : 'rgba(255,255,255,0.1)'}; border-radius: 12px; font-size: 20px; font-weight: 800; color: ${this.state.revealedClues >= 3 ? '#fff' : '#667879'}; text-align: left;">
              <b>CLUE 3:</b> ${this.state.revealedClues >= 3 ? p.clue3 : '🔒 Locked'}
            </div>
          </div>
          ${this.state.revealedAnswer ? `
            <div style="margin-top: 25px; padding: 16px 36px; background: linear-gradient(135deg, #d4af37, #f7e07d); color: #020303; font-size: 32px; font-weight: 900; letter-spacing: 4px; border-radius: 14px; display: inline-block; box-shadow: 0 0 35px rgba(212,175,55,0.8);">
              IT'S ${p.name}! 🎉
            </div>
          ` : ''}
        `;
      } else if (this.gameId === 'charades') {
        contentEl.innerHTML = `
          <div style="font-size: 24px; font-weight: 900; letter-spacing: 3px; color: #ef4444; margin-bottom: 20px;">
            🤫 SILENT ACTING ONLY • NO TALKING!
          </div>
          <div style="font-size: 32px; font-weight: 900; line-height: 1.35; color: #ffffff; max-width: 800px; margin: 0 auto; padding: 30px; background: rgba(14,28,30,0.8); border: 2px solid rgba(212,175,55,0.3); border-radius: 18px;">
            WATCH THE HOST / CONTESTANT ON CAM!
          </div>
          <div style="margin-top: 25px; font-size: 16px; font-weight: 800; letter-spacing: 3px; color: #d4af37;">
            FIRST ONE TO TYPE THE CORRECT ACTION IN CHAT WINS!
          </div>
        `;
      } else if (this.gameId === 'would-you-rather') {
        const totalVotes = (this.state.votes.optionA || 0) + (this.state.votes.optionB || 0);
        const pctA = totalVotes > 0 ? Math.round((this.state.votes.optionA / totalVotes) * 100) : 50;
        const pctB = totalVotes > 0 ? 100 - pctA : 50;

        contentEl.innerHTML = `
          <div style="display: grid; grid-template-columns: 1fr 1fr; gap: 24px; max-width: 960px; width: 100%; margin: 0 auto;">
            <!-- OPTION A -->
            <div style="background: rgba(56,189,248,0.12); border: 2px solid #38bdf8; border-radius: 18px; padding: 30px 24px; display: flex; flex-direction: column; justify-content: space-between; box-shadow: 0 0 25px rgba(56,189,248,0.25);">
              <div>
                <div style="font-size: 13px; font-weight: 900; letter-spacing: 3px; color: #38bdf8;">OPTION A</div>
                <div style="font-size: 26px; font-weight: 900; line-height: 1.3; color: #ffffff; margin-top: 14px;">
                  ${p.optionA || ''}
                </div>
              </div>
              <div style="margin-top: 30px;">
                <div style="font-size: 48px; font-weight: 900; color: #38bdf8;">${pctA}%</div>
                <div style="font-size: 11px; font-weight: 800; letter-spacing: 2px; color: #94a3b8;">${this.state.votes.optionA || 0} VOTES</div>
              </div>
            </div>

            <!-- OPTION B -->
            <div style="background: rgba(244,63,94,0.12); border: 2px solid #f43f5e; border-radius: 18px; padding: 30px 24px; display: flex; flex-direction: column; justify-content: space-between; box-shadow: 0 0 25px rgba(244,63,94,0.25);">
              <div>
                <div style="font-size: 13px; font-weight: 900; letter-spacing: 3px; color: #f43f5e;">OPTION B</div>
                <div style="font-size: 26px; font-weight: 900; line-height: 1.3; color: #ffffff; margin-top: 14px;">
                  ${p.optionB || ''}
                </div>
              </div>
              <div style="margin-top: 30px;">
                <div style="font-size: 48px; font-weight: 900; color: #f43f5e;">${pctB}%</div>
                <div style="font-size: 11px; font-weight: 800; letter-spacing: 2px; color: #94a3b8;">${this.state.votes.optionB || 0} VOTES</div>
              </div>
            </div>
          </div>
        `;
      }
    }
  }

  window.StreamGameLive = StreamGameLive;
})();
