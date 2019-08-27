var map;
var point;
var overlay;
//마커를 담을 배열
let markers = [];
let idleFlag = true;

let markerImageOR = '/resources/img/marker/mk_or.png';
let markerImageTR = '/resources/img/marker/mk_tr.png';
let markerImageVI = '/resources/img/marker/mk_vi.png';
let markerImageOF = '/resources/img/marker/mk_of.png';
let markerImageAP = '/resources/img/marker/mk_ap.png';

$(document).ready(function (listener) {
	let container = document.getElementById('map'); // 지도를 표시할 div
	let options = {
	    center: new kakao.maps.LatLng(37.4839778342191, 126.955578840377), // 지도의 중심 좌표
	    level: 1
	};
	map = new kakao.maps.Map(container, options); // 지도를 생성
    let zoomControl = new kakao.maps.ZoomControl();
    map.addControl(zoomControl, kakao.maps.ControlPosition.RIGHT);

	kakao.maps.event.addListener(map, 'idle', searchRoomFromMap);
	ps.keywordSearch("렉토피아", placesSearchCB);
});

var searchRoomFromMap = function() {
	let bounds = map.getBounds();
	if(!idleFlag) return;
	idleFlag = false;
	$.ajax({
		url: "/searchRoom/search",
		type: "GET",
		data: {
			southWest: bounds.getSouthWest().toString(),
			northEast: bounds.getNorthEast().toString()
		}, success: function (data) {
			for (let i = 0; i < subData.length; i++){
				//console.log(subData[i]);
				closeOverlay(subData[i]);
			}
			subData = [];
			setMarkers(null);
			markers = [];
			if (data != '{}') {
				$('#slideMenu').css("visibility", "visible");
				$.showSubList(data);
				setWindow();
			} else {
				$('.item').remove();
				$('.sub').css("width", "0%");
				$('#map').css('width', "100%");
				$('#slideMenu').css("visibility", "hidden");
			}
		}
	}).then(function () {
		idleFlag = true;
	});
}

function setMarkers(map) {
	for (let i = 0; i < markers.length; i++) {
		markers[i].setMap(map);
	}
}

var setWindow = function() {
	if ($("#slideMenu").val() == '<') {
		if ($(window).width() < 1400) {
			$('.sub').css('width', 260);
			$('#map').css('width', "calc(100% - 265px)");
		} else {
			$("#map").css('width', '80%');
			$(".sub").css('width', '19%');
		}
		$("#itemsList").css('width', '100%');
		$('.item').css('width', '96%');
	} else {
		if ($(window).width() < 1400) {
			$('.sub').css('width', 520);
			$('#map').css('width', "calc(100% - 525px)");
		} else {
			$("#map").css('width', '60%');
			$(".sub").css('width', '40%');
		}
		$("#itemsList").css('width', '98%');
		$('.item').css('width', '44%');
	}
}

//장소 검색 객체 생성
var ps = new kakao.maps.services.Places();

//키워드 검색을 요청하는 함수
function searchPlaces(){
	var keyword = $('#mapInputBox').val();
	if(!keyword.replace(/^\s+|\s+$/g, '')){
		Swal.fire('키워드를 입력해주세요!');
		return false;
	}
	// 장소 검색 객체를 통해 키워드로 장소검색을 요청
	ps.keywordSearch(keyword, placesSearchCB);
}

var subData = [];
//키워드 검색 완료 시 호출되는 콜백함수 입니다
function placesSearchCB (data, status) {
	if (status === kakao.maps.services.Status.OK) {
		var bounds = new kakao.maps.LatLngBounds();
		bounds.extend(new kakao.maps.LatLng(data[0].y, data[0].x));
		map.setBounds(bounds);
		var bounds = map.getBounds();
		var southWest = bounds.getSouthWest().toString();
        var northEast = bounds.getNorthEast().toString();
		$.ajax({
			url: "searchRoom/search",
			type: "GET",
			data: {
                southWest: southWest,
                northEast: northEast
			}, success: function (data) {
				for (let i = 0; i < subData.length; i++){
					closeOverlay(subData[i]);
				}
				subData = [];
				setMarkers(null);
				markers = [];
				if (data != '{}') {
					$('#slideMenu').css("visibility", "visible");
					$.showSubList(data);
					setWindow();
				} else {
					Swal.fire("", "이 지역에 등록된 방이 없습니다", "warning");
					$('.item').remove();
					$('.sub').css("width", "0%");
					$('#map').css('width', "100%");
					$('#slideMenu').css("visibility", "hidden");
				}
			}
		});
	}
}

$.boundsLocation = function(res) {
    let bounds = new kakao.maps.LatLngBounds();
	displayMarker(res);
	bounds.extend(new kakao.maps.LatLng(res.latitude, res.longitude));
}

$.showSubList = function(data){
   	let obj = JSON.parse(data);
	$('.item').remove();
	for(let i = 0; i < Object.keys(obj).length; i++) {
	   	let size = Object.keys(obj['item'+i]).length;
		let temp = obj['item'+i].substring(1, size-1);
		let res = eval("("+ temp +")");
		subData.push(res.roomId);
		let subList = ''
			+ '<div class="item" id=' + res.roomId + ' style="float: left; width: ' + ($("#slideMenu").val() === '>' ? 47 : 95)
			+ '%; height: 360px; display: inline-block;" onclick="showRoom(' + res.roomId + ')">'
			+ '	<div class="roomImage" style="width: 100%; height: 60%;"><img src=' + '"/manage/download?middlePath=/room/roomId_' + res.roomId + '&imageFileName='
			+ res.roomImg + '" width="97%" height="100%"/></div>'
			+ '		<p style="font-size: 15px;">' + res.roomType + ' | ' + res.rentType + ' | ' + res.period + ' 가능</p>'
			+ '			<span style="font-size: 17px; font-weight: bold;">보증금 ' + res.deposit + ' </span>';
		if(res.rentType!='전세') {
			subList += '		/ <span style="font-size: 17px; font-weight: bold;">월세 ' + res.monthlyCost + '</span>'
		}
		subList += '	<p style="font-size: 16px; font-weight: 500;">' + $.changeTitle(res.title) + '</p>'
			+ '</div>'
		if (filter(res) !== false) {
			$.boundsLocation(res);
            $(subList).appendTo($('#itemsList'));
		} else {
		}
	}
}

// 지도에 마커를 표시하는 함수입니다
function displayMarker(place) {
	// 마커를 생성하고 지도에 표시합니다
	let marker = new kakao.maps.Marker({
		map: map,
		position: new kakao.maps.LatLng(place.latitude, place.longitude)
	});
	marker.setMap(map);

	let type = place.roomType;
	let markerImageSrc;
	if(type==="원룸") {
		markerImageSrc = markerImageOR;
	}
	else if(type==="투룸") {
		markerImageSrc = markerImageTR;
	}
	else if(type==="빌라") {
		markerImageSrc = markerImageVI;
	}
	else if(type==="오피스텔") {
		markerImageSrc = markerImageOF;
	}
	else if(type==="아파트") {
		markerImageSrc = markerImageAP;
	}
	let markerImage = new kakao.maps.MarkerImage(markerImageSrc, new kakao.maps.Size(50, 64), new kakao.maps.Point(13, 34));
	marker.setImage(markerImage);

	markers.push(marker);
	kakao.maps.event.addListener(marker, 'click', function() {
		if($('.infoWrap#' + place.roomId)) {
			$('.infoWrap#' + place.roomId).remove();
		}
		openOverlay(place);
	});
}

function openOverlay(place) {
	let content = ''
		+ '<div class="infoWrap" id=' + place.roomId + '>'
		+ ' <div class="info">'
		+ '		<div class="addr">' + place.address
		+ '			<div class="close" onclick="closeOverlay('+ place.roomId +')" title="닫기"></div>'
		+ '		</div>'
		+ '		<div class="body">'
		+ '			<div class="desc">'
		+ '				<div class="content">[' + place.roomType + '] ' + $.changeTitle(place.title) + '</div>'
		+ '				<div class="cost content">' + place.rentType + ' ( 보증금 ' + place.deposit;
	if(place.rentType!='전세') {
		content += ' / 월세 ' + place.monthlyCost;
	}
	content += ' )</div>'
		+ '				<div><a href="/searchRoom/' + place.roomId + '" target="_blank" class="link">방 보러가기</a></div>'
		+ '         </div>'
		+ '		</div>'
		+ '	</div>'
		+'</div>';
	overlay = new kakao.maps.CustomOverlay({
		content: content,
		map: map,
		position: new kakao.maps.LatLng(place.latitude, place.longitude)
	});
	overlay.setMap(map);
}

function closeOverlay(id) {
	$('.infoWrap#' + id).remove();
}

function filter(obj) {
   	let roomTypeFlag = false;
   	for (let i = 0; i < roomTypeList.length; i++) {
   		if (obj.roomType === roomTypeList[i]) roomTypeFlag = true;
	}

   	if (roomTypeFlag === false) return false;

   	let periodNum = obj.period.replace(/[^0-9]/g,"");
   	let rentD;

	if (obj.period.includes("주")) {
		rentD = periodNum * 7;
	} else if (obj.period.includes("개월")) {
		rentD = periodNum * 30;
	} else if (obj.period.includes("년")) {
		rentD = periodNum * 365
	}

	let rentRange = 99999;
	switch($('#rentRange').val()) {
		case '0': rentRange = 0; break;
		case '1': rentRange = 30; break;
		case '2': rentRange = 180; break;
		case '3': rentRange = 365; break;
	}

	if (rentD > rentRange) {
		return false;
	}

	let deposit;
	if (obj.deposit.includes("없음")) {
		deposit = 0;
	} else if (obj.deposit.includes("억")) {
		let temp = obj.deposit.split('억');
		deposit = temp[0] * 10000;
		if (temp[1] != null) {
			deposit += temp[1].replace(/[^0-9]/g,"") * 1;
		}
	} else if (obj.deposit.includes("만")) {
		deposit = obj.deposit.replace(/[^0-9]/g,"") * 1;
	}

	let depositRange = 99999999;
	switch($('#deposit').val()) {
		case '0' : depositRange = 0; break;
		case '1' : depositRange = 300; break;
		case '2' : depositRange = 500; break;
		case '3' : depositRange = 1000; break;
	}

	if (deposit > depositRange) {
		return false;
	}

	let monthlyCost;
	if (obj.monthlyCost.includes("없음")) {
		monthlyCost = 0;
	} else if (obj.monthlyCost.includes("억")) {
		let temp = obj.monthlyCost.split('억');
		monthlyCost = temp[0] * 10000;
		if (temp[1] != null) {
			monthlyCost += temp[1].replace(/[^0-9]/g,"") * 1;
		}
	} else if (obj.monthlyCost.includes("만")) {
		monthlyCost = obj.monthlyCost.replace(/[^0-9]/g,"") * 1;
	}

	var monthlyCostRange = 99999;
	switch ($('#monthlyCost').val()) {
		case '0' : monthlyCostRange = 0; break;
		case '1' : monthlyCostRange = 30; break;
		case '2' : monthlyCostRange = 50; break;
		case '3' : monthlyCostRange = 100; break;
	}

	if (monthlyCost > monthlyCostRange) {
		return false;
	}

	let checkedOptions = [];
	$("input:checkbox[name='optionCheckbox']").each(function(){
		if($(this).is(":checked") == true) {
			checkedOptions.push($(this).val());
		}
	});

	let optionFlag;
	for (let i = 0; i < checkedOptions.length; i++) {
		optionFlag = false;
		for (let j = 0; j < obj.roomOptions.length; j++) {
			if (obj.roomOptions[j] === checkedOptions[i]) optionFlag = true;
		}
		if (optionFlag === false) return false;
	}
	return true;
}

$.changeTitle = function(title) {
	if(title.length > 17) {
		let temp = title.substr(0, 17);
		title = temp + '...';
	}
	return title;
}

function showRoom(roomId) {
	window.open("/searchRoom/" + roomId,"_blank");
}