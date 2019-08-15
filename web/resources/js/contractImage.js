var divLeft = [];

$(document).ready(function(){
    $.setNumberUnit();
    $.checkType();
    $.initGetLeft();
    $.setBounds();
    $.resizeEvent();
    $.setSpecialProvision();
    $('#btnBack').click(function(){
        Swal.fire({
            text: "다시 수정하시겠습니까?",
            type: "question",
            showCancelButton: true,
            confirmButtonColor: '#3085d6',
            confirmButtonText: '확인',
            cancelButtonColor: '#d33',
            cancelButtonText: '취소'
        }).then(result => {
            if (result.value) {
                history.back();
            }
        })
    })
});

$.checkType = function(){
    $('#buildingType').attr('class', 'building-type'+buildingType);
    $('#rentType').attr('class', 'rent-type'+rentType);
    $('#mcType').attr('class', 'jeondae-monthly-type'+mcType);
}

$.initGetLeft = function(){
    let div = $('.contract-body > div');
    for(let i = 0; i < div.length; i++) {
        let leftpx = div.eq(i).css('left');
        let left = leftpx.substr(0, leftpx.length - 2) * 1;
        divLeft.push(left-7);
    }
}
$.resizeEvent = function() {
    $(window).resize(function(){
        $.setBounds();
    });
}
$.setBounds = function(){
    let width = $(window).width();
    if(width < 1000) return;
    let div = $('.contract-body > div');
    for(let i = 0; i < divLeft.length; i++) {
        let plus =  (width - 1000) / 2;
        div.eq(i).css('left', (divLeft[i]+plus));
    }
}
$.setNumberUnit = function() {
    $(".jeondae-deposit").addMan();
    $(".jeondae-contract-cost").addMan();
    $(".jeondae-middle-cost").addMan();
    $(".jeondae-balance").addMan();
    $(".jeondae-monthly-cost").addMan();
    $(".imdae-deposit").addMan();
    $(".imdae-monthly-cost").addMan();
    $(".jeondae-deposit-num").addComma();
    $(".imdae-deposit-num").addComma();
    $(".imdae-monthly-num").addComma();
}
$.setSpecialProvision = function () {
    let manageCost = $('.manage-cost').text();
    let manages = $('.manage-cost-item').text();
    let options = $('.option-item').text();

    if(manageCost === '0') {
        $('.manage-cost').text('');
        $('.manage-cost-item').text('');
    } else {
        $('.manage-cost').text('관리비 : ' + manageCost.format() +"원");
        $('.manage-cost-item').text('(포함항목 : ' + manages.substr(1, manages.length - 2) + ')');
    }
    if(options){
        $('.option-item').text('옵션 : ' + options.substr(1, options.length - 2));
    }
}

$.fn.addMan = function(){
    let text = $(this).text();
    if(text === '')
        return;
    if(text.length > 4) {
        let uk = text.substr(0, text.length - 4);
        let man = parseInt(text.substr(-4), 10);
        text = uk + '억 ' + man + '만';
    }
    else
        text = text + '만';
    $(this).text(text);
}

$.fn.addComma = function () {
    let number = $(this).text()+'0000';
    let commaNum = number.format();
    $(this).text(commaNum);
}

// 숫자 타입에서 쓸 수 있도록 format() 함수 추가
Number.prototype.format = function(){
    if(this == 0) return '';

    var reg = /(^[+-]?\d+)(\d{3})/;
    var n = (this + '');

    while (reg.test(n)) n = n.replace(reg, '$1' + ',' + '$2');

    return n;
};

// 문자열 타입에서 쓸 수 있도록 format() 함수 추가
String.prototype.format = function(){
    var num = parseFloat(this);
    if( isNaN(num) ) return "";

    return num.format();
};

