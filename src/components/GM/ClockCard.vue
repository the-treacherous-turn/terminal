<script>
import ProcessClock from "./ProcessClock.vue";
export default {
  components: {
    ProcessClock,
  },
  props: {
    size: Number,
    elapsed: Number,
    mode: String,
    name: String,
    tickLog: Array,
    pc: String,
    clockID: String,
  },
  methods: {
  },
};
</script>

<template>
  <div class="flex">
    <ProcessClock :size="size" :elapsed="elapsed" :width="100" :height="100" />
    <div class="flex ml-[20px] w-full">
      <div class="flex flex-col w-full">
        <div class="flex justify-between items-center w-full">
          <span class="text-[20px] text-white uppercase">{{ name }}</span>
          <div class="flex justify-center items-center space-x-4">
            <div
              class="bg-[url('/edit.svg')] w-[24px] h-[23px] bg-cover cursor-pointer"
              @click="$emit('edit', this.clockID)"
            ></div>
            <div
              class="w-[18px] h-[9px] bg-[url('/arrow_down.svg')] bg-cover bg-no-repeat cursor-pointer"
            ></div>
            <div
              class="w-[18px] h-[8px] bg-[url('/arrow_up.svg')] bg-cover bg-no-repeat cursor-pointer"
            ></div>
          </div>
        </div>
        <div class="flex justify-between items-center mt-[19px]">
          <div class="flex items-center space-x-2">
            <div
              class="w-[18px] h-[9px] bg-[url('/arrow_down.svg')] bg-cover bg-no-repeat cursor-pointer"
              @click="$emit('decreaseElapsed')"
            ></div>

            <div class="border-[1px] border-grey px-4">
              <span class="text-[25px]">{{ elapsed }}</span>
              <span class="text-[12px]">{{ `/${size}` }}</span>
            </div>
            <div
              class="w-[18px] h-[8px] bg-[url('/arrow_up.svg')] bg-cover bg-no-repeat cursor-pointer"
              @click="$emit('increaseElapsed')"
            ></div>
          </div>
          <div v-if="mode=='pc'">
            <button
              class="border p-2 bg-gray-600"
              @click="$emit('roll')"
            >ROLL PC</button>
            <div>PC to roll: {{ $store.getters.amtPendingPCForClock(clockID) }}</div>
          </div>
          <span v-else class="flex text-[16px] text-white uppercase text-center"
            >{{ mode }}</span
          >
        </div>
      </div>
    </div>
  </div>
</template>
