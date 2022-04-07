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
<div class="border-2 h-8 w-full flex">
  <div class="bg-red-500 h-full" :style="`width: ${value/max*100}%;`"></div>
  <div class="bg-green-500 h-full" :style="`width: ${addition/max*100}%`"></div>
</div>
</template>