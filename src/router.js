import Vue from 'vue'
import VueRouter from 'vue-router'

Vue.use(VueRouter)

function load(component) {
	// '@' is aliased to src/components
	return() =>
		import(`@/${component}.vue`)
}

export default new VueRouter({
	/*
	 * NOTE! VueRouter "history" mode DOESN'T works for Cordova builds,
	 * it is only to be used only for websites.
	 *
	 * If you decide to go with "history" mode, please also open /config/index.js
	 * and set "build.publicPath" to something other than an empty string.
	 * Example: '/' instead of current ''
	 *
	 * If switching back to default "hash" mode, don't forget to set the
	 * build publicPath back to '' so Cordova builds work again.
	 */

	mode: 'hash',
	scrollBehavior: () => ({
		y: 0
	}),
	routes: [{
			path: '/',
			component: load('login')
		},{
			path: '/register',
			component: load('register')
		}, {
			path: '/home',
			component: load('home')
		},
		{
			path: '/login',
			component: load('login')
		},
		{
			path: '/maxpro/articleDetail',
			component: load('articleDetail'),
			name: 'articleDetail'
		},
		{
			path: '/maxpro/myProperty/doWithDraw/actionResult',
			component: load('actionResult'),
			name: 'actionResult'
		},
		{
			path: '/maxpro',
			component: load('maxpro'),
			children: [{
					path: 'home',
					component: load('home')
				}, {
					path: '',
					redirect: 'home'

				},
				{
					path: 'test',
					component: load('test')
				}, {
					path: 'home/articleList',
					component: load('articleList'),

				},
				{
					path: 'myProperty',
					component: load('myProperty')

				},{
					path:'myProperty/commissionList',
			        component: load('commissionList')
				},{
					path:'myProperty/followList',
			        component: load('followList')
				},{
					path:'myProperty/doWithDraw',
			        component: load('doWithDraw')
				},{
					path:'myProperty/depositInList',
			        component: load('depositInList')
				},{
					path:'myProperty/addDepositIn',
			        component: load('addDepositIn')
				},{
					path:'followList',
			        component: load('followList')
				},
				{
					path:'myProperty/depositOutList',
			        component: load('depositOutList')
				},
				{
					path:'myProperty/addDepositOut',
			        component: load('addDepositOut')
				}
			]
		},
		// Always leave this last one
		{
			path: '*',
			component: load('Error404')
		} // Not found
	]
})