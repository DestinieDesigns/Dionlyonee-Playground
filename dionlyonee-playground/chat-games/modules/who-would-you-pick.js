import { pickUnused } from '../../shared/used-content-manager.js';
import { WHO_WOULD_YOU_PICK_ITEMS } from './who-would-you-pick-bank.js';

async function createRound(engine) {
  const item = await pickUnused(engine.roomId, 'who-would-you-pick', WHO_WOULD_YOU_PICK_ITEMS);
  if (!item) {
    alert('Every Who Would You Pick? scenario has been used this session.');
    return { scenario: '', options: [], picked: null };
  }
  return { scenario: item.scenario, options: item.options, picked: null };
}

function renderOptions(container, options, picked, onClick) {
  container.innerHTML = '';
  options.forEach((opt, i) => {
    const btn = document.createElement('button');
    btn.className = 'cg-mod-option' + (picked === i ? ' picked' : '');
    btn.textContent = `${opt.emoji}  ${opt.label}`;
    if (onClick) btn.addEventListener('click', () => onClick(i));
    container.appendChild(btn);
  });
}

function renderHostControls(container, state, engine) {
  const payload = state.payload || {};
  container.innerHTML = `
    <div class="cg-mod-prompt">${payload.scenario || ''}</div>
    <div class="cg-mod-options" id="wwyp-options"></div>
    <div class="cg-mod-host-hint">Click the option chat picked most.</div>
  `;
  renderOptions(document.getElementById('wwyp-options'), payload.options || [], payload.picked, (i) => {
    engine.patchState({ payload: { ...payload, picked: i }, phase: 'revealed' });
  });
}

function renderLive(container, state) {
  const payload = state.payload || {};
  const revealed = state.phase === 'revealed' && payload.picked !== null && payload.picked !== undefined;

  container.innerHTML = `
    <div class="cg-mod-prompt">${payload.scenario || ''}</div>
    <div class="cg-mod-options" id="wwyp-live-options"></div>
    ${revealed ? `<div class="cg-mod-answer">CHAT PICKED... ${payload.options[payload.picked].emoji} ${payload.options[payload.picked].label}!</div>` : ''}
  `;
  renderOptions(document.getElementById('wwyp-live-options'), payload.options || [], revealed ? payload.picked : null, null);
}

export default {
  id: 'who-would-you-pick',
  label: 'Who Would You Pick?',
  icon: '👑',
  createRound,
  renderHostControls,
  renderLive
};
