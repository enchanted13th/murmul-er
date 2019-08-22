$(document).ready(function () {
    // let wh = $(window).height();
    // let ph = 622;
    // let top = (wh - ph) / 2;
    // $('body').find('.wrapLogin').children('div').css('margin-top', top);

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
                        if (flag === "mypage") location.href = "/mypage/recent";
                        else if (flag === "talk") { $.showTalk(); location.href="";}
                        else location.href = "/test/main";
                    })
                    break;
                case "WRONG_ID":
                    Swal.fire('로그인 실패', '존재하지 않는 아이디입니다.', 'error')
                        .then(function() {
                            Swal.close();
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
    if($('#inputId').val() === ''){
       Swal.fire('', '아이디를 입력하세요.','warning');
        $('#inputId').focus();
        return false;
    }

    if($('#inputPwd').val() == ''){
        Swal.fire('', '비밀번호를 입력하세요.','warning');
        $('#inputPwd').focus();
        return false;
    }

    return true;
}