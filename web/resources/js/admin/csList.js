const ADD = 0;
var checkList = [];

$(document).ready(function(){
    $('#addbtn').click(function(){
        $.allPopup(ADD, ADD);
    })
})

$.fn.edit = function(){
    //     // if (text) {
    //     //     Swal.fire(text)
    //     // }
    // })
    let id = $(this).attr('id').split('img')[1];
    let num = $(this).attr('id').split('img')[2];
    $.allPopup(id, num);
}

$.showContent = function(num){
    Swal.fire({
        text: $('#answer'+ num).val(),
        titleText: $("#question"+num).text()
    })
}

$.allPopup = function(id, num) {
    let question = $('#question'+num).text();
    let answer = $('#answer'+num).val();

    if($('#allPopup').length === 0 ){
        let popup = $(''
            + '	<div id="allPopup" class="menuPopup">'
            + '		<div class="csWrap">'
            + '			<div id="termContent" style="padding: 10px 30px 10px 30px;">'
            + (id == ADD ? '<input type="text" id="title" name="title" class="title" placeholder="제목을 입력하세요.">'
                : '<input type="text" id="title" name="title" class="title" value="'+question+'">')
            + '				<br>'
            + (id == ADD ? '<textarea id="content" style="resize: none; width: 100%; height: 200px;" placeholder="내용을 입력하세요."></textarea>'
                : '<textarea id="content" style="resize: none; width: 100%; height: 200px;">'+ answer +'</textarea>')
            + '			</div>'
            + '         <div class="align-center">'
            + '             <button name="cancel" id="cancel" class="lastBtns" onClick="cancel()">취소</button> '
            + (id == ADD ? '<button name="cancel" id="cancel" class="lastBtns" onClick="doChange('+id+')">등록</button>'
                : '<button name="cancel" id="cancel" class="lastBtns" onClick="doChange('+id+')">수정</button>' )
            + '         </div>'
            + '	    </div>'
            + '	</div>').appendTo($('body'));

        let wh = $(window).height();
        let ph = $('.csWrap').height();
        let top = (wh - ph) / 2;
        popup.children('div').css('margin-top', top);
    }
    else {
        $(document.body).css('overflow', '');
        $('body').find('#allPopup').remove();
    }
}

var doChange = function(id) {
    let postInfo;
    let type;

    if ($('#title').val() == "") {
        Swal.fire('제목을 입력하세요.');
        return;
    }
    if(id === ADD) {
        type = "add";
        if ($('#content').val() == "") {
            Swal.fire('내용을 입력하세요.');
            return;
        }
    }else
        type = "update";

    postInfo = {
        articleNum: id,
        title: $('#title').val(),
        content: $('#content').val(),
        category: fromWhere
    }

    $.ajax('/admin/do/'+type,{
        type: "POST",
        data: postInfo
    }).then(function(data, status) {
        if(status === "success"){
            switch(data.result){
                case "SUCCESS":
                    Swal.fire('성공적으로 작업을 마쳤습니다.', 'success!', 'success')
                        .then(function() {
                            location.href="/admin/cs/"+fromWhere;
                        })
                    break;
                case "FAIL":
                    Swal.fire('작업에 실패하였습니다.', 'fail..', 'error');
                    break;
            }
        }else{
            Swal.fire('파일 연결 실패', '잠시후 다시 시도해주세요.', 'error');
        }
    })
}

var cancel = function(){
    $.allPopup();
}