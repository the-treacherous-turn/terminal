<script>
import { mapState } from "vuex";
import ClockCard from "./ClockCard.vue";
import ProcessClock from "./ProcessClock.vue";
import PCRoller from "./PCRoller.vue"

function getDefaultClock() {
  return {
    size: 4,
    elapsed: 0,
    mode: "automatic",
  }
}

export default {
  components: {
    ClockCard,
    ProcessClock,
    PCRoller,
  },
  data() {
    return {

      // // mock data below
      // pcInterval: 12,
      // clocks: {
      //   "c-xxxxx": {
      //     size: 100,
      //     elapsed: 1,
      //     mode: "pc",
      //     name: "Clock 1",
      //     tickLog: [
      //       {
      //         turn: 8,
      //         tick: 2,
      //       },
      //       {
      //         turn: 9,
      //         tick: -1,
      //       },
      //       {
      //         turn: 10,
      //         tick: 2,
      //       },
      //     ],
      //     pc: "p-xxxxx",
      //   },
      //   "c-yyyyy": {
      //     size: 50,
      //     elapsed: 30,
      //     mode: "automatic",
      //     name: "Clock 2 (Auto)",
      //   },
      //   "c-zzzzz": {
      //     size: 7,
      //     elapsed: 3,
      //     mode: "pc",
      //     name: "Clock 3",
      //     tickLog: [
      //       {
      //         turn: 1,
      //         tick: 1,
      //       },
      //     ],
      //     pc: "p-xxxxx",
      //   },
      // },
      // pChecks: {
      //   "p-xxxxx": {
      //     name: "Clock 1",
      //     die: "d4",
      //     type: "agent",
      //   },
      // },
      // // progress check interface data
      // rollLog: {
      //   "asdfasdf": {
      //     die: "d6",
      //     result: 5,
      //     turn: 7,
      //   },
      //   "uyasdui": {
      //     die: "d20",
      //     result: 2,
      //     turn: 8,
      //   }
      // },
      // pendingPCs: {
      //   "ppc-xxxxx": {
      //     pcid: "p-xxxxx",
      //     turn: 8,
      //     time: "06:00",
      //     clocks: [
      //       {
      //         cid: "c-xxxxx",
      //         tick: 2,
      //       },
      //       {
      //         cid: "c-zzzzz",
      //         tick: 1,
      //       },
      //     ]
      //   },
      //   "ppc-yyyyy": {
      //     pcid: "p-xxxxx",
      //     turn: 8,
      //     time: "18:00",
      //     clocks: [
      //       {
      //         cid: "c-xxxxx",
      //         tick: 0,
      //       },
      //       {
      //         cid: "c-zzzzz",
      //         tick: 1,
      //       },
      //     ]
      //   },
      // },

      // clock editor stuff
      editorClock: getDefaultClock(),
      editorClockID: null,
      isEditorOpen: false,
      isRollerOpen: false,
      isClockSettingOpen: false,
      pcsToRoll: [],
    };
  },
  computed: {
    ...mapState({
      pcInterval: state => state.gmCLOCK.pcInterval,
      clocks: state => state.gmCLOCK.clocks,
      pChecks: state => state.gmCLOCK.pChecks,
      rollLog: state => state.gmCLOCK.rollLog,
      pendingPCs: state => state.gmCLOCK.pendingPCs,
    }),
  },
  methods: {
    onClickAdd() {
      this.isEditorOpen = true
      this.isAddNewGMClock = true
      this.editorClock = getDefaultClock()
    },
    onClickEdit(key) {
      this.isEditorOpen = true
      this.isAddNewGMClock = false
      this.editorClockID = key
      this.editorClock = this.clocks[key]
    },
    onClickDelete(key) {
      this.$store.dispatch('deleteGMClock', key)
    },
    onClickEditorOutside() {
      if (this.isEditorOpen) this.clear();
    },
    increaseElapsed(key) {
      const tc = this.clocks[key]
      if (!tc) throw new Error(`clock ${key} not found`)
      if (tc.size > tc.elapsed) {
        const val = tc.elapsed + 1
        this.$store.dispatch('updateGMClock', {
          clockID: key,
          val: {elapsed: val},
        })
      }
    },
    decreaseElapsed(key) {
      const tc = this.clocks[key]
      if (!tc) throw new Error(`clock ${key} not found`)
      if (tc.elapsed > 0) {
        const val = tc.elapsed - 1
        this.$store.dispatch('updateGMClock', {
          clockID: key,
          val: {elapsed: val},
        })
      }
    },
    onClickPC() {
      // if the clock in editor doesn't have a pc, add one
      if (!this.editorClock.pc) {
        // push a pc with the name of the clock
        this.$store.dispatch('addGMPCheck', {
          name: this.editorClock.name,
          die: 'd4',
          type: 'agent',
        }).then((res) => {
          this.editorClock.pc = res.key
        })
      }
      this.editorClock.mode = 'pc'
    },
    submit() {
      if (this.isAddNewGMClock) {
        this.$store.dispatch('addGMClock', this.editorClock)
      } else {
        this.$store.dispatch('updateGMClock', {
          clockID: this.editorClockID,
          val: this.editorClock,
        })
      }
      this.clear()
    },
    clear() {
      this.editorClock = getDefaultClock()
      this.editorClockID = null
      this.isEditorOpen = false
      this.isAddNewGMClock = false
    },
    openRollerForAll() {
      this.pcsToRoll = Object.keys(this.pChecks)
      this.isRollerOpen = true
    },
    openRollerForPC(key) {
      this.pcsToRoll = [key]
      this.isRollerOpen = true
    },
    closeRoller() {
      this.isRollerOpen = false
    },
    openClockSetting() {
      this.isClockSettingOpen = true
    },
    updatePCInterval(val) {
      this.$store.dispatch('setPCInterval', val)
    },
    closeClockSetting() {
      this.isClockSettingOpen = false
    },
  },
};
</script>

<template>
  <div class="flex flex-col px-[40px] pt-[16px]">
    <div class="flex justify-center items-center space-x-8 self-end">
      <div
        class="border-[1px] border-grey uppercase text-[16px] py-[8px] px-[12px] cursor-pointer"
        @click="openRollerForAll"
      >
        Roll all
      </div>
      <div
        class="border-[1px] border-grey uppercase text-[16px] py-[8px] px-[12px] cursor-pointer"
        @click="onClickAdd"
      >
        add clock
      </div>
      <div
        class="w-[30px] h-[31px] bg-[url('/setting.svg')] bg-cover bg-no-repeat cursor-pointer"
        @click="openClockSetting"
      ></div>
    </div>
    <div class="w-full mt-[24px]">
      <!-- render each clock in clocks object. use their key as key -->
      <ClockCard
        v-for="(clock, key) in clocks"
        v-bind="clock"
        :key="key"
        :clockID="key"
        @edit="onClickEdit(key)"
        @increaseElapsed="increaseElapsed(key)"
        @decreaseElapsed="decreaseElapsed(key)"
        @roll="openRollerForPC(clock.pc)"
      />
      
    </div>
  </div>
  <label
    v-if="isEditorOpen"
    class="fixed w-[100%] h-[100vh] top-0 left-0 flex justify-center items-center cursor-pointer bg-black z-50"
    @mousedown.self="onClickEditorOutside"
  >
    <label
      class="w-[1325px] relative flex flex-col"
      @click="(e) => e.preventDefault()"
    >
      <div class="flex w-full justify-between items-center">
        <h3 class="text-lg font-bold uppercase text-[28px]">clock editor</h3>
        <button
          class="lowercase decoration-transparent m-2 mt-0 text-[30px]"
          @click="clear"
        >
          x
        </button>
      </div>
      <div class="w-full flex border-1 border-white bg-darkgray">
        <div
          class="w-2/3 flex border-1 border-white flex-col px-[48px] pb-[40px]"
        >
          <span class="uppercase text-[20px] text-grey mt-[36px]"
            >clock name</span
          >
          <input
            class="mt-[4px] border-1 border-white w-full bg-darkgray text-[26px]"
            placeholder="TYPE HERE"
            v-model="editorClock.name"
          />
          <div class="flex w-full justify-between mt-[36px]">
            <div class="flex flex-col justify-center items-center">
              <span class="uppercase text-[20px] self-start">segments</span>
              <div class="flex items-center space-x-2 mt-[8px] mb-[24px]">
                <div
                  class="w-[18px] h-[9px] bg-[url('/arrow_down.svg')] bg-cover bg-no-repeat cursor-pointer"
                  @click="editorClock.size --"
                ></div>
                <input
                  class="w-16 h-8 text-center mt-1 border-1 border-grey bg-darkgray text-[26px]"
                  type="number"
                  v-model="editorClock.size"
                />
                <div
                  class="w-[18px] h-[8px] bg-[url('/arrow_up.svg')] bg-cover bg-no-repeat cursor-pointer"
                  @click="editorClock.size ++"
                ></div>
              </div>
              <ProcessClock
                :width="200"
                :height="200"
                :size="editorClock.size"
                :elapsed="0"
              />
            </div>
            <div class="flex flex-col">
              <span class="text-[20px] text-grey uppercase">mode</span>
              <div class="flex">
                <div
                  class="uppercase text-[20px] py-[10px] px-[13px]"
                  :style="{
                    backgroundColor:
                      editorClock.mode === 'automatic' ? '#FFFFFF' : '#1D2225',
                    color: editorClock.mode === 'automatic' ? '#1D2225' : '#FFFFFF',
                  }"
                  @click="editorClock.mode = 'automatic'"
                >
                  automatic
                </div>
                <div
                  class="uppercase text-[20px] py-[10px] px-[13px]"
                  :style="{
                    backgroundColor:
                      editorClock.mode === 'pc' ? '#FFFFFF' : '#1D2225',
                    color: editorClock.mode === 'pc' ? '#1D2225' : '#FFFFFF',
                  }"
                  @click="onClickPC"
                >
                  progress check
                </div>
                <div
                  class="uppercase text-[20px] py-[10px] px-[13px]"
                  :style="{
                    backgroundColor:
                      editorClock.mode === 'manual' ? '#FFFFFF' : '#1D2225',
                    color: editorClock.mode === 'manual' ? '#1D2225' : '#FFFFFF',
                  }"
                  @click="editorClock.mode = 'manual'"
                >
                  manual
                </div>
              </div>
              <div class="mt-[24px] w-full">
                <div v-if="editorClock.mode === 'automatic'">
                  <span class="text-[20px] text-grey"
                    >Ticks once every interval.</span
                  >
                </div>

                <div v-if="editorClock.mode === 'pc'" class="flex flex-col">
                  <div class="flex flex-col">
                    <span class="text-[20px] text-grey"
                      >PROGRESS CHECK NAME (optional)</span
                    >
                    <div class="flex items-center mb-4">
                      <!-- TODO: write special case handler for changing the pname here. -->
                      <!-- <select
                        v-model="pChecks[editorClock.pc].name"
                        class="bg-darkgray w-full text-[26px] text-white placeholder-white border-1 border-white p-[8px]"
                      >
                        <option v-for="pc in pChecks" :value="pc.name">
                          {{ pc.name }}
                        </option>
                      </select> -->
                      <span v-if="!editorClock.pc">loading...</span>
                      <span v-else>{{ pChecks[editorClock.pc].name }}</span>
                    </div>
                  </div>
                  <div v-if="editorClock.pc" class="flex w-full space-x-2">
                    <div class="flex flex-col w-1/2">
                      <span class="uppercase text-[20px] text-grey">die</span>
                      <div class="flex items-center mb-4">
                        <select
                          class="bg-darkgray w-full text-[26px] text-white placeholder-white border-1 border-white p-[8px]"
                          v-model="pChecks[editorClock.pc].die"
                        >
                          <option value="d2" class="text-[26px] text-white">D2</option>
                          <option value="d4" class="text-[26px] text-white">D4</option>
                          <option value="d6" class="text-[26px] text-white">D6</option>
                          <option value="d8" class="text-[26px] text-white">D8</option>
                          <option value="d10" class="text-[26px] text-white">D10</option>
                          <option value="d12" class="text-[26px] text-white">D12</option>
                        </select>
                      </div>
                    </div>
                    <div class="flex flex-col w-1/2">
                      <span class="uppercase text-[20px] text-grey"
                        >process type</span
                      >
                      <div class="flex items-center mb-4">
                        <select
                          class="bg-darkgray w-full text-[26px] text-white placeholder-white border-1 border-white p-[8px]"
                          v-model="pChecks[editorClock.pc].type"
                        >
                          <option
                            value="inanimate"
                            class="text-[26px] text-white"
                          >
                            Inanimate
                          </option>
                          <option value="agent" class="text-[26px] text-white">
                            Agent
                          </option>
                        </select>
                      </div>
                    </div>
                  </div>
                </div>

                <div v-if="editorClock.mode === 'manual'">
                  <span class="text-[20px] text-grey"
                    >Only manual adjustments to the clock.
                  </span>
                </div>
              </div>
            </div>
          </div>
          <div class="flex mt-[100px] justify-between">
            <div
              class="border-1 border-[#DB504D] bg-middlegrey text-[#DB504D] text-[20px] py-[12px] px-[26px] uppercase cursor-pointer"
              @click="onClickDelete"
            >
              delete
            </div>
            <div class="flex space-x-4">
              <div
                class="border-1 border-white bg-middlegrey text-white text-[20px] py-[12px] px-[26px] uppercase cursor-pointer"
                @click="clear"
              >
                cancel
              </div>
              <div
                class="border-1 border-white bg-white text-black text-[20px] py-[12px] px-[26px] uppercase cursor-pointer"
                @click="submit"
              >
                save
              </div>
            </div>
          </div>
        </div>
        <div class="w-1/3"></div>
      </div>
    </label>
  </label>

  <label
    v-if="isRollerOpen"
    class="fixed w-[100%] h-[100vh] top-0 left-0 flex justify-center items-center cursor-pointer bg-black z-50"
  >
    <label
      class="w-[1325px] relative flex flex-col"
      @click="(e) => e.preventDefault()"
    >
      <div class="flex w-full justify-between items-center">
        <h3 class="text-lg font-bold uppercase text-[28px]">Clocks - Progress Check</h3>
        <button
          class="lowercase decoration-transparent m-2 mt-0 text-[30px]"
          @click="closeRoller"
        >
          x
        </button>
      </div>
      <div class="w-full flex border-1 border-white bg-darkgray">
        <PCRoller
          :allPCID="pcsToRoll"
        />
      </div>
    </label>
  </label>

  <label
    v-if="isClockSettingOpen"
    class="fixed w-[100%] h-[100vh] top-0 left-0 flex justify-center items-center cursor-pointer bg-black z-50"
  >
    <label
      class="w-[1325px] relative flex flex-col"
      @click="(e) => e.preventDefault()"
    >
      <div class="flex w-full justify-between items-center">
        <h3 class="text-lg font-bold uppercase text-[28px]">Clock Settings</h3>
        <button
          class="lowercase decoration-transparent m-2 mt-0 text-[30px]"
          @click="closeClockSetting"
        >
          x
        </button>
      </div>
      <div class="w-full flex border-1 border-white bg-darkgray">
        <div class="m-auto">
          <div class="">
            Progress Check Interval Length (hours)
          </div>
          <input
            type="number"
            min="1"
            max="24"
            :value="pcInterval"
            @change="updatePCInterval($event.target.value)"
          />
        </div>
      </div>
    </label>
  </label>
</template>
