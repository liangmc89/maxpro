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
                <q-list link>
                  <q-item @click="$refs.popover.close()">
                    <q-item-main label="Reply"/>
                  </q-item>
                  <q-item @click="$refs.popover.close()">
                    <q-item-main label="Forward"/>
                  </q-item>
                  <q-item @click="$refs.popover.close()">
                    <q-item-main label="Delete"/>
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


          <q-item v-ripple class="settings-item">
            <q-item-side icon="credit card" color="teal-5">
            </q-item-side>
            <q-item-main>
              <q-item-tile label>银行卡</q-item-tile>
              <q-item-tile sublabel>3张</q-item-tile>
            </q-item-main>
            <q-item-side right icon="keyboard arrow right"/>
          </q-item>


          <q-item v-ripple class="settings-item">
            <q-item-side icon="layers" color="primary"/>

            <q-item-main>
              <q-item-tile label>推广</q-item-tile>
              <q-item-tile sublabel></q-item-tile>
            </q-item-main>
            <q-item-side right icon="keyboard arrow right"/>
          </q-item>


          <q-item v-ripple class="settings-item">
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
    Ripple
  } from 'quasar'

  export default {
    data() {
      return {
        top: {}
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
      QPopover
    },
    methods: {
      refresh: function (done) {
        if (done) {
          done();
        }
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
<style>
 .settings{
   padding: .5rem 1.2rem;
 }
  .settings-item{
    font-size: 1.4rem !important;
    background: white;
  }
</style>
