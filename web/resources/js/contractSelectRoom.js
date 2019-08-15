$(document).ready(function(){
    $('.selectRoom').click(function () {
        let roomId = $(this).val();
        location.href = "/contract/write?jeonchaId="+jeonchaId+"&roomId="+roomId;
    })
    $('#cancel').clickCancelBtn();
})

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
                window.close();
            }
        })
    })
}