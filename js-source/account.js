$(function() {
	$('#detailTable').bootstrapTable('refresh', {url:url+'myAccount/moneyDetail.action'});
	$('#investTable').bootstrapTable('refresh', {url:url+'myAccount/myInvestment.action'});
	$('.hd-sub li').click(function(){
		$('#status').val($(this).data('status'));
		$('#investTable').bootstrapTable('refresh', {silent: true});
	})
	
	$('.format span:not(".label")').click(function(){
		 $(this).parent().find('span').removeClass('active');
		 $(this).addClass('active');
	     var _this=$(this);
		 $.each($(this).data(),function(i){
			$('#'+i).val(_this.data(i));
		 })
		 $('#detailTable').bootstrapTable('refresh', {silent: true});
	})


})
var format={
	rateFormatter:function(val,row){
		//申请退款
		format.drawback=function(id){
			$.confirm('<i class="i-icon3 i-round-warn"></i>确定申请退款吗',[{yes:"是",no:"否"}],
			 	function(type){
			 		if(type=="yes"){
				         $.ajax({
					     	url:url+'myAccount/drawback.action',
							type:'post',
							data:{"investId":id},
							success:function(data){
								/*
								if(data.message=='success'){
									alert("申请退款成功");
								}else{
									alert("申请退款失败");
								}*/
					
								$('#investTable').bootstrapTable('refresh', {silent: true});
							}
				 		});
				 		this.hide();
			 		}else{
			 			this.hide();
			 		}
			},{width:350});
		};
		if(val=='还款中'||val=='已结清'){
			return '<a class="blue" href="myprofit.html?id='+row.investmentId+'"'+'>'+val+'</a>';
		}else if(val=='申请退款'){
            return '<a class="blue" href="#" onclick="format.drawback('+row.investmentId+')">'+val+'</a>';
		}else{
			return val;
		}
	},
	nameFormatter:function(val,row){
		return '<a class="blue" href="/html/detail/'+row.investmentSubjectId+'detail.html"'+'>'+val+'</a>';
	},
	dateFormatter:function(val){
		return new Date(val).format('yyyy-MM-dd hh:mm');
	},
	tofixed2:function(val){
		if(val){
			return  val.toFixed(2);
		}else{
			return '-';
		}
		
	},
	outputmoney:function (val) {
		return $.outputmoney(val);
	},
	accountFlowMark:function(val){
		var str,tit;
		if(val.length>48){
			str=val.substr(0,48)+'...';
			tit=val;
		}else{
			str=val;
			tit='';
		}
		return '<span class="lineclamp" title="'+tit+'" data-customtitle>'+str+'</span>';
	}
}

$('.account-set tr:nth-child(odd)').addClass('odd');
$(".invest-list").slide({prevCell:null,nextCell:null,titCell:'.hd-sub li',mainCell:'.bd-sub',trigger:"click"});
var defaultIndex=location.hash.replace(/#/g,"");
defaultIndex?defaultIndex=$('[data-hash-active='+defaultIndex+']').index():defaultIndex=0;
$(".about-tab-box").slide({prevCell:null,nextCell:null,defaultIndex:defaultIndex,trigger:"click",startFun:function(i,c,slider) {
	location.href=location.pathname+"#"+(slider.find('.hd li').eq(i).data('hash-active'))
}});
			
$(function(){	
	//登陆验证
	 $.ajax({
		type:"post",
		url:url+'managingMoney/getUser.action',
		dataType:'json',
		success:function(data){
				var str='',$safe=$('#safe');
				str+=data.user.userIsreal==0?'0':'1';
				str+=data.user.userIsblankcard==0?'0':'1';
				str+=data.user.isPayPwd==0?'0':'1';
				if(str=='100') {
					$('.usericon-1').addClass("active");
					$safe.html("低");
				}else if (str=='110') {
					$('.usericon-1,.usericon-3').addClass("active");
					$safe.html("中");
				}else if (str=='111') {
					$('.usericon-1,.usericon-3,.usericon-4').addClass("active");
					$safe.html("高").next().hide();
				}else{
					$safe.html("低");
				}
				$('.usericon:not(.active)').webuiPopover({trigger:'hover',placement:'bottom'});//认证图标提示框
		}
	});
});			



//账户管理
$.ajax({
	url:url+'myAccount/accountMana.action',
	type:'post',
	success:function(data){
		var accountList = new Array();
		//数据填充					
		var account = {
			userName:data.user.userName,							
			userPhone:data.user.userPhone,
			userPersonCard:data.user.userPersonCard,
			bank:data.userCard.userCardBank,
			cardNum:data.userCard.userCardCardnum,
			isbank:data.isbank,
			isReal:data.user.userIsreal,
			type:data.user.strType,
			payPwd:data.user.userPaypwd,
			riskMark:data.user.userRiskMark
	    };				
		accountList.push(account);
		$("#accountTemple").tmpl(accountList).appendTo("#account");
	}
});
//账户总览
$.ajax({
	url:url+'myAccount/list.action',
	type:'post',
	success:function(data){
		var viewList = new Array();
		//数据填充					
		var view ={
			userName:data.user.userName,
			allAssets:data.account.userAccountAllAssets,
			available:data.account.userAvailableBalance,
			frozen:data.account.userWithdrawFrozenAmounts,
			wait:data.account.userWaitReceiveInterest,
			receive:data.account.userReceivedInterest,
			amounts:data.account.userInvestmentFrozenAmounts
		};				
		viewList.push(view);
		$("#viewTemple").tmpl(viewList).appendTo("#view");
		$('#money').append(data.account.userAvailableBalance);
		
	}
});
	

//提升账户安全性
function upsafe(){
	if(validation.data.user==null){
		window.location.href="/html/login.html"
	}else if(validation.data.user.userIsreal==0){
			window.location.href = "/html/realName.html";
	}else if(validation.data.user.userIsblankcard==0){
		window.location.href = "/html/bindCard.html";
	}else if(validation.data.user.isPayPwd==0){
		window.location.href = "/html/transPsw.html";
	}else{
		window.location.href = "/html/account/account.html#pandect";
	}

}

