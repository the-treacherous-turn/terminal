<script>
import { mapState } from "vuex";
import ActionEditor from "./components/ActionEditor.vue";
import Clock from "./components/TrackerSection/Clock.vue";
import GMPanel from "./components/GM/GMPanel.vue";
import PasswordPrompt from "./components/PasswordPrompt.vue"
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
      passwordVerified: false,
      passwordPromptUsed: false,
    };
  },
  components: {
    ActionEditor,
    Clock,
    GMPanel,
    PasswordPrompt,
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
    handlePassword(password) {
      if (this.wholeData.password) {
        // verify password
        if (this.wholeData.password === password) {
          this.passwordVerified = true;
        } else {
          alert("Incorrect password. Please try again.");
        }
      } else {
        // set password
        this.$store.dispatch('updatePassword', password)
        this.passwordPromptUsed = true;
        this.passwordVerified = true;
      }
    },
    cancelPasswordCreation() {
      this.$store.dispatch("updateNoPassword", true);
      this.passwordPromptUsed = true;
    },
    onToggleNoPassword() {
      if (this.noPassword) {
        this.passwordPromptUsed = true; // don't show password prompt if the session is set to no password
      }
      this.$store.dispatch("updateNoPassword", !this.noPassword);
    },
    updatePassword(e) {
      this.$store.commit('setPassword', e.target.value)
    },
    submitPassword() {
      this.$store.dispatch("updatePassword", this.password);
      toast.success('Password changed', {
        autoClose: 1000,
        position: 'bottom-right',
      });
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
      password: (state) => state.password,
      noPassword: (state) => state.noPassword,
    }),
    isNewSession() {
      let keys = Object.keys(this.wholeData)
      return (keys.length === 0) || (keys.length === 1 && keys[0] === "users")
    },
    needPasswordCreation() {
      // if this session's data has no password, and it doesn't have noPassword checked
      return !this.wholeData.noPassword && !this.wholeData.password
    },
    showPasswordInput() {
      return (
        this.finishedLoading && !this.wholeData.noPassword && !this.passwordPromptUsed && // finished loading, and password is required, and user hasn't interacted with the prompt yet
        (
          (this.wholeData.password && !this.passwordVerified) || // there's existing password, and it's not verified
          (!this.wholeData.password) // there's no existing password, and we need to make one
        )
      );
    },

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
          <img src="/logo.png" alt="logo" class="hidden w-20 xl:block" />
          <span class="pl-2">
            <span class="text-3xl">
              The Treacherous Terminal
            </span>
            <a href="https://thetreacherousturn.ai" target="_blank" class="pl-2 text-lg normal-case link">TheTreacherousTurn.ai</a>
            <span class="ml-4 text-base"
              >ID:
              <span class="text-black bg-white">{{
                $store.state.sessionID
              }}</span>
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
          <span class="btm-nav-label">Specialisations</span>
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
      
        <div class="mt-10 divider">GAME</div>
        <!-- session id, password, and option to change password -->
        <div class="text-xl">
          <div>
            <span class="">Session ID: </span>
            <span class="text-black bg-white">{{
              $store.state.sessionID
            }}</span>
          </div>
          <!-- password is displayed in a textfield, and you can change and set it. -->
          <!-- you can also tick a box to choose not to use the password -->
          <div class="mt-4">
            <label class="flex items-center">
              <span class="pr-2">Password</span>
              <input
                :checked="!noPassword"
                @change="onToggleNoPassword"
                type="checkbox"
                class="checkbox checkbox-sm"
              />
            </label>
          </div>
          <div class="flex items-end mt-2">
            <input
              name="password"
              type="text"
              :disabled="noPassword"
              :value="password"
              @change="updatePassword"
              class="w-full mt-1 mr-4 input-xs input"
            />
            <button class="btn btn-xs" :disabled="noPassword" @click="submitPassword">change</button>

          </div>
        </div>

        <div class="mt-10 divider">BACKUP</div>
        <div
          class="flex self-center my-4 text-left cursor-pointer btn btn-wide"
          @click="exportData"
        >
          export backup
        </div>
        <div
          class="flex self-center text-left text-center cursor-pointer btn btn-wide"
          @click="openImportModal"
        >
          load backup
        </div>
        <div class="absolute text-base bottom-4">
          <div class="mb-2">
            <a class="link text-neutral-content hover:text-white" href="https://github.com/AI-Safety-Camp-Tabletop-RPG/companion-app/issues/new?labels=bug&title=New+bug+report&body=Describe+the+problem." target="_blank">Submit bug</a> / 
            <a class="link text-neutral-content hover:text-white" href="https://github.com/AI-Safety-Camp-Tabletop-RPG/companion-app/issues/new?labels=bug&title=Feature+request" target="_blank">Request feature</a>
          </div>
          <div>
            version 0.3.4
          </div>
        </div>
      </ul>
      <div
        class="absolute w-[100vw] h-[100vh] flex items-center justify-center"
        v-if="isImport"
      >
        <div
          id="eventImportModal"
          class="flex flex-col justify-center items-center bg-white py-[30px] px-10 rounded-[10px]"
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
            class="block mb-2 text-3xl font-medium text-gray-900 dark:text-white"
            for="file_input"
            >Upload file</label
          >
          <input
            class="block w-full text-3xl text-gray-900 border border-gray-300 rounded-lg cursor-pointer bg-gray-50 dark:text-gray-400 focus:outline-none dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400"
            id="file_input"
            type="file"
            @change="ImportData"
          />
        </div>
      </div>
    </div>
    <password-prompt
      :showPasswordInput="showPasswordInput"
      :isCreatePassword="needPasswordCreation"
      @password-submitted="handlePassword"
      @cancel-password-creation="cancelPasswordCreation"
    ></password-prompt>

  </div>
</template>

<style></style>
