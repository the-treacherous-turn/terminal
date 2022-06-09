<script>
import { SimpleBar } from 'simplebar-vue3';
import ActionEditor from './components/ActionEditor.vue'
import ActionCard from './components/ActionCard.vue'
import Clock from './components/Clock.vue'
import ComputeTracker from './components/ComputeTracker.vue'
import ComputeActionManager from './components/ComputeActionManager.vue'

export default {
  components: {
    SimpleBar,
    ActionEditor,
    ActionCard,
    Clock,
    ComputeTracker,
    ComputeActionManager,
  },
  data () {
    return {
      showActionEditor: false
    }
  },
  methods: {
    editNewAction() {
      this.$store.dispatch('editNewAction')
    }
  }
}
</script>

<template>
<div class="relative w-full min-w-[1024px] h-full grid grid-cols-2 gap-4">
  <div class="relative font-mono uppercase border">
    <h1 class="absolute bg-black z-10 w-96 top-0 left-0 p-4 px-8 border-b-2 border-r-2 text-3xl">
      The Treacherous Turn <span class="text-base">v0.2.4</span>
    </h1>
    <h3 class="absolute bg-black z-10 top-0 right-0 p-4 text-2xl">User ID: <span class="bg-white text-black">{{$store.state.sessionID}}</span></h3>
  
    <!-- <div class="absolute h-full w-full overflow-scroll"> -->
      <SimpleBar class="absolute h-full w-full overflow-scroll">
        <div class="h-16"></div>
        <ActionCard
          v-for="(action, key) in $store.state.actions"
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
        />
        <div class="h-24"></div>
      </SimpleBar>
    <!-- </div> -->
  
    <div class="absolute bg-black w-full bottom-0 left-0 p-4 pl-8 border-t-2">
      <button class=""
        type="button"
        @click="editNewAction"
      >
        >> New Action
      </button>
    </div>
  </div>
  <div class="relative font-mono uppercase border flex flex-col overflow-hidden">
    <div>
      <ComputeTracker />
      <Clock />
    </div>
    <div class="flex flex-col overflow-hidden p-8">
      <ComputeActionManager />
    </div>  
  </div>
</div>
<Teleport to="body">
  <ActionEditor />
</Teleport>
</template>

<style>
</style>
