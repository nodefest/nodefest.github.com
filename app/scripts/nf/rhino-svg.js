;( function ( global ) {

  'use strict';

  global.NF = global.NF || {};

  var isVisible = true;
  var isFocused = true;

  NF.RhinoSVG = function ( id, geometry ) {

    var that = this;

    this.id  = id;
    this.svg = Snap( '#' + id );
    this.svg.append( this.svg.g() );
    this.geometry = geometry;
    this.playing = false;

    var g = this.svg.select( 'g' );
    this.geometry.shapes.forEach( function ( shape, i ) {

      var $path = g.polygon();

      $path.attr( {
        points: shape.path[ 0 ].join( ',' ),
        fill: shape.fill,
        'data-order': i
      } );

      var onclick = function ( e ) { eve( id + '.click', this, e, i ); };
      $path.click( onclick );

    } );

    this.pathSet = this.svg.selectAll( 'polygon' );
    this.play();

  }

  NF.RhinoSVG.prototype = {

    constructor: NF.RhinoSVG,

    paint: function ( order, color, timestamp ) {

      // 三角形をクリックすると
      // 該当の三角形に「色」と、「クリックした時点の時間」が記憶される
      // - 色 ( paint.color )
      // - クリックした時点の時間 ( paint.timestamp )
      // をsocketで共有する
      // 色のアニメーションなどはフロントでよしなに捌く

      order = +order|0;
      this.geometry.shapes[ order ].paint = {
        color: color,
        timestamp: timestamp
      }
    },

    watchFillColor: function () {

      if ( !this.playing ) {

        return;

      }

      requestAnimationFrame( this.watchFillColor.bind( this ) );

      var EXPIRED  = 5000.0;
      var DURATION = 1000.0;
      var now = Date.now();
      var numOfShapes = this.getTileLength();

      for ( var i = 0; i < numOfShapes; i = ( i + 1 )|0 ) {

        var $el      = this.pathSet[ i ];
        var fill     = NF.RhinoSVG.hexToRGBArray( this.geometry.shapes[ i ].fill );
        var paint    = this.geometry.shapes[ i ].paint;

        if ( !paint || !paint.color || !paint.timestamp ) {

          continue;

        }

        if (
          fill[ 0 ] === paint.color[ 0 ] &&
          fill[ 1 ] === paint.color[ 1 ] &&
          fill[ 2 ] === paint.color[ 2 ]
        ) {

          continue;

        }

        var elapsed  = now - paint.timestamp;
        var progress = 0.0;

        if ( elapsed < EXPIRED ) {

          progress = 0.0;

        } else if ( elapsed < EXPIRED + DURATION ) {

          progress = ( elapsed - EXPIRED ) / DURATION;

        } else {

          progress = 1.0;
          delete this.geometry.shapes[ i ].paint;

        }

        var fillR = fill[ 0 ] * ( progress );
        var fillG = fill[ 1 ] * ( progress );
        var fillB = fill[ 2 ] * ( progress );
        var paintR = paint.color[ 0 ] * ( 1.0 - progress );
        var paintG = paint.color[ 1 ] * ( 1.0 - progress );
        var paintB = paint.color[ 2 ] * ( 1.0 - progress );
        var r = ( fillR + paintR )|0;
        var g = ( fillG + paintG )|0;
        var b = ( fillB + paintB )|0;

        $el.attr( { fill: 'rgb( ' + r + ',' + g + ',' + b + ')' } );

      }

    },

    anim: function ( frame ) {

      var that = this;
      var next = frame === ( this.geometry.frame - 1 )|0 ? 0 : ( frame + 1 )|0;
      var numOfShapes = this.getTileLength();

      Snap.animate( 0.0, 1.0, function ( progress ) {

        if ( !isVisible || !isFocused ) { return };

        for ( var i = 0; i < numOfShapes; i = ( i + 1 )|0 ) {

          var $el    = that.pathSet[ i ];
          var from   = that.geometry.shapes[ i ].path[ frame ];
          var to     = that.geometry.shapes[ i ].path[ next ];
          var points = getDiff( from, to, progress );

          $el.attr( { points: points } );

        }

      }, 800.0, mina.easeinout, function () {

        if ( !that.playing ) {

          return;

        }

        that.anim( next );

      } );

    },

    play: function () {

      this.playing = true;
      this.watchFillColor();
      this.anim( 1 );

    },

    stop: function () {

      this.playing = false;

    },

    getTileLength: function () {

      return this.geometry.shapes.length|0;

    },

    getPaintStatus: function () {

      var result = {};
      var numOfShapes = this.getTileLength();
      var color;

      result.default = 0;

      for ( var i = 0; i < numOfShapes; i = ( i + 1 )|0 ) {

        if (
          this.geometry.shapes[ i ].paint === undefined
        ) {

          result.default = ( result.default + 1 )|0;
          continue;

        }

        color = NF.RhinoSVG.RGBArrayToHex( this.geometry.shapes[ i ].paint.color );

        if ( !!this.geometry.shapes[ i ].paint && result[ color ] === undefined ) {

          result[ color ] = 1;
          continue;

        }

        if ( !!this.geometry.shapes[ i ].paint && result[ color ] !== undefined ) {

          result[ color ] = ( result[ color ] + 1 )|0;
          continue;

        }

      }

      return result;

    }

  }

  function getDiff ( from, to, progress ) {

    var result = [];
    var len = from.length;

    for ( var i = 0; i < len; i = ( i + 1 )|0 ) {

      result.push( from[ i ] + ( to[ i ] - from[ i ] ) * progress );

    }

    return result;

  };

  NF.RhinoSVG.hexToRGBArray = function ( hex ) {

    var r = parseInt( hex.charAt( 1 ) + hex.charAt( 2 ), 16 )|0;
    var g = parseInt( hex.charAt( 3 ) + hex.charAt( 4 ), 16 )|0;
    var b = parseInt( hex.charAt( 5 ) + hex.charAt( 6 ), 16 )|0;

    return [ r, g, b ];

  }

  NF.RhinoSVG.RGBArrayToHex = function ( array ) {

    var r = ( array[ 0 ] + 0x100 ).toString( 16 ).substr( -2 ).toUpperCase();
    var g = ( array[ 1 ] + 0x100 ).toString( 16 ).substr( -2 ).toUpperCase();
    var b = ( array[ 2 ] + 0x100 ).toString( 16 ).substr( -2 ).toUpperCase();

    return '#' + r + g + b;

  }


  var hidden, visibilityChange;

  if ( typeof document.hidden !== 'undefined' ) {

    hidden = 'hidden';
    visibilityChange = 'visibilitychange';

  } else if ( typeof document.mozHidden !== 'undefined' ) {

    hidden = 'mozHidden';
    visibilityChange = 'mozvisibilitychange';

  } else if ( typeof document.msHidden !== 'undefined' ) {

    hidden = 'msHidden';
    visibilityChange = 'msvisibilitychange';

  } else if ( typeof document.webkitHidden !== 'undefined' ) {

    hidden = 'webkitHidden';
    visibilityChange = 'webkitvisibilitychange';

  }

  document.addEventListener( visibilityChange, function ( e ) {

    if ( document[ hidden ] ) {

      isVisible = false;

    } else {

      isVisible = true;

    }

  } );

  window.addEventListener( 'blur',  function ( e ) { isFocused = false; } );
  window.addEventListener( 'focus', function ( e ) { isFocused = true;  } );

} )( window );


///------

;( function ( global ) {

  'use strict';

  global.NF = global.NF || {};

  var WIDTH  = 256.0;
  var HEIGHT = 256.0;
  var HALF_WIDTH  = WIDTH  * 0.5;
  var HALF_HEIGHT = HEIGHT * 0.5;

  var inkSrc = '<svg xmlns="http://www.w3.org/2000/svg" width="256" height="256" viewBox="0 0 256 256"><path fill="#000" d="M149.4,23.7c7.4-2.2,0.6-15.3-3.6-16.4c-3.6-0.9-6.9,0.4-7.7,3.6C136.4,18,142.8,22.2,149.4,23.7z M221.9,19.6c-3.8-1.5-6.6,0.4-6.6,3.1C215.2,28.6,226.3,26.4,221.9,19.6z M138.7,21.6c1.8,2.9,2.4,7.2,5.6,8.7C143.1,26.7,141.5,23.6,138.7,21.6z M50.3,49.2c6.6-7.8-10.2-7.9-3.6,0H50.3z M230.6,48.2c-1.9-0.9-4.9-0.7-5.6,1C224,55.4,233.7,53.6,230.6,48.2z M136.6,57.9c-1.9,3.5-2.4,8.5-3.6,12.8c3-2.8,3.2-8.4,5.1-12.3C137.5,58.4,137.4,57.7,136.6,57.9z M76.4,96.7c-0.7-0.7-2.7-1.8-3.1,0C74.2,96.6,75.9,98.2,76.4,96.7z M222.9,103.9c-2.8-0.3-4.3,0.8-4.1,3.6C221.1,107.2,222.8,106.3,222.9,103.9z M46.3,105.9c1.1,3,3.8,4.4,7.1,5.1C51.9,108.5,49.2,107,46.3,105.9z M188.2,127.9c-3.8-0.6-9.9,0.6-12.8,2.6C179.7,129.2,185.5,129.4,188.2,127.9z M185.6,178.5c1.8,2.1,4.6,3.3,8.2,3.6C192.5,179.4,188.1,179.9,185.6,178.5z M38.1,180.5c-1,1.3,0.4,3.4,1.5,4.1C39.6,182.8,40,180.5,38.1,180.5z M206.6,196.4c-4.5-0.4-7,2.3-6.1,5.6C202.2,208.9,214.4,201.8,206.6,196.4z M53.4,196.9c0.2,1.6-1.6,1.2-1,3.1C54,200.5,55,196.3,53.4,196.9z M179.5,197.4v1.5c1.2,0.1,1.9-0.1,2-1C180.9,197.7,180.6,197.2,179.5,197.4z M79.4,203.5c-0.1-0.6,0.1-1.4-0.5-1.5c-2.3,5.1-7.8,6.8-8.7,13.3C74.3,212.3,76.3,207.3,79.4,203.5z M185.1,210.1c1.6,0.8,3.4,0.4,4.6-0.5v-2.6C187.6,205.5,184.2,206,185.1,210.1z M220.9,217.3c0.7,1.1,1.4,2.4,3.6,2c1.1-0.8,1.9-1.9,1.5-4.1C224,213.7,221,214.3,220.9,217.3z M164.2,219.9c-0.2,1.6,0.4,2.3,2,2c0.4-0.6,0.7-1.4,0.5-2.6C165.3,218.9,165.4,220.1,164.2,219.9z M101.4,236.7c-0.5,1.5-2.1,2.7-2.6,4.1c-1,2.9-0.8,5.8-1.5,8.2c5.4-6.5,6.3-17.6,8.7-27.1c-1,0.1-1.1-0.6-2-0.5C100.7,224.4,103,231.8,101.4,236.7z M71.8,238.8c2.1,1.6,3.8,3.7,5.6,5.6c5.1,0.7,8,1.2,12.3-0.5c0.9-4.2,4.8-5.4,7.1-8.2c-3-3.1-4.6-7.7-7.1-11.2C79.4,220.1,68.8,226.7,71.8,238.8z M136.1,236.2c1.5-0.1,1.6,1.2,3.1,1c1.3-0.9,2.6-1.9,2-4.6C138.8,229.8,133.8,232.8,136.1,236.2z M98.8,236.2c-0.3-1.3,2.3-3.5,0-3.6C99.5,234.2,97.3,235.5,98.8,236.2z M62.1,115.6c-2.5-1.6-4.8-3.4-7.7-4.6C55.7,113.3,61.7,115.9,62.1,115.6z M40.1,160.6c0-1.6-1.1-2-1.5-3.1c-1.9-0.2-3,0.4-3.1,2c0.1,1.4,2.4,0.6,2,2.6C38.9,161,37.1,160.8,40.1,160.6z M167.8,170.3c0.6-0.2,1.8,1.5,0.5,1.5c-1.9-0.7-8-1.7-4.6-4.6c1.9-0.3,2.4,3.4,4.1,1.5c-1.3-0.4-2.2-1.2-2.6-2.6c1.3-1.3,3.9-1.2,6.1-1.5c-0.3-8.4,13.7-3.3,14.8-9.2c1.3-7.2-15.6-5.6-9.7-16.9c-0.7-0.3-1.2-0.8-1.5-1.5c-3.8-0.6-5.1,1.4-8.7,1c-0.3-1.6,1-1.6,0-2.6c-2,0.8-2.9,1.4-3.6-1c0.8-1.9,4.8-0.7,5.1-3.1c-6.2,1.3-13.1,1.9-12.3-6.1c7.7-4,11.6-11.7,18.4-15.8c3.4-2,7-4.2,7.1-8.7c-5.1-6.7-9.4,3.3-16.3,2.6c-6,2.6-8.5,8.8-14.8,11.2c0.8-0.9,0.7-3.7-1-3.6c-2.5,0.4,0.3,4.1-0.5,4.1c-3-0.3-1.3-3.7-2-5.6c-1.1-2.7-3.9-4.3-2-8.7c1.2-0.7,2.9-0.8,4.1-1.5c-0.7-2.9,2.9-7.7-1.5-8.2c-1.3,0.7-0.8,3.3-2.6,3.6c-3.1-7.3-0.5-13.7-2-21.5c-7.2-5.9-6.7,6.1-10.7,8.2c0-2.6,0.7-2.3,1-5.1c-3.3,0.9-0.1,8.4-4.1,8.7c-1.4-3.4-1.7-7.8-6.1-8.2c-1.6,4.2,3,6.9,2.6,10.2c5.5-2.4-0.9,5.8-5.1,4.6c-1.4-0.5-1-2.8-3.6-2c-0.4,3.9,1.6,11-4.6,9.2c-10.8-10.9-19.9-23.7-23.5-41.9c-5-3.4-3.3-23.6-11.2-24.5c-6.4-0.8-5.2,5.1-4.1,8.2c2.5,7,5.9,18.8,8.2,24c5.9,13.7,13.9,24.9,10.7,39.3c-3.5,7.5-12.6,2.4-17.9-0.5c-4.3-2.4-5.9-3.7-6.1-8.2c-8.7-2-12.5-11.6-21.4-11.8C51.8,96.8,66.5,101,75.4,111c0,3.3,1.4,7.8,0,10.7c-3.8-2-8.3-3.3-11.7-5.6c2.7,4.1,9.2,4.4,12.3,8.2c-10.4,7.2-28.1,3-37.8-2c-0.4-1.4,2.4,0.4,2-1c-3.2-1.2-3.6,1.9-7.1,2.6c-0.1,0.6,0.1,1.5-0.5,1.5c2.8,8.8,18.6,4.5,25,9.7c-1.3-0.1-2.5-0.1-3.1,0.5c0.1,3.6,0.1,4.2,1.5,6.6c-6.1,3.1-8.9,9.5-14.8,12.8c1.1,1,4.2-1.1,5.1,1c-2.1,4-7.5,7-8.7,10.2c-4.2,2.1-9.6,3-12.8,6.1c7.6-1.7,19.3-6,24-10.7c2.8,0.7,6-0.6,7.1,2.6c-1-0.4-1.9-0.9-3.1-1c-0.7,1.3,1.1,2.5,0,2.6c-3.3,0-1.8,2.5-3.6,0.5c-1.1,3.1,4.5,3.5,6.6,5.1c-1.5,0.8-4.2,0.6-4.6,2.6c4.5-0.6,12.5-3.5,19.4-5.6c4-1.2,10.5-3.5,11.2,2c0.6,4.2-4.2,4-5.6,7.7c1.8,1.6,3.3-3.1,5.1-1.5c-0.8,6.3-5.9,11-10.7,14.8c-6.9,5.5-15.9,11.1-13.8,20.9c2.6,0.9,5.2,1.2,8.2,0.5c3.2-4.7,8.8-8.7,12.8-13.8c3.2-4,4.7-9.9,9.7-9.7c-1.1,1.8-2.7,3.1-3.1,5.6c4.7-0.6,5.1-9.9,10.2-11.8c1.4,4.5-4.8,5.7-4.6,10.7c5-1.6,4.5-8.8,9.2-10.7c2.4,3.5,5.8,6.1,7.7,10.2c-0.8,6.5-1.1,13.2-1.5,19.9c3.6-3.2,0.3-13.3,4.6-15.8c-0.2,4.5-0.4,8.9,4.1,8.7c3.1-0.9,2.3-5.5,3.1-8.7c2.5-1.7,4.6-1.9,7.7-2c1.3-2.7,2.1-7.2,5.1-6.6c0.3-3.2-0.4-4.2,1.5-5.6c4.7,0.4,6.1,4.1,8.2,7.2c7.1,3.1,10.8,9.6,15.8,14.8c1.3,4.5,3,8.6,7.1,10.2c-1.2-8.2-6.2-12.6-5.1-20.4c-1-1.2-3.4-1-4.6-2c-0.7-7.3-11-20.8-1.5-23c5.8-1.4,5.8,2.6,10.2,3.6c0.9-0.4,1.6-1.1,2-2c3.4,0.8,5.5,3,9.7,3.1C172.3,172.6,169.9,169.3,167.8,170.3z M57.5,170.8c-1-1.5-0.9-4.2,1-6.1c3.1,2.8,7.4-1.2,10.2,0C67.2,168.9,61.1,168.6,57.5,170.8z M61.1,159.6c0.5-1.2,1.8-1.6,3.6-1.5C63.7,158.8,63.1,159.9,61.1,159.6z M67.7,153.9c0.1,1.1,2.2,0.2,3.1,0.5c-1.8,2.3-6,2.1-9.2,3.1c-0.6-1-0.7-2.4-1-3.6c2.4-1.9,8.5-6.4,11.7-2.6C71.4,152.9,69.9,153.8,67.7,153.9z M68.2,147.3c-1.8-2.1-3.3-4.5-6.6-5.1c-0.5-8.6,9.9-6.7,9.7,0.5c0.8,1.2,2.6,1.5,3.6,2.6C74.2,147.5,69.2,145.4,68.2,147.3z M62.1,188.7c-3,1.2-5.8,2.7-7.7,5.1C57.2,194.9,62,188.6,62.1,188.7z M80.5,201.5c1.8-0.6,2-2.8,3.1-4.1C81.7,197.9,81.5,200.1,80.5,201.5z"/></svg>';

  // インクエフェクト
  // アニメ終了時に自動で自分を削除する
  NF.InkEffect = function ( color, x, y ) {

    this.svg = Snap.parse( inkSrc );
    this.shape = this.svg.select( 'path' );
    this.shape.attr( { 'fill': 'rgb( ' + [ color[ 0 ], color[ 1 ], color[ 2 ] ].join( ',' ) + ')' } );
    this.shape.transform( 'scale( 0.1, 0.1, ' + HALF_WIDTH + ', ' + HALF_HEIGHT + ' )' );

    this.svg.node.style.pointerEvents = 'none';
    this.svg.node.style.position = 'absolute';
    this.svg.node.style.zIndex   = 2;
    this.svg.node.style.left = x - HALF_WIDTH  + 'px';
    this.svg.node.style.top  = y - HALF_HEIGHT + 'px';
    this.svg.node.style.willChange = 'transform';
    this.svg.node.style.transform = 'translate3d( 0, 0, 0 )';

    document.body.appendChild( this.svg.node );

    this.anim();

  }

  NF.InkEffect.prototype = {

    anim: function () {

      var that = this;

      this.shape.animate(
        { 'transform': new Snap.Matrix().scale( 1, 1 ) },
        100.0,
        mina.easein,
        function () {
          that.shape.animate(
            { 'fill-opacity': 0 },
            1000.0,
            mina.easein,
            function () {
              that.dispose();
            }
          );
        }
      );

    },

    dispose: function () {

      document.body.removeChild( this.svg.node )

    }

  }

} )( window );

///------

;( function ( global ) {

  'use strict';

  global.NF = global.NF || {};

  var WIDTH  = 128.0;
  var HEIGHT = 128.0;
  var HALF_WIDTH  = WIDTH  * 0.5;
  var HALF_HEIGHT = HEIGHT * 0.5;

  var svgSrc = [
    '<svg xmlns="http://www.w3.org/2000/svg" width="128" height="128" viewBox="0 0 256 256">',
      '<path fill="#fff" d="M24.3,40.2L20,35.8L0.3,55.4l4.4,4.4L24.3,40.2z M256,55.7l-20.2-20.2l-4.5,4.5l20.2,20.2L256,55.7z M232,215.8l4.4,4.4l19.7-19.6l-4.4-4.4L232,215.8z M0,200.3l20.2,20.2l4.5-4.5L4.5,195.9L0,200.3z"/>',
      '<circle fill="#fff" stroke-width="5" stroke-miterlimit="10" cx="128" cy="128" r="8"/>',
      '<circle fill="none" stroke="#fff" stroke-width="5" stroke-miterlimit="10" cx="128" cy="128" r="25" class="aim__innerCircle"/>',
      '<circle fill="none" stroke="#fff" stroke-width="5" stroke-miterlimit="10" cx="128" cy="128" r="30" class="aim__outerCircle"/>',
    '</svg>'
  ];

  // 照準、引数に対象要素DOM
  NF.Aim = function ( color, field, targets ) {

    var that  = this;

    this.color   = color;
    this.field   = field;
    this.targets = targets;
    this.svg = Snap.parse( svgSrc );
    this.innerCircle = this.svg.select( '.aim__innerCircle' );
    this.outerCircle = this.svg.select( '.aim__outerCircle' );
    this.svg.node.style.pointerEvents = 'none';
    this.svg.node.style.position = 'absolute';
    this.svg.node.style.display  = 'none';
    this.svg.node.style.zIndex   = 3;
    this.svg.node.style.willChange = 'position';
    this.svg.node.style.transform = 'translate3d( 0, 0, 0 )';

    var color = 'rgb( ' + [ that.color[ 0 ], that.color[ 1 ], that.color[ 2 ] ].join( ',' ) + ')';
    that.outerCircle.attr( { 'stroke': color } );

    document.body.appendChild( this.svg.node );

    this.onMouseEnter = function ( e ) {

      that.svg.node.style.display  = 'block';

    };

    this.onMouseMove = function ( e ) {

      that.svg.node.style.left = e.pageX - HALF_WIDTH  + 'px';
      that.svg.node.style.top  = e.pageY - HALF_HEIGHT + 'px';

    };

    this.onMouseLeave = function ( e ) {

      that.svg.node.style.display  = 'none';

    };

    this.onLockOn = function ( e ) {

      that.innerCircle.attr( { 'stroke-opacity': 1 } );
      that.outerCircle.attr( { 'stroke-opacity': 1 } );

    };

    this.onLockOff = function ( e ) {

      that.innerCircle.attr( { 'stroke-opacity': 0.3 } );
      that.outerCircle.attr( { 'stroke-opacity': 0.1 } );

    };

    this.field.addEventListener( 'mouseenter', that.onMouseEnter );
    this.field.addEventListener( 'mousemove',  that.onMouseMove );
    this.field.addEventListener( 'mouseleave', that.onMouseLeave );

    targets.forEach( function ( el ) {

      el.addEventListener( 'mouseenter', that.onLockOn );
      el.addEventListener( 'mouseleave', that.onLockOff );

    } );

  }

  // NF.Aim.prototype = {

  // }

} )( window );
