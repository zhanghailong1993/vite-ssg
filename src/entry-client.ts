import { createApp } from './main'
import createStore from '@/store'
import { createRouter } from './router'

const router = createRouter('client')
const pinia = createStore()

const { app } = createApp()

app.use(router)
app.use(pinia)
// 初始化 pinia
if (window.__INITIAL_STATE__) {
  pinia.state.value = JSON.parse(window.__INITIAL_STATE__)
}
console.log('client', pinia.state.value)

router.isReady().then(() => {
  app.mount('#app')
})