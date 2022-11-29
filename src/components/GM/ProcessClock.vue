<!-- NOTE: WIP process clock. Need a redesign to include appropriate functionalities. -->
<script>
export default {
  data() {
    return {
      size: 3,
      elapsed: 0,
      checkpoints: [],
    }
  }
}
</script>

<template>
<div class="flex flex-col items-center">
  <div class="clock" :style="`--n: ${size}`">
    <div class="widget">
      <div class="core">
        <div v-for="n in size" class="slice" :i="n" :style="`--i:${n};`"></div>
        <div v-for="n in size" class="bar" :i="n" :style="`--i:${n};`">
          <div class="paint"></div>
        </div>
      </div>
      <div class="disc"></div>
    </div>
  </div>
  <div class="control flex">
    <!-- TODO: replace this with the ^ and v UI from compute action editor -->
    <button class="btn btn-sm" @click="size++">+</button>
    <button class="btn btn-sm" @click="size--">-</button>
  </div>
</div>
</template>

<style>
.clock {
  --color-orange: #f06900;
  --color-blue: #0f96ff;
  --color-dark: #020308;
  --color-mid: #101116;
  --color-light: #44454a;
  --color-bright: white;
  --color-scrollbar-bg: var(--color-dark);
  --color-scrollbar-fg: var(--color-light);
  --color-clock-border: var(--color-dark);
  --clock-border-thickness: 4px;
  --clock-size: 150px;
  --clock-disc-size: 80px;

  --angle: calc(360deg / var(--n));
  display: flex;
  flex-direction: column;
}
.clock .widget {
    position: relative;
    height: var(--clock-size);
    width: var(--clock-size);
}
.clock .core {
    position: absolute;
    height: 100%;
    width: 100%;
    border: var(--clock-border-thickness) solid var(--color-clock-border);
    border-radius: 50%;
    box-sizing: border-box;
    overflow: hidden;
}
.clock .slice {
    --o: 10%;
    position: absolute;
    top: calc(-1 * var(--o));
    left: 50%;
    height: calc(50% + var(--o));
    width: calc(50% + var(--o));
    /* background: var(--color-mid); */
    background: var(--color-bright);
    transform-origin: bottom left;
    transform: rotate(calc(var(--i) * var(--angle))) skewY(calc(-90deg + var(--angle)));
}
.clock .slice[filled] {
    background: var(--clock-color);
}
.clock .slice:not([filled])[will-change] {
    background: var(--clock-color);
    filter: brightness(0.5);
}
.clock .slice[filled][will-change] {
    background: var(--color-light);
}
.clock .slice:not([filled]):hover {
    background: var(--clock-color);
    filter: brightness(1.5);
}
.clock .slice[filled]:hover {
    background: var(--color-bright);
}
.clock .disc {
    --offset: calc((var(--clock-size) - var(--clock-disc-size)) / 2);
    position: absolute;
    top: var(--offset);
    left: var(--offset);
    height: var(--clock-disc-size);
    width: var(--clock-disc-size);
    border-radius: 50%;
    background: var(--color-clock-border);
    pointer-events: none;
}
.clock .bar {
    --w: calc(2 * var(--clock-border-thickness));
    --h: 60%;
    position: absolute;
    top: -10%;
    left: 50%;
    height: var(--h);
    width: var(--w);
    transform-origin: bottom left;
    transform: rotate(calc(var(--i) * var(--angle)));
    pointer-events: none;
}
.clock .bar .paint {
    margin-left: calc(-0.5 * var(--w));
    height: 100%;
    width: 100%;
    background: var(--color-clock-border);
}
</style>