// Dionlyonee Wheel of Fortune Live Stage Engine (Pure Vanilla JS)
// BroadcastChannel: dionlyonee-wheel-game

(function () {
  'use strict';

  const CHANNEL_NAME = 'dionlyonee-wheel-game';
  const STORAGE_KEY = 'dionlyonee_wheel_state';
  const channel = new BroadcastChannel(CHANNEL_NAME);

  let state = {
    category: 'Jamaican / Patwa Phrases',
    answer: 'WAH GWAAN',
    hint: '',
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
    wheelAngle: 0,
    wheelSpinning: false,
    lastWedge: { label: '$1,000', value: 1000, color: '#10b981' }
  };

  const liveRound = document.getElementById('live-round-text');
  const liveStatus = document.getElementById('live-status-tag');
  const liveTimer = document.getElementById('live-timer-text');
  const liveCategory = document.getElementById('live-category-title');
  const liveBoard = document.getElementById('live-board-matrix');
  const liveHintCard = document.getElementById('live-hint-card');
  const liveHintText = document.getElementById('live-hint-text');
  const liveSolvedBanner = document.getElementById('live-solved-banner');
  const liveProgress = document.getElementById('live-progress-fill');
  const liveWheelCanvas = document.getElementById('live-wheel-canvas');
  const liveWedgeDisplay = document.getElementById('live-wheel-wedge-display');
  const liveActionBanner = document.getElementById('live-action-banner');
  const liveActionText = document.getElementById('live-action-text');
  const liveActionTimer = document.getElementById('live-action-timer');

  let isSpinningLive = false;

  function renderStage() {
    if (liveRound) liveRound.textContent = state.round || 1;

    if (liveStatus) {
      liveStatus.textContent = (state.phase || 'WAITING').toUpperCase();
      liveStatus.className = `hud-status-tag ${state.phase}`;
    }

    if (liveTimer) liveTimer.textContent = `${state.seconds || 0}s`;

    if (liveCategory) {
      liveCategory.textContent = (state.category || 'WHEEL OF FORTUNE').toUpperCase();
    }

    // Active Contestants
    const activeIdx = state.activePlayerIndex ?? 0;
    const activeContestant = (state.contestants && state.contestants[activeIdx])
      ? state.contestants[activeIdx]
      : { name: `Player ${activeIdx + 1}`, roundScore: 0, totalScore: 0 };

    if (state.contestants) {
      state.contestants.forEach((c, idx) => {
        const card = document.getElementById(`live-player-card-${idx}`);
        const nameElem = document.getElementById(`live-player-name-${idx}`);
        const roundElem = document.getElementById(`live-player-round-${idx}`);
        const totalElem = document.getElementById(`live-player-total-${idx}`);
        const tagElem = document.getElementById(`live-player-turn-tag-${idx}`);

        if (card) {
          if (idx === activeIdx) {
            card.classList.add('active');
          } else {
            card.classList.remove('active');
          }
        }
        if (nameElem) nameElem.textContent = c.name;
        if (roundElem) roundElem.textContent = `$${(c.roundScore || 0).toLocaleString()}`;
        if (totalElem) totalElem.textContent = `Total: $${(c.totalScore || 0).toLocaleString()}`;
        if (tagElem) {
          if (idx === activeIdx) {
            tagElem.textContent = 'ACTIVE TURN';
            tagElem.className = 'stage-turn-tag active';
          } else {
            tagElem.textContent = 'WAITING';
            tagElem.className = 'stage-turn-tag';
          }
        }
      });
    }

    // Active Action Banner
    if (liveActionBanner) {
      if (state.phase === 'pick_letter' || state.running) {
        liveActionBanner.classList.remove('hidden');
        if (liveActionText) {
          const wedgeLabel = state.lastWedge ? state.lastWedge.label : '$1,000';
          liveActionText.textContent = `${activeContestant.name.toUpperCase()} (${wedgeLabel}) — PICK A LETTER!`;
        }
        if (liveActionTimer) {
          liveActionTimer.textContent = `${state.seconds || 0}s`;
        }
      } else if (state.phase === 'spinning' || isSpinningLive) {
        liveActionBanner.classList.remove('hidden');
        if (liveActionText) {
          liveActionText.textContent = `🎡 SPINNING THE WHEEL FOR ${activeContestant.name.toUpperCase()}...`;
        }
        if (liveActionTimer) {
          liveActionTimer.textContent = `SPIN`;
        }
      } else {
        liveActionBanner.classList.add('hidden');
      }
    }

    // Hint Card
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

    // Draw Live Wheel (if not currently in spin animation)
    if (!isSpinningLive && liveWheelCanvas && window.WheelEngine) {
      window.WheelEngine.drawWheel(liveWheelCanvas, state.wheelAngle || 0);
    }
    if (liveWedgeDisplay && state.lastWedge) {
      liveWedgeDisplay.textContent = state.lastWedge.label;
    }
  }

  // --- WHEEL SPIN ANIMATION ON STAGE ---

  function runLiveWheelSpin(data) {
    if (!liveWheelCanvas || !window.WheelEngine) return;
    isSpinningLive = true;

    const startAngle = typeof data.startAngle === 'number' ? data.startAngle : (state.wheelAngle || 0);
    const targetAngle = typeof data.targetAngle === 'number'
      ? data.targetAngle
      : startAngle + (4 + Math.random() * 3) * Math.PI * 2;
    const duration = data.duration || 4000;
    const startTime = performance.now();

    if (window.sounds) window.sounds.play('wheel');

    let lastTickAngle = startAngle;
    const pegArc = (2 * Math.PI) / 24;

    function animate(now) {
      const elapsed = now - startTime;
      const progress = Math.min(1, elapsed / duration);
      const easeProgress = 1 - Math.pow(1 - progress, 3.5);

      const currentAngle = startAngle + (targetAngle - startAngle) * easeProgress;
      window.WheelEngine.drawWheel(liveWheelCanvas, currentAngle);

      // Sound tick on peg crossing
      if (Math.abs(currentAngle - lastTickAngle) >= pegArc) {
        lastTickAngle = currentAngle;
        if (window.sounds) window.sounds.play('wheel_tick');
      }

      if (progress < 1) {
        requestAnimationFrame(animate);
      } else {
        isSpinningLive = false;
        state.wheelAngle = targetAngle;
        const wedge = window.WheelEngine.getWedgeAtPointer
          ? window.WheelEngine.getWedgeAtPointer(targetAngle)
          : window.WheelEngine.getWedgeAtAngle(targetAngle);
        state.lastWedge = wedge || { label: '$1,000', value: 1000, color: '#10b981', type: 'cash' };
        if (liveWedgeDisplay) liveWedgeDisplay.textContent = state.lastWedge.label;
        renderStage();
      }
    }
    requestAnimationFrame(animate);
  }

  // --- SYNC LISTENERS ---

  channel.onmessage = function (e) {
    const data = e.data;
    if (!data) return;

    if (data.type === 'UPDATE_STATE' && data.state) {
      state = data.state;
      renderStage();
    } else if (data.type === 'WHEEL_SPIN') {
      runLiveWheelSpin(data);
    } else if (data.type === 'PLAY_SOUND' && data.sound) {
      if (window.sounds) window.sounds.play(data.sound);
    }
  };

  function syncFromStorage() {
    try {
      const roomKey = window.RoomSync ? `dion_wheel_state_${window.RoomSync.roomId}` : STORAGE_KEY;
      const cached = sessionStorage.getItem(roomKey) || sessionStorage.getItem(STORAGE_KEY);
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
      window.RoomSync.gameType = 'wheel';
      window.RoomSync.attachRoomHUD('.live-header');
      
      window.RoomSync.onStateChange((newState, sound) => {
        if (newState) {
          state = newState;
          renderStage();
        }
        if (sound && window.sounds) window.sounds.play(sound);
      });

      window.RoomSync.onWheelSpin((spinData) => {
        runLiveWheelSpin(spinData);
      });
    }

    syncFromStorage();
    renderStage();

    try {
      channel.postMessage({ type: 'REQUEST_STATE' });
    } catch (e) {}
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init);
  } else {
    init();
  }
})();
