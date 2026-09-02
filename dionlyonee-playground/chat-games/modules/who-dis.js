import { pickUnused } from '../../shared/used-content-manager.js';
import { WHO_DIS_ITEMS } from './who-dis-bank.js';

async function createRound(engine) {
  const item = await pickUnused(engine.roomId, 'who-dis', WHO_DIS_ITEMS);
  if (!item) {
    alert('Every Who Dis? character has been used this session.');
    return { answer: '', clues: [], clueIndex: 0 };
  }
  return { answer: item.answer, clues: item.clues, clueIndex: 0 };
}

function renderHostControls(container, state, engine) {
  const payload = state.payload || {};
  const clues = payload.clues || [];
  const clueIndex = payload.clueIndex || 0;
  const atLastClue = clueIndex >= clues.length - 1;

  container.innerHTML = `
    <div class="cg-mod-clue-list" id="wd-clue-list"></div>
    <div class="cg-mod-input-row">
      <button id="wd-next-clue-btn" class="cg-mod-action-btn" ${atLastClue ? 'disabled' : ''}>NEXT CLUE</button>
    </div>
    <div class="cg-mod-host-hint">Host-only — answer: <strong style="color:#fff;">${payload.answer || ''}</strong>. Press REVEAL above when chat's got it.</div>
  `;

  const list = document.getElementById('wd-clue-list');
  clues.slice(0, clueIndex + 1).forEach((clue, i) => {
    const item = document.createElement('div');
    item.className = 'cg-mod-clue-item';
    item.textContent = `CLUE ${i + 1}: ${clue}`;
    list.appendChild(item);
  });

  document.getElementById('wd-next-clue-btn').addEventListener('click', () => {
    if (clueIndex >= clues.length - 1) return;
    engine.patchState({ payload: { ...payload, clueIndex: clueIndex + 1 } });
  });
}

function renderLive(container, state) {
  const payload = state.payload || {};
  const clues = payload.clues || [];
  const clueIndex = payload.clueIndex || 0;
  const revealed = state.phase === 'revealed';

  container.innerHTML = `<div class="cg-mod-clue-list" id="wd-live-clue-list"></div>`;
  const list = document.getElementById('wd-live-clue-list');
  clues.slice(0, clueIndex + 1).forEach((clue, i) => {
    const item = document.createElement('div');
    item.className = 'cg-mod-clue-item';
    item.textContent = `CLUE ${i + 1}: ${clue}`;
    list.appendChild(item);
  });

  if (revealed) {
    const answerEl = document.createElement('div');
    answerEl.className = 'cg-mod-answer';
    answerEl.textContent = `🎉 ${payload.answer}`;
    container.appendChild(answerEl);
  }
}

export default {
  id: 'who-dis',
  label: 'Who Dis?',
  icon: '🕵️',
  createRound,
  renderHostControls,
  renderLive
};
