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
};
</script>

<template>
  <div class="w-full flex h-[600px]">
    <div class="w-2/3 pt-[48px] px-[46px] overflow-y-scroll">
      <!-- <pre class="text-green-500">{{ allPCsToRoll }}</pre> -->
      <!-- it should display all PCs to roll, sorted by the PC. -->
      <template v-for="(ppc, key, index) in allPendingPCs" :key="key">
        <hr v-if="index !== 0" class="my-6" />
        <div class="text-[20px]">{{ renderPPCTime(ppc.time) }}</div>
        <div class="flex items-center justify-between">
          <div class="font-bold text-[20px]">
            {{ pChecks[ppc.pc].name }} - {{ pChecks[ppc.pc].type }}
          </div>
          <div class="flex space-x-[24px]">
            <div
              class="flex bg-[url('/select_arrow_down.svg')] w-[58px] overflow-hidden bg-no-repeat bg-right"
            >
              <select
                v-model="pChecks[ppc.pc].die"
                @change="updatePCheckDieSize(ppc.pc, $event.target.value)"
                style="
                  appearance: none;
                  background: transparent;
                  size: 20px;
                  width: 58px;
                "
              >
                <option value="d2" class="text-[26px] bg-[#1D2225] text-white">
                  D2
                </option>
                <option value="d4" class="text-[26px] bg-[#1D2225] text-white">
                  D4
                </option>
                <option value="d6" class="text-[26px] bg-[#1D2225] text-white">
                  D6
                </option>
                <option value="d8" class="text-[26px] bg-[#1D2225] text-white">
                  D8
                </option>
                <option value="d10" class="text-[26px] bg-[#1D2225] text-white">
                  D10
                </option>
                <option value="d12" class="text-[26px] bg-[#1D2225] text-white">
                  D12
                </option>
              </select>
            </div>
            <button
              v-if="lastResults[key]"
              @click="rollDie(pChecks[ppc.pc].die, key)"
              class="w-24 px-0 py-4 text-3xl leading-3 text-center text-black bg-white"
            >{{ lastResults[key] }}</button>
            <button
              v-else
              @click="rollDie(pChecks[ppc.pc].die, key)"
              class="w-24 px-0 py-4 text-3xl leading-3 text-center text-black bg-white"
            >ROLL</button>

          </div>
        </div>
        <div
          v-for="(clock, clockID) in getClocksWithMatchingPCID(ppc.pc)"
          :key="clockID"
          class="flex w-full justify-between mt-[48px] items-center"
        >
          <div class="uppercase text-[20px]">{{ clock.name }}</div>
          <div class="uppercase">
            <span class="text-[32px] font-bold">{{ clock.elapsed }}</span>
            <span class="text-[20px]">/{{ clock.size }}</span>
          </div>
          <div class="flex">
            <button
              @click="recordTick(0, clockID, key)"
              class="border py-[16px] px-[24px] text-[20px] leading-[14px]"
              :class="{
                'bg-white text-darkgray': clockTickResult(clockID, key) === 0,
              }"
            >
              DON'T TICK
            </button>
            <button
              @click="recordTick(1, clockID, key)"
              class="border py-[16px] px-[24px] text-[20px] leading-[14px]"
              :class="{
                'bg-white text-darkgray': clockTickResult(clockID, key) > 0,
              }"
            >
              TICK
            </button>
          </div>
        </div>
      </template>
    </div>
  </div>
  <div class="w-1/3 px-4 overflow-y-scroll border">
    <div class="text-5xl">Roll Log</div>
    <ul>
      <li v-for="(roll, i) in rollLog" :key="i">{{ roll.die }}: {{ roll.result }}</li>
    </ul>
  </div>
</template>
