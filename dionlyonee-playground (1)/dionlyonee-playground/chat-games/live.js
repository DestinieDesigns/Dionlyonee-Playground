import { ChatGames } from './chat-game-engine.js';
import { MODULES } from './modules/registry.js';

const stage = document.getElementById('cg-live-stage');

ChatGames.onStateChange((state) => {
  render(state);
});

function render(state) {
  if (!state || state.phase === 'idle' || !state.gameType) {
    renderWaiting();
    return;
  }

  const mod = MODULES.find((m) => m.id === state.gameType);
  if (!mod) {
    renderWaiting();
    return;
  }

  stage.innerHTML = `
    <div class="cg-game-badge">${mod.icon || ''} ${mod.label}</div>
    <div class="cg-prompt" id="cg-prompt"></div>
    <div id="cg-module-live"></div>
  `;

  const promptEl = document.getElementById('cg-prompt');
  if (promptEl) promptEl.textContent = state.prompt || '';

  const moduleLive = document.getElementById('cg-module-live');
  mod.renderLive(moduleLive, state);
}

function renderWaiting() {
  stage.innerHTML = `
    <div class="cg-waiting">
      <div class="cg-waiting-icon">🎮</div>
      <div class="cg-waiting-title">WAITING FOR THE HOST</div>
      <div class="cg-waiting-sub">The next game starts any moment now...</div>
    </div>
  `;
}
