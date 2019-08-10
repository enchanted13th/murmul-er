$(document).ready(function () {

    $('#btnNotice').click(function () {
        location.href = "/service/notice?page=1";
    })
    $('#btnHelp').click(function () {
        location.href = "/service/faq?page=1";
    })
    $('#btnSupport').click(function () {
        location.href = "/service/support";
    })
    $('#btnTerms').click(function () {
        location.href = "/service/terms";
    })
});