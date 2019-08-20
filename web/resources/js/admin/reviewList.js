var reviewId;
var review;
var middlePath;
var writeDate;

$(document).ready(function () {

})

$('.title').click(function () {
    reviewId = this.id;
    writeDate = this.parentNode.id;

    $.ajax('/review/popup', {
        type: 'POST',
        data: {reviewId: reviewId},
        dataType: "json"
    }).then(function (data, status) {
        if(status === 'success') {
            review = data.review;
            if (data.reviewResult == 'SUCCESS') {
                $.reviewPopup();
            } else {
                Swal.fire('상세 보기 실패', "", "error");
            }
        }
    })
})

$.reviewPopup = function() {
    if($('.reviewPopup').length === 0 ) {
        $(document.body).css('overflow', 'hidden');
        let popup = $(''
            + '<div class="reviewPopup" id="reviewPopup">'
            + '<div class="element">'
            + '<div class="topText" style="display: flex;">'
            + '<span class="space">' + writeDate + '</span>'
            + '<span class="space">|</span>'
            + '<span>' + review.residencePeriod + '</span><span class="period" id="space"></span> <span style="flex: auto"> 거주</span>'
            + '<input class="periodUnit" type="hidden" value="' + review.periodUnit + '">'
            + '<span class="close">' + "x" + '</span>'
            + '</div>'
            + '<div class="title">'
            + '<span class="textTitle">' + review.title + '</span>'
            + '</div>'
            + '<div class="location">'
            + '<span>' + review.sido + ' ' + review.sigungu + ' ' + review.roadname + ' ' + review.detailAddr + '</span>'
            + '</div>'
            + '<div class="content">'
            + '<div class="picture">'
            + '<img class="room" id="preview" src="" style="width:400px; height:400px;" align="middle"/>'
            + '<input type="hidden" id="upload" value="/review/reviewId_' + review.id + ',' + review.image + '">'
            + '<div class="hashtag">'
            + '<input type="hidden" id="hashTagCnt" value="' + review.hashTagList.length + '">'
            + '<input type="hidden" id="hashTag" value=' + review.hashTagList + '>'
            + '<span id="hash1"></span>'
            + '<span id="hash2"></span>'
            + '<span id="hash3"></span>'
            + '</div>'
            + '</div>'
            + '<div class="text">'
            + '<div class="overall">'
            + '<span class="textTitle">총 평가</span>'
            + '<img class="rank" src=""/>'
            + '<input class="score" type="hidden" value="' + review.score + '">'
            + '</div>'
            + '<div class="review_text">'
            + review.content
            + '</div>'
            + '<div class="good">'
            + '<div class="textTitle">장점</div>'
            + '</div>'
            + '<div>'
            + review.advantage
            + '</div>'
            + '<div class="bad">'
            + '<div class="textTitle">단점</div>'
            + '<div>'
            + '<div>'
            + review.disadvantage
            + '</div>'
            + '<div class="level">'
            + '<span class="textTitle">방충지수</span>'
            + '<img class="insect" src="">'
            + '<input class="insectVal" type="hidden" value="' + review.insectLevel + '">'
            + '<span class="textTitle">방음지수</span>'
            + '<img class="noise" src="">'
            + '<input class="noiseVal" type="hidden" value="' + review.noiseLevel + '">'
            + '</div>'
            + '</div>'
            + '</div>'
            + '</div>'
            + '</div>'
            +'<div class="btns">'
            + '<button class="btnDelete">'
            + "삭제"
            +'</button>'
            +'</div>').appendTo($('body'));

        $.checkInsectLevel($('.insectVal'));
        $.checkNoiseLevel($('.noiseVal'));
        $.checkScore($('.score'));
        $.checkPeriodUnit($('.periodUnit'));
        $.setMiddlePath($("#uploadValue"));
        $.setImage();
        $.setHashTag();
        $('.close').click(function () {
            $(document.body).css('overflow', '');
            $('body').find('#reviewPopup').remove();
        });

        let wh = $(window).height();
        let ph = $('.element').height();
        let top = (wh - ph) / 2;
        popup.children('div').css('margin-top', top);

        $('.btnDelete').click(function () {
            Swal.fire({
                title: "삭제하기",
                text: "정말로 삭제하시겠습니까?",
                type: "warning",
                showCancelButton: true,
                confirmButtonColor: '#3085d6',
                confirmButtonText: '확인',
                cancelButtonColor: '#d33',
                cancelButtonText: '취소'
            }).then(result => {
                if (result.value) { // 확인 눌렀을 때
                    let ids ="";
                    ids += reviewId;
                    $.deleteOne(ids, "review");
                }
            })
        });
    }
}

$.checkInsectLevel = function(insectVal) {
    for(let i = 0; i < insectVal.length; i++) {
        let insectLevel = insectVal.eq(i).val();
        switch (insectLevel) {
            case 'H':
                $('.insect').eq(i).attr("src","/resources/img/etc/good_a.png");
                break;
            case 'M':
                $('.insect').eq(i).attr("src","/resources/img/etc/normal_a.png");
                break;
            case 'L':
                $('.insect').eq(i).attr("src","/resources/img/etc/bad_a.png");
                break;
        }
    }
}

$.checkNoiseLevel = function(noiseVal) {
    for(let i = 0; i < noiseVal.length; i++) {
        let noiseLevel = noiseVal.eq(i).val();
        switch (noiseLevel) {
            case 'H':
                $('.noise').eq(i).attr("src","/resources/img/etc/good_a.png");
                break;
            case 'M':
                $('.noise').eq(i).attr("src","/resources/img/etc/normal_a.png");
                break;
            case 'L':
                $('.noise').eq(i).attr("src","/resources/img/etc/bad_a.png");
                break;
        }
    }
}

$.checkScore = function(score) {
    for(let i = 0; i < score.length; i++) {
        let rank = score.eq(i).val();
        switch (rank) {
            case '1':
                $('.rank').eq(i).attr("src","/resources/img/etc/rank1.png");
                break;
            case '2':
                $('.rank').eq(i).attr("src","/resources/img/etc/rank2.png");
                break;
            case '3':
                $('.rank').eq(i).attr("src","/resources/img/etc/rank3.png");
                break;
            case '4':
                $('.rank').eq(i).attr("src","/resources/img/etc/rank4.png");
                break;
            case '5':
                $('.rank').eq(i).attr("src","/resources/img/etc/rank5.png");
                break;
            default:
                $('.rank').eq(i).attr("src","/resources/img/etc/rank0.png");
                break;
        }
    }
}

$.checkPeriodUnit = function(periodUnit) {
    for(let i = 0; i < periodUnit.length; i++) {
        let period = periodUnit.eq(i).val();
        switch (period) {
            case "Y":
                $('.period').eq(i).text("년");
                break;
            case "M":
                $('.period').eq(i).text("개월");
                break;
            case "W":
                $('.period').eq(i).text("주");
                break;
        }
    }
}

$.setMiddlePath = function(middle){
        middlePath = middle.val();
}

$.setImage = function(){
    let value = $('#upload').val().split(',');
    let middlePath = value[0];
    let fileName = value[1];
    let src = '/review/download?middlePath=' + encodeURI(middlePath) + '&imageFileName=' + encodeURI(fileName);
    $('#preview').attr('src', src);
}

$.setHashTag = function(){
    let cnt = $('#hashTagCnt').val();
    let list = $('#hashTag').val();
    let j =1;
    let hashTag = "";
    for(let i=0; i<list.length; i++){
        if(list[i] !== ","){
            hashTag += list[i];
        }else{
            $('#hash'+j).text(' #'+hashTag);
            j++;
            hashTag = "";
        }
    }
    if(cnt == j){
        $('#hash'+j).text(' #'+hashTag);
    }
}

$.deleteOne = function (temp_ids, fromWhere) {
    $.ajax('/admin/deleteAll', {
        type: 'POST',
        data: {del_ids: temp_ids, fromWhere: fromWhere}
    }).then(function (data, status) {
        if (status === 'success') {
            switch(data.result){
                case "SUCCESS":
                    Swal.fire('삭제 성공','삭제를 성공하였습니다.','success')
                        .then(function () {
                            location.href = "";
                        })
                    break;
                case "FAIL":
                    Swal.fire('삭제 실패','삭제를 실패하였습니다.','error')
                    break;
            }
        } else {
            Swal.fire('삭제 실패','잠시 후 다시 시도해주세요.','error')
        }
    })
}




