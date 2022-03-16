<template>
  <Transition name="modal">
    <div class="font-mono uppercase fixed z-50 top-0 left-0 w-full h-full bg-black/50 table transition-opacity"
    v-if="show">
      <div class="table-cell align-middle">
        <div class="
        modal-container
        relative
        w-4/5 m-auto p-8
        border-2
        transition-all
        ">
          <button class="absolute top-0 right-0 m-2 mt-0 text-2xl"
            @click="$emit('close')"
          >x</button>
          <div class="uppercase relative">
            <h2 class="">Edit Action</h2>
            
            <textarea
              v-model="name"
              name="name" id="name"
              placeholder="Name"
              rows="1"
              class="bg-black w-full border-2"
              ></textarea>
            <textarea
              v-model="description"
              name="description" id="description"
              placeholder="Description"
              rows="5"
              class="bg-black w-full border-2"
              ></textarea>
            <button
              class="uppercase block
              underline underline-offset-8 decoration-dotted 
              disabled:opacity-50
              hover:decoration-solid"
              type="submit"
              :disabled="isSubmitDisabled"
              @click="submit"
            >>> Submit</button>
          </div>
        </div>
      </div>
    </div>
  </Transition>
</template>

<script>
export default {
  props: {
    show: Boolean
  },
  data() {
    return {
      name: '',
      description: ''
    }
  },
  computed: {
    isSubmitDisabled() {
      return !this.name || !this.description
    }
  },
  methods: {
    submit() {
      this.$store.commit('addAction', {
        name: this.name,
        description: this.description
      })
      this.$emit('close')
    }
  }
}
</script>

<style>

.modal-enter-from {
  opacity: 0;
}

.modal-leave-to {
  opacity: 0;
}

.modal-enter-from .modal-container,
.modal-leave-to .modal-container {
  -webkit-transform: scale(1.1);
  transform: scale(1.1);
}
</style>