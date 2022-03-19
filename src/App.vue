<script>
import ActionEditor from './components/ActionEditor.vue'
import ActionCard from './components/ActionCard.vue'

export default {
  components: {
    ActionEditor,
    ActionCard,
  },
  data () {
    return {
      showActionEditor: false
    }
  },
  methods: {
    editNewAction() {
      this.$store.commit('editNewAction')
    }
  }
}
</script>

<template>
<div class="relative h-full font-mono uppercase border">
  <h1 class="absolute bg-black z-10 w-96 top-0 left-0 p-4 px-8 border-b-2 border-r-2 text-3xl">TTRPG Event Log</h1>

  <div class="absolute h-full w-full overflow-scroll">
    <div class="h-16"></div>
    <ActionCard
      v-for="(action, i) in $store.state.actions"
      :key="i"
      :actionID="i"
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
<Teleport to="body">
  <ActionEditor />
</Teleport>
</template>

<style>
</style>
