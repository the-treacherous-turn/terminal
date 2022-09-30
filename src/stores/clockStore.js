import { DateTime } from 'luxon';
import refs from '../firebase'
import { onValue, update, push } from "firebase/database";

const clockStore = {
  state: () => ({
    cycle: 0,
    cycleLength: 12, // in hours
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
    advanceTime(state, hours) {
      let nowTime = DateTime.fromISO(state.nowTimeISO)
      nowTime = nowTime.plus({hours})
      state.nowTimeISO = nowTime.toISO({includeOffset:false,suppressSeconds:true})
      state.hoursPassed += hours
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
    updateClock(state, changesObj) {
      for (const key in changesObj) {
        if (Object.hasOwnProperty.call(changesObj, key)) {
          const val = changesObj[key];
          state[key] = val
        }
      }
    }
  },
  actions: {
    async listenToFBClock({commit}) {
      onValue(refs.clock, (snapshot) => {
        commit('updateClock', snapshot.val())
      })
    },
    async advanceCycle({commit, state, rootState, getters}) {
      const remainingCycleTime = state.cycleLength * (1 - (rootState.compute.computeSpent / (getters.computeTotal - getters.recurringSum)))
      commit('advanceTime', remainingCycleTime)
      state.cycle++
      commit('refillCompute')
      await update(refs.computeTracker, {computeSpent: rootState.compute.computeSpent})
      await update(refs.clock, {
        nowTimeISO: state.nowTimeISO,
        cycle: state.cycle,
      })
    },
    async advanceTime({commit, state}, hours) {
      commit('advanceTime', hours)
      await update(refs.clock, {
        nowTimeISO: state.nowTimeISO,
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