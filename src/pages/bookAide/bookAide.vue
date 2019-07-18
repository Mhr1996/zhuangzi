<template>
	<div class="bookAide">
		<div class="city">{{city}}<img @click="rotate($event)" src="@/assets/imgs/refresh.png"/></div>
		<p class="title">医院</p>
		<router-link class="item" v-for="(item,index) of dataList" :key="index" :to="{ path:'choiceDepartment', query: {hospitalId: item.hospitalId} }">
			<img :src="item.photo"/>
			<div class="suggest">
				<p class="name">{{item.hospitalName}}</p>
				<p class="info" v-html="item.hospitalIntro"></p>
			</div>
		</router-link>
	</div>
</template>

<script>
	export default{
		name:"bookAide",
		data(){
			return{
				city:"",
				dataList:{}
			}
		},
		methods:{
			rotate(e){
				if(e.target.className==""){
					e.target.className="refresh";
					this.getGps();

					setTimeout(()=>{
						e.target.className="";
					},1000);
				}
			},
			getList(lat,lng){
				this.$toast.loading({duration:0, forbidClick:true, mask:true, loadingType:'spinner', message:'加载中...'});
			    this.$http.post('/wxsite/Worker/api', {
			    	api_name : "workerList"
			    	,city_name: this.city
			    	,lng:longitude
			    	,lat:latitude
			    }).then(res => {
					this.$toast.clear();

					let rd=res.data.data;
			    	if (res.data.code==1) {
			    		this.dataList = rd;
			    	}else{
			        	this.$toast(res.data.msg);
			    	}
				})
			},
			getGps(){
				let that = this;
			    wx.getLocation({
			        type: 'gcj02', // 默认为wgs84的gps坐标，如果要返回直接给openLocation用的火星坐标，可传入'gcj02'
			        success: function (res) {
			            let latitude = res.latitude; // 纬度，浮点数，范围为90 ~ -90
			            let longitude = res.longitude; // 经度，浮点数，范围为180 ~ -180。

			            let center = new qq.maps.LatLng(latitude,longitude);//plat, plng

			            //获取当前位置
			            var geocoder=new qq.maps.Geocoder();
			            geocoder.getAddress(center);

			            geocoder.setComplete((rs)=>{//设置服务请求成功的回调函数
			                var rsjson=JSON.parse(JSON.stringify(rs));
			                that.city=rsjson.detail.addressComponents.city;
			                
			                that.getList(latitude , longitude);
			            });
			        },error:function(err){
			            console.log(err)
			        }
			    });
			}
		},
		created(){
			//上线打开
			/*this.$toast.loading({duration:0, forbidClick:true, mask:true, loadingType:'spinner', message:'加载中...'});

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
	                    jsApiList: ["checkJsApi","onMenuShareTimeline","onMenuShareAppMessage","onMenuShareQQ","onMenuShareWeibo","hideMenuItems","showMenuItems","hideAllNonBaseMenuItem","showAllNonBaseMenuItem","translateVoice","startRecord","stopRecord","onRecordEnd","playVoice","pauseVoice","stopVoice","uploadVoice","downloadVoice","chooseImage","previewImage","uploadImage","downloadImage","getNetworkType","openLocation","getLocation","hideOptionMenu","showOptionMenu","closeWindow","scanQRCode","chooseWXPay","openProductSpecificView","addCard","chooseCard","openCard"] // 必填，需要使用的JS接口列表，所有JS接口列表见附录2
	                });

	                this.getGps();
	            }else{
	                this.$toast(res.data.msg);
	            }
	        })*/
			this.$toast.loading({duration:0, forbidClick:true, mask:true, loadingType:'spinner', message:'加载中...'});
		    this.$http.post('/wxsite/Worker/api', {
		    	api_name : "workerList"
		    	,city_name: "东莞市"
		    	,lng:113.725810
		    	,lat:22.987090
		    }).then(res => {
				this.$toast.clear();
				this.city="东莞市";
				let rd=res.data.data;
		    	if (res.data.code==1) {
		    		this.dataList = rd;
		    	}else{
		        	this.$toast(res.data.msg);
		    	}
			})
		}
	} 
</script>

<style lang="scss" scoped>
	@import '@/assets/css/common.scss';


	.title{
		font-size: .32rem;
		color: #666;
		margin-top: .4rem;
		margin-bottom: .26rem;
	}
	.bookAide{
		padding:0 .4rem;
		min-height: 100vh;
		background-color: #f5f5f5;
		overflow:hidden
	}
	.city{
		margin-top: .2rem;
		padding: .3rem .3rem .3rem .6rem;
		background: url('~@/assets/imgs/daohang2.png') no-repeat #fff;
		background-size: 0.22rem .26rem;
    	background-position: top .3rem left .3rem;
		@include box-shadow-abroad(0px, 0px, 7px, 1px, #e4e4e4);
		@include border-radius;
		font-size: .3rem;
		color: $g3;
		display: flex;
		justify-content: space-between;
		img{
			width: .4rem;
    		height: .33rem;
		}
		img.refresh{
			
            animation: spin 1s linear infinite;
		}
	}
	.item{
		padding: .3rem;
		@include box-shadow-abroad(0px, 0px, 7px, 1px, #e4e4e4);
		@include border-radius;
		background: url('~@/assets/imgs/right.png') no-repeat;
		background-color: #fff;
		background-position: bottom .5rem right .2rem;
		margin-bottom: .2rem;
		background-size: 0.16rem .3rem;
		display: flex;
		img{
			width: .9rem;
			height: .75rem;
			margin-right: .2rem;
		}
		.suggest{
			display: flex;
			justify-content: space-between;
			flex-direction:column;
			flex-wrap: wrap;
			overflow: hidden;
			.name,.info{
				@include oneLines;
				width: 100%;
			}
			.info{
				color: $g9;
				font-size: .24rem;
			}
		}
	}
	.item:last-of-type{
		margin-bottom: 0;
	}
</style>