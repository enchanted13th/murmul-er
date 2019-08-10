<%@ page language="java" contentType="text/html; charset=UTF-8" pageEncoding="UTF-8" %>
<%@ taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core" %>
<!DOCTYPE html PUBLIC "-//W3C//DTD HTML 4.01 Transitional//EN" "http://www.w3.org/TR/html4/loose.dtd">
<html>
<head>
    <meta http-equiv="Content-Type" content="text/html; charset=UTF-8"/>
    <title>머물-톡</title>
    <link rel="stylesheet" href="css/talk.css"/>
    <script src="js/jquery-3.4.1.min.js"></script>
    <script src="js/talk.js"></script>
</head>
<body>
<div>
    <div class="divWrap">
        <div class="divTop">
            <button id="btnBack" class="btnBack"><img src="img/talk/back.png"/></button>
            <label id="nickName" class="nickName">멈물</label>
            <button id="btnClose" class="btnClose"><img src="img/talk/exit.png"/></button>
        </div>
        <div class="divMid" id="divMid">
            <div id="divDiagContent" class="divDiagContent">
                <div><label id="date" class="date">2019-07-08</label></div>
            </div>

            <div id="divDiagContent">
                <table id="tvDiagContent" class="tvDiagContent">

                    <tr class="me" valign="top">
                        <td colspan="2" align="right">
                            <div class="message"><span id="time" class="time">18:37</span>
                                <div id="myDialog" class="myDialog">안녕하세요!!</div>
                            </div>
                            <div class="message"><span id="time" class="time">18:38</span>
                                <div id="myDialog" class="myDialog">혹시 바로 다음주부터 바로 짐 빼주실 수 있으신가요??</div>
                            </div>
                        </td>
                        <td></td>
                    </tr>

                    <tr class="you" valign="top">
                        <td><img src="img/talk/profile.png"/></td>
                        <td>
                            <div class="message">
                                <div id="dialog" class="dialog">
                                    <div>네 안녕하세요</div>
                                </div>
                                <span id="time" class="time">18:40</span></div>
                            <div class="message">
                                <div id="dialog" class="dialog">
                                    <div>짐은 이미 빼놓은 상태라 바로 들어오실 수 있으세요~</div>
                                </div>
                                <span id="time" class="time">18:40</span></div>
                            <div class="message">
                                <div id="dialog" class="dialog">
                                    <div>방 거래하실건가요??</div>
                                </div>
                                <span id="time" class="time">18:41</span></div>
                        </td>
                    </tr>

                    <tr class="me" valign="top">
                        <td colspan="2" align="right">
                            <div class="message"><span id="time" class="time">18:45</span>
                                <div id="myDialog" class="myDialog">좀 더 고민해보고 연락드릴게요!</div>
                            </div>
                        </td>
                        <td></td>
                    </tr>

                    <tr class="you" valign="top">
                        <td><img src="img/talk/profile.png"/></td>
                        <td>
                            <div class="message">
                                <div id="dialog" class="dialog">네 알겠습니다</div>
                                <span id="time" class="time">18:47</span></div>
                        </td>
                    </tr>

                </table>
            </div>

        </div>

        <div class="divBottom">
            <form onsubmit="return false">
                <button type="button" id="btnOption" class="btnOption"><img id="imgOption" src="img/talk/option.png"/>
                </button>
                <input autocomplete="off" type="text" id="textInputDialog"/>
                <input type="image" id="btnSubmit" class="btnSubmit" src="img/talk/submit.png"/>
            </form>
        </div>

        <div class="divOption" id="divOption" style="display:none;">
            <button id="btnPhoto"><img src="img/talk/photo.png"/></button>
            <button id="btnContract"><img src="img/talk/contract.png"/></button>
        </div>
    </div>
</div>
</body>
</html>