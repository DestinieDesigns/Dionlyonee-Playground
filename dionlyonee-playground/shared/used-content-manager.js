// Dionlyonee Playground — Used Content Manager
// Tracks which puzzles/questions/clues have already been used in a
// session, per game, so nothing repeats until the room is reset.
// Storage path: rooms/{roomId}/usedContent/{gameKey} -> { [itemId]: true }

import { initializeApp, getApps, getApp } from "https://www.gstatic.com/firebasejs/12.18.0/firebase-app.js";
import {
  getDatabase,
  ref,
  get,
  set,
  update,
  remove
} from "https://www.gstatic.com/firebasejs/12.18.0/firebase-database.js";
import { firebaseConfig } from "./firebase-config.js";

const app = getApps().length ? getApp() : initializeApp(firebaseConfig);
const db = getDatabase(app);

/**
 * Fetch the set of used item IDs for a given room + game.
 * @returns {Promise<Set<string>>}
 */
export async function getUsedSet(roomId, gameKey) {
  const snap = await get(ref(db, `rooms/${roomId}/usedContent/${gameKey}`));
  const val = snap.val() || {};
  return new Set(Object.keys(val));
}

/**
 * Mark a single item ID as used.
 */
export async function markUsed(roomId, gameKey, itemId) {
  await update(ref(db, `rooms/${roomId}/usedContent/${gameKey}`), { [itemId]: true });
}

/**
 * Pick a random item from `items` (each must have an `id` field) that
 * hasn't been used yet in this room/game, and mark it used.
 * Returns null if every item has already been used — the caller
 * decides whether to reset or tell the host the pool is exhausted.
 */
export async function pickUnused(roomId, gameKey, items, idField = "id") {
  const used = await getUsedSet(roomId, gameKey);
  const remaining = items.filter((item) => !used.has(String(item[idField])));
  if (remaining.length === 0) return null;

  const pick = remaining[Math.floor(Math.random() * remaining.length)];
  await markUsed(roomId, gameKey, String(pick[idField]));
  return pick;
}

/**
 * Wipe used-content tracking for one game in a room (e.g. "start a
 * fresh session" — must be an intentional host action, never automatic).
 */
export async function resetUsedContent(roomId, gameKey) {
  await remove(ref(db, `rooms/${roomId}/usedContent/${gameKey}`));
}

/**
 * How many items in `items` are still unused — useful for a host UI
 * warning ("3 puzzles left in this category").
 */
export async function countRemaining(roomId, gameKey, items, idField = "id") {
  const used = await getUsedSet(roomId, gameKey);
  return items.filter((item) => !used.has(String(item[idField]))).length;
}
