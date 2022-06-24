import { DateTime } from 'luxon';
import refs from '../firebase'
import { onValue, update, push } from "firebase/database";

const clockStore = {
  state: () => ({
    cycle: 0,
    cycleLength: 6, // in hours
    hoursPassed: 0,
    originTimeISO: '2033-01-30T12:34',
    nowTimeISO: '2033-01-30T12:34',
  }),
  getters: {
    originTime(state) {
      return DateTime.fromISO(state.originTimeISO)
    },
    nowTime(state) {
      return DateTime.fromISO(state.nowTimeISO)
    }
  },
  mutations: {
    advanceCycle(state) {
      let nowTime = DateTime.fromISO(state.nowTimeISO)
      nowTime = nowTime.plus({hours: state.cycleLength})
      state.nowTimeISO = nowTime.toISO({includeOffset:false,suppressSeconds:true})
      state.hoursPassed += state.cycleLength
      state.cycle++
    },
    setCycle(state, cycle) {
      state.cycle = cycle
    },
    setCycleLength(state, cycleLength) {
      state.cycleLength = cycleLength
    },
    setNowTimeISO(state, nowTimeISO) {
      state.nowTimeISO = nowTimeISO
    },
    setOriginTimeISO(state, originTimeISO) {
      state.originTimeISO = originTimeISO
    },
    updateClockFromFirebase(state, {cycle, cycleLength, nowTimeISO, originTimeISO}) {
      // state = {...state, ...payload} // NOTE : this doesn't work due to JS reactivity issues
      if (cycle !== undefined) state.cycle = cycle
      if (cycleLength !== undefined) state.cycleLength = cycleLength
      if (nowTimeISO !== undefined) state.nowTimeISO = nowTimeISO
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
        nowTimeISO: state.nowTimeISO,
        cycle: state.cycle,
      })
    },
    async syncClock({state}) {
      await update(refs.clock, {
        cycle: state.cycle,
        cycleLength: state.cycleLength,
        nowTimeISO: state.nowTimeISO,
        originTimeISO: state.originTimeISO,
      })
    },
  }
}

export default clockStore