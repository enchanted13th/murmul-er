
$(document).ready(function () {
    $("#btnOption").click(showOption);
    $("#btnSubmit").click(sendMessage);
    $('#btnClose').cancel();
    $('#btnPhoto').click(selectFile);
    $("#divMid").scrollTop($("#divMid")[0].scrollHeight);
})

var sendMessage = function () {
    $.ajax('/talk/send', {
        type: 'POST',
        data: { message: $('#textInputDialog').val(), contactMember: contactMember }
    }).then(function (data, status) {
        if(status === 'success'){
            let result = eval("("+data+")");
            if(result.sendResult === "SUCCESS") {
                let newMessage = result.newMessage;
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
            } else {
                Swal.fire('전송 실패', '메시지 전송에 실패하였습니다.', 'error');
            }
        } else {
            Swal.fire('네트워크 오류', '잠시후 다시 시도해주세요.', 'error');
        }
    });
}

var receiveMessage = function () {
    $.ajax('/talk/receive', {
        type: 'POST',
        data: { message: "", contactMember: contactMember }
    }).then(function (data, status) {
        if(status === 'success'){
            let result = eval("("+data+")");
            if(result.sendResult === "SUCCESS") {
                let newMessage = result.newMessage;
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
            } else {
                Swal.fire('전송 실패', '메시지 전송에 실패하였습니다 .', 'error');
            }
        } else {
            Swal.fire('네트워크 오류', '잠시후 다시 시도해주세요.', 'error');
        }
    });
}

var showOption = function() {
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

var upload = function (input) {
    if(input.files && input.files[0]) {
        console.log("files.length : " + input.files.length);
        for(let i=0; i<input.files.length; i++){
            let imgName = input.files[i].name;
            console.log(imgName);
            let fileExt = imgName.slice(imgName.indexOf(".") + 1).toLowerCase(); // 파일 확장자를 잘라내고, 비교를 위해 소문자로
            if(fileExt != "jpg" && fileExt != "png" &&  fileExt != "gif" &&  fileExt != "bmp"){
                Swal.fire('', '파일 첨부는 이미지 파일(jpg, png, gif, bmp)만 등록이 가능합니다,', 'warning');
                return;
            }
            let imgDiv = $(''
                + '<div id="divMessage" class="divMessage">'
                + '  <div class="divMe">'
                // + '     <span class="time">' + newMessage.time + '</span>'
                + '     <span class="time">45:41</span>'
                + '     <div class="myMessage">'
                // message content에 image 경로 담아서 가져오기
                + '         <img src=\"C:/talkList/14/20/profile.png" width=\"200px\" height=\"200px\"/>'
                + '     </div>'
                + '  </div>'
                + '</div>').appendTo($('#divContent:last-child'));
            // let reader = new FileReader();
            // reader.onload = function (e) {
            //     let imgDiv = $(''
            //         + '<div id="divMessage" class="divMessage">'
            //         + '  <div class="divMe">'
            //         // + '     <span class="time">' + newMessage.time + '</span>'
            //         + '     <span class="time">45:41</span>'
            //         + '     <div class="myMessage">'
            //         // + '         <span>' + newMessage.content +'</span>'
            //         + '         <img src=' + e.target.result + 'width=\'50px\' height=\'50px\'/>'
            //         + '     </div>'
            //         + '  </div>'
            //         + '</div>').appendTo($('#divContent:last-child'));
            // }
            // reader.readAsDataURL(input.files[i]);
        }
    }
}