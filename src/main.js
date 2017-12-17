// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'
import ElementUI from 'element-ui'
import '@/assets/theme-tuzhan/index.css'
import VueBar from 'vuebar'
import Qriously from 'vue-qriously'
import Vuex from 'vuex'
import store from '@/vuex/store'

Vue.use(ElementUI)
Vue.use(VueBar)
Vue.use(Qriously)
Vue.use(Vuex)

Vue.config.productionTip = false

// =================== 路由拦截 ===================
router.beforeEach((to, from, next) => {
  let user = store.getters.getLoginCertification
  console.log('user:',user, 'to:',to.path)
  if (to.path === '/login') {
    store.commit('remove_login_certification')
    next()
    return
  }
  if (!user) {
    next({ path: '/login' })
    return
  }
  next()
})

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  store,
  template: '<App/>',
  components: { App }
})

