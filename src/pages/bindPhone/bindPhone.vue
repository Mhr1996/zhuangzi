<template>
	<div class="bindphone">
		<div class="head"><img src=""></div>
		<div class="info">
			<div class="row border-bottom phone">
				<input type="" name="" placeholder="请输入手机号" v-model="phone" Fv="2">
			</div>
			<div class="row verCode">
				<input type="" name="" placeholder="请输入验证码" Fv="0" FvInfo="验证码不能为空" v-model="verCode">
				<validate @click="getCode"></validate>
			</div>
			
		</div>
		<button class="bindBtn" @click="submit">绑定手机号</button>
	</div>
</template>

<script>
	import validate from '@/components/validate'

	export default{
		name:"bindPhone",
		components:{
			validate
		},
		data(){
			return{
				phone:"",
				verCode:""
			}
		},
		methods:{
			getCode(cb) {
                 cb();
			},
			submit() {
				if(this.$tool.formVerification(this)){
					this.$http.post('/wxsite/user/api',{
						api_name:"loginByWx"
						,mobile:this.phone
						,sms_code:"6666"
						,user_info:this.$tool.getStore('user_info')
					}).then(res => {
						if (res.data.code==1) {
				    		this.$tool.setStore("token",res.data.data.token);
				        	this.$tool.setStore("loginStatus",2);
				        	this.$router.history.go(-1);
				    	}else{
				        	this.$toast(res.data.msg);
				    	}
			        	
		      		})
				}
			}
		},
		created(){
			this.$tool.setStore("loginStatus",1);
		}
	} 
</script>

<style lang="scss" scoped>
	@import '@/assets/css/common.scss';

	.bindphone{
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
	.bindBtn{
		background-color: $this_y;
		color: #fff;
		font-size:.32rem;
		width: 100%;
		line-height: .88rem;
		text-align:center;
		border-radius: .1rem;
		margin-top: .6rem;
	}
	
</style>