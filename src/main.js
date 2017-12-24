// === DEFAULT / CUSTOM STYLE ===
// WARNING! always comment out ONE of the two require() calls below.
// 1. use next line to activate CUSTOM STYLE (./src/themes)
 require(`./themes/app.${__THEME}.styl`)
// 2. or, use next line to activate DEFAULT QUASAR STYLE
//require(`quasar/dist/quasar.${__THEME}.css`)
// ==============================

// Uncomment the following lines if you need IE11/Edge support
// require(`quasar/dist/quasar.ie`)
// require(`quasar/dist/quasar.ie.${__THEME}.css`)

import Vue from 'vue'
import Quasar from 'quasar'
import router from './router'
import 'quasar-extras/fontawesome'

//http请求组件
import {getCookie} from './js/http'



import API from './js/API';
const api = new API();
Vue.prototype.$api = api;

import {
  Loading,
  QSpinnerFacebook
} from 'quasar'

Vue.prototype.$showloading=(option)=>{
  let obj={
    spinner: (option&&option.spinner)|| QSpinnerFacebook,
    message:(option&&option.message)|| 'loading…',
    messageColor:(option&&option.messageColor)|| 'white',
    spinnerSize:(option&&option.spinnerSize)|| 50, // in pixels
    spinnerColor:(option&&option.spinnerColor)|| 'white',
    customClass :(option&&option.customClass)|| 'loading-bg'
  }
  Loading.show(obj);
}

Vue.prototype.$hideloading=()=>{
  Loading.hide();
}









Vue.config.productionTip = false
Vue.use(Quasar) // Install Quasar Framework

if (__THEME === 'mat') {
  require('quasar-extras/roboto-font')
}
import 'quasar-extras/material-icons'
// import 'quasar-extras/ionicons'
// import 'quasar-extras/fontawesome'
 import 'quasar-extras/animate'

Quasar.start(() => {
  /* eslint-disable no-new */
  new Vue({
    el: '#q-app',
    router,
    render: h => h(require('./App').default)
  })
})
