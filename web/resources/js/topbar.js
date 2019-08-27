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
    $('#btnMessenger').click(function () {
        $.showTalkList();
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

$.showPopup = function () {
    if ($('#joinPopup').length !== 0 || $('#loginPopup').length !== 0) {
        return;
    }
    if ($('.menuPopup').length === 0) {
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
            $.loginCheck("register", "/manage");
        });

        popup.find('#btnMenuReview').click(function () {
            location.href = '/review?page=1&order=latest';
        });

        popup.find('#btnMenuAccount').click(function () {
            $.loginCheck("mypage", "/mypage/recent");
        });

        popup.find('#btnMenuService').click(function () {
            location.href = '/service/notice?page=1';
        });

        let wh = $(window).height();
        let ph = 200;
        let top = (wh - ph) / 2;
        popup.children('div').css('margin-top', top);

    } else {
        $('body').find('.menuPopup').remove();
    }
}

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
        popup.find('#login').click(function () {
            if (defend($('#inputId').val()) == '') return;
            if (defend($('#inputPwd').val()) == '') return;
            $.ajax('/member/login', {
                type: 'POST',
                data: {id: defend($('#inputId').val()), pwd: defend($('#inputPwd').val())}
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
        });
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

$.showTalkList = function() {
    let width = 450;
    let height = 830;
    let popupX = (window.screen.width / 2) - (width / 2);
    let popupY = (window.screen.height / 2) - (height / 2);
    window.open("http://www.murmul-er.com:8080/talk", "", "status=no, width="+width+"px, height="+height+"px, left="+popupX+"px, top="+popupY+"px");
    // window.open("/talk", "", "status=no, width="+width+"px, height="+height+"px, left="+popupX+"px, top="+popupY+"px");
}

var pleaseReenter = function (title, content, selector) {
    Swal.fire({
        title: title,
        text: content,
        type: "warning",
        onAfterClose: () => {
            $(selector).focus();
        }
    });
    return false;
}

var swalFocus = function (title, content, type, selector) {
    Swal.fire({
        title: title,
        text: content,
        type: type,
        onAfterClose: () => {
            $(selector).focus();
        }
    });
}

function isNumber(s) {
    s += ''; // 문자열로 변환
    s = s.replace(/^\s*|\s*$/g, ''); // 좌우 공백 제거
    if (s == '' || isNaN(s)) return false;
    return true;
}

$.fn.clickCancelBtn = function (url) {
    $(this).click(function () {
        Swal.fire({
            title: "취소",
            text: "정말로 취소하시겠습니까?",
            type: "warning",
            showCancelButton: true,
            confirmButtonColor: '#3085d6',
            confirmButtonText: '확인',
            cancelButtonColor: '#d33',
            cancelButtonText: '취소'
        }).then(result => {
            if (result.value) {
                location.href = url;
            }
        })
    })
}

function defend(value) {
    value = value+"";
    value.trim();
    value = value.replace(/</gi, "&lt;").replace(/>/gi, "&gt;");
    // value = value.replace(/\\(/gi, "& #40;").replace(/\\)/gi, "& #41;");
    value = value.replace(/'/gi, "&#39;");
    value = value.replace(/eval\\((.*)\\)/gi, "");
    value = value.replace(/[\\\"\\\'][\\s]*javascript:(.*)[\\\"\\\']/gi, "\"\"");
    value = value.replace(/<script>/gi, "");
    value = value.replace(/<\/script>/gi, "");
    return value;
}

$.fn.onlyNum = function() {
    $(this).keyup(function(event) {
        if (!(event.keyCode >=37 && event.keyCode<=40)) {
            let inputVal = $(this).val();
            $(this).val(inputVal.replace(/[a-zㄱ-힣,~`!@#$%^&*()_\-+=|<>:;\\\[\]{}./]/gi,''));
        }
    });
}