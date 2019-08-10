$(document).ready(function () {

    $('#btnContract').css('border-bottom', '6px solid #b6e2f8');
})

var clickContract = function () {
    $.showContract();
}

$.showContract = function () {
    if ($('.contractPopup').length === 0) {
        $(document.body).css('overflow', 'hidden');
        let popup = $('<div id=contractPopup class="contractPopup" onClick="clickContract()"> '
            + '	  <div class="contractImg">'
            + '		<img src=img/contract/contract.png style="height:1100px;">'
            + '	  </div> '
            + '</div>').appendTo($('body'));

        let wh = $(window).height();
        let ph = 1100;
        let top = (wh - ph) / 2;
        popup.children('.contractImg').css('margin-top', top - 30);
    } else {
        $(document.body).css('overflow', '');
        $('body').find('.contractPopup').remove();
    }
}