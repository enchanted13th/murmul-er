$(document).ready(function () {
    let itemLen = $('.divItem').length;
    $('#likeCnt').text(itemLen);

    //let top = $('.imgHeart').css('top').split('px')[0] * 1;
    // $('#like'+(i+1)).css('top', top + (122.333 * i) );

    console.log('1: '+$('#roomImg1').val());
    console.log('2: '+$('#roomImg2').val());
    console.log('3: '+$('#roomImg3').val());
    console.log('4: '+$('#roomImg4').val());
    console.log('5: '+$('#roomImg5').val());

    for(let i=1; i <= itemLen; i++){
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