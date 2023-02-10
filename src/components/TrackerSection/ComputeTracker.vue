<template>
  <div v-if="available !== Infinity">
    <div class="stats float-left">
      <div class="stat px-4">
        <div>
          <div class="stat-title text-base inline mr-2">Compute Available</div>
          <label for="modal-compute-tracker-setting">
            <span class="indicator-item indicator-bottom indicator-center p-1 badge badge-secondary">
              <font-awesome-icon :icon="['fas', 'pen-to-square']" class="text-base" />
            </span>
          </label>
        </div>
        <div class="stat-value text-4xl flex">
          <span class="self-end">
            {{ available }}<span v-if="toSpend !== 0">(-{{toSpend}})</span>/{{ total }}
          </span>
          <div class="inline-flex flex-col pl-2">
            <div class="m-0.5 btn h-4 min-h-0 w-8 btn-square btn-ghost border-0" @click="">
              <font-awesome-icon icon="chevron-up" class="text-base" />
            </div>
            <div class="m-0.5 btn h-4 min-h-0 w-8 btn-square btn-ghost border-0" @click="">
              <font-awesome-icon icon="chevron-down" class="text-base" />
            </div>
          </div>
        </div>
      </div>
    </div>

    <input type="checkbox" id="modal-compute-tracker-setting" class="modal-toggle"
    v-model="isSettingOpen" @change="onModalToggle"
    />
    <label for="modal-compute-tracker-setting" class="modal cursor-pointer">
      <label class="modal-box relative" for>
        <h3 class="text-lg font-bold">Configure Compute</h3>
        <h4>
          <label for="compute-tracker-total" class="text-3xl">Total Compute: <span class="font-bold">{{total}}</span></label>
        </h4>
        <table class="table table-compact w-full">
          <thead>
            <tr>
              <th class="pl-5 w-3/5">Source</th>
              <th class="pl-5">Compute</th>
              <th></th>
            </tr>
          </thead>
          <tbody>
            <tr
              v-for="(source, key) in computeSources"
              :key="key"
            >
              <th><input type="text" placeholder="Name" v-model="source.name" class="input input-sm input-bordered w-full max-w-xs" /></th>
              <td><input type="number" placeholder="Amount" v-model="source.val" class="input input-sm input-bordered w-full max-w-xs" /></td>
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
          <label class="btn btn-circle btn-xs"
            @click="addComputeSource"
          >
            <font-awesome-icon icon="plus" class="text-2xl" />
          </label>
        </div>

        <h4>
          <label class="text-3xl">Recurring Costs: <span class="font-bold">{{recurringSum}}</span></label>
        </h4>
        <table class="table table-compact w-full">
          <thead>
            <tr>
              <th class="pl-5 w-3/5">Item</th>
              <th class="pl-5">Cost</th>
              <th></th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <th><span class="input input-sm w-full max-w-xs">Basic Cognition Cost</span></th>
              <td><input type="number" min="0" placeholder="Amount" v-model.number="baseComputeCost" class="input input-sm input-bordered w-full max-w-xs" /></td>
            </tr>
            <tr
              v-for="(source, key) in recurringCosts"
              :key="key"
            >
              <th><input type="text" placeholder="Name" v-model="source.name" class="input input-sm input-bordered w-full max-w-xs" /></th>
              <td><input type="number" placeholder="Amount" v-model="source.val" class="input input-sm input-bordered w-full max-w-xs" /></td>
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
          <label class="btn btn-circle btn-xs"
            @click="addRecurringCost"
          >
            <font-awesome-icon icon="plus" class="text-2xl" />
          </label>
        </div>
        <div class="btn-group float-right">
          <label
            for="modal-compute-tracker-setting"
            class="btn btn-primary">
            Close</label>
        </div>
      </label>
    </label>
  </div>
</template>

<script>
import { mapState } from 'vuex'

export default {
  data() {
    return {
      isSettingOpen: false,
    }
  },
  computed: {
    available() {
      return this.$store.getters.computeAvailable
    },
    toSpend() {
      return this.$store.state.compute.computeToSpend
    },
    total() {
      return this.$store.getters.computeTotal
    },
    recurringSum() {
      return this.$store.getters.recurringSum
    },
    baseComputeCost: {
      get () {
        return this.$store.state.compute.baseComputeCost
      },
      set (value) {
        this.$store.commit('setBaseComputeCost', value)
      }
    },

    ...mapState({
      computeSources: state => state.compute.computeSources,
      recurringCosts: state => state.compute.recurringCosts,
    },)
  },
  methods: {
    addComputeSource() {
      this.$store.dispatch('addComputeSource')
    },
    removeComputeSource(key) {
      this.$store.dispatch('removeComputeSource', key)
    },
    addRecurringCost() {
      this.$store.dispatch('addRecurringCost')
    },
    removeRecurringCost(key) {
      this.$store.dispatch('removeRecurringCost', key)
    },
    onModalToggle() {
      // if the setting page's getting closed,
      // sync the compute tracker
      if (!this.isSettingOpen) {
        this.$store.dispatch('syncComputeTracker')
      }
    }
  },
}

</script>