<template>
  <div class="content-wrapper">
    <div class="content-title">
      <q-toolbar class="text-center" style="background: transparent;height: 4.8rem">
        <q-btn flat icon="keyboard_arrow_left" @click="$router.back()" >
        </q-btn>
        <q-toolbar-title>
          跟单记录
        </q-toolbar-title>
        <div style="width: 4rem"></div>
      </q-toolbar>
    </div>
    <div class="content-flex">
      <pull-to :top-load-method="refresh">
        <div id="commissionList">
          <div class="section" style=" margin-bottom: 0;">
            <div class="account-detail">
              <div class="detail-item" style="padding-top: 1.2rem;" v-ripple>
                <h5>汇总</h5>
                <p class="amount">{{total.count}}<span style="font-size: .6em; margin-left: .3em;">单</span></p>
              </div>
              <hr style="margin-top: 2.7rem;" />
              <div class="detail-item" style="padding-top: 1.2rem;" v-ripple>
                <h5>总计盈亏</h5>
                <p class="amount">{{total.AMOUNT|currencys}}</p>
              </div>
            </div>
          </div>
          <q-data-table :data="table" :config="config" :columns="columns" @refresh="refresh" @selection="selection" @rowclick="rowClick">

          </q-data-table>

        </div>
      </pull-to>
    </div>
  </div>





</template>

<script>
	import {
		QDataTable,
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
		Ripple,QToolbar,QToolbarTitle
	} from 'quasar'

	import { currencys } from '../js/filter'
	import PullTo from 'vue-pull-to'
	export default {
		directives: {
			Ripple
		},
		components: {
			QDataTable,
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
			PullTo,QToolbar,QToolbarTitle
		},
		filters: {
			currencys: function(value) {
				return currencys(value);
			}
		},
		methods: {

			refresh(done) {
				let self = this;
        self.$showloading();
				this.timeout = setTimeout(() => {

					self.$http.post(self.$api.url.followList, {
						num: 100000,
						page: 1,
						ticket: ''
					}).then(response => {
						if(response.data.code == 1) {
							self.table = response.data.data.list;
							self.total = response.data.data.data;
						} else {
							//							Toast.create({
							//								html: response.data.message
							//							});
						}
					}).catch(err => {
						Toast.create.negative({
							html: err.message
						});
					});
					if(done) {
						done();
					}
           self.$hideloading();
				}, 1000)
			},
			selection(number, rows) {
				console.log(`selected ${number}: ${rows}`)
			},
			rowClick(row) {
				//console.log('clicked on a row', row)
			}
		},
		beforeDestroy() {
			clearTimeout(this.timeout)
		},
		data() {
			return {
				table: [],
				total: {
					count: 0,
					AMOUNT: 0
				},
				config: {
					title: '',
					refresh: false,
					noHeader: false,
					columnPicker: false,
					leftStickyColumns: 1,
					rightStickyColumns: 0,
					bodyStyle: {
						maxHeight: '420px'
					},
					rowHeight: '35px',
					responsive: false,
					pagination: {
						rowsPerPage: 15,
						options: [5, 10, 15, 30, 50, 500]
					},
					selection: false,
					messages: {
						loading:'loading',
						noData: '<div class="nodata"><i class="material-icons text-warning" style="font-size: 22px">info</i> 暂无数据！</div>',
						noDataAfterFiltering: '<div class="nodata"><i class="material-icons text-warning" style="font-size: 22px">info</i> Sorry ,没有查找到结果。</div>'
					},
					// (optional) Override default labels. Useful for I18n.
					labels: {
						columns: '列',
						allCols: '所有列',
						rows: '行',
						selected: {
							singular: '单选',
							plural: '多选'
						},
						clear: '清除',
						search: '查找',
						all: '所有'
					}
				},
				columns: [

					{
						label: '订单号',
						field: 'TICKET',
						width: '100px',
						sort: true,
						filter: true,
						type: 'string'
					},
					{
						label: 'MT账户',
						field: 'LOGIN',
						width: '80px',
						sort: true,
						filter: true,
						type: 'string'

					},
					{
						label: '源订单',
						field: 'AMOUNT',
						filter: true,
						sort: true,
						type: 'string',
						width: '120px',
						format(value) {
							return currencys(value);
						}
					},
					{
						label: '源账号',
						field: 'COMM_TYPE',
						filter: true,
						sort: true,
						type: 'string',
						width: '100px'
					},
					{
						label: '品种',
						field: 'SYMBOL',
						sort: true,
						type: 'string',
						filter: true,
						width: '100px'
					},
					{

						label: '盈亏',
						field: 'SYMBOL',
						sort: true,
						type: 'string',
						filter: true,
						width: '100px'

					}
				],

				pagination: true

			}
		},
		mounted: function() {
			this.refresh();
		}
	}
</script>

<style lang="stylus">
	.my-label {
		padding: 5px;
		border-radius: 3px;
		display: inline-block;
	}

	.nodata {
		background: white;
		height: 200px;
		width: 100%;
		text-align: center;
		padding-top: 50px
	}
</style>
