var io = require( 'socket.io' ).listen( 8080 );

io.sockets.on( 'connection', function ( socket ) {

  socket.on( 'server_fire', function ( data ) {

    // console.log( data );
    socket.broadcast.emit( 'client_fire', data );

  } );

} );

console.log( 'listening on port 8080' );
