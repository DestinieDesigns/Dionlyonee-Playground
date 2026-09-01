/* =========================================================
   DIONLYONEE PLAYGROUND
   GAME SESSION MANAGER
   ========================================================= */


/* =========================================================
   STORAGE KEYS
   ========================================================= */

const SESSION_KEY =
  "DIONLYONEE_PLAYGROUND_SESSION";


/* =========================================================
   CREATE SESSION
   ========================================================= */

function createSession(
  roomCode,
  role,
  gameId
) {

  const session = {

    roomCode:
      String(roomCode || "")
        .trim()
        .toUpperCase(),

    role:
      role,

    gameId:
      gameId,

    connectedAt:
      Date.now()

  };


  localStorage.setItem(

    SESSION_KEY,

    JSON.stringify(session)

  );


  return session;

}


/* =========================================================
   GET SESSION
   ========================================================= */

function getSession() {

  const saved =
    localStorage.getItem(
      SESSION_KEY
    );


  if (!saved) {

    return null;

  }


  try {

    return JSON.parse(saved);

  }

  catch (error) {

    console.error(
      "Could not read Dionlyonee session:",
      error
    );

    return null;

  }

}


/* =========================================================
   CHECK SESSION
   ========================================================= */

function hasSession() {

  return getSession() !== null;

}


/* =========================================================
   GET ROOM CODE
   ========================================================= */

function getRoomCode() {

  const session =
    getSession();


  return session
    ? session.roomCode
    : null;

}


/* =========================================================
   GET ROLE
   ========================================================= */

function getRole() {

  const session =
    getSession();


  return session
    ? session.role
    : null;

}


/* =========================================================
   GET GAME ID
   ========================================================= */

function getGameId() {

  const session =
    getSession();


  return session
    ? session.gameId
    : null;

}


/* =========================================================
   CHECK USER ROLE
   ========================================================= */

function isHost() {

  return getRole() === "host";

}


function isCohost() {

  return getRole() === "cohost";

}


function isLive() {

  return getRole() === "live";

}


/* =========================================================
   CLEAR SESSION
   ========================================================= */

function clearSession() {

  localStorage.removeItem(
    SESSION_KEY
  );

}


/* =========================================================
   EXPORT
   ========================================================= */

export {

  createSession,

  getSession,

  hasSession,

  getRoomCode,

  getRole,

  getGameId,

  isHost,

  isCohost,

  isLive,

  clearSession

};