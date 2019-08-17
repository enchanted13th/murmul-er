$(document).ready(function () {
    $('#recentCnt').text($('.tbContract').length);
    $('#btnContract').css('border-bottom', '6px solid #b6e2f8');
    $.setStayPeriod();
    $('.btnDetail').clickContract();
})

$.fn.clickContract = function () {
    $(this).click(function () {
        let width = 1030;
        let height = 1350;
        let popupX = (window.screen.width / 2) - (width / 2);
        let popupY = (window.screen.height / 2) - (height / 2);
        window.open("/mypage/contract/view?contractId=" + $(this).val(), "", "status=no, width="+width+"px, height="+height+"px, left="+popupX+"px, top="+popupY+"px");
    })
}

$.showContract = function () {
    if ($('.contractPopup').length === 0) {
        $(document.body).css('overflow', 'hidden');
        let popup = $('<div id=contractPopup class="contractPopup" onClick="clickContract()"> '
            + '	  <div class="contractImg">'
            + '		<img src="/resources/img/contract/contract.png" style="height:900px;">'
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

$.setStayPeriod = function () {
    let count = $('#recentCnt').text();
    for(let i = 1; i <= count; i++) {
        let from = $('#stayFrom'+i).text();
        let to = $('#stayTo'+i).text();
        // console.log(to,from);
        let diff = dateDiff(from, to);
        let period = " ";
        if(diff.year != 0) period += diff.year + "년 ";
        if(diff.month != 0) period += diff.month + "개월 ";
        if(diff.week != 0) period += diff.week + "주 ";
        $('#stayPeriod'+i).text(period);
    }
}



function dayDiff(_date1, _date2) {
    let diffDate_1 = _date1 instanceof Date ? _date1 : new Date(_date1);
    let diffDate_2 = _date2 instanceof Date ? _date2 : new Date(_date2);

    diffDate_1 = new Date(diffDate_1.getFullYear(), diffDate_1.getMonth()+1, diffDate_1.getDate());
    diffDate_2 = new Date(diffDate_2.getFullYear(), diffDate_2.getMonth()+1, diffDate_2.getDate());

    let diff = Math.abs(diffDate_2.getTime() - diffDate_1.getTime());
    diff = Math.ceil(diff / (1000 * 3600 * 24));

    return diff;
}

function dateDiff(_date1, _date2) {
    let diff = dayDiff(_date1, _date2);
    let diffDate = {};
    let year = Math.floor(diff / 365);
    diff %= 365;
    let month = Math.floor(diff / 30);
    if(month >= 12) {
        year += 1;
        month -= 12;
    }
    diff %= 30;
    let week = Math.floor(diff / 7);
    diffDate.year = year;
    diffDate.month = month;
    diffDate.week = week;
    return diffDate;
}