function getStatesFn(){
	var formsubmit=$('.surebtn .btns');
    var formtext=formsubmit.html();
	$.ajax({
		url:url+'#',//需要修改
		type:'post',
		data:$('.g-form').serialize(),
		beforeSend: function () {formsubmit.addClass('btns-disable').html('提交中...');},
        success: function(data) {
        	formsubmit.removeClass('btns-disable').html(formtext);
			if(data.message=="success"){
				window.location.href="#";//需要修改
			}else{
				var mess;
				if(data.message=='code'){
					mess='图片验证码有误';
					rule.erroralert($('#'+data.message),mess);
				}else if(data.message=='telCode'){
					mess='短信验证码有误';
					rule.erroralert($('#'+data.message),mess);
				}else{
					$('.form-alert').html(data.message).show();
				}	
			}
		},
		error:function(){
			$('.form-alert').html("系统繁忙，请稍后再试").show();
		}
	});
}