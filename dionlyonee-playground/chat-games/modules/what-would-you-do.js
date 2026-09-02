import { pickUnused } from '../../shared/used-content-manager.js';
import { WHAT_WOULD_YOU_DO_PROMPTS } from './what-would-you-do-prompts.js';

async function createRound(engine) {
  const item = await pickUnused(engine.roomId, 'what-would-you-do', WHAT_WOULD_YOU_DO_PROMPTS);
  if (!item) {
    alert('Every What Would You Do? prompt has been used this session.');
    return { prompt: '', response: '' };
  }
  return { prompt: item.prompt, response: '' };
}

function renderHostControls(container, state, engine) {
  const payload = state.payload || {};

  container.innerHTML = `
    <div class="cg-mod-prompt">${payload.prompt || ''}</div>
    <div class="cg-mod-input-row">
      <input type="text" id="wwyd-response-input" placeholder="Type the chat response you liked..." value="${payload.response || ''}">
      <button id="wwyd-show-btn" class="cg-mod-action-btn">SHOW ON LIVE</button>
    </div>
  `;

  document.getElementById('wwyd-show-btn').addEventListener('click', () => {
    const value = document.getElementById('wwyd-response-input').value.trim();
    if (!value) return;
    engine.patchState({ payload: { ...payload, response: value }, phase: 'revealed' });
  });
}

function renderLive(container, state) {
  const payload = state.payload || {};
  const showResponse = state.phase === 'revealed' && payload.response;

  container.innerHTML = `
    <div class="cg-mod-prompt">${payload.prompt || ''}</div>
    ${showResponse ? `<div class="cg-mod-answer">💬 ${payload.response}</div>` : ''}
  `;
}

export default {
  id: 'what-would-you-do',
  label: 'What Would You Do?',
  icon: '🤔',
  createRound,
  renderHostControls,
  renderLive
};
