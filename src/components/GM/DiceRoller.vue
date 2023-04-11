<template>
  <div class="relative flex overflow-y-scroll grow">
    <div class="flex flex-col w-full">
      <!-- Roll Log title and ROLL ALL button -->
      <div class="flex justify-between p-4">
        <div class="text-3xl">Roll Log</div>
        <div class="btn-sm btn" @click="rollAll">ROLL ALL</div>
      </div>
      
      <!-- Roll results columns -->
      <div class="flex justify-between px-4 overflow-y-scroll grow">
        <div v-for="index in 3" :key="index" class="flex flex-col items-center">
          <div class="w-32 text-xl text-center ">
            <div v-for="(result, resultIndex) in rollResults[index - 1]" :key="resultIndex" class="">{{result}}</div>
          </div>
        </div>
      </div>
      
      <!-- Roll value select and roll button sets -->
      <div class="p-4 border-t">
        <div class="flex justify-between">
          <div v-for="index in 3" :key="index" class="flex flex-col items-center">
            <select v-model="diceValues[index - 1]" class="pr-6 mb-2 font-normal select select-ghost">
              <option v-for="dice in [2, 4, 6, 8, 10, 12]" :key="dice" :value="dice">D{{dice}}</option>
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
      const roll = Math.floor(Math.random() * this.diceValues[index]) + 1;
      this.rollResults[index].push(roll);
    },
    rollAll() {
      for (let i = 0; i < 3; i++) {
        this.rollDice(i);
      }
    }
  }
}
</script>
