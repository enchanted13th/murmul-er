$(document).ready(function() {
    $.initSelectDate();
    settingDay();
    $('select.s1').change(changeDate);
    $('select.s2').change(changeDate);
    $('select.s3').change(changeDate);
    $('select.s4').change(changeDate);
    $('select.s5').change(changeDate);
    $('select.s6').change(changeDate);
    $('select.s7').change(changeDate);
})

$.initSelectDate = function(){
    let today = new Date();
    let year = today.getFullYear();
    let GAP = 5;

    for(let i = year; i < year+GAP; i++){
        let o1 = new Option(i+"", i);
        let o2 = new Option(i+"", i);
        let o3 = new Option(i+"", i);
        let o4 = new Option(i+"", i);
        let o5 = new Option(i+"", i);
        let o6 = new Option(i+"", i);
        let o7 = new Option(i+"", i);

        let idx = document.contractForm.fromYearS.options.length;

        document.contractForm.mdPayYear.options[idx] = o1;
        document.contractForm.contractPayYear.options[idx] = o7;
        document.contractForm.remainderYear.options[idx] = o2;

        document.contractForm.fromYearS.options[idx] = o3;
        document.contractForm.toYearS.options[idx] = o4;
        document.contractForm.fromYearL.options[idx] = o5;
        document.contractForm.toYearL.options[idx] = o6;
    }
    for(let i = 1; i <= 12; i++){
        let o1 = new Option(i+'', i.zf(2));
        let o2 = new Option(i+'', i.zf(2));
        let o3 = new Option(i+'', i.zf(2));
        let o4 = new Option(i+'', i.zf(2));
        let o5 = new Option(i+'', i.zf(2));
        let o6 = new Option(i+'', i.zf(2));
        let o7 = new Option(i+'', i.zf(2));

        let idx = document.contractForm.fromMonthS.options.length;

        document.contractForm.mdPayMonth.options[idx] = o1;
        document.contractForm.contractPayMonth.options[idx] = o7;
        document.contractForm.remainderMonth.options[idx] = o2;

        document.contractForm.fromMonthS.options[idx] = o3;
        document.contractForm.toMonthS.options[idx] = o4;
        document.contractForm.fromMonthL.options[idx] = o5;
        document.contractForm.toMonthL.options[idx] = o6;
    }
}

var settingDay = function() {
    let MONTH_DAY = 31;
    for(let i = 1; i <= MONTH_DAY; i++){
        document.contractForm.mcPayDayS.options[i] = new Option(i+'',i);
        document.contractForm.mcPayDayL.options[i] = new Option(i+'',i);
    }
}

$.fn.isBlank = function(type) {

    if($(this).val() === "")
    {
        alert("필수 항목을 입력하세요");
        $(this).focus();
        return true;
    }
    return false;
}
//
$.fn.isNum = function(num) {;

    num += '';
    num = num.replace(/^\s*|\s*$/g, '');
    if (num == '' || isNaN(num)) {
        alert('숫자만 입력하세요');
        $(this).val('');
        $(this).focus();
        return false;
    }
    return true;

}

$.fn.isChecked = function() {

    if($(this).val() === ""){
        alert('필수항목을 선택해주세요');
        $(this).focus();
        return false;
    }
    return true;
}

$.fn.isWord = function() {
    $(this).keyup(function(event) {
        if (!(event.keyCode >=37 && event.keyCode<=40)) {
            var inputVal = $(this).val();
            $(this).val(inputVal.replace(/[a-zA-Z0-9,~`!@#$%^&*()_+=<>/]/gi,''));
        }
    });
}


$.fn.onlyNum = function() {
    $(this).keyup(function(event) {
        if (!(event.keyCode >=37 && event.keyCode<=40)) {
            var inputVal = $(this).val();
            $(this).val(inputVal.replace(/[a-zㄱ-힣,~`!@#$%^&*()_+=<>/]/gi,''));
        }
    });
}

$.fn.checkValid = function() {

    let checked = $('input[name="rentType"]:checked').val();

    if($('#buildingName').isBlank()) return false;
    if($('#buildingArea').isBlank()) return false;
    if($('#buildingStructure').isBlank()) return false;

    if($('input[name="house"]:checked').val() === undefined){
        alert("건물 유형을 선택해주세요");
        return false;
    }

    if($('input[name="rentType"]:checked').val() === undefined){
        alert("대여 유형을 선택해주세요");
        return false;
    }

    switch (checked) {
        case '1':
            if($('#deposit').isBlank("보증금 항목")) return false;
            if($('#depositL').isBlank("보증금 항목"))  return false;
            if($('#lessorName').isBlank("이름"))  return false;
            if(!$('#deposit').isNum($('#deposit').val())) return false;
            if(!$('#depositL').isNum($('#depositL').val())) return false;

            break;
        case '2':
            if($('#monthlyCost').isBlank("월세 항목"))  return false;
            if($('#monthlyCostL').isBlank("월세 항목"))  return false;
            if($('#lessorName').isBlank("이름"))  return false;

            if(!$('#monthlyCost').isNum($('#monthlyCost').val())) return false;
            if(!$('#monthlyCostL').isNum($('#monthlyCostL').val())) return false;

            if(!$('#mcPayDayS').isChecked()) return false;
            if(!$('#mcPayDayL').isChecked()) return false;

            break;
        case '3':
            if($('#deposit').isBlank("보증금 항목")) return false;
            if($('#monthlyCost').isBlank("월세 항목"))  return false;
            if($('#depositL').isBlank("보증금 항목"))  return false;
            if($('#monthlyCostL').isBlank("월세 항목"))  return false;
            if($('#lessorName').isBlank("이름"))  return false;

            if(!$('#deposit').isNum($('#deposit').val())) return false;
            if(!$('#monthlyCost').isNum($('#monthlyCost').val())) return false;
            if(!$('#depositL').isNum($('#depositL').val())) return false;
            if(!$('#monthlyCostL').isNum($('#monthlyCostL').val())) return false;

            if(!$('#mcPayDayS').isChecked()) return false;
            if(!$('#mcPayDayL').isChecked()) return false;

            break;
    }

    if(!$('#fromYearS').isChecked()) return false;
    if(!$('#fromMonthS').isChecked()) return false;
    if(!$('#fromDayS').isChecked()) return false;
    if(!$('#toYearS').isChecked()) return false;
    if(!$('#toMonthS').isChecked()) return false;
    if(!$('#toDayS').isChecked()) return false;

    if(!$('#fromYearL').isChecked()) return false;
    if(!$('#fromMonthL').isChecked()) return false;
    if(!$('#fromDayL').isChecked()) return false;
    if(!$('#toYearL').isChecked()) return false;
    if(!$('#toMonthL').isChecked()) return false;
    if(!$('#toDayL').isChecked()) return false;

    return true;
}

var getDayCount = function(year, month){

    let date = new Date(year, month, 1);
    date.setDate(date.getDate()-1);
    return date.getDate();
}

String.prototype.isEmpty = function(){
    return (this.trim() === '');
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

var register = function() {
    //$('#lastBtn').click(function(){
    //     if(!$(this).checkValid())
    //         return ;

        let contractPayDate = $('#contractPayYear').val()+"-"+$('#contractPayMonth').val()+"-"+$('#contractPayDay').val();
        let middlePayDate   = $('#fromYearS').val() + "-" + $('#fromMonthS').val() + "-" + $('#fromDayS').val();
        let remainderPayDate = $('#fromYearS').val() + "-" + $('#fromMonthS').val() + "-" + $('#fromDayS').val();
        let fromSub = $('#fromYearS').val() + "-" + $('#fromMonthS').val() + "-" + $('#fromDayS').val();
        let toSub = $('#toYearS').val() + "-" + $('#toMonthS').val() + "-" + $('#toDayS').val();
        let fromLease = $('#fromYearL').val() + "-" + $('#fromMonthL').val() + "-" + $('#fromDayL').val();
        let toLease = $('#toYearL').val() + "-" + $('#toMonthL').val() + "-" + $('#toDayL').val();

        let contractObj = {
            buildingName: $('#buildingName').val(),
            buildingArea: $('#buildingArea').val(),
            buildingStructure: $('#buildingStructure').val(),
            houseType: $('input[name="house"]:checked').val(),
            rentType: $('input[name="rentType"]:checked').val(),
            deposit: $('#deposit').val(),
            contractPayment: $('#contractPayment').val(),
            contractPayDate: contractPayDate,
            middlePayment: $('#middlePayment').val(),
            middlePayDate: middlePayDate,
            remainderPayment: $('#remainderPayment').val(),
            remainderPayDate: remainderPayDate,
            monthlyCost: $('#monthlyCost').val(),
            mcPayDayS: $('#mcPayDayS').val(),
            fromSub: fromSub,
            toSub: toSub,
            depositL: $('#depositL').val(),
            monthlyCostL: $('#monthlyCostL').val(),
            lessorName: $('#lessorName').val(),
            mcPayDayL: $('#mcPayDayL').val(),
            fromLease: fromLease,
            toLease: toLease
        }

        if(confirm('정말 등록하시겠습니까?')){
            console.log('등록');
            $.ajax("/contract/show",{
                type: "POST",
                data: {contractData: JSON.stringify(contractObj) }
            }).then(function(data, status){
                //if()
                console.log(status);
                console.log(data);
            });
        }
        else{
            return;
        }

   // });
}