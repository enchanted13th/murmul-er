var curpwd = "";
var newpwd1 = "";
var newpwd2 = "";

$(document).ready(function () {
    $('#btnChangePwd').css('border-bottom', '6px solid #b6e2f8');
    $('#btnUpdate').click(function () {
        $.changePwd();
    })
})

$.changePwd = function(){
    if(!$.validPwd()) return;
    $.ajax('/member/change-pwd', {
        type: 'POST',
        data: { curpwd: curpwd, newpwd: newpwd1 }
    }).then(function(data, status) {
        if(status === 'success') {
            switch (data.pwdResult) {
                case "SUCCESS":
                    Swal.fire('변경 완료', "비밀번호 변경이 완료되었습니다.", "success")
                        .then(function(){ location.href = ""; });
                    break;
                case "WRONG_CURPWD":
                    swalFocus('변경 실패','현재 비밀번호가 일치하지 않습니다.', 'warning', '#curpwd');
                    break;
                case "CHANGE_FAIL":
                    Swal.fire('변경 실패', "비밀번호 변경에 실패하였습니다.", "error");
                    break;
            }
        } else {
            Swal.fire('연결 오류', "잠시 후 다시 시도해주세요.", "error");
        }
    })
}

$.validPwd = function(){
    curpwd = defend($('#curpwd').val());
    newpwd1 = defend($('#newpwd1').val());
    newpwd2 = defend($('#newpwd2').val());

    // pwd : 영어, 숫자, 특수문자(~!#$^&*?) 가능. 6-20자
    let pwdRegExp = /^[a-zA-Z0-9~!#$^&*?]{6,20}$/;

    if (curpwd === '' || newpwd1 === '' || newpwd2 === '') {
        return false;
    }
    if (!pwdRegExp.test(curpwd)) {
        return pleaseReenter('비밀번호 유효조건','영어, 숫자, 특수문자(~!#$^&*?) 가능 / 6-20자', '#curpwd');
    }
    if (!pwdRegExp.test(newpwd1)) {
        return pleaseReenter('비밀번호 유효조건','영어, 숫자, 특수문자(~!#$^&*?) 가능 / 6-20자', '#newpwd1');
    }
    if (newpwd1 !== newpwd2) {
        return pleaseReenter('비밀번호 불일치','비밀번호 확인이 일치하지 않습니다.', '#newpwd2');
    }
    if(curpwd === newpwd1){
        return pleaseReenter('비밀번호 변경불가','변경할 비밀번호가 이전 비밀번호와 동일합니다.', '#newpwd1');
    }
    return true;
}