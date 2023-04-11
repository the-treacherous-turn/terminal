<script>

import { mapState } from 'vuex'
import { createPopper } from "@popperjs/core";

export default {
  data() {
    return{
    isOpenEditor: false,
    isEditFlag: false,
    isAddFlag: false,
    isDeleteFlag: false,
    tooltipShow: false,
	isFilter: false,
    editorNpcID: null,
    editorNpc: {},
    sortNpcs: [],
    filterQuery: [],
    searchValue: '',
  }},
  computed: {
    ...mapState({
      npcs: state => state.gmNPC.npcs,
      activeNpcID: state => state.gmNPC.activeNpcID,
    })
  },
  mounted() {
    this.sortNpcs = {...this.npcs}
  },
  watch : {
    filterQuery: {
        handler(data){
        this.sortNpcs = {...this.npcs}
        let entries = Object.entries(this.sortNpcs)
        let result = [];
        entries.map(entry => {
            if(this.filterQuery.length === 0){
                result.push(entry)
            }else if(Object.values(this.filterQuery).includes('Other')){
                if(entry[1].type !== 'Human' && entry[1].type !== 'Animal' && entry[1].type !== 'AI' || Object.values(this.filterQuery).includes(entry[1].type))
                    result.push(entry)
            }else if(Object.values(this.filterQuery).includes(entry[1].type)){
                result.push(entry)
            }
        })
        this.sortNpcs = Object.fromEntries(result)

        },
        deep: true
    }
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
      this.sortNpcs = this.npcs
    },
    openDeleteModal() {
      this.isDeleteFlag = true
    },
    cancelDeleteModal() {
      this.isDeleteFlag = false
    },
	openFilterModal() {
		this.isFilter = true
		setTimeout(() => {
			document.addEventListener('click', this.closeWhenClickedOutside);
		}, 100);
	},
	closeFilterModal() {
		this.isFilter = false
		document.removeEventListener('click', this.closeWhenClickedOutside)
	},
	closeWhenClickedOutside(event) {
		if(!event.target.closest('#filterModal')){
			this.closeFilterModal();
		}
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
                offset: [30, -3],
              },
            },
          ],
        });
      }
    },
    sortByBTS(event, prop){
        let clicked_ele_down = document.querySelector('.btn_down_clicked')
        let clicked_ele_up = document.querySelector('.btn_up_clicked')
        if(clicked_ele_down){
            clicked_ele_down.classList.remove('btn_down_clicked')
            clicked_ele_down.classList.add('btn_down_unclicked')
        }
        if(clicked_ele_up){
            clicked_ele_up.classList.remove('btn_up_clicked')
            clicked_ele_up.classList.add('btn_up_unclicked')
        }
        let ele = event.target;
        ele.classList.remove('btn_up_unclicked')
        ele.classList.add('btn_up_clicked')
        let entries = Object.entries(this.sortNpcs)
        if(prop !== 'type'){
            let sorted = entries.sort((a, b) =>
            a[1][prop] > b[1][prop] ? -1 : 1
            );
            this.sortNpcs = Object.fromEntries(sorted)
        }else{
            let sorted = entries.sort((a, b) =>{
            if(a[1]['type'] > b[1]['type']){
                return -1;
                }else if(a[1]['type'] < b[1]['type']){
                return 1;
                }else {
                if(a[1]['size'] > b[1]['size']){
                    return -1;
                }else if(a[1]['size'] < b[1]['size']){
                    return 1;
                }else {
                    if(a[1]['scale'] > b[1]['scale']){
                    return -1;
                    }else if(a[1]['scale'] < b[1]['scale']){
                    return 1;
                    }else{
                    return 0;
                    }
                }
            }
            }
            );
            this.sortNpcs = Object.fromEntries(sorted)
        }
    },
    sortBySTB(event, prop){
        let clicked_ele_down = document.querySelector('.btn_down_clicked')
        let clicked_ele_up = document.querySelector('.btn_up_clicked')
        if(clicked_ele_down){
            clicked_ele_down.classList.remove('btn_down_clicked')
            clicked_ele_down.classList.add('btn_down_unclicked')
        }
        if(clicked_ele_up){
            clicked_ele_up.classList.remove('btn_up_clicked')
            clicked_ele_up.classList.add('btn_up_unclicked')
        }
        let ele = event.target;
        ele.classList.remove('btn_down_unclicked')
        ele.classList.add('btn_down_clicked')
      let entries = Object.entries(this.sortNpcs)
      if(prop !== 'type'){
        let sorted = entries.sort((a, b) =>
          a[1][prop] < b[1][prop] ? -1 : 1
        );
        this.sortNpcs = Object.fromEntries(sorted)
      }else{
        let sorted = entries.sort((a, b) =>{
          if(a[1]['type'] < b[1]['type']){
            return -1;
          }else if(a[1]['type'] > b[1]['type']){
            return 1;
          }else {
            if(a[1]['size'] < b[1]['size']){
              return -1;
            }else if(a[1]['size'] > b[1]['size']){
              return 1;
            }else {
              if(a[1]['scale'] < b[1]['scale']){
                return -1;
              }else if(a[1]['scale'] > b[1]['scale']){
                return 1;
              }else{
                return 0;
              }
            }
          }
        }
        );
        this.sortNpcs = Object.fromEntries(sorted)
      }
    },
    searchResult(event){
      this.sortNpcs = {...this.npcs}
      const {value} = event.target;
      let entries = Object.entries(this.sortNpcs)
      let result = [];
      entries.map(entry => {
        if(Object.values(entry[1]).join(',').includes(value)){
          result.push(entry)
        }
      })
      this.sortNpcs = Object.fromEntries(result)
    },
    updateFilterQuery(event, query){
        if(event.target.checked){
            this.filterQuery.push(query)
        }else {
            this.filterQuery.splice(this.filterQuery.indexOf(query), 1);
        }
    },
    clearFilter(){
        let eles = document.querySelectorAll('.filter_checkbox')
        eles.forEach(ele => {
            ele.checked = false
        })
        this.filterQuery = [];
    }
  },
}
</script>

<template>
  <div class="fixed top-0 left-0 z-50 table w-full h-full uppercase transition-opacity bg-black/50"
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
      <div class="flex items-center justify-center cursor-pointer" @click="close">
        <div class="w-[14px] h-[24px] bg-[url('/back_icon.svg')] bg-cover"></div>
        <div class="ml-[15px] text-[20px] text-grey">back</div>
      </div>
      <div class="flex" @click="openDeleteModal">
        <font-awesome-icon
          :icon="['fas', 'trash-can']" class="cursor-pointer text-primary-content hover:text-white"
        />
      </div>
    </div>
    <div class="flex flex-col w-full h-full overflow-y-scroll">
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
            <option value="Other">Other</option>
          </select>
        </div>
        <div class="flex flex-col">
          <div class="text-[14px] text-white">Size</div>
          <select v-model="editorNpc.size" class="bg-darkgray w-[150px] text-[20px] mt-[8px] text-white placeholder-white outline-none">
            <option value="" disabled selected hidden>[None]</option>
            <option value="Individual">Individual</option>
            <option value="Group">Group</option>
            <option value="Other">Other</option>
          </select>
        </div>
        <div class="flex flex-col items-end">
          <div class="text-[14px] text-white">Scale</div>
          <select v-model="editorNpc.scale" placeholder="[None]" class="bg-darkgray w-[100px] text-[20px] mt-[8px] text-white placeholder-white outline-none" style="text-align: right">
            <option value="" disabled selected hidden>[None]</option>
            <option value="minor">minor</option>
            <option value="major">major</option>
            <option value="myriad">myriad</option>
            <option value="other">other</option>
          </select>
        </div>
      </div>
      <div class="py-[4px] px-[16px] border-b-3 border-b-white border-b">
        <textarea v-model="editorNpc.description" ref="textarea_des" placeholder="Type description here" @input="resize('textarea_des')" role="textbox" class="bg-darkgray text-[20px] mt-[8px] text-white placeholder-white outline-none w-full" :style="{resize:'none', height:editorNpc.textarea_des}"></textarea>
      </div>
      <div class="flex border-b border-b-3 border-b-white">
        <div class="flex justify-center -rotate-180 text-white text-[20px] border-l-3 border-l-white border-l px-[12px]" :style="{writingMode:'vertical-lr'}">
          CHARACTERISTICS
        </div>
        <div class="flex flex-col w-full px-1">
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
  <div v-else class="flex flex-col w-full px-[23px] overflow-y-scroll">
    <div class="flex justify-between mt-[26px]">
      <div class="flex px-[16px] py-[4px] border-white border-1 justify-center items-center">
        <input placeholder="search" class="bg-darkgray outline-none text-grey text-[14px]" v-model="searchValue" @input="searchResult($event)"/>
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
          <div class="flex flex-col pr-1">
            <div class="btn_up_unclicked" @click="sortByBTS($event, 'name')"></div>
            <div class="btn_down_unclicked" @click="sortBySTB($event, 'name')"></div>
          </div>
        </div>
        <div class="flex justify-between w-[150px]">
          <div class="text-[16px] text-white">Type</div>
          <div class="flex items-center justify-center pr-1">
            <div :class="[filterQuery.length !== 0 ? 'filter_clicked' : 'filter_unclicked']" @click="openFilterModal">
				<div id="filterModal" v-if="isFilter" class="relative w-fit space-y-[13px] h-fit justify-center items-start left-[-70px] top-3 px-[24px] py-[12px] flex flex-col bg-grey" :on-focusout="closeFilterModal">
					<label class="flex w-fit space-x-[8px]">
						<div class="flex items-center justify-center">
							<input :checked="filterQuery.includes('Human')" type="checkbox" class="filter_checkbox w-[24px] h-[24px]" @click="updateFilterQuery($event, 'Human')"/>
						</div>
						<div class="text-black text-[20px]">Human</div>
					</label>
					<label class="flex w-fit space-x-[8px]">
						<div class="flex items-center justify-center">
							<input :checked="filterQuery.includes('Animal')" type="checkbox" class="filter_checkbox w-[24px] h-[24px]" @click="updateFilterQuery($event, 'Animal')"/>
						</div>
						<div class="text-black text-[20px]">Animal</div>
					</label>
					<label class="flex w-fit space-x-[8px]">
						<div class="flex items-center justify-center">
							<input :checked="filterQuery.includes('AI')" type="checkbox" class="filter_checkbox w-[24px] h-[24px]" @click="updateFilterQuery($event, 'AI')"/>
						</div>
						<div class="text-black text-[20px]">AI</div>
					</label>
					<label class="flex w-fit space-x-[8px]">
						<div class="flex items-center justify-center">
							<input :checked="filterQuery.includes('Other')" type="checkbox" class="filter_checkbox w-[24px] h-[24px]" @click="updateFilterQuery($event, 'Other')"/>
						</div>
						<div class="text-black text-[20px]">Other</div>
					</label>
                    <div class="flex bg-black h-[1px] w-full">
                    </div>
                    <div class="flex space-x-[8px] justify-center w-full cursor-pointer items-center" @click="clearFilter">
                        <p class="text-black text-[20px]">Clear</p>
                        <div class="flex items-center justify-center">
                            <font-awesome-icon
                            :icon="['fas', 'trash-can']" class="cursor-pointer text-[#1D2225]"
                            />
                        </div>
                    </div>
				</div>
			</div>
            <div class="flex flex-col ml-[8px]">
              <div class="btn_up_unclicked" @click="sortByBTS($event, 'type')"></div>
              <div class="btn_down_unclicked" @click="sortBySTB($event,'type')"></div>
            </div>
          </div>
        </div>
        <div class="flex justify-between w-[100px]">
          <div class="text-[16px] text-white">Status</div>
          <div class="flex flex-col pr-1">
            <div class="btn_up_unclicked" @click="sortByBTS($event,'status')"></div>
            <div class="btn_down_unclicked" @click="sortBySTB($event,'status')"></div>
          </div>
        </div>

      </div>
    </div>
    <div v-for="(data, key) in sortNpcs" class="flex flex-col mt-[16px] space-y-[12px]">
      <div :id="'divRef'+key" class="flex justify-between text-white cursor-pointer hover:bg-white hover:text-black" v-on:mouseenter="toggleTooltip(key)" v-on:mouseleave="toggleTooltip(key)" @click="onClickEdit(key)">
        <div class="text-[14px] w-[140px] font-bold flex">{{data.name}}</div>
        <div class="w-[150px] flex text-[14px]">
          <span class="font-bold">{{data.type+','}}</span>
          <span v-if="data.size == 'Individual'">Ind.</span>
          <span v-else>{{ data.size }}</span>
          <span class="">{{'('+data.scale+')'}}</span>
        </div>
        <div class="text-[14px] w-[100px] font-bold flex">{{data.status}}</div>
      </div>
      <div :id="'tooltipRef'+key" class="hidden mt-[-120px] bg-grey border-1 border-black ml-3 z-50 w-[450px] font-normal leading-normal text-left pointer-events-none">
        <div>
          <div class="text-lg text-black bg-grey">
            Description
          </div>
          <div class="text-black">
            {{data.description?data.description.split('. ', 1)[0]+'...':''}}
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<style>
    .filter_clicked {
        display: flex;
        width: 16px;
        height: 14px;
        background-size: cover;
        cursor: pointer;
        background-image: url('/filter_clicked.svg');
    }

    .filter_unclicked {
        display: flex;
        width: 16px;
        height: 14px;
        background-size: cover;
        cursor: pointer;
        background-image: url('/filter_unclicked.png');
    }
    .btn_up_unclicked {
        width: 12px;
        height: 9px;
        background-image: url('/btn_up_unclicked.svg');
        background-size: cover;
        background-repeat: no-repeat;
        cursor: pointer;
    }

    .btn_down_unclicked {
        margin-top: 3px;
        width: 12px;
        height: 9px;
        background-image: url('/btn_down_unclicked.svg');
        background-size: cover;
        background-repeat: no-repeat;
        cursor: pointer;
    }

    .btn_up_clicked {
        width: 12px;
        height: 9px;
        background-image: url('/btn_up_clicked.svg');
        background-size: cover;
        background-repeat: no-repeat;
        cursor: pointer;
    }

    .btn_down_clicked {
        margin-top: 3px;
        width: 12px;
        height: 9px;
        background-image: url('/btn_down_clicked.svg');
        background-size: cover;
        background-repeat: no-repeat;
        cursor: pointer;
    }

	.filter_checkbox {
	position: relative;
	cursor: pointer;
	}

	.filter_checkbox:before {
	content: "";
	position: absolute;
	width: 24px;
	height: 24px;
	top: 0;
	left: 0;
	border: 1px solid #000000;
	border-radius: 3px;
	padding: 1px;
	background-color: #D9D9D9;
	}

	.filter_checkbox:checked:before {
	background-color: #D9D9D9;
	}

	.filter_checkbox:checked:after {
	content: "";
	display: block;
	width: 9px;
	height: 22px;
	border: solid black;
	border-width: 0 4px 4px 0;
	-webkit-transform: rotate(45deg);
	-ms-transform: rotate(45deg);
	transform: rotate(45deg);
	position: absolute;
	left: 9px;
	}
</style>