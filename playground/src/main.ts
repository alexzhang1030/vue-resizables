import { createApp } from 'vue'
import { vResizable } from 'vue-resizables'
import App from './App.vue'
import 'vue-resizables/style'
import 'uno.css'

createApp(App).directive('resizable', vResizable).mount('#app')
