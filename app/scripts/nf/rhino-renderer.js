(function(global) {
  'use strict';

  global.NF = global.NF || {};
  var RhinoSVG = global.NF.RhinoSVG;

  var isMobile = ( /iPhone|iPod|iPad|Android|BlackBerry|Windows Phone/i ).test( navigator.userAgent );

  var RhinoRenderer = function(myColor) {
    //                                       id名      SVGのデータ
    this.rhinoSVG1 = new RhinoSVG( 'rhino1', global.NF.getRhinoShape1());
    this.rhinoSVG2 = new RhinoSVG( 'rhino2', global.NF.getRhinoShape2());

    if ( !isMobile ) {
      // モバイル時はエイムカーソルは使わない
      new global.NF.Aim(
        myColor,
        document.querySelector('#js-nf-rhino'), // エイムカーソル有効範囲
        [
          // ロックオン対象
          document.querySelector( '#rhino1 g' ),
          document.querySelector( '#rhino2 g' )
        ]
      );
    }
  };
  RhinoRenderer.prototype = {
    constructor: RhinoRenderer,
    stopAll: function() {
      this.rhinoSVG1.stop();
      this.rhinoSVG2.stop();
    },
    playAll: function() {
      this.rhinoSVG1.play();
      this.rhinoSVG2.play();
    }
  };

  // これだけエクスポートせなあかん
  RhinoRenderer.hexToRGBArray = RhinoSVG.hexToRGBArray;

  global.NF.RR = RhinoRenderer;

})(window);
