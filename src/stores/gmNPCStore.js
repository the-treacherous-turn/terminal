import refs from '../firebase'
import { update, push, child, onChildAdded, onChildChanged, onChildRemoved } from "firebase/database"

const gmNPCStore = {
  state: () => ({
    npcs: {},
    activeNpcID: null,
  }),
  mutations: {
    setNpc(state, {npcID, npc}) {
      state.npcs[npcID] = npc
    },
    deleteNpc(state, npcID) {
      delete state.npcs[npcID]
    },
  },
  actions: {
    async listenToFBGMNPC({commit, state}){
      onChildAdded(refs.gmNPCs, (snapshot) => {
        const npc = snapshot.val()
        const npcID = snapshot.key
        commit('setNpc', {npcID, npc})
      });
      onChildChanged(refs.gmNPCs, (snapshot) => {
        const npc = snapshot.val()
        const npcID = snapshot.key
        commit('setNpc', {npcID, npc})
      });
      onChildRemoved(refs.gmNPCs, (snapshot) => {
        if (!state.npcs[snapshot.key]) return
        const npcID = snapshot.key
        commit('deleteNpc', npcID)
      });
    },
    async addNpc({ state }, npc) {
      await push(refs.gmNPCs, npc)
    },
    async editNpc({ state }, { id, npc }) {
      await update(child(refs.gmNPCs, id), npc)
    },
    async deleteNpc({ state }, key) {
      await update(refs.gmNPCs, {[key]: null})
    },
  },

}

export default gmNPCStore