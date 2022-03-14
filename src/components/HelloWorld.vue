<template>
  <h1 class="text-3xl font-bold underline">{{ msg }}</h1>

  <!-- make a button using tailwindcss -->
  <button class="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded mt-3"
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
