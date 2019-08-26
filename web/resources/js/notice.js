$(document).ready(function () {
    $('.notice').click(function () {
        let id = $(this).attr('id');
        location.href = "/service/notice/" + id;
    })
    $('#btnNotice').css('border-bottom', '6px solid #b6e2f8');

    let btns = $('.pageBtns > div > button');
    let pageBtns = $('.pagenum');
    for(let i = 0; i < pageBtns.length;i++){
        pageBtns.eq(i).text(startpage+i).attr("id", startpage+i+"");
    }
    $('.pageBtns > div').css('width', (pageBtns.length + 4) * 55);

    for(let i = 0; i < btns.length; i++){
        btns.eq(i).val(btns.eq(i).text());
    }

    $($('.pagenum[id='+curpage+']')).css('background-color', '#b6e2f8');

    $('.pageBtns > div > button').click(function () {
        if($(this).attr("class") == "pagenum"){
            // console.log("number");
            curpage = $(this).val();
        } else {
            switch ($(this).val()) {
                case "<<": curpage = 1; break;
                case "<":
                    if(curpage > 1)
                        curpage = curpage-1;
                    break;
                case ">":
                    if(curpage < total)
                        curpage = curpage+1;
                    break;
                case ">>": curpage = total; break;
            }
        }
        location.href ="/service/notice?page=" + curpage;
    })
});