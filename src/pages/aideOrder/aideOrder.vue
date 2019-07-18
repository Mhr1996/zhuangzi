<template>
	<div class="aideOrder ">
		<div class="item from_m">
			<ul>
				<li>
					<span>已选择科室</span><input type="text" placeholder="请输入" v-model="dl.deptName" readonly="readonly" onfocus="this.blur();">
				</li>
				<li>
					<span>已选择护工分类</span><input type="text" placeholder="请输入" v-model="dl.type_name" readonly="readonly" onfocus="this.blur();">
				</li>
				<li>
					<span>价格</span><input type="text" placeholder="请输入" :value="dl.price+`/天`" readonly="readonly" onfocus="this.blur();">
				</li>
				<li>
					<handle-time text="开始服务时间" @getTime="getTime" id="start" type="1"></handle-time>
				</li>
				<li>
					<handle-time text="结束服务时间" @getTime="getTime" id="end" type="1"></handle-time>
				</li>
				<li class="t-co">
					共{{intervalTime}}天
				</li>
			</ul>
		</div>

		<div class="item from_m">
			<div class="title"><div>联系信息</div></div>
			<ul>
				<li>
					<span>联系人</span><input type="text" placeholder="请输入" Fv="0" FvInfo="联系人不能为空" v-model="user">
				</li>
				<li>
					<span>联系方式</span><input type="text" placeholder="请输入" Fv="2" v-model="phone">
				</li>
				<li>
					<span>联系地址</span><input type="text" placeholder="请选择" readonly="readonly" onfocus="this.blur();" @click="areaS=!areaS" v-model="areaVal" Fv="0" FvInfo="联系地址不能为空">
				</li>
				<li>
					<!-- <input type="text" placeholder="请输入详细地址"  Fv="0" FvInfo="请输入详细地址" v-model="address" style="width:100%;"> -->
					<textarea placeholder="请输入详细地址"  Fv="0" FvInfo="请输入详细地址" v-model="address" style="width:100%;height:100%;"></textarea>
				</li>
			</ul>
		</div>
		<div class="bottom">
			<div class="total">
				<span class="totalPrice">合计</span>
				<span class="priceAll">￥{{dl.price * intervalTime}}</span>
			</div>
			<div class="submit" @click="submit">立即支付</div>
		</div>
		<van-popup v-model="areaS" position="bottom" :overlay="areaS">
		  	<van-area 
		  		:area-list="areaList"
		  		@cancel="close"
		  		@confirm="setArea"
		  	/>
		</van-popup>
		<tips :tipsList="tipsList" @know="know"></tips>
	</div>
</template>

<script>
	import area from '@/assets/js/area'
	import HandleTime from '@/components/handleTime'
	import Tips from '@/components/tips'

	export default{
		name:"aideOrder",
		components:{
			HandleTime,
			Tips
		},
		data(){
			return{
				dl:{},
				address:"",
				user:"",
				phone:"",
				area :{
					province: ""
				    ,city	: ""
				    ,area	: ""
				},
				areaS:false,
				areaList:area.address,
				areaVal:"",
				startTime:"",
				endTime:"",
				intervalTime:0,
				tipsList: {
					msg: "支付成功<br/>我们正在安排护工<br/>护工会第一时间联系您",
					onOff: false,
					submit: true,
					title: true,
					size: ".32rem"
				}
			}
		},
		methods:{
			setArea(value){
				console.log(value)
				this.areaVal=value[0].name+value[1].name+value[2].name;
				this.area.province=value[0].code;
				this.area.city=value[1].code;
				this.area.area=value[2].code;
				this.areaS=false;
			},
			close(){
				this.areaS=false;
			},
			getTime(seed){
				if (seed.id=="start") {
					this.startTime=seed.datedense;
				}else{
					this.endTime=seed.datedense;
				}

				if (this.startTime!=""&&this.endTime!="") {
					if(this.endTime.getTime()<this.startTime.getTime()){
						this.$toast("结束时间不可晚于开始服务时间!");
						return;
					}

					if(this.endTime.getTime()-this.startTime.getTime()<86400000){
						if(this.endTime.getDate()-this.startTime.getDate()>0){
							this.intervalTime=2;
							return;
						}
						this.intervalTime=1;
					}else{
						this.intervalTime=Math.ceil((this.endTime-this.startTime)/(24*60*60*1000)+1);	
					}
					
				}
			},
			submit(){
				if(this.endTime.getTime()<this.startTime.getTime()){
					this.$toast("结束服务时间不可晚于开始服务时间!");
					return;
				}
				if(this.$tool.formVerification()){
					this.$toast.loading({duration:0, forbidClick:true, mask:true, loadingType:'spinner', message:'加载中...'});
				    this.$http.post('/wxsite/Worker/api', {
				    	api_name: "workerOrder"
				    	,address		: this.areaVal+this.address
				    	,dept_id		: this.dl.dept_id
				    	,hospitalId 	: this.dl.hospitalId
				    	,nurse_type_id	: this.dl.nurse_type_id
				    	,phone			: this.phone
				    	,service_btime	: this.$tool.handleDate(this.startTime,1)
				    	,service_etime	: this.$tool.handleDate(this.endTime,1)
				    	,user			: this.user
				    	,province		: this.area.province
				    	,city			: this.area.city
				    	,area			: this.area.area
				    	,dept_nmae	    : this.$route.query.deptName
				    }).then(res => {
						this.$toast.clear();

						let rd=res.data.data;

				    	if (res.data.code==1) {
				    		this.onBridgeReady(rd.order_no);
				    	}else{
				        	this.$toast(res.data.msg);
				    	}
					})
				}
			},
			onBridgeReady(order_no){
				let vis=this;
				this.$toast.loading({duration:0, forbidClick:true, mask:true, loadingType:'spinner', message:'加载中...'});
			    this.$http.post('/wxsite/workerpay/payOrder',{
			    	order_no: order_no
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
								vis.$toast.clear();
								if(jso.err_msg == "get_brand_wcpay_request:ok"){
									vis.tipsList.onOff=true;
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
			know(){
				this.$router.push({name: "aideList"});
			}
		},
		created(){
			this.dl=this.$route.query;
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
	                    jsApiList: ["checkJsApi"] // 必填，需要使用的JS接口列表，所有JS接口列表见附录2
	                });
	            }else{
	                this.$toast(res.data.msg);
	            }
	        })
		}
	} 
</script>

<style lang="scss" scoped>
	@import '@/assets/css/common.scss';

	.aideOrder{
		padding-bottom:1.2rem;
		min-height: 100vh;
		background-color: #f5f5f5;
	}
	.from_m ul{
	    background-color: #fff;
	}
	.from_m li{
	    padding: 0 .26rem;
	    border-bottom: .02rem solid #eaeaea;
	    @include text(1rem);
	    @include box-siz;
	    text-align: left;
	}
	.from_m li p{
	    color: $g9;
	}
	.from_m span{
	    display: inline-table;
	    width: 25%;
	    color: $g9;
	}
	.from_m span+input{
	    width: 75%;
	    color: $g3;
	}
	.from_m input::-webkit-input-placeholder {
	    color: #cccccc;
	}
	.title{
		background: url('~@/assets/imgs/rectangle.png') no-repeat;
		background-position: top .38rem left .26rem;
		background-size: .08rem .18rem;
		background-color: #fff;
		padding-left: .26rem;
		position: relative;
	    div{
	    	padding: .36rem .26rem;
	    	border-bottom: .02rem solid #eaeaea;
	    }
	}	
	.item{
		margin-bottom: .2rem;
	}
	.from_m span{
		width: 35%;
		color: $g9;
	}
	.from_m span+input{
		width: 65%;
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
	.item li:last-of-type{
		border-bottom: 0;
	}
	.totalPrice{
		font-size: .32rem;
		color:$g9;
	}
</style>