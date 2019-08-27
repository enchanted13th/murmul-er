<%@ page language="java" contentType="text/html; charset=UTF-8" pageEncoding="UTF-8" %>
<!DOCTYPE html PUBLIC "-//W3C//DTD HTML 4.01 Transitional//EN" "http://www.w3.org/TR/html4/loose.dtd">
<html>
<head>
    <meta http-equiv="Content-Type" content="text/html; charset=UTF-8">
    <title>비밀번호 변경</title>
    <link rel="stylesheet" href="/resources/css/change_password.css"/>

</head>
<body>
<jsp:include page="topbar.jsp"/>

<div class="wrap">
    <jsp:include page="mypageSubtitle.jsp"/>
    <div class="content">
        <form name="updateForm" method="POST" onsubmit="return false;">
            <table class="tbPassword">
                <tr>
                    <td>현재 비밀번호</td>
                    <td><input type="password" id="curpwd" name="curpwd" class="inputpwd" required
                               placeholder="현재 비밀번호를 입력하세요."/></td>
                </tr>
                <tr>
                    <td>변경 비밀번호</td>
                    <td><input type="password" id="newpwd1" name="newpwd1" class="inputpwd" required
                               placeholder="변경할 비밀번호를 입력하세요."/></td>
                </tr>
                <tr>
                    <td>비밀번호 확인</td>
                    <td><input type="password" id="newpwd2" name="newpwd2" class="inputpwd" required
                               placeholder="변경할 비밀번호를 한번 더 입력하세요."/></td>
                </tr>
            </table>
            <div class="divbtn">
                <button id="btnUpdate" class="btnUpdate">변경</button>
            </div>
        </form>
    </div>
</div>
<script src="/resources/js/change_password.js"></script>
</body>
</html>