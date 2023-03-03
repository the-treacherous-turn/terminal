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
    rollLog: {},
    pendingPCs: {},
  }),
  getters: {

  },
  mutations: {
    // setPCInterval(state, val) {
    //   state.pcInterval = val
    // },
    // setGMClock(state, {clockID, val}) {
    //   state.clocks[clockID] = val
    // },
    // deleteClock(state, clockID) {
    //   delete state.clocks[clockID]
    // },
    // setGMPCheck(state, {pcID, val}) {
    //   state.pChecks[pcID] = val
    // },
    // deleteGMPCheck(state, pcID) {
    //   delete state.pChecks[pcID]
    // },
    // setRollLog(state, {rollID, val}) {
    //   state.rollLog[rollID] = val
    // },
    // deleteRollLog(state, rollID) {
    //   delete state.rollLog[rollID]
    // },
    // setPendingPC(state, {ppcID, val}) {
    //   state.pendingPCs[ppcID] = val
    // },
    // deletePendingPC(state, ppcID) {
    //   delete state.pendingPCs[ppcID]
    // },
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
      await update(refs.gmClock, {pcInterval: val})
    },
    async addGMClock({}, val) {
      await push(child(refs.gmClock, "clocks"), val)
    },
    async editGMClock({}, {clockID, val}) {
      await update(child(refs.gmClock, `clocks/${clockID}`), val)
    },
    async deleteGMClock({}, clockID) {
      await update(child(refs.gmClock, `clocks/${clockID}`), null)
    },
    async addGMPCheck({}, val) {
      await push(child(refs.gmClock, "pChecks"), val)
    },
    async editGMPCheck({}, {pcID, val}) {
      await update(child(refs.gmClock, `pChecks/${pcID}`), val)
    },
    async deleteGMPCheck({}, pcID) {
      await update(child(refs.gmClock, `pChecks/${pcID}`), null)
    },
    async addRollLog({}, val) {
      await push(child(refs.gmClock, "rollLog"), val)
    },
    async editRollLog({}, {rollID, val}) {
      await update(child(refs.gmClock, `rollLog/${rollID}`), val)
    },
    async deleteRollLog({}, rollID) {
      await update(child(refs.gmClock, `rollLog/${rollID}`), null)
    },
    async addPendingPC({}, val) {
      await push(child(refs.gmClock, "pendingPCs"), val)
    },
    async editPendingPC({}, {ppcID, val}) {
      await update(child(refs.gmClock, `pendingPCs/${ppcID}`), val)
    },
    async deletePendingPC({}, ppcID) {
      await update(child(refs.gmClock, `pendingPCs/${ppcID}`), null)
    },

  },
}

export default gmClockStore