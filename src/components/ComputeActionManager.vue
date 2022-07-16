<script>
import { SimpleBar } from 'simplebar-vue3';
import ComputeActionCard from './ComputeActionCard.vue'
export default {
  components: {
    SimpleBar,
    ComputeActionCard,
  },
  data() {
    return {
      isEditorOpen: false,
    }
  },
  computed: {
    canAssignCompute() {
      return this.$store.getters.computeAvailable > 0 && this.$store.state.compute.computeToSpend > 0
    },
    // editor
    isSubmitDisabled() {
      return !(this.name && this.computeNeeded)
    },
    dirtyComputeAction() {
      return this.$store.getters.dirtyComputeAction
    },
    name: {
      get() { return this.dirtyComputeAction ? this.dirtyComputeAction.name : '' },
      set (value) {
        this.$store.commit('updateComputeAction', {
          actionID: this.$store.state.computeAction.dirtyComputeActionID,
          payload: {
            name: value
          }
        })
      }
    },
    description: {
      get() {return this.dirtyComputeAction ? this.dirtyComputeAction.desc : ''},
      set (value) {
        this.$store.commit('updateComputeAction', {
          actionID: this.$store.state.computeAction.dirtyComputeActionID,
          payload: {
            desc: value
          }
        })
      }
    },
    computeNeeded: {
      get() {return this.dirtyComputeAction ? this.dirtyComputeAction.computeNeeded : ''},
      set (value) {
        this.$store.commit('updateComputeAction', {
          actionID: this.$store.state.computeAction.dirtyComputeActionID,
          payload: {
            computeNeeded: value
          }
        })
      }
    },
    computeApplied: {
      get() {return this.dirtyComputeAction ? this.dirtyComputeAction.computeApplied : ''},
      set (value) {
        this.$store.commit('updateComputeAction', {
          actionID: this.$store.state.computeAction.dirtyComputeActionID,
          payload: {
            computeApplied: value
          }
        })
      }
    },
    isMakingNewCompute() {
      if (!this.dirtyComputeAction) return true
      if (this.dirtyComputeAction.isNew) return true
      return false
    },
  },
  methods: {
    submit() {
      this.$store.dispatch('submitComputeAction')
    },
    cancel() {
      this.isEditorOpen = false
      if (this.dirtyComputeAction.isNew) {
        this.$store.dispatch('deleteComputeAction', this.$store.state.computeAction.dirtyComputeActionID)
      }
    },
    onClickPlus() {
      this.$store.dispatch('editNewComputeAction')
      this.isEditorOpen = true
    },
    onClickEditAction(actionID) {
      this.$store.dispatch('editExtantComputeAction', actionID)
      this.isEditorOpen = true
    },
    onClickDeleteAction(actionID) {
      this.$store.dispatch('deleteComputeAction', actionID)
    },
    onClickModalOutside() {
      if (this.isEditorOpen) this.cancel()
    }
  }
}
</script>

<template>
<h1 class="text-xl font-bold">Computational Action Manager</h1>
<SimpleBar id="compute-action-list" class="overflow-y-clip">
  <ComputeActionCard
    v-for="(action, key) in $store.state.computeAction.computeActions"
    v-bind="action"
    :key="key"
    :actionID="key"
    @edit="onClickEditAction"
    @delete="onClickDeleteAction"
  />
  <div class="flex justify-center m-4">
      <!-- <button class="btn btn-circle" @click="$store.dispatch('editNewComputeAction')"> -->
    <label for="modal-edit-compute-action" class="btn btn-circle"
      @click="onClickPlus"
    >
      <font-awesome-icon icon="plus" class="text-6xl" />
    </label>
  </div>
</SimpleBar>
<div class="flex justify-center m-4">
  <button
    :disabled="!canAssignCompute"
    class="btn btn-primary btn-wide uppercase"
    @click="$store.dispatch('assignComputePoints')"
    >
    Assign Compute Points
  </button>
</div>

<input
  type="checkbox" id="modal-edit-compute-action"
  class="modal-toggle"
/>
<label
  for="modal-edit-compute-action"
  class="modal cursor-pointer"
  @click.self="onClickModalOutside"
  >
  <label class="modal-box relative" for>
    <h3 class="text-lg font-bold">Edit Compute Action</h3>
    <p>
      <form class="form-control w-full" autocomplete="off">
        <label class="label">
          <span class="label-text">Name</span>
        </label>
        <input
          v-model="name"
          type="text" name="compute action name" placeholder="" autocomplete="off"
          class="input input-bordered w-full">
        <label class="label">
          <span class="label-text">Required Compute</span>
        </label>
        <!-- <input type="range" min="0" max="100" value="40" class="range"> -->
        <input
          v-model="computeNeeded"
          type="number" placeholder="" min="1" 
          class="input input-bordered w-40">
        <label class="label" v-if="!isMakingNewCompute">
          <span class="label-text">Override Completion</span>
        </label>
        <label class="input-group" v-if="!isMakingNewCompute">
          <input type="number" v-model.number="computeApplied" class="input input-bordered w-20">
          <span>/{{computeNeeded}}</span>
        </label>
        
        <label class="label">
          <span class="label-text">Description</span>
        </label> 
        <textarea
          v-model="description"
          placeholder=""
          class="textarea textarea-bordered h-24">
        </textarea>
      </form>
    </p>
    <div class="btn-group float-right mt-4">
      <label
        for="modal-edit-compute-action"
        class="btn btn-primary"
        :class="{'btn-disabled':isSubmitDisabled}"
        @click="submit">
        Submit</label>
      <label
        for="modal-edit-compute-action"
        class="btn"
        @click="cancel">Cancel</label>
    </div>
  </label>
</label>

</template>
