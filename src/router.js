import Vue from 'vue'
import VueRouter from 'vue-router'

Vue.use(VueRouter)

function load(component) {
  // '@' is aliased to src/components
  return () =>
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
  }, {
    path: '/register',
    component: load('register')
  },
    {
      path: '/resetPwd',
      component: load('resetPwd'),
      name: 'resetPwd'
    }, {
      path: '/home',
      component: load('home'),
      name: 'home',
      meta: {
        requireAuth: true,
      }
    },
    {
      path: '/login',
      component: load('login'),
      name: 'login'
    },
    {
      path: '/maxpro/articleDetail',
      component: load('articleDetail'),
      name: 'articleDetail',
      meta: {
        requireAuth: true,
      }
    },
    {
      path: '/maxpro/member/mtList',
      component: load('mtList'),
      name: 'mtList',
      meta: {
        requireAuth: true,
      }
    },
    {
      path: '/maxpro/member/customer',
      component: load('customer'),
      meta: {
        requireAuth: true,
      }
    },
    {
      path: '/maxpro/myProperty/doWithDraw/actionResult',
      component: load('actionResult'),
      name: 'actionResult',
      meta: {
        requireAuth: true,
      }
    },
    {
      path: '/maxpro/myProperty/addDepositIn',
      component: load('addDepositIn'),
      name: 'addDepositIn',
      meta: {
        requireAuth: true,
      }
    }
    ,
    {
      name: 'doDepositOut',
      path: '/maxpro/myProperty/doDepositOut',
      component: load('doDepositOut'),
      meta: {
        requireAuth: true,
      }
    },
    {
      path: '/maxpro/myProperty/doWithDraw',
      component: load('doWithDraw'),
      name: 'doWithDraw',
      meta: {
        requireAuth: true,
      }
    },
    {
      path: '/maxpro/member/addBankCard',
      component: load('addBankCard'),
      name: 'addBankCard',
      meta: {
        requireAuth: true,
      }
    },
    {
      path: '/maxpro/member/settings',
      component: load('settings'),
      name: 'settings',
      meta: {
        requireAuth: true,
      }
    },
    {
      path: '/maxpro',
      component: load('maxpro'),
      children: [{
        path: 'home',
        component: load('home'),
        meta: {
          requireAuth: true,
        }
      }, {
        path: '',
        redirect: 'home',
        meta: {
          requireAuth: true,
        }

      },
        {
          path: 'member',
          component: load('member'),
          name: 'member',
          meta: {
            requireAuth: true,
          }
        },
        {
          path: 'member/bankList',
          component: load('bankList'),
          name: 'bankList',
          meta: {
            requireAuth: true,
          }
        },
        {
          path: '/maxpro/member/promoCode',
          component: load('promoCode'),
          meta: {
            requireAuth: true,
          }
        },
        {
          path: 'test',
          component: load('test')
        }, {
          path: 'home/articleList',
          component: load('articleList'),
          meta: {
            requireAuth: true,
          }

        },
        {
          path: 'myProperty',
          component: load('myProperty'),
          meta: {
            requireAuth: true,
          }

        }, {
          path: 'myProperty/commissionList',
          component: load('commissionList'),
          name: 'commissionList',
          meta: {
            requireAuth: true,
          }
        }, {
          path: 'myProperty/followList',
          component: load('followList'),
          name: 'followList',
          meta: {
            requireAuth: true,
          }
        }, {
          path: 'myProperty/depositInList',
          component: load('depositInList'),
          name: 'depositInList',
          meta: {
            requireAuth: true,
          }
        }, {
          path: 'followList',
          component: load('followList'),
          meta: {
            requireAuth: true,
          }
        },
        {
          path: 'myProperty/depositOutList',
          component: load('depositOutList'),
          meta: {
            requireAuth: true,
          }
        },
        {
          path: 'myProperty/addDepositOut',
          component: load('addDepositOut'),
          meta: {
            requireAuth: true,
          }
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
