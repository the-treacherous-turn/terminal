import refs from '../firebase'
import { update, push, child, onValue } from "firebase/database"

const gmNotesStore = {
  state: () => ({
    notes: {},
    activeNpcID: null,
  }),
  mutations: {
    updateNotes(state, changesObj) {
        state.notes = changesObj
    },
    updateNote(state, {noteID, changesObj}) {
        for (const key in changesObj) {
          if (Object.hasOwnProperty.call(changesObj, key)) {
            const val = changesObj[key];
            state.notes[noteID][key] = val
          }
        }
      },
    removeNote(state, noteID) {
        delete state.notes[noteID]
    },
  },
  actions: {
    async listenToFBGMNOTES({commit}){
        onValue(refs.gmNOTES, (snapshot) => {
            const data = snapshot.val()
            if (data === undefined) data = {}
            commit('updateNotes', data)
        })
    },
    async addNote() {
        const note = {
            title: '',
            content: '',
            content_height: '',
        }
        await push(refs.gmNOTES, note)
    },
    async updateNote({commit, state}, {noteID, changesObj}) {
        commit('updateNote', {noteID, changesObj})
        await update(refs.gmNOTES, {[noteID]: state.notes[noteID]})
    },
    async removeNote({commit}, noteID) {
        commit('removeNote', noteID)
        await update(refs.gmNOTES, {[noteID]: null})
    },
  },
}

export default gmNotesStore