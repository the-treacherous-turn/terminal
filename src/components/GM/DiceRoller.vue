<template>
  <div class="relative flex overflow-y-scroll grow">
    <div class="flex flex-col w-full">
      <!-- Roll Log title and ROLL ALL button -->
      <div class="flex justify-between p-4">
        <div class="text-3xl">Roll Log</div>
        <div class="btn-sm btn" @click="rollAll">ROLL ALL</div>
      </div>

      <!-- Roll results columns -->
      <div class="flex justify-between px-4 overflow-y-scroll grow" ref="resultContainer">
        <div v-for="index in 3" :key="index" class="flex flex-col items-center">
          <div class="w-20 text-2xl">
            <transition-group name="roll-result" tag="div">
              <div v-for="(result, resultIndex) in rollResults[index - 1]" :key="result[2]" class="pl-4">
                <span class="inline-block w-10">
                  D{{ result[0] }}:
                </span>
                <span class="" :class="{ 'bg-white text-black ': (result[1] === 1 || result[1] === 12) && result[0] === 12 }">
                  {{ result[1] }}</span>
              </div>
            </transition-group>
          </div>
        </div>
      </div>

      <!-- Roll value select and roll button sets -->
      <div class="p-4 border-t">
        <div class="flex justify-between">
          <div v-for="index in 3" :key="index" class="flex flex-col items-center">
            <select v-model="diceValues[index - 1]" class="pr-6 mb-2 font-normal select select-ghost">
              <option v-for="dice in [2, 4, 6, 8, 10, 12]" :key="dice" :value="dice">D{{ dice }}</option>
            </select>
            <button @click="rollDice(index - 1)" class="w-24 text-2xl btn-sm btn btn-inverted">ROLL</button>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      diceValues: [6, 6, 6], // Default dice values (d6)
      rollResults: [[], [], []] // Arrays to store roll results for each dice
    }
  },
  methods: {
    rollDice(index) {
      const size = this.diceValues[index];
      const roll = Math.floor(Math.random() * size) + 1;
      this.rollResults[index].unshift([size, roll, Date.now()]); // Date.now() is used as a unique key for the transition-group
      this.$nextTick(() => {
        this.$refs.resultContainer.scrollTop = 0;
      });

    },
    rollAll() {
      for (let i = 0; i < 3; i++) {
        this.rollDice(i);
      }
    }
  }
}
</script>

<style>
.roll-result-enter-active,
.roll-result-leave-active {
  transition: opacity 0.5s;
}
.roll-result-enter,
.roll-result-leave-to {
  opacity: 0;
}
.roll-result-enter-active {
  animation-name: flash;
  animation-duration: 0.5s;
  animation-fill-mode: both;
}
@keyframes flash {
  0% {
    @apply bg-white text-black;
  }
  100% {
    @apply bg-inherit text-inherit;
  }
}


</style>