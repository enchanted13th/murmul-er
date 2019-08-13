var dateFlag = false; // false: 날짜 추가 안하기, true: 날짜 추가하기

$(document).ready(function () {
    $("#btnOption").click(showOption);
    $("#btnSubmit").click(insertMessage);
    $('#btnClose').cancel();

})

var insertMessage = function () {
    let item = $('#divMessage:last-child');
    console.log(item[0]);

    if ($('#divMessage').val() != "") {
        let newDiv = $(''
            + '<div id="divMessage" class="divMessage">'
            + '  <div class="divMe">'
            + '     <span class="time">${msg.time}</span>'
            + '     <div class="myMessage">'
            + '         <span>${msg.content}</span>'
            + '     </div>'
            + '  </div>'
            + '</div>').appendTo(item.parent());
        } else {
            console.log('me');
            console.log($('#tvDiagContent tr:last-child div.message')[0]);
            let message = $('<div class="message"><span id="time" class="time">' + time + '</span> <div id="myDialog" class="myDialog">' +
                $('#textInputDialog').val() +
                '</div></div>').appendTo($('#tvDiagContent tr:last-child div.message').parent());
        }
        $('#textInputDialog').val('');
        $("#divMid").scrollTop($("#divMid")[0].scrollHeight);
        $.ajax('/talk/send', {
            type: 'POST',
            data: { messsage: $('#textInputDialog').val(), contactMember: contactMember, dateFlag: dateFlag }
        }).then(function (data, status) {
            if(status === 'success'){
                var obj = JSON.parse(data);
                console.log(data);
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