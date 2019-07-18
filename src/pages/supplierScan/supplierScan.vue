<template>
  <div>
    <section>
      <div class="bottom">
        <img src="@/assets/imgs/scan.png" @click="scanCode()" />
      </div>
    </section>
  </div>
</template>

<script>
export default {
    name: "nearby",
    data(){
        return {
            scanner_onOff:1
        }
    },
    created(){
        if(this.$tool.getStore("clerk_token")){
            this.$toast.loading({duration:0, forbidClick:true, mask:true, loadingType:'spinner', message:'加载中...'});
            this.$http.post('/wxsite/user/api',{"api_name":"getTicket"}).then(res => {

                if (res.data.code==1) {

                    //获取ticket
                    let timestamp= Math.round(new Date() / 1000)
                    ,nonceStr=this.$tool.randomString(8)
                    ,ticket=this.$tool.wx_js(res.data.data.ticket,timestamp,nonceStr);

                    wx.config({
                        debug: false, // 开启调试模式,调用的所有api的返回值会在客户端//alert出来，若要查看传入的参数，可以在pc端打开，参数信息会通过log打出，仅在pc端时才会打印。
                        appId: "wxc72b57ad73571b5c", // 必填，公众号的唯一标识
                        timestamp: timestamp, // 必填，生成签名的时间戳
                        nonceStr:  nonceStr, // 必填，生成签名的随机串
                        signature: ticket ,// 必填，签名，见附录1
                        jsApiList: [
                            'checkJsApi',
                            'onMenuShareTimeline',
                            'onMenuShareAppMessage',
                            'onMenuShareQQ',
                            'onMenuShareWeibo',
                            'hideMenuItems',
                            'showMenuItems',
                            'hideAllNonBaseMenuItem',
                            'showAllNonBaseMenuItem',
                            'translateVoice',
                            'startRecord',
                            'stopRecord',
                            'onRecordEnd',
                            'playVoice',
                            'pauseVoice',
                            'stopVoice',
                            'uploadVoice',
                            'downloadVoice',
                            'chooseImage',
                            'previewImage',
                            'uploadImage',
                            'downloadImage',
                            'getNetworkType',
                            'openLocation',
                            'getLocation',
                            'hideOptionMenu',
                            'showOptionMenu',
                            'closeWindow',
                            'scanQRCode',
                            'chooseWXPay',
                            'openProductSpecificView',
                            'addCard',
                            'chooseCard',
                            'openCard'
                        ] // 必填，需要使用的JS接口列表，所有JS接口列表见附录2
                    });

                }else{
                    this.$toast(res.data.msg);
                }

            })
        }else{
            this.$router.push({name: "supplierLogin" })
        }
        
    },
    beforeDestroy: function() {
        this.$toast.clear({
          clearAll:true
        });
    },
    methods:{
        /*
            页面点击扫码按钮
        */
        scanCode(){
            //测试阶段直接跳转
            this.$router.push({name:'cabinetDetail',query:{device_id:"1"}})

            wx.scanQRCode({
                needResult: 1, // 默认为0，扫描结果由微信处理，1则直接返回扫描结果，
                scanType: ["qrCode","barCode"], // 可以指定扫二维码还是一维码，默认二者都有
                success: function (res) {
                    alert(JSON.stringify(res));

                    this.scanner_onOff = 0;
                    if(res.resultStr.indexOf('macno') != -1 && this.$tool.getUrlStringId('macno')){
                        this.$router.push({path:'/drugDetail',query:{macno:this.$tool.getUrlStringId('macno')}})
                    }else{
                        this.$toast.fail({message:'当前二维码无效',forbidClick: true});
                        setTimeout(function(){WeixinJSBridge.call('closeWindow')},2000);
                    }
                },
                complete(){
                    if(this.scanner_onOff){
                        WeixinJSBridge.call('closeWindow');
                    }
                },
                error:function(err){
                    alert(JSON.stringify(err));
                },
            });
        }
    }
}
</script>

<style lang='scss' scoped>
  @import '@/assets/css/common.scss';

  .bottom{
    width: 100%;
    height: 4.2rem;
    position: fixed;
    bottom: 0;
    left: 0;
    background: #fff;
    img{
        width: 2.6rem;
        height: 2.6rem;
        position: absolute;
        left: 50%;
        top: 50%;
        margin-left: -1.3rem;
        margin-top: -1.3rem;
    }
    &:after{
        position: absolute;
        content: '';
        width: 100%;
        height: 1.4rem;
        background: url('~@/assets/imgs/arc.png') no-repeat;
        background-size: 100%;
        top: -.9rem;
    }
}
</style>
