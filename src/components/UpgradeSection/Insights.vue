<script>
import {mapGetters} from 'vuex'

export default {
  data () {
    return {
      isEditorOpen: false,
      isAddNewInsight: false,
      editorInsight: {},
      insightID: null,
    }
  },
  computed: {
    ...mapGetters({
      activeSpec: 'activeSpec',
    }),
    isSubmitDisabled () {
      return !this.editorInsight.name
    },
  },
  methods: {
    onClickAdd() {
      this.isEditorOpen = true
      this.isAddNewInsight = true
    },
    onClickEdit(key) {
      this.isEditorOpen = true
      this.isAddNewInsight = false
      this.insightID = key
      this.editorInsight = this.activeSpec.insights[key]
    },
    onClickDelete(key) {
      this.$store.dispatch('deleteInsight', key)
    },
    onClickModalOutside() {
      if (this.isEditorOpen) this.cancel()
    },
    submit() {
      if (this.isAddNewInsight) {
        this.$store.dispatch('addInsight', this.editorInsight)
      } else {
        // TODO make sure there is an insight ID
        this.$store.dispatch('editInsight', {
          id: this.insightID,
          insight: this.editorInsight,
        })
      }
      this.editorInsight = {}
      this.isEditorOpen = false
      this.isAddNewInsight = false
    },
    cancel() {
      this.editorInsight = {}
      this.isAddNewInsight = false
      this.isEditorOpen = false
    },
  },
}
</script>

<template>
<h2 class="text-2xl font-bold pb-2">Insights</h2>
<ul>
  <!-- a list item for each insight -->
  <li v-for="(insight, key) in activeSpec.insights" :key="key" class="group">
    <h3 class="text-xl font-bold badge capitalize mr-2">{{ insight.range }} {{ insight.type }}: {{ insight.name }}</h3>
    <div class="hidden group-hover:inline">
      <label for="modal-edit-insight">
        <font-awesome-icon
          :icon="['fas', 'pen-to-square']"
          class="text-base text-primary-content mr-1 my-1 cursor-pointer hover:text-white"
          @click="onClickEdit(key)"
        />
      </label>
      <font-awesome-icon
        :icon="['fas', 'trash-can']"
        class="text-base text-primary-content mr-1 my-1 cursor-pointer hover:text-white"
        @click="onClickDelete(key)"
      />
    </div>

  </li>
</ul>
<label for="modal-edit-insight" class="btn btn-secondary btn-xs mt-2" @click="onClickAdd">+ Add Insights</label>
<input
  type="checkbox" id="modal-edit-insight"
  class="modal-toggle"
/>
<label
  for="modal-edit-insight"
  class="modal cursor-pointer"
  @click.self="onClickModalOutside"
>
  <label class="modal-box relative">
    <h3 class="text-lg font-bold">Edit Insight</h3>
    <form class="form-control w-full" autocomplete="off">
      <label class="label label-text">Name</label>
      <input
        v-model="editorInsight.name"
        type="text" placeholder="" autocomplete="off"
        class="input input-bordered w-full max-w-xs">
      <label class="label label-text">Range</label>
      <select v-model="editorInsight.range" class="select select-bordered max-w-xs capitalize">
        <option>narrow</option>
        <option>broad</option>
      </select>
      <label class="label label-text">Type</label>
      <select v-model="editorInsight.type" class="select select-bordered max-w-xs capitalize">
        <option>standard</option>
        <option>technological</option>
        <option>linguistic</option>
      </select>
      

      <div class="btn-group flex justify-end mt-4">
        <label
          for="modal-edit-insight"
          class="btn btn-primary"
          :class="{'btn-disabled':isSubmitDisabled}"
          @click="submit">
          Submit</label>
        <label
          for="modal-edit-insight"
          class="btn"
          @click="cancel">Cancel</label>
      </div>
    </form>
  </label>
</label>
</template>