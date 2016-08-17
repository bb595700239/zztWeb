			$(function() {
				/* 用途: 接收地直栏参数 取id=1 根据ID的值 */
				var urlinfo=window.location.href; //获取当前页面的url
				var len=urlinfo.length;//获取url的长度
				var offset=urlinfo.indexOf("?");//设置参数字符串开始的位置
				var newsidinfo=urlinfo.substr(offset,len)//取出参数字符串 这里会获得类似“id=1”这样的字符串
				var newsids=newsidinfo.split("=");//对获得的参数字符串按照“=”进行分割
				var id=newsids[1];//得到参数值
				var name=newsids[0];//得到参数名字
				var proArray = new Array();
				var prourl = url+'myAccount/projectPayment/'+id;
				var suburl = url+'myAccount/getName.action?investId='+id;
				var no = 1;
				$.ajax({
					url:prourl,
					type:'get',							
					success:function(data){
						//数据填充
						$.each(data.profitList, function(){
							var pro = {
										totalMoney:this.totalMoney,
										profitMoney:this.profitMoney,
										investMoney:this.investMoney,
										beginDate:this.beginDate,
										endDate:this.endDate,
										strStatus:this.strStatus,
										day:this.profitInterestBearingDays,
										no:no
										   };
							no = no+1;							
							proArray.push(pro);
						});

						$("#proTemple").tmpl(proArray).appendTo("#pro");

					}			
				});	

				$.ajax({
					url:suburl,
					type:'get',							
					success:function(data){
						//数据填充
						$('#name').append(data.message);						
					}			
				});	

			})		