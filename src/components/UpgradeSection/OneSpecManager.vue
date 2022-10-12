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
    }),
    // HACK this is to make sure Tailwind can read full class names and thus output their CSS
    theoryStyle() {
      const textBorderStyleMap = {
        epistemic: 'text-epistemic border-epistemic',
        constellation: 'text-constellation border-constellation',
        chaos: 'text-chaos border-chaos',
        agentic: 'text-agentic border-agentic',
        anthropic: 'text-anthropic border-anthropic',
        physical: 'text-physical border-physical',
        digital: 'text-digital border-digital',
        autonomic: 'text-autonomic border-autonomic',
      }
      return textBorderStyleMap[this.activeSpec.focus]
    },
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
    <div class="badge badge-outline" :class="theoryStyle">{{activeSpec.focus}}</div>
    <Upgrades />
    <Insights />
  </div>
</template>