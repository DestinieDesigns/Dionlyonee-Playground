/* =========================================================
   DIONLYONEE PLAYGROUND
   TRIVIA HOST CONTROLLER
   ========================================================= */

import {

  createTriviaGameState,

  startNextQuestion,

  startTimer,

  pauseTimer,

  revealAnswer,

  skipQuestion,

  setWinner,

  setCategory,

  setDifficulty,

  setTimerDuration,

  getTimerRemaining

} from "./trivia-engine.js";


/* =========================================================
   FIREBASE

   Adjust imports if your shared firebase-room.js
   uses different export names.
   ========================================================= */

import {

  createRoom,

  updateRoomGame,

  subscribeToRoom

} from "../shared/firebase-room.js";


const HOST_CODE =
"Brown123";


let roomCode =
null;


let gameState =
createTriviaGameState();


let unsubscribe =
null;


/* =========================================================
   ELEMENTS
   ========================================================= */

const loginPanel =
document.getElementById(
"host-login"
);

const gamePanel =
document.getElementById(
"host-game"
);

const passwordInput =
document.getElementById(
"host-code"
);

const unlockButton =
document.getElementById(
"unlock-host"
);


const createRoomButton =
document.getElementById(
"create-room"
);

const roomCodeDisplay =
document.getElementById(
"room-code-display"
);


const categorySelect =
document.getElementById(
"trivia-category"
);

const difficultySelect =
document.getElementById(
"trivia-difficulty"
);

const timerSelect =
document.getElementById(
"timer-duration"
);


const nextQuestionButton =
document.getElementById(
"next-question"
);

const startTimerButton =
document.getElementById(
"start-timer"
);

const pauseTimerButton =
document.getElementById(
"pause-timer"
);

const revealAnswerButton =
document.getElementById(
"reveal-answer"
);

const skipButton =
document.getElementById(
"skip-question"
);


const winnerInput =
document.getElementById(
"winner-name"
);

const announceWinnerButton =
document.getElementById(
"announce-winner"
);


const roundDisplay =
document.getElementById(
"host-round"
);

const timerDisplay =
document.getElementById(
"host-timer"
);

const categoryDisplay =
document.getElementById(
"host-category-display"
);

const difficultyDisplay =
document.getElementById(
"host-difficulty-display"
);

const questionDisplay =
document.getElementById(
"host-question"
);

const optionsDisplay =
document.getElementById(
"host-options"
);

const answerDisplay =
document.getElementById(
"host-answer"
);

const messageDisplay =
document.getElementById(
"host-message"
);


/* =========================================================
   HOST LOGIN
   ========================================================= */

function unlockHost() {

  if (
    passwordInput.value !==
    HOST_CODE
  ) {

    alert(
      "Incorrect host code."
    );

    return;

  }


  loginPanel.hidden =
    true;


  gamePanel.hidden =
    false;

}


unlockButton?.addEventListener(
"click",
unlockHost
);


/* =========================================================
   CREATE ROOM
   ========================================================= */

async function createTriviaRoom() {

  try {

    const room =
      await createRoom({
        game: "trivia"
      });


    roomCode =
      room.roomCode ||
      room.code;


    gameState =
      createTriviaGameState();


    await saveGame();


    roomCodeDisplay.textContent =
      roomCode;


    listenToRoom();


  } catch (error) {

    console.error(error);


    alert(
      "Could not create room."
    );

  }

}


createRoomButton?.addEventListener(
"click",
createTriviaRoom
);


/* =========================================================
   SAVE GAME
   ========================================================= */

async function saveGame() {

  if (!roomCode) return;


  gameState.updatedAt =
    Date.now();


  await updateRoomGame(
    roomCode,
    gameState
  );

}


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
   START NEXT QUESTION
   ========================================================= */

async function nextQuestion() {

  startNextQuestion(
    gameState
  );


  await saveGame();


  render();

}


nextQuestionButton?.addEventListener(
"click",
nextQuestion
);


/* =========================================================
   TIMER CONTROLS
   ========================================================= */

async function beginTimer() {

  startTimer(
    gameState
  );


  await saveGame();


  render();

}


startTimerButton?.addEventListener(
"click",
beginTimer
);


async function stopTimer() {

  pauseTimer(
    gameState
  );


  await saveGame();


  render();

}


pauseTimerButton?.addEventListener(
"click",
stopTimer
);


/* =========================================================
   REVEAL ANSWER
   ========================================================= */

async function showAnswer() {

  revealAnswer(
    gameState
  );


  await saveGame();


  render();

}


revealAnswerButton?.addEventListener(
"click",
showAnswer
);


/* =========================================================
   SKIP QUESTION
   ========================================================= */

async function skipCurrentQuestion() {

  skipQuestion(
    gameState
  );


  await saveGame();


  render();

}


skipButton?.addEventListener(
"click",
skipCurrentQuestion
);


/* =========================================================
   WINNER
   ========================================================= */

async function announceWinner() {

  const name =
    winnerInput.value.trim();


  if (!name) {

    alert(
      "Enter the winner's name."
    );

    return;

  }


  setWinner(
    gameState,
    name
  );


  await saveGame();


  render();

}


announceWinnerButton?.addEventListener(
"click",
announceWinner
);


/* =========================================================
   FILTERS
   ========================================================= */

categorySelect?.addEventListener(
"change",

async () => {

  setCategory(
    gameState,
    categorySelect.value
  );


  await saveGame();

  render();

}
);


difficultySelect?.addEventListener(
"change",

async () => {

  setDifficulty(
    gameState,
    difficultySelect.value
  );


  await saveGame();

  render();

}
);


timerSelect?.addEventListener(
"change",

async () => {

  setTimerDuration(
    gameState,
    timerSelect.value
  );


  await saveGame();

  render();

}
);


/* =========================================================
   RENDER
   ========================================================= */

function render() {

  roundDisplay.textContent =
    gameState.round;


  timerDisplay.textContent =
    `${getTimerRemaining(
      gameState
    )}s`;


  categoryDisplay.textContent =
    gameState.category;


  difficultyDisplay.textContent =
    gameState.difficulty.toUpperCase();


  messageDisplay.textContent =
    gameState.message;


  if (
    !gameState.currentQuestion
  ) {

    questionDisplay.textContent =
      "Waiting for the next question...";


    optionsDisplay.innerHTML =
      "";


    answerDisplay.textContent =
      "Answer hidden";


    return;

  }


  const question =
    gameState.currentQuestion;


  questionDisplay.textContent =
    question.question;


  optionsDisplay.innerHTML =
    "";


  question.options.forEach(
    option => {

      const item =
        document.createElement(
          "div"
        );


      item.className =
        "host-option";


      item.textContent =
        option;


      optionsDisplay.appendChild(
        item
      );

    }
  );


  answerDisplay.textContent =

    gameState.status ===
    "answer_reveal"

      ? `ANSWER: ${question.answer}`

      : "ANSWER HIDDEN";

}


/* =========================================================
   LIVE TIMER DISPLAY
   ========================================================= */

setInterval(

  () => {

    if (
      gameState.timerRunning
    ) {

      render();

    }

  },

  250

);