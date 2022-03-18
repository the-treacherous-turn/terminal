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
        w-3/5 m-auto p-8
        border
        transition-all
        ">
          <button class="absolute lowercase decoration-transparent top-0 right-0 m-2 mt-0 text-2xl"
            @click="cancel"
          >x</button>
          <div class="uppercase relative">
            <h2 class="text-3xl pb-4">Edit Action</h2>
            
            <textarea
              v-model="name"
              name="name" id="name"
              placeholder="Name"
              rows="1"
              class="bg-black border w-full mb-2 px-2 py-2"
            ></textarea>
            <div class="mb-4">
              <label for="risk">
                Risk:
                <input
                  v-model.number="risk"
                  name="risk" id="risk"
                  type="number"
                  class="bg-black border-b w-24 mr-4 px-2"
                />
              </label>
              <label for="compute">
                Compute:
                <input
                  v-model.number="compute"
                  name="compute" id="compute"
                  type="number"
                  class="bg-black border-b w-24 mr-4 px-2"
                />
              </label>
            </div>
            <textarea
              v-model="description"
              name="description" id="description"
              placeholder="Description"
              rows="5"
              class="bg-black w-full border mb-4 px-2 py-2"
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
    },
    risk: {
      get() {return this.$store.getters.dirtyAction.risk},
      set (value) { this.$store.commit('updateAction', {risk: value}) }
    },
    compute: {
      get() {return this.$store.getters.dirtyAction.compute},
      set (value) { this.$store.commit('updateAction', {compute: value}) }
    },
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