<template>
	<div class="article">
		<h4 class="title">{{articleDetail.title}}</h4>
		<h6 class="subtitle">{{articleDetail.create_time|dateFormat}}</h6>
		<div class="content">
			<span v-html="content"></span>
		</div>
	</div>

</template>

<script>
	import { date } from 'quasar'
	export default {
		data() {
			return {
				articleDetail: this.$route.params.articleDetail
			}
		},
		components: {
			date
		},
		computed: {
			content: function() {
				var div = document.createElement('div');
				div.innerHTML = this.articleDetail.content;
				return div.innerText || div.textContent;
			}

		},
		filters: {
			dateFormat: function(data_str) {
				return date.formatDate(new Date(parseInt(data_str) * 1000), 'YYYY/MM/DD HH:mm:ss')
			}
		}

	}
</script>

<style>
	.article {
		padding: 1rem;
		
		background: white;
	}
	
	.article img,.article video {
		max-width: 100%;
		height: auto;
	}
	
	.article .title {
		padding: 0 2rem;
		text-align: center;
	}
	.article  .subtitle{text-align: center;}
</style>