<script>
import ProgressBar from './ProgressBar.vue'
export default {
  components: {
    ProgressBar,
  },
  props: {
    actionID: String,
    name: String,
    desc: String,
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
  },
  methods: {
    addComputeToApply() {
      this.$store.dispatch('addComputeToApply', this.actionID)
    },
    subtractComputeToApply() {
      this.$store.dispatch('subtractComputeToApply', this.actionID)
    },
  },
}
</script>

<template>

<div class="relative my-4 py-4 border-2">

  <div class="dropdown dropdown-end absolute right-0 top-0">
    <span tabindex="0" class="badge badge-secondary">
      <font-awesome-icon icon="ellipsis-vertical" class="text-base" />
    </span>
    <ul tabindex="0" class="dropdown-content menu p-2 shadow bg-base-100 rounded-box w-52">
      <li @click="$emit('edit', this.actionID)">
        <label for="modal-edit-compute-action">
          <a>Edit</a>
        </label>
      </li>
      <li @click="$emit('delete', this.actionID)">
        <a>Delete</a>
      </li>
    </ul>
  </div>

  <div class="pl-28">
    <span class="text-2xl flex items-center cursor-pointer" @click="expanded = !expanded">
      <font-awesome-icon icon="caret-right" class="text-2xl pr-2 origin-[25%_50%] transition-transform" :class="expanded?'rotate-90':''" />
      {{ name }}
    </span>
  </div>


  <div class="flex">

    <div v-if="isComplete" class="p-2 w-28 text-center">
      <div class="badge badge-success gap-2">
        Complete
      </div>
    </div>
    <div v-else class="p-2 flex items-center w-28">
      <div class="m-0.5 btn btn-xs btn-square btn-ghost" :class="canSubtract?'':'btn-disabled'" @click="subtractComputeToApply">
        <font-awesome-icon icon="chevron-down" class="text-2xl" />
      </div>
      <span class="text-lg w-9 text-center inline-block">+ {{ computeToAdd }}</span>
      <div class="m-0.5 btn btn-xs btn-square btn-ghost" :class="canAdd?'':'btn-disabled'" @click="addComputeToApply">
        <font-awesome-icon icon="chevron-up" class="text-2xl" />
      </div>
    </div>
    <div class="flex grow items-center">
      <ProgressBar :value="computeApplied" :addition="computeToAdd" :max="computeNeeded" />
    </div>
    <div
      class="flex items-center text-xl px-4"
    >{{ `${computeApplied}/${computeNeeded}` }}</div>
  </div>

  <div class="pl-28 normal-case text-lg overflow-hidden transition-max-h ease-in-out duration-300" :class="expanded?'max-h-screen':'max-h-0'">
    {{desc}}
  </div>

</div>

</template>