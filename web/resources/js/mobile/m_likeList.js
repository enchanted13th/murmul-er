var btnExit = function () {
    $.showLoginPopup();
}

$.showLoginPopup = function () {
    if ($('#menuPopup').length !== 0) {
        $(document.body).css('overflow', '');
        $('body').find('.menuPopup').remove();
    }
    if ($('.menuPopup').length === 0) {
        $(document.body).css('overflow', 'hidden');
        let popup = $(''
            + '<div id="loginPopup" class="menuPopup">'
            + '	<div class="loginPopup">'
            + '		<div class="divClose">'
            + '			<button onclick="btnExit()">X</button>'
            + '		</div>'
            + '		<div class="logo">'
            + '			<img src="img/topbar/logo.png"></img>'
            + '		</div>'
            + '		<form method="post" name="loginForm" onsubmit="return false;">'
            + '			<div class="divInput">'
            + '				<input type="text" id="inputId" name="id" class="textbox" placeholder="아이디" required/>'
            + '				<input type="password" id="inputPwd" name="pwd" class="textbox" placeholder="비밀번호" required/>'
            + '			</div>'
            + '			<div class="hintForm">'
            + '				<a class="hint" href="">아이디 또는 비밀번호를 잊으셨나요?</a>'
            + '			</div>'
            + '			<div class="btns">'
            + '				<button type="button" id="join" class="btn" >회원가입</button>'
            + '				<button id="login" class="btn" >로그인</button>'
            + '			</div>'
            + '		</form>'
            + '	</div>'
            + '</div>').appendTo($('body'));

        popup.find('#login').click(function () {
            document.loginForm.action = "login.do";
            document.loginForm.submit();
        });

        let wh = $(window).height();
        let ph = 470;
        let top = (wh - ph) / 2 - 75;
        console.log("top:", top);
        popup.children('div').css('margin-top', top);

    } else {
        console.log("remove");
        $(document.body).css('overflow', '');
        $('body').find('.menuPopup').remove();
    }
}
