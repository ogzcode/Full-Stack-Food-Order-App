import './assets/main.css'

import { createApp } from 'vue'
import { createPinia } from 'pinia'

import App from './App.vue'
import router from './router'

import { setupInterceptors } from './services/apiConfig';

const app = createApp(App)

setupInterceptors()

app.use(createPinia())
app.use(router)

app.mount('#app')
