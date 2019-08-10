<%@ page language="java" contentType="text/html; charset=UTF-8" pageEncoding="UTF-8" %>
<%@ taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core" %>
<!DOCTYPE html PUBLIC "-//W3C//DTD HTML 4.01 Transitional//EN" "http://www.w3.org/TR/html4/loose.dtd">
<html>
<head>
    <meta http-equiv="Content-Type" content="text/html; charset=UTF-8">
    <title>관심있는 방 목록</title>
    <link rel="stylesheet" href="/resources/css/mylist.css"/>
</head>
<body>
<jsp:include page="topbar.jsp"/>

<div class="wrap">
    <jsp:include page="mypageSubtitle.jsp"/>
    <div class="content">
        <div>
            <div class="divRecent">총 <span class="recentCnt"><span id="recentCnt"></span>개</span>의 관심 목록이 있습니다.</div>
            <div class="divNotify">관심 목록은 최대 18개까지 저장됩니다.</div>
        </div>

        <div class="divList">
            <c:forEach var="room" items="${roomArray}" varStatus="rm">
                <div id="item${rm.count}" class="divItem">
                    <a href="/searchRoom/${room.roomId}"><img src="/resources/${room.roomImg}" width="250px" height="250px"/></a>
                    <img id="like${rm.count}" class="imgHeart" onclick="clickLike(${rm.count}, ${room.roomId})" src="/resources/img/etc/heart2.png"
                         width="25px" height="25px"/>
                    <div class="divTitle" id="title${rm.count}">${room.title}</div>
                    <div class="divFloat">
                        <div class="divLocation">${room.sido} ${room.sigungu} ${room.roadname}</div>
                        <div class="divPrice">${room.rentType} 보증금 <span id="deposit${rm.count}">${room.deposit}</span>/월세
                            <span id="monthlyCost${rm.count}">${room.monthlyCost}</span></div>
                    </div>
                    <div class="divSummary">${room.roomType}, ${room.area}m^2, 관리비 <span
                            id="manageCost${rm.count}">${room.manageCost}</span><br/>
                    </div>
                </div>
            </c:forEach>
        </div>
    </div>
</div>
<script src="/resources/js/likeList.js"></script>
</body>
</html>