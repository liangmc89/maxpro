<template>
	<div class="account-info" id="userinfo">
		<img class="account-icon" src="../statics/images/account_icon.png" />
		<p class="account-title ">账号<span class="account linear-font">{{mt}}</span>
			<q-btn ref="target" icon="fa-angle-down" round outline color="primary" id="account-btn" v-if="mtList.length>1">

				<q-popover ref="popover" >
					<q-list separator link >
						<q-item :class="{disabled:item==mt}" :key="index" v-for="(item,index) in mtList" @click="changeMt(item)">
							{{item}}
						</q-item>
					</q-list>
				</q-popover>
			</q-btn>
		</p>
		<q-carousel autoplay infinite dots>
			<div slot="slide" class="account-detail">
				<div class="detail-item" v-ripple>
					<h5>当前余额</h5>
					<p class="amount">{{top.balance|currencyFilter}}</p>
				</div>
				<hr />
				<div class="detail-item" v-ripple>
					<h5>当前净值</h5>
					<p class="amount">{{top.equity|currencyFilter}}</p>
				</div>
			</div>

			<div slot="slide" class="account-detail">
        <router-link to='/maxpro/myProperty/followList' exact>
          <div class="detail-item" v-ripple>
            <h5>跟单收益</h5>
            <p class="amount">{{top.follow|currencyFilter}}</p>
          </div>
        </router-link>
				<hr />
        <div class="detail-item" v-ripple>
          <h5>当前赠金</h5>
          <p class="amount">{{top.credit|currencyFilter}}</p>
        </div>
			</div>
			<div slot="slide" class="account-detail">
        <router-link to="/maxpro/myProperty/depositInList">
				<div class="detail-item" v-ripple >
					<h5>入金金额</h5>
					<p class="amount">{{top.depoist|currencyFilter}}</p>
				</div>
        </router-link>
				<hr />
        <router-link to="/maxpro/myProperty/depositOutList">
				<div class="detail-item" v-ripple >
					<h5>出金金额</h5>
					<p class="amount">{{top.withdraw|currencyFilter}}</p>
				</div>
        </router-link>
			</div>
			<div slot="slide" class="account-detail">
				<div class="detail-item" v-ripple>
					<h5>平仓总盈亏</h5>
					<p class="amount">{{top.mtprofit|currencyFilter}}</p>
				</div>
				<hr />
        <div class="detail-item" v-ripple>
          <h5>持仓总盈亏</h5>
          <p class="amount">{{top.mtunprofit|currencyFilter}}</p>
        </div>

			</div>
			<!--<div slot="slide" class="account-detail">-->
				<!---->
				<!--<hr />-->

			<!--</div>-->

		</q-carousel>
	</div>
</template>

<script>
	import { QCarousel, Ripple, QIcon, Toast, QPopover, QBtn, QList, QItem } from 'quasar'
	import PullTo from 'vue-pull-to'
	import { currencys } from '../js/filter'
	export default {
		directives: {
			Ripple
		},
		data() {
			return {
			  mt:'',
        mtList:[],
				top: {}

			}
		},
		components: {
			QCarousel,
			QIcon,
			Toast,
			QPopover,
			QBtn,
			QList,
			QItem
		},
    watch:{
		  mt:function () {
        this.refresh();
      }
    },
		methods: {

      changeMt:function (mt) {
        this.$refs.popover.close();
        if(mt!=this.mt){
           this.mt=mt;

        }
      },
		  getMtList:function () {
		    let self=this;
         this.$http.post(this.$api.url.getMtList,{}).then(response=>{
           if(response&&response.data.code==1){
             let arr=[];
             for(let i in response.data.data){
              arr.push(response.data.data[i]);
             }
             self.mtList=arr;
             if(self.mtList.length>0){
               self.mt=self.mtList[0];
             }

           }else{
             Toast.create.info({html:response.data.message})
           }
         }).catch(err=>{
           Toast.create.negative({html:err.message})
         });
      },
			refresh() {
				let self = this;
				if(self.mt=='')return;
        this.$showloading({message:'正在切换MT账号…'})
        setTimeout(()=>{
          this.$http.post(this.$api.url.mtProfit,{loginid:self.mt}).then(response=>{
            this.$hideloading();
            if(response&&response.data.code==1){
              this.top=response.data.data;
            }else{
              Toast.create.info({html:response.data.message})
            }
          }).catch(err=>{
            this.$hideloading();
            Toast.create.negative({html:err.message});
          })
        },1000)
			}
		},
		filters: {
			currencyFilter: function(value) {
				return currencys(value);
			}
		},
		created: function() {
      this.getMtList();
			this.refresh();

		}
		//		props: ['userInfo']
	}
</script>

<style>
	#userinfo .q-carousel-track>div {
		min-height: 0;
		padding: 0;
	}

	#userinfo .q-carousel-toolbar {
		color: #F4873C;
	}

	#account-btn {
		width: 18px;
		height: 18px;
		min-height: 0;
		margin-bottom: .3rem;
		font-size: 12px;
	}

	#account-btn .q-icon {
		width: 12px;
		height: 12px;
		font-size: 12px;
	}

	#userinfo .account-detail {
		padding-bottom: 2rem !important;
	}
</style>
