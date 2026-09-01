/* =========================================================
   DIONLYONEE PLAYGROUND
   TRIVIA QUESTIONS — GENERAL KNOWLEDGE
   ========================================================= */

(function () {
  "use strict";

  const GENERAL_QUESTIONS = [

    /* EASY */

    {
      id: "general-easy-001",
      difficulty: "easy",
      question: "How many days are in a week?",
      answers: ["5", "6", "7", "8"],
      correctAnswer: "7"
    },

    {
      id: "general-easy-002",
      difficulty: "easy",
      question: "How many months are in a year?",
      answers: ["10", "11", "12", "13"],
      correctAnswer: "12"
    },

    {
      id: "general-easy-003",
      difficulty: "easy",
      question: "What color do you get when you mix red and blue?",
      answers: ["Green", "Purple", "Orange", "Yellow"],
      correctAnswer: "Purple"
    },

    {
      id: "general-easy-004",
      difficulty: "easy",
      question: "How many hours are in one day?",
      answers: ["12", "18", "24", "48"],
      correctAnswer: "24"
    },

    {
      id: "general-easy-005",
      difficulty: "easy",
      question: "What do bees make?",
      answers: ["Milk", "Honey", "Bread", "Cheese"],
      correctAnswer: "Honey"
    },

    {
      id: "general-easy-006",
      difficulty: "easy",
      question: "Which season comes after spring?",
      answers: ["Winter", "Fall", "Summer", "Spring"],
      correctAnswer: "Summer"
    },

    {
      id: "general-easy-007",
      difficulty: "easy",
      question: "How many sides does a triangle have?",
      answers: ["3", "4", "5", "6"],
      correctAnswer: "3"
    },

    {
      id: "general-easy-008",
      difficulty: "easy",
      question: "What do you use to tell time?",
      answers: ["Clock", "Fork", "Book", "Shoe"],
      correctAnswer: "Clock"
    },

    {
      id: "general-easy-009",
      difficulty: "easy",
      question: "Which meal is usually eaten in the morning?",
      answers: ["Lunch", "Dinner", "Breakfast", "Snack"],
      correctAnswer: "Breakfast"
    },

    {
      id: "general-easy-010",
      difficulty: "easy",
      question: "What color is the sky usually on a clear day?",
      answers: ["Blue", "Purple", "Orange", "Black"],
      correctAnswer: "Blue"
    },

    /* MEDIUM */

    {
      id: "general-medium-001",
      difficulty: "medium",
      question: "How many minutes are in two hours?",
      answers: ["60", "90", "120", "180"],
      correctAnswer: "120"
    },

    {
      id: "general-medium-002",
      difficulty: "medium",
      question: "What is the largest planet in our solar system?",
      answers: ["Earth", "Mars", "Jupiter", "Saturn"],
      correctAnswer: "Jupiter"
    },

    {
      id: "general-medium-003",
      difficulty: "medium",
      question: "What is the fastest land animal?",
      answers: ["Lion", "Cheetah", "Horse", "Tiger"],
      correctAnswer: "Cheetah"
    },

    {
      id: "general-medium-004",
      difficulty: "medium",
      question: "Which shape has four equal sides?",
      answers: ["Triangle", "Rectangle", "Square", "Circle"],
      correctAnswer: "Square"
    },

    {
      id: "general-medium-005",
      difficulty: "medium",
      question: "What is the hardest natural substance?",
      answers: ["Gold", "Diamond", "Iron", "Silver"],
      correctAnswer: "Diamond"
    },

    {
      id: "general-medium-006",
      difficulty: "medium",
      question: "Which sense is used to detect smells?",
      answers: ["Sight", "Hearing", "Smell", "Taste"],
      correctAnswer: "Smell"
    },

    {
      id: "general-medium-007",
      difficulty: "medium",
      question: "How many continents are there?",
      answers: ["5", "6", "7", "8"],
      correctAnswer: "7"
    },

    {
      id: "general-medium-008",
      difficulty: "medium",
      question: "What is the main ingredient in traditional bread?",
      answers: ["Flour", "Cheese", "Chocolate", "Ice"],
      correctAnswer: "Flour"
    },

    /* HARD */

    {
      id: "general-hard-001",
      difficulty: "hard",
      question: "What is the smallest prime number?",
      answers: ["0", "1", "2", "3"],
      correctAnswer: "2"
    },

    {
      id: "general-hard-002",
      difficulty: "hard",
      question: "Which planet is closest to the Sun?",
      answers: ["Venus", "Earth", "Mercury", "Mars"],
      correctAnswer: "Mercury"
    },

    {
      id: "general-hard-003",
      difficulty: "hard",
      question: "How many degrees are in a right angle?",
      answers: ["45", "90", "120", "180"],
      correctAnswer: "90"
    },

    {
      id: "general-hard-004",
      difficulty: "hard",
      question: "What is the currency of Japan?",
      answers: ["Won", "Yen", "Yuan", "Peso"],
      correctAnswer: "Yen"
    },

    {
      id: "general-hard-005",
      difficulty: "hard",
      question: "Which organ filters blood and produces urine?",
      answers: ["Heart", "Lungs", "Kidneys", "Stomach"],
      correctAnswer: "Kidneys"
    }

  ];

  if (
    window.TriviaData &&
    typeof TriviaData.registerQuestions === "function"
  ) {

    TriviaData.registerQuestions(
      "general",
      GENERAL_QUESTIONS
    );

  } else {

    console.error(
      "[General Questions] TriviaData must load first."
    );

  }

})();