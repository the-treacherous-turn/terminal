<script>
import {mapGetters} from 'vuex'
import Insights from './Insights.vue'
import Upgrades from './Upgrades.vue'

export default {
  components: {
    Insights,
    Upgrades,
  },
  computed: {
    ...mapGetters({
      activeSpec: 'activeSpec',
    })
  },
  methods: {
    exitSpec() {
      this.$store.commit('clearActiveSpecID')
    },
  }
}
</script>

<template>
  <div class="relative h-4/5 pb-1/10">
    <button class="btn btn-xs my-4" @click="exitSpec">&lt; Select Spec</button>
    <h1 class="text-3xl font-bold pb-2">{{activeSpec.name}}</h1>
    <Upgrades />
    <Insights />
  </div>
</template>