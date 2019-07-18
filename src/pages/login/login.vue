<template>
	<div class="login">
		<div class="head"><img src=""></div>
		<div class="info">
			<div class="row border-bottom phone">
				<input type="text" placeholder="请输入手机号" v-model="mobile" Fv="2">
			</div>
			<div class="row verCode">
				<input type="password" placeholder="请输入密码" v-model="sms_code" Fv="0"  FvInfo="密码不能为空">
			</div>
		</div>
		<button class="submit" @click="submit">登录</button>
		<div class="flex-c mt20">
			<router-link tag="span" class="mr40 w50 tr" :to="{ path: 'register', query:{stateName:1}}">注册</router-link>|<router-link tag="span" class="c9 ml40 w50" :to="{ path: 'register', query:{stateName:2}}">忘记密码</router-link>
		</div>
	</div>
</template>

<script>
	import validate from '@/components/validate'

	export default{
		name:"login",
		components:{
			validate
		},
		data(){
			return{
				mobile:"",
				sms_code:""
			}
		},
		created(){
			console.log(this.$router.history)
		},
		methods:{
			submit(){
				let self=this;
				if(this.$tool.formVerification()){
					this.$http.post("/app/public/api",{
						"api_name":"userLogin"
						,"mobile" :this.mobile
						,"passwd" :this.sms_code
					}).then(res => {
						if (res.data.code == 1) {
							self.$tool.setStore("token",res.data.data.token);
							this.$router.history.go(-1);
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

	.login{
		width: 85%;
		margin: 0 auto;
	}
	.head{
		height:3.6rem;
		display: flex;
		img{
			width: 1.8rem;
			height: 1.8rem;
			display: block;
			margin: 0 auto;
			margin-top: .9rem;
		}
	}
	.info{
		padding: 0 .28rem;
		box-sizing: border-box;
		height: 2.2rem;
		background-color: #f8f8f8;
		.row{
			height: 1.1rem;
			line-height: 1.1rem;
			position: relative;
			padding-left: .6rem;
			input{
				width: 100%;
			}
		}
		.phone{
		 	background: url('~@/assets/imgs/phone.png') no-repeat .1rem;
		 	background-size: 0.3rem;
		}
		.verCode{
			background: url('~@/assets/imgs/verCode.png') no-repeat .1rem;
			background-size: 0.3rem;
		}
	}
	.submit{
		background-color: $this_y;
		color: #fff;
		font-size:.32rem;
		width: 100%;
		line-height: .88rem;
		text-align:center;
		border-radius: .1rem;
		margin-top: .8rem;
	}
</style>