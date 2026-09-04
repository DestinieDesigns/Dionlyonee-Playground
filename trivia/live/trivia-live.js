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

    if (window.FirebaseRoom) {
      window.FirebaseRoom.onState((state) => {
        if (state.contestants && window.ContestantManager) {
          window.ContestantManager.setContestants(state.contestants);
          renderContestants();
        }

        if (state.showWaitingScreen) {
          const container = document.getElementById('live-question-card');
          if (container) {
            container.innerHTML = `
              <div style="
                background: #111624; border: 2px dashed rgba(212, 175, 55, 0.4);
                border-radius: 18px; padding: 48px 24px; text-align: center;
              ">
                <div style="font-size: 48px; margin-bottom: 12px;">⏳</div>
                <h2 style="font-family: 'Cinzel', serif; font-size: 26px; color: #f7e07d; margin-bottom: 8px;">
                  ROUND PREPARATION STANDBY
                </h2>
                <p style="color: #94a3b8; font-size: 15px; max-width: 500px; margin: 0 auto;">
                  The host is preparing the next question. Please remain at your buzzer stations!
                </p>
              </div>
            `;
          }
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

  window.addEventListener('DOMContentLoaded', init);
})();
