<template>
	<div class="replenishment">
		<div class="head"><img src="@/assets/imgs/logo.jpg"></div>
		<div class="info">
			<div class="row border-bottom phone">
				<input type="text" placeholder="请输入手机号" v-model="mobile" Fv="2">
			</div>
			<div class="row verCode">
				<input type="text" placeholder="请输入验证码" v-model="sms_code" Fv="0">
				<validate @click="getCode"></validate>
			</div>
		</div>
		<button class="submit" @click="submit">确定</button>
	</div>
</template>

<script>
	import validate from '@/components/validate'

	export default{
		name:"replenishment",
		components:{
			validate
		},
		data(){
			return{
				mobile: this.$tool.getSession("clerk_mobile") || '',
				sms_code:""
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
				let self=this;
				if(this.$tool.formVerification()){
					this.$toast.loading({duration:0, forbidClick:true, mask:true, loadingType:'spinner', message:'加载中...'});
				    this.$http.post('/wxsite/clerk/api', {
				    	api_name: "login"
				    	,mobile: this.mobile
				    	,sms_code: this.sms_code
				    }).then(res => {
						let rd=res.data.data;

				    	if (res.data.code==1) {
				    		self.$toast.success({message:"登录成功!" , mask: true});
				    		self.$tool.setSession("clerk_token",rd.clerk_token);
				    		self.$tool.setSession("clerk_mobile",self.mobile);

				    		if (rd.type==1) {//补货员
				    			setTimeout(()=>{
					    			this.$router.push({path:"/deviceList"})
					    		},1000);
				    		}else if (rd.type==2){//维修员
				    			setTimeout(()=>{
					    			this.$router.push({path:"/repairman"});
					    		},1000);
				    		}
				    		return;
				    	}else{
				        	this.$toast(res.data.msg);
				    	}
					})
				}
			}
		}

	} 
</script>

<style lang="scss" scoped>
	@import '@/assets/css/common.scss';

	.replenishment{
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
		margin-top: .6rem;
	}
	.verBtn{
		background-color: #36b160;
		color: #fff;
		width: 1.8rem;
		line-height: .70rem;
		text-align:center;
		border-radius: .1rem;
		position: absolute;
		right: 0;
		top: .2rem;
	}
</style>