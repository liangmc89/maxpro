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
            <q-item-main label="服务器" :sublabel="memberIndex.server_name">
            </q-item-main>

          </q-item>

          <q-item v-ripple class="settings-item" to="/maxpro/member/mtList">
            <q-item-side>
              <q-item-tile icon="account circle" color="blue">
              </q-item-tile>
            </q-item-side>
            <q-item-main :label="memberIndex.phone" :sublabel="memberIndex.email"/>
            <q-item-side right icon="keyboard arrow right"/>
          </q-item>

          <div style="margin: 1rem 0" class="bg-white">
            <div class="account-detail">
              <div class="detail-item" v-ripple>
                <h5>MT</h5>
                <p class="amount">{{memberIndex.mtcount}}个</p>
              </div>
              <hr/>
              <div class="detail-item" v-ripple>
                <h5>净值</h5>
                <p class="amount">{{myProperty.equity|currencyFilter}}</p>
              </div>
            </div>
            <div class="account-detail">
              <div class="detail-item" v-ripple>
                <h5>余额</h5>
                <p class="amount">{{myProperty.balance|currencyFilter}}</p>
              </div>
              <hr/>
              <div class="detail-item" v-ripple>
                <h5>赠金</h5>
                <p class="amount">{{myProperty.credit|currencyFilter}}</p>
              </div>
            </div>
            <div class="account-detail">
              <div class="detail-item" v-ripple>
                <h5>返佣</h5>
                <p class="amount">{{myProperty.AMOUNT|currencyFilter}}</p>
              </div>
              <hr/>
              <div class="detail-item" v-ripple>
                <h5>跟单</h5>
                <p class="amount">{{myProperty.follow|currencyFilter}}</p>
              </div>
            </div>
          </div>

          <q-item v-ripple class="settings-item" to="/maxpro/member/customer" exact>
            <q-item-side icon="people" color="orange-5">
            </q-item-side>
            <q-item-main>
              <q-item-tile label>我的客户</q-item-tile>
              <q-item-tile sublabel></q-item-tile>
            </q-item-main>
            <q-item-side right icon="keyboard arrow right"/>
          </q-item>


          <q-item v-ripple class="settings-item" to="/maxpro/member/bankList" exact>
            <q-item-side icon="credit card" color="teal-5">
            </q-item-side>
            <q-item-main>
              <q-item-tile label>银行卡</q-item-tile>
              <q-item-tile sublabel>{{memberIndex.cardcount}}张</q-item-tile>
            </q-item-main>
            <q-item-side right icon="keyboard arrow right"/>
          </q-item>


          <q-item v-ripple class="settings-item" to="/maxpro/member/promoCode" exact>
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
        myProperty: {},
        memberIndex:{}
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

      getMemberIndex:function () {
       return this.$http.post(this.$api.url.memberIndex,{});// 用户个人中心
      },
      getMyProperty:function () {
       return this.$http.post(this.$api.url.myProperty,{});//	我的资产
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
      refresh: function (done) {
        this.$showloading();
        let self=this;
        setTimeout(()=>{


          self.$http.all([self.getMemberIndex(), self.getMyProperty()])
            .then(self.$http.spread(function (MemberIndex, MyProperty) {

              if(MemberIndex&&MemberIndex.data.code==1){
                self.memberIndex=MemberIndex.data.data;
              }else{
                self.negative(MemberIndex.data.message);
              }

              if(MyProperty&&MyProperty.data.code==1){
                self.myProperty=MyProperty.data.data;
              }else{
                self.negative(MyProperty.data.message);
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
    mounted: function () {
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
