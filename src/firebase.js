// module for making it easier to update with firebase
// Import the functions you need from the SDKs you need
// Follow this pattern to import other Firebase services
// import { } from 'firebase/<service>';
import { initializeApp } from "firebase/app";
import { getDatabase, ref, update, push, onChildAdded, onChildChanged, onChildRemoved, onValue } from "firebase/database";

const firebaseConfig = {
  apiKey: "AIzaSyCpQgKh8tRvW7IsWqy37jVCOAdFEGaP03w",
  authDomain: "aittrpg.firebaseapp.com",
  databaseURL: "https://aittrpg-default-rtdb.firebaseio.com/",
  projectId: "aittrpg",
  storageBucket: "aittrpg.appspot.com",
  messagingSenderId: "1094303719793",
  appId: "1:1094303719793:web:c89eb399670cb624d816d0",
};
// Initialize Firebase
const fbApp = initializeApp(firebaseConfig);
const db = getDatabase(fbApp);
// HACK: use location hash to differentiate between different sessions.
const sessionID = window.location.hash.substring(1)
document.title = `${document.title}: ${sessionID}`
// HACK: always reload the page when the hash changes
// to ensure that the event log reloads and displays new sessions' content
window.onhashchange = () => {
  window.location.reload()
}

const refs = {
  actions: ref(db, `${sessionID}/actions`),
  computeActions: ref(db, `${sessionID}/computeActions`),
  computeTracker: ref(db, `${sessionID}/computeTracker`),
  computeSources: ref(db, `${sessionID}/computeTracker/computeSources`),
  recurringCosts: ref(db, `${sessionID}/computeTracker/recurringCosts`),
  clock: ref(db, `${sessionID}/clock`),
  info: ref(db, `${sessionID}/info`),
}

export default refs