<script>
import { mapState } from "vuex";

export default {
  props: {
    allPCID: Array,
  },
  data() {
    return {
      rollLog: [], // die size and result
    };
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
        Object.entries(this.pendingPCs).filter(([key, value]) =>
          this.allPCID.includes(value.pcid)
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
    getClocksWithMatchingPCID(pcID) {
      return {
        ...Object.fromEntries(
          Object.entries(this.clocks).filter(
            ([key, value]) => value.pc === pcID
          )
        ),
      };
    },
    roll(die) {
      // TODO improve the roll function
      // with true randomness
      const dieSize = die.slice(1);
      const result = Math.floor(Math.random() * dieSize) + 1;
      this.rollLog.unshift({ die, result });
    },
  },
};
</script>

<template>
  <div class="w-full flex h-[600px]">
    <div class="w-2/3 pt-[48px] px-[46px] overflow-y-scroll">
      <!-- <pre class="text-green-500">{{ allPCsToRoll }}</pre> -->
      <!-- it should display all PCs to roll, sorted by the PC. -->
      <template v-for="(ppc, key) in allPendingPCs" :key="key">
        <div class="text-[20px]">{{ ppc.time }}</div>
        <div class="flex justify-between items-center">
          <div class="font-bold text-[20px]">
            {{ pChecks[ppc.pcid].name }} - {{ pChecks[ppc.pcid].type }}
          </div>
          <div class="flex space-x-[24px]">
            <div
              class="flex bg-[url('/select_arrow_down.svg')] w-[58px] overflow-hidden bg-no-repeat bg-right"
            >
              <select
                v-model="pChecks[ppc.pcid].die"
                @change="updatePCheckDieSize(ppc.pcid, $event.target.value)"
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
                <option value="d3" class="text-[26px] bg-[#1D2225] text-white">
                  D3
                </option>
                <option value="d4" class="text-[26px] bg-[#1D2225] text-white">
                  D4
                </option>
                <option value="d5" class="text-[26px] bg-[#1D2225] text-white">
                  D5
                </option>
                <option value="d6" class="text-[26px] bg-[#1D2225] text-white">
                  D6
                </option>
                <option value="d7" class="text-[26px] bg-[#1D2225] text-white">
                  D7
                </option>
                <option value="d8" class="text-[26px] bg-[#1D2225] text-white">
                  D8
                </option>
                <option value="d9" class="text-[26px] bg-[#1D2225] text-white">
                  D9
                </option>
                <option value="d10" class="text-[26px] bg-[#1D2225] text-white">
                  D10
                </option>
                <option value="d11" class="text-[26px] bg-[#1D2225] text-white">
                  D11
                </option>
                <option value="d12" class="text-[26px] bg-[#1D2225] text-white">
                  D12
                </option>
              </select>
            </div>
            <button
              @click="roll(pChecks[ppc.pcid].die)"
              class="py-[16px] px-[38px] bg-white text-center text-[20px] leading-[14px] text-black"
            >
              ROLL
            </button>
          </div>
        </div>
        <div
          v-for="(clock, key) in getClocksWithMatchingPCID(ppc.pcid)"
          :key="key"
          class="flex w-full justify-between mt-[48px] items-center"
        >
          <div class="uppercase text-[20px]">{{ clock.name }}</div>
          <div class="uppercase">
            <span class="text-[32px] font-bold">{{ clock.elapsed }}</span>
            <span class="text-[20px]">/{{ clock.size }}</span>
          </div>
          <div class="flex">
            <button
              class="border py-[16px] px-[24px] text-[20px] leading-[14px]"
            >
              DON'T TICK
            </button>
            <button
              class="border py-[16px] px-[24px] text-[20px] leading-[14px]"
            >
              TICK
            </button>
          </div>
        </div>
      </template>
    </div>
    <div class="border w-1/3 px-[16px]">
      <div class="text-5xl">Roll Log</div>
      <ul>
        <li v-for="(roll, i) in rollLog" :key="i" class="text-[20px]">
          {{ roll.die }}: {{ roll.result }}
        </li>
      </ul>
    </div>
  </div>
</template>
