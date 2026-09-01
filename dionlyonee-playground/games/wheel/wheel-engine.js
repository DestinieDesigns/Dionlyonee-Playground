// Dionlyonee Wheel of Fortune — Core Rendering Engine (Pure Vanilla JS)
// Provides 4-row puzzle board formatting and 24-wedge wheel physics/rendering.
// Imported from Dionlyonee-Playground-V2 — this part didn't need rewriting.

(function (root) {
  'use strict';

  // 24 Authentic Wheel of Fortune wedges
  const WHEEL_WEDGES = [
    { label: '$2500', color: '#fbbf24', text: '#000000', type: 'cash', value: 2500 },
    { label: '$600', color: '#ef4444', text: '#ffffff', type: 'cash', value: 600 },
    { label: '$700', color: '#eab308', text: '#000000', type: 'cash', value: 700 },
    { label: '$600', color: '#22c55e', text: '#ffffff', type: 'cash', value: 600 },
    { label: '$650', color: '#f97316', text: '#ffffff', type: 'cash', value: 650 },
    { label: '$500', color: '#3b82f6', text: '#ffffff', type: 'cash', value: 500 },
    { label: '$700', color: '#a855f7', text: '#ffffff', type: 'cash', value: 700 },
    { label: 'BANKRUPT', color: '#09090b', text: '#ef4444', type: 'bankrupt', value: 0 },
    { label: '$600', color: '#ec4899', text: '#ffffff', type: 'cash', value: 600 },
    { label: '$550', color: '#06b6d4', text: '#000000', type: 'cash', value: 550 },
    { label: '$500', color: '#eab308', text: '#000000', type: 'cash', value: 500 },
    { label: '$600', color: '#ef4444', text: '#ffffff', type: 'cash', value: 600 },
    { label: 'LOSE TURN', color: '#ffffff', text: '#09090b', type: 'lose', value: 0 },
    { label: '$700', color: '#22c55e', text: '#ffffff', type: 'cash', value: 700 },
    { label: '$600', color: '#3b82f6', text: '#ffffff', type: 'cash', value: 600 },
    { label: '$650', color: '#f97316', text: '#ffffff', type: 'cash', value: 650 },
    { label: 'FREE PLAY', color: '#84cc16', text: '#000000', type: 'free', value: 500 },
    { label: '$700', color: '#a855f7', text: '#ffffff', type: 'cash', value: 700 },
    { label: 'BANKRUPT', color: '#09090b', text: '#ef4444', type: 'bankrupt', value: 0 },
    { label: '$800', color: '#ec4899', text: '#ffffff', type: 'cash', value: 800 },
    { label: '$500', color: '#06b6d4', text: '#000000', type: 'cash', value: 500 },
    { label: '$650', color: '#eab308', text: '#000000', type: 'cash', value: 650 },
    { label: '$500', color: '#ef4444', text: '#ffffff', type: 'cash', value: 500 },
    { label: '$900', color: '#3b82f6', text: '#ffffff', type: 'cash', value: 900 }
  ];

  // Standard Wheel of Fortune Row Capacities: 12, 14, 14, 12
  const ROW_CAPACITIES = [12, 14, 14, 12];

  function formatWheelBoard(phrase, revealedLetters = [], isSolved = false) {
    if (!phrase || typeof phrase !== 'string') {
      return ROW_CAPACITIES.map((cap) => Array(cap).fill({ type: 'empty' }));
    }

    const cleanPhrase = phrase.trim().toUpperCase();
    const words = cleanPhrase.split(/\s+/).filter(Boolean);
    const lines = wrapWordsToRows(words);
    const rowAssignments = alignLinesTo4Rows(lines);

    return ROW_CAPACITIES.map((capacity, rowIdx) => {
      const lineText = rowAssignments[rowIdx] || '';
      if (!lineText) return Array(capacity).fill({ type: 'empty' });

      const rowTiles = [];
      const lineLen = lineText.length;
      const startPad = Math.max(0, Math.floor((capacity - lineLen) / 2));

      for (let col = 0; col < capacity; col++) {
        if (col < startPad || col >= startPad + lineLen) {
          rowTiles.push({ type: 'empty' });
        } else {
          const char = lineText[col - startPad];
          if (char === ' ') {
            rowTiles.push({ type: 'empty' });
          } else {
            const isRevealed = isSolved || revealedLetters.includes(char) || !isAlpha(char);
            rowTiles.push({ type: 'letter', char: char, isRevealed: isRevealed, isSolved: isSolved });
          }
        }
      }
      return rowTiles;
    });
  }

  function isAlpha(ch) {
    return /^[A-Z0-9]$/i.test(ch);
  }

  function wrapWordsToRows(words) {
    if (words.length === 0) return [];
    const lines = [];
    let currentLine = '';
    for (let word of words) {
      if (!currentLine) {
        currentLine = word;
      } else if ((currentLine + ' ' + word).length <= 14) {
        currentLine += ' ' + word;
      } else {
        lines.push(currentLine);
        currentLine = word;
      }
    }
    if (currentLine) lines.push(currentLine);
    return lines.slice(0, 4);
  }

  function alignLinesTo4Rows(lines) {
    const rows = ['', '', '', ''];
    const count = lines.length;

    if (count === 1) {
      rows[1] = lines[0];
    } else if (count === 2) {
      rows[1] = lines[0];
      rows[2] = lines[1];
    } else if (count === 3) {
      if (lines[0].length <= 12 && lines[2].length <= 14) {
        rows[0] = lines[0];
        rows[1] = lines[1];
        rows[2] = lines[2];
      } else {
        rows[1] = lines[0];
        rows[2] = lines[1];
        rows[3] = lines[2];
      }
    } else if (count >= 4) {
      rows[0] = lines[0];
      rows[1] = lines[1];
      rows[2] = lines[2];
      rows[3] = lines[3];
    }
    return rows;
  }

  function drawWheel(canvas, rotationRad = 0) {
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    const width = canvas.width;
    const height = canvas.height;
    const centerX = width / 2;
    const centerY = height / 2;
    const radius = Math.min(centerX, centerY) - 6;

    ctx.clearRect(0, 0, width, height);

    const numWedges = WHEEL_WEDGES.length;
    const arc = (2 * Math.PI) / numWedges;

    ctx.save();
    ctx.translate(centerX, centerY);
    ctx.rotate(rotationRad);

    for (let i = 0; i < numWedges; i++) {
      const wedge = WHEEL_WEDGES[i];
      const startAngle = i * arc;
      const endAngle = startAngle + arc;

      ctx.beginPath();
      ctx.moveTo(0, 0);
      ctx.arc(0, 0, radius, startAngle, endAngle);
      ctx.closePath();
      ctx.fillStyle = wedge.color;
      ctx.fill();

      ctx.strokeStyle = '#ffffff';
      ctx.lineWidth = 2;
      ctx.stroke();

      ctx.save();
      ctx.rotate(startAngle + arc / 2);
      ctx.textAlign = 'right';
      ctx.fillStyle = wedge.text;
      ctx.font = `bold ${Math.max(10, Math.floor(radius * 0.11))}px Montserrat, Arial, sans-serif`;
      ctx.shadowColor = 'rgba(0,0,0,0.6)';
      ctx.shadowBlur = 3;
      ctx.fillText(wedge.label, radius - 14, 4);
      ctx.restore();
    }

    ctx.beginPath();
    ctx.arc(0, 0, radius, 0, 2 * Math.PI);
    ctx.strokeStyle = '#f59e0b';
    ctx.lineWidth = 6;
    ctx.stroke();

    for (let i = 0; i < numWedges; i++) {
      const pegAngle = i * arc;
      const px = Math.cos(pegAngle) * (radius - 2);
      const py = Math.sin(pegAngle) * (radius - 2);
      ctx.beginPath();
      ctx.arc(px, py, 3, 0, 2 * Math.PI);
      ctx.fillStyle = '#ffffff';
      ctx.fill();
    }

    ctx.restore();
  }

  function getWedgeAtAngle(rotationRad) {
    const numWedges = WHEEL_WEDGES.length;
    const arc = (2 * Math.PI) / numWedges;
    let normalized = (rotationRad + Math.PI / 2) % (2 * Math.PI);
    if (normalized < 0) normalized += 2 * Math.PI;
    let angleFromOrigin = (2 * Math.PI - normalized) % (2 * Math.PI);
    const index = Math.floor(angleFromOrigin / arc) % numWedges;
    return WHEEL_WEDGES[index];
  }

  /**
   * Given a target wedge index, compute a rotation (in radians) that
   * lands the pointer on it, plus several full spins for a satisfying
   * animation. Used by the host when resolving a spin server-side.
   */
  function computeSpinRotation(targetIndex, extraSpins = 5) {
    const numWedges = WHEEL_WEDGES.length;
    const arc = (2 * Math.PI) / numWedges;
    // Land in the middle of the target wedge.
    const targetCenter = targetIndex * arc + arc / 2;
    // Inverse of getWedgeAtAngle(): solve for rotation such that
    // getWedgeAtAngle(rotation) === WHEEL_WEDGES[targetIndex].
    // Verified against getWedgeAtAngle for all 24 wedges — see wheel-engine tests.
    const baseRotation = (3 * Math.PI / 2) - targetCenter;
    return baseRotation + extraSpins * 2 * Math.PI;
  }

  root.WheelEngine = {
    WHEEL_WEDGES: WHEEL_WEDGES,
    ROW_CAPACITIES: ROW_CAPACITIES,
    formatWheelBoard: formatWheelBoard,
    drawWheel: drawWheel,
    getWedgeAtAngle: getWedgeAtAngle,
    getWedgeAtPointer: getWedgeAtAngle,
    computeSpinRotation: computeSpinRotation
  };
})(window);
