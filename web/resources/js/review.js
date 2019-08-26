$(document).ready(function () {
    //console.log("ready");
    $.setImage();
    $.checkInsectLevel($('.insectVal'));
    $.checkNoiseLevel($('.noiseVal'));
    $.checkScore($('.score'));
    $.checkPeriodUnit($('.periodUnit'));

    $('.addReview').click(function () {
        $.loginCheck("reviewWrite", "/review/write");
    })

    let btns = $('.pageBtns > div > button');
    let pageBtns = $('.pagenum');
    for(let i = 0; i < pageBtns.length;i++){
        pageBtns.eq(i).text(startpage+i).attr("id", startpage+i+"");
    }

    $('.pageBtns > div').css('width', (pageBtns.length + 4) * 55);

    for(let i = 0; i < btns.length; i++){
        btns.eq(i).val(btns.eq(i).text());
    }

    $('.pagenum[id='+curpage+']').css('background-color', '#b6e2f8');

    // $('.pageBtns > div > button').click(function () {
    //     if($(this).attr("class") == "pagenum"){
    //         curpage = $(this).val();
    //     } else {
    //         switch ($(this).val()) {
    //             case "<<": curpage = 1; break;
    //             case "<":
    //                 if(curpage > 1)
    //                     curpage = curpage-1;
    //                 break;
    //             case ">":
    //                 if(curpage < total)
    //                     curpage = curpage+1;
    //                 break;
    //             case ">>": curpage = total; break;
    //         }
    //     }
    //     location.href ="/review?page=" + curpage;
    // })

    $('.pageBtns > div > button').click(function () {

        var value = $('.selAlign option:selected').val(); // 별점 순으로 보기...
        switch(value){
            case "최신 순으로 보기":
                value = "latest";
                break;
            case "별점 순으로 보기":
                value = "star";
                break;
            case "방음지수 순으로 보기":
                value = "noise";
                break;
            case "방충지수 순으로 보기":
                value = "insect"
                break;
            default:
                value = "latest";
                break;
        }

        if($(this).attr("class") == "pagenum"){
            curpage = $(this).val();
        } else {
            switch ($(this).val()) {
                case "<<": curpage = 1; break;
                case "<":
                    if(curpage > 1)
                        curpage = curpage-1;
                    break;
                case ">":
                    if(curpage < total)
                        curpage = curpage+1;
                    break;
                case ">>": curpage = total; break;
            }
        }
        location.href ="/review?page=" + curpage + "&order=" + value;
    })
})

$.setImage = function(){
    let listSize = $('.tbList').length;
    for(let i = 0; i < listSize; i++) {
        let value = $('#uploadValue' + i).val().split(',');
        let middlePath = value[0];
        let fileName = value[1];
        let src = '/review/download?middlePath=' + encodeURI(middlePath) + '&imageFileName=' + encodeURI(fileName);
        //console.log(src);
        $('#preview' + i).attr('src', src);
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


$('.selAlign').change(function() {
    var value = $(this).val(); // 별점 순으로 보기...
    switch(value){
        case "최신 순으로 보기":
            value = "latest";
            break;
        case "별점 순으로 보기":
            value = "star";
            break;
        case "방음지수 순으로 보기":
            value = "noise";
            break;
        case "방충지수 순으로 보기":
            value = "insect"
            break;
        default:
            value = "latest";
            break;
    }
    location.href ="/review?page=" + curpage + "&order=" + value;
});