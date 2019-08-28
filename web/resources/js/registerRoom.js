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
            defend(hashTagList.push($('#hash1').val()));
        if($("#hash2").val() !== "")
            defend(hashTagList.push($('#hash2').val()));
        if($("#hash3").val() !== "")
            defend(hashTagList.push($('#hash3').val()));
        dataSubmit();
    } else {
        // console.log("if조건에 안걸린다");
        swalFocus("", "없는 주소입니다.", "error", "#inputAddr");
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
        detailAddr: defend($('#inputDetailAddr').val()),
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
        title: defend($('#inputTitle').val()),
        detail: defend($('#txtDetail').val()),
        hashtagExist: hashtagExist,
        hashtagList: defend(hashtagListString),
        // images: JSON.stringify(imgpath),
        imageList: imageListString,
    };
    // console.log(roomInfo);

    if(formData.get("uploadFile") == null){
        return pleaseReenter('', '사진을 등록해주세요', '#tdImg');
    }else{
        $('#lastBtn').attr('disabled', true);
        $('#cancel').attr('disabled', true);
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
            } else{
                Swal.fire('연결 실패', '잠시후 다시 시도해주세요.', 'error');
            }
            $('#lastBtn').attr('disabled', false);
            $('#cancel').attr('disabled', false);
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

            if(fileExt != "jpg" &&  fileExt != "jpeg" && fileExt != "png" &&  fileExt != "bmp"){
                Swal.fire('', '파일 첨부는 이미지 파일(jpg, jpeg, png, bmp)만 등록이 가능합니다,', 'warning');
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
            //console.log(allAddr);
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
        //console.log('클릭');

        // console.log($('#inputTitle').val());
        // console.log($('#hash1').val());
        // console.log($('#hash2').val());
        // console.log($('#hash3').val());

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
            return pleaseReenter('', '매물종류를 선택하세요.', '#btnRt1');
        }

        check = 0;
        for (var i = 1; i <= 3; i++) {
            if ($('#btnRi' + i).css('background-color') === "rgb(182, 226, 248)") {
                check++;
            }
        }
        if (check == 0) {
            return pleaseReenter('', "금액을 선택하세요.", '#btnRi1');
        }

        check = 0;
        if($('#inputDeposit').val() <= 210000 && $('#inputPrice').val() <= 210000 && $('#inputAdminFee').val() <= 210000){
            check++;
        }
        if(check == 0){
            if($('#inputDeposit').val() <= 210000){
                return pleaseReenter("보증금/월세/관리비를 확인하세요.", "210000이하로 입력하세요.", '#inputDeposit');
            }
            if($('#inputPrice').val() <= 210000){
                return pleaseReenter("보증금/월세/관리비를 확인하세요.", "210000이하로 입력하세요.", '#inputPrice');
            }
            if($('#inputAdminFee').val() <= 210000){
                return pleaseReenter("보증금/월세/관리비를 확인하세요.", "210000이하로 입력하세요.", '#inputAdminFee');
            }
        }

        check = 0;
        for (var i = 1; i <= 2; i++) {
            if ($('#btnAF' + i).css('background-color') === "rgb(182, 226, 248)") {
                check++;
            }
        }
        if (check == 0) {
            return pleaseReenter("", "관리비를 선택하세요.", '#btnAF1');
        }

        if ($('#btnAF2').css('background-color') === "rgb(182, 226, 248)") {
            check = 0;
            for (var i = 1; i <= 5; i++) {
                if ($('#btnAFL' + i).css('background-color') === "rgb(182, 226, 248)") {
                    check++;
                }
            }
            if (check == 0) {
                return pleaseReenter("", "관리비 포함 항목을 선택하세요.", '#btnAF1');
            }
        }

        check = 0;
        for (var i = 1; i <= 3; i++) {
            if ($('#btnHeat' + i).css('background-color') === "rgb(182, 226, 248)") {
                check++;
            }
        }
        if (check == 0) {
            return pleaseReenter("", "난방 종류를 선택하세요.", '#btnHeat1');

        }

        check = 0;
        for (var i = 1; i <= 2; i++) {
            if ($('#btnAnimal' + i).css('background-color') === "rgb(182, 226, 248)") {
                check++;
            }
        }
        if (check == 0) {
            return pleaseReenter("", "반려 동물 여부를 선택하세요.", '#btnAnimal1');
        }

        check = 0;
        for (var i = 1; i <= 2; i++) {
            if ($('#btnParking' + i).css('background-color') === "rgb(182, 226, 248)") {
                check++;
            }
        }
        if (check == 0) {
            return pleaseReenter("", "주차장 여부를 선택하세요.", '#btnParking1');
        }

        check = 0;
        for (var i = 1; i <= 2; i++) {
            if ($('#btnEv' + i).css('background-color') === "rgb(182, 226, 248)") {
                check++;
            }
        }
        if (check == 0) {
            return pleaseReenter("", "엘리베이터 여부를 선택하세요.", '#btnEv1');
        }

        check = 0;
        for (var i = 1; i <= 14; i++) {
            if ($('#btnOption' + i).css('background-color') === "rgb(182, 226, 248)") {
                check++;
            }
        }
        if (check == 0) {
            return pleaseReenter("", "옵션 항목을 선택하세요.", '#btnOption1');
        }
        if(on1 <= 0){
            return pleaseReenter("면적을 확인하세요.", "양수를 입력하세요.", '#inputSize');
        }

        let num_check = /^[-]?\d*$/g;
        if(!num_check.test($('#inputFloor').val())){
            return pleaseReenter("층수를 확인하세요.", "정수를 입력하세요.", '#inputFloor');
        }
        if($('#inputFloor').val() == ""){
            return pleaseReenter("", "층수를 입력하세요.", '#inputFloor');
        }

        if (!onlyNum.test(on2) || !onlyNum.test(on3) || !onlyNum.test(on4) || !onlyNum.test(on5)) {
            if (!onlyNum.test(on2)) {
                return pleaseReenter("금액을 확인하세요.","양의 정수를 입력하세요.", '#inputDeposit');
            } else if (!onlyNum.test(on3)) {
                return pleaseReenter("금액을 확인하세요.","양의 정수를 입력하세요.", '#inputPrice');
            } else if (!onlyNum.test(on4)) {
                return pleaseReenter("관리비를 확인하세요.","양의 정수를 입력하세요.", '#inputAdminFee');
            } else {
                return pleaseReenter("임대기간을 확인하세요.","양의 정수를 입력하세요.", '#inputPeriodNum');
            }
            return;
        }
        if (on1 == "" || on3 == "" || on5 == "" || $('#inputTitle').val() == "" || $('#txtDetail').val() == "" || $('#inputAddr').val() == "") {
            if ($('#inputAddr').val() == "") {
                return pleaseReenter("","주소를 입력하세요.", '#inputAddr');
            } else if (on1 == "") {
                return pleaseReenter("","면적을 입력하세요.", '#inputSize');
            } else if (on3 == "") {
                return pleaseReenter("","금액을 입력하세요.", '#inputPrice');
            } else if (on5 == "") {
                return pleaseReenter("","임대기간을 입력하세요.", '#inputPeriodNum');
            } else if ($('#inputTitle').val() == "") {
                return pleaseReenter("","제목을 입력하세요.", '#inputTitle');
            } else if ($('#txtDetail').val() == "") {
                return pleaseReenter("","상세 설명을 입력하세요.", '#txtDetail');
            } else {
                ;
            }

            return;
        }
        if (on4 == "") {
            if ($('#btnAF2').css('background-color') === "rgb(182, 226, 248)") {
                return pleaseReenter("","관리비를 입력하세요.", '#inputAdminFee');
            }
        }

        if(defend($('#inputDetailAddr').val()).length > 100) {
            return pleaseReenter("","상세 주소는 30자를 넘을 수 없습니다.", '#inputDetailAddr');
        }

        if(defend($('#inputTitle').val()).length > 150) {
            return pleaseReenter("","제목은 50자를 넘을 수 없습니다.", '#inputTitle');
        }

        let hash1 = defend($('#hash1').val());
        let hash2 = defend($('#hash2').val());
        let hash3 = defend($('#hash3').val());

        if(hash1.includes('#') == true || hash2.includes('#') == true || hash3.includes('#') == true){
            if(hash1.includes('#') == true){
                return pleaseReenter("해시태그를 확인하세요.","#은 사용할 수 없습니다.", '#hash1');
            }
            if(hash2.includes('#') == true){
                return pleaseReenter("해시태그를 확인하세요.","#은 사용할 수 없습니다.", '#hash2');
            }
            if(hash3.includes('#') == true){
                return pleaseReenter("해시태그를 확인하세요.","#은 사용할 수 없습니다.", '#hash3');
            }
        }

        if (hash1.length > 30 || hash2.length > 30 || hash3.length > 30) {
            return pleaseReenter("","해시태그는 10자를 넘을 수 없습니다.", '#hash1');
        }

        if($('.addimage').length<2 || $('.addimage').length>10){
            return pleaseReenter("","사진을 2~10장 올려주세요", '.addimage');
        }


        if (hash1 == "" && hash2 == "" && hash3 == "") {
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

        if(selectedRi == 1) {
            $('#inputPrice').attr("readonly", true);
            $('#inputDeposit').val("");
            $('#inputPrice').val("0");
        }else{
            $('#inputPrice').removeAttr('readonly');
            $('#inputDeposit').val("");
            $('#inputPrice').val("");
        }
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
            $('#inputAdminFee').removeAttr('readonly');
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
            //console.log(optionList);
        } else {
            $(this).css('background-color', 'rgb(182, 226, 248)');
            optionList.push($(this).val());
            //console.log(optionList)
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