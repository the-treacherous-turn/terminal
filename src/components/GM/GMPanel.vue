<script>
import ProcessClock from './ProcessClock.vue';
import NavBar from './NavBar.vue';
import NPC from './NPC.vue';

export default {
  components: {
    ProcessClock,
    NavBar,
    NPC,
  },
}
</script>

<template>
<div class="bg-darkgray h-full">
  <NavBar />
  <NPC />
  <!-- <h1>GM Tools</h1>
  <ProcessClock/> -->
</div>
</template>

<style>
</style>