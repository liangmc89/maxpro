<template>

  <div id="mtList">
    <div class="content-title">
      <q-toolbar class="text-center" style="background: transparent;height: 4.8rem">
        <q-btn flat icon="keyboard_arrow_left" @click="$router.back()">
        </q-btn>
        <q-toolbar-title>
          设置
        </q-toolbar-title>
        <div style="width: 4rem"></div>
      </q-toolbar>

    </div>
    <div class="padding-content bg-white shadow-1">
      <q-input :before="[{icon:'search'}]" v-model="mtKey" placeholder="搜索账号" clearable type="text"></q-input>
    </div>
    <div class="mt-body">
      <pull-to :top-load-method="refresh">
        <div class="mt-item bg-white shadow-1" v-for="(item,index) in mtList" :key="index">
          <div class="mt-title-wrap ">
            <div class="row no-wrap mt-title ">
              <div class="col-4 mt-label list-style text-right">真实姓名：</div>
              <div class="col-4">{{item.member_id}}</div>
              <div class="col-2">主账户</div>
              <div class="col-2 text-right text-primary">正常</div>
            </div>
          </div>
          <div class="row no-wrap mt-filed ">
            <div class="col-2 mt-label">账户：</div>
            <div class="col-6">{{item.loginid}}</div>
            <div class="col-4 text-right">{{item.LEVERAGE}}倍杠杆</div>
          </div>
          <div class="row no-wrap  mt-filed">
            <div class="col-2 mt-label">组：</div>
            <div class="col-10">{{item.GROUP}}</div>
          </div>
          <div class="row no-wrap  mt-filed">
            <div class="col-2 mt-label">余额：</div>
            <div class="col-4">{{item.BALANCE | currencyFilter}}</div>
            <div class="col-2 mt-label">净值：</div>
            <div class="col-4">{{item.EQUITY | currencyFilter}}</div>
          </div>
          <div class="row no-wrap  mt-filed">
            <div class="col-2 mt-label">赠金：</div>
            <div class="col-4">{{item.CREDIT | currencyFilter}}</div>
            <div class="col-2 mt-label">比例：</div>
            <div class="col-4">0</div>
          </div>
          <div class="row no-wrap  mt-filed">
            <div class="col-4 mt-label">可用预付款：</div>
            <div class="col-8">{{item.MARGIN_FREE | currencyFilter}}</div>
          </div>
        </div>
      </pull-to>
      <q-modal ref="saveApplyModal" maximized>
        <div class="content-wrapper" style="background: rgb(247, 247, 247)">
          <div class="content-title">
            <q-toolbar class="text-center" style="background: transparent;height: 4.8rem">
              <q-btn flat icon="keyboard_arrow_left" @click="$refs.saveApplyModal.close()">
              </q-btn>
              <q-toolbar-title>
                开户申请
              </q-toolbar-title>
              <div style="width: 4rem"></div>
            </q-toolbar>
          </div>
          <div class="content-flex">
            <pull-to>
              <div class="padding-content bg-white">

                <q-field style="margin-top: 0" :error="validation.hasError('apply.mt4_server_id')"
                         :error-label="validation.firstError('apply.mt4_server_id')">
                  <q-select float-label="服务器" align="right"
                            v-model="apply.mt4_server_id"
                            :options="serverList"
                  />
                </q-field>
                <q-field :error="validation.hasError('apply.leverage')"
                         :error-label="validation.firstError('apply.leverage')">
                  <!--<q-slider markers label-always :label-value="LeverageList[leverageIndex]" v-model="leverageIndex" :min="0" :max="LeverageList.length-1"  :step="1"  snap />-->
                  <q-select float-label="杠杆" align="right" v-model="apply.leverage" :options="LeverageList"></q-select>
                  <!--<q-input float-label="杠杆" v-model="apply.leverage" type="text" clearable align="right"></q-input>-->
                </q-field>
              </div>
              <div class="padding-content bg-white" style="margin-top: 1rem;">
                <q-field style="margin-top: 0" :error="validation.hasError('apply.name')"
                         :error-label="validation.firstError('apply.name')">
                  <q-input float-label="开户名" v-model="apply.name" type="text" clearable align="right" readonly
                           disable></q-input>
                </q-field>

                <q-field :error="validation.hasError('apply.email')"
                         :error-label="validation.firstError('apply.email')">
                  <q-input float-label="邮箱" v-model="apply.email" type="text" clearable align="right" readonly
                           disable></q-input>
                </q-field>
                <q-field :error="validation.hasError('apply.phone')"
                         :error-label="validation.firstError('apply.phone')">
                  <q-input float-label="手机号" v-model="apply.phone" type="number" clearable align="right" readonly
                           disable></q-input>
                </q-field>
                <q-field :error="validation.hasError('apply.address')"
                         :error-label="validation.firstError('apply.address')">
                  <q-input float-label="地址" v-model="apply.address" type="text" clearable align="right"></q-input>
                </q-field>

              </div>
              <div class="padding-content">
                <q-btn big class="my-button full-width" @click="saveApply">提交申请</q-btn>
              </div>
            </pull-to>
          </div>
        </div>
      </q-modal>
      <q-modal ref="bindingMTModal" maximized>
        <div class="content-wrapper" style="background: rgb(247, 247, 247)">
          <div class="content-title">
            <q-toolbar class="text-center" style="background: transparent;height: 4.8rem">
              <q-btn flat icon="keyboard_arrow_left" @click="$refs.bindingMTModal.close()">
              </q-btn>
              <q-toolbar-title>
                账户绑定
              </q-toolbar-title>
              <div style="width: 4rem"></div>
            </q-toolbar>
          </div>
          <div class="content-flex">
            <pull-to>
              <div class="padding-content bg-white">
                <q-field style="margin-top: 0" :error="validation.hasError('apply.mt4_server_id')"
                         :error-label="validation.firstError('apply.mt4_server_id')">
                  <q-select float-label="服务器" align="right"
                            v-model="apply.mt4_server_id"
                            :options="serverList"
                  />
                </q-field>
              </div>
              <div class="padding-content bg-white" style="margin-top: 1rem">
                <q-field style="margin-top: 0" :error="validation.hasError('apply.loginid')"
                         :error-label="validation.firstError('apply.loginid')">
                  <q-input float-label="账号" v-model="apply.loginid" type="text" clearable align="right"></q-input>
                </q-field>
                <q-field :error="validation.hasError('apply.mtpassword')"
                         :error-label="validation.firstError('apply.mtpassword')">
                  <q-input float-label="密码" v-model="apply.mtpassword" type="password" clearable
                           align="right"></q-input>
                </q-field>

              </div>
              <div class="padding-content text-center">
                <q-btn big class="my-button full-width" @click="bindingMT">绑定</q-btn>
              </div>
            </pull-to>
          </div>
        </div>
      </q-modal>
    </div>
    <div class="row">
      <div class="col-6">
        <q-btn icon="add" big color="primary" class="full-width" @click="$refs.saveApplyModal.open()">账户申请</q-btn>
      </div>
      <div class="col-6">
        <q-btn big class="full-width" color="red-12" @click="$refs.bindingMTModal.open()">账户绑定</q-btn>
      </div>
    </div>
  </div>

</template>

<script>
  import {
    QIcon, Ripple, QList, QModal, QBtn, QField, QInput, QRadio, QCollapsible, Toast, QSelect,
    QListHeader, Dialog,
    QItem,
    QItemSeparator,
    QItemSide, QSlider,
    QItemMain, QToolbar, QToolbarTitle,
    QItemTile, QChip
  } from 'quasar'
  import Vue from 'vue'

  var SimpleVueValidation = require('simple-vue-validator');
  var Validator = SimpleVueValidation.Validator;
  Vue.use(SimpleVueValidation);
  import {currencys} from '../js/filter'
  import PullTo from 'vue-pull-to'

  export default {
    name: "mt-list",
    data() {
      return {
        mtList: [],
        mtKey: '',
        serverList: [],
        LeverageList: [],
        leverageIndex: 0,
        apply: {
          mt4_server_id: '',
          name: '',
          email: '',
          leverage: '',
          phone: '',
          address: '',
          loginid: '',
          mtpassword: ''


        }
      }
    },
    components: {
      PullTo,
      QIcon, Ripple, QList, QModal, QBtn, QField, QInput, QRadio, QCollapsible, Toast, QSelect,
      QListHeader, Dialog,
      QItem,
      QItemSeparator,
      QItemSide, QSlider,
      QItemMain, QToolbar, QToolbarTitle,
      QItemTile, QChip
    },
    filters: {
      currencyFilter: function (value) {
        return currencys(value);
      }
    },
    validators: {

      'apply.email': function (value) {
        return Validator.custom(function () {
          if (!Validator.isEmpty(value)) {
            if (!(/^(\w)+(\.\w+)*@(\w)+((\.\w+)+)$/.test(value))) {
              return '邮箱格式错误！'
            }
          } else {
            return '邮箱不能为空！';
          }
        })
      },
      'apply.phone': function (value) {
        return Validator.custom(function () {
          if (!Validator.isEmpty(value)) {
            if (!(/^1[34578]\d{9}$/.test(value))) {
              return '手机号码格式错误！'
            }
          } else {
            return '手机号不能为空！'
          }
        })
      },
      'apply.identity': function (value) {
        let reg = /(^\d{15}$)|(^\d{18}$)|(^\d{17}(\d|X|x)$)/;
        return Validator.custom(function () {
          if (!Validator.isEmpty(value)) {
            if (reg.test(value) === false) {
              return '身份证号码格式错误！';
            }
          }
        })
      },
      'apply.address': function (value) {
        return Validator.custom(function () {
          if (Validator.isEmpty(value)) {
            return '请输入详细地址！'
          }

        })
      },
      'apply.leverage': function (value) {
        return Validator.custom(function () {
          if (Validator.isEmpty(value)) {
            return '请选择杠杆！'
          }

        })
      },
      'apply.name': function (value) {
        return Validator.value(value).required();
      },
      'apply.mt4_server_id': function (value) {
        return Validator.custom(function () {
          if (Validator.isEmpty(value)) {
            return '请选择服务器！'
          }
        })
      },
      'apply.loginid': function (value) {
        return Validator.custom(function () {
          if (Validator.isEmpty(value)) {
            return '请选择MT账号！'
          }
        })
      },
      'apply.mtpassword': function (value) {
        return Validator.custom(function () {
          if (Validator.isEmpty(value)) {
            return '请输入MT密码！'
          }
        })
      }
    },
    methods: {
      bindingMT: function () {
        let self = this;
        this.$validate(['apply.loginid', 'apply.mtpassword', 'apply.mt4_server_id'])
          .then(function (success) {
            if (success) {
              self.$showloading({message: '正在提交…'});
              setTimeout(() => {
                self.$http.post(self.$api.url.bindingMT, {
                  server_id: self.apply.mt4_server_id,
                  loginid: self.apply.loginid,
                  mtpassword: self.apply.mtpassword
                }).then(response => {
                    if (response && response.data.code == 1) {
                      Toast.create.positive({
                        html: response.data.message,
                        timeout: 5000,
                        onDismiss: function () {
                          self.$refs.bindingMTModal.close();
                        }
                      });

                    } else {
                      Toast.create.negative({html: response.data.message, timeout: 5000})
                    }
                    self.$hideloading();
                  }
                ).catch(err => {
                  self.$hideloading();
                  Toast.create.negative({
                    html: err.message
                  });
                });
              }, 1000);
            }
          });
      },
      saveApply: function () {
        let self = this;
        this.$validate(['apply.phone', 'apply.email', 'apply.address', 'apply.leverage', 'apply.name', 'apply.mt4_server_id'])
          .then(function (success) {
            if (success) {
              self.$showloading({message: '正在提交…'});
              setTimeout(() => {
                self.$http.post(self.$api.url.saveapply, self.apply).then(response => {
                    if (response && response.data.code == 1) {
                      Toast.create.positive({
                        html: response.data.message,
                        timeout: 5000,
                        onDismiss: function () {
                          self.$refs.saveApplyModal.close();
                        }
                      });

                    } else {
                      Toast.create.negative({html: response.data.message, timeout: 5000})
                    }
                    self.$hideloading();
                  }
                ).catch(err => {
                  self.$hideloading();
                  Toast.create.negative({
                    html: err.message
                  });
                });
              }, 1000);
            }
          });

      },
      getServerList: function () {
        return this.$http.post(this.$api.url.getServerId, {});
      },
      getMtList: function () {
        return this.$http.post(this.$api.url.mtDetail, {type: 1});
      },
      getLeverageList: function () {
        return this.$http.post(this.$api.url.getLeverageList, {});
      },
      getPersonalData: function () {
        return this.$http.post(this.$api.url.personalData, {});

      },

      refresh: function (done) {
        this.$showloading();
        let self = this;
        self.serverList = [];
        self.LeverageList = [];
        setTimeout(() => {

          self.$http.all([self.getServerList(), self.getMtList(), self.getLeverageList(), self.getPersonalData()]).then(self.$http.spread(function (_serverList, _mtList, _leverageList, _personalData) {
            if (_serverList && _serverList.data.code == 1) {
              _serverList.data.data.forEach((item) => {
                self.serverList.push({label: item.mt4_name, value: item.id});
              });
            } else {
              Toast.create.info({html: _serverList.data.message})
            }
            if (_mtList && _mtList.data.code == 1) {
              self.mtList = _mtList.data.data;
            } else {
              Toast.create.info({html: _mtList.data.message})
            }

            if (_leverageList && _leverageList.data.code == 1) {
              _leverageList.data.data.forEach((item) => {
                self.LeverageList.push({label: item, value: item});
              });
            } else {
              Toast.create.info({html: _leverageList.data.message})
            }
            if (_personalData && _personalData.data.code == 1) {
              self.apply.name = _personalData.data.data.nickname;
              self.apply.email = _personalData.data.data.email;
              self.apply.phone = _personalData.data.data.phone;
              self.apply.address = _personalData.data.data.address;

              //   apply: {
              // mt4_server_id: '',
              //   name: '',
              //   email: '',
              //   leverage: '',
              //   phone: '',
              //   address: '',
              //   loginid: '',
              //   mtpassword: ''


            } else {
              Toast.create.info({html: _personalData.data.message})
            }


            self.$hideloading();
          })).catch(err => {
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
    },
    created: function () {
      this.refresh();
    }
  }
</script>

<style scoped>
  #mtList {
    height: 100%;
    width: 100%;
    display: flex;
    flex-direction: column;
  }

  .mt-body {
    flex: 1;
    overflow: hidden;
    box-sizing: border-box;
  }

  .mt-item:nth-child(even) .list-style {
    padding-left: 2rem;
    background: url("../statics/images/list-style-orange.png") no-repeat left center/1.4rem;
  }

  .mt-item:nth-child(odd) .list-style {
    padding-left: 2rem;
    background: url("../statics/images/list-style-green.png") no-repeat left center/1.4rem;
  }

  .mt-filed {
    padding: 0 1rem;
  }

  .mt-item {
    font-size: 1.4rem;
    line-height: 2.6rem;
    padding-bottom: .5rem;
    margin-top: 1rem;

  }

  .mt-title-wrap {
    padding: 0 1rem;
  }

  .mt-title {
    padding: .8rem 0;
    border-bottom: 1px solid rgb(227, 227, 227);

  }

  .mt-label {
    color: grey;
  }

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

</style>
