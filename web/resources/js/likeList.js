$(document).ready(function () {
    $('#recentCnt').text($('.divItem').length);
    for (let i = 0; i < $('.divItem').length; i++) {
        let title = $('#title' + (i + 1)).text();
        if (title.length > 15) {
            $('#title' + (i + 1)).text(title.substring(0, 15) + "...");
        }

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