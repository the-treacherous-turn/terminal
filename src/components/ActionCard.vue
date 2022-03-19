<!-- TODO finish this component so it's not a disgrace -->
<template>
<div
  class="font-mono uppercase border-y transition-all"
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
    <p class="mt-4" v-if="description">{{description}}</p>
    <div class="pt-4" v-if="!isCommitted && hover">
      <button v-if="!isCommitted" class="mr-4" @click="editCard()">edit</button>
      <button class="mr-4" @click="commitCard()">commit</button>
    </div>
    <div class="pt-4" v-if="isCommitted && !isForecast">
      <span class="mr-4 bg-white text-black" v-if="!isForecast">committed</span>
      <button v-if="hover" class="mr-4" @click="editCard()">edit</button>
      <button v-if="isCommitted && hover" class="mr-4" @click="markAsForecast()">mark as forecast</button>
    </div>
  </div>
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
    actionID: Number,
    isDirty: Boolean,
    isCommitted: Boolean,
    isForecast: Boolean,
  },
  data(){
    return {
      hover: false,
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
      this.$store.commit('editExtantAction', this.actionID)
    },
    commitCard() {
      // commit the action
      this.$store.commit('commitAction', this.actionID)
    },
    markAsForecast() {
      this.$store.commit('markAsForecast', this.actionID)
    },
  },
}
</script>