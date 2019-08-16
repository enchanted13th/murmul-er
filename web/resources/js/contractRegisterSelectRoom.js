$(document).ready(function(){
    $('.selectRoom').click(function () {
        let roomId = $(this).val();
        location.href = "/contract/register?contactId="+contactId+"&roomId="+roomId;
    })
})
