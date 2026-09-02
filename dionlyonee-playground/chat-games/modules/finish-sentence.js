import { pickUnused } from '../../shared/used-content-manager.js';
import { FINISH_SENTENCE_PROMPTS } from './finish-sentence-prompts.js';

async function createRound(engine) {
  const item = await pickUnused(engine.roomId, 'finish-sentence', FINISH_SENTENCE_PROMPTS);
  if (!item) {
    alert('Every Finish the Sentence prompt has been used this session.');
    return { prompt: '', response: '' };
  }
  return { prompt: item.prompt, response: '' };
}

function renderHostControls(container, state, engine) {
  const payload = state.payload || {};

  container.innerHTML = `
    <div class="cg-mod-prompt">"${payload.prompt || ''}"</div>
    <div class="cg-mod-input-row">
      <input type="text" id="fts-response-input" placeholder="Type the chat response you liked..." value="${payload.response || ''}">
      <button id="fts-show-btn" class="cg-mod-action-btn">SHOW ON LIVE</button>
    </div>
  `;

  document.getElementById('fts-show-btn').addEventListener('click', () => {
    const value = document.getElementById('fts-response-input').value.trim();
    if (!value) return;
    engine.patchState({ payload: { ...payload, response: value }, phase: 'revealed' });
  });
}

function renderLive(container, state) {
  const payload = state.payload || {};
  const showResponse = state.phase === 'revealed' && payload.response;

  container.innerHTML = `
    <div class="cg-mod-prompt">"${payload.prompt || ''}"</div>
    ${showResponse ? `<div class="cg-mod-answer">💬 ${payload.response}</div>` : ''}
  `;
}

export default {
  id: 'finish-sentence',
  label: 'Finish the Sentence',
  icon: '😂',
  createRound,
  renderHostControls,
  renderLive
};
