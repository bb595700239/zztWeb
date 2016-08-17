//只用于获取用户是否登陆
function validation(){
	var page_pathname=location.pathname.replace(/\/.*\/(.*)\..*/g,'$1');
	$.ajax({
		type:"post",
		url:url+"managingMoney/getUser.action",
		dataType:'json',
		success:function(data){
			validation.data=data;
			//是否登陆
			if(data.user==null){
				$.cookie('phone', null); 
	    		$('#nologin').show();
				if(page_pathname=="regist"){return;}
				location.href= "/html/regist.html"
			}else{
				$('#islogin').show();
				$("#myPhone,#Tphone").html(data.myxxPhone);
				var str='';
				str+=data.user.userIsreal==0?'0':'1';
				str+=data.user.userIsblankcard==0?'0':'1';
				str+=data.user.isPayPwd==0?'0':'1';
				if(str=='100') {
					if(page_pathname=="bindCard"){
						$('#name').html(data.user.userName);
						$('#idcard').html(data.myxxPersonCard);
						return;
					}
					location.href="/html/bindCard.html"
				}else if (str=='110') {
					if(page_pathname=="transPsw"){return;}
					location.href="/html/account/transPsw.html"
				}else if (str=='111') {
					location.href="/html/account/account.html#pandect"
				}else{
					if(page_pathname=="realName"){return;}
					location.href="/html/realName.html"
				}


				// if(data.user.userIsreal==0){//是否实名
				// 	if(page_pathname=="realName"){return;}
				// 	location.href = "/html/realName.html";
				// }else{
				// 	location.href = "/html/bindCard.html";
				// }
				//  if(data.user.userIsblankcard==0){//是否绑卡
				// 	$('#name').html(data.user.userName);
				// 	$('#idcard').html(data.user.userPersonCard);
				// 	if(page_pathname=="bindCard"){return;}
				// 	location.href = "/html/bindCard.html";
				// }

			}
		}
	})
}
