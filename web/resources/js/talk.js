$(document).ready(function () {
    $('#btnOption').click(showOption);
    $('#btnClose').cancel();
    $('#btnPhoto').click(selectFile);
    $('#divMid').scrollTop($('#divMid')[0].scrollHeight);
    $('#btnContract').writeContract();

    var sendBtn = $("#btnSubmit");
    // handshake
    var sock = new SockJS("/talkHandler");
    var messageInput = $('#textInputDialog');
    // onopen : connection이 맺어졌을 때의 callback
    sock.onopen = function () {
        // send : connection으로 message를 전달
        // connection이 맺어진 후 가입(JOIN) 메시지를 전달
        sock.send(JSON.stringify({talkRoomId: talkRoomId, type: 'JOIN', sender: me, receiver:contactMember}));

        // onmessage : message를 받았을 때의 callback
        sock.onmessage = function (e) {
            console.log(e);
            let newMessage = JSON.parse(e.data);
            if(newMessage.sender == me) {
               sendMessage(newMessage);
            } else {
               receiveMessage(newMessage);
            }
        }
    };

    sendBtn.click(function () {
        let newMessage = messageInput.val();
        console.log(newMessage);
        sock.send(JSON.stringify({talkRoomId: talkRoomId, type: 'CHAT', content: newMessage, sender: me, receiver: contactMember}));
    });

});

var sendMessage = function (newMessage) {
    let dateDiv = $(''
        + '<div class="divDate">'
        + '  <div id="date" class="date">' + newMessage.date + '</div>'
        + '</div>');
    let newDiv = $(''
        + '<div id="divMessage" class="divMessage">'
        + '  <div class="divMe">'
        + '     <span class="time">' + newMessage.time + '</span>'
        + '     <div class="myMessage">'
        + '         <span>' + newMessage.content +'</span>'
        + '     </div>'
        + '  </div>'
        + '</div>');

    if ($('#divMessage').val() != "") { // 첫 메세지인 경우
        dateDiv.appendTo($('#divContent'));
        dateFlag = newMessage.date;
        newDiv.appendTo($('#divContent:last-child'));
    } else {
        if(newMessage.date != dateFlag) {
            dateFlag = newMessage.date;
            dateDiv.appendTo($('#divContent:last-child'));
        }
        newDiv.appendTo($('#divContent:last-child'));
    }
    $('#textInputDialog').val('');
    $("#divMid").scrollTop($("#divMid")[0].scrollHeight);
}

var receiveMessage = function (newMessage) {
    let dateDiv = $(''
        + '<div class="divDate">'
        + '  <div id="date" class="date">' + newMessage.date + '</div>'
        + '</div>');
    let newDiv = $(''
        + '<div id="divMessage" class="divMessage">'
        + '  <div class="divYou">'
        + '     <div class="yourMessage">'
        + '         <span>' + newMessage.content +'</span>'
        + '     </div>'
        + '     <span class="time">' + newMessage.time + '</span>'
        + '  </div>'
        + '</div>');
    if ($('#divMessage').val() != "") {
        dateDiv.appendTo($('#divContent'));
        dateFlag = newMessage.date;
        newDiv.appendTo($('#divContent:last-child'));
    } else {
        if(newMessage.date != dateFlag) {
            dateFlag = newMessage.date;
            dateDiv.appendTo($('#divContent:last-child'));
        }
        newDiv.appendTo($('#divContent:last-child'));
    }
    $('#textInputDialog').val('');
    $("#divMid").scrollTop($("#divMid")[0].scrollHeight);
}

$.fn.writeContract = function () {
    $(this).click(function () {
        let popupX = (window.screen.width / 2) - (1150 / 2);
        let popupY = (window.screen.height / 2) - (800 / 2);
        window.open("/contract?jeonchaId="+contactMember, "", "status=no, width=1150px, height=800px, left=" + popupX + "px, top=" + popupY + "px");
    })
}

var showOption = function () {
    if ($("#divOption").is(":hidden")) {
        $("#divOption").slideDown(300);
        window.resizeTo(516, 890);
    } else {
        $("#divOption").slideUp(300, function () {
            window.resizeTo(516, 820);
        });
    }
}

$.fn.cancel = function () {
    $(this).click(function () {
        window.close();
    })
}

var selectFile = function () {
    $('#imgUpload').trigger('click');
}

var uploadFile = function (input) {
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
        formData.append("sender", "ME_FILE");
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
                if (result.uploadResult === "SUCCESS") {
                    let newMessageList = result.newMessageList;
                    for (let i = 0; i < newMessageList.length; i++) {
                        let newMessage = newMessageList[i];
                        let dateDiv = $(''
                            + '<div class="divDate">'
                            + '  <div id="date" class="date">' + newMessage.date + '</div>'
                            + '</div>');
                        let newDiv = $(''
                            + '<div id="divMessage" class="divMessage">'
                            + '  <div class="divMe">'
                            + '     <span class="time">' + newMessage.time + '</span>'
                            + '     <div class="myMessage">'
                            + '         <img src="/talk/downloadImage?fileName=' + newMessage.content + '&contactMember=' + contactMember + '" width="200px">'
                            + '     </div>'
                            + '  </div>'
                            + '</div>');

                        if ($('#divMessage').val() != "") { // 첫 메세지인 경우
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
                    }
                    $('#divMid').scrollTop($('#divMid')[0].scrollHeight);
                } else {
                    Swal.fire('전송 실패', '메시지 전송에 실패하였습니다 .', 'error');
                }
            } else {
                Swal.fire('네트워크 오류', '잠시후 다시 시도해주세요.', 'error');
            }
        });
    } else {
        Swal.fire('', '선택된 파일이 없습니다.', 'warning');
    }
}