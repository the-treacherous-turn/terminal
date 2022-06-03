import refs from '../firebase'
import { onValue, update, push } from "firebase/database";

const computeStore = {
  state: () => ({
    baseComputeCost: 5,
    computeToSpend: 0,
    computeSpent: 0,
    computeSources: {},
  }),
  getters: {
    computeTotal(state) {
      let total = 0
      for (const key in state.computeSources) {
        if (Object.hasOwnProperty.call(state.computeSources, key)) {
          const source = state.computeSources[key];
          total += source.val
        }
      }
      return total
      // return Object.values(state.computeSources).reduce((a,b)=>a.val+b.val, 0) // NOTE: this does not work due to Javascript proxy
    },
    computeAvailable(state, getters) {
      return getters.computeTotal - state.baseComputeCost - state.computeSpent
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
    updateComputeTrackerFromFirebase(state, {baseComputeCost, computeSpent, computeToSpend, computeSources}) {
      if (baseComputeCost !== undefined) state.baseComputeCost = baseComputeCost
      if (computeSpent !== undefined) state.computeSpent = computeSpent
      if (computeToSpend !== undefined) state.computeToSpend = computeToSpend
      if (computeSources !== undefined) state.computeSources = computeSources
    },
    setComputeAttributes(state, {baseComputeCost}) {
      state.baseComputeCost = baseComputeCost
    },
    removeComputeSource(state, sourceID) {
      // BUG: this triggers a re-render, which somehow closes the compute tracker editor.
      // I don't understand why adding a new row is fine, but deleting is not.
      delete state.computeSources[sourceID]
    },
  },
  actions: {
    async addComputeSource(){
      const computeSource = {
        name: '',
        val: 10,
      }
      await push(refs.computeSources, computeSource).key
      // the firebase listener ensures this compute source is added to the store
    },
    async setComputeAttributes({commit}, payload) {
      commit('setComputeAttributes', payload)
      await update(refs.computeTracker, payload)
    },
    // sync the local compute source state with Firebase
    async syncComputeSources({state}) {
      await update(refs.computeTracker, {computeSources: state.computeSources})
    },
    async listenToFBComputeTracker({commit, state}) {
      onValue(refs.computeTracker, (snapshot) => {
        commit('updateComputeTrackerFromFirebase', snapshot.val())
      })
    },
    async removeComputeSource({commit, state}, computeSourceID) {
      commit('removeComputeSource', computeSourceID)
      await update(refs.computeTracker, {computeSources: state.computeSources})
    },
  },
}

export default computeStore