<%@ page language="java" contentType="text/html; charset=UTF-8" pageEncoding="UTF-8" %>
<%@ taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core" %>
<%@ taglib prefix="fn" uri="http://java.sun.com/jsp/jstl/functions" %>
<c:set var="contextPath" value="${pageContext.request.contextPath}"/>
<!DOCTYPE html PUBLIC "-//W3C//DTD HTML 4.01 Transitional//EN" "http://www.w3.org/TR/html4/loose.dtd">
<html>
<head>
    <meta http-equiv="Content-Type" content="text/html; charset=UTF-8"/>
    <title>방 검색</title>
    <link rel="stylesheet" href="https://fonts.googleapis.com/css?family=Nanum+Gothic&display=swap">
    <link rel="stylesheet" href="/resources/css/search.css"/>

</head>
<body>
<jsp:include page="topbar.jsp"/>

<div class="wrap">
    <div class="mapWrap">
        <div class="map" id="map"></div>


        <div class="sub">
            <input type="button" class="slideMenu" id="slideMenu" value="<">
            <div class="itemsList" id="itemsList"></div>
        </div>

        <div class="searchWrap">
            <input id="mapInputBox" type="text" placeholder="아파트, 지역, 지하철, 학교검색">
            <button id="btnMapSearch" style="background-color:white;" onClick="searchPlaces()">&nbsp;</button>
            <button id="btnFilter" style="background-color:white;">필터</button>
        </div>
    </div>
</div>

<div class="filterWrap">
    <div class="filterMenuWrap">
        <table class="filterMenu">
            <!-- <tr>
                <td>나의 필터</td>
                <td align="right">
                     <label for="btnMyFilter" >세팅을 해주세요</label>
                    <button id="btnMyFilter" name="btnMyFilter" value="btnMyFilter">></button>
                </td>
            </tr>
            <tr>
                <td>지역</td>
                <td>
                    <input type="text" name="address" class="tbAddress" id="tbAddress" disabled>
                    <button id="btnAddressSearch" onClick="getAddress()">&nbsp;</button>
                </td>
            </tr> -->
            <tr>
                <td>건물 유형</td>
                <td>
                    <button class="buildingType" id="apt" name="buildingType" value="아파트">아파트</button>
                    <button class="buildingType" id="villa" name="buildingType" value="빌라">빌라</button>
                    <button class="buildingType" id="tworoom" name="buildingType" value="투룸">투룸</button>
                    <button class="buildingType" id="oneroom" name="buildingType" value="원룸">원룸</button>
                    <button class="buildingType" id="officetel" name="buildingType" value="오피스텔">오피스텔</button>
                </td>
            </tr>
            <tr>
                <td>임대기간</td>
                <td>
                    없음<input type="range" min="0" max="4" value="4" id="rentRange" class="slider" name="rentRange"
                             style="width: 180px;"/>최대
                    <br><span class="range">1개월</span><span class="range">6개월</span><span class="range">1년</span>
                </td>
            </tr>
            <tr>
                <td>보증금</td>
                <td>
                    없음<input type="range" min="0" max="4" value="4" id="deposit" class="slider" name="deposit"
                             style="width: 180px;">최대
                    <br><span class="range">300만</span> <span class="range">500만</span> <span class="range">1000만</span>
                </td>
            </tr>
            <tr>
                <td>월세</td>
                <td>
                    없음<input type="range" min="0" max="4" value="4" id="monthlyCost" class="slider" name="monthlyCost"
                             style="width: 180px;">최대
                    <br><span class="range">30만</span><span class="range">50만</span><span class="range">100만</span>
                </td>
            </tr>
            <tr>
                <td colspan="2">
                    <button class="optionButton" id="btnSubmit">확인</button>
                    <button class="optionButton" id="btnOption">옵션 설정</button>
                </td>
            </tr>
        </table>
    </div>

    <div class="myFilterWrap">
        <div class="divFilterSettingSave">
            <button id="btnFilterSettingSave">현재 필터 세팅을 저장하기</button>
        </div>
        <div class="divFilterSettingLoad">
            <div class="divFilterSettingLoadBtn">
                <button id="btnFilterSettingLoad">필터 세팅 불러오기</button>
            </div>
            <div class="divMyFilterList">
                <div class="divMyFilter" id="divMyFilter1">
                    <input type="radio" name="myFilter" class="myFilterRadio"/>
                    MY SETTING 1
                    <button class="trashButton"></button>
                </div>
                <div class="divMyFilter" id="divMyFilter2">
                    <input type="radio" name="myFilter" class="myFilterRadio"/>
                    설입 30만 이하
                    <button class="trashButton"></button>
                </div>
                <div class="divMyFilter" id="divMyFilter3">
                    <input type="radio" name="myFilter" class="myFilterRadio"/>
                    세팅을 해주세요
                    <button class="trashButton"></button>
                </div>
            </div>
        </div>
    </div>

    <div class="wrapOption">
        <table class="filterOption">
            <c:forEach var="i" begin="1" end="${fn:length(options)}" step="2">
                <tr>
                    <c:forEach var="option" items="${options}" varStatus="count">
                        <c:if test="${count.count == i || count.count == i + 1}">
                            <td>
                                <c:forEach var="op" items="${option}">
                                    <input type="checkbox" name="optionCheckbox" class="optionCheckbox" value="${op.value}" checked/>${op.value}
                                </c:forEach>
                            </td>
                <c:if test="${i == fn:length(options)}">
                    <td></td>
                </c:if>
                </c:if>
                </c:forEach>
            </tr>
            </c:forEach>
            <tr>
                <td>
                    <button class="btnOption" id="btnApply">적용</button>
                </td>
                <td>
                    <button class="btnOption" id="btnDefaultSet">기본값</button>
                </td>
            </tr>
        </table>
    </div>
</div>
<script src="//dapi.kakao.com/v2/maps/sdk.js?appkey=3f53634808f210457972e36ebc256ed0&libraries=services,clusterer,drawing"></script>
<script src="http://dmaps.daum.net/map_js_init/postcode.v2.js"></script>
<script src="/resources/js/search.js"></script>
<script src="/resources/js/searchMap.js"></script>
<script>
    $(document).ready(function () {
        var jsonData = JSON.stringify("4");

        /*  $('#btnSubmit').click(function() {
            var addr = $('#tbAddress').val();
            var bt = $('[name=buildingType]').val();
             var rtRange = $('[name=rentRange]').val();
             var deposit = $('[name=deposit]').val();
             var monthlyCost = $('[name=monthlyCost]').val();
             var options = $('.optionCheckbox').val();
            console.log(addr+' '+bt+' '+ rtRange+' '+deposit+' '+ monthlyCost+' '+options);
            $.ajax({
               url: "roomList",
               type: "POST",
               data: {
                  filter : $("input:radio[name=myFilter]:checked").val(),
                  address : $('#tbAddress').val(),
                  buildingType : $('input[name=buildingType]').val(),
                  rentRange : $('[name=rentRange]').val(),
                  deposit : $('[name=deposit]').val(),
                  monthlyCost : $('[name=monthlyCost]').val(),
                  options : $('.optionCheckbox').val()
               }, success: function(data) {
                  console.log('ajax 성공');
                  $('.filterWrap').css('display', 'none');
                  $('#mapInputBox').val(data);
                  searchPlaces();
               }
            })
         }); */
        $('#btnSubmit').click(function () {
            console.log('확인');
            $('.filterWrap').css('z-index', 'auto');
            $('.filterWrap').css('display', 'none');
        })
    });
    /* var addr = $('#tbAddress').val();
    var optionList = new Array();
    var month; var rentRange ; var deposit;

    switch($('#rentRange').val()){
    case "0":
        rentRange="없음";
        break;
    case "1":
        rentRange="1개월";
        break;
    case "2":
        rentRange="6개월";
        break;
    case "3":
        rentRange="1년";
        break;
    default :
        rentRange="최대";
        break;
  }

    switch($('#deposit').val()){
    case "0":
        deposit="없음";
        break;
    case "1":
        deposit="300만";
        break;
    case "2":
        deposit="500만";
        break;
    case "3":
        deposit="1000만";
        break;
    default :
        deposit="최대";
        break;
  }

    switch($('#monthlyCost').val()){
    case "0":
        month="없음";
        break;
    case "1":
        month="30만";
        break;
    case "2":
        month="50만";
        break;
    case "3":
        month="100만";
        break;
    default :
        month="최대";
        break;
    }

    $(".optionCheckbox:checked").each(function() {
        var i = 0;
            optionList[i] = $(this).val();
            console.log(optionList[i]);
            i++;
        }); */

    /* $.ajax({
       url: "roomList",
       type: "POST",
       data: {
                address : addr,
                roomTypeList : JSON.stringify(roomTypeList),
                rentRange : rentRange,
                deposit : deposit,
                monthlyCost : month,
                options : JSON.stringify(optionList)
           }
       }).then(function(data, status) {
          console.log('ajax 성공');
          $('.filterWrap').css('display', 'none');
          $('#mapInputBox').val(data);
          searchPlaces();
       });
     }); */
</script>
</body>
</html>