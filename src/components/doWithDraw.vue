<template>
	<pull-to :top-load-method="refresh" id='pullto'>
		<div id="myProperty">
			<div class="h-bg">
				<h5 class="page-title">佣金提现</h5>
			</div>

			<div class="section padding-content">
				<div class="row no-wrap">
					<div class="col-4 relative-position">
						<span class="lbl">服  务  器</span>
					</div>
					<div class="col-8">
						<q-field>
							<q-input type="text" readonly :value='withDraw.server_name' disable/>
						</q-field>
					</div>
				</div>

				<div class="row no-wrap">
					<div class="col-4 relative-position"><span :class='["lbl",{errlbl:validation.hasError("amount")}]'>提现金额</span></div>
					<div class="col-8">
						<q-field autofocus :error-label="validation.firstError('amount')" class='my-field'>
							<q-input type="number" placeholder='' class='amount' prefix='$' v-model="amount" :clearable="true" :error="validation.hasError('amount')" />
						</q-field>
					</div>

				</div>
				<div class="row no-wrap">
					<div class="col-4 relative-position"><span class='lbl'>最高额度</span></div>
					<div class="col-8">
						<q-field>
							<q-input readonly type="text" :value='maxAmount' disable />
						</q-field>
					</div>
				</div>

				<div class="row no-wrap">
					<div class="col-4 relative-position"><span class='lbl'>MT账号</span></div>
					<div class="col-8">
						<q-field>
							<q-input readonly type="text" :value='withDraw.login' disable />
						</q-field>
					</div>
				</div>

				<div class="row no-wrap">
					<div class="col-4 relative-position"><span :class='["lbl",{errlbl:validation.hasError("password")}]'>交易密码</span></div>
					<div class="col-8">
						<q-field :error-label="validation.firstError('password')">
							<q-input type="password" v-model="password" :clearable="true" key='mtpwdInput' :error="validation.hasError('password')" />
						</q-field>
					</div>
				</div>

			</div>
			<div style="padding: 4rem;">
				<q-btn :disable='isDisable' rounded :big="true" class="full-width my-button" @click='doWithDraw'>提 现</q-btn>
			</div>

		</div>

	</pull-to>
</template>

prefix

<script>
	import { QField, QInput, Toast, Ripple, QIcon, QPopover, QList, QItem, QBtn, QSelect } from 'quasar'
	import PullTo from 'vue-pull-to'
	import { currencys } from '../js/filter'
	import Vue from 'vue'
	var SimpleVueValidation = require('simple-vue-validator');
	var Validator = SimpleVueValidation.Validator.create({
		templates: {
			required: '字段不能为空！',
			between: '金额必须介于 {0} 和 {1} 之间。'

		}
	});
	Vue.use(SimpleVueValidation);
	export default {
		directives: {
			Ripple
		},
		data() {
			return {
				withDraw: {
					amount:0
				},
				amount: 0.00,
				password: '',
                isDisable:false
			}
		},
		validators: {
			password: function(value) {
				return Validator.value(value).required();
			},
			amount: function(value) {
				return Validator.value(value).required().between(1, parseFloat(this.withDraw.amount));
			}

		},
		components: {
			Toast,
			PullTo,			
			QIcon,
			QPopover,
			QList,
			QItem,
			QBtn,
			QInput,
			QSelect,
			QField

		},
		computed: {
			maxAmount: function() {
				return currencys(this.withDraw.amount);
			}
		},
		methods: {
			refresh: function(done) {
				let self = this;
				self.$http.post(self.$api.url.withdraw, {}).then(response => {

					if(response.data.code == 1) {
						self.withDraw = response.data.data;
					} else {
						self.isDisable=true;
						Toast.create.negative({
							html: response.data.message
						});
					}
				}).catch(err => {
					self.isDisable=true;
					Toast.create.negative({
						html: err.message
					});
				});
				if(done) {
					done();
				}

			},
			doWithDraw: function() {
				let self = this;
				this.$validate()
					.then(function(success) {
						if(success) {

							self.$http.post(self.$api.url.dowithdraw, {
								amount: self.amount,
								mt4server: self.withDraw.server_id,
								mt4login: self.withDraw.login,
								password: self.password
							}).then(response => {
								let ar;
								if(response.data.code == 1) {
									ar = {
										type: 'success',
										message: response.data.message
									};

								} else {
									ar = {
										type: 'fail',
										message: response.data.message
									}
								}
								self.$router.push({
									name: 'actionResult',
									params: {
										actionResult: ar
									}
								});
							}).catch(err => {
								Toast.create.negative({
									html: err.message
								});
							});
						}
					});
			}
		},
		filters: {
			currencyFilter: function(value) {
				return currencys(value);
			}
		},
		mounted: function() {
			this.refresh();
		}
	}
</script>

<style>
	.property-subtitle {
		padding: 1.2rem;
		text-align: center;
		margin: 0 1.2rem .5rem 1.2rem;
		font-size: 1.8rem;
		border-bottom: 1px solid rgb(227, 227, 227);
	}
	
	.errlbl {
		height: 52% !important;
	}
	
	.lbl {
		padding-left: 10%;
		width: 100%;
		height: 30%;
		margin: auto;
		position: absolute;
		top: 0%;
		left: 0;
		bottom: 0;
		right: 0;
		font-size: 16px;
		text-align: left;
	}
	
	.amount {
		/*font-size: 2rem;*/
	}
</style>