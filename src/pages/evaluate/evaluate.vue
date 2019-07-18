<template>
	<div class="evaluate">
		<div class="content">
			<p class="title">星级评价</p>
			<star-rating @getScore="getScore"></star-rating>
			<div class="info">
				<img src="@/assets/imgs/edit.png"/>
				<div class="info_r">
					<textarea placeholder="请输入您的评价内容..." class="textFaul" v-model="comment_text"></textarea>	
				</div>
			</div>
			<div>
				<img-up-load  width="1.6rem" height="1.6rem" file="evaluate" @setImgFile="setImgFile" @delImgFile="delImgFile"></img-up-load>
			</div>
		</div>
		<div class="submitBtn" @click="submit">提交评价</div>
	</div>
</template>

<script>
	import ImgUpLoad from '@/components/ImgUpLoad'
	import StarRating from '@/components/starRating'
	export default{
		name:"evaluate",
		data(){
			return{
				comment_text:"",
				imgFile: [],
				imgSrc:[],
				comment_star:5
			}
		},
		components:{
			ImgUpLoad,
			StarRating
		},
		methods:{
			getScore(value){
				this.comment_star=value;
			},
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
			submit(){
				if (this.comment_text=="") {
					this.$toast("请输入您的评价内容");
					return;
				}
				this.$toast.loading({duration:0, forbidClick:true, mask:true, loadingType:'spinner', message:'加载中...'});
			    this.$http.post('/wxsite/Worker/api', {
			    	api_name: "comment"
			    	,order_id: this.$route.query.order_id
			    	,comment_star: this.comment_star
			    	,comment_text: this.comment_text
			    	,comment_imgs: this.imgSrc.join(",")
			    }).then(res => {
					this.$toast.clear();

					let rd=res.data.data;

			    	if (res.data.code==1) {
			    		this.$toast("评价成功!");
			    		setTimeout(()=>{
			    			this.$router.history.go(-1);
			    		},1000);
			    	}else{
			        	this.$toast(res.data.msg);
			    	}
				})
			}
		}
	} 
</script>

<style lang="scss" scoped>
	@import '@/assets/css/common.scss';
.evaluate{
	padding: .24rem;
	min-height: 100vh;
	background-color: #f5f5f5;
}
.content{
	background-color: #fff;
	@include border-radius;
	padding: .24rem;
	.title{
		margin-top: .54rem;
		margin-bottom: .52rem;
	}
}
.title{
	font-size: .32rem;
	text-align: center;
	font-weight: bold;
}
.starsList{
	display: flex;
	justify-content: space-around;
	width: 4.5rem;
	margin: 0 auto;
	margin-bottom: .58rem;
	.stars{
		width: .6rem;
		height: .6rem;
		background:url('~@/assets/imgs/greyStars.png') no-repeat;
		background-size: .6rem;
	}
	.stars.active{
		background:url('~@/assets/imgs/openStars.png') no-repeat;
		background-size: .6rem;
	}
}
.info{
	border: .02rem solid #e5e5e5;
	background-color: #f9f9f9;
	padding: .24rem;
	@include border-radius;
	display: flex;
	height: 2.45rem;
	margin-bottom: .22rem;
	img{
		flex-grow:0;
		width: .34rem;
		height: .34rem;
		margin-right: .2rem;
	}
	.info_r{
		flex-grow:1;
	}
	textarea{
		width: 100%;
		height: 100%;
	}
}
</style>