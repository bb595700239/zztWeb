
$(function() {
	$('#manageMoney').addClass("on");	
});
$(function(){
	manage.page.page_number=Number($("#pageSize").val());
	manage.page.totalCount=Number($("#totalCount").val());
	manage.page.total=Number($("#totalPage").val());
	manage.filter.init();
	manage.doAjax(1);
	manage.page.initPagination(manage.page.totalCount);	

})
//*************页码 start****************

var manage={
	page:{
		index         :1,
		page_number   :null,
		total         :null,
		totalCount    :null,
		initPagination:function (totalnum){
			$("#Pagination").pagination(totalnum,{
				callback: pageselectCallback,
				num_display_entries:3,
				items_per_page :manage.page.page_number,
				current_page :manage.page.index-1
			});
			function pageselectCallback(page_index, jq) {
				manage.page.index=Number(page_index)+1;
				manage.doAjax(1);
				return false
			}	
		}
	},
	setcookie:function(){
		$.cookie('manageIndex',manage.page.index);
		$.cookie('manageSearch',manage.filter.name);
		$.cookie('manageFinancingPeriod',manage.filter.financingperiodval);
		$.cookie('manageStartMoney',manage.filter.startmoneyval);
		$.cookie('manageAnnualPayment',manage.filter.annualpaymentval);
	},
	clearcookie:function(){
		$.cookie('manageIndex','',{ expires: -1 });
		$.cookie('manageSearch','',{ expires: -1 });
		$.cookie('manageFinancingPeriod','',{ expires: -1 });
		$.cookie('manageStartMoney','',{ expires: -1 });
		$.cookie('manageAnnualPayment','',{ expires: -1 });
	},
	filter:{
		name:'',
		financingperiodval:-1,
		startmoneyval:-1,
		annualpaymentval:-1,
		search:function(){
			manage.filter.name=$('#nameSearch').val();
			manage.doAjax(0);
		},
		init:function  () {
			$.cookie('manageIndex') ? manage.page.index=$.cookie('manageIndex'):null;
			if($.cookie('manageSearch')){
				manage.filter.name=$.cookie('manageSearch');
				$('#nameSearch').val($.cookie('manageSearch'))
			}
			if($.getQueryString('search')){
				manage.filter.name=$.getQueryString('search');
				$('#nameSearch').val($.getQueryString('search'))
			};
			if($.cookie('manageFinancingPeriod')){
				manage.filter.financingperiodval=$.cookie('manageFinancingPeriod');
				$('[data-financingperiodval]').removeClass('on');
				$('[data-financingperiodval='+$.cookie('manageFinancingPeriod')+']').addClass('on');

			}
			if($.cookie('manageStartMoney')){
				manage.filter.startmoneyval=$.cookie('manageStartMoney')
				$('[data-startmoneyval]').removeClass('on');
				$('[data-startmoneyval='+$.cookie('manageStartMoney')+']').addClass('on');
			}
			if($.cookie('manageAnnualPayment')){
				manage.filter.annualpaymentval=$.cookie('manageAnnualPayment')
				$('[data-annualpaymentval]').removeClass('on');
				$('[data-annualpaymentval='+$.cookie('manageAnnualPayment')+']').addClass('on');
			}
			manage.clearcookie();
			$(document).on({
				click:function(){	
					manage.setcookie()
				}
			},'#subjectList a');

	        $('.select-list li:not(".label")').click(function(){
				$(this).parent().find('li').removeClass('on');
				$(this).addClass('on');
				var _this=$(this)
				$.each($(this).data(),function(i){
					manage.filter[i]=_this.data(i)
				}) 
				manage.doAjax(0);
	        })
			$.enterSend({//回车搜索 
	        	main:$("#nameSearch"),
	        	action:function(){
	        		manage.filter.search();
	        	}
	        })
	        //manage.page.initPagination(manage.page.total);
		}
	},	
	doAjax:function(flag){//ajax查询数据 flag:1.上下页 0.筛选/搜索
		var subjectList = new Array();
		if(flag==0){
			manage.page.index=1;
		}
		var Default={
			pageIndex:manage.page.index,
			name:manage.filter.name,
			financingPeriod:manage.filter.financingperiodval,
			startMoney:manage.filter.startmoneyval,
			annualPayment:manage.filter.annualpaymentval,
			sidStr:$('#sidStr').val()
		};
		$.ajax({
			url:url+'managingMoney/list.action',
			type:'post',
			async: false,
			data:Default,
			success:function(data){
				//数据填充
				$.each(data.data.subjectList, function(){
					var subject = {subjectName:this.subjectName ,
						subjectIncomeWay :this.subjectIncomeWay,
						maxReturn :this.maxReturn,
						minReturn :this.minReturn,
						subjectFinancingPeriod :this.subjectFinancingPeriod,
						strSubscriptionAmountMin :this.strSubscriptionAmountMin,
						strMoney :this.strMoney,
						strResidualMoney :this.strResidualMoney,
						rate :this.rate,
						subjectId:this.subjectId,
						creditEnhance:this.creditEnhance
					};				
					subjectList.push(subject);
				});
				$("#subjectList").empty();
				$("#subjectTemple").tmpl(subjectList).appendTo("#subjectList");
				$('.item-box-con .btns').css('display','block');
				
				$('.item-box-con>ul>li:nth-child(even)').addClass('odd');
				//圆圈动画效果	
				setTimeout(function(){
					$.each($('.percentage'),function(){
							var defcolor='#ff5256';
							// if($(this).hasClass('disable')){defcolor='#a0a0a0'}
							$(this).easyPieChart({barColor:defcolor,trackColor: '#dcdcdc',scaleColor: false,lineCap: 'round',lineWidth: 4,animate: 1000,size:90});
						})
				}, 10)
				//页码赋值
				manage.page.index = data.data.pageIndex;
				manage.page.total = data.data.totalPage;
				manage.page.totalCount = data.data.totalCount;
			}			
		});	
		if(flag==0){
		   manage.page.initPagination(manage.page.totalCount);
		}

	}

}

$(function () { 
	//图片加载中动画
    !function (box,i) {
        $(box).append('<div class="loading"></div>');
        var str=$(i).css('backgroundImage');
        str=str.substring(4,str.length-1).replace("\"","").replace("\"","");
        $('body').append('<img id="loadImgPro" class="hide" src="'+str+'"/>');
        $('#loadImgPro').load(function () {
        	$(box).find('.loading').fadeOut();
            $(i).fadeIn();
            $(this).remove();
        });

    }('.banner-box','.banner-box .banner-s1')
})

		
		