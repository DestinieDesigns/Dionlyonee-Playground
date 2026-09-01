// Dionlyonee Wheel of Fortune — Game Rule Engine
// Pure state-machine functions. No DOM, no network — host.js and
// cohost.js both call into this and push the resulting state through
// RoomSync. Keeping it framework-free means the same rules can't
// drift between Host and Cohost consoles.
//
// Relies on window.WheelEngine (wedges) and window.WheelPuzzles
// (puzzle bank), both loaded as classic scripts before this module.

export function createInitialState(playerNames) {
  return {
    players: playerNames.map((name) => ({ name: name || 'Player', money: 0 })),
    currentPlayerIndex: 0,
    categoryName: '',
    puzzleId: '',
    answer: '',
    revealedLetters: [],
    guessedLetters: [],
    wheelRotation: 0,
    currentWedge: null,
    phase: 'no-puzzle', // no-puzzle | ready-to-spin | spinning | awaiting-letter | round-complete
    message: 'Load a puzzle to begin.',
    lastLetterResult: null
  };
}

export function loadPuzzle(state, puzzle) {
  return {
    ...state,
    categoryName: puzzle.category,
    puzzleId: puzzle.id,
    answer: puzzle.answer.toUpperCase(),
    revealedLetters: [],
    guessedLetters: [],
    currentWedge: null,
    phase: 'ready-to-spin',
    message: `New puzzle loaded — ${state.players[state.currentPlayerIndex].name}, spin the wheel!`,
    lastLetterResult: null
  };
}

export function currentPlayer(state) {
  return state.players[state.currentPlayerIndex];
}

export function isPuzzleSolved(state) {
  const lettersInAnswer = new Set(state.answer.replace(/[^A-Z0-9]/g, '').split(''));
  for (const ch of lettersInAnswer) {
    if (!state.revealedLetters.includes(ch)) return false;
  }
  return true;
}

/** Begin a spin — host UI animates using the returned targetIndex/rotation. */
export function beginSpin(state) {
  if (state.phase !== 'ready-to-spin') return state;
  const wedges = window.WheelEngine.WHEEL_WEDGES;
  const targetIndex = Math.floor(Math.random() * wedges.length);
  const rotation = window.WheelEngine.computeSpinRotation(targetIndex, 5);
  return {
    ...state,
    phase: 'spinning',
    wheelRotation: rotation,
    currentWedge: wedges[targetIndex],
    message: `${currentPlayer(state).name} is spinning...`
  };
}

/** Call once the spin animation finishes, to resolve bankrupt/lose-turn immediately. */
export function resolveLandedWedge(state) {
  if (state.phase !== 'spinning' || !state.currentWedge) return state;
  const wedge = state.currentWedge;

  if (wedge.type === 'bankrupt') {
    const players = state.players.map((p, i) =>
      i === state.currentPlayerIndex ? { ...p, money: 0 } : p
    );
    return advanceTurn({
      ...state,
      players,
      phase: 'ready-to-spin',
      message: `BANKRUPT! ${currentPlayer(state).name} loses their money for this round.`
    });
  }

  if (wedge.type === 'lose') {
    return advanceTurn({
      ...state,
      phase: 'ready-to-spin',
      message: `${currentPlayer(state).name} landed on LOSE TURN.`
    });
  }

  // cash or free play — wait for a letter guess
  return {
    ...state,
    phase: 'awaiting-letter',
    message: `Landed on ${wedge.label} — pick a letter.`
  };
}

/** Consonant or vowel guess against the current wedge value. */
export function guessLetter(state, letterRaw) {
  if (state.phase !== 'awaiting-letter') return state;
  const letter = (letterRaw || '').toUpperCase();
  if (!letter || state.guessedLetters.includes(letter)) return state;

  const guessedLetters = [...state.guessedLetters, letter];
  const occurrences = state.answer.split('').filter((ch) => ch === letter).length;

  if (occurrences > 0) {
    const revealedLetters = [...state.revealedLetters, letter];
    const wedgeValue = state.currentWedge ? state.currentWedge.value : 0;
    const winnings = wedgeValue * occurrences;

    const players = state.players.map((p, i) =>
      i === state.currentPlayerIndex ? { ...p, money: p.money + winnings } : p
    );

    let next = {
      ...state,
      players,
      guessedLetters,
      revealedLetters,
      lastLetterResult: { letter, correct: true, count: occurrences, winnings }
    };

    if (isPuzzleSolved(next)) {
      next.phase = 'round-complete';
      next.message = `${currentPlayer(next).name} revealed the last letter — SOLVE THE PUZZLE!`;
      return next;
    }

    next.phase = 'ready-to-spin';
    next.message = `Correct! ${letter} appears ${occurrences} time(s). +$${winnings}. Spin again!`;
    return next;
  }

  // wrong letter
  return advanceTurn({
    ...state,
    guessedLetters,
    lastLetterResult: { letter, correct: false, count: 0, winnings: 0 },
    phase: 'ready-to-spin',
    message: `${letter} is not in the puzzle. Turn passes.`
  });
}

/** Host enters the player's spoken solve attempt. */
export function attemptSolve(state, guessText) {
  const normalize = (s) => (s || '').toUpperCase().replace(/[^A-Z0-9]/g, '');
  const correct = normalize(guessText) === normalize(state.answer);

  if (correct) {
    const allLetters = state.answer.replace(/[^A-Z0-9]/g, '').split('');
    return {
      ...state,
      revealedLetters: [...new Set([...state.revealedLetters, ...allLetters])],
      phase: 'round-complete',
      message: `${currentPlayer(state).name} SOLVED IT: "${state.answer}"`
    };
  }

  return advanceTurn({
    ...state,
    phase: 'ready-to-spin',
    message: `Incorrect solve attempt. Turn passes.`
  });
}

export function advanceTurn(state) {
  if (state.players.length === 0) return state;
  return {
    ...state,
    currentPlayerIndex: (state.currentPlayerIndex + 1) % state.players.length
  };
}
