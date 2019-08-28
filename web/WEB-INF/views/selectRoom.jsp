<%--
  Created by IntelliJ IDEA.
  User: seokjung
  Date: 16/08/2019
  Time: 4:20 PM
  To change this template use File | Settings | File Templates.
--%>
<%@ page contentType="text/html;charset=UTF-8" language="java" %>
<%@ taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core" %>
<link rel="stylesheet" href="/resources/css/selectRoom.css"/>
<link rel="stylesheet" href="/resources/sweetalert2/sweetalert2.css"/>
<script src="/resources/js/jquery-3.4.1.min.js"></script>
<script src="/resources/sweetalert2/sweetalert2.min.js"></script>
<script src="/resources/js/selectRoom.js"></script>
<script>
    var contactId = ${contactId};
</script>
<div class="roomBtns">
    <div>
        <span class="guide">계약서는 임대인,전대인만 작성할 수 있습니다.</span>
    </div>
    <c:forEach var="room" items="${myRoom}">
        <div class="roomBtn">
            <button class="selectRoom" value="${room.roomId}">${room.roadname}/${room.title} - ${room.deposit}/${room.monthlyCost}</button>
        </div>
    </c:forEach>
    <div>
        <button class="cancel" id="cancel">취소</button>
    </div>
</div>