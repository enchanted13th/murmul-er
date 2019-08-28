var isDuplicatedCheck = false;
var id = "";
var pwd = "";
var realname = "";
var nickname = "";
var email = "";
var phone = "";

$.showJoinPopup = function () {
    if ($('#menuPopup').length !== 0 || $('#loginPopup').length !== 0) {
        $('body').find('.menuPopup').remove();
    }
    if ($('.menuPopup').length === 0) {
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
            + '						<input id="inputId" name="id" class="inputboxS" placeholder="아이디를 입력하세요" autocomplete="off" required maxlength="20"/>'
            + '						<button type="button" id="isdupli" name="isdupli" class="btn">중복 확인</button>'
            + '					</td>'
            + '				</tr>'
            + '				<tr>'
            + '					<td>비밀번호</td>'
            + '					<td><input type="password" id="inputPw" name="pwd" class="inputbox" placeholder="비밀번호를 입력하세요" autocomplete="off" required maxlength="20"/></td>'
            + '				</tr>'
            + '				<tr>'
            + '					<td></td>'
            + '					<td><input type="password" id="inputPw2" name="pwd2" class="inputbox" placeholder="비밀번호를  다시 입력하세요" autocomplete="off" required maxlength="20"/></td>				'
            + '				</tr>'
            + '				<tr>'
            + '					<td>이름</td>'
            + '					<td><input id="inputName" name="realname" class="inputbox" placeholder="이름을 입력하세요" autocomplete="off" required maxlength="10"/></td>'
            + '				</tr>'
            + '				<tr>'
            + '					<td>닉네임</td>'
            + '					<td><input id="inputNickName" name="nickname" class="inputbox" placeholder="닉네임을 입력하세요" autocomplete="off" required maxlength="10"/></td>'
            + '				</tr>'
            + '				'
            + '				<tr>'
            + '					<td>이메일</td>'
            + '					<td>'
            + '						<input id="inputEmail" name="emailId" class="inputboxS" placeholder="이메일을 입력하세요" autocomplete="off" required maxlength="20"/>'
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
            + '					</td>'
            + '				</tr>'
            + '				'
            + '				<tr>'
            + '					<td>휴대번호</td>'
            + '					<td>'
            + '						<select class="frontNum" id="frontNum" name="phone1">'
            + '							<option value="010" selected>010</option>'
            + '			                <option value="011">011</option>'
            + '			                <option value="016">016</option>'
            + '			                <option value="017">017</option>'
            + '			                <option value="018">018</option>'
            + '			                <option value="019">019</option>'
            + '		               </select>'
            + '		               <span>-</span>'
            + '		               <input id="middleNum" name="phone2" class="inputNum" maxlength="4" autocomplete="off" onkeyup="$(this).onlyNum()" required/>'
            + '		               <span>-</span>'
            + '		               <input id="backNum" name="phone3" class="inputNum" maxlength="4" autocomplete="off" onkeyup="$(this).onlyNum()" required/>'
            + '	               </td>'
            + '				</tr>'
            + '			</table>'
            + '			<div class="btns">'
            + '				<button class="btn" id="join">가입하기</button>'
            + '			</div>'
            + '		</form>'
            + '	</div>'
            + '</div>'
            + '').appendTo($('body'));

        popup.find('#join').click(joinSubmit);
        popup.find('#isdupli').click(isDuplicate);
        popup.find('#inputId').change(function(){
            isDuplicatedCheck = false;
        })
        $('#inputId').focus();

        let wh = $(window).height();
        let ph = 681;
        let top = (wh - ph) / 2;
        if (top < 0) top = 0;
        popup.children('div').css('margin-top', top);
    } else {
        $('body').find('.menuPopup').remove();
    }
}

var joinSubmit = function () {
    if (!$.validJoinInfo()) return;
    $.ajax('/member/join', {
        type: 'POST',
        data: {
            id: id,
            pwd: pwd,
            realname: realname,
            nickname: nickname,
            email: email,
            phone: phone
        }
    }).then(function (data, status) {
        if (status === 'success') {
            //console.log(data);
            switch (data.joinResult) {
                case "SUCCESS":
                    Swal.fire('가입 성공','회원가입에 성공하셨습니다. 로그인 창으로 이동합니다.',"success");
                    $.showLoginPopup();
                    break;
                case "JOIN_FAIL":
                    Swal.fire('가입 실패','회원가입에 실패하셨습니다.',"error");
                    break;
                case "ALREADY_EXIST":
                    swalFocus('아이디 중복','이미 존재하는 아이디입니다.', 'warning', '#inputId');
                    break;
            }
        } else {
            Swal.fire('연결 오류', '잠시 후 다시 시도해주세요.', 'error');
        }
        isDuplicatedCheck = false;
    })
}

var isDuplicate = function () {
    let id = defend($('#inputId').val());
    let idRegExp = /^[a-zA-Z][0-9a-zA-Z_-]{5,19}$/;
    if (!idRegExp.test(id)) {
        return pleaseReenter('아이디 유효조건', '영문으로 시작 / 영문, 숫자, 특문(-,_) 가능 / 6-20자', '#inputId');
    }
    $.ajax('/member/duplicateId', {
        type: 'POST',
        data: {id: id}
    }).then(function (data, status) {
        if (status === 'success') {
            switch (data.isDuplicatedId) {
                case true:
                    pleaseReenter('', '이미 존재하는 아이디입니다.', '#inputId');
                    break;
                case false:
                    isDuplicatedCheck = true;
                    swalFocus('','아이디 등록이 가능합니다!','success', '#inputPw');
                    break;
            }
        }
    })
}

$.validJoinInfo = function () {
    id = defend($('#inputId').val());
    pwd = defend($('#inputPw').val());
    let pwd2 = defend($('#inputPw2').val());
    realname = defend($('#inputName').val());
    nickname = defend($('#inputNickName').val());
    let emailId = defend($('#inputEmail').val());
    let domain = defend($('#domain').val());
    let phone1 = $('#frontNum').val();
    let phone2 = $('#middleNum').val();
    let phone3 = $('#backNum').val();

    // id : 영문자로 시작. 영어, 숫자, 특수문자(-_) 가능. 6-20자
    let idRegExp = /^[a-zA-Z][0-9a-zA-Z_-]{5,19}$/;
    // pwd : 영어, 숫자, 특수문자(~!#$^&*?) 가능. 6-20자
    let pwdRegExp = /^[a-zA-Z0-9~!#$^&*?]{6,20}$/;
    // name : 한글만 2-10자
    let nameRegExp = /^[가-힣]{2,10}$/;
    // nick : 한글, 영어, 숫자, 특수문자(~!#$^&*?) 가능. 2-10자
    let nickRegExp = /^[a-zA-Z0-9가-힣ㄱ-ㅎㅏ-ㅣ~!#$^&*?]{2,10}$/;
    // email : 영어, 숫자, 특수문자(_) 가능. 5-20자
    let emailIdRegExp = /^[a-z0-9_]{5,20}$/;
    // domain : 영어만 2-15자 + .com|net|co.kr|ac.kr|kr 가능
    let domainRegExp = /^[a-z]{2,15}\.(com|net|co.kr|ac.kr|kr)$/;
    // let emailRegExp = /^[a-z0-9_]{5,20}@[a-z]{2,15}\.(com|net|co.kr|ac.kr|kr)$/;
    // phone : 숫자 10-11자
    let phoneRegExp = /^[0-9]{3}-[0-9]{3,4}-[0-9]{4}$/;
    let phone1RegExp = /^[0-9]{3}$/;
    let phone2RegExp = /^[0-9]{3,4}$/;
    let phone3RegExp = /^[0-9]{4}$/;

    if (id === "" || pwd === "" || pwd2 === "" || realname === "" || nickname === "" || emailId === "" || domain === "" || phone1 === "" || phone2 === "" || phone3 === "")
        return false;

    email = emailId+"@"+domain;
    phone = phone1+"-"+phone2+"-"+phone3;

    if (!isDuplicatedCheck) {
        return pleaseReenter('', '아이디 중복 체크를 해주세요!', '#inputId');
    }
    if (!idRegExp.test(id)) {
        return pleaseReenter('아이디 유효조건', '영문으로 시작 / 영문, 숫자, 특수문자(-,_) 가능 / 6-20자', '#inputId');
    }
    if (!pwdRegExp.test(pwd)) {
        return pleaseReenter('비밀번호 유효조건','영어, 숫자, 특수문자(~!#$^&*?) 가능 / 6-20자', '#inputPw');
    }
    if (pwd !== pwd2) {
        return pleaseReenter('비밀번호 불일치','비밀번호 확인이 일치하지 않습니다.', '#inputPw2');
    }
    if(!nameRegExp.test(realname)){
        return pleaseReenter('이름 유효조건','한글만 가능 / 2-10자', '#inputName');
    }
    if(!nickRegExp.test(nickname)){
        return pleaseReenter('닉네임 유효조건','한글, 영어, 숫자, 특수문자(~!#$^&*?) 가능 / 2-10자', '#inputNickName');
    }
    if (!emailIdRegExp.test(emailId)) {
        return pleaseReenter('이메일아이디 유효조건','영어, 숫자, 특수문자(_) 가능 / 5-20자', '#inputEmail');
    }
    if (!domainRegExp.test(domain)) {
        return pleaseReenter('이메일도메인 유효조건','영어만 2-15자 + .com / net / co.kr / ac.kr / kr 가능', '#domain');
    }
    if (!phone1RegExp.test(phone1)) {
        return pleaseReenter('휴대번호 유효조건','앞자리는 숫자 3자리여야 합니다.', '#frontNum');
    }
    if (!phone2RegExp.test(phone2)) {
        return pleaseReenter('휴대번호 유효조건','가운데 자리는 숫자 3-4자리여야 합니다.', '#middleNum');
    }
    if (!phone3RegExp.test(phone3)) {
        return pleaseReenter('휴대번호 유효조건','뒷자리는 숫자 4자리여야 합니다.', '#backNum');
    }
    if (!phoneRegExp.test(phone)) {
        return pleaseReenter('휴대번호 유효조건','휴대전화는 숫자 10-11자리여야 합니다.', '#middleNum');
    }
    return true;
}