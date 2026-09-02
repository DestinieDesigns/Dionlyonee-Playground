// Dionlyonee Playground — Shared "Waiting on Host" scene
// One markup builder so Wheel, Jeopardy, and the Game Center all show
// the identical neon cityscape before a game starts. Pair with
// shared/waiting-scene.css.

const BUILDING_HEIGHTS = ['mid', 'tall', 'short', 'mid', 'tall', 'short', 'tall', 'mid', 'short', 'tall', 'mid', 'short'];
const BUILDING_SIGNS = { 1: 'live', 4: 'vip', 7: 'live', 10: 'vip' };

const FLOATING_EMOJIS = [
  { e: '😂', top: 30, left: 6, delay: 0 },
  { e: '🔥', top: 44, left: 10, delay: 0.6 },
  { e: '❤️', top: 58, left: 5, delay: 1.2 },
  { e: '👑', top: 22, left: 16, delay: 0.3 },
  { e: '💬', top: 50, left: 18, delay: 1.8 },
  { e: '😱', top: 28, left: 88, delay: 0.4 },
  { e: '🥰', top: 42, left: 92, delay: 1.0 },
  { e: '🙌', top: 56, left: 86, delay: 1.6 },
  { e: '⭐', top: 20, left: 80, delay: 0.9 },
  { e: '👏', top: 62, left: 78, delay: 0.2 }
];

export function waitingSceneHTML(subtitle = 'The next game starts any moment now...') {
  const beams = `
    <div class="cg-beam green cg-beam-1"></div>
    <div class="cg-beam yellow cg-beam-2"></div>
    <div class="cg-beam green cg-beam-5"></div>
    <div class="cg-beam yellow cg-beam-4"></div>
    <div class="cg-beam green cg-beam-3"></div>
  `;

  const skyline = `
    <div class="cg-skyline">
      ${BUILDING_HEIGHTS.map((h, i) => `
        <div class="cg-building ${h}">
          ${BUILDING_SIGNS[i] ? `<div class="cg-sign ${BUILDING_SIGNS[i]}">${BUILDING_SIGNS[i].toUpperCase()}</div>` : ''}
        </div>
      `).join('')}
    </div>
  `;

  const globe = `<div class="cg-globe"><div class="cg-flag-stripe"></div></div>`;

  const emojis = `
    <div class="cg-floating-emojis">
      ${FLOATING_EMOJIS.map((f) => `
        <span class="cg-emoji" style="top:${f.top}%; left:${f.left}%; animation-delay:${f.delay}s;">${f.e}</span>
      `).join('')}
    </div>
  `;

  const logo = `
    <div class="cg-logo-wrap">
      <div class="cg-logo-gold">DIONLYONEE</div>
      <div class="cg-waiting-title">WAITING ON HOST</div>
      <div class="cg-waiting-sub">${subtitle}</div>
    </div>
  `;

  const hypeButtons = `
    <div class="cg-hype-buttons">
      <span class="cg-hype-btn">✨ SUPPORT THE LIVE</span>
      <span class="cg-hype-btn">👑 JOIN THE CLUB</span>
      <span class="cg-hype-btn">👏 TAP THE LIVE</span>
    </div>
  `;

  return `<div class="cg-waiting-scene">${beams}${skyline}${globe}${emojis}${logo}${hypeButtons}</div>`;
}

/** Render the scene into `container`, replacing its content. */
export function renderWaitingScene(container, subtitle) {
  container.innerHTML = waitingSceneHTML(subtitle);
}
