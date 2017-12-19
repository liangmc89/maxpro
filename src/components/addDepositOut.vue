<!--<template>
	<pull-to :top-load-method="refresh" class="bg-white">
		<div id="addDeposit">
			<div class="h-bg my-bg">
				<h5 class="page-title">入金申请</h5>
			</div>
			<div class="padding-content">
				<div class="row no-wrap">
					<div class="col-5 f-label"><span class="lb">出金金额（美元）：</span></div>
					<div class="col-7">
						<q-field :error="validation.hasError('number')" :error-label="validation.firstError('inmoney')">
							<q-input v-model.lazy.trim="number" clearable type="number" prefix="$" @change='changenumber' />
						</q-field>
					</div>
				</div>
				<div class="row no-wrap">
					<div class="col-5 f-label"><span class="lb">手续费（$）：</span></div>
					<div class="col-7">
						<q-input v-model="Outfee" prefix="$" type="number" disable readonly /></div>
				</div>
				<div class="row no-wrap">
					<div class="col-5 f-label"><span class="lb">出金方式：</span></div>
					<div class="col-7">
						<q-field :error="validation.hasError('radioInline')" :error-label="validation.firstError('radioInline')">
							<q-radio v-model="radioInline" v-for='(item,index) ind radioInlineList'  val="item.value" label="item.label" />
						</q-field>
					</div>
				</div>
				
				<div class="row no-wrap">
					<div class="col-5 f-label"><span class="lb">开户行：</span></div>
					<div class="col-7">
						<q-field :error="validation.hasError('bankname')" :error-label="validation.firstError('bankname')">
							<q-input v-model="bankname"  type="text"  /></div>
						</q-field>
					</div>
				</div>
				<div class="row no-wrap">
					<div class="col-5 f-label"><span class="lb">收款人姓名：</span></div>
					<div class="col-7">
						<q-field :error="validation.hasError('forwordname')" :error-label="validation.firstError('forwordname')">
							<q-input v-model="forwordname"  type="text"  /></div>
						</q-field>
					</div>
				</div>
				<div class="row no-wrap">
					<div class="col-5 f-label"><span class="lb">银行账号：</span></div>
					<div class="col-7">
						<q-field :error="validation.hasError('bankaccount')" :error-label="validation.firstError('bankaccount')">
							<q-input v-model="bankaccount"  type="number"  /></div>
						</q-field>
					</div>
				</div>
				

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
							self.$http.post(self.$api.url.depositDoOut, {
								
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
						}
					});
			},
			refresh(done) {
			    
				let self = this;
				this.timeout = setTimeout(() => {
					self.$http.post(self.$api.url.depositOut, {
						
					}).then(response => {
						if(response.data.code == 1) {
							 

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

				}, 2000)
			}

		},

		data() {
			return {
				
				
				radioinlineList:[]
				radioInline:'',
				accountList:[]
				
				
				

			}
		},
		created: function() {
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
</style>-->