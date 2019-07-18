<template>
	<div class="bindphone">
		
	</div>
</template>

<script>
	export default{
		name:"bindPhone",
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
			    	console.log(message)
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

			var token = "I5/zmOHI20CqlqqfbTfh9pobAotT9kJ6ZzT1rbn46VzjOLAYl9Zid+8AjWVC/0KKnQ5SkenKIFgf/ZlHVhqUBA==";

			RongIMClient.connect(token, {
			    onSuccess: function(userId,a,b,c,d,e,f,g) {
			        console.log('Connect successfully. ' + userId);
			        console.log(arguments)
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
		}
	} 
</script>

<style lang="scss" scoped>
</style>