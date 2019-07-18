<template>
	<div class="personalCenter">
		<div class="head">
			<!-- <div id="test">个人中心</div> -->
			<div class="info">
				<img :src="oD.head_img" /> <p>{{oD.nickname}}</p>
			</div>
		</div>
		<div class="list">
			<ul>
				<router-link tag="li" to="myOrder" class="order border-bottom">
					<div class="icon"></div>我的订单
				</router-link>
				<router-link tag="li" to="aideList" class="aide border-bottom">
					<div class="icon"></div>护工订单
				</router-link>
				<router-link tag="li" :to="{ path:'changePassword', query: {phone: oD.mobile} }" class="bphone border-bottom">
					<div class="icon"></div>修改密码 <!-- <span class="r">{{oD.mobile}}</span> -->
				</router-link>
				<router-link tag="li" to="faultRepair" class="Repair border-bottom">
					<div class="icon"></div>故障报修
				</router-link>
				<a class="link border-bottom" href="tel:13764567708">
					<div class="icon"></div>联系客服 <span class="r">{{oD.tel}}</span>
				</a>
				<router-link tag="li" to="aboutUs" class="about border-bottom">
					<div class="icon"></div>关于我们
				</router-link>
			</ul>
		</div>
	</div>
</template>

<script>

	export default{
		name:"personalCenter",
		data(){
			return {
				oD:{}
			}
		},
		created(){		
			this.$toast.loading({
	            duration:0,
	            forbidClick:true,
	            mask:true,
	            loadingType:'spinner',
	            message:'加载中...'
          	});	
			this.$http.post('/wxsite/user/api',{"api_name":"getUserInfo"}).then(res => {
	        	if(res.data.code===1){
	        		this.oD=res.data.data;
	        	}else{
	        		this.$toast(res.data.msg);
	        	}
	        	this.$toast.clear();
      		})

		}
	} 
</script>

<style lang="scss" scoped>
	@import '@/assets/css/common.scss';

	.head{
		background: url('~@/assets/imgs/person.jpg') no-repeat $this_g;
		background-size: 100%;
		background-position: 0 100.3%;
		height: 3.3rem;
		position: relative;
	}
	#test{
		width: 100%;
		font-size: .36rem;
		color: $g3;
		text-align: center;
		line-height: .8rem;
	}
	.info{
		position: absolute;
		bottom: -.6rem;
		left: 1rem;
		width: 70%;
		img{
			float: left;
    		margin-right: .3rem;
			width: 1.6rem;
			height: 1.6rem;
			border-radius: 100%;
			-webkit-box-shadow: 0px 1px 1px 1px #d0d0d0;
    		box-shadow: 0px 1px 1px 1px #d0d0d0;
		}
		p{
			margin-top: .8rem;
    		font-size: .3rem;
		}
	}
	.list{
		margin-top: 1.72rem;
		padding-left: 1rem;
		ul{
			    padding-left: .72rem;
			li,a{
				display:block;
				color: #333;
				height: 1.2rem;
				line-height: 1.2rem;
				margin-right: .2rem;
				background:url('~@/assets/imgs/right.png') no-repeat;
				background-position: 97%;
    			background-size: .15rem;
    			padding-right: .6rem;
    			box-sizing: border-box;
    			.r{
    				color: $g9;
    			}
			}
			a.link{
				background:none;
			}
		}
	}
	.order, .bphone, .Repair, .link, .about, .aide{
		.icon{
			background:url('~@/assets/imgs/dingdan.png') no-repeat 100%;
			width: .36rem;
		    height: 0.42rem;
		    background-size: .36rem;
		    vertical-align: middle;
		    display: inline-table;
		    margin-right: .4rem;
		    margin-left: -.7rem;
		}
	}
	.aide{
		.icon{
			background-position-y: -2.1rem;
		}
	}
	.order{
		.icon{
		    background-position-y: 0;
		}
	}
	.bphone{
		.icon{background-position-y: -0.4rem;
		}
	}
	.Repair{
		.icon{background-position-y: -0.86rem;
		}
	}
	.link{
		.icon{background-position-y: -1.3rem;
		}
	}
	.about{
		.icon{background-position-y: -1.7rem;
		}
	}
</style>