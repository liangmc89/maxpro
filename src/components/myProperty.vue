<template>
  <div class="content-wrapper">
    <div class="content-title">我的财务</div>
    <div class="content-flex">
      <pull-to :top-load-method="refresh" id='pullto'>
        <div id="myProperty">

          <div class="padding-content">
            <div class="section">
              <p class="property-subtitle">我的资产</p>

              <div class="account-detail">
                <div class="detail-item" v-ripple>
                  <h5>余额</h5>
                  <p class="amount">{{top.balance|currencyFilter}}</p>
                </div>
                <hr />
                <div class="detail-item" v-ripple>
                  <h5>净值</h5>
                  <p class="amount">{{top.equity|currencyFilter}}</p>
                </div>
              </div>
              <div class="account-detail">
                <div class="detail-item" v-ripple>
                  <h5>盈亏</h5>
                  <p class="amount">{{top.mtprofit|currencyFilter}}</p>
                </div>
                <hr />
                <div class="detail-item" v-ripple>
                  <h5>持仓</h5>
                  <p class="amount">{{top.totalunprofit|currencyFilter}}</p>
                </div>
              </div>
              <div class="account-detail">
                <router-link to='/maxpro/myProperty/depositInList' exact>
                  <div class="detail-item" v-ripple>
                    <h5>入金</h5>
                    <p class="amount">{{top.innumber|currencyFilter}}</p>
                  </div>
                </router-link>
                <hr />
                <router-link to='/maxpro/myProperty/depositOutList' exact>
                  <div class="detail-item" v-ripple>
                    <h5>出金</h5>
                    <p class="amount">{{top.outnumber|currencyFilter}}</p>
                  </div>
                </router-link>
              </div>
              <div class="account-detail">
                <div class="detail-item" v-ripple>
                  <h5>净入金</h5>
                  <p class="amount">{{top.netmoney|currencyFilter}}</p>
                </div>
                <hr />
                <div class="detail-item" v-ripple>
                  <h5>赠金</h5>
                  <p class="amount">{{top.credit|currencyFilter}}</p>
                </div>
              </div>
              <div class="account-detail">
                <router-link to='/maxpro/myProperty/followList' exact>
                  <div class="detail-item" v-ripple>
                    <h5>跟单</h5>
                    <p class="amount">{{top.follow|currencyFilter}}</p>
                  </div>
                </router-link>
                <hr />
                <router-link to='/maxpro/myProperty/commissionList' exact>
                  <div class="detail-item" v-ripple>
                    <h5>返佣</h5>
                    <p class="amount">{{top.amount|currencyFilter}}</p>
                  </div>
                </router-link>
              </div>
            </div>
            <div style="margin-top: 3.5rem;">
              <user-info></user-info>
            </div>

          </div>
        </div>

      </pull-to>
    </div>
  </div>

</template>

<script>
	import { Toast, Ripple, QCarousel, QIcon, QPopover, QList, QItem, QBtn } from 'quasar'
	import userInfo from './userInfo.vue'
	import PullTo from 'vue-pull-to'
	import { currencys } from '../js/filter'
	export default {
		directives: {
			Ripple
		},
		data() {
			return {
				top: {}
			}
		},
		components: {
			Toast,
			userInfo,
			PullTo,
			QCarousel,
			QIcon,
			QPopover,
			QList,
			QItem,
			QBtn

		},
		methods: {
			refresh: function(done) {
				let self = this;
				self.$showloading();
				setTimeout(()=>{
          self.$http.post(self.$api.url.myProperty, {}).then(response => {
          if(response.data.code == 1) {
            self.top = response.data.data;
          }
        }).catch(err => {});
        if(done) {
          done();
        }
        self.$hideloading();
        },1000)


			}
		},
		filters: {
			currencyFilter: function(value) {
				return currencys(value);
			}
		},
		mounted: function() {
			this.refresh();
		}
	}
</script>

<style>
	.property-subtitle {
		padding: 1.2rem;
		text-align: center;
		margin: 0 1.2rem .5rem 1.2rem;
		font-size: 1.6rem;
		border-bottom: 1px solid rgb(227, 227, 227);
	}

</style>
