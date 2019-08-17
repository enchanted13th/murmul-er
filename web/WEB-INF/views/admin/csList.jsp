<%@ page contentType="text/html;charset=UTF-8" language="java" %>
<%@ taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core" %>
<!DOCTYPE html>
<html>
<head>
    <title>머물-러 FAQ,공지사항</title>
    <meta charset="utf-8">
    <meta name="viewport" content="width=device-width, initial-scale=1">
    <link rel="stylesheet" href="https://maxcdn.bootstrapcdn.com/bootstrap/4.3.1/css/bootstrap.min.css">
    <link rel="stylesheet" href="/resources/css/csList.css">
    <link rel="stylesheet" href="/resources/sweetalert2/sweetalert2.css"/>

    <script src="https://ajax.googleapis.com/ajax/libs/jquery/3.4.1/jquery.min.js"></script>
    <script src="https://cdnjs.cloudflare.com/ajax/libs/popper.js/1.14.7/umd/popper.min.js"></script>
    <script src="https://maxcdn.bootstrapcdn.com/bootstrap/4.3.1/js/bootstrap.min.js"></script>
    <script src="/resources/js/csList.js"></script>
<%--    <script src="/resources/js/jquery-3.4.1.min.js"></script>--%>
    <script src="/resources/sweetalert2/sweetalert2.min.js"></script>
    <script>
        let isadmin = ('${admin}' == 'true' ? true : false);
        if(isadmin === false){
            location.href = "/";
        }
    </script>
</head>
<body>

<div class="container">
    <button class="headTitle" style="display: inline">FAQ</button>
    <button class="headTitle" style="display: inline">공지사항</button>
    <button id="delBtn" class="btn btn-danger btn-icon-split" style="float: right; margin: 10px 0px 0px 10px" onclick="delList()">
                    <span class="icon text-white-50">
                      <i class="fas fa-user-slash"></i>
                    </span>
        <span class="text">FAQ삭제</span>
    </button>
    <a href="/admin" class="btn btn-primary btn-icon-split" style="float: right; margin: 10px 10px 0px 0px;">
                    <span class="icon text-white-50">
                      <i class="fas fa-arrow-left"></i>
                    </span>
        <span class="text">뒤로가기</span>
    </a>
    <br/><br/>
    <table class="table">
        <thead class="thead-dark">
        <tr class="category">
            <th>FAQ 번호</th>
            <th>제목</th>
            <th>수정</th>
            <th>삭제</th>
        </tr>
        </thead>
        <tbody>
            <c:forEach var="faq" items="${faqList}">
                <tr>
                    <td id="id">${faq.id}</td>
                    <td id="question">${faq.title}</td>
                    <td><img class="editBtn selectedItem" src="/resources/img/etc/pencil.png" style="height: 20px; width: 20px;"></td>
                    <td><input type="checkbox" class="selectedItem" value="${faq.id}" name="delete"></td>
                    <input type="hidden" id="answer" value="${faq.content}">
                </tr>
            </c:forEach>
        </tbody>
    </table>
    <table class="table">
        <thead class="thead-light">

        </thead>

    </table>
</div>

</body>
</html>
