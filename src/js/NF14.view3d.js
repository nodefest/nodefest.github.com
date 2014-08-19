
;( function () {

'use strict';

window.NF14 = window.NF14 || {};
NF14.view3d = {};

NF14.view3d.Viewport = function ( el, width, height ) {

  THREE.EventDispatcher.prototype.apply( this );

  this.el = el;
  this.width  = this.el.offsetWidth,
  this.height = this.el.offsetHeight,
  this.clock = new THREE.Clock();

  this.scene = new THREE.Scene();
  this.camera = new THREE.PerspectiveCamera( 40, this.width / this.height, 1, 500 );
  this.scene.add( this.camera );
  this.renderer = new THREE.WebGLRenderer( { antialias: true, alpha: true } );
  this.renderer.setSize( this.width, this.height);
  this.renderer.setClearColor( 0x000000, 0 );
  this.el.appendChild( this.renderer.domElement );

};

NF14.view3d.Viewport.prototype.update = function () {

  this.dispatchEvent( { type: 'update' } );
  this.renderer.render( this.scene, this.camera );

};

NF14.view3d.Viewport.prototype.run = function () {

  this.isRunning = true;
  this.loop();

};

NF14.view3d.Viewport.prototype.loop = function () {

  if ( !this.isRunning ) {

    return;

  }

  requestAnimationFrame( this.loop.bind( this ) );
  this.update();

};

NF14.view3d.Viewport.prototype.setSize = function ( width, height ) {

  this.width  = width;
  this.height = height;
  this.camera.aspect = this.width / this.height;
  this.camera.updateProjectionMatrix();
  this.el.style.width  = this.width  + 'px';
  this.el.style.height = this.height + 'px';
  this.renderer.setSize( this.width, this.height );

};


NF14.view3d.CameraControl = function ( viewport ) {

    THREE.EventDispatcher.prototype.apply( this );
    this.center = new THREE.Vector3( 10, 15, 20 );
    this.camera = viewport.camera;
    this.el     = viewport.el;
    this.radius = 20;
    this.lat = 18;
    this.lon = 14;
    this._phi;   // angle of zenith
    this._theta; // angle of azimuth
    this.mouseAccelerationX = 100;
    this.mouseAccelerationY = 30;
    this._pointerStart = { x: 0, y: 0 };
    this._pointerLast  = { x: 0, y: 0 };

    this.camera.position.set(
      this.center.x ,
      this.center.y ,
      this.center.z  + 1
    );
    this.update();

    this._mousedownListener = onmousedown.bind( this );
    this._mouseupListener   = onmouseup.bind( this );
    this._mousedragListener = onmousedrag.bind( this )

    this.el.addEventListener( 'mousedown',  this._mousedownListener, false );
    this.el.addEventListener( 'mouseup',    this._mouseupListener,   false );
    this.el.addEventListener( 'mouseleave', this._mouseupListener,   false );

    viewport.addEventListener( 'update', this.update.bind( this ) );

};

NF14.view3d.CameraControl.prototype.update = function () {

  this.lat = this.lat >  40 ?  40 :
             this.lat < -40 ? -40 :
             this.lat;
  // this.lon = this.lon < 0 ? 360 + this.lon % 360 : this.lon % 360;
  this.lon = this.lon >  60 ?  60 :
             this.lon < -60 ? -60 :
             this.lon;
  this._phi   =  THREE.Math.degToRad( this.lat );
  this._theta = -THREE.Math.degToRad( this.lon - 90 );

  var position = new THREE.Vector3( 
    Math.cos( this._phi ) * Math.cos( this._theta ), 
    Math.sin( this._phi ), 
    Math.cos( this._phi ) * Math.sin( this._theta )
  ).multiplyScalar( this.radius ).add( this.center );
  this.camera.position.copy( position );

  if ( this.lat === 90 ) {

    this.camera.up.set(
      Math.cos( this._theta + THREE.Math.degToRad( 180 ) ),
      0,
      Math.sin( this._theta + THREE.Math.degToRad( 180 ) )
    );

  } else if ( this.lat === -90 ) {

    this.camera.up.set(
      Math.cos( this._theta ),
      0,
      Math.sin( this._theta )
    );

  } else {

    this.camera.up.set( 0, 1, 0 );

  }

  this.camera.lookAt( this.center );

};


function onmousedown ( event ) {

  this.dispatchEvent( { type: 'mousedown' } );
  this._pointerStart.x = event.clientX;
  this._pointerStart.y = event.clientY;
  this._pointerLast.x = this.lon;
  this._pointerLast.y = this.lat;
  this.el.removeEventListener( 'mousemove', this._mousedragListener, false );
  this.el.addEventListener( 'mousemove', this._mousedragListener, false );

}

function onmouseup () {

  this.dispatchEvent( { type: 'mouseup' } );
  this.el.removeEventListener( 'mousemove', this._mousedragListener, false );

}

function onmousedrag ( event ) {

  var w = this.el.offsetWidth;
  var h = this.el.offsetHeight;
  var x = ( this._pointerStart.x - event.clientX ) / w * 2;
  var y = ( this._pointerStart.y - event.clientY ) / h * 2;
  this.lon = this._pointerLast.x + x * this.mouseAccelerationX;
  this.lat = this._pointerLast.y + y * this.mouseAccelerationY;
  // console.log( this.lon, this.lat );

}


NF14.view3d.BuildingMesh = function () {

  THREE.Object3D.call( this );

  var WIRE_MATERIAL = new THREE.MeshBasicMaterial( { color: 0x1b9e80, wireframe: true } );
  var that = this,
      loader;

  var makeWireBox = function ( width, height, depth, position ) {

    var geometry = new THREE.Geometry(),
        matrix = new THREE.Matrix4(),
        lower = new THREE.Geometry(),
        upper = new THREE.Geometry(),
        height1 = new THREE.Geometry(),
        height2 = new THREE.Geometry(),
        height3 = new THREE.Geometry(),
        height4 = new THREE.Geometry();

    lower.vertices = [
      new THREE.Vector3( -.5, -.5, -.5 ),
      new THREE.Vector3(  .5, -.5, -.5 ),
      new THREE.Vector3(  .5, -.5, -.5 ),
      new THREE.Vector3(  .5, -.5,  .5 ),
      new THREE.Vector3(  .5, -.5,  .5 ),
      new THREE.Vector3( -.5, -.5,  .5 ),
      new THREE.Vector3( -.5, -.5,  .5 ),
      new THREE.Vector3( -.5, -.5, -.5 )
    ];

    upper.vertices = [
      new THREE.Vector3( -.5,  .5, -.5 ),
      new THREE.Vector3(  .5,  .5, -.5 ),
      new THREE.Vector3(  .5,  .5, -.5 ),
      new THREE.Vector3(  .5,  .5,  .5 ),
      new THREE.Vector3(  .5,  .5,  .5 ),
      new THREE.Vector3( -.5,  .5,  .5 ),
      new THREE.Vector3( -.5,  .5,  .5 ),
      new THREE.Vector3( -.5,  .5, -.5 )
    ];

    height1.vertices = [
      new THREE.Vector3( -.5, -.5, -.5 ),
      new THREE.Vector3( -.5,  .5, -.5 )
    ];

    height2.vertices = [
      new THREE.Vector3(  .5, -.5, -.5 ),
      new THREE.Vector3(  .5,  .5, -.5 )
    ];

    height3.vertices = [
      new THREE.Vector3(  .5, -.5,  .5 ),
      new THREE.Vector3(  .5,  .5,  .5 )
    ];

    height4.vertices = [
      new THREE.Vector3( -.5, -.5,  .5 ),
      new THREE.Vector3( -.5,  .5,  .5 )
    ];

    geometry.merge( lower   );
    geometry.merge( upper   );
    geometry.merge( height1 );
    geometry.merge( height2 );
    geometry.merge( height3 );
    geometry.merge( height4 );

    matrix.set(
      width,      0,     0, position.x * width,
          0, height,     0, position.y * height,
          0,      0, depth, position.z * depth,
          0,      0,     0, 1
    );
    geometry.applyMatrix( matrix );
    return geometry;

  };


  var i, l,
      // 階数
      floorLength = 4,
      // 教室の大きさ 横、高さ、奥行き
      unitSize = new THREE.Vector3( 10, 2.5, 10 ),
      // numOfRooms = 7,
      // balconyWidth = 1,
      geometry = new THREE.Geometry();

  // 柱
  var postWidth  = 1,
      postHeight = floorLength * unitSize.y + .5,
      postPosition = [];

  postPosition = [
    [ postHeight, new THREE.Vector3( unitSize.x *   3.5, unitSize.y / 5, 0 ) ],
    [ postHeight, new THREE.Vector3( unitSize.x *   3  , unitSize.y / 5, 0 ) ],
    [ postHeight, new THREE.Vector3( unitSize.x *   2.5, unitSize.y / 5, 0 ) ],
    [ postHeight, new THREE.Vector3( unitSize.x *   2  , unitSize.y / 5, 0 ) ],
    [ postHeight, new THREE.Vector3( unitSize.x *   1.5, unitSize.y / 5, 0 ) ],
    [ postHeight, new THREE.Vector3( unitSize.x *   1  , unitSize.y / 5, 0 ) ],
    [ postHeight, new THREE.Vector3( unitSize.x *  -1  , unitSize.y / 5, 0 ) ],
    [ postHeight, new THREE.Vector3( unitSize.x *  -1.5, unitSize.y / 5, 0 ) ],
    [ postHeight, new THREE.Vector3( unitSize.x *  -2  , unitSize.y / 5, 0 ) ],
    [ postHeight, new THREE.Vector3( unitSize.x *  -2.5, unitSize.y / 5, 0 ) ],
    [ postHeight, new THREE.Vector3( unitSize.x *  -3  , unitSize.y / 5, 0 ) ],
    [ postHeight, new THREE.Vector3( unitSize.x *  -3.5, unitSize.y / 5, 0 ) ],
    [ postHeight + 4, new THREE.Vector3( unitSize.x *  .5, unitSize.y / 5, 0 ) ],
    [ postHeight + 4, new THREE.Vector3( unitSize.x *   0, unitSize.y / 5, 0 ) ],
    [ postHeight + 4, new THREE.Vector3( unitSize.x * -.5, unitSize.y / 5, 0 ) ]
  ]

  for ( i = 0, l = postPosition.length; i < l; i ++ ) {

    geometry.merge( makeWireBox(
      postWidth,
      postPosition[ i ][ 0 ],
      postWidth,
      postPosition[ i ][ 1 ]
    ) );

  }
  geometry.merge( geometry.clone(), new THREE.Matrix4().makeTranslation( 0, 0, -unitSize.z ) );

  geometry.merge( makeWireBox(
    postWidth,
    unitSize.y,
    postWidth,
    new THREE.Vector3( unitSize.x *  .5, unitSize.y / 5, unitSize.z * .5 )
  ) );
  geometry.merge( makeWireBox(
    postWidth,
    unitSize.y,
    postWidth,
    new THREE.Vector3( unitSize.x * -.5, unitSize.y / 5, unitSize.z * .5 )
  ) );

  // 梁
  var beam = makeWireBox( postWidth, .5, unitSize.z + 1, new THREE.Vector3( 0, 0.5, -.45 ) );

  for ( i = 1, l = floorLength + 1; i < l; i ++ ) {

    geometry.merge( beam.clone(), new THREE.Matrix4().makeTranslation( unitSize.x *  3.5, unitSize.y * i, 0 ) );
    geometry.merge( beam.clone(), new THREE.Matrix4().makeTranslation( unitSize.x *  3.0, unitSize.y * i, 0 ) );
    geometry.merge( beam.clone(), new THREE.Matrix4().makeTranslation( unitSize.x *  2.5, unitSize.y * i, 0 ) );
    geometry.merge( beam.clone(), new THREE.Matrix4().makeTranslation( unitSize.x *  2.0, unitSize.y * i, 0 ) );
    geometry.merge( beam.clone(), new THREE.Matrix4().makeTranslation( unitSize.x *  1.5, unitSize.y * i, 0 ) );
    geometry.merge( beam.clone(), new THREE.Matrix4().makeTranslation( unitSize.x *  1.0, unitSize.y * i, 0 ) );
    geometry.merge( beam.clone(), new THREE.Matrix4().makeTranslation( unitSize.x *  0.5, unitSize.y * i, 0 ) );
    geometry.merge( beam.clone(), new THREE.Matrix4().makeTranslation( unitSize.x *  0.0, unitSize.y * i, 0 ) );
    geometry.merge( beam.clone(), new THREE.Matrix4().makeTranslation( unitSize.x * -0.5, unitSize.y * i, 0 ) );
    geometry.merge( beam.clone(), new THREE.Matrix4().makeTranslation( unitSize.x * -1.0, unitSize.y * i, 0 ) );
    geometry.merge( beam.clone(), new THREE.Matrix4().makeTranslation( unitSize.x * -1.5, unitSize.y * i, 0 ) );
    geometry.merge( beam.clone(), new THREE.Matrix4().makeTranslation( unitSize.x * -2.0, unitSize.y * i, 0 ) );
    geometry.merge( beam.clone(), new THREE.Matrix4().makeTranslation( unitSize.x * -2.5, unitSize.y * i, 0 ) );
    geometry.merge( beam.clone(), new THREE.Matrix4().makeTranslation( unitSize.x * -3.0, unitSize.y * i, 0 ) );
    geometry.merge( beam.clone(), new THREE.Matrix4().makeTranslation( unitSize.x * -3.5, unitSize.y * i, 0 ) );

  }

  // 床
  var floorA = new THREE.Geometry(),
      floorB = new THREE.Geometry(),
      floorC = new THREE.Geometry(),
      segs = [
    new THREE.Vector3( unitSize.x *   .5 + postWidth / 2, 0, -unitSize.z      - postWidth / 2 ),
    new THREE.Vector3( unitSize.x *  3.5 + postWidth / 2, 0, -unitSize.z      - postWidth / 2 ),
    new THREE.Vector3( unitSize.x *  3.5 + postWidth / 2, 0, 0                + postWidth / 2 ),
    new THREE.Vector3( unitSize.x *   .5 + postWidth / 2, 0, 0                + postWidth / 2 ),
    new THREE.Vector3( unitSize.x *   .5 + postWidth / 2, 0, unitSize.z * .5  + postWidth / 2 ),
    new THREE.Vector3( unitSize.x *  -.5 - postWidth / 2, 0, unitSize.z * .5  + postWidth / 2 ),
    new THREE.Vector3( unitSize.x *  -.5 - postWidth / 2, 0, 0                + postWidth / 2 ),
    new THREE.Vector3( unitSize.x * -3.5 - postWidth / 2, 0, 0                + postWidth / 2 ),
    new THREE.Vector3( unitSize.x * -3.5 - postWidth / 2, 0, -unitSize.z      - postWidth / 2 ),
    new THREE.Vector3( unitSize.x *  -.5 - postWidth / 2, 0, -unitSize.z      - postWidth / 2 )
  ];

  floorA.vertices.push( segs[ 1 ], segs[ 2 ] );
  floorA.vertices.push( segs[ 2 ], segs[ 3 ] );
  floorA.vertices.push( segs[ 3 ], segs[ 4 ] );
  floorA.vertices.push( segs[ 4 ], segs[ 5 ] );
  floorA.vertices.push( segs[ 5 ], segs[ 6 ] );
  floorA.vertices.push( segs[ 6 ], segs[ 7 ] );
  floorA.vertices.push( segs[ 7 ], segs[ 8 ] );
  floorA.vertices.push( segs[ 8 ], segs[ 1 ] );

  floorB.vertices.push( segs[ 1 ], segs[ 2 ] );
  floorB.vertices.push( segs[ 2 ], segs[ 7 ] );
  floorB.vertices.push( segs[ 7 ], segs[ 8 ] );
  floorB.vertices.push( segs[ 8 ], segs[ 1 ] );

  floorC.vertices.push( segs[ 0 ], segs[ 3 ] );
  floorC.vertices.push( segs[ 3 ], segs[ 6 ] );
  floorC.vertices.push( segs[ 6 ], segs[ 9 ] );
  floorC.vertices.push( segs[ 9 ], segs[ 0 ] );

  geometry.merge( floorA.clone() );
  geometry.merge( floorA.clone(), new THREE.Matrix4().makeTranslation( 0, unitSize.y -.5, 0 ) );
  geometry.merge( floorA.clone(), new THREE.Matrix4().makeTranslation( 0, unitSize.y,     0 ) );

  geometry.merge( floorB.clone(), new THREE.Matrix4().makeTranslation( 0, unitSize.y * 2,      0 ) );
  geometry.merge( floorB.clone(), new THREE.Matrix4().makeTranslation( 0, unitSize.y * 2 + .5, 0 ) );
  geometry.merge( floorB.clone(), new THREE.Matrix4().makeTranslation( 0, unitSize.y * 3,      0 ) );
  geometry.merge( floorB.clone(), new THREE.Matrix4().makeTranslation( 0, unitSize.y * 3 + .5, 0 ) );
  geometry.merge( floorB.clone(), new THREE.Matrix4().makeTranslation( 0, unitSize.y * 4,      0 ) );
  geometry.merge( floorB.clone(), new THREE.Matrix4().makeTranslation( 0, unitSize.y * 4 + .5, 0 ) );

  geometry.merge( floorC.clone(), new THREE.Matrix4().makeTranslation( 0, unitSize.y * 5 + 1, 0 ) );
  geometry.merge( floorC.clone(), new THREE.Matrix4().makeTranslation( 0, unitSize.y * 5 + 2,  0 ) );


  var torus = new THREE.TorusGeometry( 2, .5, 8, 6 );
  torus.applyMatrix( new THREE.Matrix4().makeRotationZ( THREE.Math.degToRad( 30 ) ) );
  torus.applyMatrix( new THREE.Matrix4().makeTranslation( 0, 12, 1 ) );
  geometry.merge( torus );

  this.add(
    new THREE.Line(
      geometry,
      WIRE_MATERIAL,
      THREE.LinePieces
    )
  );

  loader = new THREE.JSONLoader();
  loader.load( './3d/logo1.js', function ( geometry ) {

    var mesh = new THREE.Mesh(
      geometry,
      WIRE_MATERIAL
    );
    mesh.position.set( -17, floorLength * unitSize.y + .5, -.5 );
    mesh.rotation.x = THREE.Math.degToRad( 90 );
    mesh.scale.set( 3, 3, 3);
    that.add( mesh );

  } );

  loader = new THREE.JSONLoader();
  loader.load( './3d/logo2.js', function ( geometry ) {

    var mesh = new THREE.Mesh(
      geometry,
      WIRE_MATERIAL
    );
    mesh.position.set( 19, floorLength * unitSize.y + .5, -.5 );
    mesh.rotation.x = THREE.Math.degToRad( 90 );
    mesh.scale.set( 3, 3, 3 );
    that.add( mesh );

  } );

};

NF14.view3d.BuildingMesh.prototype = Object.create( THREE.Object3D.prototype );






var TEXTURE1 = THREE.ImageUtils.loadTexture( './3d/star.png' );
var TEXTURE2 = THREE.ImageUtils.loadTexture( './3d/circle.png' );
var VS = [
  'attribute float shift;',
  'uniform float time;',
  'uniform float size;',
  'uniform float lifetime;',
  'uniform float perspective;',
  'uniform float radius;',
  'varying float t;',
  '',
  'void main () {',
  '',
  '  t = time / lifetime - shift / 15.;',
  // '  t = fract( time / lifetime + shift / 15. );',
  '  vec3 scaledPosition = position * radius;',
  '  vec4 pos = projectionMatrix * modelViewMatrix * vec4( scaledPosition, 1. );',
  // '  pos.y += ( sin( t * 3.14 ) * 10. ) / 2.;',
  '',
  '  gl_Position = pos;',
  '  gl_PointSize = ( perspective * size ) / gl_Position.w;',
  '',
  '}'
].join( '' );

var FS = [
  'uniform vec3 headColor;',
  'uniform sampler2D texture;',
  '',
  'varying float t;',
  '',
  'void main() {',
  '',
  '  vec3 color;',
  '  float alpha = min( 1. - smoothstep( 0., 1., t ), 1. );',
  '',
  '  color = headColor;',
  '  alpha = min( alpha * 2., 1. );',
  '',
  '  gl_FragColor = texture2D( texture, gl_PointCoord ) * vec4( color, alpha );',
  '',
  '}'
].join( '' );

var cubicOut = function ( t ) {
  var f = t - 1;
  return f * f * f + 1;
};

var radiusFromTime = function (time) {
  var velocity = 6.0; // 初速
  var friction = 0.15;
  var acceleration = 0.0;
  var position = 0.1;
  return ((velocity - acceleration * friction) * (Math.pow(Math.E, -1 / friction * time) - 1) - acceleration * time) * -friction + position;
}

NF14.view3d.Fire = function ( position, color, text, viewport, npc ) {
  
  THREE.EventDispatcher.prototype.apply( this );

  this.viewport = viewport;
  this.isNPC = npc;

  var texture = npc ? TEXTURE2 : TEXTURE1,
      color = color,
      attributes,
      uniforms,
      material;

  attributes = {
    layer: {type: 'f', value: [] },
    shift: {type: 'f', value: [] }
  };
  uniforms = {
    time:        { type: 'f', value: 0 }, 
    radius:      { type: 'f', value: 0 },
    size:        { type: 'f', value: npc ? 1.25 : 2 },
    headColor:   { type: 'c', value: new THREE.Color( color ) },
    texture:     { type: 't', value: texture },
    lifetime:    { type: 'f', value: 2 },
    perspective: { type :'f', value: Math.abs( viewport.height / ( 2 * Math.tan( THREE.Math.degToRad( viewport.camera.fov ) ) ) ) }
  };
  material = new THREE.ShaderMaterial( {
    vertexShader: VS,
    fragmentShader: FS,
    uniforms: uniforms,
    attributes: attributes,
    // blending: THREE.AdditiveBlending,
    transparent: true,
    depthTest: false
    // depthWrite: false
  } );

  var radius = 8,
      geometry = new THREE.Geometry(),
      length = 256,
      layer  = 1,
      z, t, r, vertex, shift,
      i, j;

  for ( i = 0; i < length; i ++ ) {

    z = 2 * Math.random() - 1;
    t = 6.2832 * Math.random();
    r = Math.sqrt( 1 - z * z );
    vertex = new THREE.Vector3( r * Math.cos( t ), r * Math.sin( t ), z ).multiplyScalar( radius );
    shift = Math.random() * .4;

    for ( j = 0; j < layer; j ++ ) {

      geometry.vertices.push( vertex.clone() );
      material.attributes.layer.value.push( j );
      material.attributes.shift.value.push( shift );

    }

  }

  this.clock = new THREE.Clock();
  this.object = new THREE.PointCloud( geometry, material );
  this.object.position.copy( position );
  this.viewport.scene.add( this.object );
  this._onupdate = this.update.bind( this );
  this.viewport.addEventListener( 'update', this._onupdate );

  if ( this.isNPC ) {

    return;

  }

  var size = 512;
  var fontSize = 80;
  var canvas = document.createElement( 'canvas' );
  canvas.width = size;
  canvas.height = size;
  var ctx = canvas.getContext( '2d' );
  // ctx.fillStyle = 'red';
  // ctx.fillRect( 0, 0, size, size );
  ctx.font = 'bold ' + fontSize + 'px Arial';
  ctx.textAlign = 'center';
  ctx.lineWidth = 16;
  ctx.shadowColor= '#f4fb7f';
  ctx.shadowBlur = 30;
  ctx.strokeStyle = "#179976";
  ctx.strokeText( text, size / 2, size / 2 );
  ctx.shadowBlur = 0;
  ctx.fillStyle = '#fff';
  ctx.fillText( text, size / 2, size / 2 );

  var map = new THREE.Texture( canvas );
  map.needsUpdate = true;

  var spriteMaterial = new THREE.SpriteMaterial( {
      color: 0xffffff,
      map: map,
      opacity: .5,
      transparent: true,
      useScreenCoordinates: false
  } );

  this.billboard = new THREE.Sprite( spriteMaterial );
  this.billboard.position.copy( position );
  this.viewport.scene.add( this.billboard );

};

NF14.view3d.Fire.prototype.update = function () {

  var lifetime = this.object.material.uniforms.lifetime.value;
  var elapsed  = this.clock.getElapsedTime();
  var progress = elapsed / lifetime;

  if ( progress >= 1 ) {

    this.dispose();
    return;

  }

  this.object.material.uniforms.time.value = elapsed;
  this.object.material.uniforms.radius.value = radiusFromTime(progress);
  this.object.position.y += Math.cos( progress * Math.PI ) * .025;

  if ( this.isNPC ) {
    
    return;

  }

  this.billboard.scale.set(
    Math.min( cubicOut( progress * 2 ), 1 ) * 10,
    Math.min( cubicOut( progress * 2 ), 1 ) * 10,
    1
  );
  this.billboard.position.copy( this.object.position );
  this.billboard.material.opacity = Math.sin( progress * Math.PI );

};

NF14.view3d.Fire.prototype.dispose = function () {

  this.viewport.scene.remove( this.object );
  this.object.geometry.dispose();
  this.object.material.dispose();
  this.dispatchEvent( { type: 'disposed' } );
  this.viewport.removeEventListener( 'update', this._onupdate );

  if ( this.isNPC ) {
    
    return;

  }

  this.viewport.scene.remove( this.billboard );
  this.billboard.geometry.dispose();
  this.billboard.material.dispose();
  this.billboard.material.map.dispose();

};

NF14.view3d.InputUI = function ( el, viewport ) {

  var that = this;
  this.$window   = $( window );
  this.$viewport = $( el );
  this.$cursor = this.$viewport.find( '.view3d__cursor' );
  this.$input  = this.$viewport.find( 'input' );
  this.$ignore = this.$viewport.find( '.view3d__ignore' );
  this.cursorPosition = new THREE.Vector2();
  // this.fire = null;
  this.isCoolTime = false;
  this.isFocusing = false;
  this.viewportOffset = this.$viewport.offset();
  this.cameraCtrl = new NF14.view3d.CameraControl( viewport );
  this.viewport = viewport;

  that.$cursor.addClass( 'view3d__cursor--focused' );

  that.$viewport.on( 'mousemove', function ( e ) {

    that.cursorPosition.set(
      // that.$window.scrollLeft() - that.viewportOffset.left + e.clientX,
      // that.$window.scrollTop()  - that.viewportOffset.top  + e.clientY
      e.clientX - that.viewportOffset.left,
      e.clientY - that.viewportOffset.top 
    );
    that.$cursor.css( {
      left: that.cursorPosition.x,
      top:  that.cursorPosition.y
    } );

  } );

  that.$input.on( 'blur', function () {

    that.isFocusing = false;
    that.$input.val( '' );

  } );

  that.$window.on( 'keydown', function ( e ) {

    if ( e.keyCode === 13 ) {

      if ( that.isCoolTime ) {
        return;
      } else if ( !that.isFocusing ) {

        that.isFocusing = true;
        that.$input.focus();

      } else {

        var text = that.$input.val();
        var fireRadius = 10;
        var x =   ( that.cursorPosition.x / that.$viewport.width()  ) * 2 - 1;
        var y = - ( that.cursorPosition.y / that.$viewport.height() ) * 2 + 1;
        var vec = new THREE.Vector3( x, y, 1 );
        var projector = new THREE.Projector();
        projector.unprojectVector( vec, viewport.camera );
        var direction = new THREE.Vector3().subVectors( vec, that.viewport.camera.position );
        direction.normalize();
        var distance = - that.viewport.camera.position.z / direction.z;
        var pos = that.viewport.camera.position.clone().add( direction.multiplyScalar( distance ) );

        var color = ( [
          0xf4fb7f, //黄色
          0x4df0ff, //水色
          0x4e69f4, //青
          0xfbb9db, //ピンク
        ] )[ ( Math.random() * 4 )|0 ];

        var fire = new NF14.view3d.Fire( pos, color, text, that.viewport );
        that.$cursor.removeClass( 'view3d__cursor--focused' );

        fire.addEventListener( 'disposed', function () {

          that.isCoolTime = false;
          that.$cursor.addClass( 'view3d__cursor--focused' );

        } );

        that.isCoolTime = true;

        // if ( !that.isNPC ) {

          that.viewport.dispatchEvent( { type: 'userinput:fire', position: pos, color: color, text: text } );

        // }

        that.$input.blur();

      }

    }

  } );


  this.$viewport.on( 'mouseout', function ( e ) {

    e.stopPropagation();
    that.$viewport.addClass( 'view3d--onbutton' );

  } );


  this.$viewport.on( 'mouseover', function ( e ) {

    e.stopPropagation();
    that.$viewport.removeClass( 'view3d--onbutton' );

  } );


  this.$ignore.on( 'mouseover', function ( e ) {

    e.stopPropagation();
    that.$viewport.addClass( 'view3d--onbutton' );

  } );

  this.$ignore.on( 'mouseout', function ( e ) {

    e.stopPropagation();
    that.$viewport.removeClass( 'view3d--onbutton' );

  } );

  this.cameraCtrl.addEventListener( 'mousedown', function () {

    that.$input.blur();
    that.$viewport.addClass( 'view3d--dragging' );

  } );

  this.cameraCtrl.addEventListener( 'mouseup', function () {

    that.$viewport.removeClass( 'view3d--dragging' );

  } );

  

};

} )();
