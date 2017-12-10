class API {
	url = {
		login: '/openapi/index/checkLogin',
		sendactivemsg: '/openapi/index/sendactivemsg', //短信发送验证码
		gettoken: '/openapi/api/get_token',            //token
		index:'/openapi/index/index',				   //首页
		articlelList:'/openapi/index/artcitlList'

	}
	appConfig={
		mtserver:3,
		imgcode:'2355',
		appID:'123456',
		appsecret:'abcdefg'
	}

}
export default API;