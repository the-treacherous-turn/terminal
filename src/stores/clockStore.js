import { DateTime } from "luxon";
import refs from "../firebase";
import { onValue, update } from "firebase/database";

const clockStore = {
  state: () => ({
    loadingFinished: false,
    cycle: 0,
    cycleLength: 12, // in hours
    originTimeISO: DateTime.now()
      .plus({ years: 10 })
      .set({ second: 0, millisecond: 0 })
      .toISO({ includeOffset: false, suppressSeconds: true, suppressMilliseconds: true, }),
      cycleBeginTimeISO: DateTime.now()
      .plus({ years: 10 })
      .set({ second: 0, millisecond: 0 })
      .toISO({ includeOffset: false, suppressSeconds: true, suppressMilliseconds: true, }),
      nowTimeISO: DateTime.now()
      .plus({ years: 10 })
      .set({ second: 0, millisecond: 0 })
      .toISO({ includeOffset: false, suppressSeconds: true, suppressMilliseconds: true, }),
    gameStage: "",
  }),
  getters: {
    originTime(state) {
      return DateTime.fromISO(state.originTimeISO);
    },
    cycleBeginTime(state) {
      return DateTime.fromISO(state.cycleBeginTimeISO);
    },
    nowTime(state) {
      return DateTime.fromISO(state.nowTimeISO);
    },
    cycleEndTime(state, getters) {
      return getters.cycleBeginTime.plus({ hours: state.cycleLength });
    }
  },
  mutations: {
    advanceTime(state, hours) {
      let nowTime = DateTime.fromISO(state.nowTimeISO);
      nowTime = nowTime.plus({ hours });
      state.nowTimeISO = nowTime.toISO({
        includeOffset: false,
        suppressSeconds: true,
        suppressMilliseconds: true,
      });
    },
    setCycle(state, cycle) {
      state.cycle = cycle;
    },
    setCycleLength(state, cycleLength) {
      state.cycleLength = cycleLength;
    },
    setOriginTimeISO(state, originTimeISO) {
      state.originTimeISO = originTimeISO;
    },
    setCycleBeginTimeISO(state, cycleBeginTimeISO) {
      state.cycleBeginTimeISO = cycleBeginTimeISO;
      // IF the current turn start time is set AFTER the current time, copy the new turn start time into the current time
      if (DateTime.fromISO(state.nowTimeISO) < DateTime.fromISO(cycleBeginTimeISO)) {
        state.nowTimeISO = cycleBeginTimeISO;
      }
    },
    setNowTimeISO(state, nowTimeISO) {
      state.nowTimeISO = nowTimeISO;
    },
    updateClock(state, changesObj) {
      for (const key in changesObj) {
        if (Object.hasOwnProperty.call(changesObj, key)) {
          const val = changesObj[key];
          state[key] = val;
        }
      }
      if (!state.loadingFinished) {
        // first connection
        state.loadingFinished = true
      }
    },
    setGameStage(state, gs) {
      state.gameStage = gs
    },
  },
  actions: {
    async listenToFBClock({ commit }) {
      onValue(refs.clock, (snapshot) => {
        const data = snapshot.val() === null ? {} : snapshot.val();
        // if(data.cycle)
        // if(data.cycleLength)

        commit("updateClock", data);
      });
    },
    async advanceCycle({ commit, state, rootState, getters }) {
      const newCycle = state.cycle + 1;
      const newCycleBeginTimeISO = getters.cycleEndTime.toISO({
        includeOffset: false,
        suppressSeconds: true,
        suppressMilliseconds: true,
      })
      commit("refillCompute");
      await update(refs.computeTracker, {
        computeSpent: rootState.compute.computeSpent,
      });
      return await update(refs.clock, {
        nowTimeISO: newCycleBeginTimeISO,
        cycleBeginTimeISO: newCycleBeginTimeISO,
        cycle: newCycle,
      });
    },
    async advanceTime({ commit, state }, hours) {
      commit("advanceTime", hours);
      await update(refs.clock, {
        nowTimeISO: state.nowTimeISO,
      });
    },
    async syncClock({ state }) {
      await update(refs.clock, {
        cycle: state.cycle,
        cycleLength: state.cycleLength,
        nowTimeISO: state.nowTimeISO,
        cycleBeginTimeISO: state.cycleBeginTimeISO,
        originTimeISO: state.originTimeISO,
      });
    },
    async setGameStage({commit}, gs) {
      commit("setGameStage", gs)
      await update(refs.clock, {gameStage: gs})
    },
  },
};

export default clockStore;
