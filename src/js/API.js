class API {
	url = {
		login: '/openapi/index/checkLogin',
		sendactivemsg: '/openapi/index/sendactivemsg', 			//短信发送验证码
		gettoken: '/openapi/api/get_token',            			//token
		index:'/openapi/index/index',				   			//首页
		articlelList:'/openapi/index/artcitlList',      		//文章列表
		myProperty:'/openapi/member/myProperty',        		//我的资产
		commissionList:'/openapi/deposit/commissionList',		//返佣列表
		followList:'/openapi/follow/index',						//跟单记录
		withdraw:'/openapi/deposit/withdraw',					//佣金提现
		dowithdraw:'/openapi/deposit/dowithdraw'                //佣金提现申请
		

	}
	appConfig={
		mtserver:3,
		imgcode:'2355',
		appID:'123456',
		appsecret:'abcdefg'
	}

}
export default API;