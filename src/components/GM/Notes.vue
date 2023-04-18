<script>
import { mapState } from 'vuex';

    export default{
        data() {
            return {
            }
        },
        computed: {
            ...mapState({
                notes: state => state.gmNOTES.notes,
                keysOfNotes: state => state.gmNOTES.keysOfNotes
            })
        },
        methods: {
            addNote() {
                this.$store.dispatch('addNote')
            },
            updateNote(key, field, event) {
                const {value} = event.target
                const changesObj = {}
                changesObj[field] = value
                if(field === 'content'){
                    let area_ele = event.target;
                    area_ele.style.height = area_ele.scrollHeight + 'px'
                    changesObj['content_height'] = area_ele.scrollHeight
                }
                this.$store.dispatch('updateNote', {noteID: key, changesObj})
            },
            removeNote(noteID) {
                this.$store.dispatch('removeNote', noteID)
            },
            swapDown(k) {
                let currentKey = Object.keys(this.keysOfNotes).find(key => this.keysOfNotes[key] === k)
                if(Number(currentKey) + 1 <= this.keysOfNotes.length){
                    let temp = this.keysOfNotes[currentKey]
                    this.keysOfNotes[currentKey] = this.keysOfNotes[Number(currentKey) + 1]
                    this.keysOfNotes[Number(currentKey) + 1] = temp
                    const changesObj = {}
                    changesObj['keysOfNotes'] = this.keysOfNotes
                    this.$store.dispatch("updateNotes", changesObj)
                }
            },
            swapUp(k) {
                let currentKey = Object.keys(this.keysOfNotes).find(key => this.keysOfNotes[key] === k)
                if(Number(currentKey) -1 >= 0){
                    let temp = this.keysOfNotes[currentKey]
                    this.keysOfNotes[currentKey] = this.keysOfNotes[Number(currentKey) - 1]
                    this.keysOfNotes[Number(currentKey) - 1] = temp
                    const changesObj = {}
                    changesObj['keysOfNotes'] = this.keysOfNotes
                    this.$store.dispatch("updateNotes", changesObj)
                }
            }
        },
        watch: {
            keysOfNotes(newVal){
                const changesObj = {}
                changesObj['keysOfNotes'] = newVal
                this.$store.dispatch("updateNotes", changesObj)
            }
        }
    }
</script>
<template>
    <div class="flex flex-col w-full h-[calc(100%-63px)] py-4 px-6 space-y-6 overflow-y-scroll">
        <div v-for="key in keysOfNotes" :key="key" class="flex flex-col w-full justify-between items-center space-x-[15px] border-b-gray border-b-[2px]">
            <div class="flex">
                <input class="note_input" placeholder="TYPE TITLE" :value="notes[key].title"  @input="updateNote(key, 'title', $event)"/>
                <div class="flex space-x-[30px] justify-center items-center">
                    <div class="w-[18px] h-[8px] bg-[url('/arrow_up.svg')] bg-cover bg-no-repeat cursor-pointer" @click="swapUp(key)"></div>
                    <div class="w-[18px] h-[9px] bg-[url('/arrow_down.svg')] bg-cover bg-no-repeat cursor-pointer" @click="swapDown(key)"></div>
                    <div class="w-[17px] h-[20px] bg-[url('/trash_bin.svg')] bg-cover bg-no-repeat cursor-pointer" @click="removeNote(key)"></div>
                </div>
            </div>
            <textarea placeholder="TYPE NOTES" class="mt-6 w-full bg-darkgray outline-none resize-none text-[26px]" :value="notes[key].content" @input="updateNote(key, 'content', $event)" :style="{height: notes[key].content_height + 'px'}"></textarea>
        </div>
        <div class="self-center text-grey px-4 py-[10px] text-[20px] border-[1px] border-white cursor-pointer" @click="addNote">
            ADD SECTION
        </div>
    </div>
</template>
<style>
    .note_input {
        font-size: 26px;
        background-color: #1D2225;
        font-weight: 700;
        color: white;
        outline: none;
    }
</style>