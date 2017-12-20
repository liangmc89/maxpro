<template>
  <pull-to  class="bg-white">
    <div id="addDeposit">
      <div class="h-bg">
        <h5 class="page-title">出金申请</h5>
      </div>
      <div class="padding-content">
        <div class="row no-wrap">
          <div class="col-5 f-label"><span class="lb">出金金额（美元）：</span></div>
          <div class="col-7">
            <q-field :error="validation.hasError('number')" :error-label="validation.firstError('number')">
              <q-input v-model.lazy.trim="number" clearable type="number" prefix="$" @change='changenumber' />
            </q-field>
          </div>
        </div>
        <div class="row no-wrap">
          <div class="col-5 f-label"><span class="lb">手续费（$）：</span></div>
          <div class="col-7">
            <q-input v-model="outfee" prefix="$" type="number" disable readonly />
          </div>
        </div>
        <div class="row no-wrap">
          <div class="col-5 f-label"><span class="lb">出金方式：</span></div>
          <div class="col-7">
            <q-field :error="validation.hasError('radioInline')" :error-label="validation.firstError('radioInline')">
              <q-radio v-model="radioInline" v-for='(item,index) in radioInlineList' :key="index"  :val="item.value" :label="item.label" />
            </q-field>
          </div>
        </div>
         <div v-show="radioInline==1">
        <div class="row no-wrap">
          <div class="col-5 f-label"><span class="lb">开户行：</span></div>
          <div class="col-7">
            <q-field >
              <q-input v-model="bankname1"  type="text"  disable readonly/>
            </q-field>
          </div>
        </div>
        <div class="row no-wrap">
          <div class="col-5 f-label"><span class="lb">收款人姓名：</span></div>
          <div class="col-7">
            <q-field >
              <q-input v-model="forwordname1"  type="text"  disable readonly />
            </q-field>
          </div>
        </div>
        <div class="row no-wrap">
          <div class="col-5 f-label"><span class="lb">银行账号：</span></div>
          <div class="col-7">
            <q-field :error="validation.hasError('bankaccount1')" :error-label="validation.firstError('bankaccount1')">
              <q-input v-model="bankaccount1"  type="number"  disable readonly/>
            </q-field>
          </div>
        </div>
         </div>
        <div v-show="radioInline==2">
          <div class="row no-wrap">
            <div class="col-5 f-label"><span class="lb">开户行：</span></div>
            <div class="col-7">
              <q-field >
                <q-input v-model="bankname2"  type="text"  disable readonly/>
              </q-field>
            </div>
          </div>
          <div class="row no-wrap">
            <div class="col-5 f-label"><span class="lb">收款人姓名：</span></div>
            <div class="col-7">
              <q-field >
                <q-input v-model="forwordname2"  type="text"  disable readonly />
              </q-field>
            </div>
          </div>
          <div class="row no-wrap">
            <div class="col-5 f-label"><span class="lb">银行账号：</span></div>
            <div class="col-7">
              <q-field >
                <q-input v-model="bankaccount2"  type="number"  disable readonly/>
              </q-field>
            </div>
          </div>
        </div>
        <div v-show="radioInline==3">
          <div class="row no-wrap">
            <div class="col-5 f-label"><span class="lb">转入MT账户：</span></div>
            <div class="col-7">
              <q-field >
                <q-input v-model="mtlogin"  type="text"  disable readonly/>
              </q-field>
            </div>
          </div>
          <div class="row no-wrap">
            <div class="col-5 f-label"><span class="lb">确认转入MT账户	：</span></div>
            <div class="col-7">
              <q-field >
                <q-input v-model="mtlogin2"  type="text"  disable readonly />
              </q-field>
            </div>
          </div>
        </div>
        <div class="row no-warp" style="padding: 2rem 0;">
          <q-btn rounded :big="true" class="full-width my-button" @click='doAddDepositOut'>申 请</q-btn>
        </div>
      </div>
    </div>
  </pull-to>
</template>

<script>
  import Vue from 'vue'
  var SimpleVueValidation = require('simple-vue-validator');
  var Validator = SimpleVueValidation.Validator.create({
    templates: {
      required: '字段不能为空！',
      greaterThan: '必须大于{0}!'

    }
  });
  Vue.use(SimpleVueValidation);

  import { required, email } from 'vuelidate/lib/validators'
  import {

    QField,
    QInput,
    QSelect,
    QBtn,
    QIcon,
    Toast,
    Ripple,
    QRadio

  } from 'quasar'

  import { currencys } from '../js/filter'
  import PullTo from 'vue-pull-to'
  export default {
    directives: {
      Ripple
    },
    components: {

      QField,
      QInput,
      QSelect,
      QBtn,
      QIcon,
      Toast,
      PullTo,
      QRadio

    },
    filters: {
      currencys: function(value) {
        return currencys(value);
      }
    },
    validators: {
      number:function (value) {
        return Validator.value(value).required().greaterThan(0);
      }


      // pay: function(value) {
      //   return Validator.custom(function() {
      //     if(value.inmoneytype == null || value.inmoneytype == 'undefined' || Validator.isEmpty(value.inmoneytype)) {
      //       return '未选择支付方式！'
      //     }
      //   });
      // }

    },
    computed: {
      inmoneyrmb: function() {
        return parseFloat(this.inmoney * this.exchangerate * 1000 / 1000).toFixed(2);
      } //人民币金额，
    },
    methods: {
      changenumber(newVal) {

        let self = this;
        console.log(newVal)
        self.$http.post(self.$api.url.getoutfee, {
          number: newVal
        }).then(response => {
          if(response && response.data.code == 1) {
            self.Outfee = response.data.data;
          } else {
            Toast.create({
              html: response.data.message
            });
          }

        }).catch(err => {
          Toast.create.negative({
            html: err.message
          });
        });
      },
      doAddDepositOut() {
        let self = this;
        this.$validate()
          .then(function(success) {
            if(success) {

              self.$http.post(self.$api.url.depositDoout, {
                number:self.number,
                bankname1:self.bankname1,
                forwordname1:self.forwordname1,
                bankaccount1:self.bankaccount1,
                bankname2:self.bankname2,
                forwordname2:self.forwordname2,
                bankaccount2:self.bankaccount2,
                mtlogin:self.mtlogin,
                mtlogin2:self.mtlogin2,
                outlogin:self.outlogin,
                radioInline:self.radioInline
              }).then(response => {

                if(response.data.code == 1) {
                   Toast.create.positive({
                     html:response.data.message
                   });

                } else {
                  Toast.create({
                    html: response.data.message,

                  });
                }
              }).catch(err => {
                Toast.create.negative({
                  html: err.message
                });
              });
            }
          });
      }


    },

    data() {
      return {
        mtAccount:this.$route.params.mtItem,
        radioInlineList:[{label:'银联',value:1},{label:'电汇',value:2},{label:'MT转账',value:3}],
        radioInline:1,
        accountList:[],
        outfee:0,
        number:0,
        bankname1:'',
        forwordname1:'',
        bankaccount1:'',
        bankname2:'',
        forwordname2:'',
        bankaccount2:'',
        mtlogin:'',
        mtlogin2:'',
        outlogin:''


      }
    },
    created: function() {
      this.bankname1=this.mtAccount.bankName;
        this.forwordname1=this.mtAccount.accountName;
        this.bankaccount1=this.mtAccount.accountNum;
      this.bankname2=this.mtAccount.bankName;
      this.forwordname2=this.mtAccount.accountName;
      this.bankaccount2=this.mtAccount.accountNum;
        // this.mtlogin=this.mtAccount.loginid;
        // this.mtlogin2=this.mtAccount.loginid;
      this.outlogin=this.mtAccount.loginid;
    }
  }
</script>

<style>
  .f-label {
    text-align: right;
    position: relative;
  }

  .lb {
    margin: auto;
    position: absolute;
    top: 18%;
    left: 0;
    right: 0;
    bottom: 0;
    height: 50%;
    font-size: 1.4rem;
  }

  .radio {
    padding: .4rem;
  }

  .modal-content {
    display: flex;
    flex-direction: column;
  }
</style>
