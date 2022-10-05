<script>
import ActionEditor from './components/ActionEditor.vue'

import Footer from './Footer.vue'

export default {
  components: {
    ActionEditor,
    Footer,
  },
  methods: {

  }
}
</script>

<template>
<div class="navbar uppercase bg-base-100 w-full col-span-2">
  <span class="text-3xl">
    <span>
      The Treacherous Turn <span class="text-base">v0.2.7</span>
    </span>
  </span>
  <span class="text-base ml-auto">User ID: <span class="bg-white text-black">dev</span></span>
</div>
  
<router-view></router-view>

<div class="btm-nav col-span-2">
  <!-- <button class="transition-all" :class="{'active':($route.path == '/')}" @click="$router.push('/')">
    <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6" /></svg>
    <span class="btm-nav-label">Long Mode Tracker</span>
  </button> -->
  <button class="transition-all" :class="{'active':($route.path == '/eventLog')}" @click="$router.push('/eventLog')">
    <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6" /></svg>
    <span class="btm-nav-label">Event Log</span>
  </button>
  <button class="transition-all" :class="{'active':($route.path == '/compute')}" @click="$router.push('/compute')">
    <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6" /></svg>
    <span class="btm-nav-label">Compute Tracker</span>
  </button>
  <button class="transition-all" :class="{'active':($route.path == '/upgrade')}" @click="$router.push('/upgrade')">
    <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" /></svg>
    <span class="btm-nav-label">Upgrades</span>
  </button>
  <button class="transition-all" :class="{'active':($route.path == '/info')}" @click="$router.push('/info')">
    <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>
    <span class="btm-nav-label">Info</span>
  </button>
</div>

<!-- NOTE: Footer may not make sense anymore as its position is filled by Bottom Navigation. -->
<!-- It's currently blocked behind the bottom navigation. -->
<!-- <Footer /> -->
<Teleport to="body">
  <ActionEditor />
</Teleport>
</template>

<style>
</style>
