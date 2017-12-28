class API {
	url = {

	  //-----------------公共接口---------------------
    baseURI:'http://ib.fxclouds.com',                         //baseUrl
    upload:'/openapi/index/upload',                           //上传图片
    logout:'/openapi/index/logout',                           //退出系统

	  //-----------------个人中心---------------------
    getServerId:'/openapi/index/getServerId',                 //获取平台ID列表
    getMtList:'/openapi/index/getMtList',                     //获取该用户所有MT账号
    mtProfit:'/openapi/member/mtProfit',                      //根据MT账号获取该账号总盈亏
    myAllCard:'/openapi/member/myAllCard',                    //获取用户所有银行卡
    addBankCard:'/openapi/member/addBankCard',                //用户新增银行卡
    promoCode:'/openapi/member/promoCode',                    //获取用户推广码
    personalData:'/openapi/member/personalData',              //获取个人资料
    editPersonalData:'/openapi/member/editPersonalData',      //修改个人资料
    passwordAgain:'/openapi/member/passwordAgain',            //修改登录密码
    resetAccoutPwd:'/openapi/member/resetAccoutPwd',          //修改MT密码
    mtDetail:'/openapi/member/mtDetail',                      //获取全部mt账号详情
    memberIndex:'/openapi/member/index',                      //用户个人中心
    saveapply:'/openapi/index/saveapply',                     //申请开户

    //-----------------登录、注册-------------------------
		login: '/openapi/index/checkLogin',						            //登陆
		register:'/openapi/index/register',						            //注册
		sendactivemsg: '/openapi/index/sendactivemsg', 			      //短信发送验证码
    sendloginmsg: '/openapi/index/sendloginmsg',              //登录验证码
		gettoken: '/openapi/api/get_token',            			      //token

    //-----------------首页-------------------------------
		index:'/openapi/index/index',				   			              //首页
		articlelList:'/openapi/index/artcitlList',      		      //文章列表

    //-----------------资产--------------------------------
		myProperty:'/openapi/member/myProperty',        		      //我的资产
		commissionList:'/openapi/deposit/commissionList',		      //返佣列表
		followList:'/openapi/follow/index',						            //跟单记录
		withdraw:'/openapi/deposit/withdraw',					            //佣金提现
		dowithdraw:'/openapi/deposit/dowithdraw',                 //佣金提现申请
		depositInList:'/openapi/deposit/addmoney',			          //入金列表
    depositOutList:'/openapi/deposit/outmoney',				        //出金列表
    depositDoin:'/openapi/deposit/doin',					            //入金申请
    depositDoout:'/openapi/deposit/doout',					          //出金申请
    depositIn:'/openapi/deposit/in',						              //入金界面
    depositOut:'/openapi/deposit/out',						            //出金界面
    getinfee:'/openapi/deposit/getinfee',					            //入金手续费
    getoutfee:'/openapi/deposit/getoutfee'                    //出金手續費


	}
	appConfig={
		mtserver:3,
		imgcode:'2355',
		appID:'123456',
		appsecret:'abcdefg'
	}

}
export default API;
