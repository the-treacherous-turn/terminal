<template>
  <component :is="currentComponent" />
</template>

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
    currentComponent() {
      return this.activeSpecID ? "OneSpecManager" : "ChooseSpec";
    },
  },
};
</script>
