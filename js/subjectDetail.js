function Filedown(t){window.open(downloadurl+"upload/"+t)}function details(t){var e="/html/invest/"+t+"invest.html?fromMoney="+$("#investmentMoney").val();return validation.data.user?void(window.location.href=e):void(window.location.href="/html/login.html?fromurl="+e)}$(function(){var t=$("#subjectId").val();$.ajax({url:url+"introduce/expectRepayment.action",type:"get",data:{subjectId:t},success:function(t){null!=t.data.loginUser?($("#userPhone").html(t.data.loginUser.userPhone),$("#aMoney").html($.outputmoney(t.data.account.userAvailableBalance)),$("#noUser,#myHide").hide(),$("#hadUser,#myShow").show(),$("#testTemplate").tmpl(t.data).appendTo("#mytmpl"),$("#myTemplate").tmpl(t.data).appendTo("#expectTmpl"),$("#projectTotalExpectMoney").append(t.data.strprojectTotalExpectMoney),(2==t.data.subject.subjectState||3==t.data.subject.subjectState||4==t.data.subject.subjectState)&&addFakedata.init(t.data)):($("#noUser,#myHide").show(),$("#hadUser,#myShow").hide(),100>t.data.rate&&2!=t.data.subject.subjectState&&3!=t.data.subject.subjectState&&4!=t.data.subject.subjectState||$("#userInvest1").html("已投满").addClass("btns-disable").removeAttr("onclick")),$(".item-box-con .btns").css("display","block"),$("#l").html(t.data.subject.strResidualMoney),2==t.data.subject.subjectState||3==t.data.subject.subjectState||4==t.data.subject.subjectState||100<=t.data.rate?($("#r").html(100),$("#l").html(0),$("#userInvest1").html("已投满").addClass("btns-disable").removeAttr("onclick")):$("#r").html(t.data.rate)}})}),$(function(){var t=$("#subjectId").val();$.ajax({type:"get",url:url+"introduce/getReturn.action?subjectId="+t,dataType:"json",async:!1,success:function(t){return setamount.data=t,$("#abolish").html($.outputmoney(t.abolish)),$("#investmentMoney").on("keyup blur",function(){setamount.init()}),0==t.residualMoney?void $("#investmentMoney").val(0):void setamount.init(setamount.data.startingmark)}})});var setamount={showerror:function(t){$(".tips-default").hide(),$(".tips-error").html(t).show()},showsuccess:function(){$(".tips-error").hide(),$(".tips-default").show()},init:function(t){var e=$("#investmentMoney");(t||0==t)&&e.val(t);var a=e.val(),n=0,s=0;return a<this.data.startingmark?void this.showerror(this.data.minMoney+"元起投"):a>this.data.residualMoney?void this.showerror("超出剩余可投金额"):a>this.data.endingmark?void this.showerror("最大投资额"+this.data.endingmark+"元"):(this.showsuccess(),n=this.getnianhua(this.data.type,a),s=a*n*.01*this.data.days/365,investFlag=!0,$("#upper").text(rule.digitUppercase(a)),void $("#shouyi").text($.outputmoney(s)))},getnianhua:function(t,e){var a=.06;return $.each(t,function(n){t[n].rangestart<=e&&e<=t[n].rangeend&&(a=t[n].income)}),a}},addFakedata={total:0,index:1,time:"-",getNum:function(t){var e=this;e.total=0,$.each(t.investmentList,function(t,a){e.total+=a.investmentInvest,e.index=t+2,e.time=a.investTime2}),e.total=t.subject.subjectMoney-e.total},init:function(t){this.getNum(t),this.total>0&&$("#mytmpl").append("<tr><td>"+this.index+"</td><td>135****8457</td><td>￥<span>"+$.outputmoney(this.total)+"</span></td><td>"+this.time+"</td></tr>")}};$(function(){$.enterSend({main:$("#investmentMoney"),action:function(){$("#userInvest1").trigger("click")}})});