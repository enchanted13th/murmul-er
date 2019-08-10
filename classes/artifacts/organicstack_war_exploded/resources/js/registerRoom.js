var allAddr = {};
var adminFeeList = {};
var optionList = {};
var hashTagList = {};
var imgpath = {img1: $('#rmimg1').attr('src'), img2: $('#rmimg2').attr('src')};

var ps = new kakao.maps.services.Places();

function placesSearchCB(data, status, pagination) {
    console.log('placesSearchCB 진입');
    console.log(data);
    console.log(status);
    if (status === kakao.maps.services.Status.OK) {
        console.log('placesSearchCB status ok');
        console.log('data:', data);
        allAddr.latitude = data[0].y;
        allAddr.longitude = data[0].x;
        console.log(allAddr);
        let roomInfo = {
            allAddr: JSON.stringify(allAddr),
            detailAddr: $('#inputDetailAddr').val(),
            area: $('#inputArea').val(),
            periodNum: $('#inputPeriodNum').val(),
            periodUnit: $('#inputPeriodUnit').val(),
            deposit: $('#inputDeposit').val() * 10000,
            price: $('#inputPrice').val() * 10000,
            priceType: $('#btnRi' + selectedRi).val(),
            adminFee: $('#inputAdminFee').val() * 10000,
            adminFeeList: JSON.stringify(adminFeeList),
            roomType: $('#btnRt' + selectedRt).val(),
            heatType: $('#btnHeat' + selectedHeat).val(),
            animal: $('#btnAnimal' + selectedAnimal).val(),
            parking: $('#btnParking' + selectedParking).val(),
            elevator: $('#btnEv' + selectedElevator).val(),
            optionList: JSON.stringify(optionList),
            title: $('#inputTitle').val(),
            detail: $('#txtDetail').val(),
            hashtagExist: hashtagExist,
            hashTagList: JSON.stringify(hashTagList),
            images: JSON.stringify(imgpath)
        };
        console.log(roomInfo);
        $.ajax("/manage/room",{
            type: "POST",
            data: roomInfo
        }).then(function (data, status) {
            if (status === "success") {
                console.log(data);
                console.log(typeof data);
                console.log(data.registerResult);
            } else {
                console.log(data, status);
            }
        });
    } else {
        console.log("if조건에 안걸린다");
        alert("없는 주소입니다.")
    }

}

var changeAddr = function () {
    alert('값변경');
    ps.keywordSearch($('#inputAddr'), placesSearchCB);
}
$(document).ready(function () {
    if (islogin === false) {
        location.href = "/";
    }
    $('#btnManageRoom').click(function () {
        location.href = "/manage";
    })
    $('#btnPutRoom').parent().css('border-bottom', '6px solid #b6e2f8');
    javascript:scroll(0, 0);
    $.clickEvent();
    $.imagebutton();

})

function readURL(input) {
    if (input.files && input.files[0]) {
        var reader = new FileReader();
        reader.onload = function (e) {
            $('#rmimg1').attr('src', e.target.result);
        }
        reader.readAsDataURL(input.files[0]);
    }
}

function changeSize() {
    let area = parseFloat($('#inputSize').val() * 3.305785).toFixed(2);
    $('#inputArea').val(area);
}

function changeArea() {
    let area = Math.round($('#inputArea').val() / 3.305785);
    $('#inputSize').val(area);
}

$.clickEvent = function () {
    $('#btnRt1').clickRt();
    $('#btnRt2').clickRt();
    $('#btnRt3').clickRt();
    $('#btnRt4').clickRt();
    $('#btnRt5').clickRt();
    $('#btnRi1').clickRi();
    $('#btnRi2').clickRi();
    $('#btnRi3').clickRi();
    $('#btnAF1').clickAF();
    $('#btnAF2').clickAF();
    $('#btnAFL1').clickAFL();
    $('#btnAFL2').clickAFL();
    $('#btnAFL3').clickAFL();
    $('#btnAFL4').clickAFL();
    $('#btnAFL5').clickAFL();

    $('#btnHeat1').clickHeat();
    $('#btnHeat2').clickHeat();
    $('#btnHeat3').clickHeat();

    $('#btnAnimal1').clickAnimal();
    $('#btnAnimal2').clickAnimal();

    $('#btnParking1').clickParking();
    $('#btnParking2').clickParking();

    $('#btnEv1').clickEv();
    $('#btnEv2').clickEv();

    $('#btnSearchAddr').click(function () {
        var getAddress = function () {
            new daum.Postcode({
                oncomplete: function (data) {
                    allAddr = data;
                    console.log(allAddr);
                    $('#inputAddr').attr("value", data.roadAddress);
                }
            }).open();
        };
        getAddress();
    })
    $('#addimage').click(function () {
        /*alert('사진추가팝업창');*/
    })
    $('.addimage').hover();
    $('.previmage').hover();
    $('.option').clickOp();

    //=========================registerRoom=========================

    $("#lastBtn").click(function () {

        console.log($('#inputTitle').val());


        hashTagList.hash1 = $('#hash1').val();
        hashTagList.hash2 = $('#hash2').val();
        hashTagList.hash3 = $('#hash3').val();
        console.log($('#hash1').val());
        console.log($('#hash2').val());
        console.log($('#hash3').val());

        var onlyNum = /^[0-9]*$/;
        let on1 = $('#inputSize').val();
        let on2 = $('#inputDeposit').val();
        let on3 = $('#inputPrice').val();
        let on4 = $('#inputAdminFee').val();
        let on5 = $('#inputPeriodNum').val();

        var check = 0;
        for (var i = 1; i <= 5; i++) {
            if ($('#btnRt' + i).css('background-color') === "rgb(182, 226, 248)") {
                check++;
            }
        }
        if (check == 0) {
            document.getElementById('btnRt1').scrollIntoView();
            alert("매물종류를 선택하세요.");
            return;
        }

        check = 0;
        for (var i = 1; i <= 3; i++) {
            if ($('#btnRi' + i).css('background-color') === "rgb(182, 226, 248)") {
                check++;
            }
        }
        if (check == 0) {
            document.getElementById('btnRi1').scrollIntoView();
            alert("금액을 선택하세요.");
            return;
        }

        check = 0;
        for (var i = 1; i <= 2; i++) {
            if ($('#btnAF' + i).css('background-color') === "rgb(182, 226, 248)") {
                check++;
            }
        }
        if (check == 0) {
            document.getElementById('btnAF1').scrollIntoView();
            alert("관리비를 선택하세요.");
            return;
        }

        if ($('#btnAF2').css('background-color') === "rgb(182, 226, 248)") {
            check = 0;
            for (var i = 1; i <= 5; i++) {
                if ($('#btnAFL' + i).css('background-color') === "rgb(182, 226, 248)") {
                    check++;
                }
            }
            if (check == 0) {
                document.getElementById('btnAFL1').scrollIntoView();
                alert("관리비 포함 항목을 선택하세요.");
                return;
            }
        }

        check = 0;
        for (var i = 1; i <= 3; i++) {
            if ($('#btnHeat' + i).css('background-color') === "rgb(182, 226, 248)") {
                check++;
            }
        }
        if (check == 0) {
            document.getElementById('btnHeat1').scrollIntoView();
            alert("난방 종류를 선택하세요.");
            return;
        }

        check = 0;
        for (var i = 1; i <= 2; i++) {
            if ($('#btnAnimal' + i).css('background-color') === "rgb(182, 226, 248)") {
                check++;
            }
        }
        if (check == 0) {
            document.getElementById('btnAnimal1').scrollIntoView();
            alert("반려 동물 여부를 선택하세요.");
            return;
        }

        check = 0;
        for (var i = 1; i <= 2; i++) {
            if ($('#btnParking' + i).css('background-color') === "rgb(182, 226, 248)") {
                check++;
            }
        }
        if (check == 0) {
            document.getElementById('btnParking1').scrollIntoView();
            alert("주차장 여부를 선택하세요.");
            return;
        }

        check = 0;
        for (var i = 1; i <= 2; i++) {
            if ($('#btnEv' + i).css('background-color') === "rgb(182, 226, 248)") {
                check++;
            }
        }
        if (check == 0) {
            document.getElementById('btnEv1').scrollIntoView();
            alert("엘리베이터 여부를 선택하세요.");
            return;
        }

        check = 0;
        for (var i = 1; i <= 14; i++) {
            if ($('#btnOption' + i).css('background-color') === "rgb(182, 226, 248)") {
                check++;
            }
        }
        if (check == 0) {
            document.getElementById('btnOption1').scrollIntoView();
            alert("옵션 항목을 선택하세요.");
            return;
        }

        if (!onlyNum.test(on1) || !onlyNum.test(on2) || !onlyNum.test(on3) || !onlyNum.test(on4) || !onlyNum.test(on5)) {
            alert("숫자만 입력하세요.");
            if (!onlyNum.test(on1)) {
                $('#inputSize').focus();
            } else if (!onlyNum.test(on2)) {
                $('#inputDeposit').focus();
            } else if (!onlyNum.test(on3)) {
                $('#inputPrice').focus();
            } else if (!onlyNum.test(on4)) {
                $('#inputAdminFee').focus();
            } else {
                $('#inputPeriodNum').focus();
            }
            return;
        }
        if (on1 == "" || on3 == "" || on5 == "" || $('#inputTitle').val() == "" || $('#txtDetail').val() == "" || $('#inputAddr').val() == "") {
            if ($('#inputAddr').val() == "") {
                alert("주소를 입력하세요.");
                $('#inputAddr').focus();
            } else if (on1 == "") {
                alert("면적을 입력하세요.");
                $('#inputSize').focus();
            } else if (on3 == "") {
                alert("금액을 입력하세요.");
                $('#inputPrice').focus();
            } else if (on5 == "") {
                alert("임대기간을 입력하세요.");
                $('#inputPeriodNum').focus();
            } else if ($('#inputTitle').val() == "") {
                alert("제목을 입력하세요.");
                $('#inputTitle').focus();
            } else if ($('#txtDetail').val() == "") {
                alert("상세 설명을 입력하세요.");
                $('#txtDetail').focus();
            } else {
                ;
            }

            return;
        }
        if (on4 == "") {
            if ($('#btnAF2').css('background-color') === "rgb(182, 226, 248)") {
                alert("관리비를 입력하세요.");
                $('#inputAdminFee').focus();
                return;
            }
        }

        if ($('#hash1').val() == "" && $('#hash2').val() == "" && $('#hash3').val() == "") {
            hashtagExist = false;
        } else {
            hashtagExist = true;
        }

        ps.keywordSearch($('#inputAddr').val(), placesSearchCB);
        // post 원래 자리

    });
    //=========================registerRoom=========================

}

$.fn.hover = function () {
    $(this).mouseenter(function () {
        $(this).css('border', '2px solid #90c0d0');
    })
    $(this).mouseleave(function () {
        $(this).css('border', '2px solid #b6e2f8');
    })
}

$.imagebutton = function () {
    for (let i = 0; i < $('.previmage').length; i++) {
        $('.previmage')[i]
    }
}

var selectedRt = 0;
var selectedRi = 0;
var selectedAF = 0;
var selectedHeat = 0;
var selectedAnimal = 0;
var selectedParking = 0;
var selectedElevator = 0;
var hashtagExist = true;

$.fn.clickRt = function () {
    $(this).click(function () {
        if (selectedRt !== 0) {
            $('#btnRt' + selectedRt).css('background-color', '');
        }
        $(this).css('background-color', '#b6e2f8');
        selectedRt = $(this).attr('id').split('btnRt')[1];
    })
}
$.fn.clickRi = function () {
    $(this).click(function () {
        if (selectedRi !== 0) {
            $('#btnRi' + selectedRi).css('background-color', '');
        }
        $(this).css('background-color', '#b6e2f8');
        selectedRi = $(this).attr('id').split('btnRi')[1];
    })
}
$.fn.clickAF = function () {
    $(this).click(function () {

        if (selectedAF !== 0) {
            $('#btnAF' + selectedAF).css('background-color', '');
        }
        $(this).css('background-color', '#b6e2f8');
        selectedAF = $(this).attr('id').split('btnAF')[1];
        if ($('#btnAF' + selectedAF).val() == "있음") {
            $('#inputAdminFee').removeAttr('readonly')
        } else {
            $('#inputAdminFee').val('');
            $("#inputAdminFee").attr("readonly", true);
            $("#btnAFL1").css('background-color', '');
            $("#btnAFL2").css('background-color', '');
            $("#btnAFL3").css('background-color', '');
            $("#btnAFL4").css('background-color', '');
            $("#btnAFL5").css('background-color', '');

            var keys = Object.keys(adminFeeList);
            for (var s in keys) {
                delete adminFeeList[keys[s]];
            }
        }
    })
}


$.fn.clickAFL = function () {
    $(this).click(function () {
        if ($('#btnAF' + selectedAF).val() == "있음") {
            if ($(this).css('background-color') === "rgb(182, 226, 248)") {
                $(this).css('background-color', '');
                switch ($(this).val()) {
                    case "가스비":
                        delete adminFeeList.btnAFL1;
                        break;
                    case "수도세":
                        delete adminFeeList.btnAFL2;
                        break;
                    case "전기세":
                        delete adminFeeList.btnAFL3;
                        break;
                    case "인터넷요금":
                        delete adminFeeList.btnAFL4;
                        break;
                    default:
                        delete adminFeeList.btnAFL5;
                        break;
                }
            } else {
                $(this).css('background-color', 'rgb(182, 226, 248)');
                switch ($(this).val()) {
                    case "가스비":
                        adminFeeList.btnAFL1 = "가스비";
                        break;
                    case "수도세":
                        adminFeeList.btnAFL2 = "수도세";
                        break;
                    case "전기세":
                        adminFeeList.btnAFL3 = "전기세";
                        break;
                    case "인터넷요금":
                        adminFeeList.btnAFL4 = "인터넷요금";
                        break;
                    default:
                        adminFeeList.btnAFL5 = "TV수신료";
                        break;
                }

            }
        }
    })
}
$.fn.clickHeat = function () {
    $(this).click(function () {
        if (selectedHeat !== 0) {
            $('#btnHeat' + selectedHeat).css('background-color', '');
        }
        $(this).css('background-color', '#b6e2f8');
        selectedHeat = $(this).attr('id').split('btnHeat')[1];
    })
}
$.fn.clickAnimal = function () {
    $(this).click(function () {
        if (selectedAnimal !== 0) {
            $('#btnAnimal' + selectedAnimal).css('background-color', '');
        }
        $(this).css('background-color', '#b6e2f8');
        selectedAnimal = $(this).attr('id').split('btnAnimal')[1];
    })
}
$.fn.clickParking = function () {
    $(this).click(function () {
        if (selectedParking !== 0) {
            $('#btnParking' + selectedParking).css('background-color', '');
        }
        $(this).css('background-color', '#b6e2f8');
        selectedParking = $(this).attr('id').split('btnParking')[1];
    })
}

$.fn.clickEv = function () {
    $(this).click(function () {
        if (selectedElevator !== 0) {
            $('#btnEv' + selectedElevator).css('background-color', '');
        }
        $(this).css('background-color', '#b6e2f8');
        selectedElevator = $(this).attr('id').split('btnEv')[1];
    })
}

$.fn.clickOp = function () {
    $(this).click(function () {
        if ($(this).css('background-color') === "rgb(182, 226, 248)") {
            $(this).css('background-color', '');
            switch ($(this).val()) {
                case "에어컨":
                    delete optionList.btnOption1;
                    break;
                case "세탁기":
                    delete optionList.btnOption2;
                    break;
                case "비데":
                    delete optionList.btnOption3;
                    break;
                case "책상":
                    delete optionList.btnOption4;
                    break;
                case "옷장":
                    delete optionList.btnOption5;
                    break;
                case "TV":
                    delete optionList.btnOption6;
                    break;
                case "신발장":
                    delete optionList.btnOption7;
                    break;
                case "냉장고":
                    delete optionList.btnOption8;
                    break;
                case "인덕션":
                    delete optionList.btnOption9;
                    break;
                case "가스레인지":
                    delete optionList.btnOption10;
                    break;
                case "전자레인지":
                    delete optionList.btnOption11;
                    break;
                case "전자도어락":
                    delete optionList.btnOption12;
                    break;
                case "현관문 안전장치":
                    delete optionList.btnOption13;
                    break;
                default:
                    delete optionList.btnOption14;
                    break;
            }
        } else {
            $(this).css('background-color', 'rgb(182, 226, 248)');
            switch ($(this).val()) {
                case "에어컨":
                    optionList.btnOption1 = "에어컨";
                    break;
                case "세탁기":
                    optionList.btnOption2 = "세탁기";
                    break;
                case "비데":
                    optionList.btnOption3 = "비데";
                    break;
                case "책상":
                    optionList.btnOption4 = "책상";
                    break;
                case "옷장":
                    optionList.btnOption5 = "옷장";
                    break;
                case "TV":
                    optionList.btnOption6 = "TV";
                    break;
                case "신발장":
                    optionList.btnOption7 = "신발장";
                    break;
                case "냉장고":
                    optionList.btnOption8 = "냉장고";
                    break;
                case "인덕션":
                    optionList.btnOption9 = "인덕션";
                    break;
                case "가스레인지":
                    optionList.btnOption10 = "가스레인지";
                    break;
                case "전자레인지":
                    optionList.btnOption11 = "전자레인지";
                    break;
                case "전자도어락":
                    optionList.btnOption12 = "전자도어락";
                    break;
                case "현관문 안전장치":
                    optionList.btnOption13 = "현관문 안전장치";
                    break;
                default:
                    optionList.btnOption14 = "침대";
                    break;
            }
        }
    })
}