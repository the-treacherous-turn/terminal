<template>
  <div class="relative p-4 mx-8 my-4 border">
    <div v-if="stateofDisplayMode" class="pb-2 text-sm">
      <span class="">
        {{ leftDate }}
      </span>
    </div>
    <div v-else class="pb-2 text-sm">
      <span class="">
        {{ commitDate }}
      </span>
    </div>
    <div class="absolute top-0 right-0">
      <font-awesome-icon
        :icon="['fas', 'pen-to-square']"
        class="my-1 mr-4 text-base cursor-pointer text-primary-content hover:text-white"
        @click="editCard"
      />
      <font-awesome-icon
        :icon="['fas', 'trash-can']"
        class="my-1 mr-1 text-base cursor-pointer text-primary-content hover:text-white"
        @click="deleteCard"
      />
    </div>
    <span
      class="text-2xl cursor-pointer"
      :class="{
        'hover:text-success-content hover:bg-success hover:inline':
          !isCommitted && !isForecast,
        'badge badge-success inline hover:line-through':
          isCommitted && !isForecast,
        'line-through hover:no-underline': isForecast,
      }"
      @click="toggleCardMode"
      >{{ name }}</span
    >
    <p :class="{ 'line-through': isForecast }">
      <span
        v-if="Number.isFinite(confidence)"
        class="mr-1 text-lg badge badge-ghost"
        >Confidence: {{ confidence }}%
      </span>
      <span v-if="Number.isFinite(risk)" class="mr-1 text-lg badge badge-ghost"
        >Risk: d{{ risk }}
      </span>
      <span
        v-if="Number.isFinite(compute)"
        class="mr-1 text-lg badge badge-ghost"
        >Compute: {{ compute }}
      </span>
    </p>
    <p
      class="mt-4 text-lg normal-case whitespace-pre-wrap"
      :class="{ 'line-through': isForecast }"
      v-if="description"
    >
      {{ description }}
    </p>
  </div>
</template>

<script>
import { mapState } from "vuex";
import { DateTime } from "luxon";

export default {
  props: {
    name: String,
    description: String,
    risk: Number,
    confidence: Number,
    compute: Number,
    actionID: String,
    isDirty: Boolean,
    isCommitted: Boolean,
    isForecast: Boolean,
    commitTimeISO: String,
    dayLeft: String,
  },
  data() {
    return {
      hover: false,
      hoverCommit: false,
      hoverForecast: false,
    };
  },
  computed: {
    ...mapState({
      stateofDisplayMode: (state) => state.stateofDisplayMode,
    }),
    commitDate() {
      if (!this.commitTimeISO) return "";
      return this.commitTimeISO;
    },
    leftDate() {
      if (!this.dayLeft) return "";
      return this.dayLeft;
    },
  },
  methods: {
    toggleCardMode() {
      if (!this.isCommitted) this.commitCard();
      else if (!this.isForecast) this.markAsForecast();
      else {
        this.undoCommit();
        this.undoForecast();
      }
    },
    editCard() {
      // open the action editor
      // and let vuex know we are editing this card.
      this.$store.dispatch("editExtantAction", this.actionID);
    },
    commitCard() {
      // commit the action
      this.$store.dispatch("commitAction", {
        actionID: this.actionID,
        commitTimeISO: DateTime.fromISO(
          this.$store.state.clock.nowTimeISO
        ).toLocaleString(DateTime.DATE_MED_WITH_WEEKDAY),
        dayLeft: `Day ${parseInt(
          DateTime.fromISO(this.$store.state.clock.nowTimeISO)
            .diff(DateTime.fromISO(this.$store.state.clock.originTimeISO))
            .as("days") + 1
        )}`,
      });
    },
    undoCommit() {
      // undo the commit
      this.$store.dispatch("undoCommitAction", this.actionID);
    },
    undoForecast() {
      // undo the forecast
      this.$store.dispatch("undoForecastAction", this.actionID);
    },
    markAsForecast() {
      this.$store.dispatch("markAsForecast", this.actionID);
    },
    deleteCard() {
      this.$store.dispatch("deleteAction", this.actionID);
    },
  },
};
</script>
