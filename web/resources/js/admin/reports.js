const 거래완료 = '1';
const 허위매물 = '2';
var check_list = {};

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

$.setReportType = function(){
    $('.report-type').each(function(){
        switch ($(this).text()) {
            case 거래완료 :
                $(this).text('거래완료'); break;
            case 허위매물 :
                $(this).text('허위매물'); break;
        }
    })
}

$.setRoomId = function () {
    $('.room-id').each(function () {
        $(this).text('R'+$(this).text().zf(6));
    })
}

$.setContentLength = function(){
    $('.content').each(function(){
        let content = $(this).text();
        let length = content.length;
        if(length > 35) {
            $(this).text(content.substr(0, 35)+"...");
        }
    })
}

$.fn.selectStatus = async function(){
    let id = $(this).attr('id').split('btn')[1];
    /*let {value : status} = */await Swal.fire({
        title: '처리 상태 변경',
        input: 'select',
        inputOptions: {
            처리대기: '처리대기',
            처리중: '처리중',
            처리완료: '처리완료',
            처리불가: '처리불가'
        },
        inputPlaceholder: '처리상태 선택',
        showCancelButton: true,
        inputValidator: (value) => {
            return new Promise((resolve) => {
                let prevStatus = $('#ps'+id).text();
                if (value !== prevStatus) {
                    $.changeProcessStatus(id, value);
                } else {
                    resolve('이미 '+prevStatus+' 상태입니다.');
                }
            })
        }
    })
}

$.changeProcessStatus = function (id, pstatus) {
    console.log(id, pstatus);
    $.ajax('/report/change-process-status', {
        type: 'POST',
        data: {id: id, processStatus: pstatus}
    }).then(function (data, status) {
        if (status === 'success') {
            switch (data.result) {
                case "SUCCESS":
                    Swal.fire('변경 완료', '처리 상태가 변경되었습니다.', 'success')
                        .then(function () {
                            location.href = "";
                        });
                    break;
                case "FAIL":
                    Swal.fire('변경 실패', '처리 상태 변경에 실패하였습니다.', 'error');
                    break;
            }
        } else {
            Swal.fire('변경 실패', '잠시 후 다시 시도해주세요.', 'error');
        }
    })
}

$.openDetail = function(roomId) {
    let width = 1000;
    let height = 1350;
    let popupX = (window.screen.width / 2) - (width / 2);
    let popupY = (window.screen.height / 2) - (height / 2);
    window.open("/searchRoom/" + roomId, "", "status=no, width="+width+"px, height="+height+"px, left="+popupX+"px, top="+popupY+"px");
}

$.showContent = function (reportId) {
    Swal.fire({
        title: reportId + " / " + $('#rt'+reportId).text(),
        text: $('#ct'+reportId).val()
    })
}

$.setReportType();
$.setContentLength();
$.setRoomId();

$("#check_all").click(function(){
    $("#dataTable > tbody > tr > td > input[name='ban_chk']").prop('checked', $(this).is(":checked"));
});

$.fn.checkOnOff = function (reportId, roomId) {
    if ($(this).is(':checked')) {
        check_list[reportId] = roomId;
    } else {
        delete check_list[reportId];
    }
}

$.checkListToString = function () {
    let array = [];
    for (let key in check_list) {
        let value = check_list[key];
        if(array.indexOf(value) < 0) {
            array.push(value);
        }
    }
    let string = "";
    for (let value in array) {
        string += array[value] + ",";
    }
    return string;
}

$('#banbtn').click(function(){
    let temp_ids = $.checkListToString();

    if(temp_ids === "") {
        Swal.fire('게시 금지할 방을 먼저 체크해주세요.');
        return;
    }
    temp_ids = temp_ids.substr(0,temp_ids.length-1);
    Swal.fire({
        title: "게시 금지",
        text: temp_ids+"번 방을 게시 금지 상태로 바꾸시겠습니까?",
        type: "warning",
        showCancelButton: true,
        confirmButtonColor: '#3085d6',
        confirmButtonText: '확인',
        cancelButtonColor: '#d33',
        cancelButtonText: '취소'
    }).then(result => {
        if (result.value) {
            $.banRooms(temp_ids);
        }
        else {
            Swal.fire('취소하였습니다.');
        }
    })
})

$.banRooms = function (temp_ids) {
    $.ajax('/admin/ban-rooms', {
        type: 'POST',
        data: {ban_ids: temp_ids}
    }).then(function (data, status) {
        if (status === 'success') {
            switch(data.result){
                case "SUCCESS":
                    Swal.fire('변경 완료',temp_ids+'번 방을 게시 금지하였습니다.','success')
                        .then(function () {
                            location.href = "";
                        })
                    break;
                case "FAIL":
                    Swal.fire('변경 실패', '변경에 실패하였습니다.', 'error');
                    break;
            }
        } else {
            Swal.fire('변경 실패', '잠시 후 다시 시도해주세요.', 'error');
        }
    })
}
