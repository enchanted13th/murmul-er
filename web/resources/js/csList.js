
var delList = function(){
    let temp_ids;
    temp_ids = "";
    $('input:checkbox[name="delete"]').each(function () {
        if (this.checked) {
            temp_ids += this.value + ",";
            console.log(temp_ids)
        }
    })
    if(temp_ids === "") {
        Swal.fire('취소할 FAQ를 선택하여 주세요.');
        return;
    }

    Swal.fire({
        title: "삭제",
        text: "정말로 삭제하시겠습니까?",
        type: "warning",
        showCancelButton: true,
        confirmButtonColor: '#8FCC26',
        confirmButtonText: '확인',
        cancelButtonColor: '#d33',
        cancelButtonText: '취소'
    }).then(result => {
        if (result.value)
            $.deleteAllList(temp_ids);
        else
            Swal.fire('삭제를 취소하였습니다.');
    })

    $.deleteAllList = function(temp_ids){
        console.log("temp: "+ temp_ids);
        $.ajax('/admin/deleteAll', {
            type: 'POST',
            data: {del_ids: temp_ids, fromWhere: "faq"}
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
}