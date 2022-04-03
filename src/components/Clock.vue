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
        <button class="btn uppercase" @click="advanceCycle">Advance Cycle</button>
      </div>
    </div>
  </div>

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
      return this.$store.getters.nowTime.toFormat('hh')
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