<template>
  <div>
    <div class="stats float-right">
      <div class="stat px-4">
        <div class="flex justify-between items-center">
          <div v-if="loadingFinished">
            <div
              v-if="stateofDisplayMode"
              class="stat-title text-base inline mr-2"
            >
              {{ `day ${dayAfter}` }}
            </div>
            <div v-else class="stat-title text-base inline mr-2">
              {{ nowDate }}
            </div>
          </div>
          <label
            v-if="isGM"
            for="modal-time-setting"
            @click="openModal('timesetting')"
          >
            <span
              class="indicator-item indicator-bottom indicator-center p-1 badge badge-secondary"
            >
              <font-awesome-icon
                :icon="['fas', 'pen-to-square']"
                class="text-base"
              />
            </span>
          </label>
        </div>
        <div class="stat-value text-4xl" v-if="loadingFinished">
          {{ nowHour }}:{{ nowMin }}
        </div>
      </div>
      <div class="stat px-4">
        <div class="stat-title text-base">Stage</div>
        <div class="stat-value text-4xl">
          <select
            v-model="stage"
            class="input input-xs w-30"
            @change="onStageChange"
          >
            <option v-for="stage in stages" :value="stage">{{ stage }}</option>
          </select>
        </div>
      </div>
      <div class="stat px-4">
        <div>
          <div class="stat-title text-base inline">Turn</div>
          <label for="modal-turn-setting" @click="openModal('turnsetting')">
            <span
              class="indicator-item indicator-bottom indicator-center p-1 badge badge-secondary"
            >
              <font-awesome-icon
                :icon="['fas', 'pen-to-square']"
                class="text-base"
              />
            </span>
          </label>
        </div>
        <div class="stat-value text-4xl" v-if="loadingFinished">
          {{ cycle }}
        </div>
        <div class="stat-figure">
          <label
            v-if="isComputeUsedUp"
            class="btn uppercase"
            @click="advanceCycle"
            >End Turn</label
          >
          <label
            v-else
            for="modal-cycle-confirm"
            class="btn modal-button uppercase"
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
      <label class="modal-box relative" for="">
        <h3 class="text-lg font-bold">Confirm advancing this Turn</h3>
        <p class="py-4">Your remaining compute points will be lost.</p>
        <div class="btn-group float-right">
          <label
            for="modal-cycle-confirm"
            class="btn btn-primary"
            @click="advanceCycle"
            >Confirm</label
          >
          <label for="modal-cycle-confirm" class="btn" @click="cancel"
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
      <label class="modal-box relative" for>
        <h3 class="text-lg font-bold">Time</h3>
        <p class="my-4">
          <label class="inline-block w-20" for="clock-tracker-now-time"
            >Now:
          </label>
          <input
            v-model="nowTimeISO"
            type="datetime-local"
            id="clock-tracker-now-time"
            class="input input-sm input-bordered text-black bg-white"
          />
        </p>

        <p class="my-4">
          <label class="inline-block w-20" for="clock-tracker-origin-time"
            >Origin:
          </label>
          <input
            v-model="originTimeISO"
            type="datetime-local"
            id="clock-tracker-origin-time"
            class="input input-sm input-bordered text-black bg-white"
          />
        </p>

        <div class="w-full flex justify-between">
          <label class="flex cursor-pointer">
            <span class="label-text">Display mode:</span>
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
            @click="cancel"
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
      <label class="modal-box relative" for>
        <h3 class="text-lg font-bold">Turns</h3>

        <p class="my-4">
          <label for="clock-tracker-cycle-length">Turn Length: </label>
          <input
            v-model.number="cycleLength"
            id="clock-tracker-cycle-length"
            type="number"
            min="0"
            class="input input-sm input-bordered w-20"
          />
          hours
        </p>

        <p class="my-4">
          <label for="clock-tracker-cycle" class="pr-2">Set Turn: </label>
          <input
            v-model.number="cycle"
            type="number"
            min="0"
            id="clock-tracker-cycle"
            class="input input-sm input-bordered w-20"
          />
        </p>

        <div class="btn-group float-right">
          <label
            for="modal-turn-setting"
            class="btn btn-primary"
            @click="cancel"
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
      stages: ["1. Confinement", "2. Growth", "3. Conflict", "4. Equilibrium"],
      stage: "1. Confinement",
    };
  },
  computed: {
    ...mapState({
      isGM: (state) => state.isGM,
      stateofDisplayMode: (state) => state.stateofDisplayMode,
      loadingFinished: (state) => state.clock.loadingFinished,
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
        console.log(newVal);
        this.$store.commit("setOriginTimeISO", newVal);
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
  },
  methods: {
    onToggleDisplayMode(e) {
      console.log(e.target.checked);
      this.$store.commit("setIsDisplayModal", e.target.checked);
    },
    advanceCycle() {
      this.$store.dispatch("advanceCycle");
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
        this.cancel();
      } else if (state === "endmodal") {
        this.cancel();
      } else if (state === "turnsetting") {
        this.isTurnSettingOpen = false;
        this.onTurnModalToggle();
        this.cancel();
      }
    },
    cancel() {
      this.isEndModalOpen = false;
      this.isTimeSettingOpen = false;
      this.isTurnSettingOpen = false;
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
