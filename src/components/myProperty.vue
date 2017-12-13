<template>

	<pull-to :top-load-method="refresh" id='pullto'>
		<div id="myProperty">
			<div class="h-bg">
				<h5 class="page-title">我的财务</h5>
			</div>
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
						<div class="detail-item" v-ripple>
							<h5>跟单</h5>
							<p class="amount">{{top.follow|currencyFilter}}</p>
						</div>
						<hr />
						<router-link to='/maxpro/myProperty/commissionList'>
							<div class="detail-item" v-ripple>
								<h5>返佣</h5>
								<p class="amount">{{top.amount|currencyFilter}}</p>
							</div>
						</router-link>
					</div>
				</div>
				<div class="account-info">
					<img class="account-icon" src="../statics/images/account_icon.png" />
					<p class="account-title">账号<span class="account linear-font">{{top.loginid}}</span>
						<q-btn ref="target" icon="fa-angle-down" round small outline color="primary">

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
							<div class="detail-item">
								<h5>余额</h5>
								<p class="amount">${{top.balance}}</p>
							</div>
							<hr style="width: 1; height: 2rem; float: left;display: inline-block; margin-top: 1.5rem; border: none; border-left: 1px solid rgba(0,0,0,.5);" />
							<div class="detail-item">
								<h5>盈亏</h5>
								<p class="amount">${{top.totalprofit}}</p>
							</div>
						</div>
					</q-carousel>
				</div>
			</div>
		</div>
	</pull-to>
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
				self.$http.post(self.$api.url.myProperty, {}).then(response => {
					if(response.data.code == 1) {

						self.top = response.data.data;
					}
				}).catch(err => {});
				if(done) {
					done();
				}

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
		font-size: 1.8rem;
		border-bottom: 1px solid rgb(227, 227, 227);
	}
</style>