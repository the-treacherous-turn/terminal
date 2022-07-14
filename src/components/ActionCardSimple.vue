<template>
<div class="mx-8 my-4 p-4 relative border" :class="{'line-through': isForecast}">
  <div class="dropdown dropdown-end absolute right-0 top-0 bg-primary">
    <span tabindex="0" class="w-4 h-4 flex items-center justify-center">
      <font-awesome-icon icon="ellipsis-vertical" class="text-base" />
    </span>
    <ul tabindex="0" class="text-lg dropdown-content menu p-2 shadow bg-primary rounded-box w-24">
      <li @click="editCard">
        <a>Edit</a>
      </li>
      <li @click="deleteCard">
        <a>Delete</a>
      </li>
    </ul>
  </div>
  <span
    class="text-2xl cursor-pointer"
    :class="{
      'badge badge-success inline': (isCommitted && !isForecast),
    }"
    @click="toggleCardMode"
    >{{name}}</span>
  <p>
    <span v-if="Number.isFinite(confidence)" class="badge badge-ghost text-lg mr-1">Confidence: {{confidence}}% </span>
    <span v-if="Number.isFinite(risk)" class="badge badge-ghost text-lg mr-1">Risk: d{{risk}} </span>
    <span v-if="Number.isFinite(compute)" class="badge badge-ghost text-lg mr-1">Compute: {{compute}} </span>
  </p>
  <p class=" mt-4 normal-case text-lg whitespace-pre-wrap" v-if="description">{{description}}</p>
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