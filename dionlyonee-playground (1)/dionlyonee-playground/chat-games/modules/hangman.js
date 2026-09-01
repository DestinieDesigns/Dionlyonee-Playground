import { pickUnused } from '../../shared/used-content-manager.js';
import { HANGMAN_WORDS } from './hangman-words.js';

const ALPHABET = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ'.split('');
const MAX_WRONG = 6;

function injectStylesOnce() {
  if (document.getElementById('hangman-module-styles')) return;
  const style = document.createElement('style');
  style.id = 'hangman-module-styles';
  style.textContent = `
    .hg-masked {
      text-align: center;
      font-family: 'Space Grotesk', monospace;
      font-size: clamp(20px, 4vw, 30px);
      letter-spacing: 6px;
      font-weight: 800;
      margin: 16px 0;
      word-break: break-word;
    }
    .hg-keyboard {
      display: grid;
      grid-template-columns: repeat(9, 1fr);
      gap: 6px;
      margin-top: 10px;
    }
    .hg-key {
      aspect-ratio: 1;
      background: rgba(255,255,255,0.07);
      border: 1px solid rgba(255,255,255,0.18);
      color: #fff;
      font-weight: 800;
      font-size: 14px;
      border-radius: 8px;
      cursor: pointer;
    }
    .hg-key:disabled { opacity: 0.25; cursor: not-allowed; }
    .hg-key.correct { background: rgba(34,197,94,0.35); border-color: #22c55e; }
    .hg-key.wrong { background: rgba(239,68,68,0.35); border-color: #ef4444; }
    .hg-meta {
      text-align: center;
      font-size: 12px;
      color: #94a3b8;
      margin-bottom: 6px;
    }
    .hg-category {
      text-align: center;
      font-size: 11px;
      letter-spacing: 2px;
      color: #94a3b8;
    }
    .hg-category-value {
      text-align: center;
      font-size: 16px;
      font-weight: 900;
      color: #f7e07d;
      margin-bottom: 8px;
    }
    .hg-host-answer {
      text-align: center;
      font-size: 11px;
      color: #64748b;
      margin-top: 12px;
    }
    .hg-gallows-wrap {
      display: flex;
      justify-content: center;
      margin-bottom: 10px;
    }
  `;
  document.head.appendChild(style);
}

function normalize(answer) {
  return (answer || '').toUpperCase();
}

function lettersOf(answer) {
  return normalize(answer).replace(/[^A-Z]/g, '').split('');
}

function isSolved(answer, guessedLetters) {
  return lettersOf(answer).every((ch) => guessedLetters.includes(ch));
}

function wrongLettersOf(answer, guessedLetters) {
  const answerLetters = new Set(lettersOf(answer));
  return guessedLetters.filter((l) => !answerLetters.has(l));
}

function maskedText(answer, guessedLetters, forceReveal) {
  return normalize(answer)
    .split('')
    .map((ch) => {
      if (ch === ' ') return '  ';
      if (!/[A-Z]/.test(ch)) return ch; // punctuation always visible
      if (forceReveal || guessedLetters.includes(ch)) return ch;
      return '_';
    })
    .join(' ');
}

function gallowsSVG(wrongCount) {
  const show = (n) => (wrongCount >= n ? '1' : '0');
  return `
    <svg width="90" height="100" viewBox="0 0 90 100" xmlns="http://www.w3.org/2000/svg">
      <line x1="5" y1="95" x2="70" y2="95" stroke="#d4af37" stroke-width="3"/>
      <line x1="20" y1="95" x2="20" y2="10" stroke="#d4af37" stroke-width="3"/>
      <line x1="20" y1="10" x2="60" y2="10" stroke="#d4af37" stroke-width="3"/>
      <line x1="60" y1="10" x2="60" y2="22" stroke="#d4af37" stroke-width="3"/>
      <circle cx="60" cy="32" r="10" stroke="#f7e07d" stroke-width="3" fill="none" opacity="${show(1)}"/>
      <line x1="60" y1="42" x2="60" y2="68" stroke="#f7e07d" stroke-width="3" opacity="${show(2)}"/>
      <line x1="60" y1="48" x2="46" y2="60" stroke="#f7e07d" stroke-width="3" opacity="${show(3)}"/>
      <line x1="60" y1="48" x2="74" y2="60" stroke="#f7e07d" stroke-width="3" opacity="${show(4)}"/>
      <line x1="60" y1="68" x2="48" y2="88" stroke="#f7e07d" stroke-width="3" opacity="${show(5)}"/>
      <line x1="60" y1="68" x2="72" y2="88" stroke="#f7e07d" stroke-width="3" opacity="${show(6)}"/>
    </svg>
  `;
}

async function createRound(engine) {
  const word = await pickUnused(engine.roomId, 'hangman', HANGMAN_WORDS);
  if (!word) {
    alert('Every Hangman word has been used this session. Starting a room reset would be needed to reuse them.');
    return { answer: '', category: '', guessedLetters: [] };
  }
  return {
    wordId: word.id,
    category: word.category,
    answer: word.answer,
    guessedLetters: []
  };
}

function renderHostControls(container, state, engine) {
  injectStylesOnce();
  const payload = state.payload || {};
  const answer = payload.answer || '';
  const category = payload.category || '';
  const guessedLetters = payload.guessedLetters || [];

  const solved = answer && isSolved(answer, guessedLetters);
  const wrongLetters = wrongLettersOf(answer, guessedLetters);
  const wrongCount = wrongLetters.length;
  const gameOver = wrongCount >= MAX_WRONG;
  const forceReveal = state.phase === 'revealed' || solved || gameOver;

  container.innerHTML = `
    <div class="hg-category">CATEGORY</div>
    <div class="hg-category-value">${category || '—'}</div>
    <div class="hg-gallows-wrap">${gallowsSVG(wrongCount)}</div>
    <div class="hg-masked" id="hg-masked-host"></div>
    <div class="hg-meta">Wrong: ${wrongCount} / ${MAX_WRONG}${wrongLetters.length ? ' — ' + wrongLetters.join(', ') : ''}</div>
    <div class="hg-keyboard" id="hg-keyboard"></div>
    <div class="hg-host-answer">Host-only — full answer: <strong style="color:#fff;">${answer}</strong></div>
  `;

  document.getElementById('hg-masked-host').textContent = maskedText(answer, guessedLetters, forceReveal);

  const keyboard = document.getElementById('hg-keyboard');
  ALPHABET.forEach((letter) => {
    const btn = document.createElement('button');
    btn.className = 'hg-key';
    btn.textContent = letter;
    const guessed = guessedLetters.includes(letter);
    btn.disabled = guessed || forceReveal;
    if (guessed) {
      btn.classList.add(answer.includes(letter) ? 'correct' : 'wrong');
    }
    btn.addEventListener('click', () => onLetterClick(engine, state, letter));
    keyboard.appendChild(btn);
  });

  if (solved && state.phase !== 'revealed') {
    engine.patchState({ phase: 'revealed', revealed: answer, message: 'Word fully guessed!' });
  } else if (gameOver && state.phase !== 'revealed') {
    engine.patchState({ phase: 'revealed', revealed: answer, message: 'Out of guesses — Hangman complete.' });
  }
}

function onLetterClick(engine, state, letter) {
  const payload = state.payload || {};
  const guessedLetters = [...(payload.guessedLetters || [])];
  if (guessedLetters.includes(letter)) return;
  guessedLetters.push(letter);
  engine.patchState({ payload: { ...payload, guessedLetters } });
}

function renderLive(container, state) {
  injectStylesOnce();
  const payload = state.payload || {};
  const answer = payload.answer || '';
  const category = payload.category || '';
  const guessedLetters = payload.guessedLetters || [];
  const wrongCount = wrongLettersOf(answer, guessedLetters).length;
  const forceReveal = state.phase === 'revealed';

  container.innerHTML = `
    <div class="hg-category">CATEGORY</div>
    <div class="hg-category-value">${category || '—'}</div>
    <div class="hg-gallows-wrap">${gallowsSVG(wrongCount)}</div>
    <div class="hg-masked" id="hg-masked-live"></div>
  `;
  document.getElementById('hg-masked-live').textContent = maskedText(answer, guessedLetters, forceReveal);
}

export default {
  id: 'hangman',
  label: 'Hangman',
  icon: '🔤',
  createRound,
  renderHostControls,
  renderLive
};
