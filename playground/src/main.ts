import { createApp } from 'vue'
import { vResizable } from 'vue-resizables'
import 'vue-resizables/style'
import App from './App.vue'
import 'uno.css'

createApp(App).directive('resizable', vResizable).mount('#app')
