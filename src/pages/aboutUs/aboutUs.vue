<template>
	<div class="faultRepair">
		<div class="head"><img :src="logo"></div>
		<div class="content">
			{{content}}
		</div>
	</div>
</template>

<script>
	export default{
		name:"faultRepair",
		data(){
			return{
				content:"",
				logo:""
			}
		},
		created(){
			this.$toast.loading({duration:0, forbidClick:true, mask:true, loadingType:'spinner', message:'加载中...'});

		    this.$http.post('/wxsite/user/api',{"api_name":"aboutUs"}).then(res => {
				this.$toast.clear();

		    	if (res.data.code==1) {
		    		this.content=res.data.data.content;
		    		this.logo=res.data.data.logo;
		    	}else{
		        	this.$toast(res.data.msg);
		    	}
			})
		}
	} 
</script>

<style lang="scss" scoped>
	@import '@/assets/css/common.scss';

	.faultRepair{
		width: 90%;
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
	.content{
		font-size: .32rem;
		line-height: .5rem;
	}
</style>