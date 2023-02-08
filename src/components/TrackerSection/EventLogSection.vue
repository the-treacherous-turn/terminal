<script>
import ActionCard from './ActionCard.vue'
import { mapState } from 'vuex'

export default {
    data() {
        return{
            sortActions: [],
            isFilter: false,
            filterQuery: []
        }
    },
    components: {
        ActionCard,
    },
    computed: {
        ...mapState({
            logActions: state => state.eventLog.actions
        })
    },
    watch : {
        logActions: {
            handler(data){
                this.sortActions = {...this.logActions}
            },
            deep:true
        },
        filterQuery: {
            handler(data){
                console.log(this.filterQuery)
                this.sortActions = {...this.logActions}
                let entries = Object.entries(this.sortActions)
                let result = [];
                entries.map(entry => {
                    // console.log(entry[1])
                    if(this.filterQuery.length === 0){
                        result.push(entry)
                    }else if(Object.values(this.filterQuery).includes('Committed') && Object.values(this.filterQuery).includes('Finalized')){
                        if(entry[1].isCommitted && entry[1].isForecast)
                            result.push(entry)
                    }else if(Object.values(this.filterQuery).includes('Committed')){
                        if(entry[1].isForecast)
                            result.push(entry)
                    }else if(Object.values(this.filterQuery).includes('Finalized')){
                        console.log('finalized')
                        console.log(entry[1])
                        if(entry[1].isCommitted)
                            result.push(entry)
                    }
                })
                this.sortActions = Object.fromEntries(result)

            },
            deep: true
        }
    },
    methods: {
        editNewAction() {
        this.$store.dispatch('editNewAction')
        },
        saveScrollPos(e) {
        this.$store.commit('setEventLogScrollPos', e.target.scrollTop)
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
            if(!event.target.closest('#eventFilterModal')){
                this.closeFilterModal();
            }
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
    mounted() {
        this.sortActions = {...this.logActions}
        this.$nextTick(() => {
        this.$refs.scroller.scrollTop = this.$store.state.eventLog.scrollPos
        })
    },
}
</script>

<template>
<div class="h-full w-full max-w-screen-lg mx-auto relative uppercase border flex flex-col overflow-hidden">
  <div class="items-center space-x-2 flex absolute bg-base-100 z-10 w-full top-0 left-0 p-4 px-8 border-b-2 text-3xl">
    <span>
      Event Log
    </span>
    <div :class="[filterQuery.length !== 0 ? 'filter_clicked' : 'filter_unclicked']" @click="openFilterModal">
        <div id="eventFilterModal" v-if="isFilter" class="relative w-fit space-y-[13px] h-fit justify-center items-start left-[-70px] top-3 px-[24px] py-[12px] flex flex-col bg-grey" :on-focusout="closeFilterModal">
            <label class="flex w-fit space-x-[8px]">
                <div class="flex justify-center items-center">
                    <input :checked="filterQuery.includes('Committed')" type="checkbox" class="filter_checkbox w-[24px] h-[24px]" @click="updateFilterQuery($event, 'Committed')"/>
                </div>
                <div class="text-black text-[20px]">Committed</div>
            </label>
            <label class="flex w-fit space-x-[8px]">
                <div class="flex justify-center items-center">
                    <input :checked="filterQuery.includes('Finalized')" type="checkbox" class="filter_checkbox w-[24px] h-[24px]" @click="updateFilterQuery($event, 'Finalized')"/>
                </div>
                <div class="text-black text-[20px]">Finalized</div>
            </label>
            <div class="flex bg-black h-[1px] w-full">
            </div>
            <div class="flex space-x-[8px] justify-center w-full cursor-pointer items-center" @click="clearFilter">
                <p class="text-black text-[20px]">Clear</p>
                <div class="flex justify-center items-center">
                    <font-awesome-icon
                    :icon="['fas', 'trash-can']" class="cursor-pointer text-[#1D2225]"
                    />
                </div>
            </div>
        </div>
	</div>
  </div>

  <div class="absolute h-full w-full overflow-y-scroll" ref="scroller" @scroll.passive="saveScrollPos">
      <div class="h-16"></div>
      <ActionCard
        v-for="(action, key) in sortActions"
        :key="key"
        :actionID="key"
        :name="action.name"
        :description="action.description"
        :risk="action.risk"
        :confidence="action.confidence"
        :compute="action.compute"
        :isDirty="action.isDirty"
        :isCommitted="action.isCommitted"
        :isForecast="action.isForecast"
        :commitTimeISO="action.commitTimeISO"
      />
      <div class="h-24"></div>
  </div>

  <div class="absolute bg-base-100 w-full bottom-0 left-0 p-4 pl-8 border-t-2">
    <button class=""
      type="button"
      @click="editNewAction"
    >
      >> New Action
    </button>
  </div>
</div>
</template>
