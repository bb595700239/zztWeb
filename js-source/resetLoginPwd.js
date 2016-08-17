
function changeTelPsw(obj){//修改手机号的密码验证
   var password = obj.val();
   $.ajax({
       type: "POST",
       url:url+'user/checkPsw',
       data:{password:password},
       success: function(data) {
	       	if(data.message == "fail"){
       			rule.erroralert(obj,'登陆密码错误');
           	}else{
           		rule.success(obj);
           	}
       }
       });
}
