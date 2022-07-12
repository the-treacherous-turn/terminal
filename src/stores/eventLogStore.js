import refs from '../firebase'
import { onChildAdded, onChildChanged, onChildRemoved, update, push } from 'firebase/database'

const eventLogStore = {
  state: () => ({
    actions: {},
    isEditorOpen: false,
    dirtyActionID: null,
  }),
  getters: {
    dirtyAction(state) {
      return state.actions[state.dirtyActionID]
    },
  },
  mutations: {
    setActionWithID(state, {actionID, actionObj}) {
      state.actions[actionID] = actionObj
    },
    editNewAction(state, {actionID, actionObj}) {
      // create new action
      store.commit('setActionWithID', {actionID, actionObj})
      state.dirtyActionID = actionID
      // open the editor
      state.isEditorOpen = true
    },
    editExtantAction(state, actionID) {
      state.dirtyActionID = actionID
      state.actions[state.dirtyActionID].isDirty = true
      state.isEditorOpen = true
    },
    updateAction (state, payload) {
      if (state.dirtyActionID === null) return // safeguard against creating null action
      const currentAction = state.actions[state.dirtyActionID]
      state.actions[state.dirtyActionID] = {...currentAction, ...payload}
    },
    submitActionEdit (state) {
      state.actions[state.dirtyActionID].isDirty = false
      state.actions[state.dirtyActionID].isNew = false
      state.dirtyActionID = null
    },
    commitAction (state, actionID) {
      state.actions[actionID].isCommitted = true
    },
    undoCommitAction (state, actionID) {
      state.actions[actionID].isCommitted = false
    },
    markAsForecast (state, actionID) {
      state.actions[actionID].isForecast = true
    },
    undoForecastAction (state, actionID) {
      state.actions[actionID].isForecast = false
    },
    deleteAction(state, actionID) {
      if (!state.actions[actionID]) throw new Error(`Cannot delete action ${actionID}: action does not exist`)
      delete state.actions[actionID]
    },
    openEditor(state) {
      state.isEditorOpen = true
    },
    closeEditor(state) {
      state.isEditorOpen = false
    },
  },
  actions: {
    async listenToFBEventLog({commit, state}) {
      onChildAdded(refs.actions, (snapshot) => {
        commit('setActionWithID', {actionID: snapshot.key, actionObj: snapshot.val()})
      })
      onChildChanged(refs.actions, (snapshot) => {
        commit('setActionWithID', {actionID: snapshot.key, actionObj: snapshot.val()})
      })
      onChildRemoved(refs.actions, (snapshot) => {
        if (!state.actions[snapshot.key]) return // safeguard against unnecessary deletion
        commit('deleteAction', snapshot.key)
      })
    },
    async editNewAction({commit}) {
      // create new action
      const actionObj = {
        name:'',
        description:'',
        isDirty: true,
        isNew: true,
        isCommitted: false,
        isForecast: false,
      }
      // push a new action into the database
      const actionID = await push(refs.actions, actionObj).key
      commit('editNewAction', {actionID, actionObj})
    },

    async editExtantAction({commit, state}, actionID) {
      commit('editExtantAction', actionID)
      await update(refs.actions, {[actionID]: state.actions[actionID]})
    },

    async submitActionEdit({commit, state}) {
      const actionID = state.dirtyActionID
      commit('submitActionEdit')
      await update(refs.actions, {[actionID]: state.actions[actionID]})
    },

    async deleteAction({commit}, actionID) {
      commit('deleteAction', actionID)
      await update(refs.actions, {[actionID]: null})
    },

    async commitAction({commit, state}, actionID) {
      commit('commitAction', actionID)
      await update(refs.actions, {[actionID]: state.actions[actionID]})
    },

    async undoCommitAction({commit, state}, actionID) {
      commit('undoCommitAction', actionID)
      await update(refs.actions, {[actionID]: state.actions[actionID]})
    },

    async markAsForecast({commit, state}, actionID) {
      commit('markAsForecast', actionID)
      await update(refs.actions, {[actionID]: state.actions[actionID]})
    },

    async undoForecastAction({commit, state}, actionID) {
      commit('undoForecastAction', actionID)
      await update(refs.actions, {[actionID]: state.actions[actionID]})
    },
  }
}
export default eventLogStore