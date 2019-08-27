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
var formData = new FormData();

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

    $.setInputAdminFee();

    $('#btnImg').click(selectFile);

    // $.imageArrBtn();
    $.setImage();
    changeArea();

    $('.img-wrap .close').click(function () {
        var imgId = $(this).closest('.img-wrap').find('img').data('id');
        var wrapId = $(this).closest('.img-wrap').data('id');
        var fileArray = formData.getAll("oldFile");
        var deleteName = $(this).parent().attr('name');
        for(let i=0; i<fileArray.length; i++){
            if(fileArray[i].name == deleteName){
                fileArray.splice(i, 1);
                break;
            }
        }
        formData.delete("oldFile");
        for(let i = 0;i<fileArray.length; i++){
            formData.append("oldFile", fileArray[i]);
        }
        $('#'+imgId).remove();
        $('#'+ wrapId).remove();
    });

    for(let i=1; i<=roomImgNum; i++){
        let fileName = $('#imgName'+i).val(); // 0817 파일 이름 가져오기
        let extName = fileName.slice(fileName.indexOf(".") + 1).toLowerCase();
        formData.append("oldFile",new File([""], fileName));
    }


})



function placesSearchCB(data, status) {
    if (status === kakao.maps.services.Status.OK) {
        allAddr.latitude = data[0].y;
        allAddr.longitude = data[0].x;
        dataSubmit();
    } else {
        // console.log("if조건에 안걸린다");
        Swal.fire({
            title: "",
            text: "없는 주소입니다.",
            type: "error",
            onAfterClose: () => {
                $('#inputAddr').focus();
            }
        });
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
        isNotChangeAddr: isNotChangeAddr,
        isNotChangeDtAddr: isNotChangeDtAddr
    };

    if(formData.get("uploadFile") == null && formData.get("oldFile") == null){
        return pleaseReenter('', '사진을 등록해주세요', '#tdImg');
    }else{
        $('#lastBtn').attr('disabled', true);
        $('#cancel').attr('disabled', true);
        $.ajax("/manage/room/update",{
            type: "POST",
            data: roomInfo
        }).then(function (data, status) {
            if (status === "success") {
                formData.append("roomId", $('#roomId').val());
                switch (data.updateResult) {
                    case "SUCCESS" :
                        $.ajax({
                            url: '/manage/updateImage',
                            processData: false,
                            contentType: false,
                            data: formData,
                            // dataType: 'json',
                            enctype: 'multipart/form-data',
                            type: 'POST'
                        }).then(function (data, status) {
                            if (status === "success") {
                                let result = eval("(" + data + ")");
                                switch (result.uploadResult) {
                                    case "SUCCESS" :
                                        Swal.fire('수정 성공', '방 수정에 성공하였습니다.', 'success')
                                            .then(function(){
                                                location.href="/manage";
                                            });
                                        break;
                                    case "FAIL" :
                                        Swal.fire('파일 수정 실패', '수정할 수 없습니다.', 'error');
                                        break;
                                }
                            } else {
                                Swal.fire('파일 연결 실패', '잠시후 다시 시도해주세요.', 'error');
                            }
                        });
                        break;
                    case "FAIL" :
                        Swal.fire('수정 실패', '수정할 수 없습니다.', 'error');
                        break;
                }
                // location.href="/manage";
            } else {
                Swal.fire('연결 실패', '잠시후 다시 시도해주세요.', 'error');
            }
            $('#lastBtn').attr('disabled', false);
            $('#cancel').attr('disabled', false);
        });
    }

}

var changeAddr = function () {
    Swal.fire('값변경');
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
            $('#btnRi2').css('background-color', '#b6e2f8');
            selectedRi = 2;
            break;
        case '2':
            $('#btnRi1').css('background-color', '#b6e2f8');
            selectedRi = 1;
            $('#inputPrice').attr("readonly", true);
            $('#inputDeposit').attr("placeholder", "전세");
            $('#inputPrice').val("0");
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

var selectFile = function () {
    $('#upload').trigger('click');
}

function readURL(input) {
    let td = $('#tdImg');
    let loopCnt = 0;
    if (input.files && input.files[0]) {
        for(let i=1; i<=input.files.length; i++){
            loopCnt++;
            // let index = i+cnt;
            let index = i+cnt+roomImgNum;
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
                formData.append("uploadFile", input.files[i-1]);
                $('#close'+index).deleteImage();
            }
            reader.readAsDataURL(input.files[i-1]);
        }
    }
    cnt += loopCnt;
}
$.fn.deleteImage = function () {
    $(this).click(function () {
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
            return pleaseReenter('', '매물종류를 선택하세요.', '#btnRt1');
        }

        check = 0;
        for (var i = 1; i <= 3; i++) {
            if ($('#btnRi' + i).css('background-color') === "rgb(182, 226, 248)") {
                check++;
            }
        }
        if (check === 0) {
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
        if (check === 0) {
            return pleaseReenter("", "관리비를 선택하세요.", '#btnAF1');
        }

        if ($('#btnAF2').css('background-color') === "rgb(182, 226, 248)") {
            check = 0;
            for (var i = 1; i <= 5; i++) {
                if ($('#btnAFL' + i).css('background-color') === "rgb(182, 226, 248)") {
                    check++;
                }
            }
            if (check === 0) {
                return pleaseReenter("", "관리비 포함 항목을 선택하세요.", '#btnAF1');
            }
        }

        check = 0;
        for (var i = 1; i <= 3; i++) {
            if ($('#btnHeat' + i).css('background-color') === "rgb(182, 226, 248)") {
                check++;
            }
        }
        if (check === 0) {
            return pleaseReenter("", "난방 종류를 선택하세요.", '#btnHeat1');
        }

        check = 0;
        for (var i = 1; i <= 2; i++) {
            if ($('#btnAnimal' + i).css('background-color') === "rgb(182, 226, 248)") {
                check++;
            }
        }
        if (check === 0) {
            return pleaseReenter("", "반려 동물 여부를 선택하세요.", '#btnAnimal1');
        }

        check = 0;
        for (var i = 1; i <= 2; i++) {
            if ($('#btnParking' + i).css('background-color') === "rgb(182, 226, 248)") {
                check++;
            }
        }
        if (check === 0) {
            return pleaseReenter("", "주차장 여부를 선택하세요.", '#btnParking1');
        }

        check = 0;
        for (var i = 1; i <= 2; i++) {
            if ($('#btnEv' + i).css('background-color') === "rgb(182, 226, 248)") {
                check++;
            }
        }
        if (check === 0) {
            return pleaseReenter("", "엘리베이터 여부를 선택하세요.", '#btnEv1');
        }

        check = 0;
        for (var i = 1; i <= 14; i++) {
            if ($('#btnOption' + i).css('background-color') === "rgb(182, 226, 248)") {
                check++;
            }
        }
        if (check === 0) {
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

        if(hash1 !== "")
            hashTagList.push($('#hash1').val());
        if(hash2 !== "")
            hashTagList.push($('#hash2').val());
        if(hash3 !== "")
            hashTagList.push($('#hash3').val());

        if(isNotChangeAddr){
            dataSubmit();
        } else {
            ps.keywordSearch($('#inputAddr').val(), placesSearchCB);
        }
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

        if(selectedRi == 1) {
            $('#inputPrice').attr("readonly", true);
            $('#inputDeposit').attr("placeholder", "전세");
            $('#inputDeposit').val("");
            $('#inputPrice').val("0");
        }else{
            $('#inputPrice').removeAttr('readonly');
            $('#inputDeposit').attr("placeholder", "보증금");
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
            //console.log(optionList);
        } else {
            $(this).css('background-color', 'rgb(182, 226, 248)');
            optionList.push($(this).val());
            //console.log(optionList)
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
$.fn.onlyNum = function() {
    $(this).keyup(function(event) {
        if (!(event.keyCode >=37 && event.keyCode<=40)) {
            var inputVal = $(this).val();
            $(this).val(inputVal.replace(/[a-zㄱ-힣,~`!@#$%^&*()_+=<>/]/gi,''));
        }
    });
}
function changeArea() {
    let area = Math.round($('#inputArea').val() / 3.305785);
    $('#inputSize').val(area);
}

$.setInputAdminFee = function() {
    if($('#btnAF2').css('background-color') === "rgb(182, 226, 248)"){
        $('#inputAdminFee').removeAttr('readonly')
    }
}