/* =========================================================
   DIONLYONEE PLAYGROUND
   ROOM USER INTERFACE HELPERS
   ========================================================= */

import {
  createRoom,
  roomExists,
  getRoom,
  setConnection
} from "./firebase-room.js";

import {
  createSession
} from "./game-session.js";


/* =========================================================
   HOST PASSWORD
   ========================================================= */

const HOST_PASSWORD = "Brown123";


/* =========================================================
   CHECK HOST PASSWORD
   ========================================================= */

function checkHostPassword(password) {

  return password === HOST_PASSWORD;

}


/* =========================================================
   CREATE HOST ROOM
   ========================================================= */

async function createHostRoom(gameId, password) {

  /* Check password */

  if (!checkHostPassword(password)) {

    throw new Error(
      "Incorrect host password."
    );

  }


  /* Create Firebase room */

  const roomCode = await createRoom(gameId);


  /* Save browser session */

  createSession(
    roomCode,
    "host",
    gameId
  );


  /* Mark host connected */

  await setConnection(
    roomCode,
    "host",
    true
  );


  return roomCode;

}


/* =========================================================
   JOIN ROOM AS COHOST
   ========================================================= */

async function joinAsCohost(roomCode) {

  const cleanCode =
    String(roomCode || "")
      .trim()
      .toUpperCase();


  if (!cleanCode) {

    throw new Error(
      "Please enter a room code."
    );

  }


  const exists =
    await roomExists(cleanCode);


  if (!exists) {

    throw new Error(
      "Room not found."
    );

  }


  const room =
    await getRoom(cleanCode);


  if (!room || !room.roomInfo) {

    throw new Error(
      "Room data could not be loaded."
    );

  }


  /* Save session */

  createSession(
    cleanCode,
    "cohost",
    room.roomInfo.game
  );


  /* Mark connected */

  await setConnection(
    cleanCode,
    "cohost",
    true
  );


  return room;

}


/* =========================================================
   JOIN ROOM AS LIVE SCREEN
   ========================================================= */

async function joinAsLive(roomCode) {

  const cleanCode =
    String(roomCode || "")
      .trim()
      .toUpperCase();


  if (!cleanCode) {

    throw new Error(
      "Please enter a room code."
    );

  }


  const exists =
    await roomExists(cleanCode);


  if (!exists) {

    throw new Error(
      "Room not found."
    );

  }


  const room =
    await getRoom(cleanCode);


  if (!room || !room.roomInfo) {

    throw new Error(
      "Room data could not be loaded."
    );

  }


  /* Save session */

  createSession(
    cleanCode,
    "live",
    room.roomInfo.game
  );


  /* Mark connected */

  await setConnection(
    cleanCode,
    "live",
    true
  );


  return room;

}


/* =========================================================
   DISPLAY ROOM CODE
   ========================================================= */

function displayRoomCode(element, roomCode) {

  if (!element) return;

  element.textContent =
    String(roomCode || "")
      .trim()
      .toUpperCase();

}


/* =========================================================
   COPY ROOM CODE
   ========================================================= */

async function copyRoomCode(roomCode) {

  const cleanCode =
    String(roomCode || "")
      .trim()
      .toUpperCase();


  if (!cleanCode) {

    return false;

  }


  try {

    await navigator.clipboard.writeText(
      cleanCode
    );

    return true;

  }

  catch (error) {

    console.error(
      "Could not copy room code:",
      error
    );

    return false;

  }

}


/* =========================================================
   EXPORT
   ========================================================= */

export {

  HOST_PASSWORD,

  checkHostPassword,

  createHostRoom,

  joinAsCohost,

  joinAsLive,

  displayRoomCode,

  copyRoomCode

};