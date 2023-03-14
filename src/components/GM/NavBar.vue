<script>
export default {
  data() {
    return{
    clickedTab : 'NPCs'
  }},
  methods: {
    onclick(e){
      this.clickedTab = e.target.innerHTML
      this.$emit('changeTab', this.clickedTab);
    }
  },
}
</script>

<template>
<div class="flex justify-around border-b  border-b-white">
  <div class="cursor-pointer text-white text-[20px] leading-tight pt-[18px] pb-[16px]" :class="[clickedTab === 'CLOCKS' ? 'border-b border-b-white' : '']" @click="onclick">CLOCKS</div>
  <div class="cursor-pointer text-white text-[20px] leading-tight pt-[18px] pb-[16px]" :class="[clickedTab === 'NPCs' ? 'border-b border-b-white' : '']" @click="onclick">NPCs</div>
  <div class="cursor-pointer text-white text-[20px] leading-tight pt-[18px] pb-[16px]" :class="[clickedTab === 'ROLL' ? 'border-b border-b-white' : '']" @click="onclick">ROLL</div>
  <div class="cursor-pointer text-white text-[20px] leading-tight pt-[18px] pb-[16px]" :class="[clickedTab === 'NOTES' ? 'border-b border-b-white' : '']"  @click="onclick">NOTES</div>
</div>
</template>

<style>
</style>