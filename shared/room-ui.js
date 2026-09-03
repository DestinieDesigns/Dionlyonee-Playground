/**
 * Dionlyonee Playground - Room UI & HUD
 * Provides sticky Room HUD, QR code modal, and phone link generator across all screens.
 */
(function () {
  const RoomUI = {
    attachHUD(containerSelector = '.main-header', defaultGame = 'wheel') {
      const parent = document.querySelector(containerSelector);
      if (!parent) return;

      const existing = document.getElementById('dion-room-hud');
      if (existing) existing.remove();

      const roomId = window.RoomManager ? window.RoomManager.getRoom() : 'DION1';

      const hud = document.createElement('div');
      hud.id = 'dion-room-hud';
      hud.style.cssText = `
        display: flex; align-items: center; gap: 10px;
        font-family: 'Montserrat', sans-serif;
      `;
      hud.innerHTML = `
        <div style="
          display: flex; align-items: center; gap: 8px;
          background: rgba(14, 18, 27, 0.85); border: 1px solid rgba(212, 175, 55, 0.4);
          padding: 6px 12px; border-radius: 9999px; font-size: 12.5px;
        ">
          <span style="color: #94a3b8; font-weight: 700; font-size: 11px; letter-spacing: 1px;">ROOM:</span>
          <span id="hud-room-code" style="color: #f7e07d; font-weight: 900; letter-spacing: 1.5px; font-family: 'Cinzel', serif;">
            ${roomId}
          </span>
          <button id="btn-switch-room" title="Change Room Code" style="
            background: rgba(255,255,255,0.08); border-radius: 4px; padding: 2px 6px;
            color: #d4af37; font-size: 11px; font-weight: 700; cursor: pointer;
          ">EDIT</button>
        </div>

        <button id="btn-open-qr" style="
          display: flex; align-items: center; gap: 6px;
          background: linear-gradient(135deg, rgba(212,175,55,0.2), rgba(168,85,247,0.2));
          border: 1px solid rgba(212, 175, 55, 0.5);
          padding: 6px 14px; border-radius: 9999px;
          color: #ffffff; font-size: 12px; font-weight: 800; cursor: pointer;
        ">
          📱 PHONE CONNECT
        </button>
      `;

      parent.appendChild(hud);

      // Event handlers
      document.getElementById('btn-switch-room').addEventListener('click', () => {
        const input = prompt('Enter new Room Code (e.g. DION1, STREAM99):', roomId);
        if (input && input.trim()) {
          window.RoomManager.setRoom(input.trim());
          document.getElementById('hud-room-code').textContent = window.RoomManager.getRoom();
        }
      });

      document.getElementById('btn-open-qr').addEventListener('click', () => {
        RoomUI.showQRModal(defaultGame);
      });

      window.addEventListener('roomchange', (e) => {
        const el = document.getElementById('hud-room-code');
        if (el && e.detail && e.detail.roomId) {
          el.textContent = e.detail.roomId;
        }
      });
    },

    showQRModal(game = 'wheel') {
      const roomId = window.RoomManager ? window.RoomManager.getRoom() : 'DION1';
      const joinUrl = `${window.location.origin}/${game}/cohost/?room=${roomId}`;
      const qrApiUrl = `https://api.qrserver.com/v1/create-qr-code/?size=240x240&data=${encodeURIComponent(joinUrl)}`;

      let modal = document.getElementById('dion-qr-modal');
      if (modal) modal.remove();

      modal = document.createElement('div');
      modal.id = 'dion-qr-modal';
      modal.style.cssText = `
        position: fixed; inset: 0; z-index: 999999;
        background: rgba(7, 9, 14, 0.9); backdrop-filter: blur(12px);
        display: flex; align-items: center; justify-content: center;
        padding: 20px; font-family: 'Montserrat', sans-serif;
      `;
      modal.innerHTML = `
        <div style="
          background: #0e121b; border: 1px solid rgba(212, 175, 55, 0.4);
          border-radius: 20px; max-width: 440px; width: 100%; padding: 32px 24px;
          box-shadow: 0 0 35px rgba(212, 175, 55, 0.25); text-align: center;
          position: relative;
        ">
          <button id="btn-close-qr" style="
            position: absolute; top: 16px; right: 16px;
            background: rgba(255,255,255,0.06); border-radius: 50%;
            width: 32px; height: 32px; color: #94a3b8; font-size: 16px; cursor: pointer;
          ">✕</button>

          <div style="font-size: 32px; margin-bottom: 8px;">📲</div>
          <h3 style="font-family: 'Cinzel', serif; font-size: 20px; color: #ffffff; margin-bottom: 6px;">
            CONNECT PHONE / CO-HOST
          </h3>
          <p style="color: #94a3b8; font-size: 13px; margin-bottom: 20px;">
            Scan QR code with your phone camera to control buzzers, hints, and wheel spins.
          </p>

          <div style="
            display: inline-block; padding: 12px; background: #ffffff;
            border-radius: 12px; box-shadow: 0 4px 18px rgba(0,0,0,0.5); margin-bottom: 20px;
          ">
            <img src="${qrApiUrl}" alt="Join QR Code" style="width: 200px; height: 200px; display: block;" />
          </div>

          <div style="
            background: rgba(0,0,0,0.4); border: 1px solid rgba(255,255,255,0.1);
            border-radius: 10px; padding: 10px; display: flex; align-items: center; justify-content: space-between;
            margin-bottom: 16px; font-size: 12px; color: #94a3b8; word-break: break-all;
          ">
            <span style="overflow: hidden; text-overflow: ellipsis; white-space: nowrap; margin-right: 8px;">
              ${joinUrl}
            </span>
            <button id="btn-copy-url" style="
              background: #d4af37; color: #07090e; font-weight: 800; padding: 6px 12px;
              border-radius: 6px; font-size: 11px; white-space: nowrap; cursor: pointer;
            ">COPY</button>
          </div>

          <div style="font-size: 11.5px; color: #64748b;">
            Room Code: <b style="color: #f7e07d;">${roomId}</b> • No app install needed
          </div>
        </div>
      `;

      document.body.appendChild(modal);

      document.getElementById('btn-close-qr').addEventListener('click', () => modal.remove());
      modal.addEventListener('click', (e) => {
        if (e.target === modal) modal.remove();
      });

      document.getElementById('btn-copy-url').addEventListener('click', () => {
        navigator.clipboard.writeText(joinUrl).then(() => {
          document.getElementById('btn-copy-url').textContent = 'COPIED!';
          setTimeout(() => {
            const btn = document.getElementById('btn-copy-url');
            if (btn) btn.textContent = 'COPY';
          }, 2000);
        });
      });
    }
  };

  window.RoomUI = RoomUI;
})();
