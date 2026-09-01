import { RoomSync } from '../../shared/session-manager.js';

const messageBanner = document.getElementById('message-banner');
const playersRow = document.getElementById('players-row');
const boardPanel = document.getElementById('board-panel');
const jeoBoard = document.getElementById('jeo-board');
const cluePanel = document.getElementById('clue-panel');
const clueValue = document.getElementById('clue-value');
const clueCat = document.getElementById('clue-cat');
const clueText = document.getElementById('clue-text');
const dramaticBanner = document.getElementById('dramatic-banner');
const dramaticText = document.getElementById('dramatic-text');

RoomSync.setGameType('jeopardy');

let lastMessage = '';

RoomSync.onStateChange((state) => {
  render(state);
});

function render(state) {
  if (!state || !state.players) return;

  messageBanner.textContent = state.message || '';
  messageBanner.classList.remove('good', 'bad');
  if (/incorrect|no one got it/i.test(state.message || '')) {
    messageBanner.classList.add('bad');
  } else if (/correct!/i.test(state.message || '')) {
    messageBanner.classList.add('good');
  }

  renderPlayers(state);

  const showBoard = state.phase === 'board' || state.phase === 'round-complete';
  boardPanel.style.display = showBoard ? 'block' : 'none';
  cluePanel.style.display = showBoard ? 'none' : 'block';

  if (showBoard) {
    renderBoard(state);
  } else {
    renderClue(state);
  }

  maybeShowDrama(state);
  lastMessage = state.message || '';
}

function renderPlayers(state) {
  playersRow.innerHTML = '';
  state.players.forEach((p, i) => {
    const card = document.createElement('div');
    card.className = 'player-card' + (i === state.buzzedPlayerIndex ? ' buzzed' : '');
    card.innerHTML = `<div class="player-name">${p.name}</div><div class="player-money">$${p.money}</div>`;
    playersRow.appendChild(card);
  });
}

function renderBoard(state) {
  jeoBoard.innerHTML = '';

  if (state.phase === 'round-complete') {
    const banner = document.createElement('div');
    banner.style.cssText = 'grid-column: 1 / -1; text-align:center; padding: 30px; font-weight:900; font-size:24px; color:#f7e07d;';
    banner.textContent = '🎉 GAME OVER 🎉';
    jeoBoard.appendChild(banner);
    return;
  }

  if (!state.categories) return;

  state.categories.forEach((cat) => {
    const header = document.createElement('div');
    header.className = 'jeo-cat-header';
    header.textContent = cat.name;
    jeoBoard.appendChild(header);
  });

  for (let row = 0; row < 5; row++) {
    state.categories.forEach((cat) => {
      const clue = cat.clues[row];
      const cell = document.createElement('div');
      cell.className = 'jeo-cell' + (clue.used ? ' used' : '');
      cell.textContent = clue.used ? '' : `$${clue.value}`;
      jeoBoard.appendChild(cell);
    });
  }
}

function renderClue(state) {
  if (!state.selected) return;
  const clue = state.categories[state.selected.catIndex].clues[state.selected.clueIndex];
  const catName = state.categories[state.selected.catIndex].name;
  clueValue.textContent = `FOR $${clue.value}`;
  clueCat.textContent = catName;
  clueText.textContent = clue.clue;
}

function maybeShowDrama(state) {
  const msg = state.message || '';
  if (msg === lastMessage) return;

  let kind = null;
  if (/^correct!/i.test(msg)) kind = 'correct';
  else if (/^incorrect/i.test(msg)) kind = 'wrong';
  if (!kind) return;

  dramaticText.textContent = kind === 'correct' ? 'CORRECT!' : 'INCORRECT';
  dramaticBanner.className = `dramatic-banner show ${kind}`;
  setTimeout(() => {
    dramaticBanner.className = 'dramatic-banner';
  }, 1800);
}
