<script>
import { mapGetters } from "vuex";
import theoryUpgrades from "../../theoryUpgradeData";
import draggable from "vuedraggable";

export default {
  data() {
    return {
      isEditorOpen: false,
      isAddNewUpgrade: false,
      editorUpgrade: {},
      editorUpgradeID: null,
    };
  },
  components: {
    draggable,
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
    onClickAdd() {
      this.isEditorOpen = true;
      this.isAddNewUpgrade = true;
      this.editorUpgrade = { tier: "1", theory: this.activeSpec.focus };
    },
    onClickEdit(key) {
      this.isEditorOpen = true;
      this.isAddNewUpgrade = false;
      this.editorUpgradeID = key;
      this.editorUpgrade = this.activeSpec.upgrades[key];
    },
    onClickDelete(key) {
      this.$store.dispatch("deleteUpgrade", key);
    },
    onClickModalOutside() {
      if (this.isEditorOpen) this.cancel();
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
    },
    cancel() {
      this.editorUpgrade = {};
      this.editorUpgradeID = null;
      this.isAddNewUpgrade = false;
      this.isEditorOpen = false;
    },
    upgradeMove(keys) {
      this.$store.dispatch("updateKeys", keys);
    },
  },
};
</script>

<template>
  <h2 class="text-2xl font-bold">Upgrades</h2>
  <ul class="mb-4 grid gap-x-4 grid-cols-1 sm:grid-cols-2 lg:grid-cols-3">
    <draggable
      :list="keysOfUpgrades"
      class="w-full"
      @change="keysOfUpgrades !== [] ? upgradeMove(keysOfUpgrades) : ''"
      item-key="id"
    >
      <template #item="{ element }" :key="key">
        <li class="collapse bg-base-100 content-start items-end group">
          <h3
            class="collapse-title text-xl font-bold badge min-h-0 capitalize relative"
          >
            <!-- a visual indicator for the upgrade's theory and tier. -->
            <!-- It displays x slashes with the color of the theory, where x is the tier number. -->
            <div
              class="flex mr-2 bg-inherit"
              :class="
                Number(activeSpec.upgrades[element].tier) === 4
                  ? 'max-w-[1.5em]'
                  : ''
              "
            >
              <span
                v-for="i in Number(activeSpec.upgrades[element].tier)"
                :key="i"
                class="w-1 font-bold text-base"
                :class="`text-${activeSpec.upgrades[element].theory}`"
                >/
              </span>
            </div>
            <span>
              {{ activeSpec.upgrades[element].name }}
            </span>
            <div
              class="hidden absolute z-10 right-0 bg-inherit group-hover:inline"
            >
              <label for="modal-edit-upgrade">
                <font-awesome-icon
                  :icon="['fas', 'pen-to-square']"
                  class="text-base text-primary-content mr-4 my-1 cursor-pointer hover:text-white"
                  @click="onClickEdit(element)"
                />
              </label>
              <font-awesome-icon
                :icon="['fas', 'trash-can']"
                class="text-base text-primary-content mr-1 my-1 cursor-pointer hover:text-white"
                @click="onClickDelete(element)"
              />
            </div>
          </h3>
          <input type="checkbox" />
          <div class="collapse-content">
            <!-- Use badges to display the upgrade's theory and tier -->
            <span
              class="badge badge-sm text-primary font-bold mr-1"
              :class="`bg-${activeSpec.upgrades[element].theory}`"
              >{{ activeSpec.upgrades[element].theory }}</span
            >
            <span class="badge badge-sm text-white font-bold mr-1"
              >tier {{ activeSpec.upgrades[element].tier }}</span
            >
            <p class="text-lg">
              {{ activeSpec.upgrades[element].description }}
            </p>
          </div>
        </li>
      </template>
    </draggable>
  </ul>
  <label
    for="modal-edit-upgrade"
    class="btn btn-secondary btn-xs mt-2 mb-8"
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
    <label class="modal-box relative">
      <h3 class="text-lg font-bold">
        {{ isAddNewUpgrade ? "Add" : "Edit" }} Upgrade
      </h3>
      <form class="form-control w-full" autocomplete="off">
        <label class="label label-text">Theory</label>
        <select
          v-model="editorUpgrade.theory"
          class="select select-bordered w-full max-w-xs capitalize"
        >
          <option disabled selected>Pick Theory</option>
          <option>autonomic</option>
          <option>digital</option>
          <option>physical</option>
          <option>anthropic</option>
          <option>agentic</option>
          <option>chaos</option>
          <option>constellation</option>
          <option>epistemic</option>
          <option>custom</option>
        </select>

        <div v-if="canShowAvailableUpgrades">
          <label class="label label-text">Available Upgrades</label>
          <div class="btn-group mb-2">
            <input
              type="radio"
              name="tier"
              v-model="editorUpgrade.tier"
              data-title="T1"
              value="1"
              class="btn btn-sm"
            />
            <input
              type="radio"
              name="tier"
              v-model="editorUpgrade.tier"
              data-title="T2"
              value="2"
              class="btn btn-sm"
            />
            <input
              type="radio"
              name="tier"
              v-model="editorUpgrade.tier"
              data-title="T3"
              value="3"
              class="btn btn-sm"
            />
            <input
              type="radio"
              name="tier"
              v-model="editorUpgrade.tier"
              data-title="T4"
              value="4"
              class="btn btn-sm"
            />
          </div>
        </div>

        <div class="btn-group btn-group-vertical">
          <template v-for="upgrade in upgradesAvailable" :key="upgrade.name">
            <div
              class="tooltip tooltip-info"
              :data-tip="
                upgrade.flavor
                  ? upgrade.flavor + ' ' + upgrade.description
                  : upgrade.description
              "
            >
              <div
                class="btn btn-xs w-full"
                :class="editorUpgrade.name === upgrade.name && 'btn-active'"
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
            </div>
          </template>
        </div>

        <label class="label label-text">Name</label>
        <input
          v-model="editorUpgrade.name"
          type="text"
          placeholder=""
          autocomplete="off"
          class="input input-bordered w-full max-w-xs"
        />

        <label class="label label-text">Description</label>
        <textarea
          v-model="editorUpgrade.description"
          type="text"
          placeholder=""
          autocomplete="off"
          class="input input-bordered w-full h-44"
        ></textarea>

        <div class="btn-group flex justify-end mt-4">
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
