
$(function (){
    $('#getcodeJs').click(function(){//点击更换图片验证码
        var imgobj=$(this).find('img');
        var src = imgobj.attr('src').split('?')[0];
        imgobj.attr('src',src+'?t='+new Date().getTime());
    }).find('img').attr('src',url+"code").end().trigger('click');

	$('.btns-info:not(".btns-disable")').click(function () {
		var num=0
		$.each($('*[data-group-state]'),function (item) {
                eval($(this).data("blur"))
                if(!$(this).data('group-state')){return false;}
                num++;
            })
		if(num==3){getStatesFn()}

        var _this=$(this);
        $('.form-alert').removeClass('headShake animated')
        setTimeout(function(){//两次点击错误动画
            if(_this.data('once5201314')){$('.form-alert').addClass('headShake animated')}else{
                _this.data('once5201314',true);
            };    
        }, 170)	
        
	});

    $.enterSend({
        main:$(".form-box"),
        action:function(){
            $('.btns-info:not(".btns-disable")').trigger('click');
        }
    });
    
	// $('.g-input').focus(function() {//当前输入框图标高亮
 //        $(this).prev('i').addClass('on');
 //    }).blur(function () {
 //        $(this).prev('i').removeClass('on');
 //    })
})

var loginrule={
	erroralert:function(obj,mess) {
		$('.form-group').removeClass('iserror');
        obj.data('group-state',false).parents('.form-group').addClass('iserror');
        $('.form-alert').html(mess).show();
        obj.focus();
    },
    success:function(obj) {
    	$('.form-group').removeClass('iserror');
        obj.data('group-state',true).parents('.form-group').removeClass('iserror');
        $('.form-alert').html('').hide();
    },
    empty:function(obj,mess){//不能为空
        var str=obj.val().replace(/(^\s+)|(\s+$)/g,"");
        if(str==''){
            this.erroralert(obj,mess)
        }else{
            this.success(obj);
        }   
    },
    phone:function(obj) {//手机号校验
        var myReg = /^(13[0-9]|15[012356789]|17[678]|18[0-9]|14[57])[0-9]{8}$/;
        var str=obj.val().replace(/(^\s+)|(\s+$)/g,"");
        if(str==''){this.erroralert(obj,'手机号不能为空'); return;}
        if (!myReg.test(obj.val())) {
            this.erroralert(obj,'手机格式不正确')
        }else{
            this.success(obj);
        }
    },
    yzm:function(obj) {
        var myReg = /^[0-9a-zA-Z]{4}$/;
        if (!myReg.test(obj.val())) {
            this.erroralert(obj,'图片验证码不正确')
        }else{
            this.success(obj);
        }
    }
}

function getStatesFn(){
    var formsubmit=$('.surebtn .btns');
    var formtext=formsubmit.html();
    function removeDis(){
        setTimeout(function(){formsubmit.removeClass('btns-disable').html(formtext);},1000)
    };
  	$.ajax({
		type: "POST",
		url:url+'user/login',
		data:$('.g-form').serialize()+"&tokenId="+tokenId,
		beforeSend: function () {formsubmit.addClass('btns-disable').html('提交中...');},
        success: function(data) {
            removeDis();
			if(data.message=="success"){
				var fromurl=$.getQueryString('fromurl');
				if(fromurl){
					window.location.href=fromurl;
				}else{
					window.location.href = "/";
				}
			}else{
				$('.form-alert').html(data.message).show();
				if("手机号或密码错误"==data.message){
					$('#code,#pwd').val("");
                    $('#pwd').focus();
                    $('#getcodeJs').trigger('click');//失败刷新图片验证码
				}else if("验证码错误"==data.message){
                    $('#code').val('').focus();
                }

			}
		},
		error:function(){
			$('.form-alert').html("系统繁忙，请稍后再试").show();
            removeDis();
		}
    });
};


function forgetJs(){
    var str='';
    if($('#phone').val()){
        str="?phone="+$('#phone').val()
    }
	window.location.href="/html/forgetLoginPwd.html"+str
}


//图片加载中动画
!function (box,i) {
    $(box).append('<div class="loading"></div>');
    var str=$(i).css('backgroundImage');
    str=str.substring(4,str.length-1).replace("\"","").replace("\"","");
    $('body').append('<img id="loadImgPro" class="hide" src="'+str+'"/>');
    $('#loadImgPro').load(function () {
        $(box).find('.loading').fadeOut();
        $(i).fadeIn();
        $(this).remove();
    });
    
}('.login-warp-box','.login-warp-box .login-warp')