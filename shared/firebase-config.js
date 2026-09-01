import {initializeApp} from "https://www.gstatic.com/firebasejs/12.18.0/firebase-app.js";
import {getDatabase} from "https://www.gstatic.com/firebasejs/12.18.0/firebase-database.js";
// Paste your Firebase WEB APP configuration here.
const firebaseConfig={apiKey:"AIzaSyDx1NPIWO_z7vowVKsViqZOdo-LOYPPpPI",authDomain:"dionlyonee-game-test.firebaseapp.com",databaseURL:"https://dionlyonee-game-test-default-rtdb.firebaseio.com",projectId:"dionlyonee-game-test",storageBucket:"dionlyonee-game-test.firebasestorage.app",messagingSenderId:"297655548183",appId:"1:297655548183:web:8703736174f73d99485f52"};
const app=initializeApp(firebaseConfig);const database=getDatabase(app);export{app,database};
