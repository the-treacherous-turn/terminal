<script>
import NavBar from "./NavBar.vue";
import NPC from "./NPC.vue";
import Notes from "./Notes.vue";
import GMClock from "./GMClock.vue";
import DiceRoller from './DiceRoller.vue'

export default {
  data() {
    return {
      currentTab: "CLOCKS",
    };
  },
  components: {
    NavBar,
    NPC,
    Notes,
    GMClock,
    DiceRoller,
  },
};
</script>

<template>
  <div class="flex flex-col h-full bg-darkgray">
    <NavBar
      @changeTab="
        (payload) => {
          currentTab = payload;
        }
      "
    />
    <NPC v-if="currentTab === 'NPCs'" />
    <Notes v-if="currentTab === 'NOTES'" />
    <GMClock v-if="currentTab === 'CLOCKS'" />
    <DiceRoller v-if="currentTab === 'ROLL'" />
  </div>
</template>

<style></style>
