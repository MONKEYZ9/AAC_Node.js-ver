import data from "../javacriptsKey/keyConfig.js";

const openWeatherKey = data[0]['openWeather']
const googleMapKey = data[0]['googleMap']


navigator.geolocation.getCurrentPosition(function(pos) {
	var latitude = pos.coords.latitude;
	var longitude = pos.coords.longitude;
    var location = latitude+","+longitude;            
$.getJSON(`https://maps.googleapis.com/maps/api/geocode/json?latlng=${location}&location_type=ROOFTOP&result_type=street_address&language=en&key=${googleMapKey}`, function (json) {
    var t = JSON.stringify(json['results'][0]['address_components'][3]['long_name']);
    var t2 = t.split('"');
    var city = t2[1];
    $.getJSON(`http://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${openWeatherKey}&units=metric&lang=kr`, function (json) {
        $('#feel_like').html(JSON.stringify(json["main"]["feels_like"]) + ' ℃');
        $('#humidity').html(JSON.stringify(json["main"]["humidity"]) + ' %');
    });

});
    var myPoint = new kakao.maps.LatLng(latitude, longitude);
      
      
    var container = document.getElementById('map'); //지도를 담을 영역의 DOM 레퍼런스
    var options = { //지도를 생성할 때 필요한 기본 옵션
        center : myPoint, //지도의 중심좌표.
        level : 3//지도의 레벨(확대, 축소 정도)
    };
    var map = new kakao.maps.Map(container, options); //지도 생성 및 객체 리턴
    
    var marker = new kakao.maps.Marker({
        map: map,
         position: myPoint,
        title : "123"
    });
    marker.setMap(map);
    
    
        // var container = document.getElementById('rv');
        // var roadview = new kakao.maps.Roadview(container);
        // var roadviewClient = new kakao.maps.RoadviewClient();
        // roadviewClient.getNearestPanoId(myPoint, 50, function(panoId) {
        // roadview.setPanoId(panoId, myPoint);
        // });
});
    
