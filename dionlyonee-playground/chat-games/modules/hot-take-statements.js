const STATEMENTS = [
  'Pineapple belongs on pizza.',
  'It\u2019s okay to wear socks with sandals.',
  'Cereal is a soup.',
  'A hot dog is a sandwich.',
  'You should always tip 20%, no matter the service.',
  'Jerk chicken is better than jerk pork.',
  'It\u2019s fine to check your phone during a movie.',
  'Rice and peas belongs at every Sunday dinner, no exceptions.',
  'Reality TV is scripted and everyone knows it.',
  'You should never split the bill evenly if someone only had a salad.',
  'Working from home is more productive than working in an office.',
  'A remake is never better than the original.'
];

export const HOT_TAKE_STATEMENTS = STATEMENTS.map((statement, idx) => ({
  id: `hot-take-${idx + 1}`,
  statement
}));
