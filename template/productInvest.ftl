
<!DOCTYPE html>
<html lang="zh-cn">
<head>
    <meta http-equiv="Content-Type" content="text/html; charset=utf-8">
    <meta http-equiv="X-UA-Compatible" content="IE=edge,chrome=1">
    <link rel="shortcut icon" href="/images/favicon.ico" type="image/x-icon"/>
    <title>中政投--产品投资</title>
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
    <script type="text/javascript">
        var jump_link="/html/login.html"
    </script>
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
        <div class="item-box border-top margin-t-20">
            <div class="pro-invest">
                <div class="name">${subject.subjectName}</div>
                <input type="hidden" name="subjectId" id="subjectId" value="${subject.subjectId}" />
                <ul class="list clearfix">
                     <#if subject.maxReturn??>
                        <li ><p class="p1">预计年化收益</p><p class="p2">${subject.minReturn*100}%-${subject.maxReturn*100}%</p></li>  
                        <#else>
                        <li><p class="p1">预计年化收益</p><p class="p2">${subject.minReturn*100}%</p></li>
                        </#if>
                    <li><p class="p1">融资期限</p><p class="p2">${subject.subjectFinancingPeriod }个月</p></li>
                    <li><p class="p1">募集金额</p><p class="p2">${subject.strMoney}元</p></li>
                    <li class="last"><p class="p1">起投金额</p><p class="p2">${subject.strSubscriptionAmountMin}元</p></li>
                </ul>
            </div>
            
            <div  class="form-box">
                <form method="post" id="myform" class="g-form">
                 <input type="hidden" name="sid" id="sid" value="${subject.subjectId}" />
                 <input type="hidden" name="investToken" id="investToken" />
 				 <!--提示信息  -->
				 <div class="form-alert none" id='alert'></div>
                <!--模板填充 -->
                    <div id="tmpltest" class="form-group clearfix">
                        
                    </div> 
                    <div class="form-group padding-s clearfix">
                        <label class="g-label">递增金额：</label>
                        <div class="input-w user-gold">
                            <span id="abolish">-</span>元
                        </div>
                    </div>

                    <div class="form-group clearfix">
                        <label class="g-label">投资金额：</label>
                        <div class="input-w amount">
                            <input name="investmentMoney" id="investmentMoney" onkeyup="value=value.replace(/[^\d]/ig,'')"  maxlength="12" size="12" class="g-input black" type="text" data-group-state="false">
                            <span class="unit">元</span>
                            
                            <div class="add-text"><!-- 预期年化收益<span class="zzt-red" id="nianhua"></span>， -->预期总收益<span class="zzt-red" id="shouyi">0.00</span>元</div>
                        </div>
                    </div>
                    <div class="form-group padding-s clearfix">
                        <label class="g-label">大写金额：</label>
                        <div class="input-w">
                             <span class="font-size-24" id="upper"></span>
                        </div>
                    </div>
                    <div  class="form-group padding-s clearfix">
                        <label class="g-label">剩余可投：</label>
                        <!--模板填充 -->
                        <div id="mytmpl" class="input-w user-gold">
                           <span id="myResidual" class="black"></span>元
                        </div>
                    </div>
                    <div class="form-group clearfix">
                        <label class="g-label">交易密码：</label>
                        <div class="input-w">
                            <input name="paypwd" id="paypwd" class="g-input" onfocus="rule.tip($(this),'密码为6位数字')" onblur="rule.tradingPassword($(this))" type="password" data-group-state="false">
                            <a  href="/html/transPsw.html" style="display:none" id="goSetPwd" class="blue set">去设置</a>
                            <a  href="#" style="display:none" id="goreSetPwd" onclick="goreSetPwd()" class="blue set">去重置</a>
                        </div>
                    </div>
                    <div class="form-group padding-s clearfix">
                        <label class="g-label"></label>
                        <div class="input-w" id="agree">
                            <input type="checkbox">同意<a onclick="LinkProtemp()" class="blue">《产品购买协议》</a>
                        </div>
                    </div>
                    <div class="form-group clearfix">
                        <label class="g-label"></label>
                        <div class="input-w surebtn">
                            <a class="btns btns-info">投资</a>
                        </div>
                    </div>
                </form>
            </div>
        </div>
    </div>
	<#include "foot.ftl" />
    <script type="text/javascript" src="/js/invest.js"></script>  
    <script id="testTemplate" type="text/x-jquery-tmpl">
    <#noparse>
    	<label class="g-label">账户余额：</label>
            <div class="input-w user-gold">
                <span class="black">${$.outputmoney(account.userAvailableBalance)}</span>元<a onclick="path.gotochanrge()" class="btns btns-info fl-right">充值</a>
            </div>
    </#noparse>
    </script>
	   
	
</body>
</html>
