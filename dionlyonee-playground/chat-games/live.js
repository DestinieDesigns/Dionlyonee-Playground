import { ChatGames } from './chat-game-engine.js';
import { MODULES } from './modules/registry.js';
import { renderWaitingScene } from '../shared/waiting-scene.js';

const stage = document.getElementById('cg-live-stage');
let showingWaiting = false;

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

  showingWaiting = false;
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
  if (showingWaiting) return; // avoid restarting animations on redundant idle updates
  showingWaiting = true;
  renderWaitingScene(stage, 'The next game starts any moment now...');
}
