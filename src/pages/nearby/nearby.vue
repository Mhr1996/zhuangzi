<template>
  <div>
    <section id="Map" class="vh100" style="width: 100%;height: 100vh;"></section>
    <section>
      <div class="top">
        <div class="title">
          <p class="name">{{current_marker.name}}</p> 
          <img src="@/assets/imgs/dh.png" class="dh" v-if="current_marker.macno" @click="navigation"/>
        </div>
        <div class="address">
          <img src="@/assets/imgs/daohang.png"/>
          <div class="address_info">{{current_marker.address}}</div>
          <router-link class="buy" :to="{ path:'drugDetail', query: {macno: current_marker.macno} }">购药</router-link><!-- v-if="current_marker.macno"  -->
        </div>
      </div>
    </section>
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
            markers:[],
            current_marker:{},
            scanner_onOff:1
        }
    },
    created(){
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

                this.getMarkerList();
            }else{
                this.$toast(res.data.msg);
            }

        })
    },
    beforeDestroy: function() {
        this.$toast.clear({
          clearAll:true
        });
    },
    methods:{
        /*
            获取附近售药机经纬度
        */
        getMarkerList(){
            this.$http.post('/wxsite/Device/api',{
                api_name:"nearbyDevice",
                lat:"23.02067",
                lng:"113.75179"
            }).then(res => {
                if (res.data.code==1) {
                    this.markers=res.data.data;
                    this.initMap();
                }else{
                    this.$toast(res.data.msg);
                    this.$toast.clear();
                }
            })
        },
        /*
            页面点击扫码按钮
        */
        scanCode(){
            //测试阶段直接跳转
            this.$router.push({name:'drugDetail',query:{macno:"5202018070300005"}})

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
        },
        initMap() {
            let latitude=null , longitude=null , that = this;
            let center = new qq.maps.LatLng(22.987090,113.725810);//plat, plng latitude,longitude
            var map = new qq.maps.Map(document.getElementById('Map'), {
                center: center,
                zoom: 14,
                zoomControl: true,
                disableDefaultUI: true,
                draggable: true,//手势控制, 用来设置地图是否能够鼠标拖拽，默认值为“可以”；
                scrollwheel: true,//用来配置地图是否能够通过鼠标滚轮操作进行放大，默认值为“可以”；
                disableDoubleClickZoom: false// 用来配置地图是否可以通过鼠标双击进行放大，默认值为“可以”。
            });

            //获取当前位置
            var geocoder=new qq.maps.Geocoder();
            geocoder.getAddress(center);

            geocoder.setComplete((rs)=>{//设置服务请求成功的回调函数
                var rsjson=JSON.parse(JSON.stringify(rs));

                that.current_marker = {
                    name:"当前位置",
                    address:rsjson.detail.address,
                    macno:"5202018070300005"//测试写死
                };
            });

            //创建标记
            var myLatLng = new qq.maps.Marker({
                position: center,
                map: map,
                zIndex: 0
            });

            //自定义标注图标
            var anchor = new qq.maps.Point(20, 54),
            size = new qq.maps.Size(42, 76),
            origin = new qq.maps.Point(0, 0),
            scaleSize = new qq.maps.Size('70%'),
            markerIcon = new qq.maps.MarkerImage(
                require('@/assets/imgs/zb.png'),
                size,
                origin,
                anchor,
                scaleSize 
            );

            myLatLng.setIcon(markerIcon);
            var ret = that.markers;
            for (var i in ret) {
                var marker_loc = new qq.maps.LatLng(ret[i].lat, ret[i].lng);

                //创建marker
                var marker = new qq.maps.Marker({
                    position: marker_loc,
                    map: map,
                    zIndex: 1
                });
                let marker_ico = ret[i].device_type==2?require('@/assets/imgs/ty.png'):require('@/assets//imgs/ty.png');
                //自定义标注图标
                var anchor = new qq.maps.Point(27, 28),
                origin = new qq.maps.Point(0, 0),
                scaleSize = new qq.maps.Size('100%'),
                markerIcon = new qq.maps.MarkerImage(
                    marker_ico,
                    size,
                    origin,
                    anchor,
                    scaleSize
                );
                marker.setIcon(markerIcon);

                //设置属性
                marker.address = ret[i].address;
                marker.lat = ret[i].lat;
                marker.lng = ret[i].lng;
                marker.device_id = ret[i].device_id;
                marker.macno = ret[i].macno;
                marker.name = ret[i].name;
                marker.device_type = ret[i].device_type;

                //获取标记的点击事件
                qq.maps.event.addListener(marker, 'click', function (e) {
                    that.current_marker = {
                      lat:e.target.lat,
                      lng:e.target.lng,
                      macno:e.target.macno,
                      name:e.target.name,
                      address:e.target.address,
                      device_type:e.target.device_type
                    };
                });
            }
            that.$toast.clear({
              clearAll:true
            });

            //正式的时候替换
            wx.getLocation({
                type: 'gcj02', // 默认为wgs84的gps坐标，如果要返回直接给openLocation用的火星坐标，可传入'gcj02'
                success: function (res) {
                    latitude = res.latitude; // 纬度，浮点数，范围为90 ~ -90
                    longitude = res.longitude; // 经度，浮点数，范围为180 ~ -180。

                    
                }
            });
        },
        navigation(){
            let ck=this.current_marker;
            wx.openLocation({
                latitude: ck.lat*1, // 纬度，浮点数，范围为90 ~ -90
                longitude: ck.lng*1, // 经度，浮点数，范围为180 ~ -180。
                name: ck.name, // 位置名
                address: ck.address, // 地址详情说明
                scale: 14// 地图缩放级别,整形值,范围从1~28。默认为最大
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
        width: 3rem;
        height: 3rem;
        position: absolute;
        left: 50%;
        top: 50%;
        margin-left: -1.5rem;
        margin-top: -1.5rem;
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
.top{
    width: 90%;
    height: 2.25rem;
    position: fixed;
    top: .3rem;
    left: 5%;
    background-color: #fff;
    @include box-shadow-trbl;
    padding: .5rem;
    box-sizing: border-box;
    .title{
        display: flex;
        margin-bottom: .4rem;
    }
    img.dh{
        width: .5rem;
        height: .5rem;
        margin-top: -.1rem;
        margin-left: .3rem;
    }
    .name{
        font-size: .3rem;
        @include oneLines;
        max-width: 80%;
        line-height: .4rem;
    }
    .address{
        color: $g9;
        line-height: .4rem;
        display: flex;
        .address_info{
            @include twoLines;
            width: 80%;
        }
        img{
            margin-right: .2rem;
            width: .28rem;
            height: .36rem;
        }
        .buy{
            width: 1.08rem;
            height: .46rem;
            text-align: center;
            @include text(.46rem);
            color: #fff;
            background-color: $this_g;
            margin-left: .2rem;
            @include border-radius;
            margin-top: -.06rem;
        }
    }
}
</style>
