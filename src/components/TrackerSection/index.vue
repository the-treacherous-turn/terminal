<script>
import ActionCard from './ActionCard.vue'
import Clock from './Clock.vue'
import ComputeTracker from './ComputeTracker.vue'
import ComputeActionManager from './ComputeActionManager.vue'


export default {
  name: "TrackerSection",
  components: {
    ActionCard,
    Clock,
    ComputeTracker,
    ComputeActionManager,
  },
  methods: {
    editNewAction() {
      this.$store.dispatch('editNewAction')
    },
  }
}
</script>

<template>
<div class="relative w-full min-w-[1074px] h-full grid grid-cols-2 gap-4">
  <div class="relative uppercase border">
    <span class="absolute bg-base-100 z-10 w-full top-0 left-0 p-4 px-8 border-b-2 text-3xl">
      <span>
        Event Log
      </span>
    </span>
  
    <div class="absolute h-full w-full overflow-y-scroll">
        <div class="h-16"></div>
        <ActionCard
          v-for="(action, key) in $store.state.eventLog.actions"
          :key="key"
          :actionID="key"
          :name="action.name"
          :description="action.description"
          :risk="action.risk"
          :confidence="action.confidence"
          :compute="action.compute"
          :isDirty="action.isDirty"
          :isCommitted="action.isCommitted"
          :isForecast="action.isForecast"
          :commitTimeISO="action.commitTimeISO"
        />
        <div class="h-24"></div>
    </div>
  
    <div class="absolute bg-base-100 w-full bottom-0 left-0 p-4 pl-8 border-t-2">
      <button class=""
        type="button"
        @click="editNewAction"
      >
        >> New Action
      </button>
    </div>
  </div>
  <div class="relative uppercase border flex flex-col overflow-hidden">
    <div>
      <ComputeTracker />
      <Clock />
    </div>
    <div class="flex flex-col p-8 overflow-hidden">
      <ComputeActionManager />
    </div>  
  </div>
</div>
</template>
