<script>
import ComputeTracker from './ComputeTracker.vue'
import ComputeActionManager from './ComputeActionManager.vue'

export default {
  components: {
    ComputeTracker,
    ComputeActionManager,
  },
}
</script>

<template>
<div class="relative flex flex-col w-full h-full max-w-screen-lg mx-auto overflow-hidden border">
  <div>
    <ComputeTracker />
  </div>
  <ComputeActionManager />
</div>
</template>