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

const ROOT = "rooms";


/* =========================================================
   CLEAN ROOM CODE
========================================================= */

function clean(roomCode) {

  return String(
    roomCode || ""
  )
    .trim()
    .toUpperCase();

}


/* =========================================================
   GENERATE ROOM CODE
========================================================= */

function generateRoomCode() {

  const characters =
    "ABCDEFGHJKLMNPQRSTUVWXYZ23456789";


  let code = "DION";


  for (
    let i = 0;
    i < 4;
    i++
  ) {

    const randomIndex =
      Math.floor(
        Math.random() *
        characters.length
      );


    code +=
      characters[randomIndex];

  }


  return code;

}


/* =========================================================
   CREATE ROOM
========================================================= */

async function createRoom(gameId) {

  console.log(
    "🎮 Starting room creation..."
  );


  let roomCode =
    generateRoomCode();


  let attempts = 0;


  /* Prevent an infinite loop */

  while (attempts < 10) {

    attempts++;


    console.log(
      `Checking room code: ${roomCode}`
    );


    const roomReference =
      ref(
        database,
        `${ROOT}/${roomCode}`
      );


    const snapshot =
      await get(roomReference);


    if (!snapshot.exists()) {

      console.log(
        "✅ Available room code found:",
        roomCode
      );

      break;

    }


    roomCode =
      generateRoomCode();

  }


  if (attempts >= 10) {

    throw new Error(
      "Could not generate an available room code."
    );

  }


  /* =====================================================
     ROOM DATA
  ===================================================== */

  const roomData = {

    roomInfo: {

      roomCode:
        roomCode,

      game:
        gameId,

      createdAt:
        Date.now(),

      status:
        "waiting"

    },


    connections: {

      host:
        false,

      cohost:
        false,

      live:
        false

    },


    gameState: {

      phase:
        "waiting"

    },


    players: {},


    usedContent: {}

  };


  console.log(
    "📡 Sending room to Firebase...",
    roomCode
  );


  /* =====================================================
     WRITE ROOM TO FIREBASE
  ===================================================== */

  await set(

    ref(
      database,
      `${ROOT}/${roomCode}`
    ),

    roomData

  );


  console.log(
    "🎉 ROOM CREATED SUCCESSFULLY:",
    roomCode
  );


  return roomCode;

}


/* =========================================================
   CHECK IF ROOM EXISTS
========================================================= */

async function roomExists(roomCode) {

  const room =
    clean(roomCode);


  if (!room) {

    return false;

  }


  const snapshot =
    await get(

      ref(
        database,
        `${ROOT}/${room}`
      )

    );


  return snapshot.exists();

}


/* =========================================================
   GET ROOM
========================================================= */

async function getRoom(roomCode) {

  const room =
    clean(roomCode);


  const snapshot =
    await get(

      ref(
        database,
        `${ROOT}/${room}`
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

function updateRoom(
  roomCode,
  updates
) {

  return update(

    ref(
      database,
      `${ROOT}/${clean(roomCode)}`
    ),

    updates

  );

}


/* =========================================================
   UPDATE GAME STATE
========================================================= */

function updateGameState(
  roomCode,
  updates
) {

  return update(

    ref(
      database,
      `${ROOT}/${clean(roomCode)}/gameState`
    ),

    updates

  );

}


/* =========================================================
   UPDATE PLAYERS
========================================================= */

function updatePlayers(
  roomCode,
  players
) {

  return set(

    ref(
      database,
      `${ROOT}/${clean(roomCode)}/players`
    ),

    players

  );

}


/* =========================================================
   SET CONNECTION
========================================================= */

function setConnection(
  roomCode,
  role,
  connected
) {

  return update(

    ref(
      database,
      `${ROOT}/${clean(roomCode)}/connections`
    ),

    {

      [role]: connected

    }

  );

}


/* =========================================================
   LISTEN TO ROOM
========================================================= */

function listenToRoom(
  roomCode,
  callback
) {

  const roomReference =
    ref(

      database,

      `${ROOT}/${clean(roomCode)}`

    );


  return onValue(

    roomReference,

    (snapshot) => {

      if (snapshot.exists()) {

        callback(
          snapshot.val()
        );

      }

      else {

        callback(null);

      }

    },

    (error) => {

      console.error(
        "🔥 FIREBASE LISTENER ERROR:",
        error
      );

    }

  );

}


/* =========================================================
   MARK CONTENT USED
========================================================= */

function markContentUsed(
  roomCode,
  contentType,
  contentId
) {

  return set(

    ref(

      database,

      `${ROOT}/${clean(roomCode)}/usedContent/${contentType}/${contentId}`

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

  const snapshot =
    await get(

      ref(

        database,

        `${ROOT}/${clean(roomCode)}/usedContent/${contentType}`

      )

    );


  if (!snapshot.exists()) {

    return {};

  }


  return snapshot.val();

}


/* =========================================================
   DELETE ROOM
========================================================= */

function deleteRoom(roomCode) {

  return remove(

    ref(

      database,

      `${ROOT}/${clean(roomCode)}`

    )

  );

}


/* =========================================================
   EXPORTS
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
