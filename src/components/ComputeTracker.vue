<template>
  <div class>
    <div class="stats float-left relative">
      <div class="indicator absolute right-0 -translate-x-2 translate-y-6">
        <label for="modal-compute-tracker-setting">
          <span class="indicator-item indicator-bottom indicator-center p-1 badge badge-secondary">
            <font-awesome-icon icon="ellipsis-vertical" class="text-base" />
          </span>
        </label>
      </div>
      <div class="stat px-4">
        <div class="stat-title text-base">Compute Available</div>
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
          <label for="compute-tracker-total">Total Compute: {{ total }}</label>
        </p>
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
                  class="btn btn-sm btn-danger"
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
            class="btn btn-primary"
            @click="updateCompute">
            Confirm</label>
          <label for="modal-compute-tracker-setting" class="btn">Cancel</label>
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
      tempBase: this.$store.state.compute.baseComputeCost
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
    base: {
      get () {
        return this.$store.state.compute.baseComputeCost
      },
      set (val) {
        // wait for the confirm button
      }
    },
    ...mapState({
      computeSources: state => state.compute.computeSources,
    },)
  },
  methods: {
    addComputeSource() {
      this.$store.dispatch('addComputeSource')
    },
    removeComputeSource(key) {
      this.$store.dispatch('removeComputeSource', key)
    },
    updateCompute() {
      this.$store.dispatch('setComputeAttributes', {
        baseComputeCost: this.tempBase,
      })
      this.$store.dispatch('syncComputeSources')
    },
  },
}

</script>