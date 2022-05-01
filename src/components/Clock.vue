<template>
<div>
  <div class="stats float-right">
    <div class="indicator absolute right-0 -translate-x-2 translate-y-6">
      <label for="modal-clock-setting">
        <span class="indicator-item indicator-bottom indicator-center p-1 badge badge-secondary">
          <font-awesome-icon icon="ellipsis-vertical" class="text-base" />
        </span>
      </label>
    </div>
    <div class="stat px-4">
      <div class="stat-title text-base">{{nowDate}}</div>
      <div class="stat-value text-4xl">{{nowHour}}:{{nowMin}}</div>
    </div>
    <div class="stat px-4">
      <div class="stat-title text-base">Cycle</div>
      <div class="stat-value text-4xl">{{cycle}}</div>
      <div class="stat-figure">
        <label v-if="isComputeUsedUp" class="btn uppercase" @click="advanceCycle">End Cycle</label>
        <label v-else for="modal-cycle-confirm" class="btn modal-button uppercase">End Cycle</label>
      </div>
    </div>
  </div>

<input type="checkbox" id="modal-cycle-confirm" class="modal-toggle">
<label for="modal-cycle-confirm" class="modal cursor-pointer">
  <label class="modal-box relative" for="">
    <h3 class="text-lg font-bold">Confirm advancing this Cycle</h3>
    <p class="py-4">Your remaining compute points will be lost.</p>
    <div class="btn-group float-right">
      <label for="modal-cycle-confirm" class="btn btn-primary" @click="advanceCycle">Confirm</label>
      <label for="modal-cycle-confirm" class="btn">Cancel</label>
    </div>
  </label>
</label>

<input type="checkbox" id="modal-clock-setting" class="modal-toggle" />
<label for="modal-clock-setting" class="modal cursor-pointer">
  <label class="modal-box relative" for>
    <h3 class="text-lg font-bold">Configure Clock</h3>
    <p>
      <label for="clock-tracker-cycle-length">Cycle Length </label>
      <input 
        v-model.number="tempCycleLength"
        id="clock-tracker-cycle-length" type="number" min="0"
        class="input input-bordered w-20">
    </p>
    <p>
      <label for="clock-tracker-origin-time">Origin Time </label>
      <input
        v-model="tempOriginTimeISO"
        type="datetime-local"
        id="clock-tracker-origin-time"
        class="input input-bordered text-black bg-white">
    </p>

    <p>
      <label for="clock-tracker-cycle" class="pr-2">Set Cycle </label>
      <div class="tooltip tooltip-right tooltip-warning" data-tip="Warning: This may break your chronology.">
        <input
          v-model.number="tempCycle"
          type="number" min="0"
          id="clock-tracker-cycle"
          class="input input-bordered w-20">
      </div>
    </p>

    <div class="btn-group float-right">
      <label
        for="modal-clock-setting"
        class="btn btn-primary"
        @click="updateClock">
        Confirm</label>
      <label for="modal-clock-setting" class="btn">Cancel</label>
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
      tempCycleLength: this.$store.state.cycleLength,
      tempOriginTimeISO: this.$store.getters.originTime.toISO({includeOffset:false}), // NOTE ignore timezone to avoid weirdness
      tempCycle: this.$store.state.cycle,
    }
  },
  watch: {
    '$store.state.cycleLength': function(newVal, oldVal) {
      this.tempCycleLength = newVal
    },
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
    cycle () {
      this.tempCycle = this.$store.state.cycle // update the cycle displayed whenever store gets updated too
      return this.$store.state.cycle
    },
    isComputeUsedUp () {
      return this.$store.getters.computeAvailable === 0
    },
  },
  methods: {
    updateClock() {
      this.$store.dispatch('setClockAttributes', {
        cycle: this.tempCycle,
        cycleLength: this.tempCycleLength,
        originTimeISO: this.tempOriginTimeISO,
      })
    },
    advanceCycle() {
      this.$store.dispatch('advanceCycle')
    }
  }
}
</script>