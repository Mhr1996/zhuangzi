<template>
	<div class="startStore">
		<div v-if="success">
			<div class="ades">
				<span class="place">场所</span><span>{{oD.address}}</span>
			</div>
			<div class="item">
				<img :src="oD.image">
				<div class="info">
					<ul>
						<li><span>设备名称</span>{{oD.name}}</li>
						<li><span>设备编号</span>{{oD.macno}}</li>
						<li><span>设备型号</span>{{oD.mac_mode}}</li>
						<li><span>货道数量</span>{{oD.aisle}}</li>
					</ul>
				</div>
			</div>
			<div class="submitBtn" @click="submit">确认激活</div>
		</div>
		<div v-else class="yes">
			<img src="@/assets/imgs/success.png">
			激活成功
		</div>
	</div>
</template>

<script>
	export default{
		name:"startStore",
		data(){
			return{
				oD:{},
				success:true
			}
		},
		methods:{
			submit(){
				this.$toast.loading({duration:0, forbidClick:true, mask:true, loadingType:'spinner', message:'加载中...'});
			    this.$http.post('/wxsite/clerk/api', {
			    	api_name: "activation"
			    	,clerk_token: this.$tool.getSession("clerk_token")
			    	,device_id: this.oD.device_id
			    }).then(res => {
					this.$toast.clear();

					let rd=res.data.data;

			    	if (res.data.code==1) {
			    		this.success=false;
			    		setTimeout(()=>{
			    			this.$router.push({path: "repairman"})
			    		},2000);
			    	}else{
			        	this.$toast(res.data.msg);
			    	}
				})
			}
		},
		created(){
			this.$toast.loading({duration:0, forbidClick:true, mask:true, loadingType:'spinner', message:'加载中...'});
			    this.$http.post('/wxsite/clerk/api', {
			    	api_name: "scan"
			    	,clerk_token: this.$tool.getSession("clerk_token")
			    	,macno: this.$route.query.macno
			    }).then(res => {
					this.$toast.clear();

					let rd=res.data.data;

			    	if (res.data.code==1) {
			    		this.oD=rd;
			    	}else{
			        	this.$toast(res.data.msg);
			    	}
				})
			console.log(this.oD);
		}
	} 
</script>

<style lang="scss" scoped>
	@import '@/assets/css/common.scss';

	.startStore{
		min-height: 100vh;
		background-color: #f5f5f5;
	}
	.ades{
		padding: .36rem .24rem;
		display: flex;
		justify-content: space-between;
		margin-bottom: .2rem;
		background-color: #fff;
		.place{
			color: $g9;
		}
	}
	.item{
		background-color: #fff;
		padding: .3rem .25rem;
		overflow: hidden;
		img{
			width: 1.4rem;
			height: 1.4rem;
			float: left;
			margin-right: .24rem;
		}
		ul span{
			margin-right: .26rem;
		}
		.info{
			height: 1.4rem;
		}
		.info ul{
			display: flex;
			justify-content: space-between;
			flex-wrap: wrap;
			flex-direction: row-reverse ;
			height: 100%;
		}
		li{
			flex-grow: 0;
			width: 100%;
			span{
				color: $g9;
			}
		}
	}

	.yes{
		text-align: center;
		padding-top: 4.5rem;
		img{
			display: block;
			margin: 0 auto;
			width: 3rem;
			height: 3rem;
			margin-bottom: .3rem;
		}
	}
</style>