<%--
  Created by IntelliJ IDEA.
  User: seokjung
  Date: 15/08/2019
  Time: 7:42 PM
  To change this template use File | Settings | File Templates.
--%>
<%@ page language="java" contentType="text/html; charset=UTF-8" pageEncoding="UTF-8" %>
<%@ taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core" %>
<%@ taglib prefix="fn" uri="http://java.sun.com/jsp/jstl/functions" %>
<html>
<head>
    <title>계약할 방 선택하기</title>
    <link rel="stylesheet" href="/resources/css/contractSelectRoom.css"/>
    <link rel="stylesheet" href="/resources/sweetalert2/sweetalert2.css"/>
    <script>
        var jeonchaId = ${jeonchaId};
    </script>
</head>
<body>
<div class="roomBtns">
    <c:forEach var="room" items="${myRoom}">
        <div class="roomBtn">
            <button class="selectRoom" value="${room.roomId}">${room.roadname}/${room.title} - ${room.deposit}/${room.monthlyCost}</button>
        </div>
    </c:forEach>
    <div>
        <button class="cancel" id="cancel">취소</button>
    </div>
</div>
<script src="/resources/js/jquery-3.4.1.min.js"></script>
<script src="/resources/sweetalert2/sweetalert2.min.js"></script>
<script src="/resources/js/contractSelectRoom.js"></script>
</body>
</html>
