<template>
 <div id="aa">
 	
 </div>
	<!--<pull-to :top-load-method="refresh" :bottom-load-method='loadmore' id='pullto'>
		<div class="h-bg">
			<h5 class="page-title">我的资产</h5>
		</div>

		<div style="margin: 1rem;background: white;">

		</div>
	</pull-to>-->

</template>

<script>
	import { Toast } from 'quasar'

	import PullTo from 'vue-pull-to'
	export default {
		data() {
			return {

			}
		},
		components: {
			Toast

		},
		methods: {

			refresh: function(done) {

			},
			fetchData: function() {
				let self = this;
				self.$http.post(self.$api.url.articlelList, {
					type: self.art[self.selectIndex].type,
					page: self.art[self.selectIndex].page,
					num: self.num
				}).then(response => {

					if(response.data.code == 1) {

					} else {
						//						Toast.create.negative({
						//							html: response.data.message
						//						});
					}
				}).catch(err => {
					Toast.create.negative({
						html: err.message
					});
				});

			}
		},
		mounted: function() {
			this.refresh();
			//			var a=document.getElementsByClassName('layout-page');
			//			var b=document.getElementById("pullto");
			//			b.style.height=a[0].clientHeight+'px';

		},
		created: function() {

		}
	}
</script>

<style>
	.q-tabs-pane {
		border: none;
	}
</style>