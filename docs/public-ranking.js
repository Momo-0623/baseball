import { initializeApp } from 'https://www.gstatic.com/firebasejs/12.15.0/firebase-app.js';
import { getFirestore, collection, query, orderBy, limit, onSnapshot } from 'https://www.gstatic.com/firebasejs/12.15.0/firebase-firestore.js';
import { firebaseConfig } from './firebase-config.js';
const listEl = document.querySelector('#rankingList');
const emptyEl = document.querySelector('#emptyMessage');
const db = getFirestore(initializeApp(firebaseConfig));
onSnapshot(query(collection(db, 'baseballRanking'), orderBy('totalPoints', 'desc'), limit(100)), (snapshot) => {
  const players = snapshot.docs.map((item) => item.data()); listEl.innerHTML = ''; emptyEl.hidden = players.length > 0;
  if (!players.length) emptyEl.textContent = 'まだ記録がありません。';
  players.forEach((player, index) => { const item = document.createElement('li'); item.innerHTML = `<span class="rank">${String(index + 1).padStart(2, '0')}</span><span class="player"></span><span class="points">${Number(player.totalPoints || 0)}<small> pt</small><span class="date"></span></span>`; item.querySelector('.player').textContent = player.name || 'GUEST'; item.querySelector('.date').textContent = `${Number(player.totalPlays || 0)} 打席　${player.lastOutcome || ''}`; listEl.appendChild(item); });
}, () => { emptyEl.hidden = false; emptyEl.textContent = 'ランキングを読み込めません。'; });
