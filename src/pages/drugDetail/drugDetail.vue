<template>
	<div class="drugDetail">
		<div class="info fz12">
			<p class="shopName"><img src="@/assets/imgs/ic_dianpu.png" />{{name}}<span class="ml5" style="color: #36b160;">(编号:{{macno}})</span></p>
			<div class="address">
				<img src="@/assets/imgs/ic_dizhi.png" /><div>{{address}}</div>
			</div>
		</div>
		<div class="nav">
			<ul>
				<li v-for="item of navList" :key="item.id" :class={active:item.select} @click="switchNav(item.id)"><span>{{item.name}}</span></li>
			</ul>
		</div>
		<van-list
			v-model="loading"
			:finished="finished"
			finished-text="没有更多了"
			:offset="100"
			@load="getList"
		>
			<div class="master">
				<router-link v-for="(item,index) of List" class="product" :key="index" 
					:to="{ path:'commodityDetail', query: {
						id: item.product_stock_id
						,type:item.type
						,device_id:device_id} 
					}"
				>
					<div class="boxImg"><img :src="item.image"></div>
					<div class="field">
						<p class="m-b-20 name">{{item.name}}</p>
						<div class="textInfo m-b-20">
							<span class="t-co">￥{{item.price}}</span>
							<span class="t-cg">{{item.type==1?'处方药':item.type==2?'非处药方':'赠品药'}}</span>
						</div>
					</div>
				</router-link>
			</div>
		</van-list>
	</div>
</template>

<script>
	export default{
		name:"drugDetail",
		data(){
			return{
				paramsMacno:null,
				device_id:null,
				name:"",
				address:"",
				macno:"",
				navList:[],
				List:[],
				loading  : true,
				page     : 1,
				pagesize : 10,
				finished : false,
				indexNav : null
			}
		},
		methods:{
			switchNav:function(id) {
				if(this.loading==false){
					for (var i = this.navList.length; i--;) {
						this.navList[i].select=false;
						if (this.navList[i].id==id) {
							this.navList[i].select=true;
						}
						if (this.indexNav.id==id) {return; }//与当前相同则 不继续
					}
					this.page=1;
					this.List=[];
					this.finished = false;
					this.loading = true;

					this.getList();
				}
				
			},
			deviceDetail(){
			    this.$http.post('/wxsite/Device/api',{
			    	api_name:"deviceDetail"
			    	,macno:this.paramsMacno
			    }).then(res => {
			    	let rd=res.data.data;

			    	if (res.data.code==1) {
			    		this.navList=rd.category;
			    		this.device_id=rd.device_id;

			    		this.name=rd.name;
			    		this.macno=rd.macno;
			    		this.address=rd.address;
			    		this.navList.forEach((item , index) => {
			    			if(typeof item.select == "undefined"){
			    				index==0 ? this.$set(item, 'select', true) : this.$set(item, 'select', false);
			    				this.indexNav = this.navList[index];
			    			}
			    		});
			    	}else{
			        	this.$toast(res.data.msg);
			    	}

			    	this.loading=false;
				})
			},
			getList(){
				for (let i = this.navList.length; i--;) {
					if (this.navList[i].select == true) {
						this.indexNav = this.navList[i];
					}
				}
				
				this.$http.post("/wxsite/Device/api",{
					"category_id":this.indexNav.id
					,"api_name":"categoryProduct"
					,"page"    :this.page
					,"pagesize":this.pagesize
					,"device_id":this.device_id
				}).then(res => {
					if (res.data.code == 1) {
						this.List=[...this.List,...res.data.data];

						if (res.data.data.length<10) {
							this.finished = true
						}
						this.page++;
					}else{
						this.$toast(res.data.msg);
					}
					this.loading = false;
				})
			}
		},
		created(){
			this.paramsMacno=this.$route.query.macno;
			this.deviceDetail();
		}
	} 
</script>

<style lang="scss" scoped>
	@import '@/assets/css/common.scss';

	.shopName{
		@include oneLines;
	}
	.nav{
		margin-top: .6rem;
		ul{
			&::-webkit-scrollbar {display:none}
			/*display: flex;	
			justify-content: space-between;*/
			margin-bottom: .2rem;
			padding: 0 .2rem;
			-webkit-box-shadow: 0px 2px 1px 1px #f9f9f9;
			box-shadow: 0px 2px 1px 1px #f9f9f9;
			overflow-x: auto;
			@include box-siz;
			min-width: 100%;
			white-space: nowrap;
			li{
				padding: 0 0.1rem;
				display: inline-table;
			    span{
			    	text-align:center;
				    height: .88rem;
				    color: #666666;
				    line-height: .76rem;
				    border-top-left-radius: 4px;
				    border-top-right-radius: 4px;
				    padding: 0 .2rem;
				    position: relative;
				    display: block;
			    }
			}
			li.active{
				background:url('~@/assets/imgs/fillet.png') no-repeat;
				background-size: 120% 100%;
   				background-position-x: 50%;
				span{
					color: #fff;
					background: #36b160;	
				}
			}
		}
	}
	.info{
		-webkit-box-shadow: 0px 2px 1px 1px #f9f9f9;
		background:url('~@/assets/imgs/grandma1.jpg') no-repeat;
		box-shadow: 0 0 5px #ececec;
		height: 1.8rem;
		margin: .2rem;
    	background-position: -0.15rem 0.5rem;
    	padding-top: .3rem;
    	padding-left: 25%;
    	padding-right: .2rem;
    	box-sizing: border-box;
    	background-size: auto 80%;
    	@include border-radius;
    	img{
    		width: .26rem;
    		margin-right: .22rem;
    		height: .26rem;
    	}
    	p{
    		margin-bottom: .2rem;
    		line-height: 0.36rem;
    	}
    	.address{
			margin-left: .48rem;
			display:flex;
			img{
				margin-left: -.48rem;
			}
			div{
				@include twoLines;
				line-height: .34rem;
			}
		}
	}

	.master{
		margin:0 .2rem;
		display: flex;
		flex-wrap: wrap;
		justify-content:space-between;
	}
	.product{
		width: 48.5%;
		margin-bottom:.1rem;
		.boxImg{
			width: 100%;
			height: 3.2rem;	
			border: 1px solid #e5e5e5;
			margin-bottom: .2rem;
			overflow:hidden;
			img{
				width: 100%;
			}
		}
		.field{
			flex-direction: row-reverse;
			flex-wrap: wrap;
			.name{
				@include oneLines;
			}
		}
		.textInfo{
			justify-content: space-between;
			display: flex;
		}
	}
	.m-b-20{
		margin-bottom: .2rem;
	}
</style>