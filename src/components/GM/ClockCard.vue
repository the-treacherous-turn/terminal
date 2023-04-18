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
  <div class="flex px-10 py-4">
    <ProcessClock :size="size" :elapsed="elapsed < size ? elapsed : size" :width="100" :height="100" />
    <div class="flex ml-[20px] w-full">
      <div class="flex flex-col w-full">
        <div class="flex items-center justify-between w-full">
          <span class="text-[20px] text-white uppercase">{{ name }}</span>
          <div class="flex items-center justify-center space-x-4">
            <div
              class="bg-[url('/edit.svg')] w-6 h-[23px] bg-cover cursor-pointer"
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
              <span class="text-[25px]">{{ elapsed < size ? elapsed : size }}</span>
              <span class="text-[12px]">{{ `/${size}` }}</span>
            </div>
            <div
              class="w-[18px] h-[8px] bg-[url('/arrow_up.svg')] bg-cover bg-no-repeat cursor-pointer"
              @click="$emit('increaseElapsed')"
            ></div>
          </div>
          <div v-if="mode=='pc'">
            <button
              class="relative p-2 bg-gray-600 border"
              @click="$emit('roll')"
            >
              ROLL PC
              <div class="notification" v-if="$store.getters.amtPendingPCForClock(clockID) > 0">{{ $store.getters.amtPendingPCForClock(clockID) }}</div>
            </button>
          </div>
          <span v-else class="flex text-2xl text-center text-white uppercase"
            >{{ mode }}</span
          >
        </div>
      </div>
    </div>
  </div>
</template>
