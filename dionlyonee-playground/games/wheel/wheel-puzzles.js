// Dionlyonee Wheel of Fortune — Puzzle Bank
// Each puzzle gets a stable unique ID so used-content-manager.js can
// track "already used this session" per puzzle, not per category.

(function (root) {
  'use strict';

  const RAW_CATEGORIES = {
    Countries: [
      'JAMAICA', 'CANADA', 'BRAZIL', 'JAPAN', 'MEXICO', 'BAHAMAS', 'BARBADOS', 'FRANCE',
      'GERMANY', 'AUSTRALIA', 'UNITED STATES', 'UNITED KINGDOM', 'SPAIN', 'ITALY',
      'PORTUGAL', 'ARGENTINA', 'CHILE', 'COLOMBIA', 'CUBA', 'DOMINICAN REPUBLIC',
      'HAITI', 'TRINIDAD AND TOBAGO', 'GUYANA', 'COSTA RICA', 'PANAMA', 'BELIZE',
      'SOUTH AFRICA', 'NIGERIA', 'GHANA', 'KENYA', 'EGYPT', 'MOROCCO', 'INDIA', 'CHINA',
      'SOUTH KOREA', 'THAILAND', 'PHILIPPINES', 'INDONESIA', 'NEW ZEALAND', 'IRELAND',
      'GREECE', 'TURKEY'
    ],
    Animals: [
      'ELEPHANT', 'GIRAFFE', 'MONKEY', 'DOLPHIN', 'CROCODILE', 'KANGAROO', 'TIGER',
      'GORILLA', 'PENGUIN', 'ZEBRA', 'LION', 'CHEETAH', 'LEOPARD', 'BEAR', 'POLAR BEAR',
      'WOLF', 'FOX', 'RABBIT', 'HORSE', 'DONKEY', 'GOAT', 'SHEEP', 'COW', 'PIG',
      'CHICKEN', 'EAGLE', 'PARROT', 'OWL', 'FLAMINGO', 'PEACOCK', 'OSTRICH', 'SNAKE',
      'LIZARD', 'TURTLE', 'FROG', 'SHARK', 'WHALE', 'OCTOPUS', 'SEAL', 'BUTTERFLY',
      'SPIDER', 'LOBSTER', 'CRAB', 'BAT'
    ],
    'Jamaican Phrases': [
      'WAH GWAAN', 'WEH YUH A SEH', 'MI DEH YA', 'EVERYTING IRIE', 'BIG UP',
      'WALK GOOD', 'NO PROBLEM', 'MEK WE GO', 'YEAH MON', 'MI SOON COME',
      'WEH DI DEAL', 'HOW YUH MEAN', 'MI NUH KNOW', 'MI NUH CARE', 'NO WORRIES',
      'ONE LOVE', 'RESPECT', 'BLESS UP', 'GIVE THANKS', 'NUFF RESPECT',
      'IRIE VIBES', 'COME YA', 'TEK TIME', 'HOLD A FAITH', 'MEK IT GO',
      'WHA YUH A DO', 'HOW TING DEH', 'MI GOOD', 'YUH GOOD', 'SEEN', 'FI REAL',
      'NO LIE', 'MI TELL YUH', 'WAH FI DO', 'MI A COME', 'MI A GO', 'MEK WE LINK'
    ],
    Food: [
      'JERK CHICKEN', 'RICE AND PEAS', 'PIZZA', 'HAMBURGER', 'ICE CREAM',
      'FRIED CHICKEN', 'CURRY GOAT', 'OXTAIL', 'BROWN STEW CHICKEN',
      'ESCOVITCH FISH', 'ACKEE AND SALTFISH', 'FESTIVAL', 'FRIED DUMPLING',
      'BAMMY', 'CALLALOO', 'PEPPER POT SOUP', 'GOAT SOUP', 'CHICKEN SOUP',
      'RED PEA SOUP', 'BEEF PATTY', 'COCO BREAD', 'CURRY CHICKEN',
      'STEAMED FISH', 'JERK PORK', 'JERK SHRIMP', 'MAC AND CHEESE',
      'FRIED FISH', 'FRENCH FRIES'
    ]
  };

  // Flatten into { id, category, answer } with stable IDs like "countries-3"
  const ALL_PUZZLES = [];
  Object.keys(RAW_CATEGORIES).forEach((category) => {
    const slug = category.toLowerCase().replace(/[^a-z0-9]+/g, '-');
    RAW_CATEGORIES[category].forEach((answer, idx) => {
      ALL_PUZZLES.push({
        id: `${slug}-${idx + 1}`,
        category: category,
        answer: answer
      });
    });
  });

  root.WheelPuzzles = {
    CATEGORIES: Object.keys(RAW_CATEGORIES),
    ALL_PUZZLES: ALL_PUZZLES,
    byCategory: function (category) {
      return ALL_PUZZLES.filter((p) => p.category === category);
    }
  };
})(window);
