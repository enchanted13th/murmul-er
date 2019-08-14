<%--
  Created by IntelliJ IDEA.
  User: seokjung
  Date: 11/08/2019
  Time: 10:24 PM
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
    <title>방 수정하기</title>
    <link rel="stylesheet" href="/resources/css/contractForm.css" />
    <script src="/resources/js/jquery-3.4.1.min.js"></script>
    <script src="/resources/js/contractForm.js"></script>
</head>
<body>
<div class="wrap">
    <div class="title">
        <h1>계약서 작성</h1>
    </div>
    <div class="addContractForm">
        <form name="contractForm" onsubmit="return false;">
            <table class="tbContent">
                <tr>
                    <td colspan="4" class="tbtitle">건물 정보</td>
                </tr>
                <tr>
                    <td class="tbSubtitle tdSubtitleWide">건물명</td>
                    <td class="tdContent">
                        <input type="text" class="setTextSize" id="buildingName"onkeyup="$(this).isWord()" placeholder="한글만 입력 가능"/>
                    </td>
                    <td class="tbSubtitle tdSubtitleWide">건물 면적(공급면적)</td>
                    <td class="tdContent">
                        <input type="text" class="setTextSize alignRight" id="buildingArea" onkeyup="$(this).onlyNum()" placeholder="숫자만 입력 가능"/>m²
                    </td>
                </tr>
                <tr>
                    <td class="tbSubtitle tdSubtitleWide">건물 구조</td>
                    <td class="tdContent">
                        <input type="text" class="setTextSize"  id="buildingStructure" onkeyup="$(this).isWord()" placeholder="한글만 입력 가능"/>
                    </td>
                    <td class="tbSubtitle tdSubtitleWide">건물 유형</td>
                    <td class="tdContent">
                        공동주택(
                        <input type="radio" value="1" name="house">아파트
                        <input type="radio" value="2" name="house">다세대
                        <input type="radio" value="3" name="house">연립)<br/>
                        단독주택(
                        <input type="radio" value="4" name="house">다가구
                        <input type="radio" value="5" name="house">원룸
                        <input type="radio" value="6" name="house">단독)
                        <input type="radio" value="7" name="house">기타
                    </td>
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
                        &nbsp;&nbsp;금<input type="text" id="deposit" class="alignRight"/>만 원
                    </td>
                </tr>
                <tr>
                    <td class="tbSubtitle">계약금</td>
                    <td class="tdContent">
                        &nbsp;&nbsp;금<input type="text" id="contractPayment" class="alignRight"/>만 원
                    </td>
                    <td class="tbSubtitle">지불일</td>
                    <td class="tdContent">
                        <select class="selectNum s7" id="contractPayYear" name="contractPayYear">
                            <option value="" selected>------</option>
                        </select>
                        년&nbsp;&nbsp;
                        <select class="selectNum s7" id="contractPayMonth" name="contractPayMonth">
                            <option value="" selected>------</option>
                        </select>
                        월&nbsp;&nbsp;
                        <select class="selectNum s7" id="contractPayDay" name="contractPayDay">
                            <option value="" selected>------</option>
                        </select>일
                    </td>
                </tr>
                <tr>
                    <td class="tbSubtitle">중도금</td>
                    <td class="tdContent">
                        &nbsp;&nbsp;금<input type="text" id="middlePayment" class="alignRight"/>만 원
                    </td>
                    <td class="tbSubtitle">지불일</td>
                    <td class="tdContent">
                        <select class="selectNum s1" id="mdPayYear" name="mdPayYear">
                            <option value="" selected>------</option>
                        </select>
                        년&nbsp;&nbsp;
                        <select class="selectNum s1" id="mdPayMonth" name="mdPayMonth">
                            <option value="" selected>------</option>
                        </select>
                        월&nbsp;&nbsp;
                        <select class="selectNum s1" id="mdPayDay" name="mdPayDay">
                            <option value="" selected>------</option>
                        </select>일
                    </td>
                </tr>
                <tr>
                    <td class="tbSubtitle">잔금</td>
                    <td class="tdContent">
                        &nbsp;&nbsp;금<input type="text" id="remainderPayment" class="alignRight"/>만 원
                    </td>
                    <td class="tbSubtitle">지불일</td>
                    <td class="tdContent">
                        <select class="selectNum s2" id="remainderYear" name="remainderYear">
                            <option value="" selected>------</option>
                        </select>
                        년&nbsp;&nbsp;
                        <select class="selectNum s2" id="remainderMonth" name="remainderMonth">
                            <option value="" selected>------</option>
                        </select>
                        월&nbsp;&nbsp;
                        <select class="selectNum s2" id="remainderDay" name="remainderDay">
                            <option value="" selected>------</option>
                        </select>일
                    </td>
                </tr>
                <tr>
                    <td class="tbSubtitle">월세</td>
                    <td class="tdContent">
                        &nbsp;&nbsp;금<input type="text" id="monthlyCost" class="alignRight"/>만 원
                    </td>
                    <td class="tbSubtitle">지불일(매월)</td>
                    <td class="tdContent">
                        <select class="selectNum" id="mcPayDayS" name="mcPayDayS">
                            <option value="" selected>------</option>
                        </select>일
                    </td>
                </tr>
                <tr>
                    <td class="tbSubtitle">기간</td>
                    <td class="tdContent" colspan="3">
                        <select class="selectNum s3" id="fromYearS" name="fromYearS">
                            <option value="" selected>------</option>
                        </select>
                        년&nbsp;
                        <select class="selectNum s3" id="fromMonthS" name="fromMonthS">
                            <option value="" selected>------</option>
                        </select>
                        월&nbsp;
                        <select class="selectNum s3" id="fromDayS" name="fromDayS">
                            <option value="" selected>------</option>
                        </select>
                        일 부터 &nbsp;&nbsp;
                        <select class="selectNum s4" id="toYearS" name="toYearS">
                            <option value="" selected>------</option>
                        </select>
                        년&nbsp;
                        <select class="selectNum s4" id="toMonthS" name="toMonthS">
                            <option value="" selected>------</option>
                        </select>
                        월&nbsp;
                        <select class="selectNum s4" id="toDayS" name="toDayS">
                            <option value="" selected>------</option>
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
                        &nbsp;&nbsp;금<input type="text" id="depositL" class="alignRight" onkeyup="$(this).onlyNum()"/>만 원
                    </td>
                </tr>
                <tr>
                    <td class="tbSubtitle">월세</td>
                    <td class="tdContentShort" >
                        &nbsp;&nbsp;금<input type="text" id="monthlyCostL" class="alignRight"/>만 원
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
                        <input class="setTextSize" type="text" id="lessorName" onkeyup="$(this).isWord()" placeholder="한글만 입력 가능"/>
                    </td>
                </tr>
                <tr>
                    <td class="tbSubtitle">임대차 기간</td>
                    <td class="tdContent"  colspan="3">
                        <select class="selectNum s5" id="fromYearL" name="fromYearL">
                            <option value="" selected>------</option>
                        </select>
                        년&nbsp;
                        <select class="selectNum s5" id="fromMonthL" name="fromMonthL">
                            <option value="">------</option>
                        </select>
                        월&nbsp;
                        <select class="selectNum s5" id="fromDayL" name="fromDayL">
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
            <button class="lastBtn" id="cancel" onclick="confirm('취소하시겠어요?')">취소</button>
            <button class="lastBtn" id="lastBtn" onClick="register()">등록</button>
        </div>
        </form>
        <div class="caution">
            <h4>*작성 내용이 사실과 다를 시 법적 책임을 물을 수 있습니다.</h4>
        </div>
    </div>
</div>
</body>
</html>
