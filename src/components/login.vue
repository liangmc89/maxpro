<template>
	<div id="login">
		<div class="logo">
			<img src="../statics/images/logo.png" />
		</div>
		<div class="login-form">
			<div v-show='loginType=="phone"'>
				<q-field :error-label="validation.firstError('phoneNum')" class='my-field'>
					<q-input type="number" placeholder="手机号码" v-model="phoneNum" :clearable="true" key='phoneInput' :error="validation.hasError('phoneNum')" />
				</q-field>
				<q-field class="pass my-field" :error-label="validation.firstError('password')">
					<q-input type="password" placeholder="请输入动态密码" v-model="password" :clearable="true" key='phonepwdInput' :error="validation.hasError('password')" />
					<q-btn class='sendHelp' color="primary" :flat='true' :disable="isEnableSend" @click="getValidateNum">{{validateHelpText}}</q-btn>
				</q-field>

			</div>

			<div v-show='loginType=="email"'>
				<q-field :error-label="validation.firstError('email')" class='my-field'>
					<q-input type="text" placeholder="电子邮箱" v-model="email" :clearable="true" key='emailInput' :error="validation.hasError('email')" />
				</q-field>
				<q-field class="pass my-field" :error-label="validation.firstError('password')">
					<q-input type="password" placeholder="请输入密码" v-model="password" :clearable="true" key='emailpwdInput' :error="validation.hasError('password')" />
				</q-field>

			</div>

			<div v-show='loginType=="mt"'>
				<q-field :error-label="validation.firstError('mtId')" class='my-field'>
					<q-input type="text" placeholder="MT账号" v-model="mtId" :clearable="true" key='mtInput' :error="validation.hasError('mtId')" />
				</q-field>
				<q-field class="pass my-field" :error-label="validation.firstError('password')">
					<q-input type="password" placeholder="请输入密码" v-model="password" :clearable="true" key='mtpwdInput' :error="validation.hasError('password')" />
				</q-field>
			</div>
			<q-btn rounded :big="true" class="full-width my-button" :disable="isLogining" @click='login'>登录</q-btn>
			<div class="login-help">
				<q-btn :small="true" :flat="true">忘记密码</q-btn>|
				<q-btn :small="true" :flat="true">注册账号</q-btn>
			</div>

		</div>
		<div class="login-toggle">
			<p class="or">or</p>
			<div class="toggle-btn">
				<q-btn round class='phone-btn' @click="toggleLoginType('phone')"></q-btn>
			</div>
			<div class="toggle-btn">
				<q-btn round class='email-btn' @click="toggleLoginType('email')"></q-btn>
			</div>
			<div class="toggle-btn">
				<q-btn round class='mt-btn' @click="toggleLoginType('mt')"></q-btn>
			</div>

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
			email: 'Email格式不正确！'

		}
	});
	Vue.use(SimpleVueValidation);

	import { Toast,QBtn, QIcon, QField, QInput, Loading, QSpinnerFacebook } from 'quasar'
	import { required, email } from 'vuelidate/lib/validators'	
	export default {
		data() {
			return {
				phoneNum: '',
				mtId: '887735',
				email: '',
				account: '887735',
				password: 'Ss123456',
				isLogining: false,
				isEnableSend: false,
				curSecond: 0,
				loginType: 'phone',
				accountErrText: '',
				passwordErrText: '',
				validateArray: ['phoneNum', 'password'],
				loginMessage: '正在登陆...'
			}
		},
		validators: {

			email: function(value) {
				return Validator.value(value).required().email();
			},
			phoneNum: function(value) {
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
			mtId: function(value) {
				return Validator.value(value).required();
			},
			password: function(value) {
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
			Toast
		},

		methods: {
			getValidateNum: function() {
				let self = this;
				this.$validate('phoneNum')
					.then(function(success) {
						if(success) {

							self.$http.post(self.$api.url.sendactivemsg, {
								phone: self.phoneNum,
								mtserver: self.$api.appConfig.mtserver,
								imgcode: self.$api.appConfig.imgcode
							}).then(function(response) {
								console.log(response);
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
								}else{
									Toast.create({
										html:response.data.message
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
			toggleLoginType: function(type) {
				this.loginType = type;
				if(type == 'phone') {
					this.validateArray = ['phoneNum', 'password'];
				} else if(type == 'email') {
					this.validateArray = ['email', 'password'];
				} else if(type == 'mt') {
					this.validateArray = ['mtId', 'password'];
				}

			},
			login: function() {
				let self = this;
				this.$validate(this.validateArray)
					.then(function(success) {
						if(success) {
							Loading.show({
								spinner: QSpinnerFacebook,
								message: self.loginMessage,
								dalay: 3000
							});

							self.$http.post(self.$api.url.login, {
								account: self.account,
								password: self.password
							}).then(response => {
								
								if(response.data.code == 1) {
                                   
									self.$http.post(self.$api.url.gettoken, {
										appID: self.$api.appConfig.appID,
										appsecret: self.$api.appConfig.appsecret,
										userid: response.data.data.id,
										password: self.password
									}).then(response => {
										if(response.data.code == 1) {
                                             self.loginMessage = '登陆成功';                                             
                                             setCookie('token',response.data.data,'h1.5'); 
                                             self.$router.push('/maxpro');
                                             
										} else {
											Toast.create.negative({
												html: response.data.message
											});
										}
									}).catch(err => {
										Toast.create.negative({
											html: err.message
										});
									});

									
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
			}

		},
		mounted() {

		}

	}
</script>

<style lang="less">
	#login {
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
		.my-field {
			height: 6rem;
		}
		.login-help {
			text-align: center;
		}
		.pass {
			position: relative;
		}
		.sendHelp {
			position: absolute;
			top: -.5rem;
			right: 4.5rem;
			font-size: 1.6rem;
		}
		.my-button {
			background: linear-gradient(to right, #f55970, #f4883b);
			color: white;
			letter-spacing: .4rem;
		}
		.login-toggle {
			margin-top: 6rem;
			text-align: center;
			.or {}
			.toggle-btn {
				width: 32%;
				display: inline-block;
				.phone-btn {
					background: url(../statics/images/phone-login.png) no-repeat center;
				}
				.mt-btn {
					background: url(../statics/images/mt-login.png) no-repeat center;
				}
				.email-btn {
					background: url(../statics/images/email-login.png) no-repeat center;
				}
			}
		}
	}
</style>