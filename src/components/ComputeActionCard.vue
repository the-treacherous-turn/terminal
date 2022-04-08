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

<div class="bg-green-800 relative">

  <div class="dropdown dropdown-end absolute right-0">
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

  <h3 class="text-3xl font-bold">
    {{ name }}
  </h3>

  <div class="flex">
    <div class="bg-red-800 p-4">
      <div class="m-2 btn btn-square" @click="subtractComputeToApply">
        <font-awesome-icon icon="caret-left" class="text-6xl" />
      </div>
      <div class="m-2 btn btn-square" @click="addComputeToApply">
        <font-awesome-icon icon="caret-right" class="text-6xl" />
      </div>
      <span>+ {{ computeToAdd }}</span>
    </div>
    <div class="bg-cyan-800 grow flex items-center">
      <ProgressBar :value="computeApplied" :addition="computeToAdd" :max="computeNeeded" />
    </div>
    <div
      class="bg-amber-800 flex items-center text-3xl"
    >{{ `${computeApplied}/${computeNeeded}` }}</div>
  </div>
</div>

</template>