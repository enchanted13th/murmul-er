$(document).ready(function () {
    $('#recentCnt').text($('.divItem').length);
    for (let i = 0; i < $('.divItem').length; i++) {
        let title = $('#title' + (i + 1)).text();
        if (title.length > 15) {
            $('#title' + (i + 1)).text(title.substring(0, 15) + "...");
        }
    }
    $('#btnRecentList').css('border-bottom', '6px solid #b6e2f8');
})

window.onload = function () {
    checkLike();
}

var flag = false;

function clickLike(i, roomId) {
    if (document.getElementById("like" + i).getAttribute("src") === "/resources/img/etc/heartClick.png") {
        flag = true;
    }

    $.ajax('/mypage/recent', {
        type: 'POST',
        data: { roomId: roomId, flag: flag }
    }).then(function (data, status) {
        var obj = JSON.parse(data);
        if (obj.res === 'ADD') {
            document.getElementById("like" + i).src = "/resources/img/etc/heartClick.png";
        } else if (obj.res === 'REMOVE') {
            document.getElementById("like" + i).src = "/resources/img/etc/heart.png";
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
                imgList.item(i).setAttribute("src", "/resources/img/etc/heartClick.png");
            }
        }
    }
}
