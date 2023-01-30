<template>
<div class="relative w-full h-full md:grid md:grid-cols-2 md:gap-4">
  <div class="relative w-full h-full overflow-y-scroll pb-10">
    <div class="relative form-control w-full max-w-2xl p-4">
      <h1 class="text-3xl font-bold pb-2">Campaign Info</h1>
      <label class="label font-semibold">
        <span class="label-text">AGI Name</span>
      </label>
      <input id="agiName" :value="agiName" @input="updateInfoField('agiName', $event)" class="textarea textarea-bordered text-lg w-full max-w-xs"/>
      <div class="grid grid-cols-2 gap-8">
        <div>
          <label class="label font-semibold">
            <span class="label-text">Intended Function</span>
          </label>
          <textarea id="intendedFunction" :value="intendedFunction.content" @input="updateDefaultField('intendedFunction','content', $event)" class="textarea textarea-bordered h-32 text-lg w-full" v-on:mouseup="resizeTextarea($event, 'updateDefault')" :style="{height:intendedFunction.height}"></textarea>
        </div>
        <div>
          <label class="label font-semibold">
            <span class="label-text">Terminal Goals</span>
          </label>
          <textarea id="terminalGoals" :value="terminalGoals.content" @input="updateDefaultField('terminalGoals','content', $event)" class="textarea textarea-bordered h-32 text-lg w-full" v-on:mouseup="resizeTextarea($event, 'updateDefault')" :style="{height:terminalGoals.height}"></textarea>
        </div>
      </div>

      <div class="grid grid-cols-2 gap-8">
        <div>
          <label class="label font-semibold">
            <span class="label-text">AGI Details</span>
          </label>
          <textarea id="agiDetails" :value="agiDetails.content" @input="updateDefaultField('agiDetails', 'content', $event)" class="textarea textarea-bordered h-32 text-lg w-full" v-on:mouseup="resizeTextarea($event, 'updateDefault')" :style="{height:agiDetails.height}"></textarea>
        </div>
        <div>
          <label class="label font-semibold">
            <span class="label-text">Safety Measures</span>
          </label>
          <textarea id="safetyMeasures" :value="safetyMeasures.content" @input="updateDefaultField('safetyMeasures', 'content', $event)" class="textarea textarea-bordered h-32 text-lg w-full" v-on:mouseup="resizeTextarea($event, 'updateDefault')" :style="{height:safetyMeasures.height}"></textarea>
        </div>
      </div>

      <label class="label font-semibold">
        <span class="label-text">Scenario Notes</span>
      </label>
      <textarea id="scenarioNotes" :value="scenarioNotes.content" @input="updateDefaultField('scenarioNotes','content', $event)" class="textarea textarea-bordered h-32 text-lg" placeholder="For difficulty, compute scarcity, differences from modern day, etc" v-on:mouseup="resizeTextarea($event, 'updateDefault')" :style="{height:scenarioNotes.height}"></textarea>

      <draggable :list="keysOfCampaignNotes" class="w-full" @change="keysOfCampaignNotes !== [] ? campaignMove('keysOfCampaignNotes', keysOfCampaignNotes):''" item-key="id" handle=".handle">
        <template #item="{element}" :key="key">
          <div>
            <label class="label">
              <div>
                <font-awesome-icon :icon="['fas', 'bars']" class="handle cursor-move"/>
                <input
                  :value="customCampaignNotes[element].title"
                  @input="updateCustomCampaignNoteField(element, 'title', $event)"
                  type="text" class="input input-bordered input-sm max-w-xs ml-2" placeholder="Custom Note Title"
                />
              </div>
            <font-awesome-icon
              :icon="['fas', 'trash-can']" class="text-base cursor-pointer text-primary-content hover:text-white"
              @click="removeCustomCampaignNote(element)"
            />
          </label>
          <textarea
            :id="element"
            :value="customCampaignNotes[element].content"
            @input="updateCustomCampaignNoteField(element, 'content', $event)"
            class="textarea textarea-bordered h-32 text-lg w-full"
            v-on:mouseup="resizeTextarea($event, 'updateCustomCampaignNote')"
            :style="{height:customCampaignNotes[element].height}"
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
      <label class="label font-semibold">
        <span class="label-text">Instrumental Goals</span>
      </label>
      <textarea id="instrumentalGoals" :value="instrumentalGoals.content" @input="updateDefaultField('instrumentalGoals','content', $event)" class="textarea textarea-bordered h-24 text-lg" v-on:mouseup="resizeTextarea($event, 'updateDefault')" :style="{height:instrumentalGoals.height}"></textarea>


      <label class="label font-semibold">
        <span class="label-text">Assets</span>
      </label>
      <textarea id="assets" :value="assets.content" @input="updateDefaultField('assets','content', $event)" class="textarea textarea-bordered h-32 text-lg" v-on:mouseup="resizeTextarea($event, 'updateDefault')" :style="{height:assets.height}"></textarea>

      <label class="label font-semibold">
        <span class="label-text">Gathered Information</span>
      </label>
      <textarea id="gatheredInfo" :value="gatheredInfo.content" @input="updateDefaultField('gatheredInfo','content', $event)" class="textarea textarea-bordered h-32 text-lg" v-on:mouseup="resizeTextarea($event, 'updateDefault')" :style="{height:gatheredInfo.height}"></textarea>
      <draggable :list="keysOfInPlayNotes" class="w-full" @change="keysOfInPlayNotes !== [] ? campaignMove('keysOfInPlayNotes', keysOfInPlayNotes):''" item-key="id"  handle=".handle">
        <template #item="{element}" :key="key">
          <div>
            <label class="label">
            <div>
              <font-awesome-icon :icon="['fas', 'bars']" class="handle cursor-move"/>
              <input
                :value="customInPlayNotes[element].title"
                @input="updateCustomInPlayNoteField(element, 'title', $event)"
                type="text" class="input input-bordered input-sm max-w-xs ml-2" placeholder="Custom Note Title"
              />
            </div>
            <font-awesome-icon
              :icon="['fas', 'trash-can']" class="text-base cursor-pointer text-primary-content hover:text-white"
              @click="removeCustomInPlayNote(element)"
            />
          </label>
          <textarea
            :id="element"
            :value="customInPlayNotes[element].content"
            @input="updateCustomInPlayNoteField(element, 'content', $event)"
            class="textarea textarea-bordered h-32 text-lg w-full"
            v-on:mouseup="resizeTextarea($event, 'updateCustomInPlayNote')"
            :style="{height:customInPlayNotes[element].height}"
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
        temp_keysOfCampaignNotes,
        temp_keysOfInPlayNotes
      };
    },
    components: {
      draggable,
    },
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
            keysOfCampaignNotes: state => state.info.keysOfCampaignNotes,
            keysOfInPlayNotes: state => state.info.keysOfInPlayNotes,
            customCampaignNotes: state => state.info.customCampaignNotes,
            customInPlayNotes: state => state.info.customInPlayNotes,
        })
    },
      methods: {
        resizeTextarea(e, dispatch) {
        let area = e.target;
        let title = area.id;
        let height = area.style.height;
        const changesObj = {};
        changesObj['height'] = height;
        this.$store.dispatch(dispatch, { noteID: title, changesObj})
        },
        campaignMove(field, event){
          const value = event;
          const changesObj = {};
          changesObj[field] = value;
          this.$store.dispatch("updateInfo", changesObj);
        },
        updateDefaultField(title, field, event){
          const { value } = event.target;
          const changesObj = {};
          changesObj[field] = value;
          this.$store.dispatch("updateDefault", { noteID: title, changesObj});
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