/**
 * Dionlyonee Playground - Room Manager
 * Handles room ID generation, persistence, and URL query params.
 */
(function () {
  class RoomManager {
    constructor() {
      this.currentRoom = this.resolveInitialRoom();
    }

    resolveInitialRoom() {
      try {
        const params = new URLSearchParams(window.location.search);
        const qRoom = params.get('room');
        if (qRoom && qRoom.trim()) {
          const clean = qRoom.trim().toUpperCase();
          sessionStorage.setItem('dionlyonee_active_room', clean);
          return clean;
        }

        const cached = sessionStorage.getItem('dionlyonee_active_room');
        if (cached && cached.trim()) return cached.trim().toUpperCase();

        return this.generateRandomRoom();
      } catch (e) {
        return 'DION1';
      }
    }

    generateRandomRoom() {
      const code = 'DION' + Math.floor(10 + Math.random() * 90);
      try {
        sessionStorage.setItem('dionlyonee_active_room', code);
      } catch (e) {}
      return code;
    }

    setRoom(code) {
      if (!code) return;
      const clean = code.trim().toUpperCase();
      this.currentRoom = clean;
      try {
        sessionStorage.setItem('dionlyonee_active_room', clean);
        const url = new URL(window.location.href);
        url.searchParams.set('room', clean);
        window.history.replaceState({}, '', url.toString());
        window.dispatchEvent(new CustomEvent('roomchange', { detail: { roomId: clean } }));
      } catch (e) {}
    }

    getRoom() {
      return this.currentRoom || 'DION1';
    }

    getJoinUrl(gameType = 'wheel', role = 'cohost') {
      const origin = window.location.origin;
      const roomId = this.getRoom();
      if (role === 'cohost') {
        return `${origin}/${gameType}/cohost/?room=${roomId}`;
      }
      return `${origin}/connections/join.html?room=${roomId}&game=${gameType}`;
    }
  }

  window.RoomManager = new RoomManager();
})();
