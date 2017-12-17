<template>
	<div id="maxpro-wrapper">
		<div id="maxpro-content">
			<transition mode="out-in" duration='100' name="custom-classes-transition" enter-active-class="animated fadeIn" leave-active-class="animated fadeOut">

				<keep-alive>
					<router-view></router-view>					
				</keep-alive>
				 
			</transition>
			
		</div>

		<div id="maxpro-footer">
			<q-toolbar color="white">
				<q-tabs position="bottom" color="grey" align="justify" class="maxpro-toolbar" inverted>
					<q-route-tab icon="fa-maxpro-home" to="/maxpro/home" exact slot="title" label='首页' />
					<q-route-tab icon="fa-maxpro-property" to="/maxpro/myProperty" exact slot="title" label='财务' />
					<q-route-tab icon="fa-maxpro-follow" to="/maxpro/followList" exact slot="title" label='跟单' />
					<q-route-tab icon="fa-maxpro-deal" to="/maxpro/home/articleList" exact slot="title" label='交易' />
					<q-route-tab icon="fa-maxpro-my" to="/maxpro/home/articleList" exact slot="title" label='我的' />
				</q-tabs>
			</q-toolbar>
		</div>
	</div>

</template>

<script>
	import { QTabs, QRouteTab, QTabPane, QBtn, QLayout, QToolbar, QTab, QTransition, QScrollArea } from 'quasar'
	import 'quasar-extras/animate'
	export default {
		components: {
			QTabs,
			QRouteTab,
			QBtn,
			QLayout,
			QToolbar,
			QTabPane,
			QTab,
			QTransition,
			QScrollArea
			
		},
		data() {
			return {
				// initializing for second tab to be selected by default
				selectedTab: 'tab-2'
			}
		},
		methods: {
			selectThirdTab() {
				// we select third tab which has `name` set to 'tab-3'
				this.selectedTab = 'tab-3'
			}
		}
	}
</script>
<style>
	#maxpro-wrapper {
		height: 100%;
		width: 100%;
		position: relative;
		display: flex;
		flex-direction: column;
	}
	
	#maxpro-content {
		flex: 1;
		box-sizing: border-box;
		overflow: hidden;
		background: rgba(227,227,233,.6);
	}
	
	#maxpro-footer {
		width: 100%;
		box-sizing: border-box;
		box-shadow: 0 -2px 4px -1px rgba(0, 0, 0, .2), 0 -4px 5px rgba(0, 0, 0, .14), 0 -1px 10px rgba(0, 0, 0, .12);
		z-index: 3;
	}
	
	.maxpro-toolbar {
		width: 100%;
	}
	
	.page-class {
		background: rgb(246, 247, 250);
	}
	
	.router-link-active .fa-maxpro-home:before {
		background: url(../statics/images/fa-maxpro-home-active.png) no-repeat top left/100% 100%;
	}
	
	.router-link-active .fa-maxpro-property {
		background: url(../statics/images/fa-maxpro-property-active.png) no-repeat top left/100% 100%;
	}
	
	.router-link-active .fa-maxpro-deal {
		background: url(../statics/images/fa-maxpro-deal-active.png) no-repeat top left/100% 100%;
	}
	
	.router-link-active .fa-maxpro-follow {
		background: url(../statics/images/fa-maxpro-follow-active.png) no-repeat top left/100% 100%;
	}
	
	.router-link-active .fa-maxpro-my {
		background: url(../statics/images/fa-maxpro-my-active.png) no-repeat top left/100% 100%;
	}
	
	.router-link-active .q-tab-label {
		color: #F4873C;
	}
	
	#maxpro-footer .q-tab.icon-and-label {
		min-height: 55px;
	}
	
	#maxpro-footer .q-tab.icon-and-label {
		padding-top: 0;
		padding-bottom: 0;
	}
	
	#maxpro-footer .q-tabs-bar {
		display: none;
	}
	
	.fa-maxpro-home:before {
		content: '';
		background: url(../statics/images/fa-maxpro-home.png) no-repeat top left/100% 100%;
		width: 25px;
		height: 25px;
	}
	
	.fa-maxpro-property {
		content: '';
		background: url(../statics/images/fa-maxpro-property.png) no-repeat top left/100% 100%;
		width: 25px;
		height: 25px;
	}
	
	.fa-maxpro-deal {
		content: '';
		background: url(../statics/images/fa-maxpro-deal.png) no-repeat top left/100% 100%;
		width: 25px;
		height: 25px;
	}
	
	.fa-maxpro-follow {
		content: '';
		background: url(../statics/images/fa-maxpro-follow.png) no-repeat top left/100% 100%;
		width: 25px;
		height: 25px;
	}
	
	.fa-maxpro-my {
		content: '';
		background: url(../statics/images/fa-maxpro-my.png) no-repeat top left/100% 100%;
		width: 25px;
		height: 25px;
	}
	
	.head-bg {}
</style>