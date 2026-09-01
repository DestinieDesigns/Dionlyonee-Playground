javascript
/* =========================================================
   DIONLYONEE PLAYGROUND
   FIREBASE ROOM SYSTEM
   ========================================================= */

import {
  database
} from "./firebase-config.js";

import {
  ref,
  set,
  get,
  update,
  onValue,
  remove
} from "https://www.gstatic.com/firebasejs/12.18.0/firebase-database.js";


/* =========================================================
   DATABASE ROOT
   ========================================================= */

const ROOMS_PATH = "rooms";


/* =========================================================
   CREATE ROOM CODE
   ========================================================= */

function generateRoomCode() {

  const characters =
    "ABCDEFGHJKLMNPQRSTUVWXYZ23456789";

  let code = "DION";

  for (let i = 0; i < 4; i++) {

    const randomIndex =
      Math.floor(
        Math.random() * characters.length
      );

    code += characters[randomIndex];

  }

  return code;

}


/* =========================================================
   CREATE ROOM
   ========================================================= */

async function createRoom(gameId) {

  let roomCode = generateRoomCode();

  let exists = true;


  /* Keep generating until we find
     an unused room code */

  while (exists) {

    const roomReference =
      ref(
        database,
        `${ROOMS_PATH}/${roomCode}`
      );


    const snapshot =
      await get(roomReference);


    if (!snapshot.exists()) {

      exists = false;

    } else {

      roomCode = generateRoomCode();

    }

  }


  /* Create room data */

  const roomData = {

    roomInfo: {

      roomCode: roomCode,

      game: gameId,

      createdAt: Date.now(),

      status: "waiting"

    },


    connections: {

      host: false,

      cohost: false,

      live: false

    },


    gameState: {

      phase: "waiting"

    },


    players: {},


    usedContent: {}

  };


  await set(

    ref(
      database,
      `${ROOMS_PATH}/${roomCode}`
    ),

    roomData

  );


  return roomCode;

}


/* =========================================================
   CHECK IF ROOM EXISTS
   ========================================================= */

async function roomExists(roomCode) {

  if (!roomCode) {

    return false;

  }


  const cleanCode =
    String(roomCode)
      .trim()
      .toUpperCase();


  const snapshot =
    await get(

      ref(
        database,
        `${ROOMS_PATH}/${cleanCode}`
      )

    );


  return snapshot.exists();

}


/* =========================================================
   GET ROOM
   ========================================================= */

async function getRoom(roomCode) {

  if (!roomCode) {

    return null;

  }


  const cleanCode =
    String(roomCode)
      .trim()
      .toUpperCase();


  const snapshot =
    await get(

      ref(
        database,
        `${ROOMS_PATH}/${cleanCode}`
      )

    );


  if (!snapshot.exists()) {

    return null;

  }


  return snapshot.val();

}


/* =========================================================
   UPDATE ROOM
   ========================================================= */

async function updateRoom(
  roomCode,
  updates
) {

  const cleanCode =
    String(roomCode)
      .trim()
      .toUpperCase();


  await update(

    ref(
      database,
      `${ROOMS_PATH}/${cleanCode}`
    ),

    updates

  );

}


/* =========================================================
   UPDATE GAME STATE
   ========================================================= */

async function updateGameState(
  roomCode,
  updates
) {

  const cleanCode =
    String(roomCode)
      .trim()
      .toUpperCase();


  await update(

    ref(
      database,
      `${ROOMS_PATH}/${cleanCode}/gameState`
    ),

    updates

  );

}


/* =========================================================
   UPDATE PLAYERS
   ========================================================= */

async function updatePlayers(
  roomCode,
  players
) {

  const cleanCode =
    String(roomCode)
      .trim()
      .toUpperCase();


  await set(

    ref(
      database,
      `${ROOMS_PATH}/${cleanCode}/players`
    ),

    players

  );

}


/* =========================================================
   UPDATE CONNECTION STATUS
   ========================================================= */

async function setConnection(
  roomCode,
  role,
  connected
) {

  const cleanCode =
    String(roomCode)
      .trim()
      .toUpperCase();


  await update(

    ref(
      database,
      `${ROOMS_PATH}/${cleanCode}/connections`
    ),

    {

      [role]: connected

    }

  );

}


/* =========================================================
   LISTEN TO ROOM

   Keeps Host, Cohost, and Live Screen
   synchronized in real time.
   ========================================================= */

function listenToRoom(
  roomCode,
  callback
) {

  const cleanCode =
    String(roomCode)
      .trim()
      .toUpperCase();


  const roomReference =
    ref(
      database,
      `${ROOMS_PATH}/${cleanCode}`
    );


  return onValue(

    roomReference,

    snapshot => {

      if (snapshot.exists()) {

        callback(
          snapshot.val()
        );

      } else {

        callback(null);

      }

    }

  );

}


/* =========================================================
   ADD USED CONTENT

   Prevents repeated questions,
   puzzles, and words during a session.
   ========================================================= */

async function markContentUsed(
  roomCode,
  contentType,
  contentId
) {

  const cleanCode =
    String(roomCode)
      .trim()
      .toUpperCase();


  await set(

    ref(

      database,

      `${ROOMS_PATH}/${cleanCode}/usedContent/${contentType}/${contentId}`

    ),

    true

  );

}


/* =========================================================
   GET USED CONTENT
   ========================================================= */

async function getUsedContent(
  roomCode,
  contentType
) {

  const cleanCode =
    String(roomCode)
      .trim()
      .toUpperCase();


  const snapshot =
    await get(

      ref(

        database,

        `${ROOMS_PATH}/${cleanCode}/usedContent/${contentType}`

      )

    );


  if (!snapshot.exists()) {

    return {};

  }


  return snapshot.val();

}


/* =========================================================
   DELETE ROOM

   Mainly for testing and cleanup.
   ========================================================= */

async function deleteRoom(roomCode) {

  const cleanCode =
    String(roomCode)
      .trim()
      .toUpperCase();


  await remove(

    ref(
      database,
      `${ROOMS_PATH}/${cleanCode}`
    )

  );

}


/* =========================================================
   EXPORT
   ========================================================= */

export {

  generateRoomCode,

  createRoom,

  roomExists,

  getRoom,

  updateRoom,

  updateGameState,

  updatePlayers,

  setConnection,

  listenToRoom,

  markContentUsed,

  getUsedContent,

  deleteRoom

};