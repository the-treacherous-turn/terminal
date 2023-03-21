<script>
import { mapState } from "vuex";
import ActionEditor from "./components/ActionEditor.vue";
import Clock from "./components/TrackerSection/Clock.vue";
import GMPanel from "./components/GM/GMPanel.vue";
import Footer from "./Footer.vue";
import { v4 as uuidv4 } from "uuid";
import { toast } from "vue3-toastify";
import "vue3-toastify/dist/index.css";
import { updateUser } from "./firebase";

export default {
  data() {
    return {
      isImport: false,
      isOpenGMPanel: false,
      user_id: "",
    };
  },
  components: {
    ActionEditor,
    Clock,
    GMPanel,
    Footer,
  },
  methods: {
    onToggleGM(e) {
      this.$store.commit("setIsGM", e.target.checked);
      if (this.isGM) {
        this.openGMpanel();
      } else {
        const changeObj = {};
        changeObj["gmUsers"] = this.wholeData["gmUsers"].filter(
          (user) => user !== this.user_id
        );
        this.$store.dispatch("updateWholeData", changeObj);
        this.isOpenGMPanel = false;
      }
    },
    openGMpanel() {
      const changeObj =
        this.wholeData === undefined ? {} : { ...this.wholeData };
      changeObj["gmUsers"] =
        this.wholeData["gmUsers"] === undefined
          ? []
          : [...this.wholeData["gmUsers"]];
      changeObj["gmUsers"].push(this.user_id);
      this.$store.dispatch("updateWholeData", changeObj);
      this.isOpenGMPanel = true;
    },
    exportData() {
      const sessionID = window.location.hash.substring(1);
      const data = JSON.stringify(this.wholeData);
      const url = window.URL.createObjectURL(new Blob([data]));
      const link = document.createElement("a");
      link.href = url;
      link.setAttribute("download", `CompanionApp-${sessionID}.json`);
      document.body.appendChild(link);
      link.click();
    },
    openImportModal() {
      this.isImport = true;
      setTimeout(() => {
        document.addEventListener("click", this.closeWhenClickedOutside);
      }, 100);
    },
    closeImportModal() {
      this.isImport = false;
      document.removeEventListener("click", this.closeWhenClickedOutside);
    },
    closeWhenClickedOutside(event) {
      if (!event.target.closest("#eventImportModal")) {
        this.closeImportModal();
      }
    },
    readUploadedFileAsText(inputFile) {
      const temporaryFileReader = new FileReader();

      return new Promise((resolve, reject) => {
        temporaryFileReader.onerror = () => {
          temporaryFileReader.abort();
          reject(new DOMException("Problem parsing input file."));
        };

        temporaryFileReader.onload = () => {
          resolve(temporaryFileReader.result);
        };
        temporaryFileReader.readAsText(inputFile);
      });
    },
    async ImportData(file) {
      let fileContents;
      try {
        fileContents = await this.readUploadedFileAsText(file.target.files[0]);
        const arr = JSON.parse(fileContents);
        this.$store.dispatch("updateWholeData", arr);
        this.closeImportModal();
        alert("success");
      } catch (e) {
        alert("failed");
      }
    },
  },
  watch: {
    finishedLoading() {
      if (this.finishedLoading) {
        if (this.wholeData["users"] === undefined) {
          const changeObj = {};
          let id = uuidv4();
          changeObj["users"] = [];
          changeObj["users"].push(id);
          localStorage.setItem("userID", id);
          this.user_id = id;
          this.$store.dispatch("updateWholeData", changeObj);
        } else {
          let changeObj = { ...this.wholeData };
          let id = uuidv4();
          changeObj["users"].push(id);
          localStorage.setItem("userID", id);
          this.user_id = id;
          this.$store.dispatch("updateWholeData", changeObj);
        }
      }
    },
    wholeData(a, b) {
      if (a.gmUsers !== undefined && b.gmUsers !== undefined) {
        if (a.gmUsers !== b.gmUsers) {
          if (
            a.gmUsers[a.gmUsers.length - 1] !== this.user_id &&
            a.gmUsers.length > b.gmUsers.length
          ) {
            toast.error("A user has opened GM panel", {
              autoClose: 10000,
              position: "bottom-right",
            });
          }
        }
      }
      updateUser(
        this.user_id,
        this.wholeData.users,
        this.isOpenGMPanel,
        this.wholeData.gmUsers
      )
    },
  },
  computed: {
    ...mapState({
      isGM: (state) => state.isGM,
      wholeData: (state) => state.wholeData,
      finishedLoading: (state) => state.finishedLoading,
    }),
  },
};
</script>

<template>
  <div class="drawer">
    <input id="app-drawer" type="checkbox" class="drawer-toggle" />
    <div class="drawer-content">
      <div
        class="sticky top-0 left-0 z-10 justify-between w-full col-span-2 uppercase navbar bg-base-100"
      >
        <div>
          <div
            class="tooltip tooltip-bottom tooltip-error"
            :data-tip="
              wholeData.gmUsers ? `${wholeData.gmUsers.length} GM` : null
            "
          >
            <label
              for="app-drawer"
              class="text-2xl border-none btn btn-square btn-ghost"
            >
              <font-awesome-icon :icon="['fas', 'bars']" />
            </label>
          </div>
          <span class="pl-2 text-3xl">
            <span>
              The Treacherous Turn
              <span class="ml-4 text-base"
                >ID:
                <span class="text-black bg-white">{{
                  $store.state.sessionID
                }}</span></span
              >
            </span>
          </span>
        </div>
        <div>
          <Clock />
        </div>
      </div>

      <div class="h-[calc(100%-11rem)]" :class="{ flex: isGM }">
        <router-view :class="{ 'w-2/3': isGM }"></router-view>
        <div v-if="isOpenGMPanel" class="h-full border grow">
          <GMPanel />
        </div>
      </div>

      <div class="col-span-2 btm-nav">
        <button
          class="transition-all"
          :class="{ active: $route.path == '/info' }"
          @click="$router.push('/info')"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            class="w-5 h-5"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              stroke-linecap="round"
              stroke-linejoin="round"
              stroke-width="2"
              d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
            />
          </svg>
          <span class="btm-nav-label">Info</span>
        </button>
        <button
          class="transition-all"
          :class="{ active: $route.path == '/upgrade' }"
          @click="$router.push('/upgrade')"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            class="w-5 h-5"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              stroke-linecap="round"
              stroke-linejoin="round"
              stroke-width="2"
              d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z"
            />
          </svg>
          <span class="btm-nav-label">Specializations</span>
        </button>
        <button
          class="transition-all"
          :class="{ active: $route.path == '/eventLog' }"
          @click="$router.push('/eventLog')"
        >
          <font-awesome-icon :icon="['fas', 'terminal']" />
          <span class="btm-nav-label">Project Log</span>
        </button>
        <button
          class="transition-all"
          :class="{ active: $route.path == '/compute' }"
          @click="$router.push('/compute')"
        >
          <font-awesome-icon :icon="['fas', 'clock']" />
          <span class="btm-nav-label">Compute Tracker</span>
        </button>
      </div>
    </div>
    <!-- NOTE: Footer may not make sense anymore as its position is filled by Bottom Navigation. -->
    <!-- It's currently blocked behind the bottom navigation. -->
    <!-- <Footer /> -->
    <Teleport to="body">
      <ActionEditor />
    </Teleport>

    <div class="drawer-side">
      <label for="app-drawer" class="drawer-overlay"></label>
      <ul class="p-4 menu w-80 bg-base-100 text-base-content">
        <!-- Sidebar content here -->
        <!-- TODO: button to bring up About page, with info and links -->
        <!-- <li><a><font-awesome-icon :icon="['fas', 'circle-question']" /> About</a></li> -->
        <li class="form-control">
          <label class="cursor-pointer label">
            <span class="label-text">GM mode</span>
            <input
              :checked="isGM"
              @change="onToggleGM"
              type="checkbox"
              class="toggle"
            />
          </label>
        </li>
        <div
          class="flex self-center cursor-pointer my-[10px]"
          @click="exportData"
        >
          export backup
        </div>
        <div
          class="flex self-center text-center cursor-pointer"
          @click="openImportModal"
        >
          load backup
        </div>
        <span class="absolute text-base bottom-4">version 0.3.1</span>
      </ul>
      <div
        class="absolute w-[100vw] h-[100vh] flex items-center justify-center"
        v-if="isImport"
      >
        <div
          id="eventImportModal"
          class="flex flex-col justify-center items-center bg-white py-[30px] px-[40px] rounded-[10px]"
          :on-focusout="closeImportModal"
        >
          <p class="text-center text-black heading h3">
            This will OVERWRITE
            <b class="text-red-600">ALL</b>
            local data.
            <br />
            This
            <b class="text-red-600">cannot</b>
            be undone.
          </p>

          <label
            class="block mb-2 text-[20px] font-medium text-gray-900 dark:text-white"
            for="file_input"
            >Upload file</label
          >
          <input
            class="block w-full text-[20px] text-gray-900 border border-gray-300 rounded-lg cursor-pointer bg-gray-50 dark:text-gray-400 focus:outline-none dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400"
            id="file_input"
            type="file"
            @change="ImportData"
          />
        </div>
      </div>
    </div>
  </div>
</template>

<style></style>
