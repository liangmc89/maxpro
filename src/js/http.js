import axios from 'axios';
import router from '../router';
import {getCookie, setCookie} from './cookie.js'
import Vue from 'vue'
import Qs from 'qs'
import {
  Loading,
  Toast,
  // optional!, for example below
  // with custom spinner
  QSpinnerGears
} from 'quasar'

Vue.prototype.$http = axios;
//axios.defaults.baseURL = 'http://ib.fxclouds.com';
axios.defaults.baseURL = '/api';

axios.interceptors.request.use(
  config => {
    const token = getCookie("token");
    //console.log(token);
    config.data = Qs.stringify(config.data);
    config.headers = {
      'Content-Type': 'application/x-www-form-urlencoded; charset=UTF-8'
    };

    if (token) {
      //console.log(token);
      config.params = {
        token: token
      }
    }
    return config;
  },
  err => {
    Loading.hide();
    Toast.create.negative({
      html: err.message
    });
    return Promise.reject(err);
  }
);
//添加一个返回拦截器
axios.interceptors.response.use(function (response) {

  // Loading.hide()
  if (response.data.code == 40000 || response.data.code == 40001) {

    Toast.create.info({
      html: '未登录，请重新登录！', timeout: 4000, onDismiss: function () {
        router.replace({
          path: '/login',
          query: {
            redirect: router.currentRoute.fullPath
          }
        });

      }
    });
    return false;
  } else {
    return response;
  }

}, function (error) {
  //对返回的错误进行一些处理
  // Loading.hide();
  // Toast.create.negative({html: error.message, timeout: 4000})
  return Promise.reject(error);

});

router.beforeEach((to, from, next) => {
  const token = getCookie("token");
  if (to.meta.requireAuth) {  // 判断该路由是否需要登录权限
    if (token != '' && token != null) {  //当前的token是否存在

      next();
    }
    else {
      Toast.create.info({html:'未登录，请登录！'});
      next({
        path: '/login',
        query: {redirect: to.fullPath}  // 将跳转的路由path作为参数，登录成功后跳转到该路由
      })
    }
  }
  else {
    next();
  }
})
