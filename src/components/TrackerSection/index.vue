<script>
import ActionCard from './ActionCard.vue'
import Clock from './Clock.vue'
import ComputeTracker from './ComputeTracker.vue'
import ComputeActionManager from './ComputeActionManager.vue'
import EventLogSection from './EventLogSection.vue'


export default {
  name: "TrackerSection",
  components: {
    ActionCard,
    Clock,
    ComputeTracker,
    ComputeActionManager,
    EventLogSection,
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
  <EventLogSection />
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
