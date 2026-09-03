/**
 * Dionlyonee Playground - Universal Stream Game Host Controller
 * Powers Host panels for Finish The Sentence, What Would You Do, Who Would You Pick,
 * Emoji Guess, Unscramble It, Who Dis, Hangman, Charades, and Would You Rather.
 */
(function () {
  'use strict';

  class StreamGameHost {
    constructor(gameId) {
      this.gameId = gameId;
      this.gameMeta = (window.StreamGamesData && window.StreamGamesData[gameId]) || {
        title: gameId.toUpperCase().replace(/-/g, ' '),
        badge: 'STREAM GAME',
        prompts: []
      };

      this.channel = new BroadcastChannel('dionlyonee-stream-games');
      this.prompts = this.gameMeta.prompts || [];
      this.currentIndex = 0;
      this.timerSeconds = 30;
      this.remainingSeconds = 30;
      this.timerInterval = null;
      this.isRunning = false;
      this.revealedClues = 1; // for who-dis
      this.revealedAnswer = false;
      this.votes = { optionA: 0, optionB: 0 };

      this.init();
    }

    init() {
      this.renderHeader();
      this.renderControls();
      this.renderPrompt();
      this.broadcastState();

      this.channel.onmessage = (event) => {
        if (event.data && event.data.type === 'REQUEST_STATE' && event.data.gameId === this.gameId) {
          this.broadcastState();
        }
      };

      // Reset on beforeunload
      window.addEventListener('beforeunload', () => {
        try {
          sessionStorage.removeItem(`dion_stream_game_${this.gameId}`);
        } catch (e) {}
      });
    }

    renderHeader() {
      const header = document.getElementById('host-header');
      if (!header) return;
      header.innerHTML = `
        <div class="host-logo">D</div>
        <div>
          <div class="host-title">DIONLYONEE PLAYGROUND</div>
          <div class="host-game">${this.gameMeta.title} • HOST CONTROLLER</div>
        </div>
        <div style="margin-left: auto; display: flex; gap: 8px;">
          <button type="button" class="time-button" onclick="window.gameHost.openLiveWindow()" style="background: rgba(212,175,55,0.2); border-color: #d4af37;">
            📺 OPEN LIVE STAGE ↗
          </button>
        </div>
      `;
    }

    renderControls() {
      const controls = document.getElementById('host-timer-controls');
      if (!controls) return;
      controls.innerHTML = `
        <div class="host-setting">
          <div class="host-label">TIMER DURATION</div>
          <div>
            <button type="button" class="time-button ${this.timerSeconds === 15 ? 'active' : ''}" onclick="window.gameHost.setDuration(15)">15s</button>
            <button type="button" class="time-button ${this.timerSeconds === 30 ? 'active' : ''}" onclick="window.gameHost.setDuration(30)">30s</button>
            <button type="button" class="time-button ${this.timerSeconds === 45 ? 'active' : ''}" onclick="window.gameHost.setDuration(45)">45s</button>
            <button type="button" class="time-button ${this.timerSeconds === 60 ? 'active' : ''}" onclick="window.gameHost.setDuration(60)">60s</button>
          </div>
        </div>
        <div class="host-setting">
          <div class="host-label">SOUND BOARD</div>
          <div>
            <button type="button" class="cooldown-button" onclick="window.gameHost.playSound('correct')">🔔 DING</button>
            <button type="button" class="cooldown-button" onclick="window.gameHost.playSound('buzz')">❌ BUZZ</button>
            <button type="button" class="cooldown-button" onclick="window.gameHost.playSound('solve')">🎉 SOLVE</button>
          </div>
        </div>
      `;
    }

    renderPrompt() {
      const container = document.getElementById('prompt-container');
      if (!container || !this.prompts.length) return;

      const p = this.prompts[this.currentIndex] || {};
      let html = '';

      if (this.gameId === 'finish-the-sentence') {
        html = `
          <div class="host-status">
            <div>
              <div class="host-label">CATEGORY: ${p.category || 'GENERAL'} (${this.currentIndex + 1}/${this.prompts.length})</div>
              <div class="host-category" style="font-size: 24px; color: #f7e07d;">"${p.setup}"</div>
            </div>
            <div style="text-align: right;">
              <div class="host-label">TIMER</div>
              <div class="host-timer" id="timer-display">${this.remainingSeconds}</div>
            </div>
          </div>
        `;
      } else if (this.gameId === 'what-would-you-do') {
        const opts = (p.options || []).map((opt, i) => `<li style="margin: 6px 0; color: #fff;"><b>${String.fromCharCode(65 + i)}:</b> ${opt}</li>`).join('');
        html = `
          <div class="host-status" style="flex-direction: column; align-items: flex-start;">
            <div class="host-label">SCENARIO (${this.currentIndex + 1}/${this.prompts.length})</div>
            <div class="host-category" style="font-size: 20px; line-height: 1.4; margin: 8px 0;">"${p.scenario}"</div>
            <ul style="padding-left: 20px; margin-top: 10px;">${opts}</ul>
          </div>
        `;
      } else if (this.gameId === 'who-would-you-pick') {
        const choices = (p.choices || []).map((c, i) => `<span style="background: rgba(212,175,55,0.15); border: 1px solid #d4af37; padding: 6px 14px; border-radius: 20px; font-weight: 800; margin: 4px; display: inline-block;">${c}</span>`).join(' ');
        html = `
          <div class="host-status" style="flex-direction: column; align-items: flex-start;">
            <div class="host-label">DRAFT DILEMMA (${this.currentIndex + 1}/${this.prompts.length})</div>
            <div class="host-category" style="font-size: 22px; margin: 8px 0;">${p.question}</div>
            <div style="margin-top: 12px;">${choices}</div>
          </div>
        `;
      } else if (this.gameId === 'emoji-guess') {
        html = `
          <div class="host-status">
            <div>
              <div class="host-label">EMOJIS (${this.currentIndex + 1}/${this.prompts.length})</div>
              <div style="font-size: 48px; margin: 10px 0;">${p.emojis}</div>
              <div class="host-revealed">HINT: ${p.hint || ''}</div>
              <div class="host-answer" style="margin-top: 8px;">ANSWER: ${p.answer}</div>
            </div>
            <div style="text-align: right;">
              <div class="host-label">TIMER</div>
              <div class="host-timer" id="timer-display">${this.remainingSeconds}</div>
            </div>
          </div>
        `;
      } else if (this.gameId === 'unscramble-it') {
        html = `
          <div class="host-status">
            <div>
              <div class="host-label">SCRAMBLED LETTERS (${this.currentIndex + 1}/${this.prompts.length})</div>
              <div style="font-size: 36px; font-weight: 900; letter-spacing: 6px; color: #38bdf8; margin: 10px 0;">${p.scrambled}</div>
              <div class="host-revealed">HINT: ${p.hint || ''}</div>
              <div class="host-answer" style="margin-top: 8px;">UNSCRAMBLED: ${p.answer}</div>
            </div>
            <div style="text-align: right;">
              <div class="host-label">TIMER</div>
              <div class="host-timer" id="timer-display">${this.remainingSeconds}</div>
            </div>
          </div>
        `;
      } else if (this.gameId === 'who-dis') {
        html = `
          <div class="host-status" style="flex-direction: column; align-items: flex-start;">
            <div class="host-label">MYSTERY TARGET (${this.currentIndex + 1}/${this.prompts.length})</div>
            <div class="host-answer" style="color: #d4af37; margin: 6px 0;">TARGET: ${p.name}</div>
            <div style="margin-top: 10px; width: 100%;">
              <div style="padding: 8px; background: rgba(255,255,255,0.05); margin: 4px 0; border-radius: 6px;"><b>CLUE 1:</b> ${p.clue1}</div>
              <div style="padding: 8px; background: rgba(255,255,255,0.05); margin: 4px 0; border-radius: 6px;"><b>CLUE 2:</b> ${p.clue2}</div>
              <div style="padding: 8px; background: rgba(255,255,255,0.05); margin: 4px 0; border-radius: 6px;"><b>CLUE 3:</b> ${p.clue3}</div>
            </div>
            <div style="margin-top: 14px; display: flex; gap: 8px;">
              <button type="button" class="time-button" onclick="window.gameHost.setRevealedClues(1)">Show Clue 1</button>
              <button type="button" class="time-button" onclick="window.gameHost.setRevealedClues(2)">Show Clue 2</button>
              <button type="button" class="time-button" onclick="window.gameHost.setRevealedClues(3)">Show Clue 3</button>
              <button type="button" class="time-button" style="background:#d4af37; color:#000;" onclick="window.gameHost.toggleAnswerReveal()">Reveal Identity</button>
            </div>
          </div>
        `;
      } else if (this.gameId === 'charades') {
        html = `
          <div class="host-status">
            <div>
              <div class="host-label">ACTING PROMPT (${this.currentIndex + 1}/${this.prompts.length})</div>
              <div class="host-category" style="font-size: 24px; color: #f7e07d; margin: 10px 0;">"${p.prompt}"</div>
              <div class="host-revealed">CATEGORY: ${p.category} (NO TALKING!)</div>
            </div>
            <div style="text-align: right;">
              <div class="host-label">TIMER</div>
              <div class="host-timer" id="timer-display">${this.remainingSeconds}</div>
            </div>
          </div>
        `;
      } else if (this.gameId === 'would-you-rather') {
        html = `
          <div class="host-status" style="flex-direction: column; align-items: flex-start;">
            <div class="host-label">WOULD YOU RATHER (${this.currentIndex + 1}/${this.prompts.length})</div>
            <div style="display: grid; grid-template-columns: 1fr 1fr; gap: 15px; width: 100%; margin: 14px 0;">
              <div style="background: rgba(56,189,248,0.1); border: 1px solid #38bdf8; padding: 16px; border-radius: 12px;">
                <div style="font-size: 11px; font-weight: 900; color: #38bdf8;">OPTION A</div>
                <div style="font-size: 18px; font-weight: 800; margin-top: 6px; color: #fff;">${p.optionA}</div>
                <button type="button" class="time-button" style="margin-top: 10px;" onclick="window.gameHost.addVote('A')">+1 Vote A (${this.votes.optionA})</button>
              </div>
              <div style="background: rgba(244,63,94,0.1); border: 1px solid #f43f5e; padding: 16px; border-radius: 12px;">
                <div style="font-size: 11px; font-weight: 900; color: #f43f5e;">OPTION B</div>
                <div style="font-size: 18px; font-weight: 800; margin-top: 6px; color: #fff;">${p.optionB}</div>
                <button type="button" class="time-button" style="margin-top: 10px;" onclick="window.gameHost.addVote('B')">+1 Vote B (${this.votes.optionB})</button>
              </div>
            </div>
          </div>
        `;
      } else {
        // Generic fallback
        html = `
          <div class="host-status">
            <div>
              <div class="host-label">PROMPT (${this.currentIndex + 1}/${this.prompts.length})</div>
              <div class="host-category">${p.word || p.prompt || p.setup || 'Game Prompt'}</div>
            </div>
            <div style="text-align: right;">
              <div class="host-label">TIMER</div>
              <div class="host-timer" id="timer-display">${this.remainingSeconds}</div>
            </div>
          </div>
        `;
      }

      container.innerHTML = html;
    }

    setDuration(seconds) {
      this.timerSeconds = seconds;
      this.remainingSeconds = seconds;
      this.renderControls();
      const timerEl = document.getElementById('timer-display');
      if (timerEl) timerEl.textContent = this.remainingSeconds;
      this.broadcastState();
    }

    startTimer() {
      if (this.isRunning) {
        clearInterval(this.timerInterval);
        this.isRunning = false;
        const btn = document.getElementById('btn-start-timer');
        if (btn) btn.textContent = '▶ START TIMER';
        this.broadcastState();
        return;
      }

      this.isRunning = true;
      const btn = document.getElementById('btn-start-timer');
      if (btn) btn.textContent = '⏸ PAUSE TIMER';

      clearInterval(this.timerInterval);
      this.timerInterval = setInterval(() => {
        if (this.remainingSeconds > 0) {
          this.remainingSeconds--;
          const timerEl = document.getElementById('timer-display');
          if (timerEl) timerEl.textContent = this.remainingSeconds;

          if (this.remainingSeconds <= 3 && this.remainingSeconds > 0) {
            this.playSound('tick');
          }
          this.broadcastState();
        } else {
          clearInterval(this.timerInterval);
          this.isRunning = false;
          if (btn) btn.textContent = '▶ START TIMER';
          this.playSound('buzz');
          this.broadcastState();
        }
      }, 1000);

      this.broadcastState();
    }

    nextPrompt() {
      this.currentIndex = (this.currentIndex + 1) % this.prompts.length;
      this.remainingSeconds = this.timerSeconds;
      this.revealedClues = 1;
      this.revealedAnswer = false;
      this.votes = { optionA: 0, optionB: 0 };
      if (this.isRunning) {
        clearInterval(this.timerInterval);
        this.isRunning = false;
        const btn = document.getElementById('btn-start-timer');
        if (btn) btn.textContent = '▶ START TIMER';
      }
      this.renderPrompt();
      this.broadcastState();
    }

    prevPrompt() {
      this.currentIndex = (this.currentIndex - 1 + this.prompts.length) % this.prompts.length;
      this.remainingSeconds = this.timerSeconds;
      this.revealedClues = 1;
      this.revealedAnswer = false;
      this.votes = { optionA: 0, optionB: 0 };
      this.renderPrompt();
      this.broadcastState();
    }

    setRevealedClues(num) {
      this.revealedClues = num;
      this.renderPrompt();
      this.playSound('correct');
      this.broadcastState();
    }

    toggleAnswerReveal() {
      this.revealedAnswer = !this.revealedAnswer;
      this.renderPrompt();
      if (this.revealedAnswer) this.playSound('solve');
      this.broadcastState();
    }

    addVote(option) {
      if (option === 'A') this.votes.optionA++;
      if (option === 'B') this.votes.optionB++;
      this.renderPrompt();
      this.broadcastState();
    }

    playSound(sound) {
      if (window.Sounds && typeof window.Sounds[sound] === 'function') {
        window.Sounds[sound]();
      }
      this.channel.postMessage({
        type: 'PLAY_SOUND',
        gameId: this.gameId,
        sound: sound
      });
    }

    openLiveWindow() {
      window.open('live.html', '_blank');
    }

    broadcastState() {
      const state = {
        gameId: this.gameId,
        currentIndex: this.currentIndex,
        prompt: this.prompts[this.currentIndex] || {},
        remainingSeconds: this.remainingSeconds,
        isRunning: this.isRunning,
        revealedClues: this.revealedClues,
        revealedAnswer: this.revealedAnswer,
        votes: this.votes,
        timestamp: Date.now()
      };

      try {
        sessionStorage.setItem(`dion_stream_game_${this.gameId}`, JSON.stringify(state));
      } catch (e) {}

      this.channel.postMessage({
        type: 'UPDATE_STATE',
        state: state
      });
    }
  }

  window.StreamGameHost = StreamGameHost;
})();
