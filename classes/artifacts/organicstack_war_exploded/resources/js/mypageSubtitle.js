$(document).ready(function () {
    if (islogin === false) {
        location.href = "/";
    }
    $('#btnRecentList').click(function () {
        location.href = "/mypage/recent";
    })
    $('#btnLikeList').click(function () {
        location.href = "/mypage/like";
    })
    $('#btnContract').click(function () {
        location.href = "/mypage/contract";
    })
    $('#btnPersonalInfo').click(function () {
        location.href = "/mypage/personal-info";
    })
    $('#btnChangePwd').click(function () {
        location.href = "/mypage/change-pwd";
    })
})