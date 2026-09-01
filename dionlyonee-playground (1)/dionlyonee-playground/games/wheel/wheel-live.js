import { RoomSync } from '../../shared/session-manager.js';

const categoryDisplay = document.getElementById('category-display');
const messageBanner = document.getElementById('message-banner');
const puzzleBoard = document.getElementById('puzzle-board');
const playersRow = document.getElementById('players-row');
const wheelCanvas = document.getElementById('wheel-canvas');
const dramaticBanner = document.getElementById('dramatic-banner');
const dramaticText = document.getElementById('dramatic-text');

const SPIN_DURATION_MS = 3200;
let lastMessage = '';

RoomSync.setGameType('wheel');
window.WheelEngine.drawWheel(wheelCanvas, 0);

RoomSync.onStateChange((state) => {
  render(state);
});

function render(state) {
  if (!state || state.phase === 'no-puzzle') return;

  categoryDisplay.textContent = state.categoryName || '—';
  messageBanner.textContent = state.message || '';
  messageBanner.classList.remove('good', 'bad');
  if (/incorrect|not in the puzzle|bankrupt|lose turn/i.test(state.message || '')) {
    messageBanner.classList.add('bad');
  } else if (/correct|solved/i.test(state.message || '')) {
    messageBanner.classList.add('good');
  }

  renderBoard(state);
  renderPlayers(state);
  renderWheel(state);
  maybeShowDrama(state);

  lastMessage = state.message || '';
}

function renderBoard(state) {
  const isSolved = state.phase === 'round-complete';
  const rows = window.WheelEngine.formatWheelBoard(state.answer, state.revealedLetters, isSolved);
  puzzleBoard.innerHTML = '';
  rows.forEach((row) => {
    const rowEl = document.createElement('div');
    rowEl.className = 'puzzle-row';
    row.forEach((tile) => {
      const tileEl = document.createElement('div');
      if (tile.type === 'empty') {
        tileEl.className = 'tile empty';
      } else {
        tileEl.className = 'tile letter' + (tile.isRevealed ? ' revealed' : '') + (tile.isSolved ? ' solved' : '');
        tileEl.textContent = tile.isRevealed ? tile.char : '';
      }
      rowEl.appendChild(tileEl);
    });
    puzzleBoard.appendChild(rowEl);
  });
}

function renderPlayers(state) {
  playersRow.innerHTML = '';
  state.players.forEach((p, i) => {
    const card = document.createElement('div');
    card.className = 'player-card' + (i === state.currentPlayerIndex ? ' active' : '');
    card.innerHTML = `<div class="player-name">${p.name}</div><div class="player-money">$${p.money}</div>`;
    playersRow.appendChild(card);
  });
}

function renderWheel(state) {
  const rotation = state.wheelRotation || 0;
  wheelCanvas.style.transition = state.phase === 'spinning'
    ? `transform ${SPIN_DURATION_MS}ms cubic-bezier(0.15, 0.85, 0.25, 1)`
    : 'none';
  wheelCanvas.style.transform = `rotate(${rotation}rad)`;
}

function maybeShowDrama(state) {
  const msg = state.message || '';
  if (msg === lastMessage) return; // only trigger on change

  let kind = null;
  if (/bankrupt/i.test(msg)) kind = 'bankrupt';
  else if (/lose turn/i.test(msg)) kind = 'lose';
  else if (/solved it/i.test(msg)) kind = 'solved';
  if (!kind) return;

  const label = kind === 'bankrupt' ? 'BANKRUPT!' : kind === 'lose' ? 'LOSE TURN' : 'SOLVED!';
  dramaticText.textContent = label;
  dramaticBanner.className = `dramatic-banner show ${kind}`;
  setTimeout(() => {
    dramaticBanner.className = 'dramatic-banner';
  }, 2200);
}
