<template>
	<div id="login">
		<div class="logo">
			<img src="../statics/images/logo.png" />
		</div>
		<div class="login-form">
			<div v-show='loginType=="1"'>
				<q-field :error-label="validation.firstError('phoneNum')" class='my-field'>
					<q-input type="number" placeholder="手机号码" v-model="phoneNum" :clearable="true" key='phoneInput' :error="validation.hasError('phoneNum')" />
				</q-field>
				<q-field class="pass my-field" :error-label="validation.firstError('code')">
					<q-input type="text" placeholder="短信验证码" v-model="code" :clearable="true" key='phonepwdInput' :error="validation.hasError('code')" />
					<q-btn class='sendHelp' color="primary" :flat='true' :disable="isEnableSend" @click="getValidateNum">{{validateHelpText}}</q-btn>
				</q-field>

			</div>

			<div v-show='loginType=="3"'>
				<q-field :error-label="validation.firstError('email')" class='my-field'>
					<q-input type="text" placeholder="电子邮箱" v-model="email" :clearable="true" key='emailInput' :error="validation.hasError('email')" />
				</q-field>
				<q-field class="pass my-field" :error-label="validation.firstError('password')">
					<q-input type="password" placeholder="请输入密码" v-model="password" :clearable="true" key='emailpwdInput' :error="validation.hasError('password')" />
				</q-field>

			</div>

			<div v-show='loginType=="2"'>
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
				<q-btn :small="true" :flat="true" @click="$router.push('/register')" >注册账号</q-btn>
			</div>

		</div>
		<div class="login-toggle">
			<p class="or">or</p>
			<div class="toggle-btn">
				<q-btn round class='phone-btn' @click="toggleLoginType('1')"></q-btn>
			</div>
			<div class="toggle-btn">
				<q-btn round class='email-btn' @click="toggleLoginType('3')"></q-btn>
			</div>
			<div class="toggle-btn">
				<q-btn round class='mt-btn' @click="toggleLoginType('2')"></q-btn>
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
				mtId: '887710',
				email: '',
        code:'',
				account: '887710',
				password: 'abcd1234',
				isLogining: false,
				isEnableSend: false,
				curSecond: 0,
				loginType: '1',
				validateArray: ['phoneNum', 'password'],
        login_type:"",
        login_account:''
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
      code:function(value) {
        return Validator.value(value).required();
      },
			mtId: function(value) {
				return Validator.value(value).required();
			},
			password: function(value) {
				return Validator.value(value).required();
			}

		},

		computed: {
			validateHelpText: function() {
				let text = '';
				if(this.curSecond > 0) {
					text = this.curSecond + ' 秒后可重新发送';
				} else {
					text = '获取验证码';
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

							self.$http.post(self.$api.url.sendloginmsg, {
								phone: self.phoneNum,
								mtserver: self.$api.appConfig.mtserver,
								imgcode: self.$api.appConfig.imgcode
							}).then(function(response) {
								if(response.data.code == 1) {
									Toast.create.positive({
										html: '短信发送成功！'
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
				if(type == '1') {
					this.validateArray = ['phoneNum', 'code'];
				} else if(type == '3') {

					this.validateArray = ['email', 'password'];
				} else if(type == '2') {
					this.validateArray = ['mtId', 'password'];
				}

			},
			login: function() {

        if(this.loginType == '1') {
          this.login_type=this.loginType;
          this.login_account=this.phoneNum;

        } else if(this.loginType=='3') {
          this.login_type='2';
          this.login_account=this.email;

        } else if(this.loginType == '2') {
          this.login_type=this.loginType;
          this.login_account=this.account;

        }

				let self = this;
				this.$validate(this.validateArray)
					.then(function(success) {
						if(success) {
              self.$showloading({message:'正在登陆…'})
						  setTimeout(()=>{


                self.$http.post(self.$api.url.login, {
                  account: self.login_account,
                  password: self.password,
                  type:self.login_type,
                  code:self.code
                }).then(response => {

                  if(response.data.code == 1) {

                    self.$http.post(self.$api.url.gettoken, {
                      appID: self.$api.appConfig.appID,
                      appsecret: self.$api.appConfig.appsecret,
                      userid: response.data.data.id,
                      password: response.data.data.password
                    }).then(response => {
                      if(response.data.code == 1) {
                         self.$hideloading();
                        setCookie('token',response.data.data,'h1.5');
                        self.$router.push('/maxpro');

                      } else {
                         self.$hideloading();
                        Toast.create.negative({
                          html: response.data.message
                        });
                      }
                    }).catch(err => {
                      self.$hideloading();
                      Toast.create.negative({
                        html: err.message
                      });
                    });


                  } else {
                     self.$hideloading();
                    Toast.create.negative({
                      html: response.data.message
                    });
                  }

                }).catch(err => {
                   self.$hideloading();
                  Toast.create.negative({
                    html: err.message
                  });
                });
              },1000)


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

		.login-toggle {
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
