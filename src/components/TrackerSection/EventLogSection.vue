<script>
import ActionCard from './ActionCard.vue'

export default {
  components: {
    ActionCard,
  },
  methods: {
    editNewAction() {
      this.$store.dispatch('editNewAction')
    },
    saveScrollPos(e) {
      this.$store.commit('setEventLogScrollPos', e.target.scrollTop)
    },
  },
  mounted() {
    this.$nextTick(() => {
      this.$refs.scroller.scrollTop = this.$store.state.eventLog.scrollPos
    })
  },
}
</script>

<template>
<div class="h-full w-full max-w-screen-lg mx-auto relative uppercase border flex flex-col overflow-hidden">
  <span class="absolute bg-base-100 z-10 w-full top-0 left-0 p-4 px-8 border-b-2 text-3xl">
    <span>
      Event Log
    </span>
  </span>

  <div class="absolute h-full w-full overflow-y-scroll" ref="scroller" @scroll.passive="saveScrollPos">
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
</template>
