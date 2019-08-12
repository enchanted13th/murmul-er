
$(document).ready(function() {
    $("#btnOption").click(function() {
        if ($("#divOption").is(":hidden")) {
            $("#divOption").slideDown(300);
            window.resizeTo( 516, 890 );
        } else {
            $("#divOption").slideUp(300, function () {
                window.resizeTo(516, 820);
            });
        }
    })
    $("#btnSubmit").click(insertMessage);
    $('#today').todayIs();
    $('#btnClose').cancel();

})

$.fn.cancel = function() {
    $(this).click(function(){
        window.close();
    })
}

$.fn.todayIs = function(){
    var today = new Date();
    var dd = String(today.getDate()).padStart(2, '0');
    var mm = String(today.getMonth() + 1).padStart(2, '0');
    var yyyy = today.getFullYear();
    today = yyyy + "-" + mm + "-" + dd;
    $(this).text(today);
}

$.add0 = function(number){
    if(number < 10){
        number = '0'+number;
    }
    return number;
}

var insertMessage = function(){
    let tr = $('#tvDiagContent tr:last-child');
    console.log(tr[0]);
    let dt = new Date($.now());
    let time = $.add0(dt.getHours()) + ":" + $.add0(dt.getMinutes());
    if($('#textInputDialog').val() != ""){
        if(tr.attr('class') === 'you'){
            console.log('you');
            let message = $(''
                +'<tr class="me" valign="top">'
                +'  <td colspan="2" align="right">'
                +'     <div class="message">'
                +'       <span id="time" class="time">'+time+'</span>'
                +'       <div id="myDialog" class="myDialog">'+$('#textInputDialog').val()
                +'       </div>'
                +'     </div>'
                +'  </td>'
                +'</tr>').appendTo(tr.parent());
        } else {
            console.log('me');
            console.log($('#tvDiagContent tr:last-child div.message')[0]);
            let message = $('<div class="message"><span id="time" class="time">'+time+'</span> <div id="myDialog" class="myDialog">'+
                $('#textInputDialog').val()+
                '</div></div>').appendTo($('#tvDiagContent tr:last-child div.message').parent());
        }
        $('#textInputDialog').val('');
        $("#divMid").scrollTop($("#divMid")[0].scrollHeight);
    }
}