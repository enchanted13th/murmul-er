$(document).ready(function () {
    $('#btnClose').cancel();
    $('.btnMore').showDelete();
    $('#divMid').scrollTop(0);
    // window.resizeTo(300, 600);
    for (let i = 0; i < talkInfoList.length; i++) {
        (function(x) {
            setTimeout(function() {
                //console.log(talkInfoList[i]);
                connectSock(talkInfoList[i].talkRoomId, talkInfoList[i].contactMember);
            }, 350 * x);
        })(i);
    }
});

var sock;

var connectSock = function (talkRoomId, contactMember) {
    sock = new SockJS("/talkHandler");
    //console.log(talkRoomId);

    // onopen : connection이 맺어졌을 때의 callback
    sock.onopen = function () {

        // send : connection으로 message를 전달
        // connection이 맺어진 후 가입(JOIN) 메시지를 전달
        sock.send(JSON.stringify({talkRoomId: talkRoomId, type: 'JOIN', sender: me, receiver: contactMember}));
        // onmessage : message를 받았을 때의 callback
        sock.onmessage = function (e) {
           // console.log(e);
            let newMessage = JSON.parse(e.data);
            if (me === newMessage.sender) newMessage.sender = contactMember;
            $('#member' + newMessage.sender).remove();

            for (let i = 0; i < talkInfoList.length; i++) {
                if (talkInfoList[i].contactMember == newMessage.sender) {
                    nickname = talkInfoList[i].nickname;
                    //console.log(nickname);
                }
            }

            //console.log("new Message");

            let divRoom = $(''
                + '<div class="divRoom" id="member' + newMessage.sender + '">'
                + ' <table>'
                + '     <tr>'
                + '         <td rowspan="3" id="profileImg" class="profile" onclick="showTalk(' + newMessage.sender + ')">'
                + '                <img src="/resources/img/talk/profile.png"/></td>'
                + '                <th class="nickName" onclick="showTalk(' + newMessage.sender + ')">' + nickname + '</th>'
                + '         <td>'
                + '                <button id="btnMore"><img src="/resources/img/talk/add.png"/></button>'
                + '         </td>'
                + '         </tr>'
                + '     <tr onclick="showTalk(' + newMessage.sender + ')">'
                + '         <td colspan="2" class="content">' + newMessage.content + '</td>'
                + '     </tr>'
                + '         <tr onclick="showTalk(' + newMessage.sender + ')">'
                + '                <td colspan="2" class="date">' + newMessage.date + ' ' + newMessage.time + '</td>'
                + '     </tr>'
                + ' </table>'
                + '</div>'
            );
            $('.divContent').prepend(divRoom);
        }
    }
}

var showTalk = function(contactMember) {
    location.href = "http://www.murmul-er.com:8080/talk/" + contactMember;
    // location.href = "/talk/" + contactMember;
}

var deleteTalk = function(contactMember) {

}

$.fn.cancel = function () {
    $(this).click(function () {
        window.close();
    })
}

$.fn.showDelete = function() {
    $(this).click(function () {
        let closeBtn = $(this).parents('div')[0].getElementsByClassName('exitChatRoom');
        //console.log(closeBtn);
        /* 삭제하기 메뉴 띄우고 삭제 기능 추가하기 */
        if ($(closeBtn).css('display') === 'none') {
            $(closeBtn).css('display', 'table-cell');
        } else {
            $(closeBtn).css('display', 'none');
        }
    })
}