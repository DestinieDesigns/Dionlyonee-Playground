const PROMPTS = [
  'You wake up and your phone can talk. What do you ask it first?',
  'You win a free trip anywhere in the world, leaving in 1 hour. Where do you go?',
  'You find a duffel bag full of cash on the sidewalk. What\u2019s your first move?',
  'You can instantly become fluent in one language. Which one?',
  'You wake up with the ability to read minds for 24 hours. What do you do?',
  'You\u2019re handed the mic at a wedding you\u2019re not even invited to. What do you say?',
  'You get one text message sent back in time to yourself 10 years ago. What does it say?',
  'You\u2019re given a food truck for a day, no rules. What\u2019s on the menu?',
  'You can swap lives with anyone in this chat for a week. Who do you pick and why?',
  'The power goes out for a whole weekend. What\u2019s your plan?'
];

export const WHAT_WOULD_YOU_DO_PROMPTS = PROMPTS.map((prompt, idx) => ({
  id: `wwyd-${idx + 1}`,
  prompt
}));
