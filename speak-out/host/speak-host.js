/**
 * DIONLYONEE SPEAK OUT! - Host Console View Controller
 */
(function () {
  let engine = null;

  document.addEventListener('DOMContentLoaded', () => {
    engine = new window.SpeakEngine({ role: 'host' });

    initUI();
    renderModes();
    bindEvents();

    // Initial challenge load
    engine.nextChallenge(false);
  });

  function initUI() {
    const roomVal = document.getElementById('roomCodeVal');
    if (roomVal) roomVal.textContent = engine.roomCode || 'DIONLIVE';

    engine.onStateUpdate(renderState);
    engine.timer.onTick(updateTimerUI);
  }

  function renderModes() {
    const container = document.getElementById('modeList');
    if (!container || !window.SpeakOutData) return;

    container.innerHTML = '';

    // Add 6 standard modes
    Object.values(window.SpeakOutData.modes).forEach(mode => {
      const btn = document.createElement('button');
      btn.className = `mode-btn ${engine.activeMode === mode.id ? 'active' : ''}`;
      btn.dataset.mode = mode.id;
      btn.innerHTML = `
        <span class="icon">${mode.icon}</span>
        <div style="display: flex; flex-direction: column;">
          <span>${mode.name}</span>
          <span style="font-size: 0.65rem; color: var(--text-muted); font-weight: 500;">${mode.badge}</span>
        </div>
      `;
      btn.addEventListener('click', () => {
        engine.setMode(mode.id);
      });
      container.appendChild(btn);
    });

    // Add Random Everything Mode
    const randBtn = document.createElement('button');
    randBtn.className = `mode-btn ${engine.activeMode === 'random' ? 'active' : ''}`;
    randBtn.dataset.mode = 'random';
    randBtn.innerHTML = `
      <span class="icon">🎲</span>
      <div style="display: flex; flex-direction: column;">
        <span>RANDOM MODE</span>
        <span style="font-size: 0.65rem; color: #f59e0b; font-weight: 700;">SHUFFLE ALL MODES</span>
      </div>
    `;
    randBtn.addEventListener('click', () => {
      engine.setMode('random');
    });
    container.appendChild(randBtn);
  }

  function bindEvents() {
    // Stage Actions
    document.getElementById('btnPass')?.addEventListener('click', () => engine.markPass());
    document.getElementById('btnFail')?.addEventListener('click', () => engine.markFail());
    document.getElementById('btnSkip')?.addEventListener('click', () => engine.markSkip());
    document.getElementById('btnNext')?.addEventListener('click', () => engine.nextChallenge(false));

    // Timer Controls
    document.getElementById('btnTimerToggle')?.addEventListener('click', () => {
      if (engine.timer.running) {
        engine.pauseTimer();
      } else {
        engine.startTimer();
      }
    });

    document.getElementById('btnTimerReset')?.addEventListener('click', () => engine.resetTimer());
    document.getElementById('btnTimerPlus5')?.addEventListener('click', () => engine.addTime(5));

    // Sounds
    document.querySelectorAll('.btn-sound').forEach(btn => {
      btn.addEventListener('click', () => {
        const sound = btn.dataset.sound;
        if (sound) {
          engine.playLocalSound(sound);
          if (window.FirebaseRoom) window.FirebaseRoom.broadcastSound(sound);
        }
      });
    });

    // Bonuses
    document.getElementById('btnBonus25')?.addEventListener('click', () => engine.awardManualBonus(25));
    document.getElementById('btnBonus50')?.addEventListener('click', () => engine.awardManualBonus(50));
    document.getElementById('btnBonus100')?.addEventListener('click', () => engine.awardManualBonus(100));

    // Difficulties
    document.querySelectorAll('#diffButtons button').forEach(btn => {
      btn.addEventListener('click', () => {
        document.querySelectorAll('#diffButtons button').forEach(b => b.style.background = 'rgba(255,255,255,0.06)');
        btn.style.background = 'rgba(245,158,11,0.2)';
        engine.setDifficulty(btn.dataset.diff);
      });
    });

    // Reset Game
    document.getElementById('btnResetGame')?.addEventListener('click', () => {
      if (confirm('Start a fresh game? This resets score, streak, and challenge history.')) {
        engine.resetGame();
      }
    });

    // Links to other views
    document.getElementById('btnOpenLive')?.addEventListener('click', () => {
      window.open(`../live/index.html?room=${engine.roomCode}`, '_blank');
    });

    document.getElementById('btnOpenCohost')?.addEventListener('click', () => {
      window.open(`../cohost/index.html?room=${engine.roomCode}`, '_blank');
    });
  }

  function renderState(state) {
    if (!state) return;

    // Update Stats
    const scoreVal = document.getElementById('scoreVal');
    if (scoreVal) scoreVal.textContent = state.score.totalScore.toLocaleString();

    const streakVal = document.getElementById('streakVal');
    if (streakVal) {
      streakVal.textContent = state.streak.currentStreak;
      const streakPill = document.getElementById('streakPill');
      if (state.streak.currentStreak >= 3) {
        streakPill?.classList.add('animate-streak');
      } else {
        streakPill?.classList.remove('animate-streak');
      }
    }

    const passedVal = document.getElementById('passedVal');
    if (passedVal) passedVal.textContent = state.score.challengesPassed;

    const usedStats = document.getElementById('usedStatsText');
    if (usedStats) usedStats.textContent = `Challenges Used: ${state.usedCount}`;

    // Update Mode highlights
    document.querySelectorAll('.mode-btn').forEach(btn => {
      btn.classList.toggle('active', btn.dataset.mode === state.activeMode);
    });

    // Update Challenge Card
    renderChallenge(state.currentChallenge, state.showAnswer, state.showHint);

    // Update Status Action Text
    const actionText = document.getElementById('statusActionText');
    if (actionText && state.lastAction) {
      actionText.textContent = state.lastAction.text || 'Ready for Live Broadcast';
    }

    // Toggle button label
    const timerToggleBtn = document.getElementById('btnTimerToggle');
    if (timerToggleBtn) {
      timerToggleBtn.textContent = state.timer.running ? '⏸️ PAUSE' : '▶️ START';
    }
  }

  function renderChallenge(challenge, showAnswer, showHint) {
    if (!challenge) return;

    const cardModeIcon = document.getElementById('cardModeIcon');
    const cardModeName = document.getElementById('cardModeName');
    const cardDiffBadge = document.getElementById('cardDiffBadge');
    const promptInstruction = document.getElementById('promptInstruction');
    const promptMainText = document.getElementById('promptMainText');
    const forbiddenGrid = document.getElementById('forbiddenGrid');
    const answerBanner = document.getElementById('answerBanner');

    const mode = window.SpeakOutData.getMode(challenge.modeId || engine.activeMode);

    if (cardModeIcon) cardModeIcon.textContent = mode.icon;
    if (cardModeName) cardModeName.textContent = mode.name;

    const diff = (challenge.difficulty || 'medium').toLowerCase();
    if (cardDiffBadge) {
      cardDiffBadge.className = `badge-difficulty-${diff}`;
      const pts = window.SpeakOutData.getMode(challenge.modeId).scoring[diff] || 100;
      cardDiffBadge.textContent = `${diff.toUpperCase()} (+${pts} PTS)`;
    }

    if (forbiddenGrid) forbiddenGrid.style.display = 'none';
    if (answerBanner) answerBanner.style.display = 'none';

    // Tailor rendering based on mode
    switch (challenge.modeId) {
      case 'tongue-twister':
        promptInstruction.textContent = challenge.instruction || 'REPEAT 3 TIMES CLEARLY WITHOUT STOPPING';
        promptMainText.textContent = `"${challenge.text}"`;
        break;

      case 'rapid-fire':
        promptInstruction.textContent = challenge.instruction || `NAME ${challenge.targetCount || 5} ITEMS BEFORE TIME RUNS OUT!`;
        promptMainText.textContent = challenge.prompt;
        break;

      case 'forbidden-words':
        promptInstruction.textContent = 'DESCRIBE THE SECRET WORD - DO NOT SAY FORBIDDEN WORDS!';
        promptMainText.textContent = challenge.target;

        if (forbiddenGrid && Array.isArray(challenge.forbidden)) {
          forbiddenGrid.style.display = 'grid';
          forbiddenGrid.innerHTML = challenge.forbidden
            .map(w => `<div class="forbidden-word-chip">🚫 ${w}</div>`)
            .join('');
        }
        break;

      case 'voice-challenge':
        promptInstruction.textContent = `CHARACTER: ${challenge.character}`;
        promptMainText.textContent = `"${challenge.phrase}"`;
        if (answerBanner) {
          answerBanner.style.display = 'block';
          answerBanner.textContent = `🎭 ACTING TIP: ${challenge.instruction}`;
        }
        break;

      case 'keep-talking':
        promptInstruction.textContent = `TALK CONTINUOUSLY FOR ${challenge.duration || 30} SECONDS - NO SILENCE!`;
        promptMainText.textContent = challenge.topic;
        if (answerBanner && challenge.hint) {
          answerBanner.style.display = 'block';
          answerBanner.textContent = `💡 IDEAS: ${challenge.hint}`;
        }
        break;

      case 'finish-the-phrase':
        promptInstruction.textContent = 'FINISH THE PHRASE BEFORE THE BUZZER!';
        promptMainText.textContent = challenge.setup;

        if (answerBanner) {
          answerBanner.style.display = 'block';
          if (showAnswer) {
            answerBanner.innerHTML = `✅ COMPLETE: <strong>${challenge.answer}</strong>`;
            answerBanner.style.color = '#34d399';
          } else {
            answerBanner.innerHTML = `💡 HINT: ${challenge.hint || 'Available to Co-Host'}`;
            answerBanner.style.color = '#94a3b8';
          }
        }
        break;

      default:
        promptInstruction.textContent = 'SPEAK OUT CHALLENGE';
        promptMainText.textContent = challenge.text || challenge.prompt || challenge.topic || 'Ready';
        break;
    }
  }

  function updateTimerUI(rem, formatted, percent, running) {
    const numEl = document.getElementById('timerNumber');
    const ringEl = document.getElementById('timerRing');

    if (numEl) numEl.textContent = formatted;

    if (ringEl) {
      if (rem <= 5 && rem > 0) {
        ringEl.classList.add('animate-timer-critical');
      } else {
        ringEl.classList.remove('animate-timer-critical');
      }
    }
  }
})();
