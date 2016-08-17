
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
    <link type="text/css" rel="stylesheet" href="/css/animate.css">
    <script type="text/javascript" src="/js/jquery-1.11.1.js"></script>
    <script type="text/javascript" src="/js/jquery.SuperSlide.2.1.1.js"></script>
    <script type="text/javascript" src="/js/jquery.cookie.min.js"></script>
    <script type="text/javascript" src="/js/jquery.tmpl.js"></script>
    <script type="text/javascript" src="/js/path.js"></script>
    <script type="text/javascript" src="/js/global.js"></script>
    <script type="text/javascript" src="/js/top.js"></script>
    
    <script type="text/javascript" src="/js/form-validation.js"></script>
    <link type="text/css" rel="stylesheet" href="/js/dialog/dialog.css">
    <script type="text/javascript" src="/js/dialog/dialog.js"></script>
    <script type="text/javascript" src="/js/subjectDetail.js"></script>
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

    <div class="container">
        <div class="breadcrumb">
            当前位置：<a href="/html/list/manageMoney.html">我要理财</a> > <span class="active">${subject.subjectName}</span> 
        </div>

        <div class="item-box border-top margin-t-0">
            <div class="padding item-box-con item-box-con2 clearfix">
                <h3>${subject.subjectName}</h3>
                <input type="hidden" name="subjectId" id="subjectId" value="${subject.subjectId}" />
                <div class="left fl-left">
                    <ul class="sub-ul clearfix">
                   		 <#if subject.maxReturn??>
                        <li class="frist"><p class="p1"><span class="big">${subject.minReturn*100}%-${subject.maxReturn*100}%</span></p><p class="p2">预计年化收益</p></li>  
                        <#else>
                        <li class="frist"><p class="p1"><span class="big">${subject.minReturn*100}%</span></p><p class="p2">预计年化收益</p></li>
                        </#if>
                        <li><p class="p1"><span class="big">${subject.subjectFinancingPeriod }</span>个月</p><p class="p2">融资期限</p></li>
                        <li><p class="p1"><span class="big">${minInvestMoneyStr}</span>元</p><p class="p2">认购起点</p></li> 
                    </ul>
                    <div class="con clearfix">
                        <div class="d1 fl-left">
                            <p>募集金额： ${subject.strMoney}元</p>
                            <p>投资进度：<span id="r"></span>%</p>
                            <p>收益方式：${subject.subjectIncomeWay}</p>
                        </div>
                        <div class="d2 fl-left">
                            <p>剩余可投：<span id="l"></span>元</p>
                            
                            <#if subject.subjectNodeInterest==1>
                            <p>起息日：T+${subject.subjectNumOfDays}工作日起息</p>
                            <#elseif subject.subjectNodeInterest==2>
                            <p>起息日：满标审核后${subject.subjectNumOfDays}日起息</p>
                            <#elseif subject.subjectNodeInterest==3>
                            <p>起息日：项目集满后${subject.subjectNumOfDays}日起息</p>
                            </#if>
                        </div>
                    </div>
                </div>
                <!-- 新的投资 -->
                <div class="right fl-left">
                    <div class="head clearfix">   
                        <p class="p1">账户可用余额：
                            <span class="none" id="noUser"><a class="blue" onclick="path.gotologin()">登录</a>&nbsp;可见</span>
                            <span class="none" id="hadUser"><span id="aMoney" class="zzt-red"></span>元</span>
                        </p>
                        <a class="a1" onclick="path.gotochanrge()">充值</a>
                    </div>
                    <p class="p2">递增金额：<span id="abolish">-</span>元</p>

                    <div class="input-w clearfix">   
                        <div class="input-cell">
                            <input type="text" class="g-input" name="investmentMoney" id="investmentMoney" onkeyup="value=value.replace(/[^\d]/ig,'')" maxlength="12" size="12" autocomplete="off">
                            <span class="unit">元</span>
                        </div>
                        <a id="userInvest1" onclick="details('${subject.subjectId}')" class="btns btns-info none">立即投资</a>
                    </div>
                    <div class="tips tips-default">
                        <p id="upper">-</p>
                        <p class="sy">预期总收益<span class="zzt-red" id="shouyi">0.00</span>元</p>
                    </div>
                    <div class="tips tips-error none">    
                    </div>       
                </div>

            </div>
        </div>

        <div class="item-box">
            <div class="padding">
               <table class="g-table">
                   <thead><tr><td>投资类型</td><td>投资金额</td><td>预期收益率 </td></tr></thead>
                   <tbody>
                   <#list subject.annualizedReturnList as item>
                       <tr><td>
                       ${item.type}
                       </td><td>${item.minMoney}-${item.maxMony}</td><td>${item.annualizedReturnNum*100}%</td></tr>
                        </#list>
                   </tbody>
               </table>        
            </div>
        </div>


        <div class="item-box g-tab">
            <div class="hd"><ul class="clearfix"><li>项目介绍</li><li>预期收益</li><li>投资记录</li><li>相关资料</li></ul></div>
            <!-- <div class="none">您还没有相关数据，请先<a href="../login.html">登陆</a>或<a href="../regist.html">注册</a></div> -->
            <div id="myShow" class="bd none">
                <ul class="arrange-box">

                    <li class="l1 none">
                        <div>一、项目简介</div>
                        <p> ${project.projectBrief}</p>
                        <div>二、发行人基本情况</div>
                        <p>${project.projectPublisherSituation}</p>
                        <div>三、增信措施</div>
                        <p>${project.projectCreditEnhancement}</p>
                        <div>四、募集资金用途</div>
                        <p>${project.projectIpoUse}</p>
                    </li>

                    <li class="l2 none">
                        <div class="con">
                            <p class="p1">预期收益 （按起投额${minInvestMoneyStr}元，项目预期收益率 ${subject.minReturn*100}%计算。每期实际收款日期、金额以最终到账为准，本项目最终解释权归中证投所有。）</p>
                            <table class="g-table unborder-r table2">
                                <thead><tr><td>序号</td><td>偿付日期</td><td>应收金额(元)</td><td>投资金额(元)</td><td>预期收益(元)</td></tr></thead>
                                <!--模板填充 -->
                                <tbody id="expectTmpl">
                                </tbody>
                            </table>
                        </div>
                        <div class="line"></div>
                        <div class="con">
                            <h3>项目收益</h3>
                            <table class="g-table table3">
                                <thead><tr><td>融资总额</td><td>预期年化收效率</td><td>预期总收益</td><td>收益发放</td></tr></thead>
                                <tbody><tr><td><span class="big">${subject.subjectMoney}</span>元</td><td><span class="big">${subject.minReturn*100}</span>%</td><td><span class="big" id='projectTotalExpectMoney'></span>元</td><td>${subject.subjectIncomeWay}</td></tr></tbody>
                            </table>
                        </div>

                    </li>
                    <li class="l3 none">
                        <div class="con">
                            <table class="g-table unborder-r table2">
                                <thead><tr><td>序号</td><td>投资人</td><td>投资金额</td><td>投资时间</td></tr></thead>
                                <tbody id="mytmpl">
                                
                                </tbody>
                            </table>
                        </div>
                    </li>
                    <li class="l4 none">
                        <ul>
	                        <#list subject.protList as item>
	                            <li><a onclick='Filedown("${item.protocolAddress}")'>
	                            		《${item.protocolName}》
	                            	</a>
	                            </li>
	                        </#list>
                        </ul>
                    </li>
                </ul>
            </div>
			<div id="myHide" class="bd none">
				<br>
				<br>
				<p  align="center">请先<a class="blue" href="/html/login.html">登录</a>或<a class="blue" href="/html/regist.html">注册</a></p>
				<br>
				<br>
			</div>
        </div>
        <script type="text/javascript">
            $('.g-tab').slide({mainCell:".bd ul",trigger:'click'})
        </script>

    </div>

    <#include "foot.ftl" />

    
	  <#noparse>
	<script id="testTemplate" type="text/x-jquery-tmpl">
	{{each(i,invest) investmentList}}
                <tr><td>${i+1}</td><td>${invest.user.userPhone}</td><td>￥<span>${$.outputmoney(invest.investmentInvest)}</span></td><td>${invest.investTime2}</td></tr>
				{{/each}}
	 </script>
	 <script id="myTemplate" type="text/x-jquery-tmpl">
       {{each(i,item) expectedPaymentList}}
        <tr><td>${item.no}</td><td>${item.payDayStr} </td><td>${$.outputmoney(item.money)}</td><td>${$.outputmoney(item.investMoney)}</td><td>${$.outputmoney(item.expectedMoney)}</td></tr>
				{{/each}}                             
	 </script>
	  </#noparse>
</body>
</html>
