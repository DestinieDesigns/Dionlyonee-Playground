// Dionlyonee Playground — Jeopardy Category Bank
// Each category has 5 clues at standard values (200/400/600/800/1000).
// used-content-manager.js picks 6 unused categories per room per
// session (gameKey "jeopardy-categories"), so the board doesn't repeat
// until the room is intentionally reset — the whole category is the
// tracked unit, not individual clues.

export const CATEGORY_BANK = [
  {
    id: 'jeo-countries',
    name: 'COUNTRIES',
    clues: [
      { value: 200, clue: 'This country is home to the Great Barrier Reef.', answer: 'Australia' },
      { value: 400, clue: 'The Eiffel Tower stands in this country\u2019s capital.', answer: 'France' },
      { value: 600, clue: 'This is the only country that is also a continent.', answer: 'Australia' },
      { value: 800, clue: 'Mount Kilimanjaro, Africa\u2019s tallest peak, is found in this country.', answer: 'Tanzania' },
      { value: 1000, clue: 'This South American country shares its name with a nut.', answer: 'Brazil' }
    ]
  },
  {
    id: 'jeo-animals',
    name: 'ANIMALS',
    clues: [
      { value: 200, clue: 'This is the largest land animal on Earth.', answer: 'The elephant' },
      { value: 400, clue: 'This big cat is known as the "king of the jungle."', answer: 'The lion' },
      { value: 600, clue: 'This flightless bird is the fastest runner among birds.', answer: 'The ostrich' },
      { value: 800, clue: 'This marine mammal is the largest animal to have ever lived.', answer: 'The blue whale' },
      { value: 1000, clue: 'This animal can regrow a lost limb entirely.', answer: 'A starfish (sea star)' }
    ]
  },
  {
    id: 'jeo-movies',
    name: 'MOVIES',
    clues: [
      { value: 200, clue: 'This 1994 Disney film follows a lion cub named Simba.', answer: 'The Lion King' },
      { value: 400, clue: 'This film series follows a boy wizard at Hogwarts.', answer: 'Harry Potter' },
      { value: 600, clue: 'This 1997 James Cameron film starred Leonardo DiCaprio and Kate Winslet aboard a doomed ship.', answer: 'Titanic' },
      { value: 800, clue: 'This 2010 film starring Leonardo DiCaprio explores dreams within dreams.', answer: 'Inception' },
      { value: 1000, clue: 'This 1972 film, directed by Francis Ford Coppola, follows the Corleone crime family.', answer: 'The Godfather' }
    ]
  },
  {
    id: 'jeo-music',
    name: 'MUSIC',
    clues: [
      { value: 200, clue: 'This Jamaican genre, pioneered by Bob Marley, spread reggae worldwide.', answer: 'Reggae' },
      { value: 400, clue: 'This instrument has 88 keys.', answer: 'The piano' },
      { value: 600, clue: 'This artist is known as the "King of Pop."', answer: 'Michael Jackson' },
      { value: 800, clue: 'This Jamaican genre, born in the late 1970s, gave rise to hip-hop\u2019s toasting style.', answer: 'Dancehall' },
      { value: 1000, clue: 'This composer, deaf by the end of his life, wrote the "Ode to Joy."', answer: 'Ludwig van Beethoven' }
    ]
  },
  {
    id: 'jeo-sports',
    name: 'SPORTS',
    clues: [
      { value: 200, clue: 'This sport is known as "the beautiful game."', answer: 'Soccer (football)' },
      { value: 400, clue: 'Usain Bolt, the fastest man in history, hails from this country.', answer: 'Jamaica' },
      { value: 600, clue: 'This sport is played at Wimbledon.', answer: 'Tennis' },
      { value: 800, clue: 'The Olympic Games originated in this ancient country.', answer: 'Greece' },
      { value: 1000, clue: 'This cricket format limits each team to 20 overs.', answer: 'T20 (Twenty20)' }
    ]
  },
  {
    id: 'jeo-science',
    name: 'SCIENCE',
    clues: [
      { value: 200, clue: 'This is the closest planet to the Sun.', answer: 'Mercury' },
      { value: 400, clue: 'This gas makes up about 21% of Earth\u2019s atmosphere.', answer: 'Oxygen' },
      { value: 600, clue: 'This scientist developed the theory of general relativity.', answer: 'Albert Einstein' },
      { value: 800, clue: 'This is the powerhouse of the cell.', answer: 'The mitochondria' },
      { value: 1000, clue: 'This element has the atomic number 1.', answer: 'Hydrogen' }
    ]
  },
  {
    id: 'jeo-history',
    name: 'HISTORY',
    clues: [
      { value: 200, clue: 'This U.S. document begins "We the People."', answer: 'The Constitution' },
      { value: 400, clue: 'This wall, which divided a German city, fell in 1989.', answer: 'The Berlin Wall' },
      { value: 600, clue: 'This Egyptian queen was famously allied with both Julius Caesar and Mark Antony.', answer: 'Cleopatra' },
      { value: 800, clue: 'This war lasted from 1939 to 1945.', answer: 'World War II' },
      { value: 1000, clue: 'This ship struck an iceberg and sank on its maiden voyage in 1912.', answer: 'The Titanic' }
    ]
  },
  {
    id: 'jeo-jamaica',
    name: 'JAMAICA',
    clues: [
      { value: 200, clue: 'This is the capital city of Jamaica.', answer: 'Kingston' },
      { value: 400, clue: 'This spicy cooking style, famous worldwide, uses scotch bonnet peppers and pimento.', answer: 'Jerk' },
      { value: 600, clue: 'This is Jamaica\u2019s national dish, made with a fruit and a fish.', answer: 'Ackee and saltfish' },
      { value: 800, clue: 'This reggae legend recorded "One Love" and "No Woman, No Cry."', answer: 'Bob Marley' },
      { value: 1000, clue: 'This mountain range, home to Blue Mountain coffee, is Jamaica\u2019s highest.', answer: 'The Blue Mountains' }
    ]
  },
  {
    id: 'jeo-food',
    name: 'FOOD',
    clues: [
      { value: 200, clue: 'This Italian dish is typically topped with cheese, sauce, and toppings on a round base.', answer: 'Pizza' },
      { value: 400, clue: 'This citrus fruit is squeezed to make a popular breakfast drink.', answer: 'Orange' },
      { value: 600, clue: 'This Japanese dish features vinegared rice, often with raw fish.', answer: 'Sushi' },
      { value: 800, clue: 'This root vegetable is fried into crispy strips and served alongside burgers.', answer: 'The potato (french fries)' },
      { value: 1000, clue: 'This Caribbean bread, often paired with saltfish, is made from cassava.', answer: 'Bammy' }
    ]
  },
  {
    id: 'jeo-disney',
    name: 'DISNEY',
    clues: [
      { value: 200, clue: 'This Disney princess lost a glass slipper at the ball.', answer: 'Cinderella' },
      { value: 400, clue: 'This 2013 Disney film features sisters Elsa and Anna.', answer: 'Frozen' },
      { value: 600, clue: 'This Disney character has a nose that grows when he lies.', answer: 'Pinocchio' },
      { value: 800, clue: 'This Disney theme park first opened in Anaheim, California in 1955.', answer: 'Disneyland' },
      { value: 1000, clue: 'This Pixar film follows a clownfish searching for his lost son.', answer: 'Finding Nemo' }
    ]
  }
];
