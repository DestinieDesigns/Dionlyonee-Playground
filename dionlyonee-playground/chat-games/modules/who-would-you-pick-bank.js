const ITEMS = [
  {
    scenario: 'You\u2019re stuck on an island. Who are you picking to survive with you?',
    options: [
      { label: 'The Chef', emoji: '🍳' },
      { label: 'The Doctor', emoji: '🩺' },
      { label: 'The Gamer', emoji: '🎮' },
      { label: 'The Survival Expert', emoji: '🏕️' }
    ]
  },
  {
    scenario: 'You need a partner for a road trip across the island. Who\u2019s coming?',
    options: [
      { label: 'The DJ', emoji: '🎧' },
      { label: 'The Navigator', emoji: '🗺️' },
      { label: 'The Comedian', emoji: '😂' },
      { label: 'The Mechanic', emoji: '🔧' }
    ]
  },
  {
    scenario: 'You\u2019re starting a business. Who\u2019s your co-founder?',
    options: [
      { label: 'The Hustler', emoji: '💼' },
      { label: 'The Creative', emoji: '🎨' },
      { label: 'The Numbers Person', emoji: '📊' },
      { label: 'The Networker', emoji: '🤝' }
    ]
  },
  {
    scenario: 'Zombie apocalypse. Who\u2019s on your team?',
    options: [
      { label: 'The Athlete', emoji: '🏃' },
      { label: 'The Strategist', emoji: '♟️' },
      { label: 'The Tech Expert', emoji: '💻' },
      { label: 'The Medic', emoji: '⛑️' }
    ]
  }
];

export const WHO_WOULD_YOU_PICK_ITEMS = ITEMS.map((item, idx) => ({
  id: `who-would-you-pick-${idx + 1}`,
  scenario: item.scenario,
  options: item.options
}));
