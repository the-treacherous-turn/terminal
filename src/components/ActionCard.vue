<template>
<div
  class="font-mono uppercase border-y relative transition-all"
  @mouseover="hover=true"
  @mouseleave="hover=false"
  >
  <div class="p-8" :class="{'text-gray-500': isForecast}">
    <h2
      class="text-3xl"
    >
      <span v-if="isForecast">Forecast: {{name}}</span>
      <span v-else :class="{'bg-white text-black': isCommitted}">Action: {{name}}</span>
    </h2>
    <p>
      <span v-if="Number.isFinite(confidence)" class="text-lg mr-4">Confidence: {{confidence}}% </span>
      <span v-if="Number.isFinite(risk)" class="text-lg mr-4">Risk: d{{risk}} </span>
      <span v-if="Number.isFinite(compute)" class="text-lg mr-4">Compute: {{compute}} </span>
    </p>
    <pre class="mt-4 whitespace-pre-wrap" v-if="description">{{description}}</pre>
    <div class="pt-4" v-if="!isCommitted && hover">
      <button class="mr-4" @click="commitCard()">commit</button>
      <button v-if="!isCommitted" class="mr-4" @click="editCard()">edit</button>
    </div>
    <div class="pt-4" v-if="isCommitted && !isForecast">
      <span
        class="mr-4 bg-white text-black"
        @mouseover="hoverCommit=true"
        @mouseleave="hoverCommit=false"
        >
        <span v-if="!hoverCommit">committed</span>
        <button v-if="hoverCommit" class="decoration-white" @click="undoCommit()">Undo commit?</button>
      </span>
      <button v-if="hover" class="mr-4" @click="editCard()">edit</button>
      <button v-if="isCommitted && hover" class="mr-4" @click="markAsForecast()">mark as forecast</button>
    </div>
    <div class="pt-4" v-if="isForecast && hover">
      <button class="mr-4" @click="editCard()">edit</button>
      <button class="decoration-white" @click="undoForecast()">Undo forecast?</button>
    </div>
  </div>
  <button v-if="hover" class="absolute lowercase decoration-transparent top-0 right-0 m-2 mt-0 text-2xl"
    @click="deleteCard"
  >x</button>
</div>
</template>

<script>
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
  },
  data(){
    return {
      hover: false,
      hoverCommit: false,
      hoverForecast: false,
    }
  },
  mounted() {
    // scroll into view
    this.$el.scrollIntoView({
      behavior: 'smooth',
    });
  },
  methods: {
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