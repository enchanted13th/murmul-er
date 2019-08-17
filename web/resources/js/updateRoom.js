var allAddr = {};
var adminFeeList = [];
var optionList = [];
var hashTagList = [];
var imageList = [];

var selectedRt = 0;
var selectedRi = 0;
var selectedAF = 0;
var selectedHeat = 0;
var selectedAnimal = 0;
var selectedParking = 0;
var selectedEv = 0;

var hashtagExist = true;
var isNotChangeAddr = true;
var isNotChangeDtAddr = true;
var ps = new kakao.maps.services.Places();

var x = 'x';
var cnt = 0;

$(document).ready(function () {
    $.clickEvent();
    $.imagebutton();

    $.colorRoomBtn($('#roomType').val());
    $.colorRentBtn($('#rentType').val());
    $.colorManageBtn($('#isMangeCost').val());
    $.colorHeatBtn($('#heat').val());
    $.checkPeriodUnit($('#periodUnit').val());
    $.colorArrBtn($('#option').val(), $('#optionLen').val(),'option');
    $.colorArrBtn($('#manage').val(), $('#manageLen').val(),'manage');

    changeArea();
    $('#btnImg').click(selectFile);

    // $.imageArrBtn();
    $.setImage();

    $('.img-wrap .close').click(function () {
        var imgId = $(this).closest('.img-wrap').find('img').data('id');
        var wrapId = $(this).closest('.img-wrap').data('id');
        $('#'+imgId).remove();
        $('#'+ wrapId).remove();
    });
})



function placesSearchCB(data, status) {
    if (status === kakao.maps.services.Status.OK) {
        allAddr.latitude = data[0].y;
        allAddr.longitude = data[0].x;
        dataSubmit();
    } else {
        // console.log("if조건에 안걸린다");
        Swal.fire("","없는 주소입니다.","error");
    }
}

function convertList(list){
    let listString = "";
    for(let i = 0; i < list.length; i++){
        listString += list[i];
        if(i < list.length-1) listString += ",";
    }
    return listString;
}

function dataSubmit(){
    let adminFeeListString = convertList(adminFeeList);
    let optionListString = convertList(optionList);
    let hashtagListString = convertList(hashTagList);
    let imageListString = convertList(imageList.push($('#images').val()));

    let roomInfo = {
        roomId: $('#roomId').val(),
        allAddr: JSON.stringify(allAddr),
        detailAddr: $('#inputDetailAddr').val(),
        area: $('#inputArea').val(),
        floor: $('#inputFloor').val(),
        periodNum: $('#inputPeriodNum').val(),
        periodUnit: $('#inputPeriodUnit').val(),
        deposit: $('#inputDeposit').val() * 10000,
        price: $('#inputPrice').val() * 10000,
        priceType: $('#btnRi' + selectedRi).val(),
        adminFee: $('#inputAdminFee').val() * 10000,
        adminFeeList: adminFeeListString,
        roomType: $('#btnRt' + selectedRt).val(),
        heatType: $('#btnHeat' + selectedHeat).val(),
        optionList: optionListString,
        title: $('#inputTitle').val(),
        detail: $('#txtDetail').val(),
        hashtagExist: hashtagExist,
        hashtagList: hashtagListString,
        // images: JSON.stringify(imgpath),
        imageList: imageListString,
        isNotChangeAddr: isNotChangeAddr,
        isNotChangeDtAddr: isNotChangeDtAddr
    };

    $.ajax("/manage/room/update",{
        type: "POST",
        data: roomInfo
    }).then(function (data, status) {
        console.log(data+"\n"+status);
        if (status === "success") {
            switch (data.updateResult) {
                case "SUCCESS" : break;
                case "FAIL" : break;
            }
            location.href="/manage";
        } else {
            console.log(data, status);
        }
    });
}

var changeAddr = function () {
    alert('값변경');
    ps.keywordSearch($('#inputAddr'), placesSearchCB);
}


$.colorRoomBtn = function(value) {
    switch (value) {
        case "AP":
            $('#btnRt5').css('background-color', '#b6e2f8');
            selectedRt = 5;
            break;
        case "OP":
            $('#btnRt4').css('background-color', '#b6e2f8');
            selectedRt = 4;
            break;
        case "VI":
            $('#btnRt3').css('background-color', '#b6e2f8');
            selectedRt = 3;
            break;
        case "TR":
            $('#btnRt2').css('background-color', '#b6e2f8');
            selectedRt = 2;
            break;
        case "OR":
            $('#btnRt1').css('background-color', '#b6e2f8');
            selectedRt = 1;
            break
    }
}

$.colorManageBtn = function(value) {
    switch (value) {
        case '0':
            $('#btnAF1').css('background-color', '#b6e2f8');
            selectedAF = 1;
            break;
        default :
            $('#btnAF2').css('background-color', '#b6e2f8');
            selectedAF = 2;
            break;
    }
}

$.colorHeatBtn = function(value) {
    switch (value) {
        case '1':
            $('#btnHeat1').css('background-color', '#b6e2f8');
            selectedHeat = 1;
            break;
        case '2':
            $('#btnHeat2').css('background-color', '#b6e2f8');
            selectedHeat = 2;
            break;
        case '3':
            $('#btnHeat3').css('background-color', '#b6e2f8');
            selectedHeat = 3;
            break;
    }
}

$.colorRentBtn = function(value) {
    switch (value) {
        case '1':
            $('#btnRi1').css('background-color', '#b6e2f8');
            selectedRi = 1;
            break;
        case '2':
            $('#btnRi2').css('background-color', '#b6e2f8');
            selectedRi = 2;
            break;
        case '3':
            $('#btnRi3').css('background-color', '#b6e2f8');
            selectedRi = 3;
            break;
    }
}

$.checkPeriodUnit = function(unit) {
    switch (unit) {
        case 'Y':
            $('option#Y').attr("selected","selected");
            break;
        case 'M':
            $('option#M').attr("selected","selected");
            break;
        case 'W':
            $('option#W').attr("selected","selected");
            break;
    }
}

$.colorArrBtn = function(arr, len, type){
    let pflag = false;
    let aflag = false;
    let eflag = false;
    arr = arr.substring(1, arr.length-1).split(", ");
    if(type === 'option') {
        for (let i = 0; i < arr.length; i++) {
            let num = arr[i] * 1;
            if(num <= 14){
                $('#btnOption' + num).css('background-color', '#b6e2f8');
                if(num !=0)
                    optionList.push($('#btnOption' + num).val());
            }
            else if(num == 15){
                $('#btnAnimal2').css('background-color', '#b6e2f8');
                selectedAnimal = 2;
                aflag = true;
            }
            else if(num == 16){
                $('#btnEv2').css('background-color', '#b6e2f8');
                selectedEv = 2;
                eflag = true;
            }
            else if(num == 17){
                $('#btnParking2').css('background-color', '#b6e2f8');
                selectedParking = 2;
                pflag = true;
            }
        }
        if(aflag === false){
            $('#btnAnimal1').css('background-color', '#b6e2f8');
            selectedAnimal = 1;
        }
        if(eflag === false){
            $('#btnEv1').css('background-color', '#b6e2f8');
            selectedEv = 1;
        }
        if(pflag === false){
            $('#btnParking1').css('background-color', '#b6e2f8');
            selectedParking = 1;
        }

    }
    else if(type === 'manage'){
        for (let i = 0; i < arr.length; i++) {
            let num = arr[i] * 1;
            $('#btnAFL' + num).css('background-color', '#b6e2f8');
            if(num !=0)
                adminFeeList.push($('#btnAFL'+num).val());
        }

    }
}

// function readURL(input) {
//     if (input.files && input.files[0]) {
//         var reader = new FileReader();
//         reader.onload = function (e) {
//             $('#rmimg1').attr('src', e.target.result);
//         }
//         reader.readAsDataURL(input.files[0]);
//     }
// }
var selectFile = function () {
    $('#upload').trigger('click');
}

function readURL(input) {
    let td = $('#tdImg');
    let loopCnt = 0;
    if (input.files && input.files[0]) {
        for(let i=1; i<=input.files.length; i++){
            loopCnt++;
            let index = i+cnt;
            let imgName = input.files[i-1].name;
            console.log("파일 : " + input.files[i-1]);
            console.log("파일 명 : " + imgName);
            let fileExt = imgName.slice(imgName.indexOf(".") + 1).toLowerCase(); // 파일 확장자를 잘라내고, 비교를 위해 소문자로

            if(fileExt != "jpg" && fileExt != "png" &&  fileExt != "gif" &&  fileExt != "bmp"){
                Swal.fire('', '파일 첨부는 이미지 파일(jpg, png, gif, bmp)만 등록이 가능합니다,', 'warning');
                return;
            }

            let reader = new FileReader();
            reader.onload = function (e) {
                let img = $(''
                    +'<div class="img-wrap" id=img-wrap'+ index +'>'
                    +'<span class="close" id=close'+ index +'>' + x + '</span>'
                    +'<img class="addimage" data-id=rmimg'+ index +' src='+ e.target.result +' name="addImage"/>'
                    +'</div>'
                );
                td.append(img);
                $('#close'+index).click(function () {
                    var id = $(this).closest('.img-wrap').find('img').data('id');
                    $('#close'+index).remove();
                    $('#img-wrap'+ index).remove();
                });
            }
            reader.readAsDataURL(input.files[i-1]);
        }
    }
    cnt += loopCnt;
}

function changeSize() {
    let area = parseFloat($('#inputSize').val() * 3.305785).toFixed(2);
    $('#inputArea').val(area);
}

function changeArea() {
    let area = Math.round($('#inputArea').val() / 3.305785);
    $('#inputSize').val(area);
}

function clear() {
    $('#inputDetailAddr').val('');
}

var getAddress = function () {
    new daum.Postcode({
        oncomplete: function (data) {
            allAddr = data;
            isNotChangeAddr = false;
            $('#inputAddr').attr("value", data.roadAddress);
            clear();
        }
    }).open();
};
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
        getAddress();
    })

    $('#addimage').click(function () {
        /*alert('사진추가팝업창');*/
    })
    $('.addimage').hover();
    $('.previmage').hover();
    $('.option').clickOp();

    $('#inputDetailAddr').changeDA();
    $("#lastBtn").clickSubmit();
    $('#cancel').clickCancelBtn("/manage");
}

$.fn.clickSubmit = function(){
    $(this).click(function () {

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
        if (check === 0) {
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
        if (check === 0) {
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
        if (check === 0) {
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
            if (check === 0) {
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
        if (check === 0) {
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
        if (check === 0) {
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
        if (check === 0) {
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
        if (check === 0) {
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
        if (check === 0) {
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

        if(isNotChangeAddr){
            dataSubmit();
        } else {
            ps.keywordSearch($('#inputAddr').val(), placesSearchCB);
        }

        if($('#hash1').val() !== "")
            hashTagList.push($('#hash1').val());
        if($('#hash2').val() !== "")
            hashTagList.push($('#hash2').val());
        if($('#hash3').val() !== "")
            hashTagList.push($('#hash3').val());
    });
}

$.fn.changeDA = function(){
    $(this).keyup(function () {
        if(isNotChangeDtAddr)
            isNotChangeDtAddr = false;
    })

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

            adminFeeList = [];
        }
    })
}

$.fn.clickAFL = function () {
    $(this).click(function () {
        if ($('#btnAF' + selectedAF).val() == "있음") {
            if ($(this).css('background-color') === "rgb(182, 226, 248)") {
                $(this).css('background-color', '');
                for(let i = 0 ; i < adminFeeList.length; i++){
                    if(adminFeeList[i] === $(this).val())
                        adminFeeList.splice(i,1);
                    //delete adminFeeList[i];
                }
                // console.log(adminFeeList);
            } else {
                $(this).css('background-color', 'rgb(182, 226, 248)');
                adminFeeList.push($(this).val());
                // console.log(adminFeeList);
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
            for(let i=0;i < optionList.length; i++){
                if(optionList[i] === "반려동물 가능")
                    optionList.splice(i,1);
            }
        }
        $(this).css('background-color', '#b6e2f8');
        selectedAnimal = $(this).attr('id').split('btnAnimal')[1];
        if(selectedAnimal != 1)
            optionList.push($("#btnAnimal2").val());
    })
}

$.fn.clickEv = function () {
    $(this).click(function () {
        if (selectedEv !== 0) {
            $('#btnEv' + selectedEv).css('background-color', '');
            for(let i=0;i < optionList.length; i++) {
                if (optionList[i] === "엘리베이터 가능")
                    optionList.splice(i, 1);
            }
        }
        $(this).css('background-color', '#b6e2f8');
        selectedEv = $(this).attr('id').split('btnEv')[1];
        if(selectedEv != 1)
            optionList.push($("#btnEv2").val());
    })
}

$.fn.clickParking = function () {
    $(this).click(function () {
        if (selectedParking !== 0) {
            $('#btnParking' + selectedParking).css('background-color', '');
            for(let i=0;i < optionList.length; i++) {
                if (optionList[i] === '주차 가능') {
                    optionList.splice(i, 1);
                }
            }
        }
        $(this).css('background-color', '#b6e2f8');
        selectedParking = $(this).attr('id').split('btnParking')[1];
        if(selectedParking != 1)
            optionList.push(($("#btnParking2").val()));
    })
}

$.fn.clickOp = function () {
    $(this).click(function () {
        if ($(this).css('background-color') === "rgb(182, 226, 248)") {
            $(this).css('background-color', '');
            for(let i = 0 ; i < optionList.length; i++){
                if(optionList[i] === $(this).val()) {
                    optionList.splice(i, 1);
                }
            }
            console.log(optionList);
        } else {
            $(this).css('background-color', 'rgb(182, 226, 248)');
            optionList.push($(this).val());
            console.log(optionList)
        }
    })
}
$.setImage = function(){
    for(let i = 1; i <= roomImgNum; i++) {
        let value = $('#roomValue' + i).val().split(',');
        let roomId = value[0];
        let fileName = value[1];
        let src = '/manage/download?middlePath=/room/roomId_' + encodeURI(roomId) + '&imageFileName=' + encodeURI(fileName);
        $('#rmimg' + i).attr('src', src);
    }
}


