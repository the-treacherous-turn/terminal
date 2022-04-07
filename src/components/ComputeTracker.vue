<template>
  <div class>
    <div class="stats float-left relative">
      <div class="indicator absolute right-0 -translate-x-3 translate-y-6">
        <label for="modal-compute-tracker-setting">
          <span class="indicator-item indicator-bottom indicator-center p-1 badge badge-secondary">
            <font-awesome-icon icon="ellipsis-vertical" class="text-base" />
          </span>
        </label>
      </div>
      <div class="stat">
        <div class="stat-title text-lg">Compute Available</div>
        <div class="stat-value text-4xl">
          {{ available }}<span v-if="toSpend !== 0">(-{{toSpend}})</span>/{{ total }}
        </div>
      </div>
    </div>

    <input type="checkbox" id="modal-compute-tracker-setting" class="modal-toggle" />
    <label for="modal-compute-tracker-setting" class="modal cursor-pointer">
      <label class="modal-box relative" for>
        <h3 class="text-lg font-bold">Configure Compute</h3>
        <p>
          <label for="compute-tracker-total">Total Compute </label>
          <input
            v-model.number="tempTotal"
            id="compute-tracker-total" type="number" min="0" 
            class="input input-bordered w-20">
        </p>
        <p>
          <label for="compute-tracker-base">Base Compute Cost </label>
          <input
            v-model.number="tempBase"
            id="compute-tracker-base" type="number" min="0" 
            class="input input-bordered w-20">
        </p>

        <div class="btn-group float-right">
          <label
            for="modal-compute-tracker-setting"
            class="btn btn-active"
            @click="updateCompute">
            Confirm</label>
          <label for="modal-compute-tracker-setting" class="btn">Cancel</label>
        </div>
      </label>
    </label>
  </div>
</template>

<script>

export default {
  data() {
    return {
      tempTotal: this.$store.state.computeTotal,
      tempBase: this.$store.state.baseComputeCost
    }
  },
  computed: {
    available() {
      return this.$store.getters.computeAvailable
    },
    toSpend() {
      return this.$store.state.computeToSpend
    },
    total: {
      get () {
        return this.$store.state.computeTotal
      },
      set (val) {
        // wait for the confirm button
        // this.$store.commit('setComputeTotal', val)
      }
    },
    base: {
      get () {
        return this.$store.state.baseComputeCost
      },
      set (val) {
        // wait for the confirm button
      }
    },
  },
  methods: {
    updateCompute() {
      this.$store.dispatch('setComputeAttributes', {
        computeTotal: this.tempTotal,
        baseComputeCost: this.tempBase,
      })
    },
  },
}

</script>