<template>
  <div class="content-wrapper">
  <div class="content-title">
    <q-toolbar class="text-left" style="background: transparent;height: 4.8rem">
      <q-btn flat icon="keyboard_arrow_left" @click="$router.back()" >
      </q-btn>
      <q-toolbar-title>
        新闻详情
      </q-toolbar-title>

    </q-toolbar>

  </div>
    <div class="content-flex">
      <!--<pull-to>-->
        <div class="article scroll">

          <h4 class="title">{{articleDetail.title}}</h4>
          <h6 class="subtitle">{{articleDetail.create_time|dateFormat}}</h6>
          <div class="content" >
            <span v-html="content"></span>
            <q-btn
              color="blue"
              inverted
              v-back-to-top.animate="{offset: 500, duration: 200}"
              round
              icon="keyboard_arrow_up"
              class="fixed" style="right: 1.5rem; bottom: 6rem"
            ></q-btn>
          </div>

        </div>

      <!--</pull-to>-->

    </div>

  </div>
</template>

<script>
  import PullTo from 'vue-pull-to'
	import { date, BackToTop,
    Ripple,
    QBtn,
    QIcon,
    QFixedPosition,QToolbar,QToolbarTitle } from 'quasar'
	export default {
		data() {
			return {
				articleDetail: this.$route.params.articleDetail
			}
		},
    directives: {
      BackToTop,
      Ripple
    },
		components: {
			date, BackToTop,
      Ripple,
      QBtn,
      QIcon,
      QFixedPosition,
      PullTo,QToolbar,QToolbarTitle
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
		},
    watch: {
      '$route' (to, from) {
        this.articleDetail= this.$route.params.articleDetail;
        // 对路由变化作出响应...
      }
    }

	}
</script>

<style>
	.article {
		padding: 1rem;
		background: white;
    height: 100%;
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
