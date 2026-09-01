/* =========================================================
   DIONLYONEE PLAYGROUND
   TRIVIA QUESTION DATABASE
   ========================================================= */

(function () {
  "use strict";

  /*
  ==========================================================
  CATEGORY INFORMATION
  ==========================================================
  */

  const TRIVIA_CATEGORIES = {

    education: {
      id: "education",
      name: "Education",
      icon: "📚",
      description: "Math, English, reading, and school knowledge."
    },

    entertainment: {
      id: "entertainment",
      name: "Entertainment",
      icon: "🎬",
      description: "Movies, television, music, and entertainment."
    },

    general: {
      id: "general",
      name: "General Knowledge",
      icon: "🧠",
      description: "A mixture of fun general knowledge questions."
    },

    history: {
      id: "history",
      name: "History",
      icon: "🏛️",
      description: "American and world history."
    },

    science: {
      id: "science",
      name: "Science",
      icon: "🔬",
      description: "Biology, chemistry, space, and more."
    },

    geography: {
      id: "geography",
      name: "Geography",
      icon: "🌎",
      description: "Countries, continents, landmarks, and Earth."
    },

    sports: {
      id: "sports",
      name: "Sports",
      icon: "🏆",
      description: "Sports, athletes, and sporting history."
    },

    popCulture: {
      id: "pop-culture",
      name: "Pop Culture",
      icon: "🔥",
      description: "Celebrities, internet culture, gaming, and trends."
    },

    animalsNature: {
      id: "animals-nature",
      name: "Animals & Nature",
      icon: "🦁",
      description: "Animals, wildlife, plants, and nature."
    }

  };


  /*
  ==========================================================
  DIFFICULTY LEVELS
  ==========================================================
  */

  const TRIVIA_DIFFICULTIES = {

    easy: {
      id: "easy",
      name: "Easy",
      points: 100
    },

    medium: {
      id: "medium",
      name: "Medium",
      points: 200
    },

    hard: {
      id: "hard",
      name: "Hard",
      points: 300
    }

  };


  /*
  ==========================================================
  QUESTION STORAGE
  ==========================================================

  Every category file will register its questions here.

  Example:

  TriviaData.registerQuestions("education", [
    {
      id: "education-math-001",
      category: "education",
      difficulty: "easy",
      question: "What is 2 + 2?",
      answers: ["3", "4", "5", "6"],
      correctAnswer: "4"
    }
  ]);

  ==========================================================
  */

  const questionDatabase = {};


  /*
  ==========================================================
  CREATE EMPTY CATEGORY ARRAYS
  ==========================================================
  */

  Object.values(TRIVIA_CATEGORIES).forEach(category => {

    questionDatabase[category.id] = [];

  });


  /*
  ==========================================================
  REGISTER QUESTIONS
  ==========================================================
  */

  function registerQuestions(categoryId, questions) {

    if (!questionDatabase[categoryId]) {

      console.warn(
        `[TriviaData] Unknown category: ${categoryId}`
      );

      questionDatabase[categoryId] = [];

    }


    if (!Array.isArray(questions)) {

      console.error(
        "[TriviaData] Questions must be an array."
      );

      return;

    }


    questions.forEach(question => {

      if (!question || !question.id) {

        console.warn(
          "[TriviaData] Skipping invalid question.",
          question
        );

        return;

      }


      const alreadyExists =
        questionDatabase[categoryId]
          .some(
            existing =>
              existing.id === question.id
          );


      if (!alreadyExists) {

        questionDatabase[categoryId].push({
          ...question,
          category: categoryId
        });

      }

    });

  }


  /*
  ==========================================================
  GET ALL QUESTIONS
  ==========================================================
  */

  function getAllQuestions() {

    return Object.values(questionDatabase)
      .flat();

  }


  /*
  ==========================================================
  GET QUESTIONS BY CATEGORY
  ==========================================================
  */

  function getQuestionsByCategory(categoryId) {

    if (!categoryId || categoryId === "all") {

      return getAllQuestions();

    }


    return [
      ...(questionDatabase[categoryId] || [])
    ];

  }


  /*
  ==========================================================
  GET QUESTIONS BY DIFFICULTY
  ==========================================================
  */

  function getQuestionsByDifficulty(
    difficulty,
    categoryId = "all"
  ) {

    const questions =
      getQuestionsByCategory(categoryId);


    if (
      !difficulty ||
      difficulty === "all"
    ) {

      return questions;

    }


    return questions.filter(
      question =>
        question.difficulty === difficulty
    );

  }


  /*
  ==========================================================
  GET QUESTION BY ID
  ==========================================================
  */

  function getQuestionById(questionId) {

    if (!questionId) return null;


    return (
      getAllQuestions()
        .find(
          question =>
            question.id === questionId
        )
      || null
    );

  }


  /*
  ==========================================================
  GET CATEGORY INFORMATION
  ==========================================================
  */

  function getCategories() {

    return Object.values(
      TRIVIA_CATEGORIES
    );

  }


  function getCategory(categoryId) {

    return Object.values(
      TRIVIA_CATEGORIES
    ).find(
      category =>
        category.id === categoryId
    ) || null;

  }


  /*
  ==========================================================
  GET DIFFICULTIES
  ==========================================================
  */

  function getDifficulties() {

    return Object.values(
      TRIVIA_DIFFICULTIES
    );

  }


  /*
  ==========================================================
  QUESTION COUNT
  ==========================================================
  */

  function getQuestionCount(
    categoryId = "all"
  ) {

    return getQuestionsByCategory(
      categoryId
    ).length;

  }


  /*
  ==========================================================
  EXPORT
  ==========================================================
  */

  window.TriviaData = {

    categories:
      TRIVIA_CATEGORIES,

    difficulties:
      TRIVIA_DIFFICULTIES,

    registerQuestions,

    getAllQuestions,

    getQuestionsByCategory,

    getQuestionsByDifficulty,

    getQuestionById,

    getCategories,

    getCategory,

    getDifficulties,

    getQuestionCount

  };

})();