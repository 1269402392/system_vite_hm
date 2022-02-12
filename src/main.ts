import { createApp } from 'vue'
import App from './App.vue'
import router from '@/router'
import { createPinia } from 'pinia'
import { native } from '@/global/register-cpn'
import { registerIcons } from '@/global/register-icons'
import { setupInitialData } from '@/store/login'
import './mock'
import 'normalize.css'
import '@/assets/css/base.less'
const app = createApp(App)
app.use(createPinia()).use(native).use(registerIcons)
setupInitialData()
app.use(router)
app.mount('#app')
