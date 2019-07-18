<template>
	<div class="orderDetail" :style="{paddingBottom:oD.order_type!=1?0:'1.6rem'}">
		<div class="banner">
			<img src="@/assets/imgs/bicycle.png" />
		</div>
		<div class="content">
			<div class="condition border-bottom"> 
				<span class="icon" :class="{active:oD.order_type==3}"></span><span class="status f-b">{{
					oD.order_type == 1 ? "未付款" :
					oD.order_type == 2 ? "未取货" :
					oD.order_type == 3 ? "已完成" :
					oD.order_type == 4 ? "出货中" :
					oD.order_type == 5 ? "异常订单" :
					oD.order_type == 6 ? "已退款" : ''
				}}</span> 
				<span class="attach r">{{oD.is_give==2?'赠品药':''}}</span>
			</div>
			<div class="title">
				<img src="@/assets/imgs/ic_yaowu.png" />售药机信息
			</div>
			<div class="relation">
				<p class="name">{{oD.device_name}} (编号: {{oD.macno}})</p>
				<div class="address"><img src="@/assets/imgs/daohang.png"/>{{oD.address}}</div>
				<div class="pickUp" v-if="oD.order_type==2"><span class="description f-b">取货码</span><span class="number">{{oD.yao_code}}</span></div>
			</div>
			<div class="commodityInfo mt10" v-for="(item,index) of oD.product_list" :key="index">
				<img :src="item.image" class="product">
				<div class="info">
					<div class="name">{{item.name}}</div>
					<div class="depict">{{item.type_name}}</div>
					<div class="price">￥{{item.price}}</div>
				</div>
				<div class="num">x{{item.num}}</div>
			</div>
			<div class="payRow">
				<span class="demand" v-if="oD.order_type == 1">需支付</span><span class="r total f-b">￥{{oD.total_price}}</span><span class="r f-b">共{{plNum}}件商品  合计:</span>
			</div>
		</div>
		<div class="coding">
			<p v-show="oD.mobile!=''">
				<span class="l_name">用户</span><span class="code">{{oD.mobile}}</span>
			</p>
			<p>
				<span class="l_name">订单编号</span><span class="code">{{oD.order_no}}</span>
			</p>
			<p v-if="oD.trade_number!=''">
				<span class="l_name">交易号</span><span class="code">{{oD.trade_number}}</span>
			</p>
			<p>
				<span class="l_name">下单时间</span><span class="code">{{oD.ctime}}</span>
			</p>
			<p v-if="oD.pay_time!=''">
				<span class="l_name">付款时间</span><span class="code">{{oD.pay_time}}</span>
			</p>
			<p v-if="oD.delivery_time!=''">
				<span class="l_name">售药机时间</span><span class="code">{{oD.delivery_time}}</span>
			</p>
		</div>
		<button class="payBtn"  v-if="oD.order_type==1" @click="goPaymentOrder"> 立即支付 </button>
	</div>
</template>

<script>
	export default{
		name:"orderDetail",
		data(){
			return{
				oD:{}
			}
		},
		computed:{
			plNum(){
				if(this.oD.product_list){
					return this.oD.product_list.length
				}else{
					return 0
				}
			}
		},
		methods:{
			goPaymentOrder(){
				this.$router.push({name: "finalOrder" , query:{order_no : this.oD.order_no}})
			}
		},
		created(){
			this.$toast.loading({duration:0, forbidClick:true, mask:true, loadingType:'spinner', message:'加载中...'});
		    this.$http.post('/wxsite/user/api',{
		    	api_name: "orderDetail"
		    	,id: this.$route.query.id
		    }).then(res => {
				this.$toast.clear();

				let rd=res.data.data;

		    	if (res.data.code==1) {
		    		this.oD=rd;
		    	}else{
		        	this.$toast(res.data.msg);
		    	}
			})
		}
	} 
</script>

<style lang="scss" scoped>
	@import '@/assets/css/common.scss';

	.orderDetail{
		margin: 0 .24rem;
		padding-bottom: 1.6rem;
	}
	.banner{
		overflow: hidden;
		margin-top: .4rem;
		img{
			width: 65%;
			min-height:1.276rem
		}
	}
	.content{
		@include box-shadow-abroad(0, 0, .04rem, .02rem, #f1f1f1)
    	margin-bottom: .2rem;
    	.title{
			margin: .33rem  .34rem 0;
			font-size: .32rem;
		    color: #333333;
		    font-weight: bold;
			img{
				width: .32rem;
				height: .32rem;
				margin-right: .35rem;
			}
    	}
	}
	.condition{
		height: 1.34rem;
		line-height: 1.34rem;
		margin: 0 .34rem;
		border-radius: .06rem;
		.icon{
			width: .36rem;
			height: .36rem;
			display: block;
			background:url('~@/assets/imgs/orderStatus.png') no-repeat 100%;
		    background-position-y: 0;
		    background-size: .36rem;
		    float: left;
		    margin-top: .48rem;
		    margin-right: .2rem;
		}
		.icon.active{
			 background-position-y: -.39rem;
		}
		.status{
			font-size: .32rem;
		}
	}
	.relation{
		margin: .33rem  .34rem 0;
		.address{
			font-size: .24rem;
			margin-top: .33rem;
			line-height: .4rem;
			img{
				width: .2rem;
				margin-right: .2rem;
				vertical-align: text-top;
			}
		}
		.pickUp{
			margin: .6rem 0;
			.number{
				font-size: .6rem;
			}
			.description{
				font-size: .24rem;
				margin-right: .32rem;
			}
		}
	}
	.commodityInfo{
		padding: .2rem .34rem;
    	background-color: #fafafa;
    	position:relative;
		img{
			width: 1.2rem;
			height: 1.2rem;
			float: left;
    		margin-right: .28rem;
		}
		.info{
			color: #333;
		    height: 1.2rem;
		    display: flex;
		    display: -webkit-flex;
		    -webkit-box-orient: horizontal;
		    -webkit-box-direction: reverse;
		    -ms-flex-direction: row-reverse;
		    flex-direction: row-reverse;
		    -ms-flex-wrap: wrap;
		    flex-wrap: wrap;
		    -webkit-box-pack: end;
		    -ms-flex-pack: end;
		    justify-content: flex-end;
		    line-height: .4rem;
		    div{
		    	width: 100%;
		    }
		}
		.num{
			position: absolute;
		    right: .4rem;
		    top: 40%;
		    color: $g9;
		}
		.name{
			@include oneLines;
		}
	}
	.payRow{
		margin: 0 .34rem;
		height: 1rem;
		line-height: 1rem;
		.demand{
			color: $g9;
		}
	}
	.depict , .price{
		font-size: .24rem;
		color: $g9;
	}
	.total{
		font-size: .30rem;
		color: $this_y;
	}
	.coding{
		@include box-shadow-abroad(0, 0, .04rem, .02rem, #f1f1f1)
    	padding: .4rem .3rem;
    	.l_name{
    		width: 1.4rem;
		    float: left;
		    display: block;
		    color: $g9;
    	}
    	p{
    		margin-bottom: .28rem;
    	}
    	p:last-of-type{
    		margin-bottom:0;
    	}
	}
	.payBtn{
		position: fixed;
	    bottom: 0;
	    width: 100%;
	    left: 0;
	    height: 1rem;
	    line-height: 1rem;
	    color: #fff;
	    background-color: $this_y;
	    font-weight: bold;
	}
	.assess{
		@include text(.52rem, 0.24rem);
		@include border-radius();
		color:#fff;
		width: 1.35rem;
		position: absolute;
		background-color: #36b160;
	    right: 0;
	    top: 0;
	    top: -.13rem;
	}
</style>