<!-- TODO finish this component so it's not a disgrace -->
<template>
<div class="font-mono uppercase">
  <h2>{{name}}</h2>
  <p>{{description}}</p>
</div>
</template>

<script>
export default {
  props: {
    name: String,
    description: String,
  }
}
</script>