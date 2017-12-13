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

Vue.config.productionTip = false
Vue.use(Quasar) // Install Quasar Framework



//Vue.filter('currency', function (x) {
// let f_x = parseFloat(x);
//  if (isNaN(f_x)) {
//      
//      return '$0';
//  }
//  let isMoreThanZero=f_x<0;
//  if(isMoreThanZero){
//  	
//  	x*=-1;
//  }
//   f_x = Math.round(x * 100) / 100;
//  let s_x = f_x.toString();
//  let pos_decimal = s_x.indexOf('.');
//  if (pos_decimal < 0) {
//      pos_decimal = s_x.length;
//      s_x += '.';
//  }
//  while (s_x.length <= pos_decimal + 2) {
//      s_x += '0';
//  }
//  if(isMoreThanZero){
//  	return '-$'+s_x;
//  }else{
//  	return '$'+s_x;
//  }
//  
//})


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
