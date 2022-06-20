import { createStore } from 'vuex'

import { DateTime } from 'luxon';

import { update, push, onChildAdded, onChildChanged, onChildRemoved, onValue } from "firebase/database";

import refs from './firebase'

// import store modules
import computeStore from './stores/computeStore'
import computeActionStore from './stores/computeActionStore'

// HACK: use location hash to differentiate between different sessions.
// HACK: duplicated code getting the sessionID between here and firebase.js
const sessionID = window.location.hash.substring(1)

const store = createStore({
  modules: {
    compute: computeStore,
    computeAction: computeActionStore,
  },
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
    setCycle(state, cycle) {
      state.cycle = cycle
    },
    setCycleLength(state, cycleLength) {
      state.cycleLength = cycleLength
    },
    setOriginTimeISO(state, originTimeISO) {
      state.originTimeISO = originTimeISO
    },
    updateClockFromFirebase(state, {cycle, cycleLength, hoursPassed, originTimeISO}) {
      // state = {...state, ...payload} // NOTE : this doesn't work due to JS reactivity issues
      if (cycle !== undefined) state.cycle = cycle
      if (cycleLength !== undefined) state.cycleLength = cycleLength
      if (hoursPassed !== undefined) state.hoursPassed = hoursPassed
      if (originTimeISO !== undefined) state.originTimeISO = originTimeISO
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
      const actionID = await push(refs.actions, actionObj).key
      commit('editNewAction', {actionID, actionObj})
    },

    async editExtantAction({commit, state}, actionID) {
      commit('editExtantAction', actionID)
      await update(refs.actions, {[actionID]: state.actions[actionID]})
    },

    async submitActionEdit({commit, state}) {
      const actionID = state.dirtyActionID
      commit('submitActionEdit')
      await update(refs.actions, {[actionID]: state.actions[actionID]})
    },

    async deleteAction({commit}, actionID) {
      commit('deleteAction', actionID)
      await update(refs.actions, {[actionID]: null})
    },

    async commitAction({commit, state}, actionID) {
      commit('commitAction', actionID)
      await update(refs.actions, {[actionID]: state.actions[actionID]})
    },

    async undoCommitAction({commit, state}, actionID) {
      commit('undoCommitAction', actionID)
      await update(refs.actions, {[actionID]: state.actions[actionID]})
    },

    async markAsForecast({commit, state}, actionID) {
      commit('markAsForecast', actionID)
      await update(refs.actions, {[actionID]: state.actions[actionID]})
    },

    async undoForecastAction({commit, state}, actionID) {
      commit('undoForecastAction', actionID)
      await update(refs.actions, {[actionID]: state.actions[actionID]})
    },

    // clock
    async advanceCycle({commit, state}) {
      commit('refillCompute')
      commit('advanceCycle')
      await update(refs.computeTracker, {computeSpent: state.compute.computeSpent})
      await update(refs.clock, {
        hoursPassed: state.hoursPassed,
        cycle: state.cycle,
      })
    },
    async setClockAttributes({commit, state}, {cycle, cycleLength, originTimeISO}) {
      commit('setClockAttributes', {cycle, cycleLength, originTimeISO})
      await update(refs.clock, {cycle, cycleLength, originTimeISO})
    },
    async syncClock({state}) {
      await update(refs.clock, {
        cycle: state.cycle,
        cycleLength: state.cycleLength,
        hoursPassed: state.hoursPassed,
        originTimeISO: state.originTimeISO,
      })
    },

    // bind to firebase
    async initFirebaseListeners({commit, state}) {
      // NOTE do we need to handle 'child_moved'?
      // actions
      onChildAdded(refs.actions, (snapshot) => {
        commit('setActionWithID', {actionID: snapshot.key, actionObj: snapshot.val()})
      });
      onChildChanged(refs.actions, (snapshot) => {
        commit('setActionWithID', {actionID: snapshot.key, actionObj: snapshot.val()})
      });
      onChildRemoved(refs.actions, (snapshot) => {
        if (!state.actions[snapshot.key]) return // safeguard against unnecessary deletion
        commit('deleteAction', snapshot.key)
      });
      // clock
      onValue(refs.clock, (snapshot) => {
        commit('updateClockFromFirebase', snapshot.val())
      });
    }
  },
})

store.dispatch('initFirebaseListeners')
store.dispatch('listenToFBComputeTracker')
store.dispatch('listenToFBComputeActions')
// TODO: remember to dispatch actions for each module to listen to FB changes

export default store