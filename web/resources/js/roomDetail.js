$(document).ready(function () {
    $.footerControl();
    $("#map").css('width', '100%');
    $('#area').text(area + pyeong);
    $.inputDetailInfo();
    $.inputOption();
    checkLike();
    $('#btnTalk').click(function () {
        if (islogin) {
			$.showTalk();
        } else {
            Swal.fire('', '로그인해야 이용가능한 서비스입니다.', 'warning')
                .then(function () {
                    $.showLoginPopup('talk');
                })
        }
    })
    $.setImage();
    $('.slider').bxSlider({
        auto: false, // 자동 애니메이션
        speed: 500, // 애니메이션 속도
        pause: 5000, // 애니메이션 유지 시간(1000 = 1초)
        mode: 'horizontal', // 슬라이드 모드('fade', 'vertical', 'horizontal')
        autoControls: false, // 시작,중지 버튼 유/무
        pager:true, // 페이지 보여짐
        captions: true // 이미지위에 텍스트 넣기
    });
})

$.setImage = function(){
    if (roomImgNum === '') return;
    roomImgNum = roomImgNum * 1;
    for(let i = 0; i < roomImgNum; i++) {
        let value = $('#roomValue' + i).val().split(',');
        let roomId = value[0];
        let fileName = value[1];
        let src = '/manage/download?middlePath=/room/roomId_' + encodeURI(roomId) + '&imageFileName=' + encodeURI(fileName);
        $('#preview' + i).attr('src', src);
    }
}

function clickLike() {
    let likeFlag = false;
    if ($('#heartImg').attr('src') === "/resources/img/etc/heartClick.png") {
        likeFlag = true;
    }
    $.ajax('/searchRoom/like', {
        type: 'POST',
        data: {roomId: roomId, flag: likeFlag}
    }).then(function (data, status) {
        if (status === 'success') {
            switch (data.res) {
                case 'ADD':
                    $('#heartImg').attr('src', '/resources/img/etc/heartClick.png');
                    //console.log("찜 하기");
                    break;
                case 'REMOVE':
                    $('#heartImg').attr('src', '/resources/img/etc/heart.png');
                    //console.log("찜 취소");
                    break;
                case 'FAIL':
                    Swal.fire('찜 실패', '찜하기가 실패하였습니다.', 'error');
                    break;
                case 'REQUIRED_LOGIN':
                    $.loginCheck("roomDetail", "/searchRoom/"+roomId);
                default:
                    break;
            }
        } else {
            Swal.fire('연결 실패', '잠시 후 다시 시도해주세요.', 'error');
        }
    })
}

function checkLike() {
    for (let i = 0; i < likeList.length; i++) {
        if (roomId == likeList[i]) {
            document.getElementById('heartImg').setAttribute("src", "/resources/img/etc/heartClick.png");
        }
    }
}

$.showTalk = function() {
    let width = 450;
    let height = 830;
    let popupX = (window.screen.width / 2) - (width / 2);
    let popupY = (window.screen.height / 2) - (height / 2);

    loginMemberId = loginMemberId * 1;
	if(islogin && sellerMemberId === loginMemberId) {
        Swal.fire('', '회원님이 등록하신 방입니다,', 'warning')
    }
	else {
        window.open("http://www.murmul-er.com:8080/talk/"+sellerMemberId, "", "status=no, width="+width+"px, height="+height+"px, left="+popupX+"px, top="+popupY+"px");
        // window.open("/talk/"+sellerMemberId, "", "status=no, width="+width+"px, height="+height+"px, left="+popupX+"px, top="+popupY+"px");
    }
}

$.inputOption = function () {
    let tr;
    for (let i = 0; i < option.length; i++) {
        if (i % 5 === 0) {
            tr = $('<tr />').appendTo($('#optionTb'));
        }
        switch (option[i]) {
            case "냉장고":
                op_name = "refrigerator.svg";
                break;
            case "에어컨":
                op_name = "aircondition.svg";
                break;
            case "가스레인지":
                op_name = "gas.svg";
                break;
            case "옷장":
                op_name = "closet.svg";
                break;
            case "전자레인지":
                op_name = "microoven.svg";
                break;
            case "TV":
                op_name = "tv.svg";
                break;
            case "신발장":
                op_name = "shoes.svg";
                break;
            case "비데":
                op_name = "bidet.svg";
                break;
            case "인덕션":
                op_name = "induction.svg";
                break;
            case "전자도어락":
                op_name = "doorlock.svg";
                break;
            case "책상":
                op_name = "desk.svg";
                break;
            case "현관문 안전장치":
                op_name = "safetydoor.png";
                break;
            case "세탁기":
                op_name = "laundry.svg";
                break;
            case "침대":
                op_name = "bed.svg";
                break;
            default:
                op_name = "noimg.png";
                break;
        }
        $('<td><img src="/resources/img/option/' + op_name + '" width="40px" height="40px"><div>'
            + option[i] + '</div></td>').appendTo(tr);
    }
}

$.inputDetailInfo = function () {
    let idx = option.indexOf("주차 가능");
    if (idx >= 0) {
        $('#parking').text("가능");
        option.splice(idx, 1)
    } else {
        $('#parking').text("불가능");
    }
    idx = option.indexOf("엘리베이터 가능");
    if (idx >= 0) {
        $('#elevator').text("있음");
        option.splice(idx, 1)
    } else {
        $('#elevator').text("없음");
    }
    idx = option.indexOf("반려동물 가능");
    if (idx >= 0) {
        $('#pet').text("가능");
        option.splice(idx, 1)
    } else {
        $('#pet').text("불가능");
    }
}

$(window).resize(function () {
    $.footerControl();
});

$.footerControl = function () {
    if ($(window).width() > 1070) {
        let width = $(window).width();
        let ph = 1070;
        let left = (width - ph) / 2;
        $('.footer').css('left', left);
    }
}