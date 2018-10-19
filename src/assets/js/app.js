'use strict'
import Vue from 'vue'
import App from './App.vue'
import Store from './store'

import Tmpl from './modules/tmpl'

Vue.config.productionTip = process.env.NODE_ENV === 'production'

const tmpl = new Tmpl('body');

new Vue({
  el: '#app',
  Store,
  render: h => h(App)
})