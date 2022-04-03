<script>
import ActionEditor from './components/ActionEditor.vue'
import ActionCard from './components/ActionCard.vue'
import Clock from './components/Clock.vue'

export default {
  components: {
    ActionEditor,
    ActionCard,
    Clock,
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
<div class="relative w-full h-full columns-2">
  <div class="relative h-full font-mono uppercase border">
    <h1 class="absolute bg-black z-10 w-96 top-0 left-0 p-4 px-8 border-b-2 border-r-2 text-3xl">
      TTRPG Event Log <span class="text-base">v0.1.0</span>
      <!-- <h3 class="text-lg mt-2">Session: <span class="bg-white text-black">{{$store.state.sessionID}}</span></h3> -->
    </h1>
    <h3 class="absolute bg-black z-10 top-0 right-0 p-4 text-2xl">User ID: <span class="bg-white text-black">{{$store.state.sessionID}}</span></h3>
  
    <div class="absolute h-full w-full overflow-scroll">
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
    </div>
  
    <div class="absolute bg-black w-full bottom-0 left-0 p-4 pl-8 border-t-2">
      <button class=""
        type="button"
        @click="editNewAction"
      >
        >> New Action
      </button>
    </div>
  </div>
  <div class="relative h-full font-mono uppercase border">
    <Clock />
  </div>
</div>
<Teleport to="body">
  <ActionEditor />
</Teleport>
</template>

<style>
</style>
