/**
 * Dionlyonee Playground - Score Manager
 * Handles score adjustments, formatting, and high stakes bonuses.
 */
(function () {
  const ScoreManager = {
    formatCurrency(amount) {
      return '$' + Number(amount || 0).toLocaleString();
    },

    formatPoints(points) {
      return Number(points || 0).toLocaleString() + ' PTS';
    },

    awardCash(contestant, amount) {
      if (!contestant) return;
      contestant.roundScore = (contestant.roundScore || 0) + Number(amount);
    },

    deductCash(contestant, amount) {
      if (!contestant) return;
      contestant.roundScore = Math.max(0, (contestant.roundScore || 0) - Number(amount));
    }
  };

  window.ScoreManager = ScoreManager;
})();
