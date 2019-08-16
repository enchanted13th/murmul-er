$(document).ready(function () {
    $('#btnClose').cancel();
    $('#btnMore').showDelete();
    $('#divMid').scrollTop(0);
    window.resizeTo(516, 820);
})

var showTalk = function(contactMember) {
    location.href = "/talk/" + contactMember;
}

$.fn.cancel = function () {
    $(this).click(function () {
        window.close();
    })
}

$.fn.showDelete = function() {
    $(this).click(function () {
        /* 삭제하기 메뉴 띄우고 삭제 기능 추가하기 */
    })
}