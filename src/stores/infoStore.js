import refs from '../firebase'
import { onValue, update, push } from "firebase/database";

const infoStore = {
  state: () => ({
    agiName: {},
    intendedFunction: {},
    terminalGoals: {},
    agiDetails: {},
    safetyMeasures: {},
    scenarioNotes: {},
    instrumentalGoals: {},
    assets: {},
    gatheredInfo: {},
    keysOfCampaignNotes: '',
    keysOfInPlayNotes: '',
    customCampaignNotes: {},
    customInPlayNotes: {},
  }),
  mutations: {
    updateInfo(state, changesObj) {
      if(Object.hasOwnProperty.call(changesObj, 'customCampaignNotes') && Object.hasOwnProperty.call(changesObj, 'customInPlayNotes')){
        if(changesObj['keysOfCampaignNotes'] === undefined || (JSON.stringify(Object.keys(changesObj['customCampaignNotes'])).length !== JSON.stringify(state['keysOfCampaignNotes']).length && state['keysOfCampaignNotes'] !== '')){
          for (const key in changesObj) {
            if (Object.hasOwnProperty.call(changesObj, key) && key !== 'keysOfCampaignNotes') {
              const val = changesObj[key];
              state[key] = val
            }
          }
          state['keysOfCampaignNotes'] = Object.keys(changesObj['customCampaignNotes'])
        }else if(changesObj['keysOfInPlayNotes'] === undefined || (JSON.stringify(Object.keys(changesObj['customInPlayNotes'])).length !== JSON.stringify(state['keysOfInPlayNotes']).length && state['keysOfInPlayNotes'] !== '')){
          for (const key in changesObj) {
            if (Object.hasOwnProperty.call(changesObj, key) && key !== 'keysOfInPlayNotes') {
              const val = changesObj[key];
              state[key] = val
            }
          }
          state['keysOfInPlayNotes'] = Object.keys(changesObj['customInPlayNotes'])
        }else{
          for (const key in changesObj) {
            if (Object.hasOwnProperty.call(changesObj, key)) {
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
    updateDefault(state, {noteID, changesObj}){
      for (const key in changesObj) {
        if (Object.hasOwnProperty.call(changesObj, key)) {
          console.log(noteID)
          console.log(changesObj[key])
          console.log(state)
          const val = changesObj[key];
          state[noteID][key] = val
        }
      }
    },
    updateCustomCampaignNote(state, {noteID, changesObj}) {
      for (const key in changesObj) {
        if (Object.hasOwnProperty.call(changesObj, key)) {
          const val = changesObj[key];
          state.customCampaignNotes[noteID][key] = val
        }
      }
    },
    removeCustomCampaignNote(state, noteID) {
      delete state.customCampaignNotes[noteID]
    },
    updateCustomInPlayNote(state, {noteID, changesObj}) {
      for (const key in changesObj) {
        if (Object.hasOwnProperty.call(changesObj, key)) {
          const val = changesObj[key];
          state.customInPlayNotes[noteID][key] = val
        }
      }
    },
    removeCustomInPlayNote(state, noteID) {
      delete state.customInPlayNotes[noteID]
    },
  },
  actions: {
    async listenToFBInfo({commit}) {
      await update(refs.info, {a:''})
      onValue(refs.info, (snapshot) => {
        const data = snapshot.val()
        // HACK avoid bug with unable to remove last custom notes
        // by manually clearing the notes objects
        // when incoming data doesn't include them
        if (data.customCampaignNotes === undefined) data.customCampaignNotes = {}
        if (data.customInPlayNotes === undefined) data.customInPlayNotes = {}
        // console.log('NEW FROM FB', data)
        commit('updateInfo', data)
      })
    },
    async updateInfo({commit}, changesObj) {
      commit('updateInfo', changesObj)
      await update(refs.info, changesObj)
    },

    async updateDefault({commit, state}, {noteID, changesObj}){
      commit('updateDefault', {noteID, changesObj})
      await update(refs.info, {[noteID]: state[noteID]})
    },

    async addCustomCampaignNote() {
      const note = {
        title: '',
        content: '',
        height: '',
      }
      await push(refs.customCampaignNotes, note)
      // await update(refs.info, )
    },
    async updateCustomCampaignNote({commit, state}, {noteID, changesObj}) {
      commit('updateCustomCampaignNote', {noteID, changesObj})
      await update(refs.customCampaignNotes, {[noteID]: state.customCampaignNotes[noteID]})
    },
    async removeCustomCampaignNote({commit}, noteID) {
      commit('removeCustomCampaignNote', noteID)
      await update(refs.customCampaignNotes, {[noteID]: null})
    },
    async addCustomInPlayNote() {
      const note = {
        title: '',
        content: '',
      }
      await push(refs.customInPlayNotes, note)
    },
    async updateCustomInPlayNote({commit, state}, {noteID, changesObj}) {
      commit('updateCustomInPlayNote', {noteID, changesObj})
      await update(refs.customInPlayNotes, {[noteID]: state.customInPlayNotes[noteID]})
    },
    async removeCustomInPlayNote({commit}, noteID) {
      commit('removeCustomInPlayNote', noteID)
      await update(refs.customInPlayNotes, {[noteID]: null})
    },
  },
}

export default infoStore