if (islogin === false) {
    location.href = "/";
}
$(document).ready(function () {

    $('#btnPutRoom').click(function () {
        location.href = "/manage/room";
    });

    $('#btnManageRoom').click(function () {
        location.href = "/manage";
    });
});