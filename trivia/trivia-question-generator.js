/* =========================================================
   DIONLYONEE PLAYGROUND
   TRIVIA QUESTION GENERATOR
   ========================================================= */

(function () {
  "use strict";


  /*
  ==========================================================
  SHUFFLE ARRAY
  ==========================================================
  */

  function shuffleArray(array) {

    const shuffled =
      [...array];


    for (
      let i = shuffled.length - 1;
      i > 0;
      i--
    ) {

      const randomIndex =
        Math.floor(
          Math.random() *
          (i + 1)
        );


      [
        shuffled[i],
        shuffled[randomIndex]
      ] =
      [
        shuffled[randomIndex],
        shuffled[i]
      ];

    }


    return shuffled;

  }


  /*
  ==========================================================
  CREATE SESSION TRACKER
  ==========================================================
  */

  function createQuestionTracker() {

    return {

      usedQuestionIds: [],

      totalQuestionsUsed: 0

    };

  }


  /*
  ==========================================================
  NORMALIZE TRACKER
  ==========================================================
  */

  function normalizeTracker(tracker) {

    if (!tracker) {

      return createQuestionTracker();

    }


    if (
      !Array.isArray(
        tracker.usedQuestionIds
      )
    ) {

      tracker.usedQuestionIds = [];

    }


    if (
      typeof tracker.totalQuestionsUsed !==
      "number"
    ) {

      tracker.totalQuestionsUsed =
        tracker.usedQuestionIds.length;

    }


    return tracker;

  }


  /*
  ==========================================================
  GET AVAILABLE QUESTIONS
  ==========================================================
  */

  function getAvailableQuestions(
    options = {},
    tracker = null
  ) {

    tracker =
      normalizeTracker(tracker);


    const category =
      options.category || "all";


    const difficulty =
      options.difficulty || "all";


    let questions =
      TriviaData.getQuestionsByDifficulty(
        difficulty,
        category
      );


    questions =
      questions.filter(
        question =>
          !tracker.usedQuestionIds.includes(
            question.id
          )
      );


    return questions;

  }


  /*
  ==========================================================
  GET RANDOM QUESTION
  ==========================================================
  */

  function getRandomQuestion(
    options = {},
    tracker = null
  ) {

    tracker =
      normalizeTracker(tracker);


    let availableQuestions =
      getAvailableQuestions(
        options,
        tracker
      );


    /*
    If every question has been used,
    return null instead of repeating one.

    This guarantees that questions
    NEVER repeat during the same session.
    */

    if (
      availableQuestions.length === 0
    ) {

      return null;

    }


    availableQuestions =
      shuffleArray(
        availableQuestions
      );


    const question =
      availableQuestions[0];


    return prepareQuestion(question);

  }


  /*
  ==========================================================
  MARK QUESTION AS USED
  ==========================================================
  */

  function markQuestionUsed(
    questionId,
    tracker
  ) {

    tracker =
      normalizeTracker(tracker);


    if (
      !questionId
    ) {

      return tracker;

    }


    if (
      !tracker.usedQuestionIds.includes(
        questionId
      )
    ) {

      tracker.usedQuestionIds.push(
        questionId
      );

      tracker.totalQuestionsUsed++;

    }


    return tracker;

  }


  /*
  ==========================================================
  PREPARE QUESTION
  ==========================================================

  This randomizes the answer positions.

  Example:

  Original:

  A
  B
  C
  D

  Could become:

  C
  A
  D
  B

  The correct answer is still tracked.

  ==========================================================
  */

  function prepareQuestion(question) {

    if (!question) return null;


    const answers =
      shuffleArray(
        question.answers
      );


    const correctIndex =
      answers.indexOf(
        question.correctAnswer
      );


    return {

      ...question,

      answers,

      correctIndex

    };

  }


  /*
  ==========================================================
  GET QUESTION POOL INFORMATION
  ==========================================================
  */

  function getPoolStatus(
    options = {},
    tracker = null
  ) {

    tracker =
      normalizeTracker(tracker);


    const totalQuestions =
      TriviaData
        .getQuestionsByDifficulty(
          options.difficulty || "all",
          options.category || "all"
        );


    const availableQuestions =
      getAvailableQuestions(
        options,
        tracker
      );


    return {

      total:
        totalQuestions.length,

      remaining:
        availableQuestions.length,

      used:
        totalQuestions.length -
        availableQuestions.length

    };

  }


  /*
  ==========================================================
  RESET QUESTION TRACKER
  ==========================================================
  */

  function resetQuestionTracker() {

    return createQuestionTracker();

  }


  /*
  ==========================================================
  EXPORT
  ==========================================================
  */

  window.TriviaQuestionGenerator = {

    shuffleArray,

    createQuestionTracker,

    normalizeTracker,

    getAvailableQuestions,

    getRandomQuestion,

    markQuestionUsed,

    prepareQuestion,

    getPoolStatus,

    resetQuestionTracker

  };

})();