var map;
var point;

$(document).ready(function() {
      // 지도를 표시할 div
      var container = document.getElementById('map');
      var options = {
         center: new kakao.maps.LatLng(37.4839778342191, 126.955578840377), // 지도의 중심 좌표
         level: 3 // 지도의 확대 레벨
      };

      // 지도를 생성
      map = new kakao.maps.Map(container, options);
      // 키워드로 장소를 검색
      //searchPlaces();
      ps.keywordSearch("렉토피아", placesSearchCB);

});

   //마커를 담을 배열
   var markers = [];

   //장소 검색 객체 생성
   var ps = new kakao.maps.services.Places();

   //검색 결과 목록이나 마커를 클릭했을 때 장소명을 표출할 인포윈도우를 생성
   var infowindow = new kakao.maps.InfoWindow({zIndex:1});

   //키워드 검색을 요청하는 함수
   function searchPlaces(){

      //var keyword = document.getElementById('keyword').value;
      //var keyword = $('#lcDong').text();
      var keyword = $('#mapInputBox').val();
      console.log(keyword);

      if(!keyword.replace(/^\s+|\s+$/g, '')){
         alert('키워드를 입력해주세요!');
         return false;
      }

      // 장소 검색 객체를 통해 키워드로 장소검색을 요청
      ps.keywordSearch(keyword, placesSearchCB);
  }

   //키워드 검색 완료 시 호출되는 콜백함수 입니다
function placesSearchCB (data, status, pagination) {
//       for(var i=0;i<data.length; i++){
//          console.log('data[',i,'].y ', data[i].y, 'data[',i,'].x ', data[i].x);
//       }
	if (status === kakao.maps.services.Status.OK) {
//           // 검색된 장소 위치를 기준으로 지도 범위를 재설정하기위해
//           // LatLngBounds 객체에 좌표를 추가합니다
          var bounds = new kakao.maps.LatLngBounds();
//
          for (var i = 0; i < data.length; i++) {
             // displayMarker(data[i]);
             bounds.extend(new kakao.maps.LatLng(data[i].y, data[i].x));
          }
//           // 검색된 장소 위치를 기준으로 지도 범위를 재설정합니다
          map.setBounds(bounds);
//           point = data[0];
		$.ajax({
			url: "searchRoom/search",
			type: "GET",
			data: {
				latitude : data[0].y,
				longitude : data[0].x,
			}, success: function(data) {
				if (data != '{}') {
					$('.sub').css("width", "19%");
					$('#map').css('width', "80%");
					$("#slideMenu").css("visibility", "visible");
					$.showSubList(data);
					$.boundsLocation(data);
				} else {
					Swal.fire("", "이 지역에 등록된 방이 없습니다", "warning");
					for(let i = 0; i < markers.length; i++){
						markers[i].setMap(null);
					}
					$('.item').remove();
					$('.sub').css("width", "0%");
					$('#map').css('width', "100%");
					$("#slideMenu").css("visibility", "hidden");
				}
			}
		});
	}
}

$.boundsLocation = function(data){
	let bounds = new kakao.maps.LatLngBounds();
	let obj = JSON.parse(data);
	for(let i = 0; i < markers.length; i++){
		markers[i].setMap(null);
	}

	for(let i = 0; i < Object.keys(obj).length; i++) {
	   	let size = Object.keys(obj['item'+i]).length;
		let temp = obj['item'+i].substring(1, size-1);
		let res = eval("("+ temp +")");
		//console.log("lati:", res.latitude, ", longi:",res.longitude);
		let room = {};
		room.y = res.latitude;
		room.x = res.longitude;
		room.place_name = res.title;
		displayMarker(room);
		bounds.extend(new kakao.maps.LatLng(room.y, room.x));
	}
	map.setBounds(bounds);
}
$.showSubList = function(data){
   	let obj = JSON.parse(data);
	$('.item').remove();
	for(let i = 0; i < Object.keys(obj).length; i++) {
	   	let size = Object.keys(obj['item'+i]).length;
		let temp = obj['item'+i].substring(1, size-1);
		let res = eval("("+ temp +")");
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
   // 지도에 마커를 표시하는 함수입니다
function displayMarker(place) {

       // 마커를 생성하고 지도에 표시합니다
	var marker = new kakao.maps.Marker({
		map: map,
		position: new kakao.maps.LatLng(place.y, place.x)
	});

	marker.setMap(map);
	markers.push(marker);
	//console.log(markers);
       // 마커에 클릭이벤트를 등록합니다
	kakao.maps.event.addListener(marker, 'click', function() {
           // 마커를 클릭하면 장소명이 인포윈도우에 표출됩니다
		infowindow.setContent('<div style="padding:5px;font-size:12px;">' + place.place_name + '</div>');
		infowindow.open(map, marker);
	});
}
