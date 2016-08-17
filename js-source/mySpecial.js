	//数据填充
	$(function(){
		var ids = document.getElementsByName("subjectId");
		var checkval = "";
		for (var i = 0; i < ids.length; i++) {
			checkval += ids[i].value+ ";";
		}
		validation.callback=function() {
			$.ajax({
					url:url+'managingMoney/specialList.action',
					type:'post',
					data:{"checkval":checkval},
					success:function(data){
					if(0==data.data.loginSpecialList.length){
						$("#noSpecial").show();	
					}
					$('#testTemplate').tmpl(data.data).appendTo('#mytmpl');	
					$('.item-box-con .btns').css('display','block');

					$('.item-box-con>ul>li:nth-child(even)').addClass('odd');
					//动态圆圈
	                $.each($('.percentage'),function(){
	                    var defcolor='#ff5256';
	                    if($(this).hasClass('disable')){defcolor='#a0a0a0'}
	                    $(this).easyPieChart({barColor:defcolor,trackColor: '#dcdcdc',scaleColor: false,lineCap: 'round',lineWidth: 4,animate: 1000,size:90});
	                })
				}
			});
		} 	
	})

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

    }('.banner-box','.banner-box .banner-s2')