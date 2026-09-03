/**
 * Reveal Tile Renderer
 */
(function () {
  const RevealEngine = {
    renderTiles(containerEl, text, revealedSet) {
      if (!containerEl) return;
      const clean = String(text || '').toUpperCase();

      containerEl.innerHTML = clean.split('').map((char, i) => {
        if (char === ' ') {
          return `<div style="width: 18px;"></div>`;
        }
        const isRevealed = revealedSet ? revealedSet.has(i) : true;
        return `
          <div class="word-tile ${isRevealed ? 'revealed' : ''}">
            ${isRevealed ? char : ''}
          </div>
        `;
      }).join('');
    }
  };

  window.RevealEngine = RevealEngine;
})();
