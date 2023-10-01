// module for making it easier to update with firebase
// Import the functions you need from the SDKs you need
// Follow this pattern to import other Firebase services
// import { } from 'firebase/<service>';
import { initializeApp } from "firebase/app";
import { getDatabase, connectDatabaseEmulator, ref, onDisconnect } from "firebase/database";

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

// enable firebase emulator for local development
if (location.hostname === "localhost") {
  connectDatabaseEmulator(db, "127.0.0.1", 9000)
}

// HACK: use location hash to differentiate between different sessions.
const sessionID = window.location.hash.substring(1);
document.title = `${document.title}: ${sessionID}`;
window.onhashchange = () => {
  window.location.reload();
};

export const updateUser = (userId, users, openGM, gmUsers) => {
  if (openGM && gmUsers) {
    const index = gmUsers.indexOf(userId);
    const gmUserRef = ref(db, `${sessionID}/gmUsers/${index}`);
    onDisconnect(gmUserRef).remove()
  }
  if (users) {
    const index = users.indexOf(userId);
    const userRef = ref(db, `${sessionID}/users/${index}`);
    onDisconnect(userRef).remove()
  }
};

const refs = {
  wholeData: ref(db, `${sessionID}/`),
  actions: ref(db, `${sessionID}/actions`),
  computeActions: ref(db, `${sessionID}/computeActions`),
  computeTracker: ref(db, `${sessionID}/computeTracker`),
  computeSources: ref(db, `${sessionID}/computeTracker/computeSources`),
  recurringCosts: ref(db, `${sessionID}/computeTracker/recurringCosts`),
  clock: ref(db, `${sessionID}/clock`),
  info: ref(db, `${sessionID}/info`),
  customCampaignNotes: ref(db, `${sessionID}/info/customCampaignNotes`),
  customInPlayNotes: ref(db, `${sessionID}/info/customInPlayNotes`),
  specs: ref(db, `${sessionID}/specs`),
  gmNPCs: ref(db, `${sessionID}/gmNPCs`),
  notes: ref(db, `${sessionID}/gmNotes/notes`),
  gmNotes: ref(db, `${sessionID}/gmNotes`),
  gmClock: ref(db, `${sessionID}/gmClock`),
};

export default refs;
