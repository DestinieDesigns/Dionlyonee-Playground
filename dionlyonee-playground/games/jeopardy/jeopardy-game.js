// Dionlyonee Jeopardy — Game Rule Engine
// Pure state-machine functions, same philosophy as games/wheel/wheel-game.js —
// no DOM, no network. host.js and cohost.js both call into this so the
// rules can't drift between consoles.

export function createInitialState(playerNames, categories) {
  return {
    players: playerNames.map((name) => ({ name: name || 'Player', money: 0 })),
    categories: categories.map((cat) => ({
      id: cat.id,
      name: cat.name,
      clues: cat.clues.map((c) => ({ ...c, used: false }))
    })),
    selected: null, // { catIndex, clueIndex }
    buzzedPlayerIndex: null,
    phase: 'board', // board | clue-revealed | awaiting-judgment | round-complete
    message: 'Select a clue from the board to begin.'
  };
}

export function currentClue(state) {
  if (!state.selected) return null;
  const { catIndex, clueIndex } = state.selected;
  return state.categories[catIndex].clues[clueIndex];
}

export function selectClue(state, catIndex, clueIndex) {
  if (state.phase !== 'board') return state;
  const clue = state.categories[catIndex]?.clues?.[clueIndex];
  if (!clue || clue.used) return state;

  return {
    ...state,
    selected: { catIndex, clueIndex },
    buzzedPlayerIndex: null,
    phase: 'clue-revealed',
    message: `${state.categories[catIndex].name} for $${clue.value}`
  };
}

export function buzzIn(state, playerIndex) {
  if (state.phase !== 'clue-revealed') return state;
  return {
    ...state,
    buzzedPlayerIndex: playerIndex,
    phase: 'awaiting-judgment',
    message: `${state.players[playerIndex].name} buzzed in!`
  };
}

function markCurrentClueUsed(state) {
  const { catIndex, clueIndex } = state.selected;
  const categories = state.categories.map((cat, ci) =>
    ci !== catIndex
      ? cat
      : { ...cat, clues: cat.clues.map((c, cli) => (cli === clueIndex ? { ...c, used: true } : c)) }
  );
  return categories;
}

function isBoardComplete(categories) {
  return categories.every((cat) => cat.clues.every((c) => c.used));
}

export function judge(state, correct) {
  if (state.phase !== 'awaiting-judgment') return state;
  const clue = currentClue(state);
  const playerIdx = state.buzzedPlayerIndex;
  const delta = correct ? clue.value : -clue.value;

  const players = state.players.map((p, i) => (i === playerIdx ? { ...p, money: p.money + delta } : p));

  if (correct) {
    const categories = markCurrentClueUsed({ ...state, players });
    const complete = isBoardComplete(categories);
    return {
      ...state,
      players,
      categories,
      selected: null,
      buzzedPlayerIndex: null,
      phase: complete ? 'round-complete' : 'board',
      message: `Correct! +$${clue.value} for ${players[playerIdx].name}.`
    };
  }

  return {
    ...state,
    players,
    buzzedPlayerIndex: null,
    phase: 'clue-revealed',
    message: `Incorrect. -$${clue.value} for ${players[playerIdx].name}. Anyone else?`
  };
}

export function noOneGotIt(state) {
  if (state.phase !== 'clue-revealed' && state.phase !== 'awaiting-judgment') return state;
  const clue = currentClue(state);
  const categories = markCurrentClueUsed(state);
  const complete = isBoardComplete(categories);

  return {
    ...state,
    categories,
    selected: null,
    buzzedPlayerIndex: null,
    phase: complete ? 'round-complete' : 'board',
    message: `No one got it. The answer was: ${clue.answer}`
  };
}
