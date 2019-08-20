<%@ page language="java" contentType="text/html; charset=UTF-8" pageEncoding="UTF-8" %>
<%@ taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core" %>
<!DOCTYPE html PUBLIC "-//W3C//DTD HTML 4.01 Transitional//EN" "http://www.w3.org/TR/html4/loose.dtd">
<html>
<head>
    <meta http-equiv="Content-Type" content="text/html; charset=UTF-8">
    <title>리뷰 보기</title>
    <link rel="stylesheet" href="/resources/css/review.css"/>
    <script>
        var curpage = ${curpage};
        var flag = "cur";
        var startpage = ${startpage};
        var total = ${total};
        var order = "${order}";
    </script>
</head>
<body>
<jsp:include page="topbar.jsp"/>

<div class="reviewTitle">
    <div>REVIEW</div>
</div>
<div class="divOption1">
    <span class="totalCnt">총</span> <span class="totalCntColor">${reviewCnt}개</span><span class="totalCnt">의 리뷰가 있습니다.</span>
    <%--    <button class="filter" type="button"><img src="/resources/img/etc/filter2.png" style="width: 30px; height: 30px;"></button>--%>
</div>
<div class="divOption2">
    <select class="selAlign">

        <c:if test="${order eq 'latest'}">
            <option selected>최신 순으로 보기</option>
            <option>별점 순으로 보기</option>
            <option>방음지수 순으로 보기</option>
            <option>방충지수 순으로 보기</option>
        </c:if>
        <c:if test="${order eq 'star'}">
            <option>최신 순으로 보기</option>
            <option selected>별점 순으로 보기</option>
            <option>방음지수 순으로 보기</option>
            <option>방충지수 순으로 보기</option>
        </c:if>
        <c:if test="${order eq 'insect'}">
            <option>최신 순으로 보기</option>
            <option>별점 순으로 보기</option>
            <option>방음지수 순으로 보기</option>
            <option selected>방충지수 순으로 보기</option>
        </c:if>
        <c:if test="${order eq 'noise'}">
            <option>최신 순으로 보기</option>
            <option>별점 순으로 보기</option>
            <option selected>방음지수 순으로 보기</option>
            <option>방충지수 순으로 보기</option>
        </c:if>

    </select>
    <button class="addReview">후기 작성</button>
</div>
<div class="wrap">

    <c:forEach var="review" items="${reviewList}" varStatus="status">
        <table class="tbList">
            <div class="element">
                <div class="topText">
                    <span>${review.writeDate}</span>
                    <span>|</span>
                    <span>${review.residencePeriod}</span><span class="period"></span> <span>거주</span>
                    <input class="periodUnit" type="hidden" value="${review.periodUnit}">
                </div>
                <div class="title">
                    <span class="textTitle">${review.title}</span>
                </div>
                <div class="location">
                    <span>${review.sido} ${review.sigungu} ${review.roadname} ${review.detailAddr}</span>
                </div>
                <div class="content">
                    <div class="picture">
                        <c:set var="middlePath" value="/review/reviewId_${review.id}"/>
                        <img class="room" id="preview${status.index}" src="" style="width:400px; height:400px;" align="middle"/>
                        <input type="hidden" id="uploadValue${status.index}" value="${middlePath},${review.image}">
                        <div class="hashtag">
                            <c:forEach var="hashTag" items="${review.hashTagList}">
                                <span>#${hashTag}</span>
                            </c:forEach>
                        </div>
                    </div>
                    <div class="text">
                        <div class="overall">
                            <span class="textTitle">총 평가</span>
                            <img class="rank" src=""/>
                            <input class="score" type="hidden" value="${review.score}">
                        </div>
                        <div class="review_text">
                                ${review.content}
                        </div>
                        <div class="good">
                            <div class="textTitle">장점</div>
                                ${review.advantage}
                        </div>
                        <div class="bad">
                            <div class="textTitle">단점</div>
                                ${review.disadvantage}
                        </div>
                        <div class="level">
                            <span class="textTitle">방충지수</span>
                            <img class="insect" src="">
                            <input class="insectVal" type="hidden" value="${review.insectLevel}">
                            <span class="textTitle">방음지수</span>
                            <img class="noise" src="">
                            <input class="noiseVal" type="hidden" value="${review.noiseLevel}">
                        </div>
                    </div>
                </div>
            </div>
        </table>
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

<script src="/resources/js/review.js"></script>
</body>
</html>