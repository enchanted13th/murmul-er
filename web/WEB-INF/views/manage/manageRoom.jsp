<%@ page language="java" contentType="text/html; charset=UTF-8" pageEncoding="UTF-8" %>
<%@ taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core" %>
<c:set var="contextPath" value="${pageContext.request.contextPath}"/>
<!DOCTYPE html PUBLIC "-//W3C//DTD HTML 4.01 Transitional//EN" "http://www.w3.org/TR/html4/loose.dtd">
<html>
<head>
    <meta http-equiv="Content-Type" content="text/html; charset=UTF-8">
    <title>내 방 관리</title>

    <link rel="stylesheet" href="/resources/css/manageRoom.css"/>

</head>
<body>
<jsp:include page="../topbar.jsp"/>
<div class="wrap">
    <jsp:include page="manageSubtitle.jsp"/>

    <c:forEach var="data" items="${myRooms}" varStatus="status">
        <table class="tbList" id="tblist${status.index}">
            <tbody>
            <tr>
                <td class="tableTitle">게시상태</td>
                <td class="tdroomImg" id="tdroomImg" rowspan="7">
<%--                    ============================= 작업중 =============================--%>
                        <c:set var="middlePath" value="\\room\\roomId_${data.roomId}"/>
                        <img class="uploadImg" width=200 height=200 src="" id="preview${status.index}">
                        <input type="hidden" id="uploadValue${status.index}" value="${middlePath},${data.roomImg}">
<%--                    ============================= 작업중 =============================--%>
                <td class="tableTitle">등록일</td>
                <td class="val" id="tdDateVal">${data.writeDate}</td>
            </tr>
            <tr>
                <td class="tdroomState" id="tdroomState${status.index}" rowspan="6">${data.postType}</td>
                <td class="tableTitle">조회수</td>
                <td class="val" id="tdViewVal">${data.views}</td>
            </tr>
            <tr>
                <td class="tableTitle">제목</td>
                <td class="val" id="tdTitleVal">${data.title}</td>
            </tr>
            <tr>
                <td class="tableTitle">주소</td>
                <td class="val" id="tdAddrVal">${data.sido} ${data.sigungu} ${data.roadname}</td>
            </tr>
            <tr>
                <td class="tableTitle">가격</td>
                <td class="val" id="tdPriceVal">
                    보증금<c:choose>
                    <c:when test="${data.deposit==0}">
                        없음
                    </c:when>
                    <c:otherwise>
                        <b>${data.deposit}</b>만 원
                    </c:otherwise>
                </c:choose>
                    / 월세<c:choose>
                    <c:when test="${data.monthlyCost==0}">
                        없음
                    </c:when>
                    <c:otherwise>
                        <b>${data.monthlyCost}</b>만 원
                    </c:otherwise>
                </c:choose>
                    / 관리비<c:choose>
                    <c:when test="${data.manageCost==0}">
                        없음
                    </c:when>
                    <c:otherwise>
                        <b>${data.manageCost}</b>만 원
                    </c:otherwise>
                </c:choose>
                </td>
            </tr>
            <tr>
                <td class="tableTitle">임대기간</td>
                <td class="val" id="tdPriodVal"><b>${data.periodNum}</b> ${data.periodUnit}</td>
            </tr>
            <tr>
                <td id="tdbtns${status.index}" class="tdbtns" colspan="2">
                    <button class="button btnModify" value="${data.roomId}">수정</button>
                    <button class="button btnDelete" value="${data.roomId}">삭제</button>
                    <button class="button btnPt btnPost" value="${data.roomId}">게시종료</button>
                    <button class="button btnPt btnDeal" value="${data.roomId}">거래완료</button>
                </td>
            </tr>
            </tbody>
        </table>
    </c:forEach>
</div>
<script src="/resources/js/manageRoom.js"></script>
</body>
</html>