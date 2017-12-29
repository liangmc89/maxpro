<template>
  <div id="deposiInList">
    <div class="h-bg my-bg">
      <h5 class="page-title">我的客户</h5>
    </div>
    <div class="section total-info">
      <div class="account-detail">
        <q-input v-model="ticket" placeholder='搜索' clearable :before="[{icon: 'fa-search text-primary', handler () {refresh()}}]" :after="[{icon: 'fa-filter text-primary', handler () {}}]" />
        <div class="detail-item" v-ripple>
          <h5>直接客户</h5>
          <p class="amount">{{vtotal.TNUM}}</p>
        </div>
        <hr />
        <div class="detail-item" v-ripple>
          <h5>间接客户</h5>
          <p class="amount">{{vtotal.TDOLLOR}}</p>
        </div>
      </div>
    </div>
    <pull-to :top-load-method="refresh" :bottom-load-method='loadmore'>
      <div class="no-data" v-show="listIn.length==0"></div>
      <ul id='in-List'>
        <li v-for="(item,index) in listIn" :key="index" v-ripple>
          <div class="row no-wrap">
            <div class="col-3 order-num list-style">订单号:</div>
            <div class="col-5 order-content">{{item.id}}</div>
            <div class="col-4 order-status text-primary">{{item.status|statusFormat}}</div>
          </div>
          <div class="row no-wrap">
            <div class="col-3 order-num">账户:</div>
            <div class="col-2 order-content">{{item.mtid}}</div>
            <div class="col-2 order-content">{{item.nickname}}</div>
            <div class="col-5 order-status text-primary usd">{{item.number|currencys}}</div>
          </div>
          <div class="row no-wrap">
            <div class="col-3 order-num">支付方式:</div>
            <div class="col-4 order-content">{{item.type}}</div>
            <div class="col-5 order-status rmb">{{item.price|currencys('￥')}}</div>
          </div>
          <div class="row no-wrap">
            <div class="col-3 order-num">订单时间:</div>
            <div class="col-5 order-content">{{item.create_time|dateFormat}}</div>
            <div class="col-4 order-status text-primary"></div>
          </div>

        </li>
      </ul>
    </pull-to>

  </div>
</template>

<script>
  import {
    QTab,
    QTabs,
    QTabPane,
    QField,
    QInput,
    QCheckbox,
    QSelect,
    QSlider,
    QBtn,
    QIcon,
    QTooltip,
    QCollapsible,
    clone,
    Toast,
    Ripple,
    date
  } from 'quasar'

  import { currencys } from '../js/filter'
  import PullTo from 'vue-pull-to'
  export default {
    directives: {
      Ripple
    },
    components: {

      QTab,
      QTabs,
      QTabPane,
      QField,
      QInput,
      QCheckbox,
      QSelect,
      QSlider,
      QBtn,
      QIcon,
      QTooltip,
      QCollapsible,
      Toast,
      PullTo,
      date
    },
    filters: {
      currencys: function(value, c) {
        return currencys(value, c);
      },
      dateFormat: function(data_str) {
        return date.formatDate(new Date(parseInt(data_str) * 1000), 'YYYY/MM/DD HH:mm:ss')
      },
      statusFormat: function(value) {
        let status;
        switch(value) {
          case '0':
            status = '初始'
            break;
          case '1':
            status = '驳回'
            break;
          case '9':
            status = '审核通过'
            break;
        }
        return status;
      }

    },
    methods: {
      refresh(done) {
        let self = this;
        self.$showloading();
        this.timeout = setTimeout(() => {
          self.$http.post(self.$api.url.getMtList, {

          }).then(response => {
            if(response.data.code == 1) {
               self.customer=response.data.data;
            } else if(response.data.code != 40007) {
              Toast.create.info({
                html: response.data.message
              });
            }
          }).catch(err => {
            Toast.create.negative({
              html: err.message
            });
          });
          if(done) {
            done();
          }
          self.$hideloading();
        }, 1000)
      }

    },
    data() {
      return {
        ticket: '',
        vtotal: {
          TNUM:0,
          TDOLLOR:0
        },
        listIn: [],
        page: 1,
        search: '',

        customer:[],

      }
    },
    created: function() {
      this.refresh();
    }
  }
</script>

<style>

</style>
