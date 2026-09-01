// Dionlyonee Playground — Chat Game Engine
// One generic state shape shared by all "chat suggests, host clicks"
// games (Finish the Sentence, Hot Take, Trivia-as-module, Emoji Guess,
// Hangman, Unscramble It, Who Dis?, Who Would You Pick?, Charades,
// What Would You Do?).
//
// This is deliberately dumb: it doesn't know what a "hangman" or a
// "hot take" is. It only knows { gameType, phase, prompt, payload,
// revealed, message }. Each game module is responsible for what goes
// inside `payload` and `revealed` — see modules/CONTRACT.md.
//
// Uses its own Firebase path (rooms/{roomId}/chatGames/...) so it
// never collides with a Main Game's state (rooms/{roomId}/state) —
// Wheel and a chat game can technically run in the same room without
// stepping on each other's data, even though only one is shown live
// at a time.

import { initializeApp, getApps, getApp } from "https://www.gstatic.com/firebasejs/12.18.0/firebase-app.js";
import {
  getDatabase,
  ref,
  set,
  update,
  onValue
} from "https://www.gstatic.com/firebasejs/12.18.0/firebase-database.js";
import { firebaseConfig } from "../shared/firebase-config.js";
import { RoomSync } from "../shared/session-manager.js";

const app = getApps().length ? getApp() : initializeApp(firebaseConfig);
const db = getDatabase(app);

export function createIdleState() {
  return {
    gameType: null,
    phase: "idle", // idle | waiting | active | revealed
    prompt: "",
    payload: {},
    revealed: null,
    message: ""
  };
}

class ChatGameEngine {
  constructor() {
    this.listeners = [];
    this._unsub = null;
    this._attach();
  }

  // ---------- Identity / passcode — delegate to the shared RoomSync
  // so the room code and Host passcode ("Brown123") are the same
  // across every game on the platform. ----------

  get roomId() {
    return RoomSync.roomId;
  }

  setRoom(newRoomId) {
    RoomSync.setRoom(newRoomId);
    this._attach();
  }

  attachRoomHUD(selector) {
    RoomSync.attachRoomHUD(selector);
  }

  isHostUnlocked() {
    return RoomSync.isHostUnlocked();
  }

  ensureHostPasscodeUnlocked(onUnlocked) {
    RoomSync.ensureHostPasscodeUnlocked(onUnlocked);
  }

  // ---------- State sync (own path) ----------

  _attach() {
    if (this._unsub) this._unsub();
    const stateRef = ref(db, `rooms/${this.roomId}/chatGames/state`);
    this._unsub = onValue(stateRef, (snap) => {
      const state = snap.val();
      if (state) this._notify(state);
    });
  }

  sendState(state) {
    set(ref(db, `rooms/${this.roomId}/chatGames/state`), state).catch((e) =>
      console.warn("[ChatGameEngine] sendState error:", e)
    );
  }

  patchState(partial) {
    update(ref(db, `rooms/${this.roomId}/chatGames/state`), partial).catch((e) =>
      console.warn("[ChatGameEngine] patchState error:", e)
    );
  }

  onStateChange(fn) {
    this.listeners.push(fn);
  }

  _notify(state) {
    this.listeners.forEach((fn) => {
      try {
        fn(state);
      } catch (e) {
        console.error("[ChatGameEngine] listener error:", e);
      }
    });
  }
}

export const ChatGames = new ChatGameEngine();
window.ChatGames = ChatGames;
