import refs from '../firebase'
import { onValue, update, push } from "firebase/database";

const infoStore = {
  state: () => ({
    agiName: '',
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
      if(Object.hasOwnProperty.call(changesObj, 'customCampaignNotes')){
        if(JSON.stringify(Object.keys(changesObj['customCampaignNotes'])).length > JSON.stringify(changesObj['keysOfCampaignNotes']).length){
          state['keysOfCampaignNotes'] = [...state['keysOfCampaignNotes'], Object.keys(changesObj['customCampaignNotes']).slice(-1).pop()]
          for (const key in changesObj) {
            if (Object.hasOwnProperty.call(changesObj, key) && key !== 'keysOfCampaignNotes' && key !== 'keysOfInPlayNotes') {
              const val = changesObj[key];
              state[key] = val
            }
          }
        }else if(JSON.stringify(Object.keys(changesObj['customCampaignNotes'])).length < JSON.stringify(changesObj['keysOfCampaignNotes']).length){
          let originArray = Object.keys(changesObj['customCampaignNotes']);
          changesObj['keysOfCampaignNotes'] = changesObj['keysOfCampaignNotes'].filter(item => originArray.includes(item));
          state['keysOfCampaignNotes'] = changesObj['keysOfCampaignNotes']
          for (const key in changesObj) {
            if (Object.hasOwnProperty.call(changesObj, key) && key !== 'keysOfCampaignNotes' && key !== 'keysOfInPlayNotes') {
              const val = changesObj[key];
              state[key] = val
            }
          }
        }
        else{
          state['keysOfCampaignNotes'] = changesObj['keysOfCampaignNotes']
          for (const key in changesObj) {
            if (Object.hasOwnProperty.call(changesObj, key) && key !== 'keysOfCampaignNotes' && key !== 'keysOfInPlayNotes') {
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
      if(Object.hasOwnProperty.call(changesObj, 'customInPlayNotes')){
        if(JSON.stringify(Object.keys(changesObj['customInPlayNotes'])).length > JSON.stringify(changesObj['keysOfInPlayNotes']).length){
          state['keysOfInPlayNotes'] = [...state['keysOfInPlayNotes'], Object.keys(changesObj['customInPlayNotes']).slice(-1).pop()]
          for (const key in changesObj) {
            if (Object.hasOwnProperty.call(changesObj, key) && key !== 'keysOfInPlayNotes' && key !== 'keysOfCampaignNotes') {
              const val = changesObj[key];
              state[key] = val
            }
          }
        }else if(JSON.stringify(Object.keys(changesObj['customInPlayNotes'])).length < JSON.stringify(changesObj['keysOfInPlayNotes']).length){
          let originArray = Object.keys(changesObj['customInPlayNotes']);
          changesObj['keysOfInPlayNotes'] = changesObj['keysOfInPlayNotes'].filter(item => originArray.includes(item));
          state['keysOfInPlayNotes'] = changesObj['keysOfInPlayNotes']
          for (const key in changesObj) {
            if (Object.hasOwnProperty.call(changesObj, key) && key !== 'keysOfInPlayNotes' && key !== 'keysOfCampaignNotes') {
              const val = changesObj[key];
              state[key] = val
            }
          }
        }
        else{
          state['keysOfInPlayNotes'] = changesObj['keysOfInPlayNotes']
          for (const key in changesObj) {
            if (Object.hasOwnProperty.call(changesObj, key) && key !== 'keysOfInPlayNotes' && key !== 'keysOfCampaignNotes') {
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
      // delete state.keysOfCampaignNotes[noteID]
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
    //   await update(refs.info, {a:''})
      onValue(refs.info, (snapshot) => {
        const data = snapshot.val() === null ? {} : snapshot.val()
        // HACK avoid bug with unable to remove last custom notes
        // by manually clearing the notes objects
        // when incoming data doesn't include them
        if (data.customCampaignNotes === undefined) data.customCampaignNotes = {}
        if (data.customInPlayNotes === undefined) data.customInPlayNotes = {}
        if (data.keysOfCampaignNotes === undefined) data.keysOfCampaignNotes = []
        if (data.keysOfInPlayNotes === undefined) data.keysOfInPlayNotes = []

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
      // const changesObj = {}
      // changesObj['keysOfCampaignNotes'] = {}
      // changesObj['keysOfCampaignNotes'][noteID] = null
      commit('removeCustomCampaignNote', noteID)
      await update(refs.customCampaignNotes, {[noteID]: null})
      // await update(refs.info, changesObj)
    },
    async addCustomInPlayNote() {
      const note = {
        title: '',
        content: '',
        height: '',
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