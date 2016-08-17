	$(function() {
        $('#withdrawCash').on('keyup blur',function() {
            var val=$(this).val();
            $('#upper').text(rule.digitUppercase(val)); 
        })
        $.ajax({
		 	type:"post",
			url:url+'managingMoney/getUser.action',
			dataType:'json',
			success:function(data){
				data.balance=data.balance.toFixed(3);
				data.balance=data.balance.substring(0,data.balance.length-1);
				$("#allMoney").html(data.balance);//提现可用金额
				validation.data=data;
	        	if(validation.data.user.userIsblankcard!=0){
		    		var content='<div class="form-group padding-s clearfix"><label class="g-label">持卡人：</label><div class="input-w font-size-20">'+validation.data.user.userName+'</div></div><div class="form-group padding-s clearfix"><label class="g-label">银行卡：</label><div class="input-w font-size-20">'+validation.data.card+'</div></div>';
		    		$('.g-form .form-group:eq(0)').before(content);
		    	}
	        }
	    })
    })
    function checkPassword(obj){
		obj = $('#paypwd');
		var PayPsw = obj.val();
 	   $.ajax({
 	       type: "POST",
 	       url:url+'user/checkpayPsw',
 	       data:{PayPsw:PayPsw},
 	       success: function(data) {
 	       	if(data.message == "fail"){
 	       		rule.erroralert(obj,'交易密码错误');
 	       	}else{
 	       		rule.success(obj);
 	       	};
	       	}
	   });
	}

    //提现金额校验
	function checkMoney(obj) {		
		var money = Number(obj.val());
		var allMoney =Number(validation.data.balance);
		if(money<=0){rule.erroralert(obj,'可提现金额有误'); return}
		//obj.val(parseInt(money, 10)); 
		if(money<=allMoney){
			rule.success(obj);
		}else{
			rule.erroralert(obj,'可提现金额不足');
		}
	}