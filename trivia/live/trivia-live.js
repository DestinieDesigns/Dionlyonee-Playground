/**
 * Trivia Live Audience Stage
 */
(function () {
  let currentQuestion = null;

  function init() {
    if (window.RoomUI) {
      window.RoomUI.attachHUD('.main-header', 'trivia');
    }

    renderContestants();
    showStandbyScreen();

    if (window.FirebaseRoom) {
      window.FirebaseRoom.onState((state) => {
        if (!state) return;
        if (state.contestants && window.ContestantManager) {
          window.ContestantManager.setContestants(state.contestants);
          renderContestants();
        }

        const isWaiting = Boolean(state.showWaitingScreen) || 
                          Boolean(state.isCooldown) || 
                          state.phase === 'waiting' || 
                          state.phase === 'cooldown' || 
                          !state.question;

        if (isWaiting) {
          showStandbyScreen(state.isCooldown || state.phase === 'cooldown');
        } else if (state.question) {
          currentQuestion = state.question;
          const container = document.getElementById('live-question-card');
          if (container && window.TriviaUI) {
            window.TriviaUI.renderQuestionCard(container, currentQuestion, false);
          }
        }

        if (state.phase === 'answer' && state.answer) {
          document.querySelectorAll('.trivia-opt-btn').forEach(btn => {
            if (btn.getAttribute('data-opt') === state.answer) {
              btn.classList.add('opt-correct');
            }
          });
        }

        if (state.phase === 'timer' && state.timeSec) {
          animateTimerBar(state.timeSec);
        }
      });

      window.FirebaseRoom.onBuzzer((data) => {
        const banner = document.getElementById('buzzer-banner');
        const nameEl = document.getElementById('buzzer-player-name');
        if (banner && nameEl) {
          nameEl.textContent = data.player || 'CO-HOST';
          banner.style.display = 'block';
          if (window.sounds) window.sounds.play('buzzer');
          setTimeout(() => { banner.style.display = 'none'; }, 4000);
        }
      });

      if (typeof window.FirebaseRoom.onSound === 'function') {
        window.FirebaseRoom.onSound((sound) => {
          if (window.SoundManager && typeof window.SoundManager.play === 'function') {
            window.SoundManager.play(sound);
          } else if (window.sounds) {
            window.sounds.play(sound);
          }
        });
      }
    }
  }

  function animateTimerBar(durationSec) {
    const bar = document.getElementById('live-timer-fill');
    if (!bar) return;
    bar.style.transition = 'none';
    bar.style.width = '100%';
    setTimeout(() => {
      bar.style.transition = `width ${durationSec}s linear`;
      bar.style.width = '0%';
    }, 50);
  }

  function renderContestants() {
    const row = document.getElementById('live-contestants-row');
    if (!row || !window.ContestantManager) return;
    const contestants = window.ContestantManager.getContestants();

    contestants.forEach((c, idx) => {
      let card = document.getElementById(`trivia-live-card-${idx}`);
      if (!card) {
        card = document.createElement('div');
        card.id = `trivia-live-card-${idx}`;
        card.style.cssText = `
          background: #111624; border: 1px solid rgba(255,255,255,0.1); border-radius: 12px;
          padding: 16px; text-align: center;
        `;
        card.innerHTML = `
          <div style="font-size: 28px; margin-bottom: 6px;">${c.avatar || '👤'}</div>
          <div class="trivia-live-name" style="font-weight: 800; color: #fff; font-size: 15px;">${c.name}</div>
          <div id="trivia-live-score-${idx}" class="podium-score" style="font-family: 'Cinzel', serif; font-size: 22px; font-weight: 900; color: #c084fc; margin-top: 4px;">
            ${(c.roundScore || 0).toLocaleString()} PTS
          </div>
        `;
        row.appendChild(card);
      } else {
        const nameEl = card.querySelector('.trivia-live-name');
        const scoreEl = document.getElementById(`trivia-live-score-${idx}`);
        if (nameEl) nameEl.textContent = c.name;
        if (scoreEl && window.animateScoreDisplay) {
          window.animateScoreDisplay(scoreEl, c.roundScore || 0, { prefix: '', suffix: ' PTS' });
        }
      }
    });
  }

  function showStandbyScreen(isCooldown) {
    const container = document.getElementById('live-question-card');
    if (!container) return;
    const roomCode = (window.RoomManager && window.RoomManager.getRoom()) || 'DION1';

    container.innerHTML = `
      <div style="
        background: rgba(17, 22, 36, 0.95); border: 2px solid rgba(212, 175, 55, 0.4);
        border-radius: 20px; padding: 40px 24px; text-align: center; max-width: 800px; margin: 0 auto;
        box-shadow: 0 20px 60px rgba(0,0,0,0.7), 0 0 30px rgba(168, 85, 247, 0.2);
      ">
        <div style="margin-bottom: 16px;">
          <span style="font-size: 11px; font-weight: 800; letter-spacing: 2px; color: #facc15; background: rgba(250,204,21,0.15); border: 1px solid rgba(250,204,21,0.4); padding: 4px 12px; border-radius: 20px;">
            ${isCooldown ? '🎉 ROUND COOLDOWN • STANDBY' : '🇯🇲 DIONLYONEE STREAM LOBBY'}
          </span>
          <span style="margin-left: 10px; font-family: monospace; font-size: 12px; font-weight: 800; color: #38bdf8; background: rgba(56,189,248,0.15); border: 1px solid rgba(56,189,248,0.4); padding: 4px 10px; border-radius: 10px;">
            ROOM: ${roomCode}
          </span>
        </div>

        <div style="max-height: 260px; overflow: hidden; border-radius: 12px; margin: 16px auto; max-width: 500px; border: 1px solid rgba(212,175,55,0.3);">
          <img src="/dionlyonee-pon-di-app.png" alt="Dionlyonee Pon Di App" style="width: 100%; height: auto; display: block;" onerror="this.src='../../assets/images/dionlyonee-pon-di-app.png'" />
        </div>

        <h2 style="font-family: 'Cinzel', serif; font-size: 28px; color: #f7e07d; margin: 14px 0 8px 0; text-shadow: 0 0 20px rgba(247,224,125,0.4);">
          ${isCooldown ? 'ROUND FINISHED • GET READY!' : 'WAITING FOR HOST TO START'}
        </h2>
        <p style="color: #94a3b8; font-size: 15px; max-width: 540px; margin: 0 auto; line-height: 1.5;">
          ${isCooldown ? 'Host is reviewing contestant scores and preparing the next showdown.' : 'Host is setting up the questions. Buzzers are on standby!'}
        </p>
      </div>
    `;
  }

  window.addEventListener('DOMContentLoaded', init);
})();
