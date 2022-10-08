<script>
import {mapGetters} from 'vuex'
import Insights from './Insights.vue'

export default {
  components: {
    Insights,
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
  <div>
    <button class="btn btn-xs my-4" @click="exitSpec">&lt; Select Spec</button>
    <h1 class="text-3xl font-bold pb-2">{{activeSpec.name}}</h1>
    <h2 class="text-2xl font-bold pb-2">Upgrades</h2>
    <ul>
      <li v-for="(upgrade, key) in activeSpec.upgrades" :key="key">
        <div class="tooltip tooltip-right" :data-tip="upgrade.description">
          <h3 class="text-xl font-bold badge capitalize">{{ upgrade.theory }} T{{ upgrade.tier }}: {{ upgrade.name }}</h3>
        </div>
      </li>
    </ul>
    <Insights />
  </div>
</template>