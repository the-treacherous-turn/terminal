<script>
import ProcessClock from './ProcessClock.vue';
import NavBar from './NavBar.vue';
import NPC from './NPC.vue';
import Notes from './Notes.vue'

export default {
    data() {
        return{
            currentTab: "NPCs"
        }
    },
  components: {
    ProcessClock,
    NavBar,
    NPC,
    Notes
  },
}
</script>

<template>
<div class="bg-darkgray h-full">
    <NavBar  @changeTab="(payload) => {
          currentTab = payload;
        }"/>
    <NPC v-if="currentTab==='NPCs'"/>
    <Notes v-if="currentTab==='NOTES'"/>
  <!-- <h1>GM Tools</h1>
  <ProcessClock/> -->
</div>
</template>

<style>
</style>