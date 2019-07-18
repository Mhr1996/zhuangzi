<template>
	<div class="applyAide">
		<ul>
			<li>
				<span class="title">姓名</span><input type="text" placeholder="请输入" Fv="0" FvInfo="请输入姓名" v-model="name">
			</li>
			<li>
				<span class="title">联系方式</span><input type="text" placeholder="请输入" Fv="2" v-model="mobile">
			</li>
			<li>
				<span class="title">身份证号</span><input type="text" placeholder="请输入" Fv="1" v-model="id_card">
			</li>
			<li>
				<p class="m-b-1">上传身份证(正反面)</p>
				<img-up-load width="1.24rem" height="1.24rem" file="file1" @setImgFile="setImgFile" @delImgFile="delImgFile"></img-up-load>
			</li>
			<li>
				<p class="m-b-1">上传资格证书</p>
				<img-up-load width="1.24rem" height="1.24rem" file="file2" @setImgFile="setImgFile" @delImgFile="delImgFile"></img-up-load>
			</li>
			<li>
				<p>希望工作的医院</p>
				<div class="workText"><input type="text" placeholder="请输入" Fv="0" FvInfo="请输入医院名称" v-model="expect"></div>
			</li>
		</ul>
		
		<button class="submit" @click="submit">提交</button>
		<tips :tipsList="tipsList" @know="know"></tips>
	</div>
</template>

<script>
	import ImgUpLoad from '@/components/ImgUpLoad'
	import Tips from '@/components/tips'

	export default{
		name:"applyAide",
		data(){
			return{
				imgFile: [],
				imgsf:[],
				imgzf:[],
				name:"",
				mobile:"",
				id_card:"",
				expect:"",
				tipsList: {
					title: "提示",
					state: "提交成功",
					msg: "审核结果会短信通知您",
					onOff: false,
					submit: true
				}
			}
		},
		components:{
			ImgUpLoad,
			Tips
		},
		methods:{
		    setImgFile(imgFile,fileName){
		    	this.imgFile=imgFile;

		    	let formData = new FormData();

		        formData.append('img',this.imgFile[this.imgFile.length-1]);
		        formData.append('token',this.$tool.getStore("token"));
		        this.$toast.loading({duration:0, forbidClick:true, mask:true, loadingType:'spinner', message:'提交中...'});

				this.$http.post('/wxsite/user/ajaxImg',formData,'multipart/form-data').then(res => {
					this.$toast.clear();

		        	if (res.data.code==1) {
		        		if(fileName=="file1"){
		        			this.imgsf[this.imgsf.length]=res.data.data.img;
		        		}else{
		        			this.imgzf[this.imgzf.length]=res.data.data.img;
		        		}
		        	}else{
			        	this.$toast(res.data.msg);
		        	}
	      		})
		    },
		    delImgFile(index,fileName){
		    	if(fileName=="file1"){
        			this.imgsf.splice(index,1);
        		}else{
        			this.imgzf.splice(index,1);
        		}
		    },
			submit(){
				if(this.$tool.formVerification()){
					if(this.imgsf.length!=2){
						this.$toast("请上传身份证正反面");
						return;
					}
					if(this.imgzf.length==0){
						this.$toast("请上传资格证书");
						return;
					}
					this.$toast.loading({duration:0, forbidClick:true, mask:true, loadingType:'spinner', message:'加载中...'});
				    this.$http.post('/wxsite/Worker/api', {
				    	api_name: "apply"
						,name   : this.name
						,mobile	: this.mobile
						,id_card: this.id_card
						,id_card_photo:this.imgsf.join(",")
						,certificate:  this.imgzf.join(",")
						,expect: this.expect
				    	,order_id: this.$route.query.order_id
				    }).then(res => {
						this.$toast.clear();

						let rd=res.data.data;

				    	if (res.data.code==1) {
				    		this.tipsList.onOff=true;
				    		setTimeout(()=>{
				    			this.$router.push({name:"aideList"});
				    		},1000);
				    	}else{
				        	this.$toast(res.data.msg);
				    	}
					})
				}
			},
			know(){
				this.tipsList.onOff=false;
			}
		}
	} 
</script>

<style lang="scss" scoped>
	@import '@/assets/css/common.scss';
	.applyAide{
		min-height: 100vh;
		background-color: #f5f5f5;
		ul{
			background-color: #fff;
		}
		li{
			padding: .36rem .3rem;
			border-bottom: .02rem solid #eaeaea;
			p{
				color: $g9;
			}
		}
		.title{
			display: inline-table;
			width: 25%;
			color: $g9;
			&+input{
				width: 75%;
			}
		}
		input::-webkit-input-placeholder {
			color: #cccccc;
		}
	}
	.workText{
		input{
			width: 100%;
			padding-top: .2rem;
		}
	}
	.submit{
		margin: 1rem .65rem;
	    height: 0.88rem;
	    line-height: 0.88rem;
	    text-align: center;
	    font-size: 0.32rem;
	    background-color: #ffa442;
	    color: #fff;
	    @include border-radius;
	    width: 80%;
	}
	.m-b-1{
		margin-bottom: .2rem;
	}
</style>