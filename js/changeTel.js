function checkphone(e){var s=e.val(),a=1;$.ajax({type:"POST",url:url+"user/checkPhone",data:{phone:s,flag:a},success:function(s){"fail"==s.message?rule.erroralert(e,"手机已经注册"):rule.success(e)}})}function changeTelPsw(e){var s=e.val();$.ajax({type:"POST",url:url+"user/checkPsw",data:{password:s},success:function(s){"fail"==s.message?rule.erroralert(e,"登陆密码错误"):rule.success(e)}})}