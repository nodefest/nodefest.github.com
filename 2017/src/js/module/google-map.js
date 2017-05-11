var initialize = function() {

  var mapElement = document.getElementById('venue');
  var mapOptions = {
    center: new google.maps.LatLng(35.695863, 139.740915),
    zoom: 16,
    zoomControl: false,
    zoomControlOptions: {
      style: google.maps.ZoomControlStyle.LARGE,
    },
    disableDoubleClickZoom: true,
    mapTypeControl: false,
    scaleControl: true,
    scrollwheel: false,
    panControl: true,
    streetViewControl: true,
    draggable : false,
    overviewMapControl: true,
    overviewMapControlOptions: {
      opened: false,
    },
    mapTypeId: google.maps.MapTypeId.ROADMAP,
    styles: [
      {
        featureType: 'landscape.man_made',
        elementType: 'geometry',
        stylers: [ { color: '#f7f1df' } ]
      },
      {
        featureType: 'landscape.natural',
        elementType: 'geometry',
        stylers: [ { color : '#d0e3b4' } ]
      },
      {
        featureType: 'landscape.natural.terrain',
        elementType: 'geometry',
        stylers: [ { visibility: 'off' } ]
      },
      {
        featureType: 'poi',
        elementType: 'labels',
        stylers:[ { visibility: 'off' } ]
      },
      {
        featureType: 'poi.business',
        elementType: 'all',
        stylers:[ { visibility: 'off' } ]
      },
      { featureType: 'poi.medical',
        elementType: 'geometry',
        stylers: [ { color:'#fbd3da' } ]
      },
      {
        featureType: 'poi.park',
        elementType: 'geometry',
        stylers: [ { color:'#bde6ab' } ]
      },
      {
        featureType: 'road',
        elementType: 'geometry.stroke',
        stylers: [ { visibility:'off' } ]
      },
      {
        featureType: 'road',
        elementType: 'labels',
        stylers: [ { visibility:'off' } ]
      },
      {
        featureType: 'road.highway',
        elementType: 'geometry.fill',
        stylers: [ { color:'#ffe15f' } ]
      },
      {
        featureType: 'road.highway',
        elementType: 'geometry.stroke',
        stylers: [ {color: '#efd151' } ]
      },
      {
        featureType:'road.arterial',
        elementType:'geometry.fill',
        stylers: [ { color:'#ffffff' } ]
      },
      {
        featureType:'road.local',
        elementType:'geometry.fill',
        stylers:[{color:'black'}]
      },
      {
        featureType:'transit.station.airport',
        elementType:'geometry.fill',
        stylers:[{color:'#cfb2db'}]
      },
      {
        featureType:'water',
        elementType:'geometry',
        stylers:[{color:'#a2daf2'}]
      }
    ]
  };

  var map = new google.maps.Map(mapElement, mapOptions);

  [
    {
      title: '法政大学 富士見ゲート',
      desc:  '東京都千代田区富士見2-17-1',
      lat:   35.695863,
      lng:   139.740915,
      icon:  'img/pin-conference.png'
    }
  ].forEach(function(locate) {
    new google.maps.Marker({
      map: map,
      title: locate.title,
      desc: locate.desc,
      position: new google.maps.LatLng(locate.lat, locate.lng),
      icon: { url: locate.icon, scaledSize: new google.maps.Size(32, 32) },
    });
  });
};

module.exports = function() {
  google.maps.event.addDomListener(window, 'load', initialize);
};
