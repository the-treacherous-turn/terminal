import { createStore } from "vuex";

// import store modules
import eventLogStore from "./stores/eventLogStore";
import computeStore from "./stores/computeStore";
import computeActionStore from "./stores/computeActionStore";
import clockStore from "./stores/clockStore";
import infoStore from "./stores/infoStore";
import specStore from "./stores/specStore";
import gmNPCStore from "./stores/gmNPCStore";
import gmNotesStore from "./stores/gmNotesStore";
import gmClockStore from "./stores/gmClockStore";
import refs from "./firebase";
import { onValue, update } from "firebase/database";

// HACK: use location hash to differentiate between different sessions.
// HACK: duplicated code getting the sessionID between here and firebase.js
const sessionID = window.location.hash.substring(1);

const store = createStore({
  modules: {
    eventLog: eventLogStore,
    compute: computeStore,
    computeAction: computeActionStore,
    clock: clockStore,
    info: infoStore,
    spec: specStore,
    gmNPC: gmNPCStore,
    gmNOTES: gmNotesStore,
    gmCLOCK: gmClockStore,
  },
  state() {
    return {
      sessionID: sessionID,
      isGM: false,
      wholeData: [],
      finishedLoading: false,
      stateofDisplayMode: false,
    };
  },
  mutations: {
    setIsGM(state, isGM) {
      state.isGM = isGM;
    },
    updateData(state, data) {
      state.wholeData = data;
      state.finishedLoading = true;
    },
    setIsDisplayModal(state, stateofDisplayMode) {
      state.stateofDisplayMode = stateofDisplayMode;
    },
  },
  actions: {
    async listenToFBWholeData({ commit }) {
      onValue(refs.wholeData, (snapshot) => {
        const data = snapshot.val() === null ? {} : snapshot.val();
        commit("updateData", data);
      });
    },
    async updateWholeData({ commit }, changesObj) {
      await update(refs.wholeData, changesObj);
    },
  },
});

store.dispatch("listenToFBWholeData");
store.dispatch("listenToFBEventLog");
store.dispatch("listenToFBComputeTracker");
store.dispatch("listenToFBComputeActions");
store.dispatch("listenToFBClock");
store.dispatch("listenToFBInfo");
store.dispatch("listenToFBSpecs");
store.dispatch("listenToFBGMNPC");
store.dispatch("listenToFBGMNOTES");
store.dispatch("listenToFBGMCLOCK");

// TODO: remember to dispatch actions for each module to listen to FB changes

export default store;
