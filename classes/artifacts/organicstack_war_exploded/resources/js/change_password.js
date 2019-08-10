$(document).ready(function () {
    $('#btnChangePwd').css('border-bottom', '6px solid #b6e2f8');
})

var pwdUpdate = function () {
    if(!$.validPwd()) return;
    let curpwd = $('#curpwd').val();
    let newpwd = $('#newpwd1').val();
    $.changePwd(curpwd, newpwd);
}

$.changePwd = function(curpwd, newpwd){
    $.ajax('/member/change-pwd', {
        type: 'POST',
        data: { curpwd: curpwd, newpwd: newpwd }
    }).then(function(data, status) {
        if(status === 'success') {
            console.log(data);
            switch (data.pwdResult) {
                case "SUCCESS":
                    Swal.fire('비밀번호 변경이 완료되었습니다.', "", "success")
                        .then(function(){ location.href = ""; });
                    break;
                case "WRONG_CURPWD":
                    Swal.fire('현재 비밀번호가 일치하지 않습니다.', "", "error");
                    break;
                case "CHANGE_FAIL":
                    Swal.fire('비밀번호 변경에 실패하였습니다.', "", "error");
                    break;
            }
        } else {
            Swal.fire('비밀번호 변경에 실패하였습니다.', "", "error");
        }
    })
}

$.validPwd = function(){
    let curpwd = $('#curpwd').val();
    let newpwd1 = $('#newpwd1').val();
    let newpwd2 = $('#newpwd2').val();

    if (curpwd === '' || newpwd1 === '' || newpwd2 === '') {
        return false;
    }
    if(curpwd.length < 6 || curpwd.length > 20) {
        Swal.fire('','비밀번호는 최소 6자 이상, 최대 20자 이하입니다.',"warning");
        document.updateForm.curpwd.focus();
        return false;
    }
    if(newpwd1.length < 6 || newpwd1.length > 20) {
        Swal.fire('','비밀번호는 최소 6자 이상, 최대 20자 이하입니다.',"warning");
        document.updateForm.newpwd1.focus();
        return false;
    }
    if ($('#newpwd1').val() !== $('#newpwd2').val()) {
        Swal.fire('','변경할 비밀번호가 비밀번호 확인과 일치하지 않습니다.',"warning");
        document.updateForm.newpwd1.focus();
        return false;
    }
    return true;
}