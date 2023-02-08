<script>
import { mapState } from 'vuex'
import ActionEditor from './components/ActionEditor.vue'
import GMPanel from './components/GM/GMPanel.vue'
import Footer from './Footer.vue'

export default {
    data() {
        return{
            isImport: false
        }
    },
  components: {
    ActionEditor,
    GMPanel,
    Footer,
  },
  methods: {
    onToggleGM(e) {
      this.$store.commit('setIsGM', e.target.checked)
    },
    exportData() {
        // console.log(this.wholeData)
      const sessionID = window.location.hash.substring(1)
      const data = JSON.stringify(this.wholeData);
      const url = window.URL.createObjectURL(new Blob([data]))
      const link = document.createElement('a')
      link.href = url
      link.setAttribute('download', `CompanionApp-${sessionID}.json`)
      document.body.appendChild(link)
      link.click()
    },
    openImportModal() {
        this.isImport = true
        setTimeout(() => {
            document.addEventListener('click', this.closeWhenClickedOutside);
        }, 100);
    },
    closeImportModal() {
        this.isImport = false
        document.removeEventListener('click', this.closeWhenClickedOutside)
    },
    closeWhenClickedOutside(event) {
        if(!event.target.closest('#eventImportModal')){
            this.closeImportModal();
        }
    },
    readUploadedFileAsText(inputFile){
        // console.log(inputFile)
        const temporaryFileReader = new FileReader();

        return new Promise((resolve, reject) => {
            temporaryFileReader.onerror = () => {
                temporaryFileReader.abort();
                reject(new DOMException("Problem parsing input file."));
                // console.log("Problem parsing input file.")
            };

            temporaryFileReader.onload = () => {
                resolve(temporaryFileReader.result);
            };
            temporaryFileReader.readAsText(inputFile);
        });
    },
    async ImportData(file){
        let fileContents;
        try {
            fileContents = await this.readUploadedFileAsText(file.target.files[0])
            const arr = JSON.parse(fileContents)
            this.$store.dispatch("updateWholeData", arr)
            this.closeImportModal()
            alert('suceess')
        } catch (e) {
            alert('failed')
        }
    },
  },
  computed: {
    ...mapState({
      isGM: state => state.isGM,
      wholeData: state => state.wholeData,
    })
    // ...mapState(['isGM']),
  },
}
</script>

<template>
<div class="drawer">
<input id="app-drawer" type="checkbox" class="drawer-toggle" />
<div class="drawer-content">

<div class="navbar uppercase bg-base-100 w-full col-span-2 sticky top-0 left-0 z-10">
  <div class="tooltip tooltip-bottom z-50 lowercase" data-tip="menu">
    <label for="app-drawer" class="btn btn-square btn-ghost border-none text-2xl">
      <font-awesome-icon :icon="['fas', 'bars']" />
    </label>
  </div>
  <span class="text-3xl pl-2">
    <span>
      The Treacherous Turn <span class="text-base">v0.3.0</span> <span class="text-base ml-4">Session ID: <span class="bg-white text-black">{{$store.state.sessionID}}</span></span>
    </span>
  </span>
</div>

<div class="h-[calc(100%-8rem)]" :class="{'flex':isGM}">
  <router-view :class="{'w-2/3':isGM}"></router-view>
  <div v-if="isGM" class="border grow h-full">
    <GMPanel />
  </div>
</div>

<div class="btm-nav col-span-2">
  <!-- <button class="transition-all" :class="{'active':($route.path == '/')}" @click="$router.push('/')">
    <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6" /></svg>
    <span class="btm-nav-label">Long Mode Tracker</span>
  </button> -->
  <button class="transition-all" :class="{'active':($route.path == '/info')}" @click="$router.push('/info')">
    <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>
    <span class="btm-nav-label">Info</span>
  </button>
  <button class="transition-all" :class="{'active':($route.path == '/upgrade')}" @click="$router.push('/upgrade')">
    <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" /></svg>
    <span class="btm-nav-label">Specializations</span>
  </button>
  <button class="transition-all" :class="{'active':($route.path == '/eventLog')}" @click="$router.push('/eventLog')">
    <font-awesome-icon :icon="['fas', 'terminal']" />
    <span class="btm-nav-label">Project Log</span>
  </button>
  <button class="transition-all" :class="{'active':($route.path == '/compute')}" @click="$router.push('/compute')">
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
  <ul class="menu p-4 w-80 bg-base-100 text-base-content">
    <!-- Sidebar content here -->
    <!-- TODO: button to bring up About page, with info and links -->
    <!-- <li><a><font-awesome-icon :icon="['fas', 'circle-question']" /> About</a></li> -->
    <li class="form-control">
        <label class="label cursor-pointer">
          <span class="label-text">GM mode</span>
          <input :checked="isGM" @change="onToggleGM" type="checkbox" class="toggle"/>
        </label>
    </li>
    <div class="flex self-center cursor-pointer my-[10px]" @click="exportData">export backup</div>
    <div class="flex self-center text-center cursor-pointer" @click="openImportModal">
        load backup
    </div>
</ul>
<div class="absolute w-[100vw] h-[100vh] flex items-center justify-center" v-if="isImport">
    <div id="eventImportModal" class="flex flex-col justify-center items-center bg-white py-[30px] px-[40px] rounded-[10px]" :on-focusout="closeImportModal">
        <p class="text-center heading h3 text-black">
            This will OVERWRITE
            <b class="text-red-600">ALL</b>
            local data.
            <br />
            This
            <b class="text-red-600">cannot</b>
            be undone.
        </p>

        <label class="block mb-2 text-[20px] font-medium text-gray-900 dark:text-white" for="file_input">Upload file</label>
        <input class="block w-full text-[20px] text-gray-900 border border-gray-300 rounded-lg cursor-pointer bg-gray-50 dark:text-gray-400 focus:outline-none dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400" id="file_input" type="file" @change="ImportData">
    </div>
</div>
</div>

</div>
</template>

<style>
</style>
