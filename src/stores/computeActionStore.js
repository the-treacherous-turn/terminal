import refs from "../firebase";
import {
  update,
  push,
  onChildAdded,
  onChildChanged,
  onChildRemoved,
} from "firebase/database";

const computeActionStore = {
  state: () => ({
    computeActions: {},
    dirtyComputeActionID: null,
    scrollPos: 0,
  }),
  getters: {
    dirtyComputeAction(state) {
      return state.computeActions[state.dirtyComputeActionID];
    },
  },
  mutations: {
    updateComputeAction(state, { actionID, payload }) {
      const currentComputeAction = state.computeActions[actionID]; // this may be undefined, in which case we'd be creating a new action
      state.computeActions[actionID] = { ...currentComputeAction, ...payload };
    },
    editNewComputeAction(state, { actionID, actionObj }) {
      // create new compute action
      this.commit("updateComputeAction", { actionID, payload: actionObj });
      state.dirtyComputeActionID = actionID;
    },
    editExtantComputeAction(state, actionID) {
      state.dirtyComputeActionID = actionID;
      state.computeActions[state.dirtyComputeActionID].isDirty = true;
    },
    // this edit submission relies in the dirty compute action.
    submitComputeActionEdit(state) {
      if (state.dirtyComputeActionID === null) return; //safeguard
      state.computeActions[state.dirtyComputeActionID].isDirty = false;
      state.computeActions[state.dirtyComputeActionID].isNew = false;
      state.dirtyComputeActionID = null;
    },
    deleteComputeAction(state, computeActionID) {
      if (!state.computeActions[computeActionID]){
        throw new Error(
          `Cannot delete compute action ${computeActionID}: compute action does not exist`
        );
      }
      delete state.computeActions[computeActionID];
    },
    setComputeActionScrollPos(state, pos) {
      state.scrollPos = pos;
    },
  },
  actions: {
    async listenToFBComputeActions({ commit, state }) {
      onChildAdded(refs.computeActions, (snapshot) => {
        commit("updateComputeAction", {
          actionID: snapshot.key,
          payload: snapshot.val(),
        });
      });
      onChildChanged(refs.computeActions, (snapshot) => {
        commit("updateComputeAction", {
          actionID: snapshot.key,
          payload: snapshot.val(),
        });
      });
      onChildRemoved(refs.computeActions, (snapshot) => {
        if (!state.computeActions[snapshot.key]) return; // safeguard against unnecessary deletion
        commit("deleteComputeAction", snapshot.key);
      });
    },
    async editNewComputeAction({ commit }) {
      const actionObj = {
        name: "",
        desc: "",
        actionType: "custom",
        upgradeTier: 1,
        upgradeTheoryType: "same",
        existingUpgradeCount: 0,
        computeNeeded: 0,
        computeApplied: 0,
        computeToAdd: 0,
        isDirty: true,
        isNew: true,
      };
      const actionID = await push(refs.computeActions, actionObj).key;
      commit("editNewComputeAction", { actionID, actionObj });
    },
    async editExtantComputeAction({ commit, state }, actionID) {
      commit("editExtantComputeAction", actionID);
      await update(refs.computeActions, {
        [actionID]: state.computeActions[actionID],
      });
    },
    async submitComputeAction({ commit, state }) {
      const actionID = state.dirtyComputeActionID;
      commit("submitComputeActionEdit");
      await update(refs.computeActions, {
        [actionID]: state.computeActions[actionID],
      });
    },
    async deleteComputeAction({ commit }, actionID) {
      commit("deleteComputeAction", actionID);
      await update(refs.computeActions, { [actionID]: null });
    },
    async modifyComputeToApply({ commit, state }, { actionID, delta }) {
      const ca = state.computeActions[actionID];
      // if the compute action is maxed out, then back out
      if (ca.computeNeeded < ca.computeApplied + ca.computeToAdd + delta)
        return;
      if (ca.computeToAdd + delta < 0) return;
      commit("updateComputeAction", {
        actionID,
        payload: {
          computeToAdd: ca.computeToAdd + delta,
        },
      });
      await update(refs.computeActions, {
        [actionID]: state.computeActions[actionID],
      });
    },
    async assignComputePoints({ state, rootState, getters, rootGetters, commit, dispatch }) {
      ///// 2. assign computes in compute actions
      Object.values(state.computeActions).forEach((ca) => {
        const computeAvailable = getters.computeAvailable
        // if we used it all up, then don't bother.
        if (!computeAvailable) return
        // if there isn't enough compute available, then add however much is left
        let change = 0
        if (ca.computeToAdd > computeAvailable) {
          change = computeAvailable
        } else {
          change = ca.computeToAdd
        }
        ca.computeApplied += change

        const timeLeft = rootGetters.cycleEndTime - rootGetters.nowTime // in ms
        const timeLeftInHours = timeLeft / (1000 * 60 * 60) // to hr
        const hourToAdvance = (change / computeAvailable) * timeLeftInHours

        commit("advanceTime", hourToAdvance)
        commit("updateComputeSpent", change)

        // calculate the computes to add for next assign, and new total compute to spend
        const remainingComputeNeeded = ca.computeNeeded - ca.computeApplied
        // if the bar is almost filled, then set compute to add to the remaining amount
        if (remainingComputeNeeded < ca.computeToAdd) {
          ca.computeToAdd = remainingComputeNeeded
        }
      })
      ///// 3. sync
      await dispatch("syncClock")
      await update(refs.computeActions, state.computeActions)
      await update(refs.computeTracker, {
        computeSpent: rootState.compute.computeSpent,
      })
    },
  },
}

export default computeActionStore;
