var slideMenuFlag = false;

$(window).resize(function () {
    if ($('#slideMenu').val() === "<") {
        if ($(window).width() < 1400) {
            $('.sub').css('width', 260);
            $('#map').css('width', "calc(100% - 265px)");
        }
    } else {
        if ($(window).width() < 1400) {
            $('.sub').css('width', 520);
            $('#map').css('width', "calc(100% - 525px)");
        }
    }
});

$(document).ready(function () {
    $('#mapInputBox').keypress(function (e) {
        if (e.which === 13) {
            searchPlaces();
        }
    })
    $("#slideMenu").showSlideMenu();

    $.clickEvent();

    $("#btnFilter").click(function () {
        if ($('.filterWrap').css('display') == 'none') {
            $('.filterWrap').css('z-index', '10');
            $('.filterWrap').css('display', 'initial');
        } else {
            $('.filterWrap').css('z-index', 'auto');
            $('.filterWrap').css('display', 'none');

        }
    });

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

    $('#btnSubmit').click(function () {
        $('.filterWrap').css('z-index', 'auto');
        $('.filterWrap').css('display', 'none');
        searchRoomFromMap();
    })

    $('#btnDefaultSet').click(function () {
        $(".optionCheckbox").each(function () {
            this.checked = false;
        });
    });

    $('#btnApply').click(function () {
        $('.wrapOption').css('display', 'none');
    });
});

$.clickEvent = function () {
    $('#apt').clickRt();
    $('#villa').clickRt();
    $('#tworoom').clickRt();
    $('#oneroom').clickRt();
    $('#officetel').clickRt();
    let bt = $('.buildingType');
    for(let i = 0; i < bt.length; i++){
        roomTypeList.push($('.buildingType').eq(i).val());
    }
}

var roomTypeList = [];
$.fn.clickRt = function () {
    $(this).click(function () {
        if ($(this).css('background-color') === "rgb(182, 226, 248)") {
            $(this).css('background-color', '#ffffff');
            for(let i = 0 ; i < roomTypeList.length; i++){
                if(roomTypeList[i] === $(this).val())
                    roomTypeList.splice(i,1);
            }
        } else {
            $(this).css('background-color', 'rgb(182, 226, 248)');
            roomTypeList.push($(this).val());
        }
    })
}

var getAddress = function () {
    new daum.Postcode({
        oncomplete: function (data) {
            $("#tbAddress").attr("value", data.roadAddress);
        }
    }).open();
};

$.fn.showSlideMenu = function () {
    $(this).click(function () {
        if (slideMenuFlag == false) {
            $("#slideMenu").val('>');
            if ($(window).width() < 1400) {
                $('.sub').css('width', 520);
                $('#map').css('width', "calc(100% - 525px)");
            } else {
                $("#map").css('width', '60%');
                $(".sub").css('width', '40%');
            }
            $("#itemsList").css('width', '98%');
            $('.item').css('width', '45%');
            slideMenuFlag = true;

        } else {
            $("#slideMenu").val('<');
            if ($(window).width() < 1400) {
                $('.sub').css('width', 260);
                $('#map').css('width', "calc(100% - 265px)");
            } else {
                $("#map").css('width', '80%');
                $(".sub").css('width', '20%');
            }
            $("#itemsList").css('width', '100%');
            $('.item').css('width', '96%');
            slideMenuFlag = false;
        }
    });
}
