module.exports = function() {
  var mapOptions = {
    center: new google.maps.LatLng(35.659676,139.698486),
    zoom: 16,
    zoomControl: true,
    zoomControlOptions: {
      style: google.maps.ZoomControlStyle.LARGE,
    },
    disableDoubleClickZoom: true,
    mapTypeControl: false,
    scaleControl: true,
    scrollwheel: false,
    panControl: true,
    streetViewControl: true,
    draggable : true,
    overviewMapControl: true,
    overviewMapControlOptions: {
      opened: false,
    },
    mapTypeId: google.maps.MapTypeId.ROADMAP,
    styles: [{"featureType":"landscape.man_made","elementType":"geometry","stylers":[{"color":"#f7f1df"}]},{"featureType":"landscape.natural","elementType":"geometry","stylers":[{"color":"#d0e3b4"}]},{"featureType":"landscape.natural.terrain","elementType":"geometry","stylers":[{"visibility":"off"}]},{"featureType":"poi","elementType":"labels","stylers":[{"visibility":"off"}]},{"featureType":"poi.business","elementType":"all","stylers":[{"visibility":"off"}]},{"featureType":"poi.medical","elementType":"geometry","stylers":[{"color":"#fbd3da"}]},{"featureType":"poi.park","elementType":"geometry","stylers":[{"color":"#bde6ab"}]},{"featureType":"road","elementType":"geometry.stroke","stylers":[{"visibility":"off"}]},{"featureType":"road","elementType":"labels","stylers":[{"visibility":"off"}]},{"featureType":"road.highway","elementType":"geometry.fill","stylers":[{"color":"#ffe15f"}]},{"featureType":"road.highway","elementType":"geometry.stroke","stylers":[{"color":"#efd151"}]},{"featureType":"road.arterial","elementType":"geometry.fill","stylers":[{"color":"#ffffff"}]},{"featureType":"road.local","elementType":"geometry.fill","stylers":[{"color":"black"}]},{"featureType":"transit.station.airport","elementType":"geometry.fill","stylers":[{"color":"#cfb2db"}]},{"featureType":"water","elementType":"geometry","stylers":[{"color":"#a2daf2"}]}],
  };
  var mapElement = document.getElementById('venue');
  var map = new google.maps.Map(mapElement, mapOptions);
  var locations = [
    ['渋谷マークシティ', '東京都渋谷区道玄坂1-12-1 渋谷マークシティ13F', 'undefined', 'undefined', 'undefined', 35.658363,  139.698829, 'img/pin-conference.png'],['イベント&コミュニティスペース dots.', '東京都渋谷区宇田川町20-17 NOF渋谷公園通りビル 8F', 'undefined', 'undefined', 'undefined', 35.661232,  139.700330, 'img/pin-workshop.png']
  ];
  for (i = 0; i < locations.length; i++) {
    if (locations[i][1] =='undefined'){ description ='';} else { description = locations[i][1];}
    if (locations[i][2] =='undefined'){ telephone ='';} else { telephone = locations[i][2];}
    if (locations[i][3] =='undefined'){ email ='';} else { email = locations[i][3];}
    if (locations[i][4] =='undefined'){ web ='';} else { web = locations[i][4];}
    if (locations[i][7] =='undefined'){ markericon ='';} else { markericon = {
      url: locations[i][7],
      scaledSize: new google.maps.Size(32, 32)
    };}
    marker = new google.maps.Marker({
      icon: markericon,
      position: new google.maps.LatLng(locations[i][5], locations[i][6]),
      map: map,
      title: locations[i][0],
      desc: description,
      tel: telephone,
      email: email,
      web: web
    });
  }
};
