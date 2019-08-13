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
    <script>
        var contactMember = ${contactMember};
        var dialogue = ${dialogue};
    </script>
    <c:set var="dateFlag" value=""/>
</head>
<body>
<div>
    <div id="talkPopup" class="menuPopup">
        <div class="divWrap">
            <div class="divTop">
                <button id="btnBack" class="btnBack"><img src="/resources/img/talk/back.png"/></button>
                <div id="nickName" class="nickName">${nickname}</div>
                <button id="btnClose" class="btnClose"><img src="/resources/img/talk/exit.png"/></button>
            </div>
            <div class="divMid" id="divMid">
                <div id="divContent">
                    <c:forEach var="msg" items="${dialogue}">
                        <c:if test="${msg.date!=dateFlag}">
                            <c:set var="dateFlag" value="${msg.date}"/>
                            <div class="divDate">
                                <div id="date" class="date">${msg.date}</div>
                            </div>
                        </c:if>
                        <c:if test="${msg.sender=='ME'}">
                            <div id="divMessage" class="divMessage">
                                <div class="divMe">
                                    <span class="time">${msg.time}</span>
                                    <div class="myMessage">
                                        <span>${msg.content}</span>
                                    </div>
                                </div>
                            </div>
                        </c:if>
                        <c:if test="${msg.sender=='YOU'}">
                            <div id="divMessage" class="divMessage">
                                <div class="divYou">
                                    <div class="yourMessage">
                                        <span>${msg.content}</span>
                                    </div>
                                    <span class="time">${msg.time}</span>
                                </div>
                            </div>
                        </c:if>
                    </c:forEach>
                            <%--<c:if test="${msg.sender=='ME'}">
                                <table id="myTable">
                                    <tr class="me" valign="top">
                                        <td colspan="2" align="right">
                                            <div class="message">
                                                <span id="time" class="time">${msg.time}</span>
                                                <div id="myMessage" class="myMessage">${msg.content}</div>
                                            </div>
                                        </td>
                                    </tr>
                                </table>
                            </c:if>
                            <c:if test="${msg.sender=='YOU'}">
                                <table id="yourTable">
                                    <tr class="you" valign="top">
                                        <td colspan="2" align="left">
                                            <div class="message">
                                                <div id="myMessage" class="myMessage">${msg.content}</div>
                                                <span id="time" class="time">${msg.time}</span>
                                            </div>
                                        </td>
                                    </tr>
                                </table>
                            </c:if>--%>
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