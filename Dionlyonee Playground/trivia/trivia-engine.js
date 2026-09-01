/* =========================================================
   DIONLYONEE PLAYGROUND
   TRIVIA GAME ENGINE
   ========================================================= */

import {
  TRIVIA_CATEGORIES,
  TRIVIA_DIFFICULTIES,
  filterTriviaQuestions
} from "./trivia-data.js";


export const TRIVIA_GAME_STATUS = {

  WAITING: "waiting",

  QUESTION: "question",

  ANSWER_REVEAL: "answer_reveal",

  PAUSED: "paused",

  FINISHED: "finished"

};


export function createTriviaGameState() {

  return {

    game: "trivia",

    started: false,

    status: TRIVIA_GAME_STATUS.WAITING,

    round: 0,

    category: "All",

    difficulty: "all",

    timerDuration: 30,

    timerRemaining: 30,

    timerRunning: false,

    timerStartedAt: null,

    currentQuestion: null,

    usedQuestionIds: [],

    winner: null,

    players: [],

    message: "Waiting for the host to begin.",

    createdAt: Date.now(),

    updatedAt: Date.now()

  };

}


/* =========================================================
   QUESTION SELECTION
   ========================================================= */

export function getAvailableQuestions(state) {

  const questions =
    filterTriviaQuestions({

      category: state.category,

      difficulty: state.difficulty

    });


  return questions.filter(
    question =>
      !state.usedQuestionIds.includes(
        question.id
      )
  );

}


export function chooseRandomQuestion(state) {

  const available =
    getAvailableQuestions(state);


  if (!available.length) {

    return {

      success: false,

      question: null,

      message:
        "No unused questions remain for these filters."

    };

  }


  const index =
    Math.floor(
      Math.random() *
      available.length
    );


  return {

    success: true,

    question: available[index],

    message: "Question selected."

  };

}


/* =========================================================
   START NEXT QUESTION
   ========================================================= */

export function startNextQuestion(state) {

  const result =
    chooseRandomQuestion(state);


  if (!result.success) {

    state.status =
      TRIVIA_GAME_STATUS.FINISHED;

    state.message =
      result.message;

    return state;

  }


  const question =
    result.question;


  state.round += 1;

  state.started = true;

  state.status =
    TRIVIA_GAME_STATUS.QUESTION;


  state.currentQuestion = {

    id: question.id,

    category: question.category,

    difficulty: question.difficulty,

    question: question.question,

    options: shuffleArray(
      [...question.options]
    ),

    answer: question.answer,

    explanation: question.explanation

  };


  state.usedQuestionIds.push(
    question.id
  );


  state.timerRemaining =
    state.timerDuration;

  state.timerRunning =
    false;

  state.timerStartedAt =
    null;

  state.winner =
    null;


  state.message =
    "New question ready!";


  state.updatedAt =
    Date.now();


  return state;

}


/* =========================================================
   TIMER
   ========================================================= */

export function startTimer(state) {

  if (
    state.status !==
    TRIVIA_GAME_STATUS.QUESTION
  ) {

    return state;

  }


  state.timerRunning =
    true;


  state.timerStartedAt =
    Date.now();


  state.message =
    "Timer started.";


  state.updatedAt =
    Date.now();


  return state;

}


export function pauseTimer(state) {

  if (!state.timerRunning) {

    return state;

  }


  const elapsedSeconds =
    Math.floor(
      (Date.now() -
        state.timerStartedAt) /
      1000
    );


  state.timerRemaining =
    Math.max(
      0,

      state.timerRemaining -
      elapsedSeconds
    );


  state.timerRunning =
    false;

  state.timerStartedAt =
    null;


  state.message =
    "Timer paused.";


  state.updatedAt =
    Date.now();


  return state;

}


export function getTimerRemaining(state) {

  if (!state.timerRunning) {

    return state.timerRemaining;

  }


  const elapsedSeconds =
    Math.floor(
      (Date.now() -
        state.timerStartedAt) /
      1000
    );


  return Math.max(

    0,

    state.timerRemaining -
    elapsedSeconds

  );

}


/* =========================================================
   ANSWER REVEAL
   ========================================================= */

export function revealAnswer(state) {

  if (!state.currentQuestion) {

    return state;

  }


  pauseTimer(state);


  state.status =
    TRIVIA_GAME_STATUS.ANSWER_REVEAL;


  state.message =
    "Answer revealed!";


  state.updatedAt =
    Date.now();


  return state;

}


/* =========================================================
   WINNER
   ========================================================= */

export function setWinner(
  state,
  winnerName
) {

  state.winner =
    winnerName ||
    "Winner";


  state.message =
    `🏆 ${state.winner} got it first!`;


  state.updatedAt =
    Date.now();


  return state;

}


/* =========================================================
   SKIP QUESTION
   ========================================================= */

export function skipQuestion(state) {

  pauseTimer(state);


  state.status =
    TRIVIA_GAME_STATUS.WAITING;


  state.message =
    "Question skipped.";


  state.updatedAt =
    Date.now();


  return state;

}


/* =========================================================
   RESET SESSION QUESTIONS

   This allows questions to become playable again
   ONLY when the host intentionally resets them.
   ========================================================= */

export function resetUsedQuestions(state) {

  state.usedQuestionIds = [];


  state.message =
    "Question history reset.";


  state.updatedAt =
    Date.now();


  return state;

}


/* =========================================================
   FILTERS
   ========================================================= */

export function setCategory(
  state,
  category
) {

  if (
    category !== "All" &&
    !TRIVIA_CATEGORIES.includes(
      category
    )
  ) {

    return state;

  }


  state.category =
    category;


  state.updatedAt =
    Date.now();


  return state;

}


export function setDifficulty(
  state,
  difficulty
) {

  if (
    difficulty !== "all" &&
    !TRIVIA_DIFFICULTIES.includes(
      difficulty
    )
  ) {

    return state;

  }


  state.difficulty =
    difficulty;


  state.updatedAt =
    Date.now();


  return state;

}


export function setTimerDuration(
  state,
  seconds
) {

  seconds =
    Number(seconds);


  if (
    !Number.isFinite(seconds) ||
    seconds < 5
  ) {

    return state;

  }


  state.timerDuration =
    seconds;


  state.timerRemaining =
    seconds;


  state.updatedAt =
    Date.now();


  return state;

}


/* =========================================================
   UTILITY
   ========================================================= */

export function shuffleArray(array) {

  const copy =
    [...array];


  for (
    let i =
      copy.length - 1;

    i > 0;

    i--
  ) {

    const j =
      Math.floor(
        Math.random() *
        (i + 1)
      );


    [
      copy[i],
      copy[j]

    ] = [

      copy[j],
      copy[i]

    ];

  }


  return copy;

}


export function getGameSummary(state) {

  return {

    round:
      state.round,

    questionsUsed:
      state.usedQuestionIds.length,

    category:
      state.category,

    difficulty:
      state.difficulty,

    status:
      state.status,

    timer:
      getTimerRemaining(state)

  };

}