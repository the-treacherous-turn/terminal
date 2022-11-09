import { createStore } from 'vuex'

// import store modules
import eventLogStore from './stores/eventLogStore'
import computeStore from './stores/computeStore'
import computeActionStore from './stores/computeActionStore'
import clockStore from './stores/clockStore'
import infoStore from './stores/infoStore'
import specStore from './stores/specStore'

// HACK: use location hash to differentiate between different sessions.
// HACK: duplicated code getting the sessionID between here and firebase.js
const sessionID = window.location.hash.substring(1)

const store = createStore({
  modules: {
    eventLog: eventLogStore,
    compute: computeStore,
    computeAction: computeActionStore,
    clock: clockStore,
    info: infoStore,
    spec: specStore,
  },
  state () {
    return {
      sessionID: sessionID,
      isGM: false,
    }
  },
  mutations: {
    setIsGM (state, isGM) {
      state.isGM = isGM
    }
  },
})

store.dispatch('listenToFBEventLog')
store.dispatch('listenToFBComputeTracker')
store.dispatch('listenToFBComputeActions')
store.dispatch('listenToFBClock')
store.dispatch('listenToFBInfo')
store.dispatch('listenToFBSpecs')
// TODO: remember to dispatch actions for each module to listen to FB changes

export default store