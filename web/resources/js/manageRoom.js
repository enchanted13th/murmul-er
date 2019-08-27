$(document).ready(function () {
    $('#btnManageRoom').parent().css('border-bottom', '6px solid #b6e2f8');
    $.setPostType();
    $('.btnModify').clickModifyBtn();
    $('.btnDelete').clickDeleteBtn();
    $('.btnPt').clickPostStatBtn();
    $.setImage();
});

$.setImage = function(){
    let listSize = $('.tbList').length;
    for(let i = 0; i < listSize; i++) {
        let value = $('#uploadValue' + i).val().split(',');
        let middlePath = value[0];
        let fileName = value[1];
        let src = '/manage/download?middlePath=' + encodeURI(middlePath) + '&imageFileName=' + encodeURI(fileName);
        // console.log(src);
        $('#preview' + i).attr('src', src);
    }
}

$.setPostType = function () {
    let listSize = $('.tbList').length;
    for(let i = 0; i < listSize; i++) {
        $.setPostTypeEach(i);
    }
}
$.setPostTypeEach = function (listNum){
    let postType = $('#tdroomState'+listNum).text();
    switch (postType) {
        case "게시중" :
            $('#tdbtns'+listNum+'>.btnPost').text('게시종료');
            break;
        case "게시종료" :
            $('#tdbtns'+listNum+'>.btnPost').text('재게시');
            break;
        case "게시금지" :
            $('#tdroomState'+listNum).css('color', '#FF0000');
        case "거래완료" :
            $.setBtnDisabled(listNum);
            break;
    }
}

$.setBtnDisabled = function (listNum) {
    $('#tdbtns'+listNum+'>.btnModify').prop('disabled', 'disabled');
    $('#tdbtns'+listNum+'>.btnPost').prop('disabled', 'disabled');
    $('#tdbtns'+listNum+'>.btnDeal').prop('disabled', 'disabled');
    $('#tdbtns'+listNum+'>button').removeAttr('class');
    $('#tdbtns'+listNum+'>button').css('cursor', 'default');
    $('#tdbtns'+listNum+'>button').eq(1).attr('class', 'button btnDelete');
    $('#tdbtns'+listNum+'>button').eq(1).removeAttr('style');
}

$.fn.clickModifyBtn = function () {
    let roomId;
    $(this).click(function () {
        //roomId = $(this).attr('value');
        roomId = $(this).val();
        $('#delete'+roomId).attr('disabled', true);
        location.href = "/manage/update/"+roomId;
    })
}
$.fn.clickDeleteBtn = function () {
    // console.log($(this).parent().parent());

    $(this).click(function () {
        let listNum = $(this).parent().attr('id').split('tdbtns')[1];
        // console.log(listNum);
        Swal.fire({
            title: "방 삭제",
            text: "이 방을 정말로 삭제하시겠습니까?",
            type: "warning",
            showCancelButton: true,
            confirmButtonColor: '#3085d6',
            confirmButtonText: '확인',
            cancelButtonColor: '#d33',
            cancelButtonText: '취소'
        }).then(result => {
            if (result.value) {
                let roomId = $(this).val();
                $('#delete'+roomId).attr('disabled', true);
                $('#modify'+roomId).attr('disabled', true);
                $.deleteRoom(roomId, function(deleteResult){
                    switch (deleteResult) {
                        case "SUCCESS" :
                            Swal.fire('방 삭제', '삭제를 완료하였습니다.', 'success')
                                .then(function () {
                                    $('#tblist'+listNum).remove();
                                    //location.href = "";
                                });
                            break;
                        case "DELETE_FAIL" :
                            Swal.fire('삭제 실패', '삭제에 실패하였습니다.', 'error'); break;
                        case "CONNECT_ERROR" :
                            Swal.fire('연결 실패', '잠시후 다시 시도해주세요.', 'error'); break;
                    }
                    $('#delete'+roomId).attr('disabled', false);
                    $('#modify'+roomId).attr('disabled', false);
                });
            }
        });
    })
}

$.deleteRoom = function (roomId, callback) {
    // console.log('delete');
    $('#modify'+roomId).attr('disabled', true);
    $.ajax('/manage/room/delete', {
        type: 'POST',
        data: {roomId: roomId}
    }).then(function (data, status) {
        if (status === 'success') {
            callback(data.deleteResult);
        } else {
            callback("CONNECT_ERROR");
        }
    })
}

$.fn.changePostType = function (callback){
    let listNum = $(this).parent().attr('id').split('tdbtns')[1];
    let btnText = $(this).text();
    let roomId = $(this).val();
    let postType = (btnText === "재게시") ? "게시중" : btnText;
    $.ajax('/manage/post-status', {
        type: 'POST',
        data: {roomId: roomId, postType: postType}
    }).then(function (data, status) {
        if (status === 'success') {
            switch (data.result) {
                case "XSS_FAIL" :
                    callback(false);
                    return;
                case "UPDATE_FAIL" :
                    // console.log('update fail..');
                    callback(false);
                    return;
                case "POSTING" :
                    $('#tdroomState'+listNum).text('게시중'); break;
                case "END_POSTING" :
                    $('#tdroomState'+listNum).text('게시종료'); break;
                case "DEAL_COMPLETE" :
                    $('#tdroomState'+listNum).text('거래완료'); break;
                case "NO_POSTING" :
                    $('#tdroomState'+listNum).text('게시금지'); break;
            }
            $.setPostTypeEach(listNum);
            callback($('#tdroomState'+listNum).text());
        } else {
            // console.log(',,,,');
            return;
        }
    })
}
$.fn.clickPostStatBtn = function(){
    $(this).click(function () {
        let btnText = $(this).text();
        let swalTitle = "";
        let swalText = "";
        let swalType = "";
        switch (btnText) {
            case "게시종료" :
                swalTitle = "게시상태 변경";
                swalText = "게시종료 상태로 바꾸시겠습니까?";
                swalType = "question"; break;
            case "재게시" :
                swalTitle = "게시상태 변경";
                swalText = "이 방을 다시 게시하시겠습니까?";
                swalType = "question"; break;
            case "거래완료" :
                swalTitle = '거래완료';
                swalText = "거래완료 상태로 바꾸면 다시 게시할 수 없습니다.";
                swalType = "warning"; break;
        }
        Swal.fire({
            title: swalTitle,
            text: swalText,
            type: swalType,
            showCancelButton: true,
            confirmButtonColor: '#3085d6',
            confirmButtonText: '확인',
            cancelButtonColor: '#d33',
            cancelButtonText: '취소'
        }).then(result => {
            if (result.value) {
                $(this).changePostType(function(postType){
                    // console.log(postType);
                    if (postType === false) {
                        Swal.fire('오류발생', '게시상태 변경에 실패하였습니다.', 'error');
                    } else {
                        Swal.fire('게시상태 변경', postType+' 상태로 변경하였습니다.', 'success');
                    }
                });
            }
        });
    })
}