<template>
  <h1 class="text-3xl">{{ msg }}</h1>

  <!-- make a button using tailwindcss -->
  <button class="underline underline-offset-4 decoration-dotted hover:decoration-solid"
    type="button"
    @click="increment"
  >
  count is: {{ count }}
    </button> 

</template>

<script >
import {mapState} from 'vuex'
export default {
  props: ['msg'],
  // computed: {
  //   count() {
  //     return this.$store.state.count
  //   }
  // },
  computed: mapState({
    count: state => state.count
  }),
  methods: {
    increment() {
      this.$store.commit('increment')
    }
  }
}
</script>

<style scoped>
</style>
