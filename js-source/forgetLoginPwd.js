$(function(){
    $.getQueryString('phone')?$('#phone').val($.getQueryString('phone')).blur():null
})


function checkphone(obj){
	var phone=obj.val();
	var flag = 2;//用于判断是在注册手机号
	$.ajax({
        type: "POST",
        url:url+'user/checkPhone',
        data:{phone:phone,flag:flag},
        success: function(data) {
        	if(data.message == "fail"){
        		rule.erroralert(obj,'该手机没有被注册');
        	}else{
        		rule.success(obj);
        	}
        }
    });

	
}