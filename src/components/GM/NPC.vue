<script>
export default {
  data() {
    return{
      initialData: [
        {
        name:'Edith Hartman',
        type:'Human,Ind.(Minor)',
        status:'Status1',
        description: 'An older woman with greying hair and a tall posture who is the stern but caring administrator of Emerald Hills. Out of all of the staff, she is the most distrustful and hostile towards PAC. She is in her office most of the time, but occassionally leaves for several minutes. At 21:00 each day, she locks her office and leaves, taking the key with her until 12:00 the next day. '
        },
        {
        name:'Edith Hartman',
        type:'Human,Ind.(Minor)',
        status:'Status1',
        description: 'An older woman with greying hair and a tall posture who is the stern but caring administrator of Emerald Hills. Out of all of the staff, she is the most distrustful and hostile towards PAC. She is in her office most of the time, but occassionally leaves for several minutes. At 21:00 each day, she locks her office and leaves, taking the key with her until 12:00 the next day. '
        },
    ],
    isOpenEditor: false,
    isDeleteFlag: false,
  }},
  methods: {
    addNpc() {
      this.isOpenEditor = true
    },
    close() {
      this.isOpenEditor = false
    },
    openDeleteModal() {
      console.log("delete")
      this.isDeleteFlag = true
    },
    cancelDeleteModal() {
      this.isDeleteFlag = false
    },
    resize(e) {
      let area_ele = this.$refs[e];
      area_ele.style.height = '28px'
      area_ele.style.height = area_ele.scrollHeight + 'px'
    },
    process(e){
      let val = document.getElementById(e)
      val.value = val.value + "• "
    }
  },
}
</script>

<template>
  <div class="uppercase fixed z-50 top-0 left-0 w-full h-full bg-black/50 table transition-opacity"
    v-if="isDeleteFlag">
    <div class="table-cell align-middle bg-transparent">
      <div class="
        modal-container
        relative
        w-2/5 m-auto
        border
        transition-all
        bg-grey
        p-[24px]
        border-3
        border-black
        ">
        <div class="text-[20px] text-black font-bold">Are you sure you want to delete the current NPC?</div>
        <div class="mt-[24px] text-[20px] text-black">This action cannot be reverse.</div>
        <div class="flex mt-[48px] justify-end items-end">
          <button class="text-middlegrey text-[14px] px-[16px] py-[8px] border border-black" @click="cancelDeleteModal">Cancel</button>
          <button class="ml-[24px] bg-[#1D2225] text-grey text-[14px] px-[16px] py-[8px] border border-white">DELETE NPC</button>
        </div>
      </div>
    </div>
  </div>

  <div v-if="isOpenEditor" class="flex flex-col w-full h-[calc(100%-63px)]">
    <div class="flex justify-between items-center w-full mt-[9px] px-[23px]">
      <div class="flex justify-center items-center cursor-pointer" @click="close">
        <div class="w-[14px] h-[24px] bg-[url('/back_icon.png')] bg-cover"></div>
        <div class="ml-[15px] text-[20px] text-grey">back</div>
      </div>
      <div class="flex" @click="openDeleteModal">
        <font-awesome-icon
          :icon="['fas', 'trash-can']" class="cursor-pointer text-primary-content hover:text-white"
        />
      </div>
    </div>
    <div class="flex flex-col w-full h-[calc(100%)] overflow-y-scroll">
      <div class="mt-[24px] flex justify-between items-center px-[23px]">
        <div class="flex flex-col">
          <div class="text-[14px] text-white">Name</div>
          <input placeholder="Enter Name" class="bg-darkgray text-[20px] mt-[8px] text-white placeholder-white font-bold outline-none"/>
        </div>
        <div class="flex flex-col items-end">
          <div class="text-[14px] text-white">Status</div>
          <input placeholder="[None]" dir="rtl" class="bg-darkgray text-[20px] mt-[8px] text-white placeholder-white outline-none"/>
        </div>
      </div>
      <div class="mt-[16px] flex justify-between items-center border-b w-full border-b-3 border-b-white px-[23px] pb-[8px]">
        <div class="flex flex-col">
          <div class="text-[14px] text-white">Type</div>
          <input placeholder="[None]" class="bg-darkgray w-[100px] text-[20px] mt-[8px] text-white placeholder-white outline-none"/>
        </div>
        <div class="flex flex-col">
          <div class="text-[14px] text-white">Size</div>
          <input placeholder="[None]" class="bg-darkgray w-[100px] text-[20px] mt-[8px] text-white placeholder-white outline-none"/>
        </div>
        <div class="flex flex-col items-end">
          <div class="text-[14px] text-white">Scale</div>
          <input placeholder="[None]" dir="rtl" class="bg-darkgray w-[100px] text-[20px] mt-[8px] text-white placeholder-white outline-none"/>
        </div>
      </div>
      <div class="py-[4px] px-[16px] border-b-3 border-b-white border-b">
        <textarea ref="textarea_des" placeholder="Type description here" @input="resize('textarea_des')" role="textbox" class="bg-darkgray text-[20px] mt-[8px] text-white placeholder-white outline-none w-full" :style="{resize:'none'}"></textarea>
      </div>
      <div class="flex border-b-3 border-b-white border-b">
        <div class="flex justify-center -rotate-180 text-white text-[20px] border-l-3 border-l-white border-l px-[12px]" :style="{writingMode:'vertical-lr'}">
          CHARACTERISTICS
        </div>
        <div class="flex flex-col px-1 w-full">
          <div class="flex flex-col px-[12px] py-[5px] border-b-1 border-b-white first-letter:border-b ">
            <div class="text-[14px] text-white font-bold">Trust</div>
            <textarea id="textarea_trust" ref="textarea_trust" placeholder="[None]" v-on:keyup.enter="process('textarea_trust')" @input="resize('textarea_trust')" role="textbox" class="bg-darkgray text-[20px] mt-[8px] text-white placeholder-white outline-none w-full" :style="{resize:'none'}">• </textarea>
          </div>
          <div class="flex flex-col px-[12px] py-[5px] border-b-1 border-b-white first-letter:border-b ">
            <div class="text-[14px] text-white font-bold">Leverage</div>
            <textarea id="textarea_lev" ref="textarea_lev" placeholder="[None]" v-on:keyup.enter="process('textarea_lev')" @input="resize('textarea_lev')" role="textbox" class="bg-darkgray text-[20px] mt-[8px] text-white placeholder-white outline-none w-full" :style="{resize:'none'}">• </textarea>
          </div>
          <div class="flex flex-col px-[12px] py-[5px]">
            <div class="text-[14px] text-white font-bold">Emotion</div>
            <textarea id="textarea_emo" ref="textarea_emo" placeholder="[None]" v-on:keyup.enter="process('textarea_emo')" @input="resize('textarea_emo')" role="textbox" class="bg-darkgray text-[20px] mt-[8px] text-white placeholder-white outline-none w-full" :style="{resize:'none'}">• </textarea>
          </div>
        </div>
      </div>
      <div class="flex flex-col py-[5px] border-b border-b-3 border-b-white">
        <div class="text-[14px] ml-[16px] text-white font-normal">Connections</div>
        <textarea id="textarea_connect" ref="textarea_connect" placeholder="[None]" v-on:keyup.enter="process('textarea_connect')" @input="resize('textarea_connect')" role="textbox" class="ml-[16px] bg-darkgray text-[20px] mt-[8px] text-white placeholder-white outline-none w-full" :style="{resize:'none'}">• </textarea>
      </div>
      <div class="flex flex-col py-[5px] border-b border-b-3 border-b-white">
        <div class="text-[14px] ml-[16px] text-white font-normal">Assests & Capabilities</div>
        <textarea id="textarea_assets" ref="textarea_assets" placeholder="[None]" v-on:keyup.enter="process('textarea_assets')" @input="resize('textarea_assets')" role="textbox" class="ml-[16px] bg-darkgray text-[20px] mt-[8px] text-white placeholder-white outline-none w-full" :style="{resize:'none'}">• </textarea>
      </div>
      <div class="flex flex-col py-[5px] border-b border-b-3 border-b-white">
        <div class="text-[14px] ml-[16px] text-white font-normal">Notes</div>
        <textarea id="textarea_notes" ref="textarea_notes" placeholder="Type notes here" @input="resize('textarea_notes')" role="textbox" class="ml-[16px] bg-darkgray text-[20px] mt-[8px] text-white placeholder-white outline-none w-full" :style="{resize:'none'}"></textarea>
      </div>
    </div>
  </div>
  <div v-else class="flex flex-col w-full px-[23px]">
    <div class="flex justify-between mt-[26px]">
      <div class="flex px-[16px] py-[4px] border-white border-1 justify-center items-center">
        <div class="text-grey text-[14px]">search</div>
        <div class="w-[24px] h-[24px] bg-[url('/search_icon.png')] bg-cover ml-[16px]"></div>
      </div>
      <div class="flex px-[16px] py-[8px] border-white border-1 justify-center items-center cursor-pointer" @click="addNpc">
        <div class="text-grey text-[14px] leading-snug">add NPC</div>
        <div class="w-[15px] h-[15px] bg-[url('/Union.png')] bg-cover ml-[8px]"></div>
      </div>
    </div>
    <div class="mt-[40px] flex flex-col w-full">
      <div class="flex justify-between">
        <div class="flex justify-between w-[140px]">
          <div class="text-[16px] text-white">Name</div>
          <div class="flex flex-col">
            <div class="w-[12px] h-[9px] bg-[url('/btn_up.png')] bg-cover"></div>
            <div class="mt-[3px] w-[12px] h-[9px] bg-[url('/btn_down.png')] bg-cover"></div>
          </div>
        </div>
        <div class="flex justify-between w-[150px]">
          <div class="text-[16px] text-white">Type</div>
          <div class="flex justify-center items-center">
            <div class="w-[16px] h-[14px] bg-[url('/filter.png')] bg-cover"></div>
            <div class="flex flex-col ml-[8px]">
              <div class="w-[12px] h-[9px] bg-[url('/btn_up.png')] bg-cover"></div>
              <div class="mt-[3px] w-[12px] h-[9px] bg-[url('/btn_down.png')] bg-cover"></div>
            </div>
          </div>
        </div>
        <div class="flex justify-between w-[100px]">
          <div class="text-[16px] text-white">Status</div>
          <div class="flex flex-col">
            <div class="w-[12px] h-[9px] bg-[url('/btn_up.png')] bg-cover"></div>
            <div class="mt-[3px] w-[12px] h-[9px] bg-[url('/btn_down.png')] bg-cover"></div>
          </div>
        </div>

      </div>
    </div>
    <div v-for="data in initialData" class="flex flex-col mt-[16px] space-y-[12px]">
      <div class="flex justify-between tooltip tooltip-info" :data-tip="data.description">
        <div class="text-[14px] text-white w-[140px] font-bold flex">{{data.name}}</div>
        <div class="text-[14px] text-white w-[150px] font-bold flex">{{data.type}}</div>
        <div class="text-[14px] text-white w-[100px] font-bold flex">{{data.status}}</div>
      </div>
    </div>
  </div>
</template>

<style>
</style>