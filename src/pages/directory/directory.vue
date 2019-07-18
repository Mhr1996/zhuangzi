<template>
	<div class="directory">
		<router-link tag="li" class="item border-bottom" to="bindPhone">
			绑定手机
		</router-link>
		<router-link tag="li" class="item border-bottom" to="optSales">
			选择售货机
		</router-link>
		<!-- <router-link tag="li" class="item border-bottom" >
			药柜详情
		</router-link>
		<router-link tag="li" class="item border-bottom" to="commodityDetail">
			商品详情
		</router-link> -->
		<router-link tag="li" class="item border-bottom" to="personalCenter">
			个人中心
		</router-link>
		<!-- <router-link tag="li" class="item border-bottom" to="orderDetail">
			订单详情
		</router-link> -->
		<router-link tag="li" class="item border-bottom" to="shoppingCar">
			购物车
		</router-link>
		<!-- <router-link tag="li" class="item border-bottom" to="finalOrder">
			确认订单
		</router-link> -->
		<router-link tag="li" class="item border-bottom" to="myOrder">
			我的订单
		</router-link>
		<!-- <router-link tag="li" class="item border-bottom" to="cabinetDetail">
			柜子详情
		</router-link> -->
		
		<router-link tag="li" class="item border-bottom" to="nearby">
			地图 扫一扫
		</router-link>
		<router-link tag="li" class="item border-bottom" :to="{path:'agreement' ,query:{keyword:'consult'}}">
			使用协议
		</router-link>
		<router-link tag="li" class="item border-bottom" :to="{path:'agreement' ,query:{keyword:'give'}}">
			赠药
		</router-link>
		<router-link tag="li" class="item border-bottom" to="replacePhone">
			手机换绑
		</router-link>
		<router-link tag="li" class="item border-bottom" to="faultRepair">
			故障报修
		</router-link>
		<router-link tag="li" class="item border-bottom" to="aboutUs">
			关于我们
		</router-link>
		<router-link tag="li" class="item border-bottom" to="replenishment">
			补货员登录
		</router-link>
		<router-link tag="li" class="item border-bottom" to="chatOnline">
			在线聊天
		</router-link>
		<router-link tag="li" class="item border-bottom" to="signatory">
			签字版
		</router-link>
		<router-link tag="li" class="item border-bottom" to="prescription">
			处方签
		</router-link>
		<router-link tag="li" class="item border-bottom" to="applyAide">
			申请护工
		</router-link>
		<router-link tag="li" class="item border-bottom" to="bookAide">
			预约护工
		</router-link>
		<!-- <router-link tag="li" class="item border-bottom" to="choiceDepartment">
			选择科室
		</router-link>
		<router-link tag="li" class="item border-bottom" to="aideGenre">
			请选择护工分类
		</router-link>
		<router-link tag="li" class="item border-bottom" to="aideOrder">
			护工下单
		</router-link> -->
		<router-link tag="li" class="item border-bottom" to="deviceProbing">
			设备检测
		</router-link>
		<!-- <router-link tag="li" class="item border-bottom" to="evaluate">
			评价
		</router-link> -->
		<router-link tag="li" class="item border-bottom" to="aideList">
			护工订单
		</router-link>
		<router-link tag="li" class="item border-bottom" to="send">
			融云发送
		</router-link>
		<router-link tag="li" class="item border-bottom" to="receive">
			融云接收
		</router-link>
		<router-link tag="li" class="item border-bottom" to="login">
			登录
		</router-link>
		<router-link tag="li" class="item border-bottom" to="register">
			注册
		</router-link>
		<router-link tag="li" class="item border-bottom" to="changePassword">
			修改密码
		</router-link>
		<!-- <div @click="removeOne" style="width: 300px;height: 100px;line-height: 100px;text-align: center;background-color: orange">-1</div>
		<div v-for="item of mapList">{{item.name}}__{{item.price}}</div> -->
	</div>
</template>

<script>
	export default{
		name:"directory"
	} 
</script>

<style lang="scss" scoped>
	.directory{
		display:flex;
		flex-wrap:wrap;
	}
	li{
		height: 30px;
		margin: 10px;
		background-color: #666;
		color:#fff;
		line-height: 30px;
		list-style: none;
		padding: 0 10px;
		    border-radius: .2rem;
	}
</style>