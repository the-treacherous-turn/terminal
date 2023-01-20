import refs from '../firebase'
import { onValue, update, push } from "firebase/database";

const computeStore = {
  state: () => ({
    computeToSpend: 0,
    computeSpent: 0,
    computeSources: {},
    baseComputeCost: 10,
    recurringCosts: {},
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
    /**
     * Recurring Sum includes all recurring costs, plus the base compute cost.
     * @param {Object} state 
     */
    recurringSum(state) {
      let total = 0
      for (const key in state.recurringCosts) {
        if (Object.hasOwnProperty.call(state.recurringCosts, key)) {
          const cost = state.recurringCosts[key];
          total += cost.val
        }
      }
      return total + state.baseComputeCost
    },
    computeAvailable(state, getters) {
      return getters.computeTotal - getters.recurringSum - state.computeSpent
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
    updateComputeTracker(state, changesObj) {
      for (const key in changesObj) {
        if (Object.hasOwnProperty.call(changesObj, key)) {
          const val = changesObj[key];
          state[key] = val
        }
      }
    },
    setBaseComputeCost(state, baseComputeCost) {
      state.baseComputeCost = baseComputeCost
    },
    removeComputeSource(state, sourceID) {
      // BUG: this triggers a re-render, which somehow closes the compute tracker editor.
      // I don't understand why adding a new row is fine, but deleting is not.
      delete state.computeSources[sourceID]
    },
    removeRecurringCost(state, itemID) {
      delete state.recurringCosts[itemID]
    },
  },
  actions: {
    async listenToFBComputeTracker({commit}) {
      onValue(refs.computeTracker, (snapshot) => {
        const data = snapshot.val()
        if (data.computeSources === undefined) data.computeSources = {}
        if (data.recurringCosts === undefined) data.recurringCosts = {}
        commit('updateComputeTracker', data)
        // HACK avoid bug with unable to remove last items in an object
      })
    },
    async addComputeSource(){
      const computeSource = {
        name: '',
        val: 10,
      }
      await push(refs.computeSources, computeSource)
      // the firebase listener ensures this compute source is added to the store
    },
    async addRecurringCost() {
      const recurringCost = {
        name: '',
        val: 2,
      }
      await push(refs.recurringCosts, recurringCost)
    },
    // sync the local compute source state with Firebase
    async syncComputeSources({state}) {
      await update(refs.computeTracker, {computeSources: state.computeSources})
    },
    async syncRecurringCosts({state}) {
      await update(refs.computeTracker, {recurringCosts: state.recurringCosts})
    },
    async syncComputeTracker({state}) {
      await update(refs.computeTracker, {
        computeSources: state.computeSources,
        recurringCosts: state.recurringCosts,
        baseComputeCost: state.baseComputeCost,
      })
    },
    async removeComputeSource({commit, state}, computeSourceID) {
      commit('removeComputeSource', computeSourceID)
      await update(refs.computeTracker, {computeSources: state.computeSources})
    },
    async removeRecurringCost({commit, state}, recurringCostID) {
      commit('removeRecurringCost', recurringCostID)
      await update(refs.computeTracker, {recurringCosts: state.recurringCosts})
    },
  },
}

export default computeStore