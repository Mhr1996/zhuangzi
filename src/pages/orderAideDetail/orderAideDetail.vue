<template>
	<div class="orderDetail" :style="{paddingBottom:oD.order_type!=1?0:'1.6rem'}">
		<div class="banner">
			<img src="@/assets/imgs/bicycle.png" />
		</div>
		<div class="content">
			<div class="condition border-bottom"> 
				<span class="icon" :class="{active:oD.service_status==3}"></span><span class="status f-b">{{
					oD.service_status == 0 ? "全部" : 
					oD.service_status == 1 ? "已预约" :
					oD.service_status == 2 ? "服务中" :
					oD.service_status == 3 ? "待评价" : 
					oD.service_status == 4 ? "已完成" : ''
				}}</span> 
			</div>
			<div class="relation">
				<p class="name">科室:{{oD.dept}}</p>
				<div class="address">护工分类:{{oD.nurse_type}} <span class="r">{{oD.price}}/天</span></div>
			</div>
			<div class="commodityInfo">
				<div class="info">
					<div class="depict">开始时间: {{oD.service_btime}}</div>
					<div class="price">结束时间: {{oD.service_etime}}</div>
				</div>
			</div>
			<div class="payRow">
				<span class="r total f-b">￥{{oD.total_price}}</span><span class="r f-b">合计:</span>
			</div>
		</div>
		<div class="coding">
			<div class="userinfo">
				用户信息
			</div>
			<p>
				<span class="l_name">{{oD.user}}</span><span class="code">{{oD.phone}}</span>
			</p>
			<p v-if="oD.trade_number!=''">
				<span class="l_name">地址</span><span class="code">{{oD.address}}</span>
			</p>
		</div>
		<div class="coding">
			<p>
				<span class="l_name">订单编号</span><span class="code">{{oD.order_no}}</span>
			</p>
			<p v-if="oD.trade_number!=''">
				<span class="l_name">交易号</span><span class="code">{{oD.trade_number}}</span>
			</p>
			<p>
				<span class="l_name">下单时间</span><span class="code">{{oD.ctime}}</span>
			</p>
		</div>
		<div class="coding" v-if="aide">
			<div class="userinfo">
				护工信息
			</div>
			<p>
				<span class="l_name">{{oD.worker.name}}</span><span class="code">{{oD.worker.mobile}}</span>
			</p>
			<div class="assess" @click="assess">立即评价</div>
		</div>
		<button class="payBtn"  v-if="oD.order_type==1" @click="goPaymentOrder"> 立即支付 </button>
	</div>
</template>

<script>
	export default{
		name:"orderDetail",
		data(){
			return{
				oD:{},
				aide: false
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
			},
			assess(){
				this.$router.push({name: "evaluate" , query:{order_id : this.oD.order_id}})
			}
		},
		created(){
			this.$toast.loading({duration:0, forbidClick:true, mask:true, loadingType:'spinner', message:'加载中...'});
		    this.$http.post('/wxsite/Worker/api',{
		    	api_name: "orderDetail"
		    	,order_id: this.$route.query.order_id
		    }).then(res => {
				this.$toast.clear();

				let rd=res.data.data;

		    	if (res.data.code==1) {
		    		this.oD=rd;
		    		if(rd.worker.name){
		    			this.aide=true;
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
		margin: .33rem  .34rem;
		.name{
			margin-bottom: .37rem
		}
		.address .r{
			color:$this_y;
			font-weight: bold;
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
    	    margin-bottom: .2rem;
    	    position: relative;
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
    	.userinfo{
    		margin-bottom: .28rem;
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
	    right: .4rem;
	    top: 50%;
	    margin-top: -.26rem;
	}
</style>