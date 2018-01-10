<template>
  <div class="content-wrapper">
    <div class="content-title">
      <q-toolbar class="text-center" style="background: transparent;height: 4.8rem">
        <q-btn flat icon="keyboard_arrow_left" @click="$router.back()" >
        </q-btn>
        <q-toolbar-title>
          设置
        </q-toolbar-title>
        <div style="width: 4rem"></div>
      </q-toolbar>
    </div>
    <div class="content-flex">
      <pull-to :top-load-method="refresh">
        <div class="padding-content">
          <q-list no-border   class="bg-white ">
            <q-item v-ripple class="settings-item" @click="$refs.personDataModal.open()">
              <q-item-side icon="person" color="orange-5">
              </q-item-side>
              <q-item-main>
                <q-item-tile label>个人资料</q-item-tile>
              </q-item-main>
              <q-item-side right icon="keyboard arrow right"/>
            </q-item>
            <q-item-separator inset/>
            <q-item v-ripple class="settings-item" @click="$refs.MtAccountModal.open()">
              <q-item-side icon="person" color="orange-5">
              </q-item-side>
              <q-item-main>
                <q-item-tile label>开户信息</q-item-tile>
              </q-item-main>
              <q-item-side right icon="keyboard arrow right"/>
            </q-item>
            <q-item-separator inset/>
            <q-item v-ripple class="settings-item" @click="$refs.PwdModal.open()">
              <q-item-side icon="lock" color="teal-5">
              </q-item-side>
              <q-item-main>
                <q-item-tile label>修改CRM登录密码</q-item-tile>
              </q-item-main>
              <q-item-side right icon="keyboard arrow right"/>
            </q-item>
            <q-item-separator inset/>
            <q-item v-ripple class="settings-item" @click="$refs.MtModal.open()">
              <q-item-side icon="vpn key" color="primary"/>
              <q-item-main>
                <q-item-tile label>重置MT密码</q-item-tile>
              </q-item-main>
              <q-item-side right icon="keyboard arrow right"/>
            </q-item>
            <q-item-separator inset/>
            <q-item v-ripple class="settings-item" to="/maxpro/member/promoCode">
              <q-item-side icon="info" color="teal-5"/>
              <q-item-main>
                <q-item-tile label>关于</q-item-tile>
              </q-item-main>
              <q-item-side right icon="keyboard arrow right"/>
            </q-item>
          </q-list>
          <div class="padding-content" style="margin-top: 5rem">
            <q-btn big class="my-button full-width" @click="logout">退出系统</q-btn>
          </div>
        </div>
      </pull-to>
      <q-modal ref="personDataModal" maximized no-esc-dismiss no-backdrop-dismiss >
        <div class="content-wrapper ">
          <div class="content-title">
            <q-toolbar class="text-center" style="background: transparent;height: 4.8rem">
              <q-btn flat icon="keyboard_arrow_left" @click="isSavePersonData" >
              </q-btn>
              <q-toolbar-title>
                个人资料
              </q-toolbar-title>
              <div style="width: 4rem"></div>
            </q-toolbar></div>
          <div class="content-flex">
            <pull-to >
              <div style="background: rgb(247,247,250);padding: 1rem">
              <div class="row no-wrap user-avatar " v-show="!isModifyAvatar" style="padding: 1rem 1.6rem">
                <div class="col-6 relative-position text-left"><span class="avatar-title">头像</span></div>
                <div class="col-6 text-right"><img
                  :src="personData.avatar==''?'../statics/images/default_avatar.png':this.$api.url.baseURI+personData.avatar.substr(1)"
                  class="avatar-img" alt="点击修改头像" @click="uploadProof('avatar')"/></div>
              </div>
                <div class="row no-wrap user-avatar " v-if="isModifyAvatar">
                  <q-uploader class="uploader " :after="[
    {
      icon: 'cancel',
      handler: ()=> {
        this.isModifyAvatar=false;
      }
    }
  ]"  extensions="image/*" @add="getUploloadUrl"  @uploaded="uploaded" :url="uploadUrl" />
                </div>
              <div class=" bg-white" style="padding: 1rem 1.6rem">
                <q-field style="margin-top: 0">
                  <q-input float-label="昵称" clearable v-model="personData.nickname" type="text" align="right" :max-length="20" @change="changePersonData"></q-input>
                </q-field>
                <q-field :error="validation.hasError('personData.email')"
                         :error-label="validation.firstError('personData.email')">
                  <q-input float-label="邮箱" clearable v-model="personData.email" type="text" align="right"  @change="changePersonData"></q-input>
                </q-field>
                <q-field :error="validation.hasError('personData.phone')"
                         :error-label="validation.firstError('personData.phone')">
                  <q-input float-label="手机号" clearable v-model="personData.phone" type="number" align="right"  @change="changePersonData"></q-input>
                </q-field>
                <q-field   :error="validation.hasError('personData.address')"
                         :error-label="validation.firstError('personData.address')">
                  <q-input  float-label="详细地址" clearable v-model="personData.address"  type="text" align="right"  @change="changePersonData"></q-input>
                </q-field>
                <q-field helper="身份证号码一旦保存成功，将不可更改，请谨慎填写！"  :error="validation.hasError('personData.identity')"
                         :error-label="validation.firstError('personData.identity')">
                  <q-input  float-label="身份证号码" clearable v-model="personData.identity" :disable="personData.identity==''" type="text" align="right"  @change="changePersonData"></q-input>
                </q-field>


                <div class="row">
                  <div class="col-4 relative-position"><span class="avatar-title">性别</span></div>
                  <div class="col-8">
                    <q-option-group  @change="changePersonData" inline align="right" class="radio-sex"
                                    color="primary"
                                    v-model="personData.sex"
                                    :options="[
            {label: '男', value: '2'},
            {label: '女', value: '1'},
            {label: '保密', value: '0'}
          ]"
                    />
                  </div>

                </div>

              </div>

                <q-list no-border style="margin-top: .3rem">
                  <q-collapsible :label="nation" class="bg-white">
                    <div>
                      <q-field>
                        <q-input v-model="personData.nationality" type="text" align="right"  @change="changePersonData"></q-input>
                      </q-field>
                    </div>
                  </q-collapsible>

                  <q-collapsible style="margin-top: 1rem" id="clpProvince" ref="clpProvince" :label="provinceAndCity" class="bg-white">
                    <v-distpicker wrapper="province-wrapper" hide-area address-container="province" type="mobile"
                                  @selected="selectedProvince"></v-distpicker>
                  </q-collapsible>
                </q-list>


                <q-btn style="margin: 3rem 0 2rem 0"  big class="my-button full-width" @click="savePersonData">保存</q-btn>

              </div>
            </pull-to>
          </div>
        </div>
      </q-modal>
      <q-modal ref="PwdModal" maximized>
        <div class="content-wrapper">
          <div class="content-title">
            <q-toolbar class="text-center" style="background: transparent;height: 4.8rem">
              <q-btn flat icon="keyboard_arrow_left" @click="$refs.PwdModal.close()" >
              </q-btn>
              <q-toolbar-title>
                修改CRM登录密码
              </q-toolbar-title>
              <div style="width: 4rem"></div>
            </q-toolbar>
            </div>
          <div class="content-flex">
            <pull-to>
              <div class="padding-content bg-white">
                <div class="pwd-title">旧密码</div>
                <div class="user-field">
                  <q-field :error="validation.hasError('pwd.password')"
                           :error-label="validation.firstError('pwd.password')">
                    <q-input float-label="原密码" v-model="pwd.password" clearable type="password"></q-input>
                  </q-field>
                </div>
              </div>
              <div class="padding-content bg-white" style="margin-top: 1rem">
                <div class="pwd-title">新密码</div>
                <div class="user-field">
                  <q-field :error="validation.hasError('pwd.new_password')"
                           :error-label="validation.firstError('pwd.new_password')">
                    <q-input float-label="新密码" v-model="pwd.new_password" clearable type="password"></q-input>
                  </q-field>
                  <q-field :error="validation.hasError('pwd.re_password')"
                           :error-label="validation.firstError('pwd.re_password')">
                    <q-input float-label="确认密码" v-model="pwd.re_password" clearable type="password"></q-input>
                  </q-field>
                </div>
              </div>
              <div class="padding-content"  >
                <q-btn big  class="my-button full-width" @click="passwordAgain">保存</q-btn>
              </div>

            </pull-to>
          </div>
        </div>
      </q-modal>
      <q-modal ref="MtModal" maximized >
         <div class="content-wrapper">
           <div class="content-title"><q-toolbar class="text-center" style="background: transparent;height: 4.8rem">
             <q-btn flat icon="keyboard_arrow_left" @click="$refs.MtModal.close()" >
             </q-btn>
             <q-toolbar-title>
               重置MT密码
             </q-toolbar-title>
             <div style="width: 4rem"></div>
           </q-toolbar></div>
           <div class="content-flex">
             <pull-to>
               <div class="padding-content bg-white">
                 <div class="pwd-title">MT账号</div>
                 <div class="user-field">
                   <q-field :error="validation.hasError('mt')" :error-label="validation.firstError('mt')">
                     <q-select
                       v-model="mt"
                       float-label="MT账号"
                       radio
                       :options="mtlist"
                     />
                   </q-field>
                   <q-field>
                     <q-radio v-model="mt.ENABLE" val="0" label="交易"/>
                     <q-radio v-model="mt.ENABLE" val="1" label="只读"/>
                   </q-field>
                 </div>
               </div>
               <div class="padding-content">
                 <q-btn big class="my-button full-width" @click="resetAccoutPwd">保存</q-btn>
               </div>

             </pull-to>
           </div>
         </div>
      </q-modal>
       <q-modal ref="MtAccountModal" maximized>
         <div class="content-wrapper">
           <div class="content-title"><q-toolbar class="text-center" style="background: transparent;height: 4.8rem">
             <q-btn flat icon="keyboard_arrow_left" @click="$refs.MtAccountModal.close()" >
             </q-btn>
             <q-toolbar-title>
               开户信息
             </q-toolbar-title>
             <div style="width: 4rem"></div>
           </q-toolbar></div>
           <div class="content-flex">
             <pull-to>
               <div class="skip row padding-content">
                 <div class="col-1"><q-icon name="volume up" size="2.2rem" color="primary"></q-icon></div>
                 <div class="col-8"><div style="margin-left: .5rem;height: 2.2rem;top:.2rem;position: relative">注册成功，暂时不开户请点击跳过。</div></div>
                 <div class="col-3 text-right"><q-btn rounded small outline color="primary" inverted @click="$router.back()">跳过</q-btn></div>
               </div>
               <div class="padding-content bg-white">
                 <div class="user-field">
                   <q-field style="margin-top: 0" :error="validation.hasError('personData.leverage')" :error-label="validation.firstError('personData.leverage')">
                     <q-select
                       v-model="personData.leverage"
                       float-label="杠杆"
                       :options="LeverageList" align="right"
                     />
                   </q-field>
                 </div>
               </div>
               <div class="padding-content bg-white">
                 <div class="pwd-title">证件信息</div>
                 <div class="user-field">
                   <q-field :error="validation.hasError('personData.username')" :error-label="validation.firstError('personData.username')">
                     <q-input
                       v-model="personData.username"
                       float-label="姓名"  clearable type="text" align="right"
                     />
                   </q-field>
                   <q-field :error="validation.hasError('personData.identity')" :error-label="validation.firstError('personData.identity')">
                     <q-input
                       v-model="personData.identity"
                       float-label="身份证号"  clearable type="text" align="right"
                     />
                   </q-field>
                 </div>
               </div>
               <div class="padding-content bg-white">
                 <div class="pwd-title">银行信息</div>
                 <div class="user-field">
                   <q-field :error="validation.hasError('personData.bankName')" :error-label="validation.firstError('personData.bankName')">
                     <q-input
                       v-model="personData.bankName"
                       float-label="开户行"  clearable type="text" align="right"
                     />
                   </q-field>
                   <q-field :error="validation.hasError('personData.realname')" :error-label="validation.firstError('personData.realname')">
                     <q-input
                       v-model="personData.realname"
                       float-label="姓名"  clearable type="text" align="right"
                     />
                   </q-field>
                   <q-field :error="validation.hasError('personData.accountNum')" :error-label="validation.firstError('personData.accountNum')">
                     <q-input
                       v-model="personData.accountNum"
                       float-label="账户"  clearable type="text" align="right"
                     />
                   </q-field>
                 </div>
               </div>
               <div class="padding-content bg-white">
                 <div class="pwd-title">附件资料信息</div>
                 <div class="user-field">
                   <div v-if="isUpload" class="padding-content" >
                   <q-uploader class="uploader " :after="[
                          {
                            icon: 'cancel',
                            handler: ()=> {
                              this.isUpload=false;
                            }
                          }
                        ]"  extensions="image/*" @add="getUploloadUrl"  @uploaded="uploaded" :url="uploadUrl" />
                   </div>
                   <div class="row">
                     <div class="col-6" >
                       <q-field :error="validation.hasError('personData.identityOpposite')" :error-label="validation.firstError('personData.identityOpposite')">
                           <div class="proof-item" v-ripple @click="uploadProof('identityOpposite')">
                             <img v-if="personData.identityOpposite" :src="$api.url.baseURI+personData.proof.identityOpposite.substr(1)"/>
                           </div>
                           <div class="disabled text-center">身份证正面</div>
                       </q-field>
                     </div>
                     <div class="col-6">
                       <q-field :error="validation.hasError('personData.identityBack')" :error-label="validation.firstError('personData.identityBack')">
                         <div class="proof-item" v-ripple @click="uploadProof('identityBack')">
                           <img v-if="personData.identityBack" :src="$api.url.baseURI+personData.proof.identityBack.substr(1)"/>
                         </div>
                         <div class="disabled text-center">身份证背面</div>
                       </q-field>
                     </div>
                   </div>
                   <div class="row no-margin">
                     <div class="col-6">
                       <q-field :error="validation.hasError('personData.bankCard')" :error-label="validation.firstError('personData.bankCard')">
                         <div class="proof-item" v-ripple @click="uploadProof('bankCard')">
                           <img v-if="personData.bankCard" :src="$api.url.baseURI+personData.proof.bankCard.substr(1)"/>
                         </div>
                         <div class="disabled text-center">银行卡照片</div>
                       </q-field>
                     </div>
                     <div class="col-6">
                       <q-field  :error="validation.hasError('personData.addressProof')" :error-label="validation.firstError('personData.addressProof')">
                         <div class="proof-item" v-ripple @click="uploadProof('addressProof')">
                           <img v-if="personData.addressProof" :src="$api.url.baseURI+personData.proof.addressProof.substr(1)"/>
                         </div>
                         <div class="disabled text-center">地址证照片</div>
                       </q-field>
                     </div>
                   </div>
                 </div>
               </div>
               <div class="padding-content">
                 <q-btn big class="my-button full-width" @click="saveMtAccount">提交开户资料</q-btn>
               </div>
             </pull-to>
           </div>
         </div>
       </q-modal>
    </div>
  </div>
</template>
<script>
  import Vue from 'vue'
  import {setCookie,getCookie} from '../js/cookie.js'
  var SimpleVueValidation = require('simple-vue-validator');
  var Validator = SimpleVueValidation.Validator.create({
    templates: {
      required: '字段不能为空！',
      email: 'Email格式不正确！',
      match: '密码不一致！'

    }
  });
  Vue.use(SimpleVueValidation);
  import PullTo from 'vue-pull-to'
  import VDistpicker from 'v-distpicker'
  import {
    QIcon, Ripple, QList, QModal, QBtn, QField, QInput, QRadio, QCollapsible, Toast, QSelect,
    QListHeader, Dialog,QOptionGroup,
    QItem,QUploader,
    QItemSeparator,
    QItemSide,
    QItemMain,
    QItemTile,QToolbar,QToolbarTitle
  } from 'quasar'

  export default {
    data() {
      return {
        submitted: false,
        option: '',
        personData: {
          avatar: '',
          province: '',
          city: '',
          nationality: '',
          username:'',
          address:'',
          bankName:'',
          accountNum:'',
          realname:'',
          identity:'',
          identityOpposite:'',
          identityBack:'',
          bankCard:'',
          addressProof:'',
          leverage:'',
          proof:{
          identityOpposite:'',
          identityBack:'',
          bankCard:'',
          addressProof:''},
          canModify_identityOpposite:'',
          canModify_identityBack:'',
          canModify_bankCard:'',
          canModify_addressProof:''

        },
        pwd: {
          password: '',
          new_password: '',
          re_password: ''
        },
        mtlist: [],
        mt: {},
        LeverageList:[],
        validatePersonData: ['personData.phone', 'personData.email', 'personData.identity','personData.address'],
        validatePwd: ['pwd.password', 'pwd.new_password', 'pwd.re_password'],
        uploadUrl:'',
        isModifyAvatar:false,
        isUpload:false,
        isModifyPersonData:false,
        isModifyMtPwd:false,
        isModifyPwd:false,
        currentProof:''

      }
    },
    directives: {Ripple},
    components: {
      PullTo, QIcon, Ripple, QList, QField, QInput, QRadio, QCollapsible, Toast, QSelect, Dialog,
      QListHeader,
      QItem,
      QItemSeparator,
      QItemSide,QUploader,
      QItemMain,QOptionGroup,
      QItemTile, QModal, QBtn, VDistpicker,QToolbar,QToolbarTitle
    }, validators: {
      'personData.address':function (value) {
        return Validator.custom(function () {
          if (Validator.isEmpty(value)) {
            return '详细地址不能为空！';
          }
        })
      },
      'personData.email': function (value) {
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
      'personData.phone': function (value) {
        return Validator.custom(function () {
          if (!Validator.isEmpty(value)) {
            if (!(/^1[34578]\d{9}$/.test(value))) {
              return '手机号码格式错误！'
            }
          }else{
            return '手机号码不能为空！';
          }
        })
      },
      'personData.identity': function (value) {
        let reg = /(^\d{15}$)|(^\d{18}$)|(^\d{17}(\d|X|x)$)/;
        return Validator.custom(function () {
          if (!Validator.isEmpty(value)) {
            if (reg.test(value) === false) {
              return '身份证号码格式错误！';
            }
          }else{
             return '身份证号不能为空！'
          }
        })
      },
      'personData.identityOpposite':  function(value) {
        return Validator.custom(function () {
          if (Validator.isEmpty(value)) {
            return '请上传身份证正面照片！'
          }
        })
      }, 'personData.identityBack': function (value) {
        return Validator.custom(function () {
          if (Validator.isEmpty(value)) {
            return '请上传身份证反面照片！'
          }
        })
      }, 'personData.bankCard': function (value) {
        return Validator.custom(function () {
          if (Validator.isEmpty(value)) {
            return '请上传银行卡正面照！'
          }
        })
      }, 'personData.bankName': function (value) {
        return Validator.custom(function () {
          if (Validator.isEmpty(value)) {
            return '开户行不能为空！'
          }
        })
      },
      'personData.leverage': function (value) {
        return Validator.custom(function () {
          if (Validator.isEmpty(value)) {
            return '请选择杠杆！'
          }
        })
      },
      'personData.accountNum': function (value) {
        return Validator.custom(function () {
          if (Validator.isEmpty(value)) {
            return '账户不能为空！'
          }
        })
      },
      'personData.realname': function (value) {
        return Validator.custom(function () {
          if (Validator.isEmpty(value)) {
            return '账户姓名不能为空！'
          }
        })
      },
      'personData.username': function (value) {
        return Validator.custom(function () {
          if (Validator.isEmpty(value)) {
            return '证件姓名不能为空！'
          }
        })
      },
      'personData.identity': function (value) {
        let reg = /(^\d{15}$)|(^\d{18}$)|(^\d{17}(\d|X|x)$)/;
        return Validator.custom(function () {
          if (!Validator.isEmpty(value)) {
            if (reg.test(value) === false) {
              return '身份证号码格式错误！';
            }
          }else{
            return '身份证号不能为空！'
          }
        })
      },
      'pwd.password': function (value) {
        return Validator.custom(function () {
          if(Validator.isEmpty(value)){
            return '原密码不能为空！'
          }
        })
      },
      'pwd.new_password': function (value) {
        return Validator.custom(function () {
          if (!Validator.isEmpty(value)) {
            if (!(/^(?=.*[0-9].*)(?=.*[A-Z].*)(?=.*[a-z].*).{6,16}$/.test(value))) {
              return '密码必须是6-16位大小写字母和数字组合！'
            }
          } else {
            return '新密码不能为空！'
          }
        })
      },
      'pwd.re_password, pwd.new_password': function (repassword, password) {
        if (this.submitted || this.validation.isTouched('pwd.re_password')) {

          return Validator.custom(function () {
            if (!Validator.isEmpty(repassword)) {
                if(repassword!=password){
                  return '密码不一致！'
                }
            } else {
              return '确认密码不能为空！'
            }
          })
        }
      },
      mt: function (value) {
        let self=this;
        return Validator.custom(function () {
          if (self.submitted&&JSON.stringify(value) == '{}') {
            return '未选择账号！';
          }
        })
      }
    },
    mounted: function () {
        this.refresh();
      if(this.$route.query.menu){
        let menu=this.$route.query.menu;
        switch(menu){
          case'personData':
            this.$refs.personDataModal.open();
            break;
        }
      }
    },

    watch:{
      '$route':function (to,from) {
        if(to.path.indexOf('settings') &&this.$route.query.menu){
          let menu=this.$route.query.menu;
          switch(menu){
            case'personData':
              this.$refs.personDataModal.open();
              break;
          }
        }

      }
    },
    computed: {
      provinceAndCity: function () {
        return "<div class='row no-wrap'><div class='col-2 text-left'><span class='address-title'>省市</span></div><div class='col-10 text-right'>" + this.personData.province + " " + this.personData.city + "</div></div>";
      },
      nation: function () {
        return "<div class='row no-wrap'><div class='col-2 text-left'><span class='address-title'>国籍</span></div><div class='col-10 text-right'>" + this.personData.nationality + "</div></div>";
      }

    },
    methods: {
      saveMtAccount:function () {
        let self=this;
        this.$validate(['personData.leverage','personData.identity','personData.username','personData.bankName','personData.realname','personData.accountNum','personData.bankCard','personData.identityOpposite','personData.identityBack'])
          .then(function (success) {
            if (success) {
              self.$showloading({message: '正在保存…'})
              setTimeout(() => {
                self.$http.post(self.$api.url.getAccountInfo, {
                  id:self.personData.id,
                  leverage:self.personData.leverage,
                  username:self.personData.username,
                  identity:self.personData.identity,
                  bankName:self.personData.bankName,
                  realname:self.personData.realname,
                  accountNum:self.personData.accountNum,
                  bankCard:self.personData.bankCard,
                  identityOpposite:self.personData.identityOpposite,
                  identityBack:self.personData.identityBack,
                  addressProof:self.personData.address
                }).then(response => {
                  self.$hideloading();
                  if (response && response.data.code == 1) {
                    Toast.create.positive({
                      html: response.data.message, onDismiss() {
                        self.$refs.MtAccountModal.close();
                      }
                    });
                  } else {
                    Toast.create.negative({html: response.data.message});
                  }
                }).catch(err => {
                  self.$hideloading();
                  Toast.create.negative({html: err.message});
                });

              }, 1000);


            }
          });

      },
      uploadProof:function (proof) {
        this.currentProof=proof;
        if(proof=='avatar'){
         this.isModifyAvatar=true;
        }
        else{

          if(this.personData['canModify_'+proof]==''){

            this.isUpload=true;
          }

        }
      },
      isSavePersonData:function(){
        if(!this.isModifyPersonData){
          this.$refs.personDataModal.close();
        }else{
          Dialog.create({
            title: '保存',
            message: '是否保存已修改的资料？',
            buttons: [
              {
                label: '取消',
                handler: ()=> {
                  this.$refs.personDataModal.close();
                }
              },{
              label:'保存',
                outline:true,
                handler:()=>{
                  this.savePersonData();
                }
              }
            ]
          });
        }

      },
      changePersonData:function () {
        this.isModifyPersonData=true;
      },
      changePwd:function () {
        this.isModifyPwd=true;
      },
      changMtPwd:function () {
        this.isModifyMtPwd=true;
      },
      getUploloadUrl:function (files) {
        console.log(files);
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
        if(data.code==1){
          if(this.currentProof=='avatar'){
            this.isModifyAvatar=false;
            this.changePersonData();
            this.personData[this.currentProof]=data.data.data[0]['savepath']+data.data.data[0]['savename'];
          }else{
            this.isUpload=false;
            this.personData.proof[this.currentProof]=data.data.data[0]['savepath']+data.data.data[0]['savename'];
            this.personData[this.currentProof]=data.data.data[0].id;
          }

           this.currentProof='';
          Toast.create.positive({html:data.data.info,timeout:3000})
        }
        else{
          Toast.create.negative({html:data.message})
          this.personData[this.currentProof]='';
        }

      },
      logout: function () {
        let self = this;
        Dialog.create({
          title: '退出系统',
          message: '确定退出系统？',
          buttons: [
            {
              label: '取消',
              handler() {

              }
            },
            {
              label: '退出',
              outline: true,
              handler() {
                self.$showloading({message: '正在退出…'})
                setTimeout(() => {
                  self.$http.post(self.$api.url.logout, {}).then(response => {
                    if (response && response.data.code == 1) {
                      setCookie('token', '', '-1d');
                      self.$hideloading();
                      self.$router.push('/');
                    } else {
                      self.$hideloading();
                      Toast.create.negative({html: response.data.message});
                    }
                  }).catch(err => {
                    self.$hideloading();
                    Toast.create.negative({html: err.message});
                  });
                }, 1000);
              }
            }
          ]
        });
      },
      resetAccoutPwd: function () {
        let self = this;
        self.submitted = true;
        this.$validate('mt')
          .then(function (success) {
            if (success) {
              self.$showloading({message: '正在保存…'})
              setTimeout(() => {
                self.$http.post(self.$api.url.resetAccoutPwd, {
                  id: self.mt.loginid,
                  setpwdtype: self.mt.ENABLE
                }).then(response => {
                  if (response && response.data.code == 1) {
                    self.$hideloading();
                    Toast.create.positive({
                      html: response.data.message, onDismiss() {
                        self.$refs.MtModal.close();
                      }
                    });
                  } else {
                    Toast.create.negative({html: response.data.message});
                  }
                }).catch(err => {
                  self.$hideloading();
                  Toast.create.negative({html: err.message});
                });
              }, 1000);
            }
          });
        self.submitted=false;

      },
      passwordAgain: function () {
        let self = this;
        self.submitted = true;
        this.$validate(this.validatePwd)
          .then(function (success) {
            if (success) {
              self.$showloading({message: '正在保存…'})
              setTimeout(() => {
                self.$http.post(self.$api.url.passwordAgain, {
                  password: self.pwd.password,
                  new_password: self.pwd.new_password,
                  re_password: self.pwd.re_password
                }).then(response => {
                  if (response && response.data.code == 1) {
                    Toast.create.positive({
                      html: response.data.message, onDismiss() {
                        self.$refs.PwdModal.close();
                        self.pwd = {};
                      }
                    });
                  } else {
                    Toast.create.negative({html: response.data.message});
                  }
                }).catch(err => {
                  Toast.create.negative({html: err.message});
                });
                self.$hideloading();
              }, 1000);


            }
          });
        self.submitted = false;
      }
      ,
      selectedProvince: function (data) {

        this.personData.province = data.province.value;
        this.personData.city = data.city.value;
      this.changePersonData();
        this.$refs.clpProvince.close();
      },
      savePersonData: function () {
        let self = this;
        this.$validate(this.validatePersonData)
          .then(function (success) {
            if (success) {
              self.$showloading({message: '正在保存…'})
              setTimeout(() => {
                self.$http.post(self.$api.url.editPersonalData, {
                  avatar: self.personData.avatar,
                  nickname: self.personData.nickname,
                  identity: self.personData.identity,
                  phone: self.personData.phone,
                  email: self.personData.email,
                  sex: self.personData.sex,
                  nationality: self.personData.nationality,
                  province: self.personData.province,
                  city: self.personData.city,
                  address:self.personData.address
                }).then(response => {
                  if (response && response.data.code == 1) {
                    self.isModifyPersonData=false;
                    Toast.create.positive({
                      html: response.data.message, onDismiss() {
                        self.$refs.personDataModal.close();
                      }
                    });
                  } else {
                    Toast.create.negative({html: response.data.message});
                  }
                }).catch(err => {
                  Toast.create.negative({html: err.message});
                });
                self.$hideloading();
              }, 1000);


            }
          });
      },
      getMtList: function () {
        return  this.$http.post(this.$api.url.mtDetail, {});
      },
      getPersonlData:function () {
        return this.$http.post(this.$api.url.personalData, {});
      },
      getLeverageList:function () {
        return this.$http.post(this.$api.url.getLeverageList,{});
      },

      refresh: function (done) {
        this.$showloading();
        let self = this;
        setTimeout(() => {
          self.$http.all([self.getMtList(),self.getPersonlData(),self.getLeverageList()]).then(self.$http.spread(function (_mtlist,_personalData,_leverageList) {
            self.$hideloading();
            if(_mtlist&&_mtlist.data.code == 1){
              self.mtlist = [];
              _mtlist.data.data.forEach((item) => {
                self.mtlist.push({label: item.loginid, value: item});
              })
            }else{
              Toast.create.negative({html: response.data.message})
            }
            if (_personalData && _personalData.data.code == 1) {
              self.mt = {};
              let person=_personalData.data.data;
              self.personData.address=person.address;
              self.personData.avatar=person.avatar;
              self.personData.city=person.city;
              self.personData.email=person.email;
              self.personData.id=person.id;
              self.personData.identity=person.identity;
              self.personData.nationality=person.nationality;
              self.personData.nickname=person.nickname;
              self.personData.phone=person.phone;
              self.personData.province=person.province;
              self.personData.sex=person.sex;
              self.canModify_identityOpposite=person.identityOpposite,
                self.canModify_identityBack=person.identityBack,
                self.canModify_bankCard=person.bankCard,
                self.canModify_addressProof=person.addressProof

            } else if (!_personalData) {
              Toast.create.negative({html: '未登录，请登录！'})
            } else {
              Toast.create.negative({html: _personalData.message})
            }
            if(_leverageList&&_leverageList.data.code==1){
              let list=[];
              _leverageList.data.data.forEach((item)=>{
                list.push({label:item,value:item});
              });
              self.LeverageList=list;
            }else{
              Toast.create.info({html: _leverageList.data.message})
            }

          })).catch(err=>{
            self.$hideloading();
            Toast.create.negative({
              html: err.message
            });
          });
          if (done) {
            done()
          }
        }, 1000);
      }

    }
  }
</script>
<style>
  .proof-item{
    padding: 1rem ;
    position: relative;
    width: 100%;
    height:12rem ;
    background: url("../statics/images/add-bank.png") no-repeat center center/40% 50%;
  }
  .proof-item img{
    width: 100%;
    height: 100%;
  }
  .user-avatar {
    margin-bottom: 1rem;
    background: white;
  }

  .avatar-img {
    width: 5rem;
    height: 5rem;
    border-radius: 50%;
  }

  .avatar-title {
    position: absolute;
    left: 0;
    top: 0;
    bottom: 0;
    right: 0;
    width: 100%;
    height: 40%;
    margin: auto;
    font-size: 1.2rem;
    color: rgba(0,0,0,0.46);

  }
  .radio-sex{
    font-size: 1.4rem;
  }
  .province {
    height: 19rem;
    overflow: scroll;
    padding: 1rem;
    line-height: 2.2rem;

  }
  .address-header{
    background-color: gainsboro !important;
  }
  #clpProvince .q-collapsible-sub-item{
    padding: 0 !important;
  }

  .province-wrapper {
    height: 22rem;
    font-size: 1.4rem;
  }

  .user-field {
    padding-left: .5rem;
  }

  .pwd-title {
    border-left: .3rem solid #f4873c;
    padding-left: .5rem;
    font-size: 1.4rem;
  }
  .uploader{
    width: 100%;
  }
  .address-title{
    font-size: 1.2rem;
    color: rgba(0,0,0,.46);
  }
  .skip{
    background:rgba(247,247,250,.6);
    line-height: 2.2rem;
    font-size: 1.4rem;
  }

</style>
