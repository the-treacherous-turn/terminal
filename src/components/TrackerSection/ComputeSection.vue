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
<div class="h-full w-full max-w-screen-lg mx-auto relative uppercase border flex flex-col overflow-hidden">
  <div>
    <ComputeTracker />
  </div>
  <div class="flex flex-col p-8 overflow-hidden">
    <ComputeActionManager />
  </div>  
</div>
</template>