import { update, push, child, onChildAdded, onChildChanged, onChildRemoved } from "firebase/database"
import refs from '../firebase'

export default {
  state: () => ({
    specs: {},
    activeSpecID: null,
  }),
  getters: {
    activeSpec(state) {
      return state.specs[state.activeSpecID]
    }
  },
  mutations: {
    setActiveSpecID(state, specID) {
      state.activeSpecID = specID
    },
    clearActiveSpecID(state) {
      state.activeSpecID = null
    },
    setSpecs(state, specs) {
      state.specs = specs
    },
    setSpec(state, {specID, spec}) {
      state.specs[specID] = spec
    },
    deleteSpec(state, specID) {
      delete state.specs[specID]
    },
  },
  actions: {
    async listenToFBSpecs({ commit, state }) {
      onChildAdded(refs.specs, (snapshot) => {
        const spec = snapshot.val()
        const specID = snapshot.key
        commit('setSpec', {specID, spec})
      })
      onChildChanged(refs.specs, (snapshot) => {
        const spec = snapshot.val()
        const specID = snapshot.key
        commit('setSpec', { specID, spec })
      })
      onChildRemoved(refs.specs, (snapshot) => {
        if (!state.specs[snapshot.key]) return
        const specID = snapshot.key
        commit('deleteSpec', specID)
      })
    },
    async addSpec({ state }, spec) {
      await push(refs.specs, spec)
    },
    async editSpec({ state }, { id, spec }) {
      await update(child(refs.specs, id), spec)
    },
    async deleteSpec({ state }, key) {
      await update(refs.specs, {[key]: null})
    },
    async addInsight({ state }, insight) {
      if (!state.activeSpecID) throw new Error("No active spec")
      await push(child(refs.specs, `${state.activeSpecID}/insights`), insight)
    },
    async editInsight({ state }, { id, insight }) {
      if (!state.activeSpecID) throw new Error("No active spec")
      await update(child(refs.specs, `${state.activeSpecID}/insights/${id}`), insight)
    },
    async deleteInsight({state}, key) {
      if (!state.activeSpecID) throw new Error("No active spec")
      await update(child(refs.specs, `${state.activeSpecID}/insights`), {[key]: null})
    },
    async addUpgrade({ state }, upgrade) {
      if (!state.activeSpecID) throw new Error("No active spec")
      await push(child(refs.specs, `${state.activeSpecID}/upgrades`), upgrade)
    },
    async editUpgrade({ state }, { id, upgrade }) {
      if (!state.activeSpecID) throw new Error("No active spec")
      await update(child(refs.specs, `${state.activeSpecID}/upgrades/${id}`), upgrade)
    },
    async deleteUpgrade({state}, key) {
      if (!state.activeSpecID) throw new Error("No active spec")
      await update(child(refs.specs, `${state.activeSpecID}/upgrades`), {[key]: null})
    },
  }
}