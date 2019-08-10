$(document).ready(function () {

    $('#btnPersonalInfo').css('border-bottom', '6px solid #b6e2f8');
})

var infoUpdate = function () {
    if (!$.validUpdateInfo()) return;
    let email = $('#inputEmail').val() + "@" + $('#domain').val();
    let phone = $('#frontNum').val() + "-" + $('#middleNum').val() + "-" + $('#backNum').val();

    $.ajax('/mypage/personal-info', {
        type: 'POST',
        data: {
            realname: $('#inputName').val(),
            nickname: $('#inputNickName').val(),
            email: email,
            phone: phone
        }
    }).then(function (data, status) {
        var obj = JSON.parse(data);
        if (status === 'success') {
            switch (obj.updateResult) {
                case "SUCCESS":
                    alert("회원정보 수정 성공");
                    break;
                case "FAIL":
                    alert("회원정보 수정 실패");
                    break;
            }
        }
    })
}

window.onload = function() {
    setDomain();
    setFrontNum();
}


var guitar = function () {
    if ($('#domain').val() === '기타') {
        $('#domain').remove();
        let textbox = $('' + '<input type="text" name="domain" class="tdomain" required>' + '')
            .appendTo($('#at'));
        textbox.focus();
    }
}

var setDomain = function() {
    optcnt = document.getElementById('domain').options.length;
    for(i = 0 ; i < optcnt; i++){
        if(document.getElementById('domain').options[i].value == domain) {
            document.getElementById('domain').options[i].selected = true;
            break;
        }
    }

}

var setFrontNum = function() {

    optcnt = document.getElementById('frontNum').options.length;
    for(i = 0 ; i < optcnt; i++){
        if(document.getElementById('frontNum').options[i].value == phone1) {
            document.getElementById('frontNum').options[i].selected = true;
            break;
        }
    }
}

$.validUpdateInfo = function () {
    let realname = $('#inputName').val();
    let nickname = $('#inputNickName').val();
    let emailId = $('#inputEmail').val();
    let domain = $('#domain').val();

    if (realname === "" || nickname === "" || emailId === "")
        return false;
    if (emailId === '') {
        Swal.fire('','이메일을 등록해주세요.',"warning");
        document.joinForm.emailId.focus();
        return false;
    }
    if (realname === '' || realname.length > 10) {
        Swal.fire('','이름은 10자 이하입니다.');
        document.joinForm.realname.focus();
        return false;
    }
    if (nickname === '' || nickname.length > 13) {
        Swal.fire('','닉네임은 10자 이하입니다.',"warning");
        document.joinForm.nickname.focus();
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