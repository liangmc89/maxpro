<template>
	<div class="artItem relative-position" v-ripple>
		<div class="first-img" v-if='firstImg!=""'>
			<!--<img src="../statics/quasar-logo.png" />-->
			<img :src="firstImg" />
		</div>
		<div class="content">
			<h5 class="art-title">{{article.title}}</h5>
			<h5 class="art-desc">{{article.description==''?'暂无描述':article.description}}</h5>
			<h5 class="art-date">
				<q-icon name='fa-clock-o' color='primary'></q-icon> {{article.create_time|dateFormat}}</h5>

		</div>
	</div>
</template>

<script>
	import { date, QIcon,Ripple } from 'quasar'
	export default {
		data() {
			return {}
		},
    directives: {
      Ripple
    },
		props: ['article'],
		computed: {
			firstImg: function() {

                var str = this.htmlDecode(this.article.content);
				let imgReg = /<img.*?(?:>|\/&gt;)/gi;
				//匹配src属性
				let srcReg = /src=[\'\"]?([^\'\"]*)[\'\"]?/i;
				let arr = str.match(imgReg);

				if(arr&&arr.length > 0 && arr[0].match(srcReg).length > 0) {
                    console.log(arr[0].match(srcReg)[1])
					return arr[0].match(srcReg)[1];
				} else {
					return '';
				}

				//当然你也可以替换src属性
				//				if(src[0]) {
				//					var t = src[0].replace(/src/i, "href");
				//					//alert(t);
				//				}

			}
		},
		components: {
			date,
			QIcon
		},
		filters: {
			dateFormat: function(data_str) {
				return date.formatDate(new Date(parseInt(data_str) * 1000), 'YYYY-MM-DD')
			}
		},
		methods: {
			htmlDecode: function(str) {
				var div = document.createElement('div');
				div.innerHTML = str;
				return div.innerText || div.textContent;
			}

		}

	}
</script>

<style lang="less">
	.artItem {
		margin-bottom: 1rem;
    padding-bottom: 1rem;
		border-bottom: 1px solid rgba(227, 227, 227, .5);
		display: flex;
		.first-img {
			width: 35%;
			height: auto;
			display: inline-block;
			img {
				width: 100%;
				height: 100%;
			}
		}
		.first-img+.content {
			margin-left: 1rem;
			width: 64%;
		}
		.content {
			width: 100%;
			display: inline-block;
			.art-title {
				overflow: hidden;
				text-overflow: ellipsis;
				white-space: nowrap;
			}
			.art-desc {
				color: #999999;
				overflow: hidden;
				text-overflow: ellipsis;
				white-space: nowrap;
			}
			.art-date {
				color: #999999;
				font-family: "century gothic";
			}
		}
	}
</style>
