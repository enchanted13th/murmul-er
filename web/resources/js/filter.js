$(document).ready(function () {
    $('#apt').selType();
    $('#villa').selType();
    $('#oneroom').selType();
    $('#tworoom').selType();
    $('#officetel').selType();

    $('#btnMyFilter').click(function () {
        if ($('.myFilterWrap').css('display') == 'none') {
            $('.myFilterWrap').css('display', 'inline-block');
        } else {
            $('.myFilterWrap').css('display', 'none');
        }
    });

    $('#btnOption').click(function () {
        if ($('.wrapOption').css('display') == 'none') {
            $('.wrapOption').css('display', 'inline-block');
        } else {
            $('.wrapOption').css('display', 'none');
        }
    });
});

var getAddress = function () {
    new daum.Postcode({
        oncomplete: function (data) {
            $("#tbAddress").attr("value", data.roadAddress);
        }
    }).open();
};

$.fn.selType = function () {
    $(this).click(function () {
        // console.log($(this).css('background-color'));
        if ($(this).css('background-color') == "rgb(255, 255, 255)") {
            $(this).css('background-color', '#4B88CC');
            $(this).css('color', '#FFFFFF');
        } else {
            $(this).css('background-color', '#FFFFFF');
            $(this).css('color', '#000000');
        }
    })
};