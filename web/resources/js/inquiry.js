var emailId = "";
var domain = "";
var content = "";
var agree = false;

$(document).ready(function () {
    $('.submit').click(function () {
        if(!validate()) return;
        Swal.fire({
            title: "문의하기",
            text: "내용을 관리자에게 전송하시겠습니까?",
            type: "question",
            showCancelButton: true,
            confirmButtonColor: '#3085d6',
            confirmButtonText: '확인',
            cancelButtonColor: '#d33',
            cancelButtonText: '취소'
        }).then(result => {
            if (result.value) {
                $.inquirySubmit();
            }
        })

    })
    $('.check').click(function () {
        $.termPopup();
    })
    $('#btnSupport').css('border-bottom', '6px solid #b6e2f8');
});

$.inquirySubmit = function () {
    $.ajax('/service/support', {
        type: 'POST',
        data: {
            emailId: emailId,
            emailDomain: domain,
            content: content,
            agree: agree,
        }
    }).then(function (data, status) {
        if (status === 'success') {
            switch (data.inquiryResult) {
                case "SUCCESS":
                    Swal.fire('등록 성공', '문의 등록이 완료되었습니다.', "success").then(function () {
                        location.href = "";
                    })
                    break;
                case "INQUIRY_FAIL":
                    Swal.fire('등록 실패', '문의 등록에 실패하였습니다.', "error");
                    break;
                case "VALIDATE_FAIL":
                    Swal.fire('유효성 실패', "유효 조건을 확인해주세요.", "error");
                    break;
            }
        } else {
            Swal.fire('연결 실패', '잠시후 다시 시도해주세요.', 'error');
        }
    })
}

$.termPopup = function () {
    if ($('#termPopup').length === 0) {
        // console.log($('.inquiryForm').offset());
        // console.log($('.inquiryForm').position());
//		$(document.body).css('overflow', 'hidden');
        let popup = $(''
            + '	<div id="termPopup" class="menuPopup" onClick="$.termPopup()">'
            + '		<div class="termWrap">'
            + '			<div id="termContent" style="padding: 10px 30px 10px 30px;">'
            + '				<p style="font-size:20px; font-weight:bold">개인정보 수집 및 이용에 대한 동의 – 1:1문의</p>'
            + '				<br>'
            + '				<p style="font-weight:bold">개인정보의 수집 및 이용에 대한 안내</p>'
            + '				<p> 머물-러 서비스 제공을 위해서 아래와 같이 개인정보를 수집합니다. 정보주체는 본 개인정보의 수집 및 이용에 관한 동의를 거부하실 권리가 있으나, 서비스 제공에 필요한 최소한의 개인 정보이므로 동의를 해주셔야 서비스를 이용하실 수 있습니다.</p>'
            + '				<ul>'
            + '					<li> 수집하려는 개인 정보의 항목 : 이름, 이메일 주소</li>'
            + '					<li> 개인정보의 수집 및 이용 목적 : 개인식별, 불만사항 접수, 고지사항 전달</li>'
            + '					<li> 개인정보의 보유기간 : 위 개인정보는 제공된 날부터 3년간 보유 · 이용되며 보유 목적 달성 시 <br> 또는 정보주체가 개인정보 삭제를 요청할 경우 지체 없이 파기합니다.</li>'
            + '				</ul>'
            + '			</div>'
            + '		</div>'
            + '	</div>').appendTo($('body'));

        popup.find('button').click(function () {
            popup.remove();
        });

        let wh = $(window).height();
        let ph = 358;
        let top = (wh - ph) / 2;
        popup.children('div').css('margin-top', top);
        ;

    } else {
        $(document.body).css('overflow', '');
        $('body').find('#termPopup').remove();
    }
}

var validate = function () {
    emailId = defend($('#inputEmail').val());
    domain = defend($('#inputDomain').val());
    content = defend($('#inputContent').val());
    agree = $('#agree')[0].checked;

    if (emailId === "" || domain === "" || content === "" || agree === false)
        return false;

    let emailIdRegExp = /^[a-z0-9_]{5,20}$/;
    let domainRegExp = /^[a-z]{2,15}\.(com|net|co.kr|ac.kr|kr)$/;

    if (!emailIdRegExp.test(emailId)) {
        return pleaseReenter('이메일아이디 유효조건','영어, 숫자, 특수문자(_) 가능 / 5-20자', '#inputEmail');
    }
    if (!domainRegExp.test(domain)) {
        return pleaseReenter('이메일도메인 유효조건','영어만 2-15자 + .com / net / co.kr / ac.kr / kr 가능', '#inputDomain');
    }
    return true;
}