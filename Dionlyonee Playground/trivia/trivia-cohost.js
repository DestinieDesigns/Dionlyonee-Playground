/* =========================================================
   DIONLYONEE PLAYGROUND
   TRIVIA COHOST CONTROLLER
   ========================================================= */

import {

  startTimer,

  pauseTimer,

  revealAnswer,

  skipQuestion,

  setWinner,

  getTimerRemaining

} from "./trivia-engine.js";


import {

  joinRoom,

  updateRoomGame,

  subscribeToRoom

} from "../shared/firebase-room.js";


let roomCode =
null;


let gameState =
null;


let unsubscribe =
null;


/* =========================================================
   ELEMENTS
   ========================================================= */

const joinPanel =
document.getElementById(
"cohost-join-panel"
);

const gamePanel =
document.getElementById(
"cohost-game-panel"
);


const roomInput =
document.getElementById(
"room-code-input"
);

const joinButton =
document.getElementById(
"join-room"
);


const timerDisplay =
document.getElementById(
"cohost-timer"
);

const questionDisplay =
document.getElementById(
"cohost-question"
);

const answerDisplay =
document.getElementById(
"cohost-answer"
);

const statusDisplay =
document.getElementById(
"cohost-status"
);

const roundDisplay =
document.getElementById(
"cohost-round"
);


const startButton =
document.getElementById(
"cohost-start-timer"
);

const pauseButton =
document.getElementById(
"cohost-pause-timer"
);

const revealButton =
document.getElementById(
"cohost-reveal-answer"
);

const skipButton =
document.getElementById(
"cohost-skip"
);


const winnerInput =
document.getElementById(
"cohost-winner-name"
);

const winnerButton =
document.getElementById(
"cohost-announce-winner"
);


/* =========================================================
   JOIN ROOM
   ========================================================= */

async function joinTriviaRoom() {

  const code =
    roomInput.value
      .trim()
      .toUpperCase();


  if (!code) {

    alert(
      "Enter a room code."
    );

    return;

  }


  try {

    const room =
      await joinRoom(
        code,
        "cohost"
      );


    roomCode =
      code;


    gameState =
      room.gameState;


    joinPanel.hidden =
      true;


    gamePanel.hidden =
      false;


    listenToRoom();


  } catch (error) {

    console.error(error);


    alert(
      "Could not join this room."
    );

  }

}


joinButton?.addEventListener(
"click",
joinTriviaRoom
);


/* =========================================================
   ROOM LISTENER
   ========================================================= */

function listenToRoom() {

  if (unsubscribe) {

    unsubscribe();

  }


  unsubscribe =
    subscribeToRoom(

      roomCode,

      room => {

        if (
          room?.gameState
        ) {

          gameState =
            room.gameState;


          render();

        }

      }

    );

}


/* =========================================================
   SAVE
   ========================================================= */

async function save() {

  if (
    !roomCode ||
    !gameState
  ) return;


  await updateRoomGame(
    roomCode,
    gameState
  );

}


/* =========================================================
   CONTROLS
   ========================================================= */

startButton?.addEventListener(

  "click",

  async () => {

    startTimer(
      gameState
    );


    await save();

  }

);


pauseButton?.addEventListener(

  "click",

  async () => {

    pauseTimer(
      gameState
    );


    await save();

  }

);


revealButton?.addEventListener(

  "click",

  async () => {

    revealAnswer(
      gameState
    );


    await save();

  }

);


skipButton?.addEventListener(

  "click",

  async () => {

    skipQuestion(
      gameState
    );


    await save();

  }

);


winnerButton?.addEventListener(

  "click",

  async () => {

    const name =
      winnerInput.value.trim();


    if (!name) return;


    setWinner(
      gameState,
      name
    );


    await save();

  }

);


/* =========================================================
   RENDER
   ========================================================= */

function render() {

  if (!gameState) return;


  roundDisplay.textContent =
    gameState.round;


  timerDisplay.textContent =
    `${getTimerRemaining(
      gameState
    )}s`;


  statusDisplay.textContent =
    gameState.message;


  if (
    !gameState.currentQuestion
  ) {

    questionDisplay.textContent =
      "Waiting for the host...";


    answerDisplay.textContent =
      "Answer hidden";


    return;

  }


  questionDisplay.textContent =
    gameState.currentQuestion.question;


  answerDisplay.textContent =

    gameState.status ===
    "answer_reveal"

      ? gameState.currentQuestion.answer

      : "Answer hidden";

}


setInterval(

  () => {

    if (
      gameState?.timerRunning
    ) {

      render();

    }

  },

  250

);