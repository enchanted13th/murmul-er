<%@ page language="java" contentType="text/html; charset=UTF-8" pageEncoding="UTF-8"%>
<%@ taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core" %>
<%@ taglib prefix="fn" uri="http://java.sun.com/jsp/jstl/functions" %>
<%@ taglib prefix="fmt" uri="http://java.sun.com/jsp/jstl/fmt" %>
<!DOCTYPE html PUBLIC "-//W3C//DTD HTML 4.01 Transitional//EN" "http://www.w3.org/TR/html4/loose.dtd">
<html>
<head>
    <meta http-equiv="Content-Type" content="text/html; charset=UTF-8">
    <title>방 수정하기</title>
    <link rel="stylesheet" href="/resources/css/updateRoom.css" />
</head>
<body>
<jsp:include page="../topbar.jsp"/>
<c:set var="periodUnit" value="'${room.saleVO.periodUnit}'"/>
<c:set var="isUpdateForm" value="${room}"/>
<div class="wrap">
    <jsp:include page="manageSubtitle.jsp"/>
    <input type="hidden" id="roomId" value="${roomId}"/>
    <div class="addRoomForm">
        <table class="tbRoomType">
            <tr>
                <td colspan="2" class="tbtitle">매물 종류</td>
            </tr>
            <tr>
                <td class="tbSubtitle">종류 선택</td>
                <td class="tdContent">
                    <button id="btnRt1" class="selectSingle" value="원룸">원룸</button>
                    <button id="btnRt2" value="투룸">투룸</button>
                    <button id="btnRt3" value="빌라">빌라</button>
                    <button id="btnRt4" value="오피스텔">오피스텔</button>
                    <button id="btnRt5" value="아파트">아파트</button>
                    <input id="roomType" type="hidden" value="${room.roomVO.roomType}"></input>
                </td>
            </tr>
        </table>
        <table class="tbLocation">
            <tr>
                <td colspan="2" class="tbtitle">위치 정보</td>
            </tr>
            <tr>
                <td class="tbSubtitle">주소</td>
                <td class="tdContent">
                    <input type="text" id="inputAddr" onchange="clear()" readonly="readonly" value=" ${room.locationVO.sido} ${room.locationVO.sigungu} ${room.locationVO.bname} ${room.locationVO.bname2} ${room.locationVO.jibun} ${room.locationVO.roadName} ${room.locationVO.roadJibun}"/>
                    <button id="btnSearchAddr">주소 검색</button>
                </td>
            </tr>
            <tr>
                <td class="tbSubtitle">상세 주소</td>
                <td>
                    <input type="text" id="inputDetailAddr" class="fullTextbox" value="${room.locationVO.detailAddr}"/>
                </td>
            </tr>
        </table>
        <table class="tbRoomInfo">
            <tr>
                <td colspan="2" class="tbtitle">매물 정보</td>
            </tr>
            <tr>
                <td class="tbSubtitle">면적</td>
                <td>
                    <input type="text" id="inputSize" class="alignRight" placeholder="32" onkeyup="$(this).changeSize()"/>
                    <label>평</label>
                    <input type="text" id="inputArea" class="alignRight" placeholder="105.78" value="${room.roomVO.area}" onkeyup="$(this).changeArea()"/>
                    <label>M^2</label>
                </td>
            </tr>
            <tr>
                <td class="tbSubtitle">층수</td>
                <td>
<%--                    <input type="text" id="inputFloor" class="alignRight" value="${room.roomVO.floor}" onkeyup="$(this).onlyNum()"/>--%>
                    <input type="number" id="inputFloor" class="alignRight" value="${room.roomVO.floor}"/>
                    <label>층</label>
                </td>
            </tr>
            <tr>
                <td class="tbSubtitle">금액</td>
                <td>
                    <button id="btnRi1" value="2">전세</button>
                    <button id="btnRi2" value="1">월세</button>
                    <button id="btnRi3" value="3">단기</button>
                    <fmt:parseNumber var="deposit" integerOnly="true" value="${room.saleVO.deposit/10000}" />
<%--                    <input type="text" id="inputDeposit" class="alignRight" value="${deposit}" placeholder="보증금" onkeyup="$(this).onlyNum()"/>--%>
                    <input type="number" id="inputDeposit" class="alignRight" value="${deposit}" placeholder="보증금" />
                    <label>/</label>
                    <fmt:parseNumber var="monthlyCost" integerOnly="true" value="${room.saleVO.monthlyCost/10000}" />
<%--                    <input type="text" id="inputPrice" class="alignRight" value="${monthlyCost}" placeholder="월세 or 가격" onkeyup="$(this).onlyNum()"/>--%>
                    <input type="number" id="inputPrice" class="alignRight" value="${monthlyCost}" placeholder="월세 or 가격" />
                    <label>만원</label>
                    <input id="rentType" type="hidden" value="${room.saleVO.rentType}"></input>
                </td>
            </tr>
            <tr>
                <td class="tbSubtitle">임대기간</td>
                <td>
<%--                    <input type="text" class="alignRight" value="${room.saleVO.periodNum}" id="inputPeriodNum" onkeyup="$(this).onlyNum()">--%>
                    <input type="number" class="alignRight" value="${room.saleVO.periodNum}" id="inputPeriodNum" >
                    <select id="inputPeriodUnit">
                        <option id="Y" value="Y">년</option>
                        <option id="M" value="M">개월</option>
                        <option id="W" value="W">주</option>
                    </select>
                    <input id="periodUnit" type="hidden" value="${room.saleVO.periodUnit}">
                </td>
            </tr>
        </table>
        <table class="tbDetailInfo">
            <tr>
                <td colspan=4 class="tbtitle">상세 정보</td>
            </tr>
            <tr>
                <td rowspan=2 class="tbSubtitle">관리비</td>
                <td class="tdContent" colspan=3>
                    <button id="btnAF1" value="없음">없음</button>
                    <button id="btnAF2" value="있음">있음</button>
<%--                    <input type="text" class="alignRight" id="inputAdminFee" readonly value="<fmt:formatNumber value="${room.saleVO.manageCost/10000}" maxFractionDigits="0" />" onkeyup="$(this).onlyNum()"/>--%>
                    <input type="number" class="alignRight" id="inputAdminFee" readonly value="<fmt:formatNumber value="${room.saleVO.manageCost/10000}" maxFractionDigits="0" />" />
                    <label>만원</label>
                    <input id="isMangeCost" type="hidden" value="${room.saleVO.manageCost}"></input>
                </td>
            </tr>
            <tr>
                <td colspan=3>
                    <label>&nbsp;&nbsp;관리비 포함 항목 : </label>
                    <button id="btnAFL1" value="가스비" name="aFL">가스</button>
                    <button id="btnAFL2" value="수도세" name="aFL">수도</button>
                    <button id="btnAFL3" value="전기세" name="aFL">전기세</button>
                    <button id="btnAFL4" value="인터넷요금" name="aFL">인터넷</button>
                    <button id="btnAFL5" value="TV수신료" name="aFL">TV</button>
                    <input type="hidden" id="manage" value="${room.manageCost}"/>
                    <input type="hidden" id="manageLen" value="${fn:length(room.manageCost)}"/>
                </td>
            </tr>
            <tr>
                <td class="tbSubtitle">난방 종류</td>
                <td class="tdHalf">
                    <button id="btnHeat1" value="지역난방">지역난방</button>
                    <button id="btnHeat2" value="개별난방">개별난방</button>
                    <button id="btnHeat3" value="중앙난방">중앙난방</button>
                    <input id="heat" type="hidden" value="${room.roomVO.heatType}"/>
                </td>
                <td class="tbSubtitle">반려동물</td>
                <td class="tdHalf">
                    <button id="btnAnimal1" value="반려동물 불가능">불가능</button>
                    <button id="btnAnimal2" value="반려동물 가능">가능</button>
                </td>
            </tr>
            <tr>
                <td class="tbSubtitle">주차장 여부</td>
                <td class="tdHalf">
                    <button id="btnParking1" value="주차 불가능">없음</button>
                    <button id="btnParking2" value="주차 가능">있음</button>
                </td>
                <td class="tbSubtitle">엘리베이터</td>
                <td class="tdHalf">
                    <button id="btnEv1" value="엘리베이터 불가능">없음</button>
                    <button id="btnEv2" value="엘리베이터 가능">있음</button>
                </td>
            </tr>
            <tr>
                <td class="tbSubtitle">옵션 항목</td>
                <td colspan=3>
                    <button class="option" id="btnOption1" value="냉장고">냉장고</button>
                    <button class="option" id="btnOption2" value="에어컨">에어컨</button>
                    <button class="option" id="btnOption3" value="가스레인지">가스레인지</button>
                    <button class="option" id="btnOption4" value="옷장">옷장</button>
                    <button class="option" id="btnOption5" value="전자레인지">전자레인지</button>
                    <button class="option" id="btnOption6" value="TV">TV</button>
                    <button class="option" id="btnOption7" value="신발장">신발장</button>
                    <button class="option" id="btnOption8" value="비데">비데</button>
                    <button class="option" id="btnOption9" value="인덕션">인덕션</button>
                    <button class="option" id="btnOption10" value="전자도어락">전자도어락</button>
                    <button class="option" id="btnOption11" value="책상">책상</button>
                    <button class="option" id="btnOption12" value="현관문 안전장치">현관문 안전장치</button>
                    <button class="option" id="btnOption13" value="세탁기">세탁기</button>
                    <button class="option" id="btnOption14" value="침대">침대</button>
                    <input type="hidden" id="optionLen" value="${fn:length(room.option)}">
                    <input type="hidden" id="option" value="${room.option}">
                </td>
            </tr>
        </table>
        <table class="tbDetail">
            <tr>
                <td colspan=2 class="tbtitle">상세 설명</td>
            </tr>
            <tr>
                <td class="tbSubtitle">제목</td>
                <td class="tdContent">
                    <input type=text id="inputTitle" class="fullTextbox" style="text-align:center" value="${room.saleVO.title}" placeholder="예) 서울대입구역 도보 5분거리에 위치한 좋은 방이에요."/>
                </td>
            </tr>
            <tr>
                <td class="tbSubtitle">상세 설명</td>
                <td>
                    <textarea id="txtDetail" rows="5">${room.saleVO.detailExplain}</textarea>
                </td>
            </tr>
            <tr>
                <td class="tbSubtitle">해시태그</td>
                <td>
                    <span class="tag">#</span><input type="text" class="hash" id="hash1" value="${room.hashtag[0]}"/>
                    <span class="tag">#</span><input type="text" class="hash" id="hash2" value="${room.hashtag[1]}"/>
                    <span class="tag">#</span><input type="text" class="hash" id="hash3" value="${room.hashtag[2]}"/>
                </td>
            </tr>
        </table>
        <table class="tbAddPhoto">
            <tr>
                <td colspan=2 class="tbtitle">사진 등록</td>
            </tr>
            <tr>
                <td id="tdImg">
                    <button class="upload" id="btnImg"><img class="img" src="/resources/img/etc/addimage.png"/></button>
                    <input class="upload" id="upload" type="file" name="uploadFile" multiple="multiple" onchange="readURL(this);" style="display: none;">
                    <input type="hidden" id="uploadVal" value="${room.images}">
                    <c:forEach var="data" items="${room.images}" varStatus="status">
                        <div class="img-wrap" id="img-wrap${status.count}" name=${data} data-id="img-wrap${status.count}">
                            <input type="hidden" id="imgName${status.count}" value="${data}">
                            <span class="close" id="close${status.count}" data-id="close${status.count}">x</span>
                            <img class="addimage" id="rmimg${status.count}" data-id="rmimg${status.count}" src=""/>
                            <input type="hidden" id="roomValue${status.count}" value="${roomId},${data}">
                        </div>
                        <c:if test="${status.last}">
                            <c:set var="roomImgNum" value="${status.count}"/>
                        </c:if>
                    </c:forEach>
                </td>
            </tr>
        </table>
        <div class="lastBtns">
            <button class="lastBtn" id="cancel">취소</button>
            <button class="lastBtn" id="lastBtn">수정</button>
        </div>
    </div>
</div>
<script src="http://dmaps.daum.net/map_js_init/postcode.v2.js"></script>
<script src="//dapi.kakao.com/v2/maps/sdk.js?appkey=3f53634808f210457972e36ebc256ed0&libraries=services"></script>
<script src="/resources/js/updateRoom.js"></script>
<script>
    var roomImgNum = ${roomImgNum};
</script>
</body>
</html>
