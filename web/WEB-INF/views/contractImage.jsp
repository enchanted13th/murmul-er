<%--
  Created by IntelliJ IDEA.
  User: seokjung
  Date: 14/08/2019
  Time: 12:05 PM
  To change this template use File | Settings | File Templates.
--%>
<%@ page language="java" contentType="text/html; charset=UTF-8" pageEncoding="UTF-8"%>
<%@ taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core" %>
<%@ taglib prefix="fn" uri="http://java.sun.com/jsp/jstl/functions" %>
<%@ taglib prefix="fmt" uri="http://java.sun.com/jsp/jstl/fmt" %>

<!DOCTYPE html PUBLIC "-//W3C//DTD HTML 4.01 Transitional//EN" "http://www.w3.org/TR/html4/loose.dtd">
<html>
<head>
    <meta http-equiv="Content-Type" content="text/html; charset=UTF-8">
    <title>계약서 이미지</title>
    <link rel="stylesheet" href="/resources/css/contractImage.css">
    <link rel="stylesheet" href="/resources/sweetalert2/sweetalert2.css"/>
    <script>
        var rentType = ${contractData.rentType};
        var buildingType = ${contractData.house};
        var mcType = ${contractData.mcType};
    </script>
    <script src="/resources/js/jquery-3.4.1.min.js"></script>
    <script src="/resources/js/html2canvas.js"></script>
    <script src="/resources/sweetalert2/sweetalert2.min.js"></script>
    <script src="/resources/js/contractImage.js"></script>
</head>
<body>
<div class="contract-image-page">
    <div class="header">• 작성된 파란색 글씨를 확인해주세요.</div>
    <div class="buttons">
        <button id="btnBack">내용 수정하기</button>
        <button id="btnToImage">이미지로 다운로드</button>
        <button id="btnExit">창 닫기</button>
    </div>
    <div class="contract-body">
        <img src="/resources/img/contract/contract_ex.jpg"/>
        <div id="rentType"><img class="check" src="/resources/img/etc/check_blue.png"></div>
        <%--<div class="rent-type1"><img class="check" src="/resources/img/etc/check_blue.png"></div>--%>
        <%--<div class="rent-type2"><img class="check" src="/resources/img/etc/check_blue.png"></div>--%>
        <%--<div class="rent-type3"><img class="check" src="/resources/img/etc/check_blue.png"></div>--%>
        <div class="jeondae-name">${contractData.jeondaeName}</div>
        <div class="jeoncha-name">${contractData.jeonchaName}</div>
        <div class="sojaeji">${contractData.roadAddress}</div>
        <div class="building-name">${contractData.buildingName}</div>
        <div id="buildingType"><img class="check" src="/resources/img/etc/check_blue.png"></div>
        <%--<div class="building-type1"><img class="check" src="/resources/img/etc/check_blue.png"></div>--%>
        <%--<div class="building-type2"><img class="check" src="/resources/img/etc/check_blue.png"></div>--%>
        <%--<div class="building-type3"><img class="check" src="/resources/img/etc/check_blue.png"></div>--%>
        <%--<div class="building-type4"><img class="check" src="/resources/img/etc/check_blue.png"></div>--%>
        <%--<div class="building-type5"><img class="check" src="/resources/img/etc/check_blue.png"></div>--%>
        <%--<div class="building-type6"><img class="check" src="/resources/img/etc/check_blue.png"></div>--%>
        <%--<div class="building-type7"><img class="check" src="/resources/img/etc/check_blue.png"></div>--%>
        <div class="gujo">${contractData.buildingStructure}</div>
        <div class="area">${contractData.buildingArea}</div>
        <div class="jeondae-bubun">${contractData.jeondaeBubun}</div>
        <div class="jeondae-area">${contractData.jeondaeArea}</div>
        <div class="yongdo">${contractData.jeondaeUsage}</div>

        <div class="jeondae-deposit">${contractData.deposit}</div>
        <div class="jeondae-deposit-num">${contractData.deposit}</div>
        <%--<div class="jeondae-deposit">10200</div>--%>
        <%--<div class="jeondae-deposit-num">10200</div>--%>

        <div class="jeondae-contract-cost">${contractData.contractPayment}</div>
        <div class="jeondae-contract-name">${contractData.jeondaeName}</div>
        <div class="jeondae-middle-cost">${contractData.middlePayment}</div>
        <div class="jeondae-middle-date-year">${contractData.mdPayYear}</div>
        <div class="jeondae-middle-date-month">${contractData.mdPayMonth}</div>
        <div class="jeondae-middle-date-day">${contractData.mdPayDay}</div>
        <div class="jeondae-balance">${contractData.remainderPayment}</div>
        <div class="jeondae-balance-date-year">${contractData.remainderYear}</div>
        <div class="jeondae-balance-date-month">${contractData.remainderMonth}</div>
        <div class="jeondae-balance-date-day">${contractData.remainderDay}</div>
        <div class="jeondae-monthly-cost">${contractData.monthlyCost}</div>
        <div id="mcType"><img class="check" src="/resources/img/etc/check_blue.png"></div>
        <%--<div class="jeondae-monthly-type1"><img class="check" src="/resources/img/etc/check_blue.png"></div>--%>
        <%--<div class="jeondae-monthly-type2"><img class="check" src="/resources/img/etc/check_blue.png"></div>--%>
        <div class="jeondae-monthly-date-day">${contractData.mcPayDayS}</div>
        <div class="jeondae-from-date-year">${contractData.fromYearS}</div>
        <div class="jeondae-from-date-month">${contractData.fromMonthS}</div>
        <div class="jeondae-from-date-day">${contractData.fromDayS}</div>
        <div class="jeondae-to-date-year">${contractData.toYearS}</div>
        <div class="jeondae-to-date-month">${contractData.toMonthS}</div>
        <div class="jeondae-to-date-day">${contractData.toDayS}</div>
        <div class="jeondae-to-date-year2">${contractData.toYearS}</div>
        <div class="jeondae-to-date-month2">${contractData.toMonthS}</div>
        <div class="jeondae-to-date-day2">${contractData.toDayS}</div>
        <div class="imdae-deposit">${contractData.depositL}</div>
        <div class="imdae-deposit-num">${contractData.depositL}</div>
        <div class="imdae-monthly-cost">${contractData.monthlyCostL}</div>
        <div class="imdae-monthly-num">${contractData.monthlyCostL}</div>
        <div class="imdae-name">${contractData.lessorName}</div>
        <div class="imdae-from-date-year">${contractData.fromYearL}</div>
        <div class="imdae-from-date-month">${contractData.fromMonthL}</div>
        <div class="imdae-from-date-day">${contractData.fromDayL}</div>
        <div class="imdae-to-date-year">${contractData.toYearL}</div>
        <div class="imdae-to-date-month">${contractData.toMonthL}</div>
        <div class="imdae-to-date-day">${contractData.toDayL}</div>
        <div class="manage-cost">${contractData.manageCost}</div>
        <div class="manage-cost-item">${contractData.manages}</div>
        <div class="option-item">${contractData.options}</div>
        <div class="contract-date-year">${contractData.todayYear}</div>
        <div class="contract-date-month">${contractData.todayMonth}</div>
        <div class="contract-date-day">${contractData.todayDay}</div>
        <div class="sign-jeondae-name">${contractData.jeondaeName}</div>
        <div class="sign-jeoncha-name">${contractData.jeonchaName}</div>
    </div>
    <form id="imgForm" name="imgForm" method="POST" action="/contract/toimage">
        <input type="hidden" id="imgData" name="imgData">
    </form>
</div>
</body>
</html>
