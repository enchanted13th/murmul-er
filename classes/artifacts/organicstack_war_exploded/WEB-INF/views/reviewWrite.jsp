<%@ page language="java" contentType="text/html; charset=UTF-8" pageEncoding="UTF-8" %>
<%@ taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core" %>
<!DOCTYPE html PUBLIC "-//W3C//DTD HTML 4.01 Transitional//EN" "http://www.w3.org/TR/html4/loose.dtd">
<html>
<head>
    <meta http-equiv="Content-Type" content="text/html; charset=UTF-8"/>
    <title>리뷰 작성</title>
    <link rel="stylesheet" href="css/topbar.css"/>
    <link rel="stylesheet" href="css/reviewWrite.css"/>
    <script src="js/jquery-3.4.1.min.js"></script>
    <script src="http://dmaps.daum.net/map_js_init/postcode.v2.js"></script>
    <script src="//dapi.kakao.com/v2/maps/sdk.js?appkey=3f53634808f210457972e36ebc256ed0&libraries=services"></script>
    <script src="js/topbar.js"></script>
    <script src="js/reviewWrite.js"></script>
</head>
<body>
<div class="topbar">
    <ul>
        <li>
            <button id="btnJoin" class="text">회원가입</button>
        </li>
        <li>
            <button id="btnLogin" class="text">로그인</button>
        </li>
        <li></li>
        <li>
            <button id="btnMenu"><img src="img/topbar/menu.png"/></button>
        </li>
        <li>
            <button id="btnSearch"><img src="img/topbar/search.png"/></button>
        </li>
        <li>
            <button id="btnLogo"><img src="img/topbar/logo.png"/></button>
        </li>
    </ul>
</div>

<div class="writeTitle">
    <div>WRITE REVIEW</div>
</div>
<div class="wrap">
    <form name="reviewForm" method="POST" action="review">
        <div class="content">
            <table class="tbWrite">
                <tr class="low">
                    <td class="item">건물 설명</td>
                    <td><input type="text" name="inputTitle" id="inputTitle" class="inputTitle"
                               placeholder="50자 이내로 작성해주세요."/></td>
                </tr>
                <tr class="low">
                    <td class="item">주소</td>
                    <td><input type="text" onchange="changeAddr()" name="inputAddr" id="inputAddr" class="inputAddr"
                               placeholder="주소를 작성해주세요."/>
                        <button type="button" id="btnAddr">주소 검색</button>
                    </td>
                </tr>
                <tr class="low">
                    <td></td>
                    <td><input type="text" name="inputDetail" id="inputDetail" class="inputDetail"
                               placeholder="상세주소를 작성해주세요."/></td>
                </tr>
                <tr class="low">
                    <td class="item">거주기간</td>
                    <td><input type="text" id="inputPeriod" name="inputPeriod" class="inputPeriod"/>
                        <select class="selPeriod" id="selPeriod" name="selPeriod">
                            <option value="Y">년</option>
                            <option value="M">개월</option>
                            <option value="W">주</option>
                        </select>
                    </td>
                </tr>
                <tr class="low">
                    <td class="item">별 점</td>
                    <td><span class="star-input">
                     <span class="input">
                      <input type="radio" name="star-input" value="1" id="p1"/>
                         <label for="p1">1</label>
                         <input type="radio" name="star-input" value="2" id="p2"/>
                         <label for="p2">2</label>
                         <input type="radio" name="star-input" value="3" id="p3"/>
                         <label for="p3">3</label>
                         <input type="radio" name="star-input" value="4" id="p4"/>
                         <label for="p4">4</label>
                         <input type="radio" name="star-input" value="5" id="p5"/>
                         <label for="p5">5</label>
                       </span>
                       <output for="star-input"><b id="score">0</b>점(5점 만점)</output>
                     </span>
                    </td>
                </tr>
                <tr class="high">
                    <td class="item">총 평가</td>
                    <td><textarea name="txtExplain" id="txtExplain" class="txtExplain"
                                  placeholder="1000자 이내로 작성해주세요."></textarea></td>
                </tr>
                <tr class="high">
                    <td class="item">장점</td>
                    <td><textarea name="txtGood" id="txtGood" class="txtGood" placeholder="500자 이내로 작성해주세요."></textarea>
                    </td>
                </tr>
                <tr class="high">
                    <td class="item">단점</td>
                    <td><textarea name="txtBad" id="txtBad" class="txtBad" placeholder="500자 이내로 작성해주세요."></textarea>
                    </td>
                </tr>
                <tr class="trProof">
                    <td class="item">방충지수</td>
                    <td>
                     <span>
                     <input id="img1" name="mothproof" value="1" type="radio"/>
                     <label for="img1" onclick="good_b()">
                        <img id="good_b" src="img/etc/good_b.png" width="53px" height="53px"/>
                        <span>거의없음</span>
                     </label>
                     </span>

                        <span>
                     <input id="img2" name="mothproof" value="2" type="radio"/>
                     <label for="img2" onclick="normal_b()">
                        <img id="normal_b" src="img/etc/normal_b.png" width="53px" height="53px"/>
                        <span>가끔등장</span>
                     </label>
                     </span>

                        <span>
                     <input id="img3" name="mothproof" value="3" type="radio"/>
                     <label for="img3" onclick="bad_b()">
                        <img id="bad_b" src="img/etc/bad_b.png" width="53px" height="53px"/>
                        <span>자주등장</span>
                     </label>
                     </span>
                    </td>
                </tr>
                <tr class="trProof">
                    <td class="item">방음지수</td>
                    <td>
                     <span>
                     <input id="img4" name="soundproof" value="1" type="radio"/>
                     <label for="img4" onclick="good_b2()">
                        <img id="good_b2" src="img/etc/good_b.png" width="53px" height="53px"/>
                        <span>좋음</span>
                     </label>
                     </span>

                        <span>
                     <input id="img5" name="soundproof" value="2" type="radio"/>
                     <label for="img5" onclick="normal_b2()">
                        <img id="normal_b2" src="img/etc/normal_b.png" width="53px" height="53px"/>
                        <span>보통</span>
                     </label>
                     </span>

                        <span>
                     <input id="img6" name="soundproof" value="3" type="radio"/>
                     <label for="img6" onclick="bad_b2()">
                        <img id="bad_b2" src="img/etc/bad_b.png" width="53px" height="53px"/>
                        <span>나쁨</span>
                     </label>
                     </span>
                    </td>
                </tr>
                <tr class="low trHashTag">
                    <td class="item">해시태그</td>
                    <td>
                        <span>#</span><input type="text" name="hashtag" class="hashTag"/>
                        <span>#</span><input type="text" name="hashtag" class="hashTag"/>
                        <span>#</span><input type="text" name="hashtag" class="hashTag"/>
                    </td>
                </tr>
                <tr class="low">
                    <td class="item">이미지 첨부</td>
                    <td>
                        <button type="button" onclick="readFile()">파일선택</button>
                        <input type="file" name="imgUpload" id="imgUpload" onchange="readName()"/>
                        <span id="fileName" name="fileName"></span>
                    </td>


                </tr>
                <tr>
                    <td colspan="2">
                        <p class="precautions">리뷰 작성 시 주의사항</p>
                        <p class="pSub">1. 실제로 거주했던 리뷰를 작성해주세요.</p>
                        <p class="pSub">2. 단순 비방 및 욕설이 아닌 객관적 사실에 근거한 리뷰를 작성해주세요.</p>
                        <p class="pSub">* 도용 글, 불쾌감을 주는 글, 허위 글은 삭제 조치될 수 있습니다. </p>
                    </td>
                </tr>
            </table>
            <br/>
            <div class="divbtns">
                <button type="button" class="btnCancel" id="btnCancel">취소</button>
                <button type="button" class="btnUpdate" id="btnUpdate">등록</button>
            </div>
        </div>
    </form>
</div>
</body>
</html>
