$(document).ready(function () {
    if (islogin === false) {
        location.href = "/";
    }
    $('#btnPutRoom').click(function () {
        location.href = "/manage/room";
    });

    $('#btnManageRoom').click(function () {
        location.href = "/manage";
    });

    $('#btnManageRoom').parent().css('border-bottom', '6px solid #b6e2f8');

    var selectedDelete = 0;
    var selectedComplete = 0;
    var selectedEnd = 0;

    $('.btnDelete').click(function () {

        $.ajax('/manage/room', {
            type: 'DELETE',
            data: {
                roomId: $(this).val()
            }
        }).then(function (data, status) {
            if (status === "success") {
                location.href = "/manage";
            } else {
                alert('방 삭제에 실패했습니다.');
            }
        });
    });

    $('.btnComplete').click(function () {
        selectedComplete = $(this).attr('id').split('btnComplete')[1];
        if ($(this).text() == '거래완료'
    )
        {
            $.ajax('modifyPost', {
                type: 'POST',
                data: {roomId: $(this).val(), postType: '거래완료'}
            }).then(function (data, status) {
                if (status === 'success') {
                    document.getElementById('btnComplete' + selectedComplete).innerHTML = '재게시';
                    document.getElementById('tdroomState' + selectedComplete).innerHTML = "거래완료";
                }
            })
        }
    else
        if ($(this).text() == '재게시') {
            $.ajax('modifyPost', {
                type: 'POST',
                data: {roomId: $(this).val(), postType: '게시중'}
            }).then(function (data, status) {
                if (status === 'success') {
                    document.getElementById('btnComplete' + selectedComplete).innerHTML = '거래완료';
                    document.getElementById('tdroomState' + selectedComplete).innerHTML = "게시중";
                }
            })
        }
    });

    $('.btnEnd').click(function () {
        selectedEnd = $(this).attr('id').split('btnEnd')[1];

        $.ajax('modifyPost', {
            type: 'POST',
            data: {roomId: $(this).val(), postType: '게시종료'}
        }).then(function (data, status) {
            if (status === 'success') {
                document.getElementById("tdroomState" + selectedEnd).innerHTML = "거래종료";
            }
        })

    });
});