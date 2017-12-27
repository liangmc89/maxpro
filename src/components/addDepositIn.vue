<template>
	<pull-to :top-load-method="refresh" class="bg-white">
		<div id="addDeposit">
			<div class="h-bg my-bg">
				<h5 class="page-title">入金申请</h5>
			</div>
			<div style="padding: 1.5rem">

						<q-field :error="validation.hasError('inlogin')" :error-label="validation.firstError('inlogin')">
							<q-select float-label="入金账号" v-model="inlogin" :options="mtlist" />
						</q-field>
						<q-field :error="validation.hasError('inmoney')" :error-label="validation.firstError('inmoney')">
							<q-input float-label="入金金额（美元）" v-model.lazy.trim="inmoney" clearable type="number" prefix="$" @change='changeInmoney' />
						</q-field>
						<q-input float-label="当前汇率：" :value="exchangerate" type="text" disable readonly/>
						<q-input float-label="需支付（人民币）" v-model="inmoneyrmb" prefix="¥" type="number" disable readonly />
						<q-input float-label="手续费（$）" v-model="infee" prefix="$" type="number" disable readonly />
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
		QRadio,
		QModal,
		QScrollArea
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
			QScrollArea
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
				return Validator.value(value).required();
			},

			inmoney: function(value) {
				return Validator.value(value).required().greaterThan(0);
			}, //入金金额

			pay: function(value) {
				return Validator.custom(function() {
					if(value.inmoneytype == null || value.inmoneytype == 'undefined' || Validator.isEmpty(value.inmoneytype)) {
						return '未选择支付方式！'
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
				return;
				let self = this;
				console.log(newVal)
				self.$http.post(self.$api.url.getinfee, {
					'number': newVal
				}).then(response => {
					if(response && response.code == 1) {
						self.infee = response.data.data;
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
                  if(response.code == 1) {
                    console.log(response);
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
                self.$hideloading();
              },1000);

						}
					});
			},
			refresh(done) {
				this.mtlist = [];
				this.exchangerate = '';
				this.banklist = [];
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
				infee: 100 //手续费

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
