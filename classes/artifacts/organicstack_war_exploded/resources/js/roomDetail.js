
$(document).ready(function() {
	$.footerControl();
	$("#map").css('width', '100%');
	$('#area').text(area + pyeong);
	$.inputDetailInfo();
	$.inputOption();
	$('#btnTalk').click(function(){
		$.showTalk();
	})

})

window.onload = function () {
	checkLike();
}

var likeFlag = false;

function clickLike() {
	if (document.getElementById('heartImg').getAttribute("src") === "/resources/img/etc/heart2.png") {
		likeFlag = true;
	}

	$.ajax(roomId, {
		type: 'POST',
		data: {roomId: roomId, flag: likeFlag}
	}).then(function (data, status) {
		var obj = JSON.parse(data);
		switch (obj.res) {
			case 'ADD':
				document.getElementById('heartImg').src = '/resources/img/etc/heart2.png';
				break;
			case 'REMOVE':
				document.getElementById('heartImg').src = '/resources/img/etc/heart1.png';
				break;
			default:
				break;
		}
		likeFlag = false;
	})
}

function checkLike() {
	for (let i = 0; i < likeList.length; i++) {
		if (roomId == likeList[i]) {
			document.getElementById('heartImg').setAttribute("src", "/resources/img/etc/heart2.png");
		}
	}
}

$.showTalk = function() {
	if($('.menuPopup').length === 0){
		$(document.body).css('overflow', 'hidden');
		let popup = $(''
			+'<div id="talkPopup" class="menuPopup">'
			+'<div class="divWrap">'
			+'	<div class="divTop">'
			+'		<button id="btnBack" class="btnBack"><img src="/resources/img/talk/back.png"/></button>'
			+'		<label id="nickName" class="nickName">Echinacea Argentum</label>'
			+'		<button id="btnClose" class="btnClose"><img src="/resources/img/talk/exit.png"/></button>'
			+'	</div>'
			+'	<div class="divMid" id="divMid">'
			+'		<div id="divDiagContent" class="divDiagContent">'
			+'			<div><label id="today" class="date"></label></div>'
			+'		</div>'
			+'		<div id="divDiagContent">'
			+'			<table id="tvDiagContent" class="tvDiagContent">'
			+'        		<tr class="you" valign="top"></tr>'
			+'			</table>'
			+'		</div>'
			+'	</div>'
			+'	<div class="divBottom">'
			+'		<form name="sendForm" onsubmit="return false">'
			+'			<button type="button" id="btnOption" class="btnOption"><img id="imgOption" '
			+'src="/resources/img/talk/option.png"/></button>'
			+'			<input autocomplete="off" name="inputbox" type="text" id="textInputDialog"/>'
			+'			<input type="image" id="btnSubmit" class="btnSubmit" src="/resources/img/talk/submit.png"/>'
			+'		</form>'
			+'	</div>'
			+'	<div class="divOption" id="divOption" style="display:none;">'
			+'		<button id="btnPhoto"><img src="/resources/img/talk/photo.png"/></button>'
			+'		<button id="btnContract"><img src="/resources/img/talk/contract.png"/></button>'
			+'	</div>'
			+'</div>'
			+'</div>'
			+'').appendTo($('body'));
		
		popup.find("#btnOption").click(function(){
		    $("#divOption").slideToggle({
					direction: "up"
				}, 300);
		});
		popup.find("#btnSubmit").click(insertMessage);
		popup.find('#today').todayIs();
		popup.find('#btnClose').cancel();
		
		document.sendForm.inputbox.focus();
		
		let wh = $(window).height();
		let ph = 800;
		let top = (wh - ph) / 2;
		console.log("top:",top);
		popup.children('div').css('margin-top', top);

	} else {
		console.log("remove");
		$(document.body).css('overflow', '');
		$('body').find('.menuPopup').remove();
	}
}

$.fn.cancel = function() {
	$(this).click(function(){
		$.showTalk();
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
  //console.log(time);
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

$.inputOption = function() {
	let tr;
	for (let i = 0; i < option.length; i++) {
		if (i % 5 === 0) {
			tr = $('<tr />').appendTo($('#optionTb'));
		}
		switch (option[i]) {
		case "냉장고":
			op_name = "refrigerator.svg";
			break;
		case "에어컨":
			op_name = "aircondition.svg";
			break;
		case "가스레인지":
			op_name = "gas.svg";
			break;
		case "옷장":
			op_name = "closet.svg";
			break;
		case "전자레인지":
			op_name = "microoven.svg";
			break;
		case "TV":
			op_name = "tv.svg";
			break;
		case "신발장":
			op_name = "shoes.svg";
			break;
		case "비데":
			op_name = "bidet.svg";
			break;
		case "인덕션":
			op_name = "induction.svg";
			break;
		case "전자도어락":
			op_name = "doorlock.svg";
			break;
		case "책상":
			op_name = "desk.svg";
			break;
		case "현관문 안전장치":
			op_name = "noimg.png";
			break;
		case "세탁기":
			op_name = "laundry.svg";
			break;
		case "침대":
			op_name = "bed.svg";
			break;
		default:
			op_name = "noimg.png";
			break;
		}
		let td = $(
				'<td><img src="/resources/img/option/' + op_name + '"><div>' + option[i]
						+ '</div></td>').appendTo(tr);
	}
}
$.inputDetailInfo = function() {
	let idx = option.indexOf("주차 가능");
	if (idx > 0) {
		$('#parking').text("가능");
		option.splice(idx, 1)
	} else {
		$('#parking').text("불가능");
	}
	idx = option.indexOf("엘리베이터 가능");
	if (idx > 0) {
		$('#elevator').text("있음");
		option.splice(idx, 1)
	} else {
		$('#elevator').text("없음");
	}
	idx = option.indexOf("반려동물 가능");
	if (idx > 0) {
		$('#pet').text("가능");
		option.splice(idx, 1)
	} else {
		$('#pet').text("불가능");
	}
}
$(window).resize(function() {
	$.footerControl();
});
$.footerControl = function() {
	if ($(window).width() > 1070) {
		let width = $(window).width();
		let ph = 1070;
		let left = (width - ph) / 2;
		$('.footer').css('left', left);
	}
}

//$.isLogin = function() {
//	if (/* session.id == */true) {
//		$.showLoginPopup();
//	}
//	location.href = 'talk.html';
//}
