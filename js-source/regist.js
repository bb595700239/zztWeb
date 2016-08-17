function getStatesFn(){
    if($('#agree input').prop('checked')){
        rule.getStatesFn();  
    }else{
        $.confirm('<i class="i-icon3 i-round-warn"></i>请用户注册协议',[{yes:"知道了"}],function(type){if(type=="yes"){this.hide();}},{width:350});  
    }
}
$(function (){
    $('#getcodeJs').click(function(){//点击更换图片验证码
        var imgobj=$(this).find('img');
        var src = imgobj.attr('src').split('?')[0];
        imgobj.attr('src',src+'?t='+new Date().getTime());
    }).find('img').attr('src',url+"code").end().trigger('click');
})

function checkphone(obj){
	var phone=obj.val();
	var flag = 0;//用于判断是在注册手机号
	$.ajax({
        type: "POST",
        url:url+'user/checkPhone',
        async: false,
        data:{phone:phone,flag:flag},
        success: function(data) {
        	if(data.message == "fail"){
        		rule.erroralert(obj,'手机已经注册');
        	}else{
        		rule.success(obj);
        	}
        }
    });

	
}
	
	    