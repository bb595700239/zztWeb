
   //验证手机
   function checkphone(obj){
		var phone=obj.val();
		var flag = 1;//用于判断是在修改手机号
		$.ajax({
           type: "POST",
           url:url+'user/checkPhone',
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