const ITEMS = [
  { emoji: '🦁👑', answer: 'The Lion King' },
  { emoji: '🕷️🧑', answer: 'Spider-Man' },
  { emoji: '❄️👸', answer: 'Frozen' },
  { emoji: '🏴\u200d☠️🦜', answer: 'Pirates of the Caribbean' },
  { emoji: '🐠🔍', answer: 'Finding Nemo' },
  { emoji: '🍫🏭', answer: 'Charlie and the Chocolate Factory' },
  { emoji: '🦇🧑', answer: 'Batman' },
  { emoji: '🧙\u200d♂️💍', answer: 'The Lord of the Rings' },
  { emoji: '🕵️🍫', answer: 'Willy Wonka' },
  { emoji: '👻🚫', answer: 'Ghostbusters' },
  { emoji: '🌴🏝️🇯🇲', answer: 'Jamaica' },
  { emoji: '🎤🇯🇲🦁', answer: 'Bob Marley' }
];

export const EMOJI_GUESS_ITEMS = ITEMS.map((item, idx) => ({
  id: `emoji-guess-${idx + 1}`,
  emoji: item.emoji,
  answer: item.answer
}));
