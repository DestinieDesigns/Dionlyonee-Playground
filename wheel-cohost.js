// Dionlyonee Wheel of Fortune Co-Host Console Logic (Vanilla JS)
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
    seconds: 30,
    revealTime: 30,
    running: false,
    paused: false,
    phase: 'waiting',
    round: 1,
    hintVisible: false,
    answerRevealed: false
  };

  const cohostRound = document.getElementById('cohost-round');
  const cohostTimer = document.getElementById('cohost-timer');
  const cohostStatus = document.getElementById('cohost-status');
  const cohostCategory = document.getElementById('cohost-category');
  const cohostAnswer = document.getElementById('cohost-answer');
  const cohostHint = document.getElementById('cohost-hint');
  const cohostTiles = document.getElementById('cohost-tiles');
  const cohostActivePlayer = document.getElementById('cohost-active-player');
  const cohostLastWedge = document.getElementById('cohost-last-wedge');
  const btnBuzz = document.getElementById('btn-cohost-buzz');
  const btnSpin = document.getElementById('btn-cohost-spin');

  function renderCoHostUI() {
    if (cohostRound) cohostRound.textContent = `ROUND ${state.round || 1}`;
    if (cohostTimer) cohostTimer.textContent = `${state.seconds || 0}s`;

    if (cohostStatus) {
      cohostStatus.textContent = (state.phase || 'WAITING').toUpperCase();
      cohostStatus.className = `status-tag ${state.phase}`;
    }

    if (cohostCategory) {
      cohostCategory.textContent = state.category || 'WHEEL OF FORTUNE';
    }

    if (cohostActivePlayer) {
      const activeIdx = state.activePlayerIndex ?? 0;
      const activeP = (state.contestants && state.contestants[activeIdx])
        ? state.contestants[activeIdx]
        : { name: `Player ${activeIdx + 1}`, roundScore: 0 };
      cohostActivePlayer.textContent = `${activeP.name.toUpperCase()} ($${activeP.roundScore || 0})`;
    }

    if (cohostLastWedge && state.lastWedge) {
      cohostLastWedge.textContent = state.lastWedge.label;
    }

    if (cohostAnswer) {
      cohostAnswer.textContent = state.answer ? state.answer.toUpperCase() : 'NO PUZZLE LOADED';
    }

    if (cohostHint) {
      if (state.hint) {
        cohostHint.innerHTML = `💡 <strong>SECRET CLUE:</strong> ${state.hint}`;
      } else {
        cohostHint.textContent = '🔒 No secret clue provided for this puzzle.';
      }
    }

    // Render 4-Row Matrix with reveal states
    if (cohostTiles && window.WheelEngine) {
      const rowsData = window.WheelEngine.formatWheelBoard(
        state.answer,
        state.revealed || [],
        state.answerRevealed || state.phase === 'answered'
      );

      cohostTiles.innerHTML = rowsData
        .map((rowTiles) => {
          const rowHtml = rowTiles
            .map((t) => {
              if (t.type === 'empty') {
                return '<div class="cohost-tile tile-empty" style="background:#064428; border:1px solid #042f1b; width:26px; height:32px; border-radius:3px;"></div>';
              }
              if (t.isRevealed) {
                return `<div class="cohost-tile tile-letter revealed" style="background:#ffffff; color:#000; font-weight:900; width:26px; height:32px; display:flex; align-items:center; justify-content:center; border:1px solid #f59e0b; border-radius:3px; font-size:16px;">${t.char}</div>`;
              }
              return `<div class="cohost-tile tile-letter unrevealed" style="background:#0f172a; color:#64748b; font-weight:900; width:26px; height:32px; display:flex; align-items:center; justify-content:center; border:1px dashed #334155; border-radius:3px; font-size:16px;">${t.char}</div>`;
            })
            .join('');
          return `<div style="display:flex; justify-content:center; gap:3px; margin-bottom:3px;">${rowHtml}</div>`;
        })
        .join('');
    }
  }

  function triggerCoHostBuzz() {
    if (window.sounds) window.sounds.play('buzzer');

    // Send buzzer over RoomSync to Host and all devices
    if (window.RoomSync) {
      window.RoomSync.sendBuzzer('Co-Host Phone');
    }

    try {
      channel.postMessage({
        type: 'COHOST_BUZZ',
        sender: 'Co-Host Phone',
        timestamp: Date.now()
      });
      channel.postMessage({
        type: 'PLAY_SOUND',
        sound: 'buzzer'
      });
    } catch (e) {
      console.warn('Co-host buzz error:', e);
    }

    if (btnBuzz) {
      btnBuzz.style.transform = 'scale(0.95)';
      btnBuzz.style.background = '#dc2626';
      setTimeout(() => {
        btnBuzz.style.transform = 'none';
        btnBuzz.style.background = '';
      }, 300);
    }
  }

  function triggerCoHostSpin() {
    if (window.sounds) window.sounds.play('wheel');

    const startAngle = state.wheelAngle || 0;
    const minSpins = 4;
    const extraSpins = Math.random() * 3.5;
    const targetAngle = startAngle + (minSpins + extraSpins) * (Math.PI * 2) + (Math.random() * Math.PI * 2);
    const duration = 3800;

    // Send spin over RoomSync (WebSocket / HTTP fallback)
    if (window.RoomSync) {
      window.RoomSync.sendWheelSpin({
        startAngle,
        targetAngle,
        duration,
        startTime: Date.now()
      });
    }

    try {
      channel.postMessage({
        type: 'WHEEL_SPIN',
        startAngle,
        targetAngle,
        duration,
        startTime: Date.now()
      });
      channel.postMessage({
        type: 'PLAY_SOUND',
        sound: 'wheel'
      });
    } catch (e) {}

    if (btnSpin) {
      btnSpin.disabled = true;
      btnSpin.style.opacity = '0.6';
      setTimeout(() => {
        btnSpin.disabled = false;
        btnSpin.style.opacity = '1';
      }, duration);
    }
  }

  channel.onmessage = function (e) {
    const data = e.data;
    if (!data) return;

    if (data.type === 'UPDATE_STATE' && data.state) {
      state = data.state;
      renderCoHostUI();
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
          renderCoHostUI();
        }
      }
    } catch (e) {}
  }

  function init() {
    if (window.RoomSync) {
      window.RoomSync.role = 'cohost';
      window.RoomSync.gameType = 'wheel';
      window.RoomSync.attachRoomHUD('.cohost-header');
      window.RoomSync.onStateChange((newState, sound) => {
        if (newState) {
          state = newState;
          renderCoHostUI();
        }
        if (sound && window.sounds) window.sounds.play(sound);
      });
    }

    if (btnBuzz) btnBuzz.addEventListener('click', triggerCoHostBuzz);
    if (btnSpin) btnSpin.addEventListener('click', triggerCoHostSpin);

    syncFromStorage();
    renderCoHostUI();

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
