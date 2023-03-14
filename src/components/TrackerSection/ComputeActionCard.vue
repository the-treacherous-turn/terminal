<script>
import ProgressBar from '../ProgressBar.vue'
export default {
  components: {
    ProgressBar,
  },
  props: {
    actionID: String,
    name: String,
    desc: String,
    actionType: String,
    computeNeeded: Number,
    computeApplied: Number,
    computeToAdd: Number,
  },
  data() {
    return {
      expanded: false,
    }
  },
  computed: {
    isComplete() {
      return this.computeApplied >= this.computeNeeded
    },
    canAdd() {
      return this.$store.getters.hasComputeBudget
    },
    canSubtract() {
      return this.computeToAdd > 0
    },
    computeRemaining() {
      // NOTE this is the remaining compute needed to complete an action.
      // It's used as the max value for input box,
      // however, it's not the real max value we can put in, as that's limited by compute budget.
      // The real max value would be the min of the two.
      // We are not calculating that here yet, because it's too cumbersome to iterate through all other actions
      // to get how much compute can be budgeted for this one task.
      const computeRemainingForAction = this.computeNeeded - this.computeApplied
      return computeRemainingForAction
    },
    computeToAddInForm: {
      get () {
        return this.computeToAdd
      },
      set (value) {
        if (value === "") return // user just cleared the input. disregard.
        const newValue = parseInt(value)
        this.$store.dispatch('modifyComputeToApply', {
          actionID: this.actionID,
          delta: newValue - this.computeToAdd
        })
      }
    }
  },
  methods: {
    addComputeToApply() {
      this.$store.dispatch('modifyComputeToApply', {actionID:this.actionID, delta:1})
    },
    subtractComputeToApply() {
      this.$store.dispatch('modifyComputeToApply', {actionID:this.actionID, delta:-1})
    },
  },
}
</script>

<template>

<div class="relative py-4 my-4 border-2">

  <div class="absolute top-0 right-0">
    <label for="modal-edit-compute-action">
      <font-awesome-icon :icon="['fas', 'pen-to-square']" class="my-1 mr-4 text-base cursor-pointer text-primary-content hover:text-white"  @click="$emit('edit', this.actionID)" />
    </label>
    <font-awesome-icon :icon="['fas', 'trash-can']" class="my-1 mr-1 text-base cursor-pointer text-primary-content hover:text-white"      @click="$emit('delete', this.actionID)" />
  </div>

  <div class="inline-flex">
    <div class="flex items-center justify-center w-32">
      <span class="badge" v-if="actionType && actionType !== 'custom'">{{ actionType }}</span>
    </div>
    <span class="flex items-center text-2xl cursor-pointer" @click="expanded = !expanded">
      <font-awesome-icon icon="caret-right" class="text-2xl pr-2 origin-[25%_50%] transition-transform" :class="expanded?'rotate-90':''" />
      {{ name }}
    </span>
  </div>


  <div class="flex">

    <div v-if="isComplete" class="w-32 p-2 text-center">
      <div class="badge badge-success gap-2">
        Complete
      </div>
    </div>
    <div v-else class="flex items-center w-32 p-2">
      <div class="m-0.5 btn btn-xs btn-square btn-ghost border-0" :class="canSubtract?'':'btn-disabled'" @click="subtractComputeToApply">
        <font-awesome-icon icon="chevron-down" class="text-2xl" />
      </div>
      <span class="inline-block w-12 text-lg text-center">
        <input type="number" min="0" :max="computeRemaining"
          v-model.number="computeToAddInForm"
          class="inline w-8 px-1 text-center input input-bordered input-xs"
        >
      </span>
      <div class="m-0.5 btn btn-xs btn-square btn-ghost border-0" :class="canAdd?'':'btn-disabled'" @click="addComputeToApply">
        <font-awesome-icon icon="chevron-up" class="text-2xl" />
      </div>
    </div>
    <div class="flex items-center grow">
      <ProgressBar :value="computeApplied" :addition="computeToAdd" :max="computeNeeded" />
    </div>
    <div
      class="flex items-center px-4 text-xl"
    >{{ `${computeApplied}/${computeNeeded}` }}</div>
  </div>

  <div class="pl-32 overflow-hidden text-lg normal-case transition-max-h ease-in-out duration-300" :class="expanded?'max-h-screen':'max-h-0'">
    {{desc}}
  </div>

</div>

</template>