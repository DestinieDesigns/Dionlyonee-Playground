/**
 * Word Reveal Live Audience Screen
 */
(function () {
  function init() {
    if (window.RoomUI) {
      window.RoomUI.attachHUD('.main-header', 'word-reveal');
    }

    if (window.FirebaseRoom) {
      window.FirebaseRoom.onState((state) => {
        if (!state) return;

        if (state.puzzle) {
          const catBadge = document.getElementById('live-cat-badge');
          if (catBadge) catBadge.textContent = state.puzzle.category || 'WORD REVEAL';

          const grid = document.getElementById('live-tiles-grid');
          if (grid && window.RevealEngine) {
            const revealedSet = new Set(state.revealedIndices || []);
            window.RevealEngine.renderTiles(grid, state.puzzle.text, revealedSet);
          }

          const hintBox = document.getElementById('live-hint-container');
          if (hintBox && window.HintEngine && state.puzzle.hint) {
            window.HintEngine.renderHint(hintBox, state.puzzle.hint);
          }
        }

        if (state.contestants) {
          renderContestants(state.contestants);
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

  function renderContestants(contestants) {
    const row = document.getElementById('live-contestants-row');
    if (!row || !Array.isArray(contestants)) return;

    row.innerHTML = contestants.map(c => `
      <div style="
        background: #111624; border: 1px solid rgba(255,255,255,0.1); border-radius: 12px;
        padding: 12px 20px; text-align: center;
      ">
        <div style="font-weight: 800; color: #fff;">${c.name}</div>
        <div style="font-family: 'Cinzel', serif; font-size: 18px; color: #34d399; margin-top: 4px;">
          ${(c.roundScore || 0).toLocaleString()} PTS
        </div>
      </div>
    `).join('');
  }

  window.addEventListener('DOMContentLoaded', init);
})();
