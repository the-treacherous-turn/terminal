<!-- TODO finish this component so it's not a disgrace -->
<template>
<div
  class="font-mono uppercase border-y transition-all"
  @mouseover="hover=true"
  @mouseleave="hover=false"
  >
  <div class="p-8">
    <h2 class="text-3xl">{{name}}</h2>
    <p>{{description}}</p>
    <div class="pt-4" v-if="hover">
      <button class="pr-4" @click="editCard()">edit</button>
      <button class="pr-4">commit</button>
    </div>
  </div>
</div>
</template>

<script>
export default {
  props: {
    name: String,
    description: String,
    actionID: Number,
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
  },
}
</script>