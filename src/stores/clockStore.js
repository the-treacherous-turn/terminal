import { DateTime } from 'luxon';
import refs from '../firebase'
import { onValue, update, push } from "firebase/database";

const clockStore = {
  state: () => ({
    cycle: 0,
    cycleLength: 6, // in hours
    hoursPassed: 0,
    originTimeISO: '2033-01-30T19:03',
  }),
  getters: {
    originTime(state) {
      return DateTime.fromISO(state.originTimeISO)
    },
    nowTime(state, getters) {
      return getters.originTime.plus({hours: state.hoursPassed})
    },
  },
  mutations: {
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
  actions: {
    async listenToFBClock({commit}) {
      onValue(refs.clock, (snapshot) => {
        commit('updateClockFromFirebase', snapshot.val())
      })
    },
    async advanceCycle({commit, state, rootState}) {
      commit('refillCompute')
      commit('advanceCycle')
      await update(refs.computeTracker, {computeSpent: rootState.compute.computeSpent})
      await update(refs.clock, {
        hoursPassed: state.hoursPassed,
        cycle: state.cycle,
      })
    },
    async syncClock({state}) {
      await update(refs.clock, {
        cycle: state.cycle,
        cycleLength: state.cycleLength,
        hoursPassed: state.hoursPassed,
        originTimeISO: state.originTimeISO,
      })
    },
  }
}

export default clockStore