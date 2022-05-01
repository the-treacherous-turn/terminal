import { createStore } from 'vuex'

// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
// Follow this pattern to import other Firebase services
// import { } from 'firebase/<service>';
import { getAnalytics } from "firebase/analytics";
import { getDatabase, ref, update, push, onChildAdded, onChildChanged, onChildRemoved, onValue } from "firebase/database";

import { DateTime } from 'luxon';

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
const analytics = getAnalytics(fbApp);
const db = getDatabase(fbApp);
// HACK: use location hash to differentiate between different sessions.
const sessionID = window.location.hash.substring(1)
document.title = `${document.title}: ${sessionID}`
// HACK: always reload the page when the hash changes
// to ensure that the event log reloads and displays new sessions' content
window.onhashchange = () => {
  window.location.reload()
}
const actionsRef = ref(db, `${sessionID}/actions`)
const computeActionsRef = ref(db, `${sessionID}/computeActions`)
const computeTrackerRef = ref(db, `${sessionID}/computeTracker`)
const clockRef = ref(db, `${sessionID}/clock`)

const store = createStore({
  state () {
    return {
      sessionID: sessionID,
      // Event Log Actions
      actions: {},
      isEditorOpen: false,
      dirtyActionID: null,
      // Clock
      cycle: 0,
      cycleLength: 6, // in hours
      hoursPassed: 0,
      originTimeISO: '2033-01-30T19:03',
      // Compute
      computeTotal: 60,
      baseComputeCost: 5,
      computeToSpend: 0,
      computeSpent: 0,
      // Compute Actions
      computeActions: {},
      dirtyComputeActionID: null,
    }
  },
  getters: {
    dirtyAction(state) {
      return state.actions[state.dirtyActionID]
    },
    originTime(state) {
      return DateTime.fromISO(state.originTimeISO)
    },
    nowTime(state, getters) {
      return getters.originTime.plus({hours: state.hoursPassed})
    },
    computeAvailable(state) {
      return state.computeTotal - state.baseComputeCost - state.computeSpent
    },
    hasComputeBudget(state, getters) {
      return getters.computeAvailable - state.computeToSpend > 0
    },
    dirtyComputeAction(state) {
      return state.computeActions[state.dirtyComputeActionID]
    },
  },
  mutations: {
    setActionWithID(state, {actionID, actionObj}) {
      state.actions[actionID] = actionObj
    },
    editNewAction(state, {actionID, actionObj}) {
      // create new action
      store.commit('setActionWithID', {actionID, actionObj})
      state.dirtyActionID = actionID
      // open the editor
      state.isEditorOpen = true
    },
    editExtantAction(state, actionID) {
      state.dirtyActionID = actionID
      state.actions[state.dirtyActionID].isDirty = true
      state.isEditorOpen = true
    },
    updateAction (state, payload) {
      if (state.dirtyActionID === null) return // safeguard against creating null action
      const currentAction = state.actions[state.dirtyActionID]
      state.actions[state.dirtyActionID] = {...currentAction, ...payload}
    },
    submitActionEdit (state) {
      state.actions[state.dirtyActionID].isDirty = false
      state.actions[state.dirtyActionID].isNew = false
      state.dirtyActionID = null
    },
    commitAction (state, actionID) {
      state.actions[actionID].isCommitted = true
    },
    undoCommitAction (state, actionID) {
      state.actions[actionID].isCommitted = false
    },
    markAsForecast (state, actionID) {
      state.actions[actionID].isForecast = true
    },
    undoForecastAction (state, actionID) {
      state.actions[actionID].isForecast = false
    },
    deleteAction(state, actionID) {
      if (!state.actions[actionID]) throw new Error(`Cannot delete action ${actionID}: action does not exist`)
      delete state.actions[actionID]
    },
    openEditor(state) {
      state.isEditorOpen = true
    },
    closeEditor(state) {
      state.isEditorOpen = false
    },

    // clock
    advanceCycle(state) {
      state.hoursPassed += state.cycleLength
      state.cycle++
    },
    setClockAttributes(state, {cycle, cycleLength, originTimeISO}) {
      if (state.cycle !== cycle) {
        state.hoursPassed = cycle * cycleLength
        state.cycle = cycle
      }
      state.cycleLength = cycleLength
      state.originTimeISO = originTimeISO
    },
    updateClockFromFirebase(state, {cycle, cycleLength, hoursPassed, originTimeISO}) {
      // state = {...state, ...payload} // NOTE : this doesn't work due to JS reactivity issues
      if (cycle !== undefined) state.cycle = cycle
      if (cycleLength !== undefined) state.cycleLength = cycleLength
      if (hoursPassed !== undefined) state.hoursPassed = hoursPassed
      if (originTimeISO !== undefined) state.originTimeISO = originTimeISO
    },
    // compute
    refillCompute(state) {
      state.computeSpent = 0
    },
    updateComputeSpent(state, change) {
      state.computeSpent += change
    },
    updateComputeToSpend(state, change) {
      state.computeToSpend += change
    },
    updateComputeTrackerFromFirebase(state, {computeTotal, baseComputeCost, computeSpent, computeToSpend}) {
      if (computeTotal !== undefined) state.computeTotal = computeTotal
      if (baseComputeCost !== undefined) state.baseComputeCost = baseComputeCost
      if (computeSpent !== undefined) state.computeSpent = computeSpent
      if (computeToSpend !== undefined) state.computeToSpend = computeToSpend
    },
    setComputeAttributes(state, {computeTotal, baseComputeCost}) {
      state.computeTotal = computeTotal
      state.baseComputeCost = baseComputeCost
    },
    // compute action
    updateComputeAction(state, {actionID, payload}) {
      const currentComputeAction = state.computeActions[actionID] // this may be undefined, in which case we'd be creating a new action
      state.computeActions[actionID] = {...currentComputeAction, ...payload}
    },
    editNewComputeAction(state, {actionID, actionObj}) {
      // create new compute action
      store.commit('updateComputeAction', {actionID, payload: actionObj})
      state.dirtyComputeActionID = actionID
    },
    editExtantComputeAction(state, actionID) {
      state.dirtyComputeActionID = actionID
      state.computeActions[state.dirtyComputeActionID].isDirty = true
    },
    // this edit submission relies in the dirty compute action.
    submitComputeActionEdit(state) {
      if (state.dirtyComputeActionID === null) return //safeguard
      state.computeActions[state.dirtyComputeActionID].isDirty = false
      state.computeActions[state.dirtyComputeActionID].isNew = false
      state.dirtyComputeActionID = null
    },
    deleteComputeAction(state, computeActionID) {
      if (!state.computeActions[computeActionID]) throw new Error(`Cannot delete compute action ${computeActionID}: compute action does not exist`)
      delete state.computeActions[computeActionID]
    },
  },
  
  // vuex actions
  actions: {

    async editNewAction({commit}) {
      // create new action
      const actionObj = {
        name:'',
        description:'',
        isDirty: true,
        isNew: true,
        isCommitted: false,
        isForecast: false,
      }
      // push a new action into the database
      const actionID = await push(actionsRef, actionObj).key
      commit('editNewAction', {actionID, actionObj})
    },

    async editExtantAction({commit, state}, actionID) {
      commit('editExtantAction', actionID)
      await update(actionsRef, {[actionID]: state.actions[actionID]})
    },

    async submitActionEdit({commit, state}) {
      const actionID = state.dirtyActionID
      commit('submitActionEdit')
      await update(actionsRef, {[actionID]: state.actions[actionID]})
    },

    async deleteAction({commit}, actionID) {
      commit('deleteAction', actionID)
      await update(actionsRef, {[actionID]: null})
    },

    async commitAction({commit, state}, actionID) {
      commit('commitAction', actionID)
      await update(actionsRef, {[actionID]: state.actions[actionID]})
    },

    async undoCommitAction({commit, state}, actionID) {
      commit('undoCommitAction', actionID)
      await update(actionsRef, {[actionID]: state.actions[actionID]})
    },

    async markAsForecast({commit, state}, actionID) {
      commit('markAsForecast', actionID)
      await update(actionsRef, {[actionID]: state.actions[actionID]})
    },

    async undoForecastAction({commit, state}, actionID) {
      commit('undoForecastAction', actionID)
      await update(actionsRef, {[actionID]: state.actions[actionID]})
    },

    // clock
    async advanceCycle({commit, state}) {
      commit('refillCompute')
      commit('advanceCycle')
      await update(computeTrackerRef, {computeSpent: state.computeSpent})
      await update(clockRef, {
        hoursPassed: state.hoursPassed,
        cycle: state.cycle,
      })
    },
    async setClockAttributes({commit, state}, {cycle, cycleLength, originTimeISO}) {
      commit('setClockAttributes', {cycle, cycleLength, originTimeISO})
      await update(clockRef, {cycle, cycleLength, originTimeISO})
    },

    // compute
    async setComputeAttributes({commit, state}, payload) {
      commit('setComputeAttributes', payload)
      await update(computeTrackerRef, payload)
    },
    // compute actions
    async editNewComputeAction({commit}) {
      const actionObj = {
        name:'',
        desc:'',
        computeNeeded: 0,
        computeApplied: 0,
        computeToAdd: 0,
        isDirty: true,
        isNew: true,
      }
      const actionID = await push(computeActionsRef, actionObj).key
      commit('editNewComputeAction', {actionID, actionObj})
    },
    async editExtantComputeAction({commit, state}, actionID) {
      commit('editExtantComputeAction', actionID)
      await update(computeActionsRef, {[actionID]: state.computeActions[actionID]})
    },
    async submitComputeAction({commit, state}) {
      const actionID = state.dirtyComputeActionID
      commit('submitComputeActionEdit')
      await update(computeActionsRef, {[actionID]: state.computeActions[actionID]})
    },
    async deleteComputeAction({commit}, actionID) {
      commit('deleteComputeAction', actionID)
      await update(computeActionsRef, {[actionID]: null})
    },
    async addComputeToApply({commit, state, getters}, actionID) {
      // if there's no compute to spend, then back out
      if (!getters.hasComputeBudget) return
      const ca = state.computeActions[actionID]
      // if the compute action is maxed out, then back out
      if (ca.computeNeeded <= ca.computeApplied + ca.computeToAdd) return
      commit('updateComputeAction', {
        actionID,
        payload: {
          computeToAdd: ca.computeToAdd + 1,
        }
      })
      commit('updateComputeToSpend', 1)
      await update(computeActionsRef, {[actionID]: state.computeActions[actionID]})
      // NOTE this is where splitting store to modules would be helpful
      await update(computeTrackerRef, {computeToSpend: state.computeToSpend})
    },
    async subtractComputeToApply({commit, state}, actionID) {
      const ca = state.computeActions[actionID]
      if (ca.computeToAdd === 0) return
      commit('updateComputeAction', {
        actionID,
        payload: {
          computeToAdd: ca.computeToAdd - 1,
        }
      })
      commit('updateComputeToSpend', -1)
      await update(computeActionsRef, {[actionID]: state.computeActions[actionID]})
      await update(computeTrackerRef, {computeToSpend: state.computeToSpend})
    },
    // calculate compute point assignment
    async assignComputePoints({state, getters}) {
      state.computeToSpend = 0
      Object.values(state.computeActions).forEach(ca => {
        const computeAvailable = getters.computeAvailable
        // if there isn't enough compute available, then add however much is left
        if (ca.computeToAdd > computeAvailable) {
          state.computeSpent += computeAvailable
          ca.computeApplied += computeAvailable
        } else {
          state.computeSpent += ca.computeToAdd
          ca.computeApplied += ca.computeToAdd
        }

        // calculate the computes to add for next assign, and new total compute to spend
        const remainingComputeNeeded = ca.computeNeeded - ca.computeApplied
        // if the bar is almost filled, then set compute to add to the remaining amount
        if (remainingComputeNeeded < ca.computeToAdd){
          ca.computeToAdd = remainingComputeNeeded
        }
        state.computeToSpend += ca.computeToAdd
      })
      await update(computeActionsRef, state.computeActions)
      await update(computeTrackerRef, {
        computeToSpend: state.computeToSpend,
        computeSpent: state.computeSpent,
      })
    },
    // bind to firebase
    async initFirebaseListeners({commit, state}) {
      // NOTE do we need to handle 'child_moved'?
      // actions
      onChildAdded(actionsRef, (snapshot) => {
        commit('setActionWithID', {actionID: snapshot.key, actionObj: snapshot.val()})
      });
      onChildChanged(actionsRef, (snapshot) => {
        commit('setActionWithID', {actionID: snapshot.key, actionObj: snapshot.val()})
      });
      onChildRemoved(actionsRef, (snapshot) => {
        if (!state.actions[snapshot.key]) return // safeguard against unnecessary deletion
        commit('deleteAction', snapshot.key)
      });
      // computeActions
      onChildAdded(computeActionsRef, (snapshot) => {
        commit('updateComputeAction', {actionID: snapshot.key, payload: snapshot.val()})
      });
      onChildChanged(computeActionsRef, (snapshot) => {
        commit('updateComputeAction', {actionID: snapshot.key, payload: snapshot.val()})
      });
      onChildRemoved(computeActionsRef, (snapshot) => {
        if (!state.computeActions[snapshot.key]) return // safeguard against unnecessary deletion
        commit('deleteComputeAction', snapshot.key)
      });
      // computeTracker
      onValue(computeTrackerRef, (snapshot) => {
        commit('updateComputeTrackerFromFirebase', snapshot.val())
      });
      // clock
      onValue(clockRef, (snapshot) => {
        commit('updateClockFromFirebase', snapshot.val())
      });
    }
  },
})

store.dispatch('initFirebaseListeners')

export default store