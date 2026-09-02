import { pickUnused } from '../../shared/used-content-manager.js';
import { CHARADES_ITEMS } from './charades-bank.js';

async function createRound(engine) {
  const item = await pickUnused(engine.roomId, 'charades', CHARADES_ITEMS);
  if (!item) {
    alert('Every Charades clue has been used this session.');
    return { category: '', emoji: '', answer: '' };
  }
  return { category: item.category, emoji: item.emoji, answer: item.answer };
}

function renderHostControls(container, state) {
  const payload = state.payload || {};
  container.innerHTML = `
    <div class="cg-mod-category">${payload.category || ''}</div>
    <div class="cg-mod-emoji">${payload.emoji || ''}</div>
    <div class="cg-mod-host-hint">Host-only — act this out: <strong style="color:#fff;">${payload.answer || ''}</strong>. Press REVEAL above when chat's got it.</div>
  `;
}

function renderLive(container, state) {
  const payload = state.payload || {};
  const revealed = state.phase === 'revealed';
  container.innerHTML = `
    <div class="cg-mod-category">${payload.category || ''} — YOUR CLUE</div>
    <div class="cg-mod-emoji">${payload.emoji || ''}</div>
    ${revealed ? `<div class="cg-mod-answer">${payload.answer}</div>` : ''}
  `;
}

export default {
  id: 'charades',
  label: 'Charades',
  icon: '🎭',
  createRound,
  renderHostControls,
  renderLive
};
