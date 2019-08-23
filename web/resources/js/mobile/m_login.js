var loginInfo = {}

$(document).ready(function () {
    $('.loginBtn').click(function(){
        $.sendData();
    })
});

$.sendData = function(){
    if(!$.checkValid())
        return false;

    $.ajax('/member/login',{
        type: 'POST',
        data:{
            id: $('#inputId').val(),
            pwd: $('#inputPwd').val()
        }
    }).then(function(data, status){
        if(status === "success"){
            switch (data.loginResult) {
                case "SUCCESS":
                    Swal.fire({
                        type: 'success',
                        title: data.nick + '님 안녕하세요.',
                        showConfirmButton: false,
                        timer: 1500
                    }).then(function(){
                        // 액티비티에 알려줘야함
                        window.login.setLogin(data.nick, data.id);
                    })
                    break;
                case "WRONG_ID":
                    Swal.fire('로그인 실패', '존재하지 않는 아이디입니다.', 'error')
                        .then(function() {
                            $('#inputId').focus();
                        })
                    break;
                case "WRONG_PWD":
                    Swal.fire('로그인 실패', '비밀번호가 틀렸습니다.' ,'error')
                        .then(function(){
                            $('#inputPwd').focus();
                        })
                    break;
            }
        }
    });
}

$.checkValid = function() {
    let id = $('#inputId').val();
    let pwd = $('#inputPwd').val();
    if(id === '' || pwd === '') return false;
    return true;
}