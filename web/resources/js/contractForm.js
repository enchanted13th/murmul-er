String.prototype.isEmpty = function(){
    return (this.trim() === '');
}

String.prototype.string = function(len){
    var s = '', i = 0;
    while (i++ < len) { s += this; }
    return s;
};

String.prototype.zf = function(len){
    return "0".string(len - this.length) + this;
};
Number.prototype.zf = function(len){
    return this.toString().zf(len);
};

$.fn.clickCancelBtn = function () {
    $(this).click(function () {
        Swal.fire({
            title: "취소",
            text: "정말로 취소하시겠습니까?",
            type: "warning",
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
}

$.setRadioType = function (flag) {
    switch (rentType) {
        case 1:
            $('input[name=rentType][value="2"]').prop("checked", true);
            break;
        case 2:
            $('input[name=rentType][value="1"]').prop("checked", true);
            break;
    }
    if (flag === 'write') {
        switch (roomType) {
            case "OP":
                $('input[name=house][value="2"]').prop("checked", true);
                break;
            case "AP":
                $('input[name=house][value="1"]').prop("checked", true);
                break;
            case "OR":
                $('input[name=house][value="5"]').prop("checked", true);
                break;
            case "TR":
                $('input[name=house][value="5"]').prop("checked", true);
                break;
            case "VI":
                $('input[name=house][value="3"]').prop("checked", true);
                break;
        }
    }
}

$.numberUnit = function () {
    let deposit = $('#deposit').val();
    let monthlyCost = $('#monthlyCost').val();
    $('#deposit').val(deposit.substr(0, deposit.length-4));
    $('#monthlyCost').val(monthlyCost.substr(0, monthlyCost.length-4));
}

var changeDate = function(){
    let group = $(this).attr('class').split(' ')[1];
    let selectGroup = $('.'+group);
    let year = selectGroup[0].value;
    let month = selectGroup[1].value;
    let dObj = selectGroup[2];

    if(year.isEmpty() || month.isEmpty())
        return;

    let dcount = getDayCount(year, month);
    let length = dObj.options.length;
    for(let i = length; i <= dcount; i++){
        dObj.options[i] = new Option(i+'', i.zf(2));
    }
    if(dcount < length) {
        for(let i = length-1; i > dcount; i--){
            dObj.remove(i);
        }
    }
}

var getDayCount = function(year, month){
    let date = new Date(year, month, 1);
    date.setDate(date.getDate()-1);
    return date.getDate();
}