import {initializeApp} from "https://www.gstatic.com/firebasejs/12.18.0/firebase-app.js";
import {getDatabase} from "https://www.gstatic.com/firebasejs/12.18.0/firebase-database.js";
// Paste your Firebase WEB APP configuration here.
const firebaseConfig=;
const app=initializeApp(firebaseConfig);const database=getDatabase(app);export{app,database};
