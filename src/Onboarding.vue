<script>
export default {
  data() {
    return {
      sessionID: "",
    };
  },
  methods: {
    openSession() {
      window.location.hash = this.sessionID;
    },
  },
};
</script>

<template>
  <div class="flex flex-col items-center justify-center h-full">
    <img src="/logo.png" alt="logo" class="w-80" />
    <h1 class="text-6xl pb-4 highlighter text-white">The Treacherous Turn_</h1>
    <p class="pb-4 text-white">To start, enter your session ID:</p>
    <input
      v-model="sessionID"
      type="text"
      class="input input-sm input-bordered text-center"
    />
    <button
      class="btn btn-wide mt-8"
      :disabled="!sessionID"
      @click="openSession"
    >
      Open Game Session
    </button>
  </div>
</template>
