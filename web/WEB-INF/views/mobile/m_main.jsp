<%--
  Created by IntelliJ IDEA.
  User: seokjung
  Date: 21/08/2019
  Time: 8:29 PM
  To change this template use File | Settings | File Templates.
--%>
<%@ page contentType="text/html;charset=UTF-8" language="java" %>
<html>
<head>
    <title>메인 화면</title>
    <link rel="stylesheet" href="/resources/sweetalert2/sweetalert2.css"/>
    <link rel="stylesheet" href="/resources/css/mobile/m_main.css"/>
    <script src="/resources/js/jquery-3.4.1.min.js"></script>
    <script>
        $(document).ready(function() {
            $('#btnSearch').click(function(){
                let keyword = $('#inputSearch').val();
                window.mainView.search(keyword);
            })
        })
    </script>
</head>
<body>
<div class="wrap">
    <div class="div-logo">
        <img class="logo" src="/resources/img/mobile/logo.png" >
    </div>
    <div class="div-search">
        <form onsubmit="return false;">
            <input type="text" id="inputSearch" class="input-search" placeholder="아파트, 지역, 지하철, 학교 검색"/>
            <button id="btnSearch" class="btn-search"><img src="/resources/img/mobile/btn_search.png"></button>
        </form>
    </div>
    <div class="div-content">
    </div>
</div>
</body>
</html>
