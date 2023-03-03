<script>
import { mapState } from "vuex";
import ChooseSpec from "./ChooseSpec.vue";
import OneSpecManager from "./OneSpecManager.vue";

export default {
  name: "UpgradeSection",
  components: {
    ChooseSpec,
    OneSpecManager,
  },
  computed: {
    ...mapState({
      activeSpecID: (state) => state.spec.activeSpecID,
    }),
  },
  watch: {
    activeSpecID() {},
  },
};
</script>

<template>
  <div>
    <ChooseSpec v-if="!activeSpecID" />
    <OneSpecManager v-else />
  </div>
</template>
