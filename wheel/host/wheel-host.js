// Dionlyonee Wheel of Fortune Host Console Logic (Vanilla JS)
// BroadcastChannel: dionlyonee-wheel-game (and sync via dionlyonee_wheel_state)

(function () {
  'use strict';

  const CHANNEL_NAME = 'dionlyonee-wheel-game';
  const STORAGE_KEY = 'dionlyonee_wheel_state';
  const channel = new BroadcastChannel(CHANNEL_NAME);

  const ALPHABET = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ'.split('');
  const VOWELS = new Set(['A', 'E', 'I', 'O', 'U']);

  let state = {
    category: 'Jamaican / Patwa Phrases',
    answer: 'WAH GWAAN',
    hint: 'Popular Jamaican greeting / What is going on',
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
    lastWedge: { label: '$1,000', value: 1000, color: '#10b981', type: 'cash' },
    activePlayerIndex: 0,
    contestants: [
      { name: 'Player 1 (Red)', roundScore: 0, totalScore: 0, color: '#ef4444' },
      { name: 'Player 2 (Yellow)', roundScore: 0, totalScore: 0, color: '#eab308' },
      { name: 'Player 3 (Blue)', roundScore: 0, totalScore: 0, color: '#3b82f6' }
    ]
  };

  let timerInterval = null;

  // DOM ELEMENTS
  const statusBadge = document.getElementById('host-status-badge');
  const catDisplay = document.getElementById('host-category-display');
  const roundDisplay = document.getElementById('host-round-display');
  const boardPreview = document.getElementById('wheel-board-host-preview');
  const hintText = document.getElementById('host-hint-text');
  const hintBox = document.getElementById('host-hint-box');

  const timerNumber = document.getElementById('timer-number');
  const timerProgress = document.getElementById('timer-progress-fill');
  const btnTimerStart = document.getElementById('btn-timer-start');
  const btnTimerPause = document.getElementById('btn-timer-pause');
  const btnTimerReset = document.getElementById('btn-timer-reset');

  const selectCat = document.getElementById('select-category');
  const selectPuz = document.getElementById('select-puzzle');
  const btnLoad = document.getElementById('btn-load-puzzle');
  const btnRandom = document.getElementById('btn-random-puzzle');
  const inputAnswer = document.getElementById('input-custom-answer');
  const inputHint = document.getElementById('input-custom-hint');
  const btnApplyCustom = document.getElementById('btn-apply-custom');

  const keyboardGrid = document.getElementById('letter-keyboard');
  const btnCallRandom = document.getElementById('btn-call-random');
  const btnCallVowels = document.getElementById('btn-call-vowels');
  const btnCallConsonants = document.getElementById('btn-call-consonants');

  const btnSpinWheel = document.getElementById('btn-spin-wheel');
  const btnCallAndSpin = document.getElementById('btn-call-and-spin');
  const wheelCanvas = document.getElementById('host-wheel-canvas');
  const wheelResultDisplay = document.getElementById('wheel-result-display');
  const wheelStatusTag = document.getElementById('wheel-status-tag');
  const activeTurnBadge = document.getElementById('active-turn-badge');
  const btnNextPlayer = document.getElementById('btn-next-player');
  const btnBankScores = document.getElementById('btn-bank-scores');

  const btnToggleHint = document.getElementById('btn-toggle-hint');
  const btnRevealAll = document.getElementById('btn-reveal-all');
  const btnNextRound = document.getElementById('btn-next-round');
  const btnResetBoard = document.getElementById('btn-reset-board');

  // --- SYNC ENGINE ---

  function broadcast(playSound = null) {
    try {
      sessionStorage.setItem(STORAGE_KEY, JSON.stringify(state));
      channel.postMessage({
        type: 'UPDATE_STATE',
        state: state
      });
      if (playSound) {
        channel.postMessage({
          type: 'PLAY_SOUND',
          sound: playSound
        });
      }
    } catch (e) {
      console.warn('Wheel broadcast error:', e);
    }
    if (window.RoomSync) {
      window.RoomSync.sendState(state, playSound);
    }
  }

  channel.onmessage = (event) => {
    const data = event.data;
    if (!data) return;
    if (data.type === 'REQUEST_STATE') {
      broadcast();
    }
  };

  // --- RENDER 4-ROW BOARD ---

  function renderHostBoard() {
    if (!boardPreview || !window.WheelEngine) return;

    const rowsData = window.WheelEngine.formatWheelBoard(
      state.answer,
      state.revealed,
      state.answerRevealed || state.phase === 'answered'
    );

    boardPreview.innerHTML = rowsData
      .map((rowTiles) => {
        const tilesHtml = rowTiles
          .map((t) => {
            if (t.type === 'empty') {
              return '<div class="board-tile tile-empty"></div>';
            }
            if (t.isRevealed) {
              return `<div class="board-tile tile-letter revealed">${t.char}</div>`;
            }
            return `<div class="board-tile tile-letter unrevealed"></div>`;
          })
          .join('');
        return `<div class="wheel-row">${tilesHtml}</div>`;
      })
      .join('');
  }

  // --- RENDER KEYBOARD ---

  function renderKeyboard() {
    if (!keyboardGrid) return;
    const answerLetters = new Set((state.answer || '').toUpperCase().replace(/[^A-Z]/g, '').split(''));

    keyboardGrid.innerHTML = ALPHABET.map((char) => {
      const isVowel = VOWELS.has(char);
      const isCalled = (state.calledLetters || []).includes(char);
      const inPuzzle = answerLetters.has(char);

      let classes = `btn-letter ${isVowel ? 'vowel' : ''} ${isCalled ? 'used' : ''}`;
      return `<button class="${classes}" data-letter="${char}" ${isCalled ? 'disabled' : ''}>${char}</button>`;
    }).join('');

    keyboardGrid.querySelectorAll('.btn-letter').forEach((btn) => {
      btn.addEventListener('click', () => {
        const letter = btn.getAttribute('data-letter');
        if (letter) callLetter(letter);
      });
    });
  }

  // --- CALL LETTER ---

  function callLetter(letter) {
    letter = letter.toUpperCase();
    if (!state.calledLetters.includes(letter)) {
      state.calledLetters.push(letter);
    }

    // Stop timer once a letter is picked
    state.running = false;
    clearInterval(timerInterval);

    const answerChars = (state.answer || '').toUpperCase().split('');
    const count = answerChars.filter((c) => c === letter).length;

    if (count > 0) {
      if (!state.revealed.includes(letter)) {
        state.revealed.push(letter);
      }
      answerChars.forEach((c, idx) => {
        if (c === letter && !state.revealed.includes(idx)) {
          state.revealed.push(idx);
        }
      });

      // Award cash based on landed wedge value * count
      const activeIdx = state.activePlayerIndex ?? 0;
      if (state.contestants && state.contestants[activeIdx]) {
        const wedgeVal = state.lastWedge ? (state.lastWedge.value || 500) : 500;
        const totalWon = wedgeVal * count;
        state.contestants[activeIdx].roundScore = (state.contestants[activeIdx].roundScore || 0) + totalWon;
      }

      state.phase = 'active';
      if (window.sounds) window.sounds.play('correct');
      broadcast('correct');
    } else {
      state.phase = 'waiting';
      if (window.sounds) window.sounds.play('buzzer');
      broadcast('buzzer');
    }

    // Check if puzzle fully revealed
    checkPuzzleSolved();
    updateUI();
  }

  function checkPuzzleSolved() {
    const letters = (state.answer || '').toUpperCase().replace(/[^A-Z0-9]/g, '').split('');
    const uniqueLetters = [...new Set(letters)];
    const allRevealed = uniqueLetters.every((l) => state.revealed.includes(l));
    if (allRevealed && uniqueLetters.length > 0) {
      state.answerRevealed = true;
      state.phase = 'answered';
      state.running = false;
      clearInterval(timerInterval);
      if (window.sounds) window.sounds.play('cheer');
      broadcast('cheer');
    }
  }

  // --- WHEEL DRAWING & SPIN ---

  function drawWheel() {
    if (!wheelCanvas || !window.WheelEngine) return;
    window.WheelEngine.drawWheel(wheelCanvas, state.wheelAngle || 0);
  }

  function triggerWheelSpin() {
    if (state.wheelSpinning) return;
    state.wheelSpinning = true;
    state.phase = 'spinning';

    // Stop and reset timer before spinning
    state.running = false;
    clearInterval(timerInterval);
    state.seconds = state.revealTime;

    if (wheelStatusTag) wheelStatusTag.textContent = 'SPINNING THE WHEEL...';
    if (btnSpinWheel) btnSpinWheel.disabled = true;
    if (btnCallAndSpin) btnCallAndSpin.disabled = true;

    if (window.sounds) window.sounds.play('wheel');

    const startAngle = state.wheelAngle || 0;
    const minSpins = 4;
    const extraSpins = Math.random() * 3.5;
    const targetAngle = startAngle + (minSpins + extraSpins) * (Math.PI * 2) + (Math.random() * Math.PI * 2);
    const duration = 3800; // 3.8 seconds smooth spin
    const startTime = performance.now();

    // Broadcast spin event to all devices (Live Stage, Phone, Co-Host)
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
    } catch (e) {}

    broadcast('wheel');

    let lastTickAngle = startAngle;
    const pegArc = (2 * Math.PI) / 24;

    function animate(now) {
      const elapsed = now - startTime;
      const progress = Math.min(1, elapsed / duration);
      // Realistic deceleration curve (ease-out cubic)
      const easeProgress = 1 - Math.pow(1 - progress, 3.5);

      state.wheelAngle = startAngle + (targetAngle - startAngle) * easeProgress;
      drawWheel();

      // Sound tick on peg crossing
      if (Math.abs(state.wheelAngle - lastTickAngle) >= pegArc) {
        lastTickAngle = state.wheelAngle;
        if (window.sounds) window.sounds.play('wheel_tick');
      }

      if (progress < 1) {
        requestAnimationFrame(animate);
      } else {
        state.wheelSpinning = false;
        if (btnSpinWheel) btnSpinWheel.disabled = false;
        if (btnCallAndSpin) btnCallAndSpin.disabled = false;

        state.wheelAngle = targetAngle;
        const wedge = window.WheelEngine.getWedgeAtPointer
          ? window.WheelEngine.getWedgeAtPointer(state.wheelAngle)
          : window.WheelEngine.getWedgeAtAngle(state.wheelAngle);

        state.lastWedge = wedge || { label: '$1,000', value: 1000, color: '#10b981', type: 'cash' };
        if (wheelResultDisplay) wheelResultDisplay.textContent = state.lastWedge.label;

        const activeIdx = state.activePlayerIndex ?? 0;
        const activeName = (state.contestants && state.contestants[activeIdx])
          ? state.contestants[activeIdx].name
          : `Player ${activeIdx + 1}`;

        if (state.lastWedge.type === 'bankrupt') {
          if (state.contestants && state.contestants[activeIdx]) {
            state.contestants[activeIdx].roundScore = 0;
          }
          state.phase = 'bankrupt';
          if (wheelStatusTag) wheelStatusTag.textContent = `💥 BANKRUPT for ${activeName}!`;
          if (window.sounds) window.sounds.play('bankrupt');
          broadcast('bankrupt');
        } else if (state.lastWedge.type === 'lose') {
          state.phase = 'lose';
          if (wheelStatusTag) wheelStatusTag.textContent = `🛑 LOSE A TURN for ${activeName}!`;
          if (window.sounds) window.sounds.play('buzzer');
          broadcast('buzzer');
        } else {
          // Cash or Free Play wedge landed -> AUTOMATICALLY START TIMER FOR PLAYER TO PICK LETTER
          state.phase = 'pick_letter';
          if (wheelStatusTag) wheelStatusTag.textContent = `🎯 ${state.lastWedge.label} — ${activeName} PICK A LETTER!`;
          if (window.sounds) window.sounds.play('reveal');
          broadcast('reveal');

          // START THE COUNTDOWN TIMER IMMEDIATELY
          startTimer();
        }

        updateUI();
        broadcast();
      }
    }
    requestAnimationFrame(animate);
  }

  // --- CONTESTANT & TURN CONTROLS ---

  function setActivePlayer(index) {
    state.activePlayerIndex = index;
    if (window.sounds) window.sounds.play('click');
    updateUI();
    broadcast();
  }

  function nextPlayer() {
    state.activePlayerIndex = ((state.activePlayerIndex ?? 0) + 1) % 3;
    if (window.sounds) window.sounds.play('click');
    updateUI();
    broadcast();
  }

  function adjustPlayerScore(index, delta) {
    if (state.contestants && state.contestants[index]) {
      state.contestants[index].roundScore = Math.max(0, (state.contestants[index].roundScore || 0) + delta);
      if (window.sounds) window.sounds.play('click');
      updateUI();
      broadcast();
    }
  }

  function bankruptPlayer(index) {
    if (state.contestants && state.contestants[index]) {
      state.contestants[index].roundScore = 0;
      if (window.sounds) window.sounds.play('buzzer');
      updateUI();
      broadcast('buzzer');
    }
  }

  function bankScores() {
    if (state.contestants) {
      state.contestants.forEach((c) => {
        c.totalScore = (c.totalScore || 0) + (c.roundScore || 0);
        c.roundScore = 0;
      });
      if (window.sounds) window.sounds.play('cheer');
      updateUI();
      broadcast('cheer');
    }
  }

  // --- TIMER CONTROLS ---

  function startTimer() {
    if (state.running) return;
    state.running = true;
    state.paused = false;
    if (state.phase !== 'pick_letter' && state.phase !== 'spinning') {
      state.phase = 'active';
    }

    clearInterval(timerInterval);
    timerInterval = setInterval(() => {
      if (state.seconds > 0) {
        state.seconds--;
        if (state.seconds <= 5 && state.seconds > 0) {
          if (window.sounds) window.sounds.play('tick');
        }
        if (state.seconds === 0) {
          state.running = false;
          state.phase = 'timeup';
          clearInterval(timerInterval);
          if (window.sounds) window.sounds.play('timeup');
          broadcast('timeup');
        }
        updateUI();
        broadcast();
      }
    }, 1000);

    updateUI();
    broadcast('countdown');
  }

  function pauseTimer() {
    state.running = false;
    state.paused = true;
    state.phase = 'paused';
    clearInterval(timerInterval);
    updateUI();
    broadcast();
  }

  function resetTimer() {
    state.running = false;
    state.paused = false;
    state.phase = 'waiting';
    state.seconds = state.revealTime;
    clearInterval(timerInterval);
    updateUI();
    broadcast();
  }

  function setTimerPreset(seconds) {
    state.revealTime = seconds;
    state.seconds = seconds;
    state.running = false;
    state.paused = false;
    clearInterval(timerInterval);
    if (window.sounds) window.sounds.play('click');
    updateUI();
    broadcast();
  }

  // --- PUZZLE SELECTION ---

  function populateCategories() {
    if (!selectCat || !window.JEOPARDY_CATEGORIES) return;
    selectCat.innerHTML = window.JEOPARDY_CATEGORIES.map(
      (c) => `<option value="${c}" ${c === state.category ? 'selected' : ''}>${c}</option>`
    ).join('');
    populatePuzzlesForCategory();
  }

  function populatePuzzlesForCategory() {
    if (!selectPuz || !window.JEOPARDY_PUZZLES) return;
    const cat = selectCat ? selectCat.value : state.category;
    const puzzles = window.JEOPARDY_PUZZLES[cat] || [];
    selectPuz.innerHTML = puzzles.map((p) => `<option value="${p}">${p}</option>`).join('');
  }

  function loadSelectedPuzzle() {
    const cat = selectCat ? selectCat.value : 'Jamaican Phrases';
    const puz = selectPuz ? selectPuz.value : 'WAH GWAAN';
    const hint = (window.JEOPARDY_HINTS && window.JEOPARDY_HINTS[puz]) || '';

    state.category = cat;
    state.answer = puz;
    state.hint = hint;
    state.revealed = [];
    state.calledLetters = [];
    state.answerRevealed = false;
    state.hintVisible = false;
    state.seconds = state.revealTime;
    state.running = false;
    state.paused = false;
    state.phase = 'waiting';

    clearInterval(timerInterval);
    updateUI();
    broadcast('reveal');
  }

  function pickRandomPuzzle() {
    if (!window.JEOPARDY_CATEGORIES || !window.JEOPARDY_PUZZLES) return;
    const catIndex = Math.floor(Math.random() * window.JEOPARDY_CATEGORIES.length);
    const cat = window.JEOPARDY_CATEGORIES[catIndex];
    const puzzles = window.JEOPARDY_PUZZLES[cat] || [];
    if (!puzzles.length) return;
    const puz = puzzles[Math.floor(Math.random() * puzzles.length)];
    const hint = (window.JEOPARDY_HINTS && window.JEOPARDY_HINTS[puz]) || '';

    state.category = cat;
    state.answer = puz;
    state.hint = hint;
    state.revealed = [];
    state.calledLetters = [];
    state.answerRevealed = false;
    state.hintVisible = false;
    state.seconds = state.revealTime;
    state.running = false;
    state.paused = false;
    state.phase = 'waiting';

    if (selectCat) selectCat.value = cat;
    populatePuzzlesForCategory();
    if (selectPuz) selectPuz.value = puz;

    clearInterval(timerInterval);
    updateUI();
    broadcast('reveal');
  }

  function applyCustomPuzzle() {
    const rawAnswer = inputAnswer ? inputAnswer.value.trim().toUpperCase() : '';
    if (!rawAnswer) return;
    const customHint = inputHint ? inputHint.value.trim() : '';

    state.category = 'CUSTOM PUZZLE';
    state.answer = rawAnswer;
    state.hint = customHint;
    state.revealed = [];
    state.calledLetters = [];
    state.answerRevealed = false;
    state.hintVisible = false;
    state.seconds = state.revealTime;
    state.running = false;
    state.phase = 'waiting';

    clearInterval(timerInterval);
    if (inputAnswer) inputAnswer.value = '';
    if (inputHint) inputHint.value = '';

    updateUI();
    broadcast('reveal');
  }

  // --- REVEAL HELPERS ---

  function revealRandomLetter() {
    const answer = (state.answer || '').toUpperCase();
    const letters = answer.replace(/[^A-Z0-9]/g, '').split('');
    const unrevealed = [...new Set(letters)].filter((l) => !state.revealed.includes(l));
    if (unrevealed.length === 0) return;
    const char = unrevealed[Math.floor(Math.random() * unrevealed.length)];
    callLetter(char);
  }

  function revealAllVowels() {
    'AEIOU'.split('').forEach((v) => callLetter(v));
  }

  function revealAllConsonants() {
    'BCDFGHJKLMNPQRSTVWXYZ'.split('').forEach((c) => callLetter(c));
  }

  function solveFullPuzzle() {
    state.answerRevealed = true;
    state.phase = 'answered';
    state.running = false;
    clearInterval(timerInterval);

    const answer = (state.answer || '').toUpperCase();
    state.revealed = [];
    for (let i = 0; i < answer.length; i++) {
      const c = answer[i];
      if (/[A-Z0-9]/.test(c)) {
        state.revealed.push(i);
        if (!state.revealed.includes(c)) state.revealed.push(c);
      }
    }

    if (window.sounds) window.sounds.play('cheer');
    updateUI();
    broadcast('cheer');
  }

  function nextRound() {
    state.round = (state.round || 1) + 1;
    pickRandomPuzzle();
  }

  function resetBoard() {
    state.revealed = [];
    state.calledLetters = [];
    state.answerRevealed = false;
    state.hintVisible = false;
    state.phase = 'waiting';
    state.seconds = state.revealTime;
    state.running = false;
    clearInterval(timerInterval);
    updateUI();
    broadcast();
  }

  function toggleHint() {
    state.hintVisible = !state.hintVisible;
    updateUI();
    broadcast();
  }

  // --- UI RENDER ---

  function updateUI() {
    if (statusBadge) {
      statusBadge.textContent = state.phase.toUpperCase();
      statusBadge.className = `badge-status ${state.phase}`;
    }
    if (catDisplay) catDisplay.textContent = state.category.toUpperCase();
    if (roundDisplay) roundDisplay.textContent = `ROUND ${state.round || 1}`;

    if (hintText) {
      hintText.textContent = state.hint
        ? `CLUE (${state.hintVisible ? 'ON STAGE' : 'HIDDEN FROM AUDIENCE'}): ${state.hint}`
        : `ANSWER: ${state.answer}`;
    }

    if (timerNumber) timerNumber.textContent = `${state.seconds}s`;
    if (timerProgress) {
      const pct = (state.seconds / state.revealTime) * 100;
      timerProgress.style.width = `${pct}%`;
    }

    if (wheelResultDisplay && state.lastWedge) {
      wheelResultDisplay.textContent = state.lastWedge.label;
    }

    // Active Contestant Turn Badge
    const activeIdx = state.activePlayerIndex ?? 0;
    const activePlayer = (state.contestants && state.contestants[activeIdx])
      ? state.contestants[activeIdx]
      : { name: `Player ${activeIdx + 1}`, roundScore: 0, totalScore: 0 };

    if (activeTurnBadge) {
      activeTurnBadge.textContent = `TURN: ${activePlayer.name.toUpperCase()} ($${activePlayer.roundScore || 0})`;
      activeTurnBadge.className = `badge-status active`;
    }

    // Update Contestant Cards
    if (state.contestants) {
      state.contestants.forEach((c, idx) => {
        const card = document.getElementById(`contestant-card-${idx}`);
        const nameInput = document.getElementById(`contestant-name-${idx}`);
        const roundElem = document.getElementById(`contestant-round-score-${idx}`);
        const totalElem = document.getElementById(`contestant-total-score-${idx}`);

        if (card) {
          if (idx === activeIdx) {
            card.classList.add('active');
          } else {
            card.classList.remove('active');
          }
        }
        if (nameInput && document.activeElement !== nameInput) {
          nameInput.value = c.name;
        }
        if (roundElem) {
          roundElem.textContent = `$${(c.roundScore || 0).toLocaleString()}`;
        }
        if (totalElem) {
          totalElem.textContent = `$${(c.totalScore || 0).toLocaleString()}`;
        }
      });
    }

    renderHostBoard();
    renderKeyboard();
    drawWheel();
  }

  // --- PHYSICAL KEYBOARD PRESS ---

  window.addEventListener('keydown', (e) => {
    if (document.activeElement && ['INPUT', 'TEXTAREA', 'SELECT'].includes(document.activeElement.tagName)) {
      return;
    }
    const key = e.key.toUpperCase();
    if (/^[A-Z]$/.test(key)) {
      callLetter(key);
    }
  });

  // --- INIT ---

  function init() {
    populateCategories();

    if (selectCat) selectCat.addEventListener('change', populatePuzzlesForCategory);
    if (btnLoad) btnLoad.addEventListener('click', loadSelectedPuzzle);
    if (btnRandom) btnRandom.addEventListener('click', pickRandomPuzzle);
    if (btnApplyCustom) btnApplyCustom.addEventListener('click', applyCustomPuzzle);

    if (btnTimerStart) btnTimerStart.addEventListener('click', startTimer);
    if (btnTimerPause) btnTimerPause.addEventListener('click', pauseTimer);
    if (btnTimerReset) btnTimerReset.addEventListener('click', resetTimer);

    if (btnSpinWheel) btnSpinWheel.addEventListener('click', triggerWheelSpin);
    if (btnCallAndSpin) btnCallAndSpin.addEventListener('click', () => {
      triggerWheelSpin();
    });

    if (btnNextPlayer) btnNextPlayer.addEventListener('click', nextPlayer);
    if (btnBankScores) btnBankScores.addEventListener('click', bankScores);

    document.querySelectorAll('.btn-select-turn').forEach((btn) => {
      btn.addEventListener('click', () => {
        const idx = parseInt(btn.getAttribute('data-index'), 10);
        if (!isNaN(idx)) setActivePlayer(idx);
      });
    });

    document.querySelectorAll('.btn-score-adjust').forEach((btn) => {
      btn.addEventListener('click', () => {
        const idx = parseInt(btn.getAttribute('data-index'), 10);
        const action = btn.getAttribute('data-action');
        const delta = parseInt(btn.getAttribute('data-delta'), 10);
        if (action === 'bankrupt') {
          bankruptPlayer(idx);
        } else if (!isNaN(delta)) {
          adjustPlayerScore(idx, delta);
        }
      });
    });

    [0, 1, 2].forEach((idx) => {
      const nameInput = document.getElementById(`contestant-name-${idx}`);
      if (nameInput) {
        nameInput.addEventListener('input', (e) => {
          if (state.contestants && state.contestants[idx]) {
            state.contestants[idx].name = e.target.value;
            broadcast();
          }
        });
      }
    });

    document.querySelectorAll('.btn-timer-preset').forEach((btn) => {
      btn.addEventListener('click', () => {
        const secs = parseInt(btn.getAttribute('data-seconds'), 10);
        if (!isNaN(secs)) setTimerPreset(secs);
      });
    });

    if (btnCallRandom) btnCallRandom.addEventListener('click', revealRandomLetter);
    if (btnCallVowels) btnCallVowels.addEventListener('click', revealAllVowels);
    if (btnCallConsonants) btnCallConsonants.addEventListener('click', revealAllConsonants);

    if (btnToggleHint) btnToggleHint.addEventListener('click', toggleHint);
    if (btnRevealAll) btnRevealAll.addEventListener('click', solveFullPuzzle);
    if (btnNextRound) btnNextRound.addEventListener('click', nextRound);
    if (btnResetBoard) btnResetBoard.addEventListener('click', resetBoard);

    document.querySelectorAll('.btn-sfx').forEach((btn) => {
      btn.addEventListener('click', () => {
        const sound = btn.getAttribute('data-sound');
        if (sound && window.sounds) {
          window.sounds.play(sound);
          broadcast(sound);
        }
      });
    });

    if (wheelCanvas) {
      wheelCanvas.style.cursor = 'pointer';
      wheelCanvas.title = 'Click to Spin the Wheel!';
      wheelCanvas.addEventListener('click', triggerWheelSpin);
    }

    if (window.RoomSync) {
      window.RoomSync.role = 'host';
      window.RoomSync.gameType = 'wheel';
      window.RoomSync.attachRoomHUD('.host-header');

      window.RoomSync.onBuzzer((data) => {
        if (window.sounds) window.sounds.play('buzzer');
        if (wheelStatusTag) {
          const oldText = wheelStatusTag.textContent;
          wheelStatusTag.textContent = `🚨 ${data.player || 'CO-HOST'} BUZZED IN!`;
          setTimeout(() => {
            if (wheelStatusTag.textContent.includes('BUZZED IN')) {
              wheelStatusTag.textContent = oldText;
            }
          }, 3500);
        }
      });
    }

    // Always reset spinning state so button is NEVER stuck
    state.wheelSpinning = false;
    if (btnSpinWheel) btnSpinWheel.disabled = false;
    if (btnCallAndSpin) btnCallAndSpin.disabled = false;

    // Try load cached state for active room
    try {
      const roomKey = window.RoomSync ? `dion_wheel_state_${window.RoomSync.roomId}` : STORAGE_KEY;
      const cached = sessionStorage.getItem(roomKey) || sessionStorage.getItem(STORAGE_KEY);
      if (cached) {
        const parsed = JSON.parse(cached);
        if (parsed) {
          state = Object.assign(state, parsed);
          state.wheelSpinning = false;
        }
      }
    } catch (e) {}

    updateUI();
    broadcast();

    if (window.RoomSync) {
      window.RoomSync.ensureHostPasscodeUnlocked(() => {
        updateUI();
      });
    }
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init);
  } else {
    init();
  }
})();
