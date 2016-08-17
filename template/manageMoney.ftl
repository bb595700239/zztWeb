
<!DOCTYPE html>
<html lang="zh-cn">
<head>
    <meta http-equiv="Content-Type" content="text/html; charset=utf-8">
    <meta http-equiv="X-UA-Compatible" content="IE=edge,chrome=1">
    <link rel="shortcut icon" href="/images/favicon.ico" type="image/x-icon"/>
    <title>中政投--我要理财</title>
	<meta name="keywords" content="中政投" />
	<meta name="description" content="中政投介绍" />
    <link type="text/css" rel="stylesheet" href="/css/base.css">
    <link type="text/css" rel="stylesheet" href="/css/index.min.css">
    <script type="text/javascript" src="/js/jquery-1.11.1.js"></script>
    <script type="text/javascript" src="/js/jquery.SuperSlide.2.1.1.js"></script>
    <script type="text/javascript" src="/js/jquery.cookie.min.js"></script>
    <script type="text/javascript" src="/js/excanvas.js"></script>
    <script type="text/javascript" src="/js/jquery.easy-pie-chart.js"></script>
    <script type="text/javascript" src="/js/path.js"></script>
    <script type="text/javascript" src="/js/jquery.tmpl.js"></script>
    <script type="text/javascript" src="/js/jquery.pagination.js"></script>
    <script type="text/javascript" src="/js/global.js"></script>
    <script type="text/javascript" src="/js/top.js"></script>

    <script type="text/javascript" src="/js/manageJs.js"> </script>
    <link type="text/css" rel="stylesheet" href="/css/animate.css">
    <link type="text/css" rel="stylesheet" href="/js/dialog/dialog.css">
    <script type="text/javascript" src="/js/dialog/dialog.js"></script>

    <!--[if lt IE 7]>
        <script src="/js/browser-not-supported.js"></script>
    <![endif]-->
</head>

<body>
	
	<!-- 头部开始 -->
    <div id="header">

    	<#include "top.ftl" />
    
    </div>
    <!-- 头部结束 -->
    <div class="banner-box">
        <div class="banner-s1" style="background: url(/images/banner_s_01.jpg) center center no-repeat;"></div>
    </div>
    <div class="container">
        <div class="item-box margin-t-20 search-select">
            <div class="search-s">
                <div class="search-box">
                     <input type="text" placeholder="请输入产品名称" id='nameSearch'> 
                   <button class="btn-s" onclick="manage.filter.search()">搜索</button>
                </div>
            </div>
            <div class="select-list">
            	<ul class="clearfix"><li class="label">融资期限：</li><li class="on" data-financingperiodval="-1">全部</li><li  data-financingperiodval="1">6个月以下</li><li  data-financingperiodval="2">6个月-12个月</li><li  data-financingperiodval="3">12个月-24个月</li><li  data-financingperiodval="4">24个月以上</li></ul>
                <ul class="clearfix"><li class="label">起投金额：</li><li class="on"  data-startmoneyval="-1">全部</li><li  data-startmoneyval="1">5万元以下</li><li  data-startmoneyval="2">5万-20万元</li><li  data-startmoneyval="3">20万-30万元</li><li  data-startmoneyval="4">30万元以上</li></ul>
                <ul class="clearfix"><li class="label">预计年化收益：</li><li class="on"  data-annualpaymentval="-1">全部</li><li  data-annualpaymentval="1">7%以下</li><li  data-annualpaymentval="2">7%-8%</li><li  data-annualpaymentval="3">8%-9%</li><li  data-annualpaymentval="4">9%以上</li></ul>
            </div>
        </div>
        <div class="item-box item-box-con">
            <ul id="subjectList">
            <#if (subjectList?size>0)>
			<#list subjectList as item>
                <li>
                    <div class="con clearfix">
                        <div class="fl-left">
                            <p class="p1"><a href="/html/detail/${item.subjectId}detail.html">${item.subjectName}</a></p>
                            <p class="p2">${item.creditEnhance}</p>
							<input type="hidden" name="subjectId" value="${item.subjectId}"/>
                        </div>
                        <p class="fl-right p3">${item.subjectIncomeWay}</p>
                    </div>
                    <div class="info clearfix">
                        <ul class="sub-ul fl-left">
						    <#if item.maxReturn??>
                            <li class="frist"><p class="p1"><span class="big">${item.minReturn}%-${item.maxReturn}%</span></p><p class="p2">年化利率</p></li>  
							<#else>
							<li class="frist"><p class="p1"><span class="big">${item.minReturn}%</span></p><p class="p2">年化利率</p></li>  
							</#if>
                            <li><p class="p1"><span class="big">${item.subjectFinancingPeriod }</span>个月</p><p class="p2">融资期限</p></li>
                            <li><p class="p1"><span class="big">${item.strSubscriptionAmountMin}</span>元</p><p class="p2">认购起点</p></li> 
                            <li><p class="p1"><span class="big">${item.strMoney}</span>元</p><p class="p2">融资总额</p></li> 
                            <li><p class="p1"><span class="big" id="l${item.subjectId}"></span>元</p><p class="p2">剩余金额</p></li> 
                        </ul>
                        <div class="percentage fl-left" data-percent="" id='d${item.subjectId}'><span id='r${item.subjectId}'></span>%</div>
                        <a  class="btns btns-info fl-right" href="/html/detail/${item.subjectId}detail.html" id='a${item.subjectId}'></a>
                    </div>                        
                </li>
				</#list>
                </#if>
            </ul>
			
        </div> 
        <input id="sidStr" value="${sidStr!xx}" type="hidden"/>
        <input id="pageIndexForm"  name="pageIndex" type="hidden" value='${pageIndex!xx}'/>
		<input id="totalPage"   type="hidden" value='${totalPage!xx}'/>
		<input id="pageSize"   type="hidden" value='${pageSize!xx}'/>
		<input id="totalCount"   type="hidden" value='${totalCount!xx}'/>
		<!-- 上下页-->
		 <div class="item-box pagination">
            <div class="con" id="Pagination"></div>
        </div>
        
    </div>
    
    <#include "foot.ftl" />
       
      <script id="subjectTemple" type="text/x-jquery-tmpl">
      <#noparse>
		<li>
			<div class="con clearfix">
				<div class="fl-left">
					<p class="p1"><a href="/html/detail/${subjectId}detail.html">${subjectName}</a></p>
					<p class="p2">${creditEnhance}</p>
					<input type="hidden" name="subjectId" value="${subjectId}"/>
				</div>
				<p class="fl-right p3">${subjectIncomeWay}</p>
			</div>
			<div class="info clearfix">
				<ul class="sub-ul fl-left">
					{{if maxReturn}}
					<li class="frist"><p class="p1"><span class="big">${minReturn}%-${maxReturn}%</span></p><p class="p2">年化利率</p></li>  
					{{else}}
					<li class="frist"><p class="p1"><span class="big">${minReturn}%</span></p><p class="p2">年化利率</p></li>  
					{{/if}}
					<li><p class="p1"><span class="big">${subjectFinancingPeriod}</span>个月</p><p class="p2">融资期限</p></li>
					<li><p class="p1"><span class="big">${strSubscriptionAmountMin}</span>元</p><p class="p2">认购起点</p></li> 
					<li><p class="p1"><span class="big">${strMoney}</span>元</p><p class="p2">融资总额</p></li> 
					<li><p class="p1"><span class="big" >${strResidualMoney}</span>元</p><p class="p2">剩余金额</p></li> 
				</ul>
				<div class="percentage fl-left" data-percent="${rate}" ><span>${rate}</span>%</div>
				{{if rate==100}}
				<a class="btns btns-disable fl-right" href="/html/detail/${subjectId}detail.html">已投满</a>
				{{else}}	
				<a class="btns btns-info fl-right" href="/html/detail/${subjectId}detail.html">立即投资</a>
				{{/if}}	
			</div>                        
		</li>
		</#noparse>
	 </script>
	 
	
</body>
</html>