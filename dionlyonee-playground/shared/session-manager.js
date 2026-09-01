// Dionlyonee Playground — Shared Session / Room Sync Manager
// Firebase Realtime Database transport. Same public API shape as the
// old WebSocket-based RoomSyncClient, so game code doesn't need to
// know or care what's underneath.
//
// Usage in any page:
//   <script type="module" src="/shared/session-manager.js"></script>
//   <script type="module">
//     import { RoomSync } from '/shared/session-manager.js';
//     RoomSync.onStateChange((state) => { ... });
//     RoomSync.sendState({ foo: 'bar' });
//   </script>

import { initializeApp } from "https://www.gstatic.com/firebasejs/12.18.0/firebase-app.js";
import {
  getDatabase,
  ref,
  set,
  update,
  onValue,
  push,
  onChildAdded,
  serverTimestamp
} from "https://www.gstatic.com/firebasejs/12.18.0/firebase-database.js";

import { firebaseConfig } from "./firebase-config.js";

const HOST_PASSCODE = "Brown123";

const app = initializeApp(firebaseConfig);
const db = getDatabase(app);

class RoomSyncClient {
  constructor() {
    this.gameType = "wheel"; // default; games override via setGameType()
    this.role = "guest"; // 'host' | 'cohost' | 'live' | 'guest'
    this.roomId = this.extractRoomId();
    this.listeners = [];
    this.buzzerCallback = null;
    this._stateUnsub = null;
    this._eventsUnsub = null;
    this._eventsAttachedAt = Date.now();

    this._attachStateListener();
    this._attachEventsListener();
  }

  // ---------- Room identity ----------

  extractRoomId() {
    const urlParams = new URLSearchParams(window.location.search);
    const urlRoom = urlParams.get("room");
    if (urlRoom && urlRoom.trim()) {
      const clean = urlRoom.trim().toUpperCase();
      localStorage.setItem("dion_current_room", clean);
      return clean;
    }
    return (localStorage.getItem("dion_current_room") || "DION1").toUpperCase();
  }

  setRoom(newRoomId) {
    if (!newRoomId) return;
    const clean = newRoomId.trim().toUpperCase();
    this.roomId = clean;
    localStorage.setItem("dion_current_room", clean);

    const url = new URL(window.location.href);
    url.searchParams.set("room", clean);
    window.history.replaceState({}, "", url.toString());

    this._eventsAttachedAt = Date.now();
    this._attachStateListener();
    this._attachEventsListener();
    this.updateRoomBadges();
  }

  setGameType(gameType) {
    this.gameType = gameType;
  }

  setRole(role) {
    this.role = role;
  }

  // ---------- State sync ----------

  _attachStateListener() {
    if (this._stateUnsub) this._stateUnsub();
    const stateRef = ref(db, `rooms/${this.roomId}/state`);
    this._stateUnsub = onValue(stateRef, (snapshot) => {
      const state = snapshot.val();
      if (state) this.notify(state);
    });
  }

  _attachEventsListener() {
    if (this._eventsUnsub) this._eventsUnsub();
    const eventsRef = ref(db, `rooms/${this.roomId}/events`);
    this._eventsUnsub = onChildAdded(eventsRef, (snapshot) => {
      const data = snapshot.val();
      if (!data || !data._ts) return;
      // Ignore events that existed before we attached the listener,
      // so re-joining a room doesn't replay old buzzes/sounds.
      if (data._ts < this._eventsAttachedAt) return;

      if (data.type === "SEND_SOUND") this.notifySound(data.sound);
      else if (data.type === "COHOST_BUZZ") this.notifyBuzzer(data);
    });
  }

  sendState(state) {
    const stateRef = ref(db, `rooms/${this.roomId}/state`);
    set(stateRef, state).catch((e) => console.warn("[Sync] sendState error:", e));

    update(ref(db, `rooms/${this.roomId}`), {
      gameType: this.gameType,
      lastUpdate: serverTimestamp()
    }).catch(() => {});

    try {
      localStorage.setItem(`dion_state_${this.roomId}`, JSON.stringify(state));
    } catch (e) {
      // ignore
    }
  }

  // Patch a subset of state without overwriting the whole object.
  patchState(partial) {
    const stateRef = ref(db, `rooms/${this.roomId}/state`);
    update(stateRef, partial).catch((e) => console.warn("[Sync] patchState error:", e));
    update(ref(db, `rooms/${this.roomId}`), {
      gameType: this.gameType,
      lastUpdate: serverTimestamp()
    }).catch(() => {});
  }

  sendSound(sound) {
    const eventsRef = ref(db, `rooms/${this.roomId}/events`);
    push(eventsRef, { type: "SEND_SOUND", sound, _ts: Date.now() }).catch(() => {});
  }

  sendBuzzer(extraData = {}) {
    const eventsRef = ref(db, `rooms/${this.roomId}/events`);
    push(eventsRef, {
      type: "COHOST_BUZZ",
      _ts: Date.now(),
      ...extraData
    }).catch(() => {});
  }

  onStateChange(fn) {
    this.listeners.push(fn);
  }

  onBuzzer(fn) {
    this.buzzerCallback = fn;
  }

  notify(state) {
    this.listeners.forEach((fn) => {
      try {
        fn(state);
      } catch (e) {
        console.error("[Sync] listener callback error:", e);
      }
    });
  }

  notifySound(sound) {
    if (window.sounds && sound) {
      try {
        window.sounds.play(sound);
      } catch (e) {
        // ignore
      }
    }
  }

  notifyBuzzer(data) {
    if (this.buzzerCallback) {
      try {
        this.buzzerCallback(data);
      } catch (e) {
        console.error("[Sync] buzzer callback error:", e);
      }
    }
  }

  // ---------- Host passcode security ("Brown123") ----------
  // Client-side only — enough to keep the code off the public Live
  // Screen, not meant to be bulletproof auth.

  isHostUnlocked() {
    const sessionAuth = sessionStorage.getItem(`dion_host_auth_${this.roomId}`);
    const localAuth = localStorage.getItem("dion_host_auth_master");
    return sessionAuth === "true" || localAuth === "true";
  }

  verifyHostPasscode(passcode) {
    if (!passcode) return false;
    const valid = passcode.trim() === HOST_PASSCODE;
    if (valid) {
      sessionStorage.setItem(`dion_host_auth_${this.roomId}`, "true");
      localStorage.setItem("dion_host_auth_master", "true");
    }
    return valid;
  }

  lockHost() {
    sessionStorage.removeItem(`dion_host_auth_${this.roomId}`);
    localStorage.removeItem("dion_host_auth_master");
    window.location.reload();
  }

  // ---------- UI helpers ----------

  attachRoomHUD(containerSelector) {
    const container = document.querySelector(
      containerSelector || ".main-header, .host-header, .live-header, .cohost-header"
    );
    if (!container) return;

    const existingHud = document.getElementById("dion-room-hud");
    if (existingHud) existingHud.remove();

    const hud = document.createElement("div");
    hud.id = "dion-room-hud";
    hud.style.cssText = `
      display: flex;
      align-items: center;
      gap: 8px;
      background: rgba(212, 175, 55, 0.12);
      border: 1px solid rgba(212, 175, 55, 0.4);
      padding: 5px 12px;
      border-radius: 999px;
      font-size: 12px;
      font-weight: 800;
    `;

    hud.innerHTML = `
      <span style="color: #f7e07d;">ROOM:</span>
      <span id="dion-room-code-display" style="font-family: 'Space Grotesk', monospace; color: #fff; font-size: 14px; letter-spacing: 1px;">${this.roomId}</span>
      <button id="dion-btn-change-room" title="Change Room Code" style="background: none; border: none; color: #d4af37; cursor: pointer; font-size: 13px; padding: 0 2px;">✏️</button>
      <button id="dion-btn-copy-room" title="Copy Invite Link" style="background: none; border: none; color: #d4af37; cursor: pointer; font-size: 13px; padding: 0 2px;">📋</button>
    `;

    container.appendChild(hud);

    document.getElementById("dion-btn-change-room")?.addEventListener("click", () => {
      const custom = prompt("Enter Room Code to join / create (e.g. DION1, PLAY123):", this.roomId);
      if (custom && custom.trim()) {
        this.setRoom(custom.trim());
        const display = document.getElementById("dion-room-code-display");
        if (display) display.textContent = this.roomId;
      }
    });

    document.getElementById("dion-btn-copy-room")?.addEventListener("click", () => {
      const url = new URL(window.location.href);
      url.searchParams.set("room", this.roomId);
      navigator.clipboard
        .writeText(url.toString())
        .then(() => {
          alert(`✅ Room Link Copied!\n\nRoom: ${this.roomId}\nURL: ${url.toString()}`);
        })
        .catch(() => {
          prompt("Copy this room URL:", url.toString());
        });
    });
  }

  updateRoomBadges() {
    const display = document.getElementById("dion-room-code-display");
    if (display) display.textContent = this.roomId;
  }

  ensureHostPasscodeUnlocked(onUnlocked) {
    if (this.isHostUnlocked()) {
      if (onUnlocked) onUnlocked();
      return;
    }

    const existingModal = document.getElementById("host-passcode-modal");
    if (existingModal) existingModal.remove();

    const modal = document.createElement("div");
    modal.id = "host-passcode-modal";
    modal.style.cssText = `
      position: fixed; inset: 0; background: rgba(7, 9, 14, 0.95);
      backdrop-filter: blur(16px); z-index: 99999;
      display: flex; align-items: center; justify-content: center; padding: 20px;
    `;

    modal.innerHTML = `
      <div style="background:#0e121b;border:1px solid rgba(212,175,55,0.5);border-radius:20px;
        padding:36px;max-width:440px;width:100%;display:flex;flex-direction:column;
        align-items:center;gap:20px;box-shadow:0 0 40px rgba(212,175,55,0.25);
        text-align:center;color:#fff;font-family:'Montserrat',sans-serif;">
        <div style="width:60px;height:60px;border-radius:16px;
          background:linear-gradient(135deg,#d4af37,#8c7322);display:flex;
          align-items:center;justify-content:center;font-size:30px;color:#07090e;
          box-shadow:0 0 25px rgba(212,175,55,0.4);">🔒</div>
        <div>
          <h2 style="font-family:'Cinzel',serif;font-size:24px;font-weight:900;color:#fff;margin-bottom:6px;">
            HOST CONTROL DESK
          </h2>
          <p style="font-size:13px;color:#94a3b8;line-height:1.5;">
            Enter the Host Passcode to unlock stream controls for Room
            <strong style="color:#f7e07d;">${this.roomId}</strong>.
          </p>
        </div>
        <form id="host-passcode-form" style="width:100%;display:flex;flex-direction:column;gap:14px;">
          <input type="password" id="host-passcode-input" placeholder="Enter Host Passcode..." required
            autocomplete="current-password"
            style="width:100%;padding:14px 18px;border-radius:10px;background:rgba(255,255,255,0.06);
            border:1px solid rgba(255,255,255,0.15);color:#fff;font-size:16px;text-align:center;
            letter-spacing:2px;outline:none;font-weight:700;" />
          <div id="host-passcode-error" style="display:none;color:#ef4444;font-size:13px;font-weight:700;">
            ❌ Incorrect passcode. Please try again.
          </div>
          <button type="submit" id="host-passcode-submit"
            style="width:100%;padding:14px;background:linear-gradient(135deg,#d4af37,#8c7322);
            border:none;border-radius:10px;color:#07090e;font-family:'Cinzel',serif;font-size:15px;
            font-weight:900;letter-spacing:1px;cursor:pointer;box-shadow:0 0 20px rgba(212,175,55,0.3);">
            UNLOCK HOST CONTROLS
          </button>
        </form>
        <a href="../index.html" style="font-size:12px;color:#94a3b8;text-decoration:underline;">
          Back to Playground Hub
        </a>
      </div>
    `;

    document.body.appendChild(modal);

    const input = document.getElementById("host-passcode-input");
    const form = document.getElementById("host-passcode-form");
    const errorMsg = document.getElementById("host-passcode-error");
    if (input) input.focus();

    form?.addEventListener("submit", (e) => {
      e.preventDefault();
      const valid = this.verifyHostPasscode(input.value);
      if (valid) {
        if (window.sounds) window.sounds.play("correct");
        modal.remove();
        if (onUnlocked) onUnlocked();
      } else {
        if (window.sounds) window.sounds.play("wrong");
        if (errorMsg) errorMsg.style.display = "block";
        input.value = "";
        input.focus();
      }
    });
  }
}

export const RoomSync = new RoomSyncClient();
// Also expose globally so classic (non-module) game scripts can use it
// once they've waited for the 'roomsync-ready' event below.
window.RoomSync = RoomSync;
window.dispatchEvent(new CustomEvent("roomsync-ready", { detail: RoomSync }));
