<template>
	<div class="deviceProbing">
		<div class="content">
			<div class="item-1" v-for="(item,index) of product" :key="item.id"  @click.stop="selectProduct(item)" >
				{{item.name}}
				<label class="choice":class="{'active': item.checked}"></label>
				<span v-if="true">正常</span><span v-if="false">异常</span>
			</div>
		</div>
		<div class="bottom">
			<button class="bg-green" @click="checkAllFlag()">全选</button>
			<button class="bg-orange">开始检测</button>
		</div>
	</div>
</template>

<script>
	export default{
		name:"deviceProbing",
		data(){
			return{ 
				product:[
					{"id":1, "name":"A01"},
					{"id":2, "name":"A02"},
					{"id":3, "name":"A03"}
				],
				checkAll:false
			}
		},
		methods:{
			selectProduct(item) {
				if (typeof item.checked == 'undefined') {
					this.$set(item, 'checked', true)
				}else{
					item.checked = !item.checked
				}

				let time=0;
				this.product.forEach((list, index) => {
					if(typeof list.checked != 'undefined' && list.checked==true) {time++ }
				})
				if(time==this.product.length){this.checkAll=true;}else{this.checkAll=false;}
			},
			checkAllFlag() {
				this.checkAll = !this.checkAll;
				this.product.forEach((item, index) => {
					if(typeof item.checked == 'undefined') {
						this.$set(item, 'checked', this.checkAll);
					}else{
						item.checked = this.checkAll;
					}
				})
			}
		}
	} 
</script>

<style lang="scss" scoped>
	@import '@/assets/css/common.scss';

	.bg-green{
		background-color: #36b160;
	}
	.bg-orange{
		background-color: #ffa442;
	}
	.content{
		background-color: #fff;
		border-radius: .1rem;
	}
	.deviceProbing{
		padding: .2rem;
		padding-bottom: 1.2rem;
		min-height: 100vh;
		background-color: #f5f5f5;
	}
	.content{
		padding:0 .3rem;
		div{
			display: flex;
			justify-content: space-between;
			position: relative;
		}
		span{
			position: absolute;
			left: 30%;
			top: 36%;
		}
	}
	.choice{
		border:.02rem solid #ccc;
		border-radius: 50%;
		width: .36rem;
		height: .36rem;
		box-sizing: border-box;
		input{
			display: none;
		}
		&.active{
			background: url('~@/assets/imgs/ic_xuanzhong.png') no-repeat;
			background-size: 100%;
			border:0;
		}
	}
	.bottom{
		position: fixed;
		bottom: 0;
		left: 0;
		width: 100%;
		@include text(1rem,.3rem);
		button{
			width: 50%;
			color:#fff ;
			height: 1rem;
		}
	}
</style>