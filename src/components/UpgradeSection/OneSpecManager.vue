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
  <div class="relative h-full p-4 pb-[10vh]">
    <button class="btn btn-xs my-4" @click="exitSpec">&lt; Select Spec</button>
    <div>
      <h2 class="inline-block text-3xl capitalize font-bold px-2 mb-2 text-primary" :class="`bg-${activeSpec.focus}`">{{ activeSpec.focus }}</h2>
    </div>
    <p v-if="activeSpec.focus" class="pb-8 text-primary-content">Player: {{ activeSpec.name }}</p>
    <Upgrades />
    <Insights />
  </div>
</template>