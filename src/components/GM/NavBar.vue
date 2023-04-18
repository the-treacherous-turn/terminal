<script>
export default {
  data() {
    return{
    clickedTab : 'CLOCKS'
  }},
  methods: {
    switchTab(tab){
      this.clickedTab = tab
      this.$emit('changeTab', tab);
    }
  },
}
</script>

<template>
<div class="flex justify-around border-b border-b-white">
  <div
    class="relative flex items-center cursor-pointer text-white text-3xl leading-tight pt-[18px] pb-4"
    :class="[clickedTab === 'CLOCKS' ? 'border-b border-b-white' : '']"
    @click="switchTab('CLOCKS')"
    >CLOCKS<div
      class="inline-flex items-center justify-center w-4 h-4 ml-2 text-2xl text-center rounded-full bg-accent text-neutral"
      v-if="Object.entries($store.state.gmCLOCK.pendingPCs).length"
      >!</div>
  </div>
  <div class="cursor-pointer text-white text-3xl leading-tight pt-[18px] pb-4" :class="[clickedTab === 'NPCs' ? 'border-b border-b-white' : '']" @click="switchTab('NPCs')">NPCs</div>
  <div class="cursor-pointer text-white text-3xl leading-tight pt-[18px] pb-4" :class="[clickedTab === 'ROLL' ? 'border-b border-b-white' : '']" @click="switchTab('ROLL')">ROLL</div>
  <div class="cursor-pointer text-white text-3xl leading-tight pt-[18px] pb-4" :class="[clickedTab === 'NOTES' ? 'border-b border-b-white' : '']"  @click="switchTab('NOTES')">NOTES</div>
</div>
</template>

<style>
</style>