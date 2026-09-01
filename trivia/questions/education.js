/* =========================================================
   DIONLYONEE PLAYGROUND
   TRIVIA QUESTIONS
   EDUCATION CATEGORY
   ========================================================= */

(function () {
  "use strict";


  const EDUCATION_QUESTIONS = [

    /* =====================================================
       MATH — EASY
       ===================================================== */

    {
      id: "edu-math-easy-001",
      difficulty: "easy",
      question: "What is 2 + 2?",
      answers: ["3", "4", "5", "6"],
      correctAnswer: "4"
    },

    {
      id: "edu-math-easy-002",
      difficulty: "easy",
      question: "What is 10 - 3?",
      answers: ["6", "7", "8", "9"],
      correctAnswer: "7"
    },

    {
      id: "edu-math-easy-003",
      difficulty: "easy",
      question: "What is 5 × 5?",
      answers: ["10", "20", "25", "30"],
      correctAnswer: "25"
    },

    {
      id: "edu-math-easy-004",
      difficulty: "easy",
      question: "What is 20 ÷ 4?",
      answers: ["4", "5", "6", "8"],
      correctAnswer: "5"
    },

    {
      id: "edu-math-easy-005",
      difficulty: "easy",
      question: "What is 100 + 50?",
      answers: ["120", "130", "150", "200"],
      correctAnswer: "150"
    },


    /* =====================================================
       ENGLISH — EASY
       ===================================================== */

    {
      id: "edu-english-easy-001",
      difficulty: "easy",
      question: "Which word is a noun?",
      answers: ["Run", "Happy", "Dog", "Quickly"],
      correctAnswer: "Dog"
    },

    {
      id: "edu-english-easy-002",
      difficulty: "easy",
      question: "Which punctuation mark ends a question?",
      answers: [".", "!", "?", ","],
      correctAnswer: "?"
    },

    {
      id: "edu-english-easy-003",
      difficulty: "easy",
      question: "Which word is spelled correctly?",
      answers: [
        "Beautifull",
        "Beautiful",
        "Beutiful",
        "Beautifal"
      ],
      correctAnswer: "Beautiful"
    },

    {
      id: "edu-english-easy-004",
      difficulty: "easy",
      question: "What is the opposite of 'hot'?",
      answers: ["Warm", "Cold", "Bright", "Fast"],
      correctAnswer: "Cold"
    },

    {
      id: "edu-english-easy-005",
      difficulty: "easy",
      question: "Which word is a verb?",
      answers: ["Jump", "Blue", "House", "Happy"],
      correctAnswer: "Jump"
    },


    /* =====================================================
       SCIENCE — EASY
       ===================================================== */

    {
      id: "edu-science-easy-001",
      difficulty: "easy",
      question: "What planet do humans live on?",
      answers: ["Mars", "Venus", "Earth", "Jupiter"],
      correctAnswer: "Earth"
    },

    {
      id: "edu-science-easy-002",
      difficulty: "easy",
      question: "What do plants need to make food?",
      answers: [
        "Moonlight",
        "Sunlight",
        "Plastic",
        "Metal"
      ],
      correctAnswer: "Sunlight"
    },

    {
      id: "edu-science-easy-003",
      difficulty: "easy",
      question: "What gas do humans need to breathe?",
      answers: [
        "Oxygen",
        "Helium",
        "Carbon dioxide",
        "Hydrogen"
      ],
      correctAnswer: "Oxygen"
    },

    {
      id: "edu-science-easy-004",
      difficulty: "easy",
      question: "How many legs does an insect usually have?",
      answers: ["4", "6", "8", "10"],
      correctAnswer: "6"
    },

    {
      id: "edu-science-easy-005",
      difficulty: "easy",
      question: "Water freezes at what temperature in Celsius?",
      answers: ["0", "10", "50", "100"],
      correctAnswer: "0"
    },


    /* =====================================================
       SOCIAL STUDIES — EASY
       ===================================================== */

    {
      id: "edu-social-easy-001",
      difficulty: "easy",
      question: "How many states are in the United States?",
      answers: ["25", "40", "50", "60"],
      correctAnswer: "50"
    },

    {
      id: "edu-social-easy-002",
      difficulty: "easy",
      question: "What is the capital of the United States?",
      answers: [
        "New York City",
        "Washington, D.C.",
        "Los Angeles",
        "Chicago"
      ],
      correctAnswer: "Washington, D.C."
    },

    {
      id: "edu-social-easy-003",
      difficulty: "easy",
      question: "Which ocean is the largest?",
      answers: [
        "Atlantic Ocean",
        "Indian Ocean",
        "Pacific Ocean",
        "Arctic Ocean"
      ],
      correctAnswer: "Pacific Ocean"
    },


    /* =====================================================
       MATH — MEDIUM
       ===================================================== */

    {
      id: "edu-math-medium-001",
      difficulty: "medium",
      question: "What is 15% of 200?",
      answers: ["20", "25", "30", "35"],
      correctAnswer: "30"
    },

    {
      id: "edu-math-medium-002",
      difficulty: "medium",
      question: "What is the square root of 144?",
      answers: ["10", "11", "12", "14"],
      correctAnswer: "12"
    },

    {
      id: "edu-math-medium-003",
      difficulty: "medium",
      question: "What is 7 × 8?",
      answers: ["54", "56", "58", "64"],
      correctAnswer: "56"
    },

    {
      id: "edu-math-medium-004",
      difficulty: "medium",
      question: "What is 3²?",
      answers: ["6", "8", "9", "12"],
      correctAnswer: "9"
    },


    /* =====================================================
       ENGLISH — MEDIUM
       ===================================================== */

    {
      id: "edu-english-medium-001",
      difficulty: "medium",
      question: "Which sentence uses the correct form of 'their'?",
      answers: [
        "Their going to the store.",
        "The store is over their.",
        "Their dog is very friendly.",
        "They're dog is friendly."
      ],
      correctAnswer: "Their dog is very friendly."
    },

    {
      id: "edu-english-medium-002",
      difficulty: "medium",
      question: "What is a synonym for 'happy'?",
      answers: [
        "Angry",
        "Joyful",
        "Tired",
        "Silent"
      ],
      correctAnswer: "Joyful"
    },

    {
      id: "edu-english-medium-003",
      difficulty: "medium",
      question: "Which sentence is written correctly?",
      answers: [
        "She don't like apples.",
        "She doesn't likes apples.",
        "She doesn't like apples.",
        "She not like apples."
      ],
      correctAnswer: "She doesn't like apples."
    },


    /* =====================================================
       SCIENCE — MEDIUM
       ===================================================== */

    {
      id: "edu-science-medium-001",
      difficulty: "medium",
      question: "What is the center of an atom called?",
      answers: [
        "Electron",
        "Nucleus",
        "Molecule",
        "Cell"
      ],
      correctAnswer: "Nucleus"
    },

    {
      id: "edu-science-medium-002",
      difficulty: "medium",
      question: "Which organ pumps blood through the body?",
      answers: [
        "Lungs",
        "Brain",
        "Heart",
        "Liver"
      ],
      correctAnswer: "Heart"
    },

    {
      id: "edu-science-medium-003",
      difficulty: "medium",
      question: "What force pulls objects toward Earth?",
      answers: [
        "Magnetism",
        "Gravity",
        "Friction",
        "Electricity"
      ],
      correctAnswer: "Gravity"
    },


    /* =====================================================
       MATH — HARD
       ===================================================== */

    {
      id: "edu-math-hard-001",
      difficulty: "hard",
      question: "What is 12²?",
      answers: ["124", "132", "144", "156"],
      correctAnswer: "144"
    },

    {
      id: "edu-math-hard-002",
      difficulty: "hard",
      question: "Solve: 5x = 45. What is x?",
      answers: ["5", "8", "9", "10"],
      correctAnswer: "9"
    },

    {
      id: "edu-math-hard-003",
      difficulty: "hard",
      question: "What is the value of π rounded to two decimal places?",
      answers: ["3.04", "3.14", "3.41", "3.24"],
      correctAnswer: "3.14"
    },


    /* =====================================================
       ENGLISH — HARD
       ===================================================== */

    {
      id: "edu-english-hard-001",
      difficulty: "hard",
      question: "What is the adjective in this sentence: 'The bright sun warmed the beach'?",
      answers: [
        "Sun",
        "Warmed",
        "Bright",
        "Beach"
      ],
      correctAnswer: "Bright"
    },

    {
      id: "edu-english-hard-002",
      difficulty: "hard",
      question: "What does the prefix 'pre-' usually mean?",
      answers: [
        "After",
        "Before",
        "Inside",
        "Again"
      ],
      correctAnswer: "Before"
    },

    {
      id: "edu-english-hard-003",
      difficulty: "hard",
      question: "Which word is an adverb?",
      answers: [
        "Quick",
        "Quickly",
        "Quickness",
        "Quicken"
      ],
      correctAnswer: "Quickly"
    }

  ];


  /*
  ==========================================================
  REGISTER QUESTIONS
  ==========================================================
  */

  if (
    window.TriviaData &&
    typeof TriviaData.registerQuestions === "function"
  ) {

    TriviaData.registerQuestions(
      "education",
      EDUCATION_QUESTIONS
    );

  } else {

    console.error(
      "[Education Questions] TriviaData must load first."
    );

  }

})();