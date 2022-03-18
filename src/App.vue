<script>
import HelloWorld from './components/HelloWorld.vue'
import ActionEditor from './components/ActionEditor.vue'
import ActionCard from './components/ActionCard.vue'

export default {
  components: {
    HelloWorld,
    ActionEditor,
    ActionCard,
  },
  data () {
    return {
      showActionEditor: false
    }
  }
}
</script>

<template>
<div class="relative h-full font-mono uppercase border">
  <!-- <HelloWorld msg="TTRPG Event Log" /> -->
  <h1 class="absolute bg-black z-10 w-96 top-0 left-0 p-4 px-8 border-b-2 border-r-2 text-3xl">TTRPG Event Log</h1>

  <div class="absolute h-full w-full overflow-scroll">
    <div class="h-16"></div>
    <ActionCard
      v-for="(action, i) in $store.state.actions"
      :key="i"
      :name="action.name"
      :description="action.description"
    />
    <div class="h-16"></div>
  </div>

  <div class="absolute bg-black w-full bottom-0 left-0 p-4 pl-8 border-t-2">
    <button class=""
      type="button"
      @click="showActionEditor=true"
    >
      >> New Action
    </button>
  </div>
</div>
<Teleport to="body">
  <ActionEditor :show="showActionEditor" @close="showActionEditor=false" />
</Teleport>
</template>

<style>
</style>
