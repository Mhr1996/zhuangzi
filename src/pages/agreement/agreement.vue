<template>
	<div class="agreement">
		<h1>{{oD.title}}</h1>
		<div class="content" v-html="oD.content">
		</div>
		<div class="submit" @click="iDo">我已阅读并接受</div>
	</div>
</template>

<script>
	export default{
		name:"agreement",
		data(){
			return{
				oD:{}
			}
		},
		methods:{
			iDo(){
			    this.$http.post('/wxsite/chat/api',{
			    	api_name:"agreeProtocol"
			    	,keyword: this.$route.query.keyword || 'give'
			    }).then(res => {
			    	if (res.data.code==1) {
			    		this.$router.push({name: "optSales", query:{keyword: this.$route.query.keyword || 'give'}})
			    	}else{
			        	this.$toast(res.data.msg);
			    	}
				})
			}
		},
		created(){
			this.$toast.loading({duration:0, forbidClick:true, mask:true, loadingType:'spinner', message:'加载中...'});

		    this.$http.post('/wxsite/chat/api',{
		    	api_name:"getProtocol"
		    	,keyword:this.$route.query.keyword || 'give'
		    }).then(res => {
				this.$toast.clear();

		    	if (res.data.code==1) {
		    		this.oD=res.data.data;
		    	}else{
		        	this.$toast(res.data.msg);
		    	}
			})
		}
		
	} 
</script>

<style lang="scss" scoped>
	@import '@/assets/css/common.scss';
	.agreement{
		padding-bottom: 1rem;
		h1{
			font-size:.4rem;
			text-align:center;
			margin:.4rem 0;
		}
	}
	.content{
		padding:0 .2rem;
	}
	.submit{
		position:fixed;
		bottom: 0;
		width: 100%;
		left: 0;
		height: 1rem;
		font-size: .32rem;
		line-height: 1rem;
		text-align: center;
		background-color: $this_y;
		color: #fff;
	}
</style>