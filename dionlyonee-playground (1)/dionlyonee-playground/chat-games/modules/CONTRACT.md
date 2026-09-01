# Chat Game Module Contract

Every game in the universal panel (Finish the Sentence, Hot Take,
Emoji Guess, Hangman, Unscramble It, Who Dis?, Who Would You Pick?,
Charades, What Would You Do?) is a single `.js` file in this folder
that exports one default object shaped like this:

```js
export default {
  id: "hangman",              // stable slug, used as state.gameType
  label: "Hangman",           // shown in the host's game picker
  icon: "🔤",                 // shown in the picker and on Live

  // Called by host.js when the host presses START (or NEXT, for a
  // fresh round of the same game). Return the initial `payload` for
  // this round — whatever shape this game needs internally. May be
  // async (host.js awaits it) — handy for pulling an unused item via
  // shared/used-content-manager.js.
  async createRound(engine) {
    return {
      /* game-specific data, e.g. for Hangman: */
      // answer: "JAMAICA",
      // guessedLetters: [],
    };
  },

  // Called by host.js to build this game's control UI inside the
  // universal panel's "GAME CONTENT" area. You own this DOM node —
  // clear it and build whatever controls this game needs (a letter
  // keyboard for Hangman, an A/B/C/D picker for Trivia-style games,
  // a text input for Finish the Sentence, etc).
  //
  // Call `engine.patchState({ payload, revealed, message })` from
  // your event handlers to push updates — never write state directly
  // anywhere else, so Live always has a single source of truth.
  renderHostControls(container, state, engine) {
    // container.innerHTML = `...`; wire up buttons; etc.
  },

  // Called by live.js whenever state changes and state.gameType
  // matches this module's id. You own this DOM node — render the
  // prompt, the current payload, and (if state.phase === "revealed")
  // the answer, using the shared black/gold visual language.
  renderLive(container, state) {
    // container.innerHTML = `...`;
  }
};
```

## Registering a module

Once a module file exists, add it to the `MODULES` array at the top
of `../host.js`:

```js
import hangman from './modules/hangman.js';
// ...
const MODULES = [hangman /*, hotTake, trivia, ... */];
```

That's it — it appears in the host's game picker automatically, and
`live.js` already knows how to route to `renderLive` by `gameType`.

## Rules every module should follow

- **The host is the only one who ever writes state.** Chat suggests
  in the stream chat itself (outside this app); the host reads chat
  and clicks/types what they saw. No module should try to read chat
  messages directly.
- **Keep `payload` JSON-serializable** — it goes straight into
  Firebase Realtime Database.
- **Don't put the answer where Live can leak it before REVEAL** if
  it matters for your game (e.g. Hangman's full word) — same caveat
  as Wheel: this is a hobby-project trust model, not bulletproof
  server-side authority, so don't build anything where a curious
  viewer peeking at network traffic would ruin the game for others in
  a way that matters.
