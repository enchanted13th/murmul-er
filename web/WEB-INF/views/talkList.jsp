<%@ page language="java" contentType="text/html; charset=UTF-8" pageEncoding="UTF-8" %>
<%@ taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core" %>
<!DOCTYPE html PUBLIC "-//W3C//DTD HTML 4.01 Transitional//EN" "http://www.w3.org/TR/html4/loose.dtd">
<html>
<head>
    <meta http-equiv="Content-Type" content="text/html; charset=UTF-8"/>
    <title>머물-톡</title>
    <link rel="stylesheet" href="/resources/css/talkList.css"/>
    <script src="/resources/js/jquery-3.4.1.min.js"></script>
    <script src="/resources/js/sockjs.js"></script>
    <script>
        let talkInfoList = eval(${talkInfoList});
        let me = '${me}';
    </script>
    <script src="/resources/js/talkList.js"></script>
</head>
<body>
<div>
    <div class="divWrap">
        <div class="divTop">
            <label class="lbTitle">Murmul Talk</label>
            <button id="btnClose" class="btnClose"><img src="/resources/img/talk/exit.png"/></button>
        </div>
        <div class="divMid">
            <div class="divContent">
                <c:if test="${isExist==true}">
                    <c:forEach var="talkInfo" items="${talkInfoList}">
                        <div class="divRoom" id="member${talkInfo.contactMember}">
                            <c:set var="contactMember" value="${talkInfo.contactMember}"/>
                            <c:set var="lastMessage" value="${talkInfo.lastMessage}"/>
                            <table>
                                <tr>
                                    <td rowspan="3" id="profileImg" class="profile" onclick="showTalk(${contactMember})">
                                        <img src="/resources/img/talk/profile.png"/></td>
                                    <th class="nickName" onclick="showTalk(${contactMember})">${talkInfo.nickname}</th>
                                    <td width="102px"><button class="exitChatRoom" onClick="deleteTalk(${contactMember})">나가기</button></td>
                                    <td width="30px">
                                        <button id="btnMore" class="btnMore"><img src="/resources/img/talk/add.png"/></button>
                                    </td>
                                </tr>
                                <tr onclick="showTalk(${contactMember})">
                                    <td colspan="3" class="content">${lastMessage.content}</td>
                                </tr>
                                <tr onclick="showTalk(${contactMember})">
                                    <td colspan="3" class="date">${lastMessage.date} ${lastMessage.time}</td>
                                </tr>
                            </table>
                        </div>
                    </c:forEach>
                </c:if>
                <c:if test="${isExist==false}">
                    <div>
                        <div class="noContent">메시지를 주고 받은 기록이 없습니다.</div>
                    </div>
                </c:if>
            </div>
        </div>
    </div>
</div>
</body>
</html>