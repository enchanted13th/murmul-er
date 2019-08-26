$(document).ready(function () {
    let itemLen = $('.divItem').length;
    $('#likeCnt').text(itemLen);


    let text;
    for(let i=1; i <= itemLen; i++){
        for(let j = 1; j <= $('#hashtagCnt'+i).val(); j++) {
            text = $('#hashtag'+i+"-"+j).text();
            if(text.length > 10)
                $('#hashtag'+i+"-"+j).text(text.substring(0, 10) + "...");
        }
        $.setImage($('#totCntImg'+i).val(), $('#roomId'+i).val());
    }

    $('.slider').bxSlider({
        auto: false,
        speed: 500,
        pause: 5000,
        mode: 'horizontal',
        autoControls: false,
        pager: false,
        captions: false
    });

    $('#btnLikeList').css('border-bottom', '6px solid #b6e2f8');
})

$.setImage = function(totCntImg, roomId){
    if (totCntImg === '') return;
    console.log(totCntImg, roomId);
    for(let i = 0; i < totCntImg; i++) {
        let fileName = $('#roomValue'+roomId+ "-" + i).val();
        let src = 'http://www.murmul-er.com/manage/download?middlePath=/room/roomId_' + encodeURI(roomId) + '&imageFileName=' + encodeURI(fileName);
        console.log(src);
        $('#preview'+roomId+"-"+i).attr('src', src);
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
            $('#likeCnt').text($('#likeCnt').text()*1-1);
        } else {
        }
    })
}