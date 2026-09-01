/* =========================================================
   DIONLYONEE PLAYGROUND
   TRIVIA QUESTIONS — HISTORY
   ========================================================= */

(function () {
  "use strict";

  const HISTORY_QUESTIONS = [

    /* =====================================================
       EASY
       ===================================================== */

    {
      id: "history-easy-001",
      difficulty: "easy",
      question: "Who was the first President of the United States?",
      answers: [
        "Abraham Lincoln",
        "George Washington",
        "Thomas Jefferson",
        "John Adams"
      ],
      correctAnswer: "George Washington"
    },

    {
      id: "history-easy-002",
      difficulty: "easy",
      question: "Which country gifted the Statue of Liberty to the United States?",
      answers: ["France", "England", "Spain", "Italy"],
      correctAnswer: "France"
    },

    {
      id: "history-easy-003",
      difficulty: "easy",
      question: "Who wrote the Declaration of Independence?",
      answers: [
        "George Washington",
        "Thomas Jefferson",
        "Benjamin Franklin",
        "John Adams"
      ],
      correctAnswer: "Thomas Jefferson"
    },

    {
      id: "history-easy-004",
      difficulty: "easy",
      question: "Which ancient civilization built the pyramids of Giza?",
      answers: [
        "Romans",
        "Greeks",
        "Ancient Egyptians",
        "Vikings"
      ],
      correctAnswer: "Ancient Egyptians"
    },

    {
      id: "history-easy-005",
      difficulty: "easy",
      question: "Who was known for giving the 'I Have a Dream' speech?",
      answers: [
        "Malcolm X",
        "Martin Luther King Jr.",
        "Frederick Douglass",
        "Rosa Parks"
      ],
      correctAnswer: "Martin Luther King Jr."
    },

    {
      id: "history-easy-006",
      difficulty: "easy",
      question: "What ship carried the Pilgrims to North America in 1620?",
      answers: [
        "Santa Maria",
        "Mayflower",
        "Titanic",
        "Endeavour"
      ],
      correctAnswer: "Mayflower"
    },

    {
      id: "history-easy-007",
      difficulty: "easy",
      question: "Who was the first person to walk on the Moon?",
      answers: [
        "Buzz Aldrin",
        "Neil Armstrong",
        "Yuri Gagarin",
        "John Glenn"
      ],
      correctAnswer: "Neil Armstrong"
    },

    /* =====================================================
       MEDIUM
       ===================================================== */

    {
      id: "history-medium-001",
      difficulty: "medium",
      question: "In which year did World War II end?",
      answers: ["1943", "1945", "1950", "1955"],
      correctAnswer: "1945"
    },

    {
      id: "history-medium-002",
      difficulty: "medium",
      question: "Which civilization is associated with the city of Rome?",
      answers: [
        "Roman Empire",
        "Mayan Empire",
        "Aztec Empire",
        "Persian Empire"
      ],
      correctAnswer: "Roman Empire"
    },

    {
      id: "history-medium-003",
      difficulty: "medium",
      question: "Who was the principal author of the Emancipation Proclamation?",
      answers: [
        "George Washington",
        "Abraham Lincoln",
        "Theodore Roosevelt",
        "Ulysses S. Grant"
      ],
      correctAnswer: "Abraham Lincoln"
    },

    {
      id: "history-medium-004",
      difficulty: "medium",
      question: "Which event began the American Revolutionary War?",
      answers: [
        "Boston Tea Party",
        "Battles of Lexington and Concord",
        "Signing of the Constitution",
        "Louisiana Purchase"
      ],
      correctAnswer: "Battles of Lexington and Concord"
    },

    {
      id: "history-medium-005",
      difficulty: "medium",
      question: "Who was the first woman to fly solo across the Atlantic Ocean?",
      answers: [
        "Amelia Earhart",
        "Harriet Tubman",
        "Marie Curie",
        "Sally Ride"
      ],
      correctAnswer: "Amelia Earhart"
    },

    {
      id: "history-medium-006",
      difficulty: "medium",
      question: "The Renaissance began in which country?",
      answers: ["France", "Italy", "England", "Germany"],
      correctAnswer: "Italy"
    },

    /* =====================================================
       HARD
       ===================================================== */

    {
      id: "history-hard-001",
      difficulty: "hard",
      question: "Which document established the first ten amendments to the U.S. Constitution?",
      answers: [
        "Declaration of Independence",
        "Bill of Rights",
        "Magna Carta",
        "Articles of Confederation"
      ],
      correctAnswer: "Bill of Rights"
    },

    {
      id: "history-hard-002",
      difficulty: "hard",
      question: "Which empire was ruled by Julius Caesar?",
      answers: [
        "Roman Republic",
        "Ottoman Empire",
        "British Empire",
        "Byzantine Empire"
      ],
      correctAnswer: "Roman Republic"
    },

    {
      id: "history-hard-003",
      difficulty: "hard",
      question: "Who discovered penicillin?",
      answers: [
        "Isaac Newton",
        "Alexander Fleming",
        "Louis Pasteur",
        "Albert Einstein"
      ],
      correctAnswer: "Alexander Fleming"
    },

    {
      id: "history-hard-004",
      difficulty: "hard",
      question: "Which ancient civilization developed cuneiform writing?",
      answers: [
        "Ancient Egyptians",
        "Sumerians",
        "Romans",
        "Greeks"
      ],
      correctAnswer: "Sumerians"
    },

    {
      id: "history-hard-005",
      difficulty: "hard",
      question: "What treaty officially ended World War I?",
      answers: [
        "Treaty of Paris",
        "Treaty of Versailles",
        "Treaty of Rome",
        "Treaty of Vienna"
      ],
      correctAnswer: "Treaty of Versailles"
    }

  ];

  if (
    window.TriviaData &&
    typeof TriviaData.registerQuestions === "function"
  ) {

    TriviaData.registerQuestions(
      "history",
      HISTORY_QUESTIONS
    );

  } else {

    console.error(
      "[History Questions] TriviaData must load first."
    );

  }

})();