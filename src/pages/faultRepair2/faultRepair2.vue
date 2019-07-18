<template>
	<div class="faultRepair">
		<div class="content">
			<textarea placeholder="请输入您的故障报修内容..." class="textFaul" @input="changeText($event)"></textarea>
			<div class="num">{{textNum}}/150</div>
		</div>
		<div class="imgList">
			<input @change="fileChange($event)" type="file" id="upload_file" style="display: none" accept="image/*"/>
			<div class="item" v-for="(item,index) of imgLook" :key="index"><img :src="item"/><span class="del" @click="delImg(index)">删除</span></div>
			<div class="item add" @click="chooseType" v-if="imgFile.length!=3"><!-- <img src="@/assets/imgs/add.png"/> --></div>
			<span>最多三张</span>
		</div>
		<div class="submit">
			立即提交
		</div>
	</div>
</template>

<script>
	export default{
		name:"faultRepair",
		data(){
			return{
				imgLook: [],
				imgFile: [],
				textNum: 0,
				textVal: ''
			}
		},
		methods:{
			chooseType() {
		        document.getElementById('upload_file').click();
		    },
		    fileChange(e) {
		    	if(this.imgFile.length>6){
		    		this.$toast('最多上传六张图片');
		    		return false;
		    	}
		    	let that = this;
		    	let file = e.target.files[0];
		    	if (file) {
		    		this.imgFile.push(file);
		    		let reader = new FileReader();
		    		reader.readAsDataURL(file);
		    		reader.onload = function (e) {
		    			that.imgLook.push(this.result);
		    		}
		    	} else { console.log('无选择图片'); }
		    },
		    changeText(e){
		    	this.textNum=e.target.value.length;

		    	if (this.textNum>150) {
		    		this.$toast('字数不能超过150字');
		    		e.target.value=this.textVal;
		    		this.textNum--;
		    		return;
		    	}
		    	this.textVal=e.target.value;
		    },
		    delImg(index){
		    	this.imgLook.splice(index,1);
		    	this.imgFile.splice(index,1);
		    }
		}
	} 
</script>

<style lang="scss" scoped>
	@import '@/assets/css/common.scss';
	.content{
		position: relative;
		margin-bottom: .8rem;
		.textFaul{
			width: 100%;
			@include box-siz;
			padding: .3rem;
			min-height: 3rem;
		}
		.num{
			position: absolute;
			bottom: 0;
			right: .3rem;
		}
	}
	.imgList{
		padding-left: .2rem;
		span{
			padding-top: .2rem;
			color: $g9;
			font-size: .24rem;
			clear: both;
			display: block;
		}
		.item{
			width: 31%;
			margin-right: 2%;
			height: 2.18rem;
			float: left;
			position:relative;
			img{
				width: 100%;
				max-height: 100%;
			}

		}
		.item.add{
			border:1px dashed $g9;
			@include box-siz;
			background: url("~@/assets/imgs/add.png") no-repeat;
			background-size: 50%;
			background-position: 50% 50%;
			img{
				width: 50%;
				margin: 0 auto;
				display: block;
				margin-top: 25%;
			}
		}
		.del{
			position:absolute;
			top:0;
			right:0;
			width:.6rem;
			@include text(.3rem,.24rem);
		    background-color: #e05959;
		    padding: .08rem;
		    color: #fff;
		    z-index: 10;
		}
	}
	.submit{
		width: 80%;
		background-color: $this_y;
		color: #fff;
		height: .9rem;
		line-height: .9rem;
		text-align: center;
		margin: 0 auto;
		@include border-radius();
		margin-top: 1.5rem;
	}
</style>