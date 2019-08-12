<%@ page language="java" contentType="text/html; charset=UTF-8" pageEncoding="UTF-8" %>
<%@ taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core" %>
<!DOCTYPE html PUBLIC "-//W3C//DTD HTML 4.01 Transitional//EN" "http://www.w3.org/TR/html4/loose.dtd">
<html>
<head>
    <meta http-equiv="Content-Type" content="text/html; charset=UTF-8"/>
    <title>머물-톡</title>
    <link rel="stylesheet" href="/resources/css/talk.css"/>
    <script src="/resources/js/jquery-3.4.1.min.js"></script>
    <script src="/resources/js/talk.js"></script>
</head>
<body>
<div>
    <div id="talkPopup" class="menuPopup">
        <div class="divWrap">
            <div class="divTop">
                <button id="btnBack" class="btnBack"><img src="/resources/img/talk/back.png"/></button>
                <label id="nickName" class="nickName">Echinacea Argentum</label>
                <button id="btnClose" class="btnClose"><img src="/resources/img/talk/exit.png"/></button>
            </div>
            <div class="divMid" id="divMid">
                <div id="divDiagContent" class="divDiagContent">
                    <div><label id="today" class="date"></label></div>
                </div>
                <div id="divDiagContent">
                    <table id="tvDiagContent" class="tvDiagContent">
                        <tr class="you" valign="top"></tr>
                    </table>
                </div>
            </div>
            <div class="divBottom">
                <form name="sendForm" onsubmit="return false">
                    <button type="button" id="btnOption" class="btnOption"><img id="imgOption" src="/resources/img/talk/option.png"/>
                    </button>
                    <input autocomplete="off" name="inputbox" type="text" id="textInputDialog"/>
                    <input type="image" id="btnSubmit" class="btnSubmit" src="/resources/img/talk/submit.png"/>
                </form>
            </div>
            <div class="divOption" id="divOption" style="display:none;">
                <button id="btnPhoto"><img src="/resources/img/talk/photo.png"/></button>
                <button id="btnContract"><img src="/resources/img/talk/contract.png"/></button>
            </div>
        </div>
    </div>
</div>
</body>
</html>