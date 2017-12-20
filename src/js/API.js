class API {
	url = {
		login: '/openapi/index/checkLogin',						//登陆
		register:'/openapi/index/register',						//注册
		sendactivemsg: '/openapi/index/sendactivemsg', 			//短信发送验证码
    sendloginmsg: '/openapi/index/sendloginmsg',         //登录验证码
		gettoken: '/openapi/api/get_token',            			//token
		index:'/openapi/index/index',				   			//首页
		articlelList:'/openapi/index/artcitlList',      		//文章列表
		myProperty:'/openapi/member/myProperty',        		//我的资产
		commissionList:'/openapi/deposit/commissionList',		//返佣列表
		followList:'/openapi/follow/index',						//跟单记录
		withdraw:'/openapi/deposit/withdraw',					//佣金提现
		dowithdraw:'/openapi/deposit/dowithdraw',               //佣金提现申请
		depositInList:'/openapi/deposit/addmoney',			    //入金列表
        depositOutList:'/openapi/deposit/outmoney',				//出金列表
        depositDoin:'/openapi/deposit/doin',					//入金申请
        depositDoout:'/openapi/deposit/doout',					//出金申请
        depositIn:'/openapi/deposit/in',						//入金界面
        depositOut:'/openapi/deposit/out',						//出金界面
        getinfee:'/openapi/deposit/getinfee',					//入金手续费
    getoutfee:'/openapi/deposit/getoutfee'            //出金手續費


	}
	appConfig={
		mtserver:3,
		imgcode:'2355',
		appID:'123456',
		appsecret:'abcdefg'
	}

}
export default API;
