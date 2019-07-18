<template>
	<div class="finalOrder">
		<div class="content">
			<div class="product_item border-bottom" v-for="(item,index) of oD.list" :key="index">
				<div class="mark">
					<img :src="item.image" class="product">
					<div class="info">
						<div class="name">{{item.name}}</div>
						<div class="note">感冒 <div class="num r">x{{item.num}}</div></div>
						<div class="pro_price">￥{{item.price}}</div>
					</div>
				</div>
			</div>
			<div class="payment border-bottom">
				<span class="l">支付方式</span><span class="r">微信</span>
			</div>
			<div class="subtotal">
				<span class="subtotal-info">共{{oD.goods_num}}件商品</span> 小计:<span class="priceMin">￥{{oD.total_price}}</span>
			</div>
		</div>
		<div class="bottom">
			<div class="total">
				<span>合计</span>
				<span class="priceAll">￥{{oD.total_price}}</span>
			</div>
			<div class="submit" @click="submit">提交订单</div>
		</div>
		<tips :tipsList="tipsList"></tips>
	</div>
</template>

<script>
	import Tips from '@/components/tips'
	export default{
		name:"finalOrder",
		components:{
			Tips
		},
		data(){
			return{
				oD:{},
				tipsList: {
					state: "支付成功",
					msg: "请凭取药码在售货机上取药",
					onOff: false,
					submit: false,
					img_src: require("@/assets/imgs/yaowan.png")
				}
			}
		},
		methods:{
			onBridgeReady(){
				let vis=this;
				this.$toast.loading({duration:0, forbidClick:true, mask:true, loadingType:'spinner', message:'加载中...'});
			    this.$http.post('/wxsite/pay/payOrder',{
			    	order_no: this.$route.query.order_no
			    }).then(res => {
					let rd=res.data.data;

			    	if (res.data.code==1) {
						WeixinJSBridge.invoke(
							'getBrandWCPayRequest', {
								appId: "wxc72b57ad73571b5c",     //公众号名称，由商户传入     
								timeStamp: rd.params.timeStamp,         //时间戳，自1970年以来的秒数     
								nonceStr: rd.params.nonceStr, //随机串     
								package: rd.params.package,     
								signType: rd.params.signType,         //微信签名方式：     
								paySign: rd.params.paySign //微信签名 
							},
							function(jso){
								if(jso.err_msg == "get_brand_wcpay_request:ok"){
									vis.$toast.clear();
									vis.tipsList.onOff=true;
									setTimeout(()=>{
										vis.$router.push({name: "myOrder"});
									},1500);
								}else{
									vis.$toast("失败："+JSON.stringify(jso.data.err_msg));
								}
							}
						); 
			    	}else{
			        	this.$toast(res.data.msg);
			        	this.$router.push({name: "myOrder"});
			    	}
				})
			},
			submit(){
				if (typeof WeixinJSBridge == "undefined"){
				   if( document.addEventListener ){
				       document.addEventListener('WeixinJSBridgeReady', this.onBridgeReady, false);
				   }else if (document.attachEvent){
				       document.attachEvent('WeixinJSBridgeReady', this.onBridgeReady); 
				       document.attachEvent('onWeixinJSBridgeReady', this.onBridgeReady);
				   }
				}else{
				   this.onBridgeReady();
				}
			},
			getList(){
			    this.$http.post('/wxsite/device/api',{
			    	api_name: "proOrderByOrderNo"
			    	,order_no: this.$route.query.order_no
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
		},
		created(){
			this.$toast.loading({duration:0, forbidClick:true, mask:true, loadingType:'spinner', message:'加载中...'});
			this.$http.post('/wxsite/user/api',{"api_name":"getTicket"}).then(res => {
	            if (res.data.code==1) {
	                //获取ticket
	                let timestamp= Math.round(new Date() / 1000)
	                ,nonceStr=this.$tool.randomString(8)
	                ,ticket=this.$tool.wx_js(res.data.data.ticket,timestamp,nonceStr);

	                wx.config({
	                    debug: false, // 开启调试模式,调用的所有api的返回值会在客户端//alert出来，若要查看传入的参数，可以在pc端打开，参数信息会通过log打出，仅在pc端时才会打印。
	                    appId: "wxc72b57ad73571b5c", // 必填，公众号的唯一标识
	                    timestamp: timestamp, // 必填，生成签名的时间戳
	                    nonceStr:  nonceStr, // 必填，生成签名的随机串
	                    signature: ticket ,// 必填，签名，见附录1
	                    jsApiList: [
	                        'checkJsApi'
	                    ] // 必填，需要使用的JS接口列表，所有JS接口列表见附录2
	                });

	                this.getList();
	            }else{
	                this.$toast(res.data.msg);
	                this.$toast.clear();
	            }

	        })
		}
	} 
</script>

<style lang="scss" scoped>
	@import '@/assets/css/common.scss';

	.finalOrder{
		padding-bottom:1.4rem;
	}
	.content{
		margin: 0 .24rem;
	}
	.product_item{
		padding: .24rem 0;
	    box-sizing: border-box;
	    height: 1.98rem;
	    .mark{
			overflow: hidden;
			height: 1.5rem;
		}
		img.product{
			width: 1.5rem;
			height: 1.5rem;
			float: left;
			margin-right: .28rem;
		}
		.info{
			position: relative;
			height: 100%;
			.name{
				margin-bottom: .38rem;
				@include oneLines;
			}
			.note{
				font-size: .24rem;
				color: $g9;
			}
			.pro_price{
				color: $this_y;
			    position: absolute;
			    bottom: 0;
				left: 1.78rem;
				font-size: .24rem;
			}
		}
	}
	.payment{
		padding: .36rem 0;
		overflow: hidden;
	}
	.subtotal{
		margin-top: .28rem;
		text-align: right;
		.subtotal-info{
			margin-right: .7rem;
		}
		.priceMin{
			color: $this_y;
			font-size: .30rem;
		}
	}
	.bottom{
		position: fixed;
		bottom: 0;
		left: 0;
		width: 100%;
		height: 1rem;
		line-height: 1rem;
		overflow: hidden;
		z-index: 10;
    	background-color: #fff;
		.submit{
			float: right;
			background-color: $this_y;
			color: #fff;
			width: 40%;
			text-align: center;
		}
		.total{
			float: left;
			width: 60%;
    		padding-left: .24rem;
    		box-sizing: border-box;
		}
		.priceAll{
			color: $this_y;
			font-weight: bold;
			font-size:.32rem;
		}
	}
</style>