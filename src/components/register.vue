<template>
	<div id="register" class="bg-white">
		<div class="logo">
			<img src="../statics/images/logo.png" />
		</div>
		<div class="login-form">
			<q-tabs inverted>
				<q-tab default slot="title" name="phoneRegist" label='手机注册' @click='setTab(0)' />
				<q-tab slot="title" name="emailRegist" label='邮箱注册' @click='setTab(1)' />
				<q-tab-pane name="phoneRegist">
					<q-field :error-label="validation.firstError('p_mtserver')">
						<q-select float-label="平台" v-model="p_mtserver" :error="validation.hasError('p_mtserver')" :options="[
            {label: 'Bucharest', value: 'bucharest'},
            {label: 'London', value: 'london'},
            {label: 'Paris', value: 'paris'}
          ]" />

					</q-field>
					<q-field :error-label="validation.firstError('phone')">
						<q-input type="number" float-label='手机号码' v-model="phone" :clearable="true" :error="validation.hasError('phone')" />
					</q-field>
					<q-field class='relative-position' :error-label="validation.firstError('phone_code')">
						<q-input type="text" float-label='验证码' v-model="phone_code" :clearable="true" :error="validation.hasError('phone_code')" />
						<q-btn class='sendHelp' color="primary" :flat='true' :disable="isEnableSend" @click="getValidateNum">{{validateHelpText}}</q-btn>
					</q-field>
					<q-field :error-label="validation.firstError('register_invent_codes')">
						<q-input type="text" float-label='推荐码' v-model="register_invent_codes" :clearable="true" :error="validation.hasError('register_invent_codes')" />
					</q-field>
				</q-tab-pane>

				<q-tab-pane name="emailRegist">

					<q-field :error-label="validation.firstError('e_mtserver')">
						<q-select float-label="平台" v-model="e_mtserver" :error="validation.hasError('e_mtserver')" :options="[
            {label: 'Bucharest', value: 'bucharest'},
            {label: 'London', value: 'london'},
            {label: 'Paris', value: 'paris'}
          ]" />

					</q-field>
					<q-field :error-label="validation.firstError('email')">
						<q-input type="text" float-label='Email' v-model="email" :clearable="true" :error="validation.hasError('email')" />
					</q-field>

					<q-field :error-label="validation.firstError('password')">
						<q-input type="password" float-label='密码' v-model="password" :clearable="true" :error="validation.hasError('password')" />
					</q-field>

					<q-field :error-label="validation.firstError('repassword')">
						<q-input type="password" float-label='确认密码' v-model="repassword" :clearable="true" :error="validation.hasError('repassword')" />
					</q-field>

					<!--<q-field class='relative-position' :error-label="validation.firstError('e_code')">
						<q-input type="text" float-label='激活码' v-model="e_code" :clearable="true" :error="validation.hasError('e_code')" />
						<q-btn class='sendHelp' color="primary" :flat='true' :disable="isEnableSend" @click="getValidateNum">{{validateHelpText}}</q-btn>
					</q-field>-->
					<q-field :error-label="validation.firstError('e_register_invent_codes')">
						<q-input type="text" float-label='推荐码' v-model="e_register_invent_codes" :clearable="true" :error="validation.hasError('e_register_invent_codes')" />
					</q-field>
				</q-tab-pane>
			</q-tabs>
			<q-btn rounded style="margin-top: 1rem" class="full-width my-button" :disable="isLogining" @click='regist'>注 册</q-btn>

		</div>

	</div>
</template>

<script>
	import Vue from 'vue'
	import { setCookie } from '../js/cookie.js'
	var SimpleVueValidation = require('simple-vue-validator');
	var Validator = SimpleVueValidation.Validator.create({
		templates: {
			required: '字段不能为空！',
			email: 'Email格式不正确！',
			match: '密码不一致！'

		}
	});
	Vue.use(SimpleVueValidation);

	import { QSelect, QList, QItem, Toast, QBtn, QIcon, QField, QInput, Loading, QSpinnerFacebook, QTabs, QTab, QTabPane, Dialog } from 'quasar'
	import { required, email } from 'vuelidate/lib/validators'
	export default {
		data() {
			return {
				p_mtserver: '',
				phone: '',
				phone_code: '',
				register_invent_codes: '',

				e_mtserver: '',
				email: '',
				password: '',
				repassword: '',
				e_register_invent_codes: '',
				registerType: 0,

				submitted: false,
				isLogining: false,
				isEnableSend: false,
				curSecond: 0,
				validateArray: [
					['p_mtserver', 'phone', 'phone_code'],
					['e_mtserver', 'email', 'password', 'repassword']
				]

			}
		},
		validators: {
			p_mtserver: function(value) {
				return Validator.value(value).required();
			},
			e_mtserver: function(value) {
				return Validator.value(value).required();
			},
			password: function(value) {
				return Validator.custom(function () {
          if(!Validator.isEmpty(value)){
            if(!(/^(?=.*[0-9].*)(?=.*[A-Z].*)(?=.*[a-z].*).{6,16}$/.test(value))){
              return '密码必须是6-16位大小写字母和数字组合！'
            }
          }else{
            return '密码不能为空！'
          }
        })
			},
			'repassword, password': function(repassword, password) {
				if(this.submitted || this.validation.isTouched('repassword')) {
					return Validator.value(repassword).required().match(password);
				}
			},
			email: function(value) {
				return Validator.value(value).required().email();
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
			phone_code: function(value) {
				return Validator.value(value).required();
			},

		},

		computed: {
			validateHelpText: function() {
				let text = '';
				if(this.curSecond > 0) {
					text = this.curSecond + ' 秒后可重新发送';
				} else {
					text = '获取动态密码';
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
			QItem

		},

		methods: {

			setTab: function(val) {
				this.registerType = val;
			},
			getValidateNum: function() {
				let self = this;
				this.$validate('phone')
					.then(function(success) {
						if(success) {
							self.$http.post(self.$api.url.sendactivemsg, {
								phone: self.phone,
								mtserver: self.$api.appConfig.mtserver,
								imgcode: self.$api.appConfig.imgcode
							}).then(function(response) {
								if(response.data.code == 1) {
									Toast.create.positive({
										html: '短信发送成功！'
									});

									self.isEnableSend = true;
									const limt = 60;
									self.curSecond = limt;
									var intervalId = setInterval(function() {
										self.curSecond--;
										if(self.curSecond == 0) {
											clearInterval(intervalId);
											self.isEnableSend = false;
										}
									}, 1000);
								} else {
									Toast.create({
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
			regist: function() {
				this.submitted = true;
				let self = this;
				this.$validate(this.validateArray[self.registerType])
					.then(function(success) {
						if(success) {

							let params = {};

							if(self.registerType == 0) {
                  params.mtserver= self.$api.appConfig.mtserver;
                  params.type= self.registerType + 1;
                  params.phone= self.phone;
                  params.phone_code= self.phone_code;
                  params.register_invent_codes= self.register_invent_codes;

							} else {
                params.mtserver=self.$api.appConfig.mtserver;
                params.type=self.registerType + 1;
                params.email=self.email;
                params.password=self.password;
                params.repassword=self.repassword;
                params.register_invent_codes=self.register_invent_codes

							}
							self.$http.post(self.$api.url.register, params).then(response => {
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
                          self.$router.push({name:'login',params:{loginParams:{loginType:self.registerType,email:self.email,phone:self.phone}}});
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
		mounted() {

		}

	}
</script>

<style lang="less">
	#register {
		padding: 3rem;
		width: 100%;
		height: 100%;
		.logo {
			padding: 3rem;
			text-align: center;
			img {
				width: 7rem;
				height: auto;
			}
		}
		.q-tab-pane {
			padding: 0;
			border: none;
		}
		.login-help {
			text-align: center;
		}
		.sendHelp {
			position: absolute;
			bottom: 0;
			right: 4.5rem;
			font-size: 1.6rem;
		}
	}
</style>
