/* =========================================================
   DIONLYONEE PLAYGROUND
   GAME LAUNCHER
========================================================= */

import {
  GAMES
} from "./games-data.js";

import {
  createHostRoom
} from "../shared/room-ui.js";


/* =========================================================
   CONSTANTS
========================================================= */

const HOST_PASSWORD = "Brown123";


/* =========================================================
   DOM HELPER
========================================================= */

const $ = (id) =>
  document.getElementById(id);


/* =========================================================
   STATE
========================================================= */

let hostUnlocked = false;

let selectedGame = null;

let createdRoomCode = null;


/* =========================================================
   RENDER GAME CARDS
========================================================= */

function renderGames() {

  const gameGrid = $("game-grid");

  if (!gameGrid) {

    console.error(
      "Game grid not found."
    );

    return;

  }


  gameGrid.innerHTML = "";


  GAMES.forEach((game) => {

    const card =
      document.createElement("button");


    card.type = "button";


    card.className =
      "game-card";


    card.innerHTML = `

      <div class="game-card-top">

        <div class="game-icon">
          ${game.icon}
        </div>

        <span class="game-status ${game.status}">
          ${formatStatus(game.status)}
        </span>

      </div>


      <h2>
        ${game.title}
      </h2>


      <p>
        ${game.description}
      </p>


      <div class="game-card-action">

        ${
          game.status === "coming-soon"
            ? "COMING SOON"
            : "SELECT GAME"
        }

      </div>

    `;


    card.addEventListener(
      "click",
      () => selectGame(game)
    );


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


  return (
    labels[status] ||
    status.toUpperCase()
  );

}


/* =========================================================
   UNLOCK HOST
========================================================= */

function unlockHost() {

  const password =
    $("host-password").value.trim();


  if (password === HOST_PASSWORD) {

    hostUnlocked = true;


    $("host-status").textContent =
      "👑 HOST ACCESS UNLOCKED";


    $("host-status").className =
      "host-status success";


    $("host-password").value = "";


  } else {

    hostUnlocked = false;


    $("host-status").textContent =
      "❌ INCORRECT HOST CODE";


    $("host-status").className =
      "host-status error";

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

    $("host-status").textContent =
      "🔒 ENTER THE HOST CODE FIRST";


    $("host-status").className =
      "host-status error";


    $("host-access").scrollIntoView({

      behavior: "smooth",

      block: "center"

    });


    return;

  }


  selectedGame = game;


  try {

    $("host-status").textContent =
      `🎮 Creating ${game.title} room...`;


    $("host-status").className =
      "host-status waiting";


    /* Create Firebase Room */

    const roomCode =
      await createHostRoom(
        game.id,
        HOST_PASSWORD
      );


    createdRoomCode =
      roomCode;


    /* Display Room Modal */

    $("selected-game-name").textContent =
      game.title;


    $("created-room-code").textContent =
      roomCode;


    $("room-modal").classList.remove(
      "hidden"
    );


    /* Restore Host Status */

    $("host-status").textContent =
      "👑 HOST ACCESS UNLOCKED";


    $("host-status").className =
      "host-status success";

  }


  catch (error) {

    console.error(
      "ROOM CREATION ERROR:",
      error
    );


    $("host-status").textContent =
      "❌ ROOM CREATION FAILED";


    $("host-status").className =
      "host-status error";


    alert(
      "Could not create the room. Check the browser Console for the exact Firebase error."
    );

  }

}


/* =========================================================
   CLOSE ROOM MODAL
========================================================= */

function closeRoomModal() {

  $("room-modal").classList.add(
    "hidden"
  );

}


/* =========================================================
   COPY ROOM CODE
========================================================= */

async function copyRoomCode() {

  if (!createdRoomCode) return;


  try {

    await navigator.clipboard.writeText(
      createdRoomCode
    );


    $("copy-room-code").textContent =
      "✓ COPIED!";


    setTimeout(() => {

      $("copy-room-code").textContent =
        "COPY ROOM CODE";

    }, 2000);

  }


  catch (error) {

    console.error(
      "COPY ERROR:",
      error
    );

  }

}


/* =========================================================
   OPEN HOST GAME
========================================================= */

function launchHostGame() {

  if (
    !selectedGame ||
    !createdRoomCode
  ) {

    return;

  }


  const url =
    `${selectedGame.hostPage}` +
    `?room=${encodeURIComponent(createdRoomCode)}`;


  /* OPEN GAME IN NEW TAB */

  window.open(
    url,
    "_blank"
  );

}


/* =========================================================
   EVENT LISTENERS
========================================================= */

$("unlock-host").addEventListener(
  "click",
  unlockHost
);


$("host-password").addEventListener(
  "keydown",
  (event) => {

    if (event.key === "Enter") {

      unlockHost();

    }

  }
);


$("close-room-modal").addEventListener(
  "click",
  closeRoomModal
);


$("copy-room-code").addEventListener(
  "click",
  copyRoomCode
);


$("launch-host").addEventListener(
  "click",
  launchHostGame
);


$("room-modal").addEventListener(
  "click",
  (event) => {

    if (event.target === $("room-modal")) {

      closeRoomModal();

    }

  }
);


/* =========================================================
   START
========================================================= */

renderGames();
