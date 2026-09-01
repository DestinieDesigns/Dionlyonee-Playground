// Dionlyonee Game Center — Hangman word bank.
// Same idea as games/wheel/wheel-puzzles.js: flat list of
// { id, category, answer }, tracked per-room via used-content-manager
// under the gameKey "hangman" so nothing repeats in a session.

const RAW_CATEGORIES = {
  Animals: [
    'ELEPHANT', 'GIRAFFE', 'CROCODILE', 'KANGAROO', 'FLAMINGO', 'OCTOPUS',
    'PENGUIN', 'CHEETAH', 'GORILLA', 'DOLPHIN', 'HEDGEHOG', 'CHAMELEON'
  ],
  Movies: [
    'THE LION KING', 'FINDING NEMO', 'STAR WARS', 'JURASSIC PARK',
    'THE MATRIX', 'BLACK PANTHER', 'FROZEN', 'TITANIC', 'INCEPTION',
    'THE GODFATHER', 'SHREK', 'AVATAR'
  ],
  'Jamaican Phrases': [
    'WAH GWAAN', 'WALK GOOD', 'MEK WE GO', 'ONE LOVE', 'BIG UP',
    'SOON COME', 'NO PROBLEM', 'IRIE VIBES', 'GIVE THANKS', 'BLESS UP'
  ],
  Food: [
    'JERK CHICKEN', 'RICE AND PEAS', 'ACKEE AND SALTFISH', 'BEEF PATTY',
    'CURRY GOAT', 'FRIED DUMPLING', 'PIZZA', 'ICE CREAM', 'MAC AND CHEESE',
    'OXTAIL'
  ],
  Countries: [
    'JAMAICA', 'CANADA', 'BRAZIL', 'JAPAN', 'AUSTRALIA', 'FRANCE',
    'NIGERIA', 'MEXICO', 'GERMANY', 'TRINIDAD AND TOBAGO'
  ]
};

const ALL_WORDS = [];
Object.keys(RAW_CATEGORIES).forEach((category) => {
  const slug = category.toLowerCase().replace(/[^a-z0-9]+/g, '-');
  RAW_CATEGORIES[category].forEach((answer, idx) => {
    ALL_WORDS.push({
      id: `hangman-${slug}-${idx + 1}`,
      category,
      answer
    });
  });
});

export const HANGMAN_WORDS = ALL_WORDS;
