<script>
import {mapGetters, mapState} from 'vuex'

export default {
  data() {
    return {
      // TODO any temporary variables to track here?
    }
  },
  computed: {
    ...mapState({
      specs: state => state.spec.specs,
      activeSpecID: state => state.spec.activeSpecID,
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
  }
}
</script>

<template>
  <div>

    <div v-if="!activeSpecID">
      <h1 class="text-3xl font-bold pb-2">Specializations</h1>
      <ul>
        <!-- render each spec as a list item, and display name, focus, and number of upgrades and insights -->
        <li class="card max-w-sm m-4 p-4 shadow-xl bg-secondary" v-for="(spec, key) in specs" :key="key">
          <h2 class="text-xl font-bold">{{ spec.name }}</h2>
          <p>Focus: {{ spec.focus }}</p>
          <p>Upgrades: {{ Object.keys(spec.upgrades).length }}</p>
          <p>Insights: {{ Object.keys(spec.insights).length }}</p>
          <button class="btn mt-4" @click="selectSpec(key)">Enter</button>
        </li>
      </ul>
    </div>
    
    <div v-else>
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
      </ul>
    </div>

  </div>
</template>