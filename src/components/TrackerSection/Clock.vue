<template>
<div v-if="cycle !== -Infinity">
  <div class="stats float-right">
    <div class="stat px-4">
      <div>
        <div class="stat-title text-base inline mr-2">{{nowDate}} </div>
        <label for="modal-time-setting">
          <span class="indicator-item indicator-bottom indicator-center p-1 badge badge-secondary">
            <font-awesome-icon :icon="['fas', 'pen-to-square']" class="text-base" />
          </span>
        </label>
      </div>
      <div class="stat-value text-4xl">{{nowHour}}:{{nowMin}}</div>
    </div>
    <div class="stat px-4">
      <div>
        <div class="stat-title text-base inline">Turn </div>
        <label for="modal-turn-setting">
          <span class="indicator-item indicator-bottom indicator-center p-1 badge badge-secondary">
            <font-awesome-icon :icon="['fas', 'pen-to-square']" class="text-base" />
          </span>
        </label>
      </div>
      <div class="stat-value text-4xl">{{cycle}}</div>
      <div class="stat-figure">
        <label v-if="isComputeUsedUp" class="btn uppercase" @click="advanceCycle">End Turn</label>
        <label v-else for="modal-cycle-confirm" class="btn modal-button uppercase">End Turn</label>
      </div>
    </div>
  </div>

<input type="checkbox" id="modal-cycle-confirm" class="modal-toggle">
<label for="modal-cycle-confirm" class="modal cursor-pointer">
  <label class="modal-box relative" for="">
    <h3 class="text-lg font-bold">Confirm advancing this Turn</h3>
    <p class="py-4">Your remaining compute points will be lost.</p>
    <div class="btn-group float-right">
      <label for="modal-cycle-confirm" class="btn btn-primary" @click="advanceCycle">Confirm</label>
      <label for="modal-cycle-confirm" class="btn">Cancel</label>
    </div>
  </label>
</label>

<input type="checkbox" id="modal-time-setting" class="modal-toggle"
v-model="isTimeSettingOpen" @change="onTimeModalToggle" />
<label for="modal-time-setting" class="modal cursor-pointer">
  <label class="modal-box relative" for>
    <h3 class="text-lg font-bold">Time</h3>
    
    <p class="my-4">
      <label class="inline-block w-20" for="clock-tracker-now-time">Now: </label>
      <input
        v-model="nowTimeISO"
        type="datetime-local"
        id="clock-tracker-now-time"
        class="input input-sm input-bordered text-black bg-white">
    </p>

    <p class="my-4">
      <label class="inline-block w-20" for="clock-tracker-origin-time">Origin: </label>
      <input
        v-model="originTimeISO"
        type="datetime-local"
        id="clock-tracker-origin-time"
        class="input input-sm input-bordered text-black bg-white">
    </p>

    <div class="btn-group float-right">
      <label
        for="modal-time-setting"
        class="btn btn-primary">
        Close</label>
    </div>
  </label>
</label>


<input type="checkbox" id="modal-turn-setting" class="modal-toggle"
v-model="isTurnSettingOpen" @change="onTurnModalToggle" />
<label for="modal-turn-setting" class="modal cursor-pointer">
  <label class="modal-box relative" for>

    <h3 class="text-lg font-bold">Turns</h3>

    <p class="my-4">
      <label for="clock-tracker-cycle-length">Turn Length: </label>
      <input 
        v-model.number="cycleLength"
        id="clock-tracker-cycle-length" type="number" min="0"
        class="input input-sm input-bordered w-20"> hours
    </p>

    <p class="my-4">
      <label for="clock-tracker-cycle" class="pr-2">Set Turn: </label>
      <input
        v-model.number="cycle"
        type="number" min="0"
        id="clock-tracker-cycle"
        class="input input-sm input-bordered w-20">
    </p>

    <div class="btn-group float-right">
      <label
        for="modal-turn-setting"
        class="btn btn-primary">
        Close</label>
    </div>
  </label>
</label>

</div>
</template>

<script>
import { DateTime } from 'luxon'

export default {
  data() {
    return {
      isTimeSettingOpen: false,
      isTurnSettingOpen: false,
    }
  },
  computed: {
    nowDate() {
      return this.$store.getters.nowTime.toLocaleString(DateTime.DATE_MED_WITH_WEEKDAY)
    },
    nowHour() {
      return this.$store.getters.nowTime.toFormat('HH')
    },
    nowMin() {
      return this.$store.getters.nowTime.toFormat('mm')
    },
    cycle: {
      get() {
        console.log(this.$store.state.clock.cycle === -Infinity)
        return this.$store.state.clock.cycle },
      set(newVal) { this.$store.commit('setCycle', newVal) },
    },
    cycleLength: {
      get() { return this.$store.state.clock.cycleLength },
      set(newVal) { this.$store.commit('setCycleLength', newVal) },
    },
    originTimeISO: {
      get() { return this.$store.state.clock.originTimeISO },
      set(newVal) { this.$store.commit('setOriginTimeISO', newVal) },
    },
    nowTimeISO: {
      get() { return this.$store.state.clock.nowTimeISO },
      set(newVal) { this.$store.commit('setNowTimeISO', newVal) },
    },
    isComputeUsedUp () {
      return this.$store.getters.computeAvailable === 0
    },
  },
  methods: {
    advanceCycle() {
      this.$store.dispatch('advanceCycle')
    },
    onTimeModalToggle() {
      if (!this.isTimeSettingOpen) {
        this.$store.dispatch('syncClock')
      }
    },
    onTurnModalToggle() {
      if (!this.isTurnSettingOpen) {
        this.$store.dispatch('syncClock')
      }
    },
  }
}
</script>