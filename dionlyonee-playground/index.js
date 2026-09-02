import { RoomSync } from './shared/session-manager.js';

const roomDisplay = document.getElementById('room-code-display');
const btnJoinRoom = document.getElementById('btn-join-room');
const btnNewRoom = document.getElementById('btn-new-room');
const btnCopyRoom = document.getElementById('btn-copy-room');
const roleLinks = document.querySelectorAll('[data-role-link]');

RoomSync.setGameType('hub');

function generateRoomCode() {
  const prefixes = ['DION', 'PLAY', 'GAME', 'LIVE', 'SHOW'];
  const prefix = prefixes[Math.floor(Math.random() * prefixes.length)];
  const number = Math.floor(10 + Math.random() * 89); // 2-digit
  return `${prefix}${number}`;
}

function refreshUI() {
  roomDisplay.textContent = RoomSync.roomId;
  roleLinks.forEach((link) => {
    const base = link.getAttribute('href').split('?')[0];
    link.setAttribute('href', `${base}?room=${RoomSync.roomId}`);
  });
}

btnJoinRoom.addEventListener('click', () => {
  const code = prompt('Enter the room code to join (e.g. DION1, FOX123):', RoomSync.roomId);
  if (code && code.trim()) {
    RoomSync.setRoom(code.trim());
    refreshUI();
  }
});

btnNewRoom.addEventListener('click', () => {
  const code = generateRoomCode();
  RoomSync.setRoom(code);
  refreshUI();
});

btnCopyRoom.addEventListener('click', () => {
  const url = new URL(window.location.href);
  url.searchParams.set('room', RoomSync.roomId);
  navigator.clipboard
    .writeText(url.toString())
    .then(() => alert(`✅ Link copied!\n\nRoom: ${RoomSync.roomId}\n${url.toString()}`))
    .catch(() => prompt('Copy this link:', url.toString()));
});

refreshUI();
