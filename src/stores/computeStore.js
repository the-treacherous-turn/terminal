import refs from '../firebase'
import { onValue, update } from "firebase/database";

const computeStore = {
  state: () => ({
    computeTotal: 60,
    baseComputeCost: 5,
    computeToSpend: 0,
    computeSpent: 0,
  }),
  getters: {
    computeAvailable(state) {
      return state.computeTotal - state.baseComputeCost - state.computeSpent
    },
    hasComputeBudget(state, getters) {
      return getters.computeAvailable - state.computeToSpend > 0
    },
  },
  mutations: {
    refillCompute(state) {
      state.computeSpent = 0
    },
    updateComputeSpent(state, change) {
      state.computeSpent += change
    },
    updateComputeToSpend(state, change) {
      state.computeToSpend += change
    },
    updateComputeTrackerFromFirebase(state, {computeTotal, baseComputeCost, computeSpent, computeToSpend}) {
      if (computeTotal !== undefined) state.computeTotal = computeTotal
      if (baseComputeCost !== undefined) state.baseComputeCost = baseComputeCost
      if (computeSpent !== undefined) state.computeSpent = computeSpent
      if (computeToSpend !== undefined) state.computeToSpend = computeToSpend
    },
    setComputeAttributes(state, {computeTotal, baseComputeCost}) {
      state.computeTotal = computeTotal
      state.baseComputeCost = baseComputeCost
    },
  },
  actions: {
    async setComputeAttributes({commit}, payload) {
      commit('setComputeAttributes', payload)
      await update(refs.computeTracker, payload)
    },
    async listenToFBComputeTracker({commit, state}) {
      onValue(refs.computeTracker, (snapshot) => {
        commit('updateComputeTrackerFromFirebase', snapshot.val())
      })
    },
  },
}

export default computeStore