var io = require( 'socket.io' ).listen( 8000 );
var players = {};

io.sockets.on( 'connection', function ( socket ) {

  socket.on( 'client_firstConnect', function ( data ) {
    players[ socket.id ] = {
      points : data.points
    };
    io.sockets.socket( socket.id ).emit( 'server_myId', {
      myID : socket.id,
      players : players
    } );
  } );

  socket.on( 'client_pushMyData', function ( data ) {
    players[ data.id ] = {
      points: data.points
    };
  } );

  socket.on( 'disconnect', function () {
    delete players[ socket.id ];
  } );
} );

( function loop () {
    setTimeout( loop, 50 );
    io.sockets.emit( 'server_sync', players );
} )();