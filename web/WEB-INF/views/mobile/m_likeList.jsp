<%--
  Created by IntelliJ IDEA.
  User: Lectopia
  Date: 2019-08-21
  Time: 오후 4:46
  To change this template use File | Settings | File Templates.
--%>
<%@ page language="java" contentType="text/html;charset=UTF-8" pageEncoding="UTF-8" %>
<%@ taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core" %>
<%@ taglib prefix="fmt" uri="http://java.sun.com/jsp/jstl/fmt"%>
<%@ taglib prefix="fn" uri="http://java.sun.com/jsp/jstl/functions" %>
<!DOCTYPE html PUBLIC "-//W3C//DTD HTML 4.01 Transitional//EN" "http://www.w3.org/TR/html4/loose.dtd">
<html>
<head>
    <meta http-equiv="Content-Type" content="text/html; charset=UTF-8">
    <title>안드로이드용 관심목록</title>
    <link rel="stylesheet" href="/resources/css/mobile/m_likeList.css"/>
    <script src="/resources/js/jquery-3.4.1.min.js"></script>
    <script src="/resources/js/mobile/m_likeList.js"></script>
</head>
<body>
<div class="wrap">
    <h4 class="headTitle alignCenter">관심목록</h4>
    <div class="content">
        <div>
            <div class="divRecent">총 <span class="recentCnt"><span id="recentCnt"></span>개</span>의 관심 목록이 있습니다.</div>
        </div>
        <div class="divList">
            <c:forEach var="room" items="${roomArray}" varStatus="rm">
                <hr class="simpleLine">
                <div id="item${rm.count}" class="divItem">
                    <div class="leftContent">
                        <div class="divPrice">
                            보증금
                            <span id="deposit${rm.count}">
                                <c:set var="deposit" value="${room.deposit/10000}"/>
                                <c:choose>
                                    <c:when test="${deposit == 0}">
                                        없음
                                    </c:when>
                                    <c:when test="${deposit > 9999}">
                                        ${fn:replace(deposit/10000-deposit/10000%1, '.0', '')}억 ${fn:replace(deposit%10000, '.0', '')}만
                                    </c:when>
                                    <c:otherwise>
                                        ${fn:replace(deposit, '.0', '')}만
                                    </c:otherwise>
                                </c:choose>
                            </span>
                            / 월세
                            <span id="monthlyCost${rm.count}">
                                <c:choose>
                                    <c:when test="${room.monthlyCost == 0}">
                                        없음
                                    </c:when>
                                    <c:when test="${room.monthlyCost != 0}">
                                        <fmt:formatNumber value="${room.monthlyCost/10000}" maxFractionDigits="0" />만원
                                    </c:when>
                                </c:choose>
                            </span>
                        </div>
                        <div>
                            <div class="divLocation">${room.sido} ${room.sigungu} ${room.roadName}</div>
                        </div>
                        <div class="divType">
                             ${room.roomType} | ${room.rentType} | ${room.periodNum}
                            <c:choose>
                                <c:when test="${fn:contains(room.periodUnit, 'Y')}">
                                    년 가능
                                </c:when>
                                <c:when test="${fn:contains(room.periodUnit, 'M')}">
                                    개월 가능
                                </c:when>
                                <c:when test="${fn:contains(room.periodUnit, 'W')}">
                                    주 가능
                                </c:when>
                            </c:choose>
                        </div>
                        <div class="divhashtag">
                            <c:if test="${room.hashtags != '[]'}">
                            <c:forEach var="hash" items="${room.hashtags}">
                                <span class="hashTag">#${hash}</span>
                            </c:forEach>
                            </c:if>
                        </div>
                    </div>
                    <div class="rightContent">
                        <ul class="slider">
                            <c:forEach var="data" items="${room.roomImg}" varStatus="status">
                                <li>
                                    <img class="roomImage" id="preview${status.index}" width="100px" height="100px" src=""/>
                                    <input type="hidden" id="roomValue${status.index}" value="${room.roomId},${data}">
                                    <c:set var="roomId" value="${room.roomId}"/>
                                </li>
                                <c:if test="${status.last}">
                                    <c:set var="roomImgNum" value="${status.count}"/>
                                </c:if>
                            </c:forEach>
                        </ul>
                        <img id="like${rm.count}" class="imgHeart" onclick="clickLike(${rm.count}, ${room.roomId})" src="/resources/img/etc/heartClick.png"
                             width="25px" height="25px"/>
                    </div>
                </div>
            </c:forEach>
            <hr class="simpleLine">
        </div>
    </div>
</div>
<script>
    let roomImgNum = "${roomImgNum}";
    let roomId = "${roomId}";
</script>
<script src="https://cdn.jsdelivr.net/bxslider/4.2.12/jquery.bxslider.min.js"></script>
</body>
</html>

