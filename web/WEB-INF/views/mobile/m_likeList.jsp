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
    <script src="https://cdn.jsdelivr.net/bxslider/4.2.12/jquery.bxslider.min.js"></script>
    <script src="/resources/js/mobile/m_likeList.js"></script>
</head>
<body>
<div class="wrap">
    <h4 class="headTitle alignCenter">관심목록</h4>
    <div class="content">
        <div>
            <div class="divRecent">총 <span class="likeCnt"><span id="likeCnt"></span>개</span>의 관심 목록이 있습니다.</div>
        </div>
        <div class="divList">
            <c:forEach var="room" items="${roomArray}" varStatus="rm">
                <hr id="line${rm.count}" class="simpleLine">
                <div id="item${rm.count}" class="divItem">
                    <a class="linkToDetail" href="/mobile/searchRoom/${room.roomId}">
                    <div class="leftContent">
                        <div class="divPrice">
                            보증금
                            <span id="deposit${rm.count}">${room.deposit}</span>
                            <c:if test="${room.rentType!='전세'}">
                            / 월세
                            <span id="monthlyCost${rm.count}">${room.monthlyCost}</span>
                            </c:if>
                        </div>
                        <div>
                            <div class="divLocation">${room.sido} ${room.sigungu} ${room.roadName}</div>
                        </div>
                        <div class="divType">
                             ${room.roomType} | ${room.rentType} | ${room.periodNum}${room.periodUnit} 가능
                        </div>
                        <div class="divhashtag">
                            <c:if test="${room.hashtags != '[]'}">
                            <c:forEach var="hash" items="${room.hashtags}" varStatus="hashCnt">
                                <span id="hashtag${rm.count}-${hashCnt.count}" class="hashTag">#${hash}</span>
                            </c:forEach>
                            </c:if>
                            <input type="hidden" id="hashtagCnt${rm.count}" value="${fn:length(room.hashtags)}">
                        </div>
                    </div>
                    </a>
                    <div class="rightContent">
                        <input type="hidden" id="totCntImg${rm.count}" value="${fn:length(room.roomImg)}">
                        <input type="hidden" id="roomId${rm.count}" value="${room.roomId}">
                        <input type="hidden" id="roomImg${rm.count}" value="${room.roomImg}">
                        <ul class="slider" id="slider${rm.count}">
                            <c:forEach var="data" items="${room.roomImg}" varStatus="status">
                                <li>
                                    <img class="roomImage" id="preview${room.roomId}-${status.index}" width="120px" height="120px" src=""/>
                                    <input type="hidden" id="roomValue${room.roomId}-${status.index}" value="${data}">
                                    <c:set var="roomId" value="${room.roomId}"/>
                                </li>
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
</script>
</body>
</html>

