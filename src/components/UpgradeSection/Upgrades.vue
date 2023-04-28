<script>
import { mapGetters } from "vuex";
import theoryUpgrades from "../../theoryUpgradeData";
import draggable from "vuedraggable";
import Editor from '@tinymce/tinymce-vue'

export default {
  data() {
    return {
      PRESET_THEORIES : ['autonomic', 'digital', 'physical', 'anthropic', 'agentic', 'chaos', 'constellation', 'epistemic'],
      isEditorOpen: false,
      isEditingDescription: false,
      isAddNewUpgrade: false,
      editorUpgrade: {},
      editorUpgradeID: null,
    };
  },
  components: {
    draggable,
    'tinymce-editor': Editor,
  },
  computed: {
    ...mapGetters({
      activeSpec: "activeSpec",
      keysOfUpgrades: "keysOfUpgrades",
    }),
    isSubmitDisabled() {
      return !this.editorUpgrade.name;
    },
    canShowAvailableUpgrades() {
      return (
        this.editorUpgrade.theory && this.editorUpgrade.theory !== "custom"
      );
    },
    upgradesAvailable() {
      if (!this.canShowAvailableUpgrades) return [];
      return theoryUpgrades[this.editorUpgrade.theory].upgrades[
        this.editorUpgrade.tier
      ];
    },
  },
  methods: {
    selectFirstUpgrade(tier) {
      // get the first upgrade in the tier
      const upgrade = theoryUpgrades[this.editorUpgrade.theory].upgrades[tier][0];
      this.setEditorUpgrade(upgrade, this.editorUpgrade.theory, tier);
    },
    onClickAdd() {
      this.isEditorOpen = true;
      this.isAddNewUpgrade = true;
      this.editorUpgrade = { tier: "1", theory: this.activeSpec.focus };
      this.selectFirstUpgrade("1");
    },
    onClickEdit(key) {
      this.isEditorOpen = true;
      this.isAddNewUpgrade = false;
      this.editorUpgradeID = key;
      this.editorUpgrade = this.activeSpec.upgrades[key];
    },
    onClickDelete(key) {
      if (!window.confirm(`Are you sure you want to delete this Upgrade?`)) return
      this.$store.dispatch("deleteUpgrade", key);
    },
    onClickModalOutside() {
      if (this.isEditorOpen) this.cancel();
    },
    onInputUpgradeName() {
      this.editorUpgrade.theory = "custom";
      this.editorUpgrade.tier = '';
    },
    setUpgradeToCustom() {
      this.editorUpgrade.theory = "custom";
      this.editorUpgrade.tier = '';
    },
    setEditorUpgrade(upgrade, theory, tier) {
      this.editorUpgrade = {
        ...upgrade,
        theory,
        tier,
      };
      // if upgrade.flavor exists, prepend its content to the description
      // HACK this is a bandaid to make sure we include the flavor text.
      if (upgrade.flavor) {
        this.editorUpgrade.description = `${upgrade.flavor} ${this.editorUpgrade.description}`;
      }
    },
    submit() {
      if (this.isAddNewUpgrade) {
        this.$store.dispatch("addUpgrade", this.editorUpgrade);
      } else {
        this.$store.dispatch("editUpgrade", {
          id: this.editorUpgradeID,
          upgrade: this.editorUpgrade,
        });
      }
      this.editorUpgrade = {};
      this.editorUpgradeID = null;
      this.isEditorOpen = false;
      this.isAddNewUpgrade = false;
      this.isEditingDescription = false
    },
    cancel() {
      this.editorUpgrade = {};
      this.editorUpgradeID = null;
      this.isAddNewUpgrade = false;
      this.isEditorOpen = false;
      this.isEditingDescription = false
    },
    upgradeMove(keys) {
      this.$store.dispatch("updateKeys", keys);
    },
    decorateDescription(desc) {
      const CAPPED_THEORIES = this.PRESET_THEORIES.map(theory => theory.charAt(0).toUpperCase() + theory.slice(1).toLowerCase())
      const regex = new RegExp('\\b(' + CAPPED_THEORIES.join('|') + ')\\b', 'g')
      const decoratedDesc = desc.replace(regex, (match) => {
        const theoryName = match.toLowerCase()
        return `<span class="text-highlight-${theoryName}">${match}</span>`
      })
      return decoratedDesc
    },
  },
};
</script>

<template>
  <h2 class="pb-2 text-2xl font-bold">Upgrades</h2>
  <!-- <ul class="grid grid-cols-1 mb-4 gap-x-4 sm:grid-cols-2 lg:grid-cols-3"> -->
  <ul class="mb-4">
    <draggable
      :list="keysOfUpgrades"
      class="w-full"
      @change="keysOfUpgrades !== [] ? upgradeMove(keysOfUpgrades) : ''"
      item-key="id"
    >
      <template #item="{ element }" :key="key">
        <li class="items-end content-start max-w-lg pr-16 overflow-visible collapse bg-base-100 group">
          <h3
            class="relative min-h-0 px-0 py-1 overflow-visible text-xl capitalize max-h-8 collapse-title"
          >
            <div class="relative flex items-center px-2 py-1 overflow-visible bg-secondary">
              <!-- a visual indicator for the upgrade's theory and tier. -->
              <!-- It displays x slashes with the color of the theory, where x is the tier number. -->
              <span v-if="activeSpec.upgrades[element].tier">T{{activeSpec.upgrades[element].tier}}</span>
              <div
                class="flex mx-2 text-3xl bg-inherit"
                :class="
                  Number(activeSpec.upgrades[element].tier) === 4
                    ? 'max-w-[1.5em]'
                    : ''
                "
                v-if="activeSpec.upgrades[element].tier"
              >
                <span
                  v-for="i in Number(activeSpec.upgrades[element].tier)"
                  :key="i"
                  class="w-1 text-base font-bold"
                  :class="`text-${activeSpec.upgrades[element].theory}`"
                  >/
                </span>
              </div>
              <span>
                {{ activeSpec.upgrades[element].name }}
              </span>
              <span class="absolute right-4">
                <font-awesome-icon icon="chevron-down" class="text-2xl" />
              </span>
              <div
                class="absolute z-10 hidden -right-16 group-hover:inline"
              >
                <label for="modal-edit-upgrade">
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
            </div>
          </h3>
          <input type="checkbox" class="" />
          <div class="p-0 collapse-content">
            <!-- Use badges to display the upgrade's theory and tier -->
            <span
              v-if="activeSpec.upgrades[element].theory !== 'custom'"
              class="mr-1 font-bold badge badge-sm text-primary"
              :class="`bg-${activeSpec.upgrades[element].theory}`"
              >{{ activeSpec.upgrades[element].theory }}</span
            >
            <span
              v-if="activeSpec.upgrades[element].tier"
              class="mr-1 font-bold text-white badge badge-sm"
              >tier {{ activeSpec.upgrades[element].tier }}</span
            >
            <p class="text-lg" v-html="decorateDescription(activeSpec.upgrades[element].description)"></p>
          </div>
        </li>
      </template>
    </draggable>
  </ul>
  <label
    for="modal-edit-upgrade"
    class="mt-2 mb-8 btn btn-secondary btn-xs"
    @click="onClickAdd"
    >+ Add Upgrades</label
  >
  <!-- <input
  type="checkbox" id="modal-edit-upgrade"
  class="modal-toggle"
/> -->
  <label
    v-if="isEditorOpen"
    for="modal-edit-upgrade"
    class="fixed w-[100%] h-[100vh] top-0 left-0 flex justify-center items-center cursor-pointer bg-white bg-opacity-10 z-50"
    @mousedown.self="onClickModalOutside"
  >
    <label class="relative max-w-3xl overflow-y-scroll modal-box">
      <h3 class="text-lg font-bold">
        {{ isAddNewUpgrade ? "Add" : "Edit" }} Upgrade
      </h3>
      <form class="w-full form-control" autocomplete="off">
        <label class="label label-text">Theory</label>
        <select
          v-model="editorUpgrade.theory"
          class="w-full max-w-xs capitalize select select-bordered"
        >
          <option disabled selected>Pick Theory</option>
          <option v-for="theory in PRESET_THEORIES" :key="theory">
            {{ theory }}
          </option>
          <option>custom</option>
        </select>

        <div v-if="canShowAvailableUpgrades">
          <label class="label label-text">Available Upgrades</label>
          <div class="mb-2 btn-group">
            <input
              type="radio"
              name="tier"
              v-model="editorUpgrade.tier"
              data-title="T1"
              value="1"
              class="btn btn-sm"
              @click="selectFirstUpgrade(1)"
            />
            <input
              type="radio"
              name="tier"
              v-model="editorUpgrade.tier"
              data-title="T2"
              value="2"
              class="btn btn-sm"
              @click="selectFirstUpgrade(2)"
            />
            <input
              type="radio"
              name="tier"
              v-model="editorUpgrade.tier"
              data-title="T3"
              value="3"
              class="btn btn-sm"
              @click="selectFirstUpgrade(3)"
            />
            <input
              type="radio"
              name="tier"
              v-model="editorUpgrade.tier"
              data-title="T4"
              value="4"
              class="btn btn-sm"
              @click="selectFirstUpgrade(4)"
            />
          </div>
        </div>

        <div class="btn-group btn-group-vertical">
          <template v-for="upgrade in upgradesAvailable" :key="upgrade.name">
            <div
              class="w-full btn btn-xs"
              :class="editorUpgrade.name === upgrade.name && 'btn-inverted hover:bg-grey hover:text-darkgray'"
              @click="
                setEditorUpgrade(
                  upgrade,
                  editorUpgrade.theory,
                  editorUpgrade.tier
                )
              "
            >
              {{ upgrade.name }}
            </div>
          </template>
        </div>

        <label class="label label-text">Name</label>
        <input
          v-model="editorUpgrade.name"
          type="text"
          placeholder=""
          autocomplete="off"
          class="w-full max-w-xs input input-bordered"
          @input="onInputUpgradeName"
        />

        <label class="label label-text">
          <span>Description</span>
        </label>
        <div
          v-if="!isEditingDescription"
          v-html="decorateDescription(editorUpgrade.description)"
          class="p-4 border cursor-text"
          @click="isEditingDescription = true"
        ></div>
        <div v-else>
          <tinymce-editor
            v-model="editorUpgrade.description"
            :init="{
              plugins: 'link lists autoresize',
              toolbar: 'undo redo | bold italic | bullist numlist | link',
              menubar: false,
              skin: 'tinymce-5-dark',
              content_css: 'tinymce-5-dark',
            }"
            class="w-full input input-bordered"
            @keyPress="setUpgradeToCustom"
            @blur="isEditingDescription = false"
          ></tinymce-editor>
        </div>

        <div class="flex justify-end mt-4 btn-group">
          <label
            for="modal-edit-upgrade"
            class="btn btn-primary"
            :class="{ 'btn-disabled': isSubmitDisabled }"
            @click="submit"
          >
            Submit</label
          >
          <label for="modal-edit-upgrade" class="btn" @click="cancel"
            >Cancel</label
          >
        </div>
      </form>
    </label>
  </label>
</template>
