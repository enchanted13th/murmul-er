var checkList = [];

$(document).ready(function () {
    $.setCenter();
})

$("#check_all").click(function(){
    $("#dataTable > tbody > tr > td > input[name='del_chk']").prop('checked', $(this).is(":checked"));
});

$.fn.checkOnOff = function(id) {
    if($(this).is(':checked')){
        checkList.push(id);
        console.log(checkList);
    }else{
        let idx = checkList.indexOf(id);
        checkList.splice(idx, 1);
    }
}

$.checkListToString = function(checkList){
    let string = "";
    for(let value in checkList)
        string += checkList[value]+",";
    return string;
}

$('#delbtn').click(function(){
    let temp_ids = $.checkListToString(checkList);
    $('input:checkbox[name="del_chk"]').each(function () {
        if (this.checked) {
            temp_ids += this.value + ",";
        }
    })
    if(temp_ids === "") {
        Swal.fire('삭제할 내용을 먼저 체크해주세요.');
        return;
    }
    Swal.fire({
        title: "삭제",
        text: "정말로 삭제하시겠습니까?",
        type: "warning",
        showCancelButton: true,
        confirmButtonColor: '#3085d6',
        confirmButtonText: '확인',
        cancelButtonColor: '#d33',
        cancelButtonText: '취소'
    }).then(result => {
        if (result.value) {
            $.deleteAll(temp_ids, fromWhere);
        }
        else {
            Swal.fire('삭제를 취소하였습니다.');
        }
    })
})

$.deleteAll = function (temp_ids, fromWhere) {
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
