import { createApp } from 'vue'
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome'
import { library } from '@fortawesome/fontawesome-svg-core'
import { fas } from '@fortawesome/free-solid-svg-icons'
import { faItchIo, faTwitch, faReddit, faTwitter } from '@fortawesome/free-brands-svg-icons'
library.add(fas, faItchIo, faTwitch, faReddit, faTwitter)
import store from './store'
import App from './App.vue'
import './index.css'

const app = createApp(App)
app.component('font-awesome-icon', FontAwesomeIcon)
app.use(store)
app.mount('#app')