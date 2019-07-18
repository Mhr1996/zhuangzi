<template>
	<div class="register bz" v-wechat-title="this.title">
		<div class="info">
			<div class="row border-bottom phone cgf mb20 b-r">
				<input type="text" placeholder="请输入原密码" v-model="pw1" Fv="0" FvInfo="原密码不能为空">
			</div>
			<div class="row border-bottom cgf mb20 b-r pw">
				<input type="password" placeholder="设置密码" v-model="pw2" Fv="0" FvInfo="设置密码不能为空">
			</div>
			<div class="row border-bottom cgf mb20 b-r pw">
				<input type="password" placeholder="重复密码" v-model="pw3" Fv="0" FvInfo="重复密码不能为空">
			</div>
		</div>
		<button class="submit mauto db" @click="submit">确认</button>
		<tips :tipsList="tipsList"></tips>
	</div>
</template>

<script>
	import Tips from "@/components/tips"

	export default{
		name:"register",
		data(){
			return{
				pw1:"",
				pw2:"",
				pw3:"",
				title:"修改密码",
				url:"/app/public/updatePass",
				tipsList:{
					onOff: false,
					title: true,
					img_src: require("@/assets/imgs/ic_xuanzhong2.png"),
					msg: '修改成功'
				}
			}
		},
		components:{
			Tips
		},
		methods:{
			submit(){
				let self=this;
				if(this.$tool.formVerification()){
					if(self.pw2!=self.pw3){
						self.$toast("新密码不一致请重新输入");
						self.pw3="";
						return;
					}
					let params={
						"api_name":"updatePass"
						,usedPass :self.pw1
						,Pass     :self.pw2
						,againPass:self.pw3
					}

					this.$toast.loading({duration:0, forbidClick:true, mask:true, loadingType:'spinner', message:'加载中...'});
					this.$http.post(self.url,params).then(res => {
						self.$toast.clear();
						if (res.data.code == 1) {
							// self.$toast("修改成功");
							this.tipsList.onOff=true;
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
			height: 1rem;
			line-height: 1rem;
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
		 	background: url('~@/assets/imgs/s1.png') no-repeat .3rem #fff;
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