<template>
	<pull-to :top-load-method="refresh" id='pullto'>
		<div id="myProperty">
			<div class="h-bg">
				<h5 class="page-title"></h5>
			</div>
			<div class="padding-content">
				<div class="section">
					<!--<q-field icon="" helper="Helper" label="">		-->
					<div class="row no-wrap">
						<div class="col-3" style="position: relative;">
							<span class="slabel">输入啊</span>
						</div>
						<q-input class="col-9" value='2' />
					</div>
					<!--</q-field>-->

				</div>

			</div>
		</div>

	</pull-to>
</template>

<script>
	import { QField, QInput, Toast, Ripple, QCarousel, QIcon, QPopover, QList, QItem, QBtn } from 'quasar'
	import PullTo from 'vue-pull-to'
	import { currencys } from '../js/filter'
	export default {
		directives: {
			Ripple
		},
		data() {
			return {
				withDraw: {}
			}
		},
		components: {
			Toast,
			PullTo,
			QCarousel,
			QIcon,
			QPopover,
			QList,
			QItem,
			QBtn,
			QInput,
			QField

		},
		methods: {
			refresh: function(done) {
				let self = this;
				self.$http.post(self.$api.url.withdraw, {}).then(response => {
					if(response.data.code == 1) {
						self.withDraw = response.data.data;
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
	
	.slabel {
		width: 100%;
		height: 35%;	
		margin: auto;
		position: absolute;
		top: 0;
		left: 0;
		bottom: 0;
		right: 0;
	}
</style>