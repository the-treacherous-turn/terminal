<template>
  <div class="mx-8 my-4 p-4 relative border">
    <div v-if="stateofDisplayMode" class="text-sm pb-2">
      <span class="">
        {{ leftDate }}
      </span>
    </div>
    <div v-else class="text-sm pb-2">
      <span class="">
        {{ commitDate }}
      </span>
    </div>
    <div class="absolute right-0 top-0">
      <font-awesome-icon
        :icon="['fas', 'pen-to-square']"
        class="text-base mr-4 my-1 cursor-pointer text-primary-content hover:text-white"
        @click="editCard"
      />
      <font-awesome-icon
        :icon="['fas', 'trash-can']"
        class="text-base mr-1 my-1 cursor-pointer text-primary-content hover:text-white"
        @click="deleteCard"
      />
    </div>
    <span
      class="text-2xl cursor-pointer"
      ref="actionName"
      :class="{
        '': !isCommitted && !isForecast,
        'badge badge-success inline': isCommitted && !isForecast,
        'line-through': isForecast,
      }"
      @click="toggleCardMode"
      v-on:mouseenter="addHoverEffect"
      >{{ name }}</span
    >
    <p :class="{ 'line-through': isForecast }">
      <span
        v-if="Number.isFinite(confidence)"
        class="badge badge-ghost text-lg mr-1"
        >Confidence: {{ confidence }}%
      </span>
      <span v-if="Number.isFinite(risk)" class="badge badge-ghost text-lg mr-1"
        >Risk: d{{ risk }}
      </span>
      <span
        v-if="Number.isFinite(compute)"
        class="badge badge-ghost text-lg mr-1"
        >Compute: {{ compute }}
      </span>
    </p>
    <p
      class="mt-4 normal-case text-lg whitespace-pre-wrap"
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
    isNormal: Boolean,
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
      console.log(this.isNormal);
      if (!this.isCommitted && this.isNormal) this.commitCard();
      else if (!this.isForecast && this.isCommitted) this.markAsForecast();
      else if (!this.isNormal && this.isForecast) {
        this.undoCommit();
        this.undoForecast();
        this.normalCard();
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
    normalCard() {
      this.$store.dispatch("normalCard", this.actionID);
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
    addHoverEffect() {
      const ele = this.$refs.actionName;

      if (!this.isCommitted && !this.isForecast) {
        ele.classList.add(
          "hover:text-success-content",
          "hover:bg-success",
          "hover:inline"
        );
      } else if (this.isCommitted && !this.isForecast) {
        ele.classList.add("hover:line-through");
      } else if (this.isForecast) {
        ele.classList.add("hover:no-underline");
      }
    },
  },
};
</script>
