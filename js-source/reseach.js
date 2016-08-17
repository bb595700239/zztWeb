var Score=function(){
 	this.allScore=0;
 	this.risk=4;
 	this.riskType="";
 	this.qtotal=$('.questionli').length;
 	this.once=0;
 	this.setClick()
}
Score.prototype={
	setClick:function(){
		var _this=this;
 		$('input[type="radio"]').click(function(){
 			_this.getAll();
 			$(this).parents('.questionli').data('stacte',true).find('.question').removeClass('zzt-red');
 		})
 	},
 	getAll:function(){
 		var _this=this;
 		this.allScore=0;
 		this.once=0
 		$.each($('input[type="radio"]:checked'),function(){
			_this.allScore+=Number($(this).val());
			_this.once+=1;	
		})
		this.setLevel()
		if(this.qtotal==this.once){
			$('#riskScore').show().find('#score').html(this.allScore);
			$('#riskType').html(this.riskType);	
		}
 	},
 	setLevel:function() {
 		if(this.allScore<=22){
			this.riskType="保守型";
			this.risk=1;
		}
		if(this.allScore>22&&this.allScore<=44){
			this.riskType="稳健型";
			this.risk=2;
		}
 		if(this.allScore>44&&this.allScore<=66){
			this.riskType="平衡型";
			this.risk=3;
		}
		if(this.allScore>66&&this.allScore<=88){
			this.riskType="积极型";
			this.risk=4;
		}
		if(this.allScore>88&&this.allScore<=100){
			this.riskType="激进型";
			this.risk=5;
		}	
 	},
 	postData:function() {
 		this.getAll();
 		if(this.qtotal==this.once){
 			if(this.allScore<22){
 				$.confirm('<i class="i-icon3 i-round-warn"></i>您的评分结果是<span class="zzt-red">'+this.allScore+'</span>分(<span class="zzt-red">'+this.riskType+'</span>)，本平台产品适合<span class="zzt-red">22</span>分(<span class="zzt-red">稳健型</span>)以上投资者投资。',[{yes:"重新测评",no:"去我的账户"}],function(type){
 					if(type=='no'){
 						location.href="/html/account/account.html#pandect";
 					}
 					$('#riskScore').hide();
 					$('.questionli').data('stacte',false);
 					$('input').prop('checked',false);
                    this.hide();
                },{width:500});
 				return;
			}
			var data={
				riskMark:this.allScore,
				riskType:this.risk
			};
			$.ajax({
				url:url+'user/riskScore',
				type:'post',
				data:data,
				success:function(data){
	                $.alert('<i class="i-icon3 i-round-right"></i>'+data.message,true,function(){
                        var fromurl=$.getQueryString('fromurl');
						if(fromurl){
							window.location.href=fromurl;
						}else{
							window.location.href = "/html/account/account.html";
						}
                    },3000,null,true); 
				}
			});
		}else {
			$.confirm('<i class="i-icon3 i-round-warn"></i>请填完所有选项',[{yes:"我知道了"}],function(type){
                    this.hide();
                },{width:400});
			$.each($('.questionli'),function(){
				if(!$(this).data('stacte')){
					$(this).find('.question').addClass('zzt-red')
				}
			})
		};
 	}

}

var isScore=new Score()
