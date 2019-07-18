<template>
	<div class="bindphone">
		<div class="info" v-if="status">
			<div class="row border-bottom phone">
				<input type="text" placeholder="当前绑定手机号">
			</div>
			<div class="row">
				<input type="text" :value="this.phone" readonly="readonly">
			</div>
		</div>
		<div class="info" v-if="!status">
			<div class="row border-bottom phone">
				<input type="text" placeholder="请输入手机号" Fv="2" :value="this.mobile">
			</div>
			<div class="row verCode">
				<input type="text" placeholder="请输入验证码" Fv="0" FvInfo="验证码不能为空" :value="this.sms_code">
				<validate @click="getCode"></validate>
			</div>
		</div>
		<button class="bindBtn" @click="replacePhone">更换手机号</button>
		<tips :tipsList="tipsList"></tips>
	</div>
</template>

<script>
	import Validate from '@/components/validate'
	import Tips from '@/components/tips'

	export default{
		name:"bindPhone",
		components:{
			Validate,
			Tips
		},
		data(){
			return{
				verText:"",
				status:true,
				phone:this.$route.query.phone,
				mobile:"13431116997",
				sms_code:"123456",
				tipsList:{
					img_src: require("@/assets/imgs/ic_xuanzhong2.png"),
					msg: "更换成功!",
					title: "提示",
					onOff: false,
					submit:false
				}
			}
		},
		methods:{
			sendVer(){
				console.log(this.verText);
			},
			getCode(cb){
                 cb(this.sendVer);
			},
			replacePhone(){
				if(!this.status){
					if(this.$tool.formVerification()){
						this.$toast.loading({duration:0, forbidClick:true, mask:true, loadingType:'spinner', message:'加载中...'});
					    this.$http.post('/wxsite/user/api',{
					    	api_name: "changePhone"
					    	,mobile:this.mobile
					    	,sms_code:this.sms_code
					    }).then(res => {
							this.$toast.clear();

							let rd=res.data.data;
					    	if (res.data.code==1) {
					    		this.tipsList.onOff=true;
					    		setTimeout(()=>{
					    			this.$router.push({name: "personalCenter"});
					    		},1500);
					    	}else{
					        	this.$toast(res.data.msg);
					    	}
						})
					}
					return;
				}
				this.status=false;
			}
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
		margin-top: 1rem;
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