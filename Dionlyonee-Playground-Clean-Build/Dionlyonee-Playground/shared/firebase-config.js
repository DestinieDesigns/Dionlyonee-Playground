import {initializeApp} from "https://www.gstatic.com/firebasejs/12.18.0/firebase-app.js";
import {getDatabase} from "https://www.gstatic.com/firebasejs/12.18.0/firebase-database.js";
// Paste your Firebase WEB APP configuration here.
const firebaseConfig={apiKey:"PASTE_YOUR_KEY",authDomain:"PASTE_YOUR_PROJECT.firebaseapp.com",databaseURL:"https://PASTE_YOUR_PROJECT-default-rtdb.firebaseio.com",projectId:"PASTE_YOUR_PROJECT",storageBucket:"PASTE_YOUR_PROJECT.firebasestorage.app",messagingSenderId:"PASTE_YOUR_SENDER_ID",appId:"PASTE_YOUR_APP_ID"};
const app=initializeApp(firebaseConfig);const database=getDatabase(app);export{app,database};