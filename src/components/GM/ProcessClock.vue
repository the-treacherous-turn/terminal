<!-- NOTE: WIP process clock. Need a redesign to include appropriate functionalities. -->
<script>
export default {
  props: {
    size: Number,
    elapsed: Number,
    width: Number,
    height: Number,
  },
  computed: {
    dividerThickness() {
      if (this.size > 100)
        return '0px'
      else if (this.size > 50)
        return '1px'
      else if (this.size > 30)
        return '2px'
      return '4px'
    },
  },
  data() {
    return {};
  },
};
</script>

<template>
  <component :is="'style'">
    :root { --clock-size: {{ `${width}px` }}; --clock-disc-size:
    {{ `${width / 2}px` }}; --clock-border-thickness: {{ dividerThickness }};
  </component>
  <div class="clock" :style="`--n: ${size}`">
    <div class="widget">
      <div class="core">
        <div
          v-if="size > 2"
          v-for="n in size"
          class="slice"
          :filled="n <= elapsed"
          :i="n - 1"
          :style="`--i:${n - 1};`"
        ></div>
        <div
          v-else-if="size === 2"
          class="slice_2"
          v-for="n in size"
          :filled="n <= elapsed"
          :i="n - 1"
          :style="`--i:${n - 1};`"
        ></div>

        <div
          v-else-if="size === 1"
          class="slice_1"
          v-for="n in size"
          :filled="n <= elapsed"
          :i="n - 1"
          :style="`--i:${n - 1};`"
        ></div>

        <div
          v-if="size > 1"
          v-for="n in size"
          class="bar"
          :i="n - 1"
          :style="`--i:${n - 1};`"
        >
          <div class="paint"></div>
        </div>
      </div>
      <div class="disc"></div>
      <div
        v-if="size === elapsed"
        class="absolute w-full top-[65px] flex justify-center items-center"
      >
        <div
          class="w-[110px] bg-white text-[#3CE800] uppercase text-[16px] text-center justify-center items-center]"
        >
          complete
        </div>
      </div>
    </div>
  </div>
</template>

<style>
.clock {
    --color-orange: #f06900;
  --color-blue: #0f96ff;
  --color-dark: #020308;
  --color-dark-gray: #1d2225;
  --color-green: #3CE800
  --color-mid: #101116;
  --color-light: #44454a;
  --color-bright: white;
  --color-scrollbar-bg: var(--color-dark);
  --color-scrollbar-fg: var(--color-light);
  --color-clock-border: var(--color-dark);
  /* --clock-border-thickness: 0px; */

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
  background: var(--color-bright);
  transform-origin: bottom left;
  transform: rotate(calc(var(--i) * var(--angle)))
    skewY(calc(-90deg + var(--angle)));
}

.clock .slice_2 {
  --o: 10%;
  position: absolute;
  left: 50%;
  height: 100%;
  width: 100%;
  background: var(--color-bright);
  transform-origin: left;
  transform: rotate(calc(var(--i) * var(--angle)));
}

.clock .slice_1 {
  position: absolute;
  height: 100%;
  width: 100%;
  background: var(--color-bright);
}

.clock .slice[filled = true] {
  background: #3CE800;
}
.clock .slice_2[filled = true] {
  background: #3CE800;
}
.clock .slice_1[filled = true] {
  background: #3CE800;
}
.clock .disc {
  --offset: calc((var(--clock-size) - var(--clock-disc-size)) / 2);
  position: absolute;
  top: var(--offset);
  left: var(--offset);
  height: var(--clock-disc-size);
  width: var(--clock-disc-size);
  border-radius: 50%;
  background: var(--color-dark-gray);
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
  background: var(--color-dark-gray);
}
</style>
