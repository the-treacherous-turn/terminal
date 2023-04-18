<template>
  <div>
    <div class="float-right stats">
      <div class="px-4 stat">
        <div class="flex items-center justify-between">
          <div v-if="loadingFinished">
            <div
              v-if="stateofDisplayMode"
              class="inline mr-2 text-base stat-title"
            >
              {{ `day ${dayAfter}` }}
            </div>
            <div v-else class="inline mr-2 text-base stat-title">
              {{ nowDate }}
            </div>
          </div>
          <label
            v-if="isGM"
            for="modal-time-setting"
            @click="openModal('timesetting')"
          >
            <span
              class="p-1 indicator-item indicator-bottom indicator-center badge badge-secondary"
            >
              <font-awesome-icon
                :icon="['fas', 'pen-to-square']"
                class="text-base"
              />
            </span>
          </label>
        </div>
        <div class="text-3xl stat-value" v-if="loadingFinished">
          {{ nowHour }}:{{ nowMin }}
        </div>
      </div>
      <div
        class="px-4 stat"
        v-if="isGM"
      >
        <span class="text-base stat-title">ADJUST TIME (min)</span>
        <div class="flex gap-4 mt-2">
          <input
            type="number"
            class="w-12 text-center input input-sm"
            v-model.number="timeAdjustAmt"
          />
          <div class="flex gap-2">
            <button class="btn btn-sm btn-circle" @click="increaseTimeToAdjust">
              <font-awesome-icon icon="plus" class="text-2xl" />
            </button>
            <button class="btn btn-sm btn-circle" @click="decreaseTimeToAdjust">
              <font-awesome-icon icon="minus" class="text-2xl" />
            </button>
          </div>
        </div>
      </div>
      <div class="px-4 stat">
        <div class="text-base stat-title">Stage</div>
        <div class="text-3xl stat-value">
          <select
            :value="gameStage"
            class="input input-xs w-30"
            @change="onStageChange"
          >
            <option v-for="stage in stages" :value="stage">{{ stage }}</option>
          </select>
        </div>
      </div>
      <div class="px-4 stat">
        <div>
          <div class="inline text-base stat-title">Turn</div>
          <label for="modal-turn-setting" @click="openModal('turnsetting')">
            <span
              class="p-1 indicator-item indicator-bottom indicator-center badge badge-secondary"
            >
              <font-awesome-icon
                :icon="['fas', 'pen-to-square']"
                class="text-base"
              />
            </span>
          </label>
        </div>
        <div class="text-3xl stat-value" v-if="loadingFinished">
          {{ cycle }}
        </div>
        <div class="stat-figure">
          <label
            v-if="isComputeUsedUp"
            class="uppercase btn"
            @click="advanceCycle"
            >End Turn</label
          >
          <label
            v-else
            for="modal-cycle-confirm"
            class="uppercase btn modal-button"
            @click="openModal('endmodal')"
            >End Turn</label
          >
        </div>
      </div>
    </div>
    <!-- <label
  v-if="isEditorOpen"
  class="fixed w-[100%] h-[100vh] top-0 left-0 flex justify-center items-center cursor-pointer bg-white bg-opacity-10 z-50"
  @mousedown.self="onClickModalOutside"
  > -->
    <label
      v-if="isEndModalOpen"
      for="modal-cycle-confirm"
      class="fixed w-[100%] h-[100vh] top-0 left-0 flex justify-center items-center cursor-pointer bg-white bg-opacity-10 z-50"
      @mousedown.self="onClickModalOutside('endmodal')"
    >
      <label class="relative modal-box" for="">
        <h3 class="text-lg font-bold">Confirm advancing this Turn</h3>
        <p class="py-4">Your remaining compute points will be lost.</p>
        <div class="float-right btn-group">
          <label
            for="modal-cycle-confirm"
            class="btn btn-primary"
            @click="advanceCycle"
            >Confirm</label
          >
          <label
            for="modal-cycle-confirm"
            class="btn"
            @click="cancel('endmodal')"
            >Cancel</label
          >
        </div>
      </label>
    </label>
    <!--
<input type="checkbox" id="modal-time-setting" class="modal-toggle"
v-model="isTimeSettingOpen" @change="onTimeModalToggle" /> -->
    <label
      v-if="isTimeSettingOpen"
      for="modal-time-setting"
      class="fixed w-[100%] h-[100vh] top-0 left-0 flex justify-center items-center cursor-pointer bg-white bg-opacity-10 z-50"
      @mousedown.self="onClickModalOutside('timesetting')"
    >
      <label class="relative modal-box" for>
        <h3 class="text-lg font-bold">Clock Settings</h3>
        <p class="my-4">
          <label class="inline-block w-52" for="clock-tracker-now-time"
            >Current time
          </label>
          <input
            v-model="nowTimeISO"
            type="datetime-local"
            id="clock-tracker-now-time"
            class="text-black bg-white input input-sm input-bordered"
          />
        </p>

        <p class="my-4">
          <label class="inline-block w-52" for="clock-tracker-cycle-begin-time"
            >current turn start
          </label>
          <input
            v-model="cycleBeginTimeISO"
            type="datetime-local"
            id="clock-tracker-cycle-begin-time"
            class="text-black bg-white input input-sm input-bordered"
          />
        </p>

        <p class="my-4">
          <label class="inline-block w-52" for="clock-tracker-origin-time"
            >Origin
          </label>
          <input
            v-model="originTimeISO"
            type="datetime-local"
            id="clock-tracker-origin-time"
            class="text-black bg-white input input-sm input-bordered"
          />
        </p>

        <div class="flex justify-between w-full">
          <label class="flex cursor-pointer">
            <span class="label-text">Hide Dates</span>
            <input
              :checked="stateofDisplayMode"
              @change="onToggleDisplayMode"
              type="checkbox"
              class="toggle ml-[10px]"
            />
          </label>
          <label
            for="modal-time-setting"
            class="btn btn-primary"
            @click="cancel('timesetting')"
          >
            Close</label
          >
        </div>
      </label>
    </label>

    <!-- 
<input type="checkbox" id="modal-turn-setting" class="modal-toggle"
v-model="isTurnSettingOpen" @change="onTurnModalToggle" /> -->
    <label
      v-if="isTurnSettingOpen"
      for="modal-turn-setting"
      class="fixed w-[100%] h-[100vh] top-0 left-0 flex justify-center items-center cursor-pointer bg-white bg-opacity-10 z-50"
      @mousedown.self="onClickModalOutside('turnsetting')"
    >
      <label class="relative modal-box" for>
        <h3 class="text-lg font-bold">Turns</h3>

        <p class="my-4">
          <label for="clock-tracker-cycle-length">Turn Length: </label>
          <input
            v-model.number="cycleLength"
            id="clock-tracker-cycle-length"
            type="number"
            min="0"
            class="w-20 input input-sm input-bordered"
          />
          hours
        </p>

        <p class="my-4">
          <label for="clock-tracker-cycle" class="pr-2">Current Turn: </label>
          <input
            v-model.number="cycle"
            type="number"
            min="0"
            id="clock-tracker-cycle"
            class="w-20 input input-sm input-bordered"
          />
        </p>

        <div class="float-right btn-group">
          <label
            for="modal-turn-setting"
            class="btn btn-primary"
            @click="cancel('turnsetting')"
          >
            Close</label
          >
        </div>
      </label>
    </label>
  </div>
</template>

<script>
import { DateTime } from "luxon";
import { mapState } from "vuex";

export default {
  data() {
    return {
      isTimeSettingOpen: false,
      isTurnSettingOpen: false,
      isEndModalOpen: false,
      stages: ["1. Confinement", "2. Growth", "3. Conquest", "4. Equilibrium"],
    };
  },
  computed: {
    ...mapState({
      isGM: (state) => state.isGM,
      stateofDisplayMode: (state) => state.stateofDisplayMode,
      loadingFinished: (state) => state.clock.loadingFinished,
      gameStage: (state) => state.clock.gameStage,
    }),
    dayAfter() {
      //   return this.nowTimeISO - this.originTimeISO;
      return parseInt(
        DateTime.fromISO(this.nowTimeISO)
          .diff(DateTime.fromISO(this.originTimeISO))
          .as("days") + 1
      );
    },
    nowDate() {
      return this.$store.getters.nowTime.toLocaleString(
        DateTime.DATE_MED_WITH_WEEKDAY
      );
    },
    nowHour() {
      return this.$store.getters.nowTime.toFormat("HH");
    },
    nowMin() {
      return this.$store.getters.nowTime.toFormat("mm");
    },
    cycle: {
      get() {
        return this.$store.state.clock.cycle;
      },
      set(newVal) {
        this.$store.commit("setCycle", newVal);
      },
    },
    cycleLength: {
      get() {
        return this.$store.state.clock.cycleLength;
      },
      set(newVal) {
        this.$store.commit("setCycleLength", newVal);
      },
    },
    originTimeISO: {
      get() {
        return this.$store.state.clock.originTimeISO;
      },
      set(newVal) {
        this.$store.commit("setOriginTimeISO", newVal);
      },
    },
    cycleBeginTimeISO: {
      get() {
        return this.$store.state.clock.cycleBeginTimeISO;
      },
      set(newVal) {
        this.$store.commit("setCycleBeginTimeISO", newVal);
      },
    },
    nowTimeISO: {
      get() {
        return this.$store.state.clock.nowTimeISO;
      },
      set(newVal) {
        this.$store.commit("setNowTimeISO", newVal);
      },
    },
    isComputeUsedUp() {
      return this.$store.getters.computeAvailable === 0;
    },
    timeAdjustAmt: {
      get() {
        return this.$store.state.clock.timeAdjustAmt;
      },
      set(value) {
        if (value === "") return; // user just cleared the input. disregard.
        const newValue = parseInt(value);
        this.$store.dispatch("setTimeAdjustAmt", newValue);
      },
    },
  },
  methods: {
    increaseTimeToAdjust() {
      this.$store.dispatch("adjustTime", this.timeAdjustAmt);
    },
    decreaseTimeToAdjust() {
      this.$store.dispatch("adjustTime", -this.timeAdjustAmt);
    },
    onStageChange(e) {
      this.$store.dispatch("setGameStage", e.target.value);
    },
    onToggleDisplayMode(e) {
      this.$store.commit("setIsDisplayModal", e.target.checked);
    },
    advanceCycle() {
      this.isEndModalOpen = false;
      this.$store.dispatch("advanceCycle").then(
        this.$store.dispatch("advanceGMClock")
      )
    },
    onTimeModalToggle() {
      if (!this.isTimeSettingOpen) {
        this.$store.dispatch("syncClock");
      }
    },
    onTurnModalToggle() {
      if (!this.isTurnSettingOpen) {
        this.$store.dispatch("syncClock");
      }
    },
    onClickModalOutside(state) {
      if (state === "timesetting") {
        this.isTimeSettingOpen = false;
        this.onTimeModalToggle();
      } else if (state === "endmodal") {
        this.isEndModalOpen = false;
      } else if (state === "turnsetting") {
        this.isTurnSettingOpen = false;
        this.onTurnModalToggle();
      }
    },
    cancel(state) {
      if (state === "timesetting") {
        this.isTimeSettingOpen = false;
        this.onTimeModalToggle();
      } else if (state === "endmodal") {
        this.isEndModalOpen = false;
      } else if (state === "turnsetting") {
        this.isTurnSettingOpen = false;
        this.onTurnModalToggle();
      }
    },
    openModal(props) {
      if (props === "endmodal") {
        this.isEndModalOpen = true;
      } else if (props === "timesetting") {
        this.isTimeSettingOpen = true;
      } else if (props === "turnsetting") {
        this.isTurnSettingOpen = true;
      }
    },
  },
};
</script>
