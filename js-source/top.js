function validation(){
	var page_pathname=location.pathname.replace(/\/.*\/(.*)\..*/g,'$1');
	$.ajax({
	 	type:"post",
		url:url+'managingMoney/getUser.action',
		dataType:'json',
		success:function(data){
			validation.data=data;
			if(null == data.user){
				$.cookie('phone', null); 
	    		$('#nologin,.login-box').show();
	    		typeof(jump_link)!='undefined'? location.href= jump_link+'?fromurl='+location.href :null;
	    	}else{
	    		if(page_pathname=="login"){location.href="/html/account/account.html#pandect";return;}//已经登陆限制进入登录页
	    		$("#myPhone,#Tphone").html(data.myxxPhone);
	            $('#islogin').show();
	            $('#userId').val(data.user.userId);
	            if(validation.callback){
					validation.callback()
	            }
	    	}
		}
	});
}
