module.exports = function() {

  var mapElement = document.getElementById('venue');
  var mapOptions = {
    center: new google.maps.LatLng(35.659676,139.698486),
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
    styles: [{"featureType":"landscape.man_made","elementType":"geometry","stylers":[{"color":"#f7f1df"}]},{"featureType":"landscape.natural","elementType":"geometry","stylers":[{"color":"#d0e3b4"}]},{"featureType":"landscape.natural.terrain","elementType":"geometry","stylers":[{"visibility":"off"}]},{"featureType":"poi","elementType":"labels","stylers":[{"visibility":"off"}]},{"featureType":"poi.business","elementType":"all","stylers":[{"visibility":"off"}]},{"featureType":"poi.medical","elementType":"geometry","stylers":[{"color":"#fbd3da"}]},{"featureType":"poi.park","elementType":"geometry","stylers":[{"color":"#bde6ab"}]},{"featureType":"road","elementType":"geometry.stroke","stylers":[{"visibility":"off"}]},{"featureType":"road","elementType":"labels","stylers":[{"visibility":"off"}]},{"featureType":"road.highway","elementType":"geometry.fill","stylers":[{"color":"#ffe15f"}]},{"featureType":"road.highway","elementType":"geometry.stroke","stylers":[{"color":"#efd151"}]},{"featureType":"road.arterial","elementType":"geometry.fill","stylers":[{"color":"#ffffff"}]},{"featureType":"road.local","elementType":"geometry.fill","stylers":[{"color":"black"}]},{"featureType":"transit.station.airport","elementType":"geometry.fill","stylers":[{"color":"#cfb2db"}]},{"featureType":"water","elementType":"geometry","stylers":[{"color":"#a2daf2"}]}],
  };

  var map = new google.maps.Map(mapElement, mapOptions);

  [
    {
      title: '渋谷マークシティ',
      desc:  '東京都渋谷区道玄坂1-12-1 渋谷マークシティ13F',
      lat:   35.658363,
      lng:   139.698829,
      icon:  'img/pin-conference.png'
    },
    {
      title: 'イベント&コミュニティスペース dots.',
      desc:  '東京都渋谷区宇田川町20-17 NOF渋谷公園通りビル 8F',
      lat:   35.661232,
      lng:   139.700330,
      icon:  'img/pin-workshop.png'
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
