
// import swal from 'sweetalert';
// const Toast = Swal.mixin({
//     toast: true,
//     position: 'top-end',
//     showConfirmButton: false,
//     timer: 3000
// });

$(document).ready(function () {

    $('#btnLogo').click(function () {
        location.href = '/';
    });

    $('#btnSearch').click(function () {
        location.href = '/searchRoom';
    });

    $('#btnMenu').click(function () {
        $.showPopup();
    });
    $('#btnLogin').click(function () {
        $.showLoginPopup();
    })
    $('#btnJoin').click(function () {
        $.showJoinPopup();
    })
    $('#btnLogout').click(function () {
        $.logout();
    })
});

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

$.showPopup = function () {
    if ($('#joinPopup').length !== 0 || $('#loginPopup').length !== 0) {
        return;
    }
    if ($('.menuPopup').length === 0) {
//		$(document.body).css('overflow', 'hidden');
        let popup = $(''
            + '	<div id="menuPopup" class="menuPopup" onclick="$.showPopup()">'
            + '		<div class="menus">'
            + '			<ul>'
            + '				<li><button id="btnMenuSearch"><img src="/resources/img/topbar/searchM.png"/></button></li>'
            + '				<li><button id="btnMenuAddRoom"><img src="/resources/img/topbar/addRoomM.png"/></button></li>'
            + '				<li><button id="btnMenuReview" ><img src="/resources/img/topbar/reviewM.png"/></button></li>'
            + '				<li><button id="btnMenuAccount"><img src="/resources/img/topbar/accountM.png"/></button></li>'
            + '				<li><button id="btnMenuService"><img src="/resources/img/topbar/serviceM.png"/></button></li>'
            + '			</ul>'
            + '		</div>'
            + '	</div>').appendTo($('body'));

        popup.find('#btnMenuSearch').click(function () {
            location.href = '/searchRoom';
        });

        popup.find('#btnMenuAddRoom').click(function () {
            if (islogin === false) {
                $.showLoginPopup("register");
                alert('로그인해야 이용가능한 서비스입니다.');
            } else {
                location.href = '/manage';
            }
        });

        popup.find('#btnMenuReview').click(function () {
            location.href = '../review.jsp';
        });

        popup.find('#btnMenuAccount').click(function () {
            if (islogin === false) {
                $.showLoginPopup("mypage");
                alert('로그인해야 이용가능한 서비스입니다.');
            } else {
                location.href = '/mypage/recent';
            }
        });

        popup.find('#btnMenuService').click(function () {
            location.href = '/service/notice?page=1';
        });

//		popup.find('button').click(function(){
//			popup.remove();
//		});

        let wh = $(window).height();
        let ph = 200;
        let top = (wh - ph) / 2;
        popup.children('div').css('margin-top', top);

    } else {
//		$(document.body).css('overflow', '');
        $('body').find('.menuPopup').remove();
    }
}

$.showLoginPopup = function (flag) {
    if ($('#menuPopup').length !== 0 || $('#joinPopup').length !== 0) {
		$(document.body).css('overflow', '');
        $('body').find('.menuPopup').remove();
        // console.log('메뉴팝업지워야함');
    }
    if ($('.menuPopup').length === 0) {
        // console.log('로그인팝업 생성하러옴');
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
        // console.log('생성함');
        popup.find('#login').click(function () {
            //document.loginForm.action = "login";
            //document.loginForm.submit();
            if ($('#inputId').val() == '') return;
            if ($('#inputPwd').val() == '') return;
            $.ajax('/member/login', {
                type: 'POST',
                data: {id: $('#inputId').val(), pwd: $('#inputPwd').val()}
            }).then(function (data, status) {
                if (status === 'success') {
                    // console.log(data);
                    // console.log(typeof data);
                    switch (data.loginResult) {
                        case "SUCCESS":
                            Swal.fire({
                                position: 'top-end',
                                type: 'success',
                                title: data.nick + '님 안녕하세요.',
                                showConfirmButton: false,
                                timer: 1500
                            }).then(function(){
                                if (flag === "register") location.href = "/manage";
                                else if (flag === "mypage") location.href = "/mypage/recent";
                                else if (flag === "reviewWrite") location.href = "/reviewWrite.jsp";
                                else location.href = "";
                            })
                            break;
                        case "WRONG_ID":
                            Swal.fire('로그인 실패','존재하지 않는 아이디입니다.', 'error');
                            // document.loginForm.id.focus();
                            break;
                        case "WRONG_PWD":
                            Swal.fire('로그인 실패','비밀번호가 틀렸습니다.', 'error');
                            // document.loginForm.pwd.focus();
                            break;
                        case "ADMIN_LOGIN":
                            // alert('관리자 페이지로 이동합니다.');
                            // Toast.fire({type: 'success', title: '관리자 페이지로 이동합니다.'});
                            location.href = "/admin";
                            break;
                    }
                }
            })
        });
        // console.log('로그인버튼 붙임');
        popup.find('#join').click(function () {
            $.showJoinPopup();
        })
        // console.log('조인버튼 붙임');
        document.loginForm.id.focus();
        let wh = $(window).height();
        let ph = 470;
        let top = (wh - ph) / 2;
        // console.log("top:", top);
        popup.children('div').css('margin-top', top);
        // console.log('탑 설정');

    } else {
        // console.log("remove");
		$(document.body).css('overflow', '');
        $('body').find('.menuPopup').remove();
    }
}

$.showJoinPopup = function () {
    if ($('#menuPopup').length !== 0 || $('#loginPopup').length !== 0) {
//		$(document.body).css('overflow', '');
        $('body').find('.menuPopup').remove();
    }
    if ($('.menuPopup').length === 0) {
//		$(document.body).css('overflow', 'hidden');
        let popup = $(''
            + '	<div id="joinPopup" class="menuPopup" >'
            + '	<div class="joinPopup">'
            + '		<div class="divClose">'
            + '			<button onclick="$.showJoinPopup()">X</button>'
            + '		</div>'
            + '		<div class="logo">'
            + '			<img src="/resources/img/topbar/logo.png"></img>'
            + '		</div>'
            + '		<h1 align="center">회 원 가 입</h1>'
            + '		<form name="joinForm" method="post" onsubmit="return false;">'
            + '			<table class="tbInfo">'
            + '				<tr>'
            + '					<td>아이디</td>'
            + '					<td>'
            + '						<input id="inputId" name="id" class="inputboxS" placeholder="아이디를 입력하세요" autocomplete="off" required/>'
            + '						<button type="button" id="isdupli" name="isdupli" class="btn">중복 확인</button>'
            + '					</td>'
            + '				</tr>'
            + '				<tr>'
            + '					<td>비밀번호</td>'
            + '					<td><input type="password" id="inputPw" name="pwd" class="inputbox" placeholder="비밀번호를 입력하세요" autocomplete="off" required/></td>'
            + '				</tr>'
            + '				<tr>'
            + '					<td></td>'
            + '					<td><input type="password" id="inputPw2" name="pwd2" class="inputbox" placeholder="비밀번호를  다시 입력하세요" autocomplete="off" required/></td>				'
            + '				</tr>'
            + '				<tr>'
            + '					<td>이름</td>'
            + '					<td><input id="inputName" name="realname" class="inputbox" placeholder="이름을 입력하세요" autocomplete="off" required/></td>'
            + '				</tr>'
            + '				<tr>'
            + '					<td>닉네임</td>'
            + '					<td><input id="inputNickName" name="nickname" class="inputbox" placeholder="닉네임을 입력하세요" autocomplete="off" required/></td>'
            + '				</tr>'
            + '				'
            + '				<tr>'
            + '					<td>이메일</td>'
            + '					<td>'
            + '						<input id="inputEmail" name="emailId" class="inputboxS" placeholder="이메일을 입력하세요" autocomplete="off" required/>'
            + '						<span id="at" class="at">@</span>'
            + '						<select id="domain" name="domain" class="domain" name="domain" onchange="guitar()">'
            + '							<option selected>naver.com</option>'
            + '							<option>hanmail.net</option>'
            + '							<option>gmail.com</option>'
            + '							<option>nate.com</option>'
            + '							<option>icloud.com</option>'
            + '							<option>empas.com</option>'
            + '							<option>기타</option>'
            + '						</select>'
            + '					</td>				'
            + '				</tr>'
            + '				'
            + '				<tr>'
            + '					<td>휴대번호</td>'
            + '					<td>'
            + '						<select class="frontNum" id="frontNum" name="phone1">'
            + '							<option value="010">010</option>'
            + '			                <option value="011">011</option>'
            + '			                <option value="016">016</option>'
            + '			                <option value="017">017</option>'
            + '			                <option value="018">018</option>'
            + '			                <option value="019">019</option>'
            + '		               </select>'
            + '		               <span>-</span>'
            + '		               <input id="middleNum" name="phone2" class="inputNum" maxlength="4" autocomplete="off" required/>'
            + '		               <span>-</span>'
            + '		               <input id="backNum" name="phone3" class="inputNum" maxlength="4" autocomplete="off" required/>'
            + '	               </td>		'
            + '				</tr>'
            + '			</table>'
            + '			<div class="btns">'
            + '				<button class="btn" id="join">가입하기</button>'
            + '			</div>'
            + '		</form>'
            + '	</div>'
            + '</div>'
            + '').appendTo($('body'));

        popup.find('#join').click(function () {
//				alert('join!');
//		   	document.joinForm.action = "join.do";
//		   	document.joinForm.submit();
            if (!$.validJoinInfo()) return;
            let email = $('#inputEmail').val() + "@" + $('#domain').val();
            let phone = $('#frontNum').val() + "-" + $('#middleNum').val() + "-" + $('#backNum').val();
            $.ajax('/member/join', {
                type: 'POST',
                data: {
                    id: $('#inputId').val(), pwd: $('#inputPw').val(),
                    realname: $('#inputName').val(), nickname: $('#inputNickName').val(),
                    email: email, phone: phone
                }
            }).then(function (data, status) {
                if (status === 'success') {
                    //console.log(data);
                    switch (data.joinResult) {
                        case "SUCCESS":
                            alert('회원가입에 성공하셨습니다. 로그인 창으로 이동합니다.');
                            $.showLoginPopup();
                            break;
                        case "JOIN_FAIL":
                            alert('회원가입에 실패하셨습니다.');
                            break;
                    }
                    isDuplicatedCheck = false;
                }
            })
        });
        popup.find('#isdupli').click(function () {
            let id = $('#inputId').val();
            if (id.length < 6 || id.length > 20) {
                alert('아이디는 최소 6자 이상, 최대 20자 이하입니다.');
                document.joinForm.id.focus();
                return;
            }
            document.joinForm.pwd.focus();
            $.ajax('/member/duplicateId', {
                type: 'POST',
                data: {id: id}
            }).then(function (data, status) {
                if (status === 'success') {
					console.log(data);
					console.log(typeof data);
                    switch (data.isDuplicatedId) {
                        case true:
                            alert('이미 존재하는 아이디입니다.');
                            break;
                        case false:
                            alert('아이디 등록이 가능합니다!');
                            isDuplicatedCheck = true;
                            break;
                    }
                }
            })
        })

        popup.find('#inputId').change(function(){
            isDuplicatedCheck = false;
            // console.log("change ...", isDuplicatedCheck);
        })

        document.joinForm.id.focus();
        let wh = $(window).height();
        let ph = 681;
        let top = (wh - ph) / 2;
        if (top < 0) top = 0;
        // console.log("top:", top);
        popup.children('div').css('margin-top', top);

    } else {
        // console.log("remove");
//		$(document.body).css('overflow', '');
        $('body').find('.menuPopup').remove();
    }
}
var guitar = function () {
    if ($('#domain').val() === '기타') {
        $('#domain').remove();
        let textbox = $('' + '<input type="text" id="domain" name="domain" class="tdomain textbox" required>' + '')
            .appendTo($('#at'));
        textbox.focus();
    }
}
var isDuplicatedCheck = false;
$.validJoinInfo = function () {
    let id = $('#inputId').val();
    let pwd = $('#inputPw').val();
    let pwd2 = $('#inputPw2').val();
    let realname = $('#inputName').val();
    let nickname = $('#inputNickName').val();
    let emailId = $('#inputEmail').val();
    let domain = $('#domain').val();
    let phone1 = $('#frontNum').val();
    let phone2 = $('#middleNum').val();
    let phone3 = $('#backNum').val();
    if (id === "" || pwd === "" || pwd2 === "" || realname === "" || nickname === "" || emailId === "" || domain === "" || phone1 === "" || phone2 === "" || phone3 === "")
        return false;
    if (id.length < 6 || id.length > 20) {
        Swal.fire('','아이디는 최소 6자 이상, 최대 20자 이하입니다.',"warning");
        document.joinForm.id.focus();
        return false;
    }
    if (!isDuplicatedCheck) {
        Swal.fire('','아이디 중복 체크를 해주세요!',"warning");
        document.joinForm.isdupli.focus();
        return false;
    }
    if (pwd.length < 6 || pwd.length > 20) {
        Swal.fire('','비밀번호는 최소 6자 이상, 최대 20자 이하입니다.',"warning");
        document.joinForm.pwd.focus();
        return false;
    }
    if (pwd !== pwd2) {
        Swal.fire('','비밀번호 확인이 일치하지 않습니다.',"warning");
        document.joinForm.pwd2.focus();
        return false;
    }
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
    if (!isNumber(phone2)) {
        Swal.fire('','휴대번호는 숫자만 입력해주세요.',"warning");
        document.joinForm.phone2.focus();
        return false;
    }
    if (!isNumber(phone3)) {
        Swal.fire('','휴대번호는 숫자만 입력해주세요.',"warning");
        document.joinForm.phone3.focus();
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
