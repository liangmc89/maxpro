<template>

	<pull-to :top-load-method="refresh" id='pullto'>
		<div id="myProperty">
			<div class="h-bg">
				<h5 class="page-title">我的财务</h5>
			</div>	
			<!--<user-Info></user-Info>-->
			<div class="padding-content">
				
			<div class="section">
				
					<p class="property-subtitle">我的资产</p>
				
				<div class="account-detail">
					<div class="detail-item" v-ripple>
						<h5>余额</h5>
						<p class="amount">{{top.balance|currency}}</p>
					</div>
					<hr  />
					<div class="detail-item" v-ripple>
						<h5>净值</h5>
						<p class="amount">{{top.equity|currency}}</p>
					</div>
				</div>
				<div class="account-detail">
					<div class="detail-item" v-ripple>
						<h5>盈亏</h5>
						<p class="amount">{{top.totalunprofit|currency}}</p>
					</div>
					<hr  />
					<div class="detail-item" v-ripple>
						<h5>持仓</h5>
						<p class="amount">{{top.totalprofit|currency}}</p>
					</div>
				</div>
				<div class="account-detail">
					<div class="detail-item" v-ripple>
						<h5>入金</h5>
						<p class="amount" >{{top.innumber|currency}}</p>
					</div>
					<hr  />
					<div class="detail-item" v-ripple>
						<h5>出金</h5>
						<p class="amount">{{top.outnumber|currency}}</p>
					</div>
				</div>
				<div class="account-detail">
					<div class="detail-item" v-ripple>
						<h5>净入金</h5>
						<p class="amount">{{top.netmoney|currency}}</p>
					</div>
					<hr />
					<div class="detail-item" v-ripple>
						<h5>赠金</h5>
						<p class="amount">{{top.credit|currency}}</p>
					</div>
				</div>
				<div class="account-detail">
					<div class="detail-item" v-ripple>
						<h5>跟单</h5>
						<p class="amount">{{top.follow|currency}}</p>
					</div>
					<hr  />
					<div class="detail-item" v-ripple>
						<h5>返佣</h5>
						<p class="amount">{{top.totalprofit|currency}}</p>
					</div>
				</div>
			</div>
			</div>
		</div>
	</pull-to>
</template>

<script>
	import { Toast, Ripple } from 'quasar'
	import userInfo from './userInfo.vue'
	import PullTo from 'vue-pull-to'
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
			PullTo
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
		mounted: function() {
			this.refresh();
		}
	}
</script>

<style>
  .property-subtitle{
  	padding: 1.2rem;
  	text-align: center;
  	margin: 0 1.2rem .5rem 1.2rem;
  	font-size: 1.8rem;
  	border-bottom: 1px solid rgb(227,227,227);
  }
</style>