$(document).ready(function() {
	var sid = $('#sid').val()
    $.ajax({
		url:url+'introduce/simpleList/'+sid,
		type:'get',
		success:function(data){
            $('#investToken').val(data.data.investToken);
			if(null==data.data.loginUser.userPaypwd||""==data.data.loginUser.userPaypwd){
				$("#goSetPwd").show().parent().addClass('goset');
			}else{
				$("#goreSetPwd").show().parent().addClass('goset');
				$("#goSetPwd").hide();
			}
			$('#testTemplate').tmpl(data.data).appendTo('#tmpltest');
			$('#myResidual').append(data.data.subject.strResidualMoney); 
            getAmountData()
		}
	});

 });
 
function LinkProtemp(){
	window.open('/html/protem.html?subjectId='+$('#subjectId').val())
}
 //支付功能
function getStatesFn(){
    if($('#agree input').prop('checked')){
        getStatesFn.prototype.yz();  
    }else{
        $.confirm('<i class="i-icon3 i-round-warn"></i>请同意产品购买协议',[{yes:"知道了"}],function(type){if(type=="yes"){this.hide();}},{width:350});  
    }
}
getStatesFn.prototype.yz=function () {
    if(!validation.data.user){window.location.href="/html/login.html?fromurl="+location.href;return}
    if(validation.data.user.userIsreal==0){
        $.confirm('<i class="i-icon3 i-round-warn"></i>您需要进行实名认证后才可以继续投资',[{yes:"立即认证"},{no:'稍后认证'}],function(type){
            if(type==='yes'){
                location.href="/html/realName.html"   
            }
            this.hide();
        },{width:400});
        return;
    }
    if(validation.data.user.userIsblankcard==0){
        $.confirm('<i class="i-icon3 i-round-warn"></i>您需要绑定银行卡后才可以继续投资',[{yes:"立即绑定"},{no:'稍后绑定'}],function(type){
            if(type==='yes'){
                location.href="/html/bindCard.html"   
            }
            this.hide();
        },{width:400});
        return;

    }
    if(!validation.data.user.userRiskType){
        $.confirm('<i class="i-icon3 i-round-warn"></i>您需要风险评测后才可以继续投资',[{yes:"立即评估"},{no:'稍后评估'}],function(type){
            if(type==='yes'){
                location.href="/html/research.html?fromurl="+location.href;   
            }
            this.hide();
        },{width:400});
        return;
    }
    getStatesFn.prototype.tj()
}
getStatesFn.prototype.tj= function (argument) {
    obj = $('#paypwd')
    var PayPsw = obj.val();
    var formsubmit=$('.surebtn .btns');
    var formtext=formsubmit.html();
    function removeDis(){
       formsubmit.removeClass('btns-disable').html(formtext);
    };
    $.ajax({
        type: "POST",
        url:url+'user/checkpayPsw',
        data:{PayPsw:PayPsw},
        beforeSend: function () {formsubmit.addClass('btns-disable').html('投资中...');},
        success: function(data) {
            if(data.message == "fail"){
                rule.erroralert(obj,'交易密码错误');
                removeDis();
            }else{
                rule.success(obj);
                var _this=this;
                var html = "";
                html = '您已阅读和同意产品购买协议<br/>并将购买'+$('.name').text()+'产品，投资金额<span class="zzt-red">'+$.outputmoney($('#investmentMoney').val())+'</span>元，预期收益<span class="zzt-red">'+$('#shouyi').text()+'</span>元';
                $.confirm(html,[{yes:"确定"},{no:'取消'}],function(type,e){
                    if(type==='yes'){
                       getStatesFn.prototype.fn(this,e); 
                    }
                    if(type){this.hide()};
                    
                },{width:500,afterHide:function(){removeDis()}});
            };
        },
        error:function(){
            $('.form-alert').html("系统繁忙，请稍后再试").show();
        }
    });
}
getStatesFn.prototype.fn = function(Dialog,obj){
    var formsubmit=obj.find('.ui-confirm-submit');
    var formtext=formsubmit.html();
    function removeDis(){
        setTimeout(function(){formsubmit.removeClass('btns-disable').html(formtext).data('type','yes');},1000)
    };
    $.ajax({
        url:url+'investment/addInverstment',
        type: "post",
        data:$('#myform').serialize(),// 你的formid
        beforeSend: function () {formsubmit.addClass('btns-disable').html('提交中...').data('type','other');},
        success: function(data) {
            removeDis();
            if("ordererror"==data.message){
                $('.form-alert').html("请勿重复提交订单").show();
                Dialog.hide();
            }else if("pwderror"==data.message){
                rule.erroralert($('#paypwd'),'交易密码错误');
                Dialog.hide();
            }else if("money"==data.message){
                rule.erroralert($('#investmentMoney'),'余额不足');
                Dialog.hide();
            }else if("muchMoney"==data.message){
            	rule.erroralert($('#investmentMoney'),'超出最大投资金额');
                Dialog.hide();
            }else if("userLock"==data.message){
            	$('.form-alert').html("您的账号已经被锁定，不能进行投标，请跟管理员联系！").show();
                Dialog.hide();
            }else if("subjectStateError"==data.message){
            	$('.form-alert').html("借款标状态异常，不能进行投标！").show();
                Dialog.hide();
            }else if("availableLessMin"==data.message){
            	$('.form-alert').html("可用余额小于最小投标金额！").show();
                Dialog.hide();
            }else if("investTooLittle"==data.message){
            	$('.form-alert').html("投资金额必须大于0！").show();
                Dialog.hide();
            }else if("subjectFull"==data.message){
            	$('.form-alert').html("此标已满！").show();
                Dialog.hide();
            }else{
                rule.success($('#paypwd'),'密码正确');
                window.location.href = "/html/success/invesuccess.html";
            }
        },
        error:function(){
            $('.form-alert').html("系统繁忙，请稍后再试").show();
            removeDis();
        }
    });
}
 //自动判断收益
var setamount={
    investFlag:false,
    init:function(value,first) {
        var obj=$('#investmentMoney');
        if(value || value==0){
            obj.val(value);
        }
        var val=obj.val();
        var nianhua=0,shouyi=0;
        $('#upper').text(rule.digitUppercase(val));
        $('#shouyi').text('0.00');
         
    
        if(val<this.data.startingmark){first?null:rule.erroralert(obj,this.data.minMoney+'元起投');return}
        if(val>this.data.residualMoney){first?null:rule.erroralert(obj,'超出剩余可投金额');return}
        if(val>this.data.endingmark){first?null:rule.erroralert(obj,'最大投资额'+this.data.endingmark+'元');return}

        nianhua=this.getnianhua(this.data.type,val);
        shouyi=(val*nianhua*0.01*this.data.days)/365;
        $('#shouyi').text($.outputmoney(shouyi)); 

        
        if(val>Number($('#tmpltest span').text().replace(/,/g,''))){first?null:rule.erroralert(obj,'余额不足');return} 

        var abolishs=val-this.data.startingmark;
        var n=abolishs%this.data.abolish
        if(n!=0){first?null:rule.erroralert(obj,'请按递增金额投资');return}


        first?this.investFlag=true:rule.success(obj);

        
        //$('#nianhua').text(nianhua+'%');
        
    },
    getnianhua:function(type,val) {
        var income=0.06;
        $.each(type,function(i){
            if(type[i].rangestart<=val && val<=type[i].rangeend){
                income=type[i].income;  
            }
        })
        return income;
    }
} 
			
function  getAmountData() {
    var subjectId = $('#subjectId').val();
    $.ajax({
        type:"get",
        url:url+'introduce/getReturn.action?subjectId='+subjectId,
        dataType:'json',
        async: false,
        success:function(data){
            setamount.data = data;
            $('#abolish').html($.outputmoney(data.abolish));
            $('#investmentMoney').on('keyup blur',function() {
                setamount.init();
            });
            var money=$.getQueryString('fromMoney') || setamount.data.startingmark;
            setamount.init(money,true);
            if(!setamount.investFlag){setamount.init(setamount.data.startingmark,true)};
            
        }
    }); 
}


//去重置交易密码
function goreSetPwd(){
	window.location.href ="/html/resetPayPwd.html?fromurl="+location.href;
}
