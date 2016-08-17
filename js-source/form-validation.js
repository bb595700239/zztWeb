
var getcode={//获取手机验证码
    wait:60,
    ajax:function(o) {
        var _this=this;
        var obj=$('#phone');
        var phone = obj.val();
        obj.triggerHandler('blur');
        if(obj.data('group-state')){
            this.time(o); 
            $.ajax({
                url:url+o.data('url'),
                type:'post',
                dataType: "json",
                data:{phone:phone},
                success: function(data) {
                    if (data.message == 'success') {
                            
                    }else{
						if(data.message == 'antifail'){
							 $('.form-alert').html('发送短信过多，请稍候重试').show();
						}else if(data.message =='toomuchfail'){
							 $('.form-alert').html('1小时内同一手机号发送次数不能超过3次').show();
						}else{
							$('.form-alert').html('短信发送失败，请稍候重试').show();
						}
                     //   $('.form-alert').html('请求过于频繁，请稍候重试').show();
                    }
                },
                error: function(){
                    $('.form-alert').html('网络连接失败').show();
                }
            });
        }
        
        
    },
    time:function (o) {
        if (this.wait == 0) { 
            o.removeClass('btns-disable');  
            o.text('获取验证码') 
            this.wait = 60; 
        } else { 
            o.addClass('btns-disable'); 
            o.text('重新发送(' + this.wait + ')'); 
           this.wait--; 
           var _this=this;
            setTimeout(function() { 
                _this.time(o) 
            }, 1000) 
        } 
    } 
}
$(function(){
    // $('#agree input').click(function(){//不同意协议按钮置灰
    //     if($(this).prop('checked')){
    //         $('.surebtn a').removeClass('btns-disable')
    //     }else{
    //         $('.surebtn a').addClass('btns-disable')
    //     }
    // });
    $('.surebtn').on({click:function(){
        $('.form-alert').hide();
        rule.checkstate();//检查所有状态
        if(rule.allright){
            if(typeof(getStatesFn)!='undefined'){
                getStatesFn()
            }else{
                rule.getStatesFn()
            }
            return
        }     
        
    }},'a:not(".btns-disable")'); 
    $.enterSend({//回车提交
        main:$(".form-box"),
        action:function(){
            $('.surebtn a:not(".btns-disable")').trigger('click')
        }
    }) 
    
    $('#getcode').on({click:function(){getcode.ajax($(this))}},'a:not(".btns-disable")');
 
})
var  rule={
    getStatesFn:function(){
        var form=$('.g-form');
        var errorbox=$('.form-alert');
        var formsubmit=$('.surebtn .btns');
        var formtext=formsubmit.html();
        var defaults = {
                dialogmes: null,
                gotourl: '/html/account/account.html#manage'
            };
        var options=$.extend(defaults, {
            dialogmes:form.data('dialogmes'),
            gotourl:$.getQueryString('fromurl') || form.data('gotourl')
        })
        function removeDis(){
            setTimeout(function(){formsubmit.removeClass('btns-disable').html(formtext);},1000)
        };
        $.ajax({
            type: "POST",
            url:url+form.data('posturl'),
            data:form.serialize(),// 你的formid
            beforeSend: function () {formsubmit.addClass('btns-disable').html('提交中...');},
            success: function(data) {
                removeDis()
                data.message = data.data || data.message;
                if(data.message=="success"){
                    if(options.dialogmes){
                        $.alert('<i class="i-icon3 i-round-right"></i>'+options.dialogmes,true,function(){
                            location.href=options.gotourl;
                        },5000,{width:'390'}); 
                        return;
                    }
                    window.location.href=options.gotourl;
                }else{
                    var mess;
                    if(data.message=='code'){
                        mess='图片验证码有误';
                        rule.erroralert($('#'+data.message),mess);
                    }else if(data.message=='telCode'){
                        mess='短信验证码有误';
                        rule.erroralert($('#'+data.message),mess);
                    }else{
                        errorbox.html(data.message).show();
                        $('#getcodeJs').trigger('click');
                    }
                }
            },
            error:function(){
                errorbox.html("系统繁忙，请稍后再试").show();
                removeDis()
            }
        });
    },
    allright:true,
    erroralert:function(obj,text) {
        var parent=obj.parent();
        obj.data('group-state',false);
        parent.find('.group-tip').remove();
        parent.addClass('iserror').append('<div class="group-tip"><div class="con">'+text+'<div class="after"></div></div></div>');
        setTimeout(function(){//两次点击错误动画
            if(obj.data('once5201314')){parent.find('.group-tip').addClass('headShake animated')}else {obj.data('once5201314',true);};
        }, 170)
    },
    success:function(obj) {
        obj.data('group-state',true);
        obj.parent().removeClass('iserror').find('.group-tip').remove()
    },
    tip:function(obj,text) {
        if(obj.val()==''){
            var parent=obj.parent();
            parent.removeClass('iserror').find('.group-tip').remove();
            parent.append('<div class="group-tip" style="display:block"><div class="con">'+text+'<div class="after"></div></div></div>');
        }     
    },
    checkstate:function() {//检查所有状态
        rule.allright=true; 

            $.each($('*[data-group-state]'),function (item) {
                $(this).triggerHandler("blur");
                if(!$(this).data('group-state')){
                    rule.allright=false; 
                }
            })
        
        
    },
    empty:function(obj,mess){//不能为空
        var str=obj.val().replace(/(^\s+)|(\s+$)/g,"");
        if(str==''){
            this.erroralert(obj,mess)
        }else{
            this.success(obj);
        }   
    },
    phone:function(obj,callback) {//手机号校验
        var myReg = /^(13[0-9]|15[012356789]|17[678]|18[0-9]|14[57])[0-9]{8}$/;
        if (!myReg.test(obj.val())) {
            this.erroralert(obj,'手机号格式不正确')
        }else{
            if(callback){
                callback(obj)
            }else{
                this.success(obj);
            };
        }
    },
    password:function(obj,obj2) {//密码校验
        var myReg = /^[0-9a-zA-Z]{8,20}$/;
        if (!myReg.test(obj.val())) {
            this.erroralert(obj,'密码格式不正确')
        }else{
            this.success(obj);
        }
        if(obj2&&obj2.val()!=''){
            obj2.triggerHandler("blur");
        }
    },
    repassword:function(obj,obj2) {//重复密码检验
        if (obj.val()!=obj2.val()) {
            this.erroralert(obj,'两次密码不一致')
        }else{
            this.success(obj);
        }
    },
    tradingPassword:function(obj,obj2,callback) {//交易密码校验
        var myReg = /^[0-9]{6}$/;
        if (!myReg.test(obj.val())) {
            this.erroralert(obj,'交易密码格式不正确')
        }else{
            if(callback){
                callback(obj)
            }else{
                this.success(obj);
            };
        }
        if(obj2&&obj2.val()!=''){
            obj2.triggerHandler("blur");
        }
    },
    idcard:function(obj) {//身份证号校验
        var myReg = /^(^[1-9]\d{7}((0\d)|(1[0-2]))(([0|1|2]\d)|3[0-1])\d{3}$)|(^[1-9]\d{5}[1-9]\d{3}((0\d)|(1[0-2]))(([0|1|2]\d)|3[0-1])((\d{4})|\d{3}[Xx])$)$/;
        if (!myReg.test(obj.val())) {
            this.erroralert(obj,'身份证格式不正确')
        }else{
            this.success(obj);
        }
    },
    bankcard:function(obj){//银行卡校验
        var myReg= /^(\d{16}|\d{19})$/;
        if(!myReg.test( obj.val().replace(/\s+/g,"") )){
            this.erroralert(obj,'银行卡格式不正确')
        }else{
            this.success(obj);
        }
    },
    integer:function(obj,mess){//正整数
        if(obj.val()>0){
            //obj.val(parseInt(obj.val(), 10)); 
            this.success(obj);
       }else{
            this.erroralert(obj,mess)
       }
    },
    custom:function(obj,reg,mess,callback){
        var myReg=eval(reg);
        if (!myReg.test(obj.val())) {
            this.erroralert(obj,mess)
        }else{
            if(callback){
                callback(obj)
            }else{
                this.success(obj);
            };
        }
    },
    digitUppercase:function (num) {  
        var strOutput = "";  
        var strUnit = '仟佰拾亿仟佰拾万仟佰拾元角分';
        //num=parseInt(num, 10);
        if(num){
            num += "00";
            var intPos = num.indexOf('.');  
            if (intPos >= 0)  
            num = num.substring(0, intPos) + num.substr(intPos + 1, 2);  
            strUnit = strUnit.substr(strUnit.length - num.length);  
            for (var i=0; i < num.length; i++)  
            strOutput += '零壹贰叁肆伍陆柒捌玖'.substr(num.substr(i,1),1) + strUnit.substr(i,1);  
            return strOutput.replace(/零角零分$/, '整').replace(/零[仟佰拾]/g, '零').replace(/零{2,}/g, '零').replace(/零([亿|万])/g, '$1').replace(/零+元/, '元').replace(/亿零{0,3}万/, '亿').replace(/^元/, "零元");  
        }else{
          return '-';   
        }       
    }
    
}


var JPlaceHolder = {
    //检测
    _check : function(){
        return 'placeholder' in document.createElement('input');
    },
    //初始化
    init : function(){
        if(!this._check()){
            this.fix();
        }
    },
    //修复
    fix : function(){
        jQuery(':input[placeholder]').each(function(index, element) {
            var self = $(this), txt = self.attr('placeholder');
            self.wrap($('<div></div>').css({position:'relative', zoom:'1', border:'none', background:'none', padding:'none', margin:'none'}));
            var pos = self.position(), h = self.outerHeight(true), paddingleft = self.css('padding-left');
            var holder = $('<span></span>').text(txt).css({position:'absolute', left:pos.left, top:pos.top, height:h, lienHeight:h, paddingLeft:paddingleft, color:'#aaa'}).appendTo(self.parent());
            self.focusin(function(e) {
                holder.hide();
            }).focusout(function(e) {
                if(!self.val()){
                    holder.show();
                }
            });
            holder.click(function(e) {
                holder.hide();
                self.focus();
            });
        });
    }
};
//执行
jQuery(function(){
    JPlaceHolder.init();    
});

