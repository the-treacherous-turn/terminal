import { createApp } from 'vue'
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome'
import { library } from '@fortawesome/fontawesome-svg-core'
import { fas } from '@fortawesome/free-solid-svg-icons'
library.add(fas)
import 'simplebar/dist/simplebar.min.css';
import store from './store'
import App from './App.vue'
import './index.css'

const app = createApp(App)
app.component('font-awesome-icon', FontAwesomeIcon)
app.use(store)
app.mount('#app')