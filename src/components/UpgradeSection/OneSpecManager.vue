<script>
import {mapGetters, mapState} from 'vuex'

export default {
  computed: {
    ...mapState({
      specs: state => state.spec.specs,
    }),
    ...mapGetters({
      activeSpec: 'activeSpec',
    })
  },
  methods: {
    selectSpec(specID) {
      this.$store.commit('setActiveSpecID', specID)
    },
    exitSpec() {
      this.$store.commit('clearActiveSpecID')
    },
    addInsight() {
      // open modal to add insight
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
      
    <h2 class="text-2xl font-bold pb-2">Insights</h2>
    <ul>
      <!-- a list item for each insight -->
      <li v-for="(insight, key) in activeSpec.insights" :key="key">
        <h3 class="text-xl font-bold badge capitalize">{{ insight.range }} {{ insight.type }}: {{ insight.name }}</h3>
      </li>
      <button class="btn btn-secondary btn-xs mt-2" @click="addInsight">+ Add Insights</button>
    </ul>
  </div>
</template>