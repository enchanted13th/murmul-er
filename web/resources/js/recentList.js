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
    $('#btnRecentList').css('border-bottom', '6px solid #b6e2f8');
})

window.onload = function () {
    checkLike();
}

var flag = false;

function clickLike(i, roomId) {
    if (document.getElementById("like" + i).getAttribute("src") === "/resources/img/etc/heart2.png") {
        flag = true;
    }

    $.ajax('/mypage/recent', {
        type: 'POST',
        data: { roomId: roomId, flag: flag }
    }).then(function (data, status) {
        var obj = JSON.parse(data);
        if (obj.res === 'ADD') {
            document.getElementById("like" + i).src = "/resources/img/etc/heart2.png";
        } else if (obj.res === 'REMOVE') {
            document.getElementById("like" + i).src = "/resources/img/etc/heart1.png";
        } else {

        }
        flag = false;
    })
}

function checkLike() {
    var imgList = document.getElementsByClassName('imgHeart');
    for (let i = 0; i < imgList.length; i++) {
        for (let j = 0; j < likeList.length; j++) {
            if (imgList.item(i).getAttribute("value") == likeList[j]) {
                imgList.item(i).setAttribute("src", "/resources/img/etc/heart2.png");
            }
        }
    }
}
