var totAddr = {};
var insectNum;
var insectLevel;
var noiseNum;
var noiseLevel;
var hashtagExist;
var ps = new kakao.maps.services.Places();
var imgLeft;
var sendData = {};

var x = 'x';
var formData = new FormData();

$(document).ready(function(){
    if(islogin === false){
        location.href="/review?page=1&order=latest";
    }

    starRating();
    $.resizeEvent();

    $('#btnCancel').click(function () {
        Swal.fire({
            title: "리뷰작성을 취소하시겠습니까?",
            type: 'warning',
            showCancelButton: true,
            confirmButtonColor: '#3085d6',
            cancelButtonColor: '#d33',
            confirmButtonText: '확인',
            cancelButtonText: '취소'
        }).then((result) => {
            if (result.value) {
                Swal.fire(
                    '리뷰작성이 취소되었습니다.',
                    "",
                    'success'
                ).then(function () {
                    location.href="/review?page=1&order=latest";
                });
            }
        })
    });

    $('#btnUpdate').click(function () {
        if(!$.validForm()) return;
        $.setValueFromImg();
        ps.keywordSearch($('#inputAddr').val(), placesSearchCB);
    })

    $('#inputPeriod').keyup(function() {

        var onlyNum = /^[0-9]*$/;
        let on1 = $('#inputPeriod').val();

        if(!onlyNum.test(on1)){
            Swal.fire('숫자만 입력가능합니다.', "", "warning").then(function () {
                $('#inputPeriod').val('');
                $('#inputPeriod').focus();
            })
        }
    })

    $('#btnAddr').click(function(){
        var getAddress = function() {
            new daum.Postcode({
                oncomplete: function(data) {
                    totAddr = data;
                    $('#inputAddr').attr("value", data.roadAddress);
                }
            }).open();
        };
        getAddress();
    })
})

$.resizeEvent = function() {
    $(window).resize(function(){
        $.setBounds();
    });
}

$.setBounds = function(){
    let width = $(window).width();
   // console.log("width: "+ width);
    if(width < 1070) return;
    let plus =  (width - 1070) / 2;
    $('.imgPreview').css('left', (imgLeft+plus));
}

function placesSearchCB (data, status, pagination) {
    if (status === kakao.maps.services.Status.OK) {
        totAddr.latitude = data[0].y;
        totAddr.longitude = data[0].x;

        // let formData = new FormData();
        let inputFile = $("input[name='uploadFile']");
        let files = inputFile[0].files;
        for(let i = 0; i < files.length; i++){
            formData.append("uploadFile", files[i]);
        }
        sendData = {
            title: defend($('#inputTitle').val()),
            detailAddr: defend($('#inputDetail').val()),
            residencePeriod: $('#inputPeriod').val(),
            periodUnit: $('#selPeriod').val(),
            score: $('#score').text(),
            content: defend($('#txtExplain').val()),
            advantage: defend($('#txtGood').val()),
            disadvantage: defend($('#txtBad').val()),
            insectLevel: insectLevel,
            noiseLevel: noiseLevel,
            hashtagExist: hashtagExist,
            totAddr: JSON.stringify(totAddr),
            hashTag1: defend($('#hashTag1').val()),
            hashTag2: defend($('#hashTag2').val()),
            hashTag3: defend($('#hashTag3').val())
        };
        if(formData.get("uploadFile") == null || $('.addimage').length != 1){
            Swal.fire('사진을 등록해주세요', '', 'warning');
            return;
        }
        Swal.fire({
            title: "리뷰 등록",
            text: "리뷰를 등록하시겠습니까?",
            type: "question",
            showCancelButton: true,
            confirmButtonColor: '#3085d6',
            confirmButtonText: '확인',
            cancelButtonColor: '#d33',
            cancelButtonText: '취소'
        }).then(result => {
            if (result.value) {
                $.reviewSubmit();
            }
        })
    }else {
        Swal.fire('없는 주소입니다.', "", "warning").then(function () {
            location.href = "";
        })
    }
}

$.reviewSubmit = function () {
    $('#btnUpdate').attr('disabled', true);
    $('#btnCancel').attr('disabled', true);
    $.ajax('/review/write', {
        type: 'POST',
        data: sendData
    }).then(function (data, status) {
        if (status === 'success') {
            let jobj = JSON.parse(data);
            switch (jobj.reviewWriteResult) {
                case "SUCCESS":
                    formData.append("reviewId", jobj.reviewId);
                    $.ajax({
                        url: '/review/uploadImage',
                        processData: false,
                        contentType: false,
                        data: formData,
                        enctype: 'multipart/form-data',
                        dataType: 'json',
                        type: 'POST'
                    }).then(function (data, status) {
                        if (status === "success") {
                            switch (data.uploadResult) {
                                case "SUCCESS" :
                                    Swal.fire('등록 완료', "리뷰 등록이 완료되었습니다.", "success").then(function () {
                                        location.href = "/review?page=1&order=latest";
                                    })
                                    break;
                                case "FAIL" :
                                    Swal.fire('등록 실패', '등록할 수 없습니다.', 'error').then(function () {
                                        $('#btnUpdate').attr('disabled', false);
                                        $('#btnCancel').attr('disabled', false);
                                    })
                                    break;
                            }
                        } else {
                            Swal.fire('연결 오류', '잠시 후 다시 시도해주세요.', 'error').then(function () {
                                $('#btnUpdate').attr('disabled', false);
                                $('#btnCancel').attr('disabled', false);
                            })
                        }
                    });
                    break;
                case "WRITE_FAIL":
                    Swal.fire('등록 실패', "리뷰 등록에 실패하였습니다.", "error").then(function () {
                        $('#btnUpdate').attr('disabled', false);
                        $('#btnCancel').attr('disabled', false);
                    })
                    break;
                case "NOT_LOGIN":
                    Swal.fire('로그인 필요', '로그인하지 않으면 작성할 수 없습니다.', 'error')
                        .then(function () {
                            location.href="/review?page=1&order=latest";
                        })
                    break;
                case "UNABLE_TO_WRITE":
                    Swal.fire('리뷰 작성 불가', '방을 등록한 사람은 리뷰를 작성할 수 없습니다.', 'error')
                        .then(function () {
                            location.href="/review?page=1&order=latest";
                        })
                    break;
            }
        } else {
            Swal.fire('연결 오류', '잠시 후 다시 시도해주세요.', 'error').then(function () {
                $('#btnUpdate').attr('disabled', false);
                $('#btnCancel').attr('disabled', false);
            })
        }
    })
}

var isEmpty = function(str) {
    if(str == "undefined" || str == null || str == "")
        return true;
    else
        return false;
}
var readFile = function(){
    $('#uploadFile').trigger('click');
}
var readName = function(input){

    let td = $('#tdImg');

    if (input.files && input.files[0]) {
        let imgName = input.files[0].name;
        let fileExt = imgName.slice(imgName.indexOf(".") + 1).toLowerCase();
        if(fileExt != "jpg" && fileExt != "png" &&  fileExt != "gif" &&  fileExt != "bmp"){
            Swal.fire('', '파일 첨부는 이미지 파일(jpg, png, gif, bmp)만 등록이 가능합니다,', 'warning');
            return;
        }

        let reader = new FileReader();
        reader.onload=function (e) {

            if($('.img-wrap') != null){
                formData.delete("uploadFile");
                $('.img-wrap').remove();
            }

            let img = $(''
                +'<div class="img-wrap" id=img-wrap name="'+imgName+'">'
                +'<span class="close" id=close>' + x + '</span>'
                +'<img class="addimage" data-id=rmimg src='+ e.target.result +' name="addImage"/>'
                +'</div>'
            );
            td.append(img);
            $('#close').click(function () {

                let rmDiv = $(this).parent()[0];
                formData.delete("uploadFile");
                rmDiv.remove();
            });
        }
        reader.readAsDataURL(input.files[0]);
    }
}

var starRating = function(){
    var $star = $(".star-input"),
        $result = $star.find("output>b");

    $(document)
        .on("focusin", ".star-input>.input",
            function(){
                $(this).addClass("focus");
            })

        .on("focusout", ".star-input>.input", function(){
            var $this = $(this);
            setTimeout(function(){
                if($this.find(":focus").length === 0){
                    $this.removeClass("focus");
                }
            }, 100);
        })

        .on("change", ".star-input :radio", function(){
            $result.text($(this).next().text());
        })
        .on("mouseover", ".star-input label", function(){
            $result.text($(this).text());
        })
        .on("mouseleave", ".star-input>.input", function(){
            var $checked = $star.find(":checked");
            if($checked.length === 0){
                $result.text("0");
            } else {
                $result.text($checked.next().text());
            }
        });
};

function good_b() {
    document.getElementById("normal_b").src = "/resources/img/etc/normal_b.png";
    document.getElementById("bad_b").src = "/resources/img/etc/bad_b.png";
    document.getElementById("good_b").src = "/resources/img/etc/good_a.png";
}
function normal_b() {
    document.getElementById("bad_b").src = "/resources/img/etc/bad_b.png";
    document.getElementById("good_b").src = "/resources/img/etc/good_b.png";
    document.getElementById("normal_b").src = "/resources/img/etc/normal_a.png";
}
function bad_b() {
    document.getElementById("good_b").src = "/resources/img/etc/good_b.png";
    document.getElementById("normal_b").src = "/resources/img/etc/normal_b.png";
    document.getElementById("bad_b").src = "/resources/img/etc/bad_a.png";
}
function good_b2() {
    document.getElementById("normal_b2").src = "/resources/img/etc/normal_b.png";
    document.getElementById("bad_b2").src = "/resources/img/etc/bad_b.png";
    document.getElementById("good_b2").src = "/resources/img/etc/good_a.png";
}
function normal_b2() {
    document.getElementById("bad_b2").src = "/resources/img/etc/bad_b.png";
    document.getElementById("good_b2").src = "/resources/img/etc/good_b.png";
    document.getElementById("normal_b2").src = "/resources/img/etc/normal_a.png";
}
function bad_b2() {
    document.getElementById("good_b2").src = "/resources/img/etc/good_b.png";
    document.getElementById("normal_b2").src = "/resources/img/etc/normal_b.png";
    document.getElementById("bad_b2").src = "/resources/img/etc/bad_a.png";
}

$.validForm = function (){
    let title =defend( $('#inputTitle').val());
    let addr = defend($('#inputAddr').val());
    let detail = defend($('#inputDetail').val());
    let period = $('#inputPeriod').val();
    let explain = defend($('#txtExplain').val());
    let good = defend($('#txtGood').val());
    let bad = defend($('#txtBad').val());
    if (title === "" || addr === "" || detail === "" || period === "" || explain === "" || good === "" || bad === ""){
        return false;
    }

    if (title.length > 50) {
        Swal.fire('','이름은 50자 이하입니다.');
        return false;
    }

    if (explain.length > 1000) {
        Swal.fire('','총 평가는 1000자 이하입니다.');
        return false;
    }

    if (good.length > 500) {
        Swal.fire('','장점은 500자 이하입니다.');
        return false;
    }

    if (explain.length > 500) {
        Swal.fire('','단점은 500자 이하입니다.');
        return false;
    }

    if($('#p1').prop("checked")==false&&$('#p2').prop("checked")==false&&$('#p3').prop("checked")==false&&$('#p4').prop("checked")==false&&$('#p5').prop("checked")==false){
        Swal.fire('','별점을 선택해주세요.');
        return false;
    }

    if($('#img1').prop("checked")==false&&$('#img2').prop("checked")==false&&$('#img3').prop("checked")==false){
        Swal.fire('','방충지수를 선택해주세요.');
        return false;
    }

    if($('#img4').prop("checked")==false&&$('#img5').prop("checked")==false&&$('#img6').prop("checked")==false){
        Swal.fire('','방음지수를 선택해주세요.');
        return false;
    }
    return true;
}

$.setValueFromImg = function(){
    for(var i=1;i<=3;i++){
        if($('#img'+i).prop("checked")==true){
            insectNum = i;
        }
    }
    switch (insectNum) {
        case 1:
            insectLevel = "H";
            break;
        case 2:
            insectLevel = "M";
            break;
        case 3:
            insectLevel = "L";
            break;
            deafult: break;
    }
    for(var i=4;i<=6;i++){
        if($('#img'+i).prop("checked")==true){
            noiseNum = i;
        }
    }
    switch (noiseNum) {
        case 4:
            noiseLevel = "H";
            break;
        case 5:
            noiseLevel = "M";
            break;
        case 6:
            noiseLevel = "L";
            break;
        default: break;
    }

    if($('#hashTag1').val() === "" && $('#hashTag2').val() === "" && $('#hashTag3').val() === ""){
        hashtagExist = "N";
    }
    else{
        hashtagExist = "Y";
    }
}

function checkLength(obj, maxlength) {
    let str = defend(obj.value);
    let str_length = str.length;

    let max_length = maxlength;
    let i = 0;
    let ko_byte = 0;
   // let li_len = 0;
    let one_char = "";
    let str2 = "";

    for (i = 0; i < str_length; i++) {
        one_char = str.charAt(i);
        ko_byte++;
    }

    if (ko_byte > max_length) {
        Swal.fire(max_length + " 글자 이상 입력할 수 없습니다.");
        str2 = str.substr(0, max_length);
        obj.value = str2;
    }
    obj.focus();
}