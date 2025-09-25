import { createApp } from 'vue'
import './style.css'
import App from './app.vue'
import i18n from "./i18n.js";

createApp(App)
    .use(i18n)
    .mount('#app')
