<template>
	<div id="deposiInList">
    <div class="content-title">
      <q-toolbar class="text-center" style="background: transparent;height: 4.8rem">
        <q-btn flat icon="keyboard_arrow_left" @click="$router.back()" >
        </q-btn>
        <q-toolbar-title>
          财务-出金记录
        </q-toolbar-title>
        <div style="width: 4rem"></div>
      </q-toolbar>
    </div>
		<div class="section total-info">
			<div class="account-detail">
				<q-input v-model="ticket" placeholder='订单号搜索' clearable :before="[{icon: 'fa-search text-primary', handler () {refresh()}}]" :after="[{icon: 'fa-filter text-primary', handler () {}}]" />
				<div class="detail-item" v-ripple>
					<h5>成功</h5>
					<p class="amount">{{vtotal.TNUM}}<span style="font-size: .6em;margin-left: .3em;">次出金</span></p>
				</div>
				<hr />
				<div class="detail-item" v-ripple>
					<h5>总计</h5>
					<p class="amount">{{vtotal.TDOLLOR|currencys}}</p>
				</div>
			</div>
		</div>
		<pull-to :top-load-method="refresh" :bottom-load-method='loadmore'>
			<div class="no-data" v-show="listOut.length==0"></div>
			<ul id='in-List'>
				<li v-for="(item,index) in listOut" :key="index" v-ripple>
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
						<div class="col-3 order-num">出金方式:</div>
						<div class="col-4 order-content">{{item.type|outFormat}}</div>
						<div class="col-5 order-status rmb">{{item.amount|currencys('￥')}}</div>
					</div>
					<div class="row no-wrap">
						<div class="col-3 order-num">申请时间:</div>
						<div class="col-5 order-content">{{item.create_time|dateFormat}}</div>
						<div class="col-4 order-status text-primary"></div>
					</div>
					<!--<div class="row no-wrap">
						<div class="col-3 order-num">成功时间:</div>
						<div class="col-5 order-content">{{item.outtime|dateFormat}}</div>
						<div class="col-4 order-status text-primary"></div>
					</div>-->

				</li>
			</ul>
		</pull-to>
		<q-btn round inversted color='white' @click="$router.push('/maxpro/myProperty/addDepositOut')"  class="fixed" style="right: 1.5rem; bottom: 8rem">
			<q-icon name="fa-addDepositOut" />
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
		date,QToolbar,QToolbarTitle
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
			date,QToolbar,QToolbarTitle
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
						status = '审核中'
						break;
				}
				return status;
			},
			outFormat:function(value){
				let _type;
				switch(value){
					case '1':
					_type='银联';
					break;
					case '2':
					_type='电汇';
					break;
					case '3':
					_type='MT转账';
					break;
				}
				return _type;
			}

		},
		methods: {
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
					self.$http.post(self.$api.url.depositOutList, {
						page: self.page,
						num: 10,
						ticket: self.ticket
					}).then(response => {
						if(response.data.code==1) {
							self.vtotal = response.data.data.data.vtotal;
							self.listOut = self.listOut.concat(response.data.data.list);
						} else if(response.data.code != 40007) {
							Toast.create.info({
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
				listOut: [],
				page: 1,
				search: ''

			}
		},
		created: function() {
			this.refresh();
		}
	}
</script>

<style>


</style>
