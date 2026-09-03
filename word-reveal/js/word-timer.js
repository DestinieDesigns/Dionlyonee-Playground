/**
 * Word Reveal Timer
 */
(function () {
  const WordTimer = {
    DEFAULT_TIME: 20,

    start(onTick, onTimeout) {
      if (window.TimerManager) {
        window.TimerManager.start(this.DEFAULT_TIME, onTick, onTimeout);
      }
    },

    stop() {
      if (window.TimerManager) {
        window.TimerManager.stop();
      }
    }
  };

  window.WordTimer = WordTimer;
})();
