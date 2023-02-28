<script>
import ClockCard from "./ClockCard.vue";
import ProcessClock from "./ProcessClock.vue";

export default {
  data() {
    return {
      isEditorOpen: false,
      numOfSegments: 4,
      tabState: "automatic",
    };
  },
  components: {
    ClockCard,
    ProcessClock,
  },
  methods: {
    openEditor() {
      this.isEditorOpen = true;
    },
    onClickModalOutside() {
      this.cancel();
    },
    cancel() {
      this.isEditorOpen = false;
    },
    increaseSegments() {
      this.numOfSegments++;
    },
    decreaseSegments() {
      if (this.numOfSegments > 0) this.numOfSegments--;
    },
    setTabState(state) {
      this.tabState = state;
    },
  },
};
</script>

<template>
  <div class="flex flex-col px-[40px] pt-[16px]">
    <div class="flex justify-center items-center space-x-8 self-end">
      <div
        class="border-[1px] border-grey uppercase text-[16px] py-[8px] px-[12px] cursor-pointer"
      >
        Roll all
      </div>
      <div
        class="border-[1px] border-grey uppercase text-[16px] py-[8px] px-[12px] cursor-pointer"
        @click="openEditor"
      >
        add clock
      </div>
      <div
        class="w-[30px] h-[31px] bg-[url('/setting.svg')] bg-cover bg-no-repeat cursor-pointer"
      ></div>
    </div>
    <div class="w-full mt-[24px]">
      <ClockCard />
    </div>
  </div>
  <label
    v-if="isEditorOpen"
    class="fixed w-[100%] h-[100vh] top-0 left-0 flex justify-center items-center cursor-pointer bg-white bg-opacity-50 z-50"
    @mousedown.self="onClickModalOutside"
  >
    <label
      class="w-[1325px] bg-black relative flex flex-col"
      @click="(e) => e.preventDefault()"
    >
      <div class="flex w-full justify-between items-center">
        <h3 class="text-lg font-bold uppercase text-[28px]">clock editor</h3>
        <button
          class="lowercase decoration-transparent m-2 mt-0 text-[30px]"
          @click="cancel"
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
          />
          <div class="flex w-full justify-between mt-[36px]">
            <div class="flex flex-col justify-center items-center">
              <span class="uppercase text-[20px] self-start">segments</span>
              <div class="flex items-center space-x-2 mt-[8px] mb-[24px]">
                <div
                  class="w-[18px] h-[9px] bg-[url('/arrow_down.svg')] bg-cover bg-no-repeat cursor-pointer"
                  @click="decreaseSegments"
                ></div>
                <input
                  class="w-16 h-8 text-center mt-1 border-1 border-grey bg-darkgray text-[26px]"
                  type="number"
                  v-model="numOfSegments"
                />
                <div
                  class="w-[18px] h-[8px] bg-[url('/arrow_up.svg')] bg-cover bg-no-repeat cursor-pointer"
                  @click="increaseSegments"
                ></div>
              </div>
              <ProcessClock
                :width="200"
                :height="200"
                :size="numOfSegments"
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
                      tabState === 'automatic' ? '#FFFFFF' : '#1D2225',
                    color: tabState === 'automatic' ? '#1D2225' : '#FFFFFF',
                  }"
                  @click="setTabState('automatic')"
                >
                  automatic
                </div>
                <div
                  class="uppercase text-[20px] py-[10px] px-[13px]"
                  :style="{
                    backgroundColor:
                      tabState === 'progress' ? '#FFFFFF' : '#1D2225',
                    color: tabState === 'progress' ? '#1D2225' : '#FFFFFF',
                  }"
                  @click="setTabState('progress')"
                >
                  progress check
                </div>
                <div
                  class="uppercase text-[20px] py-[10px] px-[13px]"
                  :style="{
                    backgroundColor:
                      tabState === 'manual' ? '#FFFFFF' : '#1D2225',
                    color: tabState === 'manual' ? '#1D2225' : '#FFFFFF',
                  }"
                  @click="setTabState('manual')"
                >
                  manual
                </div>
              </div>
              <div class="mt-[24px] w-full">
                <div v-if="tabState === 'automatic'">
                  <span class="text-[20px] text-grey"
                    >Ticks once every interval.</span
                  >
                </div>
                <div v-if="tabState === 'progress'" class="flex flex-col">
                  <div class="flex flex-col">
                    <span class="text-[20px] text-grey"
                      >PROGRESS CHECK NAME (optional)</span
                    >
                    <div class="flex items-center mb-4">
                      <select
                        class="bg-darkgray w-full text-[26px] text-white placeholder-white border-1 border-white p-[8px]"
                      >
                        <option
                          value=""
                          class="text-[26px] text-white"
                          disabled
                          selected
                          hidden
                        >
                          enter name
                        </option>
                        <option value="Name 1" class="text-[26px] text-white">
                          Name 1
                        </option>
                        <option value="Name 2" class="text-[26px] text-white">
                          Name 2
                        </option>
                        <option value="Name 3" class="text-[26px] text-white">
                          Name 3
                        </option>
                      </select>
                    </div>
                  </div>
                  <div class="flex w-full space-x-2">
                    <div class="flex flex-col w-1/2">
                      <span class="uppercase text-[20px] text-grey">die</span>
                      <div class="flex items-center mb-4">
                        <select
                          class="bg-darkgray w-full text-[26px] text-white placeholder-white border-1 border-white p-[8px]"
                        >
                          <option
                            value=""
                            class="text-[26px] text-white"
                            disabled
                            selected
                            hidden
                          >
                            D4
                          </option>
                          <option value="D2" class="text-[26px] text-white">
                            D2
                          </option>
                          <option value="D3" class="text-[26px] text-white">
                            D3
                          </option>
                          <option value="D4" class="text-[26px] text-white">
                            D4
                          </option>
                          <option value="D5" class="text-[26px] text-white">
                            D5
                          </option>
                          <option value="D6" class="text-[26px] text-white">
                            D6
                          </option>
                          <option value="D7" class="text-[26px] text-white">
                            D7
                          </option>
                          <option value="D8" class="text-[26px] text-white">
                            D8
                          </option>
                          <option value="D9" class="text-[26px] text-white">
                            D9
                          </option>
                          <option value="D10" class="text-[26px] text-white">
                            D10
                          </option>
                          <option value="D11" class="text-[26px] text-white">
                            D11
                          </option>
                          <option value="D12" class="text-[26px] text-white">
                            D12
                          </option>
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
                        >
                          <option
                            value=""
                            class="text-[26px] text-white"
                            disabled
                            selected
                            hidden
                          >
                            Agent
                          </option>
                          <option
                            value="Inanimate"
                            class="text-[26px] text-white"
                          >
                            Inanimate
                          </option>
                          <option value="Agent" class="text-[26px] text-white">
                            Agent
                          </option>
                        </select>
                      </div>
                    </div>
                  </div>
                </div>
                <div v-if="tabState === 'manual'">
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
            >
              delete
            </div>
            <div class="flex space-x-4">
              <div
                class="border-1 border-white bg-middlegrey text-white text-[20px] py-[12px] px-[26px] uppercase cursor-pointer"
              >
                cancel
              </div>
              <div
                class="border-1 border-white bg-white text-black text-[20px] py-[12px] px-[26px] uppercase cursor-pointer"
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
</template>
