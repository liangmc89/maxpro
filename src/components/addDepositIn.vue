<template>
  <div class="content-wrapper">
    <div class="content-title">
      <q-toolbar class="text-center" style="background: transparent;height: 4.8rem">
        <q-btn flat icon="keyboard_arrow_left" @click="$router.back()" >
        </q-btn>
        <q-toolbar-title>
          财务-入金申请
        </q-toolbar-title>
        <div style="width: 4rem"></div>
      </q-toolbar>
    </div>
    <div class="content-flex">
      <pull-to :top-load-method="refresh" class="bg-white">

        <div id="addDeposit" class="padding-content">
            <q-field :error="validation.hasError('inlogin')" :error-label="validation.firstError('inlogin')">
              <q-select float-label="入金账号" v-model="inlogin" :options="mtlist" />
            </q-field>
            <q-field :error="validation.hasError('inmoney')" :error-label="validation.firstError('inmoney')">
              <q-input float-label="入金金额（美元）" v-model.lazy.trim="inmoney" clearable type="number" prefix="$" @change='changeInmoney' />
            </q-field>
            <q-input float-label="当前汇率：" :value="exchangerate" type="text" disable readonly/>
            <q-input float-label="需支付（人民币）" v-model="inmoneyrmb" prefix="¥" type="number" disable readonly />
          <q-field :error="validation.hasError('isInfee')" :error-label="validation.firstError('isInfee')">
            <q-input float-label="手续费（$）" v-model="infee" prefix="$" type="number" disable readonly />
          </q-field>
            <q-field :error="validation.hasError('pay')" :error-label="validation.firstError('pay')">
              <q-input float-label="支付方式" v-model="pay.bname" type="text" @click='isOpen=true' />
            </q-field>


            <div class="row no-warp" style="padding: 2rem 0;">
              <q-btn rounded :big="true" class="full-width my-button" @click='doAddDepositIn'>申 请</q-btn>
            </div>

            <q-modal v-model='isOpen' maximized>
              <div class="h-bg my-bg" style="box-sizing: border-box;">
                <h5 class="page-title">选择支付方式</h5>
              </div>
              <div style="flex: 1; box-sizing: border-box;overflow: hidden; ">
                <q-scroll-area style='height: 100%;padding: 1.5rem 1rem'>
                  <q-radio v-model="pay" @focus='isOpen=false' class='radio' v-for="(item,index) in banklist" :val="item" color="secondary" :label="item.bname" :key="index" />
                </q-scroll-area>
              </div>

            </q-modal>
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
		QRadio,
		QModal,
		QScrollArea,
    QToolbar,QToolbarTitle
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
			QRadio,
			QModal,
			QScrollArea,
      QToolbar,QToolbarTitle
		},
		filters: {
			currencys: function(value) {
				return currencys(value);
			},
			percent: function(value) {
				if(value == '') {
					value = 0
				}
				return parseFloat(value).toFixed(2) + '%';
			}
		},
		validators: {

			inlogin: function(value) {
				return Validator.custom(function () {
          if(Validator.isEmpty(value)) {
            return '请选择出金账号！'
          }
        });
			},
      isInfee:function (value) {
        return Validator.custom(function () {
        if(!value){
          return '未能刷新入金手续费，请重新输入入金金额后再试！'
        }})
      },
			inmoney: function(value) {
        let self=this;
        return Validator.custom(function () {
          if(Validator.isEmpty(value)) {
            return '请输入入金金额！'
          }
          if(value<=0){
            return '入金金额必须大于0 ！'
          }
          if(value<=self.infee){
            return '入金金额必须大于入金的手续费 ！'
          }
        });


			}, //入金金额

			pay: function(value) {
				return Validator.custom(function() {
					if(value.inmoneytype == null || value.inmoneytype == 'undefined' || Validator.isEmpty(value.inmoneytype)) {
						return '请选择支付方式！'
					}
				});
			}

		},
		computed: {
			inmoneyrmb: function() {
				return parseFloat(this.inmoney * this.exchangerate * 1000 / 1000).toFixed(2);
			}, //人民币金额，
		},
		methods: {
			changeInmoney(newVal) {
				let self = this;
        if(newVal!=''&&newVal!=0&&newVal!=null){
          self.$http.post(self.$api.url.getinfee, {
            'number': newVal
          }).then(response => {
            if(response && response.data.code == 1) {
              self.infee = response.data.data;
              self.isInfee=true;
              self.$validate();
            } else {
              self.isInfee=false;
              Toast.create.negative({
                html: response.data.message
              });
            }

          }).catch(err => {
            self.isInfee=false;
            Toast.create.negative({
              html: err.message
            });
          });
        }

			},
			doAddDepositIn() {
				let self = this;
				this.$validate()
					.then(function(success) {
						if(success) {
						  self.$showloading({message:'正在提交…'});
						  setTimeout(()=>{
                self.$http.post(self.$api.url.depositDoin, {
                  inlogin: self.inlogin,
                  inmoney: self.inmoney,
                  inmoneytype: self.pay.inmoneytype,
                  inmoneyrmb: self.inmoneyrmb,
                  pay_id: self.pay.id,
                  bankid: self.pay.bankno
                }).then(response => {
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
                  Toast.create.negative({
                    html: err.message
                  });
                });
                self.$hideloading();
              },1000);

						}
					});
			},
			refresh(done) {
				this.mtlist = [];
				this.exchangerate = '';
				this.banklist = [];
				this.isInfee=false;
				let self = this;
				self.$showloading();
				this.timeout = setTimeout(() => {
					self.$http.post(self.$api.url.depositIn, {}).then(response => {
						if(response.data.code == 1) {
							self.exchangerate = response.data.data.exchangerate;
							let bl = response.data.data.banklist;
							for(let i in bl) {
								bl[i].bankinfo.forEach(function(item, index) {
									item.inmoneytype = bl[i].paycode;
									self.banklist.push(item);
								});
							}
							let ml = response.data.data.mtlist;

							for(let i in ml) {
								let obj = {};
								obj.label = ml[i];
								obj.value = ml[i];
								self.mtlist.push(obj);
							}

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
					if(done) {
						done();
					}
          self.$hideloading();
				}, 1000)
			}

		},

		data() {
			return {
				isOpen: false,
				inlogin: '',
				mtlist: [],
				exchangerate: 0, //当前汇率
				banklist: [],
				inmoney: 0, //入金金额
				inmoneytype: '', //支付方式，
				pay: {},
				infee:0, //手续费
        isInfee:false //是否成功刷新手续费

			}
		},
		mounted: function() {
			this.refresh();
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
	}

	.radio {
		padding: .4rem;
	}

	.modal-content {
		display: flex;
		flex-direction: column;
	}
</style>
