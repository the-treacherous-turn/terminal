import refs from "../firebase";
import {
  onChildAdded,
  onChildChanged,
  onChildRemoved,
  update,
  push,
} from "firebase/database";
import { faL } from "@fortawesome/free-solid-svg-icons";

const eventLogStore = {
  state: () => ({
    actions: {},
    isEditorOpen: false,
    dirtyActionID: null,
    scrollPos: 0,
  }),
  getters: {
    dirtyAction(state) {
      return state.actions[state.dirtyActionID];
    },
  },
  mutations: {
    setActionWithID(state, { actionID, actionObj }) {
      state.actions[actionID] = actionObj;
    },
    editNewAction(state, { actionID }) {
      // create new action
      state.dirtyActionID = actionID;
      // open the editor
      state.isEditorOpen = true;
    },
    editExtantAction(state, actionID) {
      state.dirtyActionID = actionID;
      state.actions[state.dirtyActionID].isDirty = true;
      state.isEditorOpen = true;
    },
    updateAction(state, payload) {
      if (state.dirtyActionID === null) return; // safeguard against creating null action
      const currentAction = state.actions[state.dirtyActionID];
      state.actions[state.dirtyActionID] = { ...currentAction, ...payload };
    },
    updateStateAction(state, { actionState, commitTimeISO }) {
      console.log(commitTimeISO);
      state.actions[state.dirtyActionID].actionState = actionState;
      if (actionState === "FINALIZED") {
        state.actions[state.dirtyActionID].isCommitted = true;
        state.actions[state.dirtyActionID].isForecast = false;
        state.actions[state.dirtyActionID].commitTimeISO = commitTimeISO;
      } else if (actionState === "CROSSED OUT") {
        state.actions[state.dirtyActionID].isCommitted = false;
        state.actions[state.dirtyActionID].isForecast = true;
        state.actions[state.dirtyActionID].commitTimeISO = commitTimeISO;
      } else {
        state.actions[state.dirtyActionID].isCommitted = false;
        state.actions[state.dirtyActionID].isForecast = false;
      }
    },
    submitActionEdit(state) {
      state.actions[state.dirtyActionID].isDirty = false;
      state.actions[state.dirtyActionID].isNew = false;
      state.dirtyActionID = null;
    },
    commitAction(state, { actionID, commitTimeISO, dayLeft }) {
      state.actions[actionID].isCommitted = true;
      state.actions[actionID].isForecast = false;
      state.actions[actionID].isNormal = false;
      state.actions[actionID].commitTimeISO = commitTimeISO;
      state.actions[actionID].dayLeft = dayLeft;
    },
    undoCommitAction(state, actionID) {
      state.actions[actionID].isCommitted = false;
    },
    markAsForecast(state, actionID) {
      state.actions[actionID].isForecast = true;
      state.actions[actionID].isCommitted = false;
      state.actions[actionID].isNormal = false;
    },
    normalCard(state, actionID) {
      state.actions[actionID].isForecast = false;
      state.actions[actionID].isCommitted = false;
      state.actions[actionID].isNormal = true;
    },
    undoForecastAction(state, actionID) {
      state.actions[actionID].isForecast = false;
    },
    deleteAction(state, actionID) {
      if (!state.actions[actionID])
        throw new Error(
          `Cannot delete action ${actionID}: action does not exist`
        );
      delete state.actions[actionID];
    },
    openEditor(state) {
      state.isEditorOpen = true;
    },
    closeEditor(state) {
      state.isEditorOpen = false;
    },
    setEventLogScrollPos(state, pos) {
      state.scrollPos = pos;
    },
  },
  actions: {
    async listenToFBEventLog({ commit, state }) {
      onChildAdded(refs.actions, (snapshot) => {
        commit("setActionWithID", {
          actionID: snapshot.key,
          actionObj: snapshot.val(),
        });
      });
      onChildChanged(refs.actions, (snapshot) => {
        commit("setActionWithID", {
          actionID: snapshot.key,
          actionObj: snapshot.val(),
        });
      });
      onChildRemoved(refs.actions, (snapshot) => {
        if (!state.actions[snapshot.key]) return; // safeguard against unnecessary deletion
        commit("deleteAction", snapshot.key);
      });
    },
    async editNewAction({ commit }) {
      // create new action
      const actionObj = {
        name: "",
        description: "",
        isDirty: true,
        isNew: true,
        isNormal: true,
        isCommitted: false,
        isForecast: false,
        actionState: "",
        // actionStata:
      };
      // push a new action into the database
      const actionID = await push(refs.actions, actionObj).key;
      commit("setActionWithID", { actionID, actionObj });
      commit("editNewAction", { actionID });
    },

    async editExtantAction({ commit, state }, actionID) {
      commit("editExtantAction", actionID);
      await update(refs.actions, { [actionID]: state.actions[actionID] });
    },

    async submitActionEdit({ commit, state }) {
      const actionID = state.dirtyActionID;
      commit("submitActionEdit");
      await update(refs.actions, { [actionID]: state.actions[actionID] });
    },

    async deleteAction({ commit }, actionID) {
      commit("deleteAction", actionID);
      await update(refs.actions, { [actionID]: null });
    },

    async commitAction(
      { commit, state, rootState },
      { actionID, commitTimeISO, dayLeft }
    ) {
      commit("commitAction", { actionID, commitTimeISO, dayLeft });
      await update(refs.actions, { [actionID]: state.actions[actionID] });
    },

    async undoCommitAction({ commit, state }, actionID) {
      commit("undoCommitAction", actionID);
      await update(refs.actions, { [actionID]: state.actions[actionID] });
    },

    async markAsForecast({ commit, state }, actionID) {
      commit("markAsForecast", actionID);
      await update(refs.actions, { [actionID]: state.actions[actionID] });
    },

    async undoForecastAction({ commit, state }, actionID) {
      commit("undoForecastAction", actionID);
      await update(refs.actions, { [actionID]: state.actions[actionID] });
    },

    async normalCard({ commit, state }, actionID) {
      commit("normalCard", actionID);
      await update(refs.actions, { [actionID]: state.actions[actionID] });
    },
  },
};
export default eventLogStore;
