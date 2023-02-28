import { DateTime } from "luxon";
import refs from "../firebase";
import { onValue, update, push } from "firebase/database";

const clockStore = {
  state: () => ({
    loadingFinished: false,
    cycle: 0,
    cycleLength: 12, // in hours
    hoursPassed: 0,
    originTimeISO: DateTime.now()
      .plus({ years: 10 })
      .toISO({ includeOffset: false, suppressSeconds: true }),
    nowTimeISO: DateTime.now()
      .plus({ years: 10 })
      .toISO({ includeOffset: false, suppressSeconds: true }),
    gameStage: "",
  }),
  getters: {
    originTime(state) {
      return DateTime.fromISO(state.originTimeISO);
    },
    nowTime(state) {
      return DateTime.fromISO(state.nowTimeISO);
    },
  },
  mutations: {
    advanceTime(state, hours) {
      let nowTime = DateTime.fromISO(state.nowTimeISO);
      nowTime = nowTime.plus({ hours });
      state.nowTimeISO = nowTime.toISO({
        includeOffset: false,
        suppressSeconds: true,
      });
      state.hoursPassed += hours;
    },
    setCycle(state, cycle) {
      state.cycle = cycle;
    },
    setCycleLength(state, cycleLength) {
      state.cycleLength = cycleLength;
    },
    setNowTimeISO(state, nowTimeISO) {
      state.nowTimeISO = nowTimeISO;
    },
    setOriginTimeISO(state, originTimeISO) {
      console.log(originTimeISO);
      state.originTimeISO = originTimeISO;
    },
    updateClock(state, changesObj) {
      for (const key in changesObj) {
        if (Object.hasOwnProperty.call(changesObj, key)) {
          const val = changesObj[key];
          state[key] = val;
        }
      }
      state.loadingFinished = true;
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
      const remainingCycleTime =
        state.cycleLength *
        (1 -
          rootState.compute.computeSpent /
            (getters.computeTotal - getters.recurringSum));
      commit("advanceTime", remainingCycleTime);
      state.cycle++;
      commit("refillCompute");
      await update(refs.computeTracker, {
        computeSpent: rootState.compute.computeSpent,
      });
      await update(refs.clock, {
        nowTimeISO: state.nowTimeISO,
        cycle: state.cycle,
      });
    },
    async advanceTime({ commit, state }, hours) {
      commit("advanceTime", hours);
      await update(refs.clock, {
        nowTimeISO: state.nowTimeISO,
      });
    },
    async syncClock({ state }) {
      console.log(state);
      await update(refs.clock, {
        cycle: state.cycle,
        cycleLength: state.cycleLength,
        nowTimeISO: state.nowTimeISO,
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
