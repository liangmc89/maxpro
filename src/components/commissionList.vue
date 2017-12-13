<template>
	<pull-to :top-load-method="refresh">
		<div id="commissionList">
			<div class="h-bg">
				<h5 class="page-title">返佣记录</h5>
			</div>
			<div class="section" style=" margin-bottom: 0;">
				<div class="account-detail">
					<div class="detail-item" style="padding-top: 1.2rem;" v-ripple>
						<h5>返佣次数</h5>
						<p class="amount">{{total.count}}</p>
					</div>
					<hr style="margin-top: 2.7rem;"/>
					<div class="detail-item" style="padding-top: 1.2rem;" v-ripple>
						<h5>返佣总额</h5>
						<p class="amount">{{total.AMOUNT|currencys}}</p>
					</div>
				</div>
			</div>
			<q-data-table :data="table" :config="config" :columns="columns" @refresh="refresh" @selection="selection" @rowclick="rowClick">
				<template slot="col-message" slot-scope="cell">
					<span class="light-paragraph">{{cell.data}}</span>
				</template>
				<template slot="col-source" slot-scope="cell">
					<div v-if="cell.data === 'Audit'" class="my-label text-white bg-primary">
						Audit
						<q-tooltip>Some data</q-tooltip>
					</div>
					<div v-else class="my-label text-white bg-negative">{{cell.data}}</div>
				</template>

				
			</q-data-table>

		</div>
	</pull-to>
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
		Ripple
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
			PullTo
		},
		filters: {
			currencys: function(value) {
				return currencys(value);
			}
		},
		methods: {
			
			refresh(done) {
				let self = this;

				this.timeout = setTimeout(() => {

					self.$http.post(self.$api.url.commissionList, {
						num: 100000,
						page: 1,
						ticket: ''
					}).then(response => {
						if(response.data.code == 1) {
							self.table = response.data.data.list;
							self.total = response.data.data.data;
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

				}, 5000)
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
				total: {},
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
						rowsPerPage: 15
						//options: [5, 10, 15, 30, 50, 500]
					},
					selection: false,
					messages: {
						noData: '<i class="material-icons text-positive" style="font-size: 22px">info</i> 暂无数据！',
						noDataAfterFiltering: '<i class="material-icons text-positive" style="font-size: 22px">info</i> Sorry ,没有查找到结果。'
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
						label: '返佣',
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
						label: '名称',
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
</style>