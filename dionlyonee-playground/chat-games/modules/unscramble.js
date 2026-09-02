import { pickUnused } from '../../shared/used-content-manager.js';
import { UNSCRAMBLE_ITEMS } from './unscramble-bank.js';

function scramble(word) {
  const letters = word.split('');
  // Shuffle, but retry if it accidentally comes out unscrambled (short words).
  for (let attempt = 0; attempt < 10; attempt++) {
    for (let i = letters.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [letters[i], letters[j]] = [letters[j], letters[i]];
    }
    if (letters.join('') !== word) break;
  }
  return letters.join('');
}

async function createRound(engine) {
  const item = await pickUnused(engine.roomId, 'unscramble', UNSCRAMBLE_ITEMS);
  if (!item) {
    alert('Every Unscramble It word has been used this session.');
    return { category: '', answer: '', scrambled: '' };
  }
  return { category: item.category, answer: item.answer, scrambled: scramble(item.answer) };
}

function renderHostControls(container, state) {
  const payload = state.payload || {};
  container.innerHTML = `
    <div class="cg-mod-category">${payload.category || ''}</div>
    <div class="cg-mod-emoji" style="font-size: clamp(28px, 5vw, 44px); letter-spacing: 6px;">${(payload.scrambled || '').split('').join(' ')}</div>
    <div class="cg-mod-host-hint">Host-only — answer: <strong style="color:#fff;">${payload.answer || ''}</strong>. Press REVEAL above when chat's got it.</div>
  `;
}

function renderLive(container, state) {
  const payload = state.payload || {};
  const revealed = state.phase === 'revealed';
  container.innerHTML = `
    <div class="cg-mod-category">${payload.category || ''}</div>
    <div class="cg-mod-emoji" style="font-size: clamp(28px, 5vw, 44px); letter-spacing: 6px;">
      ${revealed ? payload.answer.split('').join(' ') : (payload.scrambled || '').split('').join(' ')}
    </div>
  `;
}

export default {
  id: 'unscramble',
  label: 'Unscramble It',
  icon: '🔀',
  createRound,
  renderHostControls,
  renderLive
};
