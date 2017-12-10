<template>
	<pull-to :top-load-method="refresh" id='pullto'>
		<div id="home" class="layout-padding">
			<div class="head-bg">
				<h4 class="page-title">首页</h4>
			</div>
			<div class="head">
				<div class="sys-notice padding-1rem">
					<q-carousel class="text-white" autoplay infinite>
						<div slot="slide" v-for='(item,index) in notice' :key='item.cid' style="width: 100%;">
							<div class="notice-item">
								<div class="notice-left-icon">
									<q-icon name='fa-volume-down' size='2rem' class='notice-item-icon'></q-icon>
								</div>
								<div class="notice-title" @click="goArticleDetail(item)">
									<h5 style="margin-top: 0;">{{item.title}}</h5>
									<p class="notice-subtitle">{{item.create_time|dateFormat}}</p>
								</div>
								<div class="notice-right-icon">									
								<q-icon name='fa-angle-right' size='2rem' class='notice-item-icon' @click="goArticleList"></q-icon>
								</div>
							</div>
						</div>

					</q-carousel>
				</div>
			</div>

			<div class="account-info">
				<img class="account-icon" src="../statics/images/account_icon.png" />
				<p class="account-title">账号<span class="account linear-font">{{top.login}}</span>
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
			<div class="section">
				<!--<q-btn v-for="(item,index) in charts" outline="item.value==chartType" :flat="item.value!=chartType" rounded :outline="item.value==chartType" @click="ChangeChart(item.value)" :key="index" :color="item.value==chartType?'primary':''">{{item.name}}</q-btn>-->

				<q-tabs v-model="chartType" inverted @select="ChangeChart">
					<q-tab slot="title" :key="index" v-for="(item,index) in charts" :name="item.value" :label="item.name" />
				</q-tabs>

				<div class="echarts">
					<IEcharts :option="bar" :loading="loading" @ready="onReady" @click="onClick"></IEcharts>

				</div>

			</div>

		</div>
	</pull-to>
</template>

<script>
	import { QCarousel, QIcon, Toast, QPopover, QList, QItem, QBtn, date, QTab, QTabs, QTabPane } from 'quasar'
	import IEcharts from 'vue-echarts-v3/src/full.js';
	import PullTo from 'vue-pull-to'
	export default {
		data() {
			return {
				notice: [],
				top: {},
				charts: [{
					name: "7日盈亏",
					value: "1"
				}, {
					value: "2",
					name: "30日盈亏"
				}, {
					value: "3",
					name: "半年盈亏"
				}, {
					value: "4",
					name: "全年盈亏"
				}],
				chartType: "1",
				loading: true,
				bar: {
					//					title: {
					//					text: 'ECharts Hello World'
					//					},
					tooltip: {},
					xAxis: {
						data: []
					},
					yAxis: {

					},
					series: [{
						name: '盈亏',
						type: 'line',
						data: []
					}]
				}
			}
		},
		components: {
			QIcon,
			QCarousel,
			QIcon,
			Toast,
			QPopover,
			QList,
			QItem,
			QBtn,
			date,
			QTab,
			QTabs,
			QTabPane,
			IEcharts,
			PullTo

		},
		filters: {
			dateFormat: function(data_str) {
				return date.formatDate(new Date(parseInt(data_str) * 1000), 'YYYY/MM/DD')
			}
		},
		methods: {
            goArticleList(){
            	this.$router.push('/maxpro/articleList');
            },
            goArticleDetail(item){
            	this.$router.push({name:'articleDetail',params:{articleDetail:item}});
            },
			onReady(instance) {
				console.log(instance);
			},
			onClick(event, instance, echarts) {
				console.log(arguments);
			},
			ChangeChart: function(value) {

				this.bar.xAxis.data = [];
				this.bar.series[0].data = [];
				this.chartType = value;
				this.fetchData();
			},
			refresh: function(done) {
				this.bar.xAxis.data = [];
				this.bar.series[0].data = [];

				this.fetchData();
				if(done != null) {
					done();
				}
			},
			fetchData: function() {
				let self = this;
				this.$http.post(this.$api.url.index, {
					date: this.chartType
				}).then(response => {
					if(response.data.code == 1) {
						this.notice = response.data.data.notice;
						this.top = response.data.data.top;

						if(response.data.data.line) {
							response.data.data.line.forEach(function(item, index) {
								self.bar.xAxis.data.push(item.newtime);
								self.bar.series[0].data.push(parseFloat(item.PROFIT));
							});

						}

					}

				}).catch(err => {
					Toast.create.negative({
						html: err.message
					});
				});
				this.loading = false;

			}
		},
		mounted: function() {

			this.fetchData();
			var a = document.getElementsByClassName('layout-page');
			var b = document.getElementById("pullto");
			b.style.height = a[0].clientHeight + 'px';
		}
	}
</script>

<style lang="less">
	.pull-to-refresh {
		/*max-height: none !important;*/
	}
	
	#home {
		position: relative;
		.q-carousel-track>div {
			min-height: 0;
			padding: 0;
		}
		.q-carousel-toolbar {
			color: #F4873C;
		}
		.notice-item {
			font-size: 1.6rem;
			margin-bottom: 0;
			display: flex;
			/*overflow: hidden;
			text-overflow: ellipsis;
			white-space: nowrap;*/
			
			.notice-item-icon {
				margin: 0 1rem;
			}
			.notice-left-icon{
				width: 10%;
				display: inline-block;
			}
			.notice-title{
				overflow: hidden;
				flex: 1;
				display: inline-block;
			}
			.notice-right-icon{
				display: inline-block;
				width: 10%;
			}
		}
		.notice-subtitle {
			
			font-size: 1.4rem;
			font-family: "century gothic";
			color: rgba(255, 255, 255, .6);
		}
		
		.section {
			background: white;
			position: relative;
			margin: 0 0 1rem 0;
			border-radius: .3rem;
		}
		.echarts {
			height: 30rem;
			position: relative;
			overflow: scroll;
		}
	}
</style>