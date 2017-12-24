<template>
  <div class="add-bank-card">
    <div class="h-bg my-bg">
      <h5 class="page-title">银行卡</h5>
    </div>
    <div class="bank">
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
        <q-input v-model.trim="accountNum" clearable type="number" float-label="账户"/>
      </q-field>
      </div>
    </div>
    <div class="bank-avatar">
      <div class="info-legend">附件资料</div>
      <div class="add-avatar" v-ripple>
            <div class="avatar-wrapper">
              <img v-if="bankCardUrl!=''" :src="bankCardUrl"/>
            </div>
      </div>
      <input hidden class="file" name="file" type="file" accept="image/png,image/gif,image/jpeg" @change="update"/>

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
  import {Toast, QField, QInput, QBtn,QUploader,Dialog,Ripple} from 'quasar'
  import {required} from 'vuelidate/lib/validators'

  var SimpleVueValidation = require('simple-vue-validator');
  var Validator = SimpleVueValidation.Validator.create({
    templates: {
      required: '字段不能为空！'
    }
  });
  Vue.use(SimpleVueValidation);


  export default {
    name: "add-bank-card",
    data() {
      return {
        bankCard: '123',
        bankName: '',
        bankBranch: '',
        accountName: '',
        accountNum: '',
        bankCardUrl:''


      }
    },
    validators: {
      // bankCard: function (value) {
      //   return Validator.value(value).required();
      // },
      bankName: function (value) {
        return Validator.value(value).required();
      },
      bankBranch:function (value) {
        return Validator.value(value).required();
      },
      accountName:function (value) {
        return Validator.value(value).required();
      },
      accountNum:function (value) {
        return Validator.value(value).required();
      }

    },
    directives:{
      Ripple
    },
    components: {
      QField, QInput, QBtn,QUploader,Dialog,PullTo
    },
    methods: {

      update:function (e) {
        let file = e.target.files[0];
        let param = new FormData(); //创建form对象
        param.append('file',file,file.name);//通过append向form对象添加数据
        //param.append('chunk','0');//添加form表单中其他数据
        console.log(param.get('file')); //FormData私有类对象，访问不到，可以通过get判断值是否传进去
        let config = {
          headers:{'Content-Type':'multipart/form-data'}
        };  //添加请求头
        this.$http.post(this.$api.url.upload,param,config)
          .then(response=>{
            console.log(response.data);
          })
      },

      saveBankCard:function () {
        let self = this;

        self.$showloading({message:'正在保存…'});
        setTimeout(() => {
          self.$http.post(self.$api.url.addBankCard, {
            bankCard: '123',
            bankName: self.bankName,
            bankBranch: self.bankBranch,
            accountName: self.accountName,
            accountNum: self.accountNum
          }).then(response => {
            if (response && response.data.code == 1) {
              self.$hideloading();
              Toast.create.positive({
                html:response.data.message
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

  .add-bank-card{
    height: 100%;
    display: flex;
    flex-direction: column;
  }
  .bank{
    flex: 1;
    overflow: hidden;

  }

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
    padding: 1.5rem 3rem;
    position: relative;
    text-align: center;
    background: rgba(227,227,233,.6);

  }
  .avatar-wrapper{
    background: url("../statics/images/add-bank.png") no-repeat center center/40% 60%;
    width: 70%;
    height: 10rem;
    margin: 0 auto;
  }

</style>
