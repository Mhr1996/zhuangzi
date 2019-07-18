import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import Http from './assets/js/axios'
import Tool from './assets/js/tool'
import './assets/css/reset.css';
import './assets/css/border.css';
import { Popup , Stepper , Dialog , Toast , Badge, BadgeGroup , DatetimePicker , Area , Loading , List , Swipe, SwipeItem , Lazyload ,ImagePreview} from 'vant';
import 'vant/lib/index.css';

Vue.config.productionTip = false
Vue.use(Popup).use(Stepper).use(Dialog).use(Toast).use(Badge).use(BadgeGroup).use(DatetimePicker).use(Area).use(Loading).use(List).use(Swipe).use(SwipeItem).use(Lazyload).use(ImagePreview);	

Vue.prototype.$http = Http
Vue.prototype.$tool = Tool

//设置title
import VueWechatTitle from 'vue-wechat-title'
Vue.use(VueWechatTitle)

router.beforeEach((to, from, next) => {
	/* 路由发生变化修改页面title */
	if (to.meta.title) {
		document.title = to.meta.title
	}

	// let url = window.location.href;
	// if (!Tool.getStore('loginStatus') || Tool.getStore('loginStatus') == 0) {
	// 	//微信未授权登录跳转到授权登录页面
	// 	Tool.setStore('s0url', url)
	// 	Tool.setStore('loginStatus', 1)
	// 	window.location.replace(`https://open.weixin.qq.com/connect/oauth2/authorize?appid=wxc72b57ad73571b5c&redirect_uri=${encodeURIComponent(url)}&response_type=code&scope=snsapi_userinfo&state=1#wechat_redirect`)
	// }else if(Tool.getStore('loginStatus')==1){	
	// 	Http.post('/wxsite/user/api',{
	// 		"api_name":"getToken"
	// 		,"code":Tool.getUrlStringId("code")
	// 	}).then(res => {
 //        	if(res.data.code===1){
 //        		if (res.data.data.type==1) {//没有token
 //        			Tool.setStore("user_info",res.data.data.user_info);
 //        			Tool.setStore("loginStatus",2);
 //        			router.push({ name: "register",query:{stateName : 1}})
 //        		}else{
 //        			Tool.setStore("loginStatus",2);
 //        			Tool.setStore("token",res.data.data.token);
 //        			window.location.href=Tool.getStore('s0url');
 //        		}
 //        	}
 //  		});
	// }else{
	// 	next()
	// }
	//练春阳
	/*Tool.setStore("token","eyJ0eXAiOiJKd3QiLCJhbGciOiJIUzI1NiJ9.eyJpYXQiOjE1NTM2ODk4MDMsImV4cCI6MCwib2lkIjoib0pra0UwMld6U2Y2Qk9Dbkk4ekVwRG5lMnFURSIsInVpZCI6MTI3MTQsInVuaWQiOiJvOGJ6TXdmSm5ra0tTakt0X1RXcXItWEdGU0ZjIiwic2lnbnVyZSI6IjIzOGQ0NTI0ODBhMzQyZGIwOTg2MzIxNjU5NzgyNjg0In0.gSVGrov5-D1NCYdX62JqT63ksws883OavOdGfV7TMnQ");*/
	//Mhr
	Tool.setStore("token","eyJ0eXAiOiJKd3QiLCJhbGciOiJIUzI1NiJ9.eyJpYXQiOjE1NjI3NjA1NTUsImV4cCI6MCwib2lkIjoib0pra0UwNkR5cVJQeGp2bFc0blZvOUtaM1JlVSIsInVpZCI6MTI3NTcsInVuaWQiOiJvOGJ6TXdhdUx0LWI2eE1OdHRuLU1nRkR1M21nIiwic2lnbnVyZSI6Ijc0ZjM2OTRlYmRiNTAxMmQ2NWE2NTQyY2E1MWE3MGE3In0.PDjWftHn0DAyAnrgE_1TD3vW5KYWGsg8KGM7XRZPanY");
	next()
})

new Vue({
	router,
	store,
	render: h => h(App)
}).$mount('#app');

