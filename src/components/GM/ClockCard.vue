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
    pcDie: String,
    clockID: String,
  },
  methods: {
  },
};
</script>

<template>
  <div class="flex py-4 pl-10 pr-7">
    <ProcessClock :size="size" :elapsed="elapsed < size ? elapsed : size" :width="100" :height="100" />
    <div class="flex w-full ml-5">
      <div class="flex flex-col w-full">
        <div class="flex items-center justify-between w-full">
          <span class="text-3xl text-white uppercase">{{ name }}</span>
          <div class="flex items-center justify-center space-x-4">
            <div
              class="bg-[url('/edit.svg')] w-6 h-[23px] bg-cover cursor-pointer"
              @click="$emit('edit', this.clockID)"
            ></div>
            <div
              class="w-[18px] h-[9px] bg-[url('/arrow_down.svg')] bg-cover bg-no-repeat cursor-pointer"
            ></div>
            <div
              class="w-[18px] h-2 bg-[url('/arrow_up.svg')] bg-cover bg-no-repeat cursor-pointer"
            ></div>
          </div>
        </div>
        <div class="flex justify-between items-center mt-[19px]">
          <div class="flex items-center space-x-2">
            <div
              class="w-[18px] h-[9px] bg-[url('/arrow_down.svg')] bg-cover bg-no-repeat cursor-pointer"
              @click="$emit('decreaseElapsed')"
            ></div>

            <div class="px-2 border-1 border-grey">
              <span class="text-5xl leading-8">{{ elapsed < size ? elapsed : size }}</span>
              <span class="text-lg">{{ `/${size}` }}</span>
            </div>
            <div
              class="w-[18px] h-2 bg-[url('/arrow_up.svg')] bg-cover bg-no-repeat cursor-pointer"
              @click="$emit('increaseElapsed')"
            ></div>
          </div>
          <div v-if="mode=='pc'">
            <button
              class="relative w-16 p-2 ml-4 capitalize bg-gray-600 border"
              @click="$emit('roll')"
            >
              {{ pcDie }}
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
