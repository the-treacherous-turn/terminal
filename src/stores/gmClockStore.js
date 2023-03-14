import { DateTime } from 'luxon'
import { update, push, onValue, child } from 'firebase/database'
import refs from '../firebase'

const gmClockStore = {
  state: () => ({
    pcInterval: 6,
    clocks: {},
    pChecks: {},
    pendingPCs: {},
    lastCheckTimeISO: null, // records time of the last progress check
  }),
  getters: {
    lastCheckTime(state) {
      return DateTime.fromISO(state.lastCheckTimeISO)
    },
    // get the number of pending PCs for a given clock
    amtPendingPCForClock: (state) => (clockID) => {
      const ppcs = Object.values(state.pendingPCs)
      if (!ppcs) return 0
      const clock = state.clocks[clockID]
      return ppcs.filter(val => val.pc == clock.pc).length
    },
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
    setLastCheckTimeISO(state, val) {
      state.lastCheckTimeISO = val
    },
  },
  actions: {
    async listenToFBGMCLOCK({commit, state}) {
      onValue(refs.gmClock, (snapshot) => {
        const data = snapshot.val() === null ? {} : snapshot.val()
        // detect when firebase removes root objects once they are empty
        if (data.clocks === undefined) data.clocks = {}
        if (data.pChecks === undefined) data.pChecks = {}
        if (data.pendingPCs === undefined) data.pendingPCs = {}
        commit("updateGMClock", data)
      })
    },
    async setPCInterval({}, val) {
      return await update(refs.gmClock, {pcInterval: val})
    },
    async initLastCheckTime({state, commit, rootGetters}) {
      let lastCheckTime
      const { nowTime } = rootGetters
      const { pcInterval } = state
      // if it's too close to midnight, 
      // then we set it up so that the next midnight is 1st pCheck
      if (nowTime.plus({hours: pcInterval}).day > nowTime.day) {
        lastCheckTime = nowTime.plus({day: 1}).startOf('day').minus({hours: pcInterval})
      } else {
        // otherwise, we find the first PC using 00:00 as origin point
        lastCheckTime = nowTime.startOf('day') // 00:00
        while (
          pcInterval < nowTime.diff(lastCheckTime, 'hours').toObject().hours
        ){
          lastCheckTime = lastCheckTime.plus({hours: pcInterval})
        }
      }
      // convert the DateTime object to ISO without timezone
      if (!lastCheckTime) throw new Error('Could not compute lastCheckTime.')
      const lastCheckTimeISO = lastCheckTime.toISO({ includeOffset: false, suppressSeconds: true })
      commit('setLastCheckTimeISO', lastCheckTimeISO)
      // send lastCheckTimeISO to firebase
      return await update(refs.gmClock, {lastCheckTimeISO})
    },
    async setLastCheckTimeISO({}, val) {
      return await update(refs.gmClock, {lastCheckTimeISO: val})
    },
    async addGMClock({}, val) {
      return await push(child(refs.gmClock, "clocks"), val)
    },
    async updateGMClock({}, {clockID, val}) {
      return await update(child(refs.gmClock, `clocks/${clockID}`), val)
    },
    async deleteGMClock({}, clockID) {
      return await update(child(refs.gmClock, 'clocks'), {[clockID]: null})
    },
    async addGMPCheck({}, val) {
      return await push(child(refs.gmClock, "pChecks"), val)
    },
    async updateGMPCheck({}, {pcid, val}) {
      return await update(child(refs.gmClock, `pChecks/${pcid}`), val)
    },
    async deleteGMPCheck({}, pcid) {
      return await update(child(refs.gmClock, `pChecks`), {[pcid]: null})
    },
    async addPendingPC({}, val) {
      return await push(child(refs.gmClock, "pendingPCs"), val)
    },
    async updatePendingPC({}, {ppcID, val}) {
      return await update(child(refs.gmClock, `pendingPCs/${ppcID}`), val)
    },
    async deletePendingPC({}, ppcID) {
      return await update(child(refs.gmClock, `pendingPCs`), {[ppcID]: null})
    },

    /**
     * update lastCheckTime and
     * calculate pending PCs
     * TODO: instead of adding PPC one by one,
     * and updating the lastCheckTime slowly,
     * we do the calculation locally and 
     * batch-update to firebase.
     */
    async advanceGMClock({ commit, dispatch, state, rootState, getters, rootGetters }) {
      const { pcInterval } = state
      const { cycle } = rootState.clock
      // TODO: is there a less risky way to make this, 
      // that does not require a while loop?
      while (rootGetters.nowTime > getters.lastCheckTime.plus({hours: pcInterval})){
        // make new pc time
        const newCheckTime = getters.lastCheckTime.plus({hours: pcInterval})
        const newCheckTimeISO = newCheckTime.toISO({ includeOffset: false, suppressSeconds: true })
        // find PCs that qualify for this check
        const pcAsArray = Object.entries(state.pChecks)
        for (const [pcid, pc] of pcAsArray) {
          const pcLastCheckTime = DateTime.fromISO(pc.lastCheckTimeISO)
          if (pcLastCheckTime < newCheckTime) {
            // make pending pcs for them
            await dispatch('addPendingPC', {
              time: newCheckTimeISO,
              turn: cycle,
              pc: pcid,
            })
            // update the pc's lastCheckTime
            await dispatch('updateGMPCheck', {
              pcid: pcid,
              val: {lastCheckTimeISO: newCheckTimeISO}
            })
          }
        }
        // update GMClockStore's lastCheckTime
        commit('setLastCheckTimeISO', newCheckTimeISO)
        await dispatch('setLastCheckTimeISO', newCheckTimeISO)
      }
    },

  },
}

export default gmClockStore