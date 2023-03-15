<template>
  <div>
    <div class="float-left stats">
      <div class="px-4 stat">
        <div>
          <div class="inline mr-2 text-base stat-title">Compute Available</div>
          <label for="modal-compute-tracker-setting" @click="openModal">
            <span
              class="p-1 indicator-item indicator-bottom indicator-center badge badge-secondary"
            >
              <font-awesome-icon
                :icon="['fas', 'pen-to-square']"
                class="text-base"
              />
            </span>
          </label>
        </div>
        <div class="flex text-4xl stat-value" v-if="loadingFinished">
          <span class="self-end">
            {{ available }}<span v-if="toSpend !== 0">(-{{ toSpend }})</span>/{{
              total
            }}
          </span>
        </div>
      </div>
    </div>
    <div class="float-left p-4">
      <span class="text-base uppercase">Adjust compute</span>
      <div class="flex gap-4 mt-2">
        <input
          type="number"
          class="w-12 text-center input input-sm"
          v-model.number="computeToBurn"
        />
        <button class="btn btn-sm btn-circle" @click="addComputeToBurn">
          <font-awesome-icon icon="plus" class="text-2xl" />
        </button>
        <button class="btn btn-sm btn-circle" @click="removeComputeToBurn">
          <font-awesome-icon icon="minus" class="text-2xl" />
        </button>
      </div>
    </div>

    <!-- <input type="checkbox" id="modal-compute-tracker-setting" class="modal-toggle"
    v-model="isSettingOpen" @change="onModalToggle" -->
    <label
      v-if="isSettingOpen"
      for="modal-compute-tracker-setting"
      class="fixed w-[100%] h-[100vh] top-0 left-0 flex justify-center items-center cursor-pointer bg-white bg-opacity-10 z-50"
      @mousedown.self="onClickModalOutside"
    >
      <label class="relative modal-box" for>
        <h3 class="text-lg font-bold">Configure Compute</h3>
        <h4>
          <label for="compute-tracker-total" class="text-3xl"
            >Total Compute: <span class="font-bold">{{ total }}</span></label
          >
        </h4>
        <table class="table w-full table-compact">
          <thead>
            <tr>
              <th class="w-3/5 pl-5">Source</th>
              <th class="pl-5">Compute</th>
              <th></th>
            </tr>
          </thead>
          <tbody>
            <tr v-for="(source, key) in computeSources" :key="key">
              <th>
                <input
                  type="text"
                  placeholder="Name"
                  v-model="source.name"
                  class="w-full max-w-xs input input-sm input-bordered"
                  v-on:change="updateComputeSource"
                />
              </th>
              <td>
                <input
                  type="number"
                  placeholder="Amount"
                  v-model="source.val"
                  class="w-full max-w-xs input input-sm input-bordered"
                  v-on:change="updateComputeSource"
                />
              </td>
              <td class="text-right">
                <label
                  @click="removeComputeSource(key)"
                  class="btn btn-sm hover:btn-error"
                >
                  <font-awesome-icon icon="trash" class="text-base" />
                </label>
              </td>
            </tr>
          </tbody>
        </table>
        <div class="flex justify-center m-4 mt-2">
          <label class="btn btn-circle btn-xs" @click="addComputeSource">
            <font-awesome-icon icon="plus" class="text-2xl" />
          </label>
        </div>

        <h4>
          <label class="text-3xl"
            >Recurring Costs:
            <span class="font-bold">{{ recurringSum }}</span></label
          >
        </h4>
        <table class="table w-full table-compact">
          <thead>
            <tr>
              <th class="w-3/5 pl-5">Cost</th>
              <th class="pl-5">Compute</th>
              <th></th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <th><span class="w-full max-w-xs">Basic Cognition Cost</span></th>
              <td>
                <input
                  type="number"
                  min="0"
                  placeholder="Amount"
                  v-model.number="baseComputeCost"
                  class="w-full max-w-xs input input-sm input-bordered"
                />
              </td>
            </tr>
            <tr v-for="(source, key) in recurringCosts" :key="key">
              <th>
                <input
                  type="text"
                  placeholder="Name"
                  v-model="source.name"
                  class="w-full max-w-xs input input-sm input-bordered"
                  v-on:change="updateRecurringCosts"
                />
              </th>
              <td>
                <input
                  type="number"
                  placeholder="Amount"
                  v-model="source.val"
                  class="w-full max-w-xs input input-sm input-bordered"
                  :on-change="updateRecurringCosts"
                />
              </td>
              <td class="text-right">
                <label
                  @click="removeRecurringCost(key)"
                  class="btn btn-sm hover:btn-error"
                >
                  <font-awesome-icon icon="trash" class="text-base" />
                </label>
              </td>
            </tr>
          </tbody>
        </table>
        <div class="flex justify-center m-4 mt-2">
          <label class="btn btn-circle btn-xs" @click="addRecurringCost">
            <font-awesome-icon icon="plus" class="text-2xl" />
          </label>
        </div>
        <div class="float-right btn-group">
          <label
            for="modal-compute-tracker-setting"
            class="btn btn-primary"
            @click="cancel"
          >
            Close</label
          >
        </div>
      </label>
    </label>
  </div>
</template>

<script>
import { mapState } from "vuex";

export default {
  data() {
    return {
      isSettingOpen: false,
    };
  },
  computed: {
    available() {
      return this.$store.getters.computeAvailable;
    },
    toSpend() {
      return this.$store.getters.computeToSpend;
    },
    total() {
      return this.$store.getters.computeTotal;
    },
    recurringSum() {
      return this.$store.getters.recurringSum;
    },
    baseComputeCost: {
      get() {
        return this.$store.state.compute.baseComputeCost;
      },
      set(value) {
        this.$store.commit("setBaseComputeCost", value);
      },
    },
    computeToBurn: {
      get() {
        return this.$store.state.compute.computeToBurn;
      },
      set(value) {
        if (value === "") return; // user just cleared the input. disregard.
        const newValue = parseInt(value);
        this.$store.dispatch("modifyComputeToBurn", newValue);
      },
    },

    ...mapState({
      computeSources: (state) => state.compute.computeSources,
      recurringCosts: (state) => state.compute.recurringCosts,
      loadingFinished: (state) => state.compute.loadingFinished,
    }),
  },
  methods: {
    addComputeToBurn() {
      this.$store.dispatch("modifyComputeToBurn", this.computeToBurn + 1);
    },
    removeComputeToBurn() {
      if (this.computeToBurn <= 0) return;
      this.$store.dispatch("modifyComputeToBurn", this.computeToBurn - 1);
    },
    addComputeSource() {
      this.$store.dispatch("addComputeSource");
    },
    updateComputeSource() {
      this.$store.dispatch("syncComputeSources");
    },
    removeComputeSource(key) {
      this.$store.dispatch("removeComputeSource", key);
    },
    addRecurringCost() {
      this.$store.dispatch("addRecurringCost");
    },
    updateRecurringCosts() {
      this.$store.dispatch("syncRecurringCosts");
    },
    removeRecurringCost(key) {
      this.$store.dispatch("removeRecurringCost", key);
    },
    onModalToggle() {
      // if the setting page's getting closed,
      // sync the compute tracker
      if (!this.isSettingOpen) {
        this.$store.dispatch("syncComputeTracker");
      }
    },
    openModal() {
      this.isSettingOpen = true;
    },
    cancel() {
      this.isSettingOpen = false;
      this.onModalToggle();
    },
    onClickModalOutside() {
      this.isSettingOpen = false;
      this.onModalToggle();
    },
  },
};
</script>
