/**
 * Dionlyonee Playground - Firebase / Real-Time Room Sync
 * Coordinates state and realtime events across Host, Co-Host, Live Stage, and Phone screens.
 */
(function () {
  class FirebaseRoom {
    constructor() {
      this.roomId = window.RoomManager ? window.RoomManager.getRoom() : 'DION1';
      this.gameType = 'wheel';
      this.role = 'guest';
      this.ws = null;
      this.channel = null;
      this.stateCallbacks = [];
      this.buzzerCallbacks = [];
      this.spinCallbacks = [];
      this.pollTimer = null;
      this.lastSyncTimestamp = 0;

      this.initBroadcastChannel();
      this.initWebSocket();
      this.startHttpPolling();

      window.addEventListener('roomchange', (e) => {
        if (e.detail && e.detail.roomId) {
          this.switchRoom(e.detail.roomId);
        }
      });
    }

    initBroadcastChannel() {
      if (typeof BroadcastChannel !== 'undefined') {
        try {
          this.channel = new BroadcastChannel(`dionlyonee_room_${this.roomId}`);
          this.channel.onmessage = (e) => {
            this.handleIncoming(e.data);
          };
        } catch (e) {}
      }
    }

    initWebSocket() {
      try {
        const protocol = window.location.protocol === 'https:' ? 'wss:' : 'ws:';
        const wsUrl = `${protocol}//${window.location.host}/ws`;
        this.ws = new WebSocket(wsUrl);

        this.ws.onopen = () => {
          this.ws.send(JSON.stringify({
            type: 'JOIN_ROOM',
            roomId: this.roomId,
            role: this.role,
            gameType: this.gameType
          }));
        };

        this.ws.onmessage = (event) => {
          try {
            const data = JSON.parse(event.data);
            this.handleIncoming(data);
          } catch (e) {}
        };

        this.ws.onclose = () => {
          setTimeout(() => this.initWebSocket(), 3000);
        };
      } catch (e) {}
    }

    startHttpPolling() {
      if (this.pollTimer) clearInterval(this.pollTimer);
      this.pollTimer = setInterval(() => {
        this.fetchHttpState();
      }, 1500);
    }

    async fetchHttpState() {
      try {
        const res = await fetch(`/api/rooms/${this.roomId}`);
        if (!res.ok) return;
        const json = await res.json();
        if (json && json.room && json.room.state) {
          if (json.room.lastUpdate > this.lastSyncTimestamp) {
            this.lastSyncTimestamp = json.room.lastUpdate;
            this.triggerStateCallbacks(json.room.state);
          }
        }
      } catch (e) {}
    }

    switchRoom(newRoomId) {
      this.roomId = newRoomId.toUpperCase();
      this.lastSyncTimestamp = 0;
      if (this.channel) {
        try { this.channel.close(); } catch (e) {}
      }
      this.initBroadcastChannel();
      if (this.ws && this.ws.readyState === WebSocket.OPEN) {
        this.ws.send(JSON.stringify({
          type: 'JOIN_ROOM',
          roomId: this.roomId,
          role: this.role,
          gameType: this.gameType
        }));
      }
      this.fetchHttpState();
    }

    handleIncoming(data) {
      if (!data) return;
      if (data.type === 'SYNC_STATE' || data.type === 'ROOM_STATE') {
        if (data.state) {
          this.triggerStateCallbacks(data.state);
        }
      } else if (data.type === 'COHOST_BUZZ' || data.type === 'BUZZER') {
        this.buzzerCallbacks.forEach(cb => cb(data));
      } else if (data.type === 'WHEEL_SPIN') {
        this.spinCallbacks.forEach(cb => cb(data));
      }
    }

    broadcastState(state, sound = null) {
      this.lastSyncTimestamp = Date.now();
      const payload = {
        type: 'SYNC_STATE',
        roomId: this.roomId,
        gameType: this.gameType,
        state,
        sound,
        timestamp: Date.now()
      };

      if (this.channel) {
        try { this.channel.postMessage(payload); } catch (e) {}
      }
      if (this.ws && this.ws.readyState === WebSocket.OPEN) {
        try { this.ws.send(JSON.stringify(payload)); } catch (e) {}
      }

      fetch(`/api/rooms/${this.roomId}/state`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ gameType: this.gameType, state, sound })
      }).catch(() => {});
    }

    sendBuzzer(playerName) {
      const payload = {
        type: 'COHOST_BUZZ',
        roomId: this.roomId,
        player: playerName || 'Player Phone',
        timestamp: Date.now()
      };

      if (this.channel) {
        try { this.channel.postMessage(payload); } catch (e) {}
      }
      if (this.ws && this.ws.readyState === WebSocket.OPEN) {
        try { this.ws.send(JSON.stringify(payload)); } catch (e) {}
      }

      fetch(`/api/rooms/${this.roomId}/buzz`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ player: playerName })
      }).catch(() => {});
    }

    sendWheelSpin(spinData) {
      const payload = {
        type: 'WHEEL_SPIN',
        roomId: this.roomId,
        ...spinData,
        timestamp: Date.now()
      };

      if (this.channel) {
        try { this.channel.postMessage(payload); } catch (e) {}
      }
      if (this.ws && this.ws.readyState === WebSocket.OPEN) {
        try { this.ws.send(JSON.stringify(payload)); } catch (e) {}
      }

      fetch(`/api/rooms/${this.roomId}/spin`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(spinData)
      }).catch(() => {});
    }

    onState(callback) {
      this.stateCallbacks.push(callback);
    }

    onBuzzer(callback) {
      this.buzzerCallbacks.push(callback);
    }

    onSpin(callback) {
      this.spinCallbacks.push(callback);
    }

    triggerStateCallbacks(state) {
      this.stateCallbacks.forEach(cb => {
        try { cb(state); } catch (e) {}
      });
    }
  }

  window.FirebaseRoom = new FirebaseRoom();
  window.RoomSync = window.FirebaseRoom; // Compatibility alias
})();
