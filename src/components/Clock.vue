<template>
<div>
  <div class="stats float-right">
    <div class="stat">
      <div class="stat-title text-lg">{{nowDate}}</div>
      <div class="stat-value text-4xl">{{nowHour}}:{{nowMin}}</div>
    </div>
    <div class="stat">
      <div class="stat-title text-lg">Cycle</div>
      <div class="stat-value text-4xl">{{cycle}}</div>
      <div class="stat-figure">
        <label for="modal-cycle-confirm" class="btn modal-button uppercase">End Cycle</label>
      </div>
    </div>
  </div>

<input type="checkbox" id="modal-cycle-confirm" class="modal-toggle">
<label for="modal-cycle-confirm" class="modal cursor-pointer">
  <label class="modal-box relative" for="">
    <h3 class="text-lg font-bold">Confirm advancing this Cycle</h3>
    <p class="py-4">Your remaining compute points will be lost.</p>
    <div class="btn-group float-right">
      <label for="modal-cycle-confirm" class="btn btn-active" @click="advanceCycle">Confirm</label>
      <label for="modal-cycle-confirm" class="btn">Cancel</label>
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

    }
  },
  computed: {
    originTime () {
      return this.$store.state.originTime.toLocaleString({
        ...DateTime.DATETIME_MED,
        hourCycle: 'h23'
      })
    },
    nowDate() {
      return this.$store.getters.nowTime.toLocaleString(DateTime.DATE_MED_WITH_WEEKDAY)
    },
    nowHour() {
      return this.$store.getters.nowTime.toFormat('HH')
    },
    nowMin() {
      return this.$store.getters.nowTime.toFormat('mm')
    },
    cycle () { return this.$store.state.cycle }
  },
  methods: {
    advanceCycle() {
      this.$store.dispatch('advanceCycle')
    }
  }
}
</script>