<script>
import NavBar from "./NavBar.vue";
import NPC from "./NPC.vue";
import Notes from "./Notes.vue";
import GMClock from "./GMClock.vue";

export default {
  data() {
    return {
      currentTab: "NPCs",
    };
  },
  components: {
    NavBar,
    NPC,
    Notes,
    GMClock,
  },
};
</script>

<template>
  <div class="h-full bg-darkgray">
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
  </div>
</template>

<style></style>
