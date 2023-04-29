<script>
import ComputeActionCard from './ComputeActionCard.vue'
import draggable from "vuedraggable";
import { mapGetters, mapState } from 'vuex';

export default {
  components: {
    ComputeActionCard,
    draggable
  },
  data() {
    return {
    }
  },
  computed: {
    ...mapGetters({
        keysOfComputeActions: "keysOfComputeActions",
    }),
    ...mapState({
        computeActions: (state) => state.computeAction.computeActions,
    }),
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
      this.$store.commit('closeComputeActionEditor')

    },
    cancel() {
      this.$store.commit('closeComputeActionEditor')
      if (this.dirtyComputeAction.isNew) {
        this.$store.dispatch('deleteComputeAction', this.$store.state.computeAction.dirtyComputeActionID)
      } else {
        // TODO wire this up properly so that cancel reverts changes
        this.submit()
      }
    },
    onClickEditAction(actionID) {
      this.$store.dispatch('editExtantComputeAction', actionID)
      this.$store.commit('openComputeActionEditor')
    },
    onClickDeleteAction(actionID) {
      if (!window.confirm(`Are you sure you want to delete this Computational Action?`)) return
      this.$store.dispatch('deleteComputeAction', actionID)
    },
    onClickModalOutside() {
      if (this.$store.state.computeAction.isEditorOpen) this.cancel()
    },
    saveScrollPos(e) {
      this.$store.commit('setComputeActionScrollPos', e.target.scrollTop)
    },
    computeActionMove(keys) {
      this.$store.dispatch("computeActionKeys", keys);
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
<h1 class="text-2xl">Computational Actions</h1>
<div id="compute-action-list" class="overflow-y-scroll" ref="scroller" @scroll.passive="saveScrollPos">
    <draggable
      :list="keysOfComputeActions"
      class="w-full"
      @change="keysOfComputeActions !== [] ? computeActionMove(keysOfComputeActions) : ''"
      item-key="id"
    >
    <template #item="{ element }" :key="key">
        <ComputeActionCard
        v-bind="computeActions[element]"
        :key="element"
        :actionID="element"
        @edit="onClickEditAction"
        @delete="onClickDeleteAction"
        />
    </template>
    </draggable>
</div>
<div class="flex justify-center m-4">
  <button
    :disabled="!canAssignCompute"
    class="uppercase btn btn-primary btn-wide"
    @click="$store.dispatch('assignComputePoints')"
    >
    Assign Compute Points
  </button>
</div>
<label
  v-if="$store.state.computeAction.isEditorOpen"
  class="fixed w-[100%] h-[100vh] top-0 left-0 flex justify-center items-center cursor-pointer bg-white bg-opacity-10 z-50"
  @mousedown.self="onClickModalOutside"
  >
  <label class="relative modal-box">
    <h3 class="text-lg font-bold">Edit Compute Action</h3>
    <p>
      <form class="w-full form-control" autocomplete="off">
        <label class="label">
          <span class="label-text">Type</span>
        </label>
        <select v-model="actionType" class="capitalize select select-bordered" @change="calculateCompute">
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
          class="w-full input input-bordered">

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
            <select v-model="upgradeTheoryType" class="capitalize select select-bordered" @change="calculateCompute">
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
            class="w-40 input input-bordered">
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
              class="w-40 input input-bordered">
          </div>
          <div>
            <label class="label" v-if="!isMakingNewCompute">
              <span class="label-text">Override Completion</span>
            </label>
            <label class="input-group" v-if="!isMakingNewCompute">
              <input type="number" v-model.number="computeApplied" class="w-20 input input-bordered">
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
          class="h-24 textarea textarea-bordered">
        </textarea>
      </form>
    </p>
    <div class="float-right mt-4 btn-group">
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
