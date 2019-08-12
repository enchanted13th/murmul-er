
$(document).ready(function () {
    $("#btnContact").click(function () {
        $.showContact();
    })
})

var clickContact = function () {
    $.showContact();
}

$.showContact = function () {
    if ($('.menuPopup').length === 0) {
        $(document.body).css('overflow', 'hidden');
        let popup = $(''
            + '<div id="contactPopup" class="menuPopup" onClick="clickContact()"> '
            + '	<div class="content">'
            + ' 		<div class="divTop"></div> '
            + ' 		<div class="divSellerInfo"> '
            + ' 			<p><img class="profile" src="/resources/img/etc/profile.png"></p> '
            + ' 			<p><label class="lbNick" id="nick" value=" ' + sellerNickname + '" name="' + sellerNickname + '">' + sellerNickname + '</label></p> '
            + ' 			<p><label class="lbContact">' + sellerPhone + '</label></p> '
            + '		</div>'
            + '	</div>'
            + '	</div>').appendTo($('body'));

        let wh = $(window).height();
        let ph = 300;
        let top = (wh - ph) / 2;
        popup.children('.content').css('margin-top', top);
    } else {
        $(document.body).css('overflow', '');
        $('body').find('.menuPopup').remove();
    }
}