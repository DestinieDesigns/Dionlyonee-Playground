/**
 * Trivia Host Desk Controller
 */
(function () {
  let currentTier = 'all';
  let activeQuestion = null;

  function init() {
    if (window.HostAuth) {
      window.HostAuth.requireHostAccess(() => {
        setupDesk();
      });
    } else {
      setupDesk();
    }
  }

  function setupDesk() {
    if (window.RoomUI) {
      window.RoomUI.attachHUD('.main-header', 'trivia');
    }

    renderContestants();

    // Tier buttons
    document.querySelectorAll('.tier-btn').forEach(btn => {
      btn.addEventListener('click', () => {
        document.querySelectorAll('.tier-btn').forEach(b => b.classList.remove('active'));
        btn.classList.add('active');
        currentTier = btn.getAttribute('data-tier') || 'all';
      });
    });

    document.getElementById('btn-next-question').addEventListener('click', () => {
      loadNext();
    });

    document.getElementById('btn-reveal-answer').addEventListener('click', () => {
      if (activeQuestion && window.TriviaGame) {
        window.TriviaGame.revealAnswer();
        document.querySelectorAll('.trivia-opt-btn').forEach(b => {
          if (b.getAttribute('data-opt') === activeQuestion.answer) {
            b.style.background = '#10b981';
            b.style.color = '#07090e';
          }
        });
      }
    });

    document.getElementById('btn-start-timer').addEventListener('click', () => {
      const timeSec = (activeQuestion && activeQuestion.timeSec) || 15;
      if (window.TimerManager) {
        window.TimerManager.start(timeSec, null, () => {
          if (window.sounds) window.sounds.play('wrong');
        });
      }
      if (window.FirebaseRoom) {
        window.FirebaseRoom.broadcastState({
          gameType: 'trivia',
          phase: 'timer',
          timeSec,
          timestamp: Date.now()
        }, 'tick');
      }
    });

    // Listen for mobile buzzers
    if (window.FirebaseRoom) {
      window.FirebaseRoom.onBuzzer((data) => {
        if (window.sounds) window.sounds.play('buzzer');
        alert(`🚨 BUZZ IN: ${data.player || 'Player'} buzzed!`);
      });
    }

    loadNext();
  }

  function loadNext() {
    if (window.TriviaRandomizer) {
      activeQuestion = window.TriviaRandomizer.pickQuestion(currentTier);
      const container = document.getElementById('trivia-active-card');
      if (container && window.TriviaUI) {
        window.TriviaUI.renderQuestionCard(container, activeQuestion, true);
      }
      if (window.TriviaGame) {
        window.TriviaGame.startQuestion(activeQuestion);
      }
    }
  }

  function renderContestants() {
    const list = document.getElementById('trivia-contestants-list');
    if (!list || !window.ContestantManager) return;
    const contestants = window.ContestantManager.getContestants();

    list.innerHTML = contestants.map((c, i) => `
      <div style="
        display: flex; align-items: center; justify-content: space-between;
        padding: 8px 10px; background: rgba(255,255,255,0.03); border-radius: 8px; margin-bottom: 6px;
      ">
        <span style="font-weight: 700; color: #fff;">${c.name}</span>
        <div style="display: flex; align-items: center; gap: 8px;">
          <strong style="color: #c084fc;">${c.roundScore || 0} PTS</strong>
          <button class="add-pts-btn" data-idx="${i}" style="
            background: rgba(16,185,129,0.2); color: #10b981; border: 1px solid #10b981;
            padding: 2px 8px; border-radius: 4px; font-size: 11px; font-weight: 800; cursor: pointer;
          ">+PTS</button>
        </div>
      </div>
    `).join('');

    document.querySelectorAll('.add-pts-btn').forEach(btn => {
      btn.addEventListener('click', () => {
        const idx = parseInt(btn.getAttribute('data-idx'));
        const pts = activeQuestion ? activeQuestion.points : 200;
        window.ContestantManager.addRoundScore(pts, idx);
        renderContestants();
        if (window.FirebaseRoom) {
          window.FirebaseRoom.broadcastState({
            gameType: 'trivia',
            contestants: window.ContestantManager.getContestants()
          }, 'correct');
        }
      });
    });
  }

  window.addEventListener('DOMContentLoaded', init);
})();
