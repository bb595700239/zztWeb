$(function(){var t=window.location.href,e=t.length,n=t.indexOf("?"),s=t.substr(n,e),a=s.split("="),i=a[1],o=(a[0],new Array),r=url+"myAccount/projectPayment/"+i,p=url+"myAccount/getName.action?investId="+i,c=1;$.ajax({url:r,type:"get",success:function(t){$.each(t.profitList,function(){var t={totalMoney:this.totalMoney,profitMoney:this.profitMoney,investMoney:this.investMoney,beginDate:this.beginDate,endDate:this.endDate,strStatus:this.strStatus,day:this.profitInterestBearingDays,no:c};c+=1,o.push(t)}),$("#proTemple").tmpl(o).appendTo("#pro")}}),$.ajax({url:p,type:"get",success:function(t){$("#name").append(t.message)}})});