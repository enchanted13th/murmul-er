$(document).ready(function () {
    $('#likeCnt').text($('.divItem').length);
    for (let i = 0; i < $('.divItem').length; i++) {
        let title = defend($('#title' + (i + 1)).text());
        if (title.length > 15) {
            $('#title' + (i + 1)).text(title.substring(0, 15) + "...");
        }
    }
    $('#btnLikeList').css('border-bottom', '6px solid #b6e2f8');
})

function clickLike(i, roomId) {
    $.ajax('/mypage/like', {
        type: 'POST',
        data: { roomId: roomId }
    }).then(function (data, status) {
        var obj = JSON.parse(data);
        if (obj.res === 'SUCCESS') {
            document.getElementById("like" + i).parentElement.remove();
            $('#likeCnt').text($('.divItem').length);
        } else {
        }
    })
}