import refs from '../firebase'
import { onValue, update, push } from "firebase/database";

const infoStore = {
  state: () => ({
    agiName: '',
    intendedFunction: '',
    terminalGoals: '',
    agiDetails: '',
    safetyMeasures: '',
    scenarioNotes: '',
    instrumentalGoals: '',
    assets: '',
    gatheredInfo: '',
    customCampaignNotes: {},
    customInPlayNotes: {
      'a': {
        'title': 'In-Play Note A',
        'content': 'This is an in-play note.'
      },
      'b': {
        'title': 'In-Play Note B',
        'content': 'This is another in-play note.'
      }
    },
  }),
  mutations: {
    updateInfo(state, changesObj) {
      for (const key in changesObj) {
        if (Object.hasOwnProperty.call(changesObj, key)) {
          const val = changesObj[key];
          state[key] = val
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
  },
  actions: {
    async listenToFBInfo({commit}) {
      onValue(refs.info, (snapshot) => {
        // console.log('NEW FROM FB', snapshot.val())
        commit('updateInfo', snapshot.val())
      })
    },
    async updateInfo({commit}, changesObj) {
      commit('updateInfo', changesObj)
      await update(refs.info, changesObj)
    },
    // add custom note
    async addCustomCampaignNote() {
      const note = {
        title: '',
        content: '',
      }
      await push(refs.customCampaignNotes, note)
    },
    // update custom note
    async updateCustomCampaignNote({commit, state}, {noteID, changesObj}) {
      commit('updateCustomCampaignNote', {noteID, changesObj})
      await update(refs.customCampaignNotes, {[noteID]: state.customCampaignNotes[noteID]})
    },
    // remove custom note
    async removeCustomCampaignNote({commit}, noteID) {
      commit('removeCustomCampaignNote', noteID)
      await update(refs.customCampaignNotes, {[noteID]: null})
    },
  },
}

export default infoStore