<%@ page language="java" contentType="text/html; charset=UTF-8" pageEncoding="UTF-8" %>
<%@ taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core" %>
<c:set var="contextPath" value="${pageContext.request.contextPath}"/>
<!DOCTYPE html PUBLIC "-//W3C//DTD HTML 4.01 Transitional//EN" "http://www.w3.org/TR/html4/loose.dtd">
<html>
<head>
    <meta http-equiv="Content-Type" content="text/html; charset=UTF-8">
    <title>공지사항 | ${noticeVO.title}</title>
    <link rel="stylesheet" href="/resources/css/noticeView.css"/>
    <script>
        let content = "${noticeVO.content}";
    </script>
</head>
<body>
<jsp:include page="topbar.jsp"/>
<div class="wrap">

    <jsp:include page="csSubtitle.jsp"/>

    <div class="content">
        <div class="nvTitle">
            <div class="noticeTitle">${noticeVO.title}</div>
            <div class="noticeDate">${noticeVO.writeDate}</div>
        </div>
        <div class="nvContent">
            <div>${noticeVO.content}</div>
        </div>
    </div>
    <div class="botBtns">
        <div>
            <button id="back">목록보기</button>
        </div>
    </div>
</div>
<script src="/resources/js/noticeView.js"></script>
</body>
</html>