import { createApp } from 'vue'
import App from './App.vue'
import router from './router'

import { createPinia } from 'pinia'
import './assets/index.css'
import Vue3EasyDataTable from 'vue3-easy-data-table'
import 'vue3-easy-data-table/dist/style.css'
import 'primeicons/primeicons.css'
import { plugin as VueTippy } from 'vue-tippy'
import 'tippy.js/dist/tippy.css' // optional for styling

const app = createApp(App)
const pinia = createPinia()
app.component('EasyDataTable', Vue3EasyDataTable)
app.use(Vue3EasyDataTable)
app.use(router)
app.use(pinia)

app.use(
  VueTippy,
  // optional
  {
    directive: 'tippy', // => v-tippy
    component: 'tippy', // => <tippy/>
    componentSingleton: 'tippy-singleton',
    delay: [100, 200], // => <tippy-singleton/>,
    defaultProps: {
      animation: 'fade',
      delay: 500,
      placement: 'bottom',
      allowHTML: true,
      theme: 'tomato'
    } // => Global default options * see all props
  }
)
app.mount('#app')
