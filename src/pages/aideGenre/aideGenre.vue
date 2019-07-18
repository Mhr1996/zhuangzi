<template>
	<div class="aideGenre">
		<div 
			tag="div"
			class="item" 
			v-for="(item,index) of dataList" 
			:key="index"
			@click="checkAide(item)"
		>
			<p class="title"><img src="@/assets/imgs/nurse.png" />{{item.type_name}}</p>
			<p>{{item.type_desc}}</p>
		</div>
	</div>
</template>

<script>
	export default{
		name:"aideGenre",
		data(){
			return{
				dataList:{}
			}
		},
		methods:{
			checkAide(item){
				/*:to="{path: 'aideOrder' , query:{hospitalId: $route.query.hospitalId , dept_id: $route.query.dept_id}}"*/
				this.$toast.loading({duration:0, forbidClick:true, mask:true, loadingType:'spinner', message:'加载中...'});
			    this.$http.post('/wxsite/Worker/api', {
			    	api_name: "beforeOrder"
			    	,hospitalId: this.$route.query.hospitalId
			    	,dept_id   : this.$route.query.dept_id
			    	,nurse_type_id:item.id
			    	,deptName: this.$route.query.dept_name
			    }).then(res => {
					this.$toast.clear();

					let rd=res.data.data;

			    	if (res.data.code==1) {
			    		this.$router.push({name : "aideOrder" , query: rd});
			    	}else{
			        	this.$toast(res.data.msg);
			    	}
				})
			}
		},
		created(){
			this.$toast.loading({duration:0, forbidClick:true, mask:true, loadingType:'spinner', message:'加载中...'});
		    this.$http.post('/wxsite/Worker/api', {
		    	api_name: "nurseType"
		    	,hospitalId: this.$route.query.hospitalId
		    	,dept_id   : this.$route.query.dept_id
		    }).then(res => {
				this.$toast.clear();
				let rd=res.data.data;

		    	if (res.data.code==1) {
		    		this.dataList=rd;
		    	}else{
		        	this.$toast(res.data.msg);
		    	}
			})
		}
	} 
</script>

<style lang="scss" scoped>
	@import '@/assets/css/common.scss';
	.aideGenre{
		padding-top: .3rem;
		min-height: 100vh;
		background-color: #f5f5f5;
	}
	.item{
		@include radiusBox(80%,.3rem);
		margin: 0 auto;
		line-height: .4rem;
		@include border-radius;
		@include box-shadow-abroad(0px, 0px, 7px, 1px, #e4e4e4);
		color: $g6;
		margin-bottom: .3rem;
		.title{
			font-size: .32rem;
			margin-bottom: .2rem;
			color: $g3;
			img{
				height: .4rem;
				margin-right: .1rem;
			}
		}
	}
	.item::last-of-type{
		margin-bottom: 0;
	}
</style>