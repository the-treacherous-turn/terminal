<script>
import {mapGetters, mapState} from 'vuex'
import Insights from './Insights.vue'
import Upgrades from './Upgrades.vue'

export default {
  components: {
    Insights,
    Upgrades,
  },
  computed: {
    ...mapState({
      activeSpecID: state => state.spec.activeSpecID,
    }),
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
    onClickDelete() {
      this.$store.dispatch('deleteSpec', this.activeSpecID)
      this.exitSpec()
    },
    renameSpec() {
      this.$store.dispatch('renameSpec', {id: this.activeSpecID, name: this.activeSpec.name})
    },
  }
}
</script>

<template>
  <div class="relative flex flex-col w-full h-full max-w-screen-lg mx-auto overflow-hidden border">
    <div class="flex justify-between p-4 border-b">
      <h1 class="flex items-center text-3xl cursor-pointer hover:inverted" @click="exitSpec">
        <font-awesome-icon icon="chevron-left" class="pl-2 pr-4 text-4xl" />
        <span class="">Specialisation</span>
      </h1>
      <div>
        <span>Player</span>
        <input
          type="text"
          class="mx-4 text-3xl border-1 input input-sm"
          :style="`width: ${activeSpec.name.length + 4}ch;`"
          v-model="activeSpec.name"
          @blur="renameSpec"
          />
        <span class="ml-4 cursor-pointer">
          <font-awesome-icon :icon="['fast', 'trash-can']" @click="onClickDelete" />
        </span>
      </div>
    </div>
    <div class="p-4 pt-8 overflow-y-scroll">
      <h2 class="inline-block px-2 mb-10 text-3xl font-bold capitalize text-primary" :class="`bg-${activeSpec.focus}`">{{ activeSpec.focus }}</h2>
      <Upgrades />
      <Insights />
    </div>
  </div>
</template>