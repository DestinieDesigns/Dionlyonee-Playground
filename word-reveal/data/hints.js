/**
 * Word Reveal Hints Dataset
 */
(function () {
  const HintsData = {
    getHint(item) {
      if (!item) return '';
      return item.hint || 'No hint provided for this phrase.';
    }
  };

  window.HintsData = HintsData;
})();
