$(function(){
	var arr=['#header','#footer'];
	$.each(arr,function(i,item) {
		var itemobj=$(item);
		if(itemobj.data('temp')){
			$.ajax({
	            url:itemobj.data('temp'),
	            type:'get',
	            dataType:'html',
	            beforeSend: function () {itemobj.append('<div class="loading"></div>');},
	            success:function(response,status,xhr){
	                if(status=='success'){
	                	itemobj.html(response);
						if(i==0){
							itemobj.data('title') ? itemobj.find('.tit').text(itemobj.data('title')) : null;//标题
							itemobj.data('active') ? itemobj.find('.index-nav li[data-active='+itemobj.data('active')+']').addClass('on') : null;
							//验证登陆
							typeof(validation)!='undefined'? validation():null;
						}
					}else{
						alert('Load '+item+' error!')
					}
	            }
	        })
		}else{
			if(i==0){
				typeof(validation)!='undefined'? validation():null;
			}
		}
			
		})

	$.customtitle()
})


var path={
	loginOuts:function(){
	  	$.ajax({
		 	type:"post",
			url:url+"user/loginOut",
			dataType:'json',
			success:function(data){
				location.href = "/index.html";
			}
		})
	},
	gotomyspecial:function(){
		var phone  = $.cookie('phone');
		if(null != phone  && "" != phone){
			location.href =  "/html/mySpecial/mySpecial.html";
		}else{
			location.href =  "/html/login.html?fromurl=/html/mySpecial/mySpecial.html";
		}
	},
	gotoaccount:function(){
		var phone  = $.cookie('phone');
		if(null != phone  && "" != phone){
			location.href =  "/html/account/account.html";
		}else{
			location.href =  "/html/login.html?fromurl=/html/account/account.html";
		}
	},
	gotologin:function(back){
		back ? location.href = "/html/login.html?fromurl="+location.href : location.href = "/html/login.html";
	},
	gotochanrge:function (){//充值方法
		if(!validation.data.user){window.location.href="/html/login.html?fromurl="+location.href;return}
		if(validation.data.user.userIsreal==0){
		    /*$.confirm('<i class="i-icon3 i-round-error"></i>您需要首先进行实名认证才可以充值 ',[{yes:"立即认证"},{no:'稍后认证'}],function(type){
		        if(type==='yes'){
		            location.href="/html/realName.html"   
		        }
		        this.hide();
		    },{width:400});*/
		    location.href="/html/realName.html"
		    return;
		}
		if(validation.data.user.userIsblankcard==0){
		    /*$.confirm('<i class="i-icon3 i-round-error"></i>您需要绑定银行卡才可以充值 ',[{yes:"立即绑定"},{no:'稍后绑定'}],function(type){
		        if(type==='yes'){
		            location.href="/html/bindCard.html"   
		        }
		        this.hide();
		    },{width:400});*/
		    location.href="/html/bindCard.html" 
		    return;

		}
		location.href="/html/account/newrecharge.html";
	},
	gotowithdraw:function (){//提现方法
		if(!validation.data.user){window.location.href="/html/login.html?fromurl="+location.href;return}
		if(validation.data.user.userIsreal==0){
		    /*$.confirm('<i class="i-icon3 i-round-error"></i>您需要首先进行实名认证才可以充值 ',[{yes:"立即认证"},{no:'稍后认证'}],function(type){
		        if(type==='yes'){
		            location.href="/html/realName.html"   
		        }
		        this.hide();
		    },{width:400});*/
		    location.href="/html/realName.html"
		    return;
		}
		if(validation.data.user.userIsblankcard==0){
		    /*$.confirm('<i class="i-icon3 i-round-error"></i>您需要绑定银行卡才可以充值 ',[{yes:"立即绑定"},{no:'稍后绑定'}],function(type){
		        if(type==='yes'){
		            location.href="/html/bindCard.html"   
		        }
		        this.hide();
		    },{width:400});*/
		    location.href="/html/bindCard.html" 
		    return;

		}
	 	window.location.href="/html/account/withdraw.html";
	}

}

;(function($){
	$.extend({
		getQueryString:function(name){
			var reg = new RegExp("(^|&)" + name + "=([^&]*)(&|$)", "i"); 
		    var r = window.location.search.substr(1).match(reg); 
		    if (r != null) return decodeURI(r[2]); return null; 
		},
		enterSend:function(arg){
			arg.main.keyup(function(e) {//回车搜索
		        var keycode = (e.keyCode ? e.keyCode : e.which);
		        if (keycode == '13') {
		            arg.action()
		        }
		    }); 
		},
		outputmoney:function(number){
			if(number==null){return '-';}
			function outputdollars(number){
				if (number.length <= 3){
			        return (number == '' ? '0' : number);
				}
			    else {
			        var mod = number.length % 3;
			        var output = (mod == 0 ? '' : (number.substring(0, mod)));
			        for (i = 0; i < Math.floor(number.length / 3); i++) {
			            if ((mod == 0) && (i == 0))
			                output += number.substring(mod + 3 * i, mod + 3 * i + 3);
			            else
			                output += ',' + number.substring(mod + 3 * i, mod + 3 * i + 3);
			        }
			        return (output);
			    }
			}
			function outputcents(amount){
				amount = Math.round(((amount) - Math.floor(amount)) * 100);
		    	return (amount < 10 ? '.0' + amount : '.' + amount);
			}
			number = String(number).replace(/\,/g, "");
			if(isNaN(number) || number == "")return "";
			number = Math.round(number * 100) / 100;
		    if (number < 0)
		        return '-' + outputdollars(Math.floor(Math.abs(number) - 0) + '') + outputcents(Math.abs(number) - 0);
		    else
		        return outputdollars(Math.floor(number - 0) + '') + outputcents(number - 0);		
		},
		customtitle:function () {
			$("*[data-customtitle]").each(function(b) {
			    if (this.title) {
			        var c = this.title; //把title的赋给自定义属性 myTilte ，屏蔽自带提示
			        var a = 30; 
			        $(this).mouseover(function(d) { 
			            this.title = "";
			            $("body").append('<div id="tooltip" class="none">' + c + "</div>"); 
			            $("#tooltip").css({
			                left: (d.pageX + a) + "px",
			                top: (d.pageY) + "px",
			                opacity: "0.9"
			            }).fadeIn()
			        }).mouseout(function() { 
			            this.title = c; 
			            $("#tooltip").remove() 
			        }).mousemove(function(d) { 
			            $("#tooltip").css({
			                left: (d.pageX + a) + "px",
			                top: d.pageY + "px"
			            })
			        })
			    }
			})
		}

	})
})(jQuery)

/**  
* js时间对象的格式化; 
* eg:format="yyyy-MM-dd hh:mm:ss";   
*/  
Date.prototype.format = function (format) {  
    var o = {  
        "M+": this.getMonth() + 1,  //month   
        "d+": this.getDate(),     //day   
        "h+": this.getHours(),    //hour   
        "m+": this.getMinutes(),  //minute   
        "s+": this.getSeconds(), //second   
        "q+": Math.floor((this.getMonth() + 3) / 3),  //quarter   
        "S": this.getMilliseconds() //millisecond   
    }  
    var week=["星期日","星期一","星期二","星期三","星期四","星期五","星期六"];  
    if (/(y+)/.test(format)) {  
        format = format.replace(RegExp.$1, (this.getFullYear() + "").substr(4 - RegExp.$1.length));  
    }  
    if (/(w+)/.test(format)){  
        format = format.replace(RegExp.$1, week[this.getDay()]);  
    }  
    for (var k in o) {  
        if (new RegExp("(" + k + ")").test(format)) {  
            format = format.replace(RegExp.$1, RegExp.$1.length == 1 ? o[k] : ("00" + o[k]).substr(("" + o[k]).length));  
        }  
    }  
    return format;  
}  
   
/** 
*js中更改日期  
* y年， m月， d日， h小时， n分钟，s秒  
*/  
Date.prototype.add = function (part, value) {  
    value *= 1;  
    if (isNaN(value)) {  
        value = 0;  
    }  
    switch (part) {  
        case "y":  
            this.setFullYear(this.getFullYear() + value);  
            break;  
        case "m":  
            this.setMonth(this.getMonth() + value);  
            break;  
        case "d":  
            this.setDate(this.getDate() + value);  
            break;  
        case "h":  
            this.setHours(this.getHours() + value);  
            break;  
        case "n":  
            this.setMinutes(this.getMinutes() + value);  
            break;  
        case "s":  
            this.setSeconds(this.getSeconds() + value);  
            break;  
        default:  
   
    }
    return this
}

//alert(new Date().add("m", -1).format('yyyy-MM-dd hh:mm:ss')); //时间格式化使用方法 


