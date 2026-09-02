const ITEMS = [
  { category: 'Actions', emoji: '🧹', answer: 'Cleaning the house' },
  { category: 'Actions', emoji: '🍳', answer: 'Cooking breakfast' },
  { category: 'Animals', emoji: '🐒', answer: 'A monkey' },
  { category: 'Animals', emoji: '🦆', answer: 'A duck' },
  { category: 'Movies', emoji: '🦁👑', answer: 'The Lion King' },
  { category: 'Movies', emoji: '🕷️🧑', answer: 'Spider-Man' },
  { category: 'Games', emoji: '🎮', answer: 'Playing video games' },
  { category: 'Games', emoji: '♟️', answer: 'Playing chess' },
  { category: 'Songs', emoji: '🎤🎵', answer: 'Singing a song' },
  { category: 'Random', emoji: '☔', answer: 'Running from the rain' },
  { category: 'Random', emoji: '🚗💨', answer: 'Driving a car' },
  { category: 'Halloween', emoji: '🎃👻', answer: 'Trick-or-treating' }
];

export const CHARADES_ITEMS = ITEMS.map((item, idx) => ({
  id: `charades-${idx + 1}`,
  category: item.category,
  emoji: item.emoji,
  answer: item.answer
}));
