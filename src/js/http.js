import axios from 'axios';
import router from '../router';
import { getCookie, setCookie } from './cookie.js'
import Vue from 'vue'
import Qs from 'qs'

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

		if(token) {
			//console.log(token);
			config.params = {
				token: token
			}
		}
		return config;
	},
	err => {
		return Promise.reject(err);
	}
);
//添加一个返回拦截器
axios.interceptors.response.use(function(response) {
	if(response.data.code == 40000 || response.data.code == 40001) {

		router.push({
			path: '/login',
			query: {
				redirect: sessionStorage.redirectUrl
			}
		});
		return false;
	}
	return response;
}, function(error) {
	//对返回的错误进行一些处理
	return Promise.reject(error);
});