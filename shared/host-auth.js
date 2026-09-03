/**
 * Dionlyonee Playground - Host Auth
 * Host controls are open and accessible directly without passcode barriers
 */
(function () {
  const HostAuth = {
    isUnlocked() {
      return true;
    },

    verify(_input) {
      return true;
    },

    lock() {
      // No locking needed
    },

    requireHostAccess(onUnlocked) {
      if (typeof onUnlocked === 'function') {
        onUnlocked();
      }
    }
  };

  window.HostAuth = HostAuth;
})();
