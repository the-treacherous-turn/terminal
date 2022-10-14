<template>
  <Transition
    name="modal"
  >
    <div class="uppercase fixed z-50 top-0 left-0 w-full h-full bg-black/50 table transition-opacity"
    v-if="$store.state.eventLog.isEditorOpen">
      <div class="table-cell align-middle bg-transparent">
        <div class="
        modal-container
        relative
        w-3/5 m-auto p-8
        border
        transition-all
        bg-base-100
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
            <div class="mb-2">
              <label for="confidence" class="inline-block mb-2 mr-4">
                Confidence:
                <input
                  v-model.number="confidence"
                  name="confidence" id="confidence"
                  type="number"
                  min="0"
                  max="100"
                  class="bg-black border-b w-12 text-center"
                />
                <span>%</span>
              </label>
              <label for="risk" class="inline-block mb-2 mr-4">
                Risk:
                <select
                  v-model.number="risk"
                  name="risk" id="risk"
                  class="bg-black border-b w-12 text-center"
                >
                  <option value="2">d2</option>
                  <option value="4">d4</option>
                  <option value="6">d6</option>
                  <option value="8">d8</option>
                  <option value="10">d10</option>
                  <option value="12">d12</option>
                </select>
              </label>

              <label for="compute" class="inline-block mb-2 mr-4">
                Compute:
                <input
                  v-model.number="compute"
                  name="compute" id="compute"
                  type="number"
                  min="0"
                  class="bg-black border-b w-12 text-center"
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
            <div class="mb-4">

              <label class="label cursor-pointer inline-flex">
                <input v-model="isCommitted" type="checkbox" checked="checked" class="checkbox" />
                <span class="label-text mx-4">finalized</span> 
              </label>
              <label class="label cursor-pointer inline-flex">
                <input v-model="isForecast" type="checkbox" checked="checked" class="checkbox" />
                <span class="label-text mx-4">crossed out</span> 
              </label>
            </div>
            <button
              class="btn uppercase"
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
      return !this.name
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
    confidence: {
      get() {return this.$store.getters.dirtyAction.confidence},
      set (value) { this.$store.commit('updateAction', {confidence: value}) }
    },
    compute: {
      get() {return this.$store.getters.dirtyAction.compute},
      set (value) { this.$store.commit('updateAction', {compute: value}) }
    },
    isCommitted: {
      get() {return this.$store.getters.dirtyAction.isCommitted},
      set (value) {
        this.$store.commit('updateAction', {
          isCommitted: value,
          commitTimeISO: this.$store.state.clock.nowTimeISO,
        })
      }
    },
    isForecast: {
      get() {return this.$store.getters.dirtyAction.isForecast},
      set (value) { this.$store.commit('updateAction', {isForecast: value}) }
    },
  },
  methods: {
    submit() {
      this.$store.dispatch('submitActionEdit')
      this.cleanFields()
      this.close()
    },
    cancel() {
      if (this.$store.getters.dirtyAction.isNew) {
        this.$store.dispatch('deleteAction', this.$store.state.eventLog.dirtyActionID)
        this.close()
      } else {
        // HACK prevent dirty state from persisting.
        // TODO wire this up properly, so that cancel reverts changes to the card
        this.submit()
      }
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