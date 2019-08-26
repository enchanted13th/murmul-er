<%@ page language="java" contentType="text/html; charset=UTF-8" pageEncoding="UTF-8" %>
<%@ taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core" %>
<%@ taglib prefix="fn" uri="http://java.sun.com/jsp/jstl/functions" %>
<c:set var="contextPath" value="${pageContext.request.contextPath}"/>
<!DOCTYPE html PUBLIC "-//W3C//DTD HTML 4.01 Transitional//EN" "http://www.w3.org/TR/html4/loose.dtd">
<html>
<head>
    <meta http-equiv="Content-Type" content="text/html; charset=UTF-8">
    <link rel="stylesheet" href="https://cdn.jsdelivr.net/bxslider/4.2.12/jquery.bxslider.css">
    <link rel="stylesheet" href="/resources/css/roomDetail.css">
    <link rel="stylesheet" href="/resources/css/contactPopup.css">
    <link rel="stylesheet" href="/resources/css/report.css">
    <title>방 상세: ${title}</title>
    <script>
        let loginMemberId = "${loginMember.memberId}";
    </script>
</head>
<body>
<jsp:include page="topbar.jsp"/>

<div class="wrap">
    <div class="topText">
        <span>[${writeDate}]</span>
        <span> ${roomType}</span>
        <span>|</span>
        <span>${rentType}</span>
        <span>|</span>
        <span>${periodNum}${periodUnit} 가능</span>
    </div>
    <div class="title">
        <span>${title}</span>
    </div>
    <div class="location">
        <span id="addr"> ${sido} ${sigungu} ${roadName} ${roadJibun} ${dtailAddr} </span>
        <c:if test="${hashtags!='[]'}">
            <c:forEach var="hash" items="${hashtags}">
                <span class="hashTag">#${hash}</span>
            </c:forEach>
        </c:if>
    </div>
    <div align="center">
        <ul class="slider">
            <c:forEach var="data" items="${roomImg}" varStatus="status">
                <li>
                    <img class="roomImg" id="preview${status.index}" width="700px" height="480x" src=""/>
                    <input type="hidden" id="roomValue${status.index}" value="${roomId},${data}">
                </li>
                <c:if test="${status.last}">
                    <c:set var="roomImgNum" value="${status.count}"/>
                </c:if>
            </c:forEach>
        </ul>
    </div>
    <div class="detailTitle">Comment</div>
    <div class="detailContent">${detail}</div>
    <div>
        <h1 class="dtlTitle">상세정보</h1>
        <table class="detailTb">
            <tr>
                <td width=25%>해당층</td>
                <c:choose>
                    <c:when test="${floor<0}">
                        <c:set var="UnderFloor" value="${fn:replace(floor, '-', '지하 ')}"/>
                        <td width=25%>${UnderFloor}층</td>
                    </c:when>
                    <c:otherwise>
                        <td width=25%>${floor}층</td>
                    </c:otherwise>
                </c:choose>
                <td width=25%>난방종류</td>
                <td width=25%>${heating}</td>
            </tr>
            <tr>
                <td width=25%>면적/평수</td>
                <td width=25% id="area"></td>
                <td width=25%>주차장 가능여부</td>
                <td width=25% id="parking"></td>
            </tr>
            <tr>
                <td width=25%>엘리베이터 유무</td>
                <td width=25% id="elevator"></td>
                <td width=25%>반려동물 가능여부</td>
                <td width=25% id="pet"></td>
            </tr>
        </table>
    </div>
    <div>
        <h1 class="price">가격정보</h1>
        <table class="priceTb">
            <tr>
                <td width=20%>월세</td>
                <td width=20%>보증금</td>
                <td width=50%>관리비</td>
                <td width=10%>단기임대</td>
            </tr>
            <tr>
                <c:choose>
                    <c:when test="${monthlyCost eq '없음'}">
                        <td>-</td>
                    </c:when>
                    <c:otherwise>
                        <td>${monthlyCost} 원</td>
                    </c:otherwise>
                </c:choose>
                <c:choose>
                    <c:when test="${deposit eq '없음'}">
                        <td>-</td>
                    </c:when>
                    <c:otherwise>
                        <td>${deposit} 원</td>
                    </c:otherwise>
                </c:choose>
                <c:choose>
                    <c:when test="${manageCost eq '없음'}">
                        <td>-</td>
                    </c:when>
                    <c:otherwise>
                        <td>${manageCost} 원<br>(
                            <c:forEach var="manage" items="${manages}" varStatus="manageloop">
                                ${manage}
                                <c:if test="${not manageloop.last}">
                                    +
                                </c:if>
                            </c:forEach>
                            )
                        </td>
                    </c:otherwise>
                </c:choose>
                <c:choose>
                    <c:when test="${rentType eq '단기'}">
                        <td>Y</td>
                    </c:when>
                    <c:otherwise>
                        <td>N</td>
                    </c:otherwise>
                </c:choose>
            </tr>
        </table>
    </div>
    <div>
        <h1 class="option">옵션</h1>
        <table id="optionTb" class="optionTb">
        </table>
    </div>
    <div class="mapWrap">
        <h1 class="which">위치</h1>
        <div id="locationDong" class="detailLocation"> ${sido} ${sigungu} ${bname1} ${bname2} </div>
        <div class="map" id="map"></div>
    </div>
</div>
<div class="footer">
    <div class="f_button">
        <button id="btnContact" class="f_contact">매물러 연락처 보기</button>
        <button id="btnTalk" class="f_talk">톡 보내기</button>
    </div>
    <div class="footerContent">
        <button class="heart" id="heart" type="button" onclick="clickLike()"><img id="heartImg" src="/resources/img/etc/heart.png" width="40px" height="40px"></button>
        <button class="report" id="report" type="button"><img id="reportImg"src="/resources/img/etc/report.png" width="45px" height="45px"></button>
    </div>
</div>
<script>
    let temp = "${options}";
    temp = temp.substring(1, temp.length - 1);
    let option = temp.split(", ");
    let area = ${area}+"m² / ";
    let pyeong = Math.round(${area/3.3}) + "평";
    let sellerNickname = "${sellerNickname}";
    let sellerPhone = "${sellerPhone}";
    let sellerMemberId = ${memberId};
    let roomId = "${roomId}";
    let likeList = ${likeList};
    let roomImgNum = "${roomImgNum}";
    let roomType = "${roomType}";
</script>
<script type="text/javascript" src="//dapi.kakao.com/v2/maps/sdk.js?appkey=3f53634808f210457972e36ebc256ed0&libraries=services"></script>
<script src="http://dmaps.daum.net/map_js_init/postcode.v2.js"></script>
<script src="/resources/js/roomDetailMap.js"></script>
<script src="/resources/js/contact.js"></script>
<script src="/resources/js/report.js"></script>
<script src="/resources/js/roomDetail.js"></script>
<script src="https://cdn.jsdelivr.net/bxslider/4.2.12/jquery.bxslider.min.js"></script>
</body>
</html>


