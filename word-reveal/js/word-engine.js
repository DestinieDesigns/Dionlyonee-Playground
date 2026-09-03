/**
 * Word Reveal Engine
 */
(function () {
  class WordEngine {
    constructor() {
      this.currentText = '';
      this.revealedIndices = new Set();
    }

    setText(text) {
      this.currentText = String(text || '').toUpperCase();
      this.revealedIndices.clear();
      // Auto reveal punctuation & spaces
      for (let i = 0; i < this.currentText.length; i++) {
        if (!/[A-Z]/.test(this.currentText[i])) {
          this.revealedIndices.add(i);
        }
      }
    }

    revealIndex(idx) {
      if (idx >= 0 && idx < this.currentText.length) {
        this.revealedIndices.add(idx);
      }
    }

    revealNextLetter() {
      const hidden = [];
      for (let i = 0; i < this.currentText.length; i++) {
        if (!this.revealedIndices.has(i)) {
          hidden.push(i);
        }
      }
      if (hidden.length > 0) {
        const pick = hidden[Math.floor(Math.random() * hidden.length)];
        this.revealedIndices.add(pick);
        return pick;
      }
      return -1;
    }

    revealAll() {
      for (let i = 0; i < this.currentText.length; i++) {
        this.revealedIndices.add(i);
      }
    }

    isFullyRevealed() {
      return this.revealedIndices.size >= this.currentText.length;
    }
  }

  window.WordEngine = new WordEngine();
})();
