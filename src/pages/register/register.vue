<template>
	<div class="register bz" v-wechat-title="this.title">
		<div class="info">
			<div class="row border-bottom phone cgf mb20 b-r">
				<input type="text" placeholder="请输入手机号" v-model="mobile" Fv="2">
			</div>
			<div class="row verCode cgf mb20 b-r">
				<input type="text" placeholder="获取验证码" v-model="sms_code" Fv="0" FvInfo="验证码不能为空">
				<validate @click="getCode"></validate>
			</div>
			<div class="row border-bottom cgf mb20 b-r pw">
				<input type="password" placeholder="设置密码" v-model="pw1" Fv="0" FvInfo="设置密码不能为空">
			</div>
			<div class="row border-bottom cgf mb20 b-r pw">
				<input type="password" placeholder="重复密码" v-model="pw2" Fv="0" FvInfo="重复密码不能为空">
			</div>
		</div>
		<button class="submit mauto db" @click="submit">{{this.title=='注册'?'立即注册':'确认'}}</button>
	</div>
</template>

<script>
	import validate from '@/components/validate'

	export default{
		name:"register",
		components:{
			validate
		},
		data(){
			return{
				mobile:"",
				sms_code:"",
				pw1:"",
				pw2:"",
				title:"注册",
				url:"/wxsite/user/api"
			}
		},
		created(){
			console.log(this.$route.query.stateName)
			if(this.$route.query.stateName==1){
				this.title="注册";
			}else if(this.$route.query.stateName==2){
				this.title="忘记密码";
				this.url="/app/public/api";
			}
		},
		methods:{
			sendVer(){
				let self=this;
				this.$http.post("/app/Appoint/api",{
					"api_name":"sendcode"
					,"mobile" :this.mobile
				}).then(res => {
					if (res.data.code == 1) {
						self.$toast("发送成功，请注意查收");
					}else{
						self.$toast(res.data.msg);
					}
				})
			},
			getCode(cb){
				cb(this.sendVer);
			},
			submit(){
				let self=this,params=null;
				
				if(this.$tool.formVerification()){
					if(this.$route.query.stateName==1){
						params={
							"api_name":"loginByWx"
							,"mobile" :self.mobile
							,sms_code :self.sms_code
							,passwd   :self.pw1
							,newpasswd:self.pw2
							,user_info:self.$tool.getStore('user_info')
						}
					}else if(this.$route.query.stateName==2){
						params={
							"api_name":"forget"
							,"mobile" :self.mobile
							,code 	  :self.sms_code
							,passwd   :self.pw1
							,c_passwd :self.pw2
						}
					}

					this.$toast.loading({duration:0, forbidClick:true, mask:true, loadingType:'spinner', message:'加载中...'});
					this.$http.post(self.url,params).then(res => {
						self.$toast.clear();
						if (res.data.code == 1) {
							if(self.$route.query.stateName==1){
								self.$toast("注册成功");
							}else if(self.$route.query.stateName==2){
								self.$toast("修改成功");
							}
							setTimeout(()=>{
								console.log("后退")
								self.$router.history.go(-1);
							},1500);
							
						}else{
							self.$toast(res.data.msg);
						}
					})
				}
			}
		}

	} 
</script>

<style lang="scss" scoped>
	@import '@/assets/css/common.scss';
	.verBtn{
	    &:active{
	      font-size: .24rem;
	    }
	    background-color: initial;
	    color: #9cce39;
	    width: 1.8rem;
	    line-height: .70rem;
	    text-align:center;
	    border-radius: .1rem;
	    position: absolute;
	    right: 0;
	    top: .2rem;
	}
	.register{
		padding: .2rem .34rem .2rem .2rem;
		min-height: 100vh;
		background-color: #f5f5f5;
	}
	.info{
		padding: 0 .28rem;
		box-sizing: border-box;
		background-color: #f8f8f8;
		.row{
			height: 1.1rem;
			line-height: 1.1rem;
			position: relative;
			padding-left: .9rem;
			&:after{
				position:absolute;
				content: '';
				width: .02rem;
				height: .24rem;
				background-color: #bfbfbf;
				left: .9rem;
				top:50%;
				margin-top: -.12rem;
			}
			input{
				width: 100%;
				padding-left: .3rem;
			}
		}
		.phone{
		 	background: url('~@/assets/imgs/phone.png') no-repeat .3rem #fff;
		 	background-size: 0.3rem;
		}
		.verCode{
			background: url('~@/assets/imgs/s1.png') no-repeat .3rem #fff;
			background-size: 0.3rem;
		}
		.pw{
			background: url('~@/assets/imgs/verCode.png') no-repeat .3rem #fff;
			background-size: 0.3rem;
		}
	}
	.submit{
		background-color: $this_y;
		color: #fff;
		font-size:.32rem;
		width: 80%;
		line-height: .88rem;
		text-align:center;
		border-radius: .1rem;
		margin-top: .8rem;
	}

</style>