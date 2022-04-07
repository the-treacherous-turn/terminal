import { createStore } from 'vuex'

// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
// Follow this pattern to import other Firebase services
// import { } from 'firebase/<service>';
import { getAnalytics } from "firebase/analytics";
import { getDatabase, ref, push, set, onChildAdded, onChildChanged, onChildRemoved } from "firebase/database";

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

const store = createStore({
  state () {
    return {
      sessionID: sessionID,
      actions: {},
      isEditorOpen: false,
      dirtyActionID: null,
      // Clock
      cycle: 10,
      cycleLength: 6, // in hours
      hoursPassed: 0,
      originTime: DateTime.fromISO('2033-01-30T19:03'),
      // Compute
      computeTotal: 60,
      baseComputeCost: 5,
      computeToSpend: 0,
      computeSpent: 0,
      computeActions: {
        // DEBUG: add a few actions to test the UI
        'compute1': {
          name: 'Reverse Engineering',
          desc: "You have a general intuition regarding human technology. With sufficient data, you may attempt to analyze a specific technological device with a short Computational Action concluding in a knowledge roll. This analysis allows you to learn the device's function, strengths, and weaknesses, and the same for each of the device's components.",
          computeNeeded: 40,
          computeApplied: 19,
          computeToAdd: 0,
        },
        'compute2': {
          name: 'Truth Assessment',
          desc: "Any time you make a knowledge roll, the size of the Risk Die is reduced by one step.",
          computeNeeded: 60,
          computeApplied: 0,
          computeToAdd: 0,
        },
      },
    }
  },
  getters: {
    dirtyAction(state) {
      return state.actions[state.dirtyActionID]
    },
    nowTime(state) {
      return state.originTime.plus({hours: state.hoursPassed})
      // return state.originTime.plus({ hours: state.cycle * state.cycleLength })
    },
    computeAvailable(state) {
      return state.computeTotal - state.baseComputeCost - state.computeSpent
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
    setClockAttributes(state, {cycle, cycleLength, originTime}) {
      if (state.cycle !== cycle) {
        state.hoursPassed = cycle * cycleLength
        state.cycle = cycle
      }
      state.cycleLength = cycleLength
      state.originTime = originTime
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
    setComputeAttributes(state, {computeTotal, baseComputeCost}) {
      state.computeTotal = computeTotal
      state.baseComputeCost = baseComputeCost
    },
    // compute action
    updateComputeAction(state, {actionID, payload}) {
      const currentComputeAction = state.computeActions[actionID]
      state.computeActions[actionID] = {...currentComputeAction, ...payload}
    },
    assignComputePoints(state) {
      state.computeToSpend = 0
      Object.values(state.computeActions).forEach(action => {
        // HACK vuex doesn't let us access getters within a mutation
        const computeAvailable = state.computeTotal - state.baseComputeCost - state.computeSpent
        // if there isn't enough compute available, then add however much is left
        if (action.computeToAdd > computeAvailable) {
          state.computeSpent += computeAvailable
          action.computeApplied += computeAvailable
        } else {
          state.computeSpent += action.computeToAdd
          action.computeApplied += action.computeToAdd
        }

        // calculate the computes to add for next assign, and new total compute to spend
        const remainingComputeNeeded = action.computeNeeded - action.computeApplied
        // if the bar is almost filled, then set compute to add to the remaining amount
        if (remainingComputeNeeded < action.computeToAdd){
          action.computeToAdd = remainingComputeNeeded
        }
        state.computeToSpend += action.computeToAdd
      })
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
      await set(ref(db, `${sessionID}/actions/${actionID}`), state.actions[actionID])
    },

    async submitActionEdit({commit, state}) {
      const actionID = state.dirtyActionID
      commit('submitActionEdit')
      await set(ref(db, `${sessionID}/actions/${actionID}`), state.actions[actionID])
    },

    async deleteAction({commit}, actionID) {
      commit('deleteAction', actionID)
      await set(ref(db, `${sessionID}/actions/${actionID}`), null)
    },

    async commitAction({commit, state}, actionID) {
      commit('commitAction', actionID)
      await set(ref(db, `${sessionID}/actions/${actionID}`), state.actions[actionID])
    },

    async undoCommitAction({commit, state}, actionID) {
      commit('undoCommitAction', actionID)
      await set(ref(db, `${sessionID}/actions/${actionID}`), state.actions[actionID])
    },

    async markAsForecast({commit, state}, actionID) {
      commit('markAsForecast', actionID)
      await set(ref(db, `${sessionID}/actions/${actionID}`), state.actions[actionID])
    },

    async undoForecastAction({commit, state}, actionID) {
      commit('undoForecastAction', actionID)
      await set(ref(db, `${sessionID}/actions/${actionID}`), state.actions[actionID])
    },

    // clock
    advanceCycle({commit, state}) {
      commit('refillCompute')
      commit('advanceCycle')
      // TODO update firebase
    },
    setClockAttributes({commit, state}, {cycle, cycleLength, originTime}) {
      commit('setClockAttributes', {cycle, cycleLength, originTime})
      // TODO update firebase
    },

    // compute
    setComputeAttributes({commit, state}, payload) {
      commit('setComputeAttributes', payload)
      // TODO update firebase
    },
    // compute actions
    addComputeToApply({commit, state, getters}, actionID) {
      // if there's no compute to spend, then back out
      if (getters.computeAvailable - state.computeToSpend <= 0) return
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
      // TODO update firebase
    },
    subtractComputeToApply({commit, state}, actionID) {
      const ca = state.computeActions[actionID]
      if (ca.computeToAdd === 0) return
      commit('updateComputeAction', {
        actionID,
        payload: {
          computeToAdd: ca.computeToAdd - 1,
        }
      })
      commit('updateComputeToSpend', -1)
      // TODO update firebase
    },
    assignComputePoints({commit, state}) {
      commit('assignComputePoints');
      // TODO update firebase
    },
    // bind to firebase
    async initFirebaseListeners({commit, state}) {
      
      onChildAdded(actionsRef, (data) => {
        commit('setActionWithID', {actionID: data.key, actionObj: data.val()})
      });
      onChildChanged(actionsRef, (data) => {
        commit('setActionWithID', {actionID: data.key, actionObj: data.val()})
      });
      onChildRemoved(actionsRef, (data) => {
        if (!state.actions[data.key]) return // safeguard against unnecessary deletion
        commit('deleteAction', data.key)
      });
      // NOTE do we need to handle 'child_moved'?
    }
  },
})

store.dispatch('initFirebaseListeners')

export default store