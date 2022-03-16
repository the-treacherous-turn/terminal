import { createApp } from 'vue'
import {createStore} from 'vuex'
import App from './App.vue'
import './index.css'

const store = createStore({
  state () {
    return {
      count: 0, // example
      actions: [],
    }
  },
  mutations: {
    // example
    increment (state) {
      state.count++
    },
    addAction (state, action) {
      state.actions.push(action)
    }
  }
})

/*
{
  actions: [
    {
      name: "HACK",
      description: "Hack the computer",
    }
  ]
}
*/

const app = createApp(App)
app.use(store)
app.mount('#app')