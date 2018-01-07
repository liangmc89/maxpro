<template>
  <div  class="content-wrapper bg-white">
    <div class="content-title">
      <q-toolbar class="text-center" style="background: transparent;height: 4.8rem">
        <q-btn flat icon="keyboard_arrow_left" @click="$router.push('/login')" >
        </q-btn>
        <q-toolbar-title>
          重置密码
        </q-toolbar-title>
        <div style="width: 4rem"></div>
      </q-toolbar>
    </div>
    <div class="content-flex">
      <div style="padding:  2rem">
      <q-tabs inverted v-model="resetType">
        <q-tab default slot="title"  name="0"  label='短信重置密码'  />
        <q-tab slot="title" name="1"   label='邮箱重置密码'  />
          <q-field  :error-label="validation.firstError('mtserver')" :error="validation.hasError('mtserver')">
            <q-select float-label="平台" v-model="mtserver"  :options="serverList" />
          </q-field>
          <div v-show="resetType=='0'">
          <q-field  :error-label="validation.firstError('phone')" :error="validation.hasError('phone')">
            <q-input type="number" float-label='手机号码' v-model="phone" :clearable="true"  />
          </q-field>
          </div>
         <div v-show="resetType=='1'">
          <q-field :error-label="validation.firstError('email')" :error="validation.hasError('email')">
            <q-input type="text" float-label='Email' v-model="email" :clearable="true"  />
          </q-field>
         </div>
        <q-field class='relative-position ' :error-label="validation.firstError('verify')" :error="validation.hasError('verify')">
          <q-input  type="text" float-label='验证码' v-model="verify" :clearable="true"  />
          <q-btn class='sendHelp' color="primary" :flat='true' :disable="isEnableSend" @click="getValidateNum">{{validateHelpText}}</q-btn>
        </q-field>

          <q-field style="margin-top: 0" :error-label="validation.firstError('password')" :error="validation.hasError('password')">
            <q-input type="password" float-label='新密码' v-model="password" :clearable="true"  />
          </q-field>



      </q-tabs>
      <q-btn rounded big style="margin-top: 1rem" class="full-width my-button"  @click='resetPwd'>重置密码</q-btn>

    </div>
    </div>
  </div>
</template>

<script>
  import Vue from 'vue'
  var SimpleVueValidation = require('simple-vue-validator');
  var Validator = SimpleVueValidation.Validator;
  Vue.use(SimpleVueValidation);

  import { QSelect, QList, QItem, Toast, QBtn, QIcon, QField, QInput, Loading, QSpinnerFacebook, QTabs, QTab, QTabPane, Dialog,QToolbar,QToolbarTitle } from 'quasar'
  import { required, email } from 'vuelidate/lib/validators'
  export default {
    data() {
      return {
        email:'',
        phone:'',
        password:'',
        verify:'',
        mtserver:this.$api.appConfig.mtserver,
        submitted: false,
        isEnableSend: false,
        curSecond: 0,
        serverList:[],
        resetType:'0',
        validateArray:['phone','email']
      }
    },
    validators: {
      password: function(value) {
        return Validator.custom(function () {
          if(!Validator.isEmpty(value)){
            if(!(/^(?=.*[0-9].*)(?=.*[A-Z].*)(?=.*[a-z].*).{6,16}$/.test(value))){
              return '密码必须是6-16位大小写字母和数字组合！'
            }
          }else{
            return '新密码不能为空！'
          }
        })
      },

      email: function(value) {
        return Validator.custom(function () {
          if (!Validator.isEmpty(value)) {
            if (!(/^(\w)+(\.\w+)*@(\w)+((\.\w+)+)$/.test(value))) {
              return '邮箱格式错误！'
            }
          }else{
            return '邮箱不能为空！';
          }
        })
      },
      phone: function(value) {
        return Validator.custom(function() {
          if(!Validator.isEmpty(value)) {
            if(!(/^1[34578]\d{9}$/.test(value))) {
              return '手机号码格式错误！'
            }
          } else {
            return '手机号码不能为空！'
          }
        })
      },
      verify: function(value) {
        return Validator.custom(function() {
          if(Validator.isEmpty(value)) {
            return '验证码不能为空！'
          }
        })
      },
      mtserver: function(value) {
        return Validator.custom(function() {
          if(Validator.isEmpty(value)) {
            return '请选择平台！'
          }
        })
      },

    },

    computed: {
      validateHelpText: function() {
        let text = '';
        if(this.curSecond > 0) {
          text =this.curSecond.toString()+'秒后可重新发送';
        } else {
          text = '发送验证码';
        }
        return text;

      }
    },
    components: {
      QBtn,
      QIcon,
      QField,
      QInput,
      Toast,
      QTabs,
      QTab,
      QTabPane,
      QSelect,
      QList,
      QItem,
      QToolbar,QToolbarTitle

    },

    methods: {
      getMtServer:function () {
        let self=this;
        self.serverList=[];
        self.$http.post(self.$api.url.getServerId,{}).then(response=>{
          if(response&&response.data.code==1){
            response.data.data.forEach((item)=>{
              let obj={label:item.mt4_name,value:item.id}
              self.serverList.push(obj);
            });
          }else{
            Toast.create.info({html:response.data.message})
          }
        }).catch(err=>{
          Toast.create.negative({html:err.message})
        });
      },
      getValidateNum: function() {
        let self = this;
        self.isEnableSend = true;
        const limt = 90;
        self.curSecond = limt;
        var intervalId = setInterval(function() {
          self.curSecond--;
          if(self.curSecond == 0) {
            clearInterval(intervalId);
            self.isEnableSend = false;
          }
        }, 1000);
        return;



        let url;
        if(this.resetType=='0'){
          url=this.$api.url.sendactivemsg;
        }else{
          url=this.$api.url.sendbymail;
        }
        this.$validate(this.validateArray[parseInt(this.resetType)])
          .then(function(success) {
            if(success) {
              self.$http.post(url, {
                phone: self.phone,
                emali:self.email,
                mtserver: self.mtserver
              }).then(function(response) {
                if(response.data.code == 1) {
                  Toast.create.positive({
                    html: response.data.message
                  });

                  self.isEnableSend = true;
                  const limt = 90;
                  self.curSecond = limt;
                  var intervalId = setInterval(function() {
                    self.curSecond--;
                    if(self.curSecond == 0) {
                      clearInterval(intervalId);
                      self.isEnableSend = false;
                    }
                  }, 1000);
                } else {
                  Toast.create.info({
                    html: response.data.message
                  });
                }
              }).catch(function(err) {
                Toast.create.negative({
                  html: err.message
                });
              });

            }
          });
      },
      resetPwd: function() {
        this.submitted = true;
        let self = this;
        let url;
        if(this.resetType=='0'){
          url=this.$api.url.resetpwd;
        }else{
          url=this.$api.url.resetpwdmail;
        }
        this.$validate(['mtserver','verify','password',this.validateArray[parseInt(self.resetType)]])
          .then(function(success) {
            if(success) {
              self.$http.post(url,{
                phone:self.phone,
                password:self.password,
                verify:self.verify,
                mtserver:self.mtserver,
                email:self.email
              }).then(response => {
                if(response.data.code == 1) {
                  Dialog.create({
                    title: '注册',
                    message: response.data.message,
                    buttons: [
                      {
                        label: '稍后登录',
                        color:'primary',
                        handler() {

                        }
                      },
                      {
                        label: '立即登录',
                        color:'primary',
                        outline:true,
                        handler() {
                          //self.$router.push({name:'login',params:{loginParams:{loginType:self.registerType,email:self.email,phone:self.phone,isNewUser:true}}});
                        }
                      }
                    ]
                  })

                } else {
                  Toast.create.negative({
                    html: response.data.message
                  });
                }

                Loading.hide();
              }).catch(err => {
                Loading.hide()
                Toast.create.negative({
                  html: err.message
                });
              });

            }
          });
        self.submitted = false;
      }

    },
    created() {
      this.getMtServer();
    }

  }
</script>

<style scoped>
  .sendHelp {
    position: absolute;
    bottom: 0;
    right: 3.5rem;
    font-size: 1.6rem;
  }

</style>
