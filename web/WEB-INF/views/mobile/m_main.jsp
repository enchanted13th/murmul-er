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
    <script src="/resources/js/jquery-3.4.1.min.js"></script>
    <style>
        body {
            margin: 0;
            padding: 0;
        }
        div.wrap {
            width: 100%;
        }
        .wrap > div {
            text-align: center;
        }
        .wrap > .div-logo {
            padding-top: 40%;
        }
        .wrap > .div-logo > .logo {
            width : 50%;
        }
        .wrap > .div-search {
            position: relative;
            padding: 30px 10px;
        }
        .wrap > .div-search  .input-search {
            padding: 10px 10px;
            width: 100%;
            border-radius: 7px;
            border: 2px solid #b6e3f9;
            font-size: 15px;
        }
        .wrap > .div-search  .input-search:focus {
            outline: 0;
        }
        .wrap > .div-search  .btn-search {
            position: absolute;
            background-color: inherit;
            outline: 0;
            border: 0;
            margin: 0;
            padding: 0;
            cursor: pointer;
            top: calc(30px + 2%);
            right: 20px;
        }
        .wrap > .div-search  .btn-search > img {
            width: 35px;
        }
        .wrap > .div-search  .btn-search > img:hover {
            content: url("/resources/img/mobile/btn_search_hover.png");
        }
    </style>
    <script>
        $(document).ready(function() {
            $('.btn-search').click(function(){
                alert('click');
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
            <input type="text" class="input-search" placeholder="아파트, 지역, 지하철, 학교 검색"/>
            <button class="btn-search"><img src="/resources/img/mobile/btn_search.png"></button>
        </form>
    </div>
    <div class="div-content">
    </div>
</div>
</body>
</html>
