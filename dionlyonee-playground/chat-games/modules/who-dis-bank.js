const ITEMS = [
  {
    answer: 'Mario',
    clues: [
      'I am a fictional video game character.',
      'I wear a red hat and blue overalls.',
      'I have a brother named Luigi.',
      'I often try to rescue a princess named Peach.'
    ]
  },
  {
    answer: 'Bob Marley',
    clues: [
      'I am a real person, born in Jamaica.',
      'I am known worldwide for a genre of music.',
      'One of my most famous songs is "One Love."',
      'I passed away in 1981, but my music lives on.'
    ]
  },
  {
    answer: 'Spider-Man',
    clues: [
      'I am a fictional superhero.',
      'I got my powers from a radioactive bite.',
      'I live in New York City.',
      'My real name is Peter Parker.'
    ]
  },
  {
    answer: 'Usain Bolt',
    clues: [
      'I am a real person from Jamaica.',
      'I am known as the fastest man alive.',
      'I have won multiple Olympic gold medals in sprinting.',
      'My nickname is "Lightning."'
    ]
  },
  {
    answer: 'Elsa',
    clues: [
      'I am a fictional Disney character.',
      'I am a queen with icy powers.',
      'My sister\u2019s name is Anna.',
      'I sing a famous song about letting things go.'
    ]
  },
  {
    answer: 'Shrek',
    clues: [
      'I am a fictional green character.',
      'I live in a swamp.',
      'My best friend is a talking donkey.',
      'I married a princess named Fiona.'
    ]
  }
];

export const WHO_DIS_ITEMS = ITEMS.map((item, idx) => ({
  id: `who-dis-${idx + 1}`,
  answer: item.answer,
  clues: item.clues
}));
