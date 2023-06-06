import { createApp } from 'vue'
import App from './App.vue'
import PriceComponent from './components/PriceComponent.vue'

createApp(App).component('PriceComponent', PriceComponent).mount('#app')
