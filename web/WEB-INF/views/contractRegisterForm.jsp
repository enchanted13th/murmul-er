<%@ page language="java" contentType="text/html; charset=UTF-8" pageEncoding="UTF-8"%>
<%@ taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core" %>
<%@ taglib prefix="fn" uri="http://java.sun.com/jsp/jstl/functions" %>
<%@ taglib prefix="fmt" uri="http://java.sun.com/jsp/jstl/fmt" %>
<!DOCTYPE html PUBLIC "-//W3C//DTD HTML 4.01 Transitional//EN" "http://www.w3.org/TR/html4/loose.dtd">
<html>
<head>
    <meta http-equiv="Content-Type" content="text/html; charset=UTF-8">
    <title>계약서 등록 폼 작성하기</title>
    <link rel="stylesheet" href="/resources/css/contractRegisterForm.css" />
    <link rel="stylesheet" href="/resources/sweetalert2/sweetalert2.css"/>
    <script>
        var rentType = ${roomInfo.saleVO.rentType};
        var contactId = ${contactId};
    </script>
</head>
<body>
<div class="wrap">
    <div class="title">
        <h1>계약서 등록</h1>
    </div>
    <div class="addContractForm">
        <form name="contractForm" onsubmit="return false;">
            <input type="hidden" name="roomId" value="${roomId}">
            <%--<table class="tbContent">--%>
                <%--<tr>--%>
                    <%--<td colspan="4" class="tbtitle">계약 당사 정보</td>--%>
                <%--</tr>--%>
                <%--<tr>--%>
                    <%--<td class="tbSubtitle tdSubtitleWide">전대인 성명</td>--%>
                    <%--<td class="tdContent tdContentWide">--%>
                        <%--<input type="text" class="setTextSize" name="jeondaeName" id="jeondaeName" onkeyup="$(this).isWord()" placeholder="한글만 입력 가능" value="${jeondaeName}"/>--%>
                    <%--</td>--%>
                    <%--<td class="tbSubtitle tdSubtitleWide">전차인 성명</td>--%>
                    <%--<td class="tdContent tdContentWide">--%>
                        <%--<input type="text" class="setTextSize" name="jeonchaName" id="jeonchaName" onkeyup="$(this).isWord()" placeholder="한글만 입력 가능" value="${jeonchaName}"/>--%>
                    <%--</td>--%>
                <%--</tr>--%>
            <%--</table>--%>
            <table class="tbContent">
                <tr>
                    <td colspan="4" class="tbtitle">계약 정보</td>
                </tr>
                <tr>
                    <td class="tbSubtitle">임대 유형</td>
                    <td class="tdContent" colspan="3">
                        <input type="radio" value="1" name="rentType">전세
                        <input type="radio" value="2" name="rentType">월세
                        <input type="radio" value="3" name="rentType">보증금 있는 월세
                    </td>
                </tr>
                <tr>
                    <td class="tbSubtitle tdSubtitleWide">보증금</td>
                    <td class="tdContent tdContentWide">
                        &nbsp;&nbsp;금<input type="text" id="deposit" name="deposit" class="alignRight" value="${roomInfo.saleVO.deposit}"/>만 원
                    </td>
                    <td class="tbSubtitle tdSubtitleWide">월세</td>
                    <td class="tdContent tdContentWide">
                        &nbsp;&nbsp;금<input type="text" id="monthlyCost" name="monthlyCost" class="alignRight" value="${roomInfo.saleVO.monthlyCost}"/>만 원
                    </td>
                </tr>
                <tr>
                    <td class="tbSubtitle">기간</td>
                    <td class="tdContent" colspan="3">
                        <select class="selectNum s1" id="fromYearS" name="fromYearS">
                            <option value="" selected>------</option>
                        </select>
                        년&nbsp;
                        <select class="selectNum s1" id="fromMonthS" name="fromMonthS">
                            <option value="" selected>------</option>
                        </select>
                        월&nbsp;
                        <select class="selectNum s1" id="fromDayS" name="fromDayS">
                            <option value="" selected>------</option>
                        </select>
                        일 부터 &nbsp;&nbsp;
                        <select class="selectNum s2" id="toYearS" name="toYearS">
                            <option value="" selected>------</option>
                        </select>
                        년&nbsp;
                        <select class="selectNum s2" id="toMonthS" name="toMonthS">
                            <option value="" selected>------</option>
                        </select>
                        월&nbsp;
                        <select class="selectNum s2" id="toDayS" name="toDayS">
                            <option value="" selected>------</option>
                        </select>일까지
                    </td>
                </tr>
            </table>
            <table class="tbContent">
                <tr>
                    <td colspan="2" class="tbtitle">계약서 스캔 이미지</td>
                </tr>
                <tr>
                    <td class="tbSubtitle tdSubtitleWide">이미지 첨부</td>
                    <td id="tdImg" class="tdContent">
                        <button type="button" onclick="readFile()">파일선택</button>
                        <input type="file" name="uploadFile" id="uploadFile" onchange="readName(this)" />
                        <span id="fileName" name="fileName"></span>
                    </td>
                </tr>
            </table>
            <div class="lastBtns">
                <button type="button" class="lastBtn" id="cancel">뒤로</button>
                <button class="lastBtn" id="lastBtn">등록</button>
            </div>
        </form>
    </div>
</div>
<script src="/resources/js/jquery-3.4.1.min.js"></script>
<script src="/resources/sweetalert2/sweetalert2.min.js"></script>
<script src="/resources/js/contractForm.js"></script>
<script src="/resources/js/contractRegisterForm.js"></script>
</body>
</html>