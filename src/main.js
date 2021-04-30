import Vue from 'vue'
import App from './App.vue'

Vue.config.productionTip = false

// для получения собития добавлен в закладки
export const busHeader = new Vue();

// для получения события открыть модальное окно
export const busModal = new Vue();

// для получения события удаление из закладок
export const busRemove = new Vue();

new Vue({
  render: h => h(App),
}).$mount('#app')
