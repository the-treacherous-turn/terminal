import {
  update,
  push,
  child,
  onChildAdded,
  onChildChanged,
  onChildRemoved,
} from "firebase/database";
import refs from "../firebase";

export default {
  state: () => ({
    specs: {},
    activeSpecID: null,
  }),
  getters: {
    activeSpec(state) {
      return state.specs[state.activeSpecID];
    },
    keysOfUpgrades(state) {
      //   console.log(state.specs[state.activeSpecID].keysOfUpgrades);
      return state.specs[state.activeSpecID].keysOfUpgrades !== undefined
        ? state.specs[state.activeSpecID].keysOfUpgrades
        : [];
    },
    keysOfInsights(state) {
      //   console.log(state.specs[state.activeSpecID].keysOfUpgrades);
      return state.specs[state.activeSpecID].keysOfInsights !== undefined
        ? state.specs[state.activeSpecID].keysOfInsights
        : [];
    },
  },
  mutations: {
    setActiveSpecID(state, specID) {
      state.activeSpecID = specID;
    },
    clearActiveSpecID(state) {
      state.activeSpecID = null;
    },
    setSpecs(state, specs) {
      state.specs = specs;
    },
    setSpec(state, { specID, spec }) {
      state.specs[specID] = spec;
      if (spec.upgrades === undefined && spec.keysOfUpgrades !== undefined) {
        spec.keysOfUpgrades = []
        update(refs.specs, { [specID]: spec })
      } else if (spec.upgrades !== undefined && spec.keysOfUpgrades === undefined) {
        spec.keysOfUpgrades = [...Object.keys(spec.upgrades)];
        update(refs.specs, { [specID]: spec });
      } else if (
        spec.upgrades !== undefined &&
        Object.keys(spec.upgrades).length ===
          Object.keys(spec.keysOfUpgrades).length + 1
      ) {
        spec.keysOfUpgrades.push(
          Object.keys(spec.upgrades)[Object.keys(spec.upgrades).length - 1]
        );
        update(refs.specs, { [specID]: spec });
      } else if (
        spec.upgrades !== undefined &&
        Object.keys(spec.upgrades).length ===
          Object.keys(spec.keysOfUpgrades).length - 1
      ) {
        spec.keysOfUpgrades = spec.keysOfUpgrades.filter((item) =>
          Object.keys(spec.upgrades).includes(item)
        );
        update(refs.specs, { [specID]: spec });
      }

      if (spec.insights !== undefined && spec.keysOfInsights === undefined) {
        spec.keysOfInsights = [...Object.keys(spec.insights)];
        update(refs.specs, { [specID]: spec });
      } else if (
        spec.insights !== undefined &&
        Object.keys(spec.insights).length ===
          Object.keys(spec.keysOfInsights).length + 1
      ) {
        spec.keysOfInsights.push(
          Object.keys(spec.insights)[Object.keys(spec.insights).length - 1]
        );
        update(refs.specs, { [specID]: spec });

        // console.log(spec.keysOfInsights);
      } else if (
        spec.insights !== undefined &&
        Object.keys(spec.insights).length ===
          Object.keys(spec.keysOfInsights).length - 1
      ) {
        spec.keysOfInsights = spec.keysOfInsights.filter((item) =>
          Object.keys(spec.insights).includes(item)
        );
        update(refs.specs, { [specID]: spec });
      }
    },
    deleteSpec(state, specID) {
      delete state.specs[specID];
    },
  },
  actions: {
    async listenToFBSpecs({ commit, state }) {
      onChildAdded(refs.specs, (snapshot) => {
        const spec = snapshot.val();
        const specID = snapshot.key;
        commit("setSpec", { specID, spec });
      });
      onChildChanged(refs.specs, (snapshot) => {
        const spec = snapshot.val();
        const specID = snapshot.key;
        commit("setSpec", { specID, spec });
      });
      onChildRemoved(refs.specs, (snapshot) => {
        if (!state.specs[snapshot.key]) return;
        const specID = snapshot.key;
        if (specID === state.activeSpecID) commit("clearActiveSpecID");
        commit("deleteSpec", specID);
      });
    },
    async addSpec({ state }, spec) {
      await push(refs.specs, spec);
    },
    async renameSpec({ state }, { id, name }) {
      await update(child(refs.specs, id), { name });
    },
    async changeSpecFocus({ state }, { id, focus }) {
      await update(child(refs.specs, id), { focus });
    },
    async editSpec({ state }, { id, spec }) {
      await update(child(refs.specs, id), spec);
    },
    async deleteSpec({ state }, key) {
      await update(refs.specs, { [key]: null });
    },

    async updateKeys({ state }, keys) {
      const changesObj = {};
      changesObj.keysOfUpgrades = [...keys];
      await update(child(refs.specs, `${state.activeSpecID}`), changesObj);
    },
    async insightKeys({ state }, keys) {
      const changesObj = {};
      changesObj.keysOfInsights = [...keys];
      await update(child(refs.specs, `${state.activeSpecID}`), changesObj);
    },
    async addInsight({ state }, insight) {
      if (!state.activeSpecID) throw new Error("No active spec");
      await push(child(refs.specs, `${state.activeSpecID}/insights`), insight);
    },
    async editInsight({ state }, { id, insight }) {
      if (!state.activeSpecID) throw new Error("No active spec");
      await update(
        child(refs.specs, `${state.activeSpecID}/insights/${id}`),
        insight
      );
    },
    async deleteInsight({ state }, key) {
      if (!state.activeSpecID) throw new Error("No active spec");
      await update(child(refs.specs, `${state.activeSpecID}/insights`), {
        [key]: null,
      });
    },
    async addUpgrade({ state }, upgrade) {
      if (!state.activeSpecID) throw new Error("No active spec");
      await push(child(refs.specs, `${state.activeSpecID}/upgrades`), upgrade);
    },
    async editUpgrade({ state }, { id, upgrade }) {
      if (!state.activeSpecID) throw new Error("No active spec");
      await update(
        child(refs.specs, `${state.activeSpecID}/upgrades/${id}`),
        upgrade
      );
    },
    async deleteUpgrade({ state }, key) {
      if (!state.activeSpecID) throw new Error("No active spec");
      await update(child(refs.specs, `${state.activeSpecID}/upgrades`), {
        [key]: null,
      });
    },
  },
};
