<%@ page language="java" contentType="text/html; charset=UTF-8" pageEncoding="UTF-8" %>
<!DOCTYPE html PUBLIC "-//W3C//DTD HTML 4.01 Transitional//EN" "http://www.w3.org/TR/html4/loose.dtd">
<html>
<head>
    <meta http-equiv="Content-Type" content="text/html; charset=UTF-8">
    <title>개인 정보 관리</title>
    <link rel="stylesheet" href="/resources/css/personal_info.css"/>
</head>
<body>
<jsp:include page="topbar.jsp"/>

<div class="wrap">
    <jsp:include page="mypageSubtitle.jsp"/>
    <div class="content">
        <form name="updateForm" method="post" onsubmit="return false;">
            <table class="tbInfo">
                <tr>
                    <td>아이디</td>
                    <td><input id="inputId" class="inputBox" name="id" value="${id}" readonly/></td>
                </tr>
                <tr>
                    <td>이름</td>
                    <td><input id="inputName" class="inputBox" name="realname" value="${realname}"/></td>
                </tr>
                <tr>
                    <td>닉네임</td>
                    <td><input id="inputNickName" class="inputBox" name="nickname" value="${nickname}" placeholder="닉네임을 입력하세요" autocomplete="off" required/></td>
                </tr>
                <tr>
                    <td>이메일</td>
                    <td>
                        <input id="inputEmail" class="inputboxS" name="emailId" value="${emailId}" placeholder="이메일을 입력하세요" autocomplete="off" required/>
                        <span id="at" class="at">@</span>
                        <select id="domain" name="domain" class="domain" onchange="$.guitar()">
                            <option value="naver.com">naver.com</option>
                            <option value="hanmail.net">hanmail.net</option>
                            <option value="gmail.com">gmail.com</option>
                            <option value="nate.com">nate.com</option>
                            <option value="icloud.com">icloud.com</option>
                            <option value="empas.com">empas.com</option>
                            <option value="기타">기타</option>
                        </select>
                    </td>
                </tr>
                <tr>
                    <td>휴대번호</td>
                    <td>
                        <select class="frontNum" id="frontNum" name="fronNum">
                            <option value="010">010</option>
                            <option value="011">011</option>
                            <option value="016">016</option>
                            <option value="017">017</option>
                            <option value="018">018</option>
                            <option value="019">019</option>
                        </select>
                        <span>-</span>
                        <input id="middleNum" class="inputNum" name="phone2" maxlength="4" value="${phone2}"/>
                        <span>-</span>
                        <input id="backNum" class="inputNum" name="phone3" maxlength="4" value="${phone3}"/>
                    </td>
                </tr>
                <tr>
                    <td>비밀번호</td>
                    <td><input type="password" id="inputPwd" class="inputBox" name="pwd" placeholder="비밀번호를 입력하세요." autocomplete="off" required/></td>
                </tr>
            </table>
            <div class="divbtns">
                <button class="btnUpdate" id="btnUpdate" onclick="$.infoUpdate()">변경</button>
            </div>
        </form>
    </div>
</div>
<script src="/resources/js/personal_info.js"></script>
<script>
    var domain = '${domain}';
    var phone1 = '${phone1}';
</script>
</body>
</html>