// Dual View Split Screen Mode Switcher Logic (Vanilla JS)
(function () {
  'use strict';

  const btnWheel = document.getElementById('btn-mode-wheel');
  const btnSpeakOut = document.getElementById('btn-mode-speakout');
  const btnJeopardy = document.getElementById('btn-mode-jeopardy');
  const btnMostLikely = document.getElementById('btn-mode-mostlikely');
  const hostFrame = document.getElementById('host-frame');
  const liveFrame = document.getElementById('live-frame');
  const hostPopout = document.getElementById('host-popout-link');
  const livePopout = document.getElementById('live-popout-link');
  const hostPaneTitle = document.getElementById('host-pane-title');
  const livePaneTitle = document.getElementById('live-pane-title');

  function getRoomParam() {
    if (window.RoomSync) return window.RoomSync.roomId;
    const urlParams = new URLSearchParams(window.location.search);
    return (urlParams.get('room') || 'DION1').toUpperCase();
  }

  function setMode(mode) {
    const room = getRoomParam();
    const query = `?room=${encodeURIComponent(room)}`;

    btnWheel?.classList.remove('active');
    btnSpeakOut?.classList.remove('active');
    btnJeopardy?.classList.remove('active');
    btnMostLikely?.classList.remove('active');

    if (mode === 'speakout') {
      btnSpeakOut?.classList.add('active');
      if (hostFrame) hostFrame.src = `speak-out/host/index.html${query}`;
      if (liveFrame) liveFrame.src = `speak-out/live/index.html${query}`;
      if (hostPopout) hostPopout.href = `speak-out/host/index.html${query}`;
      if (livePopout) livePopout.href = `speak-out/live/index.html${query}`;
      if (hostPaneTitle) hostPaneTitle.textContent = 'SPEAK OUT! HOST CONSOLE';
      if (livePaneTitle) livePaneTitle.textContent = 'SPEAK OUT! LIVE BROADCAST STAGE';
    } else if (mode === 'wheel') {
      btnWheel?.classList.add('active');
      if (hostFrame) hostFrame.src = `wheel-host.html${query}`;
      if (liveFrame) liveFrame.src = `wheel-live.html${query}`;
      if (hostPopout) hostPopout.href = `wheel-host.html${query}`;
      if (livePopout) livePopout.href = `wheel-live.html${query}`;
      if (hostPaneTitle) hostPaneTitle.textContent = 'WHEEL OF FORTUNE HOST PANEL';
      if (livePaneTitle) livePaneTitle.textContent = 'WHEEL OF FORTUNE LIVE STAGE';
    } else if (mode === 'jeopardy') {
      btnJeopardy?.classList.add('active');
      if (hostFrame) hostFrame.src = `jeopardy-host.html${query}`;
      if (liveFrame) liveFrame.src = `jeopardy-live.html${query}`;
      if (hostPopout) hostPopout.href = `jeopardy-host.html${query}`;
      if (livePopout) livePopout.href = `jeopardy-live.html${query}`;
      if (hostPaneTitle) hostPaneTitle.textContent = 'JEOPARDY HOST CONTROL PANEL';
      if (livePaneTitle) livePaneTitle.textContent = 'JEOPARDY LIVE AUDIENCE STAGE';
    } else if (mode === 'mostlikely') {
      btnMostLikely?.classList.add('active');
      if (hostFrame) hostFrame.src = `most-likely-host.html${query}`;
      if (liveFrame) liveFrame.src = `most-likely-live.html${query}`;
      if (hostPopout) hostPopout.href = `most-likely-host.html${query}`;
      if (livePopout) livePopout.href = `most-likely-live.html${query}`;
      if (hostPaneTitle) hostPaneTitle.textContent = 'MOST LIKELY HOST CONTROLS';
      if (livePaneTitle) livePaneTitle.textContent = 'MOST LIKELY LIVE STAGE';
    }
  }

  btnWheel?.addEventListener('click', () => setMode('wheel'));
  btnSpeakOut?.addEventListener('click', () => setMode('speakout'));
  btnJeopardy?.addEventListener('click', () => setMode('jeopardy'));
  btnMostLikely?.addEventListener('click', () => setMode('mostlikely'));

  if (window.RoomSync) {
    window.RoomSync.attachRoomHUD('.main-header');
    window.addEventListener('roomchange', () => {
      const activeBtn = document.querySelector('.dual-mode-switch .mode-toggle-btn.active');
      let currentMode = 'wheel';
      if (activeBtn === btnSpeakOut) currentMode = 'speakout';
      else if (activeBtn === btnJeopardy) currentMode = 'jeopardy';
      else if (activeBtn === btnMostLikely) currentMode = 'mostlikely';
      setMode(currentMode);
    });
  }

  // Check URL params for pre-selected mode
  const urlParams = new URLSearchParams(window.location.search);
  const paramMode = urlParams.get('game') || urlParams.get('mode');
  if (paramMode === 'speakout' || paramMode === 'speak-out') {
    setMode('speakout');
  } else if (paramMode === 'mostlikely') {
    setMode('mostlikely');
  } else if (paramMode === 'jeopardy') {
    setMode('jeopardy');
  } else {
    setMode('wheel');
  }
})();
