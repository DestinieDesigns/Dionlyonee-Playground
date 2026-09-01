import { RoomSync } from '../../shared/session-manager.js';
import { pickUnused } from '../../shared/used-content-manager.js';
import {
  createInitialState,
  loadPuzzle,
  beginSpin,
  resolveLandedWedge,
  guessLetter,
  attemptSolve,
  currentPlayer
} from './wheel-game.js';

const ALPHABET = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ'.split('');
const VOWELS = new Set(['A', 'E', 'I', 'O', 'U']);
const SPIN_DURATION_MS = 3200;

let state = null;

const setupPanel = document.getElementById('setup-panel');
const gamePanel = document.getElementById('game-panel');
const setupForm = document.getElementById('setup-form');
const categorySelect = document.getElementById('category-select');

const categoryDisplay = document.getElementById('category-display');
const messageBanner = document.getElementById('message-banner');
const puzzleBoard = document.getElementById('puzzle-board');
const playersRow = document.getElementById('players-row');

const btnSpin = document.getElementById('btn-spin');
const btnSolveToggle = document.getElementById('btn-solve-toggle');
const btnNextPuzzle = document.getElementById('btn-next-puzzle');
const solveFormWrap = document.getElementById('solve-form-wrap');
const solveInput = document.getElementById('solve-input');
const btnSubmitSolve = document.getElementById('btn-submit-solve');

const letterPanel = document.getElementById('letter-panel');
const letterGrid = document.getElementById('letter-grid');

const wheelCanvas = document.getElementById('wheel-canvas');
const wedgeDisplay = document.getElementById('wedge-display');

// Cohost never sees the passcode gate — joins straight into the room.
RoomSync.setGameType('wheel');
RoomSync.setRole('cohost');
RoomSync.attachRoomHUD('.cohost-header');
init();

function init() {
  window.WheelPuzzles.CATEGORIES.forEach((cat) => {
    const opt = document.createElement('option');
    opt.value = cat;
    opt.textContent = cat;
    categorySelect.appendChild(opt);
  });

  window.WheelEngine.drawWheel(wheelCanvas, 0);
  buildLetterGrid();

  RoomSync.onStateChange((incoming) => {
    state = incoming;
    render();
  });

  setupForm.addEventListener('submit', onStartGame);
  btnSpin.addEventListener('click', onSpin);
  btnSolveToggle.addEventListener('click', () => {
    solveFormWrap.style.display = solveFormWrap.style.display === 'none' ? 'flex' : 'none';
  });
  btnSubmitSolve.addEventListener('click', onSubmitSolve);
  btnNextPuzzle.addEventListener('click', onNextPuzzle);
}

async function pickPuzzle() {
  const category = categorySelect.value;
  const pool = category ? window.WheelPuzzles.byCategory(category) : window.WheelPuzzles.ALL_PUZZLES;
  const puzzle = await pickUnused(RoomSync.roomId, 'wheel', pool);
  if (!puzzle) {
    alert('Every puzzle in this category has been used this session. Pick a different category.');
  }
  return puzzle;
}

async function onStartGame(e) {
  e.preventDefault();
  const names = [
    document.getElementById('player1').value,
    document.getElementById('player2').value,
    document.getElementById('player3').value
  ].filter((n) => n && n.trim());

  const puzzle = await pickPuzzle();
  if (!puzzle) return;

  state = loadPuzzle(createInitialState(names), puzzle);
  RoomSync.sendState(state);

  setupPanel.style.display = 'none';
  gamePanel.style.display = 'block';
  render();
}

function onSpin() {
  if (!state || state.phase !== 'ready-to-spin') return;
  state = beginSpin(state);
  RoomSync.sendState(state);
  render();

  setTimeout(() => {
    state = resolveLandedWedge(state);
    RoomSync.sendState(state);
    render();
  }, SPIN_DURATION_MS);
}

function onLetterClick(letter) {
  if (!state || state.phase !== 'awaiting-letter') return;
  state = guessLetter(state, letter);
  RoomSync.sendState(state);
  render();
}

function onSubmitSolve() {
  if (!state) return;
  const guess = solveInput.value;
  if (!guess.trim()) return;
  state = attemptSolve(state, guess);
  RoomSync.sendState(state);
  solveInput.value = '';
  solveFormWrap.style.display = 'none';
  render();
}

async function onNextPuzzle() {
  if (!state) return;
  const puzzle = await pickPuzzle();
  if (!puzzle) return;
  state = loadPuzzle(state, puzzle);
  RoomSync.sendState(state);
  render();
}

function buildLetterGrid() {
  letterGrid.innerHTML = '';
  ALPHABET.forEach((letter) => {
    const btn = document.createElement('button');
    btn.className = 'letter-btn' + (VOWELS.has(letter) ? ' vowel' : '');
    btn.textContent = letter;
    btn.dataset.letter = letter;
    btn.addEventListener('click', () => onLetterClick(letter));
    letterGrid.appendChild(btn);
  });
}

function render() {
  if (!state) return;

  if (state.phase !== 'no-puzzle') {
    setupPanel.style.display = 'none';
    gamePanel.style.display = 'block';
  }

  categoryDisplay.textContent = state.categoryName || '—';

  messageBanner.textContent = state.message || '';
  messageBanner.classList.remove('good', 'bad');
  if (/incorrect|not in the puzzle|bankrupt|lose turn/i.test(state.message || '')) {
    messageBanner.classList.add('bad');
  } else if (/correct|solved/i.test(state.message || '')) {
    messageBanner.classList.add('good');
  }

  renderBoard();
  renderPlayers();
  renderWheel();
  renderControls();
}

function renderBoard() {
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

function renderPlayers() {
  playersRow.innerHTML = '';
  state.players.forEach((p, i) => {
    const card = document.createElement('div');
    card.className = 'player-card' + (i === state.currentPlayerIndex ? ' active' : '');
    card.innerHTML = `<div class="player-name">${p.name}</div><div class="player-money">$${p.money}</div>`;
    playersRow.appendChild(card);
  });
}

function renderWheel() {
  const rotation = state.wheelRotation || 0;
  wheelCanvas.style.transition = state.phase === 'spinning'
    ? `transform ${SPIN_DURATION_MS}ms cubic-bezier(0.15, 0.85, 0.25, 1)`
    : 'none';
  wheelCanvas.style.transform = `rotate(${rotation}rad)`;

  if (state.currentWedge) {
    wedgeDisplay.textContent = state.currentWedge.label;
  } else {
    wedgeDisplay.textContent = '—';
  }
}

function renderControls() {
  btnSpin.disabled = state.phase !== 'ready-to-spin';
  btnNextPuzzle.disabled = state.phase === 'spinning';
  btnSolveToggle.disabled = !(state.phase === 'ready-to-spin' || state.phase === 'awaiting-letter');

  if (state.phase === 'round-complete') {
    solveFormWrap.style.display = 'none';
    btnSolveToggle.disabled = true;
  }

  const showLetters = state.phase === 'awaiting-letter';
  letterPanel.style.display = showLetters ? 'block' : 'none';

  Array.from(letterGrid.children).forEach((btn) => {
    const letter = btn.dataset.letter;
    const guessed = state.guessedLetters.includes(letter);
    btn.disabled = !showLetters || guessed;
    btn.classList.remove('correct', 'wrong');
    if (guessed) {
      const wasCorrect = state.revealedLetters.includes(letter);
      btn.classList.add(wasCorrect ? 'correct' : 'wrong');
    }
  });
}
