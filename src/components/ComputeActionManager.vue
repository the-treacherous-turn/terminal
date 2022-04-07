<script>
import ComputeActionCard from './ComputeActionCard.vue'
export default {
  components: {
    ComputeActionCard,
  },
  computed: {
    canAssignCompute() {
      return this.$store.getters.computeAvailable > 0 && this.$store.state.computeToSpend > 0
    },
  }
}
</script>

<template>
<h1 class="text-3xl font-bold">Compute Action Manager</h1>
<div id="compute-action-list" class="overflow-scroll border-t-2">
  <ComputeActionCard
    v-for="(action, key) in $store.state.computeActions"
    v-bind="action"
    :key="key"
    :actionID="key"
  />
  <div class="flex justify-center m-4">
    <button class="btn btn-circle" @click="$store.dispatch('editNewComputeAction')">
      <font-awesome-icon icon="plus" class="text-6xl" />
    </button>
  </div>
</div>
<div class="flex justify-center m-4">
  <button
    :disabled="!canAssignCompute"
    class="btn btn-primary btn-wide"
    @click="$store.dispatch('assignComputePoints')"
    >
    Assign Compute Points
  </button>
</div>

</template>
