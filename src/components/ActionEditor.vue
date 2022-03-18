<template>
  <Transition
    name="modal"
  >
    <div class="font-mono uppercase fixed z-50 top-0 left-0 w-full h-full bg-black/50 table transition-opacity"
    v-if="$store.state.isEditorOpen">
      <div class="table-cell align-middle bg-transparent">
        <div class="
        modal-container
        relative
        w-4/5 m-auto p-8
        border-2
        transition-all
        ">
          <button class="absolute lowercase decoration-transparent top-0 right-0 m-2 mt-0 text-2xl"
            @click="cancel"
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
              class="block"
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
  computed: {
    isSubmitDisabled() {
      return !this.name || !this.description
    },
    name: {
      get() { return this.$store.getters.dirtyAction.name },
      set (value) { this.$store.commit('updateAction', {name: value}) }
    },
    description: {
      get() {return this.$store.getters.dirtyAction.description},
      set (value) { this.$store.commit('updateAction', {description: value}) }
    }
  },
  methods: {
    submit() {
      this.$store.commit('submitActionEdit')
      this.cleanFields()
      this.close()
    },
    cancel() {
      this.$store.commit('deleteAction', this.$store.state.dirtyActionID)
      this.close()
    },
    cleanFields() {
      this.name = ''
      this.description = ''
    },
    close() {
      this.$store.commit('closeEditor')
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