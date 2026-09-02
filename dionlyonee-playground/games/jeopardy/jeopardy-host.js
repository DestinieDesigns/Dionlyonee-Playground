import { RoomSync } from '../../shared/session-manager.js';
import { pickUnused } from '../../shared/used-content-manager.js';
import { CATEGORY_BANK } from './jeopardy-clues.js';
import {
  createInitialState,
  currentClue,
  selectClue,
  buzzIn,
  judge,
  noOneGotIt
} from './jeopardy-game.js';

let state = null;

const setupPanel = document.getElementById('setup-panel');
const setupForm = document.getElementById('setup-form');
const gamePanel = document.getElementById('game-panel');

const messageBanner = document.getElementById('message-banner');
const playersRow = document.getElementById('players-row');

const boardPanel = document.getElementById('board-panel');
const jeoBoard = document.getElementById('jeo-board');

const cluePanel = document.getElementById('clue-panel');
const clueValue = document.getElementById('clue-value');
const clueCat = document.getElementById('clue-cat');
const clueText = document.getElementById('clue-text');
const clueAnswer = document.getElementById('clue-answer');
const buzzControls = document.getElementById('buzz-controls');
const judgeControls = document.getElementById('judge-controls');
const btnCorrect = document.getElementById('btn-correct');
const btnWrong = document.getElementById('btn-wrong');
const btnNoOne = document.getElementById('btn-no-one');

RoomSync.setGameType('jeopardy');
RoomSync.attachRoomHUD('.host-header');

RoomSync.ensureHostPasscodeUnlocked(() => {
  init();
});

function init() {
  RoomSync.onStateChange((incoming) => {
    state = incoming;
    render();
  });

  setupForm.addEventListener('submit', onStartGame);
  btnCorrect.addEventListener('click', () => onJudge(true));
  btnWrong.addEventListener('click', () => onJudge(false));
  btnNoOne.addEventListener('click', onNoOneGotIt);
}

async function pickCategories(count) {
  const chosen = [];
  for (let i = 0; i < count; i++) {
    const cat = await pickUnused(RoomSync.roomId, 'jeopardy-categories', CATEGORY_BANK);
    if (!cat) break;
    chosen.push(cat);
  }
  return chosen;
}

async function onStartGame(e) {
  e.preventDefault();
  const names = [
    document.getElementById('player1').value,
    document.getElementById('player2').value,
    document.getElementById('player3').value
  ].filter((n) => n && n.trim());

  const categories = await pickCategories(6);
  if (categories.length === 0) {
    alert('Every Jeopardy category has been used this session. Start a new room to reset.');
    return;
  }
  if (categories.length < 6) {
    alert(`Only ${categories.length} unused categories left this session — starting with those.`);
  }

  state = createInitialState(names, categories);
  RoomSync.sendState(state);

  setupPanel.style.display = 'none';
  gamePanel.style.display = 'block';
  render();
}

function onSelectClue(catIndex, clueIndex) {
  if (!state) return;
  state = selectClue(state, catIndex, clueIndex);
  RoomSync.sendState(state);
  render();
}

function onBuzz(playerIndex) {
  if (!state) return;
  state = buzzIn(state, playerIndex);
  RoomSync.sendState(state);
  render();
}

function onJudge(correct) {
  if (!state) return;
  state = judge(state, correct);
  RoomSync.sendState(state);
  render();
}

function onNoOneGotIt() {
  if (!state) return;
  state = noOneGotIt(state);
  RoomSync.sendState(state);
  render();
}

function render() {
  if (!state) return;

  gamePanel.style.display = 'block';
  setupPanel.style.display = 'none';

  messageBanner.textContent = state.message || '';
  messageBanner.classList.remove('good', 'bad');
  if (/incorrect|no one got it/i.test(state.message || '')) {
    messageBanner.classList.add('bad');
  } else if (/correct!/i.test(state.message || '')) {
    messageBanner.classList.add('good');
  }

  renderPlayers();

  const showBoard = state.phase === 'board' || state.phase === 'round-complete';
  boardPanel.style.display = showBoard ? 'block' : 'none';
  cluePanel.style.display = showBoard ? 'none' : 'block';

  if (showBoard) {
    renderBoard();
  } else {
    renderClue();
  }
}

function renderPlayers() {
  playersRow.innerHTML = '';
  state.players.forEach((p, i) => {
    const card = document.createElement('div');
    card.className = 'player-card' + (i === state.buzzedPlayerIndex ? ' buzzed' : '');
    card.innerHTML = `<div class="player-name">${p.name}</div><div class="player-money">$${p.money}</div>`;
    playersRow.appendChild(card);
  });
}

function renderBoard() {
  jeoBoard.innerHTML = '';

  if (state.phase === 'round-complete') {
    const banner = document.createElement('div');
    banner.style.cssText = 'grid-column: 1 / -1; text-align:center; padding: 30px; font-weight:900; font-size:20px; color:#f7e07d;';
    banner.textContent = '🎉 BOARD COMPLETE — GAME OVER 🎉';
    jeoBoard.appendChild(banner);
    return;
  }

  state.categories.forEach((cat) => {
    const header = document.createElement('div');
    header.className = 'jeo-cat-header';
    header.textContent = cat.name;
    jeoBoard.appendChild(header);
  });

  for (let row = 0; row < 5; row++) {
    state.categories.forEach((cat, catIndex) => {
      const clue = cat.clues[row];
      const cell = document.createElement('div');
      cell.className = 'jeo-cell' + (clue.used ? ' used' : '');
      cell.textContent = clue.used ? '' : `$${clue.value}`;
      if (!clue.used) {
        cell.addEventListener('click', () => onSelectClue(catIndex, row));
      }
      jeoBoard.appendChild(cell);
    });
  }
}

function renderClue() {
  const clue = currentClue(state);
  if (!clue) return;

  const catName = state.categories[state.selected.catIndex].name;
  clueValue.textContent = `FOR $${clue.value}`;
  clueCat.textContent = catName;
  clueText.textContent = clue.clue;

  const awaitingJudgment = state.phase === 'awaiting-judgment';
  buzzControls.style.display = awaitingJudgment ? 'none' : 'flex';
  judgeControls.style.display = awaitingJudgment ? 'flex' : 'none';

  clueAnswer.style.display = awaitingJudgment ? 'block' : 'none';
  clueAnswer.textContent = `Host-only — expected answer: ${clue.answer}`;

  buzzControls.innerHTML = '';
  if (!awaitingJudgment) {
    state.players.forEach((p, i) => {
      const btn = document.createElement('button');
      btn.className = 'btn-secondary';
      btn.textContent = `BUZZ: ${p.name}`;
      btn.addEventListener('click', () => onBuzz(i));
      buzzControls.appendChild(btn);
    });
  }
}
