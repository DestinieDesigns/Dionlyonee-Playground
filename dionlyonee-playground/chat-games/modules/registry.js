// Register every finished chat-game module here — both host.js and
// live.js import this same list, so a module only needs to be added
// in one place to appear in the host's picker AND render correctly
// on the Live screen.
//
import hangman from './hangman.js';

export const MODULES = [hangman];
