import { pickUnused } from '../../shared/used-content-manager.js';
import { EMOJI_GUESS_ITEMS } from './emoji-guess-bank.js';

async function createRound(engine) {
  const item = await pickUnused(engine.roomId, 'emoji-guess', EMOJI_GUESS_ITEMS);
  if (!item) {
    alert('Every Emoji Guess has been used this session.');
    return { emoji: '', answer: '' };
  }
  return { emoji: item.emoji, answer: item.answer };
}

function renderHostControls(container, state) {
  const payload = state.payload || {};
  container.innerHTML = `
    <div class="cg-mod-emoji">${payload.emoji || ''}</div>
    <div class="cg-mod-host-hint">Host-only — answer: <strong style="color:#fff;">${payload.answer || ''}</strong>. Press REVEAL above when chat's guessed it.</div>
  `;
}

function renderLive(container, state) {
  const payload = state.payload || {};
  const revealed = state.phase === 'revealed';
  container.innerHTML = `
    <div class="cg-mod-emoji">${payload.emoji || ''}</div>
    ${revealed ? `<div class="cg-mod-answer">${payload.answer}</div>` : ''}
  `;
}

export default {
  id: 'emoji-guess',
  label: 'Emoji Guess',
  icon: '👀',
  createRound,
  renderHostControls,
  renderLive
};
