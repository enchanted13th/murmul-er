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
var selectedElevator = 0;
var hashtagExist = true;
var x = 'x';
var cnt = 0;

var formData = new FormData();

var ps = new kakao.maps.services.Places();

$(document).ready(function () {
    $('#btnPutRoom').parent().css('border-bottom', '6px solid #b6e2f8');
    // javascript:scroll(0, 0);
    $.clickEvent();
    $.imagebutton();
    $('#btnImg').click(selectFile);

})

function placesSearchCB(data, status) {
    if (status === kakao.maps.services.Status.OK) {
        // console.log('placesSearchCB status ok');
        // console.log('data:', data);
        allAddr.latitude = data[0].y;
        allAddr.longitude = data[0].x;
        // console.log(allAddr);
        if($("#hash1").val() !== "")
            hashTagList.push($('#hash1').val());
        if($("#hash2").val() !== "")
            hashTagList.push($('#hash2').val());
        if($("#hash3").val() !== "")
            hashTagList.push($('#hash3').val());
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
    };
    // console.log(roomInfo);

    if(formData.get("uploadFile") == null){
        Swal.fire('사진을 등록해주세요', '', 'warning');
    }else{
        $.ajax("/manage/room",{
            type: "POST",
            data: roomInfo
        }).then(function (data, status) {
            if (status === "success") {
                switch (data.registerResult) {
                    case "SUCCESS" :
                        $.ajax({
                            url: '/manage/uploadImage',
                            processData: false,
                            contentType: false,
                            data:formData,
                            dataType: 'json',
                            type: 'POST'
                        }).then(function (data, status) {
                            if (status === "success") {
                                switch (data.uploadResult) {
                                    case "SUCCESS" :
                                        Swal.fire('등록 성공', '방 등록에 성공하였습니다.', 'success')
                                            .then(function(){
                                                location.href="/manage";
                                            });
                                        break;
                                    case "FAIL" :
                                        Swal.fire('파일 등록 실패', '등록할 수 없습니다.', 'error');
                                        break;
                                }
                            } else {
                                Swal.fire('파일 연결 실패', '잠시후 다시 시도해주세요.', 'error');
                            }
                        });
                        break;
                    case "FAIL" :
                        Swal.fire('등록 실패', '등록할 수 없습니다.', 'error');
                        break;
                }
            } else {
                Swal.fire('연결 실패', '잠시후 다시 시도해주세요.', 'error');
            }
        });
    }

}

var changeAddr = function () {
    ps.keywordSearch($('#inputAddr'), placesSearchCB);
}

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
            let fileExt = imgName.slice(imgName.indexOf(".") + 1).toLowerCase(); // 파일 확장자를 잘라내고, 비교를 위해 소문자로

            if(fileExt != "jpg" && fileExt != "png" &&  fileExt != "gif" &&  fileExt != "bmp"){
                Swal.fire('', '파일 첨부는 이미지 파일(jpg, png, gif, bmp)만 등록이 가능합니다,', 'warning');
                return;
            }

            let reader = new FileReader();
            reader.onload = function (e) {
                let img = $(''
                    +'<div class="img-wrap" id=img-wrap'+ index +' name="'+imgName+'">'
                    +'<span class="close" id=close'+ index +'>' + x + '</span>'
                    +'<img class="addimage" data-id=rmimg'+ index +' src='+ e.target.result +' name="addImage"/>'
                    +'</div>'
                );
                td.append(img);
                $('#close'+index).click(function () {

                    let rmDiv = $(this).parent()[0];
                    let num;
                    let imgDiv = $('.img-wrap');
                    for(let i = 0; i < imgDiv.length; i++) {
                        if (imgDiv[i] == rmDiv) {
                            num = i;
                        }
                    }
                    var fileArray = formData.getAll("uploadFile");
                    fileArray.splice(num, 1);
                    formData.delete("uploadFile");
                    for(let i = 0;i<fileArray.length; i++){
                        formData.append("uploadFile", fileArray[i]);
                    }
                    rmDiv.remove();

                });
            }
            reader.readAsDataURL(input.files[i-1]);
        }

        var inputFile = $("input[name='uploadFile']");
        var files = inputFile[0].files;
        for(var i = 0; i < files.length; i++){
            formData.append("uploadFile", files[i]);
        }
    }
    cnt += loopCnt;
}

$.fn.changeSize = function() {
    $(this).keyup(function(event) {
        if (!(event.keyCode >=37 && event.keyCode<=40)) {
            var inputVal = $(this).val();
            $(this).val(inputVal.replace(/[a-zㄱ-힣,~`!@#$%^&*()_+=<>/]/gi,''));
        }
        let area = parseFloat($('#inputSize').val() * 3.305785).toFixed(2);
        $('#inputArea').val(area);
    });
}

$.fn.changeArea = function() {
    $(this).keyup(function(event) {
        if (!(event.keyCode >=37 && event.keyCode<=40)) {
            var inputVal = $(this).val();
            $(this).val(inputVal.replace(/[a-zㄱ-힣,~`!@#$%^&*()_+=<>/]/gi,''));
        }
    });
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
            console.log(allAddr);
            $('#inputAddr').attr("value", data.roadAddress);
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

    $("#lastBtn").clickSubmit();
    $('#cancel').clickCancelBtn("/manage");
}

$.fn.clickSubmit = function() {
    $(this).click(function () {

        console.log($('#inputTitle').val());

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
        if($('#inputDeposit').val() <= 210000 && $('#inputPrice').val() <= 210000 && $('#inputAdminFee').val() <= 210000){
            check++;
        }
        if(check == 0){
            document.getElementById('inputDeposit').scrollIntoView();
            alert("가격정보중 잘못된 입력값이 있습니다.");
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

        if (!onlyNum.test(on2) || !onlyNum.test(on3) || !onlyNum.test(on4) || !onlyNum.test(on5)) {
            alert("숫자만 입력하세요.");
            if (!onlyNum.test(on2)) {
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

        if($('.addimage').length<2 || $('.addimage').length>10){
            alert("사진을 2~10장 올려주세요");
            return;
        }

        if ($('#hash1').val() == "" && $('#hash2').val() == "" && $('#hash3').val() == "") {
            hashtagExist = false;
        } else {
            hashtagExist = true;
        }

        Swal.fire({
            title: "방 등록",
            text: "방을 등록하시겠습니까?",
            type: "question",
            showCancelButton: true,
            confirmButtonColor: '#3085d6',
            confirmButtonText: '확인',
            cancelButtonColor: '#d33',
            cancelButtonText: '취소'
        }).then(result => {
            if (result.value) {
                ps.keywordSearch($('#inputAddr').val(), placesSearchCB);
            }
        })
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

$.fn.onlyNum = function() {
    $(this).keyup(function(event) {
        if (!(event.keyCode >=37 && event.keyCode<=40)) {
            var inputVal = $(this).val();
            $(this).val(inputVal.replace(/[a-zㄱ-힣,~`!@#$%^&*()_+=<>/]/gi,''));
        }
    });
}