<template>
	<div class="optSales">
		<div class="search">
			<input type="text" name="" placeholder="名称/地址/设备号" v-model="params">
			<button @click="search" v-show="!searchOff">搜索</button>
			<button @click="cancel" v-show="searchOff&&params!=''">取消</button>	
		</div>
		<van-list
			  v-model="loading"
			  :finished="finished"
			  finished-text="没有更多了"
			  :offset="200"
			  @load="getList"
			>
			<div class="distance border-bottom" @click="toHref(item)" v-for="(item,index) of orderList" :key="index">
				<!-- <router-link  :to="{ path:'giftDrug', query: {macno: item.macno} }"> -->
				<img :src="item.image" class="product">
				<div class="info">
					<div class="name">{{item.name}} <span class="dis">{{item.calc_range}}m</span></div>
					<div class="address"><img src="@/assets/imgs/daohang.png">{{item.address}}</div>
				</div>
			</div>
		</van-list>
	</div>
</template>

<script>
	export default{
		name:"optSales",
		data(){
			return {
				params	 : "",
				historyParams  :"",
				searchOff: false,
				orderList: [],
				page     : 1,
				pagesize : 10,
				loading  : false,
				finished : false,
				switch	 : this.$route.query.keyword=="give" ? 1 : 2
			}
		},
		methods:{
			toHref(item){
				if(this.$route.query.keyword=="consult"){
					this.$router.push({name:'prescription',query:{macno: item.macno}})
				}else{
					this.$router.push({name:'giftDrug',query:{macno: item.macno}})
				}
			},
			getList(){
				this.$toast.loading({duration:0, forbidClick:true, mask:true, loadingType:'spinner', message:'加载中...'});
				this.$http.post("/wxsite/device/api",{
					api_name: "choiceDevice"
					,lat    :22.987090
					,lng    :113.725810
					,page   : this.page
					,switch :this.switch
					,pagesize: this.pagesize
				}).then(res => {
					this.$toast.clear();
					if (res.data.code == 1) {
						this.orderList=[...this.orderList,...res.data.data];
						if (res.data.data.length==0) {
							this.finished = true
						}
						this.page++;
					}else{
						this.$toast(res.data.msg);
					}
					this.loading = false;
				})
			},
			search(){
				if (this.params!=this.historyParams) {
					this.historyParams=this.params;
					this.page=1;
					this.searchOff=true;

					this.$toast.loading({duration:0, forbidClick:true, mask:true, loadingType:'spinner', message:'加载中...'});
				    this.$http.post('/wxsite/device/api',{
				    	api_name: 'searchDevice'
				    	,switch : this.switch
				    	,keyword: this.params
				    	,page   :this.page
				    	,pagesize:this.pagesize
				    	,lat:22.987090
						,lng:113.725810
				    }).then(res => {
						this.$toast.clear();

						let rd=res.data.data;

				    	if (res.data.code==1) {
				    		this.orderList=rd;
				    	}else{
				        	this.$toast(res.data.msg);
				    	}
					})
				}
			},
			cancel(){
				this.searchOff=false;
				this.params="",this.historyParams="";
				this.orderList=[];
				this.getList();
			}
		}
	} 
</script>

<style lang="scss" scoped>
	@import '@/assets/css/common.scss';

	.search{
		padding: .33rem;
		box-sizing: border-box;
		padding-right:0;
		input{
			height: .64rem;
			line-height: .64rem;
			padding-left: .7rem;
			padding-right: .2rem;
			width: 82%;
			box-sizing: border-box;
			@include border-radius(.5rem);
			background: url('~@/assets/imgs/search.png') no-repeat #f2f2f2;
			background-size: .28rem .28rem;
			background-position: left .25rem top .18rem;
		}
		button{
			text-align: right;
		    height: .64rem;
		    line-height: .64rem;
		    padding: 0 .36rem;
		}
	}

	.distance{
		width: 90%;
		height: 1.6rem;
		margin: 0 auto;
		padding: .2rem;
		box-sizing: border-box;
		-webkit-box-shadow: 0px 2px 1px 1px #f9f9f9;
		box-shadow: 0px 2px 1px 1px #f9f9f9;
    	margin-bottom: 20px;
    	background: url('~@/assets/imgs/right.png') no-repeat;
    	background-position: 97%;
   		background-size: .15rem;
   		border-radius: 4px;
		img.product{
			width: 1.2rem;
			height: 1.2rem;
			float: left;
			margin-right: .28rem;
			@include border-radius;
		}
		.info{
			color: #333;
			height: 1.2rem;
			display: flex; 
			display: -webkit-flex; /* Safari */
			flex-direction: row-reverse;
			flex-wrap: wrap;
			justify-content: flex-end;
			line-height: .6rem;
			.dis{
				color: #36b160;
				position: absolute;
    			right: .6rem;
			}
		}
		.address{
			color: #999999;
			@include oneLines;
			img{
				width: .2rem;
				margin-right: .1rem;
				vertical-align: inherit;
			}
		}
		.name{
			width: 75%;
			@include oneLines;
		}
	}
</style>