<template>
	<div class="shoppingCar">
		<div class="product_item border-bottom" v-for="(item,index) of product" :key="index">
			<input type="checkbox" name="shop_check" v-show="false"><label class="check_lab" :class="{'active': item.checked}" @click="selectProduct(item)"></label>
			<div class="mark">
				<img :src="item.image" class="product">
				<div class="info">
					<div class="name">{{item.name}}</div>
					<div class="note">{{item.type_name}}</div>
					<div class="pro_price">{{item.price}}</div>
				</div>
			</div>
			<div class="sliceTeam">
				<span class="cut" @click="changeNumber(item, -1)">-</span>
				<span class="cipherVal">{{item.num}}</span>
				<span class="add" @click="changeNumber(item, 1)">+</span>
			</div>
		</div>
		<div class="bottom">
			<div class="l bottom_info w-5">
				<input name="Fruit" type="checkbox" value="" id="total" /><label class="total" :class="{'active':checkAll}"  @click="checkAllFlag()"></label>
				<span>已选({{checkNum.length}})</span>
				<span class="totalPrice">{{totalMoney | money()}}</span>
			</div>
			<div class="r w-5">
				<div class="bill r" @click="check">结算</div>
				<div class="del r" @click="deleteItem">删除</div>
			</div>
		</div>
	</div>
</template>

<script>
	export default{
		name:"shoppingCar",
		data(){
			return{ 
				product:{},
				totalMoney:0,
				checkNum:[],
				checkAll:false
			}
		},
		filters: {
		    money(value) {
		      	return '￥' + value.toFixed(2);
		    }
		},
		methods:{
			changeNumber(item, way) {
				if( way < 0) {
			        if(item.num == 1) {this.$toast("不能再减了"); return}

			        item.num--;
				}else{
					if(item.product_num<=item.num){
						item.num == item.product_num;
						this.$toast("没有更多库存了");
						return;
					}

					item.num++;
				}
				this.calcTotalMoney();
			},
			selectProduct(item) {
				if (typeof item.checked == 'undefined') {
					this.$set(item, 'checked', true)
				}else{
					item.checked = !item.checked
				}
				this.calcTotalMoney();
			},
			checkAllFlag(item) {
				this.checkAll = !this.checkAll;
				this.product.forEach((item, index) => {
					if(typeof item.checked == 'undefined') {
						this.$set(item, 'checked', this.checkAll);
					}else{
						item.checked = this.checkAll;
					}
				})
				this.calcTotalMoney();
			},
			calcTotalMoney() {
				this.totalMoney = 0,this.checkNum=[];
				this.product.forEach((item, index) => {
					if(item.checked) {
						this.totalMoney += item.price*item.num;
						this.checkNum=[...this.checkNum,item];
					}

					if (this.checkNum.length==this.product.length&&this.checkNum.length!=0) {
						this.checkAll = true;
					}else{
						this.checkAll = false;
					}
				})

				//全删则不走forEach
				this.product.length==0 ? this.checkAll = false:'';
			},
			deleteItem(){
				if (this.checkNum.length==0) {
					this.$toast("您还没有选择药品哦！");
					return;
				}

				this.$dialog.confirm({
				  	title: '提示',
				  	message: '确认删除这'+this.checkNum.length+'种药品吗?'
				}).then(() => {
					let total=JSON.parse(this.$tool.getSession("shoppingCart"));
					this.checkNum.forEach((item,index) => {
						for(let i=total.length;i--;){
							if(item.product_stock_id==total[i].product_stock_id){
								total.splice(i,1);
							}
						}
					});

					this.$tool.setSession("shoppingCart",total);
					this.product=total;
					this.calcTotalMoney();
				}).catch(() => {
					console.log("关闭")
				});
			},
			check(){
				if (this.checkNum.length==0) {
					this.$toast("您还没有选择药品哦！");
					return;
				}

				let OrderBy=[];

				this.checkNum.forEach((item,index) => {
					OrderBy[OrderBy.length]={
						product_stock_id: item.product_stock_id,
						num:item.num
					}
				});
				OrderBy=JSON.stringify(OrderBy);

				this.$toast.loading({duration:0, forbidClick:true, mask:true, loadingType:'spinner', message:'加载中...'});
				this.$http.post('/wxsite/apk/api',{
					api_name: "ApkPayOrderByCart"
					,device_id:this.$route.query.device_id
					,items:OrderBy
					,type:1 //公众号购物车下单
				}).then(res => {

					let rd=res.data.data;

			    	if (res.data.code==1) {
			    		//成功删除购物车信息
			    		let total=JSON.parse(this.$tool.getSession("shoppingCart"));
						this.checkNum.forEach((item,index) => {
							for(let i=total.length;i--;){
								if(item.product_stock_id==total[i].product_stock_id){
									total.splice(i,1);
								}
							}
						});

						//购买后的列表存起来product 选中状态设为false
						this.$tool.setSession("shoppingCart",total);
						this.product=total;
						this.$router.push({name: "finalOrder" , query : { order_no : rd.order_no} });	
			    	}else{
			        	this.$toast(res.data.msg);
			        	this.$toast.clear();
			    	}
				})
			}
		},
		created(){
			/* 获取购物车列表 */
			if(this.$tool.getSession("shoppingCart")){ //获取当前商品session
				this.product = JSON.parse(this.$tool.getSession("shoppingCart"));
			}
		},
	    beforeDestroy: function() {
	        let agent = [...this.product];

			agent.forEach((item,index) => {
				delete item["checked"];
			})
			this.$tool.setSession("shoppingCart",agent);
	    }
	} 
</script>

<style lang="scss" scoped>
	@import '@/assets/css/common.scss';

	.shoppingCar{
		padding-bottom:1.4rem;
		.bottom{
			position: fixed;
			bottom: 0;
			width: 100%;
			left: 0;
			height: 1rem;
			z-index: 10;
    		background-color: #fff;
			.del,.bill{
				height: 1rem;
				width: 50%;
				font-size: .32rem;
				line-height: 1rem;
				text-align: center;
				font-weight: bold;
			}
			.bill{
				background-color: $this_y;
				color: #fff;
			}
			.del{
				background-color: #e5e5e5;
				color: #999999;
			}
			.w-5{
				width: 50%;
			}
		}
		.bottom_info{
			line-height: 1rem;
			position: relative;
		}
		.totalPrice{
			position: absolute;
			right: .2rem;
			color: $this_y;
			font-weight: bold;
		}
	}
	.product_item{
		padding: .24rem;
	    box-sizing: border-box;
	    height: 1.98rem;
		img.product{
			width: 1.5rem;
			height: 1.5rem;
			float: left;
			margin-right: .28rem;
		}

	}
	.mark{
		overflow: hidden;
		height: 1.5rem;
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
				@include oneLines;
				width: 35%;
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
	.check_lab{
		float: left;
		display: block;
		width: .35rem;
		height: .35rem;
		margin-right: .24rem;
		border:1px solid #e5e5e5;
    	margin-top: 0.5rem;
    	box-sizing: border-box;
	}
	.sliceTeam{
		position: absolute;
	    width: 1.7rem;
	    right: .25rem;
	    top: .8rem;
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
	label.active{
		background: url('~@/assets/imgs/ic_shopcar.png') no-repeat;
		background-size: 100%;
		border:0px solid;
	}
	#total{
		display: none;
	}
	.total{
		float: left;
		display: block;
		width: .35rem;
		height: .35rem;
		margin-right: .24rem;
		margin-left: .24rem;
		border:1px solid #e5e5e5;
    	margin-top: 0.3rem;
    	box-sizing: border-box;
	}
	/*input[name=Fruit]:checked+label{
		background: url('~@/assets/imgs/ic_shopcar.png') no-repeat;
		background-size: 100%;
		border:0px solid;
	}*/
</style>