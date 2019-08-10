$(document).ready(function () {

});
var guitar = function () {
    if ($('#domain').val() === '기타') {
        $('#domain').remove();
        let textbox = $('' + '<input type="text" name="domain" class="tdomain textbox" required>' + '')
            .appendTo($('#at'));
        textbox.focus();
    }
}