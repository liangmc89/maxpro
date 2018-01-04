<template>
  <div class="content-wrapper">
    <div class="content-title">
      <q-toolbar class="text-center" style="background: transparent;height: 4.8rem">
        <q-btn flat icon="keyboard_arrow_left" @click="$router.back()" >
        </q-btn>
        <q-toolbar-title>
          添加银行卡
        </q-toolbar-title>
        <div style="width: 4rem"></div>
      </q-toolbar>
    </div>
    <div class="content-flex">
      <pull-to>
        <div class="bank-info ">
          <div class="info-legend">银行信息</div>
          <div class="info-field">
            <q-field :error="validation.hasError('bankName')" :error-label="validation.firstError('bankName')">
              <q-input v-model.trim="bankName" clearable type="text" float-label="开户行"/>
            </q-field>

            <q-field :error="validation.hasError('bankBranch')" :error-label="validation.firstError('bankBranch')">
              <q-input v-model.trim="bankBranch" clearable type="text" float-label="支行"/>
            </q-field>

            <q-field :error="validation.hasError('accountName')" :error-label="validation.firstError('accountName')">
              <q-input v-model.trim="accountName" clearable type="text" float-label="姓名"/>
            </q-field>

            <q-field :error="validation.hasError('accountNum')" :error-label="validation.firstError('accountNum')">
              <q-input v-model.trim="accountNum" clearable type="text" float-label="账号"/>
            </q-field>
          </div>
        </div>
        <div class="bank-avatar">
          <div class="info-legend">附件资料</div>
          <div class="add-avatar" v-ripple>
            <q-field :error="validation.hasError('bankCard')" :error-label="validation.firstError('bankCard')">
            <q-uploader  extensions=".gif,.jpg,.jpeg,.png" @add="getUploloadUrl"  @uploaded="uploaded" :url="uploadUrl" />
            </q-field>
          </div>
        </div>
        <div class="bank-btn">
          <q-btn big class="my-button full-width" @click="addBankCard">保存</q-btn>
        </div>
      </pull-to>
    </div>
  </div>





</template>

<script>
  import Vue from 'vue'
  import PullTo from 'vue-pull-to'
  import {Toast, QField, QInput, QBtn,QUploader,Dialog,Ripple,QToolbar,QToolbarTitle} from 'quasar'
  import {required} from 'vuelidate/lib/validators'
  import {getCookie} from '../js/cookie.js'

  var SimpleVueValidation = require('simple-vue-validator');
  var Validator = SimpleVueValidation.Validator;

  Vue.use(SimpleVueValidation);


  export default {
    name: "add-bank-card",
    data() {
      return {
        bankCard: '',
        bankName: '',
        bankBranch: '',
        accountName: '',
        accountNum: '',
        uploadUrl:''
      }
    },
    validators: {
      bankCard: function (value) {
         return Validator.custom(function () {
           if(Validator.isEmpty(value)){
             return '请上传银行卡照片！'
           }
         });
       },
      bankName: function (value) {
        return Validator.custom(function () {
          if(Validator.isEmpty(value)){
            return '开户行不能为空！'
          }
        });

      },
      bankBranch:function (value) {
        return Validator.custom(function () {
          if(Validator.isEmpty(value)){
            return '支行名称不能为空！'
          }
        });
      },
      accountName:function (value) {
        return Validator.custom(function () {
          if(Validator.isEmpty(value)){
            return '姓名不能为空！'
          }
        });
      },
      accountNum:function (value) {
        return Validator.custom(function () {
          if(Validator.isEmpty(value)){
            return '账号不能为空！'
          }
        });
      }

    },
    directives:{
      Ripple
    },
    components: {
      QField, QInput, QBtn,QUploader,Dialog,PullTo,QToolbar,QToolbarTitle
    },
    methods: {
      getUploloadUrl:function () {
        let self=this;
         let token=getCookie('token');
         if(token==null||token==''){
           Toast.create.negative({
             html:'登录已失效，请重新登录后再试！',
             timeout:4000,
             onDismiss:function () {
               self.$router.push({name:'login'});
             }
           })
         }else {
           this.uploadUrl= this.$api.url.baseURI+this.$api.url.upload+'?token='+token;
         }

      },
      uploaded:function(file, xhr){

         let data=JSON.parse(xhr.response);
        if(data.status==1){
           Toast.create.positive({html:data.info,timeout:3000})
          this.bankCard=data.data[0]['id'];

        }else{
          Toast.create.negative({html:data.message})
          this.bankCard='';
        }

      },

      saveBankCard:function () {
        let self = this;

        self.$showloading({message:'正在保存…'});
        setTimeout(() => {
          self.$http.post(self.$api.url.addBankCard, {
            bankCard: self.bankCard,
            bankName: self.bankName,
            bankBranch: self.bankBranch,
            accountName: self.accountName,
            accountNum: self.accountNum
          }).then(response => {
            if (response && response.data.code == 1) {
              self.$hideloading();
              Toast.create.positive({
                html:response.data.message,
                timeout:4000,
                onDismiss:()=>{
                  self.$router.push({name:'bankList'});
                }
              });

            } else {
              self.$hideloading();
               Toast.create.negative({
                 html: response.data.message
               })
            }
          }).catch(err => {
            self.$hideloading();
             Toast.create.negative({
               html: err.message
             })
          })

        }, 3000);
      },
      addBankCard: function () {

        this.$validate()
          .then((success)=> {
            if(success) {
              this.display=this.initdiplay;
              this.dialogMessage=` 开户行：${this.bankName}</br>
                    支&nbsp;&nbsp;&nbsp;&nbsp;行：${this.bankBranch}</br>
                    姓&nbsp;&nbsp;&nbsp;&nbsp;名：${this.accountName}</br>
                    账&nbsp;&nbsp;&nbsp;&nbsp;户：${this.accountNum}
                    `;

              Dialog.create({
                title: '请确认您的银行信息',
                message: this.dialogMessage,
                buttons: [
                  {
                    label: ' 返回修改',
                    color:'grey'
                  },
                  {
                    label: '确认保存',
                    outline:true,
                    handler:()=> {
                      this.saveBankCard();

                    }
                  }
                ]
              })

            }});
      }
    }
  }
</script>

<style>



  .bank-info {
    background: white;
    padding: 1rem 2rem;

  }
  .bank-btn{
    padding: 0 2rem 3rem 2rem;
  }
  .info-field{
    padding-left: 1rem;
  }
  .info-legend{
    padding-left: 1rem;
    border-left:.3rem solid orangered;
    font-size: 1.6rem;
  }
  .bank-avatar{
    margin: 1rem 0;
    background: white;
    padding: 1rem 2rem;
  }
  .add-avatar{
    margin: 2rem auto;
    padding-bottom: .5rem;
    position: relative;
    text-align: left;
    background: rgba(227,227,233,.6);

  }


</style>
