const PROMPTS = [
  'I knew I was in trouble when...',
  'The last thing I expected to hear at 3am was...',
  'My family group chat exploded because...',
  'You know you\u2019re Jamaican when...',
  'The weirdest thing in my fridge right now is...',
  'I almost got fired because...',
  'The most Jamaican thing my grandma ever said was...',
  'I knew the date was over when...',
  'The worst gift I ever received was...',
  'My most embarrassing autocorrect fail was...',
  'The one rule in my house that can never be broken is...',
  'I still can\u2019t believe I survived...'
];

export const FINISH_SENTENCE_PROMPTS = PROMPTS.map((prompt, idx) => ({
  id: `finish-sentence-${idx + 1}`,
  prompt
}));
