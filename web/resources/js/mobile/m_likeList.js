$(document).ready(function () {
    let itemLen = $('.divItem').length
    $('#recentCnt').text(itemLen);

    let top = $('.imgHeart').css('top').split('px')[0] * 1;
    for (let i = 0; i < itemLen; i++) {

        let deposit = $('#deposit' + (i + 1)).text();
        if (deposit == 0) {
            $('#deposit' + (i + 1)).text("없음");
        } else {
            deposit /= 10000;
            $('#deposit' + (i + 1)).text(deposit + "만원");
        }

        let monthlyCost = $('#monthlyCost' + (i + 1)).text();
        if (monthlyCost == 0) {
            $('#monthlyCost' + (i + 1)).text("없음");
        } else {
            monthlyCost /= 10000;
            $('#monthlyCost' + (i + 1)).text(monthlyCost + "만원");
        }

        let manageCost = $('#manageCost' + (i + 1)).text();
        if (manageCost == 0) {
            $('#manageCost' + (i + 1)).text("없음");
        } else {
            manageCost /= 10000;
            $('#manageCost' + (i + 1)).text(manageCost + "만원");
        }

        // $('#like'+(i+1)).css('top', top + (122.333 * i) );
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
            $('#recentCnt').text($('.divItem').length);
        } else {
        }
    })
}

$