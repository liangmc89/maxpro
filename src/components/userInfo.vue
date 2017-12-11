<template>
	<div class="account-info">
		<img class="account-icon" src="../statics/images/account_icon.png" />
		<p class="account-title">账号<span class="account linear-font">top.login</span>
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
			
			<p v-for="(item,index) in list">{{item.name}}</p>
			
			<!--<template v-for="(item,index) in list">
				<template v-if="index%2!=0&&index!=list.length">
					<div slot="slide" class="account-detail">
						<div class="detail-item">
							<h5>{{item.name}}</h5>
							<p class="amount">${{item.value}}</p>
						</div>
				</template>
				<template v-else-if="index%2==0&&index!=list.length">
					<hr style="width: 1; height: 2rem; float: left;display: inline-block; margin-top: 1.5rem; border: none; border-left: 1px solid rgba(0,0,0,.5);" />
					<div class="detail-item">
						<h5>{{item.name}}</h5>
						<p class="amount">${{item.value}}</p>
					</div>
					</div>
				</template>
				<template v-else="index==list.length&&index%2!=0">
				</div>
				</template>

			</template>-->

		</q-carousel>
	</div>
</template>

<script>
	import { QCarousel, QIcon, Toast, QPopover, QBtn,QList, QItem } from 'quasar'
	import PullTo from 'vue-pull-to'
	export default {
		data() {
			return {
				list:[{name:'余额',value:56000},{name:'盈利',value:58000},{name:'亏损',value:546000},{name:'静止',value:562000},{name:'浮动',value:156000}]
				
			}
		},
		components:{
			QCarousel, QIcon, Toast, QPopover, QBtn,QList, QItem
		}
//		props: ['userInfo']
	}
</script>

<style>

</style>