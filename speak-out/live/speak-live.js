/**
 * DIONLYONEE SPEAK OUT! - Live Stage Spectator / OBS Overlay Controller
 */
(function () {
  let engine = null;
  let toastTimer = null;

  document.addEventListener('DOMContentLoaded', () => {
    engine = new window.SpeakEngine({ role: 'live' });

    initUI();
  });

  function initUI() {
    const roomVal = document.getElementById('liveRoomVal');
    if (roomVal) roomVal.textContent = engine.roomCode || 'DIONLIVE';

    engine.onStateUpdate(renderLiveState);
    engine.timer.onTick(updateLiveTimer);
  }

  function renderLiveState(state) {
    if (!state) return;

    // Score
    const scoreVal = document.getElementById('liveScoreVal');
    if (scoreVal) scoreVal.textContent = state.score.totalScore.toLocaleString();

    // Streak
    const streakVal = document.getElementById('liveStreakVal');
    const streakBox = document.getElementById('liveStreakBox');
    if (streakVal) {
      streakVal.textContent = `${state.streak.currentStreak} 🔥`;
      if (state.streak.currentStreak >= 3) {
        streakBox?.classList.add('animate-streak');
      } else {
        streakBox?.classList.remove('animate-streak');
      }
    }

    // Action Toast
    if (state.lastAction) {
      showToast(state.lastAction);
    }

    // Challenge
    renderLiveChallenge(state.currentChallenge, state.showAnswer, state.showHint);
  }

  function renderLiveChallenge(challenge, showAnswer, showHint) {
    if (!challenge) return;

    const bannerIcon = document.getElementById('liveModeIcon');
    const bannerName = document.getElementById('liveModeName');
    const instruction = document.getElementById('liveInstruction');
    const headline = document.getElementById('liveHeadline');
    const forbiddenGrid = document.getElementById('liveForbiddenGrid');
    const answerReveal = document.getElementById('liveAnswerReveal');

    const mode = window.SpeakOutData.getMode(challenge.modeId);

    if (bannerIcon) bannerIcon.textContent = mode.icon;
    if (bannerName) bannerName.textContent = mode.name;

    if (forbiddenGrid) forbiddenGrid.style.display = 'none';
    if (answerReveal) answerReveal.style.display = 'none';

    switch (challenge.modeId) {
      case 'tongue-twister':
        instruction.textContent = challenge.instruction || 'REPEAT 3 TIMES CLEARLY WITHOUT STOPPING';
        headline.textContent = `"${challenge.text}"`;
        break;

      case 'rapid-fire':
        instruction.textContent = challenge.instruction || `NAME ${challenge.targetCount || 5} ITEMS FAST!`;
        headline.textContent = challenge.prompt;
        break;

      case 'forbidden-words':
        instruction.textContent = 'HOST MUST DESCRIBE - DO NOT SAY FORBIDDEN WORDS!';
        headline.textContent = challenge.target;

        if (forbiddenGrid && Array.isArray(challenge.forbidden)) {
          forbiddenGrid.style.display = 'grid';
          forbiddenGrid.innerHTML = challenge.forbidden
            .map(w => `<div class="live-forbidden-pill">🚫 ${w}</div>`)
            .join('');
        }
        break;

      case 'voice-challenge':
        instruction.textContent = `IMPERSONATE: ${challenge.character}`;
        headline.textContent = `"${challenge.phrase}"`;
        break;

      case 'keep-talking':
        instruction.textContent = `TALK CONTINUOUSLY FOR ${challenge.duration || 30} SECONDS!`;
        headline.textContent = challenge.topic;
        break;

      case 'finish-the-phrase':
        instruction.textContent = 'FINISH THE PHRASE!';
        headline.textContent = challenge.setup;

        if (answerReveal) {
          if (showAnswer) {
            answerReveal.style.display = 'block';
            answerReveal.innerHTML = `✅ ${challenge.answer}`;
          } else if (showHint && challenge.hint) {
            answerReveal.style.display = 'block';
            answerReveal.innerHTML = `💡 HINT: ${challenge.hint}`;
            answerReveal.style.borderColor = '#f59e0b';
            answerReveal.style.color = '#fbbf24';
          }
        }
        break;

      default:
        instruction.textContent = 'DIONLYONEE SPEAK OUT!';
        headline.textContent = challenge.text || 'Ready for Next Challenge';
        break;
    }
  }

  function updateLiveTimer(rem, formatted, percent, running) {
    const numEl = document.getElementById('liveTimerNum');
    const floatEl = document.getElementById('liveTimerFloat');

    if (numEl) numEl.textContent = formatted;

    if (floatEl) {
      if (rem <= 5 && rem > 0) {
        floatEl.classList.add('animate-timer-critical');
      } else {
        floatEl.classList.remove('animate-timer-critical');
      }
    }
  }

  function showToast(action) {
    const toast = document.getElementById('liveBannerToast');
    const text = document.getElementById('liveToastText');
    const icon = document.getElementById('liveToastIcon');
    if (!toast || !text || !action || !action.text) return;

    if (action.type === 'pass') {
      icon.textContent = '✅';
      toast.style.borderColor = '#10b981';
    } else if (action.type === 'fail') {
      icon.textContent = '❌';
      toast.style.borderColor = '#ef4444';
    } else if (action.type === 'bonus') {
      icon.textContent = '⭐';
      toast.style.borderColor = '#f59e0b';
    } else {
      icon.textContent = '📢';
      toast.style.borderColor = '#38bdf8';
    }

    text.textContent = action.text;
    toast.style.display = 'flex';

    if (toastTimer) clearTimeout(toastTimer);
    toastTimer = setTimeout(() => {
      toast.style.display = 'none';
    }, 3500);
  }
})();
