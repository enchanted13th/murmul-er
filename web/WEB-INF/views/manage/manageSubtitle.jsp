<%@ page language="java" contentType="text/html; charset=UTF-8" pageEncoding="UTF-8" %>
<%@ taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core" %>
<link rel="stylesheet" href="/resources/css/subtitle_rm.css"/>
<script src="/resources/js/manageSubtitle.js"></script>
<div class="addRoomTitle">
    <c:choose>
        <c:when test="${isUpdateForm == room}">
            <div>방 등록</div>
        </c:when>
        <c:otherwise>
            <div>방 수정</div>
        </c:otherwise>
    </c:choose>
</div>
<div class="addRoomMenu">
    <div>
        <ul>
            <li class="subtitle">
                <button id="btnPutRoom">내 방 등록</button>
            </li>
            <li class="subtitle">
                <button id="btnManageRoom">내 방 관리</button>
            </li>
        </ul>
    </div>
</div>