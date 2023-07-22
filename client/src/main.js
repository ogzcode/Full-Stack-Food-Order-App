import './assets/css/main.css'

import { createApp } from 'vue'
import { createPinia } from 'pinia'
import PrimeVue from 'primevue/config'

import App from './App.vue'
import router from './router'
import ApiService from './services/apiServices.js'

const app = createApp(App)

ApiService.init(app)
app.use(createPinia())
app.use(router)

app.mount('#app')
