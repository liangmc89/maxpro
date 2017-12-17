<template>
	<div id="deposiInList">
		<div class="h-bg my-bg">
			<h5 class="page-title">财务-入金</h5>
		</div>
		<div class="section total-info">
			<div class="account-detail">
				<q-input v-model="ticket" placeholder='订单号搜索' clearable :before="[{icon: 'fa-search text-primary', handler () {refresh()}}]" :after="[{icon: 'fa-filter text-primary', handler () {}}]" />
				<div class="detail-item" v-ripple>
					<h5>成功</h5>
					<p class="amount">{{vtotal.TNUM}}<span style="font-size: .6em;margin-left: .3em;">次入金</span></p>
				</div>
				<hr />
				<div class="detail-item" v-ripple>
					<h5>总计</h5>
					<p class="amount">{{vtotal.TDOLLOR|currencys}}</p>
				</div>
			</div>
		</div>
		<pull-to :top-load-method="refresh" :bottom-load-method='loadmore'>
			<ul id='in-List'>
				<li v-for="(item,index) in listIn" :key="index" v-ripple>
					<div class="row no-wrap">
						<div class="col-3 order-num list-style">订单号:</div>
						<div class="col-5 order-content">{{item.id}}</div>
						<div class="col-4 order-status text-primary">{{item.status|statusFormat}}</div>
					</div>
					<div class="row no-wrap">
						<div class="col-3 order-num">账户:</div>
						<div class="col-2 order-content">{{item.mtid}}</div>
						<div class="col-2 order-content">{{item.nickname}}</div>
						<div class="col-5 order-status text-primary usd">{{item.number|currencys}}</div>
					</div>
					<div class="row no-wrap">
						<div class="col-3 order-num">支付方式:</div>
						<div class="col-4 order-content">{{item.type}}</div>
						<div class="col-5 order-status rmb">{{item.price|currencys('￥')}}</div>
					</div>
					<div class="row no-wrap">
						<div class="col-3 order-num">订单时间:</div>
						<div class="col-5 order-content">{{item.create_time|dateFormat}}</div>
						<div class="col-4 order-status text-primary"></div>
					</div>
					
				</li>
			</ul>
		</pull-to>
		<q-btn round inversted color='white' @click="$router.push('/maxpro/myProperty/addDepositIn')"  class="fixed" style="right: 1.5rem; bottom: 8rem">
			<q-icon name="fa-addDepositIn" />
		</q-btn>
	</div>
</template>

<script>
	import {
		QTab,
		QTabs,
		QTabPane,
		QField,
		QInput,
		QCheckbox,
		QSelect,
		QSlider,
		QBtn,
		QIcon,
		QTooltip,
		QCollapsible,
		clone,
		Toast,
		Ripple,
		date
	} from 'quasar'

	import { currencys } from '../js/filter'
	import PullTo from 'vue-pull-to'
	export default {
		directives: {
			Ripple
		},
		components: {

			QTab,
			QTabs,
			QTabPane,
			QField,
			QInput,
			QCheckbox,
			QSelect,
			QSlider,
			QBtn,
			QIcon,
			QTooltip,
			QCollapsible,
			Toast,
			PullTo,
			date
		},
		filters: {
			currencys: function(value, c) {
				return currencys(value, c);
			},
			dateFormat: function(data_str) {
				return date.formatDate(new Date(parseInt(data_str) * 1000), 'YYYY/MM/DD HH:mm:ss')
			},
			statusFormat: function(value) {
				let status;
				switch(value) {
					case '0':
						status = '初始'
						break;
					case '1':
						status = '驳回'
						break;
					case '9':
						status = '审核通过'
						break;
				}
				return status;
			}

		},
		methods: {
			addDepositIn(){
				
			},
			loadmore(done) {
				this.fetchData(done);
				this.page++;

			},
			refresh(done) {
				this.page = 1;
				this.listIn = [];
				this.fetchData(done);

			},
			fetchData(done) {
				let self = this;
				this.timeout = setTimeout(() => {
					self.$http.post(self.$api.url.depositInList, {
						page: self.page,
						num: 10,
						ticket: self.ticket
					}).then(response => {
						if(response.data.code == 1) {
							self.vtotal = response.data.data.data.vtotal;
							self.listIn = self.listIn.concat(response.data.data.list);
						} else {
							Toast.create({
								html: response.data.message
							});
						}
					}).catch(err => {
						Toast.create.negative({
							html: err.message
						});
					});
					if(done) {
						done();
					}

				}, 1000)
			}

		},
		data() {
			return {
				ticket: '',
				vtotal: {},
				listIn: {},
				page: 1,
				search: ''

			}
		},
		mounted: function() {
			this.refresh();
		}
	}
</script>

<style>
	#in-List {
		list-style: none;
		padding: 0;
		margin: 0;
		padding: 1rem;
		font-size: 1.4rem;
	}
	
	#deposiInList .detail-item {
		padding-bottom: 0;
	}
	
	#in-List li {
		margin-bottom: 1rem;
		background: white;
		padding: 1rem .5rem;
		line-height: 2rem;
		position: relative;
	}
	
	#in-List li:nth-child(even) .list-style {
		background: url(../statics/images/list-style-green.png) no-repeat left center/1.4rem;
	}
	
	#in-List li:nth-child(odd) .list-style {
		background: url(../statics/images/list-style-orange.png) no-repeat left center/1.4rem;
	}
	
	.order-num {
		text-align: right;
		position: relative;
		padding: 0 1rem;
	}
	
	.order-content {
		text-align: left;
		color: darkgray;
		padding: 0 .3rem;
	}
	
	.order-status {
		text-align: right;
		padding: 0 .3rem;
	}
	
	.bg-white {
		background: white;
	}
	
	.my-bg {
		z-index: 2;
	}
	
	#deposiInList {
		height: 100%;
		display: flex;
		flex-direction: column;
	}
	
	.total-info {
		border-radius: 0;
		margin-bottom: 0;
		z-index: 2;
		padding: 0 1.2rem;
		box-shadow: 0px .4rem .2rem rgba(0, 0, 0, .2)
	}
	
	.rmb {
		color: gray;
	}
	
	.usd {
		font-size: 2rem;
	}
	.fa-addDepositIn:before{
		/*position: absolute;*/
		background:url(../statics/images/addDepositIn.png) no-repeat center center/26px 26px ;
		content: '';
		width: 26px;
		height: 26px;
		/*left: 0;
		top: 0;*/
	}
</style>