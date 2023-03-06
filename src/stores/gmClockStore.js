import refs from '../firebase'
import { update, push, onValue, child } from 'firebase/database'

// mock data for gm clock section:
/*
pcInterval: 12,
clocks: {
  "c-xxxxx": {
    size: 100,
    elapsed: 1,
    mode: "pc",
    name: "Clock 1",
    tickLog: [
      {
        turn: 8,
        tick: 2,
      },
      {
        turn: 9,
        tick: -1,
      },
      {
        turn: 10,
        tick: 2,
      },
    ],
    pc: "p-xxxxx",
  },
  "c-yyyyy": {
    size: 50,
    elapsed: 30,
    mode: "automatic",
    name: "Clock 2 (Auto)",
  },
  "c-zzzzz": {
    size: 7,
    elapsed: 3,
    mode: "pc",
    name: "Clock 3",
    tickLog: [
      {
        turn: 1,
        tick: 1,
      },
    ],
    pc: "p-xxxxx",
  },
},
pChecks: {
  "p-xxxxx": {
    name: "Clock 1",
    die: "d4",
    type: "agent",
  },
},
// progress check interface data
rollLog: {
  "asdfasdf": {
    die: "d6",
    result: 5,
    turn: 7,
  },
  "uyasdui": {
    die: "d20",
    result: 2,
    turn: 8,
  }
},
pendingPCs: {
  "ppc-xxxxx": {
    pcid: "p-xxxxx",
    turn: 8,
    time: "06:00",
    clocks: [
      {
        cid: "c-xxxxx",
        tick: 2,
      },
      {
        cid: "c-zzzzz",
        tick: 1,
      },
    ]
  },
  "ppc-yyyyy": {
    pcid: "p-xxxxx",
    turn: 8,
    time: "18:00",
    clocks: [
      {
        cid: "c-xxxxx",
        tick: 0,
      },
      {
        cid: "c-zzzzz",
        tick: 1,
      },
    ]
  },
},
*/
const gmClockStore = {
  state: () => ({
    pcInterval: 12,
    clocks: {},
    pChecks: {},
    pendingPCs: {},
  }),
  getters: {

  },
  mutations: {
    updateGMClock(state, changesObj) {
      for (const key in changesObj) {
        if (Object.hasOwnProperty.call(changesObj, key)) {
          const val = changesObj[key];
          state[key] = val;
        }
      }
    },
  },
  actions: {
    async listenToFBGMCLOCK({commit, state}) {
      onValue(refs.gmClock, (snapshot) => {
        const data = snapshot.val() === null ? {} : snapshot.val()
        commit("updateGMClock", data)
      })
    },
    async setPCInterval({}, val) {
      return await update(refs.gmClock, {pcInterval: val})
    },
    async addGMClock({}, val) {
      return await push(child(refs.gmClock, "clocks"), val)
    },
    async updateGMClock({}, {clockID, val}) {
      return await update(child(refs.gmClock, `clocks/${clockID}`), val)
    },
    async deleteGMClock({}, clockID) {
      return await update(child(refs.gmClock, `clocks/${clockID}`), null)
    },
    async addGMPCheck({}, val) {
      return await push(child(refs.gmClock, "pChecks"), val)
    },
    async updateGMPCheck({}, {pcID, val}) {
      return await update(child(refs.gmClock, `pChecks/${pcID}`), val)
    },
    async deleteGMPCheck({}, pcID) {
      return await update(child(refs.gmClock, `pChecks/${pcID}`), null)
    },
    async addPendingPC({}, val) {
      return await push(child(refs.gmClock, "pendingPCs"), val)
    },
    async updatePendingPC({}, {ppcID, val}) {
      return await update(child(refs.gmClock, `pendingPCs/${ppcID}`), val)
    },
    async deletePendingPC({}, ppcID) {
      return await update(child(refs.gmClock, `pendingPCs/${ppcID}`), null)
    },

  },
}

export default gmClockStore