$(document).ready(function() {
			$('#index').addClass("on");	
			var ids = document.getElementsByName("subjectId");
			var checkval = "";
			for (var i = 0; i < ids.length; i++) {
				checkval += ids[i].value+ ";";
			}
			
			$.ajax({
			url:url+'managingMoney/getDetail.action',
			type:'post',
			data:{"checkval":checkval},
			success:function(data){
					$.each(data.list, function(){
						$('#a'+this.subjectId).css('display','block');
						if(this.rate == 100 || this.rate>100){
							var aid = '#a'+this.subjectId;
							var rid = '#r'+this.subjectId;
							$(rid).html("100%");
							var did = '#d'+this.subjectId;
							$(did).attr('data-percent',100);
							$(aid).removeClass("btns-info").addClass("btns-disable");
							var id = '#l'+this.subjectId;		
							$(id).html(0);
							$(aid).html("已投满");
						}else{
							var rid = '#r'+this.subjectId;
							$(rid).html(this.rate+"%");
							var did = '#d'+this.subjectId;
							$(did).attr('data-percent',this.rate);
							var id = '#l'+this.subjectId;
									
							$(id).html(this.strResidualMoney);
						}
					});
					$('#allAnnualizedMoney').html(data.allAnnualizedMoney);
					$('#allProfitMoney').html(data.allProfitMoney);
					//圆圈动画效果
					$('.item-box-con>ul>li:nth-child(even)').addClass('odd');
                    $.each($('.percentage'),function(){
                        var defcolor='#ff5256';
                        if($(this).hasClass('disable')){defcolor='#a0a0a0'}
                        $(this).easyPieChart({barColor:defcolor,trackColor: '#dcdcdc',scaleColor: false,lineCap: 'round',lineWidth: 4,animate: 1000,size:90});
                    })
                    $.each($('.progress-bar'),function(){
                		$(this).goalProgress({goalAmount: 100,currentAmount: $(this).data('percent')});
            		})
				}
			});
			//图片加载中动画
			!function (box,i) {
				$(box).append('<div class="loading"></div>');
				var str=$(i).css('background-image');
		        str=str.substring(4,str.length-1).replace("\"","").replace("\"","");
		        $('body').append('<img id="loadImgPro" class="hide" src="'+str+'"/>');
		        $('#loadImgPro').load(function () {
		        	$(box).find('.loading').fadeOut();
		            $(box).find('.bd ul').fadeIn();
		            $(this).remove();
		        });

			}('.banner','.banner .bd li:eq(0) a')
			
	  });