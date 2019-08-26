$(document).ready(function () {
    $.setDomain();
    $.setFrontNum();
    $('#btnPersonalInfo').css('border-bottom', '6px solid #b6e2f8');
})

$.infoUpdate = function () {
    if (!$.validUpdateInfo()) return;
    Swal.fire({
        title: "개인정보 수정",
        text: "수정하시겠습니까?",
        type: "question",
        showCancelButton: true,
        confirmButtonColor: '#3085d6',
        confirmButtonText: '확인',
        cancelButtonColor: '#d33',
        cancelButtonText: '취소'
    }).then(result => {
        if (result.value) {
            $.updateSubmit();
        }
    })
}

$.updateSubmit = function () {
    let email = defend($('#inputEmail').val()) + "@" + defend($('#domain').val());
    let phone = defend($('#frontNum').val()) + "-" + defend($('#middleNum').val()) + "-" + defend($('#backNum').val());
    $.ajax('/mypage/personal-info', {
        type: 'POST',
        data: {
            realname: defend($('#inputName').val()),
            nickname: defend($('#inputNickName').val()),
            email: email,
            phone: phone,
            pwd: defend($('#inputPwd').val())
        }
    }).then(function (data, status) {
        var obj = JSON.parse(data);
        if (status === 'success') {
            switch (obj.updateResult) {
                case "SUCCESS":
                    Swal.fire("수정 성공",'','success');
                    break;
                case "WRONG_PWD":
                    Swal.fire('오류', '현재 비밀번호가 일치하지 않습니다.', 'warning');
                    break;
                case "FAIL":
                    Swal.fire("수정 실패",'','error');
                    break;
            }
        }
    })
}

$.guitar = function () {
    if ($('#domain').val() === '기타') {
        $('#domain').remove();
        let textbox = $('' + '<input type="text" id="domain" name="domain" class="tdomain" autocomplete="off" required>' + '')
            .appendTo($('#at'));
        textbox.focus();
    }
}

$.setDomain = function() {
    $('#domain').val(domain).prop('selected', true);
    if($('#domain').val() == null) {
        $('#domain').val('기타').prop('selected', true);
        guitar();
        $('.tdomain').val(domain);
    }
}

$.setFrontNum = function() {
    $('#frontNum').val(phone1).prop('selected', true);
}

$.validUpdateInfo = function () {
    let nickname = defend($('#inputNickName').val());
    let emailId = defend($('#inputEmail').val());
    let domain = defend($('#domain').val());
    let email = emailId + "@" + domain;
    let pwd = defend($('#inputPwd').val());
    let regExp = /[0-9a-zA-Z][0-9a-zA-Z\_\-\.\+]+[0-9a-zA-Z]@[0-9a-zA-Z][0-9a-zA-Z\_\-]*[0-9a-zA-Z](\.[a-zA-Z]{2,3}){1,2}/;
    // console.log(domain);
    if (nickname === "" || emailId === "" || pwd === "" || domain === "")
        return false;
    if (nickname.length > 13) {
        Swal.fire('재입력 요구','닉네임은 13자 이하입니다.',"warning");
        document.updateForm.nickname.focus();
        return false;
    }
    if (email.length > 50) {
        Swal.fire('재입력 요구','이메일은 도메인 포함 50자 이하입니다.',"warning");
        document.updateForm.emailId.focus();
        return false;
    }
    if (email.match(regExp)[0] !== email){
        Swal.fire('재입력 요구','이메일 유효조건에 어긋납니다.',"warning");
        document.updateForm.emailId.focus();
        return false;
    }
    return true;
}

function isNumber(s) {
    s += ''; // 문자열로 변환
    s = s.replace(/^\s*|\s*$/g, ''); // 좌우 공백 제거
    if (s == '' || isNaN(s)) return false;
    return true;
}