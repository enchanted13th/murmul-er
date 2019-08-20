<%@ page language="java" contentType="text/html; charset=UTF-8" pageEncoding="UTF-8"%>
<%@ taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core" %>
<%@ taglib prefix="fn" uri="http://java.sun.com/jsp/jstl/functions" %>
<%@ taglib prefix="fmt" uri="http://java.sun.com/jsp/jstl/fmt" %>

<!DOCTYPE html PUBLIC "-//W3C//DTD HTML 4.01 Transitional//EN" "http://www.w3.org/TR/html4/loose.dtd">
<html>
<head>
    <meta http-equiv="Content-Type" content="text/html; charset=UTF-8">
    <title>계약서 작성 폼 작성하기</title>
    <link rel="stylesheet" href="/resources/css/contractWriteForm.css" />
    <link rel="stylesheet" href="/resources/sweetalert2/sweetalert2.css"/>
    <script>
        var rentType = ${roomInfo.saleVO.rentType};
        var roomType = "${roomInfo.roomVO.roomType}";
    </script>
</head>
<body>
<div class="wrap">
    <div class="title">
        <h1>계약서 작성</h1>
    </div>
    <div class="addContractForm">
        <form name="contractForm" method="POST" action="/contract/show" onsubmit="return false;">
            <input type="hidden" name="roomId" value="${roomId}">
            <table class="tbContent">
                <tr>
                    <td colspan="4" class="tbtitle">계약 당사 정보</td>
                </tr>
                <tr>
                    <td class="tbSubtitle tdSubtitleWide">전대인 성명</td>
                    <td class="tdContent tdContentWide">
                        <input type="text" class="setTextSize" name="jeondaeName" id="jeondaeName" onkeyup="$(this).isWord()" placeholder="한글만 입력 가능" value="${jeondaeName}"/>
                    </td>
                    <td class="tbSubtitle tdSubtitleWide">전차인 성명</td>
                    <td class="tdContent tdContentWide">
                        <input type="text" class="setTextSize" name="jeonchaName" id="jeonchaName" onkeyup="$(this).isWord()" placeholder="한글만 입력 가능" value="${jeonchaName}"/>
                    </td>
                </tr>
            </table>
            <table class="tbContent">
                <tr>
                    <td colspan="4" class="tbtitle">건물 정보</td>
                </tr>
                <tr>
                    <td class="tbSubtitle tdSubtitleWide">건물명</td>
                    <td class="tdContent">
                        <input type="text" class="setTextSize" name="buildingName" id="buildingName" onkeyup="$(this).isValidTitle()" placeholder="특수문자 입력 불가"/>
                    </td>
                    <td class="tbSubtitle tdSubtitleWide">건물 면적(공급면적)</td>
                    <td class="tdContent">
                        <input type="text" class="setTextSize alignRight" name="buildingArea" id="buildingArea" onkeyup="$(this).onlyNum()" placeholder="숫자만 입력 가능"/>m²
                    </td>
                </tr>
                <tr>
                    <td class="tbSubtitle tdSubtitleWide">건물 구조</td>
                    <td class="tdContent tdContentWide">
                        <input type="text" class="setTextSize" name="buildingStructure" id="buildingStructure" onkeyup="$(this).isWord()" placeholder="한글만 입력 가능"/>
                    </td>
                    <td class="tbSubtitle tdSubtitleWide">건물 유형</td>
                    <td class="tdContent tdContentWide">
                        &nbsp;&nbsp;&nbsp;공동주택(
                        <input type="radio" value="1" name="house">아파트
                        <input type="radio" value="2" name="house">다세대
                        <input type="radio" value="3" name="house">연립 )<br/>
                        &nbsp;&nbsp;&nbsp;단독주택(
                        <input type="radio" value="4" name="house">다가구
                        <input type="radio" value="5" name="house">원룸
                        <input type="radio" value="6" name="house">단독 )
                        <input type="radio" value="7" name="house">기타
                    </td>
                </tr>
                <tr>
                    <td class="tbSubtitle tdSubtitleWide">전대할 부분</td>
                    <td><input type="text" class="setTextSize" name="jeondaeBubun" id="jeondaeBubun" onkeyup="$(this).isWord()" placeholder="한글만 입력 가능"/></td>
                    <td class="tbSubtitle tdSubtitleWide">용도</td>
                    <td><input type="text" class="setTextSize" name="jeondaeUsage" id="jeondaeUsage" onkeyup="$(this).isWord()" placeholder="한글만 입력 가능"/></td>
                </tr>
            </table>
            <table class="tbContent">
                <tr>
                    <td colspan="4" class="tbtitle">전대차 계약내용</td>
                </tr>
                <tr>
                    <td class="tbSubtitle">대여 유형</td>
                    <td class="tdContent" colspan="3">
                        <input type="radio" value="1" name="rentType">전세
                        <input type="radio" value="2" name="rentType">월세
                        <input type="radio" value="3" name="rentType">보증금 있는 월세
                    </td>
                </tr>
                <tr>
                    <td class="tbSubtitle">보증금</td>
                    <td class="tdContent" colspan="3">
                        &nbsp;&nbsp;금<input type="text" id="deposit" name="deposit" class="alignRight" value="${roomInfo.saleVO.deposit}"/>만 원
                    </td>
                </tr>
                <tr>
                    <td class="tbSubtitle">계약금</td>
                    <td class="tdContent" colspan="3">
                        &nbsp;&nbsp;금<input type="text" id="contractPayment" name="contractPayment" class="alignRight"/>만 원
                    </td>
                    <%--<td class="tbSubtitle">지불일</td>--%>
                    <%--<td class="tdContent">--%>
                        <%--<select class="selectNum s7" id="contractPayYear" name="contractPayYear">--%>
                            <%--<option value="" selected>------</option>--%>
                        <%--</select>--%>
                        <%--년&nbsp;&nbsp;--%>
                        <%--<select class="selectNum s7" id="contractPayMonth" name="contractPayMonth">--%>
                            <%--<option value="" selected>------</option>--%>
                        <%--</select>--%>
                        <%--월&nbsp;&nbsp;--%>
                        <%--<select class="selectNum s7" id="contractPayDay" name="contractPayDay">--%>
                            <%--<option value="" selected>------</option>--%>
                        <%--</select>일--%>
                    <%--</td>--%>
                </tr>
                <tr>
                    <td class="tbSubtitle">중도금</td>
                    <td class="tdContent">
                        &nbsp;&nbsp;금<input type="text" id="middlePayment" name="middlePayment" class="alignRight" onkeyup="$.settingSelBox('middle', $(this).val())"/>만 원
                    </td>
                    <td class="tbSubtitle">지불일</td>
                    <td class="tdContent">
                        <select class="selectNum s1" id="mdPayYear" name="mdPayYear">
                            <option value="" selected>-------</option>
                        </select>
                        년&nbsp;&nbsp;
                        <select class="selectNum s1" id="mdPayMonth" name="mdPayMonth">
                            <option value="" selected>-------</option>
                        </select>
                        월&nbsp;&nbsp;
                        <select class="selectNum s1" id="mdPayDay" name="mdPayDay">
                            <option value="" selected>-------</option>
                        </select>일
                    </td>
                </tr>
                <tr>
                    <td class="tbSubtitle">잔금</td>
                    <td class="tdContent">
                        &nbsp;&nbsp;금<input type="text" id="remainderPayment" name="remainderPayment" class="alignRight" onkeyup="$.settingSelBox('remainder', $(this).val())"/>만 원
                    </td>
                    <td class="tbSubtitle">지불일</td>
                    <td class="tdContent">
                        <select class="selectNum s2" id="remainderYear" name="remainderYear">
                            <option value="" selected>-------</option>
                        </select>
                        년&nbsp;&nbsp;
                        <select class="selectNum s2" id="remainderMonth" name="remainderMonth">
                            <option value="" selected>-------</option>
                        </select>
                        월&nbsp;&nbsp;
                        <select class="selectNum s2" id="remainderDay" name="remainderDay">
                            <option value="" selected>-------</option>
                        </select>일
                    </td>
                </tr>
                <tr>
                    <td class="tbSubtitle">월세</td>
                    <td class="tdContent">
                        &nbsp;&nbsp;금<input type="text" id="monthlyCost" name="monthlyCost" class="alignRight" value="${roomInfo.saleVO.monthlyCost}"/>만 원
                    </td>
                    <td class="tbSubtitle">지불일(매월)</td>
                    <td class="tdContent">
                        <select class="selectNum" id="mcPayDayS" name="mcPayDayS">
                            <option value="" selected>-------</option>
                        </select>일
                        <input type="radio" value="1" name="mcType" checked>선불
                        <input type="radio" value="2" name="mcType">후불
                    </td>
                </tr>
                <tr>
                    <td class="tbSubtitle">기간</td>
                    <td class="tdContent" colspan="3">
                        <select class="selectNum s3" id="fromYearS" name="fromYearS" <%--onchange="$(this).changeAll('sub', $(this).val(), 'year', 'toYearS')"--%>>
                            <option value="" selected>-------</option>
                        </select>
                        년&nbsp;
                        <select class="selectNum s3" id="fromMonthS" name="fromMonthS" <%--onchange="$(this).changeAll('sub', $(this).val(), 'month','toMonthS')"--%>>
                            <option value="" selected>-------</option>
                        </select>
                        월&nbsp;
                        <select class="selectNum s3" id="fromDayS" name="fromDayS" <%--onchange="$(this).changeAll('sub', $(this).val(), 'day', 'toDayS')"--%>>
                            <option value="" selected>-------</option>
                        </select>
                        일 부터 &nbsp;&nbsp;
                        <select class="selectNum s4" id="toYearS" name="toYearS">
                            <option value="" selected>-------</option>
                        </select>
                        년&nbsp;
                        <select class="selectNum s4" id="toMonthS" name="toMonthS">
                            <option value="" selected>-------</option>
                        </select>
                        월&nbsp;
                        <select class="selectNum s4" id="toDayS" name="toDayS">
                            <option value="" selected>-------</option>
                        </select>일까지
                    </td>
                </tr>
            </table>
            <table class="tbContent">
                <tr>
                    <td colspan="4" class="tbtitle">임대차 계약내용</td>
                </tr>
                <tr>
                    <td class="tbSubtitle">보증금</td>
                    <td class="tdContent" colspan="3">
                        &nbsp;&nbsp;금<input type="text" id="depositL" name="depositL" class="alignRight" onkeyup="$(this).onlyNum()"/>만 원
                    </td>
                </tr>
                <tr>
                    <td class="tbSubtitle">월세</td>
                    <td class="tdContentShort" >
                        &nbsp;&nbsp;금<input type="text" id="monthlyCostL" name="monthlyCostL" class="alignRight"/>만 원
                    </td>
                    <td class="tbSubtitle">지불일(매월)</td>
                    <td class="tdContentShort">
                        <select class="selectNum" id="mcPayDayL" name="mcPayDayL">
                            <option value="" selected>------</option>
                        </select>일
                    </td>
                </tr>
                <tr>
                    <td class="tbSubtitle">소유자 성명</td>
                    <td class="tdContent"  colspan="3">
                        <input class="setTextSize" type="text" id="lessorName" name="lessorName" onkeyup="$(this).isWord()" placeholder="한글만 입력 가능"/>
                    </td>
                </tr>
                <tr>
                    <td class="tbSubtitle">임대차 기간</td>
                    <td class="tdContent"  colspan="3">
                        <select class="selectNum s5" id="fromYearL" name="fromYearL" <%--onchange="$(this).changeAll('lease', $(this).val(), 'year', 'toYearL')"--%>>
                            <option value="" selected>------</option>
                        </select>
                        년&nbsp;
                        <select class="selectNum s5" id="fromMonthL" name="fromMonthL" <%--onchange="$(this).changeAll('lease', $(this).val(), 'month', 'toMonthL')"--%>>
                            <option value="">------</option>
                        </select>
                        월&nbsp;
                        <select class="selectNum s5" id="fromDayL" name="fromDayL" <%--onchange="$(this).changeAll('lease', $(this).val(), 'day', 'toDayL')"--%>>
                            <option value="">------</option>
                        </select>
                        일 부터 &nbsp;&nbsp;
                        <select class="selectNum s6" id="toYearL" name="toYearL">
                            <option value="" selected>------</option>
                        </select>
                        년&nbsp;
                        <select class="selectNum s6" id="toMonthL" name="toMonthL">
                            <option value="">------</option>
                        </select>
                        월&nbsp;
                        <select class="selectNum s6" id="toDayL" name="toDayL">
                            <option value="">------</option>
                        </select>
                        일까지
                    </td>
                </tr>
            </table>
        <div class="lastBtns">
            <button type="button" class="lastBtn" id="cancel">뒤로</button>
            <button class="lastBtn" id="lastBtn">등록</button>
        </div>
        </form>
        <div class="caution">
            <h4>*작성 내용이 사실과 다를 시 법적 책임을 물을 수 있습니다.</h4>
        </div>
    </div>
</div>
<script src="/resources/js/jquery-3.4.1.min.js"></script>
<script src="/resources/sweetalert2/sweetalert2.min.js"></script>
<script src="/resources/js/contractForm.js"></script>
<script src="/resources/js/contractWriteForm.js"></script>
</body>
</html>
