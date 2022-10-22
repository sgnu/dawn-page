import { createApp } from 'vue'
import App from './App.vue'

import './assets/main.css'

import { library } from '@fortawesome/fontawesome-svg-core'
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome'
import { faPenToSquare, faTrash, faPlus, faGear } from '@fortawesome/free-solid-svg-icons'

library.add(faPenToSquare, faTrash, faPlus, faGear)

createApp(App)
    .component('font-awesome-icon', FontAwesomeIcon)
    .mount('#app')
