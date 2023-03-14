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
<div class="relative flex flex-col w-full h-full mx-auto overflow-hidden uppercase border max-w-screen-lg">
  <div>
    <ComputeTracker />
  </div>
  <div class="flex flex-col p-8 overflow-hidden">
    <ComputeActionManager />
  </div>  
</div>
</template>