const 전세 = "1";
const 월세 = "2";
const 보증금월세 = "3";
var midFlag = false;
var remFlag = false;

$(document).ready(function() {
    $.initSelectDate();
    $.calcSelectDay();
    $('#cancel').clickCancelBtn();
    $('#lastBtn').clickRegisterBtn();
    $.numberUnit();
    $.setRadioType('write');
})

$.calcSelectDay = function(){
    $('select.s1').change(changeDate);
    $('select.s2').change(changeDate);
    $('select.s3').change(changeDate);
    $('select.s4').change(changeDate);
    $('select.s5').change(changeDate);
    $('select.s6').change(changeDate);
}

$.initSelectDate = function(){
    $.settingYear();
    $.settingMonth();
    $.settingDay();
}

$.settingYear = function() {
    let today = new Date();
    let year = today.getFullYear();
    let GAP = 5;

    //전대차 계약 내용 기간
    for(let i = year; i < year+GAP; i++){
        let o1 = new Option(i+"", i);
        let o2 = new Option(i+"", i);

        let idx = document.contractForm.fromYearS.options.length;

        document.contractForm.fromYearS.options[idx] = o1;
        document.contractForm.toYearS.options[idx] = o2;
    }

    //임대차 계약 내용 기간
    for(let i = year-GAP; i < year+GAP; i++){
        let o3 = new Option(i+"", i);
        let o4 = new Option(i+"", i);

        let idx = document.contractForm.fromYearL.options.length;

        document.contractForm.fromYearL.options[idx] = o3;
        document.contractForm.toYearL.options[idx] = o4;
    }
}
$.settingMonth = function() {
    for(let i = 1; i <= 12; i++){
        let o1 = new Option(i+'', i.zf(2));
        let o2 = new Option(i+'', i.zf(2));
        let o3 = new Option(i+'', i.zf(2));
        let o4 = new Option(i+'', i.zf(2));

        let idx = document.contractForm.fromMonthS.options.length;

        document.contractForm.fromMonthS.options[idx] = o1;
        document.contractForm.toMonthS.options[idx] = o2;
        document.contractForm.fromMonthL.options[idx] = o3;
        document.contractForm.toMonthL.options[idx] = o4;
    }
}
$.settingDay = function() {
    let MONTH_DAY = 31;
    for(let i = 1; i <= MONTH_DAY; i++){
        document.contractForm.mcPayDayS.options[i] = new Option(i+'',i.zf(2));
        document.contractForm.mcPayDayL.options[i] = new Option(i+'',i.zf(2));
    }
}

$.fn.isBlank = function(type) {
    if($(this).val() === "" || $(this).val().replace(/^\s*|\s*$/g, '') === "")
    {
        Swal.fire(type+"을 입력하세요");
        $(this).val('');
        $(this).focus();
        return true;
    }
    return false;
}
//
$.fn.isNum = function(num) {
    num += '';
    num = num.replace(/^\s*|\s*$/g, '');
    if (num == '' || isNaN(num)) {
        Swal.fire('숫자만 입력하세요');
        $(this).val('');
        $(this).focus();
        return false;
    }
    return true;
}

$.fn.isChecked = function() {
    if($(this).val() === ""){
        Swal.fire('필수항목을 선택해주세요');
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
$.fn.clickRegisterBtn = function() {
    $(this).click(function(){
        if(!$(this).checkValid())
            return ;
        Swal.fire({
            text: "이대로 등록하시겠습니까?",
            type: "question",
            showCancelButton: true,
            confirmButtonColor: '#3085d6',
            confirmButtonText: '확인',
            cancelButtonColor: '#d33',
            cancelButtonText: '취소'
        }).then(result => {
            if (result.value) {
                document.contractForm.submit();
            }
        })
    });
}

$.fn.checkValid = function() {

    let checked = $('input[name="rentType"]:checked').val();
    // console.log("checked: "+ checked+" type: "+ typeof checked);

    if($('#buildingName').isBlank('건물명')) return false;
    if($('#buildingArea').isBlank('건물 면적')) return false;
    if($('#buildingStructure').isBlank('건물 구조')) return false;
    if($('#jeondaeBubun').isBlank('전대할 부분')) return false;
    if($('#jeondaeUsage').isBlank('용도')) return false;

    if($('input[name="house"]:checked').val() === undefined){
        Swal.fire("건물 유형을 선택해주세요");
        return false;
    }

    if($('input[name="rentType"]:checked').val() === undefined){
        Swal.fire("임대 유형을 선택해주세요");
        return false;
    }

    switch (checked) {
        case 전세:
            // console.log("전세");
            if($('#deposit').isBlank("보증금 항목")) return false;
            if(!$('#deposit').isNum($('#deposit').val())) return false;
            if(!checkSelBoxTop()) return false;
            if($('#depositL').isBlank("보증금 항목"))  return false;
            if(!$('#depositL').isNum($('#depositL').val())) return false;
            if($('#lessorName').isBlank("이름"))  return false;
            if(!checkSelBoxBot()) return false;
            break;

        case 월세:
            // console.log("월세");
            if($('#monthlyCost').isBlank("월세 항목"))  return false;
            if(!$('#monthlyCost').isNum($('#monthlyCost').val())) return false;
            if(!$('#mcPayDayS').isChecked()) return false;
            if($('input[name="mcType"]:checked').val() === undefined){
                Swal.fire("월세 지불 방법을 선택해주세요");
                return false;
            }
            if(!checkSelBoxTop()) return false;
            if($('#monthlyCostL').isBlank("월세 항목"))  return false;
            if(!$('#monthlyCostL').isNum($('#monthlyCostL').val())) return false;
            if(!$('#mcPayDayL').isChecked()) return false;
            if($('#lessorName').isBlank("이름"))  return false;
            if(!checkSelBoxBot()) return false;
            break;

        case 보증금월세 :
            // console.log("보증금월세");
            if($('#deposit').isBlank("보증금 항목")) return false;
            if($('#monthlyCost').isBlank("월세 항목"))  return false;
            if(!$('#deposit').isNum($('#deposit').val())) return false;
            if(!$('#monthlyCost').isNum($('#monthlyCost').val())) return false;
            if(!$('#mcPayDayS').isChecked()) return false;
            if($('input[name="mcType"]:checked').val() === undefined){
                Swal.fire("월세 지불 방법을 선택해주세요");
                return false;
            }
            if(!checkSelBoxTop()) return false;
            if($('#depositL').isBlank("보증금 항목"))  return false;
            if($('#monthlyCostL').isBlank("월세 항목"))  return false;
            if(!$('#depositL').isNum($('#depositL').val())) return false;
            if(!$('#monthlyCostL').isNum($('#monthlyCostL').val())) return false;
            if(!$('#mcPayDayL').isChecked()) return false;
            if($('#lessorName').isBlank("이름"))  return false;
            if(!checkSelBoxBot()) return false;
            break;
    }
    return true;
}

$.fn.isValidTitle = function() {
    $(this).keyup(function(event) {
        if (!(event.keyCode >=37 && event.keyCode<=40)) {
            let inputVal = $(this).val();
            $(this).val(inputVal.replace(/[,.~`!@#$%^&*()_+=<>/]/gi,''));
        }
    });
}

var checkSelBoxTop= function() {
    // console.log("middlePayment val: "+$('#middlePayment').val()+", middlePayment type: "+ typeof $('#middlePayment').val());
    if($('#middlePayment').val() !== "") {
        if (!$('#middlePayment').isNum($('#middlePayment').val()))
            return false;
        else{
            if(!$('#mdPayYear').isChecked()) return false;
            if(!$('#mdPayMonth').isChecked()) return false;
            if(!$('#mdPayDay').isChecked()) return false;
        }
    }
    if(!$('#remainderPayment').val() === "") {
        if (!$('#remainderPayment').isNum($('#remainderPayment').val()))
            return false;
        else {
            if (!$('#remainderYear').isChecked()) return false;
            if (!$('#remainderMonth').isChecked()) return false;
            if (!$('#remainderDay').isChecked()) return false;
        }
    }
    if(!$('#fromYearS').isChecked()) return false;
    if(!$('#fromMonthS').isChecked()) return false;
    if(!$('#fromDayS').isChecked()) return false;
    if(!$('#toYearS').isChecked()) return false;
    if(!$('#toMonthS').isChecked()) return false;
    if(!$('#toDayS').isChecked()) return false;
    return true;
}

var checkSelBoxBot= function() {
    if(!$('#fromYearL').isChecked()) return false;
    if(!$('#fromMonthL').isChecked()) return false;
    if(!$('#fromDayL').isChecked()) return false;
    if(!$('#toYearL').isChecked()) return false;
    if(!$('#toMonthL').isChecked()) return false;
    if(!$('#toDayL').isChecked()) return false;
    return true;
}


/*중도금, 잔금 select Box setting 하는 부분*/
$.settingSelBox = function(type,value) {
    value += '';
    value = value.replace(/^\s*|\s*$/g, '');
    if (value == '' || isNaN(value)) {
        if(value ==="") {
            switch (type) {
                case "middle":
                    midFlag = false;
                    $('select[name="mdPayYear"] option').remove();
                    $('select[name="mdPayMonth"] option').remove();
                    $("select#mdPayYear").append("<option value=''>-------</option>");
                    $("select#mdPayMonth").append("<option value=''>-------</option>");
                    break;
                case "remainder":
                    remFlag = false;
                    $('select[name="remainderYear"] option').remove();
                    $('select[name="remainderMonth"] option').remove();
                    $("select#remainderYear").append("<option value=''>-------</option>");
                    $("select#remainderMonth").append("<option value=''>-------</option>");
                    break;
            }
        }
        if(value !== '')
            Swal.fire('숫자만 입력하세요');
        switch (type) {
            case "middle":
                $("#middlePayment").val('');
                $("#middlePayment").focus();
                return ;
            case "remainder":
                $("#remainderPayment").val('');
                $("#remainderPayment").focus();
                return ;
        }
    }
    if(type === "middle")
        $.set(value, midFlag, type);
    else
        $.set(value, remFlag, type);
}


$.set = function(value, flag, type){
    if(value !== "" && flag === false) {
        let today = new Date();
        let year = today.getFullYear();
        let GAP = 5;
        let idx, i;

        switch (type) {
            case "middle":
                midFlag = true;
                for (i = year; i < year + GAP; i++) {
                    let o1 = new Option(i + "", i);

                    idx = document.contractForm.mdPayYear.options.length;
                    document.contractForm.mdPayYear.options[idx] = o1;

                }
                for (i = 1; i <= 12; i++) {
                    let o1 = new Option(i + '', i.zf(2));
                    idx = document.contractForm.mdPayMonth.options.length;
                    document.contractForm.mdPayMonth.options[idx] = o1;
                }
                break;

            case "remainder":
                remFlag = true;
                for (i = year; i < year + GAP; i++) {
                    let o1 = new Option(i + "", i);

                    idx = document.contractForm.remainderYear.options.length;
                    document.contractForm.remainderYear.options[idx] = o1;

                }
                for (i = 1; i <= 12; i++) {
                    let o1 = new Option(i + '', i.zf(2));
                    idx = document.contractForm.remainderMonth.options.length;
                    document.contractForm.remainderMonth.options[idx] = o1;
                }
                break;
        }
    }
}

/*
*  **계약서 체크 박스 유효성**
*
* 거주 시작기간 보다 거주종료 기간 날짜 늦게 셋팅하는 부분
* */
// $.fn.changeAll = function (type,value, date, id) {
//     let i, idx;
//     let GAP = 5;
//     value *= 1;
//     let opt;
//
//     console.log("fromYearS: "+$("#fromYearS").val());
//
//     $("select[id="+id+"] > option").remove();
//     $("select[id="+id+"]").append("<option value=''>-------</option>");
//
//     switch (date) {
//         case "year":
//             if(type === "sub") {
//                 for (i = value; i < value + GAP; i++) {
//                     opt = new Option(i + "", i);
//                     idx = document.contractForm.toYearS.options.length;
//                     document.contractForm.toYearS.options[idx] = opt;
//                 }
//             }else{
//                 for (i = value; i < value + GAP; i++) {
//                     opt = new Option(i + "", i);
//                     idx = document.contractForm.toYearL.options.length;
//                     document.contractForm.toYearL.options[idx] = opt;
//                 }
//             }
//             break;
//         case "month":
//             if(type === "sub") {
//                 if($("#fromYearS").val() < $("#toYearS").val()) {
//                     console.log("큰 년");
//                     for (i = 1; i <= 12; i++) {
//                         opt = new Option(i + "", i.zf(2));
//                         let idx = document.contractForm.toMonthS.options.length;
//                         document.contractForm.toMonthS.options[idx] = opt;
//                     }
//                 }
//                 else if($("#fromYearS").val() == $("#toYearS").val()){
//                     console.log("같은 년");
//                     for (i = value; i <= 12; i++) {
//                         opt = new Option(i + "", i.zf(2));
//                         let idx = document.contractForm.toMonthS.options.length;
//                         document.contractForm.toMonthS.options[idx] = opt;
//                     }
//                 }
//                 else ;
//             } else{
//                 if($("#fromYearL").val() < $("#toYearL").val()) {
//                     console.log("큰 년1")
//                     for (i = 1; i <= 12; i++) {
//                         opt = new Option(i + "", i.zf(2));
//                         let idx = document.contractForm.toMonthL.options.length;
//                         document.contractForm.toMonthL.options[idx] = opt;
//                     }
//                 }
//                 else if($("#fromYearL").val() == $("#toYearL").val()){
//                     console.log("같은 년1")
//                     for (i = value; i <= 12; i++) {
//                         opt = new Option(i + "", i.zf(2));
//                         let idx = document.contractForm.toMonthL.options.length;
//                         document.contractForm.toMonthL.options[idx] = opt;
//                     }
//                 }
//                 else ;
//             }
//             break;
//         case "day":
//             if(type === "sub") {
//                 if($("#fromMonthS").val() < $("#toMonthS").val()) {
//                     console.log("fromMonth: "+ $("#fromMonthS").val());
//                     console.log("toMonth: "+ $("#toMonthS").val());
//                     console.log("큰 달")
//                     for (i = 1; i <= 31; i++) {
//                         opt = new Option(i + "", i);
//                         let idx = document.contractForm.toDayS.options.length;
//                         document.contractForm.toDayS.options[idx] = opt;
//                     }
//                 }else if($("#fromMonthS").val() == $("#toMonthS").val()){
//                     console.log("같은 달")
//                     for (i = value+1; i <= 31; i++) {
//                         opt = new Option(i + "", i);
//                         let idx = document.contractForm.toDayS.options.length;
//                         document.contractForm.toDayS.options[idx] = opt;
//                     }
//                 } else ;
//             }else{
//                 if($("#fromMonthL").val() < $("#toMonthL").val()) {
//                     console.log("큰 달1")
//                     for (i = 1; i <= 31; i++) {
//                         opt = new Option(i + "", i);
//                         let idx = document.contractForm.toDayL.options.length;
//                         document.contractForm.toDayL.options[idx] = opt;
//                     }
//                 }else if($("#fromMonthL").val() == $("#toMonthL").val()){
//                     console.log("같은 달1")
//                     for (i = value+1; i <= 31; i++) {
//                         opt = new Option(i + "", i);
//                         let idx = document.contractForm.toDayL.options.length;
//                         document.contractForm.toDayL.options[idx] = opt;
//                     }
//                 } else ;
//             }
//             break;
//     }
// }


// $.fn.clickRegisterBtn = function() {
//     $(this).click(function(){
//         if(!$(this).checkValid())
//             return ;
//
//         let contractPayDate = $('#contractPayYear').val()+"-"+$('#contractPayMonth').val()+"-"+$('#contractPayDay').val();
//         let middlePayDate   = $('#fromYearS').val() + "-" + $('#fromMonthS').val() + "-" + $('#fromDayS').val();
//         let remainderPayDate = $('#fromYearS').val() + "-" + $('#fromMonthS').val() + "-" + $('#fromDayS').val();
//         let fromSub = $('#fromYearS').val() + "-" + $('#fromMonthS').val() + "-" + $('#fromDayS').val();
//         let toSub = $('#toYearS').val() + "-" + $('#toMonthS').val() + "-" + $('#toDayS').val();
//         let fromLease = $('#fromYearL').val() + "-" + $('#fromMonthL').val() + "-" + $('#fromDayL').val();
//         let toLease = $('#toYearL').val() + "-" + $('#toMonthL').val() + "-" + $('#toDayL').val();
//
//         let contractObj = {
//             buildingName: $('#buildingName').val(),
//             buildingArea: $('#buildingArea').val(),
//             buildingStructure: $('#buildingStructure').val(),
//             houseType: $('input[name="house"]:checked').val(),
//             rentType: $('input[name="rentType"]:checked').val(),
//             deposit: $('#deposit').val(),
//             contractPayment: $('#contractPayment').val(),
//             contractPayDate: contractPayDate,
//             middlePayment: $('#middlePayment').val(),
//             middlePayDate: middlePayDate,
//             remainderPayment: $('#remainderPayment').val(),
//             remainderPayDate: remainderPayDate,
//             monthlyCost: $('#monthlyCost').val(),
//             mcPayDayS: $('#mcPayDayS').val(),
//             fromSub: fromSub,
//             toSub: toSub,
//             depositL: $('#depositL').val(),
//             monthlyCostL: $('#monthlyCostL').val(),
//             lessorName: $('#lessorName').val(),
//             mcPayDayL: $('#mcPayDayL').val(),
//             fromLease: fromLease,
//             toLease: toLease
//         }
//
//         if(confirm('정말 등록하시겠습니까?')){
//             console.log('등록');
//             $.ajax("/contract/show",{
//                 type: "POST",
//                 data: {contractData: JSON.stringify(contractObj) }
//             }).then(function(data, status){
//                 if(status === 'success') {
//
//                 }
//             });
//         }
//         else{
//             return;
//         }
//    });
// }