<template>
	<div class="faultRepair">
		<div class="head">
			<p class="fault">故障报修</p>
			<div class="option" @click="optionStatus=1" :class="{active:optionStatus==1}"><span></span>开锁异常</div> 
			<div class="option" @click="optionStatus=2" :class="{active:optionStatus==2}"><span></span>床伸不出来</div>
		</div>
		<div class="list">
			<label>设备号</label><input type="text" placeholder="请输入设备号" v-model="macno" Fv="0" FvInfo="设备号不能为空">
		</div>
		<div class="list">
			<textarea placeholder="请输入您的故障报修内容..." class="textFaul"  v-model="content" Fv="0" FvInfo="故障报修内容不能为空"></textarea>
			<img-up width="1.6rem" height="1.6rem" file="faultUp" @setImgFile="setImgFile" @delImgFile="delImgFile"></img-up>
		</div>
		<div class="list">
			<label>联系电话</label><input type="text" placeholder="请输入您的联系电话" v-model="phone" Fv="2">
		</div>

		<button class="submitBtn" @click="submitFrom">提交</button>
	</div>
</template>

<script>
	import ImgUp from '@/components/ImgUpLoad'
	export default{
		name:"faultRepair",
		data(){
			return{
				macno:null,
				content:null,
				phone:null,
				imgFile: [],
				imgSrc:[],
				optionStatus:1
			}
		},
		components:{
			ImgUp
		},
		methods:{
		    setImgFile(imgFile){
		    	this.imgFile=imgFile;

		    	let formData = new FormData();

		        formData.append('img',this.imgFile[this.imgFile.length-1]);
		        formData.append('token',this.$tool.getStore("token"));
		        this.$toast.loading({duration:0, forbidClick:true, mask:true, loadingType:'spinner', message:'提交中...'});

				this.$http.post('/wxsite/user/ajaxImg',formData,'multipart/form-data').then(res => {
					this.$toast.clear();

		        	if (res.data.code==1) {
		        		this.imgSrc[this.imgSrc.length]=res.data.data.img;
		        	}else{
			        	this.$toast(res.data.msg);
		        	}
	      		})
		    },
		    delImgFile(index){
		    	this.imgSrc.splice(index,1);
		    },
		    submitFrom(){
		    	if(this.$tool.formVerification()){
		    		this.$toast.loading({duration:0, forbidClick:true, mask:true, loadingType:'spinner', message:'提交中...'});

				    this.$http.post('/wxsite/user/api',{
				    	api_name:"feedback"
				    	,content:this.content
				    	,img    :this.imgSrc.join(",")
				    	,macno  :this.macno
				    	,phone  :this.phone
				    	,cabinet_type:this.optionStatus
				    }).then(res => {
						this.$toast.clear();

				    	if (res.data.code==1) {
				    		this.$toast("发送成功");
							setTimeout(()=>{
								this.$router.history.go(-1);
							},1500);
				    	}else{
				        	this.$toast(res.data.msg);
				    	}
					})
		    	}
		    }

		}
	} 
</script>

<style lang="scss" scoped>
	@import '@/assets/css/common.scss';

	.faultRepair{
		padding: .2rem .34rem .2rem .2rem;
		min-height: 100vh;
		background-color: #f5f5f5;
	}
	.fault{
		font-size: .32rem;
		margin-bottom: .3rem;
	}
	.head{
		padding-left: .24rem;
		overflow: hidden;
		margin-bottom: .3rem;
		padding-bottom: .04rem;
	}
	.option{
		margin-right: .7rem;
		float: left;
		width: 30%;
		span{
			display: inline-table;
			width: .36rem;
			height: .36rem;
			border: .02rem solid #cfcfcf;
			border-radius: 50%;
			vertical-align: sub;
			margin-right: .2rem;
			position: relative;
		}
		&.active span{
		    border: .02rem solid #36b160;
		    background-image: radial-gradient(#36b160 45%, transparent 0);
		    background-position: 0;
		    background-repeat: no-repeat;
		}
		/*&.active span:after{
			content: '';
			position: absolute;
			width: .26rem;
			height: .26rem;
			background-color: #36b160;
			background-position: center;
			left: 0;
			top: 0;
		}*/

	}
	.list{
		margin-bottom: .2rem;
		border-bottom: .02rem solid #eaeaea;
		padding: .4rem .24rem;
		background-color: #fff;
		border-radius: .12rem;
		label{
		    display: inline-table;
		    width: 25%;
		    color: $g3;
		}
		label+input{
		    width: 75%;
		    color: $g3;
		}
		input::-webkit-input-placeholder {
		    color: #cccccc;
		}
		textarea{
			width: 100%;
			height: 2rem;
		}
	}
</style>