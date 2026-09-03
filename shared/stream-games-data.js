/**
 * Dionlyonee Playground - Stream Games Content Registry
 * Rich prompt banks for all live chat and stream games
 */
(function () {
  const StreamGamesData = {
    'finish-the-sentence': {
      title: 'FINISH THE SENTENCE',
      badge: '😂 CHAT CREATIVE',
      icon: '😂',
      type: 'CHAT GAME',
      description: 'Host reads the prompt setup, chat finishes the punchline!',
      prompts: [
        { setup: "I knew the date was officially over when they...", category: "DATING DISASTERS" },
        { setup: "The real reason I showed up 45 minutes late was...", category: "LAME EXCUSES" },
        { setup: "Never trust anyone who unironically puts ketchup on...", category: "FOOD CRIMES" },
        { setup: "If you look closely at my bank account, 90% of it went to...", category: "BAD SPENDING" },
        { setup: "My biggest red flag that I refuse to fix is...", category: "RED FLAGS" },
        { setup: "The fastest way to start a family argument at Thanksgiving is...", category: "HOLIDAY CHAOS" },
        { setup: "I don't need therapy, I just need...", category: "STREAM CONFESSIONS" },
        { setup: "The most embarrassing thing currently in my search history is...", category: "CONFESSIONS" },
        { setup: "You know you're getting old when your favorite part of Friday night is...", category: "GROWING UP" },
        { setup: "If my FBI agent saw what I did today, they would...", category: "INTERNET CHAOS" },
        { setup: "My toxic trait is thinking I could easily survive...", category: "DELUSIONS" },
        { setup: "The worst piece of unsolicited advice I've ever received was...", category: "BAD ADVICE" },
        { setup: "If I was banned from the stream, it would definitely be for...", category: "CHAT WILDIN" },
        { setup: "You can tell someone has never worked in retail because they...", category: "WORK STORIES" },
        { setup: "The one thing keeping me going this week is pure...", category: "DAILY STRUGGLE" }
      ]
    },

    'what-would-you-do': {
      title: 'WHAT WOULD YOU DO?',
      badge: '🤔 MORAL DILEMMAS',
      icon: '🤔',
      type: 'CHAT CREATIVE',
      description: 'Wild moral, financial, and survival dilemmas for the stream to debate!',
      prompts: [
        { scenario: "You find a bag with $25,000 in unmarked cash in the back of an Uber. No cameras, driver didn't notice.", options: ["Keep every dollar", "Return it to the driver", "Split it 50/50 with chat"], category: "FINANCIAL" },
        { scenario: "Your best friend's fiancé tries to hit on you in 4K at a party. The wedding is in 48 hours.", options: ["Expose them immediately with proof", "Tell your friend in private", "Stay out of the drama"], category: "RELATIONSHIP" },
        { scenario: "You have 60 seconds to spend $1,000,000 right now or forfeit the entire bag forever. No stocks or savings.", options: ["Buy real estate instantly", "Clear entire family debt", "Spend it on wildest luxury items"], category: "HIGH STAKES" },
        { scenario: "You accidentally see your boss's private email draft planning to fire your closest work coworker next week.", options: ["Warn your friend immediately", "Stay silent to keep your job", "Help them find a backup job silently"], category: "CAREER" },
        { scenario: "You are given immortality, but a radioactive snail is perpetually moving toward you. If it touches you, you're done.", options: ["Trap the snail in titanium sphere", "Fly to another continent every year", "Decline the immortality"], category: "SURVIVAL" },
        { scenario: "You get access to anyone's DMs in the world for 10 minutes, but they get a notification that you read them.", options: ["Check your partner / crush", "Check a celebrity / politician", "Close the app and walk away"], category: "DRAMA" },
        { scenario: "Every time you sneeze, a random person within 10 feet gets slapped in the face invisibly.", options: ["Carry pepper spray everywhere", "Warn everyone you meet", "Just sneeze and apologize"], category: "COMEDY" },
        { scenario: "You are offered $500,000 cash, but you can never use a smartphone, tablet, or PC for the rest of your life.", options: ["Take the money and live off the grid", "Decline the offer immediately"], category: "TECH DILEMMA" }
      ]
    },

    'who-would-you-pick': {
      title: 'WHO WOULD YOU PICK?',
      badge: '👑 DRAFT SHOWDOWN',
      icon: '👑',
      type: 'CHAT CREATIVE',
      description: 'Head-to-head celebrity, character, and streamer draft choices!',
      prompts: [
        { question: "Who would you pick to survive a zombie apocalypse bunker with you?", choices: ["The Rock", "Batman", "Gordon Ramsay", "Keanu Reeves"], category: "SURVIVAL DRAFT" },
        { question: "Who would you pick to defend you in a high-stakes court trial?", choices: ["Saul Goodman", "Harvey Specter", "Elle Woods", "Judge Judy"], category: "LEGAL BATTLE" },
        { question: "Who would you pick to cook your final meal on Earth?", choices: ["Gordon Ramsay", "Your Grandma", "Guy Fieri", "Snoop Dogg"], category: "FOOD DRAFT" },
        { question: "Who would you pick as your getaway driver in a heist?", choices: ["Vin Diesel (Dom)", "Baby Driver", "Ryan Gosling (Drive)", "Lightning McQueen"], category: "ESCAPE DRAFT" },
        { question: "Who would you pick to lend you $5,000 with zero interest and no rush?", choices: ["MrBeast", "Shaq", "Your Richest Friend", "Elon Musk"], category: "FINANCE DRAFT" },
        { question: "Who would you pick to plan your surprise birthday weekend?", choices: ["Drake", "Cardi B", "Kevin Hart", "Zendaya"], category: "PARTY DRAFT" }
      ]
    },

    'emoji-guess': {
      title: 'EMOJI GUESS',
      badge: '👀 PUZZLE DECODER',
      icon: '👀',
      type: 'GUESSING',
      description: 'Decode the movie, song, or celebrity hidden behind the emoji combo!',
      prompts: [
        { emojis: "🦁 👑", answer: "THE LION KING", hint: "Disney Animation Classic", category: "MOVIES" },
        { emojis: "🕷️ 👨 🕸️", answer: "SPIDER-MAN", hint: "Marvel Superhero", category: "MOVIES" },
        { emojis: "👻 🚫", answer: "GHOSTBUSTERS", hint: "Who you gonna call?", category: "MOVIES" },
        { emojis: "❄️ ⛄ 👭 👑", answer: "FROZEN", hint: "Let it go!", category: "MOVIES" },
        { emojis: "🦇 👨 🃏 🌃", answer: "THE DARK KNIGHT", hint: "Gotham's protector", category: "MOVIES" },
        { emojis: "🚢 🧊 💔 🌊", answer: "TITANIC", hint: "Jack and Rose", category: "MOVIES" },
        { emojis: "🥊 🐝 🦋", answer: "MUHAMMAD ALI", hint: "Float like a butterfly", category: "PEOPLE" },
        { emojis: "🐍 ✈️", answer: "SNAKES ON A PLANE", hint: "Samuel L. Jackson thriller", category: "MOVIES" },
        { emojis: "🍫 🏭 🎩 🎟️", answer: "WILLY WONKA", hint: "Golden ticket", category: "MOVIES" },
        { emojis: "🦖 🏝️ 🚙 ⚡", answer: "JURASSIC PARK", hint: "Life finds a way", category: "MOVIES" },
        { emojis: "🚀 🌕 👨‍🚀 🇺🇸", answer: "MOON LANDING", hint: "One giant leap for mankind", category: "HISTORY" },
        { emojis: "☕ 🛋️ 👫 👫 👫", answer: "FRIENDS", hint: "Central Perk sit-com", category: "TV SHOWS" }
      ]
    },

    'unscramble-it': {
      title: 'UNSCRAMBLE IT',
      badge: '🔀 ANAGRAM CLASH',
      icon: '🔀',
      type: 'GUESSING',
      description: 'Speed anagram puzzle! Unscramble the letters before time runs out!',
      prompts: [
        { scrambled: "D I O N L Y O N E E", answer: "DIONLYONEE", hint: "The Playground Boss", category: "STREAM" },
        { scrambled: "C H A M P I O N S", answer: "CHAMPIONS", hint: "Winners of the game", category: "TITLES" },
        { scrambled: "J E O P A R D Y", answer: "JEOPARDY", hint: "Legendary TV quiz show", category: "TV SHOWS" },
        { scrambled: "B R O A D C A S T", answer: "BROADCAST", hint: "Live on the air", category: "MEDIA" },
        { scrambled: "A T L A N T I C", answer: "ATLANTIC", hint: "Major ocean", category: "GEOGRAPHY" },
        { scrambled: "H O L L Y W O O D", answer: "HOLLYWOOD", hint: "Entertainment capital", category: "PLACES" },
        { scrambled: "S U N S H I N E", answer: "SUNSHINE", hint: "Bright daylight", category: "NATURE" },
        { scrambled: "P A S S C O D E", answer: "PASSCODE", hint: "Secret key", category: "TECH" },
        { scrambled: "S T R E A M E R", answer: "STREAMER", hint: "Live content creator", category: "INTERNET" },
        { scrambled: "F O R T U N E", answer: "FORTUNE", hint: "Great wealth or luck", category: "WHEEL" }
      ]
    },

    'who-dis': {
      title: 'WHO DIS?',
      badge: '🕵🏾 MYSTERY GUESS',
      icon: '🕵🏾',
      type: 'GUESSING',
      description: 'Progressive clues & silhouette reveal! Can chat guess who it is on Clue 1?',
      prompts: [
        {
          name: "MICHAEL JORDAN",
          category: "SPORTS LEGENDS",
          clue1: "Won 6 NBA Championships in the 1990s with the Chicago Bulls",
          clue2: "Famous for the #23 jersey, Air sneakers, and Flu Game",
          clue3: "Star of the original 1996 Space Jam film"
        },
        {
          name: "BEYONCÉ",
          category: "MUSIC ICONS",
          clue1: "Started her career in the iconic group Destiny's Child",
          clue2: "Holds the record for the most Grammy wins in history (32+)",
          clue3: "Known as Queen Bey, Renaissance tour, Single Ladies"
        },
        {
          name: "STEVE JOBS",
          category: "TECH TITANS",
          clue1: "Co-founded a revolutionary computer company in a garage in 1976",
          clue2: "Famously wore a black turtleneck, blue jeans, and New Balance",
          clue3: "Introduced the original iPhone in 2007"
        },
        {
          name: "LEBRON JAMES",
          category: "SPORTS LEGENDS",
          clue1: "Drafted #1 straight out of high school from Akron, Ohio in 2003",
          clue2: "All-time leading scorer in NBA history",
          clue3: "Known as 'The King', won titles with Miami, Cleveland, and LA"
        },
        {
          name: "RIHANNA",
          category: "MUSIC & BUSINESS",
          clue1: "Born in Barbados, broke out with the smash hit 'Umbrella'",
          clue2: "Billionaire founder of Fenty Beauty and Savage X Fenty",
          clue3: "Headlined the 2023 Super Bowl Halftime show while pregnant"
        },
        {
          name: "DRAKE",
          category: "HIP HOP",
          clue1: "Former Canadian teen soap actor on Degrassi",
          clue2: "OVO founder with record-shattering Billboard chart runs",
          clue3: "Certified Lover Boy, God's Plan, Hotline Bling"
        }
      ]
    },

    'hangman': {
      title: 'HANGMAN',
      badge: '🔤 CLASSIC WORD GUESS',
      icon: '🔤',
      type: 'GUESSING',
      description: 'Classic word guesser! Guess letters, avoid strikes, and save the stickman!',
      prompts: [
        { word: "GOLDEN TROPHY", category: "AWARDS" },
        { word: "DIONLYONEE", category: "THE HOST" },
        { word: "STREAM LABS", category: "BROADCAST" },
        { word: "WHEEL SPINNER", category: "GAMESHOW" },
        { word: "CHAMPIONSHIP", category: "SPORTS" },
        { word: "CYBERSECURITY", category: "TECHNOLOGY" },
        { word: "SUPERSTAR", category: "ENTERTAINMENT" },
        { word: "FINAL JEOPARDY", category: "QUIZ SHOW" },
        { word: "MYSTERY SOLVER", category: "DETECTIVE" }
      ]
    },

    'charades': {
      title: 'CHARADES',
      badge: '🎭 ACT IT OUT',
      icon: '🎭',
      type: 'PERFORMANCE',
      description: 'Host or contestant acts it out with NO words! 60 seconds on the clock!',
      prompts: [
        { prompt: "Sneaking into the kitchen at 3 AM for shredded cheese", category: "EVERYDAY SILLY" },
        { prompt: "Trying to take a selfie without looking like you're taking a selfie", category: "MODERN LIFE" },
        { prompt: "Pretending your headphones are plugged in so nobody talks to you", category: "RELATABLE" },
        { prompt: "Stepping on a rogue LEGO brick barefoot in the dark", category: "PAIN" },
        { prompt: "Parallel parking with the entire family watching and judging", category: "STRESS" },
        { prompt: "Fighting for your life on a mechanical bull", category: "ACTION" },
        { prompt: "Trying to open a plastic grocery produce bag at the supermarket", category: "STRUGGLE" },
        { prompt: "A referee calling a controversial VAR penalty in soccer", category: "SPORTS" },
        { prompt: "An aggressive bowling alley strike celebration animation", category: "COMEDY" }
      ]
    },

    'would-you-rather': {
      title: 'WOULD YOU RATHER',
      badge: '⚖️ CHAT GAME',
      icon: '⚖️',
      type: 'CHAT GAME',
      description: 'Two impossible choices. Chat votes live on the debate meter!',
      prompts: [
        { optionA: "Always speak in rhymes forever", optionB: "Whisper everything you say forever", category: "SPEECH" },
        { optionA: "Have unlimited free flights anywhere", optionB: "Never have to pay for food anywhere", category: "PERKS" },
        { optionA: "Live without music for 5 years", optionB: "Live without video / movies / TV for 5 years", category: "ENTERTAINMENT" },
        { optionA: "Read everyone's mind within 5 feet", optionB: "Be able to teleport anywhere instantly once a day", category: "SUPERPOWERS" },
        { optionA: "Always know when someone is lying to you", optionB: "Always get away with any lie you tell", category: "TRUTH" },
        { optionA: "Only be able to sleep for 3 hours a night with no fatigue", optionB: "Wake up fully refreshed whenever you want but sleep 10 hours", category: "LIFESTYLE" },
        { optionA: "Have your browser history made public right now", optionB: "Let your ex read every text you sent in the past 6 months", category: "DRAMA" },
        { optionA: "Win $5,000,000 but you can never leave your hometown", optionB: "Win $250,000 and travel freely anywhere worldwide", category: "FINANCIAL" }
      ]
    }
  };

  window.StreamGamesData = StreamGamesData;
})();
