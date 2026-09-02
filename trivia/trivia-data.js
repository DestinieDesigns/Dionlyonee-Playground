/* =========================================================
   DIONLYONEE PLAYGROUND
   TRIVIA DATA SYSTEM
========================================================= */

/* =========================================================
   TRIVIA CATEGORIES
========================================================= */

export const TRIVIA_CATEGORIES = [

  {
    id: "general-knowledge",
    name: "General Knowledge",
    icon: "🌎"
  },

  {
    id: "math",
    name: "Math",
    icon: "➗"
  },

  {
    id: "english",
    name: "Proper English",
    icon: "📚"
  },

  {
    id: "science",
    name: "Science",
    icon: "🔬"
  },

  {
    id: "social-studies",
    name: "Social Studies",
    icon: "🏛️"
  },

  {
    id: "history",
    name: "History",
    icon: "📜"
  },

  {
    id: "geography",
    name: "Geography",
    icon: "🗺️"
  },

  {
    id: "animals",
    name: "Animals",
    icon: "🐾"
  },

  {
    id: "nature",
    name: "Nature",
    icon: "🌿"
  },

  {
    id: "food",
    name: "Food",
    icon: "🍕"
  },

  {
    id: "movies-tv",
    name: "Movies & TV",
    icon: "🎬"
  },

  {
    id: "music",
    name: "Music",
    icon: "🎵"
  },

  {
    id: "gaming",
    name: "Gaming",
    icon: "🎮"
  },

  {
    id: "technology",
    name: "Technology",
    icon: "💻"
  },

  {
    id: "sports",
    name: "Sports",
    icon: "🏆"
  },

  {
    id: "random",
    name: "Random",
    icon: "🎲"
  }

];


/* =========================================================
   DIFFICULTY LEVELS
========================================================= */

export const TRIVIA_DIFFICULTIES = [

  {
    id: "easy",
    name: "Easy"
  },

  {
    id: "medium",
    name: "Medium"
  },

  {
    id: "hard",
    name: "Hard"
  }

];


/* =========================================================
   TRIVIA QUESTIONS

   FORMAT:

   {
     id: "unique-question-id",
     category: "category-id",
     difficulty: "easy",
     question: "Question here?",
     answer: "Correct Answer",
     acceptedAnswers: ["Other accepted answer"],
     choices: []
   }

========================================================= */

export const TRIVIA_QUESTIONS = [

  /* =====================================================
     GENERAL KNOWLEDGE
  ===================================================== */

  {
    id: "gk-001",
    category: "general-knowledge",
    difficulty: "easy",

    question:
      "How many days are in a leap year?",

    answer:
      "366",

    acceptedAnswers:
      ["366 days"],

    choices:
      ["365", "366", "364", "367"]
  },

  {
    id: "gk-002",
    category: "general-knowledge",
    difficulty: "easy",

    question:
      "What color do you get when you mix red and blue?",

    answer:
      "Purple",

    acceptedAnswers:
      ["violet"],

    choices:
      ["Green", "Purple", "Orange", "Yellow"]
  },

  {
    id: "gk-003",
    category: "general-knowledge",
    difficulty: "medium",

    question:
      "How many continents are there?",

    answer:
      "7",

    acceptedAnswers:
      ["seven"],

    choices:
      ["5", "6", "7", "8"]
  },


  /* =====================================================
     MATH
  ===================================================== */

  {
    id: "math-001",
    category: "math",
    difficulty: "easy",

    question:
      "What is 5 + 7?",

    answer:
      "12",

    acceptedAnswers:
      ["twelve"],

    choices:
      ["10", "11", "12", "13"]
  },

  {
    id: "math-002",
    category: "math",
    difficulty: "easy",

    question:
      "What is 9 × 6?",

    answer:
      "54",

    acceptedAnswers:
      ["fifty four"],

    choices:
      ["45", "54", "63", "56"]
  },

  {
    id: "math-003",
    category: "math",
    difficulty: "medium",

    question:
      "What is the square root of 144?",

    answer:
      "12",

    acceptedAnswers:
      ["twelve"],

    choices:
      ["10", "11", "12", "14"]
  },

  {
    id: "math-004",
    category: "math",
    difficulty: "hard",

    question:
      "What is 15% of 200?",

    answer:
      "30",

    acceptedAnswers:
      ["thirty"],

    choices:
      ["20", "25", "30", "35"]
  },


  /* =====================================================
     PROPER ENGLISH
  ===================================================== */

  {
    id: "english-001",
    category: "english",
    difficulty: "easy",

    question:
      "Which word is a noun?",

    answer:
      "Dog",

    acceptedAnswers:
      [],

    choices:
      ["Run", "Dog", "Quickly", "Beautiful"]
  },

  {
    id: "english-002",
    category: "english",
    difficulty: "easy",

    question:
      "Which sentence uses correct punctuation?",

    answer:
      "Where are you going?",

    acceptedAnswers:
      [],

    choices:
      [
        "Where are you going",
        "Where are you going.",
        "Where are you going?",
        "Where are you going!"
      ]
  },

  {
    id: "english-003",
    category: "english",
    difficulty: "medium",

    question:
      "What is the past tense of the word 'go'?",

    answer:
      "Went",

    acceptedAnswers:
      [],

    choices:
      ["Goed", "Going", "Went", "Gone"]
  },


  /* =====================================================
     SCIENCE
  ===================================================== */

  {
    id: "science-001",
    category: "science",
    difficulty: "easy",

    question:
      "What planet do we live on?",

    answer:
      "Earth",

    acceptedAnswers:
      ["the earth"],

    choices:
      ["Mars", "Earth", "Venus", "Jupiter"]
  },

  {
    id: "science-002",
    category: "science",
    difficulty: "easy",

    question:
      "What gas do humans need to breathe?",

    answer:
      "Oxygen",

    acceptedAnswers:
      ["o2"],

    choices:
      ["Carbon dioxide", "Oxygen", "Helium", "Hydrogen"]
  },

  {
    id: "science-003",
    category: "science",
    difficulty: "medium",

    question:
      "What is H2O commonly known as?",

    answer:
      "Water",

    acceptedAnswers:
      [],

    choices:
      ["Salt", "Water", "Oxygen", "Hydrogen"]
  },


  /* =====================================================
     SOCIAL STUDIES
  ===================================================== */

  {
    id: "social-001",
    category: "social-studies",
    difficulty: "easy",

    question:
      "What are the three branches of the United States government?",

    answer:
      "Executive, Legislative, and Judicial",

    acceptedAnswers:
      [
        "executive legislative judicial"
      ],

    choices:
      [
        "Executive, Legislative, and Judicial",
        "President, Senate, and Police",
        "Federal, State, and Local",
        "Congress, Army, and President"
      ]
  },

  {
    id: "social-002",
    category: "social-studies",
    difficulty: "medium",

    question:
      "What is the highest law of the United States?",

    answer:
      "The Constitution",

    acceptedAnswers:
      [
        "constitution",
        "us constitution"
      ],

    choices:
      [
        "The Constitution",
        "The Declaration of Independence",
        "The Bill of Rights",
        "Congress"
      ]
  },


  /* =====================================================
     HISTORY
  ===================================================== */

  {
    id: "history-001",
    category: "history",
    difficulty: "easy",

    question:
      "Who was the first President of the United States?",

    answer:
      "George Washington",

    acceptedAnswers:
      ["washington"],

    choices:
      [
        "Abraham Lincoln",
        "George Washington",
        "Thomas Jefferson",
        "John Adams"
      ]
  },

  {
    id: "history-002",
    category: "history",
    difficulty: "medium",

    question:
      "Which document declared the American colonies independent from Great Britain?",

    answer:
      "The Declaration of Independence",

    acceptedAnswers:
      [
        "declaration of independence"
      ],

    choices:
      [
        "The Constitution",
        "The Declaration of Independence",
        "The Bill of Rights",
        "The Gettysburg Address"
      ]
  },


  /* =====================================================
     GEOGRAPHY
  ===================================================== */

  {
    id: "geography-001",
    category: "geography",
    difficulty: "easy",

    question:
      "What is the largest ocean on Earth?",

    answer:
      "Pacific Ocean",

    acceptedAnswers:
      ["pacific"],

    choices:
      [
        "Atlantic Ocean",
        "Indian Ocean",
        "Pacific Ocean",
        "Arctic Ocean"
      ]
  },

  {
    id: "geography-002",
    category: "geography",
    difficulty: "medium",

    question:
      "What is the capital of France?",

    answer:
      "Paris",

    acceptedAnswers:
      [],

    choices:
      [
        "London",
        "Paris",
        "Rome",
        "Madrid"
      ]
  },


  /* =====================================================
     ANIMALS
  ===================================================== */

  {
    id: "animals-001",
    category: "animals",
    difficulty: "easy",

    question:
      "What is the largest land animal?",

    answer:
      "African Elephant",

    acceptedAnswers:
      [
        "elephant",
        "african elephant"
      ],

    choices:
      [
        "Giraffe",
        "African Elephant",
        "Hippopotamus",
        "Rhinoceros"
      ]
  },

  {
    id: "animals-002",
    category: "animals",
    difficulty: "easy",

    question:
      "Which animal is known for changing its color to blend into its surroundings?",

    answer:
      "Chameleon",

    acceptedAnswers:
      [],

    choices:
      [
        "Lion",
        "Chameleon",
        "Elephant",
        "Horse"
      ]
  },


  /* =====================================================
     NATURE
  ===================================================== */

  {
    id: "nature-001",
    category: "nature",
    difficulty: "easy",

    question:
      "What process do plants use to make food using sunlight?",

    answer:
      "Photosynthesis",

    acceptedAnswers:
      [],

    choices:
      [
        "Respiration",
        "Photosynthesis",
        "Digestion",
        "Evaporation"
      ]
  },


  /* =====================================================
     FOOD
  ===================================================== */

  {
    id: "food-001",
    category: "food",
    difficulty: "easy",

    question:
      "What fruit is traditionally used to make guacamole?",

    answer:
      "Avocado",

    acceptedAnswers:
      [],

    choices:
      [
        "Apple",
        "Avocado",
        "Banana",
        "Orange"
      ]
  },


  /* =====================================================
     MOVIES & TV
  ===================================================== */

  {
    id: "movies-001",
    category: "movies-tv",
    difficulty: "easy",

    question:
      "What type of entertainment is watched in episodes?",

    answer:
      "Television Show",

    acceptedAnswers:
      [
        "tv show",
        "television"
      ],

    choices:
      [
        "Television Show",
        "Novel",
        "Painting",
        "Podcast"
      ]
  },


  /* =====================================================
     MUSIC
  ===================================================== */

  {
    id: "music-001",
    category: "music",
    difficulty: "easy",

    question:
      "How many notes are in a standard musical octave before repeating?",

    answer:
      "8",

    acceptedAnswers:
      ["eight"],

    choices:
      ["6", "7", "8", "10"]
  },


  /* =====================================================
     GAMING
  ===================================================== */

  {
    id: "gaming-001",
    category: "gaming",
    difficulty: "easy",

    question:
      "What device is commonly used to play console video games?",

    answer:
      "Controller",

    acceptedAnswers:
      ["game controller"],

    choices:
      [
        "Controller",
        "Calculator",
        "Printer",
        "Microphone"
      ]
  },


  /* =====================================================
     TECHNOLOGY
  ===================================================== */

  {
    id: "technology-001",
    category: "technology",
    difficulty: "easy",

    question:
      "What does CPU stand for?",

    answer:
      "Central Processing Unit",

    acceptedAnswers:
      ["central processor unit"],

    choices:
      [
        "Central Processing Unit",
        "Computer Power Unit",
        "Central Program Utility",
        "Control Processing User"
      ]
  },


  /* =====================================================
     SPORTS
  ===================================================== */

  {
    id: "sports-001",
    category: "sports",
    difficulty: "easy",

    question:
      "How many players are on a basketball team on the court at one time?",

    answer:
      "5",

    acceptedAnswers:
      ["five"],

    choices:
      ["4", "5", "6", "7"]
  }

];


/* =========================================================
   CATEGORY HELPERS
========================================================= */

export function getCategory(categoryId) {

  return TRIVIA_CATEGORIES.find(
    category => category.id === categoryId
  ) || null;

}


export function getCategoryName(categoryId) {

  const category =
    getCategory(categoryId);

  return category
    ? category.name
    : "Unknown Category";

}


/* =========================================================
   GET QUESTIONS BY CATEGORY
========================================================= */

export function getQuestionsByCategory(categoryId) {

  if (
    !categoryId ||
    categoryId === "random"
  ) {

    return [...TRIVIA_QUESTIONS];

  }

  return TRIVIA_QUESTIONS.filter(
    question =>
      question.category === categoryId
  );

}


/* =========================================================
   GET QUESTIONS BY DIFFICULTY
========================================================= */

export function getQuestionsByDifficulty(
  difficulty
) {

  if (
    !difficulty ||
    difficulty === "all"
  ) {

    return [...TRIVIA_QUESTIONS];

  }

  return TRIVIA_QUESTIONS.filter(
    question =>
      question.difficulty === difficulty
  );

}


/* =========================================================
   FILTER QUESTIONS
========================================================= */

export function filterTriviaQuestions({

  category = "random",

  difficulty = "all",

  excludeIds = []

} = {}) {

  return TRIVIA_QUESTIONS.filter(
    question => {

      const categoryMatches =

        category === "random" ||

        !category ||

        question.category === category;


      const difficultyMatches =

        difficulty === "all" ||

        !difficulty ||

        question.difficulty === difficulty;


      const unused =

        !excludeIds.includes(
          question.id
        );


      return

        categoryMatches &&

        difficultyMatches &&

        unused;

    }
  );

}


/* =========================================================
   RANDOM QUESTION
========================================================= */

export function getRandomTriviaQuestion(
  options = {}
) {

  const availableQuestions =
    filterTriviaQuestions(options);


  if (
    availableQuestions.length === 0
  ) {

    return null;

  }


  const randomIndex =
    Math.floor(
      Math.random() *
      availableQuestions.length
    );


  return availableQuestions[
    randomIndex
  ];

}


/* =========================================================
   GET QUESTION BY ID
========================================================= */

export function getTriviaQuestionById(
  questionId
) {

  return TRIVIA_QUESTIONS.find(
    question =>
      question.id === questionId
  ) || null;

}


/* =========================================================
   QUESTION COUNT
========================================================= */

export function getTriviaQuestionCount(
  category = "random",
  difficulty = "all"
) {

  return filterTriviaQuestions({

    category,

    difficulty

  }).length;

}
