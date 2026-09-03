/**
 * Trivia UI Renderer
 */
(function () {
  const TriviaUI = {
    renderQuestionCard(containerEl, q, isHost = false) {
      if (!containerEl || !q) return;

      containerEl.innerHTML = `
        <div style="
          background: #111624; border: 1px solid rgba(168, 85, 247, 0.4);
          border-radius: 18px; padding: 28px; box-shadow: 0 0 30px rgba(168, 85, 247, 0.2);
          text-align: center;
        ">
          <div style="font-size: 11px; font-weight: 800; color: #c084fc; letter-spacing: 2px; text-transform: uppercase; margin-bottom: 8px;">
            ${q.category || 'TRIVIA'} • ${q.points || 200} POINTS
          </div>
          <h2 style="font-family: 'Cinzel', serif; font-size: 24px; color: #ffffff; margin-bottom: 24px; line-height: 1.4;">
            ${q.question}
          </h2>
          <div style="display: grid; grid-template-columns: 1fr 1fr; gap: 12px;" id="trivia-options-grid">
            ${(q.options || []).map((opt, i) => `
              <button class="trivia-opt-btn" data-opt="${opt}" style="
                padding: 14px 18px; border-radius: 10px; background: rgba(255,255,255,0.05);
                border: 1px solid rgba(255,255,255,0.12); color: #fff; font-size: 15px; font-weight: 700;
                text-align: left; cursor: pointer; transition: all 0.2s;
              ">
                <span style="color: #c084fc; margin-right: 8px;">${String.fromCharCode(65 + i)}.</span>
                ${opt}
                ${isHost && opt === q.answer ? ' <span style="color: #10b981; float: right;">✓ (CORRECT)</span>' : ''}
              </button>
            `).join('')}
          </div>
        </div>
      `;
    }
  };

  window.TriviaUI = TriviaUI;
})();
