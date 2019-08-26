$(document).ready(function () {
    $("#report").click(function () {
        $.report();
    })
})

$.report = function () {
    if ($('.menuPopup').length === 0) {
        $(document.body).css('overflow', 'hidden');
        let reportPopup = $(''
            + '<form id="reportForm" class="menuPopup" onSubmit="return false">'
            + '	<div class="repWrap">'
            + '		<div class="divTitle">'
            + '			<div><button class="btnCancel" id="btnCancel">X</button></div>'
            + '			<div class="repTitle">허위매물 신고</div>'
            + '		</div>'
            + '		<div class="caution">'
            + '			<h1 class="lbCaution">매물에 대한 잘못된 정보를 신고해주세요!</h1><br>'
            + '			<label class="taCaution">확인 후 허위 매물일 경우 해당 매물은 삭제되거나 이용이 제재됩니다. 허위 신고일시 신고자는 법적인 책임을 질 수 있습니다.</label>'
            + '		</div>'
            + '		<div class="item">'
            + '			<h3 class="lbItem">신고항목</h3><br>'
            + '			<input type="radio" class="btnRadio" name="type" value="거래가 완료된 매물" id="contracted">거래가 완료된 매물'
            + '			<input type="radio" class="btnRadio" name="type" value="정보가 다른 매물" id="difInfo">정보가 다른 매물(가격, 사진 등)'
            + '		</div>'
            + '		<div class="repContent">'
            + '			<textarea name="content" class="taContent" style="resize:none;" placeholder="추가 설명을 입력해주세요."></textarea>'
            + '		</div>'
            + '		<div class="submit">'
            + '			<button class="btnSubmit" >허위매물 신고하기</button>'
            + '		</div>'
            + '	</div>'
            + '</form>').appendTo($('body'));

        let wh = $(window).height();
        let ph = 650;
        let top = (wh - ph) / 2;
        reportPopup.children('.repWrap').css('margin-top', top);
        $('.btnSubmit').report();
        $('.btnCancel').cancel();
    } else {
        $(document.body).css('overflow', '');
        $('body').find('#reportForm').remove();
    }
}

$.fn.cancel = function () {
    $(this).click(function () {
        $.report();
    });
}

$.fn.report = function () {
    $(this).click(function () {
        if(!$.isValid()) return;
        Swal.fire({
            title: "신고하기",
            text: "악의적인 허위 신고는 법적인 책임을 질 수 있습니다. 정말로 신고하시겠습니까?",
            type: "warning",
            showCancelButton: true,
            confirmButtonColor: '#3085d6',
            confirmButtonText: '확인',
            cancelButtonColor: '#d33',
            cancelButtonText: '취소'
        }).then(result => {
            if (result.value) {
                $.requestReport();
            }
        })
    });
}

$.isValid = function () {
    let content = $('.repContent > textarea[name=content]').val();
    if ($('.btnRadio:checked').length === 0) {
        Swal.fire('항목을 선택해주세요.', '', 'warning');
        return false;
    }
    if (content === '') {
        Swal.fire('내용을 입력해주세요.', '', 'warning');
        return false;
    }
    return true;
}

$.requestReport = function(){
    $.ajax('/report', {
        type: 'POST',
        data: {type: $('input[name=type]').val(), content: defend($('textarea[name=content]').val()), roomId: roomId}
    }).then(function (data, status) {
        if(status === 'success') {
            var obj = JSON.parse(data);
            if (obj.addReport == 'SUCCESS') {
                Swal.fire('신고 접수 완료', "", "success");
            } else {
                Swal.fire('신고 접수 실패', "", "error");
            }
            $.report();
        }
    })
}