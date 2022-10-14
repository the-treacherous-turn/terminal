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
<div class="border-2 h-4 w-full flex">
  <div class="bg-error h-full" :style="`width: ${value/max*100}%;`"></div>
  <div class="bg-success h-full" :style="`width: ${addition/max*100}%`"></div>
</div>
</template>