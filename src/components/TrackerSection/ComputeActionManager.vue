<script>
import ComputeActionCard from './ComputeActionCard.vue'
export default {
  components: {
    ComputeActionCard,
  },
  data() {
    return {
      isEditorOpen: false,
    }
  },
  computed: {
    canAssignCompute() {
      return this.$store.getters.computeAvailable > 0 && this.$store.getters.computeToSpend > 0
    },
    // editor
    isSubmitDisabled() {
      return !(this.name && this.computeNeeded)
    },
    dirtyComputeAction() {
      return this.$store.getters.dirtyComputeAction
    },
    actionType: {
      get() { return this.dirtyComputeAction ? this.dirtyComputeAction.actionType : ''},
      set (value) {
        this.$store.commit('updateComputeAction', {
          actionID: this.$store.state.computeAction.dirtyComputeActionID,
          payload: {
            actionType: value,
          }
        })
      }
    },
    // these properties are for upgrades
    upgradeTier: {
      get() { return this.dirtyComputeAction ? this.dirtyComputeAction.upgradeTier : '' },
      set (value) {
        this.$store.commit('updateComputeAction', {
          actionID: this.$store.state.computeAction.dirtyComputeActionID,
          payload: {
            upgradeTier: value,
          }
        })
      }
    },
    upgradeTheoryType: {
      get() { return this.dirtyComputeAction ? this.dirtyComputeAction.upgradeTheoryType : '' },
      set (value) {
        this.$store.commit('updateComputeAction', {
          actionID: this.$store.state.computeAction.dirtyComputeActionID,
          payload: {
            upgradeTheoryType: value,
          }
        })
      }
    },
    existingUpgradeCount: {
      get() { return this.dirtyComputeAction ? this.dirtyComputeAction.existingUpgradeCount : '' },
      set (value) {
        this.$store.commit('updateComputeAction', {
          actionID: this.$store.state.computeAction.dirtyComputeActionID,
          payload: {
            existingUpgradeCount: value,
          }
        })
      }
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
    // calculate default compute based on action type
    // and if it's an improve action,
    // its tier, theory type, and existing upgrade count
    calculateCompute() {
      if (this.actionType === 'custom') return
      const TIER_COST = {
        'same': {
          1: 30,
          2: 150,
          3: 750,
          4: 3750,
        },
        'adjacent': {
          1: 40,
          2: 200,
          3: 1000,
          4: 5000,
        },
        'other': {
          1: 60,
          2: 300,
          3: 1500,
          4: 7500,
        },
      }
      let computeNeeded = 0
      switch (this.actionType) {
        case 'improve':
          const existingMultiplier = Math.max(this.existingUpgradeCount, 1)
          computeNeeded = TIER_COST[this.upgradeTheoryType][this.upgradeTier] * existingMultiplier
          break;
        case 'research':
          computeNeeded = 40
          break;
        case 'anticipate':
          computeNeeded = 50
        default:
          break;
      }
      this.$store.commit('updateComputeAction', {
        actionID: this.$store.state.computeAction.dirtyComputeActionID,
        payload: {
          computeNeeded: computeNeeded
        }
      })
    },
    submit() {
      this.$store.dispatch('submitComputeAction')
      this.isEditorOpen = false

    },
    cancel() {
      this.isEditorOpen = false
      if (this.dirtyComputeAction.isNew) {
        this.$store.dispatch('deleteComputeAction', this.$store.state.computeAction.dirtyComputeActionID)
      } else {
        // TODO wire this up properly so that cancel reverts changes
        this.submit()
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
    },
    saveScrollPos(e) {
      this.$store.commit('setComputeActionScrollPos', e.target.scrollTop)
    },
  },
  mounted() {
    this.$nextTick(() => {
      this.$refs.scroller.scrollTop = this.$store.state.computeAction.scrollPos
    })
  },
}
</script>

<template>
<h1 class="text-xl font-bold">Computational Action Manager</h1>
<div id="compute-action-list" class="overflow-y-scroll" ref="scroller" @scroll.passive="saveScrollPos">
  <ComputeActionCard
    v-for="(action, key) in $store.state.computeAction.computeActions"
    v-bind="action"
    :key="key"
    :actionID="key"
    @edit="onClickEditAction"
    @delete="onClickDeleteAction"
  />
  <div class="flex justify-center m-4">
    <label for="modal-edit-compute-action" class="btn btn-circle"
    @click="onClickPlus"
    >
      <font-awesome-icon icon="plus" class="text-6xl" />
    </label>
  </div>
</div>
<div class="flex justify-center m-4">
  <button
    :disabled="!canAssignCompute"
    class="btn btn-primary btn-wide uppercase"
    @click="$store.dispatch('assignComputePoints')"
    >
    Assign Compute Points
  </button>
</div>
<label
  v-if="isEditorOpen"
  class="fixed w-[100%] h-[100vh] top-0 left-0 flex justify-center items-center cursor-pointer bg-white bg-opacity-10 z-50"
  @mousedown.self="onClickModalOutside"
  >
  <label class="modal-box relative">
    <h3 class="text-lg font-bold">Edit Compute Action</h3>
    <p>
      <form class="form-control w-full" autocomplete="off">
        <label class="label">
          <span class="label-text">Type</span>
        </label>
        <select v-model="actionType" class="select select-bordered capitalize" @change="calculateCompute">
          <option selected>custom</option>
          <option>research</option>
          <option>improve</option>
          <option>anticipate</option>
        </select>
        <label class="label">
          <span class="label-text">Name</span>
        </label>
        <input
          v-model="name"
          type="text" name="compute action name" placeholder="" autocomplete="off"
          class="input input-bordered w-full">

        <div v-if="actionType === 'improve'" class="inline-flex">
          <div class="pr-8">
            <label class="label">
              <span class="label-text">Upgrade Tier</span>
            </label>
            <select v-model.number="upgradeTier" class="select select-bordered" @change="calculateCompute">
              <option value="1">Tier 1</option>
              <option value="2">Tier 2</option>
              <option value="3">Tier 3</option>
              <option value="4">Tier 4</option>
            </select>
          </div>

          <div>
            <label class="label">
              <span class="label-text">Upgrade Compatibility</span>
            </label>
            <select v-model="upgradeTheoryType" class="select select-bordered capitalize" @change="calculateCompute">
              <option value="same">same theory</option>
              <option value="adjacent">adjacent theory</option>
              <option value="other">other theory</option>
            </select>
          </div>
        </div>

        <div v-if="actionType === 'improve'">
          <label class="label">
            <span class="label-text"># of previously allocated upgrades</span>
          </label>
          <input
            v-model.number="existingUpgradeCount"
            @input="calculateCompute"
            type="number" min="0" name="allocation" placeholder="" autocomplete="off"
            class="input input-bordered w-40">
        </div>

        <div class="inline-flex">
          <div class="pr-8">
            <label class="label">
              <span class="label-text">Required Compute</span>
            </label>
            <!-- <input type="range" min="0" max="100" value="40" class="range"> -->
            <input
              v-model="computeNeeded"
              type="number" placeholder="" min="1"
              class="input input-bordered w-40">
          </div>
          <div>
            <label class="label" v-if="!isMakingNewCompute">
              <span class="label-text">Override Completion</span>
            </label>
            <label class="input-group" v-if="!isMakingNewCompute">
              <input type="number" v-model.number="computeApplied" class="input input-bordered w-20">
              <span>/{{computeNeeded}}</span>
            </label>
          </div>
        </div>
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
