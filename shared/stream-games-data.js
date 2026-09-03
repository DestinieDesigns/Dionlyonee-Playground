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
        // CARIBBEAN CULTURE & VIBES
        { word: "JERK CHICKEN", category: "CARIBBEAN CULTURE", hint: "Smoky, spicy Jamaican barbecue specialty", difficulty: "EASY" },
        { word: "PLANTAIN CHIPS", category: "CARIBBEAN CULTURE", hint: "Crispy fried golden tropical snack", difficulty: "EASY" },
        { word: "BOB MARLEY", category: "CARIBBEAN CULTURE", hint: "Legendary King of Reggae music", difficulty: "EASY" },
        { word: "BLUE MOUNTAIN COFFEE", category: "CARIBBEAN CULTURE", hint: "World famous Jamaican premium mountain roast", difficulty: "MEDIUM" },
        { word: "RED STRIPE", category: "CARIBBEAN CULTURE", hint: "Iconic Jamaican lager in the stubby bottle", difficulty: "EASY" },
        { word: "PATTIES AND COCO BREAD", category: "CARIBBEAN CULTURE", hint: "The ultimate lunchtime combo from the bakery", difficulty: "MEDIUM" },
        { word: "USAIN BOLT", category: "CARIBBEAN CULTURE", hint: "Fastest human lightning in Olympic track history", difficulty: "EASY" },
        { word: "DUNNS RIVER FALLS", category: "CARIBBEAN CULTURE", hint: "Famous terraced cascading waterfall near Ocho Rios", difficulty: "MEDIUM" },
        { word: "DOMINO CHAMPION", category: "CARIBBEAN CULTURE", hint: "Slamming down the double-six on the table", difficulty: "MEDIUM" },
        { word: "STEEL DRUM BAND", category: "CARIBBEAN CULTURE", hint: "Melodic percussion instrument originally from Trinidad", difficulty: "MEDIUM" },
        { word: "ROAST BREADFRUIT", category: "CARIBBEAN CULTURE", hint: "Starchy island staple roasted over open fire", difficulty: "HARD" },
        { word: "CALYPSO MUSIC", category: "CARIBBEAN CULTURE", hint: "Upbeat rhythmic island storytelling genre", difficulty: "MEDIUM" },
        { word: "PORT ROYAL PIRATES", category: "CARIBBEAN CULTURE", hint: "Historical Jamaican sunken pirate city", difficulty: "HARD" },
        { word: "ACKEE AND SALTFISH", category: "CARIBBEAN CULTURE", hint: "Jamaica's beloved national breakfast dish", difficulty: "MEDIUM" },
        { word: "MANGO TREE", category: "CARIBBEAN CULTURE", hint: "Shady backyard tree dropping sweet orange fruit", difficulty: "EASY" },
        { word: "REGGAE SUNSPLASH", category: "CARIBBEAN CULTURE", hint: "Historic outdoor reggae festival in Montego Bay", difficulty: "MEDIUM" },

        // BLOCKBUSTER MOVIES & TV
        { word: "PIRATES OF THE CARIBBEAN", category: "MOVIES & TV", hint: "Captain Jack Sparrow sailing the Black Pearl", difficulty: "MEDIUM" },
        { word: "JURASSIC PARK", category: "MOVIES & TV", hint: "Dinosaurs brought back to life on an island", difficulty: "EASY" },
        { word: "AVENGERS ENDGAME", category: "MOVIES & TV", hint: "Superheroes assemble to defeat Thanos", difficulty: "MEDIUM" },
        { word: "BLACK PANTHER", category: "MOVIES & TV", hint: "King T'Challa protecting Wakanda", difficulty: "EASY" },
        { word: "SPIDER MAN", category: "MOVIES & TV", hint: "Friendly neighborhood wall-crawler", difficulty: "EASY" },
        { word: "STRANGER THINGS", category: "MOVIES & TV", hint: "Kids in Hawkins fighting the Upside Down", difficulty: "MEDIUM" },
        { word: "THE MATRIX", category: "MOVIES & TV", hint: "Neo choosing between the red or blue pill", difficulty: "EASY" },
        { word: "BACK TO THE FUTURE", category: "MOVIES & TV", hint: "Time travel at 88 miles per hour in a DeLorean", difficulty: "MEDIUM" },
        { word: "GHOSTBUSTERS", category: "MOVIES & TV", hint: "Who ya gonna call when spirits run wild?", difficulty: "EASY" },
        { word: "STAR WARS", category: "MOVIES & TV", hint: "Jedi knights and lightsabers far away", difficulty: "EASY" },
        { word: "THE LION KING", category: "MOVIES & TV", hint: "Simba learning Hakuna Matata on Pride Rock", difficulty: "EASY" },
        { word: "MISSION IMPOSSIBLE", category: "MOVIES & TV", hint: "Secret agent Tom Cruise doing dangerous stunts", difficulty: "MEDIUM" },
        { word: "FINDING NEMO", category: "MOVIES & TV", hint: "Clownfish father swimming across the ocean", difficulty: "EASY" },
        { word: "TOP GUN MAVERICK", category: "MOVIES & TV", hint: "High flying fighter jet dogfights", difficulty: "MEDIUM" },

        // VIDEO GAMES & STREAMING
        { word: "SUPER MARIO BROS", category: "VIDEO GAMES", hint: "Mushroom Kingdom jumping plumber", difficulty: "EASY" },
        { word: "MINECRAFT", category: "VIDEO GAMES", hint: "Punch trees, build shelters, mine diamonds", difficulty: "EASY" },
        { word: "FORTNITE BATTLE ROYALE", category: "VIDEO GAMES", hint: "100 players jumping off the battle bus", difficulty: "MEDIUM" },
        { word: "CALL OF DUTY", category: "VIDEO GAMES", hint: "Popular first-person military shooter", difficulty: "EASY" },
        { word: "THE LEGEND OF ZELDA", category: "VIDEO GAMES", hint: "Link exploring Hyrule with the Master Sword", difficulty: "MEDIUM" },
        { word: "GRAND THEFT AUTO", category: "VIDEO GAMES", hint: "Open world city chaos and heist missions", difficulty: "MEDIUM" },
        { word: "POKEMON", category: "VIDEO GAMES", hint: "Gotta catch 'em all in red and white balls", difficulty: "EASY" },
        { word: "SONIC THE HEDGEHOG", category: "VIDEO GAMES", hint: "Blue blur collecting golden rings at sound speed", difficulty: "MEDIUM" },
        { word: "TWITCH STREAMER", category: "STREAM LIFE", hint: "Broadcasting live with webcam and chat", difficulty: "EASY" },
        { word: "VICTORY ROYALE", category: "VIDEO GAMES", hint: "The #1 gold banner when you survive to the end", difficulty: "EASY" },
        { word: "DIONLYONEE", category: "THE HOST", hint: "The one and only host di stream pon di app!", difficulty: "EASY" },
        { word: "WHEEL OF FORTUNE", category: "GAMESHOW", hint: "Spin the giant colorful cash wheel", difficulty: "EASY" },
        { word: "FINAL JEOPARDY", category: "GAMESHOW", hint: "Write your answer in the form of a question", difficulty: "MEDIUM" },
        { word: "HEADSHOT", category: "VIDEO GAMES", hint: "Precision shot dealing critical damage", difficulty: "EASY" },

        // FOOD & FLAVORS
        { word: "PEPPERONI PIZZA", category: "FOOD & DRINK", hint: "Cheesy baked crust with cured meat rounds", difficulty: "EASY" },
        { word: "CHERRY CHEESECAKE", category: "FOOD & DRINK", hint: "Rich creamy dessert topped with sweet fruit", difficulty: "MEDIUM" },
        { word: "CHOCOLATE CHIP COOKIES", category: "FOOD & DRINK", hint: "Warm baked treats best enjoyed with cold milk", difficulty: "MEDIUM" },
        { word: "WAFFLES AND SYRUP", category: "FOOD & DRINK", hint: "Golden grid breakfast with melting butter", difficulty: "EASY" },
        { word: "SMASH BURGER", category: "FOOD & DRINK", hint: "Thin crispy-edged beef patty on a brioche bun", difficulty: "EASY" },
        { word: "TACOS AND GUACAMOLE", category: "FOOD & DRINK", hint: "Mexican street food with avocado dip", difficulty: "MEDIUM" },
        { word: "MANGO SMOOTHIE", category: "FOOD & DRINK", hint: "Blended tropical icy fruit shake", difficulty: "EASY" },
        { word: "MACARONI AND CHEESE", category: "FOOD & DRINK", hint: "Golden baked pasta comfort food classic", difficulty: "MEDIUM" },
        { word: "FRENCH FRIES", category: "FOOD & DRINK", hint: "Crispy salted golden potato strips", difficulty: "EASY" },
        { word: "BANANA PUDDING", category: "FOOD & DRINK", hint: "Southern sweet dessert with vanilla wafers", difficulty: "MEDIUM" },

        // ANIMALS & WILDLIFE
        { word: "GOLDEN RETRIEVER", category: "ANIMALS", hint: "Friendly fluffy dog breed that loves tennis balls", difficulty: "MEDIUM" },
        { word: "BALD EAGLE", category: "ANIMALS", hint: "Majestic soaring raptor with sharp talons", difficulty: "EASY" },
        { word: "GIANT PANDA", category: "ANIMALS", hint: "Black and white bear munching on bamboo shoots", difficulty: "EASY" },
        { word: "GREAT WHITE SHARK", category: "ANIMALS", hint: "Apex ocean predator with powerful jaws", difficulty: "MEDIUM" },
        { word: "CHAMELEON", category: "ANIMALS", hint: "Reptile that shifts skin colors to blend in", difficulty: "MEDIUM" },
        { word: "HUMMINGBIRD", category: "ANIMALS", hint: "Tiny bird that hovers and drinks sweet flower nectar", difficulty: "MEDIUM" },
        { word: "KANGAROO", category: "ANIMALS", hint: "Australian jumper carrying a baby in her pouch", difficulty: "EASY" },
        { word: "DOLPHIN POD", category: "ANIMALS", hint: "Intelligent ocean creatures leaping waves together", difficulty: "EASY" },
        { word: "OCTOPUS", category: "ANIMALS", hint: "Clever sea animal with eight tentacled arms", difficulty: "EASY" },

        // SPORTS & CHAMPIONS
        { word: "GOLDEN STATE WARRIORS", category: "SPORTS", hint: "NBA dynasty known for lights-out three pointers", difficulty: "MEDIUM" },
        { word: "SLAM DUNK", category: "SPORTS", hint: "Throwing down the basketball two-handed through the rim", difficulty: "EASY" },
        { word: "SUPER BOWL TROPHY", category: "SPORTS", hint: "The Lombardi prize awarded on NFL Sunday", difficulty: "MEDIUM" },
        { word: "HAT TRICK", category: "SPORTS", hint: "Scoring three goals in a single game", difficulty: "EASY" },
        { word: "KNOCKOUT PUNCH", category: "SPORTS", hint: "Ending the boxing fight before the final bell", difficulty: "EASY" },
        { word: "GRAND SLAM", category: "SPORTS", hint: "Home run hit when all bases are loaded", difficulty: "EASY" },
        { word: "MARATHON RUNNER", category: "SPORTS", hint: "Racing twenty six point two miles on foot", difficulty: "MEDIUM" },

        // EVERYDAY & SCIENCE
        { word: "ROLLER COASTER", category: "THEME PARKS", hint: "High speed thrill ride with steep loops and drops", difficulty: "EASY" },
        { word: "ASTRONAUT IN SPACE", category: "SCIENCE", hint: "Floating weightless on the space station", difficulty: "MEDIUM" },
        { word: "METEOR SHOWER", category: "SCIENCE", hint: "Shooting stars blazing across the night sky", difficulty: "MEDIUM" },
        { word: "THUNDER AND LIGHTNING", category: "WEATHER", hint: "Electric flashes and booming rumbles in a storm", difficulty: "MEDIUM" },
        { word: "SOLAR ECLIPSE", category: "SCIENCE", hint: "Moon passing directly between the Sun and Earth", difficulty: "MEDIUM" },
        { word: "TREASURE CHEST", category: "ADVENTURE", hint: "Locked wooden trunk filled with gold doubloons", difficulty: "EASY" },
        { word: "HOT AIR BALLOON", category: "TRAVEL", hint: "Floating silently through the clouds with a burner", difficulty: "MEDIUM" },
        { word: "WIRELESS HEADPHONES", category: "TECHNOLOGY", hint: "Bluetooth earbuds playing your favorite beats", difficulty: "MEDIUM" }
      ]
    },

    'charades': {
      title: 'CHARADES',
      badge: '🎭 ACT IT OUT',
      icon: '🎭',
      type: 'PERFORMANCE',
      description: 'Host acts it out with NO words! Chat guesses live on stream!',
      prompts: [
        // EASY EVERYDAY
        {
          prompt: "Drinking Super Hot Soup",
          category: "EASY EVERYDAY",
          difficulty: "SUPER EASY",
          words: 4,
          chatClue: "Food & Eating",
          hostSecret: "Hold an imaginary hot bowl, blow on your spoon, then fan your burning tongue!",
          actingTips: [
            "Hold an imaginary bowl with both hands and blow gently",
            "Take an eager sip from a spoon, then freeze in shock",
            "Open your mouth wide and frantically fan your tongue with both hands!"
          ]
        },
        {
          prompt: "Brushing Teeth and Spitting",
          category: "EASY EVERYDAY",
          difficulty: "SUPER EASY",
          words: 4,
          chatClue: "Morning Routine",
          hostSecret: "Squeeze imaginary toothpaste, brush vigorously, gargle and spit!",
          actingTips: [
            "Pretend to squeeze a toothpaste tube onto a toothbrush",
            "Brush your front and back teeth vigorously with puffed cheeks",
            "Swish imaginary water with puffed cheeks, then lean over and spit!"
          ]
        },
        {
          prompt: "Taking a Freezing Cold Shower",
          category: "EASY EVERYDAY",
          difficulty: "SUPER EASY",
          words: 5,
          chatClue: "Bathroom & Water",
          hostSecret: "Turn imaginary knob, step in, shiver violently, and hug yourself!",
          actingTips: [
            "Turn an imaginary shower knob with confidence",
            "Step one foot forward and immediately gasp from the icy water",
            "Shiver with chattering teeth, hug your shoulders, and jump out!"
          ]
        },
        {
          prompt: "Trying to Swat a Mosquito",
          category: "EASY EVERYDAY",
          difficulty: "SUPER EASY",
          words: 5,
          chatClue: "Insects & Pests",
          hostSecret: "Follow an imaginary buzzing insect with your eyes, clap missed swats!",
          actingTips: [
            "Tilt your head and follow an imaginary flying bug around your ears",
            "Clap your hands together quickly and miss, checking between palms",
            "Slap your own arm or neck, sigh in defeat, and swat with an imaginary magazine!"
          ]
        },
        {
          prompt: "Eating a Very Sour Lemon",
          category: "EASY EVERYDAY",
          difficulty: "SUPER EASY",
          words: 5,
          chatClue: "Food & Flavors",
          hostSecret: "Take a confident bite, then squint eyes and pucker your entire face!",
          actingTips: [
            "Peel an imaginary fruit wedge and smile casually",
            "Take a huge bite and chew once",
            "Instantly squeeze your eyes shut, pucker your lips, and shudder!"
          ]
        },
        {
          prompt: "Walking a Dog Pulling Hard",
          category: "EASY EVERYDAY",
          difficulty: "EASY",
          words: 6,
          chatClue: "Pets & Outdoors",
          hostSecret: "Hold an imaginary leash with two hands, lean backward as dog drags you!",
          actingTips: [
            "Hold an imaginary leash tight in both fists",
            "Get yanked forward suddenly, stumbling and leaning backwards to brake",
            "Whistle and gesture 'heel!' while sliding across the floor!"
          ]
        },
        {
          prompt: "Carrying Too Many Grocery Bags",
          category: "EASY EVERYDAY",
          difficulty: "EASY",
          words: 5,
          chatClue: "Shopping & Errands",
          hostSecret: "Load both forearms with heavy imaginary bags, struggle to walk upright!",
          actingTips: [
            "Hook multiple imaginary plastic grocery bags onto each arm",
            "Struggle to stand up straight with shoulders sagging and strained face",
            "Try to kick the front door open with your foot without dropping bags!"
          ]
        },
        {
          prompt: "Opening an Umbrella in Wind",
          category: "EASY EVERYDAY",
          difficulty: "EASY",
          words: 5,
          chatClue: "Weather & Rain",
          hostSecret: "Pop open umbrella, get blown backwards, umbrella inverts inside out!",
          actingTips: [
            "Look up at rain, press the button to pop an imaginary umbrella",
            "Grip the handle tight as gust of wind pushes you backwards",
            "Umbrella flips inside-out—stare up at it in disbelief with rain on face!"
          ]
        },
        {
          prompt: "Ironing Clothes and Burning Them",
          category: "EASY EVERYDAY",
          difficulty: "EASY",
          words: 5,
          chatClue: "Chore & Clothes",
          hostSecret: "Smooth cloth, press iron, get distracted, smell smoke, panic!",
          actingTips: [
            "Smooth out an imaginary shirt on an ironing board",
            "Press iron down, then look away or check imaginary phone",
            "Sniff the air, see smoke, lift the iron in horror, and fan the scorch mark!"
          ]
        },
        {
          prompt: "Putting on Extremely Tight Jeans",
          category: "EASY EVERYDAY",
          difficulty: "EASY",
          words: 5,
          chatClue: "Getting Dressed",
          hostSecret: "Hop on one foot pulling up waistline, suck in stomach to button!",
          actingTips: [
            "Step into pants and pull up, getting stuck at the thighs",
            "Hop frantically on one foot, wriggling your hips to pull them up",
            "Suck your stomach in until you can barely breathe, straining to zip!"
          ]
        },

        // FUNNY ANIMALS & CHARACTERS
        {
          prompt: "A T-Rex Making a Bed",
          category: "FUNNY ANIMALS",
          difficulty: "SUPER EASY",
          words: 5,
          chatClue: "Prehistoric & Comedy",
          hostSecret: "Tuck arms tight to chest with tiny hands, roar and try to pull sheets!",
          actingTips: [
            "Tuck your elbows to your ribs and make tiny claw hands",
            "Lean over an imaginary bed, straining because your arms can't reach the pillow",
            "Roar silently in frustration and stomp heavy dinosaur feet!"
          ]
        },
        {
          prompt: "A Robot Running Low on Battery",
          category: "FUNNY ANIMALS",
          difficulty: "SUPER EASY",
          words: 6,
          chatClue: "Sci-Fi & Machines",
          hostSecret: "Start with crisp robotic arm movements, gradually stutter and shut down!",
          actingTips: [
            "Do crisp, sharp mechanical 90-degree robot arm motions",
            "Slow down, movements become stuttery and twitchy",
            "Head slowly drops forward, eyes shut, completely powered off!"
          ]
        },
        {
          prompt: "A Sleepy Cat Stretching",
          category: "FUNNY ANIMALS",
          difficulty: "SUPER EASY",
          words: 4,
          chatClue: "Cute Animals",
          hostSecret: "Paw the air, do a huge stretch, rub whiskers, and curl into a ball!",
          actingTips: [
            "Make little paw hands, yawn widely with eyes squeezed shut",
            "Arch your back and stretch front paws forward",
            "Lick an imaginary paw and swipe it over your ear!"
          ]
        },
        {
          prompt: "A Sneaky Ninja Tiptoeing",
          category: "FUNNY ANIMALS",
          difficulty: "EASY",
          words: 4,
          chatClue: "Action & Stealth",
          hostSecret: "Stealthy high steps, karate chops, freeze when someone looks!",
          actingTips: [
            "Tip-toe on very exaggerated silent steps, peering side to side",
            "Freeze completely still like a statue when you hear a sound",
            "Throw imaginary throwing stars (shurikens) and do a ninja pose!"
          ]
        },
        {
          prompt: "A Rock Star on Air Guitar",
          category: "FUNNY ANIMALS",
          difficulty: "SUPER EASY",
          words: 6,
          chatClue: "Music & Concert",
          hostSecret: "Grip air guitar fretboard, strum aggressively, wind-mill arm spin!",
          actingTips: [
            "Hold an imaginary electric guitar at your hip",
            "Fret rapidly with left hand and strum furiously with right hand",
            "Do an exaggerated Pete Townshend windmill spin and slide on your knees!"
          ]
        },
        {
          prompt: "A Chef Dropping a Pancake",
          category: "FUNNY ANIMALS",
          difficulty: "EASY",
          words: 5,
          chatClue: "Cooking & Kitchen",
          hostSecret: "Grip frying pan, flip pancake high, watch it miss and land on head/floor!",
          actingTips: [
            "Hold an imaginary skillet and swirl the batter gently",
            "Flick your wrist with flair to launch the pancake high in the air",
            "Track it flying too high, try to catch it with pan, it splats on your face!"
          ]
        },
        {
          prompt: "A Penguin on Slippery Ice",
          category: "FUNNY ANIMALS",
          difficulty: "SUPER EASY",
          words: 5,
          chatClue: "Cold Wildlife",
          hostSecret: "Press arms stiff to sides, waddle quickly, slip and slide on belly!",
          actingTips: [
            "Keep arms pinned flat to your sides like stiff flippers",
            "Waddle rapidly side to side on small feet",
            "Lose your footing, slide wildly on your tummy!"
          ]
        },
        {
          prompt: "A Monkey Eating a Banana",
          category: "FUNNY ANIMALS",
          difficulty: "SUPER EASY",
          words: 5,
          chatClue: "Jungle Animals",
          hostSecret: "Scratch armpit, peel banana from bottom, chew with puffed cheeks!",
          actingTips: [
            "Scratch your head and under your arm with loose curved fingers",
            "Peel an imaginary banana skin in four clean strips",
            "Stuff the whole thing in your mouth and jump around excitedly!"
          ]
        },

        // SPORTS & GAMES
        {
          prompt: "Bowling a Strike and Celebrating",
          category: "SPORTS & GAMES",
          difficulty: "SUPER EASY",
          words: 5,
          chatClue: "Recreation & Pins",
          hostSecret: "Pick ball, wipe on shirt, swing arm back, release, high five imaginary team!",
          actingTips: [
            "Pick up a heavy bowling ball, stick fingers into holes, wipe on hip",
            "Take three deliberate steps, swing back, release smooth down the lane",
            "Watch the pins crash, pump your fist, and do a wild victory dance!"
          ]
        },
        {
          prompt: "Hitting a Home Run in Baseball",
          category: "SPORTS & GAMES",
          difficulty: "SUPER EASY",
          words: 6,
          chatClue: "Sports & Bats",
          hostSecret: "Grip bat, tap plate, look at pitcher, swing hard, point to outfield!",
          actingTips: [
            "Grip bat above your back shoulder, tap imaginary home plate",
            "Keep eyes locked on incoming pitch, swing with full body torque",
            "Drop the bat, shade eyes to watch it fly out of the park, jog bases!"
          ]
        },
        {
          prompt: "Fishing and Catching an Old Boot",
          category: "SPORTS & GAMES",
          difficulty: "EASY",
          words: 6,
          chatClue: "Outdoors & Water",
          hostSecret: "Cast rod, wait peacefully, huge tug! Reel furiously, lift up smelly boot!",
          actingTips: [
            "Cast your fishing line overhead and sit back relaxing",
            "Sudden aggressive jerk on the line—reel the crank vigorously!",
            "Pull it out of the water triumphantly... hold up a dripping, stinky shoe!"
          ]
        },
        {
          prompt: "Weightlifting Barbell Too Heavy",
          category: "SPORTS & GAMES",
          difficulty: "SUPER EASY",
          words: 4,
          chatClue: "Gym & Fitness",
          hostSecret: "Chalk hands, grip bar, strain with shaking red face, drop immediately!",
          actingTips: [
            "Clap chalk dust onto hands and slap your own face to get hyped",
            "Bend knees, grab heavy bar, heave it to knees with trembling knees",
            "Eyes bug out, arms shake uncontrollably, drop it with a loud thud!"
          ]
        },
        {
          prompt: "Swimming and Spotting a Shark",
          category: "SPORTS & GAMES",
          difficulty: "SUPER EASY",
          words: 5,
          chatClue: "Ocean & Swimming",
          hostSecret: "Do calm front-crawl swimming, look to the side, see shark fin, speed paddle!",
          actingTips: [
            "Do relaxed, leisurely swimming strokes with happy breathing",
            "Look across water, see an imaginary fin circling you",
            "Eyes widen in terror—switch into frantic splashing paddle sprint!"
          ]
        },
        {
          prompt: "Shooting a Basketball Free Throw",
          category: "SPORTS & GAMES",
          difficulty: "SUPER EASY",
          words: 5,
          chatClue: "Court & Hoops",
          hostSecret: "Bounce ball 3 times, spin in hands, bend knees, follow through wrist flick!",
          actingTips: [
            "Stand at foul line, bounce imaginary basketball three rhythm bounces",
            "Breathe out, look up at the rim, bend knees into shooting stance",
            "Elevate and release with an exaggerated wrist goose-neck flick!"
          ]
        },
        {
          prompt: "Playing Tennis and Arguing with Umpire",
          category: "SPORTS & GAMES",
          difficulty: "EASY",
          words: 7,
          chatClue: "Racket Sports",
          hostSecret: "Serve or volley, ball called out, throw hands up shouting 'You cannot be serious!'",
          actingTips: [
            "Bounce tennis ball, toss high, hit huge overhead serve",
            "Hear umpire call 'OUT!'—stare in utter disbelief",
            "Walk up to umpire chair, point at the line, argue vehemently waving hands!"
          ]
        },

        // CARIBBEAN & STREAM CULTURE
        {
          prompt: "Dancing Dancehall at Street Party",
          category: "CARIBBEAN & STREAM",
          difficulty: "SUPER EASY",
          words: 5,
          chatClue: "Music & Dancing",
          hostSecret: "Bust out classic dancehall steps, shoulder roll, salute the selector!",
          actingTips: [
            "Bust out classic dancehall shoulder bounce and knee roll",
            "Do the Bogle or signal 'Pull up selector!' with finger in the air",
            "Hyped up footwork smiling with pure Caribbean rhythm!"
          ]
        },
        {
          prompt: "Slamming Domino on the Table",
          category: "CARIBBEAN & STREAM",
          difficulty: "SUPER EASY",
          words: 5,
          chatClue: "Board & Table Games",
          hostSecret: "Study your hand, find the winning double-six, slam tile with full authority!",
          actingTips: [
            "Hold imaginary tiles in your hand, peeking carefully from opponents",
            "Spot the open end, raise your right arm high in the air with dramatic flourish",
            "Slam the domino down with full Caribbean table force and stand up celebrating!"
          ]
        },
        {
          prompt: "Eating Extra Spicy Jerk Chicken",
          category: "CARIBBEAN & STREAM",
          difficulty: "SUPER EASY",
          words: 5,
          chatClue: "Jamaican Cuisine",
          hostSecret: "Take a huge bite off the bone, chew happily, then scotch bonnet heat hits!",
          actingTips: [
            "Hold an imaginary chicken leg drumstick, take a big juicy bite",
            "Chew with big smile, giving a thumbs up to the chef",
            "Scotch bonnet pepper kicks in—eyes water, grab water pitcher, fan mouth!"
          ]
        },
        {
          prompt: "Running Like Usain Bolt",
          category: "CARIBBEAN & STREAM",
          difficulty: "SUPER EASY",
          words: 4,
          chatClue: "Olympics & Track",
          hostSecret: "Get in starting blocks, sprint like lightning, hit the iconic 'To Di World' pose!",
          actingTips: [
            "Get down into track starting blocks with fingertips on the line",
            "Blast off into a high-knee sprint, checking imaginary opponents over shoulder",
            "Cross the finish line and strike the world-famous Usain Bolt lightning pose!"
          ]
        },
        {
          prompt: "Drinking Fresh Coconut Water",
          category: "CARIBBEAN & STREAM",
          difficulty: "SUPER EASY",
          words: 4,
          chatClue: "Tropical Drinks",
          hostSecret: "Chop coconut with imaginary cutlass, pop in a straw, sip in paradise!",
          actingTips: [
            "Hold a round coconut in left hand, chop top with imaginary machete",
            "Tilt back the coconut or stick in a straw",
            "Take a long refreshing gulp, wipe your mouth, and sigh in pure tropical bliss!"
          ]
        },
        {
          prompt: "Raging at Video Game Lag",
          category: "CARIBBEAN & STREAM",
          difficulty: "SUPER EASY",
          words: 5,
          chatClue: "Stream & Gaming",
          hostSecret: "Focused gaming, sudden screen freeze, mashed buttons, throw controller!",
          actingTips: [
            "Grip an imaginary gamepad, furiously tapping buttons with game face",
            "Screen freezes from 999ms ping—freeze in horror mid-action",
            "Mash all buttons, throw imaginary headset on desk, and bury face in hands!"
          ]
        },

        // RELATABLE FAILS & COMEDY
        {
          prompt: "Walking Into a Sticky Spiderweb",
          category: "RELATABLE FAILS",
          difficulty: "SUPER EASY",
          words: 5,
          chatClue: "Outdoor Mishaps",
          hostSecret: "Walk casually, face hits invisible web, flail arms wildly brushing face!",
          actingTips: [
            "Stroll along with head held high whistling happily",
            "Your face walks directly into an invisible web—freeze with wide eyes",
            "Flail both arms wildly around your hair and face doing an awkward ninja dance!"
          ]
        },
        {
          prompt: "Stubbing Pinky Toe on Furniture",
          category: "RELATABLE FAILS",
          difficulty: "SUPER EASY",
          words: 5,
          chatClue: "Everyday Pain",
          hostSecret: "Walk, toe strikes corner, silent scream of agony, hop on other leg!",
          actingTips: [
            "Walk barefoot, kick an imaginary coffee table corner with pinky toe",
            "Open mouth wide in a completely silent, agonizing delayed scream",
            "Grab your foot with both hands, hopping across the room on one foot!"
          ]
        },
        {
          prompt: "Stopping Microwave at One Second",
          category: "RELATABLE FAILS",
          difficulty: "SUPER EASY",
          words: 5,
          chatClue: "Late Night Snack",
          hostSecret: "Tip-toe to microwave, watch 3...2...1 countdown, slap door button like a bomb squad!",
          actingTips: [
            "Tip-toe in secret, lean in close to an imaginary microwave screen",
            "Hover finger over open button, watching timer count 3... 2...",
            "Smack the open button at 0:01! Breathe massive sigh of relief at silence!"
          ]
        },
        {
          prompt: "Brain Freeze from Ice Slushy",
          category: "RELATABLE FAILS",
          difficulty: "SUPER EASY",
          words: 5,
          chatClue: "Cold Drinks",
          hostSecret: "Drink fast through straw, freeze, clutch temples with both hands in agony!",
          actingTips: [
            "Suck enthusiastically on an imaginary icy slushy drink through a straw",
            "Sudden electric freeze—eyes lock wide, drop cup",
            "Clutch both temples with your palms, grimacing until the freeze passes!"
          ]
        },
        {
          prompt: "Pretending You Heard Someone",
          category: "RELATABLE FAILS",
          difficulty: "EASY",
          words: 4,
          chatClue: "Awkward Social",
          hostSecret: "Lean in say 'What?', lean in again, third time just nod and laugh awkwardly!",
          actingTips: [
            "Listen to someone talking, cup your ear and tilt head: 'What?'",
            "Lean in closer, squint, and cup ear again: 'Say that one more time?'",
            "They repeat it a third time—still didn't hear, so just smile, nod, and laugh awkwardly!"
          ]
        },
        {
          prompt: "Untangling Mess of Wired Earbuds",
          category: "RELATABLE FAILS",
          difficulty: "SUPER EASY",
          words: 5,
          chatClue: "Gadgets & Tech",
          hostSecret: "Pull knot from pocket, pick apart intricate loops, end up in worse knot!",
          actingTips: [
            "Pull a ball of tangled headphone cords out of your pocket",
            "Inspect the impossible knot with squinted eyes and gentle pulling",
            "Pull one string through a loop, it gets tighter—groan in utter exasperation!"
          ]
        }
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

  // Classic Hangman Gallows & Stick Figure SVG visual representation
  window.renderHangmanStageSvg = function(strikes = 0, status = 'PLAYING', maxWidth = 340, maxHeight = 280) {
    strikes = Math.max(0, Math.min(6, Number(strikes) || 0));

    let bannerText = '';
    let bannerColor = '#d4af37';
    let figureSvg = '';

    if (status === 'WON') {
      bannerText = '🏆 CHAT SAVED THE HANGMAN! 🏆';
      bannerColor = '#10b981';
      figureSvg = `
        <!-- Snapped Rope -->
        <line x1="200" y1="30" x2="200" y2="52" stroke="#e2b93b" stroke-width="3" stroke-dasharray="2,2" />
        <text x="200" y="66" font-size="14" text-anchor="middle">✂️</text>

        <!-- Winner Podium -->
        <rect x="165" y="200" width="70" height="50" rx="6" fill="#10b981" stroke="#34d399" stroke-width="2.5" />
        <text x="200" y="234" font-size="22" text-anchor="middle">⭐</text>

        <!-- Confetti & Celebration Stars -->
        <text x="145" y="90" font-size="16">✨</text>
        <text x="245" y="85" font-size="18">🎉</text>
        <text x="150" y="145" font-size="14">🌟</text>
        <text x="248" y="140" font-size="16">🎊</text>

        <!-- Cheering Free Stick Figure -->
        <!-- Head with Sunglasses & Crown -->
        <circle cx="200" cy="100" r="18" fill="#fde047" stroke="#ca8a04" stroke-width="2.5" />
        <rect x="189" y="95" width="22" height="7" rx="2" fill="#020303" />
        <path d="M 193 109 Q 200 115 207 109" stroke="#000" stroke-width="2" fill="none" />
        <polygon points="188,88 194,92 200,83 206,92 212,88 212,93 188,93" fill="#f59e0b" stroke="#d4af37" stroke-width="1" />

        <!-- Torso -->
        <line x1="200" y1="118" x2="200" y2="175" stroke="#ffffff" stroke-width="5" stroke-linecap="round" />

        <!-- Victory Raised Arms -->
        <line x1="200" y1="130" x2="170" y2="92" stroke="#ffffff" stroke-width="4.5" stroke-linecap="round" />
        <line x1="200" y1="130" x2="230" y2="92" stroke="#ffffff" stroke-width="4.5" stroke-linecap="round" />
        <text x="232" y="90" font-size="16">🏆</text>

        <!-- Standing Legs -->
        <line x1="200" y1="175" x2="185" y2="200" stroke="#ffffff" stroke-width="4.5" stroke-linecap="round" />
        <line x1="200" y1="175" x2="215" y2="200" stroke="#ffffff" stroke-width="4.5" stroke-linecap="round" />
      `;
    } else if (status === 'LOST') {
      bannerText = '💀 6 / 6 STRIKES — CHAT LOST! 💀';
      bannerColor = '#ef4444';
      figureSvg = `
        <!-- Hanging Rope -->
        <line x1="200" y1="30" x2="200" y2="72" stroke="#e2b93b" stroke-width="3" stroke-dasharray="2,2" />
        <ellipse cx="200" cy="74" rx="5" ry="6" fill="none" stroke="#ca8a04" stroke-width="2.5" />

        <!-- Red Alert Danger Glow -->
        <circle cx="200" cy="150" r="70" fill="rgba(239,68,68,0.12)" />

        <!-- 1: Head with X eyes -->
        <circle cx="200" cy="96" r="18" fill="#fde047" stroke="#ef4444" stroke-width="3" />
        <!-- Left X Eye -->
        <line x1="192" y1="91" x2="197" y2="97" stroke="#b91c1c" stroke-width="2" />
        <line x1="197" y1="91" x2="192" y2="97" stroke="#b91c1c" stroke-width="2" />
        <!-- Right X Eye -->
        <line x1="203" y1="91" x2="208" y2="97" stroke="#b91c1c" stroke-width="2" />
        <line x1="208" y1="91" x2="203" y2="97" stroke="#b91c1c" stroke-width="2" />
        <!-- Frown -->
        <path d="M 194 107 Q 200 102 206 107" stroke="#7f1d1d" stroke-width="2" fill="none" />

        <!-- 2: Torso -->
        <line x1="200" y1="114" x2="200" y2="175" stroke="#ef4444" stroke-width="5" stroke-linecap="round" />

        <!-- 3: Left Arm (Limp) -->
        <line x1="200" y1="126" x2="175" y2="165" stroke="#ef4444" stroke-width="4.5" stroke-linecap="round" />

        <!-- 4: Right Arm (Limp) -->
        <line x1="200" y1="126" x2="225" y2="165" stroke="#ef4444" stroke-width="4.5" stroke-linecap="round" />

        <!-- 5: Left Leg -->
        <line x1="200" y1="175" x2="180" y2="230" stroke="#ef4444" stroke-width="4.5" stroke-linecap="round" />

        <!-- 6: Right Leg -->
        <line x1="200" y1="175" x2="220" y2="230" stroke="#ef4444" stroke-width="4.5" stroke-linecap="round" />
      `;
    } else {
      // ACTIVE PLAYING: Progressive strikes 0-6
      bannerColor = strikes >= 5 ? '#ef4444' : (strikes >= 3 ? '#f59e0b' : '#d4af37');
      bannerText = strikes === 0 
        ? 'HANGMAN: SAFE (0 / 6 STRIKES)' 
        : (strikes === 5 ? '⚠️ 1 STRIKE LEFT — CHAT IN DANGER!' : `HANGMAN STRIKES: ${strikes} / 6`);

      // Hanging Rope
      let ropeSvg = `
        <line x1="200" y1="30" x2="200" y2="72" stroke="#e2b93b" stroke-width="3" stroke-dasharray="2,2" />
        <ellipse cx="200" cy="74" rx="5" ry="6" fill="none" stroke="#ca8a04" stroke-width="2.5" />
      `;

      if (strikes === 0) {
        figureSvg = ropeSvg + `
          <!-- Empty Gallows Prompt -->
          <text x="200" y="140" fill="#94a3b8" font-size="13" font-weight="900" text-anchor="middle">NO STRIKES YET</text>
          <text x="200" y="162" fill="#64748b" font-size="11" font-weight="700" text-anchor="middle">GUESS LETTERS IN CHAT!</text>
        `;
      } else {
        // 1: Head
        let headSvg = `
          <circle cx="200" cy="96" r="18" fill="#fde047" stroke="#ca8a04" stroke-width="2.5" />
          <circle cx="194" cy="94" r="2.2" fill="#000" />
          <circle cx="206" cy="94" r="2.2" fill="#000" />
          ${strikes >= 4 ? `
            <!-- Worried Eyebrows & Nervous Mouth -->
            <line x1="191" y1="89" x2="197" y2="92" stroke="#000" stroke-width="1.5" />
            <line x1="203" y1="92" x2="209" y2="89" stroke="#000" stroke-width="1.5" />
            <path d="M 195 106 Q 200 102 205 106" stroke="#000" stroke-width="2" fill="none" />
            <text x="214" y="90" font-size="14">💦</text>
          ` : `
            <path d="M 195 104 Q 200 108 205 104" stroke="#000" stroke-width="1.8" fill="none" />
          `}
        `;

        // 2: Torso
        let torsoSvg = strikes >= 2 ? `
          <line x1="200" y1="114" x2="200" y2="175" stroke="#ffffff" stroke-width="5" stroke-linecap="round" />
        ` : '';

        // 3: Left Arm
        let leftArmSvg = strikes >= 3 ? `
          <line x1="200" y1="126" x2="170" y2="158" stroke="#ffffff" stroke-width="4.5" stroke-linecap="round" />
        ` : '';

        // 4: Right Arm
        let rightArmSvg = strikes >= 4 ? `
          <line x1="200" y1="126" x2="230" y2="158" stroke="#ffffff" stroke-width="4.5" stroke-linecap="round" />
        ` : '';

        // 5: Left Leg
        let leftLegSvg = strikes >= 5 ? `
          <line x1="200" y1="175" x2="175" y2="225" stroke="#ffffff" stroke-width="4.5" stroke-linecap="round" />
        ` : '';

        // 6: Right Leg
        let rightLegSvg = strikes >= 6 ? `
          <line x1="200" y1="175" x2="225" y2="225" stroke="#ffffff" stroke-width="4.5" stroke-linecap="round" />
        ` : '';

        figureSvg = ropeSvg + headSvg + torsoSvg + leftArmSvg + rightArmSvg + leftLegSvg + rightLegSvg;
      }
    }

    return `
      <svg viewBox="0 0 320 270" style="max-width: ${maxWidth}px; max-height: ${maxHeight}px; width: 100%; height: auto; display: block; margin: 0 auto; filter: drop-shadow(0 8px 25px rgba(0,0,0,0.7));">
        <!-- Top Status Text Banner -->
        <text x="160" y="20" fill="${bannerColor}" font-size="12" font-weight="900" text-anchor="middle" letter-spacing="1.5">
          ${bannerText}
        </text>

        <!-- Gallows Platform Base -->
        <line x1="25" y1="250" x2="140" y2="250" stroke="#d4af37" stroke-width="7" stroke-linecap="round" />
        
        <!-- Gallows Upright Pole -->
        <line x1="60" y1="250" x2="60" y2="30" stroke="#d4af37" stroke-width="7" stroke-linecap="round" />
        
        <!-- Gallows Top Horizontal Beam -->
        <line x1="56" y1="30" x2="215" y2="30" stroke="#d4af37" stroke-width="7" stroke-linecap="round" />
        
        <!-- Gallows Diagonal Support Brace -->
        <line x1="60" y1="80" x2="110" y2="30" stroke="#d4af37" stroke-width="5" stroke-linecap="round" />
        
        <!-- Gallows Small Anchor Peg -->
        <circle cx="200" cy="30" r="4" fill="#f59e0b" stroke="#d4af37" stroke-width="1.5" />

        <!-- Ground Shadow Line -->
        <line x1="15" y1="258" x2="305" y2="258" stroke="rgba(212,175,55,0.2)" stroke-width="3" stroke-linecap="round" />

        <!-- Hangman Figure Parts & Animations -->
        ${figureSvg}
      </svg>
    `;
  };
})();
