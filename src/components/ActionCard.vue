<!-- TODO finish this component so it's not a disgrace -->
<template>
<div class="font-mono uppercase border-y transition-all">
  <div class="p-8">
    <h2 class="text-3xl">{{name}}</h2>
    <p>{{description}}</p>
  </div>
</div>
</template>

<script>
export default {
  props: {
    name: String,
    description: String,
  },
  mounted() {
    // scroll into view
    this.$el.scrollIntoView({
      behavior: 'smooth',
    });
  }
}
</script>