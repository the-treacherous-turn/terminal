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
  }),
  mutations: {
    updateInfo(state, changesObj) {
      for (const key in changesObj) {
        if (Object.hasOwnProperty.call(changesObj, key)) {
          const val = changesObj[key];
          state[key] = val
        }
      }
    }
  },
  actions: {
    async listenToFBInfo({commit}) {
      onValue(refs.info, (snapshot) => {
        commit('updateInfo', snapshot.val())
      })
    },
    async updateInfo({commit}, changesObj) {
      commit('updateInfo', changesObj)
      await update(refs.info, changesObj)
    }
  },
}

export default infoStore