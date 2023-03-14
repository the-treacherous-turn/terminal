<script>
import { mapState } from "vuex"

export default {
  props: {
    allPCID: Array,
  },
  data() {
    return {
      rollLog: [], // die size and result
      lastResults: {}, // last roll result for each ppc
    }
  },
  computed: {
    ...mapState({
      clocks: state => state.gmCLOCK.clocks,
      pChecks: state => state.gmCLOCK.pChecks,
      pendingPCs: state => state.gmCLOCK.pendingPCs,
    }),
    allPCsToRoll() {
      // get the pcs with key that match the id in allPCID
      const arr = this.allPCID.map(id => [id, this.pChecks[id]])
      return Object.fromEntries(arr)
    },
    allPendingPCs() {
      // filter out the ones that don't match the id in allPCID
      // and then reconstruct the object
      return Object.fromEntries(
        Object.entries(this.pendingPCs).filter(
          ([_key, value]) => this.allPCID.includes(value.pc)
        )
      )
    },
  },
  methods: {
    updatePCheckDieSize(pcid, dieSize) {
      this.$store.dispatch('updateGMPCheck', {
        pcid,
        val: {die: dieSize},
      })
    },
    getClocksWithMatchingPCID(pcid) {
      return {
        ...Object.fromEntries(
          Object.entries(this.clocks).filter(
            ([key, value]) => value.pc === pcid
          )
        ),}
    },
    rollDie(die, key) {
      // TODO improve the roll function
      // with true randomness
      const dieSize = die.slice(1)
      const result = Math.floor(Math.random() * dieSize) + 1
      this.rollLog.unshift({die, result})
      this.lastResults[key] = result
    },
    close() {
      this.lastResults = {}
      // TODO update results
    },
  },
}
</script>

<template>
  <div class="flex w-full">
    <div class="w-2/3">
    <!-- <pre class="text-green-500">{{ allPendingPCs }}</pre> -->
    <!-- it should display all PCs to roll, sorted by the PC. -->
    <template v-for="(ppc, key) in allPendingPCs" :key="key">
      <div>{{ ppc.time }}</div>
      <div class="flex justify-between">
        <div>{{ pChecks[ppc.pc].name }} - {{ pChecks[ppc.pc].type }}</div>
        <div>
          <select v-model="pChecks[ppc.pc].die" @change="updatePCheckDieSize(ppc.pc, $event.target.value)">
            <option value="d2" class="text-[26px] text-white">D2</option>
            <option value="d4" class="text-[26px] text-white">D4</option>
            <option value="d6" class="text-[26px] text-white">D6</option>
            <option value="d8" class="text-[26px] text-white">D8</option>
            <option value="d10" class="text-[26px] text-white">D10</option>
            <option value="d12" class="text-[26px] text-white">D12</option>
          </select>
          <button v-if="lastResults[key]" @click="rollDie(pChecks[ppc.pc].die, key)">{{ lastResults[key] }}</button>
          <button v-else @click="rollDie(pChecks[ppc.pc].die, key)">Roll</button>
        </div>
      </div>
      <div v-for="(clock, key) in getClocksWithMatchingPCID(ppc.pc)" :key="key">
        <div>{{ clock.name }}</div>
        <div>{{ clock.elapsed }}/{{ clock.size }}</div>
        <div>
          <button class="border">DON'T TICK</button>
          <button class="border">TICK</button>
        </div>
      </div>
    </template>
  </div>
  <div class="w-1/3 border">
    <div class="text-4xl">Roll Log</div>
    <ul>
      <li v-for="(roll, i) in rollLog" :key="i">{{ roll.die }}: {{ roll.result }}</li>
    </ul>
  </div>
</div>
</template>