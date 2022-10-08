<template>
<div class="relative w-full min-w-[1074px] h-4/5 grid grid-cols-2 gap-4">
  <div class="relative w-full h-full overflow-y-scroll pb-10">

    <div class="relative form-control w-full max-w-2xl p-4">
      <h1 class="text-3xl font-bold pb-2">Campaign Info</h1>

      <label class="label font-semibold">
        <span class="label-text">AGI name</span>
      </label>
      <input :value="agiName" @input="updateInfoField('agiName', $event)" type="text" class="input input-bordered w-full max-w-xs" />

      <div class="grid grid-cols-2 gap-8">
        <div>
          <label class="label font-semibold">
            <span class="label-text">Intended Function</span>
          </label>
          <textarea :value="intendedFunction" @input="updateInfoField('intendedFunction', $event)" class="textarea textarea-bordered h-32 w-full"></textarea>
        </div>
        <div>
          <label class="label font-semibold">
            <span class="label-text">Terminal Goals</span>
          </label>
          <textarea :value="terminalGoals" @input="updateInfoField('terminalGoals', $event)" class="textarea textarea-bordered h-32 w-full"></textarea>
        </div>
      </div>
      
      <div class="grid grid-cols-2 gap-8">
        <div>
          <label class="label font-semibold">
            <span class="label-text">AGI Details</span>
          </label>
          <textarea :value="agiDetails" @input="updateInfoField('agiDetails', $event)" class="textarea textarea-bordered h-32 w-full"></textarea>
        </div>
        <div>
          <label class="label font-semibold">
            <span class="label-text">Safety Measures</span>
          </label>
          <textarea :value="safetyMeasures" @input="updateInfoField('safetyMeasures', $event)" class="textarea textarea-bordered h-32 w-full"></textarea>
        </div>
      </div>

      <label class="label font-semibold">
        <span class="label-text">Scenario Notes</span>
      </label>
      <textarea :value="scenarioNotes" @input="updateInfoField('scenarioNotes', $event)" class="textarea textarea-bordered h-32" placeholder="For difficulty, compute scarcity, differences from modern day, etc"></textarea>

      <template v-for="(note, key) in customCampaignNotes" :key="key">
        <label class="label">
          <input
            :value="note.title"
            @input="updateCustomCampaignNoteField(key, 'title', $event)"
            type="text" class="input input-bordered input-sm max-w-xs" placeholder="Custom Note Title"
          />
          <font-awesome-icon
            :icon="['fas', 'trash-can']" class="text-base cursor-pointer text-primary-content hover:text-white"
            @click="removeCustomCampaignNote(key)"
          />
        </label>
        <textarea
          :value="note.content"
          @input="updateCustomCampaignNoteField(key, 'content', $event)"
          class="textarea textarea-bordered h-32"
        ></textarea>
      </template>

    </div>
    <button class="btn btn-secondary btn-sm mt-4 ml-4" @click="addCampaignNote">+ Add Campaign Notes</button>
  </div>

  <div class="relative w-full h-full overflow-y-scroll pb-10">
    <div class="relative form-control w-full max-w-2xl p-4">
      <h1 class="text-3xl font-bold pb-2">In-Play Info</h1>

      <label class="label font-semibold">
        <span class="label-text">Instrumental Goals</span>
      </label>
      <textarea :value="instrumentalGoals" @input="updateInfoField('instrumentalGoals', $event)" class="textarea textarea-bordered h-24"></textarea>
      

      <label class="label font-semibold">
        <span class="label-text">Assets</span>
      </label>
      <textarea :value="assets" @input="updateInfoField('assets', $event)" class="textarea textarea-bordered h-32"></textarea>

      <label class="label font-semibold">
        <span class="label-text">Gathered Information</span>
      </label>
      <textarea :value="gatheredInfo" @input="updateInfoField('gatheredInfo', $event)" class="textarea textarea-bordered h-32"></textarea>

      <template v-for="(note, key) in customInPlayNotes" :key="key">
        <label class="label">
          <input
            :value="note.title"
            @input="updateCustomInPlayNoteField(key, 'title', $event)"
            type="text" class="input input-bordered input-sm max-w-xs" placeholder="Custom Note Title"
          />
          <font-awesome-icon
            :icon="['fas', 'trash-can']" class="text-base cursor-pointer text-primary-content hover:text-white"
            @click="removeCustomInPlayNote(key)"
          />
        </label>
        <textarea
          :value="note.content"
          @input="updateCustomInPlayNoteField(key, 'content', $event)"
          class="textarea textarea-bordered h-32"
        ></textarea>
      </template>

    </div>
    <button class="btn btn-secondary btn-sm mt-4 ml-4" @click="addInPlayNote">+ Add In-Play Notes</button>
  </div>

</div>
</template>

<script>
import {mapState} from 'vuex'

export default {
  computed: {
    ...mapState({
      agiName: state => state.info.agiName,
      intendedFunction: state => state.info.intendedFunction,
      terminalGoals: state => state.info.terminalGoals,
      agiDetails: state => state.info.agiDetails,
      safetyMeasures: state => state.info.safetyMeasures,
      scenarioNotes: state => state.info.scenarioNotes,
      instrumentalGoals: state => state.info.instrumentalGoals,
      assets: state => state.info.assets,
      gatheredInfo: state => state.info.gatheredInfo,
      customCampaignNotes: state => state.info.customCampaignNotes,
      customInPlayNotes: state => state.info.customInPlayNotes,
    })
  },
  methods: {
    updateInfoField(field, event) {
      // TODO improve bandwidth usage by throttling how often we sync
      const {value} = event.target
      const changesObj = {}
      changesObj[field] = value
      this.$store.dispatch('updateInfo', changesObj)
    },
    addCampaignNote() {
      this.$store.dispatch('addCustomCampaignNote')
    },
    updateCustomCampaignNoteField(key, field, event) {
      const {value} = event.target
      const changesObj = {}
      changesObj[field] = value
      this.$store.dispatch('updateCustomCampaignNote', {noteID: key, changesObj})
    },
    removeCustomCampaignNote(noteID) {
      this.$store.dispatch('removeCustomCampaignNote', noteID)
    },
    addInPlayNote() {
      this.$store.dispatch('addCustomInPlayNote')
    },
    updateCustomInPlayNoteField(key, field, event) {
      const {value} = event.target
      const changesObj = {}
      changesObj[field] = value
      this.$store.dispatch('updateCustomInPlayNote', {noteID: key, changesObj})
    },
    removeCustomInPlayNote(noteID) {
      this.$store.dispatch('removeCustomInPlayNote', noteID)
    },
  }
}
</script>