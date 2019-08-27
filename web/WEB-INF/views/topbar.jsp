<%@ page language="java" contentType="text/html; charset=UTF-8" pageEncoding="UTF-8" %>
<%@ taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core" %>
<link rel="stylesheet" href="/resources/sweetalert2/sweetalert2.css"/>
<link rel="stylesheet" href="/resources/css/topbar.css"/>
<script src="/resources/js/jquery-3.4.1.min.js"></script>
<script src="/resources/sweetalert2/sweetalert2.min.js"></script>
<script src="/resources/js/topbar.js"></script>
<script src="/resources/js/join.js"></script>
<script src="/resources/js/login.js"></script>
<script>
    let islogin = ('${loginMember.memberId}' == '' ? false : true);
//    console.log(islogin);
</script>


<div class="topbar">
    <ul>
        <c:choose>
            <c:when test="${loginMember == null}">
                <li>
                    <button id="btnJoin" class="text">회원가입</button>
                </li>
                <li>
                    <button id="btnLogin" class="text">로그인</button>
                </li>
            </c:when>
            <c:otherwise>
                <li>
                    <button id="btnMessenger" class="text">메신저</button>
                </li>
                <li>
                    <button id="btnLogout" class="text">로그아웃</button>
                </li>
            </c:otherwise>
        </c:choose>
        <li></li>
        <li>
            <button id="btnMenu"><img src="/resources/img/topbar/menu.png"/></button>
        </li>
        <li>
            <button id="btnSearch"><img src="/resources/img/topbar/search.png"/></button>
        </li>
        <li>
            <button id="btnLogo"><img src="/resources/img/topbar/logo.png"/></button>
        </li>
    </ul>
</div>
