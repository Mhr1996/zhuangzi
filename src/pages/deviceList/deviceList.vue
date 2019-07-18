<template>
	<div class="deviceList">
		<div class="device" v-for="(item,index) of dl" :key="index">
			<div class="b-26 item">
				<label>设备编号</label>
				<div class="macno"><span>{{item.macno}}</span></div>
			</div>
			<div class="item">
				<label>设备地址</label>
				<div class="address"><span>{{item.address}}</span></div>
			</div>
			<router-link tag="div" class="repairBtn" :to="{ path: 'cabinetDetail' , query: { device_id : item.device_id}}">补货</router-link>
			<!--<div class="repairBtn" :to="{ path: 'cabinetDetail' , query: { device_id : item.device_id}}">补货</div> -->
		</div>
		<div class="bottom">
			<!-- <div class="activate" @click="activate">激活设备</div> -->
			<div class="signOut" @click="signOut">退出登录</div>
		</div>
	</div>
</template>

<script>
	export default{
		name:"deviceList",
		data(){
			return{
				dl:{}
			}
		},
		methods:{
			activate(){

			},
			signOut(){
				this.$dialog.confirm({
				  	title: '提示',
				  	message: '确定退出登录吗?'
				}).then(() => {
					this.$toast("退出成功!");
					this.$tool.removeSession("clerk_token");
					setTimeout(()=>{
						this.$router.push({ name : "replenishment"})
					},1500);
				}).catch(() => {
				  // on cancel
				});
			}
		},
		created(){
			this.$toast.loading({duration:0, forbidClick:true, mask:true, loadingType:'spinner', message:'加载中...'});
		    this.$http.post('/wxsite/clerk/api', {
		    	api_name: "device_list"
		    	,clerk_token: this.$tool.getSession("clerk_token")
		    }).then(res => {
				this.$toast.clear();

				let rd=res.data.data;

		    	if (res.data.code==1) {
		    		this.dl = rd;
		    	}else{
		        	this.$toast(res.data.msg);
		    	}
			})
		}
	} 
</script>

<style lang="scss" scoped>
	@import '@/assets/css/common.scss';

	.deviceList{
		min-height: 100vh;
		background-color: #f5f5f5;
	}
	.b-26{
		margin-bottom: .26rem;
	}
	.address,.macno{
		width: 4.2rem;
    	display: inline-table;
    	line-height: 1.4;
	}
	.device{
		padding:.44rem .24rem;
		background-color:#fff;
		position: relative;
		margin-bottom: .2rem;
		label{
			width: 1.4rem;
			color: $g9;
			display: inline-block;
		}
		.repairBtn{
			position: absolute;
			width: 1.3rem;
			@include text(.5rem);
			top: 50%;
			right: .24rem;
			margin-top: -.25rem;
			background-color: $this_y;
			display: block;
			color: #fff;
			@include border-radius(0.5rem);
		}
	}

	.bottom{
		margin-top: .8rem;
		.activate{
			margin: 0 auto;
			margin-bottom: .2rem;
		    height: 0.88rem;
		    line-height: 0.88rem;
		    text-align: center;
		    font-size: 0.32rem;
		    background-color: #ffa442;
		    color: #fff;
		    border-radius: 0.08rem;
		    -ms-border-radius: 0.08rem;
		    -moz-border-radius: 0.08rem;
		    -webkit-border-radius: 0.08rem;
		    width: 80%;
		}
		.signOut{
			margin: 0 auto;
			margin-bottom: .2rem;
		    height: 0.88rem;
		    line-height: 0.88rem;
		    text-align: center;
		    font-size: 0.32rem;
		    color: #ffa442;
		    border: .02rem solid #ffa442;
		    border-radius: 0.08rem;
		    -ms-border-radius: 0.08rem;
		    -moz-border-radius: 0.08rem;
		    -webkit-border-radius: 0.08rem;
		    width: 80%;
		    @include box-siz;
		    font-weight: bold;
		}
	}
</style>