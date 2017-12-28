<template>
  <div class="settings">
    <div class="h-bg my-bg">
      <h5 class="page-title">设置</h5>
    </div>
    <div class="settings-body">
      <pull-to :top-load-method="refresh">
        <q-list no-border inset-separator highlight>
          <q-item v-ripple class="settings-item" @click="$refs.personDataModal.open()">
            <q-item-side icon="people" color="orange-5">
            </q-item-side>
            <q-item-main>
              <q-item-tile label>个人资料</q-item-tile>
            </q-item-main>
            <q-item-side right icon="keyboard arrow right"/>
          </q-item>
          <q-item v-ripple class="settings-item" @click="$refs.PwdModal.open()">
            <q-item-side icon="credit card" color="teal-5">
            </q-item-side>
            <q-item-main>
              <q-item-tile label>修改登录密码</q-item-tile>
            </q-item-main>
            <q-item-side right icon="keyboard arrow right"/>
          </q-item>
          <q-item v-ripple class="settings-item" @click="$refs.MtModal.open()">
            <q-item-side icon="layers" color="primary"/>
            <q-item-main>
              <q-item-tile label>修改MT密码</q-item-tile>
            </q-item-main>
            <q-item-side right icon="keyboard arrow right"/>
          </q-item>
          <q-item v-ripple class="settings-item" to="/maxpro/member/promoCode">
            <q-item-side icon="layers" color="primary"/>
            <q-item-main>
              <q-item-tile label>关于</q-item-tile>
            </q-item-main>
            <q-item-side right icon="keyboard arrow right"/>
          </q-item>
        </q-list>
        <div class="padding-content">
          <q-btn class="my-button full-width"  @click="logout">退出系统</q-btn>
        </div>
      </pull-to>
      <q-modal ref="personDataModal" maximized @open="refresh">
        <div class="settings" style="background: rgb(247, 247, 250)">
          <div class="h-bg my-bg">
            <h5 class="page-title">设置</h5>
          </div>
          <div class="settings-body">
            <pull-to>
              <div class="row no-wrap user-avatar padding-content">
                <div class="col-6 relative-position text-left"><span class="avatar-title">头像</span></div>
                <div class="col-6 text-right"><img
                  :src="personData.avatar==''?'../statics/images/default_avatar.png':this.$api.url.baseURI+personData.avatar.substr(1)"
                  class="avatar-img" alt="点击修改头像"/></div>
              </div>
              <div class="user-field">
                <q-list no-border>
                  <q-item class="settings-item">
                    <q-item-side>
                      昵称
                    </q-item-side>
                    <q-item-main>
                      <q-field>
                        <q-input v-model="personData.nickname" type="text" align="right" :max-length="20"></q-input>
                      </q-field>
                    </q-item-main>
                  </q-item>
                  <q-item class="settings-item">
                    <q-item-side>
                      邮箱
                    </q-item-side>
                    <q-item-main>
                      <q-field :error="validation.hasError('personData.email')"
                               :error-label="validation.firstError('personData.email')">
                        <q-input v-model="personData.email" type="text" align="right"></q-input>
                      </q-field>
                    </q-item-main>
                  </q-item>
                  <q-item class="settings-item">
                    <q-item-side>
                      手机号
                    </q-item-side>
                    <q-item-main>
                      <q-field :error="validation.hasError('personData.phone')"
                               :error-label="validation.firstError('personData.phone')">
                        <q-input v-model="personData.phone" type="number" align="right"></q-input>
                      </q-field>
                    </q-item-main>
                  </q-item>
                  <q-item class="settings-item">
                    <q-item-side>
                      证件号码
                    </q-item-side>
                    <q-item-main>
                      <q-field :error="validation.hasError('personData.identity')"
                               :error-label="validation.firstError('personData.identity')">
                        <q-input v-model="personData.identity" type="text" align="right"></q-input>
                      </q-field>
                    </q-item-main>
                  </q-item>
                  <q-item class="settings-item">
                    <q-item-side>
                      性别
                    </q-item-side>
                    <q-item-main>
                      <div class="text-right">
                        <q-radio v-model="personData.sex" val="2" label="男"/>
                        <q-radio v-model="personData.sex" val="1" label="女"/>
                        <q-radio v-model="personData.sex" val="0" label="保密"/>
                      </div>
                    </q-item-main>
                  </q-item>
                  <q-collapsible ref="clpProvince" :label="provinceAndCity" class="bg-white">
                    <v-distpicker wrapper="province-wrapper" hide-area address-container="province" type="mobile"
                                  @selected="selectedProvince"></v-distpicker>
                  </q-collapsible>
                  <q-collapsible :label="nation" class="bg-white">
                    <div>
                      <q-field>
                        <q-input v-model="personData.nationality" type="text" align="right"></q-input>
                      </q-field>
                    </div>
                  </q-collapsible>
                </q-list>
              </div>
              <div class="padding-content">
                <q-btn class="my-button full-width"  @click="savePersonData">保存</q-btn>
              </div>
            </pull-to>
          </div>
        </div>
      </q-modal>
      <q-modal ref="PwdModal" maximized>
        <div class="settings" style="background: rgb(247, 247, 250)">
          <div class="h-bg my-bg">
            <h5 class="page-title">修改密码</h5>
          </div>
          <div class="settings-body">
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
                <div class="pwd-title">旧密码</div>
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
                <div class="padding-content">
                  <q-btn class="my-button full-width"  @click="passwordAgain">保存</q-btn>
                </div>

            </pull-to>
          </div>
        </div>
      </q-modal>
      <q-modal ref="MtModal" maximized @open="getMtList">
        <div class="settings" style="background: rgb(247, 247, 250)">
          <div class="h-bg my-bg">
            <h5 class="page-title">修改MT密码</h5>
          </div>
          <div class="settings-body">
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
                  <q-btn class="my-button full-width"  @click="resetAccoutPwd">保存</q-btn>
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
  import {setCookie} from '../js/cookie.js'

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
    QListHeader, Dialog,
    QItem,
    QItemSeparator,
    QItemSide,
    QItemMain,
    QItemTile
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
          nationality: ''

        },
        pwd: {
          password: '',
          new_password: '',
          re_password: ''
        },

        mtlist: [],
        mt: {},

        validatePersonData: ['personData.phone', 'personData.email', 'personData.identity'],
        validatePwd: ['pwd.password', 'pwd.new_password', 'pwd.re_password']

      }
    },
    directives: {Ripple},
    components: {
      PullTo, QIcon, Ripple, QList, QField, QInput, QRadio, QCollapsible, Toast, QSelect, Dialog,
      QListHeader,
      QItem,
      QItemSeparator,
      QItemSide,
      QItemMain,
      QItemTile, QModal, QBtn, VDistpicker
    }, validators: {

      'personData.email': function (value) {
        return Validator.value(value).email();
      },
      'personData.phone': function (value) {
        return Validator.custom(function () {
          if (!Validator.isEmpty(value)) {
            if (!(/^1[34578]\d{9}$/.test(value))) {
              return '手机号码格式错误！'
            }
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
          }
        })
      },
      'pwd.password': function (value) {
        return Validator.value(value).required();
      },
      'pwd.new_password': function (value) {
        return Validator.value(value).required();
      },
      'pwd.re_password, pwd.new_password': function (repassword, password) {
        if (this.submitted || this.validation.isTouched('pwd.re_password')) {
          return Validator.value(repassword).required().match(password);
        }
      },
      mt: function (value) {
        return Validator.custom(function () {
          if (JSON.stringify(value) == '{}') {
            return '未选择账号！';
          }
        })
      }


    },
    created: function () {

    },
    computed: {
      provinceAndCity: function () {
        return "<div class='row no-wrap'><div class='col-3 text-left'>省市</div><div class='col-9 text-right'>" + this.personData.province + " " + this.personData.city + "</div></div>";
      },
      nation: function () {
        return "<div class='row no-wrap'><div class='col-3 text-left'>国籍</div><div class='col-9 text-right'>" + this.personData.nationality + "</div></div>";
      }

    },
    methods: {
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
                    Toast.create.positive({
                      html: response.data.message, onDismiss() {
                        self.$refs.MtModal.close();
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
                  city: self.personData.city
                }).then(response => {
                  if (response && response.data.code == 1) {
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
      getMtList: function (done) {
        this.$showloading();
        let self = this;
        self.mtlist = [];
        self.mt = {};
        setTimeout(() => {

          self.$http.post(self.$api.url.mtDetail, {}).then(response => {
              if (response && response.data.code == 1) {
                response.data.data.forEach((item) => {
                  self.mtlist.push({label: item.loginid, value: item});
                })

              } else {
                Toast.create.negative({html: response.data.message})
              }
              self.$hideloading();
            }
          ).catch(err => {
            self.$hideloading();
            Toast.create.negative({
              html: err.message
            });
          });
          if (done) {
            done()
          }
        }, 1000);
      },
      refresh: function (done) {
        this.$showloading();
        let self = this;
        setTimeout(() => {

          self.$http.post(self.$api.url.personalData, {}).then(response => {
              if (response && response.data.code == 1) {
                self.personData = response.data.data;
              } else if(!response) {
                Toast.create.negative({html:'未登录，请登录！'})
              }else{
                Toast.create.negative({html: response.message})
              }
              self.$hideloading();
            }
          ).catch(err => {
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
  .settings {
    height: 100%;
    width: 100%;
    display: flex;
    flex-direction: column;
  }

  .settings-body {
    flex: 1;
    box-sizing: border-box;
    overflow: hidden;
  }

  .user-avatar {
    margin-bottom: .5rem;
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

  }

  .settings-item {
    background: white;
  }

  .province {
    height: 15rem;
    overflow: scroll;

  }

  .province-wrapper {
    height: 22rem;
  }

  .user-field {
    padding-left: .5rem;
    margin-bottom: 1rem;
    padding-bottom: 1rem;
  }

  .pwd-title {
    border-left: .3rem solid #f4873c;
    padding-left: .5rem;
  }

</style>
