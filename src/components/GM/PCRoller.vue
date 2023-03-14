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
      ppcClockResult: {},
      // ppc -> pc, pc -> multiple clocks maybe.
      // so when ppc has a result, we check if the clocks it's associated with
      // want to be ticked.
      /*
      ppcClockResult: {
        ppcid_iasijijasdf: {
          clockid_oijaoisjdf : 0,
          clockid_ijicawef: 1,
        }
      }
      */
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
    clockTickResult(clockID, ppcID) {
      if (!this.ppcClockResult[ppcID]) return false
      return this.ppcClockResult[ppcID][clockID]
    },
    recordTick(num, clockID, ppcID) {
      if (!this.ppcClockResult[ppcID]) this.ppcClockResult[ppcID] = {}
      this.ppcClockResult[ppcID][clockID] = num
    },
    
    submit() {
      // For each pending pc in ppcClockResult,
      // we should find their pc, find the clock for them, and 
      // calculate how many ticks those should get,
      // and add that to the elapsed time,
      // and then update the clock with the new elapsed,
      // and then delete the pending pc.
      Object.entries(this.ppcClockResult).forEach(([ppcID, clocks]) => {
        Object.entries(clocks).forEach(([clockID, ticks]) => {
          const currentClock = this.clocks[clockID];
          const newElapsed = currentClock.elapsed + ticks;
          this.$store.dispatch('updateGMClock', {
            clockID: clockID,
            val: {
              elapsed: newElapsed,
            },
          });
        });
        this.$store.dispatch('deletePendingPC', ppcID);
      });
      // Reset ppcClockResult
      this.ppcClockResult = {};
      // Reset lastResults
      this.lastResults = {};
    },
  },
}
</script>

<template>
  <div class="flex w-full max-h-[90vh]">
    <div class="w-2/3 overflow-y-scroll">
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
      <div v-for="(clock, clockID) in getClocksWithMatchingPCID(ppc.pc)" :key="clockID">
        <div>{{ clock.name }}</div>
        <div>{{ clock.elapsed }}/{{ clock.size }}</div>
        <div>
          <button @click="recordTick(0, clockID, key)" class="border" :class="{ 'bg-white text-darkgray': clockTickResult(clockID, key) === 0 }">DON'T TICK</button>
          <button @click="recordTick(1, clockID, key)" class="border" :class="{ 'bg-white text-darkgray': clockTickResult(clockID, key) > 0 }">TICK</button>
        </div>
      </div>
    </template>
  </div>
  <div class="w-1/3 overflow-y-scroll border">
    <div class="text-4xl">Roll Log</div>
    <ul>
      <li v-for="(roll, i) in rollLog" :key="i">{{ roll.die }}: {{ roll.result }}</li>
    </ul>
  </div>
</div>
</template>