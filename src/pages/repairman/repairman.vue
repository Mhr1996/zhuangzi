<template>
	<div class="repairman">
		<div class="btn" @click="scanCode">
			<div class="text">激活设备</div>
			<div class="water1"></div>
            <div class="water2"></div>
            <div class="water3"></div>
            <div class="water4"></div>
		</div>
		<div class="signOut" @click="signOut">退出登录</div>
	</div>
</template>

<script>
	export default{
		name:"repairman",
		methods:{
			scanCode(){
				 this.$router.push({path:'/startStore',query:{macno:"123123"}})

				wx.scanQRCode({
	                needResult: 1, // 默认为0，扫描结果由微信处理，1则直接返回扫描结果，
	                scanType: ["qrCode","barCode"], // 可以指定扫二维码还是一维码，默认二者都有
	                success: function (res) {
	                    alert(JSON.stringify(res));

	                    this.scanner_onOff = 0;
	                    if(res.resultStr.indexOf('macno') != -1 && this.$tool.getUrlStringId('macno')){
	                        this.$router.push({path:'/macnoList',query:{macno:this.$tool.getUrlStringId('macno')}})
	                    }else{
	                        this.$toast.fail({message:'当前二维码无效',forbidClick: true});
	                        setTimeout(function(){WeixinJSBridge.call('closeWindow')},2000);
	                    }
	                },
	                complete(){
	                    if(this.scanner_onOff){
	                        WeixinJSBridge.call('closeWindow');
	                    }
	                },
	                error:function(err){
	                    alert(JSON.stringify(err));
	                },
	            });
			},
			signOut(){
				this.$dialog.confirm({
				  	title: '提示',
				  	message: '确定退出登录吗?'
				}).then(() => {
					this.$toast.success({message:"退出成功!" , mask: true});
					this.$tool.removeSession("clerk_token");
					setTimeout(()=>{
						this.$router.push({ name : "replenishment"})
					},1500);
				}).catch(() => {
				  // on cancel
				});
			}
		},
		created(){
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
	                        'scanQRCode'
	                    ] // 必填，需要使用的JS接口列表，所有JS接口列表见附录2
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
	@mixin w-a($as,$bs) {
	   -webkit-animation: wateranimate $as $bs ease-out infinite;
        animation: wateranimate $as $bs ease-out infinite;
	}

	.repairman{
		min-height: 100vh;
		background-color: #f5f5f5;
	}
	@-webkit-keyframes wateranimate {
        0% {
            -webkit-transform: scale(0);
            opacity: 0.4;
        }
        100% {
            -webkit-transform: scale(1.5);
            opacity: 0;
        }
    }
    @keyframes wateranimate {
        0% {
            -webkit-transform: scale(1);
            transform: scale(1);
            opacity: 0.4;
        }
        100% {
            -webkit-transform: scale(1.5);
            transform: scale(1.5);
            opacity: 0;
        }
    }           
    .btn {
        width: 100%;
	    line-height: 7rem;
	    text-align: center;
	    position: fixed;
	    top: 50%;
	    margin-top: -4rem;
	    .text{
	    	position: relative;
	    	z-index: 4;
	    	color: #fff;
	    	background: url('~@/assets/imgs/radio.png') no-repeat;
	    	background-position: center;
	    	background-size: 4rem 4rem;
	    }
    }           
    
    .water1 {
        @include w-a(3s,0s);
    }           
    .water2 {
        @include w-a(3s,1s);
    }           
    .water3 {
        @include w-a(3s,2s);
    }           
    .water4 {
        @include w-a(3s,3s);
    }           
    .water1, .water2, .water3, .water4 {
        padding: 24%;
	    position: absolute;
	    left: 26%;
	    top: 24%;
        box-shadow: 0 0 120px 30px #ffa442 inset;
        border-radius: 100%;
        z-index: 1;
        opacity: 0;
    }
    .signOut{
    	margin: 1rem .65rem;
	    height: 0.88rem;
	    line-height: 0.88rem;
	    text-align: center;
	    font-size: 0.32rem;
	    color: #ffa442;
	    border-radius: 0.08rem;
	    -ms-border-radius: 0.08rem;
	    -moz-border-radius: 0.08rem;
	    -webkit-border-radius: 0.08rem;
	    width: 80%;
	    position: fixed;
	    bottom: .2rem;
	    border: .02rem solid #ffa442;
	    font-weight: bold;
    }
</style>