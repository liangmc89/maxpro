<template>
  <pull-to  class="bg-white">
    <div id="addDeposit">
      <div class="h-bg">
        <h5 class="page-title">出金申请</h5>
      </div>
      <div  style="padding: 1.5rem">

            <q-field :error="validation.hasError('number')" :error-label="validation.firstError('number')">
              <q-input float-label="出金金额（美元）" v-model.lazy.trim="number" clearable type="number" prefix="$" @change='changenumber' />
            </q-field>

            <q-input float-label="手续费（$）" v-model="outfee" prefix="$" type="number" disable readonly />

            <q-field label="出金方式" :error="validation.hasError('radioInline')" :error-label="validation.firstError('radioInline')">
              <q-radio  v-model="radioInline" v-for='(item,index) in radioInlineList' :key="index"  :val="item.value" :label="item.label" />
            </q-field>

         <div v-show="radioInline==1">
            <q-field >
              <q-input float-label="开户行" v-model="bankname1"  type="text"  disable readonly/>
            </q-field>
            <q-field >
              <q-input float-label="收款人姓名" v-model="forwordname1"  type="text"  disable readonly />
            </q-field>
            <q-field :error="validation.hasError('bankaccount1')" :error-label="validation.firstError('bankaccount1')">
              <q-input float-label="银行账号" v-model="bankaccount1"  type="number"  disable readonly/>
            </q-field>
         </div>
        <div v-show="radioInline==2">
              <q-field >
                <q-input float-label="开户行" v-model="bankname2"  type="text"  disable readonly/>
              </q-field>
              <q-field >
                <q-input float-label="收款人姓名" v-model="forwordname2"  type="text"  disable readonly />
              </q-field>
              <q-field >
                <q-input float-label="银行账号" v-model="bankaccount2"  type="number"  disable readonly/>
              </q-field>
        </div>
        <div v-show="radioInline==3">
              <q-field >
                <q-input float-label="转入MT账户" v-model="mtlogin"  type="text"  disable readonly/>
              </q-field>
              <q-field >
                <q-input float-label="确认转入MT账户" v-model="mtlogin2"  type="text"  disable readonly />
              </q-field>
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

  .radio {
    padding: .4rem;
  }

  .modal-content {
    display: flex;
    flex-direction: column;
  }
</style>
