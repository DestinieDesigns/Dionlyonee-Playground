/**
 * Hint Engine
 */
(function () {
  const HintEngine = {
    renderHint(containerEl, hintText) {
      if (!containerEl) return;
      containerEl.innerHTML = `
        <div style="
          padding: 10px 16px; background: rgba(16, 185, 129, 0.12);
          border: 1px solid rgba(16, 185, 129, 0.4); border-radius: 10px;
          color: #34d399; font-size: 13.5px; text-align: center;
        ">
          💡 <strong>CLUE:</strong> ${hintText || 'No clue provided.'}
        </div>
      `;
    }
  };

  window.HintEngine = HintEngine;
})();
