<template>
	<div class="commodityDetail">
		<div>
			<div class="banner">
				<van-swipe :autoplay="3000" style="height:100%;">
				  	<van-swipe-item v-for="(image, index) in commodity.imgs" :key="index" >
				    	<img v-lazy="image" />
				  	</van-swipe-item>
				</van-swipe>
			</div>
			<div class="info">
				<p class="name">{{commodity.name}}</p>
				<p class="synopsis" v-if="commodity.type!=3">{{commodity.product_spec}}/{{commodity.spec_key}}</p>
				<div class="m-t-10 t-co">￥{{commodity.type!=3 ? commodity.price : '0.00'}}</div>
				<div class="m-t-10 t-cg">月销{{commodity.sales_volume}}笔</div>
			</div>
		</div>
		<div class="confuse">
			<p>药品图文详情</p>
			<div>
				{{commodity.content}}
			</div>
		</div>
		<div class="bottom consult" v-if="commodity.type==1	">
			咨询24小时在线医师
		</div>
		<div class="bottom" v-if="commodity.type==3">
			<div class="receive">每人领取一次</div>
			<div class="free" @click="freeCollection">免费领取</div>
		</div>
		<shop-car v-if="commodity.type==2" 
			:device_id="$route.query.device_id" 
			:commodity="commodity" 
			:ContainNum="ContainNum" 
			@addCarParent="addCarParent"
			@buyNow="buyNow"
			:totalNum="totalNum"
		></shop-car>
		<tips :tipsList="tipsList" @know="know"></tips>
	</div>
</template>

<script>
	import ShopCar from '@/components/shopCar'
	import Tips from '@/components/tips'

	export default{
		name:"commodityDetail",
		components:{
			ShopCar,
			Tips
		},
		data(){
			return{
				commodity: {},
				ContainNum: 0,//购物车的当前商品数量
				totalNum: 0,
				tipsList: {
					title: "提示",
					state: "领取成功",
					msg: "请在个人中心，售货机订单查看取药码",
					onOff: false,
					submit: true
				}
			}
		},
		methods:{
			/*
				购物车添加
			*/
			addCarParent(value){
				let tl_=this.$tool 
				,total=[] 
				,identical=true //购物车是否有当前商品
				,mc=this.commodity
				,initJson=(data,value)=>{
					return {
						image: data.image,
						name: data.name,
						num: value,
						price: data.price,
						product_stock_id: data.product_stock_id,
						type_name: data.type_name,
						product_num:data.product_num
					}
				};

				if(tl_.getSession("shoppingCart")){
					this.totalNum=0;
					total=JSON.parse(tl_.getSession("shoppingCart"));
					
					for(let i=total.length;i--;){
						if(total[i].product_stock_id==mc.product_stock_id){//购物车已经有当前商品
							total[i]=initJson(mc,value+total[i].num);

							this.ContainNum=total[i].num;
							identical=false;
						}

						this.totalNum+=total[i].num;
					}

					if(identical){//购物车没有当前商品 新增
						total[total.length]=initJson(mc,value);

						this.totalNum+=value;
						this.ContainNum=total[total.length-1].num;
					}

					tl_.setSession("shoppingCart",total);
				}else{
					total[0]=initJson(mc,value);

					this.totalNum=this.ContainNum=value;
					tl_.setSession("shoppingCart",total);
				}
				this.$toast("添加成功");
			},
			/*
				领取赠药
			*/
			freeCollection(){
				this.$toast.loading({duration:0, forbidClick:true, mask:true, loadingType:'spinner', message:'加载中...'});
			    this.$http.post('/wxsite/Device/api',{
			    	api_name: "freeReceive"
			    	,device_id: this.$route.query.device_id
			    	,product_stock_id: this.$route.query.id
			    }).then(res => {
					this.$toast.clear();
					let rd=res.data.data;

			    	if (res.data.code==1) {
			    		this.tipsList.onOff=true;
			    	}else{
			        	this.$toast(res.data.msg);
			    	}
				})
			},
			know(){
				this.tipsList.onOff=false;
			},
			buyNow(value){
				this.$toast.loading({duration:0, forbidClick:true, mask:true, loadingType:'spinner', message:'加载中...'});
			    this.$http.post('/wxsite/Device/api',{
			    	api_name: "purchase"
			    	,device_id: this.$route.query.device_id
			    	,product_stock_id: this.$route.query.id
			    	,num: value
			    }).then(res => {
					this.$toast.clear();

					let rd=res.data.data;

			    	if (res.data.code==1) {
			    		this.$router.push({name: "finalOrder" , query:{order_no : rd.order_no}})
			    	}else{
			        	this.$toast(res.data.msg);
			    	}
				})
			}
		},
		created(){
			let tl_=this.$tool;

			this.$toast.loading({duration:0, forbidClick:true, mask:true, loadingType:'spinner', message:'加载中...'});

		    this.$http.post('/wxsite/Device/api',{
		    	api_name :this.$route.query.type==3 ? "giftProductDetail" : "productDetail"
		    	,product_stock_id:this.$route.query.id
		    	,type:this.$route.query.type
		    	,device_id:this.$route.query.device_id
		    }).then(res => {
				this.$toast.clear();
				this.commodity=res.data.data;
 				
		    	if (res.data.code==1) {

		    		if(tl_.getSession("shoppingCart")){//获取当前商品session
						let total= JSON.parse(tl_.getSession("shoppingCart"));

						total.forEach((item,index)=>{
							if(item.product_stock_id==this.commodity.product_stock_id){
								this.ContainNum=item.num;	
							}
							this.totalNum+=item.num;
						});
					}

		    	}else{
		        	this.$toast(res.data.msg);
		    	}
			})
		}
	} 
</script>

<style lang="scss" scoped>
	@import '@/assets/css/common.scss';

	.commodityDetail{
		margin: 0 .2rem;
	}
	.banner{
		width: 100%;
		height: 5rem;
		img{
			width: 100%;
			height: 100%;
		}
	}
	.info{
		margin: .6rem auto;
		text-align: center;
		p{
			margin-top: .14rem;
			font-size: .32rem;
			color: #333;
		}
	}
	.m-t-10{
		margin-top: .22rem;
	}
	.confuse{
		color: #333;
		p{
			margin-bottom: .2rem;
		}
	}
	.bottom{
		width: 100%;
		position: fixed;
		bottom: 0;
		left: 0;
		
		div{
		    display: inline-table;
		    width: 50%;
		    text-align: center;
		    height: 1rem;
		    line-height: 1rem;
		}
		.receive{
			color: #ec6941;
		}
		.free{
			background-color: $this_y;
			color: #fff;
		}
	}
	.consult{
		@include text(1rem);
		font-size:.32rem;
		color: #fff;
		background-color: $this_y;
	}

	.van-swipe__indicators .van-swipe__indicator{
		background-color:#000;
	}
</style>