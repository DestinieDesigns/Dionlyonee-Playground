import express from "express";
import http from "http";
import path from "path";
import { WebSocketServer, WebSocket } from "ws";
import { createServer as createViteServer } from "vite";

interface RoomData {
  id: string;
  gameType: "jeopardy" | "most-likely" | "wheel" | "general";
  state: Record<string, unknown>;
  lastSpin?: {
    startAngle: number;
    targetAngle: number;
    duration: number;
    startTime: number;
    timestamp: number;
  };
  lastBuzzer?: {
    player: string;
    timestamp: number;
  };
  lastUpdate: number;
}

const rooms = new Map<string, RoomData>();
const roomClients = new Map<string, Set<WebSocket>>();

async function startServer() {
  const app = express();
  const PORT = 3000;

  app.use(express.json());

  // API: Health check
  app.get("/api/health", (_req, res) => {
    res.json({ status: "ok", timestamp: new Date().toISOString(), totalRooms: rooms.size });
  });

  // API: Verify Host Passcode (unlocked per user request)
  app.post("/api/verify-host", (_req, res) => {
    res.json({ success: true, authorized: true, message: "Authorized as Host (Unlocked)" });
  });

  // API: Get Room State (supports HTTP polling for mobile browsers)
  app.get("/api/rooms/:roomId", (req, res) => {
    const roomId = (req.params.roomId || "DION1").toUpperCase();
    const room = rooms.get(roomId);
    const connectedCount = roomClients.get(roomId)?.size || 0;
    if (room) {
      res.json({ success: true, room, connectedCount });
    } else {
      res.json({ success: true, room: null, connectedCount });
    }
  });

  // API: Update Room State
  app.post("/api/rooms/:roomId/state", (req, res) => {
    const roomId = (req.params.roomId || "DION1").toUpperCase();
    const { state, gameType, sound } = req.body;

    const existing = rooms.get(roomId);
    const updatedRoom: RoomData = {
      id: roomId,
      gameType: gameType || existing?.gameType || "wheel",
      state: state || existing?.state || {},
      lastSpin: existing?.lastSpin,
      lastBuzzer: existing?.lastBuzzer,
      lastUpdate: Date.now(),
    };

    rooms.set(roomId, updatedRoom);

    // Broadcast to connected WebSocket clients in this room
    broadcastToRoom(roomId, {
      type: "ROOM_STATE",
      roomId,
      gameType: updatedRoom.gameType,
      state: updatedRoom.state,
      sound: sound || null,
      timestamp: updatedRoom.lastUpdate,
    });

    res.json({ success: true, timestamp: updatedRoom.lastUpdate });
  });

  // API: Post Wheel Spin Event
  app.post("/api/rooms/:roomId/spin", (req, res) => {
    const roomId = (req.params.roomId || "DION1").toUpperCase();
    const { startAngle, targetAngle, duration } = req.body;

    const existing = rooms.get(roomId) || {
      id: roomId,
      gameType: "wheel" as const,
      state: {},
      lastUpdate: Date.now(),
    };

    const spinData = {
      startAngle: Number(startAngle) || 0,
      targetAngle: Number(targetAngle) || 0,
      duration: Number(duration) || 4000,
      startTime: Date.now(),
      timestamp: Date.now(),
    };

    existing.lastSpin = spinData;
    existing.lastUpdate = Date.now();
    rooms.set(roomId, existing);

    broadcastToRoom(roomId, {
      type: "WHEEL_SPIN",
      roomId,
      ...spinData,
    });

    res.json({ success: true, spin: spinData });
  });

  // API: Post Buzzer Event
  app.post("/api/rooms/:roomId/buzz", (req, res) => {
    const roomId = (req.params.roomId || "DION1").toUpperCase();
    const { player } = req.body;

    const existing = rooms.get(roomId) || {
      id: roomId,
      gameType: "wheel" as const,
      state: {},
      lastUpdate: Date.now(),
    };

    const buzzData = {
      player: player || "Co-Host",
      timestamp: Date.now(),
    };

    existing.lastBuzzer = buzzData;
    rooms.set(roomId, existing);

    broadcastToRoom(roomId, {
      type: "COHOST_BUZZ",
      roomId,
      ...buzzData,
    });

    res.json({ success: true, buzzer: buzzData });
  });

  // Clean URL route aliases
  const routes = [
    { path: "/wheel-host", file: "wheel-host.html" },
    { path: "/wheel-live", file: "wheel-live.html" },
    { path: "/wheel-cohost", file: "wheel-cohost.html" },
    { path: "/wheel/host", file: "wheel/host/index.html" },
    { path: "/wheel/live", file: "wheel/live/index.html" },
    { path: "/wheel/cohost", file: "wheel/cohost/index.html" },
    { path: "/wheel/waiting", file: "wheel/waiting/index.html" },
    { path: "/wheel", file: "wheel/index.html" },

    { path: "/trivia/host", file: "trivia/host/index.html" },
    { path: "/trivia/live", file: "trivia/live/index.html" },
    { path: "/trivia/cohost", file: "trivia/cohost/index.html" },
    { path: "/trivia/waiting", file: "trivia/waiting/index.html" },
    { path: "/trivia", file: "trivia/index.html" },

    { path: "/jeopardy-host", file: "jeopardy-host.html" },
    { path: "/jeopardy-live", file: "jeopardy-live.html" },
    { path: "/jeopardy-cohost", file: "jeopardy-cohost.html" },
    { path: "/jeopardy/host", file: "jeopardy/host/index.html" },
    { path: "/jeopardy/live", file: "jeopardy/live/index.html" },
    { path: "/jeopardy/cohost", file: "jeopardy/cohost/index.html" },
    { path: "/jeopardy/waiting", file: "jeopardy/waiting/index.html" },
    { path: "/jeopardy", file: "jeopardy/index.html" },

    { path: "/word-reveal/host", file: "word-reveal/host/index.html" },
    { path: "/word-reveal/live", file: "word-reveal/live/index.html" },
    { path: "/word-reveal/cohost", file: "word-reveal/cohost/index.html" },
    { path: "/word-reveal/waiting", file: "word-reveal/waiting/index.html" },
    { path: "/word-reveal", file: "word-reveal/index.html" },

    { path: "/most-likely-host", file: "most-likely-host.html" },
    { path: "/most-likely-live", file: "most-likely-live.html" },
    { path: "/dual-view", file: "dual-view.html" },
    { path: "/split-screen", file: "dual-view.html" },
    { path: "/hub", file: "index.html" },
  ];

  routes.forEach((r) => {
    app.get(r.path, (_req, res) => {
      const filePath = path.join(
        process.cwd(),
        process.env.NODE_ENV === "production" ? "dist" : "",
        r.file
      );
      res.sendFile(filePath);
    });
  });

  // Vite middleware for development
  if (process.env.NODE_ENV !== "production") {
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: "spa",
    });
    app.use(vite.middlewares);
  } else {
    const distPath = path.join(process.cwd(), "dist");
    app.use(express.static(distPath));
    app.get("*", (_req, res) => {
      res.sendFile(path.join(distPath, "index.html"));
    });
  }

  const server = http.createServer(app);

  // WebSocket Server setup
  const wss = new WebSocketServer({ server, path: "/ws" });

  wss.on("connection", (ws: WebSocket) => {
    let currentRoomId = "";

    ws.on("message", (rawMessage: string) => {
      try {
        const message = JSON.parse(rawMessage.toString());

        if (message.type === "JOIN_ROOM") {
          const roomId = (message.roomId || "DION1").toUpperCase();
          currentRoomId = roomId;

          if (!roomClients.has(roomId)) {
            roomClients.set(roomId, new Set());
          }
          roomClients.get(roomId)!.add(ws);

          // Send back current room state if exists
          const existingRoom = rooms.get(roomId);
          if (existingRoom) {
            ws.send(
              JSON.stringify({
                type: "ROOM_STATE",
                roomId,
                gameType: existingRoom.gameType,
                state: existingRoom.state,
                timestamp: existingRoom.lastUpdate,
              })
            );
          }
        } else if (message.type === "UPDATE_STATE") {
          const roomId = (message.roomId || currentRoomId || "DION1").toUpperCase();
          const updatedRoom: RoomData = {
            id: roomId,
            gameType: message.gameType || "jeopardy",
            state: message.state || {},
            lastUpdate: Date.now(),
          };

          rooms.set(roomId, updatedRoom);

          broadcastToRoom(
            roomId,
            {
              type: "ROOM_STATE",
              roomId,
              gameType: updatedRoom.gameType,
              state: updatedRoom.state,
              sound: message.sound || null,
              timestamp: updatedRoom.lastUpdate,
            },
            ws // don't echo back to sender if desired, or broadcast to all
          );
        } else if (message.type === "WHEEL_SPIN") {
          const roomId = (message.roomId || currentRoomId || "DION1").toUpperCase();
          let existing = rooms.get(roomId);
          if (!existing) {
            existing = {
              id: roomId,
              gameType: "wheel",
              state: {},
              lastUpdate: Date.now(),
            };
            rooms.set(roomId, existing);
          }
          existing.lastSpin = {
            startAngle: Number(message.startAngle) || 0,
            targetAngle: Number(message.targetAngle) || 0,
            duration: Number(message.duration) || 4000,
            startTime: Number(message.startTime) || Date.now(),
            timestamp: Date.now(),
          };
          existing.lastUpdate = Date.now();
          broadcastToRoom(roomId, message, ws);
        } else if (message.type === "PING") {
          ws.send(JSON.stringify({ type: "PONG", timestamp: Date.now() }));
        } else {
          // Broadcast other events (SEND_SOUND, COHOST_BUZZ, etc.)
          const roomId = (message.roomId || currentRoomId || "DION1").toUpperCase();
          broadcastToRoom(roomId, message, ws);
        }
      } catch (err) {
        console.warn("WebSocket message error:", err);
      }
    });

    ws.on("close", () => {
      if (currentRoomId && roomClients.has(currentRoomId)) {
        roomClients.get(currentRoomId)!.delete(ws);
        if (roomClients.get(currentRoomId)!.size === 0) {
          roomClients.delete(currentRoomId);
        }
      }
    });
  });

  function broadcastToRoom(roomId: string, data: Record<string, unknown>, senderWs?: WebSocket) {
    const clients = roomClients.get(roomId);
    if (!clients) return;

    const payload = JSON.stringify(data);
    clients.forEach((client) => {
      if (client.readyState === WebSocket.OPEN && client !== senderWs) {
        try {
          client.send(payload);
        } catch (e) {
          console.warn("WS send error:", e);
        }
      }
    });
  }

  server.listen(PORT, "0.0.0.0", () => {
    console.log(`Server running on http://localhost:${PORT}`);
  });
}

startServer();

