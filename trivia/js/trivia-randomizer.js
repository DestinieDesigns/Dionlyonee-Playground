/**
 * Trivia Randomizer
 */
(function () {
  const TriviaRandomizer = {
    pickQuestion(tier = 'all') {
      const pool = tier === 'all' 
        ? (window.TriviaData ? window.TriviaData.getAll() : []) 
        : (window.TriviaData ? window.TriviaData.getByTier(tier) : []);

      if (window.UsedContentManager) {
        const unused = window.UsedContentManager.filterUnused(pool);
        const q = unused[Math.floor(Math.random() * unused.length)];
        if (q) window.UsedContentManager.markUsed(q.id);
        return q;
      }
      return pool[Math.floor(Math.random() * pool.length)];
    }
  };

  window.TriviaRandomizer = TriviaRandomizer;
})();
