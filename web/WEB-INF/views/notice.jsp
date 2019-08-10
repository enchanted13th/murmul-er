<%@ page language="java" contentType="text/html; charset=UTF-8" pageEncoding="UTF-8"%>
<%@ taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core" %>
<c:set var="contextPath" value="${pageContext.request.contextPath}" />
<!DOCTYPE html PUBLIC "-//W3C//DTD HTML 4.01 Transitional//EN" "http://www.w3.org/TR/html4/loose.dtd">
<html>
<head>
	<meta http-equiv="Content-Type" content="text/html; charset=UTF-8">
	<title>공지사항</title>
	<link rel="stylesheet" href="/resources/css/notice.css" />
	<script>
		var curpage = ${curpage};
		var flag = "cur";
		var startpage = ${startpage};
		var total = ${total};
	</script>
</head>
<body>
	<jsp:include page="topbar.jsp"/>
	<div class="wrap">
		<jsp:include page="csSubtitle.jsp"/>

    	<div class="content">
    		<c:forEach var="notice" items="${noticeList}">
    			<div class="notice" id="${notice.id}">
       				<div class="noticeTitle">${notice.title}</div>
        			<div class="noticeDate">${notice.writeDate}</div>
      			</div>
    		</c:forEach>
    	</div>
    	
	    <div class="pageBtns">
			<div>
				<button >&lt;&lt;</button>
				<button >&lt;</button>
				<c:set var="doneLoop" value="false"/>
				<c:forEach var="i" begin="${startpage}" end="${total}" varStatus="status">
					<c:if test="${not doneLoop}">
						<c:if test="${status.count == 5}">
							<c:set var="doneLoop" value="true"/>
						</c:if>
						<button class="pagenum"></button>
					</c:if>
				</c:forEach>
				<button >&gt;</button>
				<button >&gt;&gt;</button>
			</div>
		</div>
	</div>
	<script src="/resources/js/notice.js"></script>
</body>
</html>
