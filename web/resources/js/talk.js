var sock;

var connectSock = function () {
    sock = new SockJS("/talkHandler");

    // onopen : connection이 맺어졌을 때의 callback
    sock.onopen = function () {

        // send : connection으로 message를 전달
        // connection이 맺어진 후 가입(JOIN) 메시지를 전달
        sock.send(JSON.stringify({talkRoomId: talkRoomId, type: 'JOIN', sender: me, receiver: contactMember}));

        // onmessage : message를 받았을 때의 callback
        sock.onmessage = function (e) {
            let newMessage = JSON.parse(e.data);
            if (newMessage.sender == me) {
                sendMessage(newMessage);
            } else {
                receiveMessage(newMessage);
            }
        }
    };
}

$(document).ready(function () {
    $('#btnBack').showTalkList();
    $('#btnClose').cancel();
    $('#btnOption').click(showOption);
    $('#btnSubmit').click(submitMessage);
    $('#btnPhoto').click(selectFile);
    $('#divMid').scrollTop($('#divMid')[0].scrollHeight);
    $('#btnWriteContract').selectRoom('write');
    $('#btnUploadContract').selectRoom('register');

    setTimeout(function() {
        connectSock();
        // window.resizeTo(516, 820);
        // window.resizeTo(430, 850);
    }, 500);
});

$.fn.showTalkList = function () {
    $(this).click(function () {
        location.href = "/talk";
    })
}

$.fn.cancel = function () {
    $(this).click(function () {
        window.close();
    })
}

var showOption = function () {
    if ($("#divOption").is(":hidden")) {
        $("#divOption").slideDown(300);
    } else {
        $("#divOption").slideUp(300, function () {
        });
    }
}

var submitMessage = function () {
    let newMessage = defend($('#textInputDialog').val());
    sock.send(JSON.stringify({
        talkRoomId: talkRoomId,
        type: 'CHAT',
        content: newMessage,
        sender: me,
        receiver: contactMember
    }));
}

var sendMessage = function (newMessage) {
    let dateDiv = $(''
        + '<div class="divDate">'
        + '  <div id="date" class="date">' + newMessage.date + '</div>'
        + '</div>');
    let newDiv;

    if (newMessage.type == 'CHAT') {
        newDiv = $(''
            + '<div id="divMessage" class="divMessage">'
            + '  <div class="divMe">'
            + '     <span class="time">' + newMessage.time + '</span>'
            + '     <div class="myMessage">'
            + '         <span>' + newMessage.content + '</span>'
            + '     </div>'
            + '  </div>'
            + '</div>');
    } else if (newMessage.type == 'IMAGE') {
        newDiv = $(''
            + '<div id="divMessage" class="divMessage">'
            + '  <div class="divMe">'
            + '     <span class="time">' + newMessage.time + '</span>'
            + '     <div class="myMessage">'
            + '         <img src="/talk/downloadImage?fileName=' + newMessage.content + '&contactMember=' + contactMember + '" width="200px">'
            + '     </div>'
            + '  </div>'
            + '</div>');
    }
    if (defend($('#divMessage').val()) != "") { // 첫 메세지인 경우
        dateDiv.appendTo($('#divContent'));
        dateFlag = newMessage.date;
        newDiv.appendTo($('#divContent:last-child'));
    } else {
        if (newMessage.date != dateFlag) {
            dateFlag = newMessage.date;
            dateDiv.appendTo($('#divContent:last-child'));
        }
        newDiv.appendTo($('#divContent:last-child'));
    }
    $('#textInputDialog').val('');
    $('#divMid').scrollTop($('#divMid')[0].scrollHeight);
}

var receiveMessage = function (newMessage) {
    let dateDiv = $(''
        + '<div class="divDate">'
        + '  <div id="date" class="date">' + newMessage.date + '</div>'
        + '</div>');
    let newDiv;

    if (newMessage.type == 'CHAT') {
        newDiv = $(''
            + '<div id="divMessage" class="divMessage">'
            + '  <div class="divYou">'
            + '     <div class="yourMessage">'
            + '         <span>' + newMessage.content + '</span>'
            + '     </div>'
            + '     <span class="time">' + newMessage.time + '</span>'
            + '  </div>'
            + '</div>');
    } else if (newMessage.type == 'IMAGE') {
        newDiv = $(''
            + '<div id="divMessage" class="divMessage">'
            + '  <div class="divYou">'
            + '     <div class="yourMessage">'
            + '         <img src="/talk/downloadImage?fileName=' + newMessage.content + '&contactMember=' + contactMember + '" width="200px">'
            + '     </div>'
            + '     <span class="time">' + newMessage.time + '</span>'
            + '  </div>'
            + '</div>');
    }
    if (defend($('#divMessage').val()) != "") {
        dateDiv.appendTo($('#divContent'));
        dateFlag = newMessage.date;
        newDiv.appendTo($('#divContent:last-child'));
    } else {
        if (newMessage.date != dateFlag) {
            dateFlag = newMessage.date;
            dateDiv.appendTo($('#divContent:last-child'));
        }
        newDiv.appendTo($('#divContent:last-child'));
    }
    $('#divMid').scrollTop($('#divMid')[0].scrollHeight);
}

var selectFile = function () {
    $('#imgUpload').trigger('click');
}

function uploadFile(input) {
    let formData = new FormData();
    if (input.files && input.files[0]) {
        for (let i = 0; i < input.files.length; i++) {
            let imgName = input.files[i].name;
            let fileExt = imgName.slice(imgName.indexOf(".") + 1).toLowerCase(); // 파일 확장자를 잘라내고, 비교를 위해 소문자로
            if (fileExt != "jpg" && fileExt != "png" && fileExt != "gif" && fileExt != "bmp") {
                Swal.fire('', '파일 첨부는 이미지 파일(jpg, png, gif, bmp)만 등록이 가능합니다.', 'warning');
                return;
            }
            formData.append("uploadFile", input.files[i]);
        }
        formData.append("contactMember", contactMember);
        $.ajax('/talk/uploadImage', {
            type: 'POST',
            processData: false,
            contentType: false,
            enctype: 'multipart/form-data',
            data: formData
        }).then(function (data, status) {
            if (status === 'success') {
                let result = eval("(" + data + ")");
                //console.log(result);
                if (result.uploadResult === "SUCCESS") {
                    let newMessageList = result.newMessageList;
                    //console.log(newMessageList);
                    for (let i = 0; i < newMessageList.length; i++) {
                        let newMessage = newMessageList[i];
                        sock.send(JSON.stringify({
                            talkRoomId: talkRoomId,
                            type: 'IMAGE',
                            content: newMessage,
                            sender: me,
                            receiver: contactMember
                        }));
                    }
                } else {
                    Swal.fire('전송 실패', '메시지 전송에 실패하였습니다 .', 'error');
                }
            } else {
                Swal.fire('네트워크 오류', '잠시후 다시 시도해주세요.', 'error');
            }
        })
    } else {
        Swal.fire('', '선택된 파일이 없습니다.', 'warning');
    }
}

$.fn.selectRoom = function (forwhat) {
    $(this).click(function(){
        let popupX = (window.screen.width / 2) - (1150 / 2);
        let popupY = (window.screen.height / 2) - (800 / 2);
        window.open("/contract/select?contactId=" + contactMember + "&forwhat=" + forwhat, "", "status=no, width=1150px, height=800px, left=" + popupX + "px, top=" + popupY + "px");
    })
}

function defend(value) {
    value = value+"";
    value.trim();
    value = value.replace(/</gi, "&lt;").replace(/>/gi, "&gt;");
    // value = value.replace(/\\(/gi, "& #40;").replace(/\\)/gi, "& #41;");
    value = value.replace(/'/gi, "&#39;");
    value = value.replace(/eval\\((.*)\\)/gi, "");
    value = value.replace(/[\\\"\\\'][\\s]*javascript:(.*)[\\\"\\\']/gi, "\"\"");
    value = value.replace(/<script>/gi, "");
    value = value.replace(/<\/script>/gi, "");
    return value;
}