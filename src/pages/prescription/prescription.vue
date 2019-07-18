<template>
	<div class="prescription">
		<div class="head flex-fsc relative none">
			<img src="@/assets/imgs/nav_back.png" class="p12" style="width: 12px;" @click="backOff"/>
			<span class="fz18 cf" style="position: absolute; top: 50%; left: 50%; margin-top: -9px; margin-left: -45px;">生成处方签</span>
			<span style="color: #ffa442;" class="mr10" @click="send">发送给客户</span>
		</div>
		<div class="content">
			<div class="fromInfo">
				<div class="item flex_i">
					<label>姓名</label><router-link tag="span" :to="{ path:'signatory', query: {druglabel_order_id: oD.druglabel_order_id} }" class="name" style="height: 15px;"></router-link> 
					<label>年龄</label><span class="age">{{oD.user_age}}</span> 
					<label>性别</label><span class="sex">{{oD.user_sex==1?'男':'女'}}</span>
				</div>
				<!-- <div class="item flex_c">
					<label class="category">科别</label><span class="branch" style="    border-right: 1px solid #eaeaea;">外科</span>
					<div class="date_class"><span class="year">2019</span>年<span  class="month">2</span>月<span class="day">11</span>日</div>
				</div> -->
				<div class="item flex-sa">
					<label style=" padding-right: .2rem;">处方号</label><span class="plr_10 flex2">{{oD.serial_number}}</span>
					<label class="plr_10">医保号</label><span class="plr_10 flex2">{{oD.medical_insurance}}</span>
				</div>
				<div class="item flex-sa ai_c">
					<label class="plr_20" style=" padding-right: .2rem;">费用类型</label>
					<div class="plr_10 flex1 flex-sa wrap lh24 radio" style="border-left: 1px solid #eaeaea;color: #999999;justify-content: start;">
						<div v-for="(item,index) of costType" :key="index" :class="{active:item.active}" @click="check(item)">{{item.name}}</div>
					</div>
				</div>
				<div class="item">
					<label class="diagnosis">临床诊断</label><span class="describe" style="text-align:left">{{oD.diagnosis}}</span>
				</div>
				<div class="details">
					<img src="@/assets/imgs/R.png" style="width: 13px; position: absolute;left:20px;top:20px;" />
					<ul>
						<li v-for="(item,index) of 5" :key="index">
							<span class="name">xxxx药</span><span class="num">数量：1</span>
						</li>
					</ul>
					<span class="fz12 c9" style="position: absolute;right:10px;bottom:10px;">2019年7月10日</span>
				</div>
				<div class="item fsb">
					<label>类别</label><span class="plr_4" style="width: 1.44rem;">{{oD.drug_type==1?'中药':oD.drug_type==2?'中成药':oD.drug_type==2?'西药':'状态错误'}}</span>
					<label>医师</label><span class="plr_4" style="width: 1.44rem;border-right: 1px solid #eaeaea;"><img :src="oD.doctor_signature" class="w100" style="height: 15px;" @click="show=!show"></span>
					<div style="width:2rem;">配药<span class="plr_10">{{oD.dispensing_day}}</span>天</div>
				</div>
				<div class="item fsb">
					<label>配药</label><span class="plr_4" style="width: 1.44rem;">{{oD.dispenser}}</span>
					<label>发药</label><span class="plr_4" style="width: 1.44rem;border-right: 1px solid #eaeaea;">{{oD.drug_dispenser}}</span>
					<div style="width:2rem;">药费<span class="price">￥{{oD.drug_price}}</span></div>
				</div>
			</div>
		</div>
		<tips :tipsList="tipsList" v-if="false"></tips>
		<van-image-preview
		  v-model="show"
		  :images="images"
		>
		</van-image-preview>
	</div>
</template>

<script>
	import Tips from '@/components/tips'
	export default{
		name:"prescription",
		data(){
			return{
				show: false,
      			index: 0,
				oD:[],
				param:{},
				costType:[
					{	
						id:1,
						name:"公医",
						active:true
					},
					{
						id:2,
						name:"自费",
						active:false
					},
					{
						id:3,
						name:"其他",
						active:false
					},
					{
						id:4,
						name:"基本医疗保险",
						active:false
					},
					{
						id:5,
						name:"商业医疗保险",
						active:false
					},
				],
				tipsList:{
					title: true,
					img_src: require("@/assets/imgs/device.png"),
					msg: '<p style="margin-bottom:.3rem;">设备异常无法出药</p><p style="margin-bottom:.3rem;">请联系客服</p><p style="margin-bottom:.3rem;">400-1234-1234</p>'
				},
				images:[]
			}
		},
	    components:{
	    	Tips
	    },
	    created(){
	    	this.getOrder();
	    },
	    methods:{
	    	check(li){
	    		this.costType.forEach((item, index) => {
					item.active=false;
				})
	    		li.active=true;
	    		console.log(this.costType)
	    	},
	    	getOrder(){
	    		let self=this;
	    		this.param.api_name="get_druglabel_order";
	    		this.param.druglabel_order_id="46";
	    		this.param.token="eyJ0eXAiOiJKd3QiLCJhbGciOiJIUzI1NiJ9.eyJpYXQiOjE1NTE1MDkwMDUsImV4cCI6MjU5MjAwMCwib2lkIjoiIiwidWlkIjoxMjcxMiwidW5pZCI6IiIsInNpZ251cmUiOiI5Y2E5MDU5MzgyMWEwMTVmMjM0ZTlhODE5NWFlNTU4MiJ9.g6x0yn2rBMf5QbQEiFA-Jt1zsPY0Fa_x_-KuLr_-i4M";
	    		this.$http.post('/app/Userswab/api',this.param).then(res => {
		        	if(res.data.code===1){
		        		self.oD=res.data.data;
		        		self.images[0]=self.oD.doctor_signature;
		        	}else{
		        		this.$toast(res.data.msg);
		        	}
		        	this.$toast.clear();
	      		})
	    	},
	    	backOff(){
	    		console.log("11")
	    		Apk.backOff();
	    	},
	    	send(){
	    		console.log("11")
	    		Apk.send();
	    	}
	    }
	} 
</script>

<style lang="scss" scoped>
	@import '@/assets/css/common.scss';
	.prescription{
		width: 100%;
		min-height: 100vh;
		overflow: hidden;
		background:-moz-linear-gradient(#cfe8c9,#afe2ca);
	    background:-webkit-gradient(linear,center top,center bottom,from(#cfe8c9),to(#afe2ca));
	    background:-webkit-linear-gradient(#cfe8c9,#afe2ca);
	    background:-o-linear-gradient(#cfe8c9,#afe2ca);
	    background:-ms-linear-gradient(#cfe8c9,#afe2ca);
	    background:linear-gradient(#cfe8c9,#afe2ca);
	}
	.content{
		overflow: hidden;
		background: url('~@/assets/imgs/cfq2.jpg') no-repeat;
		background-size: 100%;
		background-position-y: .1rem;
	}
	.fromInfo{
		margin: 38% .24rem .3rem;
		background-color: #fff;
		@include border-radius;
		@include box-shadow-reverse(0px, 0px, 17px, 3px, #fff0df);
		.item{
			padding: .22rem .3rem; 
			border-bottom: 1px solid #eaeaea;
			span{
				display: inline-table;
				text-align: center;
				border-left: 1px solid #eaeaea;
				border-right: 1px solid #eaeaea;
				color: $g9;
				@include box-siz;
			}
			label{
			    text-align: center;
			}
			label:first-of-type {
				padding-left: 0;
				text-align: left;
			}
			span:last-of-type {
				border-right: 0px solid #eaeaea;
			}
			.year, .month, .day{
				margin: 0 .1rem;
				border:0px;
			}
			.describe{
				display: block;
				@extend .ellipsis;
				padding-left: .1rem;
			}
		}
		.name{
			width: 30%;
		}
		.age,.sex{
			width: 10%;
		}
		.branch{
			width: 36%;
			margin-right: .1rem;
		}
		.diagnosis{
			float: left;
			padding-right: .2rem;
		}
		span.price{
			color: $this_y;
		}
	}
	.details{
		padding: .9rem;
		min-height: 2.4rem;
		position: relative;
		    border-bottom: 1px solid #eaeaea;
		li{
			margin-bottom: .3rem;
		}
		.name{
			width: 60%;
			display: inline-table;
		}
		.num{
			width: 40%;
			display: inline-table;
		}
	}
	.flex_i,.flex_o{
		display: flex;
	}
	.flex_i.item{
		label{
			padding: 0 0.2rem;
			width: 11%;
		}
		span{
			padding: 0 0.1rem;	
		}
	}
	.flex_o {
		label{
			width: 24%;
		}
		span{
			width: 26%;
		}
	}
	.flex_c{
		    display: flex;
		    .date_class{
		    	    text-align: center;
    width: 49%;
		    }
	}
	.category{
		    padding: 0 0.2rem;
    width: 11%;
    padding-left: 0;
	}
	/*@media screen and (max-width: 321px) {
	    .fromInfo{
	        margin: 2.4rem .24rem .3rem;
	    }
	}
	@media screen and (min-width: 321px) {
	    .fromInfo{
	        margin: 2.82rem .24rem .3rem;
	    }
	}
	@media screen and (min-width: 414px) {
	    .fromInfo{
	        margin: 3.1rem .24rem .3rem;
	    }
	}*/
	.radio{
		div{
			padding-left: 18px;
			position: relative;
			padding-right: 15px;
			&:after{
				width: 12px;
			    height: 12px;
			    border-radius: 50%;
			    position: absolute;
			    content: '';
			    border: 1px solid #999;
			    left: 0;
			    top: 4px;
			}
			&.active:after{
				width: 13px;
			    height: 13px;
			    border-radius: 50%;
			    position: absolute;
			    content: '';
			    left: 0;
			    top: 4px;
			    background:url('~@/assets/imgs/ic_yxz.png') no-repeat;
			    background-size: 100%;
			    border:0px;
			}
		}
	}
</style>