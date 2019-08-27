$.showLoginPopup = function (flag, url) {
    if ($('#menuPopup').length !== 0 || $('#joinPopup').length !== 0) {
        $(document.body).css('overflow', '');
        $('body').find('.menuPopup').remove();
    }
    if ($('.menuPopup').length === 0) {
        $(document.body).css('overflow', 'hidden');
        let popup = $(''
            + '<div id="loginPopup" class="menuPopup">'
            + '	 <div class="loginPopup">'
            + '		<div class="divClose">'
            + '			<button onclick="$.showLoginPopup()">X</button>'
            + '		</div>'
            + '		<div class="logo">'
            + '			<img src="/resources/img/topbar/logo.png"/>'
            + '		</div>'
            + '		<form method="post" name="loginForm" onsubmit="return false;">'
            + '			<div class="divInput">'
            + '				<input type="text" id="inputId" name="id" class="textbox" placeholder="아이디" autocomplete="off" required/>'
            + '				<input type="password" id="inputPwd" name="pwd" class="textbox" placeholder="비밀번호" autocomplete="off" required/>'
            + '			</div>'
            + '			<div class="btns">'
            + '				<button id="login" class="btn" >로그인</button>'
            + '				<button type="button" id="join" class="btn" >회원가입</button>'
            + '			</div>'
            + '			<div class="hintForm">'
            + '				<a class="hint" href="">아이디 또는 비밀번호를 잊으셨나요?</a>'
            + '			</div>'
            + '		</form>'
            + '	 </div>'
            + '</div>').appendTo($('body'));
        popup.find('#login').loginSubmit(flag, url);
        popup.find('#join').click(function () {
            $.showJoinPopup();
        })
        $('#inputId').focus();
        let wh = $(window).height();
        let ph = 470;
        let top = (wh - ph) / 2;
        // console.log("top:", top);
        popup.children('div').css('margin-top', top);
    } else {
        $(document.body).css('overflow', '');
        $('body').find('.menuPopup').remove();
    }
}

$.fn.loginSubmit = function (flag, url) {
    $(this).click(function () {
        let id = defend($('#inputId').val());
        let pwd = defend($('#inputPwd').val());
        if (id === '' || pwd === '') return;
        $.ajax('/member/login', {
            type: 'POST',
            data: {id: id, pwd: pwd}
        }).then(function (data, status) {
            if (status === 'success') {
                // console.log(data);
                switch (data.loginResult) {
                    case "SUCCESS":
                        Swal.fire({
                            position: 'top-end',
                            type: 'success',
                            title: data.nick + '님 안녕하세요.',
                            showConfirmButton: false,
                            timer: 1500
                        }).then(function(){
                            switch (flag) {
                                case "register":
                                case "mypage":
                                case "reviewWrite":
                                case "roomDetail":
                                    location.href = url;
                                    break;
                                case "talk":
                                    $.showTalk();
                                default:
                                    location.href = "";
                                    break;
                            }
                        })
                        break;
                    case "WRONG_ID":
                        swalFocus('로그인 실패','존재하지 않는 아이디입니다.', 'error', '#inputId');
                        break;
                    case "WRONG_PWD":
                        swalFocus('로그인 실패','비밀번호가 틀렸습니다.', 'error', '#inputPwd');
                        break;
                    case "ADMIN_LOGIN":
                        Swal.fire('','관리자 페이지로 이동합니다.',"success")
                            .then(function () {
                                location.href = "/admin";
                            });
                        break;
                }
            }
        })
    })
}


$.logout = function () {
    $.ajax({
        url: "/member/logout",
        type: "GET",
        data: {},
        success: function (data) {
            Swal.fire({
                position: 'top-end',
                type: 'success',
                title: '로그아웃 합니다.',
                showConfirmButton: false,
                timer: 1500
            }).then(function() {
                location.href = "";
            })
        }
    });
}

$.loginCheck = function(flag, url){
    if (islogin === false) {
        Swal.fire('','로그인해야 이용가능한 서비스입니다.',"warning")
            .then(function(){
                $.showLoginPopup(flag, url);
            })
    } else {
        location.href = url;
    }
}