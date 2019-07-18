<template>
	<div class="myOrder">
		<div class="nav">
			<ul>
				<li v-for="(item,index) of navList" :key="index" :class={active:item.select} @click="switchNav(item.id)"><span>{{item.title}}</span></li>
			</ul>
		</div>
		<div class="o-f">
			<van-list
			  v-model="loading"
			  :finished="finished"
			  finished-text="没有更多了"
			  :offset="100"
			  @load="getList"
			>
			  <router-link :to="{ path:'orderAideDetail', query: {order_id: item.order_id} }" class="list" v-for="(item,index) of orderList" :key="index">
				<div class="order">
					<span class="code">订单编号: {{item.order_no}}</span><span class="r unpaid">{{
					item.service_status == 0 ? "全部" : 
					item.service_status == 1 ? "已预约" :
					item.service_status == 2 ? "服务中" :
					item.service_status == 3 ? "待评价" : 
					item.service_status == 4 ? "已完成" : ''
				}}</span>
				</div>
				<div class="product_item border-bottom">
					<div class="mark">
						<div class="info">
							<div class="name">科室:{{item.dept}}</div>
							<div class="note">护工分类:{{item.nurse_type}} </div>
							<div class="pro_price">￥{{item.price}}/天</div>
						</div>
					</div>
				</div>
				<div class="subtotal">
					<span class="subtotal-info">共{{item.days}}天</span> 合计:<span class="priceMin">{{item.total_price}}</span>
				</div>
			</router-link>
			</van-list>
			
		</div>
	</div>
</template>

<script>
	export default{
		name:"myOrder",
		data(){
			return{
				navList:[
					{title:"全部", id:0, select:true },
					{title:"已预约", id:1, select:false },
					{title:"服务中", id:2, select:false },
					{title:"待评价", id:3, select:false },
					{title:"已完成", id:4, select:false }
				],
				indexNav : null,
				orderList: [],
				page     : 1,
				pagesize : 10,
				loading  : false,
				finished : false
			}
		},
		methods:{
			switchNav(id) {
				if(this.loading==false){
					for (let i = this.navList.length; i--;) {
						this.navList[i].select=false;
						if (this.navList[i].id==id) {
							this.navList[i].select=true;
						}
						if (this.indexNav.id==id) {return; }//与当前相同则 不继续
					}
					this.page=1;
					this.orderList=[];
					this.finished = false;
					this.loading = true;

					this.getList();
				}
			},
			getList(){
				for (let i = this.navList.length; i--;) {
					if (this.navList[i].select == true) {
						this.indexNav = this.navList[i];
					}
				}

				this.$http.post("/wxsite/Worker/api",{
					"service_status":this.indexNav.id
					,"api_name":"orderList"
					,"page":this.page
					,"pagesize":this.pagesize
				}).then(res => {
					if (res.data.code == 1) {
						this.orderList=[...this.orderList,...res.data.data];
						if (res.data.data.length<10) {
							this.finished = true
						}
						this.page++;
					}else{
						this.$toast(res.data.msg);
					}
					this.loading = false;
				})
			}
		}
	} 
</script>

<style lang="scss" scoped>
	@import '@/assets/css/common.scss';
	.myOrder{
		padding-top: 1rem;
	}
	.order{
		padding: .28rem .28rem;
		.code{
			color: $g9;
		}
	}
	.product_item{
		background-color: #fafafa;
		padding: .24rem .28rem;
	    box-sizing: border-box;
	    height: 1.68rem;
	    .mark{
			overflow: hidden;
			height: 1.2rem;
		}
		img.product{
			width: 1.2rem;
			height: 1.2rem;
			float: left;
			margin-right: .28rem;
		}
		.info{
			position: relative;
			height: 100%;
		}
		.name{
			margin-bottom: .2rem;
			@include oneLines;
		}
		.note{
			font-size: .24rem;
			color: $g9;
		}
		.pro_price{
			color: $g9;
		    position: absolute;
		    bottom: 0;
			left: 0;
			font-size: .24rem;
		}
	}
	.nav{
		padding-top: .2rem;
		position:fixed;
		top:0;
		left:0;
		z-index:10;
		background-color:#fff;
		width: 100%;
		ul{
			display: flex;	
			justify-content: space-between;
			margin-bottom: .2rem;
			padding: 0 .2rem;
			-webkit-box-shadow: 0px 2px 1px 1px #f9f9f9;
			box-shadow: 0px 2px 1px 1px #f9f9f9;
			margin-bottom: 0;
		}
		li{
			padding: 0 0.1rem;
		    span{
		    	text-align:center;
			    height: .88rem;
			    color: #666666;
			    line-height: .76rem;
			    @include border-radiustl(.08rem);
			    @include border-radiustr(.08rem);
			    padding: 0 .2rem;
			    position: relative;
			    display: block;
		    }
		}
		li.active{
			background:url('~@/assets/imgs/fillet.png') no-repeat;
			background-size: 120% 100%;
			background-position-x: 50%;
			span{
				color: #fff;
				background: #36b160;	
			}
		}
	}
	.subtotal{
		padding: .28rem;
		text-align: right;
		.subtotal-info{
			margin-right: .7rem;
		}
	}
	.unpaid{
		color: $this_y;
	}
	.success{
		color: #81bd3d;
	}
</style>