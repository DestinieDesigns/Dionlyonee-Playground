import { ChatGames, createIdleState } from './chat-game-engine.js';
import { MODULES } from './modules/registry.js';

let state = createIdleState();
let selectedModule = null;

const picker = document.getElementById('cg-game-picker');
const statusLine = document.getElementById('cg-status-line');
const moduleControls = document.getElementById('cg-module-controls');

const btnStart = document.getElementById('cg-btn-start');
const btnNext = document.getElementById('cg-btn-next');
const btnReveal = document.getElementById('cg-btn-reveal');
const btnReset = document.getElementById('cg-btn-reset');

ChatGames.attachRoomHUD('.host-header');

ChatGames.ensureHostPasscodeUnlocked(() => {
  init();
});

function init() {
  buildPicker();

  ChatGames.onStateChange((incoming) => {
    state = incoming;
    syncPickerToState();
    render();
  });

  picker.addEventListener('change', () => {
    selectedModule = MODULES.find((m) => m.id === picker.value) || null;
    updateStatus();
  });

  btnStart.addEventListener('click', onStart);
  btnNext.addEventListener('click', onNext);
  btnReveal.addEventListener('click', onReveal);
  btnReset.addEventListener('click', onReset);

  render();
}

function buildPicker() {
  picker.innerHTML = '';
  if (MODULES.length === 0) {
    const opt = document.createElement('option');
    opt.value = '';
    opt.textContent = '— No games installed yet —';
    picker.appendChild(opt);
    picker.disabled = true;
    return;
  }

  const placeholder = document.createElement('option');
  placeholder.value = '';
  placeholder.textContent = 'Choose a game...';
  picker.appendChild(placeholder);

  MODULES.forEach((mod) => {
    const opt = document.createElement('option');
    opt.value = mod.id;
    opt.textContent = `${mod.icon || ''} ${mod.label}`.trim();
    picker.appendChild(opt);
  });
}

function syncPickerToState() {
  if (state.gameType && picker.value !== state.gameType) {
    picker.value = state.gameType;
    selectedModule = MODULES.find((m) => m.id === state.gameType) || null;
  }
}

async function onStart() {
  if (!selectedModule) {
    alert('Pick a game first.');
    return;
  }
  btnStart.disabled = true;
  const payload = (await selectedModule.createRound(ChatGames)) || {};
  state = {
    gameType: selectedModule.id,
    phase: 'active',
    prompt: '',
    payload,
    revealed: null,
    message: `${selectedModule.label} started.`
  };
  ChatGames.sendState(state);
  render();
}

async function onNext() {
  if (!selectedModule || state.gameType !== selectedModule.id) return;
  btnNext.disabled = true;
  const payload = (await selectedModule.createRound(ChatGames)) || {};
  state = {
    ...state,
    phase: 'active',
    payload,
    revealed: null,
    message: `Next round — ${selectedModule.label}.`
  };
  ChatGames.sendState(state);
  render();
}

function onReveal() {
  if (!selectedModule || state.gameType !== selectedModule.id) return;
  ChatGames.patchState({ phase: 'revealed' });
}

function onReset() {
  state = createIdleState();
  selectedModule = null;
  picker.value = '';
  ChatGames.sendState(state);
  render();
}

function updateStatus() {
  if (!selectedModule) {
    statusLine.textContent = MODULES.length === 0
      ? 'No games installed yet.'
      : 'Pick a game to begin.';
    return;
  }
  statusLine.textContent = `${selectedModule.label} selected — press START.`;
}

function render() {
  updateStatus();

  const activeModule = MODULES.find((m) => m.id === state.gameType);
  const isRunning = state.phase !== 'idle' && activeModule;

  btnStart.disabled = !selectedModule;
  btnNext.disabled = !isRunning;
  btnReveal.disabled = !isRunning || state.phase === 'revealed';
  btnReset.disabled = state.phase === 'idle';

  if (activeModule) {
    activeModule.renderHostControls(moduleControls, state, ChatGames);
  } else if (MODULES.length === 0) {
    moduleControls.innerHTML = `
      <div class="cg-empty-state">
        No chat-game modules are registered yet.<br>
        Add one to <code>chat-games/modules/</code> following
        <code>modules/CONTRACT.md</code>, then register it at the
        top of <code>host.js</code>.
      </div>`;
  } else {
    moduleControls.innerHTML = `<div class="cg-empty-state">Pick a game above, then press START.</div>`;
  }
}
