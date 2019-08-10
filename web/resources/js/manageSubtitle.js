$(document).ready(function () {
    if (islogin === false) {
        location.href = "/";
    }
    $('#btnPutRoom').click(function () {
        location.href = "/manage/room";
    });

    $('#btnManageRoom').click(function () {
        location.href = "/manage";
    });
});