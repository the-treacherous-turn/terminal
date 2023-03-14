<script>
import {mapGetters} from 'vuex'
import theoryUpgrades from '../../theoryUpgradeData'

export default {
  data () {
    return {
      isEditorOpen: false,
      isAddNewUpgrade: false,
      editorUpgrade: {},
      editorUpgradeID: null,
    }
  },
  computed: {
    ...mapGetters({
      activeSpec: 'activeSpec',
    }),
    isSubmitDisabled () {
      return !this.editorUpgrade.name
    },
    canShowAvailableUpgrades () {
      return this.editorUpgrade.theory && this.editorUpgrade.theory !== 'custom'
    },
    upgradesAvailable () {
      if (!this.canShowAvailableUpgrades) return []
      return theoryUpgrades[this.editorUpgrade.theory].upgrades[this.editorUpgrade.tier]
    },
  },
  methods: {
    onClickAdd() {
      this.isEditorOpen = true
      this.isAddNewUpgrade = true
      this.editorUpgrade = {tier: '1',theory: this.activeSpec.focus}
    },
    onClickEdit(key) {
      this.isEditorOpen = true
      this.isAddNewUpgrade = false
      this.editorUpgradeID = key
      this.editorUpgrade = this.activeSpec.upgrades[key]
    },
    onClickDelete(key) {
      this.$store.dispatch('deleteUpgrade', key)
    },
    onClickModalOutside() {
      if (this.isEditorOpen) this.clear()
    },
    setEditorUpgrade(upgrade, theory, tier) {
      this.editorUpgrade = {
        ...upgrade,
        theory,
        tier,
      }
      // if upgrade.flavor exists, prepend its content to the description
      // HACK this is a bandaid to make sure we include the flavor text.
      if (upgrade.flavor) {
        this.editorUpgrade.description = `${upgrade.flavor} ${this.editorUpgrade.description}`
      }
    },
    submit() {
      if (this.isAddNewUpgrade) {
        this.$store.dispatch('addUpgrade', this.editorUpgrade)
      } else {
        this.$store.dispatch('editUpgrade', {
          id: this.editorUpgradeID,
          upgrade: this.editorUpgrade,
        })
      }
      this.editorUpgrade = {}
      this.editorUpgradeID = null
      this.isEditorOpen = false
      this.isAddNewUpgrade = false
    },
    clear() {
      this.editorUpgrade = {}
      this.editorUpgradeID = null
      this.isAddNewUpgrade = false
      this.isEditorOpen = false
    },
  }
}
</script>

<template>
<h2 class="text-2xl font-bold">Upgrades</h2>
<ul class="mb-4 grid gap-x-4 grid-cols-1 sm:grid-cols-2 lg:grid-cols-3">
  <li
    v-for="(upgrade, key) in activeSpec.upgrades" :key="key"
    class="items-end content-start collapse bg-base-100 group">
    <h3 class="relative min-h-0 text-xl font-bold capitalize collapse-title badge">
      <!-- a visual indicator for the upgrade's theory and tier. -->
      <!-- It displays x slashes with the color of the theory, where x is the tier number. -->
      <div class="flex mr-2 bg-inherit" :class="Number(upgrade.tier) === 4 ? 'max-w-[1.5em]' : ''">
        <span
          v-for="i in Number(upgrade.tier)"
          :key="i"
          class="w-1 text-base font-bold"
          :class="`text-${upgrade.theory}`"
          >/
        </span>
      </div>
      <span>
        {{ upgrade.name }}
      </span>
      <div class="absolute right-0 z-10 hidden bg-inherit group-hover:inline">
        <label for="modal-edit-upgrade">
          <font-awesome-icon
            :icon="['fas', 'pen-to-square']"
            class="my-1 mr-4 text-base cursor-pointer text-primary-content hover:text-white"
            @click="onClickEdit(key)"
          />
        </label>
        <font-awesome-icon
          :icon="['fas', 'trash-can']"
          class="my-1 mr-1 text-base cursor-pointer text-primary-content hover:text-white"
          @click="onClickDelete(key)"
        />
      </div>
    </h3>
    <input type="checkbox">
    <div class="collapse-content">
      <!-- Use badges to display the upgrade's theory and tier -->
      <span class="mr-1 font-bold badge badge-sm text-primary" :class="`bg-${upgrade.theory}`">{{ upgrade.theory }}</span>
      <span class="mr-1 font-bold text-white badge badge-sm">tier {{ upgrade.tier }}</span>
      <p class="text-lg ">{{upgrade.description}}</p>
    </div>
  </li>
</ul>
<label for="modal-edit-upgrade" class="mt-2 mb-8 btn btn-secondary btn-xs" @click="onClickAdd">+ Add Upgrades</label>
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
  <label class="relative modal-box">
    <h3 class="text-lg font-bold">{{ isAddNewUpgrade ? 'Add' : 'Edit' }} Upgrade</h3>
    <form class="w-full form-control" autocomplete="off">
      <label class="label label-text">Theory</label>
      <select v-model="editorUpgrade.theory" class="w-full max-w-xs capitalize select select-bordered">
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
        <div class="mb-2 btn-group">
          <input type="radio" name="tier" v-model="editorUpgrade.tier" data-title="T1" value="1" class="btn btn-sm" />
          <input type="radio" name="tier" v-model="editorUpgrade.tier" data-title="T2" value="2" class="btn btn-sm" />
          <input type="radio" name="tier" v-model="editorUpgrade.tier" data-title="T3" value="3" class="btn btn-sm" />
          <input type="radio" name="tier" v-model="editorUpgrade.tier" data-title="T4" value="4" class="btn btn-sm" />
        </div>
      </div>
      
      <div class="btn-group btn-group-vertical">
        <template v-for="upgrade in upgradesAvailable" :key="upgrade.name">
          <div class="tooltip tooltip-info" :data-tip="upgrade.flavor?upgrade.flavor+' '+upgrade.description:upgrade.description">
            <div
              class="w-full btn btn-xs" :class="editorUpgrade.name === upgrade.name && 'btn-active'"
              @click="setEditorUpgrade(upgrade, editorUpgrade.theory, editorUpgrade.tier)"
              >{{upgrade.name}}</div>
          </div>
        </template>
      </div>
      

      <label class="label label-text">Name</label>
      <input
        v-model="editorUpgrade.name"
        type="text" placeholder="" autocomplete="off"
        class="w-full max-w-xs input input-bordered">
      
      <label class="label label-text">Description</label>
      <textarea
        v-model="editorUpgrade.description"
        type="text" placeholder="" autocomplete="off"
        class="w-full input input-bordered h-44"></textarea>

      <div class="flex justify-end mt-4 btn-group">
        <label
          for="modal-edit-upgrade"
          class="btn btn-primary"
          :class="{'btn-disabled':isSubmitDisabled}"
          @click="submit">
          Submit</label>
        <label
          for="modal-edit-upgrade"
          class="btn"
          @click="clear">Cancel</label>
      </div>
    </form>
  </label>
</label>
</template>