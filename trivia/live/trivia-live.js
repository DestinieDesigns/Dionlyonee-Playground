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

        if (state.question) {
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

    row.innerHTML = contestants.map(c => `
      <div style="
        background: #111624; border: 1px solid rgba(255,255,255,0.1); border-radius: 12px;
        padding: 16px; text-align: center;
      ">
        <div style="font-size: 28px; margin-bottom: 6px;">${c.avatar || '👤'}</div>
        <div style="font-weight: 800; color: #fff; font-size: 15px;">${c.name}</div>
        <div style="font-family: 'Cinzel', serif; font-size: 22px; font-weight: 900; color: #c084fc; margin-top: 4px;">
          ${(c.roundScore || 0).toLocaleString()} PTS
        </div>
      </div>
    `).join('');
  }

  window.addEventListener('DOMContentLoaded', init);
})();
