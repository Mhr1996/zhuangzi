import $ from 'jquery';
import { Toast } from 'vant';

export default {
	getUrlStringId: function (name) {//用法 tool.getUrlStringId("地址栏参数名");
		var reg = new RegExp("(^|&)"+ name +"=([^&]*)(&|$)");
		var r = window.location.search.substr(1).match(reg);
		if(r!=null)return  decodeURI(r[2],'utf-8'); return null;
	},
	Verification:function($parameter){
		var statusver=true;
		var	code=$parameter.val().trim();
		switch ($parameter.attr("Fv")) {
	        case ("1")://身份证
	        	var city={11:"北京",12:"天津",13:"河北",14:"山西",15:"内蒙古",21:"辽宁",22:"吉林",23:"黑龙江 ",31:"上海",32:"江苏",33:"浙江",34:"安徽",35:"福建",36:"江西",37:"山东",41:"河南",42:"湖北 ",43:"湖南",44:"广东",45:"广西",46:"海南",50:"重庆",51:"四川",52:"贵州",53:"云南",54:"西藏 ",61:"陕西",62:"甘肃",63:"青海",64:"宁夏",65:"新疆",71:"台湾",81:"香港",82:"澳门",91:"国外 "};
			    var tip = "";
			    var pass= true;
			    if(!code || !/^\d{6}(18|19|20)?\d{2}(0[1-9]|1[12])(0[1-9]|[12]\d|3[01])\d{3}(\d|X)$/i.test(code)){
			        tip = "身份证号格式错误";
			        pass = false;
			    }
			    else if(!city[code.substr(0,2)]){
			        tip = "地址编码错误";
			        pass = false;
			    }
			    else{
			        //18位身份证需要验证最后一位校验位
			        if(code.length == 18){
			            code = code.split('');
			            //加权因子
			            var factor = [ 7, 9, 10, 5, 8, 4, 2, 1, 6, 3, 7, 9, 10, 5, 8, 4, 2 ];
			            //校验位
			            var parity = [ 1, 0, 'X', 9, 8, 7, 6, 5, 4, 3, 2 ];
			            var sum = 0;
			            var ai = 0;
			            var wi = 0;
			            for (var i = 0; i < 17; i++)
			            {
			                ai = code[i];
			                wi = factor[i];
			                sum += ai * wi;
			            }
			            var last = parity[sum % 11];
			            if(parity[sum % 11] != code[17]){
			                tip = "身份证号错误";
			                pass =false;
			            }
			        }
			    }
			    if(!pass) {Toast(tip);statusver=false;}
			    
	            break;
	        case ("2")://手机号
	        	var re=/^1[0-9]{10}$/;
	        	if (!re.test(code)) {Toast("手机号格式不正确");statusver=false;}
	            break;
	        case ("3")://车牌
	        	var re=/^[\u4e00-\u9fa5]{1}[A-Z]{1}[A-Z_0-9]{5}$/;
	        	if (!re.test(code)) {Toast("车牌号格式不正确");statusver=false;}
	            break;
	        case ("4")://数字
	        	if (isNaN(code)) {Toast("格式为数字格式");statusver=false;}
	            break;
	        case ("5")://姓名
	        	var re=/^[\u4e00-\u9fa5]{2,4}$/;
	        	if (!re.test(code)) {Toast("姓名格式不正确");statusver=false;}
	            break;
	        case ("6")://邮箱
	        	var re=/^\w+((-\w+)|(\.\w+))*\@[A-Za-z0-9]+((\.|-)[A-Za-z0-9]+)*\.[A-Za-z0-9]+$/;
	        	if (!re.test(code)) {Toast("邮箱格式不正确");statusver=false;}
	            break;
	        case("7"):
	        	var rePhone = /^(0[0-9]{2,3}[-]{0,1})?[0-9]{7,8}$/;
	        	var reTel=/^1[0-9]{10}$/;
	        	if (!reTel.test(code)&&!rePhone.test(code)) {Toast("电话号码格式不正确");statusver=false;}
	            break;
	        case ("101")://文本框可以为空，不为空时验证手机号
	        	var re=/^1[0-9]{10}$/;
	        	if (code!="") {
	        		if (!re.test(code)) {Toast("手机号格式不正确");statusver=false;}
	        	}
	            break;
	        case ("102")://文本框可以为空，不为空时验证电话号码
	        	var rePhone = /^(0[0-9]{2,3}[-]{0,1})?[0-9]{7,8}$/;
	        	var reTel=/^1[0-9]{10}$/;
	        	if (code!="") {
	        		if (!reTel.test(code)&&!rePhone.test(code)) {Toast("电话号码格式不正确");statusver=false;}
	        	}
	            break;
	        default://为空
	        	if(!code){Toast($parameter.attr("FvInfo"));statusver=false;};
	    }
	    !statusver ? $parameter.focus() : "";
	    return statusver;
	},
	formVerification:function(){
		var zhen=false;
		var Fv=$("input[Fv],textarea[Fv]");
		for (var i = 0; i < Fv.length; i++) {
			if (!this.Verification(Fv.eq(i))) {
				break;
			}
			i==Fv.length-1 ? zhen=true : zhen=false;
		}
		return zhen;
	},
	handleDate:function(date,ymd) {
		if(date==""||date==null){return ""; }
		date=new Date(date);
		var year = date.getFullYear()
		,month = date.getMonth() + 1
		,day = date.getDate()
		,hour = date.getHours()
		,minute = date.getMinutes()
		,second = date.getSeconds();
		if (10 > month) {
			month = "0" + month;
		}
		if (10 > day) {
			day = "0" + day;
		}
		if (10 > hour) {
			hour = "0" + hour;
		}
		if (10 > minute) {
			minute = "0" + minute;
		}
		if (10 > second) {
			second = "0" + second;
		}
		if(ymd=="ss"){
			return year + "-" + month + "-" + day+ " " + hour+ ":" + minute + ":" + second;
		}else if(ymd) {
			return year + "-" + month + "-" + day;
		}else{
			return year + "-" + month + "-" + day+ " " + hour+ ":" + minute;
		}
	},
	retainDecimal:function(num){//保留3位小数，没有小数则返回原本数值
		if (num==""||num==null) {num=0}
		var ex = /^\d+$/;
		return !ex.test(Number(num)) ?Number(num).toFixed(2)*1000/1000:num;
	},
	returnBack:function(d,s){
		for(var D in d){
			if(!D){D="";}
			if (s!==undefined&&s.length>0) {
				for (var i = 0; i < s.length; i++) {
					if(D==s[i]){
						$("select[name="+D+"]").val(d[D]);
					}else{
						$("input[name="+D+"]").val(d[D]);
					}
				}
			}else{
				$("input[name="+D+"]").val(d[D]);
			}
		}
	},
	asyncFalse:function(url ,data ,success_ ){//mobile 接口 参数 
		/*tool.asyncFalse("../task/modifyStatus.do",data,function(r,getLayer){
	        layer.open({content:lcon ,skin: 'msg',time: 2});
	        setTimeout(function(){location.reload();}, 1000);
	    });*/
		
        var dtd = $.Deferred(),layerLoad=null; // 新建一个deferred对象

        var wait = function(dtd){
            layerLoad= layer.open({type: 2,shadeClose: false});
　　　　　　setTimeout(function(){dtd.resolve();/* 改变deferred对象的执行状态*/},500);
　　　　　　return dtd;
        };
        
        $.when(wait(dtd)).done(function(){
            $.ajax({
                url:url,
                type:"post",
                dataType:"json",
                data:data,
                async:false
            }).done(function(r){
                    if (r.status==0) {
                        success_(r,layerLoad);
                    }else{layer.open({content:r.msg,skin: 'msg',time: 2}); }
            }).fail(function(){
                layer.open({content:url+"接口错误",skin: 'msg',time: 2});
            });
        });
    },
    Pastdate:function(type,time){
    	/*
			ct=current time  当前时间
			cy=current year  当前年份
			cm=current month 当前月份
			st=storage		 存储字段
		 */
		time=parseInt(time);
		time=time>0&&!isNaN(time)?time:1;

		var day=null ,ct=new Date() ,cy=ct.getFullYear() ,cm=ct.getMonth() ,st=null;

		switch(type){
			case 0:
				day=ct.getTime()-(24*60*60*1000*time);
			break;
			case 1:
				storage=(new Date(cy,cm-time+1,1).getTime()-new Date(cy,cm-time,1).getTime())/(24*60*60*1000);
				day=new Date(cy,cm-time,storage).getTime();
			break;
		}

		return {
			oDate:day,
			cDate:ct.getTime()
		}
    },
    /**
	 * 存储localStorage
	 */
	setStore:function(name, content){
		if (!name) return;
		if (typeof content !== 'string') {
			content = JSON.stringify(content);
		}
		window.localStorage.setItem(name, content);
	},
	/**
	 * 获取localStorage
	 */
	getStore :function( name ){
		if (!name) return;
		return window.localStorage.getItem(name);
	},
	/**
	 * 删除localStorage
	 */
	removeStore :function( name ){
		if (!name) return;
		window.localStorage.removeItem(name);
	},
	/**
	 * 存储sessionStorage
	 */
	setSession:function(name, content){
		if (!name) return;
		if (typeof content !== 'string') {
			content = JSON.stringify(content);
		}
		window.sessionStorage.setItem(name, content);
	},
	/**
	 * 获取sessionStorage
	 */
	getSession :function( name ){
		if (!name) return;
		return window.sessionStorage.getItem(name);
	},
	/**
	 * 删除sessionStorage
	 */
	removeSession :function( name ){
		if (!name) return;
		window.sessionStorage.removeItem(name);
	},
	wx_js :function(signature,timestamp,nonceStr){
	    var e=decodeURIComponent('jsapi_ticket='+signature+'&noncestr='+nonceStr+'&timestamp='+timestamp+'&url='+location.href.split("#")[0]),
	      s=new jsSHA(e,"TEXT"),
	      signature=s.getHash("SHA-1","HEX");
	    return signature;
	},
	randomString: function(len){ //获取指定字符串
		len = len || 16;
	　　var $chars = 'ABCDEFGHJKMNPQRSTWXYZabcdefhijkmnprstwxyz2345678';    /****默认去掉了容易混淆的字符oOLl,9gq,Vv,Uu,I1****/
	　　var maxPos = $chars.length;
	　　var pwd = '';
	　　for (let i = 0; i < len; i++) {
	　　　　pwd += $chars.charAt(Math.floor(Math.random() * maxPos));
	　　}
	　　return pwd;
	}
}
//调用tool.js  用法为：tool.方法名();