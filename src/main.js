import { createApp } from 'vue'
import {createStore} from 'vuex'
import App from './App.vue'
import './index.css'

const store = createStore({
  state () {
    return {
      actions: [],
      isEditorOpen: false,
      dirtyActionID: null,
    }
  },
  getters: {
    dirtyAction(state) {
      return state.actions[state.dirtyActionID]
    },
  },
  mutations: {
    editNewAction(state) {
      // create new action
      state.actions.push({
        name:'',
        description:'',
        isDirty: true, // if true, this action is not yet saved
        isNew: true, // is true when it first got created
        isCommitted: false,
        isForecast: false,

      })
      state.dirtyActionID = state.actions.length - 1
      // open the editor
      state.isEditorOpen = true
    },
    editExtantAction(state, actionID) {
      state.dirtyActionID = actionID
      state.actions[state.dirtyActionID].isDirty = true
      state.isEditorOpen = true
    },
    updateAction (state, payload) {
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
    markAsForecast (state, actionID) {
      state.actions[actionID].isForecast = true
    },
    deleteAction(state, actionID) {
      state.actions.splice(actionID, 1)
    },
    closeEditor(state) {
      state.isEditorOpen = false
    },
  },
})

/*
// schema:
{
  actions: [
    {
      name: "HACK",
      description: "Hack the Gibson",
      ...
    },
    ...
  ]
}
*/

const app = createApp(App)
app.use(store)
app.mount('#app')