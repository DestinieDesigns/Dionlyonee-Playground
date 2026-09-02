const ITEMS = [
  { category: 'Countries', answer: 'JAMAICA' },
  { category: 'Countries', answer: 'CANADA' },
  { category: 'Countries', answer: 'BRAZIL' },
  { category: 'Animals', answer: 'ELEPHANT' },
  { category: 'Animals', answer: 'GIRAFFE' },
  { category: 'Animals', answer: 'DOLPHIN' },
  { category: 'Food', answer: 'PATTY' },
  { category: 'Food', answer: 'DUMPLING' },
  { category: 'Movies', answer: 'FROZEN' },
  { category: 'Movies', answer: 'TITANIC' },
  { category: 'Music', answer: 'REGGAE' },
  { category: 'Music', answer: 'DANCEHALL' }
];

export const UNSCRAMBLE_ITEMS = ITEMS.map((item, idx) => ({
  id: `unscramble-${idx + 1}`,
  category: item.category,
  answer: item.answer
}));
