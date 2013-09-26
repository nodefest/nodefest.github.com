var io = require('socket.io').listen(+process.env.PORT || 8080);
var users = {};

io.configure('production', function() {
  io.set('log level', 1);
});

io.sockets.on('connection', function(socket) {

  socket.on('create', function(fn) {
    var user = users[socket.id] = {};
    socket.broadcast.emit('create', socket.id);
    fn({ id: socket.id, users: users });
  });

  socket.on('update', function(data) {
    users[data.id] = data.point;
    socket.broadcast.emit('update', data);
  });

  socket.on('disconnect', function() {
    delete users[socket.id];
    socket.broadcast.emit('destroy', socket.id);
  });

});
