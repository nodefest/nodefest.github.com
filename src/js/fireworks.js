;( function () {

  if ( !Modernizr.webgl ){

    return;

  }

  var headerHeight = $( '.l-header' ).height();
  var width = window.innerWidth;
  var height = window.innerHeight - headerHeight;
  var viewport = new NF14.view3d.Viewport( document.getElementById( 'fireworks' ) );
  viewport.setSize( width, height );
  viewport.run();

  var building = new NF14.view3d.BuildingMesh();
  viewport.scene.add( building );

  var inputUI = new NF14.view3d.InputUI( document.getElementById( 'fireworks' ), viewport );

  // 適当にインターバルを作って、自動で花火を new してください。
  // new した花火は、寿命が尽きると自分で自分を delete します。たぶん。
  var interval = new PeriodicEventEmitter( 750 );

  interval.addEventListener( 'period', function () {

    var pos = new THREE.Vector3(
      Math.random() * 40 - 20,
      Math.random() * 40,
      Math.random() * 40 - 20
    );
    var color = 0x76f693;
    var f = new NF14.view3d.Fire( pos, color, '', viewport, true );

  } );

  // ウィンドウのサイズが変わったらビューポートの大きさを更新してください
  $( window ).on( 'resize', function ( e ) {

    var width = window.innerWidth;
    var height = window.innerHeight - headerHeight;
    viewport.setSize( width, height );

  } );


  ////////////////////////
  // socket 利用時の例
  ////////////////////////

  var socket = io( 'http://localhost:8080' );

  // 閲覧者が花火を打ち上げると 'userinput:fire' イベントが発火します
  // これをソケットサーバに送ってください。
  viewport.addEventListener( 'userinput:fire', function ( fire ) {

    // console.log( fire.position, fire.color, fire.text );
    var data = {
      x: fire.position.x,
      y: fire.position.y,
      z: fire.position.z, 
      color: fire.color,
      text: fire.text
    }
    console.log( data );
    socket.emit( 'server_fire', data );

  } );


  socket.on( 'client_fire', function ( data ) {

    var position = new THREE.Vector3(
      data.x,
      data.y,
      data.z
    );
    new NF14.view3d.Fire( position, data.color, data.text, viewport );

  } );
  
} )();
