<template>
  <div class="content-wrapper">
    <div class="content-title">
      <q-toolbar class="text-center" style="background: transparent;height: 4.8rem">
        <q-btn flat icon="keyboard_arrow_left" @click="$router.back()" >
        </q-btn>
        <q-toolbar-title>
          财务-出金申请
        </q-toolbar-title>
        <div style="width: 4rem"></div>
      </q-toolbar>
    </div>
    <div class="content-flex">
      <pull-to  class="bg-white">
        <div id="addDeposit">
          <div  style="padding: 1.5rem">

            <q-field :error="validation.hasError('number')" :error-label="validation.firstError('number')">
              <q-input float-label="出金金额（美元）" v-model.lazy.trim="number" clearable type="number" prefix="$" @change='changenumber' />
            </q-field>
            <q-field :error="validation.hasError('isOutfee')" :error-label="validation.firstError('isOutfee')">
            <q-input float-label="手续费（$）" v-model="outfee" prefix="$" type="number" disable readonly />
            </q-field>
            <!--:error="validation.hasError('radioInline')" :error-label="validation.firstError('radioInline')"-->
            <q-field label="出金方式" >
              <q-radio  v-model="radioInline" v-for='(item,index) in radioInlineList' :key="index"  :val="item.value" :label="item.label"  />
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
              <q-field :error="validation.hasError('mtlogin')" :error-label="validation.firstError('mtlogin')">
                <q-input float-label="转入MT账户" v-model="mtlogin" clearable  type="text"   />
              </q-field>
              <q-field :error="validation.hasError('mtlogin2')" :error-label="validation.firstError('mtlogin2')">
                <q-input float-label="确认转入MT账户" v-model="mtlogin2" clearable type="text"    />
              </q-field>
            </div>
            <div class="row no-warp" style="padding: 2rem 0;">
              <q-btn rounded :big="true" class="full-width my-button" @click='doAddDepositOut'>申 请</q-btn>
            </div>
          </div>
        </div>
      </pull-to>
    </div>
  </div>




</template>

<script>
  import Vue from 'vue'
  var SimpleVueValidation = require('simple-vue-validator');
  var Validator = SimpleVueValidation.Validator;
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
    QRadio,QToolbar,QToolbarTitle

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
      QRadio,QToolbar,QToolbarTitle

    },
    filters: {
      currencys: function(value) {
        return currencys(value);
      }
    },
    validators: {
      'number':function (value) {
        let self=this;
        return Validator.custom(function () {
          if(Validator.isEmpty(value)) {
            return '请输入出金金额！'
          }
          if(value<=0){
            return '出金金额必须大于0 ！'
          }
          if(value<=self.outfee){
            return '出金金额必须大于出金的手续费 ！'
          }
        });
      },
      isOutfee:function (value) {
        return Validator.custom(function () {
          if(!value){
            return '未能刷新出金手续费，请重新输入出金金额后重试！'
          }
        })
      },
      mtlogin:function (value) {
        return Validator.custom(function () {
          if(Validator.isEmpty(value)){
            return '请输入要转入的MT账户！'
          }
        })
      },
      'mtlogin2,mtlogin': function(mtlogin2,mtlogin) {
        let self=this;
        return Validator.custom(function () {
        if(mtlogin2==''){
          return '请输入确认MT账户！'
        }
        if(self.validation.isTouched('mtlogin2')&&mtlogin2!=mtlogin) {
          return 'MT账户不一致！';
        }})
      },

    },
    computed: {
      inmoneyrmb: function() {
        return parseFloat(this.inmoney * this.exchangerate * 1000 / 1000).toFixed(2);
      } //人民币金额，
    },
    methods: {

      changenumber(newVal) {

        let self = this;
        if(newVal==null||newVal==''||newVal==0){
          self.isOutfee=false;
          return false;
        }
        self.$http.post(self.$api.url.getoutfee, {
          number: newVal
        }).then(response => {

          if(response && response.data.code == 1) {
            self.outfee = response.data.data;
            self.isOutfee=true;
          } else {
            self.isOutfee=false;
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
        if(this.radioInline==3){
          this.valArray=['number','isOutfee','mtlogin','mtlogin2']
        }else {
          this.valArray=['number','isOutfee']
        }
        self.$validate(self.valArray)
          .then(function(success) {
            if(success) {
              setTimeout(()=>{
                self.$showloading({message:'正在提交…'});
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
                  self.$hideloading();
                  if(response&&response.data.code == 1) {
                    self.$router.push({name:'actionResult',params:{ActionResult:{
                          message:response.data.message,
                          types:'success',
                          buttons:[{
                            label:'完成',
                            handle:function () {
                              self.$router.back();
                            }
                          }]
                        }}})
                    // Toast.create.positive({html:response.data.message})
                  } else {

                    self.$router.push({name:'actionResult',params:{ActionResult:{
                          message:response.data.message,
                          types:'fail',
                          buttons:[{
                            label:'返回',
                            handle:function () {
                              self.$router.back();
                            }
                          }]
                        }}})
                  }
                }).catch(err => {
                  self.$hideloading();
                  Toast.create.negative({
                    html: err.message
                  });
                });

              },1000);

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
        outlogin:'',
        isOutfee:false,
        valArray:['number','isOutfee']



      }
    },
    watch:{
      '$route':function (from,to) {
        this.mtAccount=this.$route.params.mtItem;
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
