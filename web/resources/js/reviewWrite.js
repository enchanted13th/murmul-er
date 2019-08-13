var totAddr = {};
var insectNum;
var insectLevel;
var noiseNum;
var noiseLevel;
var hashtagExist;
var ps = new kakao.maps.services.Places();

$(document).ready(function(){
    if(islogin === false){
        location.href="/review?page=1&order=latest";
    }
    starRating();

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

function placesSearchCB (data, status, pagination) {
    if (status === kakao.maps.services.Status.OK) {
        totAddr.latitude = data[0].y;
        totAddr.longitude = data[0].x;
        let sendData = {
            title: $('#inputTitle').val(),
            detailAddr: $('#inputDetail').val(),
            residencePeriod: $('#inputPeriod').val(),
            periodUnit: $('#selPeriod').val(),
            score: $('#score').text(),
            content: $('#txtExplain').val(),
            advantage: $('#txtGood').val(),
            disadvantage: $('#txtBad').val(),
            insectLevel: insectLevel,
            noiseLevel: noiseLevel,
            hashtagExist: hashtagExist,
            totAddr: JSON.stringify(totAddr),
            hashTag1: $('#hashTag1').val(),
            hashTag2: $('#hashTag2').val(),
            hashTag3: $('#hashTag3').val()
        };
        $.ajax('/review/write', {
            type: 'POST',
            data: sendData
        }).then(function (data, status) {
            if (status === 'success') {
                var obj = JSON.parse(data);
                switch (obj.reviewWriteResult) {
                    case "SUCCESS":
                        Swal.fire('리뷰 등록이 완료되었습니다.', "", "success").then(function () {
                            location.href = "/review?page=1&order=latest";
                        })
                        break;
                    case "WRITE_FAIL":
                        Swal.fire('리뷰 등록에 실패하였습니다.', "", "error");
                        break;
                }
            }
        })
    }else {
        Swal.fire('없는 주소입니다.', "", "warning").then(function () {
            location.href = "";
        })
    }
}

var isEmpty = function(str) {
    if(str == "undefined" || str == null || str == "")
        return true;
    else
        return false;
}
var readFile = function(){
    $('#imgUpload').trigger('click');
}
var readName = function(){
    $('#fileName').text($('#imgUpload')[0].files[0].name);
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
            // console.log($result.text($(this).next().text()));
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
    let title = $('#inputTitle').val();
    let addr = $('#inputAddr').val();
    let detail = $('#inputDetail').val();
    let period = $('#inputPeriod').val();
    let explain = $('#txtExplain').val();
    let good = $('#txtGood').val();
    let bad = $('#txtBad').val();
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