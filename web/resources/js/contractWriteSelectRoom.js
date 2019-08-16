$(document).ready(function(){
    $('.selectRoom').click(function () {
        let roomId = $(this).val();
        location.href = "/contract/write?contactId="+contactId+"&roomId="+roomId;
    })
})
