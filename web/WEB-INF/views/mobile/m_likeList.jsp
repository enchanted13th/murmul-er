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
<%--<jsp:include page="topbar.jsp"/>--%>

<div class="wrap">
   <%-- <jsp:include page="/WEB-INF/views/mypageSubtitle.jsp"/>--%>
    <h4 class="headTitle alignCenter">관심목록</h4>
<%--       <h6 class="subTitle alignCenter">관심있는방</h6>--%>
    <div class="content">
        <div>
            <div class="divRecent">총 <span class="recentCnt"><span id="recentCnt"></span>개</span>의 관심 목록이 있습니다.</div>
        </div>
        <div class="divList">
            <c:forEach var="room" items="${roomArray}" varStatus="rm">
                <hr class="simpleLine">
                <div id="item${rm.count}" class="divItem">
                    <div class="leftContent">
                        <div class="divPrice">보증금 <span id="deposit${rm.count}">${room.deposit}</span> / 월세
                            <span id="monthlyCost${rm.count}"></span>
                        </div>
                        <div>
                            <div class="divLocation">${room.sido} ${room.sigungu} ${room.roadname}</div>
                        </div>
                        <div class="divType">
                             ${room.roomType} | ${room.rentType} | ${room.periodNum}
                            <c:choose>
                                <c:when test="${room.periodUnit eq 'Y'}">
                                    년 가능
                                </c:when>
                                <c:when test="${room.periodUnit eq 'M'}">
                                    개월 가능
                                </c:when>
                                <c:when test="${room.periodUnit eq 'W'}">
                                    주 가능
                                </c:when>
                            </c:choose>
                        </div>
                    </div>
                    <div class="rightContent">
                        <a href="/mobile/searchRoom/${room.roomId}"><img class="roomImage" src="/manage/download?middlePath=/room/roomId_${room.roomId}&imageFileName=${room.roomImg}" width="250px" height="250px"/></a>
                        <img id="like${rm.count}" class="imgHeart" onclick="clickLike(${rm.count}, ${room.roomId})" src="/resources/img/etc/heartClick.png"
                             width="25px" height="25px"/>
                    </div>
                </div>
            </c:forEach>
            <hr class="simpleLine">
        </div>
    </div>
</div>
</body>
</html>

