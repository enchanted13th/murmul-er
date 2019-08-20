String.prototype.string = function(len){
    var s = '', i = 0;
    while (i++ < len) { s += this; }
    return s;
};
String.prototype.zf = function(len){
    return "0".string(len - this.length) + this;
};
Number.prototype.zf = function(len){
    return this.toString().zf(len);
};

$.setContentLength = function(){
    $('.content').each(function(){
        let content = $(this).text();
        let length = content.length;
        if(length > 15) {
            $(this).text(content.substr(0, 15)+"...");
        }
    })
}

$.fn.selectStatus = async function(){
    let id = $(this).attr('id').split('btn')[1];
    /*let {value : status} = */await Swal.fire({
        title: '처리 상태 변경',
        input: 'select',
        inputOptions: {
            처리대기: '처리대기',
            처리중: '처리중',
            처리완료: '처리완료',
            처리불가: '처리불가'
        },
        inputPlaceholder: '처리상태 선택',
        showCancelButton: true,
        inputValidator: (value) => {
            return new Promise((resolve) => {
                let prevStatus = $('#ps'+id).text();
                if (value !== prevStatus) {
                    $.changeProcessStatus(id, value);
                } else {
                    resolve('이미 '+prevStatus+' 상태입니다.');
                }
            })
        }
    })
}

$.changeProcessStatus = function (id, pstatus) {
    console.log(id, pstatus);
    $.ajax('/service/change-process-status', {
        type: 'POST',
        data: {id: id, processStatus: pstatus}
    }).then(function (data, status) {
        if (status === 'success') {
            switch (data.result) {
                case "SUCCESS":
                    Swal.fire('변경 완료', '처리 상태가 변경되었습니다.', 'success')
                        .then(function () {
                            location.href = "";
                        });
                    break;
                case "FAIL":
                    Swal.fire('변경 실패', '처리 상태 변경에 실패하였습니다.', 'error');
                    break;
            }
        } else {
            Swal.fire('변경 실패', '잠시 후 다시 시도해주세요.', 'error');
        }
    })
}

$.showContent = function (id) {
    // Swal.fire({
    //     title: $('#email'+id).text() + " | " + $('#wd'+id).text(),
    //     text: $('#ct'+id).val()
    // })
    Swal.fire({
        html:
        '<h4>'+$('#email'+id).text() + "&nbsp; | &nbsp; " + $('#wd'+id).text() +'</h4>'+ $('#ct'+id).val(),
        showCloseButton: true
    })
}

$.setContentLength();

$.fn.showReplyForm = async function () {
    let id = $(this).attr('id').split('send')[1];
    let email = $('#email'+id).text().trim();
    console.log('!'+email+'!');
    const { value: text } = await Swal.fire({
        input: 'textarea',
        inputPlaceholder: '답변 작성란..',
        showCancelButton: true
    })
    if (text) {
        console.log(email, text);
        $.sendEmail(email, text);
    }
}

// $.sendEmail = function (email, text) {
//     $.ajax({
//         type: 'POST',
//         url: 'https://mandrillapp.com/api/1.0/messages/send.json',
//         data: {
//             'key': 'e89b1a0248ea62880648c16220a17daa-us3',
//             'message': {
//                 'from_email': 'ehddnwnd@naver.com',
//                 'to': [
//                     {
//                         'email': email,
//                         'type': 'to'
//                     }
//                 ],
//                 'autotext': 'true',
//                 'subject': '안녕하세요 머물-러입니다.',
//                 'html': text
//             }
//         }
//     }).done(function(response) {
//         console.log(response); // if you're into that sorta thing
//     });
// }
$.sendEmail = function (email, text) {
    Email.send({
        Host : "smtp.elasticemail.com",
        Username : "ehddnwnd@naver.com",
        Password : "e32354b2-17d7-4606-9ff8-4314f9c9e13f",
        To : email,
        From : "ehddnwnd@naver.com",
        Subject : "안녕하세요 머물-러입니다.",
        Body : text
    }).then(
        message => alert(message)
    );
}
