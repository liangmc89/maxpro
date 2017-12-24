<template>
  <pull-to :top-load-method="refresh">
    <div id="member">
      <div class="h-bg my-bg">
        <h5 class="page-title">我的</h5>
      </div>
      <div class="settings">

        <q-list no-border >

          <q-item v-ripple class="settings-item">
            <q-item-side icon="cloud circle" color="primary">
            </q-item-side>
            <q-item-main label="服务器" sublabel="">
            </q-item-main>
            <q-item-side right icon="keyboard arrow down" color="primary">
              <q-popover ref="popover">
                <q-list link highlight >

                  <q-item tag="label" @click="changeServer()" v-for="(item,index) in serverList" :key="index">
                    <q-item-side>
                      <q-radio v-model="currentServer" :val="item"/>
                    </q-item-side>
                    <q-item-main>
                      <q-item-tile label>{{item.mt4_name}}</q-item-tile>
                    </q-item-main>
                  </q-item>
                </q-list>
              </q-popover>
            </q-item-side>
          </q-item>

          <q-item v-ripple class="settings-item">
            <q-item-side>
              <q-item-tile icon="account circle" color="blue">
              </q-item-tile>
            </q-item-side>
            <q-item-main label="John Doe" sublabel="123124333@qq.com"/>
            <q-item-side right icon="keyboard arrow right"/>
          </q-item>

          <div style="margin: 1rem 0" class="bg-white">
            <div class="account-detail">
              <div class="detail-item" v-ripple>
                <h5>余额</h5>
                <p class="amount">{{top.balance|currencyFilter}}</p>
              </div>
              <hr/>
              <div class="detail-item" v-ripple>
                <h5>净值</h5>
                <p class="amount">{{top.equity|currencyFilter}}</p>
              </div>
            </div>
            <div class="account-detail">
              <div class="detail-item" v-ripple>
                <h5>余额</h5>
                <p class="amount">{{top.balance|currencyFilter}}</p>
              </div>
              <hr/>
              <div class="detail-item" v-ripple>
                <h5>净值</h5>
                <p class="amount">{{top.equity|currencyFilter}}</p>
              </div>
            </div>
            <div class="account-detail">
              <div class="detail-item" v-ripple>
                <h5>余额</h5>
                <p class="amount">{{top.balance|currencyFilter}}</p>
              </div>
              <hr/>
              <div class="detail-item" v-ripple>
                <h5>净值</h5>
                <p class="amount">{{top.equity|currencyFilter}}</p>
              </div>
            </div>
          </div>

          <q-item v-ripple class="settings-item">
            <q-item-side icon="people" color="orange-5">
            </q-item-side>
            <q-item-main>
              <q-item-tile label>我的客户</q-item-tile>
              <q-item-tile sublabel>2个</q-item-tile>
            </q-item-main>
            <q-item-side right icon="keyboard arrow right"/>
          </q-item>


          <q-item v-ripple class="settings-item" to="/maxpro/member/bankList" exact>
            <q-item-side icon="credit card" color="teal-5">
            </q-item-side>
            <q-item-main>
              <q-item-tile label>银行卡</q-item-tile>
              <q-item-tile sublabel>{{myAllCard.length}}张</q-item-tile>
            </q-item-main>
            <q-item-side right icon="keyboard arrow right"/>
          </q-item>


          <q-item v-ripple class="settings-item" to="/maxpro/member/promoCode">
            <q-item-side icon="layers" color="primary"/>
            <q-item-main>
              <q-item-tile label>推广</q-item-tile>
              <q-item-tile sublabel></q-item-tile>
            </q-item-main>
            <q-item-side right icon="keyboard arrow right"/>
          </q-item>


          <q-item v-ripple class="settings-item" to="/maxpro/member/settings">
            <q-item-side icon="settings" color="blue"/>

            <q-item-main label="设置">
              <!--<q-item-tile label>设置</q-item-tile>-->
              <!--<q-item-tile sublabel>&nbsp;</q-item-tile>-->
            </q-item-main>
            <q-item-side right icon="keyboard arrow right">

            </q-item-side>
          </q-item>


        </q-list>
      </div>
    </div>

  </pull-to>
</template>
<script>
  import PullTo from 'vue-pull-to'
  import {currencys} from '../js/filter'
  import {
    QList,
    QListHeader,
    QItem,
    QItemSeparator,
    QItemSide,
    QItemMain,
    QItemTile,
    QChip,
    QPopover,
    Ripple,
    Toast,
    QRadio
  } from 'quasar'

  export default {
    data() {
      return {
        currentServer:{},
        top: {},
        serverList:[],
        MtList:[],
        myAllCard:[],
        loginid:''
      }
    },
    directives: {
      Ripple
    },
    components: {
      PullTo, QList,
      QListHeader,
      QItem,
      QItemSeparator,
      QItemSide,
      QItemMain,
      QItemTile,
      QChip,
      QPopover,
      Toast,
      QRadio
    },
    methods: {

      getServerList:function () {
       return this.$http.post(this.$api.url.getServerId,{});// 服务器列表
      },
      getMtList:function () {
       return this.$http.post(this.$api.url.getMtList,{type:''});//	如果获取的是个人的MT账号则需要传此参数为1，该参数为空时获取为本人+下级的全部MT账号
      },
      getMyAllCard:function(){
       return this.$http.post(this.$api.url.myAllCard,{});        //获取用户所有银行卡
      },
      getMtProfit:function () {
       return  this.$http.post(this.$api.url.mtProfit,{})         //获取用户推广码
      },
      positive:function(message){
        Toast.create.positive({
          html:message
        });
      },
      negative:function (message) {
        Toast.create.negative({
          html:message
        });
      },


      changeServer:function () {
         console.log(this.currentServer);
         this.$refs.popover.close();
      },



      refresh: function (done) {
        this.$showloading();
        let self=this;
        setTimeout(()=>{


          self.$http.all([self.getServerList(), self.getMtList(),self.getMtProfit(),self.getMyAllCard()])
            .then(self.$http.spread(function (ServerList, MtList,MtProfit,MyAllCard) {

              if(ServerList&&ServerList.data.code==1){
                self.serverList=ServerList.data.data;
              }else{
                self.negative(ServerList.data.message);
              }

              if(MtList&&MtList.data.code==1){
                self.mtlist=MtList.data.data;
              }else{
                self.negative(MtList.data.message);
              }

              if(MtProfit&&MtProfit.data.code==1){
                self.mtProfit=MtProfit.data.data;
              }else{
                self.negative(MtProfit.data.message);
              }
              if(MyAllCard&&MyAllCard.data.code==1){
                self.myAllCard=MyAllCard.data.data;
              }else{
                self.negative(MyAllCard.data.message);
              }

              self.$hideloading();

            })).catch(err=>{
            self.$hideloading();
              self.negative(err.message);
          });
          if (done) {
            done();
          }
        },1000)

      }
    },
    created: function () {
      this.refresh();

    },
    filters: {
      currencyFilter: function (value) {
        return currencys(value);
      }
    }
  }
</script>
<style scoped>
 .settings{
   padding: .5rem 1.2rem;
 }
  .settings-item{
    font-size: 1.4rem !important;
    background: white;
  }
</style>
