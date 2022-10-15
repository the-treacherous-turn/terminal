<template>
  <div class="mx-8 my-4 p-4 relative border">
  <div class="text-sm pb-2">
    <span class="">
      {{commitDate}}
    </span>
  </div>
  <div class="absolute right-0 top-0">
    <font-awesome-icon :icon="['fas', 'pen-to-square']" class="text-base mr-1 my-1 cursor-pointer text-primary-content hover:text-white"  @click="editCard" />
    <font-awesome-icon :icon="['fas', 'trash-can']" class="text-base mr-1 my-1 cursor-pointer text-primary-content hover:text-white"        @click="deleteCard" />
</div>
  <span
    class="text-2xl cursor-pointer"
    :class="{
      'hover:text-success-content hover:bg-success hover:inline': (!isCommitted && !isForecast),
      'badge badge-success inline hover:line-through': (isCommitted && !isForecast),
      'line-through hover:no-underline': isForecast,
    }"
    @click="toggleCardMode"
    >{{name}}</span>
  <p :class="{'line-through': isForecast}">
    <span v-if="Number.isFinite(confidence)" class="badge badge-ghost text-lg mr-1">Confidence: {{confidence}}% </span>
    <span v-if="Number.isFinite(risk)" class="badge badge-ghost text-lg mr-1">Risk: d{{risk}} </span>
    <span v-if="Number.isFinite(compute)" class="badge badge-ghost text-lg mr-1">Compute: {{compute}} </span>
  </p>
  <p class=" mt-4 normal-case text-lg whitespace-pre-wrap" :class="{'line-through': isForecast}" v-if="description">{{description}}</p>
</div>
</template>

<script>
import { DateTime } from 'luxon'

export default {
  props: {
    name: String,
    description: String,
    risk: Number,
    confidence: Number,
    compute: Number,
    actionID: String,
    isDirty: Boolean,
    isCommitted: Boolean,
    isForecast: Boolean,
    commitTimeISO: String,
  },
  data(){
    return {
      hover: false,
      hoverCommit: false,
      hoverForecast: false,
    }
  },
  computed: {
    commitDate() {
      if (!this.commitTimeISO) return ''
      return DateTime.fromISO(this.commitTimeISO).toLocaleString(DateTime.DATE_MED_WITH_WEEKDAY)
    }
  },
  methods: {
    toggleCardMode() {
      if (!this.isCommitted) this.commitCard()
      else if (!this.isForecast) this.markAsForecast()
      else {
        this.undoCommit()
        this.undoForecast()
      }
    },
    editCard() {
      // open the action editor
      // and let vuex know we are editing this card.
      this.$store.dispatch('editExtantAction', this.actionID)
    },
    commitCard() {
      // commit the action
      this.$store.dispatch('commitAction', this.actionID)
    },
    undoCommit() {
      // undo the commit
      this.$store.dispatch('undoCommitAction', this.actionID)
    },
    undoForecast() {
      // undo the forecast
      this.$store.dispatch('undoForecastAction', this.actionID)
    },
    markAsForecast() {
      this.$store.dispatch('markAsForecast', this.actionID)
    },
    deleteCard() {
      this.$store.dispatch('deleteAction', this.actionID)
    },
  },
}
</script>