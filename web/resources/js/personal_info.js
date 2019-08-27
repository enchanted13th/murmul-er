var id = "";
var pwd = "";
var realname = "";
var nickname = "";
var email = "";
var phone = "";

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
    $.ajax('/mypage/personal-info', {
        type: 'POST',
        data: {
            realname: realname,
            nickname: nickname,
            email: email,
            phone: phone,
            pwd: pwd
        }
    }).then(function (data, status) {
        var obj = JSON.parse(data);
        if (status === 'success') {
            switch (obj.updateResult) {
                case "SUCCESS":
                    Swal.fire("변경 성공",'개인정보 변경에 성공하였습니다.','success')
                        .then(function(){ location.href = ""; });
                    break;
                case "WRONG_PWD":
                    swalFocus('변경 실패','현재 비밀번호가 일치하지 않습니다.', 'warning', '#inputPwd');
                    break;
                case "FAIL":
                    Swal.fire("변경 실패",'개인정보 변경에 실패하였습니다.','error');
                    break;
            }
        } else {
            Swal.fire('연결 오류', '잠시 후 다시 시도해주세요.', 'error');
        }
    })
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
    id = defend($('#inputId').val());
    pwd = defend($('#inputPwd').val());
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

    if (id === "" || pwd === "" || realname === "" || nickname === "" || emailId === "" || domain === "" || phone1 === "" || phone2 === "" || phone3 === "")
        return false;

    email = emailId+"@"+domain;
    phone = phone1+"-"+phone2+"-"+phone3;

    if (!idRegExp.test(id)) {
        return pleaseReenter('아이디 유효조건', '영문으로 시작 / 영문, 숫자, 특수문자(-,_) 가능 / 6-20자', '#inputId');
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