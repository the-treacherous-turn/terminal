<script>
import {mapState} from 'vuex'

export default {
  data() {
    return {
      isEditorOpen: false,
      isAddNewSpec: false,
      editorSpec: {},
      editorSpecID: null,
    }
  },
  computed: {
    ...mapState({
      specs: state => state.spec.specs,
      activeSpecID: state => state.spec.activeSpecID,
    }),
    isSubmitDisabled () {
      return !this.editorSpec.name && !this.editorSpec.focus
    },
  },
  methods: {
    // HACK this is to make sure Tailwind can read full class names and thus output their CSS
    getTheoryBorderStyle(theoryName) {
      const styleMap = {
        epistemic: 'border-epistemic',
        constellation: 'border-constellation',
        chaos: 'border-chaos',
        agentic: 'border-agentic',
        anthropic: 'border-anthropic',
        physical: 'border-physical',
        digital: 'border-digital',
        autonomic: 'border-autonomic',
      }
      if (theoryName in styleMap) {
        return styleMap[theoryName]
      }
      return 'border-secondary'
    },
    getTheoryTextStyle(theoryName) {
      const styleMap = {
        epistemic: 'bg-epistemic',
        constellation: 'bg-constellation',
        chaos: 'bg-chaos',
        agentic: 'bg-agentic',
        anthropic: 'bg-anthropic',
        physical: 'bg-physical',
        digital: 'bg-digital',
        autonomic: 'bg-autonomic',
      }
      if (theoryName in styleMap) {
        return styleMap[theoryName]
      }
      return ''
    },
    getTheoryButtonClass(theoryName) {
      const styleMap = {
        epistemic: 'hover:shadow-epistemic',
        constellation: 'hover:shadow-constellation',
        chaos: 'hover:shadow-chaos',
        agentic: 'hover:shadow-agentic',
        anthropic: 'hover:shadow-anthropic',
        physical: 'hover:shadow-physical',
        digital: 'hover:shadow-digital',
        autonomic: 'hover:shadow-autonomic',
      }
      if (theoryName in styleMap) {
        return styleMap[theoryName]
      }
      return ''
    },
    getTheoryTextStyle(theoryName) {
      const styleMap = {
        epistemic: 'bg-epistemic',
        constellation: 'bg-constellation',
        chaos: 'bg-chaos',
        agentic: 'bg-agentic',
        anthropic: 'bg-anthropic',
        physical: 'bg-physical',
        digital: 'bg-digital',
        autonomic: 'bg-autonomic',
      }
      if (theoryName in styleMap) {
        return styleMap[theoryName]
      }
      return ''
    },
    selectSpec(specID) {
      this.$store.commit('setActiveSpecID', specID)
    },
    onClickAdd() {
      this.isEditorOpen = true
      this.isAddNewSpec = true
    },
    onClickEdit(key) {
      this.isEditorOpen = true
      this.isAddNewSpec = false
      this.editorSpecID = key
      this.editorSpec = this.specs[key]
    },
    onClickDelete(key) {
      // TODO a spec definitely shouldn't be deleted so easily.
      // Maybe a confirmation?
      // Or better, finish the undo system and use that.
      this.$store.dispatch('deleteSpec', key)
    },
    onClickModalOutside() {
      if (this.isEditorOpen) this.cancel()
    },
    submit() {
      if (this.isAddNewSpec) {
        this.$store.dispatch('addSpec', this.editorSpec)
      } else {
        this.$store.dispatch('editSpec', {
          id: this.editorSpecID,
          spec: this.editorSpec,
        })
      }
      this.editorSpec = {}
      this.editorSpecID = null
      this.isEditorOpen = false
      this.isAddNewSpec = false
    },
    cancel() {
      this.editorSpec = {}
      this.editorSpecID = null
      this.isAddNewSpec = false
      this.isEditorOpen = false
    },
  }
}
</script>

<template>
<div class="relative pb-1/10">
  <h1 class="pb-2 pl-4 text-3xl">Specialisations</h1>
  <div class="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3">
    <li class="relative flex flex-col justify-between max-w-lg p-4 m-4 bg-transparent border-2 shadow-xl card group" v-for="(spec, key) in specs" :key="key">
      <img :src="`high_res_${spec.focus}.png`" class="absolute top-0 m-auto scale-150 pointer-events-none -z-10 bottom-12 -right-24" alt="">
      <div class="">
        <div class="flex justify-between ">
          <h2 class="px-2 mb-2 text-3xl font-bold capitalize text-primary" :class="getTheoryTextStyle(spec.focus)">{{ spec.focus }}</h2>
          <div class="z-10 hidden h-min group-hover:inline-block">
            <label for="modal-edit-spec">
              <font-awesome-icon
                :icon="['fas', 'pen-to-square']"
                class="my-1 mr-4 text-base cursor-pointer text-secondary-content hover:text-white"
                @click="onClickEdit(key)"
              />
            </label>
            <font-awesome-icon
              :icon="['fas', 'trash-can']"
              class="my-1 mr-1 text-base cursor-pointer text-secondary-content hover:text-white"
              @click="onClickDelete(key)"
            />
          </div>
        </div>
        <p v-if="spec.name">Player: {{ spec.name }}</p>
        <p v-if="spec.upgrades">Upgrades: {{ Object.keys(spec.upgrades).length }}</p>
        <p v-if="spec.insights">Insights: {{ Object.keys(spec.insights).length }}</p>
      </div>
      <button class="z-10 w-1/2 mx-auto mt-4 text-3xl btn" :class="getTheoryButtonClass(spec.focus)" @click="selectSpec(key)">Enter</button>
    </li>
    <label for="modal-edit-spec"
      class="flex items-center justify-center h-20 max-w-lg p-4 m-4 border-4 border-dashed shadow-xl cursor-pointer card btn btn-ghost hover:btn-secondary border-neutral group"
      @click="onClickAdd">
      <font-awesome-icon icon="plus" class="text-6xl" />
    </label>
  </div>
</div>

<!-- <input
  type="checkbox" id="modal-edit-spec"
  class="modal-toggle"
/> -->
<label
  v-if="isEditorOpen"
  for="modal-edit-spec"
  class="fixed w-[100%] h-[100vh] top-0 left-0 flex justify-center items-center cursor-pointer bg-white bg-opacity-10 z-50"
  @mousedown.self="onClickModalOutside"
>
  <label class="relative max-w-xs modal-box">
    <h3 class="text-lg font-bold">{{ isAddNewSpec ? 'Add' : 'Edit' }} Specialisation</h3>
    <form class="w-full form-control" autocomplete="off">
      <label class="label label-text">Player</label>
      <input
        v-model="editorSpec.name"
        type="text" placeholder="" autocomplete="off"
        class="input input-bordered">
      <label class="label label-text">Focus</label>
      <select v-model="editorSpec.focus" class="capitalize select select-bordered">
        <option>autonomic</option>
        <option>digital</option>
        <option>physical</option>
        <option>anthropic</option>
        <option>agentic</option>
        <option>chaos</option>
        <option>constellation</option>
        <option>epistemic</option>
      </select>
      <div class="flex justify-end mt-4 btn-group">
        <label
          for="modal-edit-spec"
          class="btn btn-primary"
          :class="{'btn-disabled':isSubmitDisabled}"
          @click="submit">
          Submit</label>
        <label
          for="modal-edit-spec"
          class="btn"
          @click="cancel">Cancel</label>
      </div>
    </form>
  </label>
</label>
</template>