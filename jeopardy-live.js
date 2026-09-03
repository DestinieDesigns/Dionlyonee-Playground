// Dionlyonee Jeopardy Live Stage Engine (Pure Vanilla JS)
// BroadcastChannel: dionlyonee-jeopardy-game

(function () {
  'use strict';

  const CHANNEL_NAME = 'dionlyonee-jeopardy-game';
  const STORAGE_KEY = 'dionlyonee_jeopardy_state';
  const channel = new BroadcastChannel(CHANNEL_NAME);

  let state = {
    category: 'Jamaican / Patwa Phrases',
    answer: 'WAH GWAAN',
    hint: '',
    currentValue: 400,
    revealed: [],
    calledLetters: [],
    seconds: 30,
    revealTime: 30,
    running: false,
    paused: false,
    phase: 'waiting',
    round: 1,
    hintVisible: false,
    answerRevealed: false,
    contestants: [
      { id: 1, name: 'Player 1', score: 0 },
      { id: 2, name: 'Player 2', score: 0 },
      { id: 3, name: 'Player 3', score: 0 }
    ]
  };

  const liveValue = document.getElementById('live-value-text');
  const liveStatus = document.getElementById('live-status-tag');
  const liveTimer = document.getElementById('live-timer-text');
  const liveCategory = document.getElementById('live-category-title');
  const liveBoard = document.getElementById('live-board-matrix');
  const liveHintCard = document.getElementById('live-hint-card');
  const liveHintText = document.getElementById('live-hint-text');
  const liveSolvedBanner = document.getElementById('live-solved-banner');
  const liveProgress = document.getElementById('live-progress-fill');

  function renderStage() {
    if (liveValue) {
      liveValue.textContent = typeof state.currentValue === 'number' ? `$${state.currentValue}` : state.currentValue;
    }

    if (liveStatus) {
      liveStatus.textContent = (state.phase || 'WAITING').toUpperCase();
      liveStatus.className = `hud-status-tag ${state.phase}`;
    }

    if (liveTimer) liveTimer.textContent = `${state.seconds || 0}s`;

    if (liveCategory) {
      liveCategory.textContent = (state.category || 'JEOPARDY').toUpperCase();
    }

    // Clue Card
    if (liveHintCard) {
      if (state.hintVisible && state.hint) {
        liveHintCard.classList.remove('hidden');
        if (liveHintText) liveHintText.textContent = state.hint;
      } else {
        liveHintCard.classList.add('hidden');
      }
    }

    // Solved Banner
    if (liveSolvedBanner) {
      if (state.answerRevealed || state.phase === 'answered') {
        liveSolvedBanner.classList.remove('hidden');
      } else {
        liveSolvedBanner.classList.add('hidden');
      }
    }

    // Timer Progress
    if (liveProgress) {
      const pct = ((state.seconds || 0) / (state.revealTime || 30)) * 100;
      liveProgress.style.width = `${pct}%`;
    }

    // Contestant Podiums
    [1, 2, 3].forEach((idx) => {
      const nameElem = document.getElementById(`live-p${idx}-name`);
      const scoreElem = document.getElementById(`live-p${idx}-score`);
      if (nameElem && state.contestants && state.contestants[idx - 1]) {
        nameElem.textContent = state.contestants[idx - 1].name;
      }
      if (scoreElem && state.contestants && state.contestants[idx - 1]) {
        scoreElem.textContent = `$${state.contestants[idx - 1].score}`;
      }
    });

    // Render 4-Row Board
    if (liveBoard && window.WheelEngine) {
      const isRevealedAll = state.answerRevealed || state.phase === 'answered';
      const rowsData = window.WheelEngine.formatWheelBoard(
        state.answer,
        state.revealed || [],
        isRevealedAll
      );

      liveBoard.innerHTML = rowsData
        .map((rowTiles) => {
          const rowHtml = rowTiles
            .map((t) => {
              if (t.type === 'empty') {
                return '<div class="matrix-tile tile-empty"></div>';
              }
              if (t.isRevealed) {
                return `<div class="matrix-tile tile-letter revealed">${t.char}</div>`;
              }
              return '<div class="matrix-tile tile-letter unrevealed"></div>';
            })
            .join('');
          return `<div class="matrix-row">${rowHtml}</div>`;
        })
        .join('');
    }
  }

  // --- SYNC LISTENERS ---

  channel.onmessage = function (e) {
    const data = e.data;
    if (!data) return;

    if (data.type === 'UPDATE_STATE' && data.state) {
      state = data.state;
      renderStage();
    } else if (data.type === 'PLAY_SOUND' && data.sound) {
      if (window.sounds) window.sounds.play(data.sound);
    }
  };

  window.addEventListener('storage', (e) => {
    if (e.key === STORAGE_KEY && e.newValue) {
      try {
        const parsed = JSON.parse(e.newValue);
        if (parsed) {
          state = parsed;
          renderStage();
        }
      } catch (err) {}
    }
  });

  function syncFromStorage() {
    try {
      const cached = sessionStorage.getItem(STORAGE_KEY);
      if (cached) {
        const parsed = JSON.parse(cached);
        if (parsed) {
          state = parsed;
          renderStage();
        }
      }
    } catch (e) {}
  }

  function init() {
    if (window.RoomSync) {
      window.RoomSync.role = 'live';
      window.RoomSync.gameType = 'jeopardy';
      window.RoomSync.attachRoomHUD('.live-header');
      window.RoomSync.onStateChange((newState, sound) => {
        if (newState) {
          state = newState;
          renderStage();
        }
        if (sound && window.sounds) window.sounds.play(sound);
      });
    }

    syncFromStorage();
    renderStage();

    try {
      channel.postMessage({ type: 'REQUEST_STATE' });
    } catch (e) {}

    setInterval(syncFromStorage, 1000);
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init);
  } else {
    init();
  }
})();
