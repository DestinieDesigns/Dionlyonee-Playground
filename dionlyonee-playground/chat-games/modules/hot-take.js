import { pickUnused } from '../../shared/used-content-manager.js';
import { HOT_TAKE_STATEMENTS } from './hot-take-statements.js';

async function createRound(engine) {
  const item = await pickUnused(engine.roomId, 'hot-take', HOT_TAKE_STATEMENTS);
  if (!item) {
    alert('Every Hot Take statement has been used this session.');
    return { statement: '', agreePct: null, disagreePct: null };
  }
  return { statement: item.statement, agreePct: null, disagreePct: null };
}

function renderHostControls(container, state, engine) {
  const payload = state.payload || {};

  container.innerHTML = `
    <div class="cg-mod-prompt">${payload.statement || ''}</div>
    <div class="cg-mod-input-row">
      <input type="number" id="ht-agree-input" placeholder="Agree %" min="0" max="100" style="max-width:100px;">
      <input type="number" id="ht-disagree-input" placeholder="Disagree %" min="0" max="100" style="max-width:100px;">
      <button id="ht-show-btn" class="cg-mod-action-btn">SHOW RESULT</button>
    </div>
    <div class="cg-mod-host-hint">🔥 AGREE vs 💀 DISAGREE — eyeball the chat reaction and enter the split.</div>
  `;

  document.getElementById('ht-show-btn').addEventListener('click', () => {
    const agree = Number(document.getElementById('ht-agree-input').value);
    const disagree = Number(document.getElementById('ht-disagree-input').value);
    if (!Number.isFinite(agree) || !Number.isFinite(disagree)) return;
    engine.patchState({ payload: { ...payload, agreePct: agree, disagreePct: disagree }, phase: 'revealed' });
  });
}

function renderLive(container, state) {
  const payload = state.payload || {};
  const revealed = state.phase === 'revealed' && payload.agreePct !== null && payload.agreePct !== undefined;

  container.innerHTML = `
    <div class="cg-mod-prompt">${payload.statement || ''}</div>
    ${revealed ? `
      <div class="cg-mod-bar-row">
        <div class="cg-mod-bar-label">🔥 AGREE</div>
        <div class="cg-mod-bar-track"><div class="cg-mod-bar-fill agree" style="width:${payload.agreePct}%;"></div></div>
        <div class="cg-mod-bar-pct">${payload.agreePct}%</div>
      </div>
      <div class="cg-mod-bar-row">
        <div class="cg-mod-bar-label">💀 DISAGREE</div>
        <div class="cg-mod-bar-track"><div class="cg-mod-bar-fill disagree" style="width:${payload.disagreePct}%;"></div></div>
        <div class="cg-mod-bar-pct">${payload.disagreePct}%</div>
      </div>
    ` : `<div class="cg-mod-host-hint">🔥 AGREE or 💀 DISAGREE — react in chat!</div>`}
  `;
}

export default {
  id: 'hot-take',
  label: 'Hot Take',
  icon: '🔥',
  createRound,
  renderHostControls,
  renderLive
};
