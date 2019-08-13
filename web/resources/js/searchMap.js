var map;
var point;

var idleFlag = true;
var markerImageSrc = '/resources/img/etc/marker01.png';

$(document).ready(function (listener) {
	var container = document.getElementById('map'); // 지도를 표시할 div
	var options = {
	    center: new kakao.maps.LatLng(37.4839778342191, 126.955578840377), // 지도의 중심 좌표
	    level: 3
	};

	map = new kakao.maps.Map(container, options); // 지도를 생성
    var zoomControl = new kakao.maps.ZoomControl();
    map.addControl(zoomControl, kakao.maps.ControlPosition.RIGHT);

	kakao.maps.event.addListener(map, 'dragend', function() {
		var latlng = map.getCenter(); // 지도의 중심좌표를 얻어옵니다

		var bounds = new kakao.maps.LatLngBounds();
		bounds = map.getBounds();

		var southWest = bounds.getSouthWest().toString();
		var northEast = bounds.getNorthEast().toString();

		if(!idleFlag) return;
		idleFlag = false;
		$.ajax({
				url: "searchRoom/search",
				type: "GET",
				data: {
                    southWest: southWest,
                    northEast: northEast
				}, success: function (data) {
					map.setBounds(bounds);
					for (let i = 0; i < markers.length; i++) {
						markers[i].setMap(null);
					}
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
					idleFlag = true;

				}
			});
		});
	// 키워드로 장소를 검색
	// searchPlaces();
	ps.keywordSearch("렉토피아", placesSearchCB);
});

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

//마커를 담을 배열
var markers = [];

//장소 검색 객체 생성
var ps = new kakao.maps.services.Places();

//검색 결과 목록이나 마커를 클릭했을 때 장소명을 표출할 인포윈도우를 생성
var infowindow = new kakao.maps.InfoWindow({zIndex:1});

//키워드 검색을 요청하는 함수
function searchPlaces(){
	var keyword = $('#mapInputBox').val();
	if(!keyword.replace(/^\s+|\s+$/g, '')){
		alert('키워드를 입력해주세요!');
		return false;
	}

	// 장소 검색 객체를 통해 키워드로 장소검색을 요청
	ps.keywordSearch(keyword, placesSearchCB);
}

//키워드 검색 완료 시 호출되는 콜백함수 입니다
function placesSearchCB (data, status, pagination) {
	if (status === kakao.maps.services.Status.OK) {
		var bounds = new kakao.maps.LatLngBounds();
		pLat = data[0].y;
		pLng = data[0].x;
		bounds.extend(new kakao.maps.LatLng(data[0].y, data[0].x));
        var southWest = bounds.getSouthWest().toString();
        var northEast = bounds.getNorthEast().toString();

        map.setBounds(bounds);
		$.ajax({
			url: "searchRoom/search",
			type: "GET",
			data: {
                southWest: southWest,
                northEast: northEast
			}, success: function (data) {
				for (let i = 0; i < markers.length; i++) {
					markers[i].setMap(null);
				}
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
	let room = {};
	room.y = res.latitude;
	room.x = res.longitude;
	room.place_name = res.title;
	displayMarker(room);
	bounds.extend(new kakao.maps.LatLng(room.y, room.x));


	// map.setBounds(bounds);

	// let bounds = new kakao.maps.LatLngBounds();
	// let obj = JSON.parse(data);
	// for (let i = 0; i < markers.length; i++) {
	// 	markers[i].setMap(null);
	// }
	//
	// for (let i = 0; i < Object.keys(obj).length; i++) {
	// 	let size = Object.keys(obj['item' + i]).length;
	// 	let temp = obj['item' + i].substring(1, size - 1);
	// 	let res = eval("(" + temp + ")");
	// 	let room = {};
	// 	room.y = res.latitude;
	// 	room.x = res.longitude;
	// 	room.place_name = res.title;
	// 	displayMarker(room);
	// 	bounds.extend(new kakao.maps.LatLng(room.y, room.x));
	// }
	// map.setBounds(bounds);
}

$.showSubList = function(data){
   	let obj = JSON.parse(data);
	$('.item').remove();
	for(let i = 0; i < Object.keys(obj).length; i++) {
	   	let size = Object.keys(obj['item'+i]).length;
		let temp = obj['item'+i].substring(1, size-1);
		let res = eval("("+ temp +")");

		if (filter(res) !== false) {
			$.boundsLocation(res);
            $(''
				+ '	<div class="item" style="float: left; width: ' + ($("#slideMenu").val() === '>' ? 47 : 95) + '%; height: 360px; display: inline-block;" onClick=location.href="searchRoom/' + res.roomId + '">'
				+ '		<div class="roomImage" style="width: 100%; height: 60%;"><img src=' + '"/resources/' + res.roomImg + '"'
				+ ' width="97%" height="100%"/></div>'
				+ '			<p>' + res.roomType + '</p>'
				+ '				<span style="font-size: 20px; font-weight: bold;">보증금 ' + (res.deposit != 0 ? (res.deposit + '만 원 / ') : '없음 / ') + '</span>'
				+ '				<span style="font-size: 20px; font-weight: bold;">' + res.rentType + ' ' + (res.monthlyCost != 0 ? (res.monthlyCost + '만 원') : ' ') + '</span>'
				+ '					<p>면적: ' + res.area + 'm²' + ', 관리비: ' + res.manageCost + '만 원</p>'
				+ '	</div>').appendTo($('#itemsList'));
		}

	}
}
   // 지도에 마커를 표시하는 함수입니다
function displayMarker(place) {

		// 마커를 생성하고 지도에 표시합니다
	var marker = new kakao.maps.Marker({
		map: map,
		position: new kakao.maps.LatLng(place.y, place.x)

	});

	marker.setMap(map);

	var markerImage = new kakao.maps.MarkerImage(markerImageSrc, new kakao.maps.Size(31, 35), new kakao.maps.Point(13, 34));
	marker.setImage(markerImage);

	markers.push(marker);
	console.log(marker);

	kakao.maps.event.addListener(marker, 'click', function() {
           // 마커를 클릭하면 장소명이 인포윈도우에 표출됩니다
		infowindow.setContent('<div style="padding:5px;font-size:12px;">' + place.place_name + '</div>');
		infowindow.open(map, marker);
	});
}

function filter(obj) {

   	var roomTypeFlag = false;
   	for (let i = 0; i < roomTypeList.length; i++) {
   		if (obj.roomType === roomTypeList[i]) roomTypeFlag = true;
	}

   	if (roomTypeFlag === false) return false;

   	var periodNum = obj.period.replace(/[^0-9]/g,"");
   	var rentD;

	if (obj.period.includes("주")) {
		rentD = periodNum * 7;
	} else if (obj.period.includes("개월")) {
		rentD = periodNum * 30;
	} else if (obj.period.includes("년")) {
		rentD = periodNum * 365
	}

	var rentRange = 99999;
	switch($('#rentRange').val()) {
		case '0': rentRange = 0; break;
		case '1': rentRange = 30; break;
		case '2': rentRange = 180; break;
		case '3': rentRange = 365; break;
	}

	if (rentD > rentRange) {
		return false;
	}

	var depositRange = 99999;
	switch($('#deposit').val()) {
		case '0' : depositRange = 0; break;
		case '1' : depositRange = 300; break;
		case '2' : depositRange = 500; break;
		case '3' : depositRange = 1000; break;
	}

	if (obj.deposit > depositRange) {
		return false;
	}

	var monthlyCostRange = 99999;
	switch ($('#monthlyCost').val()) {
		case '0' : monthlyCostRange = 0; break;
		case '1' : monthlyCostRange = 30; break;
		case '2' : monthlyCostRange = 50; break;
		case '3' : monthlyCostRange = 100; break;
	}

	if (obj.monthlyCost > monthlyCostRange) {
		return false;
	}

	var checkedOptions = [];
	$("input:checkbox[name='optionCheckbox']").each(function(){
		if($(this).is(":checked") == true) {
			checkedOptions.push($(this).val());
		}
	});

	var optionFlag;
	for (let i = 0; i < obj.roomOptions.length; i++) {
		optionFlag = false;
		for (let j = 0; j < checkedOptions.length; j++) {
			if (obj.roomOptions[i] === checkedOptions[j]) optionFlag = true;
		}
		if (optionFlag === false) return false;
	}

	return true;
}