<template>
<div class="relative w-full h-full md:grid md:grid-cols-2 md:gap-4">
  <div class="relative w-full h-full overflow-y-scroll pb-10">

    <div class="relative form-control w-full max-w-2xl p-4">
      <h1 class="text-3xl font-bold pb-2">Campaign Info</h1>
      <label class="label font-semibold">
        <span class="label-text">AGI Name</span>
      </label>
      <input :value="agiName" @input="updateInfoField('agiName', $event)" type="text" class="input input-bordered w-full max-w-xs" />
      <draggable
      class="container m-auto grid grid-cols-2 gap-8"
      :list="sort"
      @change="sort !== []?checkMove('sort', sort):''"
      item-key="id"
      >
        <template #item="{ element }" :key="element">
          <div>
            <label class="label font-semibold">
              <span class="label-text">{{MAP_ITEMS[element]}}</span>
            </label>
            <textarea :value="pp(element)" @input="updateInfoField(element, $event)" class="textarea textarea-bordered h-32 text-lg w-full"></textarea>
          </div>
        </template>
      </draggable>

      <label class="label font-semibold">
        <span class="label-text">Scenario Notes</span>
      </label>
      <textarea :value="scenarioNotes" @input="updateInfoField('scenarioNotes', $event)" class="textarea textarea-bordered h-32 text-lg" placeholder="For difficulty, compute scarcity, differences from modern day, etc"></textarea>

      <draggable :list="keysOfCampaignNotes" class="w-full" @change="keysOfCampaignNotes !== [] ? campaignMove('keysOfCampaignNotes', keysOfCampaignNotes):''" item-key="id">
        <template #item="{element}" :key="key">
          <div>
            <label class="label">
            <input
              :value="customCampaignNotes[element].title"
              @input="updateCustomCampaignNoteField(element, 'title', $event)"
              type="text" class="input input-bordered input-sm max-w-xs" placeholder="Custom Note Title"
            />
            <font-awesome-icon
              :icon="['fas', 'trash-can']" class="text-base cursor-pointer text-primary-content hover:text-white"
              @click="removeCustomCampaignNote(element)"
            />
          </label>
          <textarea
            :value="customCampaignNotes[element].content"
            @input="updateCustomCampaignNoteField(element, 'content', $event)"
            class="textarea textarea-bordered h-32 text-lg w-full"
          ></textarea>
          </div>
        </template>
      </draggable>
    </div>
    <button class="btn btn-secondary btn-sm mt-4 ml-4" @click="addCampaignNote">+ Add Campaign Notes</button>
  </div>

  <div class="relative w-full h-full overflow-y-scroll pb-10">
    <div class="relative form-control w-full max-w-2xl p-4">
      <h1 class="text-3xl font-bold pb-2">In-Play Info</h1>
      <draggable
      :list="sort_inplayinfo"
      @change="sort_inplayinfo !== []?checkMove('sort_inplayinfo', sort_inplayinfo):''"
      item-key="id"
      >
        <template #item="{ element }" :key="element">
          <div>
            <label class="label font-semibold">
              <span class="label-text">{{MAP_ITEMS_inplayinfo[element]}}</span>
            </label>
            <textarea :value="getComputedInplayInfo(element)" @input="updateInfoField(element, $event)" class="textarea textarea-bordered h-32 text-lg w-full"></textarea>
          </div>
        </template>
      </draggable>
      <draggable :list="keysOfInPlayNotes" class="w-full" @change="keysOfInPlayNotes !== [] ? campaignMove('keysOfInPlayNotes', keysOfInPlayNotes):''" item-key="id">
        <template #item="{element}" :key="key">
          <div>
          <label class="label">
            <input
              :value="customInPlayNotes[element].title"
              @input="updateCustomInPlayNoteField(element, 'title', $event)"
              type="text" class="input input-bordered input-sm max-w-xs" placeholder="Custom Note Title"
            />
            <font-awesome-icon
              :icon="['fas', 'trash-can']" class="text-base cursor-pointer text-primary-content hover:text-white"
              @click="removeCustomInPlayNote(element)"
            />
          </label>
          <textarea
            :value="customInPlayNotes[element].content"
            @input="updateCustomInPlayNoteField(element, 'content', $event)"
            class="textarea textarea-bordered h-32 text-lg w-full"
          ></textarea>
        </div>
        </template>
      </draggable>

    </div>
    <button class="btn btn-secondary btn-sm mt-4 ml-4" @click="addInPlayNote">+ Add In-Play Notes</button>
  </div>

</div>
</template>

<script>
import {mapState} from 'vuex'
import draggable from 'vuedraggable'

let temp_keysOfCampaignNotes;
let temp_keysOfInPlayNotes;

const MAP_ITEMS = {
  'agiName': 'AGI Name',
  'intendedFunction': 'Intended Function',
  'terminalGoals': 'Terminal Goals',
  'agiDetails': 'AGI Details',
  'safetyMeasures': 'Safety Measures',
  'scenarioNotes': 'Scenario Notes',
}

const MAP_ITEMS_inplayinfo = {
  'instrumentalGoals': 'Instrumental Goals',
  'assets': 'Assets',
  'gatheredInfo': 'Gathered Information',
}
export default {
    watch: {
      keysOfCampaignNotes(newVal){
        const changesObj = {}
        changesObj['keysOfCampaignNotes'] = newVal
        if(JSON.stringify(newVal) !== JSON.stringify(temp_keysOfCampaignNotes)){
          this.$store.dispatch("updateInfo", changesObj)
        }
        temp_keysOfCampaignNotes = [...newVal]
      },
      keysOfInPlayNotes(newVal){
        const changesObj = {}
        changesObj['keysOfInPlayNotes'] = newVal
        if(JSON.stringify(newVal) !== JSON.stringify(temp_keysOfInPlayNotes)){
          this.$store.dispatch("updateInfo", changesObj)
        }
        temp_keysOfInPlayNotes = [...newVal]
      },
    },
    mounted(){
      temp_keysOfCampaignNotes = [...this.keysOfCampaignNotes]
      temp_keysOfInPlayNotes = [...this.keysOfInPlayNotes]
    },
    data() {
      return{
        MAP_ITEMS,
        temp_keysOfCampaignNotes,
        temp_keysOfInPlayNotes,
        MAP_ITEMS_inplayinfo
      };
    },
    components: {
      draggable,
    },
    computed: {
        ...mapState({
            sort: state => state.info.sort,
            sort_inplayinfo: state => state.info.sort_inplayinfo,
            agiName: state => state.info.agiName,
            intendedFunction: state => state.info.intendedFunction,
            terminalGoals: state => state.info.terminalGoals,
            agiDetails: state => state.info.agiDetails,
            safetyMeasures: state => state.info.safetyMeasures,
            scenarioNotes: state => state.info.scenarioNotes,
            instrumentalGoals: state => state.info.instrumentalGoals,
            assets: state => state.info.assets,
            gatheredInfo: state => state.info.gatheredInfo,
            keysOfCampaignNotes: state => state.info.keysOfCampaignNotes,
            keysOfInPlayNotes: state => state.info.keysOfInPlayNotes,
            customCampaignNotes: state => state.info.customCampaignNotes,
            customInPlayNotes: state => state.info.customInPlayNotes,
        })
    },
    methods: {
        checkMove(field, event){
          const value = event;
          const changesObj = {};
          changesObj[field] = value;
          this.$store.dispatch("updateInfo", changesObj);
        },
        campaignMove(field, event){
          const value = event;
          const changesObj = {};
          changesObj[field] = value;
          this.$store.dispatch("updateInfo", changesObj);
        },
        getComputedInplayInfo(element) {
          switch (element) {
            case 'instrumentalGoals':
              return this.instrumentalGoals
              break;
            case 'assets':
              return this.assets
              break;
            case 'gatheredInfo':
            return this.gatheredInfo
            break;
            default:
              break;
          }
        },
        pp(element) {
          switch (element) {
            case 'agiName':
              return this.agiName
              break;
            case 'intendedFunction':
              return this.intendedFunction
              break;
            case 'terminalGoals':
            return this.terminalGoals
            break;

            case 'agiDetails':
            return this.agiDetails
            break;

            case 'safetyMeasures':
            return this.safetyMeasures
            break;

            case 'scenarioNotes':
            return this.scenarioNotes
            break;

            default:
              break;
          }
        },
        updateInfoField(field, event) {
            // TODO improve bandwidth usage by throttling how often we sync
            const { value } = event.target;
            const changesObj = {};
            changesObj[field] = value;
            this.$store.dispatch("updateInfo", changesObj);
        },
        addCampaignNote() {
          this.$store.dispatch("addCustomCampaignNote");
        },
        updateCustomCampaignNoteField(key, field, event) {
            const { value } = event.target;
            const changesObj = {};
            changesObj[field] = value;
            this.$store.dispatch("updateCustomCampaignNote", { noteID: key, changesObj });
        },
        removeCustomCampaignNote(noteID) {
            this.$store.dispatch("removeCustomCampaignNote", noteID);
        },
        addInPlayNote() {
            this.$store.dispatch("addCustomInPlayNote");
        },
        updateCustomInPlayNoteField(key, field, event) {
            const { value } = event.target;
            const changesObj = {};
            changesObj[field] = value;
            this.$store.dispatch("updateCustomInPlayNote", { noteID: key, changesObj });
        },
        removeCustomInPlayNote(noteID) {
            this.$store.dispatch("removeCustomInPlayNote", noteID);
        },
    },
}
</script>