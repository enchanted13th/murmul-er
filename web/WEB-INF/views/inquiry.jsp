<%@ page language="java" contentType="text/html; charset=UTF-8" pageEncoding="UTF-8" %>
<%@ taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core" %>
<c:set var="contextPath" value="${pageContext.request.contextPath}"/>
<!DOCTYPE html PUBLIC "-//W3C//DTD HTML 4.01 Transitional//EN" "http://www.w3.org/TR/html4/loose.dtd">
<html>
<head>
    <meta http-equiv="Content-Type" content="text/html; charset=UTF-8">
    <title>1:1 문의</title>
    <link rel="stylesheet" href="/resources/css/inquiry.css"/>
</head>
<body>
<jsp:include page="topbar.jsp"/>
<div class="wrap">

    <jsp:include page="csSubtitle.jsp"/>

    <div class="inquiryForm">
        <div class="top-explain">
            * 답변 받을 이메일을 적고, 문의 내용을 작성해주세요.
        </div>
        <form name="inquiryForm" onsubmit="return false;">
            <div class="emailForm">
                <span class="email">이메일</span>
                <input class="inputBox" id="inputEmail" type="text" required autocomplete="off" maxlength="20"/>
                <span class="domain">@</span>
                <input class="inputBox" id="inputDomain" type="text" required autocomplete="off" maxlength="21"/>
            </div>
            <div class="contentForm">
                <div class="content">문의내용</div>
                <textarea id="inputContent" required></textarea>
            </div>
            <div class="bottom">
                <input class="agree" id="agree" type="checkbox" required/>
                <span class="info">개인정보 수집 및 이용에 대해 동의합니다.</span>
                <button class="check" type="button">약관확인</button>
                <button class="submit">문의하기</button>
            </div>
        </form>
    </div>
</div>
<script src="/resources/js/inquiry.js"></script>
</body>
</html>