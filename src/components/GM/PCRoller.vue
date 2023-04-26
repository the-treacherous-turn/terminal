<script>
import { DateTime } from "luxon"
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
      clocks: (state) => state.gmCLOCK.clocks,
      pChecks: (state) => state.gmCLOCK.pChecks,
      pendingPCs: (state) => state.gmCLOCK.pendingPCs,
    }),
    allPCsToRoll() {
      // get the pcs with key that match the id in allPCID
      const arr = this.allPCID.map((id) => [id, this.pChecks[id]]);
      return Object.fromEntries(arr);
    },
    allPendingPCs() {
      // filter out the ones that don't match the id in allPCID
      // and then reconstruct the object
      return Object.fromEntries(
        Object.entries(this.pendingPCs).filter(
          ([_key, value]) => this.allPCID.includes(value.pc)
        )
      );
    },
  },
  methods: {
    updatePCheckDieSize(pcID, dieSize) {
      this.$store.dispatch("updateGMPCheck", {
        pcID,
        val: { die: dieSize },
      });
    },
    /**
     * 
     * @param {*} pcid 
     * @returns an object of clocks that match the pcid
     */
    getClocksWithMatchingPCID(pcid) {
      return {
        ...Object.fromEntries(
          Object.entries(this.clocks).filter(
            ([_clockID, clock]) => clock.pc === pcid && clock.elapsed < clock.size
          )
        ),
      };
    },
    renderPPCTime(time) {
      return DateTime.fromISO(time).toFormat('MM-dd HH:mm')
    },
    rollDie(die, ppcID) {
      ///// Roll Die
      // TODO improve the roll function
      // with true randomness
      const dieSize = die.slice(1)
      const result = Math.floor(Math.random() * dieSize) + 1
      this.rollLog.unshift({die, result})
      this.lastResults[ppcID] = result
      ///// automatically tick clocks
      this.autoTick(result, ppcID)
    },
    getClockTickResult(clockID, ppcID) {
      if (!this.ppcClockResult[ppcID]) return false
      return this.ppcClockResult[ppcID][clockID]
    },
    onClickAgentTick(clockID, ppcID) {
      const currentTick = this.getClockTickResult(clockID, ppcID)
      if (currentTick === 0) return this.recordTick(1, clockID, ppcID)
      if (currentTick === 1) return this.recordTick(2, clockID, ppcID)
      if (currentTick === 2) return this.recordTick(1, clockID, ppcID)
    },
    recordTick(num, clockID, ppcID) {
      if (!this.ppcClockResult[ppcID]) this.ppcClockResult[ppcID] = {}
      this.ppcClockResult[ppcID][clockID] = num
    },
    autoTick(dieResult, ppcID) {
      // see rulebook section "Process Clocks and Progress Checks"
      // the paragraph that starts with "To roll a progress check"
      const pcType = this.pChecks[this.pendingPCs[ppcID].pc].type
      let tickAmt = 0
      switch (pcType) {
        case 'inanimate':
          if(dieResult <= 2) tickAmt = 1
          break;
        case 'agent':
          if(dieResult == 2) tickAmt = 1
          if(dieResult <= 1) tickAmt = 2
          break;
        default:
          break;
      }
      // record tick for each clock that matches the ppc
      const clocks = this.getClocksWithMatchingPCID(this.pendingPCs[ppcID].pc)
      for (const clockID in clocks) {
        this.recordTick(tickAmt, clockID, ppcID)
      }
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
};
</script>

<template>
  <div class="w-full flex h-[600px]">
    <div class="w-2/3 pt-12 px-[46px] overflow-y-scroll">
      <!-- <pre class="text-green-500">{{ allPCsToRoll }}</pre> -->
      <!-- it should display all PCs to roll, sorted by the PC. -->
      <template v-for="(ppc, ppcID, index) in allPendingPCs" :key="ppcID">
        <hr v-if="index !== 0" class="my-6" />
        <div class="text-3xl">{{ renderPPCTime(ppc.time) }}</div>
        <div class="flex items-center justify-between">
          <div class="text-3xl font-bold">
            {{ pChecks[ppc.pc].name }} - {{ pChecks[ppc.pc].type }}
          </div>
          <div class="flex space-x-6">
            <div
              class="flex bg-[url('/select_arrow_down.svg')] w-[58px] overflow-hidden bg-no-repeat bg-right"
            >
              <select
                v-model="pChecks[ppc.pc].die"
                class="text-3xl text-white"
                @change="updatePCheckDieSize(ppc.pc, $event.target.value)"
                style="
                  appearance: none;
                  background: transparent;
                  size: 20px;
                  width: 58px;
                "
              >
                <option value="d2" class="bg-[#1D2225]">
                  D2
                </option>
                <option value="d4" class="bg-[#1D2225]">
                  D4
                </option>
                <option value="d6" class="bg-[#1D2225]">
                  D6
                </option>
                <option value="d8" class="bg-[#1D2225]">
                  D8
                </option>
                <option value="d10" class="bg-[#1D2225]">
                  D10
                </option>
                <option value="d12" class="bg-[#1D2225]">
                  D12
                </option>
              </select>
            </div>
            <button
              v-if="lastResults[ppcID]"
              @click="rollDie(pChecks[ppc.pc].die, ppcID)"
              class="w-24 px-0 py-4 text-3xl leading-3 text-center text-black bg-white"
            >{{ lastResults[ppcID] }}</button>
            <button
              v-else
              @click="rollDie(pChecks[ppc.pc].die, ppcID)"
              class="w-24 px-0 py-4 text-3xl leading-3 text-center text-black bg-white"
            >ROLL</button>

          </div>
        </div>
        <div
          v-for="(clock, clockID) in getClocksWithMatchingPCID(ppc.pc)"
          :key="clockID"
          class="flex items-center justify-between w-full mt-12"
        >
          <div class="text-3xl uppercase">{{ clock.name }}</div>
          <div class="text-white uppercase">
            <span class="text-6xl font-bold">{{ clock.elapsed }}</span>
            <span class="text-3xl">/{{ clock.size }}</span>
          </div>
          <div class="flex text-white">
            <button
              @click="recordTick(0, clockID, ppcID)"
              class="px-6 py-4 text-3xl leading-3 border border-white"
              :class="{
                'bg-white text-darkgray': getClockTickResult(clockID, ppcID) === 0,
              }"
            >
              DON'T TICK
            </button>
            <button
              v-if="pChecks[ppc.pc].type === 'inanimate'"
              @click="recordTick(1, clockID, ppcID)"
              class="border py-4 px-6 text-3xl leading-[14px]"
              :class="{
                'bg-white text-darkgray': getClockTickResult(clockID, ppcID) > 0,
              }"
            >
              TICK
            </button>
            <template v-if="pChecks[ppc.pc].type === 'agent'">
              <button
              @click="onClickAgentTick(clockID, ppcID)"
              class="border py-4 px-6 text-3xl leading-[14px]"
              :class="{
                'bg-white text-darkgray': getClockTickResult(clockID, ppcID) > 0,
              }"
            >
              {{ getClockTickResult(clockID, ppcID) === 2 ? 'TICK 2X' : 'TICK' }}
            </button></template>
          </div>
        </div>
      </template>
    </div>
  </div>
  <div class="w-1/3 px-4 h-[600px] overflow-y-scroll border-l">
    <div class="text-5xl">Roll Log</div>
    <ul>
      <li v-for="(roll, i) in rollLog" :key="i">{{ roll.die }}: {{ roll.result }}</li>
    </ul>
  </div>
</template>
