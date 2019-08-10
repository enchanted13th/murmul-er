<%@ page language="java" contentType="text/html; charset=UTF-8" pageEncoding="UTF-8" %>
<%@ taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core" %>
<!DOCTYPE html PUBLIC "-//W3C//DTD HTML 4.01 Transitional//EN" "http://www.w3.org/TR/html4/loose.dtd">
<html>
<head>
    <meta http-equiv="Content-Type" content="text/html; charset=UTF-8">
    <title>리뷰 보기</title>
    <link rel="stylesheet" href="css/topbar.css"/>
    <link rel="stylesheet" href="css/review.css"/>
    <script src="js/jquery-3.4.1.min.js"></script>
    <script src="js/topbar.js"></script>
    <script src="js/review.js"></script>
</head>
<body>
<jsp:include page="topbar.jsp"/>

<div class="reviewTitle">
    <div>REVIEW</div>
</div>
<div class="divOption1">
    <span class="totalCnt">총 000개</span>
    <button class="filter" type="button"><img src="img/etc/filter2.png" style="width: 30px; height: 30px;"></button>
</div>
<div class="divOption2">
    <select class="selAlign">
        <option selected>최신 순으로 보기</option>
        <option>별점 순으로 보기</option>
        <option>방음지수 순으로 보기</option>
        <option>방충지수 순으로 보기</option>
    </select>
    <button class="addReview">후기 작성</button>
</div>
<div class="wrap">
    <div class="topText">
        <span>2019년 9월 15일</span>
        <span>|</span>
        <span>3개월 거주</span>
    </div>
    <div class="title">
        <span>숭실대학교 5분거리 원룸</span>
        <!-- <span>|</span>
        <span>월세 30만원</span> -->
    </div>
    <div class="location">
        <span>서울특별시 동작구 상도로 23길 렉토빌딩</span>
    </div>
    <div class="content">
        <div class="picture">
            <img class="room" src="img/room/room.png" style="width:400px; height:400px;" align="middle"/>
            <div class="hashtag">
                <span>#대학교 인근</span>
                <span>#원룸</span>
            </div>
        </div>
        <div class="text">
            <div class="overall">
                <span class="textTitle">총 평가</span>
                <img class="rank" src="img/etc/rank.png"/>
            </div>
            <div class="review_text">
                학교에서 5분거리임!!<br/>
                하지만 버스정류장이 좀 멀리있음ㅜㅜ<br/>
                학교 근처라 사서 먹을 건 많은데 밤에도 시끄러움..<br/>
            </div>
            <div class="good">
                <div class="textTitle">장점</div>
                <span>1. 학교가 가깝다.</span><br/>
                <span>2. 편의점, 음식점 다 있다.</span><br/>
                <span>3. 관리비가 저렴하다.</span><br/>
            </div>
            <div class="bad">
                <div class="textTitle">단점</div>
                <span>1. 방음이 별로. 옆방에서 노래부르는 소리가 다 들린다.</span><br/>
                <span>2. 날파리가 가끔 꼬인다.</span><br/>
            </div>
            <div class="level">
                <span class="textTitle">방충지수</span>
                <img class="insect" src="img/etc/normal_a.png">
                <span class="textTitle">방음지수</span>
                <img class="noise" src="img/etc/bad_a.png">
            </div>
        </div>
    </div>
</div>
<div class="pageBtns">
    <div>
        <button>&lt;&lt;</button>
        <button>&lt;</button>
        <button>1</button>
        <button>2</button>
        <button>3</button>
        <button>4</button>
        <button>5</button>
        <button>&gt;</button>
        <button>&gt;&gt;</button>
    </div>
</div>
</body>
</html>