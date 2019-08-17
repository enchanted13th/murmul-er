
$(document).ready(function(){
    $('.editBtn').click(function(){
        $.editPopup();
    })
})



var clickEdit = function() {
    $.editPopup();
}

$.editPopup = function() {
    if($('#editPopup').length === 0 ){
        let question = $("#question").text();
        let answer = $("#answer").val();
        console.log("question: "+ question);
        let popup = $(''
            + '	<div id="editPopup" class="menuPopup" onClick="clickEdit()">'
            + '		<div class="termWrap">'
            + '			<div id="termContent" style="padding: 10px 30px 10px 30px;">'
            + '				<p style="font-size:20px; font-weight:bold">'+question+'</p>'
            + '				<br>'
            + '				<textarea >'+ answer +'</textarea>'
            + '			</div>'
            + '		</div>'
            + '     <div class="btns">'
            + '         <button name="cancel" class="lastBtns">취소</button> <button id="update" class="lastBtns">수정</button>'
            + '     </div>'
            + '	</div>').appendTo($('body'));

        popup.find('button[name="cancel"]').click(function () {
            // popup.remove();
        });

        let wh = $(window).height();
        let ph = 900;
        let top = (wh - ph) / 2;
        popup.children('div').css('margin-top', top);
        ;

    } else {
        $(document.body).css('overflow', '');
        $('body').find('#editPopup').remove();
    }
}