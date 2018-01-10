<template>
  <div class="content-wrapper">
    <div class="content-title">
      <q-toolbar class="text-center" style="background: transparent;height: 4.8rem">
        <q-btn flat icon="keyboard_arrow_left" @click="$router.back()" >
        </q-btn>
        <q-toolbar-title>
          出金账号
        </q-toolbar-title>
        <div style="width: 4rem"></div>
      </q-toolbar>
    </div>
    <div class="content-flex">
      <pull-to :top-load-method="refresh" >
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
</div>
</template>

<script>
  import {Toast, QBtn,Ripple,QToolbar,QToolbarTitle} from 'quasar'
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
      PullTo, Toast, QBtn,QToolbar,QToolbarTitle
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
