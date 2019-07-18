<template>
	<div class="choiceDepartment">
		<router-link 
			tag="div"
			v-for="(item,index) of dataList" 
			:key="index" 
			:to="{path: 'aideGenre' , query:{hospitalId: $route.query.hospitalId , dept_id: item.id , dept_name:item.name}}"
		>
			{{item.name}}
		</router-link>
	</div>
</template>

<script>
	export default{
		name:"choiceDepartment",
		data(){
			return{
				dataList:{}
			}
		},
		created(){
			this.$toast.loading({duration:0, forbidClick:true, mask:true, loadingType:'spinner', message:'加载中...'});
		    this.$http.post('/wxsite/Worker/api', {
		    	api_name: "nurseDept"
		    	,hospitalId: this.$route.query.hospitalId
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
	
	.choiceDepartment{
		padding-top: .2rem;
		min-height: 100vh;
		background-color: #f5f5f5;
		div{
			width: 45%;
		    height: 1.4rem;
		    margin: .16rem 2.5%;
		    background: url('~@/assets/imgs/department.png') no-repeat;
		    background-position: bottom right;
		    background-color: #fff;
		    background-size: 110%;
		    float: left;
		    font-size: .32rem;
		    line-height: 1.4rem;
		    color: #333;
		    padding-left: 10px;
		    box-sizing: border-box;
		    @include border-radius;
		}
	}
</style>