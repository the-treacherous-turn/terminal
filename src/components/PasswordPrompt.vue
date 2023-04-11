<template>
  <div v-if="showPasswordInput" class="absolute w-[100vw] h-[100vh] flex items-center justify-center bg-opacity-90 bg-black">
    <div class="flex flex-col">
      <div class="flex justify-between">
        <label v-if="isCreatePassword" for="password" class="label">Create a password</label>
        <button
          v-if="isCreatePassword"
          class="px-4 py-2"
          @click="cancelPasswordCreation"
        >
          x
        </button>

      </div>
      <label v-if="!isCreatePassword" for="password" class="label">Password required</label>
      <input
        type="text"
        id="password"
        class="input"
        :placeholder="isCreatePassword ? '3-20 characters' : 'enter here'"
        v-model="password"
        @keyup.enter="submitPassword"
      />
      <button class="btn" :disabled="password.length < 3 || password.length > 20" @click="submitPassword">Submit</button>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    showPasswordInput: Boolean,
    isCreatePassword: Boolean,
  },
  data() {
    return {
      password: "",
    };
  },
  methods: {
    submitPassword() {
      if (this.password.length < 3 || this.password.length > 20) return
      this.$emit("password-submitted", this.password);
    },
    cancelPasswordCreation() {
      this.$emit("cancel-password-creation");
    }
  },
};
</script>