// Register every finished chat-game module here — both host.js and
// live.js import this same list, so a module only needs to be added
// in one place to appear in the host's picker AND render correctly
// on the Live screen.

import hangman from './hangman.js';
import finishTheSentence from './finish-sentence.js';
import whatWouldYouDo from './what-would-you-do.js';
import hotTake from './hot-take.js';
import emojiGuess from './emoji-guess.js';
import unscramble from './unscramble.js';
import whoDis from './who-dis.js';
import whoWouldYouPick from './who-would-you-pick.js';
import charades from './charades.js';

export const MODULES = [
  finishTheSentence,
  whatWouldYouDo,
  hotTake,
  emojiGuess,
  hangman,
  unscramble,
  whoDis,
  whoWouldYouPick,
  charades
];
