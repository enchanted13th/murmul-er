$.setCenter = function () {
    let wh = $(window).height();
    let ph = $('#wrapper').height();
    let top = (wh - ph) / 2;
    $('#wrapper').css('margin-top', top);
}
