<template>
	<div class="cabinetDetail">
		<div class="info">
			<p class="name"><img src="@/assets/imgs/ic_dianpu.png" />{{dlInfo.name}}</p>
			<div class="address">
				<img src="@/assets/imgs/ic_dizhi.png" /><div class="r">{{dlInfo.address}}</div>
			</div>
		</div>
		<div class="content">
			<div class="o-f item">
				<div class="l">设备型号：<span>{{dlInfo.model}}</span></div>
				<div class="r deviceCode">设备编号：<span>{{dlInfo.macno}}</span></div>
			</div>	
			<div class="o-f item">
				<div class="l drug">缺药总数：<span>{{dlInfo.lack_sum}}</span></div>
				<div class="r news">有商品：<span>{{dlInfo.has_pro_sum}}条货道</span></div>
			</div>
			<div class="list border-top" v-for="(item,index) of dlList" :key="index">
				<p class="name">{{item.name}}</p>
				<p class="stock"><span class="stockNum">库存: {{item.product_num}}</span><span>货道位置 行:{{item.row}}列:{{item.col}}</span></p>
				<div class="sliceTeam">
					<span class="cut" @click="changeNumber(item, -1)">-</span>
					<span class="cipherVal">{{item.num}}</span>
					<span class="add" @click="changeNumber(item, 1)">+</span>
				</div>
			</div>
		</div>
		
		<div class="submit" @click="submit">确认补货</div>
		<tips :tipsList="tipsList" @know="know"></tips>
	</div>
</template>

<script>
	import Tips from '@/components/tips'

	export default{
		name:"cabinetDetail",
		components:{
			Tips
		},
		data(){
			return {
				dlInfo:{},
				dlList:{},
				tipsList: {
					msg: "是否确认补货?",
					onOff: false,
					submit: true,
					title: true,
					size: ".32rem",
					boxOff:true
				},
				times:[]
			}
		},
		created:function(){
        	this.$toast.loading({duration:0, forbidClick:true, mask:true, loadingType:'spinner', message:'加载中...'});
		    this.$http.post('/wxsite/clerk/api', {
		    	api_name: "info"
		    	,device_id: this.$route.query.device_id
		    	,clerk_token: this.$tool.getSession("clerk_token")
		    }).then(res => {
				this.$toast.clear();

				let rd=res.data.data;

		    	if (res.data.code==1) {
		    		this.dlInfo=rd.info;
					this.dlList=rd.list;
					this.dlList.forEach((item,index) => {
		        		if(typeof item.num == 'undefined') {
							this.$set(item, 'num', 0);
						}
		        	});
		    	}else{
		        	this.$toast(res.data.msg);
		    	}
			})
        },
        methods:{
        	know(){
        		let self=this;
        		if(self.times.length==0){
        			window.location.reload();
        			// self.tipsList.onOff=false;
        			// self.tipsList.msg="是否确认补货?";
        			return;
        		}
        		this.$toast.loading({duration:0, forbidClick:true, mask:true, loadingType:'spinner', message:'加载中...'});
			    this.$http.post('/wxsite/clerk/api', {
			    	api_name: "supply"
			    	,items:JSON.stringify(self.times)
			    	,device_id:self.dlInfo.device_id
			    	,clerk_token:self.$tool.getSession("clerk_token")
			    }).then(res => {
			    	this.$toast.clear();
			    	if (res.data.code==1) {
			    		self.tipsList.msg="补货成功";
			    		self.times.length=0;
			    	}else{
			        	self.$toast(res.data.msg);
			    	}
				})
        	},
        	changeNumber(item,status){
        		if (status===1) {
        			if(item.product_num>=(Number(item.num)+1)){
        				item.num++;
        			}else{
        				this.$toast("没有更多库存了");
        			}
        		}else{
        			item.num--;
        			if(item.num < 0) {item.num = 0 }
        		}
        	},
        	submit(){
        		let self=this;
        		this.times=[];
        		this.dlList.forEach((item,index)=>{
        			if(item.num != 0) {
						self.times[self.times.length]={
							aisle_id: item.aisle_id,
							num: item.num,
							product_stock_id: item.product_stock_id
						};
					}
        		});
        		if(self.times.length==0){
        			this.$toast("未补货无法提交信息!");return;
        		}else{
        			this.tipsList.onOff=true;
        		}
        	}
        }
	} 
</script>

<style lang="scss" scoped>
	@import '@/assets/css/common.scss';

	.active{
		background-color: red;
	}
	.cabinetDetail{
		width: 100%;
		min-height: 100vh;
		overflow: hidden;
		background-color: #f5f5f5;
	}
	.info{
		-webkit-box-shadow: 0px 2px 1px 1px #f9f9f9;
		background:url('~@/assets/imgs/grandma1.jpg') no-repeat #FFF;
		box-shadow: 0 0 5px #ececec;
		height: 1.8rem;
		margin: .2rem;
    	background-position: -0.15rem 0.5rem;
    	padding-top: .3rem;
    	padding-left: 25%;
    	padding-right: .2rem;
    	box-sizing: border-box;
    	background-size: auto 80%;
    	img{
    		width: .26rem;
    		margin-right: .22rem;
    	}
    	p{
    		margin-bottom: .2rem;
    		line-height: 0.36rem;
    	}
    	.address{
			margin-left: .48rem;
			img{
				margin-left: -.48rem;
			}
			.r{
				@include twoLines;
			}
		}
		.name{
			@include oneLines;
		}
	}
	.content{
		margin: 0 .2rem;
		@include box-shadow-trbl;
		@include border-radius(.08rem);
		background-color: #fff;
		padding: 0 .22rem;
		overflow: hidden;
		.item{
			padding: 0 .42rem .34rem;
			margin-top: .34rem;
			color: $g9;
		}
		span{
			color: $g3;
		}
		.drug{
			background:url('~@/assets/imgs/ic_zongshu.png') no-repeat;
			background-size: .33rem .33rem;
			padding-left: .43rem;
			height: .40rem;
    		line-height: .4rem;
		}
		.news{
			background:url('~@/assets/imgs/ic_shangpin.png') no-repeat;
			background-size: .33rem .33rem;
			padding-left: .43rem;
			height: .40rem;
    		line-height: .4rem;
		}
		.list{
			position: relative;
			height: 1.64rem;
			padding: .42rem;
			box-sizing: border-box;
			.name{
				margin-bottom: .24rem;
				@include oneLines;
				width: 70%;
			}
			span{
				color: $g9;
			}
		}
		.stockNum{
			margin-right: .5rem;
		}
		.sliceTeam{
			position: absolute;
		    width: 1.65rem;
		    right: .10rem;
		    top: .56rem;
			.cut, .add{
				width: .48rem;
				height: .48rem;
				display: inline-table;
				line-height: .48rem;
				text-align: center;
				color: $g9;
				border:1px solid #ccc;
				border-radius: .08rem;
			}
			.cipherVal{
				display: inline-table;
				width: .6rem;
				text-align: center;
				color: $g9;
			}
		}
	}
	.submit{
		margin: 1rem .65rem;
		@include text(.88rem , .32rem);
		background-color: $this_y;
		color: #fff;
		@include border-radius;
	}

	.deviceCode{
		@include oneLines;
		width: 2.5rem;
	}
</style>