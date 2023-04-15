<template>
  <Transition name="modal">
    <div
      class="fixed top-0 left-0 z-50 table w-full h-full uppercase transition-opacity bg-black/50"
      v-if="$store.state.eventLog.isEditorOpen"
    >
      <div class="table-cell align-middle bg-transparent">
        <div
          class="relative w-3/5 p-8 m-auto transition-all border modal-container bg-base-100"
        >
          <button
            class="absolute top-0 right-0 m-2 mt-0 text-2xl lowercase decoration-transparent"
            @click="cancel"
          >
            x
          </button>
          <div class="relative uppercase">
            <h2 class="pb-4 text-3xl">Edit Action</h2>
            <textarea
              v-model="name"
              name="name"
              id="name"
              placeholder="Name"
              rows="1"
              class="w-full px-2 py-2 mb-2 bg-black border"
            ></textarea>
            <div class="mb-2">
              <label for="confidence" class="inline-block mb-2 mr-4">
                Confidence:
                <input
                  v-model.number="confidence"
                  name="confidence"
                  id="confidence"
                  type="number"
                  min="0"
                  max="100"
                  class="w-12 text-center bg-black border-b"
                />
                <span>%</span>
              </label>
              <label for="risk" class="inline-block mb-2 mr-4">
                Risk:
                <select
                  v-model.number="risk"
                  name="risk"
                  id="risk"
                  class="w-12 text-center bg-black border-b"
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
                  name="compute"
                  id="compute"
                  type="number"
                  min="0"
                  class="w-12 text-center bg-black border-b"
                />
              </label>
            </div>
            <textarea
              v-model="description"
              name="description"
              id="description"
              placeholder="Description"
              rows="5"
              class="w-full px-2 py-2 mb-4 bg-black border"
            ></textarea>
            <div class="flex items-center mb-4">
              <span class="label-text">STATUS:</span>
              <select
                v-model="actionState"
                class="bg-black w-[130px] label-text text-white placeholder-white outline-none"
              >
                <option value="" class="label-text" disabled selected hidden>
                  NORMAL
                </option>
                <option value="NORMAL" class="label-text">NORMAL</option>
                <option value="FINALIZED" class="label-text">FINALIZED</option>
                <option value="CROSSED OUT" class="label-text">
                  CROSSED OUT
                </option>
              </select>
              <div v-if="actionState == 'FINALIZED' || actionState == 'CROSSED OUT'">
                <input
                  v-if="stateofDisplayMode"
                  v-model="dayLeft"
                  class="ml-[20px]"
                />
                <input v-else v-model="commitTimeISO" class="ml-[20px]" />
              </div>
            </div>

            <button
              class="uppercase btn"
              type="submit"
              :disabled="isSubmitDisabled"
              @click="submit"
            >
              >> Submit
            </button>
          </div>
        </div>
      </div>
    </div>
  </Transition>
</template>

<script>
import { DateTime } from "luxon";
import { mapState } from "vuex";

export default {
  computed: {
    ...mapState({
      stateofDisplayMode: (state) => state.stateofDisplayMode,
    }),
    isSubmitDisabled() {
      return !this.name;
    },
    name: {
      get() {
        return this.$store.getters.dirtyAction.name;
      },
      set(value) {
        this.$store.commit("updateAction", { name: value });
      },
    },
    description: {
      get() {
        return this.$store.getters.dirtyAction.description;
      },
      set(value) {
        this.$store.commit("updateAction", { description: value });
      },
    },
    risk: {
      get() {
        return this.$store.getters.dirtyAction.risk;
      },
      set(value) {
        this.$store.commit("updateAction", { risk: value });
      },
    },
    confidence: {
      get() {
        return this.$store.getters.dirtyAction.confidence;
      },
      set(value) {
        this.$store.commit("updateAction", { confidence: value });
      },
    },
    compute: {
      get() {
        return this.$store.getters.dirtyAction.compute;
      },
      set(value) {
        this.$store.commit("updateAction", { compute: value });
      },
    },
    actionState: {
      get() {
        return this.$store.getters.dirtyAction.actionState;
      },
      set(value) {
        this.$store.commit("updateStateAction", {
          actionState: value,
          commitTimeISO: DateTime.fromISO(
            this.$store.state.clock.nowTimeISO
          ).toLocaleString(DateTime.DATE_MED_WITH_WEEKDAY),
        });
      },
    },
    commitTimeISO: {
      get() {
        return this.$store.getters.dirtyAction.commitTimeISO;
      },
      set(value) {
        console.log(DateTime.fromFormat(value, "EEE, MMM d, yyyy").toJSDate());
        this.$store.commit("updateAction", {
          commitTimeISO: value,
        });
      },
    },
    dayLeft: {
      get() {
        return this.$store.getters.dirtyAction.dayLeft;
      },
      set(value) {
        this.$store.commit("updateAction", {
          dayLeft: value,
        });
      },
    },
  },
  methods: {
    submit() {
      this.$store.dispatch("submitActionEdit");
      this.cleanFields();
      this.close();
    },
    cancel() {
      if (this.$store.getters.dirtyAction.isNew) {
        this.$store.dispatch(
          "deleteAction",
          this.$store.state.eventLog.dirtyActionID
        );
        this.close();
      } else {
        // HACK prevent dirty state from persisting.
        // TODO wire this up properly, so that cancel reverts changes to the card
        this.submit();
      }
    },
    setActionState(state) {
      this.$store.commit("updateStateAction", state);
    },
    cleanFields() {
      this.name = "";
      this.description = "";
    },
    close() {
      this.$store.commit("closeEditor");
    },
  },
};
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
