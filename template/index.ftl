
<!DOCTYPE html>
<html lang="zh-cn">
<head>
    <meta http-equiv="Content-Type" content="text/html; charset=utf-8">
    <meta http-equiv="X-UA-Compatible" content="IE=edge,chrome=1">
    <link rel="shortcut icon" href="/images/favicon.ico" type="image/x-icon"/>
    <title>中政投--首页</title>
	<meta name="keywords" content="中政投" />
	<meta name="description" content="中政投介绍" />
    <link type="text/css" rel="stylesheet" href="/css/base.css">
    <link type="text/css" rel="stylesheet" href="/css/index.min.css">
    <script type="text/javascript" src="/js/jquery-1.11.1.js"></script>
    <script type="text/javascript" src="/js/jquery.SuperSlide.2.1.1.js"></script>
    <script type="text/javascript" src="/js/jquery.cookie.min.js"></script>
    <script type="text/javascript" src="/js/goalProgress.js"></script>
    <script type="text/javascript" src="/js/excanvas.js"></script>
    <script type="text/javascript" src="/js/jquery.easy-pie-chart.js"></script>
    <script type="text/javascript" src="/js/path.js"></script>
    <script type="text/javascript" src="/js/global.js"></script>
    <script type="text/javascript" src="/js/top.js"></script>

    <script type="text/javascript" src="/js/index.js"></script>
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

        <div class="banner margin-b-20">
            <div class="hd">
                <ul><li class="i-icon"></li><li class="i-icon"></li><li class="i-icon"></li></ul>
            </div>
            <div class="bd">
                <ul>
                    <li><a href="/html/list/manageMoney.html?search=甲子瓮安" style="background: url(images/banner_01.jpg) center center no-repeat;"></a></li>
                    <li><a href="/html/list/manageMoney.html?search=甲子瓮安" style="background: url(images/banner_02.jpg) center center no-repeat;"></a></li>
                    <li><a href="/html/list/manageMoney.html?search=甲子瓮安" style="background: url(images/banner_03.jpg) center center no-repeat;"></a></li>
                </ul>
            </div> 
            <div class="login-box none">
                <p class="p1">中政投历史平均年化收益</p>
                <p class="p2">8.8%</p>
                <a class="btns btns-max" href="html/regist.html">免费注册</a>
                <p class="p3"><span>已有帐号？</span><a href="html/login.html">立即登录</a></p>
            </div>
        </div>
        <script>
            $(".banner").slide({mainCell:".bd ul",autoPlay:true,effect:"fold"});
        </script>
    
    </div>
    <!-- 头部结束 -->

    <div class="container">

        <!-- 滚动新闻 -->
        <div class="item-box new-box clearfix">
            <div class="fl-left">
                <i class="i-icon fl-left i-laba"></i>

                <div class="scroll-top">
                    <div class="bd">
                        <ul class="infoList">
                            <li><a href="/html/notice/detail1-02.html">“甲子基金瓮安1号”在“中政投”上线交易公告</a></li>
                            <li><a href="/html/notice/detail1-04.html">“中政投”重磅来袭！全民首选理财网站试运行中</a></li>
                            <li><a href="/html/notice/detail1-03.html">“甲子基金瓮安1号”产品介绍</a></li>
                            <li><a href="/html/notice/detail1-01.html">宝付与“中政投”达成战略合作服务协议</a></li>
                        </ul>
                    </div>
                </div>
            </div>
            <script>
            $(".scroll-top").slide({mainCell:".bd ul",autoPage:true,effect:"topLoop",autoPlay:true,vis:1});
            </script>
            <a class="more fl-right" href="/html/notice.html">更多<span class="arrows">>></span></a>
        </div> 
        <!-- 滚动新闻结束 -->

        <!-- 项目特点 -->
        <div class="item-box item-box-safe clearfix">
            <ul class="list-safe fl-left">
                <li><i class="i-icon i-safe"></i><p>政府项目安全性高</p></li>
                <li><i class="i-icon i-lock"></i><p>双重风控和尽调</p></li>
                <li><i class="i-icon i-right"></i><p>权威媒体监督</p></li>
                <li><i class="i-icon i-gold"></i><p>高收益低门槛</p></li>
            </ul>
            <div class="total1 fl-left"><p class="p1">累计投资金额(元)</p><p class="p2 fulltext" id="allAnnualizedMoney">-</p></div>
            <div class="total2 fl-right"><p class="p1">为用户赚取收益(元)</p><p class="p2 fulltext" id="allProfitMoney">-</p></div>
        </div>
        <!-- 项目特点结束 -->
        
        <!-- 热销产品 -->

        <ul class="list-hotpro margin-b-20 clearfix">
        <#if (subjectList?size>0)>
			<#list subjectList as item>
            <li class="li <#if item_index==2>last</#if>" >
                <i class="i-icon i-tag"></i>
                <p class="p1"><a href="/html/detail/${item.subjectId}detail.html">${item.subjectName}</a></p>
                <p class="p2">预期年化收益</p>
				<#if item.maxReturn??>
                <p class="p3">${item.minReturn*100}%-${item.maxReturn*100}%</p>
				<#else>
				<p class="p3">${item.minReturn*100}%</p>
				</#if>
				<input type="hidden" name="subjectId" value="${item.subjectId}" />
                <div class="progress-bar progress-bar1" id="d${item.subjectId}" data-percent='${item.rate*100}'></div>
                <ul class="sub-ul clearfix">
                    <li class="subli"><p class="sub-p1">融资期限</p><p class="sub-p2 fulltext">${item.subjectFinancingPeriod }个月</p></li>
                    <li class="subli"><p class="sub-p1">募集总额</p><p class="sub-p2 fulltext">${item.strMoney}</p></li>
                    <li class="subli"><p class="sub-p1">起投金额</p><p class="sub-p2 fulltext">${item.strSubscriptionAmountMin}</p></li>
                </ul>
                <a href="/html/detail/${item.subjectId}detail.html" id="a${item.subjectId}" class="btns btns-info">立即投资</a>
            </li>
			</#list>
        </#if>
        </ul>
        <!-- 热销产品结束 -->

        <!-- 定期理财 -->
        <div class="item-box item-box-con item-box-con-index">
            <div class="tit clearfix"><h4 class="fl-left">定期理财</h4><a href="html/list/manageMoney.html" class="more fl-right">更多<span class="arrows">>></span></a></div>
            <ul>
         <#if (subjectList2?size>0)>
            <#list subjectList2 as items>
				<li <#if items_index==2>class="last"</#if>>
                    <div class="con clearfix">
                        <div class="fl-left">
                            <p class="p1"><a href="/html/detail/${items.subjectId}detail.html">${items.subjectName}</a></p>
                            <p class="p2">${items.creditEnhance}</p>
                        </div>
                        <p class="fl-right p3">${items.subjectIncomeWay}</p>
                    </div>
                    <div class="info clearfix">
                        <ul class="sub-ul fl-left">
                        <#if items.maxReturn??>
                            <li class="frist"><p class="p1"><span class="big">${items.minReturn*100}%-${items.minReturn*100}%</span></p><p class="p2">年化利率</p></li>  
                        <#else>
                        	<li class="frist"><p class="p1"><span class="big">${items.minReturn*100}%</span></p><p class="p2">年化利率</p></li>	  
                        </#if>
                        	<input type="hidden" name="subjectId" value="${items.subjectId}" />
                            <li><p class="p1"><span class="big">${items.subjectFinancingPeriod }</span>个月</p><p class="p2">融资期限</p></li>
                            <li><p class="p1"><span class="big">${items.strSubscriptionAmountMin}</span>元</p><p class="p2">认购起点</p></li> 
                            <li><p class="p1"><span class="big">${items.strMoney}</span>元</p><p class="p2">融资总额</p></li> 
                            <li><p class="p1"><span class="big" id="l${items.subjectId}">${items.strResidualMoney}</span>元</p><p class="p2">剩余金额</p></li> 
                        </ul>
                        <div class="percentage fl-left" data-percent="${items.rate*100}" id='d${items.subjectId}'><span id='r${items.subjectId}'>${items.rate*100}</span></div>

                        <a href="/html/detail/${items.subjectId}detail.html" id='a${items.subjectId}'  class="btns btns-info fl-right">立即投资</a>
                    </div>                        
                </li>
			</#list>
		</#if>

            </ul>
            <script type="text/javascript">

            </script>
        </div>    
        <!-- 定期理财结束 -->

        <div class="clearfix">
            <!-- 网站公告 -->
            <div class="item-box item-box-mes fl-left">
                <div class="tit clearfix"><h4 class="fl-left">网站公告</h4> <a href="/html/notice.html#notice" class="more fl-right">更多<span class="arrows">>></span></a></div>
                <ul>
                    <li class="clearfix"><span class="point">.</span><a href="/html/notice/detail1-02.html">“甲子基金瓮安1号”在“中政投”上线交易公告</a><span class="time">2016-08-08</span></li>
                    <li class="clearfix"><span class="point">.</span><a href="/html/notice/detail1-04.html">“中政投”重磅来袭！全民首选理财网站试运行中</a><span class="time">2016-08-08</span></li>
                    <li class="clearfix"><span class="point">.</span><a href="/html/notice/detail1-03.html">“甲子基金瓮安1号”产品介绍</a><span class="time">2016-08-01</span></li>
                    <li class="clearfix"><span class="point">.</span><a href="/html/notice/detail1-01.html">宝付与“中政投”达成战略合作服务协议</a><span class="time">2016-07-31</span></li>
                </ul>
            </div>
            <!-- 网站公告结束 -->

            <!-- 行业动态 -->
            <div class="item-box item-box-mes fl-right">
                <div class="tit clearfix"><h4 class="fl-left">行业动态</h4> <a href="/html/notice.html#trends" class="more fl-right">更多<span class="arrows">>></span></a></div>
                <ul>
                    <li class="clearfix"><span class="point">.</span><a href="/html/notice/detail04.html">陈鹏飞：私募“新贵”的逆袭之路</a><span class="time">2016-08-08</span></li>
                    <li class="clearfix"><span class="point">.</span><a href="/html/notice/detail03.html">新生态•新机遇 2016浙江金融创新高峰论坛在杭州隆重举行</a><span class="time">2016-08-06</span></li>
                    <li class="clearfix"><span class="point">.</span><a href="/html/notice/detail02.html">供应链金融大热，P2G的春天还会远吗？</a><span class="time">2016-08-05</span></li>
                    <li class="clearfix"><span class="point">.</span><a href="/html/notice/detail01.html">2016（第三届）互联网金融风控峰会今日召开</a><span class="time">2016-08-02</span></li> 
                </ul>
            </div>
            <!-- 行业动态结束 -->
        </div>
        
        <!-- 友链 -->
        <div class="item-box item-box-flinks">
            <div class="tit">合作伙伴</div>
            <ul class="clearfix">
				<li><a target="_blank" href="https://www.baofoo.com/"><img src="/images/linkslogo.jpg" alt="宝付"></a></li>
                <li><a target="_blank" href="https://www.tongdun.cn/"><img src="/images/linkslogo2.jpg" alt="同盾科技"></a></li>
                <li><a target="_blank" href="http://www.zjol.com.cn/"><img src="/images/linkslogo3.jpg" alt="浙江在线"></a></li>
                <li><a target="_blank" href="https://www.aliyun.com/"><img src="/images/linkslogo4.jpg" alt="阿里云"></a></li>
                <li><a target="_blank" href="http://www.laecap.com/"><img src="/images/linkslogo5.jpg" alt="亚租所"></a></li>
            </ul>
        </div>
        <!-- 友链结束 -->

    </div>

    <#include "foot.ftl" />
	 
</body>
</html>
