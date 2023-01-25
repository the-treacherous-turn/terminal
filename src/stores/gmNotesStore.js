import refs from '../firebase'
import { update, push, child, onValue } from "firebase/database"

const gmNotesStore = {
  state: () => ({
    notes: {},
    activeNpcID: null,
    keysOfNotes: '',
  }),
  mutations: {
    updateNotes(state, changesObj) {
        if(Object.hasOwnProperty.call(changesObj, 'notes')){
            if(JSON.stringify(Object.keys(changesObj['notes'])).length > JSON.stringify(changesObj['keysOfNotes']).length){
                state['keysOfNotes'] = [...state['keysOfNotes'], Object.keys(changesObj['notes']).slice(-1).pop()]
                for (const key in changesObj) {
                  if (Object.hasOwnProperty.call(changesObj, key) && key !== 'keysOfNotes') {
                    const val = changesObj[key];
                    state[key] = val
                  }
                }
              }else if(JSON.stringify(Object.keys(changesObj['notes'])).length < JSON.stringify(changesObj['keysOfNotes']).length){
                let originArray = Object.keys(changesObj['notes']);
                changesObj['keysOfNotes'] = changesObj['keysOfNotes'].filter(item => originArray.includes(item));
                state['keysOfNotes'] = changesObj['keysOfNotes']
                for (const key in changesObj) {
                  if (Object.hasOwnProperty.call(changesObj, key) && key !== 'keysOfNotes') {
                    const val = changesObj[key];
                    state[key] = val
                  }
                }
              }
              else{
                state['keysOfNotes'] = changesObj['keysOfNotes']
                for (const key in changesObj) {
                  if (Object.hasOwnProperty.call(changesObj, key) && key !== 'keysOfNotes') {
                    const val = changesObj[key];
                    state[key] = val
                  }
                }
              }
            }else{
                for (const key in changesObj) {
                  if (Object.hasOwnProperty.call(changesObj, key)) {
                    const val = changesObj[key];
                    state[key] = val
                  }
                }
            }
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
        onValue(refs.gmNotes, (snapshot) => {
            const data = snapshot.val() === null ? {} : snapshot.val()
            if (data.notes === undefined) data.notes = {}
            if (data.keysOfNotes === undefined) data.keysOfNotes = []
            commit('updateNotes', data)
        })
    },
    async addNote() {
        const note = {
            title: '',
            content: '',
            content_height: '',
        }
        await push(refs.notes, note)
    },
    async updateNotes({commit}, changesObj){
        commit('updateNotes', changesObj)
        await update(refs.gmNotes, changesObj)
    },
    async updateNote({commit, state}, {noteID, changesObj}) {
        commit('updateNote', {noteID, changesObj})
        await update(refs.notes, {[noteID]: state.notes[noteID]})
    },
    async removeNote({commit}, noteID) {
        commit('removeNote', noteID)
        await update(refs.notes, {[noteID]: null})
    },
  },
}

export default gmNotesStore