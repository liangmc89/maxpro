<template>
	<div class="account-info" id="userinfo">
		<img class="account-icon" src="../statics/images/account_icon.png" />
		<p class="account-title">账号<span class="account linear-font">{{top.loginid}}</span>
			<q-btn ref="target" icon="fa-angle-down" round outline color="primary" id="account-btn">

				<q-popover ref="popover">
					<q-list separator link>
						<q-item>
							hahahah
						</q-item>
					</q-list>
				</q-popover>
			</q-btn>
		</p>
		<q-carousel autoplay infinite dots>
			<div slot="slide" class="account-detail">
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

			<div slot="slide" class="account-detail">
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
			<div slot="slide" class="account-detail">
				<div class="detail-item" v-ripple>
					<h5>入金</h5>
					<p class="amount">{{top.innumber|currencyFilter}}</p>
				</div>
				<hr />
				<div class="detail-item" v-ripple>
					<h5>出金</h5>
					<p class="amount">{{top.outnumber|currencyFilter}}</p>
				</div>
			</div>
			<div slot="slide" class="account-detail">
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
			<div slot="slide" class="account-detail">
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

		</q-carousel>
	</div>
</template>

<script>
	import { QCarousel, Ripple, QIcon, Toast, QPopover, QBtn, QList, QItem } from 'quasar'
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
			QCarousel,
			QIcon,
			Toast,
			QPopover,
			QBtn,
			QList,
			QItem
		},
		methods: {
			refresh() {
				let self = this;
				self.$http.post(self.$api.url.myProperty, {}).then(response => {
					if(response.data.code == 1) {

						self.top = response.data.data;
					}
				}).catch(err => {});
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
		//		props: ['userInfo']
	}
</script>

<style>
	#userinfo .q-carousel-track>div {
		min-height: 0;
		padding: 0;
	}
	
	#userinfo .q-carousel-toolbar {
		color: #F4873C;
	}
	#account-btn{
		width: 18px;
		height: 18px;
		min-height: 0;
		margin-bottom: .3rem;
		
		font-size: 12px;
	}
	#account-btn .q-icon{
		width: 12px;
		height: 12px;
		font-size: 12px;
		
	}
</style>