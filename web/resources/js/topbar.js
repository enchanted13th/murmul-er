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
    value = value.trim();
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

var guitar = function () {
    if ($('#domain').val() === '기타') {
        $('#domain').remove();
        let textbox = $('' + '<input type="text" id="domain" name="domain" class="tdomain textbox" required maxlength="15">' + '')
            .appendTo($('#at'));
        textbox.focus();
    }
}