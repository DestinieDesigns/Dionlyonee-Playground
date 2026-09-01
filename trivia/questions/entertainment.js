/* =========================================================
   DIONLYONEE PLAYGROUND
   TRIVIA QUESTIONS — ENTERTAINMENT
   ========================================================= */

(function () {
  "use strict";

  const ENTERTAINMENT_QUESTIONS = [

    /* =====================================================
       MOVIES — EASY
       ===================================================== */

    {
      id: "ent-movie-easy-001",
      difficulty: "easy",
      question: "Which movie features a cowboy named Woody?",
      answers: ["Toy Story", "Cars", "Frozen", "Shrek"],
      correctAnswer: "Toy Story"
    },

    {
      id: "ent-movie-easy-002",
      difficulty: "easy",
      question: "What color is Shrek?",
      answers: ["Blue", "Green", "Red", "Purple"],
      correctAnswer: "Green"
    },

    {
      id: "ent-movie-easy-003",
      difficulty: "easy",
      question: "Which Disney movie features Simba?",
      answers: ["Aladdin", "The Lion King", "Frozen", "Moana"],
      correctAnswer: "The Lion King"
    },

    {
      id: "ent-movie-easy-004",
      difficulty: "easy",
      question: "Who lives in a pineapple under the sea?",
      answers: [
        "Mickey Mouse",
        "SpongeBob SquarePants",
        "Patrick Star",
        "Scooby-Doo"
      ],
      correctAnswer: "SpongeBob SquarePants"
    },

    {
      id: "ent-movie-easy-005",
      difficulty: "easy",
      question: "Which movie features the character Elsa?",
      answers: ["Frozen", "Tangled", "Encanto", "Coco"],
      correctAnswer: "Frozen"
    },

    {
      id: "ent-movie-easy-006",
      difficulty: "easy",
      question: "What kind of animal is Dumbo?",
      answers: ["Horse", "Elephant", "Lion", "Dog"],
      correctAnswer: "Elephant"
    },

    {
      id: "ent-movie-easy-007",
      difficulty: "easy",
      question: "Which superhero is known for carrying a shield?",
      answers: ["Iron Man", "Captain America", "Thor", "Hulk"],
      correctAnswer: "Captain America"
    },

    {
      id: "ent-movie-easy-008",
      difficulty: "easy",
      question: "What is the name of the snowman in Frozen?",
      answers: ["Olaf", "Sven", "Kristoff", "Hans"],
      correctAnswer: "Olaf"
    },

    /* =====================================================
       TELEVISION — EASY
       ===================================================== */

    {
      id: "ent-tv-easy-001",
      difficulty: "easy",
      question: "Which animated family lives in Springfield?",
      answers: [
        "The Griffins",
        "The Simpsons",
        "The Smiths",
        "The Browns"
      ],
      correctAnswer: "The Simpsons"
    },

    {
      id: "ent-tv-easy-002",
      difficulty: "easy",
      question: "What kind of dog is Scooby-Doo?",
      answers: [
        "Great Dane",
        "Golden Retriever",
        "Poodle",
        "Beagle"
      ],
      correctAnswer: "Great Dane"
    },

    {
      id: "ent-tv-easy-003",
      difficulty: "easy",
      question: "Which cartoon character is known for saying 'What's up, Doc?'",
      answers: [
        "Bugs Bunny",
        "Daffy Duck",
        "Tom",
        "Jerry"
      ],
      correctAnswer: "Bugs Bunny"
    },

    {
      id: "ent-tv-easy-004",
      difficulty: "easy",
      question: "Which character lives in a trash can on Sesame Street?",
      answers: ["Big Bird", "Elmo", "Oscar the Grouch", "Cookie Monster"],
      correctAnswer: "Oscar the Grouch"
    },

    {
      id: "ent-tv-easy-005",
      difficulty: "easy",
      question: "What color is Cookie Monster?",
      answers: ["Blue", "Green", "Red", "Yellow"],
      correctAnswer: "Blue"
    },

    /* =====================================================
       MUSIC — EASY
       ===================================================== */

    {
      id: "ent-music-easy-001",
      difficulty: "easy",
      question: "How many strings does a standard guitar usually have?",
      answers: ["4", "5", "6", "8"],
      correctAnswer: "6"
    },

    {
      id: "ent-music-easy-002",
      difficulty: "easy",
      question: "Which instrument has black and white keys?",
      answers: ["Drums", "Piano", "Trumpet", "Violin"],
      correctAnswer: "Piano"
    },

    {
      id: "ent-music-easy-003",
      difficulty: "easy",
      question: "Which instrument is played with drumsticks?",
      answers: ["Piano", "Drums", "Flute", "Violin"],
      correctAnswer: "Drums"
    },

    {
      id: "ent-music-easy-004",
      difficulty: "easy",
      question: "Which instrument usually has six strings?",
      answers: ["Guitar", "Flute", "Trumpet", "Drums"],
      correctAnswer: "Guitar"
    },

    /* =====================================================
       ENTERTAINMENT — MEDIUM
       ===================================================== */

    {
      id: "ent-medium-001",
      difficulty: "medium",
      question: "What is the fictional school attended by Harry Potter?",
      answers: [
        "Hogwarts",
        "Narnia Academy",
        "Mystic School",
        "Camelot"
      ],
      correctAnswer: "Hogwarts"
    },

    {
      id: "ent-medium-002",
      difficulty: "medium",
      question: "Which superhero is also known as Bruce Wayne?",
      answers: ["Superman", "Batman", "Spider-Man", "Iron Man"],
      correctAnswer: "Batman"
    },

    {
      id: "ent-medium-003",
      difficulty: "medium",
      question: "What fictional city does Batman protect?",
      answers: [
        "Metropolis",
        "Gotham City",
        "Central City",
        "Star City"
      ],
      correctAnswer: "Gotham City"
    },

    {
      id: "ent-medium-004",
      difficulty: "medium",
      question: "Which movie series features a character named Darth Vader?",
      answers: [
        "Star Trek",
        "Star Wars",
        "The Matrix",
        "Avatar"
      ],
      correctAnswer: "Star Wars"
    },

    {
      id: "ent-medium-005",
      difficulty: "medium",
      question: "What is the name of the wizard who mentors Harry Potter?",
      answers: [
        "Gandalf",
        "Albus Dumbledore",
        "Merlin",
        "Saruman"
      ],
      correctAnswer: "Albus Dumbledore"
    },

    {
      id: "ent-medium-006",
      difficulty: "medium",
      question: "Which instrument belongs to the brass family?",
      answers: ["Violin", "Trumpet", "Flute", "Piano"],
      correctAnswer: "Trumpet"
    },

    /* =====================================================
       ENTERTAINMENT — HARD
       ===================================================== */

    {
      id: "ent-hard-001",
      difficulty: "hard",
      question: "What is the name of the kingdom in the movie Frozen?",
      answers: ["Arendelle", "Corona", "Agrabah", "Atlantica"],
      correctAnswer: "Arendelle"
    },

    {
      id: "ent-hard-002",
      difficulty: "hard",
      question: "Which film introduced audiences to the character Jack Sparrow?",
      answers: [
        "Treasure Planet",
        "Pirates of the Caribbean: The Curse of the Black Pearl",
        "Peter Pan",
        "Hook"
      ],
      correctAnswer:
        "Pirates of the Caribbean: The Curse of the Black Pearl"
    },

    {
      id: "ent-hard-003",
      difficulty: "hard",
      question: "What is the name of the fictional metal associated with Black Panther's homeland?",
      answers: ["Adamantium", "Vibranium", "Kryptonite", "Mithril"],
      correctAnswer: "Vibranium"
    },

    {
      id: "ent-hard-004",
      difficulty: "hard",
      question: "Which animated studio created Spirited Away?",
      answers: [
        "Pixar",
        "Studio Ghibli",
        "DreamWorks",
        "Illumination"
      ],
      correctAnswer: "Studio Ghibli"
    }

  ];

  if (
    window.TriviaData &&
    typeof TriviaData.registerQuestions === "function"
  ) {

    TriviaData.registerQuestions(
      "entertainment",
      ENTERTAINMENT_QUESTIONS
    );

  } else {

    console.error(
      "[Entertainment Questions] TriviaData must load first."
    );

  }

})();