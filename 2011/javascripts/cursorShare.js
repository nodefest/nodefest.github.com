function cursorShare(ns) {
  var socket = io.connect('http://164.46.240.70:80/' + ns);
  socket.on('location', function(data) {
    var cursor = $('#' + data.id);
    if (!cursor.attr('id')) {
      cursor = $('<img>');
      cursor.attr('class', 'cursor');
      cursor.attr('id', data.id);
      cursor.attr('src', 'images/cursor.png');
      cursor.css('position', 'absolute');
      cursor.css('width', '18px');
      cursor.css('height', '24px');
      $('#wrapper').append(cursor);
    }
    cursor.css('left', data.x + 'px');
    cursor.css('top', data.y + 'px');
    cursor.show();
    setTimeout(function() {
      cursor.hide();
    }, 10000);
  });
  $('#wrapper').mousemove(function(e) {
    socket.emit('location', {
      x: e.pageX,
      y: e.pageY
    });
  });
}
