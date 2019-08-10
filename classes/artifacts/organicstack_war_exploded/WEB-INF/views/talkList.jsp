<%@ page language="java" contentType="text/html; charset=UTF-8" pageEncoding="UTF-8" %>
<%@ taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core" %>
<!DOCTYPE html PUBLIC "-//W3C//DTD HTML 4.01 Transitional//EN" "http://www.w3.org/TR/html4/loose.dtd">
<html>
<head>
    <meta http-equiv="Content-Type" content="text/html; charset=UTF-8"/>
    <title>머물-톡</title>
    <link rel="stylesheet" href="css/talkList.css"/>
    <script src="js/jquery-3.4.1.min.js"></script>
    <%--<script src="js/talkList.js"></script>--%>
</head>
<body>
<div>
    <div class="divWrap">
        <div class="divTop">
            <label class="lbTitle">Murmul Talk</label>
            <button id="btnClose" class="btnClose"><img src="img/exit.png"/></button>
        </div>
        <div class="divMid">
            <table id="tbRoom">
                <tr>
                    <td rowspan="3" id="profileImg" class="profile" onclick="chat"><img src="img/profile.png"/></td>
                    <th id="nickName" class="nickName" onclick="chat">lecto</th>
                    <td>
                        <button id="btnMore"><img src="img/add.png"/></button>
                    </td>
                </tr>
                <tr onclick="chat">
                    <td colspan="2" id="dialog" class="dialog">안녕하세요 혹시 3주정도 계약 가능할까요?</td>
                </tr>
                <tr onclick="chat">
                    <td colspan="2" id="date" class="date">2019-07-11 18:50</td>
                </tr>
            </table>
        </div>
        <div class="divMid">
            <table id="tbRoom">
                <tr>
                    <td rowspan="3" id="profileImg" class="profile" onclick="chat"><img src="img/profile.png"/></td>
                    <th id="nickName" class="nickName" onclick="chat">깐따삐</th>
                    <td>
                        <button id="btnMore"><img src="img/add.png"/></button>
                    </td>
                </tr>
                <tr onclick="chat">
                    <td colspan="2" id="dialog" class="dialog">알겠습니다~</td>
                </tr>
                <tr onclick="chat">
                    <td colspan="2" id="date" class="date">2019-07-11 18:37</td>
                </tr>
            </table>
        </div>
        <div class="divMid">
            <table id="tbRoom">
                <tr>
                    <td rowspan="3" id="profileImg" class="profile" onclick="chat"><img src="img/profile.png"/></td>
                    <th id="nickName" class="nickName" onclick="chat">멈물</th>
                    <td>
                        <button id="btnMore"><img src="img/add.png"/></button>
                    </td>
                </tr>
                <tr onclick="chat">
                    <td colspan="2" id="dialog" class="dialog">네 알겠습니다</td>
                </tr>
                <tr onclick="chat">
                    <td colspan="2" id="date" class="date">2019-07-09 13:20</td>
                </tr>
            </table>
        </div>
        <div class="divMid">
            <table id="tbRoom">
                <tr>
                    <td rowspan="3" id="profileImg" class="profile" onclick="chat"><img src="img/profile.png"/></td>
                    <th id="nickName" class="nickName" onclick="chat">abc</th>
                    <td>
                        <button id="btnMore"><img src="img/add.png"/></button>
                    </td>
                </tr>
                <tr onclick="chat">
                    <td colspan="2" id="dialog" class="dialog">그러면 다음주부터 바로 짐 빼주실 수 있…</td>
                </tr>
                <tr onclick="chat">
                    <td colspan="2" id="date" class="date">2019-07-07 11:30</td>
                </tr>
            </table>
        </div>
    </div>
</div>
</body>
</html>