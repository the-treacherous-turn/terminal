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
    <h1 class="pb-4 text-6xl text-white highlighter">The Treacherous Terminal_</h1>
    <p class="pb-4 text-white">To start, enter your campaign ID:</p>
    <input
      v-model="sessionID"
      type="text"
      class="text-center input input-sm input-bordered"
    />
    <button
      class="mt-8 btn btn-wide"
      :disabled="!sessionID"
      @click="openSession"
    >
      Open Campaign
    </button>
  </div>
</template>
