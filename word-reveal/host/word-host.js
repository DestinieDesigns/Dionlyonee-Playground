/**
 * Word Reveal Host Controller
 */
(function () {
  let currentIndex = 0;
  let allPuzzles = [];
  let currentPuzzle = null;

  function init() {
    if (window.HostAuth) {
      window.HostAuth.requireHostAccess(() => {
        setupHost();
      });
    } else {
      setupHost();
    }
  }

  function setupHost() {
    if (window.RoomUI) {
      window.RoomUI.attachHUD('.main-header', 'word-reveal');
    }

    const phrases = window.PhrasesData || [];
    const words = window.WordsData || [];
    allPuzzles = [...phrases, ...words];

    renderContestants();

    document.getElementById('btn-reveal-one').addEventListener('click', () => {
      if (window.WordEngine) {
        window.WordEngine.revealNextLetter();
        if (window.SoundManager) window.SoundManager.playSound('reveal', true);
        syncState('letter');
        renderTiles();
      }
    });

    document.getElementById('btn-reveal-all').addEventListener('click', () => {
      if (window.WordEngine) {
        window.WordEngine.revealAll();
        if (window.SoundManager) window.SoundManager.playSound('solve', true);
        syncState('solve');
        renderTiles();
      }
    });

    document.getElementById('btn-next-phrase').addEventListener('click', () => {
      currentIndex = (currentIndex + 1) % allPuzzles.length;
      loadPuzzle(currentIndex);
    });

    document.getElementById('btn-buzz-correct').addEventListener('click', () => {
      if (window.SoundManager) {
        window.SoundManager.playSound('correct', true);
      } else if (window.sounds) {
        window.sounds.play('correct');
      }
      if (window.ContestantManager) {
        window.ContestantManager.addRoundScore(500);
        renderContestants();
        syncState('correct');
      }
    });

    loadPuzzle(0);
  }

  function loadPuzzle(idx) {
    currentPuzzle = allPuzzles[idx];
    if (!currentPuzzle) return;

    const phrase = currentPuzzle.phrase || currentPuzzle.word;
    if (window.WordEngine) {
      window.WordEngine.setText(phrase);
    }

    document.getElementById('host-phrase-display').textContent = phrase;
    if (window.HintEngine) {
      window.HintEngine.renderHint(
        document.getElementById('host-hint-box'),
        currentPuzzle.hint || ''
      );
    }

    renderTiles();
    syncState('new_round');
  }

  function renderTiles() {
    const grid = document.getElementById('host-tiles-grid');
    if (grid && window.RevealEngine && window.WordEngine) {
      window.RevealEngine.renderTiles(
        grid,
        window.WordEngine.currentText,
        window.WordEngine.revealedIndices
      );
    }
  }

  function syncState(event = 'update') {
    if (window.FirebaseRoom && window.WordEngine && currentPuzzle) {
      const phrase = currentPuzzle.phrase || currentPuzzle.word;
      window.FirebaseRoom.broadcastState({
        gameType: 'word-reveal',
        puzzle: {
          text: phrase,
          category: currentPuzzle.category,
          hint: currentPuzzle.hint
        },
        revealedIndices: [...window.WordEngine.revealedIndices],
        contestants: window.ContestantManager ? window.ContestantManager.getContestants() : []
      }, event);
    }
  }

  function renderContestants() {
    const list = document.getElementById('host-contestants-list');
    if (!list || !window.ContestantManager) return;
    const contestants = window.ContestantManager.getContestants();

    list.innerHTML = contestants.map(c => `
      <div style="
        display: flex; align-items: center; justify-content: space-between;
        padding: 8px 12px; background: rgba(255,255,255,0.04); border-radius: 8px; margin-bottom: 6px;
      ">
        <span style="font-weight: 700; color: #fff;">${c.name}</span>
        <strong style="color: #34d399;">${c.roundScore || 0} PTS</strong>
      </div>
    `).join('');
  }

  window.addEventListener('DOMContentLoaded', init);
})();
