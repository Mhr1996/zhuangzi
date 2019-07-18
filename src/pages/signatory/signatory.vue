<template>
	<div class="signatory">
		<canvas id="canvasEdit"></canvas>
		<div class="imgDiv">
			<span id="sign_show"></span>
		</div>

		<div id="sign_ok" class="okBtn" @click="getImgList">签字完毕，发送给药师</div>
		<div id="sign_clear" class="clearBtn">重新签字</div>
	</div>
	
</template>

<script>
	import $ from 'jquery';
	import esign from '@/assets/js/esign.js';
	export default{
		name:"signatory",
		data(){
			return{
				param:{}
			}
		},
		created(){
			console.dir(this.$route.query.druglabel_order_id);
		},
		methods:{
			getImgList(){
				setTimeout(()=>{
					let self=this;
					this.$toast.loading({duration:0, forbidClick:true, mask:true, loadingType:'spinner', message:'加载中...'});
					this.param.api_name="signature";
	    			this.param.druglabel_order_id=this.$route.query.druglabel_order_id;
	    			this.param.user_signature=$($("#sign_show img")[0]).attr("src");
	    			this.param.token="eyJ0eXAiOiJKd3QiLCJhbGciOiJIUzI1NiJ9.eyJpYXQiOjE1NTE1MDkwMDUsImV4cCI6MjU5MjAwMCwib2lkIjoiIiwidWlkIjoxMjcxMiwidW5pZCI6IiIsInNpZ251cmUiOiI5Y2E5MDU5MzgyMWEwMTVmMjM0ZTlhODE5NWFlNTU4MiJ9.g6x0yn2rBMf5QbQEiFA-Jt1zsPY0Fa_x_-KuLr_-i4M";
					this.$http.post('/app/Userswab/api',this.param).then(res => {
						self.$toast.clear();
			        	if(res.data.code===1){
			        		self.oD=res.data.data;
			        	}else{
			        		this.$toast(res.data.msg);
			        	}
		      		})
				},300)
			}
		},
		mounted: function() {
			//这个是钩子函数
			//如果cartView函数要执行，必须先执行钩子函数
			//这个钩子函数完成了对cratView函数的调用
			//应该注意的是，使用mounted 并不能保证钩子函数中的 this.$el 在 document 中。为此还应该引入       Vue.nextTick/vm.$nextTick
		    this.$nextTick(function () {
				$(function(){
					//初始化动作，根据DOM的ID不同进行自定义，如果不写则内部默认取这四个
					var canvas = document.getElementById('canvasEdit');
					canvas.width = document.body.clientWidth;
					canvas.height = window.screen.height-50;
					$().esign("canvasEdit", "sign_show", "sign_clear", "sign_ok");

				});
		    })
		}

	} 
</script>

<style lang="scss" scoped>
	@import '@/assets/css/common.scss';

	#sign_ok{
		height: 1rem;
		width: 100%;
		position:fixed;
		bottom: 0;
		left: 0;
		background-color: $this_y;
		color: #fff;
		line-height: 1rem;
		text-align: center;
		font-size: .32rem;
		font-weight: bold;
	}
	.imgDiv{
		display: none;
		width: 100%;
		height: 300px;
	}
	#canvasEdit{
		background: url('~@/assets/imgs/signatory.png') no-repeat center;
	}
	#sign_clear{
		position: fixed;
		bottom: 1.3rem;
		right: 50%;
		width: 1.4rem;
		height: .6rem;
		line-height: .8rem;
		text-align: center;
		font-size: .32rem;
		color: #ffa442;
		font-weight: bold;
		border-bottom: 2px solid #ffa442;
    	margin-right: -.7rem;
	}
</style>