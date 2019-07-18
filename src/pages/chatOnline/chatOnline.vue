<template>
	<div class="chatOnline">
		<div class="content">
			<div class="item">
				<img src="@/assets/imgs/yaowan.png" class="title">
				<div class="info">
					<div class="text">
						请问需要什么内容?
					</div>
				</div>
			</div>
			<div class="right item">
				<img src="@/assets/imgs/yaowan.png" class="title">
				<div class="info">
					<div class="text">
						请问需要什么内容请问需要什么内容请问需要什么内容请问需要什么内容请问需要什么内容请问需要什么内容请问需要什么内容请问需要什么内容请问需要什么内容请问需要什么内容请问需要什么内容?
					</div>
				</div>
			</div>
			<div class="item">
				<img src="@/assets/imgs/yaowan.png" class="title">
				<div class="info">
					<div class="text">
						请问需要什么内容?
					</div>
				</div>
			</div>
			<div class="right item">
				<img src="@/assets/imgs/yaowan.png" class="title">
				<div class="info">
					<div class="text">
						请问需要什么内容?
					</div>
				</div>
			</div>
			<div class="item">
				<img src="@/assets/imgs/yaowan.png" class="title">
				<div class="info">
					<div class="text">
						请问需要什么内容请问需要什么内容请问需要什么内容请问需要什么内容请问需要什么内容请问需要什么内容请问需要什么内容请问需要什么内容请问需要什么内容请问需要什么内容请问需要什么内容
					</div>
				</div>
			</div>
			<div class="item">
				<img src="@/assets/imgs/yaowan.png" class="title">
				<div class="info">
					<div class="text">
						请问需要什么内容?
					</div>
				</div>
			</div>
			<div class="right item">
				<img src="@/assets/imgs/yaowan.png" class="title">
				<div class="info">
					<div class="text">
						请问需要什么内容请问需要什么内容请问需要什么内容请问需要什么内容请问需要什么内容请问需要什么内容请问需要什么内容请问需要什么内容请问需要什么内容请问需要什么内容请问需要什么内容?
					</div>
				</div>
			</div>
			<div class="item">
				<img src="@/assets/imgs/yaowan.png" class="title">
				<div class="info">
					<div class="text">
						请问需要什么内容?
					</div>
				</div>
			</div>
			<div class="right item">
				<img src="@/assets/imgs/yaowan.png" class="title">
				<div class="info">
					<div class="text">
						请问需要什么内容?
					</div>
				</div>
			</div>
			<div class="item">
				<img src="@/assets/imgs/yaowan.png" class="title">
				<div class="info">
					<div class="text">
						请问需要什么内容请问需要什么内容请问需要什么内容请问需要什么内容请问需要什么内容请问需要什么内容请问需要什么内容请问需要什么内容请问需要什么内容请问需要什么内容请问需要什么内容
					</div>
				</div>
			</div>
			<div class="right item" v-for="(item,index) of myNews" :key="index">
				<img src="@/assets/imgs/yaowan.png" class="title">
				<div class="info">
					<div class="text">
						{{item}}
					</div>
				</div>
			</div>
		</div>
		<div class="bottom"><img src="@/assets/imgs/ic_tupian.png"><input type="" name="" v-model="info"><button @click="seed">发送</button></div>
	</div>
</template>

<script>
	export default{
		name:"chatOnline",
		data(){
			return{
				info:"",
				myNews:[]
			}
		},
		methods:{
			seed(){
				this.myNews=[...this.myNews,this.info];
				this.info="";
				setTimeout(()=>{
					window.scrollTo(0, document.body.scrollHeight);
				},100);
				
			}
		}
	} 
</script>

<style lang="scss" scoped>
	@import '@/assets/css/common.scss';

	.content{
		padding-bottom: 1rem;
	}
	.item{
		overflow: hidden;
		margin: .2rem;
	}
	.info{
		float: left;
		width: 62%;
		padding: .1rem 0;
		@include box-siz;
		.text{
			float: left;
			padding: .2rem;
			@include box-shadow-abroad(0px, 0px, 5px, 1px, #e6e6e6);
			@include box-siz;
    		line-height: initial;
		}
	}
	.title{
		margin-right:.2rem;
		width: .9rem;
		height: .9rem;
		float: left;
		@include border-radius(50%);
	}
	.right{
		.info{
			float: right;
		}
		.title{
			float: right;
			margin-right: 0px;
			margin-left: .2rem;
		}
		.text{
			float: right;
			background-color: #eeeeee;
		}
	}
	.bottom{
		position: fixed;
		bottom: 0;
		left: 0;
		width: 100%;
		height: 1rem;
		background-color: #FFF;
		input{
			position: absolute;
		    border-bottom: 1px solid #dadada;
		    border-radius: 0px;
		    bottom: .24rem;
		    height: .46rem;
		    left: .9rem;
    		width: 69%;
		}
		img{
			width: .54rem;
			height: .42rem;
			position: absolute;
		    bottom: .24rem;
		    left: .24rem;
		}
		button{
			width: 14%;
		    color: #fff;
		    background-color: orange;
		    height: .5rem;
		    @include border-radius(0.4rem);
		    position: absolute;
		    bottom: .24rem;
		    right: .24rem;
		}
	}
</style>