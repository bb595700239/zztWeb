$(function() {	
    //$('#manageMoney').addClass("on");
	var subjectId = $("#subjectId").val();
	$.ajax({
		url:url+'introduce/expectRepayment.action',
		type:'get',
		data:{"subjectId":subjectId},
		success:function(data){
			if(null!=data.data.loginUser){
				$("#userPhone").html(data.data.loginUser.userPhone);	
				$("#aMoney").html($.outputmoney(data.data.account.userAvailableBalance));
				$("#noUser,#myHide").hide();
				$("#hadUser,#myShow").show();
				$('#testTemplate').tmpl(data.data).appendTo('#mytmpl');
				$('#myTemplate').tmpl(data.data).appendTo('#expectTmpl');
				$('#projectTotalExpectMoney').append(data.data.strprojectTotalExpectMoney);
				if(2==data.data.subject.subjectState||3==data.data.subject.subjectState||4==data.data.subject.subjectState){//添加一条假数据
					addFakedata.init(data.data);
				}
			}else{	
			
				$("#noUser,#myHide").show();
				$("#hadUser,#myShow").hide();	
				if(100>data.data.rate&&2!=data.data.subject.subjectState&&3!=data.data.subject.subjectState&&4!=data.data.subject.subjectState){
				}else{
					$("#userInvest1").html('已投满').addClass('btns-disable').removeAttr('onclick');
				}						
			}
			$('.item-box-con .btns').css('display','block');

			$("#l").html(data.data.subject.strResidualMoney);

			if(2==data.data.subject.subjectState||3==data.data.subject.subjectState||4==data.data.subject.subjectState||100<=data.data.rate){
				$("#r").html(100);
				$("#l").html(0);
				$("#userInvest1").html('已投满').addClass('btns-disable').removeAttr('onclick');
				
			}else{
				$("#r").html(data.data.rate);
			}


		}
	});
});
$(function() {
	var subjectId = $('#subjectId').val();
	$.ajax({
		type:"get",
		url:url+'introduce/getReturn.action?subjectId='+subjectId,
		dataType:'json',
		async: false,
		success:function(data){
				setamount.data = data;
				$('#abolish').html($.outputmoney(data.abolish));

				$('#investmentMoney').on('keyup blur',function() {
  		            setamount.init(); 
  		        });
  		        //剩余可投为0
  		        if(data.residualMoney==0){$('#investmentMoney').val(0);return;}
  		        setamount.init(setamount.data.startingmark);         
			}
	});       
})

//自动判断收益

var setamount={
	showerror:function(mess){
		$('.tips-default').hide()
		$('.tips-error').html(mess).show()
	},
	showsuccess:function(mess){
		$('.tips-error').hide()
		$('.tips-default').show()
	},
    init:function(value) {
    	var obj=$('#investmentMoney');
        if(value || value==0){
            obj.val(value);
        }
        var val=obj.val();
        var nianhua=0,shouyi=0;

        
        if(val<this.data.startingmark){this.showerror(this.data.minMoney+'元起投');return}
        if(val>this.data.residualMoney){this.showerror('超出剩余可投金额');return}
        if(val>this.data.endingmark){this.showerror('最大投资额'+this.data.endingmark+'元');return}

		this.showsuccess();
		nianhua=this.getnianhua(this.data.
			type,val);
		shouyi=(val*nianhua*0.01*this.data.days)/365;  
		investFlag = true;
        $('#upper').text(rule.digitUppercase(val));
        $('#shouyi').text($.outputmoney(shouyi));
    },
    getnianhua:function(type,val) {
        var income=0.06;
        $.each(type,function(i){
            if(type[i].rangestart<=val && val<=type[i].rangeend){
                income=type[i].income;  
            }
        })
        return income;
    }
} 


var addFakedata={//添加虚拟数据
    total:0,
    index:1,
    time:'-',
    getNum:function(data) {
        var _this=this;
        _this.total=0;
        $.each(data.investmentList,function(i,item) {
            _this.total+=item['investmentInvest'];
            _this.index=i+2;
            _this.time=item['investTime2'];
        })
        _this.total=data.subject.subjectMoney-_this.total;
    },
    init:function(data) {
        this.getNum(data)
        if(this.total>0){
            $('#mytmpl').append('<tr><td>'+this.index+'</td><td>135****8457</td><td>￥<span>'+$.outputmoney(this.total)+'</span></td><td>'+this.time+'</td></tr>')
        }      
    }
}


function Filedown(path){
	window.open(downloadurl+'upload/'+path);
}

$(function(){
	$.enterSend({//回车提交
        main:$("#investmentMoney"),
        action:function(){
            $('#userInvest1').trigger('click')
        }
    }) 
})
//投资页
function details(id){
	var suburl="/html/invest/"+id+"invest.html?fromMoney="+$('#investmentMoney').val();
	if(!validation.data.user){window.location.href="/html/login.html?fromurl="+suburl;return}
	window.location.href=suburl;
}
