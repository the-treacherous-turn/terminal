<script>
import { mapGetters } from "vuex";
import draggable from "vuedraggable";

export default {
  data() {
    return {
      isEditorOpen: false,
      isAddNewInsight: false,
      editorInsight: { type: "standard" },
      editorInsightID: null,
    };
  },
  components: {
    draggable,
  },
  computed: {
    ...mapGetters({
      activeSpec: "activeSpec",
      keysOfInsights: "keysOfInsights",
    }),
    isSubmitDisabled() {
      return !this.editorInsight.name;
    },
  },
  methods: {
    typeAbbr(type) {
      switch (type) {
        case "standard":
          return "";
        case "technological":
          return "tech";
        case "linguistic":
          return "lang";
        default:
          return "";
      }
    },
    onClickAdd() {
      this.isEditorOpen = true;
      this.isAddNewInsight = true;
    },
    onClickEdit(key) {
      this.isEditorOpen = true;
      this.isAddNewInsight = false;
      this.editorInsightID = key;
      this.editorInsight = this.activeSpec.insights[key];
    },
    onClickDelete(key) {
      this.$store.dispatch("deleteInsight", key);
    },
    onClickModalOutside() {
      if (this.isEditorOpen) this.cancel();
    },
    submit() {
      if (this.isAddNewInsight) {
        this.$store.dispatch("addInsight", this.editorInsight);
      } else {
        this.$store.dispatch("editInsight", {
          id: this.editorInsightID,
          insight: this.editorInsight,
        });
      }
      this.editorInsight = { type: "standard" };
      this.editorInsightID = null;
      this.isEditorOpen = false;
      this.isAddNewInsight = false;
    },
    cancel() {
      this.editorInsight = { type: "standard" };
      this.editorInsightID = null;
      this.isAddNewInsight = false;
      this.isEditorOpen = false;
    },
    insightMove(keys) {
      this.$store.dispatch("insightKeys", keys);
    },
  },
};
</script>

<template>
  <h2 class="pb-2 text-2xl font-bold">Insights</h2>
  <ul>
    <draggable
      :list="keysOfInsights"
      class="w-full"
      @change="keysOfInsights !== [] ? insightMove(keysOfInsights) : ''"
      item-key="id"
    >
      <template #item="{ element }" :key="key">
        <li
          class="flex items-center content-start mt-4 collapse bg-base-100 group"
        >
          <h3 class="mr-2 text-xl font-bold badge">
            <span
              v-if="
                activeSpec.insights[element].range &&
                typeAbbr(activeSpec.insights[element].type)
              "
              class="capitalize whitespace-pre"
              >{{ activeSpec.insights[element].range }}
              {{ typeAbbr(activeSpec.insights[element].type) }}:
            </span>
            <span
              v-else-if="activeSpec.insights[element].range"
              class="capitalize whitespace-pre"
              >{{ activeSpec.insights[element].range }}:
            </span>
            <span
              v-else-if="typeAbbr(activeSpec.insights[element].type)"
              class="capitalize whitespace-pre"
              >{{ typeAbbr(activeSpec.insights[element].type) }}:
            </span>
            {{ activeSpec.insights[element].name }}
          </h3>
          <div class="hidden group-hover:inline">
            <label for="modal-edit-insight">
              <font-awesome-icon
                :icon="['fas', 'pen-to-square']"
                class="my-1 mr-4 text-base cursor-pointer text-primary-content hover:text-white"
                @click="onClickEdit(element)"
              />
            </label>
            <font-awesome-icon
              :icon="['fas', 'trash-can']"
              class="my-1 mr-1 text-base cursor-pointer text-primary-content hover:text-white"
              @click="onClickDelete(element)"
            />
          </div>
        </li>
      </template>
    </draggable>
    <!-- a list item for each insight -->
  </ul>
  <label
    for="modal-edit-insight"
    class="mt-2 btn btn-secondary btn-xs"
    @click="onClickAdd"
    >+ Add Insights</label
  >
  <!-- <input
  type="checkbox" id="modal-edit-insight"
  class="modal-toggle"
/> -->
  <label
    v-if="isEditorOpen"
    for="modal-edit-insight"
    class="fixed w-[100%] h-[100vh] top-0 left-0 flex justify-center items-center cursor-pointer bg-white bg-opacity-10 z-50"
    @mousedown.self="onClickModalOutside"
  >
    <label class="relative modal-box">
      <h3 class="text-lg font-bold">
        {{ isAddNewInsight ? "Add" : "Edit" }} Insight
      </h3>
      <form class="w-full form-control" autocomplete="off">
        <label class="label label-text">Name</label>
        <input
          v-model="editorInsight.name"
          type="text"
          placeholder=""
          autocomplete="off"
          class="w-full max-w-xs input input-bordered"
        />
        <div class="grid grid-cols-2 gap-8">
          <div>
            <label class="label label-text">Range</label>
            <select
              v-model="editorInsight.range"
              class="w-full capitalize select select-bordered"
            >
              <option>narrow</option>
              <option>broad</option>
            </select>
          </div>
          <div>
            <label class="label label-text">Type</label>
            <select
              v-model="editorInsight.type"
              class="w-full capitalize select select-bordered"
            >
              <option selected>standard</option>
              <option>technological</option>
              <option>linguistic</option>
            </select>
          </div>
        </div>

        <div class="flex justify-end mt-4 btn-group">
          <label
            for="modal-edit-insight"
            class="btn btn-primary"
            :class="{ 'btn-disabled': isSubmitDisabled }"
            @click="submit"
          >
            Submit</label
          >
          <label for="modal-edit-insight" class="btn" @click="cancel"
            >Cancel</label
          >
        </div>
      </form>
    </label>
  </label>
</template>
