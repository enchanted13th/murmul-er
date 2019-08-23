$(document).ready(function () {
    let itemLen = $('.divItem').length
    $('#recentCnt').text(itemLen);

    //let top = $('.imgHeart').css('top').split('px')[0] * 1;
    // $('#like'+(i+1)).css('top', top + (122.333 * i) );

    $.setImage();
    $('.slider').bxSlider({
        auto: false,
        speed: 500,
        pause: 5000,
        mode: 'horizontal',
        autoControls: false,
        pager:true,
        captions: false
    });

    $('#btnLikeList').css('border-bottom', '6px solid #b6e2f8');
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

function clickLike(i, roomId) {
    $.ajax('/mypage/like', {
        type: 'POST',
        data: { roomId: roomId }
    }).then(function (data, status) {
        var obj = JSON.parse(data);
        if (obj.res === 'SUCCESS') {
            console.log(i);
            document.getElementById("like" + i).parentElement.parentElement.remove();
            document.getElementById("line" + i).remove();
            // $('#recentCnt').text($('.divItem').length);
            $('#recentCnt').text($('#recentCnt').text()*1-1);
        } else {
        }
    })
}

$