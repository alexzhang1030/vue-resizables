import { createApp } from 'vue'
import { vResizable } from 'vue-resizables'
import 'vue-resizables/style'
import App from './App.vue'

const app = createApp(App)

createApp(App).directive('resizable', vResizable).mount('#app')
