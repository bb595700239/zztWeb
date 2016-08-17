$(function() {
    $('#rechargeMoney').on('keyup blur',function() {
        var val=$(this).val();
        $('#upper').text(rule.digitUppercase(val)); 
    })
    $('#domin').val(url);



    $('[name="paytype"]').change(function() {
    	var values=$('[name="paytype"]:checked').val();
    	if(values==2&&validation.data.user.userIsblankcard!=0){
    		var content='持卡人：'+validation.data.user.userName+'<br/>银行卡：'+validation.data.card;
    		$('#radio2pop').webuiPopover({content:content,placement:'right'}).webuiPopover('show');
    	}else{
    		$('#radio2pop').webuiPopover('destroy')
    	}	
    })
})
function getStatesFn(){
	getStatesFn.prototype.yz();
}

getStatesFn.prototype.yz=function () {
	if(!validation.data.user){window.location.href="/html/login.html?fromurl="+location.href;return}
	if(validation.data.user.userIsreal==0){
	    $.confirm('<i class="i-icon3 i-round-warn"></i>您需要进行实名认证才可以充值 ',[{yes:"立即认证"},{no:'稍后认证'}],function(type){
	        if(type==='yes'){
	            location.href="/html/realName.html"   
	        }
	        this.hide();
	    },{width:400});
	    return;
	}
	if(validation.data.user.userIsblankcard==0){
	    $.confirm('<i class="i-icon3 i-round-warn"></i>您需要绑定银行卡才可以充值 ',[{yes:"立即绑定"},{no:'稍后绑定'}],function(type){
	        if(type==='yes'){
	            location.href="/html/bindCard.html"   
	        }
	        this.hide();
	    },{width:400});
	    return;

	}
	getStatesFn.prototype.tj()
}

getStatesFn.prototype.tj=function(){
	var formsubmit=$('.surebtn .btns');
	var formtext=formsubmit.html();
		var payType=$('[name="paytype"]:checked').val();
		if(payType==1){
			$('#myform').attr({"action":baofoourl+"payment/baofoo/gatewayRecharge",'onsubmit':'return true'}).submit();
		}else if(payType==2){
			
			if(1 == validation.data.user.userIsblankcard){
				$.ajax({
					url:url+'payment/baofoo/certifiedRecharge',
					type:"POST",
					data:$('#myform').serialize(),
					beforeSend: function () {formsubmit.addClass('btns-disable').html('提交中...');},
					success:function(data){
					if(data.message=="success"){
							var FormString = 
								"正在提交请稍后。。。。。。。。"
								+"<form method=\"post\" name=\"payment\" id=\"payment\" action=\""+data.submit_url+"\">"
							    +"<input name=\"version\" type=\"hidden\" id=\"version\" value=\""+data.pay_version+"\" />"
							    +"<input name=\"input_charset\" type=\"hidden\" id=\"input_charset\" value=\""+data.input_charset+"\" />"
							    +"<input name=\"language\" type=\"hidden\" id=\"language\" value=\""+data.pay_language+"\" />"
							    +"<input name=\"terminal_id\" type=\"hidden\" id=\"terminal_id\" value=\""+data.terminal_id+"\" />"
							    +"<input name=\"txn_type\" type=\"hidden\" id=\"txn_type\" value=\""+data.txn_type+"\" />"
							    +"<input name=\"txn_sub_type\" type=\"hidden\" id=\"txn_sub_type\" value=\""+data.txn_sub_type+"\" />"
							    +"<input name=\"member_id\" type=\"hidden\" id=\"member_id\" value=\""+data.member_id+"\" />"
							    +"<input name=\"data_type\" type=\"hidden\" id=\"data_type\" value=\""+data.data_type+"\" />"
							    +"<textarea name=\"data_content\" style=\"display:none;\" id=\"data_content\">"+data.data_content+"</textarea>"
							    +"<input name=\"back_url\" type=\"hidden\" id=\"back_url\" value=\""+data.back_url+"\" />"
							    +"</form>";
							$('#formDiv').html(FormString);
							$('#payment').submit();
							// console.log($('#payment').serialize())
							// 	$('#submitform').click(function() {
							// 		$('#payment').submit();
							// })
					}else{
						$.alert('<i class="i-icon3 i-round-error"></i>'+data.message,'','',1200,{className:'favorpop'},false)
					}
				},
				error:function(data) {
					$('.form-alert').html("系统繁忙，请稍后再试").show();
					setTimeout(function(){formsubmit.removeClass('btns-disable').html(formtext);},1000)
				}
			});
		}else{
			$.alert('<i class="i-icon3 i-round-warn"></i>请先绑定银行卡','','',1200,{className:'favorpop'},false)
		}
				
	}	
}





    