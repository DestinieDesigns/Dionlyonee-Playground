javascript
/* =========================================================
   DIONLYONEE PLAYGROUND
   GAME LAUNCHER
   ========================================================= */

import {
  GAMES
} from "./games-data.js";

import {
  createHostRoom,
  checkHostPassword
} from "../shared/room-ui.js";


/* =========================================================
   DOM ELEMENTS
   ========================================================= */

const gameGrid = document.getElementById("game-grid");

const hostPassword = document.getElementById("host-password");

const passwordButton = document.getElementById("unlock-host");

const hostStatus = document.getElementById("host-status");

const roomModal = document.getElementById("room-modal");

const roomCodeDisplay = document.getElementById("created-room-code");

const selectedGameName = document.getElementById("selected-game-name");

const launchHostButton = document.getElementById("launch-host");

const copyRoomButton = document.getElementById("copy-room-code");

const closeRoomButton = document.getElementById("close-room-modal");


/* =========================================================
   STATE
   ========================================================= */

let hostUnlocked = false;

let selectedGame = null;

let createdRoomCode = null;


/* =========================================================
   RENDER GAMES
   ========================================================= */

function renderGames() {

  if (!gameGrid) {
    console.error("[Game Launcher] #game-grid was not found.");
    return;
  }

  gameGrid.innerHTML = "";

  GAMES.forEach((game) => {

    const card = document.createElement("button");

    card.type = "button";

    card.className = "game-card";

    if (game.status === "coming-soon") {
      card.classList.add("coming-soon");
    }

    card.innerHTML = `
      <div class="game-card-top">

        <div class="game-icon">
          ${game.icon}
        </div>

        <span class="game-status ${game.status}">
          ${formatStatus(game.status)}
        </span>

      </div>

      <h2>${game.title}</h2>

      <p>${game.description}</p>

      <div class="game-card-action">
        ${
          game.status === "coming-soon"
            ? "COMING SOON"
            : hostUnlocked
              ? "CREATE GAME ROOM"
              : "UNLOCK HOST TO PLAY"
        }
      </div>
    `;

    card.addEventListener("click", () => {
      selectGame(game);
    });

    gameGrid.appendChild(card);

  });

}


/* =========================================================
   FORMAT STATUS
   ========================================================= */

function formatStatus(status) {

  const labels = {

    ready: "READY",

    beta: "BETA",

    "coming-soon": "COMING SOON"

  };

  return labels[status] || String(status).toUpperCase();

}


/* =========================================================
   UNLOCK HOST
   ========================================================= */

function unlockHost() {

  const password = hostPassword.value.trim();

  if (checkHostPassword(password)) {

    hostUnlocked = true;

    hostStatus.textContent =
      "👑 HOST ACCESS UNLOCKED";

    hostStatus.className =
      "host-status success";

    hostPassword.value = "";

    document.body.classList.add(
      "host-unlocked"
    );

    renderGames();

  } else {

    hostUnlocked = false;

    hostStatus.textContent =
      "❌ INCORRECT HOST CODE";

    hostStatus.className =
      "host-status error";

    hostPassword.value = "";

  }

}


/* =========================================================
   SELECT GAME
   ========================================================= */

async function selectGame(game) {

  if (game.status === "coming-soon") {

    alert(
      `${game.title} is coming soon!`
    );

    return;

  }


  if (!hostUnlocked) {

    hostStatus.textContent =
      "🔒 ENTER THE HOST CODE FIRST";

    hostStatus.className =
      "host-status error";

    const hostAccess =
      document.getElementById("host-access");

    if (hostAccess) {

      hostAccess.scrollIntoView({
        behavior: "smooth",
        block: "center"
      });

    }

    return;

  }


  selectedGame = game;


  try {

    hostStatus.textContent =
      `🎮 Creating ${game.title} room...`;

    hostStatus.className =
      "host-status waiting";


    const roomCode =
      await createHostRoom(
        game.id,
        "Brown123"
      );


    createdRoomCode = roomCode;


    hostStatus.textContent =
      "👑 HOST ACCESS UNLOCKED";

    hostStatus.className =
      "host-status success";


    openRoomModal();

  } catch (error) {

    console.error(
      "[Game Launcher] Room creation failed:",
      error
    );

    hostStatus.textContent =
      "❌ Could not create room. Check Firebase.";

    hostStatus.className =
      "host-status error";

  }

}


/* =========================================================
   OPEN ROOM MODAL
   ========================================================= */

function openRoomModal() {

  if (
    !selectedGame ||
    !createdRoomCode
  ) {
    return;
  }


  selectedGameName.textContent =
    selectedGame.title;

  roomCodeDisplay.textContent =
    createdRoomCode;


  roomModal.classList.remove(
    "hidden"
  );

  document.body.classList.add(
    "modal-open"
  );

}


/* =========================================================
   CLOSE ROOM MODAL
   ========================================================= */

function closeRoomModal() {

  roomModal.classList.add(
    "hidden"
  );

  document.body.classList.remove(
    "modal-open"
  );

}


/* =========================================================
   COPY ROOM CODE
   ========================================================= */

async function copyRoomCode() {

  if (!createdRoomCode) {
    return;
  }


  try {

    await navigator.clipboard.writeText(
      createdRoomCode
    );


    copyRoomButton.textContent =
      "✓ COPIED!";


    setTimeout(() => {

      copyRoomButton.textContent =
        "COPY ROOM CODE";

    }, 2000);

  } catch (error) {

    console.error(
      "[Game Launcher] Could not copy room code:",
      error
    );

    copyRoomButton.textContent =
      "COPY FAILED";

  }

}


/* =========================================================
   LAUNCH HOST GAME
   ========================================================= */

function launchHostGame() {

  if (
    !selectedGame ||
    !createdRoomCode
  ) {
    return;
  }


  const url =
    `${selectedGame.hostPage}?room=${encodeURIComponent(
      createdRoomCode
    )}`;


  window.location.href = url;

}


/* =========================================================
   EVENT LISTENERS
   ========================================================= */

if (passwordButton) {

  passwordButton.addEventListener(
    "click",
    unlockHost
  );

}


if (hostPassword) {

  hostPassword.addEventListener(
    "keydown",
    (event) => {

      if (event.key === "Enter") {

        event.preventDefault();

        unlockHost();

      }

    }
  );

}


if (copyRoomButton) {

  copyRoomButton.addEventListener(
    "click",
    copyRoomCode
  );

}


if (launchHostButton) {

  launchHostButton.addEventListener(
    "click",
    launchHostGame
  );

}


if (closeRoomButton) {

  closeRoomButton.addEventListener(
    "click",
    closeRoomModal
  );

}


if (roomModal) {

  roomModal.addEventListener(
    "click",
    (event) => {

      if (event.target === roomModal) {

        closeRoomModal();

      }

    }
  );

}


/* =========================================================
   START GAME LAUNCHER
   ========================================================= */

renderGames();