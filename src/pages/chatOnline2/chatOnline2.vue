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
		<div class="bottom"><img src="@/assets/imgs/ic_tupian.png"><input type="" name="" v-model="info"><button @click="click">发送</button></div>
	</div>
</template>

<script>
// appkey
// token
// var targetId = "输入目标的userId";
	export default{
		name:"chatOnline",
		data(){
			return{
				info:"",
				myNews:[]
			}
		},
		created(){
			var appKey = 'lmxuhwagl5ezd';
			RongIMLib.RongIMClient.init(appKey);

			// 连接状态监听器
			RongIMClient.setConnectionStatusListener({
			    onChanged: function (status) {
			        // status 标识当前连接状态
			        switch (status) {
			            case RongIMLib.ConnectionStatus.CONNECTED:
			                console.log('链接成功');
			                break;
			            case RongIMLib.ConnectionStatus.CONNECTING:
			                console.log('正在链接');
			                break;
			            case RongIMLib.ConnectionStatus.DISCONNECTED:
			                console.log('断开连接');
			                break;
			            case RongIMLib.ConnectionStatus.KICKED_OFFLINE_BY_OTHER_CLIENT:
			                console.log('其他设备登录');
			                break;
			            case RongIMLib.ConnectionStatus.DOMAIN_INCORRECT:
			                console.log('域名不正确');
			                break;
			            case RongIMLib.ConnectionStatus.NETWORK_UNAVAILABLE:
			                console.log('网络不可用');
			                break;
			        }
			    }
			});

			// 消息监听器
			RongIMClient.setOnReceiveMessageListener({
			    // 接收到的消息
			    onReceived: function (message) {
			        // 判断消息类型
			        switch(message.messageType){
			            case RongIMClient.MessageType.TextMessage:
			                // message.content.content => 文字内容
			                break;
			            case RongIMClient.MessageType.VoiceMessage:
			                // message.content.content => 格式为 AMR 的音频 base64
			                break;
			            case RongIMClient.MessageType.ImageMessage:
			                // message.content.content => 图片缩略图 base64
			                // message.content.imageUri => 原图 URL
			                break;
			            case RongIMClient.MessageType.LocationMessage:
			                // message.content.latiude => 纬度
			                // message.content.longitude => 经度
			                // message.content.content => 位置图片 base64
			                break;
			            case RongIMClient.MessageType.RichContentMessage:
			                // message.content.content => 文本消息内容
			                // message.content.imageUri => 图片 base64
			                // message.content.url => 原图 URL
			                break;
			            case RongIMClient.MessageType.InformationNotificationMessage:
			                // do something
			                break;
			            case RongIMClient.MessageType.ContactNotificationMessage:
			                // do something
			                break;
			            case RongIMClient.MessageType.ProfileNotificationMessage:
			                // do something
			                break;
			            case RongIMClient.MessageType.CommandNotificationMessage:
			                // do something
			                break;
			            case RongIMClient.MessageType.CommandMessage:
			                // do something
			                break;
			            case RongIMClient.MessageType.UnknownMessage:
			                // do something
			                break;
			            default:
			                // do something
			        }
			    }
			});

			var token = "OSYs8wdKuo9tuDZMLBziONWvC2o/LAMgfQjeSVhh2681dv+le/o+iNw1bPjgbqp0Q+/idyyFoZg+eXf6PxWkhw==";

			RongIMClient.connect(token, {
			    onSuccess: function(userId) {
			        console.log('Connect successfully. ' + userId);
			    },
			    onTokenIncorrect: function() {
			        console.log('token 无效');
			    },
			    onError: function(errorCode){
			        var info = '';
			        switch (errorCode) {
			            case RongIMLib.ErrorCode.TIMEOUT:
			                info = '超时';
			                break;
			            case RongIMLib.ConnectionState.UNACCEPTABLE_PAROTOCOL_VERSION:
			                info = '不可接受的协议版本';
			                break;
			            case RongIMLib.ConnectionState.IDENTIFIER_REJECTED:
			                info = 'appkey不正确';
			                break;
			            case RongIMLib.ConnectionState.SERVER_UNAVAILABLE:
			                info = '服务器不可用';
			                break;
			        }
			        console.log(info);
			    }
			});
		},
		methods:{
			click(){
				let self=this;
				let msg = new RongIMLib.TextMessage({ content: self.info, extra: '能看到吗' });
				let conversationType = RongIMLib.ConversationType.PRIVATE; // 单聊, 其他会话选择相应的消息类型即可
				let targetId = 'mhr001'; // 目标 Id

				RongIMClient.getInstance().sendMessage(conversationType, targetId, msg, {
				    onSuccess: function (message) {
				    	if(message.sentStatus==30){
				    		self.myNews=[...self.myNews,self.info];
							self.info="";
							setTimeout(()=>{
								window.scrollTo(0, document.body.scrollHeight);
							},100);
				    	}
				    	
				        // message 为发送的消息对象并且包含服务器返回的消息唯一 Id 和发送消息时间戳
				        console.log(message);
				    },
				    onError: function (errorCode, message) {
				        var info = '';
				        switch (errorCode) {
				            case RongIMLib.ErrorCode.TIMEOUT:
				                info = '超时';
				                break;
				            case RongIMLib.ErrorCode.UNKNOWN:
				                info = '未知错误';
				                break;
				            case RongIMLib.ErrorCode.REJECTED_BY_BLACKLIST:
				                info = '在黑名单中，无法向对方发送消息';
				                break;
				            case RongIMLib.ErrorCode.NOT_IN_DISCUSSION:
				                info = '不在讨论组中';
				                break;
				            case RongIMLib.ErrorCode.NOT_IN_GROUP:
				                info = '不在群组中';
				                break;
				            case RongIMLib.ErrorCode.NOT_IN_CHATROOM:
				                info = '不在聊天室中';
				                break;
				        }
				        console.log('发送失败: ' + info + errorCode);
				    }
				});
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