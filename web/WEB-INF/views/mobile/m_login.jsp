<%--
  Created by IntelliJ IDEA.
  User: Lectopia
  Date: 2019-08-21
  Time: 오전 10:46
  To change this template use File | Settings | File Templates.
--%>
<%@ page contentType="text/html;charset=UTF-8" language="java" %>
<html>
<head>
    <title>안드로이드 로그인 화면</title>
    <link rel="stylesheet" href="/resources/css/mobile/m_login.css">
    <link rel="stylesheet" href="/resources/sweetalert2/sweetalert2.css"/>

    <script src="/resources/js/jquery-3.4.1.min.js"></script>
    <script src="/resources/js/mobile/m_login.js"></script>
    <script src="/resources/sweetalert2/sweetalert2.min.js"></script>
</head>
<body>
    <form method="post" onsubmit="return false;">
        <div class="wrapLogin">
            <div class="background">
<%--                <img src="/resources/img/mobile/background.png">--%>
            </div>
            <div class="divlogo">
                <img src="/resources/img/mobile/logo_white.png" class="logo">
            </div>
            <div class="divinput">
                <input type="text" id="inputId" class="input id" placeholder="아이디를 입력하세요." autocomplete="off" required>
                <input type="password" id="inputPwd" class="input pwd" placeholder="비밀번호를 입력하세요." autocomplete="off" required>
            </div>
            <div class="divloginBtn">
                <button class="loginBtn">로그인</button>
            </div>
        </div>
    </form>
</body>
</html>
