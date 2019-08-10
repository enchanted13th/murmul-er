$(document).ready(function () {
    $('.addReview').click(function () {
        if (islogin === false) {
            $.showLoginPopup("reviewWrite");
            alert('로그인해야 이용가능한 서비스입니다.');
        } else {
            location.href = "/orgarnic_stack/reviewWrite.html";
        }
    })
})