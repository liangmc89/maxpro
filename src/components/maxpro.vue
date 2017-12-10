<template>
	<q-layout  view="hhh lpr fFf" :page-class="{'page-class':true}">
         
		<transition mode="out-in" :duration="1000" name="custom-classes-transition" enter-active-class="animated slideInRight" leave-active-class="animated slideOutleft">

			<keep-alive>
				<router-view></router-view>
			</keep-alive>
		</transition>
		

		<q-toolbar color="white" slot="footer" >
			<q-tabs position="bottom" color="amber" align="justify" class="maxpro-toolbar" inverted>
				<q-route-tab icon="fa-home" to="/maxpro/home" exact slot="title" />
				<q-route-tab icon="alarm" to="/maxpro/myProperty" exact slot="title" />
				<q-route-tab icon="alarm" to="/maxpro/test" exact slot="title" />
				<q-route-tab icon="fa-star" to="/maxpro/articleList" exact slot="title" />
			</q-tabs>
		</q-toolbar>

	</q-layout>

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
	.maxpro-toolbar {
		width: 100%;
	}
	.page-class{
		background: rgb(246,247,250);
	}
	
	.head-bg {}
</style>