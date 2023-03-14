<script>
export default {
  props: {
    value: Number,
    addition: Number,
    max: Number,
  }
}
</script>

<template>
<div class="flex w-full h-4 border-2">
  <div class="h-full bg-error" :style="`width: ${value/max*100}%;`"></div>
  <div class="h-full bg-success" :style="`width: ${addition/max*100}%`"></div>
</div>
</template>