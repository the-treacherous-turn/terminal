<script>
import { mapState } from 'vuex'
import { createPopper } from "@popperjs/core";

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
    isEditFlag: false,
    isAddFlag: false,
    isDeleteFlag: false,
    editorNpc: {},
    editorNpcID: null,
    tooltipShow: false
  }},
  computed: {
    ...mapState({
      npcs: state => state.gmNPC.npcs,
      activeNpcID: state => state.gmNPC.activeNpcID,
    })
  },
  methods: {
    addNpc() {
      this.editorNpc.trust = '• '
      this.editorNpc.lev = '• '
      this.editorNpc.emo = '• '
      this.editorNpc.connect = '• '
      this.editorNpc.assets = '• '
      this.editorNpc.type = ''
      this.editorNpc.size = ''
      this.editorNpc.scale = ''
      this.isOpenEditor = true
      this.isAddFlag = true
      this.isEditFlag = false
    },
    onClickEdit(key) {
      this.tooltipShow = false;
      this.isOpenEditor = true
      this.isAddFlag = false
      this.isEditFlag = true
      this.editorNpcID = key
      this.editorNpc = {...this.npcs[key]}
      if(!this.editorNpc.trust){
        this.editorNpc.trust = '• '
      }
      if(!this.editorNpc.lev){
        this.editorNpc.lev = '• '
      }
      if(!this.editorNpc.emo){
        this.editorNpc.emo = '• '
      }
      if(!this.editorNpc.connect){
        this.editorNpc.connect = '• '
      }
      if(!this.editorNpc.assets){
        this.editorNpc.assets = '• '
      }
    },
    onClickDelete() {
      this.$store.dispatch('deleteNpc', this.editorNpcID)
      this.isDeleteFlag = false
      this.editorNpc = {}
      this.editorNpcID = null
      this.isOpenEditor = false
      this.isAddNewNpc = false
      this.isEditFlag = false
    },
    close() {
      if (this.isAddFlag) {
        this.$store.dispatch('addNpc', this.editorNpc)
      } else {
        this.$store.dispatch('editNpc', {
          id: this.editorNpcID,
          npc: this.editorNpc,
        })
      }
      this.isOpenEditor = false
      this.editorNpc = {}
      this.editorNpcID = null
      this.isAddNewNpc = false
      this.isEditFlag = false
    },
    openDeleteModal() {
      this.isDeleteFlag = true
    },
    cancelDeleteModal() {
      this.isDeleteFlag = false
    },
    resize(e) {
      let area_ele = this.$refs[e];
      area_ele.style.height = area_ele.scrollHeight + 'px'
      this.editorNpc[e] = area_ele.scrollHeight + 'px'
    },
    process(e){
      let val = document.getElementById(e)
      val.value = val.value + "• "
    },
    toggleTooltip: function(key){
      if(this.tooltipShow){
        this.tooltipShow = false;
        let ele2 = document.getElementById(`tooltipRef${key}`)
        ele2.classList.remove('block')
        ele2.classList.add('hidden')
      } else {
        this.tooltipShow = true;
        let ele1 = document.getElementById(`divRef${key}`)
        let ele2 = document.getElementById(`tooltipRef${key}`)
        ele2.classList.remove('hidden')
        ele2.classList.add('block')
        createPopper(ele1, ele2, {
          placement: "bottom",
          modifiers: [
            {
              name: 'offset',
              options: {
                offset: [30, -10],
              },
            },
          ],
        });
      }
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
          <button class="ml-[24px] bg-[#1D2225] text-grey text-[14px] px-[16px] py-[8px] border border-white" @click="onClickDelete">DELETE NPC</button>
        </div>
      </div>
    </div>
  </div>

  <div v-if="isOpenEditor" class="flex flex-col w-full h-[calc(100%-63px)]">
    <div class="flex justify-between items-center w-full mt-[9px] px-[23px]">
      <div class="flex justify-center items-center cursor-pointer" @click="close">
        <div class="w-[14px] h-[24px] bg-[url('/back_icon.svg')] bg-cover"></div>
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
          <input v-model="editorNpc.name" placeholder="Enter Name" class="bg-darkgray text-[20px] mt-[8px] text-white placeholder-white font-bold outline-none"/>
        </div>
        <div class="flex flex-col items-end">
          <div class="text-[14px] text-white">Status</div>
          <input v-model="editorNpc.status" placeholder="[None]" class="bg-darkgray text-[20px] mt-[8px] text-white placeholder-white outline-none" style="text-align: right"/>
        </div>
      </div>
      <div class="mt-[16px] flex justify-between items-center border-b w-full border-b-3 border-b-white px-[23px] pb-[8px]">
        <div class="flex flex-col">
          <div class="text-[14px] text-white">Type</div>
          <select v-model="editorNpc.type" class="bg-darkgray w-[100px] text-[20px] mt-[8px] text-white placeholder-white outline-none">
            <option value="" disabled selected hidden>[None]</option>
            <option value="Human">Human</option>
            <option value="AI">AI</option>
            <option value="Animal">Animal</option>
          </select>
        </div>
        <div class="flex flex-col">
          <div class="text-[14px] text-white">Size</div>
          <select v-model="editorNpc.size" class="bg-darkgray w-[150px] text-[20px] mt-[8px] text-white placeholder-white outline-none">
            <option value="" disabled selected hidden>[None]</option>
            <option value="Individual">Individual</option>
            <option value="Group">Group</option>
          </select>
        </div>
        <div class="flex flex-col items-end">
          <div class="text-[14px] text-white">Scale</div>
          <select v-model="editorNpc.scale" placeholder="[None]" dir="rtl" class="bg-darkgray w-[100px] text-[20px] mt-[8px] text-white placeholder-white outline-none">
            <option value="" disabled selected hidden>[None]</option>
            <option value="minor">minor</option>
            <option value="major">major</option>
            <option value="myriad">myriad</option>
          </select>
        </div>
      </div>
      <div class="py-[4px] px-[16px] border-b-3 border-b-white border-b">
        <textarea v-model="editorNpc.description" ref="textarea_des" placeholder="Type description here" @input="resize('textarea_des')" role="textbox" class="bg-darkgray text-[20px] mt-[8px] text-white placeholder-white outline-none w-full" :style="{resize:'none', height:editorNpc.textarea_des}"></textarea>
      </div>
      <div class="flex border-b-3 border-b-white border-b">
        <div class="flex justify-center -rotate-180 text-white text-[20px] border-l-3 border-l-white border-l px-[12px]" :style="{writingMode:'vertical-lr'}">
          CHARACTERISTICS
        </div>
        <div class="flex flex-col px-1 w-full">
          <div class="flex flex-col px-[12px] py-[5px] border-b-1 border-b-white first-letter:border-b ">
            <div class="text-[14px] text-white font-bold">Trust</div>
            <textarea v-model="editorNpc.trust" id="textarea_trust" ref="textarea_trust" placeholder="[None]" v-on:keyup.enter="process('textarea_trust')" @input="resize('textarea_trust')" role="textbox" class="bg-darkgray text-[20px] mt-[8px] text-white placeholder-white outline-none w-full" :style="{resize:'none', height:editorNpc.textarea_trust}"></textarea>
          </div>
          <div class="flex flex-col px-[12px] py-[5px] border-b-1 border-b-white first-letter:border-b ">
            <div class="text-[14px] text-white font-bold">Leverage</div>
            <textarea v-model="editorNpc.lev" id="textarea_lev" ref="textarea_lev" placeholder="[None]" v-on:keyup.enter="process('textarea_lev')" @input="resize('textarea_lev')" role="textbox" class="bg-darkgray text-[20px] mt-[8px] text-white placeholder-white outline-none w-full" :style="{resize:'none', height:editorNpc.textarea_lev}"></textarea>
          </div>
          <div class="flex flex-col px-[12px] py-[5px]" :class="{'hidden': editorNpc.type == 'AI'}">
            <div class="text-[14px] text-white font-bold">Emotion</div>
            <textarea v-model="editorNpc.emo" id="textarea_emo" ref="textarea_emo" placeholder="[None]" v-on:keyup.enter="process('textarea_emo')" @input="resize('textarea_emo')" role="textbox" class="bg-darkgray text-[20px] mt-[8px] text-white placeholder-white outline-none w-full" :style="{resize:'none', height:editorNpc.textarea_emo}"></textarea>
          </div>
        </div>
      </div>
      <div class="flex flex-col py-[5px] border-b border-b-3 border-b-white">
        <div class="text-[14px] ml-[16px] text-white font-normal">Connections</div>
        <textarea v-model="editorNpc.connect" id="textarea_connect" ref="textarea_connect" placeholder="[None]" v-on:keyup.enter="process('textarea_connect')" @input="resize('textarea_connect')" role="textbox" class="ml-[16px] bg-darkgray text-[20px] mt-[8px] text-white placeholder-white outline-none w-full" :style="{resize:'none', height:editorNpc.textarea_connect}"></textarea>
      </div>
      <div class="flex flex-col py-[5px] border-b border-b-3 border-b-white">
        <div class="text-[14px] ml-[16px] text-white font-normal">Assests & Capabilities</div>
        <textarea v-model="editorNpc.assets" id="textarea_assets" ref="textarea_assets" placeholder="[None]" v-on:keyup.enter="process('textarea_assets')" @input="resize('textarea_assets')" role="textbox" class="ml-[16px] bg-darkgray text-[20px] mt-[8px] text-white placeholder-white outline-none w-full" :style="{resize:'none', height:editorNpc.textarea_assets}"></textarea>
      </div>
      <div class="flex flex-col py-[5px] border-b border-b-3 border-b-white">
        <div class="text-[14px] ml-[16px] text-white font-normal">Notes</div>
        <textarea v-model="editorNpc.notes" id="textarea_notes" ref="textarea_notes" placeholder="Type notes here" @input="resize('textarea_notes')" role="textbox" class="ml-[16px] bg-darkgray text-[20px] mt-[8px] text-white placeholder-white outline-none w-full" :style="{resize:'none', height:editorNpc.textarea_notes}"></textarea>
      </div>
    </div>
  </div>
  <div v-else class="flex flex-col w-full px-[23px]">
    <div class="flex justify-between mt-[26px]">
      <div class="flex px-[16px] py-[4px] border-white border-1 justify-center items-center">
        <div class="text-grey text-[14px]">search</div>
        <div class="w-[24px] h-[24px] bg-[url('/search_icon.svg')] bg-cover ml-[16px]"></div>
      </div>
      <div class="flex px-[16px] py-[8px] border-white border-1 justify-center items-center cursor-pointer" @click="addNpc">
        <div class="text-grey text-[14px] leading-snug">add NPC</div>
        <div class="w-[15px] h-[15px] bg-[url('/Union.svg')] bg-cover ml-[8px]"></div>
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
    <div v-for="(data, key) in npcs" class="flex flex-col mt-[16px] space-y-[12px]">
      <div :id="'divRef'+key" class="hover:bg-white hover:text-black text-white cursor-pointer flex justify-between" v-on:mouseenter="toggleTooltip(key)" v-on:mouseleave="toggleTooltip(key)" @click="onClickEdit(key)">
        <div class="text-[14px] w-[140px] font-bold flex">{{data.name}}</div>
        <div class="w-[150px] flex">
          <span class="text-[14px] font-bold">{{data.type+','}}</span>
          <span class="text-[14px]">{{data.size.slice(0,3)+'.'}}</span>
          <span class="text-[14px]">{{'('+data.scale+')'}}</span>
        </div>
        <div class="text-[14px] w-[100px] font-bold flex">{{data.status}}</div>
      </div>
      <div :id="'tooltipRef'+key" class="hidden mt-[-120px] bg-grey border-1 border-black ml-3 z-50 w-[450px] font-normal leading-normal text-left">
        <div>
          <div class="bg-grey text-black text-[16px]">
            Description
          </div>
          <div class="text-black">
            {{data.description.split('. ', 1)[0]+'...'}}
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<style>
</style>