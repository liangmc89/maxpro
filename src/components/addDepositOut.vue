<template>
  <div id="doDepositOut">

  <pull-to :top-load-method="refresh" >
    <div class="h-bg my-bg">
      <h5 class="page-title">出金账号</h5>
    </div>
    <div class="mtItem bg-white relative-position" v-ripple v-for="(item,index) in list" :key="index">
      <div class="row no-wrap">
        <div class="col-4 order-num">MT账号：</div>
        <div class="col-4 order-content">{{item.loginid}}</div>
        <div class="col-4 mt-action">
          <q-btn class="my-button mt-action-btn " small @click="$router.push({ name:'doDepositOut',params:{mtItem:item}})">出金</q-btn>
        </div>
      </div>
      <div class="row no-wrap">
        <div class="col-4 order-num">余额：</div>
        <div class="col-4 order-content text-primary">{{item.amount|currencys}}</div>
        <div class="col-4"></div>
      </div>
      <div class="row no-wrap">
        <div class="col-4 order-num">净值：</div>
        <div class="col-4 order-content text-primary">{{item.EQUITY|currencys}}</div>
        <div class="col-4"></div>
      </div>
    </div>
  </pull-to>
  </div>
</template>

<script>
  import {Toast, QBtn,Ripple} from 'quasar'
  import PullTo from 'vue-pull-to'
  import {currencys} from '../js/filter'

  export default {
    data() {
      return {
        list: []
      }
    },
    directives: {
      Ripple
    },
    filters: {
      currencys: function (value) {
        return currencys(value);
      }
    },
    methods: {
      refresh: function (done) {
        this.$http.post(this.$api.url.depositOut, {}).then(response => {
          if (response.data.code == 1) {
            this.list = response.data.data.list;
          } else {
            Toast.create.negative({
              html: response.data.message
            });
          }
        }).catch(err => {
          Toast.create.negative({
            html: err.message
          });
        });
        if (done) {
          done();
        }
      }
    },
    components: {
      PullTo, Toast, QBtn
    },
    created: function () {
      this.refresh();
    }
  }
</script>

<style>
  .mtItem{
    font-size:1.4rem;
    margin: 1.2rem;
    padding: 1rem .5rem;
    line-height: 2rem;
  }
  .mt-action{ position: relative}
  .mt-action-btn{ position: absolute;top:1rem ;right:.5rem}
</style>
