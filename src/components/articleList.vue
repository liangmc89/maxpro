<template>
      <div class="content-wrapper">
        <div class="content-title">
          <q-toolbar class="text-center" style="background: transparent;height: 4.8rem">
            <q-btn flat icon="keyboard_arrow_left" @click="$router.back()" >
            </q-btn>
            <q-toolbar-title>
              新闻
            </q-toolbar-title>
            <div style="width: 4rem"></div>
          </q-toolbar>
        </div>
        <div class="content-flex">
          <pull-to :top-load-method="refresh" :bottom-load-method='loadmore'  id='pullto' >
            <div style="margin: 1rem;background: white;">
              <q-tabs  inverted>
                <!-- Tabs - notice slot="title" -->
                <q-tab default slot="title" name="tab-1" label='新闻' @click="changeType(0)"/>
                <q-tab slot="title" name="tab-2" label='财经' @click='changeType(1)'/>


                <!-- Targets -->
                <q-tab-pane  name="tab-1" class='no-border' >
                  <router-link :key="index" :to="{name:'articleDetail',params:{articleDetail:item}}" v-for="(item,index) in art[0].list">
                    <Article-Item :article="item"  ></Article-Item>
                  </router-link>


                  <div class="no-data" v-show="art[0].list==null||art[0].list.length==0"></div>
                </q-tab-pane>
                <q-tab-pane name="tab-2" class='no-border'>
                  <router-link :key="index" :to="{name:'articleDetail',params:{articleDetail:item}}" v-for="(item,index) in art[1].list">
                    <Article-Item :article="item"  ></Article-Item>
                  </router-link>
                  <div class="no-data" v-show="art[1].list==null||art[1].list.length==0"></div>
                </q-tab-pane>

              </q-tabs></div>
          </pull-to>
        </div>
      </div>



</template>

<script>
	import {
		Toast,
		date,
		QTab,
		QTabs,
		QTabPane,
    QToolbar,QToolbarTitle,QBtn

	} from 'quasar'
	import ArticleItem from '../components/articleItem'
	import PullTo from 'vue-pull-to'
	export default {
		data() {
			return {

				art: [{
					type: 2,
					page: 1,
					list: []
				}, {
					type: 3,
					page: 1,
					list: []
				}],
				num: 10,
				selectIndex: 0

			}
		},
		components: {
			Toast,
			PullTo,
			date,
			QTab,
			QTabs,
			QTabPane,
			ArticleItem,
      QToolbar,QToolbarTitle,QBtn


		},
		methods: {

			changeType: function(val) {

				this.selectIndex=val;
				if(this.art[this.selectIndex].list.length == 0) {
					this.fetchData();
				}
			},


			loadmore: function(done) {

				let self = this;
				setTimeout(() => {
					this.fetchData();
					done()
				}, 2500)


			},
			refresh: function(done) {

				this.art[0].page = 1;
				this.art[0].list = [];

				this.art[1].page = 1;
				this.art[1].list = [];

				this.fetchData();
				if(done != null) {
					done();
				}
			},
			fetchData: function() {
				let self = this;
				self.$http.post(self.$api.url.articlelList, {
					type: self.art[self.selectIndex].type,
					page: self.art[self.selectIndex].page,
					num: self.num
				}).then(response => {

					if(response.data.code == 1) {

						self.art[self.selectIndex].list = self.art[self.selectIndex].list.concat(response.data.data);
						self.art[self.selectIndex].page++;


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
		//	this.refresh();
//			var a=document.getElementsByClassName('layout-page');
//			var b=document.getElementById("pullto");
//			b.style.height=a[0].clientHeight+'px';


		},
		created:function(){

		}
	}
</script>

<style>
   .q-tabs-pane{
  	border: none;
  }


</style>
